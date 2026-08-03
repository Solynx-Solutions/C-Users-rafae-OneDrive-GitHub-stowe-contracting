// =============================================================================
// BRAND MARK
// Compact mark for favicon-scale or icon usage.
// Structural placeholder — awaiting Agent 07 approved assets.
// =============================================================================

import { cn } from '@/lib/utils';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * Compact brand mark (geometric placeholder).
 * Replace with approved SVG/image when supplied by Agent 07.
 *
 * @agent07-pending Awaiting approved brand mark asset.
 */
export function BrandMark({ size = 32, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('shrink-0', className)}
      role="img"
    >
      {/* Placeholder geometric mark — replace with approved brand asset */}
      <rect width="32" height="32" rx="4" fill="var(--color-brand-primary)" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        S
      </text>
    </svg>
  );
}
