// =============================================================================
// SERVICE DETAIL PAGE — /services/[slug]
//
// Dynamic route for individual service pages.
//
// GOVERNANCE:
//   - Only confirmed + active services render a detail page
//   - If slug resolves to an inactive/pending/draft service → 404
//   - If slug resolves to a service with canonicalPath → permanent redirect
//     (handles mechanical-installation → /mechanical-installation)
//   - No fake content, no placeholder projects, no invented team details
//
// MECHANICAL INSTALLATION CANONICAL:
//   The mechanical-installation service record carries canonicalPath:
//   '/mechanical-installation'. When this slug is requested, it permanently
//   redirects to the authority page. No duplicate SEO content created.
//
// MEDIA:
//   - Media sections are hidden when service.mediaStatus !== 'ready'
//   - No stock imagery is used as Stowe project work
//   - Photography pending client delivery
//
// EMPTY STATE:
//   At M6, zero service records are confirmed + active except
//   mechanical-installation which redirects. This page builds the architecture
//   but renders nothing publicly until vr-service-list resolves.
//
// SEO:
//   - Unique metadata per publishable service
//   - Canonical URL enforced
//   - BreadcrumbList schema
//   - Service schema (via lib/schema.ts — currently returns null for unverified)
//   - noIndex applied to draft services (extra safety layer)
//
// Server Component (page level).
// =============================================================================

import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { webPageSchema, localBusinessSchema, breadcrumbSchema } from '@/lib/schema';
import { getServiceBySlug, getPublishableServices } from '@/content/serviceRegistry';
import { PageContainer } from '@/components/layout/page-container';
import { ContentSection } from '@/components/layout/content-section';
import { SectionHeading } from '@/components/layout/section-heading';
import {
  ServiceAudienceBadge,
  ServiceCapabilityList,
  ServiceProcess,
  RelatedServices,
  ServiceEstimateCta,
} from '@/components/services';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

// =============================================================================
// STATIC PARAMS — only build pages for confirmed + active services
// =============================================================================

export async function generateStaticParams() {
  const publishable = getPublishableServices();
  // Filter out services with canonicalPath — they redirect, no detail page built
  return publishable.filter((s) => !s.canonicalPath).map((s) => ({ slug: s.slug ?? s.serviceKey }));
}

// =============================================================================
// METADATA
// =============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // Not found or not publishable
  if (
    !service ||
    service.verificationStatus !== 'confirmed' ||
    service.publicationStatus !== 'active'
  ) {
    return generatePageMetadata({ title: 'Service Not Found', noIndex: true });
  }

  // Canonical redirect — metadata handled by the authority page
  if (service.canonicalPath) {
    return generatePageMetadata({ title: service.name, noIndex: true });
  }

  return generatePageMetadata({
    title: service.seo?.title ?? service.name,
    description: service.seo?.description ?? service.description,
    path: service.seo?.path ?? `/services/${slug}`,
  });
}

// =============================================================================
// PAGE
// =============================================================================

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // ── 404: no record or not publishable ──────────────────────────────────────
  if (
    !service ||
    service.verificationStatus !== 'confirmed' ||
    service.publicationStatus !== 'active'
  ) {
    notFound();
  }

  // ── Canonical redirect (e.g., mechanical-installation) ────────────────────
  if (service.canonicalPath) {
    redirect(service.canonicalPath);
  }

  // ── Schema ─────────────────────────────────────────────────────────────────
  const pagePath = service.seo?.path ?? `/services/${slug}`;
  const pageSchema = webPageSchema({
    name: service.seo?.title ?? service.name,
    description: service.seo?.description ?? service.description,
    url: pagePath,
  });
  const businessSchema = localBusinessSchema();
  const crumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.name, url: pagePath },
  ]);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, businessSchema, crumbs]),
        }}
      />

      {/* ── Breadcrumbs ──────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)]">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.name },
            ]}
          />
        </PageContainer>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        aria-label={`${service.name} — service overview`}
        className="bg-[var(--color-brand-secondary)] py-20 md:py-28"
      >
        <PageContainer>
          <div className="flex flex-col gap-6">
            {/* Audience badge */}
            <ServiceAudienceBadge audience={service.audience} />

            {/* Heading */}
            <div className="flex max-w-3xl flex-col gap-4">
              <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-white md:text-6xl">
                {service.name}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/70">
                {service.summary ?? service.description}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Capability highlights ─────────────────────────────────────────── */}
      {service.capabilityHighlights && service.capabilityHighlights.length > 0 && (
        <ContentSection bg="white" aria-label="Service capabilities">
          <PageContainer>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <SectionHeading level="h2">What This Service Covers</SectionHeading>
                <ServiceCapabilityList
                  highlights={service.capabilityHighlights}
                  heading="Capability Highlights"
                />
              </div>

              {/* Benefits column — only rendered when defined */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="flex flex-col gap-6">
                  <SectionHeading level="h2">Why Choose Stowe</SectionHeading>
                  <ServiceCapabilityList highlights={service.benefits} heading="Benefits" />
                </div>
              )}
            </div>
          </PageContainer>
        </ContentSection>
      )}

      {/* ── Process ──────────────────────────────────────────────────────── */}
      {service.process && service.process.length > 0 && (
        <ContentSection bg="neutral" aria-label="Service process">
          <PageContainer>
            <ServiceProcess steps={service.process} />
          </PageContainer>
        </ContentSection>
      )}

      {/* ── Media section ─────────────────────────────────────────────────── */}
      {/* Only rendered when mediaStatus === 'ready' (photography available) */}
      {service.mediaStatus === 'ready' && !!service.photos?.length && (
        <ContentSection bg="white" aria-label="Service photography">
          <PageContainer>
            <div className="flex flex-col gap-6">
              <SectionHeading level="h2">Our Work</SectionHeading>
              <p className="max-w-2xl leading-relaxed text-[var(--color-neutral-600)]">{service.serviceKey === 'construction-remodeling' ? 'Interior remodeling from Stowe’s original project collection.' : 'Selected photographs from Stowe’s project collection. Open any image to see the full photograph.'}</p>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {service.photos.map((photo) => <figure key={photo.src} className="overflow-hidden border border-[var(--color-neutral-200)] bg-white">
                  <a href={photo.src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[4/3] overflow-hidden" aria-label={`View full photograph: ${photo.title}`}>
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 900px) 44vw, 90vw" className="object-contain bg-[var(--color-neutral-50)]" />
                    <span aria-hidden="true" className="absolute right-3 bottom-3 bg-white px-3 py-2 text-sm">View full photograph ↗</span>
                  </a>
                  <figcaption className="p-5"><h3 className="text-xl text-[var(--color-brand-secondary)]">{photo.title}</h3>{photo.description && <p className="mt-2 text-sm leading-relaxed text-[var(--color-neutral-600)]">{photo.description}</p>}</figcaption>
                </figure>)}
              </div>
            </div>
          </PageContainer>
        </ContentSection>
      )}

      {/* ── Related services ──────────────────────────────────────────────── */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <ContentSection bg="white" aria-label="Related services">
          <PageContainer>
            <RelatedServices serviceKey={service.serviceKey} />
          </PageContainer>
        </ContentSection>
      )}

      {/* ── Estimate CTA ─────────────────────────────────────────────────── */}
      <ContentSection bg="neutral" aria-label="Request an estimate">
        <PageContainer>
          <ServiceEstimateCta
            audience={service.audience}
            heading={`Start Your ${service.name} Project`}
            idPrefix={`service-detail-${service.serviceKey}`}
          />
        </PageContainer>
      </ContentSection>
    </>
  );
}
