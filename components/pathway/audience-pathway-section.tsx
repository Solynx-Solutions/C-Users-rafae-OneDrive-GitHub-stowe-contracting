// =============================================================================
// AUDIENCE PATHWAY SECTION
// Side-by-side residential and commercial pathway cards.
// Server Component.
// =============================================================================

import { ResidentialPathwayCard } from './residential-pathway-card';
import { CommercialPathwayCard } from './commercial-pathway-card';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

/**
 * Dual-audience pathway section.
 * Renders ResidentialPathwayCard and CommercialPathwayCard side by side.
 * Each card independently resolves its claims — silently omits if not publishable.
 */
export function AudiencePathwaySection() {
  return (
    <section aria-label="Residential and commercial pathways" className="section-py">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            subtitle="Whether you're a homeowner or managing a commercial project, Stowe has the crew and equipment for the work."
          >
            Who We Serve
          </SectionHeading>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ResidentialPathwayCard />
            <CommercialPathwayCard />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
