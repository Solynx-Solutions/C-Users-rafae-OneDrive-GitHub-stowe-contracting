// =============================================================================
// MAIN CONTENT
// Wraps the main page content region with <main> landmark.
// Targets the skip link anchor #main-content.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * The primary content landmark. Receives focus from the skip link.
 * Must appear once per page.
 */
export function MainContent({ children, className }: MainContentProps) {
  return (
    <main id="main-content" tabIndex={-1} className={cn('flex-1 outline-none', className)}>
      {children}
    </main>
  );
}
