// =============================================================================
// SECTION HEADING
// Consistent heading treatment for page sections.
// Enforces correct heading hierarchy — caller provides the level.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

interface SectionHeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  /** Visual size override — e.g. render h2 at h1 visual size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Subtitle or supporting text */
  subtitle?: ReactNode;
  /** Center-aligned text */
  centered?: boolean;
  className?: string;
  /** id for aria-labelledby */
  id?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'text-xl font-bold tracking-tight',
  md: 'text-2xl md:text-3xl font-bold tracking-tight',
  lg: 'text-3xl md:text-4xl font-bold tracking-tight',
  xl: 'text-4xl md:text-5xl font-bold tracking-tight',
};

const defaultSizeByLevel: Record<HeadingLevel, string> = {
  h1: 'xl',
  h2: 'lg',
  h3: 'md',
  h4: 'sm',
};

export function SectionHeading({
  children,
  level: Tag = 'h2',
  size,
  subtitle,
  centered = false,
  className,
  id,
}: SectionHeadingProps) {
  const resolvedSize = size ?? defaultSizeByLevel[Tag];

  return (
    <div className={cn('flex flex-col gap-3', centered && 'items-center text-center', className)}>
      <Tag
        id={id}
        className={cn(
          sizeClasses[resolvedSize],
          'leading-tight text-[var(--color-brand-secondary)]'
        )}
      >
        {children}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            'leading-relaxed text-[var(--color-neutral-600)]',
            centered ? 'max-w-2xl' : 'max-w-prose'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
