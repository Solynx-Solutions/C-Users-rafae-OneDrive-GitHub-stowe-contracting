// =============================================================================
// RELATED SERVICES
//
// Renders a row of related service cards below a service detail page.
//
// GOVERNANCE:
//   - Only renders confirmed + active related services
//   - If all related services are pending/draft, section is hidden
//   - Does not render blank or placeholder cards
//   - Reuses ServiceCard component (governance gate built in)
//
// Server Component.
// =============================================================================

import { getPublishableRelatedServices } from '@/content/serviceRegistry';
import { ServiceCard } from './service-card';

interface RelatedServicesProps {
  /** serviceKey of the current service (to look up related records). */
  serviceKey: string;
  heading?: string;
}

/**
 * Related services section.
 * Only renders if at least one related service is confirmed + active.
 * Hidden entirely if no publishable related services exist.
 */
export function RelatedServices({
  serviceKey,
  heading = 'Related Services',
}: RelatedServicesProps) {
  const related = getPublishableRelatedServices(serviceKey);

  // Nothing to render — hide section entirely, no empty state
  if (related.length === 0) return null;

  return (
    <section aria-label={heading} className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-[var(--color-brand-secondary)]">{heading}</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((service) => (
          <ServiceCard key={service.serviceKey} service={service} />
        ))}
      </div>
    </section>
  );
}
