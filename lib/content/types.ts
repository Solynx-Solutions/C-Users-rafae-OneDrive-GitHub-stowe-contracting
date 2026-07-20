// =============================================================================
// CONTENT GOVERNANCE — CORE TYPES
//
// These types enforce the two-axis content status system required by the
// Stowe Contracting content-governance architecture.
//
// PUBLIC RENDER RULE: A content record may appear in rendered output only when:
//   verificationStatus === "confirmed" AND publicationStatus === "active"
//
// All other status combinations are blocked from public rendering.
// =============================================================================

// ── Verification Status ───────────────────────────────────────────────────────

/**
 * Tracks whether a claim has been verified against an approved source.
 *
 * - confirmed   : Verified against a Priority-1 source (Adam Cox discovery
 *                 interview) or approved Agent deliverable. Safe to publish.
 * - pending     : Awaiting verification. Must not render publicly.
 * - rejected    : Reviewed and rejected. Must never render. Keep for audit.
 * - deprecated  : Was confirmed; superseded by a newer record. Must not render.
 */
export type VerificationStatus = 'confirmed' | 'pending' | 'rejected' | 'deprecated';

// ── Publication Status ────────────────────────────────────────────────────────

/**
 * Controls whether a record is scheduled for public output.
 *
 * - active        : Approved for public output (subject to verificationStatus).
 * - draft         : In progress; not yet approved. Must not render publicly.
 * - inactive       : Intentionally withheld or paused. Must not render publicly.
 * - internal-only : For tooling, QA, or documentation use only.
 */
export type PublicationStatus = 'active' | 'draft' | 'inactive' | 'internal-only';

// ── Source Priority ───────────────────────────────────────────────────────────

/**
 * Source priority tiers, in descending authority.
 * A lower-priority source may never override a higher-priority source.
 */
export type SourcePriority =
  | 'priority-1-discovery-interview'
  | 'priority-2-brand-messaging-guide'
  | 'priority-3-visual-design-system'
  | 'priority-4-existing-website-verified';

// ── Base Governed Content Record ──────────────────────────────────────────────

/**
 * The base interface all content governance records must implement.
 */
export interface GovernedContent {
  /** Unique identifier for this content record. */
  id: string;
  /** Source that verified this record. */
  source: SourcePriority;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  /** Human-readable reason for the current verification status. */
  verificationNote?: string;
  /** ISO date string when this record was last reviewed. */
  lastReviewedAt?: string;
}

// ── Claim Record ─────────────────────────────────────────────────────────────

/**
 * A verifiable factual claim (e.g. "Nearly 40 years serving Monterey Bay").
 * May appear in body copy, metadata, schema, alt text, captions, etc.
 */
export interface ClaimRecord extends GovernedContent {
  type: 'claim';
  /** The canonical text of this claim. Use exactly as written. */
  canonicalText: string;
  /** Short machine-readable key for programmatic reference. */
  claimKey: string;
}

// ── Controlled Message Record ─────────────────────────────────────────────────

/**
 * An approved brand messaging asset (tagline, CTA, positioning statement).
 * Must be used verbatim; no paraphrasing allowed.
 */
export interface ControlledMessageRecord extends GovernedContent {
  type: 'controlled-message';
  messageKey: string;
  /** The approved text. Use exactly as written. */
  text: string;
  /** Optional variant (e.g., residential vs commercial CTA). */
  variant?: string;
}

// ── Route Record ─────────────────────────────────────────────────────────────

/**
 * A website route. Only confirmed + active routes enter the sitemap.
 * Only confirmed + active routes appear in navigation.
 */
export interface RouteRecord extends GovernedContent {
  type: 'route';
  /** URL path, e.g. "/services/flatwork" */
  path: string;
  /** Navigation label. */
  label: string;
  /** SEO meta title override. */
  metaTitle?: string;
  /** SEO meta description override. */
  metaDescription?: string;
  /** Priority for sitemap (0.0–1.0). */
  sitemapPriority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// ── Prohibited Expression ─────────────────────────────────────────────────────

/**
 * A phrase that must never appear in any public output, regardless of context.
 */
export interface ProhibitedExpression {
  /** The prohibited text pattern (literal string, checked case-insensitively). */
  pattern: string;
  /** Why this expression is prohibited. */
  reason: string;
  /** Optional approved alternative expression. */
  approvedAlternative?: string;
}

// ── Can-Publish Result ────────────────────────────────────────────────────────

export interface CanPublishResult {
  allowed: boolean;
  reason: string;
}
