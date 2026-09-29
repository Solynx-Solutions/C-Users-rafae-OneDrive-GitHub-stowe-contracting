import Link from 'next/link';
import { generateMetadata } from '@/lib/metadata';
import { PageContainer } from '@/components/layout/page-container';

export const metadata = generateMetadata({ title: 'Privacy Policy', description: 'Privacy Policy for Stowe Contracting website inquiries and communications.', path: '/privacy-policy' });

export default function PolicyPage() {
  return (
    <PageContainer>
      <article className="mx-auto max-w-3xl py-16 md:py-24">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm">Last updated September 28, 2026</p>
        <div className="mt-10 space-y-9 text-base leading-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Information you provide</h2>
            <p>When you request an estimate or contact Stowe Contracting, Inc., we collect the details you submit: your name, email, phone number if supplied, and information about your project or inquiry. Estimate requests can also include your company, property type, services, timeline, and preferred contact method. Please do not include payment card details or other sensitive information in these forms.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How your information is used</h2>
            <p>We use your submission to receive and review your request, acknowledge it, route it to the Stowe team, and communicate with you about your project. Our website hosting, customer-management, and communication service providers process information needed to support these functions. Submitting an inquiry does not enroll you in a marketing campaign.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Optional text messages</h2>
            <p>The text-message checkbox is optional and unchecked by default. If you select it, your submitted phone number and consent record are used for messages about your inquiry and related appointment updates. Consent is not a condition of purchase. Message frequency varies; message and data rates may apply. Reply STOP to opt out or HELP for help. Mobile numbers and text-message consent are not shared with third parties for their own marketing. Service providers may process these records to support our communications.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Website operation and external links</h2>
            <p>The website and its hosting provider may process technical request information, such as IP address and browser details, to serve pages and help protect the service. Links to Facebook, LinkedIn, industry organizations, and other external websites lead to services with their own privacy practices.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Questions and corrections</h2>
            <p>To ask about information you submitted, request a correction or deletion, or change how we contact you, email adam@stowecontracting.com. Include enough information to identify your inquiry, but do not send sensitive documents. We may need to verify a request and retain records needed for an ongoing project or applicable obligations.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Policy updates</h2>
            <p>Updates to this notice will be posted on this page with a revised date. This notice describes this website and its inquiry forms.</p>
          </section>
          <nav aria-label="Policy navigation" className="flex flex-wrap gap-6">
            <Link className="underline underline-offset-4" href="/privacy-policy">Privacy Policy</Link>
            <Link className="underline underline-offset-4" href="/terms-of-service">Terms of Service</Link>
            <Link className="underline underline-offset-4" href="/contact">Contact Stowe</Link>
          </nav>
        </div>
      </article>
    </PageContainer>
  );
}
