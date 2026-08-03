// =============================================================================
// CREW ACCOUNTABILITY PANEL
// Highlights crew transparency and customer accountability.
// All claims sourced from governance registry — confirmed + active only.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ customers-know-crew — confirmed
//   ✅ in-house-crews — confirmed
//   ✅ long-term-employees — confirmed
//   ❌ Specific tenure years (e.g. "15 years") — PENDING
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';

/**
 * Panel emphasizing crew accountability — customers know who does their work.
 * Renders confirmed claims only. Returns null if core claims are unavailable.
 */
export function CrewAccountabilityPanel() {
  const customersKnowCrew = resolveControlledClaim('customers-know-crew');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const longTermEmployees = resolveControlledClaim('long-term-employees');

  // Require at minimum customers-know-crew claim
  if (!customersKnowCrew) return null;

  const points = [
    customersKnowCrew && {
      heading: 'You know your crew',
      body: 'Customers know who performs their installation — no subcontracting surprises.',
      iconPath: (
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      ),
    },
    inHouseCrews && {
      heading: 'In-house crews',
      body: 'Every project is handled by our own experienced team — not outside contractors.',
      iconPath: (
        <>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
    },
    longTermEmployees && {
      heading: 'Long-term continuity',
      body: 'Our workforce reflects long-term employee continuity — crews with experience you can count on.',
      iconPath: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </>
      ),
    },
  ].filter(Boolean) as Array<{
    heading: string;
    body: string;
    iconPath: React.ReactNode;
  }>;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg leading-snug font-semibold text-[var(--color-brand-secondary)]">
        Accountability built into how we work
      </h3>
      <ul role="list" className="flex flex-col gap-5">
        {points.map((point) => (
          <li key={point.heading} className="flex items-start gap-4">
            <div
              className={[
                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center',
                'rounded-[var(--radius-md)]',
                'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
              ].join(' ')}
              aria-hidden="true"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {point.iconPath}
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-[var(--color-brand-secondary)]">
                {point.heading}
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                {point.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
