// =============================================================================
// MECHANICAL HERO
//
// Hero section for /mechanical-installation page.
// Industrial, cinematic, equipment-driven aesthetic.
//
// GOVERNANCE:
//   ✅ mechanical-equipment claim — confirmed
//   ✅ years-in-business — confirmed
//   ✅ in-house-crews — confirmed
//   ✅ locally-owned — confirmed
//   ❌ Equipment names/models — BLOCKED (pending)
//   ❌ Production rates / speed claims — PROHIBITED
//   ❌ Performance specs — BLOCKED (pending)
//
// Server Component.
// =============================================================================

import Link from 'next/link';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';
import { PageContainer } from '@/components/layout/page-container';

/**
 * Hero section for the mechanical installation capability page.
 * Industrial aesthetic — dark background with geometric structural elements.
 * No equipment names, model numbers, or performance claims.
 */
export function MechanicalHero() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const estimateCta = resolveControlledMessage('request-estimate');

  return (
    <section
      aria-label="Mechanical installation capability overview"
      className="relative overflow-hidden bg-[var(--color-brand-secondary)]"
    >
      {/* ── Structural background geometry ──────────────────────────────── */}
      {/* Decorative — industrial grid pattern, no photography placeholder */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Primary diagonal accent */}
        <div
          className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full opacity-[0.035]"
          style={{ background: 'var(--color-brand-primary)' }}
        />
        {/* Secondary accent */}
        <div
          className="absolute -bottom-32 -left-16 h-[400px] w-[400px] rounded-full opacity-[0.025]"
          style={{ background: 'var(--color-brand-punctuation)' }}
        />

        {/* Industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-neutral-300) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-300) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Technical diagonal line — industrial reference */}
        <div
          className="absolute top-0 right-0 h-full w-px opacity-[0.06]"
          style={{ background: 'var(--color-brand-primary)' }}
        />
        <div
          className="absolute top-0 right-16 h-full w-px opacity-[0.04]"
          style={{ background: 'var(--color-brand-primary)' }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute right-0 bottom-0 left-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-brand-secondary))',
          }}
        />
      </div>

      <PageContainer>
        <div className="relative z-10 flex flex-col gap-10 py-24 md:py-32 lg:py-40">
          {/* ── Capability label ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <p
              className={[
                'inline-flex items-center gap-3',
                'text-xs font-bold tracking-[0.25em] uppercase',
                'text-[var(--color-brand-primary)]',
              ].join(' ')}
            >
              <span
                className="inline-block h-px w-10 bg-[var(--color-brand-primary)]"
                aria-hidden="true"
              />
              {locallyOwned ?? 'Locally Owned & Operated'}
            </p>
          </div>

          {/* ── Heading ───────────────────────────────────────────────────── */}
          <div className="flex max-w-4xl flex-col gap-6">
            <h1
              className={[
                'text-5xl leading-[0.95] font-extrabold tracking-tight text-white',
                'md:text-6xl lg:text-7xl',
              ].join(' ')}
            >
              Built for
              <br />
              <span className="text-[var(--color-brand-primary)]">Demanding</span>
              <br />
              Hardscape
            </h1>

            {/* Primary description */}
            <p
              className={['max-w-2xl text-lg leading-relaxed', 'text-white/70', 'md:text-xl'].join(
                ' '
              )}
            >
              Purpose-built placement capability, operated by{' '}
              {inHouseCrews?.toLowerCase() ?? 'experienced in-house crews'}.
              {yearsInBusiness ? ` ${yearsInBusiness}.` : ''}
            </p>
          </div>

          {/* ── Trust indicators ───────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: inHouseCrews ?? 'In-house crews', icon: 'crew' },
              { label: 'Crew-led execution', icon: 'equipment' },
              {
                label: yearsInBusiness ? `${yearsInBusiness} of experience` : 'Established company',
                icon: 'years',
              },
            ].map((indicator) => (
              <span
                key={indicator.icon}
                className="flex items-center gap-2 text-sm font-medium text-white/60"
              >
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
                {indicator.label}
              </span>
            ))}
          </div>

          {/* ── CTAs ──────────────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact#contact-form"
              id="mechanical-hero-cta"
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
              {estimateCta ?? 'Request an Estimate'}
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
