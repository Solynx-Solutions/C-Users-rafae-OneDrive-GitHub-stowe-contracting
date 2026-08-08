// =============================================================================
// CONTACT FORM
//
// General-purpose contact form for /contact page.
//
// ARCHITECTURE:
//   - Mirrors M3 EstimateForm: native React state, FormData, Zod validation
//   - Uses EstimateField and inputClasses from the M3 form primitives
//   - Integration-ready: submitContact() stub pre-wired for M7+ CRM
//   - FormSuccessState pattern — consistent with estimate form success UI
//   - No fake confirmation numbers, response time guarantees, or pricing claims
//   - inquiryType field drives M7+ CRM pipeline routing
//
// Client Component.
// =============================================================================

'use client';

import { useState, useRef, type FormEvent } from 'react';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contactForm';
import { type ZodIssue } from 'zod';
import { submitContact } from '@/lib/actions/submitContact';
import { EstimateField, inputClasses } from '@/components/forms/EstimateField';
import { cn } from '@/lib/utils';

// ── Re-export for barrel convenience ─────────────────────────────────────────
export type { ContactFormValues };

// ── Helpers ───────────────────────────────────────────────────────────────────

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

function issuesToFieldErrors(issues: ZodIssue[]): ContactFormErrors {
  const result: ContactFormErrors = {};
  for (const issue of issues) {
    const rawKey = issue.path[0];
    const key = typeof rawKey === 'symbol' ? undefined : (rawKey as keyof ContactFormValues);
    if (key !== undefined && !result[key]) {
      result[key] = issue.message;
    }
  }
  return result;
}

function readFormData(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const out: Record<string, string> = {};
  for (const [key, value] of fd.entries()) {
    out[key] = typeof value === 'string' ? value : '';
  }
  return out;
}

function selectClasses(hasError = false) {
  return cn(
    inputClasses(hasError),
    'appearance-none',
    "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")]",
    'bg-[right_0.75rem_center] bg-no-repeat pr-10'
  );
}

// ── Success state ─────────────────────────────────────────────────────────────

function ContactSuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="flex flex-col items-center gap-6 py-12 text-center"
      role="status"
      aria-live="polite"
      aria-label="Contact form submitted successfully"
    >
      {/* Icon */}
      <div className="text-[var(--color-success)]" aria-hidden="true">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-[var(--color-brand-secondary)]">Message Received</h3>
        <p className="max-w-sm leading-relaxed text-[var(--color-neutral-600)]">
          Thank you for reaching out. A member of the Stowe Contracting team will be in touch.
        </p>
      </div>

      {/* What happens next */}
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] p-5 text-left">
        <p className="mb-3 text-xs font-semibold tracking-widest text-[var(--color-neutral-400)] uppercase">
          What happens next
        </p>
        <ul className="flex flex-col gap-2 text-sm text-[var(--color-neutral-600)]">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[var(--color-brand-primary)]" aria-hidden="true">
              ›
            </span>
            We&apos;ll review your message and respond to your inquiry.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[var(--color-brand-primary)]" aria-hidden="true">
              ›
            </span>
            If your inquiry is project-related, we may follow up with questions.
          </li>
        </ul>
      </div>

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
        Send another message
      </button>
    </div>
  );
}

// ── Form component ────────────────────────────────────────────────────────────

interface ContactFormProps {
  /** HTML id for the form element */
  formId?: string;
}

/**
 * General contact form.
 * Uses the same patterns as M3 EstimateForm:
 *   - Native FormData on submit
 *   - Zod validation
 *   - submitContact() stub (M7+ CRM integration point)
 *
 * inquiryType drives CRM pipeline routing at M7+.
 */
export function ContactForm({ formId = 'contact-form' }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitError(null);

    const raw = readFormData(formRef.current);
    const result = contactFormSchema.safeParse(raw);

    if (!result.success) {
      setErrors(issuesToFieldErrors(result.error.issues));
      const firstErrorField = formRef.current.querySelector<HTMLElement>(
        '[aria-invalid="true"], .field-error'
      );
      firstErrorField?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const success = await submitContact(result.data);
      if (success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          'Something went wrong submitting your message. Please try again or use one of the estimate request forms.'
        );
      }
    } catch {
      setSubmitError(
        'Something went wrong submitting your message. Please try again or use one of the estimate request forms.'
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

  if (submitted) {
    return <ContactSuccessState onReset={handleReset} />;
  }

  return (
    <form
      ref={formRef}
      id={formId}
      onSubmit={handleSubmit}
      noValidate
      aria-label="General contact form"
      className="flex flex-col gap-6"
    >
      {/* ── Name row ─────────────────────────────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2">
        <EstimateField label="First Name" error={errors.firstName} required>
          {(id, describedBy) => (
            <input
              id={id}
              name="firstName"
              type="text"
              aria-describedby={describedBy}
              aria-invalid={!!errors.firstName}
              autoComplete="given-name"
              placeholder="First name"
              className={inputClasses(!!errors.firstName)}
            />
          )}
        </EstimateField>

        <EstimateField label="Last Name" error={errors.lastName} required>
          {(id, describedBy) => (
            <input
              id={id}
              name="lastName"
              type="text"
              aria-describedby={describedBy}
              aria-invalid={!!errors.lastName}
              autoComplete="family-name"
              placeholder="Last name"
              className={inputClasses(!!errors.lastName)}
            />
          )}
        </EstimateField>
      </div>

      {/* ── Email ────────────────────────────────────────────────────────── */}
      <EstimateField label="Email Address" error={errors.email} required>
        {(id, describedBy) => (
          <input
            id={id}
            name="email"
            type="email"
            aria-describedby={describedBy}
            aria-invalid={!!errors.email}
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses(!!errors.email)}
          />
        )}
      </EstimateField>

      {/* ── Phone (optional) ─────────────────────────────────────────────── */}
      <EstimateField
        label="Phone Number"
        hint="Optional — include if you prefer a phone call."
        error={errors.phone}
      >
        {(id, describedBy) => (
          <input
            id={id}
            name="phone"
            type="tel"
            aria-describedby={describedBy}
            aria-invalid={!!errors.phone}
            autoComplete="tel"
            placeholder="(831) 555-0000"
            className={inputClasses(!!errors.phone)}
          />
        )}
      </EstimateField>

      {/* ── Preferred Contact Method ─────────────────────────────────────── */}
      <EstimateField
        label="Preferred Contact Method"
        hint="How would you like us to reach out?"
        error={errors.preferredContactMethod}
      >
        {(id, describedBy) => (
          <select
            id={id}
            name="preferredContactMethod"
            aria-describedby={describedBy}
            aria-invalid={!!errors.preferredContactMethod}
            className={selectClasses(!!errors.preferredContactMethod)}
            defaultValue=""
          >
            <option value="">No preference</option>
            <option value="phone">Phone call</option>
            <option value="email">Email</option>
            <option value="either">Either — whatever is easiest</option>
          </select>
        )}
      </EstimateField>

      {/* ── Inquiry type — CRM routing at M7+ ───────────────────────────── */}
      <EstimateField
        label="Inquiry Type"
        hint="Helps us route your message to the right person."
        error={errors.inquiryType}
      >
        {(id, describedBy) => (
          <select
            id={id}
            name="inquiryType"
            aria-describedby={describedBy}
            aria-invalid={!!errors.inquiryType}
            className={selectClasses(!!errors.inquiryType)}
            defaultValue=""
          >
            <option value="">Select inquiry type</option>
            <option value="estimate-residential">Residential project estimate</option>
            <option value="estimate-commercial">Commercial project estimate</option>
            <option value="general">General question</option>
          </select>
        )}
      </EstimateField>

      {/* ── Message ──────────────────────────────────────────────────────── */}
      <EstimateField label="Message" error={errors.message} required>
        {(id, describedBy) => (
          <textarea
            id={id}
            name="message"
            rows={5}
            aria-describedby={describedBy}
            aria-invalid={!!errors.message}
            placeholder="Tell us about your project or question…"
            className={inputClasses(!!errors.message)}
          />
        )}
      </EstimateField>

      {/* ── Submit error ─────────────────────────────────────────────────── */}
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-[var(--radius-md)] border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 p-4 text-sm text-[var(--color-error)]"
        >
          {submitError}
        </div>
      )}

      {/* ── Submit button ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          id={`${formId}-submit`}
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
              <span className="sr-only">Submitting your message, please wait.</span>
            </>
          ) : (
            'Send Message'
          )}
        </button>

        {/* Privacy note */}
        <p className="text-center text-xs text-[var(--color-neutral-400)]">
          Your information is used only to respond to your inquiry. We do not sell or share your
          data.
        </p>
      </div>
    </form>
  );
}
