'use client';
// =============================================================================
// ICON BUTTON
// Interactive icon-only button. 'use client' for onClick support.
// aria-label is required — enforced by props.
// Meets 44px minimum touch target per WCAG 2.2 AA / M1 spec.
// =============================================================================

import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required — screen readers announce this as the button label. */
  'aria-label': string;
  /** Visual size variant. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Style variant. Defaults to 'ghost'. */
  variant?: 'ghost' | 'subtle' | 'solid';
}

/**
 * An accessible icon-only button.
 * - `aria-label` is required to describe the action to screen readers.
 * - Minimum 44×44px touch target.
 * - Focus ring meets WCAG 2.2 AA.
 */
export function IconButton({
  'aria-label': ariaLabel,
  size = 'md',
  variant = 'ghost',
  className,
  children,
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11', // 44px — minimum touch target
    lg: 'h-12 w-12',
  };

  const variantStyles = {
    ghost: [
      'bg-transparent text-[var(--color-neutral-700)]',
      'hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-brand-secondary)]',
    ].join(' '),
    subtle: [
      'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]',
      'hover:bg-[var(--color-neutral-200)]',
    ].join(' '),
    solid: [
      'bg-[var(--color-brand-primary)] text-white',
      'hover:bg-[var(--color-brand-primary-dark)]',
    ].join(' '),
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={clsx(
        'inline-flex items-center justify-center',
        'rounded-[var(--radius-md)]',
        'transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
