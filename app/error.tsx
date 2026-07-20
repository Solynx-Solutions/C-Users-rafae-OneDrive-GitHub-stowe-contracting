'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service when configured
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-brand-primary text-sm font-semibold tracking-widest uppercase">
        Something went wrong
      </p>
      <h1 className="text-brand-secondary mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        An unexpected error occurred
      </h1>
      <p className="mt-4 max-w-md text-lg text-neutral-500">
        We apologize for the inconvenience. Please try again or contact us if the problem persists.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="bg-brand-primary hover:bg-brand-primary-dark focus-visible:outline-brand-primary inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
