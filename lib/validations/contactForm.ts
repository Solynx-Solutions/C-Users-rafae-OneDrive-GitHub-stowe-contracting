// =============================================================================
// CONTACT FORM VALIDATION SCHEMA
//
// Zod schema for the general contact form on /contact.
//
// DESIGN:
//   - Split firstName/lastName for CRM compatibility (GoHighLevel / LeadConnector)
//   - Phone optional — visitor may prefer email contact
//   - inquiryType drives routing (estimate vs. general question)
//   - message field kept separate from projectDescription
//
// INTEGRATION NOTE (M7+):
//   When CRM is wired, the submit handler reads inquiryType to:
//     'estimate-residential' → route to residential estimate pipeline
//     'estimate-commercial'  → route to commercial estimate pipeline
//     'general'              → route to general inbox / support pipeline
//
// Architecture mirror of estimateFormSchema — same patterns, separate schema.
// =============================================================================

import { z } from 'zod';

export const contactFormSchema = z.object({
  // ── Contact: split name for CRM compatibility ──────────────────────────────
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(60, 'First name must be less than 60 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(60, 'Last name must be less than 60 characters'),

  // ── Contact: communication ─────────────────────────────────────────────────
  email: z.string().email('Please enter a valid email address'),

  // Phone is optional on the contact form (visitor may prefer email-only)
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-().]{7,20}$/.test(val),
      'Please enter a valid phone number'
    ),

  // ── Preferred contact method ───────────────────────────────────────────────
  preferredContactMethod: z
    .enum(['phone', 'email', 'either'], {
      error: 'Please select a preferred contact method',
    })
    .optional(),

  // ── Inquiry type — drives CRM routing at M7+ ──────────────────────────────
  inquiryType: z
    .enum(['general', 'estimate-residential', 'estimate-commercial'], {
      error: 'Please select an inquiry type',
    })
    .optional(),

  // ── Message ────────────────────────────────────────────────────────────────
  message: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your inquiry')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
