// =============================================================================
// SUBMIT CONTACT — Integration Layer
//
// Single integration point between the contact form UI and external systems.
// Mirrors the architecture of lib/actions/submitEstimate.ts (M3).
//
// CURRENT STATE (M5):
//   - Stub implementation — logs submission data in development.
//   - No CRM, email, SMS, or routing integration.
//   - Returns true to allow the UI to show the success state.
//
// M7+ INTEGRATION:
//   Replace the body of `submitContact` with a Server Action or fetch call.
//   The function signature must not change — the form component depends on it.
//
// ROUTING LOGIC (M7+):
//   inquiryType === 'estimate-residential' → GoHighLevel residential pipeline
//   inquiryType === 'estimate-commercial'  → GoHighLevel commercial pipeline
//   inquiryType === 'general'              → GoHighLevel general contact inbox
//   inquiryType === undefined              → GoHighLevel general contact inbox
//
// PAYLOAD SHAPE (forwarded to CRM at M7+):
//   {
//     firstName: string,
//     lastName: string,
//     email: string,
//     phone?: string,
//     preferredContactMethod?: 'phone' | 'email' | 'either',
//     inquiryType?: 'general' | 'estimate-residential' | 'estimate-commercial',
//     message: string,
//     submittedAt: string,       // ISO 8601
//   }
//
// GoHighLevel / LeadConnector field mapping:
//   firstName              → Contact: First Name
//   lastName               → Contact: Last Name
//   email                  → Contact: Email
//   phone                  → Contact: Phone
//   preferredContactMethod → Custom Field: preferred_contact_method
//   inquiryType            → Custom Field: inquiry_type (pipeline routing)
//   message                → Custom Field: contact_message
// =============================================================================

import { type ContactFormValues } from '@/lib/validations/contactForm';

export interface ContactSubmissionPayload extends ContactFormValues {
  submittedAt: string;
}

/**
 * Builds the normalized submission payload from validated contact form data.
 * Add transformation or enrichment logic here before forwarding to the CRM.
 */
export function buildContactPayload(data: ContactFormValues): ContactSubmissionPayload {
  return {
    ...data,
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Submits a validated contact form payload to the configured integration target.
 *
 * M5: Stub — logs in development, always resolves true.
 * M7+: Replace the body with a Server Action call or fetch to the CRM webhook.
 *
 * @param data     Validated form values from Zod schema
 * @returns        true on success, false on failure (triggers UI error state)
 */
export async function submitContact(data: ContactFormValues): Promise<boolean> {
  const payload = buildContactPayload(data);

  // ── M5 stub ──────────────────────────────────────────────────────────────
  // TODO (M7+): Replace this block with the real integration.
  // Route by payload.inquiryType to the correct CRM pipeline.
  if (process.env.NODE_ENV !== 'production') {
    console.log('[submitContact] M5 stub — payload ready for CRM at M7+', payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network
  return true;
  // ── End stub ─────────────────────────────────────────────────────────────
}
