// =============================================================================
// TEXT LINK
// Accessible inline link with brand styling and external-link support.
// =============================================================================

import Link from 'next/link';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Override link appearance */
  variant?: 'default' | 'subtle' | 'nav';
  /** Opens in a new tab with proper rel attributes */
  external?: boolean;
  /** aria-label for accessibility */
  'aria-label'?: string;
}

const variantClasses = {
  default:
    'text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-primary-dark)]',
  subtle:
    'text-[var(--color-neutral-600)] hover:text-[var(--color-brand-primary)] underline underline-offset-2',
  nav: 'text-[var(--color-neutral-700)] hover:text-[var(--color-brand-primary)] font-medium',
};

/**
 * Accessible text link. Use for inline body copy links.
 * Automatically applies noopener/noreferrer for external links.
 */
export function TextLink({
  href,
  children,
  className,
  variant = 'default',
  external = false,
  'aria-label': ariaLabel,
}: TextLinkProps) {
  const isExternal = external || /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={cn(
        'transition-colors duration-150',
        'focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
        variantClasses[variant],
        className
      )}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
