// =============================================================================
// TEAM MESSAGING — Confirmed crew and workforce messaging
//
// Source: Priority-1 (Adam Cox discovery interview)
// =============================================================================

// Confirmed team messaging claim keys
export const TEAM_MESSAGING_CLAIM_KEYS = [
  'in-house-crews',
  'long-term-employees',
  'customers-know-crew',
  'local-workforce',
] as const;

export type TeamMessagingClaimKey = (typeof TEAM_MESSAGING_CLAIM_KEYS)[number];

// Pending — require verification before use:
export const TEAM_MESSAGING_PENDING = [
  'employee-tenure-years', // specific numbers (e.g., "avg 12 years") — pending
  'named-employees', // named individuals — pending
] as const;
