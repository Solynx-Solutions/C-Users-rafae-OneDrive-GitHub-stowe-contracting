// =============================================================================
// COMMERCIAL POSITIONING — Confirmed commercial market claims
//
// Source: Priority-1 (Adam Cox discovery interview)
// =============================================================================

export const COMMERCIAL_CLAIM_KEYS = [
  'commercial-capability',
  'in-house-crews',
  'mechanical-equipment',
  'established-foundation',
  'years-in-business',
] as const;

export type CommercialClaimKey = (typeof COMMERCIAL_CLAIM_KEYS)[number];

// The commercial estimate CTA is a controlled message:
// messageKey: 'request-estimate', variant: 'commercial'
// Use: resolveControlledMessage('request-estimate', 'commercial')

// Pending — require verification:
export const COMMERCIAL_PENDING = [
  'specific-commercial-services',   // service names not yet verified
  'public-works-capability',        // NOT confirmed — pending
  'named-commercial-clients',       // client names pending
  'commercial-project-examples',    // no verified project data
] as const;
