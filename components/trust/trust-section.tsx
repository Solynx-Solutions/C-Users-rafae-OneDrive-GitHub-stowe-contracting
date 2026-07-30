// =============================================================================
// TRUST SECTION
// Full page section with confirmed trust signals in card grid layout.
// Server Component. All content from governance registry.
//
// GOVERNANCE NOTES:
// - Testimonials NOT rendered (vr-testimonials blocker)
// - Certifications NOT rendered (pending)
// - Only confirmed+active claims render
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { TrustSignalCard } from './trust-signal-card';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

function TeamIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LocalIcon() {
  return (
    <svg
      width="20"
      height="20"
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
  );
}

function EquipmentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ContinuityIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * Trust section with confirmed signal cards.
 * Only renders cards for confirmed+active claims.
 * Returns null if no publishable claims exist.
 */
export function TrustSection() {
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const longTermEmployees = resolveControlledClaim('long-term-employees');

  const cards = [
    inHouseCrews && {
      icon: <TeamIcon />,
      heading: 'Experienced In-House Crews',
      body: 'Our crews are long-term Stowe employees — not subcontractors. You know who is doing the work before they arrive.',
    },
    locallyOwned && {
      icon: <LocalIcon />,
      heading: 'Locally Owned and Operated',
      body: 'Stowe Contracting is based in Monterey Bay and accountable to the communities we serve.',
    },
    mechanicalEquipment && {
      icon: <EquipmentIcon />,
      heading: 'Specialized Equipment',
      body: 'We operate specialized mechanical installation equipment — the right tools to handle projects of any scale.',
    },
    longTermEmployees && {
      icon: <ContinuityIcon />,
      heading: 'Long-Term Employee Continuity',
      body: 'Our workforce continuity means experienced, consistent teams — not rotating crews unfamiliar with your project.',
    },
  ].filter(Boolean) as Array<{ icon: React.ReactNode; heading: string; body: string }>;

  if (cards.length === 0) return null;

  return (
    <ContentSection bg="neutral" aria-label="Why choose Stowe Contracting">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            centered
            subtitle="Nearly 40 years of local experience, backed by the people and equipment to do the work right."
          >
            Built on Local Trust
          </SectionHeading>

          <div
            className={[
              'grid gap-4',
              cards.length >= 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2',
            ].join(' ')}
          >
            {cards.map((card, i) => (
              <TrustSignalCard key={i} icon={card.icon} heading={card.heading} body={card.body} />
            ))}
          </div>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
