// =============================================================================
// PROJECT DETAILS SECTION
//
// Form section: service type, description, timeline, budget.
// Accepts a `serviceOptions` prop to allow residential and commercial pages
// to supply their own option sets without duplicating this component.
//
// M3: Added `propertyType` field (residential only — hidden in commercial via
//     the `showPropertyType` prop). Added `scopeLabel` prop to change the
//     description field label for commercial submissions.
//
// GOVERNANCE: serviceType options are structural labels only — no specific
// capability claims. The vr-service-list blocker remains inactive.
//
// Uses native HTML inputs — values read via FormData on submit.
//
// Client Component.
// =============================================================================

'use client';

import { type FormErrors } from './EstimateField';
import { EstimateField, inputClasses } from './EstimateField';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceOption {
  value: string;
  label: string;
}

interface ProjectDetailsSectionProps {
  errors: FormErrors;
  serviceOptions: ServiceOption[];
  /**
   * When true, renders the propertyType select (residential only).
   * Defaults to false.
   */
  showPropertyType?: boolean;
  /**
   * Label override for the project description textarea.
   * Defaults to "Project Description".
   * Use "Scope Description" for commercial.
   */
  scopeLabel?: string;
}

// ─── Timeline options — neutral, no guarantees ────────────────────────────────

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select a timeframe' },
  { value: 'flexible', label: 'Flexible / No rush' },
  { value: '1-3-months', label: 'Within 1–3 months' },
  { value: '3-6-months', label: 'Within 3–6 months' },
  { value: 'asap', label: 'As soon as possible' },
];

// ─── Residential property type options ───────────────────────────────────────

const PROPERTY_TYPE_OPTIONS = [
  { value: '', label: 'Select a property type' },
  { value: 'single-family', label: 'Single-Family Home' },
  { value: 'multi-family', label: 'Multi-Family / Duplex / ADU' },
  { value: 'townhome', label: 'Townhome or Condo' },
  { value: 'rural', label: 'Rural / Agricultural Property' },
  { value: 'vacant-lot', label: 'Vacant Lot' },
  { value: 'other', label: 'Other' },
];

// ─── Budget options — no cost guarantees ─────────────────────────────────────

const BUDGET_OPTIONS = [
  { value: '', label: 'Select a range (optional)' },
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-25k', label: '$10,000 – $25,000' },
  { value: '25k-50k', label: '$25,000 – $50,000' },
  { value: '50k-100k', label: '$50,000 – $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
  { value: 'unknown', label: 'Not sure yet' },
];

// ─── Shared select classes ────────────────────────────────────────────────────

function selectClasses(hasError = false) {
  return cn(
    inputClasses(hasError),
    'appearance-none',
    // Custom chevron via background SVG
    "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")]",
    'bg-[right_0.75rem_center] bg-no-repeat pr-10'
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Project details section — service type, description, timeline, budget.
 * All inputs use the `name` attribute for FormData compatibility.
 */
export function ProjectDetailsSection({
  errors,
  serviceOptions,
  showPropertyType = false,
  scopeLabel = 'Project Description',
}: ProjectDetailsSectionProps) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="mb-1 text-base font-bold text-[var(--color-brand-secondary)]">
        Project Information
      </legend>

      {/* Property Type — residential only */}
      {showPropertyType && (
        <EstimateField label="Property Type" error={errors.propertyType}>
          {(id, describedBy) => (
            <select
              id={id}
              name="propertyType"
              aria-describedby={describedBy}
              aria-invalid={!!errors.propertyType}
              className={selectClasses(!!errors.propertyType)}
            >
              {PROPERTY_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </EstimateField>
      )}

      {/* Service Type */}
      <EstimateField label="Project Type" error={errors.serviceType} required>
        {(id, describedBy) => (
          <select
            id={id}
            name="serviceType"
            aria-describedby={describedBy}
            aria-invalid={!!errors.serviceType}
            className={selectClasses(!!errors.serviceType)}
          >
            <option value="">Select a project type</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </EstimateField>

      {/* Project / Scope Description */}
      <EstimateField
        label={scopeLabel}
        hint="Describe what you're looking to accomplish. More detail helps us prepare."
        error={errors.projectDescription}
        required
      >
        {(id, describedBy) => (
          <textarea
            id={id}
            name="projectDescription"
            aria-describedby={describedBy}
            aria-invalid={!!errors.projectDescription}
            rows={5}
            placeholder="Describe your project — what you need, site conditions, scope, etc."
            className={cn(inputClasses(!!errors.projectDescription), 'resize-y')}
          />
        )}
      </EstimateField>

      {/* Timeline */}
      <EstimateField label="Desired Timeframe" error={errors.timeline}>
        {(id, describedBy) => (
          <select
            id={id}
            name="timeline"
            aria-describedby={describedBy}
            aria-invalid={!!errors.timeline}
            className={selectClasses(!!errors.timeline)}
          >
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </EstimateField>

      {/* Budget */}
      <EstimateField
        label="Approximate Budget"
        hint="Optional. Helps us understand project scope. No commitment required."
        error={errors.budget}
      >
        {(id, describedBy) => (
          <select
            id={id}
            name="budget"
            aria-describedby={describedBy}
            aria-invalid={!!errors.budget}
            className={selectClasses(!!errors.budget)}
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </EstimateField>
    </fieldset>
  );
}
