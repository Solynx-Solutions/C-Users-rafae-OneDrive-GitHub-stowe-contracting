import { SMS_CONSENT_TEXT } from '@/lib/validations/smsConsent';

export function SmsConsent({ error }: { error?: string }) {
  return (
    <div className="space-y-2 text-sm">
      <label className="flex items-start gap-3">
        <input type="checkbox" name="smsConsent" className="mt-1" />
        <span>{SMS_CONSENT_TEXT}</span>
      </label>
      {error && <p role="alert" className="text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
