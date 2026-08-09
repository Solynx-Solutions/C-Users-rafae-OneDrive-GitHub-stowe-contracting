// =============================================================================
// SERVICE AUDIENCE BADGE
//
// Renders a colour-coded audience badge for a service record.
// residential → blue-orange tint
// commercial → secondary tint
// both → neutral warm tint
//
// Server Component.
// =============================================================================

import { type ServiceAudience } from '@/content/serviceRegistry';

interface ServiceAudienceBadgeProps {
  audience: ServiceAudience;
  className?: string;
}

const AUDIENCE_CONFIG: Record<ServiceAudience, { label: string; colorClass: string }> = {
  residential: {
    label: 'Residential',
    colorClass: 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
  },
  commercial: {
    label: 'Commercial',
    colorClass: 'bg-[var(--color-brand-secondary)]/10 text-[var(--color-brand-secondary)]',
  },
  both: {
    label: 'Residential & Commercial',
    colorClass: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]',
  },
};

/**
 * Audience badge for service cards and detail pages.
 * Renders a pill-shaped badge with audience label.
 */
export function ServiceAudienceBadge({ audience, className }: ServiceAudienceBadgeProps) {
  const config = AUDIENCE_CONFIG[audience];
  return (
    <span
      className={[
        'inline-flex w-fit items-center rounded-full px-3 py-1',
        'text-[11px] font-bold tracking-wide uppercase',
        config.colorClass,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {config.label}
    </span>
  );
}
