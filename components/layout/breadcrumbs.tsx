// =============================================================================
// BREADCRUMBS
// Accessible breadcrumb navigation.
// Server Component.
// =============================================================================

import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Accessible breadcrumb navigation using <nav aria-label="Breadcrumb">
 * and structured list with aria-current on the last item.
 *
 * @example
 * <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--color-neutral-500)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.href ?? item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="select-none">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    isLast
                      ? 'font-medium text-[var(--color-neutral-800)]'
                      : 'text-[var(--color-neutral-500)]'
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={[
                    'transition-colors hover:text-[var(--color-brand-primary)]',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]',
                    'focus-visible:rounded-sm focus-visible:outline-offset-2',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
