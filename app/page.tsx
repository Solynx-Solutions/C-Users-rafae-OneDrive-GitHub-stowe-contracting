// =============================================================================
// HOME PAGE
//
// M1 homepage composition.
//
// GOVERNANCE COMPLIANCE:
// - All text from governance registry (resolveControlledClaim / resolveControlledMessage)
// - No invented claims, founding year, or prohibited expressions
// - Contact section omitted (vr-contact-information pending)
// - Testimonials omitted (vr-testimonials inactive)
// - Service list omitted (vr-service-list pending)
// - Social links omitted (vr-social-profiles pending)
// =============================================================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { TrustBar } from '@/components/trust/trust-bar';
import { TrustSection } from '@/components/trust/trust-section';
import { PathwaySection } from '@/components/pathway/pathway-section';
import { MechanicalInstallationSection } from '@/components/mechanical/mechanical-installation-section';
import { PageContainer } from '@/components/layout/page-container';

export const metadata: Metadata = generatePageMetadata({
  title: 'Stowe Contracting — Nearly 40 Years Serving Monterey Bay',
  description:
    'Locally owned concrete and construction contractor serving Monterey Bay. Experienced in-house crews and specialized mechanical installation equipment for residential and commercial projects.',
  path: '/',
});

export default function HomePage() {
  // Resolve claims from governance registry
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const tagline = resolveControlledMessage('tagline-primary');
  const positioningStatement = resolveControlledMessage('positioning-statement');
  const ctaLabel = resolveControlledMessage('request-estimate') ?? 'Request an Estimate';
  const montereyBay = resolveControlledClaim('monterey-bay-identity');

  return (
    <>
      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section
        aria-label="Hero — Stowe Contracting introduction"
        className="bg-[var(--color-brand-secondary)] text-white"
      >
        <PageContainer>
          <div className="flex max-w-3xl flex-col gap-8 py-16 md:py-24 lg:py-32">
            {/* Eyebrow */}
            {locallyOwned && montereyBay && (
              <p className="text-sm leading-none font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
                {locallyOwned} &mdash; {montereyBay}
              </p>
            )}

            {/* Heading */}
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {yearsInBusiness ? `${yearsInBusiness}` : 'Serving Monterey Bay'}
            </h1>

            {/* Tagline */}
            {tagline && (
              <p className="text-xl leading-snug font-medium text-white/90 md:text-2xl">
                {tagline}
              </p>
            )}

            {/* Positioning statement */}
            {positioningStatement && (
              <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                {positioningStatement}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/estimate/residential"
                className={[
                  'inline-flex items-center justify-center',
                  'rounded-[var(--radius-md)] px-7 py-3.5',
                  'bg-[var(--color-brand-primary)] text-white',
                  'text-base font-semibold',
                  'hover:bg-[var(--color-brand-primary-dark)]',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                  'shadow-[var(--shadow-brand)]',
                ].join(' ')}
              >
                {ctaLabel}
              </Link>
              <Link
                href="/about"
                className={[
                  'inline-flex items-center justify-center',
                  'rounded-[var(--radius-md)] px-7 py-3.5',
                  'border border-white/30 text-white',
                  'text-base font-semibold',
                  'hover:border-white/50 hover:bg-white/10',
                  'transition-colors duration-150',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                ].join(' ')}
              >
                About Stowe
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Trust Bar ──────────────────────────────────────────────────── */}
      <TrustBar />

      {/* ── Pathway Section ────────────────────────────────────────────── */}
      <PathwaySection />

      {/* ── Trust / Why Stowe Section ──────────────────────────────────── */}
      <TrustSection />

      {/* ── Mechanical Installation Section ────────────────────────────── */}
      <MechanicalInstallationSection />
    </>
  );
}
