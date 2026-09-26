import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { localBusinessSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema';
import { ServiceGrid } from '@/components/services/service-grid';
import { PageContainer } from '@/components/layout/page-container';
import { ContentSection } from '@/components/layout/content-section';
import { SectionHeading } from '@/components/layout/section-heading';

export const metadata: Metadata = generatePageMetadata({
  title: 'Services',
  description: 'Explore Stowe Contracting’s paving stones, construction and remodeling, grading and site preparation, and synthetic grass services in Monterey Bay.',
  path: '/services',
});

export default function ServicesPage() {
  const schema = [
    webPageSchema({ name: 'Services — Stowe Contracting', description: metadata.description ?? '', url: '/services' }),
    localBusinessSchema(),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]),
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section aria-label="Services overview" className="bg-[var(--color-brand-secondary)] py-20 md:py-28">
      <PageContainer>
        <p className="mb-6 text-xs tracking-[.22em] text-white/70 uppercase">Stowe Contracting · Monterey Bay · Since 1987</p>
        <h1 className="max-w-4xl text-5xl leading-tight text-white md:text-6xl">From the ground up.<br />Down to the finishing detail.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">Paving stones, construction, earthwork and outdoor improvements. Explore the work our crews bring together for homes and commercial properties.</p>
        <a href="#service-collection" className="mt-8 inline-flex min-h-12 items-center border-b border-white/50 text-white">Explore our services ↓</a>
      </PageContainer>
    </section>
    <ContentSection bg="neutral" aria-label="Available services">
      <PageContainer>
        <div id="service-collection" className="scroll-mt-28 space-y-10">
          <SectionHeading level="h2" subtitle="Find the right starting point for your property. Each service includes scope, real project photography and a path to discuss your plans.">Four capabilities. One considered approach.</SectionHeading>
          <ServiceGrid />
        </div>
      </PageContainer>
    </ContentSection>
    <ContentSection bg="white" aria-label="Residential and commercial projects">
      <PageContainer>
        <div className="grid gap-10 md:grid-cols-2">
          <div><h2 className="text-3xl text-[var(--color-brand-secondary)]">For your home.</h2><p className="mt-4 leading-relaxed text-[var(--color-neutral-600)]">A new driveway, a patio for gathering, a kitchen or bathroom remodel, or a custom home. Tell us how you want the property to work for you.</p></div>
          <div><h2 className="text-3xl text-[var(--color-brand-secondary)]">For your next project.</h2><p className="mt-4 leading-relaxed text-[var(--color-neutral-600)]">Commercial improvements, paved outdoor spaces and site preparation. We can discuss the construction and exterior scopes together.</p></div>
        </div>
        <Link href="/projects" className="mt-10 inline-flex min-h-12 items-center border-b border-[var(--color-brand-primary)] font-semibold text-[var(--color-brand-primary)]">See more of our work ↗</Link>
      </PageContainer>
    </ContentSection>
    <ContentSection bg="neutral" aria-label="Discuss your project">
      <PageContainer><div className="flex flex-col items-center gap-5 py-6 text-center">
        <h2 className="text-3xl text-[var(--color-brand-secondary)]">What do you have in mind?</h2>
        <p className="max-w-xl leading-relaxed text-[var(--color-neutral-600)]">Share the project location and the work you are considering. Our team will help identify the right starting point.</p>
        <Link href="/contact#contact-form" className="inline-flex min-h-14 items-center bg-[var(--color-brand-primary)] px-7 font-semibold text-white hover:bg-[var(--color-brand-primary-dark)]">Discuss Your Project</Link>
      </div></PageContainer>
    </ContentSection>
  </>;
}
