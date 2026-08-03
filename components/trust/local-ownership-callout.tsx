// =============================================================================
// LOCAL OWNERSHIP CALLOUT
// Highlights Stowe's local ownership and Monterey Bay identity.
// All claims sourced from governance registry — confirmed + active only.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ locally-owned — confirmed
//   ✅ monterey-bay-identity — confirmed
//   ✅ local-accountability — confirmed
//   ❌ Address / service areas — PENDING vr-contact-information / vr-service-areas
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';

/**
 * Callout block emphasizing local ownership, Monterey Bay identity, and
 * local accountability. Returns null if no claims are publishable.
 */
export function LocalOwnershipCallout() {
  const locallyOwned = resolveControlledClaim('locally-owned');
  const montereyBay = resolveControlledClaim('monterey-bay-identity');
  const localAccountability = resolveControlledClaim('local-accountability');

  // Require at minimum the locally-owned claim
  if (!locallyOwned) return null;

  return (
    <div
      className={[
        'rounded-[var(--radius-xl)]',
        'bg-[var(--color-brand-secondary)]',
        'p-8 md:p-10',
        'text-white',
        'flex flex-col gap-4',
      ].join(' ')}
      aria-label="Local ownership and accountability"
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white/10"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      {/* Heading */}
      <h3 className="text-xl leading-snug font-bold text-white">
        {locallyOwned}
        {montereyBay && (
          <span className="block text-base font-normal text-[var(--color-neutral-300)]">
            {montereyBay}
          </span>
        )}
      </h3>

      {/* Body */}
      <p className="text-sm leading-relaxed text-[var(--color-neutral-300)]">
        Stowe Contracting is locally owned and operated. The people making decisions about your
        project are the same people invested in this community.
        {localAccountability && (
          <span className="mt-2 block font-medium text-white">{localAccountability}.</span>
        )}
      </p>
    </div>
  );
}
