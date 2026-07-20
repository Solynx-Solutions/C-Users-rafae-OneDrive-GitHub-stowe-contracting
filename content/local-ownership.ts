// =============================================================================
// LOCAL OWNERSHIP — Confirmed local identity and accountability claims
//
// Source: Priority-1 (Adam Cox discovery interview)
// =============================================================================

export const LOCAL_OWNERSHIP_CLAIM_KEYS = [
  'locally-owned',
  'monterey-bay-identity',
  'local-workforce',
  'local-accountability',
  'years-in-business',
] as const;

export type LocalOwnershipClaimKey = (typeof LOCAL_OWNERSHIP_CLAIM_KEYS)[number];
