// =============================================================================
// SUBMIT CONTACT — Integration Layer (M7)
//
// Single integration point between the contact form UI and external systems.
// Uses the same CRM adapter as submitEstimate — one client, one architecture.
//
// ARCHITECTURE (M7):
//   - Maps validated ContactFormValues to a normalized ContactLead.
//   - Resolves CRM pipeline routing from inquiryType.
//   - Submits via submitContactToCrm() — config state checked before any fetch.
//   - Returns a typed SubmitContactResult so the form can distinguish:
//       success                   — CRM confirmed receipt
//       validation_error          — invalid data (should not normally occur)
//       configuration_unavailable — CRM is disabled or misconfigured
//       submission_error          — CRM responded with an error
//       spam_rejected             — honeypot triggered
//
// ROUTING LOGIC:
//   inquiryType === 'estimate-residential' → residential-estimate pipeline
//   inquiryType === 'estimate-commercial'  → commercial-estimate pipeline
//   inquiryType === 'general' / undefined  → general-contact inbox
//
// SAFETY:
//   - No endpoint URLs or secrets are returned to the caller.
//   - No fake success when CRM did not confirm receipt.
//   - No SMS consent language added. SMS is not activated.
//
// Do not rewrite the function signature — form components depend on it.
// =============================================================================

import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contactForm';
import { mapContactLead, resolveContactRouting, submitContactToCrm } from '@/lib/integrations/crm';
import { isHoneypotTriggered } from './submitEstimate';

// Re-export for consumers that import from submitContact
export type { ContactFormValues };

// ─── Result type ──────────────────────────────────────────────────────────────

/**
 * Typed result from submitContact.
 * Mirrors SubmitEstimateResult for consistency across both form flows.
 */
export type SubmitContactOutcome =
  | 'success'
  | 'validation_error'
  | 'configuration_unavailable'
  | 'submission_error'
  | 'spam_rejected';

export interface SubmitContactResult {
  outcome: SubmitContactOutcome;
  /** Human-safe message — no secrets, no stack traces */
  message?: string;
}

// ─── Payload type (backwards-compatible) ─────────────────────────────────────

export interface ContactSubmissionPayload extends ContactFormValues {
  submittedAt: string;
}

/**
 * Builds the normalized submission payload (retained for backwards compat).
 */
export function buildContactPayload(data: ContactFormValues): ContactSubmissionPayload {
  return {
    ...data,
    submittedAt: new Date().toISOString(),
  };
}

// ─── Main submission function ─────────────────────────────────────────────────

/**
 * Submits a validated contact form payload to the configured CRM integration.
 *
 * M7 behavior:
 *   - Checks honeypot first. Spam → spam_rejected.
 *   - Resolves CRM config state.
 *   - CONFIGURED: validate → map → submit → return success only on confirmed response.
 *   - DISABLED / MISCONFIGURED: return configuration_unavailable (no external call).
 *   - FAILURE: return submission_error.
 *
 * @param data           Validated form values from Zod schema
 * @param honeypotValue  Optional honeypot field value (should be empty for humans)
 * @returns              SubmitContactResult with outcome and optional message
 */
export async function submitContact(
  data: ContactFormValues,
  honeypotValue?: string
): Promise<SubmitContactResult> {
  // ── Spam check ──────────────────────────────────────────────────────────────
  if (isHoneypotTriggered(honeypotValue)) {
    return { outcome: 'spam_rejected' };
  }

  const validation = contactFormSchema.safeParse(data);
  if (!validation.success) {
    return { outcome: 'validation_error', message: 'Please review the submitted contact details.' };
  }

  // ── Map to normalized lead ──────────────────────────────────────────────────
  const lead = mapContactLead(validation.data);
  const routing = resolveContactRouting(validation.data.inquiryType);

  // ── Submit via CRM adapter ──────────────────────────────────────────────────
  const result = await submitContactToCrm(lead, routing);

  switch (result.status) {
    case 'success':
      return { outcome: 'success' };

    case 'disabled':
      return {
        outcome: 'configuration_unavailable',
        message: result.reason,
      };

    case 'misconfigured':
      return {
        outcome: 'configuration_unavailable',
        message: result.reason,
      };

    case 'failure':
      return {
        outcome: 'submission_error',
        message: 'CRM submission failed. Please try again or contact us directly.',
      };
  }
}
