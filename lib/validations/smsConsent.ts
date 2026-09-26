import { z } from 'zod';

export const SMS_CONSENT_VERSION = 'stowe-inquiry-sms-v1-2026-09-25';
export const SMS_CONSENT_TEXT = 'I agree to receive text messages from Stowe Contracting about this inquiry and related appointment updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is optional and is not a condition of purchase.';

// Native unchecked checkboxes are absent. Never coerce the string "false" to true.
export const smsConsentField = z.preprocess(
  (value) => value === 'on' ? true : value === undefined ? false : value,
  z.boolean()
).optional();

export function smsPhoneIsValid(value?: string): boolean {
  if (!value || !/^\+?[\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  if (value.startsWith('+') && !digits.startsWith('1')) return /^[2-9]\d{7,14}$/.test(digits);
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return (!value.startsWith('+') || digits.length === 11) && /^[2-9]\d{2}[2-9]\d{6}$/.test(national);
}
