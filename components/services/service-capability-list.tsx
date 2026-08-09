// =============================================================================
// SERVICE CAPABILITY LIST
//
// Renders a bulleted list of capability highlights for a service.
// Used on service detail pages and the mechanical installation feature block.
//
// GOVERNANCE:
//   - Each highlight must be a confirmed, verifiable statement
//   - Does not render if capabilityHighlights is empty or undefined
//   - Uses existing brand color tokens — no ad-hoc colors
//
// Server Component.
// =============================================================================

interface ServiceCapabilityListProps {
  highlights: string[];
  /** Optional heading above the list. */
  heading?: string;
}

/**
 * Renders a clean bulleted list of capability highlights.
 * Returns null if no highlights are provided.
 */
export function ServiceCapabilityList({ highlights, heading }: ServiceCapabilityListProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {heading && (
        <h3 className="text-sm font-bold tracking-wide text-[var(--color-neutral-400)] uppercase">
          {heading}
        </h3>
      )}
      <ul className="flex flex-col gap-3" aria-label={heading ?? 'Service capabilities'}>
        {highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
              aria-hidden="true"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-sm leading-relaxed text-[var(--color-neutral-700)]">
              {highlight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
