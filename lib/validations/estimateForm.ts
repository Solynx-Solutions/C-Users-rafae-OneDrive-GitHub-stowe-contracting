// =============================================================================
// ESTIMATE FORM VALIDATION SCHEMA
//
// Zod schema for the estimate request form.
// Shared between residential and commercial — both modes use the same schema;
// optional commercial-only fields (companyName, contactName, scopeDescription)
// and residential-only fields (propertyType) are left optional so a single
// schema covers both submission shapes without branching.
//
// Integration note (M7+):
//   When the CRM submission is wired, distinguishing residential vs. commercial
//   is done via the `estimateType` field passed alongside this data, NOT by
//   separate schemas.
// =============================================================================

import { z } from 'zod';

// ── Shared contact fields ─────────────────────────────────────────────────────

export const estimateFormSchema = z.object({
  // ── Contact: split name for CRM compatibility ──────────────────────────
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(60, 'First name must be less than 60 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(60, 'Last name must be less than 60 characters'),

  // ── Contact: communication ─────────────────────────────────────────────
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .refine((val) => /^\+?[\d\s\-().]{7,20}$/.test(val), 'Please enter a valid phone number'),

  // ── Preferred contact method ───────────────────────────────────────────
  preferredContactMethod: z
    .enum(['phone', 'email', 'either'], {
      error: 'Please select a preferred contact method',
    })
    .optional(),

  // ── Residential-only ───────────────────────────────────────────────────
  /** Residential property type (single-family, multi-family, etc.) */
  propertyType: z.string().optional(),

  // ── Commercial-only ────────────────────────────────────────────────────
  /** Business or organization name */
  companyName: z.string().max(120, 'Company name must be less than 120 characters').optional(),
  /** Name of the contact person at the company */
  contactName: z.string().max(120, 'Contact name must be less than 120 characters').optional(),

  // ── Project details ────────────────────────────────────────────────────
  serviceType: z.string().min(1, 'Please select a service type'),

  /** Residential: project description. Commercial: scope description. */
  projectDescription: z
    .string()
    .min(20, 'Please provide at least 20 characters describing your project')
    .max(3000, 'Description must be less than 3000 characters'),

  // ── Timeline ───────────────────────────────────────────────────────────
  timeline: z.string().optional(),

  // ── Legacy / deprecated fields — retained for backward schema compat ───
  /** @deprecated Use firstName + lastName. Kept for test backward compat. */
  name: z.string().optional(),
  address: z.string().optional(),
  budget: z.string().optional(),
});

export type EstimateFormValues = z.infer<typeof estimateFormSchema>;
