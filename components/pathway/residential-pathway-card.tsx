// =============================================================================
// RESIDENTIAL PATHWAY CARD
// Self-contained residential audience pathway card.
// Sources all claims from the governance registry.
// Server Component.
//
// GOVERNANCE NOTES:
//   Uses RESIDENTIAL_CLAIM_KEYS:
//     ✅ residential-capability — confirmed
//     ✅ locally-owned — confirmed
//     ✅ customers-know-crew — confirmed
//     ✅ years-in-business — confirmed
//   CTA: resolveControlledMessage('request-estimate', 'residential')
//   ❌ Specific service list — PENDING vr-service-list
//   ❌ Warranty terms — PROHIBITED
// =============================================================================

import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { PathwayCard } from './pathway-card';

function HomeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/**
 * Residential audience pathway card.
 * Positions Stowe as the experienced local contractor for homeowners.
 * Returns null if core claims are not publishable.
 */
export function ResidentialPathwayCard() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const customersKnowCrew = resolveControlledClaim('customers-know-crew');
  const ctaLabel =
    resolveControlledMessage('request-estimate', 'residential') ?? 'Request a Residential Estimate';

  if (!yearsInBusiness || !locallyOwned) return null;

  const description = [
    yearsInBusiness && `${yearsInBusiness}.`,
    locallyOwned && `${locallyOwned}.`,
    customersKnowCrew && `${customersKnowCrew}.`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <PathwayCard
      heading="Residential Projects"
      description={description}
      ctaLabel={ctaLabel}
      ctaHref="/estimate/residential"
      icon={<HomeIcon />}
      variant="primary"
    />
  );
}
