// =============================================================================
// WHAT IS MECHANICAL INSTALLATION — Educational explainer section
//
// Purpose: Educate visitors on what mechanical concrete installation is,
//          how it differs from other methods, and why it matters for their project.
//
// GOVERNANCE:
//   ✅ Educational language — no performance claims
//   ❌ "Better / faster / cheapest" — BLOCKED unless verified
//   ❌ Specific equipment names — BLOCKED (pending)
//   ❌ Production rates — PROHIBITED
//
// Server Component.
// =============================================================================

import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

interface ExplainerPoint {
  heading: string;
  body: string;
  icon: React.ReactNode;
}

const points: ExplainerPoint[] = [
  {
    heading: 'What Mechanical Installation Means',
    body: 'Mechanical installation uses specialized equipment to handle concrete placement and finishing operations that would otherwise require additional manual labor. The equipment coordinates with an experienced crew to execute the installation from start to finish.',
    icon: (
      <svg
        width="22"
        height="22"
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
    heading: 'How Equipment Supports the Process',
    body: 'Contractors use different installation methods based on the scope and requirements of each project. Mechanical equipment supports the crew in managing the placement process, and the specific approach is determined by the project site and concrete specifications.',
    icon: (
      <svg
        width="22"
        height="22"
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
    ),
  },
  {
    heading: 'Crew and Equipment Work Together',
    body: "Mechanical equipment doesn't replace the crew — it works with them. Experienced operators and tradespeople work alongside the equipment throughout the installation process. The crew's familiarity with the equipment they operate is what drives the quality of the result.",
    icon: (
      <svg
        width="22"
        height="22"
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
    ),
  },
  {
    heading: 'Project-Specific Decisions',
    body: 'The decision to use mechanical installation depends on the project: site conditions, scale, concrete mix, and the client requirements. Not every project requires mechanical installation — and not every contractor has access to the equipment when it is appropriate.',
    icon: (
      <svg
        width="22"
        height="22"
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
];

/**
 * Educational explainer section — what mechanical installation involves.
 * No performance claims, no equipment names, no "better/faster/cheaper" language.
 */
export function MechanicalExplainer() {
  return (
    <ContentSection bg="white" aria-label="What mechanical installation involves">
      <PageContainer>
        <div className="flex flex-col gap-12">
          <SectionHeading
            level="h2"
            subtitle="Mechanical concrete installation involves specialized equipment and experienced crews working together through each phase of a project."
          >
            What Mechanical Installation Involves
          </SectionHeading>

          {/* 2-column explainer grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {points.map((point, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* Icon accent */}
                <div
                  className={[
                    'flex h-11 w-11 items-center justify-center',
                    'rounded-[var(--radius-md)]',
                    'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {point.icon}
                </div>

                <div className="flex flex-col gap-2">
                  <h3
                    className={[
                      'text-base leading-snug font-bold',
                      'text-[var(--color-brand-secondary)]',
                    ].join(' ')}
                  >
                    {point.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Governance note — internal, not rendered to DOM */}
          {/* Equipment names, performance specs, speed comparisons: BLOCKED */}
        </div>
      </PageContainer>
    </ContentSection>
  );
}
