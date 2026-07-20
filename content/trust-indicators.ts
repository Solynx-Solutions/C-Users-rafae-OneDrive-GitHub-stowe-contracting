// =============================================================================
// TRUST INDICATORS — Confirmed trust signals
//
// Source: Priority-1 (Adam Cox discovery interview)
// =============================================================================

import { type ClaimRecord } from '@/lib/content/types';

// Confirmed trust signals derived from company-profile.ts claims.
// This module groups them for use in trust-indicator UI sections.
// All entries reference their canonical company-profile claim key.

export const TRUST_INDICATOR_CLAIM_KEYS = [
  'years-in-business',
  'employee-count',
  'in-house-crews',
  'locally-owned',
  'long-term-employees',
  'mechanical-equipment',
] as const;

export type TrustIndicatorClaimKey = (typeof TRUST_INDICATOR_CLAIM_KEYS)[number];

// Pending trust indicators — do not render until verified:
export const TRUST_INDICATOR_PENDING_CLAIM_KEYS = [
  'certifications',      // pending
  'awards',              // pending
  'safety-statistics',   // pending
] as const;

// Stub type to satisfy TypeScript if these are referenced as ClaimRecord arrays elsewhere
export const trustIndicatorPendingStubs: ClaimRecord[] = [];
