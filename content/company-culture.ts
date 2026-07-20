// =============================================================================
// COMPANY CULTURE — Confirmed culture and workforce identity claims
//
// Source: Priority-1 (Adam Cox discovery interview)
// =============================================================================

export const COMPANY_CULTURE_CLAIM_KEYS = [
  'long-term-employees',
  'customers-know-crew',
  'local-accountability',
  'locally-owned',
] as const;

export type CompanyCultureClaimKey = (typeof COMPANY_CULTURE_CLAIM_KEYS)[number];
