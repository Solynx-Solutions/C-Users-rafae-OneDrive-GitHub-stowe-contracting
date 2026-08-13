// =============================================================================
// CRM INTEGRATION — LEAD MAPPER
//
// Transforms validated form values into normalized CRM lead payloads.
//
// Rules:
//   - Optional fields with falsy/empty values are stripped before submission.
//   - No field name from GoHighLevel leaks into this module (provider-neutral).
//   - submittedAt is always set server-side (ISO 8601).
//   - Source attribution is passed in by the caller; this module does not read
//     URL or header state directly.
// =============================================================================

import { type EstimateFormValues } from '@/lib/validations/estimateForm';
import { type ContactFormValues } from '@/lib/validations/contactForm';
import { type EstimateLead, type ContactLead, type LeadSource, type LeadRouting } from './types';
import { type EstimateType } from './types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Strip keys with undefined, null, or empty-string values from a payload.
 * Reduces noise in the CRM and avoids overwriting existing fields with blanks.
 */
function stripEmpty<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ) as T;
}

// ─── Estimate lead mapping ────────────────────────────────────────────────────

/**
 * Map validated estimate form values to a normalized EstimateLead payload.
 *
 * @param data         Validated EstimateFormValues from Zod schema
 * @param estimateType 'residential' | 'commercial'
 * @param source       Lead source attribution
 * @returns            Cleaned EstimateLead ready for the CRM adapter
 */
export function mapEstimateLead(
  data: EstimateFormValues,
  estimateType: EstimateType,
  source: LeadSource = estimateType === 'residential'
    ? 'residential-estimate'
    : 'commercial-estimate'
): EstimateLead {
  const raw: EstimateLead = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    estimateType,
    serviceType: data.serviceType,
    projectDescription: data.projectDescription,
    source,
    submittedAt: new Date().toISOString(),

    // Optional — only include when present
    ...(data.preferredContactMethod && {
      preferredContactMethod: data.preferredContactMethod,
    }),
    ...(data.companyName && { companyName: data.companyName }),
    ...(data.contactName && { contactName: data.contactName }),
    ...(data.propertyType && { propertyType: data.propertyType }),
    ...(data.timeline && { timeline: data.timeline }),
    ...(data.budget && { budget: data.budget }),
  };

  // Strip any remaining empty strings that may have slipped through
  return stripEmpty(raw);
}

// ─── Contact lead mapping ─────────────────────────────────────────────────────

/**
 * Map validated contact form values to a normalized ContactLead payload.
 *
 * @param data   Validated ContactFormValues from Zod schema
 * @param source Lead source attribution (defaults to 'contact')
 * @returns      Cleaned ContactLead ready for the CRM adapter
 */
export function mapContactLead(
  data: ContactFormValues,
  source: LeadSource = 'contact'
): ContactLead {
  const raw: ContactLead = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    message: data.message,
    source,
    submittedAt: new Date().toISOString(),

    // Optional — only include when present
    ...(data.phone && { phone: data.phone }),
    ...(data.inquiryType && { inquiryType: data.inquiryType }),
    ...(data.preferredContactMethod && {
      preferredContactMethod: data.preferredContactMethod,
    }),
  };

  return stripEmpty(raw);
}

// ─── Routing resolution ───────────────────────────────────────────────────────

/**
 * Resolve the CRM pipeline routing token for an estimate lead.
 */
export function resolveEstimateRouting(estimateType: EstimateType): LeadRouting {
  return estimateType === 'commercial' ? 'commercial-estimate' : 'residential-estimate';
}

/**
 * Resolve the CRM pipeline routing token for a contact lead.
 * Estimate-type inquiry types route to their respective pipelines.
 */
export function resolveContactRouting(inquiryType?: ContactFormValues['inquiryType']): LeadRouting {
  switch (inquiryType) {
    case 'estimate-residential':
      return 'residential-estimate';
    case 'estimate-commercial':
      return 'commercial-estimate';
    default:
      return 'general-contact';
  }
}
