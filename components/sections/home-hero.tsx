import Link from 'next/link';
import { HomeHeroFilm } from './home-hero-film';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-[#F6F3EC]" aria-label="Stowe Contracting introduction">
      <HomeHeroFilm />
      <PageContainer>
        <div className="py-10 lg:py-14">
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

        </div>
      </PageContainer>
    </section>
  );
}

