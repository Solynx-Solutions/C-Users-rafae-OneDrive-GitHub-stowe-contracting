// =============================================================================
// EQUIPMENT SHOWCASE SECTION
//
// Presents the equipment + crew capability with intentional media placeholders.
// Photography pending delivery — all slots are clearly marked as pending.
//
// GOVERNANCE:
//   ✅ mechanical-equipment claim — confirmed
//   ✅ in-house-crews — confirmed
//   ✅ long-term-employees — confirmed
//   ❌ Equipment names / model numbers — BLOCKED (pending)
//   ❌ Production rates — PROHIBITED
//   ❌ Performance specs — BLOCKED (pending)
//
// Photography status:
//   - Equipment operation photos: PENDING CLIENT DELIVERY
//   - Crew photos: PENDING CLIENT DELIVERY
//   - Installation process photos: PENDING CLIENT DELIVERY
//
// Server Component.
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

interface MediaPlaceholder {
  label: string;
  description: string;
  pendingAsset: string;
}

const mediaSlots: MediaPlaceholder[] = [
  {
    label: 'Equipment Operation',
    description: 'Equipment in operation on an active project site.',
    pendingAsset: 'mechanical-equipment-operation.jpg',
  },
  {
    label: 'Crew at Work',
    description: 'In-house crew members during a concrete installation.',
    pendingAsset: 'crew-installation.jpg',
  },
  {
    label: 'Installation Process',
    description: 'Active installation phase, equipment and crew coordinating.',
    pendingAsset: 'installation-process.jpg',
  },
  {
    label: 'Finished Result',
    description: 'A completed concrete surface — residential or commercial project.',
    pendingAsset: 'finished-project.jpg',
  },
];

/**
 * Equipment + Crew showcase section with intentional photography placeholders.
 * All four media slots are clearly marked pending — no stock imagery used.
 * When photography is delivered, replace placeholder divs with <Image /> components.
 */
export function EquipmentShowcase() {
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const inHouseCrews = resolveControlledClaim('in-house-crews');
  const longTermEmployees = resolveControlledClaim('long-term-employees');

  return (
    <ContentSection bg="neutral" aria-label="Equipment and crew capabilities" id="equipment-crew">
      <PageContainer>
        <div className="flex flex-col gap-12">
          {/* Section header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              level="h2"
              subtitle={
                mechanicalEquipment
                  ? `Purpose-built field tools operated by ${inHouseCrews?.toLowerCase() ?? 'experienced in-house crews'}.`
                  : 'Purpose-built field tools operated by experienced in-house crews.'
              }
            >
              Equipment &amp; Crew
            </SectionHeading>

            {/* Long-term crew note */}
            {longTermEmployees && (
              <p className="shrink-0 text-sm font-medium text-[var(--color-brand-primary)]">
                {longTermEmployees}
              </p>
            )}
          </div>

          {/* Photography grid — 4 intentional placeholders */}
          {/* Replace each placeholder div with <Image /> when photography is delivered */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mediaSlots.map((slot, i) => (
              <div key={i} className="flex flex-col gap-3">
                {/*
                 * ── PHOTOGRAPHY PLACEHOLDER ──────────────────────────────
                 * Asset: {slot.pendingAsset}
                 * Status: Pending client photography delivery
                 * Replace with: <Image src={slot.pendingAsset} alt={slot.label} />
                 * Do NOT replace with stock imagery.
                 */}
                <div
                  className={[
                    'relative flex aspect-[4/3] w-full items-center justify-center',
                    'rounded-[var(--radius-lg)]',
                    'bg-[var(--color-neutral-200)]',
                    'border border-[var(--color-neutral-300)]',
                    'border-dashed',
                    'overflow-hidden',
                  ].join(' ')}
                  aria-label={`Photo placeholder: ${slot.label} (photography pending)`}
                  role="img"
                >
                  {/* Inner content */}
                  <div className="flex flex-col items-center gap-3 p-4 text-center">
                    {/* Camera icon */}
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-[var(--color-neutral-400)]"
                      aria-hidden="true"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-semibold text-[var(--color-neutral-500)]">
                        {slot.label}
                      </p>
                      <p className="text-[10px] leading-tight text-[var(--color-neutral-400)]">
                        Photography pending
                      </p>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-xs leading-snug text-[var(--color-neutral-500)]">
                  {slot.description}
                </p>
              </div>
            ))}
          </div>

          {/* Crew accountability note */}
          <div
            className={[
              'rounded-[var(--radius-lg)] border border-[var(--color-brand-primary)]/20',
              'bg-[var(--color-brand-primary)]/5',
              'px-6 py-5',
            ].join(' ')}
          >
            <p className="text-sm leading-relaxed text-[var(--color-brand-secondary)]">
              <strong className="font-semibold">Crew accountability.</strong> Our in-house teams
              carry the work from preparation through completion. No subcontracted operators.
            </p>
          </div>
        </div>
      </PageContainer>
    </ContentSection>
  );
}
