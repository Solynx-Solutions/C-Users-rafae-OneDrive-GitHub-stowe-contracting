// =============================================================================
// MOBILE NAVIGATION
// Client Component — manages open/close state and focus trap.
// Items sourced from governance-filtered registry.
// =============================================================================

'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { type NavItem } from '@/types';
import { FocusBoundary } from '@/components/ui/focus-boundary';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface MobileNavigationProps {
  items: NavItem[];
  /** CTA link for the mobile menu */
  ctaHref: string;
  ctaLabel: string;
}

/**
 * Mobile navigation with accessible hamburger/close toggle.
 * Focus is trapped inside the open menu.
 * Body scroll is locked while menu is open.
 *
 * The CTA (estimate link) is prominently featured in the mobile menu.
 * Only items that are confirmed+active (from governance) are rendered.
 */
export function MobileNavigation({ items, ctaHref, ctaLabel }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Hamburger / Close toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={[
          'inline-flex items-center justify-center',
          'h-11 w-11 rounded-[var(--radius-md)]',
          'text-[var(--color-neutral-700)] hover:text-[var(--color-brand-primary)]',
          'hover:bg-[var(--color-neutral-100)]',
          'transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
        ].join(' ')}
      >
        {isOpen ? (
          // X icon (close)
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Hamburger icon (open)
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" aria-hidden="true" onClick={close} />
      )}

      {/* Drawer */}
      <FocusBoundary
        active={isOpen}
        onEscape={close}
        id="mobile-menu"
        aria-label="Navigation menu"
        className={[
          'fixed inset-y-0 right-0 z-50',
          'w-full max-w-sm',
          'bg-white shadow-xl',
          'flex flex-col',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'hidden translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[var(--color-neutral-200)] px-6 py-5">
          <span className="text-sm font-semibold tracking-widest text-[var(--color-brand-secondary)] uppercase">
            Navigation
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className={[
              'inline-flex h-10 w-10 items-center justify-center',
              'rounded-[var(--radius-md)]',
              'text-[var(--color-neutral-600)] hover:text-[var(--color-brand-primary)]',
              'hover:bg-[var(--color-neutral-100)]',
              'transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
            ].join(' ')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <VisuallyHidden>Close navigation menu</VisuallyHidden>
          </button>
        </div>

        {/* Nav items */}
        {items.length > 0 && (
          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-4">
            <ul role="list" className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={[
                      'flex items-center px-4 py-3',
                      'rounded-[var(--radius-md)] text-base font-medium',
                      'text-[var(--color-neutral-700)] hover:text-[var(--color-brand-primary)]',
                      'hover:bg-[var(--color-neutral-100)]',
                      'transition-colors duration-150',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* CTA */}
        <div className="border-t border-[var(--color-neutral-200)] px-6 py-5">
          <Link
            href={ctaHref}
            onClick={close}
            className={[
              'flex w-full items-center justify-center',
              'rounded-[var(--radius-md)] px-6 py-3.5',
              'bg-[var(--color-brand-primary)] text-white',
              'text-base font-semibold',
              'hover:bg-[var(--color-brand-primary-dark)]',
              'transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
            ].join(' ')}
          >
            {ctaLabel}
          </Link>
        </div>
      </FocusBoundary>
    </div>
  );
}
