// =============================================================================
// CONTACT DETAILS SECTION
//
// Form section: First Name, Last Name, Email, Phone, Preferred Contact Method.
// Reusable across both residential and commercial estimate forms.
//
// M3 change: Splits "name" into firstName + lastName for CRM compatibility.
// Adds preferredContactMethod select for lead routing.
//
// Uses native HTML inputs — values read via FormData on submit.
// Errors are passed in as a plain record from the parent EstimateForm.
//
// Client Component.
// =============================================================================

'use client';

import { type FormErrors } from './EstimateField';
import { EstimateField, inputClasses } from './EstimateField';
import { cn } from '@/lib/utils';

// ── Shared select classes ─────────────────────────────────────────────────────

function selectClasses(hasError = false) {
  return cn(
    inputClasses(hasError),
    'appearance-none',
    // Custom chevron via background SVG
    "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")]",
    'bg-[right_0.75rem_center] bg-no-repeat pr-10'
  );
}

interface ContactDetailsSectionProps {
  errors: FormErrors;
}

/**
 * Contact fields section for the estimate form.
 * All inputs use the `name` attribute for FormData compatibility.
 * firstName + lastName are kept separate for GoHighLevel / LeadConnector mapping.
 */
export function ContactDetailsSection({ errors }: ContactDetailsSectionProps) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="mb-1 text-base font-bold text-[var(--color-brand-secondary)]">
        Your Contact Information
      </legend>

      {/* Name row — two columns on sm+ */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* First Name */}
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

        {/* Last Name */}
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

      {/* Email */}
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

      {/* Phone */}
      <EstimateField
        label="Phone Number"
        hint="Best number to reach you for project consultation."
        error={errors.phone}
        required
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

      {/* Preferred Contact Method */}
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
    </fieldset>
  );
}
