// =============================================================================
// MECHANICAL INSTALLATION INTRO
// Introduces Stowe's mechanical installation capability.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ mechanical-equipment — confirmed
//   ✅ years-in-business — confirmed (context)
//   ❌ Equipment names, models — PENDING
//   ❌ Production rates — PROHIBITED
//   ❌ Speed comparisons — PROHIBITED
//   ❌ Precision tolerances — PROHIBITED
//
// APPROVED LANGUAGE:
//   "Specialized mechanical installation equipment"
//   "Designed to support..."
//   "Allows Stowe to..."
//   "Supports applicable projects"
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';

/**
 * Introductory block for mechanical installation capability.
 * Uses only the confirmed mechanical-equipment claim and approved language.
 * Returns null if the claim is not publishable.
 */
export function MechanicalInstallationIntro() {
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const yearsInBusiness = resolveControlledClaim('years-in-business');

  if (!mechanicalEquipment) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg leading-relaxed text-[var(--color-neutral-700)]">
        Stowe operates{' '}
        <strong className="font-semibold text-[var(--color-brand-secondary)]">
          {mechanicalEquipment}
        </strong>{' '}
        designed to support the full range of installation work — residential through commercial.
      </p>
      {yearsInBusiness && (
        <p className="text-base leading-relaxed text-[var(--color-neutral-600)]">
          {yearsInBusiness} means that equipment and crews have developed a working relationship
          built around the demands of Monterey Bay projects.
        </p>
      )}
      {/* ❌ DO NOT add equipment names, model numbers, or performance specs here. */}
    </div>
  );
}
