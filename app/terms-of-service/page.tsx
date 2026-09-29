import Link from 'next/link';
import { generateMetadata } from '@/lib/metadata';
import { PageContainer } from '@/components/layout/page-container';

export const metadata = generateMetadata({ title: 'Terms of Service', description: 'Terms of Service for Stowe Contracting website inquiries and communications.', path: '/terms-of-service' });

export default function PolicyPage() {
  return (
    <PageContainer>
      <article className="mx-auto max-w-3xl py-16 md:py-24">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm">Last updated September 28, 2026</p>
        <div className="mt-10 space-y-9 text-base leading-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Website and estimate requests</h2>
            <p>This website provides information about Stowe Contracting, Inc. and a way to inquire about residential and commercial projects. Sending a form requests a conversation or estimate. It does not book an appointment, confirm project availability, establish a construction contract, or authorize a charge.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Project agreements</h2>
            <p>Project scope, pricing, scheduling, and any applicable project terms are established separately with Stowe Contracting. Website descriptions and photographs do not replace the written agreement for your project.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Information you submit</h2>
            <p>Provide accurate contact information and only information you are authorized to share. Do not use the forms to send spam, harmful material, or payment card details. A submission confirmation indicates receipt of your request, not acceptance of a project.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Communications and optional text messages</h2>
            <p>Stowe may respond to your inquiry using the contact details you provide. Text updates about your inquiry and related appointments require the separate optional text-message consent. Consent is not a condition of purchase. Message frequency varies and message and data rates may apply. Reply STOP to opt out or HELP for help. Delivery depends on the messaging service and your carrier; an online request does not guarantee an immediate response.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Privacy and questions</h2>
            <p>Our Privacy Policy explains how website inquiry information is handled. For questions about these terms or your request, contact adam@stowecontracting.com.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">External websites and updates</h2>
            <p>External links are provided for convenience and are governed by those websites’ own terms. We may update this page; the revision date identifies the current version.</p>
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
