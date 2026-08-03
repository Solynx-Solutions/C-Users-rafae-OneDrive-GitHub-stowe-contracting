// =============================================================================
// EMPLOYEE CONTINUITY PANEL
// Highlights workforce size and long-term employee continuity.
// All claims sourced from governance registry — confirmed + active only.
// Server Component.
//
// GOVERNANCE NOTES:
//   ✅ long-term-employees — confirmed (general claim only)
//   ✅ employee-count — confirmed ("30+" — exact total pending)
//   ❌ Specific tenure years for individuals — PENDING
//   ❌ Exact employee total (replaces "30+") — PENDING
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';

/**
 * Panel emphasizing employee continuity and workforce depth.
 * Renders "30+" employee count — must not be replaced with a specific number.
 * Returns null if employee-count claim is unavailable.
 */
export function EmployeeContinuityPanel() {
  const employeeCount = resolveControlledClaim('employee-count');
  const longTermEmployees = resolveControlledClaim('long-term-employees');
  const inHouseCrews = resolveControlledClaim('in-house-crews');

  if (!employeeCount) return null;

  return (
    <div
      className={[
        'flex flex-col gap-6',
        'rounded-[var(--radius-xl)]',
        'border border-[var(--color-neutral-200)]',
        'bg-[var(--color-neutral-50)]',
        'p-6 md:p-8',
      ].join(' ')}
      aria-label="Stowe workforce and continuity"
    >
      {/* Stat */}
      <div className="flex items-baseline gap-3">
        <span
          className="text-5xl font-extrabold tracking-tight text-[var(--color-brand-primary)]"
          aria-label={employeeCount}
        >
          {employeeCount}
        </span>
        <span className="text-sm font-medium text-[var(--color-neutral-500)]">team members</span>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        {longTermEmployees && (
          <p className="text-sm font-semibold text-[var(--color-brand-secondary)]">
            {longTermEmployees}
          </p>
        )}
        <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
          {inHouseCrews ? (
            <>
              {inHouseCrews} — the same people you work with at the start of your project are the
              ones who see it through to completion.
            </>
          ) : (
            <>
              Our workforce is built for consistency. The same teams who start your project see it
              through to completion.
            </>
          )}
        </p>
      </div>

      {/* Governance note — internal */}
      {/* ❌ DO NOT add specific tenure years or exact employee total here. */}
      {/* ❌ "30+" is the approved expression — use employee-count claim only. */}
    </div>
  );
}
