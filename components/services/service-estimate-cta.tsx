// =============================================================================
// SERVICE ESTIMATE CTA
//
// Estimate call-to-action section for service pages.
// Renders residential and/or commercial estimate links based on the
// service's audience field.
//
// GOVERNANCE:
//   - Does not imply every service is available to both audiences
//   - Audience-driven: residential-only services only show residential CTA
//   - Uses confirmed controlled messages from brand-messaging system
//
// Server Component.
// =============================================================================

import Link from 'next/link';
import { type ServiceAudience } from '@/content/serviceRegistry';
import { resolveControlledMessage } from '@/lib/content';

interface ServiceEstimateCtaProps {
  audience: ServiceAudience;
  /** Override the heading. Defaults to "Ready to get started?" */
  heading?: string;
  /** Override the subtext. */
  subtitle?: string;
  /** ID prefix for e2e targeting. */
  idPrefix?: string;
}

/**
 * Audience-aware estimate CTA for service pages.
 * Only shows residential, commercial, or both CTAs based on service audience.
 * Does not show CTAs for audiences the service doesn't serve.
 */
export function ServiceEstimateCta({
  audience,
  heading = 'Ready to get started?',
  subtitle,
  idPrefix = 'service',
}: ServiceEstimateCtaProps) {
  const residentialCta = resolveControlledMessage('request-estimate', 'residential');
  const commercialCta = resolveControlledMessage('request-estimate', 'commercial');

  const showResidential = audience === 'residential' || audience === 'both';
  const showCommercial = audience === 'commercial' || audience === 'both';

  return (
    <section
      className={[
        'flex flex-col items-center gap-8 text-center',
        'rounded-[var(--radius-xl)]',
        'border border-[var(--color-neutral-200)]',
        'bg-[var(--color-brand-primary)]/5',
        'px-8 py-12',
      ].join(' ')}
      aria-label="Request an estimate"
    >
      <div className="flex max-w-xl flex-col gap-3">
        <h2 className="text-2xl font-bold text-[var(--color-brand-secondary)] md:text-3xl">
          {heading}
        </h2>
        {subtitle && (
          <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">{subtitle}</p>
        )}
        {!subtitle && (
          <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
            Request an estimate for your{' '}
            {audience === 'both'
              ? 'residential or commercial'
              : audience === 'residential'
                ? 'residential'
                : 'commercial'}{' '}
            project.
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {showResidential && (
          <Link
            href="/estimate/residential"
            id={`${idPrefix}-cta-residential`}
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

        {showCommercial && (
          <Link
            href="/estimate/commercial"
            id={`${idPrefix}-cta-commercial`}
            className={[
              'inline-flex items-center justify-center gap-2',
              'rounded-[var(--radius-md)] px-8 py-4',
              'border border-[var(--color-neutral-300)] text-[var(--color-brand-secondary)]',
              'text-base font-semibold',
              'hover:border-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)]',
              'transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-secondary)]',
            ].join(' ')}
          >
            {commercialCta ?? 'Request a Commercial Estimate'}
          </Link>
        )}
      </div>
    </section>
  );
}
