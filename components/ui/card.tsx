// =============================================================================
// CARD
// Flexible content card with consistent border/shadow treatment.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Remove default padding */
  noPadding?: boolean;
  /** Elevation variant */
  variant?: 'default' | 'flat' | 'elevated';
}

const variantClasses = {
  default: 'border border-[var(--color-neutral-200)] shadow-sm',
  flat: 'border border-[var(--color-neutral-200)]',
  elevated: 'shadow-md',
};

export function Card({ children, className, noPadding = false, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] bg-white',
        variantClasses[variant],
        !noPadding && 'p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn('', className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-4 border-t border-[var(--color-neutral-200)] pt-4', className)}>
      {children}
    </div>
  );
}
