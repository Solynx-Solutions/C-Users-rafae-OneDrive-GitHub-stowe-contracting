// =============================================================================
// RESIDENTIAL POSITIONING — Confirmed residential market claims
//
// Source: Priority-1 (Adam Cox discovery interview)
// =============================================================================

export const RESIDENTIAL_CLAIM_KEYS = [
  'residential-capability',
  'locally-owned',
  'customers-know-crew',
  'years-in-business',
] as const;

export type ResidentialClaimKey = (typeof RESIDENTIAL_CLAIM_KEYS)[number];

// The residential estimate CTA is a controlled message:
// messageKey: 'request-estimate', variant: 'residential'
// Use: resolveControlledMessage('request-estimate', 'residential')

// Pending — require verification:
export const RESIDENTIAL_PENDING = [
  'specific-residential-services',   // service names not yet verified
  'residential-project-examples',    // no verified project data
  'residential-warranties',          // warranty terms pending
] as const;
