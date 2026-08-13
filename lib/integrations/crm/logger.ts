// =============================================================================
// CRM INTEGRATION — SAFE LOGGER
//
// Server-side structured logging for CRM submission events.
//
// Rules (enforced here, not by the caller):
//   - Secrets are NEVER logged.
//   - Full webhook URLs are NEVER logged. Only the safe label from
//     safeWebhookLabel() (origin only) may appear.
//   - PII fields (email, phone, name) are NOT logged — only submission status.
//   - All log lines are prefixed with [crm] for easy filtering.
//
// In production, replace console.log with your structured logging service
// (e.g. Datadog, Axiom, Pino) by updating this single module.
// =============================================================================

type LeadType = 'estimate' | 'contact';

export const crmLogger = {
  /**
   * Log that the CRM configuration is disabled (no env vars set).
   * This is the expected state in development — not an error.
   */
  configurationDisabled(leadType: LeadType): void {
    console.info(`[crm] ${leadType} submission skipped — CRM integration disabled (no config)`);
  },

  /**
   * Log that the CRM is partially configured but not usable.
   * Represents a real configuration problem that should be investigated.
   */
  misconfigured(leadType: LeadType, webhookLabel: string): void {
    console.warn(
      `[crm] ${leadType} submission skipped — CRM misconfigured. ` +
        `Endpoint label: ${webhookLabel}`
    );
  },

  /**
   * Log that a submission attempt is being made.
   * Only the safe endpoint label (origin) is logged — never the full URL.
   */
  submissionAttempted(leadType: LeadType, webhookLabel: string): void {
    console.info(`[crm] ${leadType} submission attempted → ${webhookLabel}`);
  },

  /**
   * Log a successful CRM submission.
   */
  submissionSucceeded(leadType: LeadType): void {
    console.info(`[crm] ${leadType} submission succeeded`);
  },

  /**
   * Log a failed CRM submission.
   * Reason must not include secrets, full URLs, or PII.
   */
  submissionFailed(reason: string): void {
    console.error(`[crm] submission failed — ${reason}`);
  },
} as const;
