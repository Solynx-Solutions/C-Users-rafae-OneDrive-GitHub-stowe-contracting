// =============================================================================
// NOTICE
// Informational/warning/error banner. Accessibility-safe with role="alert"
// for urgent messages.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type NoticeVariant = 'info' | 'warning' | 'error' | 'success' | 'neutral';

interface NoticeProps {
  children: ReactNode;
  variant?: NoticeVariant;
  /** Use role="alert" for urgent notices that should be announced immediately. */
  urgent?: boolean;
  className?: string;
  /** Optional title rendered as a heading */
  title?: string;
}

const variantClasses: Record<NoticeVariant, string> = {
  info: 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30 text-[var(--color-neutral-800)]',
  warning:
    'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-neutral-800)]',
  error:
    'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-neutral-800)]',
  success:
    'bg-[var(--color-success)]/10 border-[var(--color-success)]/30 text-[var(--color-neutral-800)]',
  neutral:
    'bg-[var(--color-neutral-100)] border-[var(--color-neutral-200)] text-[var(--color-neutral-800)]',
};

export function Notice({
  children,
  variant = 'info',
  urgent = false,
  className,
  title,
}: NoticeProps) {
  return (
    <div
      role={urgent ? 'alert' : 'note'}
      className={cn(
        'rounded-[var(--radius-md)] border px-4 py-3',
        variantClasses[variant],
        className
      )}
    >
      {title && <p className="mb-1 text-sm font-semibold">{title}</p>}
      <div className="text-sm">{children}</div>
    </div>
  );
}
