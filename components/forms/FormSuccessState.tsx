// =============================================================================
// FORM SUCCESS STATE
//
// Shown after the user submits the estimate form.
//
// GOVERNANCE:
//   - No fake confirmation numbers
//   - No guaranteed response times
//   - No pricing acknowledgements
//   - No timeline commitments
//
// Honest: acknowledges receipt, sets expectation of contact.
//
// Client Component (rendered conditionally inside EstimateForm).
// =============================================================================

'use client';

import { type EstimateType } from './EstimateForm';

interface FormSuccessStateProps {
  estimateType: EstimateType;
  onReset: () => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Post-submission state.
 * Honest receipt acknowledgement — no fake success claims.
 */
export function FormSuccessState({ estimateType, onReset }: FormSuccessStateProps) {
  const label = estimateType === 'residential' ? 'Residential' : 'Commercial';

  return (
    <div
      className="flex flex-col items-center gap-6 py-12 text-center"
      role="status"
      aria-live="polite"
      aria-label="Form submitted successfully"
    >
      {/* Icon */}
      <div className="text-[var(--color-success)]" aria-hidden="true">
        <CheckCircleIcon />
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[var(--color-brand-secondary)]">
          {label} Estimate Request Received
        </h2>
        <p className="max-w-sm leading-relaxed text-[var(--color-neutral-600)]">
          Thank you for reaching out. We&apos;ve received your project information and will be in
          touch to discuss next steps.
        </p>
      </div>

      {/* What happens next — no timeline guarantees */}
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] p-5 text-left">
        <p className="mb-3 text-xs font-semibold tracking-widest text-[var(--color-neutral-400)] uppercase">
          What happens next
        </p>
        <ul className="flex flex-col gap-2 text-sm text-[var(--color-neutral-600)]">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[var(--color-brand-primary)]" aria-hidden="true">
              ›
            </span>
            A member of the Stowe Contracting team will review your request.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[var(--color-brand-primary)]" aria-hidden="true">
              ›
            </span>
            We may follow up with questions to better understand your project.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[var(--color-brand-primary)]" aria-hidden="true">
              ›
            </span>
            A consultation will be scheduled at a time that works for you.
          </li>
        </ul>
      </div>

      {/* Reset — allow another submission */}
      <button
        type="button"
        onClick={onReset}
        className={[
          'text-sm font-semibold text-[var(--color-brand-primary)]',
          'underline underline-offset-2',
          'hover:text-[var(--color-brand-primary-dark)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
          'focus-visible:rounded-sm',
          'transition-colors duration-150',
        ].join(' ')}
      >
        Submit another request
      </button>
    </div>
  );
}
