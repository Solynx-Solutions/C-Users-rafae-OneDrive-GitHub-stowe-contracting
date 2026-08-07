// =============================================================================
// SERVICES PAGE — M4 Foundation
//
// Services directory foundation. Currently shows a governance-aware holding
// state until vr-service-list is resolved and services are activated.
//
// When services are activated:
//   1. Update serviceRegistry.ts — set verificationStatus: 'confirmed',
//      publicationStatus: 'active' for each verified service.
//   2. Update sources.ts — set route-services to publicationStatus: 'active'.
//   3. This page renders the ServiceGrid automatically — no component changes.
//
// GOVERNANCE COMPLIANCE:
//   ✅ No specific service capabilities claimed beyond what's confirmed
//   ✅ Mechanical installation referenced as confirmed general capability
//   ✅ Residential and commercial capability claims — confirmed
//   ✅ No certifications, awards, or performance claims
//   ✅ ServiceGrid renders empty state (no services active yet)
//
// SEO:
//   Title:       Services — Stowe Contracting
//   Description: Governance-approved — no specific service list
//   Schema:      WebPage, LocalBusiness, BreadcrumbList
//
// PERFORMANCE:
//   All components: Server Components (zero client JS in this tree)
// =============================================================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { localBusinessSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';

// ── Components ────────────────────────────────────────────────────────────────
import { ServiceGrid } from '@/components/services/service-grid';
import { PageContainer } from '@/components/layout/page-container';
import { ContentSection } from '@/components/layout/content-section';
import { SectionHeading } from '@/components/layout/section-heading';

// =============================================================================
// METADATA
// =============================================================================
export const metadata: Metadata = generatePageMetadata({
  title: 'Services — Stowe Contracting',
  description:
    'Stowe Contracting offers residential and commercial concrete and construction services in the Monterey Bay area. Nearly 40 years of experience with in-house crews and specialized mechanical installation equipment.',
  path: '/services',
});

// =============================================================================
// PAGE
// =============================================================================
export default function ServicesPage() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const residentialCta = resolveControlledMessage('request-estimate', 'residential');
  const commercialCta = resolveControlledMessage('request-estimate', 'commercial');

  // Schema
  const pageSchema = webPageSchema({
    name: 'Services — Stowe Contracting',
    description:
      'Residential and commercial concrete and construction services in the Monterey Bay area.',
    url: '/services',
  });
  const businessSchema = localBusinessSchema();
  const crumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);

  return (
    <>
      {/* ── JSON-LD structured data ────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pageSchema, businessSchema, crumbs]) }}
      />

      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section
        aria-label="Services overview"
        className="bg-[var(--color-brand-secondary)] py-20 md:py-28"
      >
        <PageContainer>
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            {locallyOwned && (
              <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[var(--color-brand-primary)] uppercase">
                <span
                  className="inline-block h-px w-10 bg-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                {locallyOwned}
              </p>
            )}

            {/* Heading */}
            <div className="flex max-w-3xl flex-col gap-4">
              <h1
                className={[
                  'text-5xl leading-tight font-extrabold tracking-tight text-white',
                  'md:text-6xl',
                ].join(' ')}
              >
                What We Do
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/70">
                {yearsInBusiness
                  ? `${yearsInBusiness}. Concrete and construction work for residential and commercial clients across the Monterey Bay area.`
                  : 'Concrete and construction work for residential and commercial clients in the Monterey Bay area.'}
              </p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6">
              {[inHouseCrews, mechanicalEquipment, 'Residential & commercial']
                .filter(Boolean)
                .map((signal) => (
                  <span
                    key={signal}
                    className="flex items-center gap-2 text-sm font-medium text-white/60"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {signal}
                  </span>
                ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Service Grid ─────────────────────────────────────────────────── */}
      {/* Renders confirmed + active services only. Empty state shown until   */}
      {/* vr-service-list resolves and services are activated.                */}
      <ContentSection bg="neutral" aria-label="Available services">
        <PageContainer>
          <div className="flex flex-col gap-10">
            <SectionHeading
              level="h2"
              subtitle="We work with residential and commercial clients on concrete and construction projects across the Monterey Bay area."
            >
              Our Services
            </SectionHeading>
            <ServiceGrid />
          </div>
        </PageContainer>
      </ContentSection>

      {/* ── Mechanical Installation Feature ──────────────────────────────── */}
      {/* Confirmed general capability — links to authority page */}
      {mechanicalEquipment && (
        <ContentSection bg="white" aria-label="Mechanical installation capability">
          <PageContainer>
            <div
              className={[
                'flex flex-col gap-6 md:flex-row md:items-center md:justify-between',
                'rounded-[var(--radius-xl)]',
                'border border-[var(--color-brand-primary)]/20',
                'bg-[var(--color-brand-primary)]/5',
                'px-8 py-8',
              ].join(' ')}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[var(--color-brand-secondary)]">
                  {mechanicalEquipment}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-[var(--color-neutral-600)]">
                  {inHouseCrews
                    ? `${inHouseCrews} operating specialized equipment — available for residential and commercial projects.`
                    : 'Specialized equipment and experienced crews available for residential and commercial projects.'}
                </p>
              </div>
              <Link
                href="/mechanical-installation"
                id="services-mechanical-link"
                className={[
                  'inline-flex shrink-0 items-center gap-2',
                  'rounded-[var(--radius-md)] px-6 py-3',
                  'bg-[var(--color-brand-primary)] text-white',
                  'text-sm font-bold',
                  'hover:bg-[var(--color-brand-primary-dark)]',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                ].join(' ')}
              >
                Learn About Mechanical Installation
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
          </PageContainer>
        </ContentSection>
      )}

      {/* ── Estimate CTAs ─────────────────────────────────────────────────── */}
      <ContentSection bg="neutral" aria-label="Request a project estimate">
        <PageContainer>
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex max-w-xl flex-col gap-3">
              <h2 className="text-2xl font-bold text-[var(--color-brand-secondary)] md:text-3xl">
                Ready to get started?
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                Request an estimate for your residential or commercial project.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/estimate/residential"
                id="services-cta-residential"
                className={[
                  'inline-flex items-center justify-center',
                  'rounded-[var(--radius-md)] px-8 py-4',
                  'bg-[var(--color-brand-primary)] text-white',
                  'text-base font-bold',
                  'hover:bg-[var(--color-brand-primary-dark)]',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                  'shadow-[var(--shadow-brand)]',
                ].join(' ')}
              >
                {residentialCta ?? 'Request a Residential Estimate'}
              </Link>
              <Link
                href="/estimate/commercial"
                id="services-cta-commercial"
                className={[
                  'inline-flex items-center justify-center gap-2',
                  'rounded-[var(--radius-md)] px-8 py-4',
                  'border border-[var(--color-neutral-300)] text-[var(--color-brand-secondary)]',
                  'text-base font-semibold',
                  'hover:border-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)]',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-secondary)]',
                ].join(' ')}
              >
                {commercialCta ?? 'Request a Commercial Estimate'}
              </Link>
            </div>
          </div>
        </PageContainer>
      </ContentSection>
    </>
  );
}
