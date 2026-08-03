// =============================================================================
// ICON LINK
// Accessible icon-only (or icon+label) link with VisuallyHidden label support.
// Minimum 44×44 touch target per WCAG 2.2 AA.
// =============================================================================

import Link from 'next/link';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from './visually-hidden';

interface IconLinkProps {
  href: string;
  /** Visible label OR content passed alongside icon */
  children?: ReactNode;
  /** Required accessible label — shown to screen readers only if icon-only */
  label: string;
  /** Whether the label is visually hidden (icon-only mode) */
  labelHidden?: boolean;
  className?: string;
  external?: boolean;
}

/**
 * Accessible icon link. When `labelHidden` is true, the label is
 * rendered via VisuallyHidden for screen readers.
 *
 * @example Icon-only:
 * <IconLink href="/contact" label="Contact us" labelHidden>
 *   <PhoneIcon aria-hidden="true" />
 * </IconLink>
 */
export function IconLink({
  href,
  children,
  label,
  labelHidden = false,
  className,
  external = false,
}: IconLinkProps) {
  const isExternal = external || /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'min-h-[2.75rem] min-w-[2.75rem]', // 44px touch target
        'rounded-[var(--radius-md)]',
        'transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
        className
      )}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={labelHidden ? label : undefined}
    >
      {children}
      {!labelHidden && <span>{label}</span>}
      {labelHidden && <VisuallyHidden>{label}</VisuallyHidden>}
    </Link>
  );
}
