// =============================================================================
// FOCUS BOUNDARY
// Traps keyboard focus within a region (e.g. open mobile menu).
// Used by MobileNavigation. 'use client' because it uses refs and effects.
// =============================================================================

'use client';

import { type ReactNode, type HTMLAttributes, useRef, useEffect } from 'react';

interface FocusBoundaryProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** When true, focus is trapped inside this boundary. */
  active: boolean;
  /** Called when Escape is pressed while boundary is active. */
  onEscape?: () => void;
  className?: string;
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Traps keyboard focus inside the boundary when `active` is true.
 * Handles Tab/Shift+Tab cycling and Escape key.
 * Accepts all standard HTML div attributes (role, aria-modal, id, etc.).
 */
export function FocusBoundary({
  children,
  active,
  onEscape,
  className,
  ...rest
}: FocusBoundaryProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const container = ref.current;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

    if (focusable.length === 0) return;

    // Focus the first focusable element when opened
    focusable[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (!active) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
        return;
      }

      if (e.key !== 'Tab') return;

      const currentFocusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      );
      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, onEscape]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
