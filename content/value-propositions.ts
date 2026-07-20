// =============================================================================
// VALUE PROPOSITIONS — Confirmed value-prop claim keys
//
// Source: Priority-1 (Adam Cox discovery interview)
// =============================================================================

// Confirmed value proposition claim keys from company-profile.ts
export const VALUE_PROP_CLAIM_KEYS = [
  'locally-owned',
  'in-house-crews',
  'customers-know-crew',
  'long-term-employees',
  'mechanical-equipment',
  'established-foundation',
] as const;

export type ValuePropClaimKey = (typeof VALUE_PROP_CLAIM_KEYS)[number];

// Pending value propositions — require verification before use:
export const VALUE_PROP_PENDING = [
  'production-rates',
  'labor-savings',
  'cost-savings',
  'precision-tolerances',
  'specific-equipment-models',
] as const;
