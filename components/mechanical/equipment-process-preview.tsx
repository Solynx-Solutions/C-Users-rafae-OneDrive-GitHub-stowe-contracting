// =============================================================================
// EQUIPMENT PROCESS PREVIEW
// Previews how Stowe's mechanical equipment supports project work.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ mechanical-equipment — confirmed
//   ✅ residential-capability — confirmed
//   ✅ commercial-capability — confirmed
//   ❌ Equipment names or models — PENDING
//   ❌ Production rates or speed comparisons — PROHIBITED
//
// APPROVED LANGUAGE ONLY:
//   "Designed to support..."
//   "Allows Stowe to..."
//   "Specialized mechanical installation equipment"
//   "Supports applicable projects"
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { Card } from '@/components/ui/card';

/**
 * Process preview for how mechanical equipment supports Stowe's work.
 * Uses only approved language — no performance specs or equipment names.
 * Returns null if the mechanical-equipment claim is not publishable.
 */
export function EquipmentProcessPreview() {
  const mechanicalEquipment = resolveControlledClaim('mechanical-equipment');
  const residentialCapability = resolveControlledClaim('residential-capability');
  const commercialCapability = resolveControlledClaim('commercial-capability');

  if (!mechanicalEquipment) return null;

  const steps = [
    {
      number: '01',
      heading: 'Project Assessment',
      body: 'Stowe evaluates the scope of the project to determine the appropriate equipment and crew configuration for the work.',
    },
    {
      number: '02',
      heading: 'Equipment Deployment',
      body: `Specialized mechanical installation equipment is deployed to support applicable projects — designed to support both ${residentialCapability ? residentialCapability.toLowerCase() : 'residential'} and ${commercialCapability ? commercialCapability.toLowerCase() : 'commercial'} scopes.`,
    },
    {
      number: '03',
      heading: 'In-House Execution',
      body: 'Stowe crews operate the equipment directly — allowing Stowe to maintain quality and accountability throughout the installation.',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {steps.map((step) => (
        <Card key={step.number} variant="default" className="flex flex-col gap-4 p-6">
          <span
            className="text-3xl font-extrabold tracking-tight text-[var(--color-brand-primary)]/25"
            aria-hidden="true"
          >
            {step.number}
          </span>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-[var(--color-brand-secondary)]">
              {step.heading}
            </h4>
            <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">{step.body}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
