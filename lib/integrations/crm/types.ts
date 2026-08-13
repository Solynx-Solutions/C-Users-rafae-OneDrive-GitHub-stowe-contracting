// =============================================================================
// CRM INTEGRATION — TYPES
//
// Provider-independent type contracts for the CRM adapter layer.
// No GoHighLevel, LeadConnector, or vendor names leak into consuming modules.
//
// Architecture:
//   - EstimateType         — residential vs commercial estimate discriminator
//   - CrmLeadPayload       — normalized, cleaned lead data sent to CRM
//   - CrmSubmitResult      — what the adapter returns after attempting submission
//   - CrmConfig            — resolved configuration for the current environment
//   - CrmConfigState       — enumerated safety states
//   - LeadSource           — safe attribution values
//   - LeadRouting          — which CRM pipeline/inbox to target
// =============================================================================

// ─── Estimate type ────────────────────────────────────────────────────────────

/**
 * Discriminates between residential and commercial estimate flows.
 * Defined here (not in submitEstimate.ts) to avoid circular imports.
 */
export type EstimateType = 'residential' | 'commercial';

// ─── Configuration states ─────────────────────────────────────────────────────

/**
 * Explicit CRM configuration safety states.
 *
 *   disabled      — No environment variables are present. Safe default.
 *                   No external request will be attempted.
 *
 *   configured    — Required environment variables are present and non-empty.
 *                   Adapter may attempt submission.
 *
 *   misconfigured — Some variables are present but the combination is invalid
 *                   (e.g. provider set but webhook URL missing).
 *                   Adapter will not attempt submission; logs a warning.
 */
export type CrmConfigState = 'disabled' | 'configured' | 'misconfigured';

// ─── Lead source attribution ──────────────────────────────────────────────────

/**
 * Safe, enumerated lead source values.
 * These become the `source` field in every CRM lead payload.
 * Extend as new entry points are added.
 */
export type LeadSource =
  | 'contact'
  | 'residential-estimate'
  | 'commercial-estimate'
  | 'cta-residential'
  | 'cta-commercial'
  | 'unknown';

// ─── CRM pipeline routing ─────────────────────────────────────────────────────

/**
 * Which CRM pipeline or inbox should receive this lead.
 * Maps from inquiryType / estimateType to a routing token.
 */
export type LeadRouting = 'residential-estimate' | 'commercial-estimate' | 'general-contact';

// ─── Normalized lead payloads ─────────────────────────────────────────────────

/**
 * Normalized estimate lead payload.
 *
 * All optional fields are genuinely optional — do not send undefined values.
 * The adapter is responsible for stripping empty/undefined before submission.
 */
export interface EstimateLead {
  // ── Contact identity ──────────────────────────────────────────────────────
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // ── Commercial-only ───────────────────────────────────────────────────────
  /** Business or organization name (commercial leads) */
  companyName?: string;
  /** Contact person name override for commercial leads */
  contactName?: string;

  // ── Residential-only ──────────────────────────────────────────────────────
  /** Residential property type (single-family, multi-family, etc.) */
  propertyType?: string;

  // ── Project details ───────────────────────────────────────────────────────
  /** Residential or commercial */
  estimateType: 'residential' | 'commercial';
  serviceType: string;
  projectDescription: string;
  timeline?: string;
  budget?: string;

  // ── Communication preference ──────────────────────────────────────────────
  preferredContactMethod?: 'phone' | 'email' | 'either';

  // ── Attribution ───────────────────────────────────────────────────────────
  source: LeadSource;
  submittedAt: string; // ISO 8601
}

/**
 * Normalized contact/general-inquiry lead payload.
 */
export interface ContactLead {
  // ── Contact identity ──────────────────────────────────────────────────────
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  // ── Inquiry details ───────────────────────────────────────────────────────
  inquiryType?: 'general' | 'estimate-residential' | 'estimate-commercial';
  message: string;

  // ── Communication preference ──────────────────────────────────────────────
  preferredContactMethod?: 'phone' | 'email' | 'either';

  // ── Attribution ───────────────────────────────────────────────────────────
  source: LeadSource;
  submittedAt: string; // ISO 8601
}

/** Union of all lead payload types */
export type CrmLeadPayload = EstimateLead | ContactLead;

// ─── Adapter result ───────────────────────────────────────────────────────────

/**
 * What the CRM adapter returns after attempting a submission.
 *
 * The form layer (submitEstimate / submitContact) maps this to a boolean or
 * a richer UI state. The adapter never returns a fake success.
 */
export type CrmSubmitResult =
  | { status: 'success' }
  | { status: 'failure'; reason: string }
  | { status: 'disabled'; reason: string }
  | { status: 'misconfigured'; reason: string };

// ─── Resolved configuration ───────────────────────────────────────────────────

/**
 * Resolved CRM configuration — produced by config.ts and consumed by client.ts.
 * Never expose raw credential strings outside server-side code.
 */
export interface CrmConfig {
  state: CrmConfigState;
  /** Explicit runtime activation gate. Must be true before any request is allowed. */
  submissionEnabled: boolean;
  /** Webhook URL for estimate leads (server-side only, never sent to client) */
  estimateWebhookUrl?: string;
  /** Webhook URL for contact/general leads (server-side only) */
  contactWebhookUrl?: string;
  /** Provider identifier — for logging only */
  provider?: string;
}
