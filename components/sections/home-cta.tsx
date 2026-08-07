// =============================================================================
// HOME CTA SECTION
// Final estimate call-to-action section for the homepage.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ request-estimate CTA (generic) — confirmed
//   ✅ request-estimate (residential) — confirmed
//   ✅ request-estimate (commercial) — confirmed
//   ❌ No forms activated yet — links to estimate routes (draft)
// =============================================================================

import Link from 'next/link';
import { resolveControlledMessage } from '@/lib/content';
import { PageContainer } from '@/components/layout/page-container';

/**
 * Final homepage CTA section.
 * Two-path: Residential and Commercial estimates.
 * No forms — links to /estimate routes.
 */
export function HomeCta() {
  const residentialCta =
    resolveControlledMessage('request-estimate', 'residential') ?? 'Request a Residential Estimate';
  const commercialCta =
    resolveControlledMessage('request-estimate', 'commercial') ?? 'Request a Commercial Estimate';

  return (
    <section
      aria-label="Get started with Stowe Contracting"
      className="bg-[var(--color-brand-primary)]"
      id="get-started"
    >
      <PageContainer>
        <div className="flex flex-col items-center gap-8 py-20 text-center md:py-24">
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h2
              className={[
                'text-3xl leading-tight font-extrabold tracking-tight text-white',
                'md:text-4xl lg:text-5xl',
              ].join(' ')}
            >
              Ready to get started?
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Request an estimate for your residential or commercial project. Stowe Contracting —
              locally owned, experienced crews, accountable work.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate/residential"
              id="cta-residential-final"
              className={[
                'inline-flex items-center justify-center',
                'rounded-[var(--radius-md)] px-8 py-4',
                'bg-white text-[var(--color-brand-primary)]',
                'text-base font-bold',
                'hover:bg-[var(--color-neutral-100)]',
                'transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                'shadow-[0_4px_16px_rgba(0,0,0,0.15)]',
              ].join(' ')}
            >
              {residentialCta}
            </Link>

            <Link
              href="/estimate/commercial"
              id="cta-commercial-final"
              className={[
                'inline-flex items-center justify-center',
                'rounded-[var(--radius-md)] px-8 py-4',
                'border-2 border-white/40 text-white',
                'text-base font-bold',
                'hover:border-white hover:bg-white/15',
                'transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
              ].join(' ')}
            >
              {commercialCta}
            </Link>
          </div>

          {/* Trust note */}
          <p className="text-sm text-white/60">
            Serving Monterey Bay — locally owned and operated.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
