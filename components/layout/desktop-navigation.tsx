// =============================================================================
// DESKTOP NAVIGATION
// Server Component — renders primary nav items on desktop viewports.
// Navigation items must come from the governance registry via
// getPublishableNavItems(). Never hardcode links here.
// =============================================================================

import Link from 'next/link';
import { type NavItem } from '@/types';

interface DesktopNavigationProps {
  items: NavItem[];
}

/**
 * Desktop navigation rendered inside SiteHeader.
 * Hidden on mobile — see MobileNavigation for the mobile counterpart.
 * All items must be pre-filtered through getPublishableNavItems().
 */
export function DesktopNavigation({ items }: DesktopNavigationProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Primary navigation" className="hidden lg:flex">
      <ul role="list" className="flex items-center gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={[
                'inline-flex items-center px-4 py-2',
                'text-sm font-medium text-[var(--color-neutral-700)]',
                'rounded-[var(--radius-md)]',
                'hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-brand-secondary)]',
                'transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
              ].join(' ')}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
