// =============================================================================
// COMMERCIAL PATHWAY CARD
// Self-contained commercial audience pathway card.
// Sources all claims from the governance registry.
// Server Component.
//
// GOVERNANCE NOTES:
//   Uses COMMERCIAL_CLAIM_KEYS:
//     ✅ commercial-capability — confirmed
//     ✅ in-house-crews — confirmed
//     ✅ mechanical-equipment — confirmed
//     ✅ established-foundation — confirmed
//     ✅ years-in-business — confirmed
//   CTA: resolveControlledMessage('request-estimate', 'commercial')
//   ❌ Public works capability — PENDING
//   ❌ Named commercial clients / project examples — PENDING
//   ❌ Specific service list — PENDING vr-service-list
// =============================================================================

import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { PathwayCard } from './pathway-card';

function BuildingIcon() {
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
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

/**
 * Commercial audience pathway card.
 * Positions Stowe's workforce, equipment, and regional experience for commercial clients.
 * Returns null if core claims are not publishable.
 */
export function CommercialPathwayCard() {
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const establishedFoundation = resolveControlledClaim('established-foundation');
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const ctaLabel =
    resolveControlledMessage('request-estimate', 'commercial') ?? 'Request a Commercial Estimate';

  if (!yearsInBusiness) return null;

  const description = [
    establishedFoundation && `${establishedFoundation}.`,
    inHouseCrews && `${inHouseCrews}.`,
    mechanicalEquipment && `${mechanicalEquipment} designed to support applicable projects.`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <PathwayCard
      heading="Commercial Projects"
      description={description}
      ctaLabel={ctaLabel}
      ctaHref="/estimate/commercial"
      icon={<BuildingIcon />}
      variant="outline"
    />
  );
}
