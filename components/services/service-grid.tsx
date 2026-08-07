// =============================================================================
// SERVICE GRID
//
// Renders a grid of ServiceCard components from the registry.
// Only confirmed + active services appear in the grid.
//
// If no services are publishable, renders a governance-aware empty state
// that informs the visitor without exposing internal status language.
//
// Server Component.
// =============================================================================

import { getPublishableServices, type ServiceAudience } from '@/content/serviceRegistry';
import { ServiceCard } from './service-card';

interface ServiceGridProps {
  /** Filter by audience. If omitted, shows all publishable services. */
  audience?: ServiceAudience;
  /** Custom empty state message. Defaults to a governance-safe message. */
  emptyStateMessage?: string;
}

/**
 * Grid of governance-gated service cards.
 * Only confirmed + active services render.
 * Shows an empty state if no services are currently publishable.
 */
export function ServiceGrid({ audience, emptyStateMessage }: ServiceGridProps) {
  const allServices = getPublishableServices();
  const services = audience
    ? allServices.filter((s) => s.audience === audience || s.audience === 'both')
    : allServices;

  if (services.length === 0) {
    return (
      <div
        className={[
          'flex flex-col items-center gap-4',
          'rounded-[var(--radius-xl)]',
          'border border-[var(--color-neutral-200)]',
          'border-dashed',
          'px-8 py-16',
          'text-center',
        ].join(' ')}
        aria-label="Services coming soon"
      >
        {/* Construction icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--color-neutral-400)]"
          aria-hidden="true"
        >
          <path d="M2 20h20" />
          <path d="M5 20V10l7-7 7 7v10" />
          <path d="M9 20v-5h6v5" />
        </svg>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[var(--color-neutral-600)]">
            {emptyStateMessage ?? 'Service pages are being prepared.'}
          </p>
          <p className="text-xs text-[var(--color-neutral-400)]">
            Use the links below to request a project estimate.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.serviceKey} service={service} />
      ))}
    </div>
  );
}
