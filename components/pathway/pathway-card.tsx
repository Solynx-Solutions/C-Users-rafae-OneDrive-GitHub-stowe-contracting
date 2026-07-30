// =============================================================================
// PATHWAY CARD
// Residential / Commercial pathway card with CTA.
// Server Component. Claims and CTA text from content governance registry.
//
// GOVERNANCE NOTES:
// - Service names not rendered (vr-service-list blocker)
// - Warranty terms not rendered (prohibited)
// - Public works capability not rendered (pending)
// =============================================================================

import Link from 'next/link';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PathwayCardProps {
  /** Section heading */
  heading: string;
  /** Supporting description — must come from governance-approved content */
  description: string;
  /** CTA text — must come from resolveControlledMessage */
  ctaLabel: string;
  /** CTA link href */
  ctaHref: string;
  /** Decorative icon */
  icon: ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'outline';
  className?: string;
}

/**
 * Pathway card for residential or commercial audience targeting.
 * All text content must originate from the governance registry.
 */
export function PathwayCard({
  heading,
  description,
  ctaLabel,
  ctaHref,
  icon,
  variant = 'outline',
  className,
}: PathwayCardProps) {
  const isPrimary = variant === 'primary';

  return (
    <article
      className={cn(
        'relative flex flex-col gap-6 rounded-[var(--radius-xl)] p-8',
        'border',
        isPrimary
          ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white'
          : 'border-[var(--color-neutral-200)] bg-white',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)]',
          isPrimary
            ? 'bg-white/15 text-white'
            : 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]'
        )}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3">
        <h3
          className={cn(
            'text-xl leading-snug font-bold',
            isPrimary ? 'text-white' : 'text-[var(--color-brand-secondary)]'
          )}
        >
          {heading}
        </h3>
        <p
          className={cn(
            'text-sm leading-relaxed',
            isPrimary ? 'text-white/85' : 'text-[var(--color-neutral-600)]'
          )}
        >
          {description}
        </p>
      </div>

      {/* CTA */}
      <Link
        href={ctaHref}
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-[var(--radius-md)] px-6 py-3',
          'text-sm font-semibold',
          'transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          isPrimary
            ? 'bg-white text-[var(--color-brand-primary)] hover:bg-[var(--color-neutral-100)] focus-visible:outline-white'
            : 'bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-dark)] focus-visible:outline-[var(--color-brand-primary)]',
          'w-fit'
        )}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
