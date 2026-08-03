// =============================================================================
// HOME MECHANICAL SECTION
// Homepage feature section for Stowe's mechanical installation capability.
// Composes M1 mechanical components with homepage-specific framing.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ mechanical-equipment → "Specialized mechanical installation equipment"
//   ✅ in-house-crews → "Experienced in-house crews"
//   ❌ Equipment names, models — PENDING
//   ❌ Production rates, speed comparisons — PROHIBITED
//   ❌ Precision tolerances — PROHIBITED
//
// APPROVED LANGUAGE:
//   "Designed to support..."
//   "Allows Stowe to..."
//   "Specialized mechanical installation equipment"
//   "Supports applicable projects"
//   "Commercial-grade methods can apply to suitable residential work"
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';
import { TechnicalCapabilityCallout } from '@/components/mechanical/technical-capability-callout';
import { EquipmentProcessPreview } from '@/components/mechanical/equipment-process-preview';

/**
 * Homepage mechanical installation feature section.
 * Wraps M1 mechanical components with homepage framing.
 * Returns null if core claim is not publishable.
 */
export function HomeMechanical() {
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const yearsInBusiness = resolveControlledClaim('years-in-business');

  if (!mechanicalEquipment) return null;

  return (
    <ContentSection
      bg="white"
      aria-label="Mechanical installation capability"
      id="mechanical-installation"
    >
      <PageContainer>
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left — Heading and intro */}
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <p className="text-xs font-bold tracking-[0.2em] text-[var(--color-brand-primary)] uppercase">
                Equipment & Capability
              </p>

              <SectionHeading
                level="h2"
                subtitle={
                  yearsInBusiness
                    ? `${yearsInBusiness} means our crews and equipment work together with the kind of familiarity that only comes from sustained, committed practice.`
                    : 'Our crews and equipment work together with the kind of familiarity that only comes from sustained, committed practice.'
                }
              >
                The Right Equipment. The Right Crew.
              </SectionHeading>

              <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                Stowe operates{' '}
                <strong className="font-semibold text-[var(--color-brand-secondary)]">
                  {mechanicalEquipment}
                </strong>{' '}
                designed to support both residential and commercial installation work.
                Commercial-grade methods can apply to suitable residential projects — allowing Stowe
                to bring the same capability across different project scales.
              </p>
            </div>

            {/* Right — Technical callout */}
            <div>
              <TechnicalCapabilityCallout />
            </div>
          </div>

          {/* Equipment process preview — 3 steps */}
          <EquipmentProcessPreview />
        </div>
      </PageContainer>
    </ContentSection>
  );
}
