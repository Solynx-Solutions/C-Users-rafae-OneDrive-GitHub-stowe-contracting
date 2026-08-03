// =============================================================================
// PAGE CONTAINER
// Consistent max-width + horizontal padding wrapper for all page content.
// Uses .container-site utility defined in globals.css.
// Server Component.
// =============================================================================

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /** Removes the default max-width constraint */
  fluid?: boolean;
}

/**
 * Page-width container. Wraps content to consistent max-width with
 * responsive horizontal padding. Use inside every section/page.
 */
export function PageContainer({ children, className, fluid = false }: PageContainerProps) {
  return <div className={cn(!fluid && 'container-site', className)}>{children}</div>;
}
