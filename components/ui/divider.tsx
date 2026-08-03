// =============================================================================
// DIVIDER
// Horizontal or vertical separator. Semantic <hr> with role="separator".
// =============================================================================

import { cn } from '@/lib/utils';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  /** Accessible label describing what is being separated */
  'aria-label'?: string;
}

export function Divider({
  orientation = 'horizontal',
  className,
  'aria-label': ariaLabel,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={ariaLabel}
        className={cn('w-px self-stretch bg-[var(--color-neutral-200)]', className)}
      />
    );
  }

  return (
    <hr
      aria-label={ariaLabel}
      className={cn('w-full border-0 border-t border-[var(--color-neutral-200)]', className)}
    />
  );
}
