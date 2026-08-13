import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';

export function HomeHero() {
  const years = resolveControlledClaim('years-in-business') ?? 'Serving Monterey Bay';
  const tagline = resolveControlledMessage('tagline-primary');
  return (
    <section className="overflow-hidden bg-[#f7f5f0]" aria-label="Stowe Contracting introduction">
      <PageContainer>
        <div className="grid min-h-[calc(100svh-5rem)] items-center gap-12 py-14 lg:grid-cols-[.82fr_1.18fr] lg:py-20">
          <div className="relative z-10">
            <p className="text-sm font-semibold tracking-[.18em] text-[#9a5435] uppercase">
              Locally owned · Monterey Bay
            </p>
            <h1 className="mt-7 max-w-2xl text-[clamp(2.5rem,5.4vw,4.25rem)] leading-[.98] font-semibold tracking-[-.035em] text-[#202220]">
              Grounded in experience. Built for what comes next.
            </h1>
            <p className="mt-7 max-w-xl text-xl leading-8 text-[#565b57]">{tagline}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/estimate/residential"
                className="inline-flex min-h-14 items-center gap-3 bg-[#9a5435] px-7 font-semibold text-white transition hover:bg-[#7c4029]"
              >
                Request an estimate <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-14 items-center border border-[#202220] px-7 font-semibold text-[#202220] hover:bg-[#202220] hover:text-white"
              >
                Explore capabilities
              </Link>
            </div>
            <p className="mt-10 border-l-2 border-[#9a5435] pl-4 text-sm font-semibold text-[#565b57]">
              {years}
            </p>
          </div>
          <div
            className="relative min-h-[28rem] lg:min-h-[42rem]"
            role="img"
            aria-label="Large project and equipment staging photography placeholder"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_48%,rgba(154,84,53,.2)_48%,rgba(154,84,53,.2)_49%,transparent_49%),linear-gradient(145deg,#d4d0c8,#ece8e0)]" />
            <div className="absolute right-0 bottom-0 bg-[#202220] px-5 py-4 text-xs tracking-[.15em] text-white uppercase">
              Project + equipment photography
            </div>
            <div
              className="absolute -bottom-6 -left-6 hidden h-40 w-32 bg-[#b9a58d] lg:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
