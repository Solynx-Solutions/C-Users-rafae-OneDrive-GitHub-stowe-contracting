// =============================================================================
// CONTACT ROUTING SECTION
//
// Directs visitors to the appropriate estimate pathway.
// Residential → /estimate/residential
// Commercial  → /estimate/commercial
//
// GOVERNANCE:
//   ✅ residential-capability — confirmed
//   ✅ commercial-capability — confirmed
//   ✅ request-estimate CTAs — confirmed
//   ❌ Public works / government claims — BLOCKED
//   ❌ Response time guarantees — PROHIBITED
//
// Server Component.
// =============================================================================

import Link from 'next/link';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

// ── Icons ─────────────────────────────────────────────────────────────────────

function HomeIcon() {
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BuildingIcon() {
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
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

/**
 * Project routing section — directs visitors to the correct estimate form.
 * Clear residential / commercial split with governance-verified CTAs.
 */
export function ContactRouting() {
  const residential = resolveControlledClaim('residential-capability');
  const commercial = resolveControlledClaim('commercial-capability');
  const residentialCta = resolveControlledMessage('request-estimate', 'residential');
  const commercialCta = resolveControlledMessage('request-estimate', 'commercial');
  const inHouseCrews = resolveControlledClaim('in-house-crews');

  return (
    <ContentSection bg="neutral" aria-label="Request a project estimate" id="project-routing">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            centered
            subtitle={
              inHouseCrews
                ? `${inHouseCrews} ready for residential and commercial projects.`
                : 'We serve residential and commercial clients across the Monterey Bay area.'
            }
          >
            What Type of Project?
          </SectionHeading>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* ── Residential Panel ──────────────────────────────────────── */}
            <div
              className={[
                'group relative flex flex-col gap-6',
                'rounded-[var(--radius-xl)]',
                'border border-[var(--color-neutral-200)]',
                'bg-white p-8',
                'hover:border-[var(--color-brand-primary)]/40',
                'hover:shadow-[var(--shadow-md)]',
                'transition-all duration-150',
              ].join(' ')}
            >
              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                aria-hidden="true"
              >
                <HomeIcon />
              </div>

              {/* Label */}
              <div className="flex flex-col gap-2">
                <span className="inline-flex w-fit rounded-full bg-[var(--color-brand-primary)]/10 px-3 py-1 text-[11px] font-bold tracking-wide text-[var(--color-brand-primary)] uppercase">
                  {residential ?? 'Residential'}
                </span>
                <h3 className="text-xl font-bold text-[var(--color-brand-secondary)]">
                  Home Projects
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                  Driveways, flatwork, foundations, and site preparation for residential properties.
                  Tell us about your project and we&apos;ll reach out to discuss next steps.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/estimate/residential"
                id="contact-routing-residential"
                className={[
                  'mt-auto inline-flex w-full items-center justify-center',
                  'rounded-[var(--radius-md)] px-6 py-3.5',
                  'bg-[var(--color-brand-primary)] text-white',
                  'text-sm font-bold',
                  'hover:bg-[var(--color-brand-primary-dark)]',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                  'shadow-[var(--shadow-brand)]',
                ].join(' ')}
              >
                {residentialCta ?? 'Request a Residential Estimate'}
              </Link>
            </div>

            {/* ── Commercial Panel ───────────────────────────────────────── */}
            <div
              className={[
                'group relative flex flex-col gap-6',
                'rounded-[var(--radius-xl)]',
                'border border-[var(--color-neutral-200)]',
                'bg-white p-8',
                'hover:border-[var(--color-brand-secondary)]/40',
                'hover:shadow-[var(--shadow-md)]',
                'transition-all duration-150',
              ].join(' ')}
            >
              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-secondary)]/10 text-[var(--color-brand-secondary)]"
                aria-hidden="true"
              >
                <BuildingIcon />
              </div>

              {/* Label */}
              <div className="flex flex-col gap-2">
                <span className="inline-flex w-fit rounded-full bg-[var(--color-brand-secondary)]/10 px-3 py-1 text-[11px] font-bold tracking-wide text-[var(--color-brand-secondary)] uppercase">
                  {commercial ?? 'Commercial'}
                </span>
                <h3 className="text-xl font-bold text-[var(--color-brand-secondary)]">
                  Commercial Projects
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                  Concrete flatwork, foundations, and site work for commercial properties. Our
                  in-house crews are structured for commercial project requirements.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/estimate/commercial"
                id="contact-routing-commercial"
                className={[
                  'mt-auto inline-flex w-full items-center justify-center',
                  'rounded-[var(--radius-md)] px-6 py-3.5',
                  'border border-[var(--color-brand-secondary)]',
                  'text-sm font-bold text-[var(--color-brand-secondary)]',
                  'hover:bg-[var(--color-brand-secondary)] hover:text-white',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-secondary)]',
                ].join(' ')}
              >
                {commercialCta ?? 'Request a Commercial Estimate'}
              </Link>
            </div>
          </div>

          {/* General inquiry note */}
          <p className="text-center text-sm text-[var(--color-neutral-500)]">
            Not sure which applies?{' '}
            <a
              href="#contact-form"
              className="font-semibold text-[var(--color-brand-primary)] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              Use the general contact form
            </a>{' '}
            and we&apos;ll point you in the right direction.
          </p>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
