// =============================================================================
// COMMERCIAL ESTIMATE PAGE
// Route: /estimate/commercial
//
// Commercial inquiry experience for business and contractor projects.
//
// GOVERNANCE COMPLIANCE:
//   ✓ years-in-business — confirmed
//   ✓ locally-owned — confirmed
//   ✓ in-house-crews — confirmed
//   ✓ mechanical-equipment — confirmed
//   ✓ commercial-capability — confirmed
//   ✓ monterey-bay-identity — confirmed
//   ✗ NO public works capability claims
//   ✗ NO government contract claims
//   ✗ NO named clients or project references
//   ✗ NO certifications or bonding claims
//   ✗ NO insurance limit claims
//   ✗ NO specific service capabilities (vr-service-list inactive)
//   ✗ NO contact information (vr-contact-information inactive)
//
// SEO:
//   Title: Approved expression — "Request a Commercial Estimate"
//
// PERFORMANCE:
//   Page shell: Server Component
//   EstimateForm: Client Component (isolated)
//
// =============================================================================

import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { resolveControlledClaim } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { EstimateForm } from '@/components/forms/EstimateForm';
import { type ServiceOption } from '@/components/forms/ProjectDetailsSection';
import { Building2, Cog, Users } from 'lucide-react';

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = generatePageMetadata({
  title: 'Request a Commercial Estimate — Stowe Contracting',
  description:
    'Request a commercial project estimate from Stowe Contracting. Established workforce, specialized mechanical installation equipment, and experienced in-house crews serving Monterey Bay.',
  path: '/estimate/commercial',
});

// =============================================================================
// SERVICE OPTIONS
//
// Structural labels only — no specific commercial service capability claims.
// These are generic commercial project type categories, not confirmations
// of specific capabilities pending vr-service-list verification.
// =============================================================================

const COMMERCIAL_SERVICE_OPTIONS: ServiceOption[] = [
  { value: 'concrete-flatwork', label: 'Concrete Flatwork (slabs, lots, walkways)' },
  { value: 'foundation', label: 'Foundation Work' },
  { value: 'site-preparation', label: 'Site Preparation & Grading' },
  { value: 'retaining-structures', label: 'Retaining Structures' },
  { value: 'mechanical-installation', label: 'Mechanical Installation' },
  { value: 'demolition', label: 'Demolition & Excavation' },
  { value: 'multi-phase', label: 'Multi-Phase / Ongoing Project' },
  { value: 'other', label: 'Other / Not sure yet' },
];

// =============================================================================
// TRUST INDICATORS
// Server Component — reads governance registry
// =============================================================================

function CommercialTrustBar() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');

  const items = [
    yearsInBusiness && { Icon: Building2, text: yearsInBusiness },
    inHouseCrews && { Icon: Users, text: inHouseCrews },
    mechanicalEquipment && { Icon: Cog, text: mechanicalEquipment },
  ].filter(Boolean) as { Icon: typeof Building2; text: string }[];

  if (items.length === 0) return null;

  return (
    <ul
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6"
      aria-label="Why choose Stowe Contracting for commercial projects"
    >
      {items.map(({ Icon, text }) => (
        <li key={text} className="flex items-center gap-2.5 text-sm text-white/75">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#A9C2D9]"
          >
            <Icon className="size-3.5" strokeWidth={1.75} />
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

// =============================================================================
// PAGE
// =============================================================================

export default function CommercialEstimatePage() {
  const montereyBay = resolveControlledClaim('monterey-bay-identity');
  const yearsInBusiness = resolveControlledClaim('years-in-business');

  return (
    <>
      {/* ─── Hero / Intro ─────────────────────────────────────────────── */}
      <ContentSection
        bg="brand-secondary"
        aria-label="Commercial estimate introduction"
        id="estimate-commercial-intro"
      >
        <PageContainer>
          {/* Breadcrumbs */}
          <div className="pb-8">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Commercial Estimate' }]}
              className="[&_a]:text-[var(--color-neutral-300)] [&_a:hover]:text-white [&_li]:text-[var(--color-neutral-400)]"
            />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            {/* Eyebrow */}
            {montereyBay && (
              <p className="mb-4 text-sm font-semibold tracking-widest text-[#A9C2D9] uppercase">
                Serving {montereyBay}
              </p>
            )}

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Request a Commercial Estimate
            </h1>

            {/* Subheading */}
            <p className="mb-8 text-lg leading-relaxed text-white/75">
              {yearsInBusiness
                ? `${yearsInBusiness} — an established workforce and specialized equipment ready for your commercial project.`
                : 'An established workforce and specialized equipment ready for your commercial project.'}
            </p>

            {/* Trust indicators */}
            <div className="flex justify-center">
              <CommercialTrustBar />
            </div>
          </div>
        </PageContainer>
      </ContentSection>

      {/* ─── Form ─────────────────────────────────────────────────────── */}
      <ContentSection
        bg="neutral"
        aria-label="Commercial estimate form"
        id="estimate-commercial-form"
      >
        <PageContainer>
          <div className="mx-auto max-w-2xl">
            {/* Section header */}
            <div className="mb-10">
              <SectionHeading
                level="h2"
                subtitle="Fields marked with * are required. All information is kept confidential and used only to prepare your estimate."
              >
                Project Details
              </SectionHeading>
            </div>

            {/* Form card */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-neutral-200)] bg-white p-8 shadow-sm md:p-10">
              <EstimateForm
                estimateType="commercial"
                serviceOptions={COMMERCIAL_SERVICE_OPTIONS}
                formId="commercial-estimate-form"
              />
            </div>
          </div>
        </PageContainer>
      </ContentSection>

      {/* ─── Commercial qualifications ────────────────────────────────── */}
      <ContentSection bg="white" aria-label="Commercial project capabilities">
        <PageContainer>
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              level="h2"
              centered
              subtitle="Stowe Contracting brings an established workforce and specialized equipment to commercial projects throughout Monterey Bay."
            >
              Built for Commercial Work
            </SectionHeading>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                {
                  heading: 'Experienced In-House Crews',
                  body: 'Our crews are employed directly — not subcontracted. Long-term employment continuity means consistent quality across phases of your project.',
                },
                {
                  heading: 'Specialized Equipment',
                  body: 'We operate specialized mechanical installation equipment suited for commercial-scale work, from site preparation through final installation.',
                },
                {
                  heading: 'Established Local Presence',
                  body: yearsInBusiness
                    ? `${yearsInBusiness}. A track record built project by project in the Monterey Bay area.`
                    : 'A track record built project by project in the Monterey Bay area.',
                },
                {
                  heading: 'Straightforward Process',
                  body: 'We review your project scope, visit the site, and provide a clear path forward — no pressure, no vague commitments.',
                },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-neutral-200)] bg-white p-6"
                >
                  <h3 className="text-base font-bold text-[var(--color-brand-secondary)]">
                    {item.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </ContentSection>
    </>
  );
}
