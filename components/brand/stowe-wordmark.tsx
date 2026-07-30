// =============================================================================
// STOWE WORDMARK
// Text-based wordmark — used until approved logo assets are supplied.
// Agent 07 NOTE: No logo asset has been provided. This is a structural
// placeholder. Do not replace with invented imagery.
// =============================================================================

import { cn } from '@/lib/utils';

interface StoweWordmarkProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'text-lg font-bold tracking-tight',
  md: 'text-2xl font-bold tracking-tight',
  lg: 'text-3xl font-bold tracking-tight',
};

/**
 * Brand wordmark rendered as styled text.
 * Replace with <Image> when approved logo asset is supplied.
 *
 * @agent07-pending Awaiting approved logo asset.
 */
export function StoweWordmark({ size = 'md', className }: StoweWordmarkProps) {
  return (
    <span
      className={cn(
        sizeClasses[size],
        'text-[var(--color-brand-secondary)]',
        'font-heading leading-none select-none',
        className
      )}
      aria-label="Stowe Contracting"
    >
      <span className="text-[var(--color-brand-primary)]">STOWE</span> <span>CONTRACTING</span>
    </span>
  );
}
