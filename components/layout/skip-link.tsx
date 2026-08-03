// =============================================================================
// SKIP LINK
// Allows keyboard and screen reader users to skip repetitive navigation.
// Must be the first focusable element in the page.
// WCAG 2.2 AA 2.4.1 requirement.
// =============================================================================

/**
 * Skip link targeting #main-content.
 * Visually hidden until focused; appears at top-left on focus.
 * Place as the first child of <body>.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={[
        'sr-only focus:not-sr-only',
        'focus:fixed focus:top-4 focus:left-4 focus:z-[100]',
        'focus:inline-flex focus:items-center focus:rounded-md',
        'focus:px-4 focus:py-2',
        'focus:bg-[var(--color-brand-primary)] focus:text-white',
        'focus:text-sm focus:font-semibold',
        'focus:shadow-lg focus:outline-none',
      ].join(' ')}
    >
      Skip to main content
    </a>
  );
}
