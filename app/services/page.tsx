// =============================================================================
// SERVICES PAGE — M6 Upgrade
//
// Full service discovery and lead generation experience.
// Rebuilt from M4 holding-state foundation to production-ready index.
//
// Page structure:
//   1. Services Hero
//   2. Residential / Commercial pathway split
//   3. Verified service grid (governance-gated)
//   4. Mechanical installation feature (confirmed capability)
//   5. Estimate CTA
//
// GOVERNANCE:
//   ✅ years-in-business — confirmed
//   ✅ locally-owned — confirmed
//   ✅ in-house-crews — confirmed
//   ✅ mechanical-equipment — confirmed
//   ✅ residential-capability — confirmed
//   ✅ commercial-capability — confirmed
//   ✅ Service grid renders empty state until vr-service-list resolves
//   ❌ No specific service performance claims
//   ❌ No certifications, awards
//   ❌ No guaranteed response times
//   ❌ No service areas beyond "Monterey Bay"
//
// SEO:
//   Title:    Services — Stowe Contracting
//   Canonical: /services
//   Schema:   WebPage, LocalBusiness, BreadcrumbList
//
// PERFORMANCE:
//   All components: Server Components (zero client JS)
// =============================================================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { localBusinessSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema';
import { resolveControlledClaim } from '@/lib/content';

// ── Components ────────────────────────────────────────────────────────────────
import { ServiceGrid } from '@/components/services/service-grid';
import { ServiceCapabilityList } from '@/components/services/service-capability-list';
import { PageContainer } from '@/components/layout/page-container';
import { ContentSection } from '@/components/layout/content-section';
import { SectionHeading } from '@/components/layout/section-heading';

// =============================================================================
// METADATA
// =============================================================================
export const metadata: Metadata = generatePageMetadata({
  title: 'Services',
  description:
    'Stowe Contracting provides hardscape, construction and remodeling, and sitework support across the Monterey Bay area, led by dedicated crews and mechanical installation capability.',
  path: '/services',
});

// =============================================================================
// PAGE
// =============================================================================
export default function ServicesPage() {
  // ── Confirmed claims ───────────────────────────────────────────────────────
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const residentialCapability = resolveControlledClaim('residential-capability');
  const commercialCapability = resolveControlledClaim('commercial-capability');
  const customersKnowCrew = resolveControlledClaim('customers-know-crew');

  // ── Schema ─────────────────────────────────────────────────────────────────
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
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pageSchema, businessSchema, crumbs]) }}
      />

      {/* ── 1. Services Hero ──────────────────────────────────────────────── */}
      <section
        aria-label="Services overview"
        className="bg-[var(--color-brand-secondary)] py-20 md:py-28"
      >
        <PageContainer>
          <div className="flex flex-col gap-8">
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
              <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-white md:text-6xl">
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
              {[inHouseCrews, 'Coordinated field capability', 'Residential & commercial']
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

      {/* ── 2. Residential / Commercial Pathway Split ─────────────────────── */}
      <ContentSection
        bg="white"
        aria-label="Service pathways for residential and commercial clients"
      >
        <PageContainer>
          <div className="flex flex-col gap-10">
            <SectionHeading
              level="h2"
              centered
              subtitle="Whether you're a homeowner or managing a commercial project, our crews are structured to deliver."
            >
              Who We Serve
            </SectionHeading>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Residential */}
              <div
                className={[
                  'flex flex-col gap-5',
                  'rounded-[var(--radius-xl)]',
                  'border border-[var(--color-neutral-200)]',
                  'bg-[var(--color-neutral-50)] p-8',
                ].join(' ')}
              >
                <span className="inline-flex w-fit rounded-full bg-[var(--color-brand-primary)]/10 px-3 py-1 text-[11px] font-bold tracking-wide text-[var(--color-brand-primary)] uppercase">
                  {residentialCapability ?? 'Residential'}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-[var(--color-brand-secondary)]">
                    Home & Property Projects
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    Driveways, flatwork, patios, foundations, and site preparation for residential
                    properties.
                    {customersKnowCrew
                      ? ` ${customersKnowCrew}.`
                      : ' Our in-house crews work on your property directly.'}
                  </p>
                </div>
              </div>

              {/* Commercial */}
              <div
                className={[
                  'flex flex-col gap-5',
                  'rounded-[var(--radius-xl)]',
                  'border border-[var(--color-neutral-200)]',
                  'bg-[var(--color-neutral-50)] p-8',
                ].join(' ')}
              >
                <span className="inline-flex w-fit rounded-full bg-[var(--color-brand-secondary)]/10 px-3 py-1 text-[11px] font-bold tracking-wide text-[var(--color-brand-secondary)] uppercase">
                  {commercialCapability ?? 'Commercial'}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-[var(--color-brand-secondary)]">
                    Commercial & Development Projects
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    Foundations, flatwork, site work, and coordinated placement for commercial
                    properties and development projects.
                    {inHouseCrews
                      ? ` ${inHouseCrews} — structured for commercial project requirements.`
                      : ' Our crews are structured for commercial project requirements.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </ContentSection>

      {/* ── 3. Verified Service Grid ──────────────────────────────────────── */}
      {/* Only confirmed + active services render. Governance-aware empty  */}
      {/* state shown until vr-service-list resolves.                      */}
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

      {/* ── 4. Mechanical Installation Feature ───────────────────────────── */}
      {/* Confirmed general capability — links to authority page.         */}
      {mechanicalEquipment && (
        <ContentSection bg="white" aria-label="Mechanical installation capability">
          <PageContainer>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Left: copy */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-widest text-[var(--color-brand-primary)] uppercase">
                    Specialized Capability
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--color-brand-secondary)] md:text-3xl">
                    {mechanicalEquipment}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    {inHouseCrews
                      ? `${inHouseCrews} operating specialized equipment — available for residential and commercial projects across the Monterey Bay area.`
                      : 'Specialized equipment and experienced crews available for residential and commercial projects across the Monterey Bay area.'}
                  </p>
                </div>

                {/* Confirmed capability highlights */}
                <ServiceCapabilityList
                  highlights={[
                    'Purpose-built placement capability',
                    'In-house crews — not subcontracted',
                    'Residential and commercial applications',
                    'Monterey Bay area service region',
                  ]}
                />

                <Link
                  href="/mechanical-installation"
                  id="services-mechanical-feature-link"
                  className={[
                    'mt-2 inline-flex items-center gap-2',
                    'rounded-[var(--radius-md)] px-6 py-3',
                    'bg-[var(--color-brand-primary)] text-white',
                    'text-sm font-bold',
                    'hover:bg-[var(--color-brand-primary-dark)]',
                    'transition-colors duration-150',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                    'w-fit',
                  ].join(' ')}
                >
                  Explore the Installation Approach
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

              {/* Right: callout card */}
              <div
                className={[
                  'flex flex-col gap-4',
                  'rounded-[var(--radius-xl)]',
                  'border border-[var(--color-brand-primary)]/20',
                  'bg-[var(--color-brand-primary)]/5',
                  'p-8',
                  'self-start',
                ].join(' ')}
              >
                <p className="text-xs font-bold tracking-widest text-[var(--color-brand-primary)] uppercase">
                  Why it matters
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-700)]">
                  Stowe aligns the crew, field tools, and installation plan under one accountable
                  team from preparation through finish.
                </p>
                <p className="text-xs text-[var(--color-neutral-500)]">
                  Available for residential and commercial projects in the Monterey Bay area.
                </p>
              </div>
            </div>
          </PageContainer>
        </ContentSection>
      )}

      {/* ── 5. Estimate CTA ───────────────────────────────────────────────── */}
      <ContentSection bg="neutral" aria-label="Request a project estimate">
        <PageContainer>
          <div className="flex flex-col items-center gap-5 py-6 text-center">
            <h2 className="text-3xl text-[var(--color-brand-secondary)]">Ready to start?</h2>
            <p className="max-w-xl text-[var(--color-neutral-600)]">
              Tell us about the project and our team will direct it to the right division.
            </p>
            <Link
              href="/contact#contact-form"
              className="inline-flex min-h-14 items-center bg-[var(--color-brand-primary)] px-7 font-semibold text-white transition hover:bg-[var(--color-brand-primary-dark)]"
            >
              Request an Estimate
            </Link>
          </div>
        </PageContainer>
      </ContentSection>
    </>
  );
}
