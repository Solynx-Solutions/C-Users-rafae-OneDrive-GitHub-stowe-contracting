// =============================================================================
// COMMERCIAL DETAILS FIELDS
//
// Commercial-specific form section: Company Name, Contact Name.
// Injected into EstimateForm when estimateType === 'commercial'.
//
// These fields map directly to GoHighLevel / LeadConnector contact record:
//   companyName → Company field
//   contactName → Full Name field (commercial contact person)
//
// Uses native HTML inputs — values read via FormData on submit.
//
// Client Component.
// =============================================================================

'use client';

import { type FormErrors } from './EstimateField';
import { EstimateField, inputClasses } from './EstimateField';

interface CommercialDetailsFieldsProps {
  errors: FormErrors;
}

/**
 * Commercial-only contact fields.
 * Rendered above ContactDetailsSection on commercial estimate forms.
 * All inputs use the `name` attribute for FormData compatibility.
 */
export function CommercialDetailsFields({ errors }: CommercialDetailsFieldsProps) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="mb-1 text-base font-bold text-[var(--color-brand-secondary)]">
        Company Information
      </legend>

      {/* Company Name */}
      <EstimateField
        label="Company Name"
        hint="Business or organization requesting the estimate."
        error={errors.companyName}
      >
        {(id, describedBy) => (
          <input
            id={id}
            name="companyName"
            type="text"
            aria-describedby={describedBy}
            aria-invalid={!!errors.companyName}
            autoComplete="organization"
            placeholder="Your company or business name"
            className={inputClasses(!!errors.companyName)}
          />
        )}
      </EstimateField>

      {/* Contact Person */}
      <EstimateField
        label="Contact Person"
        hint="Name of the person we should reach out to."
        error={errors.contactName}
      >
        {(id, describedBy) => (
          <input
            id={id}
            name="contactName"
            type="text"
            aria-describedby={describedBy}
            aria-invalid={!!errors.contactName}
            autoComplete="name"
            placeholder="Full name of contact"
            className={inputClasses(!!errors.contactName)}
          />
        )}
      </EstimateField>
    </fieldset>
  );
}
