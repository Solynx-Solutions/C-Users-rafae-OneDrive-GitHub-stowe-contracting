// =============================================================================
// ESTIMATE FORM
//
// Main form orchestrator for the estimate conversion experience.
// Supports both 'residential' and 'commercial' modes via the `estimateType` prop.
//
// ARCHITECTURE:
//   - Native React state + HTML form elements (no external form library)
//   - Zod schema validation on submit
//   - Integration-ready: submitEstimate() stub is pre-wired for M7+ CRM
//   - FormSuccessState shown on submit success
//   - No fake confirmation numbers, response time guarantees, or pricing claims
//
// M3 changes:
//   - CommercialDetailsFields injected for commercial mode (companyName, contactName)
//   - ProjectDetailsSection receives showPropertyType + scopeLabel per mode
//   - ContactDetailsSection now collects firstName, lastName, preferredContactMethod
//
// Client Component.
// =============================================================================

'use client';

import { useState, useRef, type FormEvent } from 'react';
import { estimateFormSchema, type EstimateFormValues } from '@/lib/validations/estimateForm';
import { type ZodIssue } from 'zod';
import { submitEstimate, type EstimateType } from '@/lib/actions/submitEstimate';

import { CommercialDetailsFields } from './CommercialDetailsFields';
import { ContactDetailsSection } from './ContactDetailsSection';
import { ProjectDetailsSection, type ServiceOption } from './ProjectDetailsSection';
import { FormSuccessState } from './FormSuccessState';
import { type FormErrors } from './EstimateField';

// ─── Types ────────────────────────────────────────────────────────────────────

// Re-export EstimateType so consumers can import from EstimateForm as before
export type { EstimateType } from '@/lib/actions/submitEstimate';

// Re-exported for consumers who import from EstimateForm
export type { FormErrors } from './EstimateField';

interface EstimateFormProps {
  estimateType: EstimateType;
  serviceOptions: ServiceOption[];
  /** Unique id prefix for the form element (for accessibility) */
  formId?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Converts Zod issues array to a flat record keyed by field name */
function issuestoFieldErrors(issues: ZodIssue[]): FormErrors {
  const result: FormErrors = {};
  for (const issue of issues) {
    const rawKey = issue.path[0];
    const key = typeof rawKey === 'symbol' ? undefined : (rawKey as keyof EstimateFormValues);
    if (key !== undefined && !result[key]) {
      result[key] = issue.message;
    }
  }
  return result;
}

/** Reads all named form inputs into a plain object */
function readFormData(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const out: Record<string, string> = {};
  for (const [key, value] of fd.entries()) {
    out[key] = typeof value === 'string' ? value : '';
  }
  return out;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EstimateForm({ estimateType, serviceOptions, formId }: EstimateFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isCommercial = estimateType === 'commercial';

  // ─── Submit handler ──────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitError(null);

    // Parse & validate
    const raw = readFormData(formRef.current);
    const result = estimateFormSchema.safeParse(raw);

    if (!result.success) {
      setErrors(issuestoFieldErrors(result.error.issues));
      // Focus first error field
      const firstErrorField = formRef.current.querySelector<HTMLElement>(
        '[aria-invalid="true"], .field-error'
      );
      firstErrorField?.focus();
      return;
    }

    // Clear errors and submit
    setErrors({});
    setIsSubmitting(true);

    try {
      const success = await submitEstimate(result.data, estimateType);
      if (success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          'Something went wrong submitting your request. Please try again or call us directly.'
        );
      }
    } catch {
      setSubmitError(
        'Something went wrong submitting your request. Please try again or call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setSubmitError(null);
    setErrors({});
    formRef.current?.reset();
  }

  // ─── Success state ─────────────────────────────────────────────────────

  if (submitted) {
    return <FormSuccessState estimateType={estimateType} onReset={handleReset} />;
  }

  // ─── Form ──────────────────────────────────────────────────────────────

  return (
    <form
      ref={formRef}
      id={formId}
      onSubmit={handleSubmit}
      noValidate
      aria-label={`${isCommercial ? 'Commercial' : 'Residential'} estimate request form`}
      className="flex flex-col gap-8"
    >
      {/* Commercial-only: company information */}
      {isCommercial && (
        <>
          <CommercialDetailsFields errors={errors} />
          <div className="border-t border-[var(--color-neutral-200)]" role="separator" />
        </>
      )}

      {/* Contact section */}
      <ContactDetailsSection errors={errors} />

      {/* Divider */}
      <div className="border-t border-[var(--color-neutral-200)]" role="separator" />

      {/* Project section */}
      <ProjectDetailsSection
        errors={errors}
        serviceOptions={serviceOptions}
        showPropertyType={!isCommercial}
        scopeLabel={isCommercial ? 'Scope Description' : 'Project Description'}
      />

      {/* Submit error */}
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-[var(--radius-md)] border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 p-4 text-sm text-[var(--color-error)]"
        >
          {submitError}
        </div>
      )}

      {/* Submit button */}
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          id={`${formId ?? estimateType}-submit`}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={[
            'inline-flex w-full items-center justify-center gap-2',
            'rounded-[var(--radius-md)] px-8 py-4',
            'bg-[var(--color-brand-primary)] text-white',
            'text-base font-bold',
            'hover:bg-[var(--color-brand-primary-dark)]',
            'transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'shadow-[var(--shadow-brand)]',
          ].join(' ')}
        >
          {isSubmitting ? (
            <>
              <span aria-hidden="true">Sending…</span>
              <span className="sr-only">Submitting your request, please wait.</span>
            </>
          ) : (
            'Submit Estimate Request'
          )}
        </button>

        {/* Privacy note */}
        <p className="text-center text-xs text-[var(--color-neutral-400)]">
          Your information is used only to respond to your estimate request. We do not sell or share
          your data.
        </p>
      </div>
    </form>
  );
}
