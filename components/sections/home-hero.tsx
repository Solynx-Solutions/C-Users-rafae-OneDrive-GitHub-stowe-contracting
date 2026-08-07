// =============================================================================
// HOME HERO SECTION
// Primary hero for the Stowe Contracting homepage.
// Server Component — no client JS required.
//
// GOVERNANCE NOTES:
//   ✅ years-in-business → "Nearly 40 years serving Monterey Bay"
//   ✅ tagline-primary → "Local people. Experienced crews. Accountable work."
//   ✅ positioning-statement
//   ✅ locally-owned, monterey-bay-identity
//   ✅ request-estimate CTA
//   ❌ No founding year, no exact employee count, no certifications
//
// MEDIA SLOT:
//   Hero background image slot reserved for client photography.
//   Current: CSS geometric pattern on dark background.
//   Replace: Set background-image when /images/hero-bg.jpg is delivered.
// =============================================================================

import Link from 'next/link';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { PageContainer } from '@/components/layout/page-container';

/**
 * Home page hero section.
 * Positions Stowe as established, local, experienced, and equipment-capable.
 * All content from governance registry. No invented claims.
 */
export function HomeHero() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const yearsShort = resolveControlledClaim('years-experience-short');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const montereyBay = resolveControlledClaim('monterey-bay-identity');
  const tagline = resolveControlledMessage('tagline-primary');
  const positioningStatement = resolveControlledMessage('positioning-statement');
  const ctaLabel = resolveControlledMessage('request-estimate') ?? 'Request an Estimate';
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const inHouseCrews = resolveControlledClaim('in-house-crews');

  // Build the hero heading from confirmed claims
  const heroHeading = yearsInBusiness ?? 'Serving Monterey Bay';

  return (
    <section
      aria-label="Stowe Contracting — established local contractor"
      className="relative overflow-hidden bg-[var(--color-brand-secondary)]"
    >
      {/* ── CSS geometric background pattern ──────────────────────────────── */}
      {/* Decorative only. Replace with hero photography when available. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large diagonal accent */}
        <div
          className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'var(--color-brand-primary)' }}
        />
        <div
          className="absolute -bottom-48 -left-24 h-[500px] w-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'var(--color-brand-accent)' }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-neutral-300) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-300) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Gradient fade at bottom */}
        <div
          className="absolute right-0 bottom-0 left-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-brand-secondary))',
          }}
        />
      </div>

      <PageContainer>
        <div className="relative z-10 flex flex-col gap-8 py-20 md:py-28 lg:py-36">
          {/* ── Eyebrow ─────────────────────────────────────────────────── */}
          {locallyOwned && montereyBay && (
            <p
              className={[
                'inline-flex items-center gap-2',
                'text-xs font-bold tracking-[0.2em] uppercase',
                'text-[var(--color-brand-primary)]',
              ].join(' ')}
            >
              <span
                className="inline-block h-px w-8 bg-[var(--color-brand-primary)]"
                aria-hidden="true"
              />
              {locallyOwned} &mdash; {montereyBay}
            </p>
          )}

          {/* ── Hero Heading ─────────────────────────────────────────────── */}
          <div className="flex max-w-4xl flex-col gap-4">
            <h1
              className={[
                'text-5xl leading-none font-extrabold tracking-tight text-white',
                'md:text-6xl lg:text-7xl',
              ].join(' ')}
            >
              {heroHeading}
            </h1>

            {/* Tagline */}
            {tagline && (
              <p
                className={[
                  'text-xl leading-snug font-semibold',
                  'text-[var(--color-brand-primary)]',
                  'md:text-2xl',
                ].join(' ')}
              >
                {tagline}
              </p>
            )}
          </div>

          {/* ── Positioning Statement ────────────────────────────────────── */}
          {positioningStatement && (
            <p
              className={[
                'max-w-2xl text-base leading-relaxed',
                'text-white/75',
                'md:text-lg',
              ].join(' ')}
            >
              {positioningStatement}
            </p>
          )}

          {/* ── Trust signals ────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {yearsShort && (
              <span className="flex items-center gap-2 text-sm text-white/60">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {yearsShort} of experience
              </span>
            )}
            {inHouseCrews && (
              <span className="flex items-center gap-2 text-sm text-white/60">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {inHouseCrews}
              </span>
            )}
            {mechanicalEquipment && (
              <span className="flex items-center gap-2 text-sm text-white/60">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {mechanicalEquipment}
              </span>
            )}
          </div>

          {/* ── CTAs ─────────────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/estimate/residential"
              id="hero-cta-estimate"
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
              {ctaLabel}
            </Link>

            <Link
              href="/about"
              id="hero-cta-about"
              className={[
                'inline-flex items-center justify-center gap-2',
                'rounded-[var(--radius-md)] px-8 py-4',
                'border border-white/25 text-white',
                'text-base font-semibold',
                'hover:border-white/50 hover:bg-white/10',
                'transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
              ].join(' ')}
            >
              About Stowe
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
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
