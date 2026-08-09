// =============================================================================
// SERVICE PROCESS
//
// Renders a step-by-step process for a service.
// Only renders if the service record has a non-empty process array.
//
// GOVERNANCE:
//   - Process steps must be verified content — not invented or aspirational
//   - Returns null if no process steps are defined
//   - Step descriptions must not contain prohibited claims
//
// Server Component.
// =============================================================================

import { type ServiceProcessStep } from '@/content/serviceRegistry';

interface ServiceProcessProps {
  steps: ServiceProcessStep[];
  heading?: string;
}

/**
 * Step-by-step process visualization.
 * Returns null if no steps are provided.
 * Each step is numbered and includes a title and description.
 */
export function ServiceProcess({ steps, heading = 'How It Works' }: ServiceProcessProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-bold text-[var(--color-brand-secondary)]">{heading}</h3>

      <ol className="flex flex-col gap-6" aria-label={heading}>
        {steps.map((step) => (
          <li key={step.step} className="flex gap-5">
            {/* Step number */}
            <div
              className={[
                'flex h-10 w-10 shrink-0 items-center justify-center',
                'rounded-full',
                'bg-[var(--color-brand-primary)] text-white',
                'text-sm font-bold',
              ].join(' ')}
              aria-hidden="true"
            >
              {step.step}
            </div>

            {/* Step content */}
            <div className="flex flex-col gap-1 pt-1.5">
              <h4 className="text-sm font-bold text-[var(--color-brand-secondary)]">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
