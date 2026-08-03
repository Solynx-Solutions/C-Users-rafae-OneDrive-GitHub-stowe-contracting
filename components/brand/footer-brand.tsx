// =============================================================================
// FOOTER BRAND
// Brand lockup for use inside SiteFooter.
// Slightly smaller than header — includes wordmark and optional tagline.
// =============================================================================

import Link from 'next/link';
import { StoweWordmark } from './stowe-wordmark';
import { resolveControlledMessage } from '@/lib/content';

/**
 * Footer brand lockup with approved positioning statement.
 * Tagline sourced from controlled message registry — does not render
 * if not confirmed+active.
 */
export function FooterBrand() {
  const positioningStatement = resolveControlledMessage('positioning-statement');

  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/"
        className={[
          'inline-flex items-center',
          'focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]',
          'focus-visible:rounded-sm focus-visible:outline-offset-4',
          'w-fit transition-opacity hover:opacity-90',
        ].join(' ')}
        aria-label="Stowe Contracting — Home"
      >
        <StoweWordmark size="sm" />
      </Link>

      {positioningStatement && (
        <p className="max-w-xs text-sm leading-relaxed text-[var(--color-neutral-500)]">
          {positioningStatement}
        </p>
      )}
    </div>
  );
}
