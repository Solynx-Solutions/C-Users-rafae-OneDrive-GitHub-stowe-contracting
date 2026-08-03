// =============================================================================
// PATHWAY SECTION
// Residential and Commercial pathway section for homepage.
// Server Component. Claims and CTA text from content governance registry.
//
// GOVERNANCE NOTES:
// - Service names not rendered (vr-service-list blocker)
// - Both residential and commercial capabilities are confirmed
// - CTAs link to /estimate/residential and /estimate/commercial (draft routes)
// =============================================================================

import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { PathwayCard } from './pathway-card';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

function HomeIcon() {
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BuildingIcon() {
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
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

/**
 * Pathway section with residential and commercial cards.
 * Only renders if both capabilities are confirmed+active.
 */
export function PathwaySection() {
  const residentialCapability = resolveControlledClaim('residential-capability');
  const commercialCapability = resolveControlledClaim('commercial-capability');

  const residentialCta = resolveControlledMessage('request-estimate', 'residential');
  const commercialCta = resolveControlledMessage('request-estimate', 'commercial');

  // Both must be confirmed+active to render this section
  if (!residentialCapability || !commercialCapability) return null;

  return (
    <ContentSection bg="white" aria-label="Residential and commercial projects">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            centered
            subtitle="Whether it's your home or a large commercial site, Stowe brings the same experienced crew and proven equipment."
          >
            Projects of Every Scale
          </SectionHeading>

          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            <PathwayCard
              heading="Residential Projects"
              description="Homeowners know who performs their installation. Our experienced crews bring nearly 40 years of local knowledge to every residential project."
              ctaLabel={residentialCta ?? 'Request a Residential Estimate'}
              ctaHref="/estimate/residential"
              icon={<HomeIcon />}
              variant="primary"
            />

            <PathwayCard
              heading="Commercial Projects"
              description="Our specialized mechanical installation equipment and established workforce handle commercial projects with the precision and continuity large sites demand."
              ctaLabel={commercialCta ?? 'Request a Commercial Estimate'}
              ctaHref="/estimate/commercial"
              icon={<BuildingIcon />}
              variant="outline"
            />
          </div>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
