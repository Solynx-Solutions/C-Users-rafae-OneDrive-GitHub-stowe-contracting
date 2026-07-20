import Link from 'next/link';

// =============================================================================
// 404 NOT FOUND
//
// Phone CTA removed: phone number is pending verification.
// See content/verification-required.ts: vr-contact-information
// When the phone number is a confirmed + active content record,
// a contact CTA may be re-added pointing to the /contact page route.
// =============================================================================

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-secondary sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-neutral-500">
        Sorry, we couldn&apos;t find the page you were looking for. It may have moved or been
        removed.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
