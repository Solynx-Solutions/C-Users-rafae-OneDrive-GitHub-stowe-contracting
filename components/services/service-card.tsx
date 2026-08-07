// =============================================================================
// SERVICE CARD
//
// Renders a single ServiceRecord as a visual card.
// Only renders if the service is confirmed + active.
// If the service is not publishable, returns null (governance gate).
//
// Server Component.
// =============================================================================

import Link from 'next/link';
import { type ServiceRecord } from '@/content/serviceRegistry';

interface ServiceCardProps {
  service: ServiceRecord;
  /** If true, shows the audience badge on the card. Default: true. */
  showAudience?: boolean;
}

const AUDIENCE_LABELS: Record<ServiceRecord['audience'], string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  both: 'Residential & Commercial',
};

/**
 * Service card component.
 * Renders only for confirmed + active services.
 * Returns null if the service is not publishable (governance gate).
 */
export function ServiceCard({ service, showAudience = true }: ServiceCardProps) {
  // ── Governance gate ────────────────────────────────────────────────────────
  // Do not render pending, draft, inactive, or rejected services.
  if (service.verificationStatus !== 'confirmed' || service.publicationStatus !== 'active') {
    return null;
  }

  return (
    <div
      className={[
        'group relative flex flex-col gap-5',
        'rounded-[var(--radius-xl)]',
        'border border-[var(--color-neutral-200)]',
        'bg-white p-6',
        'hover:border-[var(--color-brand-primary)]/30',
        'hover:shadow-[var(--shadow-md)]',
        'transition-all duration-150',
      ].join(' ')}
    >
      {/* Audience badge */}
      {showAudience && (
        <span
          className={[
            'inline-flex w-fit items-center',
            'rounded-full px-3 py-1',
            'text-[11px] font-bold tracking-wide uppercase',
            'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
          ].join(' ')}
        >
          {AUDIENCE_LABELS[service.audience]}
        </span>
      )}

      {/* Service name */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-[var(--color-brand-secondary)]">{service.name}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
          {service.description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-2">
        <Link
          href={service.cta.href}
          id={`service-card-cta-${service.serviceKey}`}
          className={[
            'inline-flex items-center gap-2',
            'text-sm font-semibold text-[var(--color-brand-primary)]',
            'hover:underline',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
          ].join(' ')}
        >
          {service.cta.label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
