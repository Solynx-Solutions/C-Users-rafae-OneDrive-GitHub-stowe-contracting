// =============================================================================
// TRUST SIGNAL CARD
// Individual trust signal in card format for use in page sections.
// Server Component.
// =============================================================================

import { type ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TrustSignalCardProps {
  icon: ReactNode;
  heading: string;
  body: string;
  className?: string;
}

/**
 * Trust signal card for section-level trust content.
 * Heading and body must come from the content governance registry.
 *
 * @example
 * <TrustSignalCard
 *   icon={<TeamIcon />}
 *   heading="Experienced In-House Crews"
 *   body="Our crews are long-term employees — you know who's doing the work."
 * />
 */
export function TrustSignalCard({ icon, heading, body, className }: TrustSignalCardProps) {
  return (
    <Card variant="flat" className={cn('flex flex-col gap-4', className)}>
      <div
        className={[
          'flex h-11 w-11 items-center justify-center',
          'rounded-[var(--radius-md)]',
          'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]',
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-base leading-snug font-semibold text-[var(--color-brand-secondary)]">
          {heading}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">{body}</p>
      </div>
    </Card>
  );
}
