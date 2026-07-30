// =============================================================================
// BUTTON
// Accessible, composable button component using approved brand tokens.
// Server-compatible — no 'use client' needed unless adding interaction.
// =============================================================================

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  /** Full-width button */
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--color-brand-primary)] text-white',
    'hover:bg-[var(--color-brand-primary-dark)]',
    'focus-visible:outline-[var(--color-brand-primary)]',
    'transition-colors duration-150',
  ].join(' '),
  secondary: [
    'bg-[var(--color-brand-secondary)] text-white',
    'hover:bg-[var(--color-brand-secondary-light)]',
    'focus-visible:outline-[var(--color-brand-secondary)]',
    'transition-colors duration-150',
  ].join(' '),
  outline: [
    'border border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] bg-transparent',
    'hover:bg-[var(--color-brand-primary)] hover:text-white',
    'focus-visible:outline-[var(--color-brand-primary)]',
    'transition-colors duration-150',
  ].join(' '),
  ghost: [
    'text-[var(--color-brand-primary)] bg-transparent',
    'hover:bg-[var(--color-brand-primary)]/10',
    'focus-visible:outline-[var(--color-brand-primary)]',
    'transition-colors duration-150',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-[var(--radius-md)] min-h-[2.25rem]',
  md: 'px-6 py-3 text-base rounded-[var(--radius-md)] min-h-[2.75rem]',
  lg: 'px-8 py-4 text-lg rounded-[var(--radius-lg)] min-h-[3.25rem]',
};

/**
 * Accessible button component. Supports all HTML button attributes.
 * Minimum touch target size meets WCAG 2.2 AA (44×44px at md/lg).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center font-semibold',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
}
