// =============================================================================
// SERVICES DATA
//
// All service records are PENDING until services are verified via the
// Adam Cox discovery interview and approved by Agent 03 Brand Messaging Guide.
//
// Do NOT add fictional, invented, or sample services.
// Do NOT add services not confirmed in the verified source record.
//
// When a service is verified:
//   1. Add a ClaimRecord to content/company-profile.ts
//   2. Set verificationStatus: 'confirmed', publicationStatus: 'active'
//   3. Add the ServiceRecord here
//   4. Update content/sources.ts to add the /services/[slug] route
// =============================================================================

import { type ServiceItem } from '@/types';

/**
 * All service records.
 * Currently empty — no individual services have been verified.
 * See content/verification-required.ts: vr-service-list
 */
export const services: ServiceItem[] = [];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(count = 6): ServiceItem[] {
  return services.slice(0, count);
}
