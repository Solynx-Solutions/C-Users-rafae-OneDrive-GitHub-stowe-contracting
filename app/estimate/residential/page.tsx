// =============================================================================
// RESIDENTIAL ESTIMATE PAGE
// Route: /estimate/residential
//
// Premium homeowner inquiry experience.
//
// GOVERNANCE COMPLIANCE:
//   ✓ years-in-business — confirmed
//   ✓ locally-owned — confirmed
//   ✓ in-house-crews — confirmed
//   ✓ monterey-bay-identity — confirmed
//   ✗ NO guaranteed pricing
//   ✗ NO exact timelines
//   ✗ NO cost savings claims
//   ✗ NO warranties
//   ✗ NO specific service capabilities (vr-service-list inactive)
//   ✗ NO contact information (vr-contact-information inactive)
//   ✗ NO testimonials (vr-testimonials inactive)
//
// SEO:
//   Title: Approved expression — "Request a Residential Estimate"
//   Description: Governance-compliant, no prohibited expressions
//
// PERFORMANCE:
//   Page shell: Server Component
//   EstimateForm: Client Component (isolated — only form is client-side)
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
import { Clock3, MapPin, Users } from 'lucide-react';

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = generatePageMetadata({
  title: 'Request a Residential Estimate — Stowe Contracting',
  description:
    'Request a residential project estimate from Stowe Contracting. Locally owned and operated, serving Monterey Bay with experienced in-house crews.',
  path: '/estimate/residential',
});

// =============================================================================
// SERVICE OPTIONS
//
// Structural labels only — no specific service capability claims.
// Individual service verification (vr-service-list) is still pending.
// These are generic project type categories that describe what homeowners
// commonly request, not claims about what Stowe can or cannot do.
// =============================================================================

const RESIDENTIAL_SERVICE_OPTIONS: ServiceOption[] = [
  { value: 'concrete-flatwork', label: 'Concrete Flatwork (driveways, patios, walkways)' },
  { value: 'concrete-foundation', label: 'Foundation Work' },
  { value: 'retaining-walls', label: 'Retaining Walls' },
  { value: 'site-preparation', label: 'Site Preparation' },
  { value: 'grading', label: 'Grading & Excavation' },
  { value: 'mechanical-installation', label: 'Mechanical Installation' },
  { value: 'other', label: 'Other / Not sure yet' },
];

// =============================================================================
// TRUST INDICATORS
// Server Component — reads governance registry
// =============================================================================

function ResidentialTrustBar() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const inHouseCrews = resolveControlledClaim('in-house-crews');

  const items = [
    yearsInBusiness && { Icon: Clock3, text: yearsInBusiness },
    locallyOwned && { Icon: MapPin, text: locallyOwned },
    inHouseCrews && { Icon: Users, text: inHouseCrews },
  ].filter(Boolean) as { Icon: typeof Clock3; text: string }[];

  if (items.length === 0) return null;

  return (
    <ul
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6"
      aria-label="Why choose Stowe Contracting"
    >
      {items.map(({ Icon, text }) => (
        <li key={text} className="flex items-center gap-2.5 text-sm text-white/75">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--color-brand-accent)]"
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

export default function ResidentialEstimatePage() {
  const montereyBay = resolveControlledClaim('monterey-bay-identity');

  return (
    <>
      {/* ─── Hero / Intro ─────────────────────────────────────────────── */}
      <ContentSection
        bg="brand-secondary"
        aria-label="Residential estimate introduction"
        id="estimate-residential-intro"
      >
        <PageContainer>
          {/* Breadcrumbs */}
          <div className="pb-8">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Residential Estimate' }]}
              className="[&_a]:text-[var(--color-neutral-300)] [&_a:hover]:text-white [&_li]:text-[var(--color-neutral-400)]"
            />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            {/* Eyebrow */}
            {montereyBay && (
              <p className="mb-4 text-sm font-semibold tracking-widest text-[var(--color-brand-accent)] uppercase">
                Serving {montereyBay}
              </p>
            )}

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Request a Residential Estimate
            </h1>

            {/* Subheading */}
            <p className="mb-8 text-lg leading-relaxed text-white/75">
              Tell us about your project. A member of our team will review your request and follow
              up to discuss next steps — no commitment required.
            </p>

            {/* Trust indicators */}
            <div className="flex justify-center">
              <ResidentialTrustBar />
            </div>
          </div>
        </PageContainer>
      </ContentSection>

      {/* ─── Form ─────────────────────────────────────────────────────── */}
      <ContentSection
        bg="neutral"
        aria-label="Residential estimate form"
        id="estimate-residential-form"
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
                estimateType="residential"
                serviceOptions={RESIDENTIAL_SERVICE_OPTIONS}
                formId="residential-estimate-form"
              />
            </div>
          </div>
        </PageContainer>
      </ContentSection>

      {/* ─── Qualifications / What to expect ──────────────────────────── */}
      <ContentSection bg="white" aria-label="What to expect">
        <PageContainer>
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              level="h2"
              centered
              subtitle="We work with homeowners throughout Monterey Bay on projects of every scale."
            >
              What to Expect
            </SectionHeading>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: '1',
                  heading: 'Submit Your Request',
                  body: 'Fill out the form above with your project information. The more detail you provide, the better we can prepare.',
                },
                {
                  step: '2',
                  heading: 'We Review & Follow Up',
                  body: 'Our team reviews your request and may reach out with questions to better understand your project scope.',
                },
                {
                  step: '3',
                  heading: 'Schedule a Consultation',
                  body: 'We schedule a time to visit your site, assess the project, and discuss options with you.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-neutral-200)] bg-white p-6"
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-sm font-bold text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    {item.step}
                  </div>
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
