// =============================================================================
// SITE HEADER
// Sticky site header with brand lockup, primary navigation, and CTA.
// Navigation items are filtered through the governance registry.
// Architecture: Server Component wraps Client MobileNavigation.
// =============================================================================

import { HeaderBrand } from '@/components/brand/header-brand';
import { PrimaryNavItems } from './primary-nav-items';
import { MobileNavigation } from './mobile-navigation';
import { PageContainer } from './page-container';
import { getPublishableNavItems } from '@/data/navigation';
import { resolveControlledMessage } from '@/lib/content';
import Link from 'next/link';

/**
 * Global site header.
 * - Brand lockup links to home
 * - Desktop nav: governed publishable items only
 * - Desktop CTA: "Request an Estimate" (from controlled message registry)
 * - Mobile: hamburger drawer with same items + CTA
 *
 * Contact information is NOT included — pending vr-contact-information blocker.
 */
export function SiteHeader() {
  const navItems = getPublishableNavItems();
  const ctaLabel = resolveControlledMessage('request-estimate') ?? 'Request an Estimate';
  // CTA links to generic /estimate path — specific routes are draft (residential/commercial)
  const ctaHref = '/contact#contact-form';

  return (
    <header
      className={[
        'sticky top-0 z-30 w-full',
        'bg-white/95 backdrop-blur-sm',
        'border-b border-[var(--color-neutral-200)]',
        'shadow-[0_1px_3px_0_rgb(0,0,0,0.06)]',
      ].join(' ')}
      role="banner"
    >
      <PageContainer>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <div className="shrink-0">
            <HeaderBrand />
          </div>

          {/* Desktop nav */}
          {navItems.length > 0 && (
            <nav aria-label="Primary navigation" className="hidden flex-1 justify-center lg:flex">
              <PrimaryNavItems items={navItems} />
            </nav>
          )}

          {/* Desktop CTA */}
          <div className="hidden shrink-0 lg:flex">
            <Link
              href={ctaHref}
              className={[
                'inline-flex items-center justify-center',
                'rounded-[var(--radius-md)] px-5 py-2.5',
                'bg-[var(--color-brand-primary)] text-white',
                'text-sm font-semibold',
                'hover:bg-[var(--color-brand-primary-dark)]',
                'transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                'shadow-[var(--shadow-brand)]',
              ].join(' ')}
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Mobile nav */}
          <MobileNavigation items={navItems} ctaHref={ctaHref} ctaLabel={ctaLabel} />
        </div>
      </PageContainer>
    </header>
  );
}
