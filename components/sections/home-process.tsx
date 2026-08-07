// =============================================================================
// HOME PROCESS SECTION
// 4-step visual process framework for the homepage.
// Server Component.
//
// GOVERNANCE NOTES:
//   - No technical specifications
//   - No timeline guarantees
//   - No performance claims
//   - Descriptions are general — approved language only
//   - All step descriptions are factual process descriptions, not marketing claims
// =============================================================================

import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

/** A single process step */
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Planning',
    description:
      'Review the scope, walk the site, and understand the project requirements before any work begins. A clear plan sets up a clean installation.',
    icon: (
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Preparation',
    description:
      'Material sourcing, equipment staging, and crew coordination. Everything and everyone in place before installation starts.',
    icon: (
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
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Installation',
    description:
      'Experienced in-house crews using specialized equipment, handled from start to finish by the same team. No subcontracting surprises.',
    icon: (
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Finished Project',
    description:
      'A completed installation with the crew accountability you expect. The people who started the work are the people who finished it.',
    icon: (
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
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

/**
 * 4-step process section.
 * Describes Stowe's general installation workflow.
 * No technical specs, timeline guarantees, or performance claims.
 */
export function HomeProcess() {
  return (
    <ContentSection bg="neutral" aria-label="Stowe installation process" id="process">
      <PageContainer>
        <div className="flex flex-col gap-12">
          <SectionHeading
            level="h2"
            centered
            subtitle="From site assessment to finished installation — the same experienced crew carries each project through from start to finish."
          >
            How We Work
          </SectionHeading>

          {/* Step grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={[
                  'relative flex flex-col gap-5',
                  'rounded-[var(--radius-xl)]',
                  'border border-[var(--color-neutral-200)]',
                  'bg-white',
                  'p-6',
                ].join(' ')}
              >
                {/* Step connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-10 -right-3 hidden h-px w-6 bg-[var(--color-neutral-200)] lg:block"
                    aria-hidden="true"
                  />
                )}

                {/* Step number */}
                <span
                  className="text-4xl font-extrabold tracking-tight text-[var(--color-brand-primary)]/20"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={[
                    'flex h-11 w-11 items-center justify-center',
                    'rounded-[var(--radius-md)]',
                    'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
                  ].join(' ')}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-[var(--color-brand-secondary)]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
