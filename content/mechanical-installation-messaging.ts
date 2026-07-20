// =============================================================================
// MECHANICAL INSTALLATION MESSAGING
//
// Source: Priority-1 (Adam Cox discovery interview)
//
// Confirmed: general capability and equipment existence.
// BLOCKED: equipment names, model numbers, performance specs,
//          precision tolerances, production rates, labor savings.
// =============================================================================

export const MECHANICAL_INSTALLATION_CLAIM_KEYS = [
  'mechanical-equipment',
] as const;

export type MechanicalInstallationClaimKey = (typeof MECHANICAL_INSTALLATION_CLAIM_KEYS)[number];

// Pending — require verification before any use:
export const MECHANICAL_INSTALLATION_PENDING = [
  'equipment-names',              // e.g., "laser screed" — pending
  'equipment-models',             // specific model numbers — pending
  'production-rates',             // sq ft/day claims — pending
  'installation-speed',           // comparative speed claims — pending
  'precision-tolerances',         // ± tolerance claims — pending
  'labor-savings',                // cost/labor comparisons — pending
  'mechanical-performance-specs', // any numerical performance claim — pending
] as const;

// CAUTION: The following language patterns are categorically prohibited
// regardless of context — see lib/content/prohibited-claim-policy.ts:
//   "production rate", "sq ft per day", "square feet per day", "% faster",
//   "labor saving", "cost saving", "precision tolerance", "±",
//   "laser-guided", "gps-guided"
