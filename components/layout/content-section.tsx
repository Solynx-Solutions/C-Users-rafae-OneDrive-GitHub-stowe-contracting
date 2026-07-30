// =============================================================================
// CONTENT SECTION
// Semantic <section> wrapper with consistent vertical rhythm.
// Uses .section-py utility defined in globals.css.
// Server Component.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  /** id for anchor linking and section labeling */
  id?: string;
  /** aria-label or aria-labelledby for the section */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Remove default vertical padding */
  noPadding?: boolean;
  /** Background variant */
  bg?: 'white' | 'neutral' | 'brand-secondary';
}

const bgClasses = {
  white: 'bg-white',
  neutral: 'bg-[var(--color-neutral-50)]',
  'brand-secondary': 'bg-[var(--color-brand-secondary)] text-white',
};

export function ContentSection({
  children,
  className,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  noPadding = false,
  bg = 'white',
}: ContentSectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(bgClasses[bg], !noPadding && 'section-py', className)}
    >
      {children}
    </section>
  );
}
