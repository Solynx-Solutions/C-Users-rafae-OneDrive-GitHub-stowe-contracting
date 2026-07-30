// =============================================================================
// PRIMARY NAV ITEMS
// Desktop navigation link list. Server Component.
// Items sourced from governance-filtered registry via getPublishableNavItems().
// =============================================================================

import Link from 'next/link';
import { type NavItem } from '@/types';

interface PrimaryNavItemsProps {
  items: NavItem[];
  currentPath?: string;
}

/**
 * Renders desktop navigation links.
 * All items have already been filtered through governance (confirmed+active).
 */
export function PrimaryNavItems({ items, currentPath }: PrimaryNavItemsProps) {
  if (items.length === 0) return null;

  return (
    <ul role="list" className="hidden items-center gap-1 lg:flex">
      {items.map((item) => {
        const isCurrent = currentPath === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
              className={[
                'inline-flex items-center px-4 py-2',
                'rounded-[var(--radius-md)] text-sm font-medium',
                'transition-colors duration-150',
                isCurrent
                  ? 'bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)]'
                  : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-brand-primary)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
              ].join(' ')}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
