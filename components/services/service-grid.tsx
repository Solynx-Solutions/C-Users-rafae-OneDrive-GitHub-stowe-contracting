// =============================================================================
// SERVICE GRID — M6 Upgrade
//
// Renders a grid of ServiceCard components from the registry.
// Only confirmed + active services appear in the grid.
//
// M6 CHANGES:
//   - Empty state now uses the dedicated ServiceEmptyState component
//   - audience prop wiring updated to use helper directly
//   - Supports optional heading display
//
// Server Component.
// =============================================================================

import { getPublishableServices, type ServiceAudience } from '@/content/serviceRegistry';
import { ServiceCard } from './service-card';
import { ServiceEmptyState } from './service-empty-state';

interface ServiceGridProps {
  /** Filter by audience. If omitted, shows all publishable services. */
  audience?: ServiceAudience;
  /** Custom empty state message. Defaults to governance-safe message. */
  emptyStateMessage?: string;
}

/**
 * Grid of governance-gated service cards.
 * Only confirmed + active services render.
 * Shows ServiceEmptyState if no services are currently publishable.
 */
export function ServiceGrid({ audience, emptyStateMessage }: ServiceGridProps) {
  const allServices = getPublishableServices();
  const services = audience
    ? allServices.filter((s) => s.audience === audience || s.audience === 'both')
    : allServices;

  if (services.length === 0) {
    return <ServiceEmptyState variant="grid" message={emptyStateMessage} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.serviceKey} service={service} />
      ))}
    </div>
  );
}
