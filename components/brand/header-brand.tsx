// =============================================================================
// HEADER BRAND
// Brand lockup for use inside SiteHeader.
// Links to homepage, includes wordmark (and optional mark at small sizes).
// =============================================================================

import Link from 'next/link';
import { StoweWordmark } from './stowe-wordmark';
import { BrandMark } from './brand-mark';

/**
 * Header brand lockup — links to homepage.
 * Composed of BrandMark + StoweWordmark.
 */
export function HeaderBrand() {
  return (
    <Link
      href="/"
      className={[
        'inline-flex items-center gap-3',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]',
        'focus-visible:rounded-sm focus-visible:outline-offset-4',
        'transition-opacity hover:opacity-90',
      ].join(' ')}
      aria-label="Stowe Contracting — Home"
    >
      <BrandMark size={36} />
      <StoweWordmark size="md" />
    </Link>
  );
}
