import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-[#F6F3EC]" aria-label="Stowe Contracting introduction">
      <PageContainer>
        <div className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-14 lg:grid-cols-[.78fr_1.22fr] lg:py-20">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-[.22em] text-[#24507A] uppercase">
              Monterey Bay Area · Since 1987
            </p>
            <h1 className="mt-7 max-w-2xl text-[clamp(3.25rem,7vw,6.6rem)] leading-[.82] font-semibold tracking-[-.055em] text-[#222522]">
              Monterey Built.
              <span className="mt-2 block text-[#24507A]">Hardscape First.</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-8 text-[#535B57]">
              Paver driveways, outdoor spaces, and site-ready construction delivered by dedicated
              local crews—with the planning, placement capability, and field coordination demanding
              scopes require.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact#contact-form"
                className="inline-flex min-h-14 items-center gap-3 bg-[#24507A] px-7 font-semibold text-white transition hover:bg-[#183A58]"
              >
                Start a project <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#C9C2B7] pt-5 text-xs font-bold tracking-[.12em] text-[#535B57] uppercase">
              <span>CA License 513674</span>
              <span>Dedicated crews</span>
              <span>Monterey Bay Area</span>
            </div>
          </div>

          <div
            className="relative min-h-[30rem] overflow-hidden border-l-[10px] border-[#7A3B45] bg-[#1D2421] lg:min-h-[44rem]"
            aria-label="Stowe Contracting brand panel"
          >
            <div className="absolute inset-0 bg-[linear-gradient(145deg,#1D2421_0%,#24507A_62%,#7A3B45_100%)]" />
            <div className="absolute inset-8 border border-white/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
              <div>
                <p className="text-xs font-bold tracking-[.3em] text-white/60 uppercase">
                  Stowe Contracting
                </p>
                <p className="mt-5 text-[clamp(2.5rem,6vw,5.5rem)] leading-[.88] font-semibold tracking-[-.05em] text-white">
                  Built for the Monterey Bay.
                </p>
              </div>
            </div>
            <div className="absolute right-5 bottom-5 bg-[#1D2421]/90 px-5 py-4 text-[.68rem] font-bold tracking-[.18em] text-white uppercase backdrop-blur-sm">
              Verified project media coming soon
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
