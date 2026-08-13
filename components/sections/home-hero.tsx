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
              local crews—with mechanical installation capability for demanding scopes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/estimate/residential"
                className="inline-flex min-h-14 items-center gap-3 bg-[#24507A] px-7 font-semibold text-white transition hover:bg-[#183A58]"
              >
                Start a project <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-14 items-center border border-[#222522] px-7 font-semibold text-[#222522] transition hover:bg-[#222522] hover:text-white"
              >
                Explore capabilities
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#C9C2B7] pt-5 text-xs font-bold tracking-[.12em] text-[#535B57] uppercase">
              <span>CA License 513674</span>
              <span>Dedicated crews</span>
              <span>Monterey Bay Area</span>
            </div>
          </div>

          <div
            className="relative min-h-[30rem] overflow-hidden border-l-[10px] border-[#7A3B45] lg:min-h-[44rem]"
            role="img"
            aria-label="Reserved space for approved large-format hardscape project photography"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(29,36,33,.12),transparent_40%),repeating-linear-gradient(90deg,transparent_0,transparent_79px,rgba(36,80,122,.14)_80px,rgba(36,80,122,.14)_82px),repeating-linear-gradient(0deg,transparent_0,transparent_39px,rgba(36,80,122,.12)_40px,rgba(36,80,122,.12)_42px),linear-gradient(145deg,#D5D0C7,#E9E3D8)]" />
            <div className="absolute right-5 bottom-5 bg-[#1D2421] px-5 py-4 text-[.68rem] font-bold tracking-[.18em] text-white uppercase">
              Approved project photography reserved
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
