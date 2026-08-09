// =============================================================================
// SERVICE EMPTY STATE
//
// Renders when no services are confirmed + active.
// Used inside ServiceGrid and on the /services page.
//
// GOVERNANCE:
//   Does not expose internal status language to visitors.
//   Directs them to the estimate forms instead.
//
// Supports two variants:
//   'grid'   — compact, fits inside a grid section (default)
//   'page'   — larger, center-page empty state
//
// Server Component.
// =============================================================================

import Link from 'next/link';

interface ServiceEmptyStateProps {
  variant?: 'grid' | 'page';
  /** Custom message. Defaults to governance-safe message. */
  message?: string;
}

/**
 * Empty state for the service grid or service index.
 * Renders when no confirmed+active services exist.
 * Directs visitor to estimate forms without revealing governance status.
 */
export function ServiceEmptyState({ variant = 'grid', message }: ServiceEmptyStateProps) {
  const isPage = variant === 'page';

  return (
    <div
      className={[
        'flex flex-col items-center gap-6 text-center',
        'rounded-[var(--radius-xl)]',
        'border border-dashed border-[var(--color-neutral-300)]',
        isPage ? 'px-8 py-24' : 'px-8 py-16',
      ].join(' ')}
      aria-label="Service pages being prepared"
    >
      {/* Icon */}
      <svg
        width={isPage ? '40' : '32'}
        height={isPage ? '40' : '32'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[var(--color-neutral-400)]"
        aria-hidden="true"
      >
        <path d="M2 20h20" />
        <path d="M5 20V10l7-7 7 7v10" />
        <path d="M9 20v-5h6v5" />
      </svg>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <p
          className={[
            'font-semibold text-[var(--color-neutral-700)]',
            isPage ? 'text-base' : 'text-sm',
          ].join(' ')}
        >
          {message ?? 'Service pages are being prepared.'}
        </p>
        <p className="text-xs text-[var(--color-neutral-400)]">
          Use the links below to request a project estimate.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/estimate/residential"
          id="service-empty-state-residential"
          className={[
            'inline-flex items-center gap-2',
            'rounded-[var(--radius-md)] px-5 py-2.5',
            'bg-[var(--color-brand-primary)] text-white',
            'text-sm font-bold',
            'hover:bg-[var(--color-brand-primary-dark)]',
            'transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
          ].join(' ')}
        >
          Residential Estimate
        </Link>
        <Link
          href="/estimate/commercial"
          id="service-empty-state-commercial"
          className={[
            'inline-flex items-center gap-2',
            'rounded-[var(--radius-md)] px-5 py-2.5',
            'border border-[var(--color-brand-secondary)]',
            'text-sm font-bold text-[var(--color-brand-secondary)]',
            'hover:bg-[var(--color-brand-secondary)] hover:text-white',
            'transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-secondary)]',
          ].join(' ')}
        >
          Commercial Estimate
        </Link>
      </div>
    </div>
  );
}
