// =============================================================================
// CTA SECTION — Reusable conversion prompt
//
// Used at the bottom of interior pages to drive estimate conversions.
// Configurable for residential, commercial, or dual CTA.
//
// GOVERNANCE:
//   ✅ request-estimate CTAs — confirmed
//   ✅ years-in-business — confirmed
//   ❌ Success guarantees, performance promises — PROHIBITED
//
// Server Component.
// =============================================================================

import Link from 'next/link';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';

export type CtaSectionVariant = 'dual' | 'residential' | 'commercial';

interface CtaSectionProps {
  variant?: CtaSectionVariant;
  /** Override the heading. Defaults to a governance-safe generic heading. */
  heading?: string;
  /** Override the subheading. Defaults to a governance-safe generic subheading. */
  subheading?: string;
}

/**
 * Reusable CTA section for interior pages.
 * Renders residential, commercial, or dual CTAs from the confirmed CTA registry.
 * Dark background with brand accent.
 */
export function CtaSection({ variant = 'dual', heading, subheading }: CtaSectionProps) {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const residentialCta = resolveControlledMessage('request-estimate', 'residential');
  const commercialCta = resolveControlledMessage('request-estimate', 'commercial');

  const defaultHeading = 'Ready to discuss your project?';
  const defaultSubheading = yearsInBusiness
    ? `${yearsInBusiness} — let's talk about what your project needs.`
    : 'Speak with our team about your concrete project.';

  const resolvedHeading = heading ?? defaultHeading;
  const resolvedSubheading = subheading ?? defaultSubheading;

  return (
    <ContentSection bg="brand-secondary" aria-label="Request a project estimate" id="estimate-cta">
      <PageContainer>
        <div className="flex flex-col items-center gap-8 py-6 text-center">
          {/* Heading */}
          <div className="flex max-w-2xl flex-col gap-4">
            <h2
              className={['text-3xl font-extrabold tracking-tight text-white', 'md:text-4xl'].join(
                ' '
              )}
            >
              {resolvedHeading}
            </h2>
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              {resolvedSubheading}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            {(variant === 'dual' || variant === 'residential') && (
              <Link
                href="/estimate/residential"
                id="cta-section-residential"
                className={[
                  'inline-flex items-center justify-center',
                  'rounded-[var(--radius-md)] px-8 py-4',
                  'bg-[var(--color-brand-primary)] text-white',
                  'text-base font-bold',
                  'hover:bg-[var(--color-brand-primary-dark)]',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                  'shadow-[var(--shadow-brand)]',
                ].join(' ')}
              >
                {residentialCta ?? 'Request a Residential Estimate'}
              </Link>
            )}

            {(variant === 'dual' || variant === 'commercial') && (
              <Link
                href="/estimate/commercial"
                id="cta-section-commercial"
                className={[
                  'inline-flex items-center justify-center gap-2',
                  'rounded-[var(--radius-md)] px-8 py-4',
                  'border border-white/30 text-white',
                  'text-base font-semibold',
                  'hover:border-white/60 hover:bg-white/10',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                ].join(' ')}
              >
                {commercialCta ?? 'Request a Commercial Estimate'}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
