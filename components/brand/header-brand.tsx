// =============================================================================
// HEADER BRAND
// Brand lockup for use inside SiteHeader.
// Links to homepage, includes wordmark (and optional mark at small sizes).
// =============================================================================

import Link from 'next/link';
import { BrandLogo } from './brand-logo';

/**
 * Header brand lockup — links to homepage.
 */
export function HeaderBrand() {
  return (
    <Link
      href="/"
      className={[
        'inline-flex items-center gap-2 sm:gap-3',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]',
        'focus-visible:rounded-sm focus-visible:outline-offset-4',
        'transition-opacity hover:opacity-90',
      ].join(' ')}
      aria-label="Stowe Contracting — Home"
    >
      <BrandLogo />
    </Link>
  );
}
