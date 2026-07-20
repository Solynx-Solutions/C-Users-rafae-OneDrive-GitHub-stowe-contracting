import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS class names safely, resolving conflicts.
 * Use this everywhere conditional or composed classNames are needed.
 *
 * @example cn('px-4 py-2', condition && 'bg-brand-primary', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a phone number string for display.
 * Input: '5555555555' → Output: '(555) 555-5555'
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

/**
 * Format a phone number as a tel: href.
 * Input: '(555) 555-5555' → Output: 'tel:+15555555555'
 */
export function formatPhoneHref(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `tel:+1${cleaned}`;
}

/**
 * Truncate a string to a maximum length, appending an ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Convert a string to a URL-safe slug.
 * Input: 'Concrete Flatwork & Driveways' → Output: 'concrete-flatwork-driveways'
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Check if a URL is external (starts with http/https).
 */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}
