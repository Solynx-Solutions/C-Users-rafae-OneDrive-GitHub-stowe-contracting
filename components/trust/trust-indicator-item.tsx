// =============================================================================
// TRUST INDICATOR ITEM
// Renders a single trust indicator with icon, value, and label.
// Server Component. All claims sourced from content governance registry.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TrustIndicatorItemProps {
  /** Icon element (lucide-react or SVG) */
  icon: ReactNode;
  /** The primary stat or value — sourced from resolveControlledClaim */
  value: string;
  /** Label / description for the value */
  label: string;
  className?: string;
}

/**
 * Single trust indicator display item.
 * Icon is decorative (aria-hidden by caller).
 * Value and label text must come from the governance registry.
 */
export function TrustIndicatorItem({ icon, value, label, className }: TrustIndicatorItemProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2 text-center', 'p-4', className)}>
      {/* Icon container */}
      <div
        className={[
          'flex h-12 w-12 items-center justify-center',
          'rounded-full bg-[var(--color-brand-primary)]/10',
          'text-[var(--color-brand-primary)]',
          'mb-1',
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Value */}
      <p className="text-xl leading-tight font-bold text-[var(--color-brand-secondary)]">{value}</p>

      {/* Label */}
      <p className="max-w-[12rem] text-sm leading-snug text-[var(--color-neutral-600)]">{label}</p>
    </div>
  );
}
