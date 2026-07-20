// =============================================================================
// TESTIMONIALS DATA
//
// All testimonials are INACTIVE until:
//   1. Real, attributed testimonials are provided by the client
//   2. Each testimonial is verified against a Priority-1 source
//   3. Each is registered as a confirmed + active GovernedContent record
//   4. The Review System integration (M13+) is activated
//
// Do NOT add fictional, invented, or sample testimonials.
// See content/verification-required.ts: vr-testimonials
// See content/prohibited-claims.ts: testimonials
// =============================================================================

import { type TestimonialItem } from '@/types';

/**
 * All testimonial records.
 * Currently empty — no testimonials have been verified.
 */
export const testimonials: TestimonialItem[] = [];

export function getFeaturedTestimonials(count = 3): TestimonialItem[] {
  return testimonials.slice(0, count);
}
