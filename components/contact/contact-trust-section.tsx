// =============================================================================
// CONTACT TRUST SECTION
//
// Trust reinforcement section for the /contact page.
// Communicates local ownership, crew accountability, and established presence
// before a visitor submits a form.
//
// GOVERNANCE:
//   ✅ locally-owned — confirmed
//   ✅ in-house-crews — confirmed
//   ✅ customers-know-crew — confirmed
//   ✅ long-term-employees — confirmed
//   ✅ established-foundation — confirmed
//   ✅ years-in-business — confirmed
//   ❌ Response guarantees — PROHIBITED
//   ❌ Testimonials — BLOCKED (vr-testimonials pending)
//   ❌ Awards / certifications — BLOCKED
//
// Server Component.
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

// ── Trust points ──────────────────────────────────────────────────────────────

interface TrustPoint {
  claimKey: string;
  heading: string;
  fallbackBody: string;
  icon: React.ReactNode;
}

const TRUST_POINTS: TrustPoint[] = [
  {
    claimKey: 'locally-owned',
    heading: 'Locally Owned & Operated',
    fallbackBody:
      'Stowe Contracting is locally owned and operated in the Monterey Bay area. When you call, you reach us — not a call center.',
    icon: (
      <svg
        width="20"
        height="20"
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
    ),
  },
  {
    claimKey: 'customers-know-crew',
    heading: 'You Know Who Does the Work',
    fallbackBody:
      'Our crews are in-house — not subcontracted. The team that starts your project is the team that finishes it.',
    icon: (
      <svg
        width="20"
        height="20"
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
    claimKey: 'long-term-employees',
    heading: 'Long-Term Employee Continuity',
    fallbackBody:
      'Our workforce stays. Long-term employees mean the team working on your project has built real experience with the work they do.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    claimKey: 'established-foundation',
    heading: 'Established Workforce',
    fallbackBody:
      'We operate with an established crew infrastructure — not a rotating roster. Consistent people, consistent results.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

/**
 * Trust section reinforcing why a visitor should feel confident reaching out.
 * All trust points use only confirmed claims.
 * No testimonials, awards, certifications, or response guarantees.
 */
export function ContactTrustSection() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');

  const claimsMap: Partial<Record<string, string | null>> = {
    'locally-owned': resolveControlledClaim('locally-owned'),
    'customers-know-crew': resolveControlledClaim('customers-know-crew'),
    'long-term-employees': resolveControlledClaim('long-term-employees'),
    'established-foundation': resolveControlledClaim('established-foundation'),
  };

  return (
    <ContentSection bg="white" aria-label="Why contact Stowe Contracting" id="trust">
      <PageContainer>
        <div className="flex flex-col gap-12">
          <SectionHeading
            level="h2"
            centered
            subtitle={
              yearsInBusiness
                ? `${yearsInBusiness} — here's what that means when you reach out.`
                : 'An established local team ready to discuss your project.'
            }
          >
            What to Expect
          </SectionHeading>

          {/* Trust grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => {
              // Use claim if confirmed; fall back to static body text
              const claimText = claimsMap[point.claimKey];

              return (
                <div
                  key={point.claimKey}
                  className={[
                    'flex flex-col gap-4',
                    'rounded-[var(--radius-xl)]',
                    'border border-[var(--color-neutral-200)]',
                    'bg-white p-6',
                  ].join(' ')}
                >
                  {/* Icon */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    {point.icon}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm leading-snug font-bold text-[var(--color-brand-secondary)]">
                      {/* Use confirmed claim text as heading supplement if available */}
                      {claimText ?? point.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                      {point.fallbackBody}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Governance note — internal, not rendered to DOM */}
          {/* Testimonials, awards, certifications, response guarantees: BLOCKED */}
        </div>
      </PageContainer>
    </ContentSection>
  );
}
