// =============================================================================
// ESTIMATE FIELD
//
// Reusable accessible form field wrapper.
// Renders a label, input/textarea/select, and error message.
//
// Client Component — used inside EstimateForm which requires 'use client'.
// =============================================================================

'use client';

import { type ReactNode, useId } from 'react';
import { cn } from '@/lib/utils';
import { type EstimateFormValues } from '@/lib/validations/estimateForm';

// ─── Shared form error type ───────────────────────────────────────────────────

/**
 * Flat map of field name → error message string.
 * Produced by Zod validation in EstimateForm and passed to section components.
 */
export type FormErrors = Partial<Record<keyof EstimateFormValues, string>>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface EstimateFieldBaseProps {
  label: string;
  /** Additional accessible description (shown below input) */
  hint?: string;
  /** Validation error message */
  error?: string;
  required?: boolean;
  className?: string;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Accessible field wrapper for EstimateForm fields.
 * Automatically generates unique IDs for label/input association.
 * Renders error messages with aria-live for screen reader announcements.
 *
 * Usage:
 *   <EstimateField label="Full Name" error={errors.name?.message} required>
 *     {(id, describedBy) => (
 *       <input id={id} aria-describedby={describedBy} {...register('name')} />
 *     )}
 *   </EstimateField>
 */
export function EstimateField({
  label,
  hint,
  error,
  required = false,
  className,
  children,
}: EstimateFieldBaseProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {/* Label */}
      <label
        htmlFor={id}
        className={cn(
          'text-sm font-semibold text-[var(--color-brand-secondary)]',
          required && "after:ml-0.5 after:text-[var(--color-error)] after:content-['*']"
        )}
      >
        {label}
      </label>

      {/* Hint */}
      {hint && (
        <p id={hintId} className="text-xs leading-snug text-[var(--color-neutral-500)]">
          {hint}
        </p>
      )}

      {/* Field slot */}
      {children(id, describedBy)}

      {/* Error */}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs font-medium text-[var(--color-error)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Shared input class builder ───────────────────────────────────────────────

/**
 * Returns the consistent className string for all text-based inputs.
 * Pass `hasError` to apply error border state.
 */
export function inputClasses(hasError = false) {
  return cn(
    'w-full rounded-[var(--radius-md)] border px-4 py-3',
    'bg-white text-sm text-[var(--color-neutral-800)]',
    'placeholder:text-[var(--color-neutral-400)]',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-0',
    'focus:border-[var(--color-brand-primary)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    hasError
      ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
      : 'border-[var(--color-neutral-300)] hover:border-[var(--color-neutral-400)]'
  );
}
