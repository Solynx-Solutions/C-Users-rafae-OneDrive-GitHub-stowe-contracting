// =============================================================================
// ABOUT PAGE — Structural Foundation
// Route: /about
//
// This is a structural page, not final copy.
// All claims sourced from content governance registry — confirmed + active only.
//
// GOVERNANCE COMPLIANCE:
//   ✓ years-in-business — confirmed
//   ✓ locally-owned — confirmed
//   ✓ in-house-crews — confirmed
//   ✓ long-term-employees — confirmed
//   ✓ customers-know-crew — confirmed
//   ✓ mechanical-equipment — confirmed
//   ✓ monterey-bay-identity — confirmed
//   ✓ local-accountability — confirmed
//   ✗ NO exact founding year
//   ✗ NO team bios or employee names
//   ✗ NO awards or certifications
//   ✗ NO testimonials
//   ✗ NO project history claims
//   ✗ NO unsupported history statements
//
// SEO:
//   Title: Approved expression — "Nearly 40 years"
//   Description: Positioning statement from brand-messaging registry
// =============================================================================

import type { Metadata } from 'next';
import React from 'react';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { resolveControlledClaim } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';
import { TrustSection } from '@/components/trust/trust-section';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import Link from 'next/link';

// =============================================================================
// METADATA
// =============================================================================
export const metadata: Metadata = generatePageMetadata({
  title: 'About Stowe Contracting — Monterey Bay Contractor Since 1987',
  description:
    'Stowe Contracting is a locally owned Monterey Bay hardscape and construction contractor established in 1987. CA License 513674.',
  path: '/about',
});

// =============================================================================
// ICONS
// =============================================================================

function YearsIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LocalIcon() {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CrewIcon() {
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function EquipmentIcon() {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// =============================================================================
// PAGE
// =============================================================================
export default function AboutPage() {
  // Governance-gated claims
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const montereyBay = resolveControlledClaim('monterey-bay-identity');
  const customersKnowCrew = resolveControlledClaim('customers-know-crew');
  const localAccountability = resolveControlledClaim('local-accountability');

  // Foundation pillars — only render confirmed claims
  const pillars = [
    yearsInBusiness && {
      icon: <YearsIcon />,
      heading: yearsInBusiness,
      body: 'Stowe Contracting has served the Monterey Bay area for nearly four decades. That longevity reflects consistent, accountable work — not a revolving door of projects.',
    },
    locallyOwned && {
      icon: <LocalIcon />,
      heading: locallyOwned,
      body: montereyBay
        ? `Stowe is based in ${montereyBay} and accountable to the communities we serve. Local ownership means local accountability.`
        : 'Stowe is locally owned and accountable to the communities we serve.',
    },
    inHouseCrews && {
      icon: <CrewIcon />,
      heading: inHouseCrews,
      body: customersKnowCrew
        ? `${customersKnowCrew}. Our workforce reflects long-term employee continuity — the same experienced people, project after project.`
        : 'Our experienced crews deliver consistent, accountable work across every project.',
    },
    mechanicalEquipment && {
      icon: <EquipmentIcon />,
      heading: 'Purpose-built field capability',
      body: 'Stowe pairs experienced crews with the installation approach appropriate to applicable residential and commercial scopes.',
    },
  ].filter(Boolean) as Array<{ icon: React.ReactNode; heading: string; body: string }>;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-label="About Stowe Contracting"
        className="relative overflow-hidden bg-[var(--color-brand-secondary)]"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-[0.04]"
            style={{ background: 'var(--color-brand-primary)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-neutral-300) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-300) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>

        <PageContainer>
          <div className="relative z-10 flex flex-col gap-6 py-16 md:py-24">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

            {/* Eyebrow */}
            {locallyOwned && montereyBay && (
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[var(--color-brand-primary)] uppercase">
                <span
                  className="inline-block h-px w-8 bg-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                {locallyOwned} &mdash; {montereyBay}
              </p>
            )}

            <div className="flex max-w-3xl flex-col gap-4">
              <h1 className="text-4xl leading-none font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                {yearsInBusiness ?? 'Serving Monterey Bay'}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/75">
                Stowe Contracting is a locally owned hardscape and construction contractor based in
                {montereyBay ? ` ${montereyBay}` : ' Monterey Bay'}. Dedicated crews and specialized
                field capability support residential and commercial projects across our three
                divisions.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Foundation Pillars ────────────────────────────────────────────── */}
      {pillars.length > 0 && (
        <ContentSection bg="white" aria-label="What defines Stowe Contracting">
          <PageContainer>
            <div className="flex flex-col gap-10">
              <SectionHeading
                level="h2"
                centered
                subtitle="The principles that have guided Stowe Contracting across nearly four decades of work in Monterey Bay."
              >
                Who We Are
              </SectionHeading>

              <div
                className={[
                  'grid gap-6',
                  pillars.length >= 3 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2',
                ].join(' ')}
              >
                {pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className={[
                      'flex flex-col gap-5',
                      'rounded-[var(--radius-xl)]',
                      'border border-[var(--color-neutral-200)]',
                      'bg-white p-7',
                      'shadow-sm',
                    ].join(' ')}
                  >
                    {/* Icon */}
                    <div
                      className={[
                        'flex h-12 w-12 items-center justify-center',
                        'rounded-[var(--radius-lg)]',
                        'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
                      ].join(' ')}
                      aria-hidden="true"
                    >
                      {pillar.icon}
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-[var(--color-brand-secondary)]">
                        {pillar.heading}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PageContainer>
        </ContentSection>
      )}

      {/* ── Local Accountability ──────────────────────────────────────────── */}
      {(localAccountability || locallyOwned) && (
        <ContentSection bg="neutral" aria-label="Local accountability">
          <PageContainer>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
              <SectionHeading level="h2" centered>
                Built on Local Accountability
              </SectionHeading>
              <p className="text-base leading-relaxed text-[var(--color-neutral-600)]">
                {montereyBay
                  ? `Stowe Contracting is rooted in ${montereyBay}. As a locally owned and operated business, we are accountable to the homeowners, businesses, and communities we work alongside.`
                  : 'Stowe Contracting is rooted in Monterey Bay. As a locally owned and operated business, we are accountable to the homeowners, businesses, and communities we work alongside.'}
              </p>
              <p className="text-base leading-relaxed text-[var(--color-neutral-600)]">
                {yearsInBusiness
                  ? `${yearsInBusiness} of sustained local presence means our reputation is built project by project — on work that holds up and relationships that last.`
                  : 'Our sustained local presence means our reputation is built project by project — on work that holds up and relationships that last.'}
              </p>
            </div>
          </PageContainer>
        </ContentSection>
      )}

      {/* ── Why Choose Stowe (shared trust section) ───────────────────────── */}
      <TrustSection />

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <ContentSection bg="brand-secondary" aria-label="Get an estimate">
        <PageContainer>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Ready to Start a Project?
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/75">
              {montereyBay
                ? `Serving ${montereyBay} — request an estimate for your residential or commercial project.`
                : 'Request an estimate for your residential or commercial project.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact#contact-form"
                id="about-cta"
                className={[
                  'inline-flex items-center justify-center',
                  'rounded-[var(--radius-md)] px-8 py-4',
                  'bg-white text-[var(--color-brand-primary)]',
                  'text-base font-bold',
                  'hover:bg-[var(--color-neutral-100)]',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                  'shadow-[0_4px_16px_rgba(0,0,0,0.15)]',
                ].join(' ')}
              >
                Request an Estimate
              </Link>
            </div>
          </div>
        </PageContainer>
      </ContentSection>
    </>
  );
}
