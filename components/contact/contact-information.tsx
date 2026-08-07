// =============================================================================
// CONTACT INFORMATION SECTION
//
// Renders confirmed contact details (phone, email, address, hours, area).
//
// GOVERNANCE:
//   - Only fields where verificationStatus === 'confirmed' AND
//     publicationStatus === 'active' are rendered.
//   - If no fields are confirmed, renders a governance-aware holding state.
//   - Does not show fake placeholders, invented hours, or placeholder addresses.
//   - "Monterey Bay" service area is the only confirmed contact field at M5.
//
// CURRENT STATE (M5):
//   - Phone: PENDING
//   - Email: PENDING
//   - Address: PENDING
//   - Hours: PENDING
//   - Service Area identity ("Monterey Bay"): CONFIRMED
//
// Server Component.
// =============================================================================

import {
  resolvePhone,
  resolveEmail,
  resolveAddress,
  resolveHours,
  resolveServiceAreaIdentity,
} from '@/content/contact';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

// ── Icons ─────────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.45 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/**
 * Contact information section.
 * Renders only confirmed + active contact fields.
 * If none are confirmed, shows a governance-aware state.
 *
 * At M5: only "Monterey Bay" service area identity is confirmed.
 * Phone, email, address, and hours render automatically when activated.
 */
export function ContactInformation() {
  const phone = resolvePhone();
  const email = resolveEmail();
  const address = resolveAddress();
  const hours = resolveHours();
  const serviceAreaIdentity = resolveServiceAreaIdentity();

  const hasAnyConfirmedField = phone || email || address || hours || serviceAreaIdentity;

  return (
    <ContentSection bg="white" aria-label="Contact information" id="contact-info">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeading
            level="h2"
            subtitle="Reach out to discuss your project. We serve residential and commercial clients across the Monterey Bay area."
          >
            Contact Details
          </SectionHeading>

          {hasAnyConfirmedField ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Phone — renders only when confirmed + active */}
              {phone && (
                <div
                  className={[
                    'flex flex-col gap-3',
                    'rounded-[var(--radius-xl)]',
                    'border border-[var(--color-neutral-200)]',
                    'bg-white p-5',
                  ].join(' ')}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    <PhoneIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold tracking-wide text-[var(--color-neutral-400)] uppercase">
                      Phone
                    </p>
                    <a
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="text-sm font-semibold text-[var(--color-brand-secondary)] transition-colors hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Email — renders only when confirmed + active */}
              {email && (
                <div
                  className={[
                    'flex flex-col gap-3',
                    'rounded-[var(--radius-xl)]',
                    'border border-[var(--color-neutral-200)]',
                    'bg-white p-5',
                  ].join(' ')}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    <EmailIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold tracking-wide text-[var(--color-neutral-400)] uppercase">
                      Email
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold break-all text-[var(--color-brand-secondary)] transition-colors hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {/* Address — renders only when confirmed + active with all fields */}
              {address && (
                <div
                  className={[
                    'flex flex-col gap-3',
                    'rounded-[var(--radius-xl)]',
                    'border border-[var(--color-neutral-200)]',
                    'bg-white p-5',
                  ].join(' ')}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    <MapIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold tracking-wide text-[var(--color-neutral-400)] uppercase">
                      Address
                    </p>
                    <address className="text-sm leading-snug font-semibold text-[var(--color-brand-secondary)] not-italic">
                      {address.street}
                      <br />
                      {address.city}, {address.state} {address.zip}
                    </address>
                  </div>
                </div>
              )}

              {/* Hours — renders only when confirmed + active */}
              {hours && (
                <div
                  className={[
                    'flex flex-col gap-3',
                    'rounded-[var(--radius-xl)]',
                    'border border-[var(--color-neutral-200)]',
                    'bg-white p-5',
                  ].join(' ')}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    <ClockIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold tracking-wide text-[var(--color-neutral-400)] uppercase">
                      Hours
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-brand-secondary)]">
                      {hours}
                    </p>
                  </div>
                </div>
              )}

              {/* Service Area — "Monterey Bay" is confirmed */}
              {serviceAreaIdentity && (
                <div
                  className={[
                    'flex flex-col gap-3',
                    'rounded-[var(--radius-xl)]',
                    'border border-[var(--color-neutral-200)]',
                    'bg-white p-5',
                  ].join(' ')}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  >
                    <MapIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold tracking-wide text-[var(--color-neutral-400)] uppercase">
                      Service Area
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-brand-secondary)]">
                      {serviceAreaIdentity}
                    </p>
                    <p className="text-xs text-[var(--color-neutral-500)]">
                      Residential &amp; Commercial
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ── Governance-aware holding state ────────────────────────────────
            // No confirmed contact fields. Show route-to-form message.
            <div
              className={[
                'rounded-[var(--radius-xl)]',
                'border border-[var(--color-neutral-200)]',
                'bg-[var(--color-neutral-50)]',
                'px-8 py-10',
                'flex flex-col items-center gap-4 text-center',
              ].join(' ')}
            >
              <p className="text-sm font-semibold text-[var(--color-neutral-600)]">
                The best way to reach us right now is through the contact form below.
              </p>
              <p className="text-xs text-[var(--color-neutral-400)]">
                Phone and email will be available here once our contact details are published.
              </p>
            </div>
          )}
        </div>
      </PageContainer>
    </ContentSection>
  );
}
