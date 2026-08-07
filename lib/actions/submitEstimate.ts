// =============================================================================
// SUBMIT ESTIMATE — Integration Layer
//
// This module is the single integration point between the estimate form UI
// and external systems (CRM, email, SMS, webhooks).
//
// CURRENT STATE (M3):
//   - Stub implementation — logs submission data in development.
//   - No CRM, email, SMS, or payment integration.
//   - Returns true to allow the UI to show the success state.
//
// M7+ INTEGRATION:
//   Replace the body of `submitEstimate` with a Server Action or fetch call.
//   The function signature must not change — the form component depends on it.
//
//   Example — GoHighLevel / LeadConnector webhook:
//     const res = await fetch(process.env.GHL_WEBHOOK_URL!, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(buildPayload(data, estimateType)),
//     });
//     return res.ok;
//
//   Example — Next.js Server Action:
//     'use server';
//     // Move this function to app/actions/submitEstimate.ts
//     // and import it directly into the form component.
//
// PAYLOAD SHAPE (forwarded to CRM at M7+):
//   {
//     estimateType: 'residential' | 'commercial',
//     firstName: string,
//     lastName: string,
//     email: string,
//     phone: string,
//     preferredContactMethod?: 'phone' | 'email' | 'either',
//     propertyType?: string,        // residential
//     companyName?: string,         // commercial
//     contactName?: string,         // commercial
//     serviceType: string,
//     projectDescription: string,
//     timeline?: string,
//     budget?: string,
//     submittedAt: string,          // ISO 8601
//   }
//
// GoHighLevel / LeadConnector field mapping:
//   firstName            → Contact: First Name
//   lastName             → Contact: Last Name
//   email                → Contact: Email
//   phone                → Contact: Phone
//   companyName          → Contact: Company Name
//   contactName          → Contact: Full Name (commercial override)
//   preferredContactMethod → Custom Field: preferred_contact_method
//   serviceType          → Custom Field: service_type
//   projectDescription   → Custom Field: project_description
//   estimateType         → Custom Field: estimate_type (tag / pipeline routing)
//   timeline             → Custom Field: project_timeline
//   budget               → Custom Field: project_budget
// =============================================================================

import { type EstimateFormValues } from '@/lib/validations/estimateForm';

export type EstimateType = 'residential' | 'commercial';

export interface EstimateSubmissionPayload extends EstimateFormValues {
  estimateType: EstimateType;
  submittedAt: string;
}

/**
 * Builds the normalized submission payload from validated form data.
 * Add any transformation or enrichment logic here before forwarding to the CRM.
 */
export function buildEstimatePayload(
  data: EstimateFormValues,
  estimateType: EstimateType
): EstimateSubmissionPayload {
  return {
    ...data,
    estimateType,
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Submits a validated estimate form payload to the configured integration target.
 *
 * M3: Stub — logs in development, always resolves true.
 * M7+: Replace the body with a Server Action call or fetch to the CRM webhook.
 *
 * @param data     Validated form values from Zod schema
 * @param estimateType  'residential' | 'commercial'
 * @returns        true on success, false on failure (triggers UI error state)
 */
export async function submitEstimate(
  data: EstimateFormValues,
  estimateType: EstimateType
): Promise<boolean> {
  const payload = buildEstimatePayload(data, estimateType);

  // ── M3 stub ──────────────────────────────────────────────────────────────
  // TODO (M7+): Replace this block with the real integration.
  if (process.env.NODE_ENV !== 'production') {
    console.log('[submitEstimate] M3 stub — payload ready for CRM at M7+', payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network
  return true;
  // ── End stub ─────────────────────────────────────────────────────────────
}
