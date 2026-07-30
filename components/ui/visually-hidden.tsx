// =============================================================================
// VISUALLY HIDDEN
// Accessible utility: content visible to screen readers, not to sighted users.
// WCAG 2.2 AA requirement for icon buttons and supplemental labels.
// =============================================================================

import { type ReactNode } from 'react';

interface VisuallyHiddenProps {
  children: ReactNode;
  /** Renders as the given element (default: span). */
  as?: 'span' | 'div' | 'p' | 'h2' | 'h3';
}

/**
 * Renders children that are visually hidden but accessible to screen readers.
 * Use for supplemental labels on icon-only buttons, decorative text, etc.
 *
 * @example
 * <button>
 *   <CloseIcon aria-hidden="true" />
 *   <VisuallyHidden>Close menu</VisuallyHidden>
 * </button>
 */
export function VisuallyHidden({ children, as: Tag = 'span' }: VisuallyHiddenProps) {
  return <Tag className="sr-only">{children}</Tag>;
}
