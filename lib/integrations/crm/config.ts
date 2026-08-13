// =============================================================================
// CRM INTEGRATION — CONFIGURATION
//
// Reads environment variables and resolves the CRM configuration state.
//
// States:
//   disabled      — No CRM variables are set. Safe default during development.
//   configured    — Required webhook URLs are present and non-empty.
//   misconfigured — Partial configuration detected (e.g. provider set but
//                   webhook URLs missing). Logged as a warning; no submission.
//
// Rules:
//   - No secrets are exposed outside this module.
//   - Webhook URLs are NEVER logged in full — only their presence is logged.
//   - This module is server-only; never import it in client components.
//
// Environment variables consumed (see .env.example):
//   CRM_SUBMISSION_ENABLED        explicit opt-in; only "true" permits requests
//   CRM_PROVIDER                  optional — identifier for logging (e.g. 'ghl')
//   GHL_WEBHOOK_URL               combined fallback for both estimate + contact
//   GHL_ESTIMATE_WEBHOOK_URL      estimate-specific webhook
//   GHL_CONTACT_WEBHOOK_URL       contact-specific webhook
// =============================================================================

import { type CrmConfig, type CrmConfigState } from './types';

/**
 * Resolve the CRM configuration from environment variables.
 *
 * Precedence for webhook URLs:
 *   1. Specific URL (GHL_ESTIMATE_WEBHOOK_URL / GHL_CONTACT_WEBHOOK_URL)
 *   2. Generic fallback (GHL_WEBHOOK_URL)
 *
 * Live submission remains disabled unless CRM_SUBMISSION_ENABLED is exactly
 * "true", even when webhook URLs are present.
 *
 * @returns CrmConfig with state and (non-logged) URLs
 */
export function resolveCrmConfig(): CrmConfig {
  const submissionEnabled = process.env.CRM_SUBMISSION_ENABLED?.trim().toLowerCase() === 'true';
  const provider = process.env.CRM_PROVIDER?.trim() || undefined;

  // Resolve estimate webhook
  const estimateWebhookUrl =
    process.env.GHL_ESTIMATE_WEBHOOK_URL?.trim() ||
    process.env.GHL_WEBHOOK_URL?.trim() ||
    undefined;

  // Resolve contact webhook
  const contactWebhookUrl =
    process.env.GHL_CONTACT_WEBHOOK_URL?.trim() || process.env.GHL_WEBHOOK_URL?.trim() || undefined;

  const hasEstimate = isValidWebhookUrl(estimateWebhookUrl);
  const hasContact = isValidWebhookUrl(contactWebhookUrl);
  const hasAny = Boolean(estimateWebhookUrl || contactWebhookUrl || provider || submissionEnabled);

  let state: CrmConfigState;

  if (!submissionEnabled) {
    // Nothing configured — fully disabled, safe default
    state = 'disabled';
  } else if (hasEstimate && hasContact) {
    // Both webhooks available — fully configured
    state = 'configured';
  } else if (hasAny) {
    // Something is set but not everything required — misconfigured
    state = 'misconfigured';
  } else {
    state = 'disabled';
  }

  return {
    state,
    submissionEnabled,
    estimateWebhookUrl,
    contactWebhookUrl,
    provider,
  };
}

function isValidWebhookUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname);
  } catch {
    return false;
  }
}

/**
 * Returns true only when the CRM is fully configured for the given lead type.
 */
export function isCrmConfigured(config: CrmConfig, type: 'estimate' | 'contact'): boolean {
  if (config.state !== 'configured') return false;
  if (type === 'estimate') return Boolean(config.estimateWebhookUrl);
  if (type === 'contact') return Boolean(config.contactWebhookUrl);
  return false;
}

/**
 * Safe representation of a webhook URL for logging.
 * Never logs the full URL (may contain secrets as path segments or query params).
 * Logs only the origin (protocol + host) or a redacted token.
 */
export function safeWebhookLabel(url: string | undefined): string {
  if (!url) return '[not set]';
  try {
    const parsed = new URL(url);
    // Return only the origin — never path, query params, or credentials
    return `${parsed.protocol}//${parsed.hostname} [path redacted]`;
  } catch {
    return '[invalid url]';
  }
}
