// =============================================================================
// SITE FOOTER
// Global site footer with brand lockup, legal nav links, and governed claims.
// Contact information is NOT included — pending vr-contact-information blocker.
// Only individually verified social links are included.
// Server Component.
// =============================================================================

import { FooterBrand } from '@/components/brand/footer-brand';
import { PageContainer } from './page-container';
import { TextLink } from '@/components/ui/text-link';
import { Divider } from '@/components/ui/divider';
import { footerNavFull } from '@/data/navigation';
import { isPublishable } from '@/lib/content';
import { siteRoutes } from '@/content/sources';
import { siteConfig } from '@/data/siteConfig';

/**
 * Global site footer.
 * - Footer brand (wordmark + positioning statement)
 * - Legal navigation (privacy policy, terms — filtered by governance)
 * - Copyright line
 *
 * BLOCKED items (pending verification blockers):
 * - Phone number (vr-contact-information)
 * - Email address (vr-contact-information)
 * - Physical address (vr-contact-information)
 * - Unverified social media links (vr-social-profiles)
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  // Filter footer nav through governance
  const publishableFooterRoutes = siteRoutes.filter(
    (route) => footerNavFull.some((item) => item.href === route.path) && isPublishable(route)
  );
  const footerNavItems = footerNavFull.filter((item) =>
    publishableFooterRoutes.some((route) => route.path === item.href)
  );

  return (
    <footer
      className="bg-[var(--color-brand-secondary)] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <PageContainer>
        {/* Main footer body */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
            {/* Brand column */}
            <div className="md:col-span-2 lg:col-span-2">
              <FooterBrand />
            </div>

            {/* Company column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest text-[var(--color-neutral-400)] uppercase">
                Company
              </p>
              {/* Only confirmed+active routes appear here. During M1, Home only. */}
              <nav aria-label="Footer company navigation">
                <ul role="list" className="flex flex-col gap-2">
                  {/* Listing the publishable company nav items — Home only at M1 */}
                  {siteRoutes
                    .filter(
                      (route) =>
                        isPublishable(route) &&
                        !footerNavFull.some((item) => item.href === route.path)
                    )
                    .map((route) => (
                      <li key={route.path}>
                        <TextLink
                          href={route.path}
                          variant="subtle"
                          className="text-[var(--color-neutral-300)] hover:text-white"
                        >
                          {route.label}
                        </TextLink>
                      </li>
                    ))}
                  {/* Placeholder for draft routes (not rendered) */}
                </ul>
              </nav>
            </div>

            {/* Contact column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest text-[var(--color-neutral-400)] uppercase">
                Contact
              </p>
              {/* Contact details blocked — pending vr-contact-information */}
              <p className="text-sm leading-relaxed text-[var(--color-neutral-400)]">
                Serving Monterey Bay.
                {/* Phone/email/address added once vr-contact-information resolves. */}
              </p>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stowe Contracting on Facebook (opens in a new tab)"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--color-neutral-200)] transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span aria-hidden="true" className="text-base font-bold">
                  f
                </span>
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <Divider className="border-[var(--color-neutral-700)]" />
        <div className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--color-neutral-400)]">
            &copy; {currentYear} Stowe Contracting. All rights reserved.
          </p>

          {/* SOLYNX attribution — required */}
          <p className="text-xs text-[var(--color-neutral-500)]">
            Website designed, built &amp; managed by{' '}
            <a
              href="https://solynx.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'text-[var(--color-neutral-400)]',
                'hover:text-[var(--color-neutral-200)]',
                'transition-colors duration-150',
                'underline underline-offset-2',
              ].join(' ')}
            >
              SOLYNX
            </a>
          </p>

          {/* Legal nav — only confirmed+active */}
          {footerNavItems.length > 0 && (
            <nav aria-label="Footer legal navigation">
              <ul role="list" className="flex flex-wrap gap-4">
                {footerNavItems.map((item) => (
                  <li key={item.href}>
                    <TextLink
                      href={item.href}
                      variant="subtle"
                      className="text-xs text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)]"
                    >
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </PageContainer>
    </footer>
  );
}
