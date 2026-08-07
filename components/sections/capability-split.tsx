// =============================================================================
// CAPABILITY SPLIT SECTION
//
// Two-column layout: Residential capability (left) / Commercial capability (right)
//
// GOVERNANCE:
//   ✅ residential-capability — confirmed
//   ✅ commercial-capability — confirmed
//   ✅ in-house-crews — confirmed
//   ❌ Public works / government contracts — BLOCKED (not verified)
//   ❌ Production rates, scale claims — PROHIBITED
//   ❌ Specific project names / client names — BLOCKED (not verified)
//
// The residential panel DOES NOT imply every residential project uses
// mechanical installation. The commercial panel DOES NOT claim public works.
//
// Server Component.
// =============================================================================

import Link from 'next/link';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

interface CapabilityPanel {
  id: string;
  audience: string;
  heading: string;
  description: string;
  points: string[];
  cta: {
    label: string;
    href: string;
    id: string;
  };
  accentColor: 'primary' | 'secondary';
}

/**
 * Residential + Commercial capability split section.
 * Describes what Stowe does for each audience — no scale or public works claims.
 */
export function CapabilitySplit() {
  const residential = resolveControlledClaim('residential-capability');
  const commercial = resolveControlledClaim('commercial-capability');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const residentialCta = resolveControlledMessage('request-estimate', 'residential');
  const commercialCta = resolveControlledMessage('request-estimate', 'commercial');

  const panels: CapabilityPanel[] = [
    {
      id: 'residential-panel',
      audience: residential ?? 'Residential',
      heading: 'Residential Projects',
      description:
        'Stowe serves residential clients across the Monterey Bay area. When the scope and site conditions of a residential project are suited to mechanical installation, our equipment and crew are available for it.',
      points: [
        'Driveways and flatwork',
        'Foundation work',
        'Site preparation',
        'Project planning consultation',
      ],
      cta: {
        label: residentialCta ?? 'Request a Residential Estimate',
        href: '/estimate/residential',
        id: 'capability-residential-cta',
      },
      accentColor: 'primary',
    },
    {
      id: 'commercial-panel',
      audience: commercial ?? 'Commercial',
      heading: 'Commercial Projects',
      description:
        'Stowe has the crew size and equipment to support commercial concrete work. Our in-house teams are structured for commercial project requirements — with the same crew accountability that residential clients expect.',
      points: [
        'Commercial concrete flatwork',
        'Site and parking area work',
        'Foundation construction',
        'Coordinated installation phases',
      ],
      cta: {
        label: commercialCta ?? 'Request a Commercial Estimate',
        href: '/estimate/commercial',
        id: 'capability-commercial-cta',
      },
      accentColor: 'secondary',
    },
  ];

  return (
    <ContentSection
      bg="white"
      aria-label="Residential and commercial capabilities"
      id="capabilities"
    >
      <PageContainer>
        <div className="flex flex-col gap-12">
          <SectionHeading
            level="h2"
            centered
            subtitle={
              inHouseCrews
                ? `${inHouseCrews} available for both residential and commercial projects.`
                : 'Experienced crews serving residential and commercial clients.'
            }
          >
            Who We Serve
          </SectionHeading>

          {/* Split panels */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {panels.map((panel) => (
              <div
                key={panel.id}
                className={[
                  'relative flex flex-col gap-6',
                  'rounded-[var(--radius-xl)]',
                  'border border-[var(--color-neutral-200)]',
                  'bg-white p-8',
                  'hover:border-[var(--color-neutral-300)]',
                  'transition-colors duration-150',
                ].join(' ')}
              >
                {/* Audience badge */}
                <span
                  className={[
                    'inline-flex w-fit items-center',
                    'rounded-full px-3 py-1',
                    'text-xs font-bold tracking-wide uppercase',
                    panel.accentColor === 'primary'
                      ? 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]'
                      : 'bg-[var(--color-brand-secondary)]/10 text-[var(--color-brand-secondary)]',
                  ].join(' ')}
                >
                  {panel.audience}
                </span>

                {/* Heading + description */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-[var(--color-brand-secondary)]">
                    {panel.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    {panel.description}
                  </p>
                </div>

                {/* Capability list */}
                <ul className="flex flex-col gap-2" role="list">
                  {panel.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-[var(--color-neutral-700)]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="mt-0.5 shrink-0 text-[var(--color-brand-primary)]"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto pt-2">
                  <Link
                    href={panel.cta.href}
                    id={panel.cta.id}
                    className={[
                      'inline-flex items-center gap-2',
                      'text-sm font-semibold',
                      panel.accentColor === 'primary'
                        ? 'text-[var(--color-brand-primary)]'
                        : 'text-[var(--color-brand-secondary)]',
                      'hover:underline',
                      'focus-visible:outline-2 focus-visible:outline-offset-2',
                      panel.accentColor === 'primary'
                        ? 'focus-visible:outline-[var(--color-brand-primary)]'
                        : 'focus-visible:outline-[var(--color-brand-secondary)]',
                    ].join(' ')}
                  >
                    {panel.cta.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Governance note — internal, not rendered to DOM */}
          {/* Public works, government contracts, large-scale production claims: BLOCKED */}
        </div>
      </PageContainer>
    </ContentSection>
  );
}
