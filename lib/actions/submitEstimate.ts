// =============================================================================
// SUBMIT ESTIMATE — Integration Layer (M7)
//
// This module is the single integration point between the estimate form UI
// and external systems (CRM, email, SMS, webhooks).
//
// ARCHITECTURE (M7):
//   - Validates form data via Zod (already done in the form component; re-used
//     here as a safety boundary before any external call).
//   - Maps validated data to a normalized EstimateLead via the CRM adapter.
//   - Submits via submitEstimateToCrm() — which checks the config state first.
//   - Returns a typed SubmitEstimateResult so the form can distinguish:
//       success            — CRM confirmed receipt
//       validation_error   — caller passed invalid data (should not normally occur)
//       configuration_unavailable — CRM is disabled or misconfigured
//       submission_error   — CRM responded with an error
//
// BEHAVIOR BY CONFIG STATE:
//   configured:
//     validate → map → submit → return success only after confirmed CRM response
//   disabled:
//     return { outcome: 'configuration_unavailable' } immediately, no fetch
//   misconfigured:
//     return { outcome: 'configuration_unavailable' } immediately, no fetch
//
// SAFETY:
//   - No endpoint URLs or secrets are returned to the caller.
//   - No fake success is returned when the CRM did not confirm receipt.
//   - Duplicate submission protection is enforced at the UI level (see form).
//
// SPAM PROTECTION:
//   - Honeypot field check is performed here before any external call.
//
// PRIVACY:
//   - No SMS consent language is added here. SMS is not activated.
//   - Data is used only to respond to the estimate request.
//   - CRM activation requires a privacy policy update (see M7 findings).
//
// Do not rewrite the function signature — form components depend on it.
// =============================================================================

import { estimateFormSchema, type EstimateFormValues } from '@/lib/validations/estimateForm';
import {
  mapEstimateLead,
  resolveEstimateRouting,
  submitEstimateToCrm,
  type EstimateType,
} from '@/lib/integrations/crm';

// Re-export EstimateType so consumers can import from submitEstimate as before
export type { EstimateType };

// ─── Result type ──────────────────────────────────────────────────────────────

/**
 * Typed result from submitEstimate.
 * The form layer maps this to an appropriate UI state.
 *
 *   success                   — CRM confirmed receipt
 *   validation_error          — data did not pass pre-submission sanity check
 *   configuration_unavailable — CRM disabled or misconfigured (not an error)
 *   submission_error          — CRM responded with a failure
 *   spam_rejected             — honeypot or other spam signal detected
 */
export type SubmitEstimateOutcome =
  | 'success'
  | 'validation_error'
  | 'configuration_unavailable'
  | 'submission_error'
  | 'spam_rejected';

export interface SubmitEstimateResult {
  outcome: SubmitEstimateOutcome;
  /** Human-safe message — no secrets, no stack traces */
  message?: string;
}

// ─── Payload type (backwards-compatible) ─────────────────────────────────────

export interface EstimateSubmissionPayload extends EstimateFormValues {
  estimateType: EstimateType;
  submittedAt: string;
}

/**
 * Builds the normalized submission payload (retained for backwards compat
 * and external tooling that calls buildEstimatePayload directly).
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

// ─── Honeypot check ───────────────────────────────────────────────────────────

/**
 * Check the honeypot field value.
 * The honeypot field is a hidden input that legitimate browsers leave empty.
 * Bots that fill all form fields will populate it — reject those submissions.
 *
 * @param honeypotValue  Value of the hidden honeypot field from FormData
 * @returns true if the submission appears to be spam
 */
export function isHoneypotTriggered(honeypotValue: string | undefined): boolean {
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

// ─── Main submission function ─────────────────────────────────────────────────

/**
 * Submits a validated estimate form payload to the configured CRM integration.
 *
 * M7 behavior:
 *   - Checks honeypot first. Spam → spam_rejected.
 *   - Resolves CRM config state.
 *   - CONFIGURED: validate → map → submit → return success only on confirmed response.
 *   - DISABLED / MISCONFIGURED: return configuration_unavailable (no external call).
 *   - FAILURE: return submission_error (no secrets exposed).
 *
 * @param data           Validated form values from Zod schema
 * @param estimateType   'residential' | 'commercial'
 * @param honeypotValue  Optional honeypot field value (should be empty for humans)
 * @returns              SubmitEstimateResult with outcome and optional message
 */
export async function submitEstimate(
  data: EstimateFormValues,
  estimateType: EstimateType,
  honeypotValue?: string
): Promise<SubmitEstimateResult> {
  // ── Spam check ──────────────────────────────────────────────────────────────
  if (isHoneypotTriggered(honeypotValue)) {
    // Silently reject — do not signal to bots that they were caught
    return { outcome: 'spam_rejected' };
  }

  const validation = estimateFormSchema.safeParse(data);
  if (!validation.success) {
    return { outcome: 'validation_error', message: 'Please review the submitted project details.' };
  }

  // ── Map to normalized lead ──────────────────────────────────────────────────
  const lead = mapEstimateLead(validation.data, estimateType);
  const routing = resolveEstimateRouting(estimateType);

  // ── Submit via CRM adapter ──────────────────────────────────────────────────
  const result = await submitEstimateToCrm(lead, routing);

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
        // Do not forward internal reason to form — it may contain URL fragments
        message: 'CRM submission failed. Please try again or contact us directly.',
      };
  }
}
