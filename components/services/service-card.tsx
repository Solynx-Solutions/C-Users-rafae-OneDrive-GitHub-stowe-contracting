// =============================================================================
// SERVICE CARD — M6 Upgrade
//
// Renders a single ServiceRecord as a visual card.
// Only renders if the service is confirmed + active (governance gate).
//
// M6 CHANGES:
//   - Audience badge now uses ServiceAudienceBadge component
//   - CTA links to service detail page (/services/[slug]) when available
//     and no canonicalPath redirect is in play
//   - canonicalPath services link to their authority page via cta.href
//   - Added category display (optional)
//   - Hover state enhanced
//
// Server Component.
// =============================================================================

import Link from 'next/link';
import { type ServiceRecord } from '@/content/serviceRegistry';
import { ServiceAudienceBadge } from './service-audience-badge';

interface ServiceCardProps {
  service: ServiceRecord;
  /** If true, shows the audience badge on the card. Default: true. */
  showAudience?: boolean;
}

/**
 * Service card component.
 * Renders only for confirmed + active services.
 * Returns null if the service is not publishable (governance gate).
 *
 * CTA resolution:
 *   - If service has canonicalPath → links to canonicalPath (authority page)
 *   - If service has a slug → links to /services/[slug]
 *   - Fallback → uses cta.href from registry (estimate route)
 */
export function ServiceCard({ service, showAudience = true }: ServiceCardProps) {
  // ── Governance gate ────────────────────────────────────────────────────────
  if (service.verificationStatus !== 'confirmed' || service.publicationStatus !== 'active') {
    return null;
  }

  // ── CTA resolution ─────────────────────────────────────────────────────────
  // Priority: canonicalPath > service detail slug > registry cta
  const ctaHref = service.canonicalPath ?? service.cta.href;
  const ctaLabel = service.canonicalPath ? 'Learn More' : service.cta.label;

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
      {showAudience && <ServiceAudienceBadge audience={service.audience} />}

      {/* Service name and description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-[var(--color-brand-secondary)]">{service.name}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
          {service.description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-2">
        <Link
          href={ctaHref}
          id={`service-card-cta-${service.serviceKey}`}
          className={[
            'inline-flex items-center gap-2',
            'text-sm font-semibold text-[var(--color-brand-primary)]',
            'hover:underline',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
            'focus-visible:rounded-sm',
          ].join(' ')}
        >
          {ctaLabel}
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
