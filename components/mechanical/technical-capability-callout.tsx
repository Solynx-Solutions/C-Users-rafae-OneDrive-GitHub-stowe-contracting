// =============================================================================
// TECHNICAL CAPABILITY CALLOUT
// Highlights Stowe's technical differentiation through equipment and crew.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ mechanical-equipment — confirmed
//   ✅ in-house-crews — confirmed
//   ❌ Equipment names, models — PENDING
//   ❌ Comparative claims ("faster", "cheaper") — PROHIBITED
//   ❌ Performance specifications — PROHIBITED
//
// APPROVED LANGUAGE:
//   "Specialized mechanical installation equipment"
//   "Supports applicable projects"
//   "Allows Stowe to..."
//   "Designed to support..."
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';

/**
 * Callout highlighting Stowe's technical capability (equipment + crews).
 * Uses only approved language. Returns null if core claims are not publishable.
 */
export function TechnicalCapabilityCallout() {
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const inHouseCrews = resolveControlledClaim('in-house-crews');

  if (!mechanicalEquipment || !inHouseCrews) return null;

  return (
    <div
      className={[
        'flex flex-col gap-5 md:flex-row md:items-center md:gap-8',
        'rounded-[var(--radius-xl)]',
        'border border-[var(--color-brand-primary)]/20',
        'bg-[var(--color-brand-primary)]/5',
        'p-6 md:p-8',
      ].join(' ')}
      aria-label="Stowe technical capability"
    >
      {/* Icon */}
      <div
        className={[
          'flex h-16 w-16 shrink-0 items-center justify-center',
          'rounded-[var(--radius-lg)]',
          'bg-[var(--color-brand-primary)] text-white',
        ].join(' ')}
        aria-hidden="true"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-[var(--color-brand-secondary)]">
          {mechanicalEquipment} operated by {inHouseCrews.toLowerCase()}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
          Stowe&rsquo;s equipment is designed to support applicable projects — allowing Stowe to
          handle installation requirements at both residential and commercial scale. Every piece of
          equipment is operated by our own in-house team.
        </p>
      </div>

      {/* ❌ DO NOT add: equipment names, models, performance specs, speed comparisons */}
    </div>
  );
}
