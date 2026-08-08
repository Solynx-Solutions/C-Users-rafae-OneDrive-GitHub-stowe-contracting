// =============================================================================
// CONTACT PAGE — /contact
//
// Contact and conversion trust layer for Stowe Contracting.
//
// Page structure:
//   1. ContactHero — positioning and approved messaging
//   2. ContactInformation — governance-gated contact fields (phone, email, etc.)
//   3. ContactRouting — residential / commercial project pathways
//   4. ContactTrustSection — local ownership, crew accountability, continuity
//   5. Contact form section — general inquiry form
//
// Governance:
//   - All claims sourced from confirmed content records
//   - Contact fields render only when verified + active
//   - No invented contact details, no placeholder values
//   - No response time guarantees
//   - No unsupported service areas
//
// M5 status:
//   - Route: confirmed + active
//   - Contact details (phone, email, address, hours): PENDING vr-contact-information
//   - Only "Monterey Bay" service area identity renders
//
// Server Component (page level).
// =============================================================================

import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { contactPageSchema, localBusinessSchema, breadcrumbSchema } from '@/lib/schema';

// ── Page components ────────────────────────────────────────────────────────────
import {
  ContactHero,
  ContactInformation,
  ContactRouting,
  ContactTrustSection,
  ContactForm,
} from '@/components/contact';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Contact Stowe Contracting to discuss your residential or commercial project. Locally owned and operated in the Monterey Bay area.',
  path: '/contact',
});

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  // ── Schema ─────────────────────────────────────────────────────────────────
  const contactSchema = contactPageSchema({ url: '/contact' });
  const businessSchema = localBusinessSchema();
  const crumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  const schemas = [contactSchema, businessSchema, crumbs].filter(Boolean);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* 1 — Hero */}
      <ContactHero />

      {/* 2 — Contact information */}
      <ContactInformation />

      {/* 3 — Project routing */}
      <ContactRouting />

      {/* 4 — Trust section */}
      <ContactTrustSection />

      {/* 5 — General contact form */}
      <ContentSection bg="neutral" aria-label="Send a general message" id="contact-form">
        <PageContainer>
          <div className="flex flex-col gap-10">
            <SectionHeading
              level="h2"
              subtitle="Not sure where to start, or just have a quick question? Fill out the form below and we'll get back to you."
            >
              Send a Message
            </SectionHeading>

            {/* Two-column layout on larger screens */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Form */}
              <div>
                <ContactForm formId="contact-page-form" />
              </div>

              {/* Supporting note — no invented content */}
              <aside
                className={[
                  'flex flex-col gap-6',
                  'rounded-[var(--radius-xl)]',
                  'border border-[var(--color-neutral-200)]',
                  'bg-white p-8',
                  'self-start',
                ].join(' ')}
                aria-label="Additional contact options"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-[var(--color-brand-secondary)]">
                    Prefer to request an estimate directly?
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-600)]">
                    If you already know you need a project estimate, use one of the dedicated
                    estimate forms — they&apos;ll help us understand your project before we reach
                    out.
                  </p>
                </div>

                {/* Estimate links */}
                <div className="flex flex-col gap-3">
                  <a
                    href="/estimate/residential"
                    id="contact-form-sidebar-residential"
                    className={[
                      'inline-flex items-center gap-2',
                      'rounded-[var(--radius-md)] px-4 py-3',
                      'bg-[var(--color-brand-primary)] text-white',
                      'text-sm font-bold',
                      'hover:bg-[var(--color-brand-primary-dark)]',
                      'transition-colors duration-150',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]',
                      'shadow-[var(--shadow-brand)]',
                    ].join(' ')}
                  >
                    Residential Estimate
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href="/estimate/commercial"
                    id="contact-form-sidebar-commercial"
                    className={[
                      'inline-flex items-center gap-2',
                      'rounded-[var(--radius-md)] px-4 py-3',
                      'border border-[var(--color-brand-secondary)]',
                      'text-sm font-bold text-[var(--color-brand-secondary)]',
                      'hover:bg-[var(--color-brand-secondary)] hover:text-white',
                      'transition-colors duration-150',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-secondary)]',
                    ].join(' ')}
                  >
                    Commercial Estimate
                    <span aria-hidden="true">→</span>
                  </a>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--color-neutral-200)]" role="separator" />

                <p className="text-xs leading-relaxed text-[var(--color-neutral-500)]">
                  Stowe Contracting serves residential and commercial clients in the Monterey Bay
                  area. We do not provide services outside our established service region.
                </p>
              </aside>
            </div>
          </div>
        </PageContainer>
      </ContentSection>
    </>
  );
}
