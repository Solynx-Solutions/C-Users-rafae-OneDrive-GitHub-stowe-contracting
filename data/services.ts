// Compatibility view of the governed registry; no second, empty service catalogue.
import { type ServiceItem } from '@/types';
import { getPublishableServices } from '@/content/serviceRegistry';
export const services: ServiceItem[] = getPublishableServices().map((service) => ({
  slug: service.slug ?? service.serviceKey,
  title: service.name,
  shortDescription: service.description,
  description: service.summary ?? service.description,
  image: service.photos?.[0]?.src,
  features: service.capabilityHighlights,
  relatedServices: service.relatedServices,
}));
export function getServiceBySlug(slug: string) { return services.find((service) => service.slug === slug); }
export function getFeaturedServices(count = 6) { return services.slice(0, count); }
