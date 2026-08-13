// =============================================================================
// CRM INTEGRATION — CLIENT
//
// The single HTTP client responsible for submitting normalized lead payloads
// to the configured CRM webhook endpoint.
//
// Architecture:
//   - One client handles both estimate and contact leads via separate methods.
//   - Configuration state is checked before any network call is attempted.
//   - No external request is made when state is 'disabled' or 'misconfigured'.
//   - No secrets are returned in CrmSubmitResult — only safe status + reason.
//   - Webhook URLs are NEVER logged in full.
//
// Server-only module — never import in client components.
// =============================================================================

import {
  type CrmSubmitResult,
  type EstimateLead,
  type ContactLead,
  type LeadRouting,
} from './types';
import { resolveCrmConfig, isCrmConfigured, safeWebhookLabel } from './config';
import { crmLogger } from './logger';

// ─── Internal types ───────────────────────────────────────────────────────────

/** Minimal GoHighLevel / LeadConnector webhook envelope */
interface WebhookEnvelope {
  /** CRM pipeline routing token — maps to tags, pipeline stages, or inboxes */
  routing: LeadRouting;
  [key: string]: unknown;
}

// ─── HTTP submission ──────────────────────────────────────────────────────────

/**
 * POST a payload to a webhook URL.
 * Returns a CrmSubmitResult — never throws to the caller.
 */
async function postToWebhook(
  webhookUrl: string,
  payload: WebhookEnvelope
): Promise<CrmSubmitResult> {
  let response: Response;

  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Hard timeout — prevents hanging on misconfigured or slow endpoints
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Network error';
    crmLogger.submissionFailed(`fetch error — ${reason}`);
    return { status: 'failure', reason: 'Network error during CRM submission' };
  }

  if (response.ok) {
    return { status: 'success' };
  }

  crmLogger.submissionFailed(`HTTP ${response.status}`);
  return {
    status: 'failure',
    reason: `CRM endpoint returned HTTP ${response.status}`,
  };
}

// ─── Public client methods ────────────────────────────────────────────────────

/**
 * Submit an estimate lead to the CRM.
 *
 * Behavior by config state:
 *   configured    → validates URL, posts payload, returns result
 *   disabled      → returns { status: 'disabled' } immediately, no fetch
 *   misconfigured → returns { status: 'misconfigured' } immediately, no fetch
 */
export async function submitEstimateToCrm(
  lead: EstimateLead,
  routing: LeadRouting
): Promise<CrmSubmitResult> {
  const config = resolveCrmConfig();

  if (config.state === 'disabled') {
    crmLogger.configurationDisabled('estimate');
    return {
      status: 'disabled',
      reason: 'CRM integration is not configured in this environment.',
    };
  }

  if (!isCrmConfigured(config, 'estimate')) {
    crmLogger.misconfigured('estimate', safeWebhookLabel(config.estimateWebhookUrl));
    return {
      status: 'misconfigured',
      reason: 'CRM estimate webhook is not fully configured.',
    };
  }

  const webhookUrl = config.estimateWebhookUrl!;
  const envelope: WebhookEnvelope = { ...lead, routing };

  crmLogger.submissionAttempted('estimate', safeWebhookLabel(webhookUrl));
  const result = await postToWebhook(webhookUrl, envelope);

  if (result.status === 'success') {
    crmLogger.submissionSucceeded('estimate');
  }

  return result;
}

/**
 * Submit a contact/general lead to the CRM.
 *
 * Behavior by config state:
 *   configured    → validates URL, posts payload, returns result
 *   disabled      → returns { status: 'disabled' } immediately, no fetch
 *   misconfigured → returns { status: 'misconfigured' } immediately, no fetch
 */
export async function submitContactToCrm(
  lead: ContactLead,
  routing: LeadRouting
): Promise<CrmSubmitResult> {
  const config = resolveCrmConfig();

  if (config.state === 'disabled') {
    crmLogger.configurationDisabled('contact');
    return {
      status: 'disabled',
      reason: 'CRM integration is not configured in this environment.',
    };
  }

  if (!isCrmConfigured(config, 'contact')) {
    crmLogger.misconfigured('contact', safeWebhookLabel(config.contactWebhookUrl));
    return {
      status: 'misconfigured',
      reason: 'CRM contact webhook is not fully configured.',
    };
  }

  const webhookUrl = config.contactWebhookUrl!;
  const envelope: WebhookEnvelope = { ...lead, routing };

  crmLogger.submissionAttempted('contact', safeWebhookLabel(webhookUrl));
  const result = await postToWebhook(webhookUrl, envelope);

  if (result.status === 'success') {
    crmLogger.submissionSucceeded('contact');
  }

  return result;
}
