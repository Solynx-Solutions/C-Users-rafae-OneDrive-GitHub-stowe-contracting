'use server';

import { submitContact, type SubmitContactResult } from './submitContact';
import { type ContactFormValues } from '@/lib/validations/contactForm';

export async function submitContactAction(
  data: ContactFormValues,
  honeypotValue?: string
): Promise<SubmitContactResult> {
  return submitContact(data, honeypotValue);
}
