// =============================================================================
// BADGE
// Small status or label indicator. Used in trust components and nav.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary-dark)]',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  info: 'bg-[var(--color-info)]/10 text-[var(--color-info)]',
  neutral: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold',
        'rounded-full whitespace-nowrap',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
