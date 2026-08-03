// =============================================================================
// TRUST BAR
// Section displaying confirmed trust indicators in a horizontal layout.
// All displayed claims sourced from content governance registry.
// Server Component.
//
// GOVERNANCE NOTES:
// - Only confirmed + active claims render.
// - Certifications, awards, safety statistics are PENDING — not rendered.
// - Testimonials are INACTIVE — not rendered.
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { TrustIndicatorItem } from './trust-indicator-item';
import { PageContainer } from '@/components/layout/page-container';

// SVG icons (inline — no import needed, no framer-motion)
function YearsIcon() {
  return (
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TeamIcon() {
  return (
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LocalIcon() {
  return (
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CrewIcon() {
  return (
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

/**
 * Trust bar displaying up to 4 confirmed trust indicators.
 * Each claim resolves through the governance registry.
 * Returns null if no claims are publishable.
 *
 * Pending/inactive claims are silently omitted.
 */
export function TrustBar() {
  // Resolve each confirmed claim — returns null if not publishable
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const employeeCount = resolveControlledClaim('employee-count');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const inHouseCrews = resolveControlledClaim('in-house-crews');

  // Build indicator list — only include publishable claims
  const indicators = [
    yearsInBusiness && {
      icon: <YearsIcon />,
      value: 'Nearly 40 Years',
      label: 'Serving Monterey Bay',
    },
    employeeCount && {
      icon: <TeamIcon />,
      value: '30+',
      label: 'Experienced employees',
    },
    locallyOwned && {
      icon: <LocalIcon />,
      value: 'Locally Owned',
      label: 'Operated in Monterey Bay',
    },
    inHouseCrews && {
      icon: <CrewIcon />,
      value: 'In-House Crews',
      label: 'Every project, our team',
    },
  ].filter(Boolean) as Array<{ icon: React.ReactNode; value: string; label: string }>;

  if (indicators.length === 0) return null;

  return (
    <section
      aria-label="Why choose Stowe Contracting"
      className="border-b border-[var(--color-neutral-200)] bg-white"
    >
      <PageContainer>
        <div
          className={[
            'grid gap-px bg-[var(--color-neutral-200)]',
            indicators.length === 4
              ? 'grid-cols-2 md:grid-cols-4'
              : indicators.length === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-2',
          ].join(' ')}
        >
          {indicators.map((indicator, i) => (
            <div key={i} className="bg-white">
              <TrustIndicatorItem
                icon={indicator.icon}
                value={indicator.value}
                label={indicator.label}
              />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
