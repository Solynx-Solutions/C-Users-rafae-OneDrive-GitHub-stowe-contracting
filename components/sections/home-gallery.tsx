import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

const capabilities = [
  ['01', 'Hardscape', 'Paver driveways, outdoor spaces, and mechanical installation.'],
  ['02', 'Construction', 'Construction support and remodeling for connected project scopes.'],
  ['03', 'Sitework', 'Preparation, grading, and underground support.'],
  ['04', 'Local experience', 'Serving the Monterey Bay Area since 1987.'],
] as const;

export function HomeGallery() {
  return (
    <ContentSection bg="neutral" aria-label="Stowe Contracting capabilities" id="our-work">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading level="h2" centered subtitle="The core capabilities Stowe Contracting brings to projects across the Monterey Bay Area.">
            Our Work
          </SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([number, label, description]) => (
              <article key={number} className="min-h-72 rounded-[var(--radius-xl)] bg-[#1D2421] p-8 text-white">
                <span className="text-xs font-bold tracking-[.16em] text-white/45">{number}</span>
                <h3 className="mt-20 text-3xl">{label}</h3>
                <p className="mt-5 text-lg leading-8 text-white/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
