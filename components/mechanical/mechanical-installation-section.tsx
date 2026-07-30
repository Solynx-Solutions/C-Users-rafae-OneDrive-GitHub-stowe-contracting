// =============================================================================
// MECHANICAL INSTALLATION SECTION
// Displays the confirmed mechanical-equipment claim.
// Server Component.
//
// GOVERNANCE NOTES:
// - "Specialized mechanical installation equipment" — CONFIRMED
// - Equipment names (e.g. "laser screed") — PENDING, not rendered
// - Equipment model numbers — PENDING, not rendered
// - Production rates / sq ft per day — PROHIBITED, never rendered
// - Installation speed comparisons — PROHIBITED, never rendered
// - Precision tolerances — PROHIBITED, never rendered
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';

function EquipmentIcon() {
  return (
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
  );
}

function ScaleIcon() {
  return (
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
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function CrewIcon() {
  return (
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/**
 * Mechanical installation section displaying the confirmed equipment claim.
 * Does not render equipment names, model numbers, performance specs, or
 * any prohibited comparative claims.
 *
 * Returns null if the mechanical-equipment claim is not confirmed+active.
 */
export function MechanicalInstallationSection() {
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const yearsInBusiness = resolveControlledClaim('years-in-business');

  if (!mechanicalEquipment) return null;

  const features = [
    {
      icon: <EquipmentIcon />,
      heading: 'Specialized Equipment',
      body: 'We operate specialized mechanical installation equipment, selected to handle the requirements of projects at both residential and commercial scale.',
    },
    {
      icon: <ScaleIcon />,
      heading: 'Any Project Scale',
      body: 'From individual home projects to large commercial sites, our equipment and crew are sized for the work at hand.',
    },
    {
      icon: <CrewIcon />,
      heading: 'Operated by Our Crew',
      body: yearsInBusiness
        ? `${yearsInBusiness} means our in-house teams have built deep familiarity with the equipment they operate — every time.`
        : 'Our in-house teams bring deep familiarity with the equipment they operate — every time.',
    },
  ];

  return (
    <ContentSection bg="neutral" aria-label="Mechanical installation capabilities">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            subtitle="Stowe operates specialized mechanical installation equipment alongside experienced in-house crews."
          >
            The Right Equipment. The Right Crew.
          </SectionHeading>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((feature, i) => (
              <Card key={i} variant="default" className="flex flex-col gap-4">
                <div
                  className={[
                    'flex h-11 w-11 items-center justify-center',
                    'rounded-[var(--radius-md)]',
                    'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base leading-snug font-semibold text-[var(--color-brand-secondary)]">
                    {feature.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    {feature.body}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Explicit governance block notice — internal, not rendered to DOM */}
          {/* Equipment names, models, production rates, speed comparisons: BLOCKED */}
        </div>
      </PageContainer>
    </ContentSection>
  );
}
