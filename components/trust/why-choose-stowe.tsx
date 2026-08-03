// =============================================================================
// WHY CHOOSE STOWE
// Full trust section combining all 6 confirmed TRUST_INDICATOR_CLAIM_KEYS.
// Uses TrustSignalCard for each confirmed claim.
// All claims sourced from governance registry — confirmed + active only.
// Server Component.
//
// GOVERNANCE NOTES:
//   Uses TRUST_INDICATOR_CLAIM_KEYS:
//     ✅ years-in-business
//     ✅ employee-count
//     ✅ in-house-crews
//     ✅ locally-owned
//     ✅ long-term-employees
//     ✅ mechanical-equipment
//   ❌ Certifications, awards, safety stats — PENDING, not rendered
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { TRUST_INDICATOR_CLAIM_KEYS } from '@/content/trust-indicators';
import { TrustSignalCard } from './trust-signal-card';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

/** Maps each trust claim key to display metadata. */
const CLAIM_DISPLAY: Record<
  (typeof TRUST_INDICATOR_CLAIM_KEYS)[number],
  { label: string; iconPaths: React.ReactNode }
> = {
  'years-in-business': {
    label: 'Experience',
    iconPaths: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
  'employee-count': {
    label: 'Workforce',
    iconPaths: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  'in-house-crews': {
    label: 'In-House Crews',
    iconPaths: <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />,
  },
  'locally-owned': {
    label: 'Local Ownership',
    iconPaths: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  'long-term-employees': {
    label: 'Continuity',
    iconPaths: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96M12 22.08V12" />
      </>
    ),
  },
  'mechanical-equipment': {
    label: 'Equipment',
    iconPaths: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
  },
};

/**
 * Full "Why Choose Stowe" section.
 * Renders a card for each of the 6 confirmed TRUST_INDICATOR_CLAIM_KEYS.
 * Silently omits any claim that is not confirmed+active.
 */
export function WhyChooseStowe() {
  const cards = TRUST_INDICATOR_CLAIM_KEYS.map((key) => {
    const text = resolveControlledClaim(key);
    if (!text) return null;
    const display = CLAIM_DISPLAY[key];
    return { key, text, label: display.label, iconPaths: display.iconPaths };
  }).filter(Boolean) as Array<{
    key: string;
    text: string;
    label: string;
    iconPaths: React.ReactNode;
  }>;

  if (cards.length === 0) return null;

  return (
    <section aria-label="Why choose Stowe Contracting" className="section-py">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            subtitle="Nearly 40 years of local experience, backed by the people and equipment to do the work right."
          >
            Why Choose Stowe
          </SectionHeading>

          <div className={['grid gap-4', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'].join(' ')}>
            {cards.map(({ key, text, label, iconPaths }) => (
              <TrustSignalCard
                key={key}
                icon={
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {iconPaths}
                  </svg>
                }
                heading={label}
                body={text}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
