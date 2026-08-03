// =============================================================================
// HOME GALLERY — Project Showcase Placeholder
// Designed for future Stowe photography.
// Server Component.
//
// GOVERNANCE NOTES:
//   ❌ NO fake project descriptions
//   ❌ NO invented testimonials
//   ❌ NO fabricated case studies
//   ❌ NO placeholder photography from stock sources
//
// STATUS: Photography pending delivery from Stowe Contracting.
// Replace placeholder cards with real Next.js <Image> components when
// photography is delivered.
//
// MEDIA SLOT STRUCTURE:
//   Each card: 4:3 aspect ratio, labeled "Photography Pending"
//   Alt text will be provided with real photography.
//   Intended subjects: equipment operation, crew, drone, finished projects,
//   material prep, installation process.
// =============================================================================

import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

/** Image slot categories — will map to real photography subjects */
const imageSlots = [
  {
    id: 'slot-equipment',
    label: 'Equipment Operation',
    description: 'Mechanical installation equipment in action',
  },
  {
    id: 'slot-crew',
    label: 'Crew at Work',
    description: 'Stowe crews on a residential installation',
  },
  {
    id: 'slot-finished',
    label: 'Finished Project',
    description: 'Completed installation — residential',
  },
  {
    id: 'slot-commercial',
    label: 'Commercial Site',
    description: 'Large-scale commercial project',
  },
  {
    id: 'slot-materials',
    label: 'Material Preparation',
    description: 'Site preparation and material staging',
  },
  {
    id: 'slot-aerial',
    label: 'Aerial View',
    description: 'Drone view of completed work',
  },
] as const;

/**
 * Project gallery section.
 * Shows properly structured image placeholder slots for future photography.
 * No fake projects, testimonials, or invented data.
 */
export function HomeGallery() {
  return (
    <ContentSection bg="neutral" aria-label="Project gallery" id="our-work">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            centered
            subtitle="Stowe project photography is coming. Each image slot below is reserved for real documentation of our work — equipment, crews, and finished installations."
          >
            Our Work
          </SectionHeading>

          {/* Photography pending notice */}
          <div
            className={[
              'rounded-[var(--radius-lg)]',
              'border border-[var(--color-brand-primary)]/20',
              'bg-[var(--color-brand-primary)]/5',
              'p-4 text-center',
            ].join(' ')}
            role="note"
            aria-label="Photography pending"
          >
            <p className="text-sm text-[var(--color-neutral-600)]">
              <strong className="font-semibold text-[var(--color-brand-secondary)]">
                Photography in progress.
              </strong>{' '}
              Project images will be added here once Stowe photography is delivered.
            </p>
          </div>

          {/* Image slot grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {imageSlots.map((slot) => (
              <div
                key={slot.id}
                id={slot.id}
                className={[
                  'group relative overflow-hidden',
                  'rounded-[var(--radius-xl)]',
                  'border border-[var(--color-neutral-200)]',
                  'bg-[var(--color-neutral-100)]',
                  // 4:3 aspect ratio
                  'aspect-[4/3]',
                  'flex flex-col items-center justify-center gap-3',
                ].join(' ')}
                aria-label={`Image slot: ${slot.label} — photography pending`}
              >
                {/* Slot icon */}
                <div
                  className={[
                    'flex h-12 w-12 items-center justify-center',
                    'rounded-full',
                    'bg-[var(--color-neutral-200)]',
                    'text-[var(--color-neutral-400)]',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>

                {/* Slot label */}
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-xs font-bold tracking-widest text-[var(--color-neutral-400)] uppercase">
                    {slot.label}
                  </p>
                  <p className="text-xs text-[var(--color-neutral-400)]">{slot.description}</p>
                </div>

                {/* Pending badge */}
                <span
                  className={[
                    'absolute top-3 right-3',
                    'rounded-full px-2.5 py-1',
                    'bg-[var(--color-neutral-200)]',
                    'text-[10px] font-semibold tracking-wider uppercase',
                    'text-[var(--color-neutral-500)]',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
