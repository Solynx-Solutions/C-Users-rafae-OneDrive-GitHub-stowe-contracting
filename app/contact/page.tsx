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

      {/* 3 — Trust section */}
      <ContactTrustSection />

      {/* 4 — One clear project inquiry form */}
      <ContentSection bg="neutral" aria-label="Send a general message" id="contact-form">
        <PageContainer>
          <div className="flex flex-col gap-10">
            <SectionHeading
              level="h2"
              subtitle="Not sure where to start, or just have a quick question? Fill out the form below and we'll get back to you."
            >
              Send a Message
            </SectionHeading>

            <div className="max-w-3xl">
              {/* Form */}
              <div>
                <ContactForm formId="contact-page-form" />
              </div>
            </div>
          </div>
        </PageContainer>
      </ContentSection>
    </>
  );
}
