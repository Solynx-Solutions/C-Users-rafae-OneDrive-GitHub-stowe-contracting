// =============================================================================
// CONTACT HERO
//
// Hero section for /contact page.
// Positions Stowe as a local, accessible, experienced partner.
//
// GOVERNANCE:
//   ✅ years-in-business — confirmed
//   ✅ locally-owned — confirmed
//   ✅ in-house-crews — confirmed
//   ✅ local-accountability — confirmed
//   ✅ monterey-bay-identity — confirmed
//   ❌ Response time guarantees — PROHIBITED
//   ❌ Unsupported service areas beyond "Monterey Bay" — BLOCKED
//   ❌ Exact founding year — BLOCKED (chronology policy)
//
// Server Component.
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { PageContainer } from '@/components/layout/page-container';

/**
 * Contact page hero section.
 * Clean, warm, accessible — not cinematic like the mechanical page.
 * Emphasizes local ownership, experienced team, and easy next steps.
 */
export function ContactHero() {
  const yearsInBusiness = resolveControlledClaim('years-in-business');
  const locallyOwned = resolveControlledClaim('locally-owned');
  const localAccountability = resolveControlledClaim('local-accountability');
  const montereyBay = resolveControlledClaim('monterey-bay-identity');

  const trustPoints = [
    locallyOwned,
    localAccountability,
    montereyBay ? `Serving ${montereyBay}` : null,
  ].filter(Boolean) as string[];

  return (
    <section
      aria-label="Contact Stowe Contracting"
      className="bg-[var(--color-brand-secondary)] py-20 md:py-28"
    >
      <PageContainer>
        <div className="flex flex-col gap-8">
          {/* Eyebrow */}
          {locallyOwned && (
            <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[var(--color-brand-primary)] uppercase">
              <span
                className="inline-block h-px w-10 bg-[var(--color-brand-primary)]"
                aria-hidden="true"
              />
              {locallyOwned}
            </p>
          )}

          {/* Heading */}
          <div className="flex max-w-3xl flex-col gap-5">
            <h1
              className={[
                'text-5xl leading-tight font-extrabold tracking-tight text-white',
                'md:text-6xl',
              ].join(' ')}
            >
              Let&apos;s Talk About
              <br />
              <span className="text-[var(--color-brand-primary)]">Your Project</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              {yearsInBusiness
                ? `${yearsInBusiness}. Our team is ready to discuss your residential or commercial project.`
                : 'Our team is ready to discuss your residential or commercial project.'}
            </p>
          </div>

          {/* Trust indicators */}
          {trustPoints.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {trustPoints.map((point) => (
                <span
                  key={point}
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
                  {point}
                </span>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
