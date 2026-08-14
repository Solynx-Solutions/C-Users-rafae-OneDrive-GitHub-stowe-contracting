import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';

function Media({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${label}; approved photography pending`}
      className={`relative flex items-end overflow-hidden bg-[repeating-linear-gradient(90deg,transparent_0,transparent_79px,rgba(36,80,122,.13)_80px,rgba(36,80,122,.13)_82px),repeating-linear-gradient(0deg,transparent_0,transparent_39px,rgba(122,59,69,.09)_40px,rgba(122,59,69,.09)_42px),linear-gradient(145deg,#D6D1C8,#E9E3D8)] p-5 ${tall ? 'min-h-[34rem]' : 'min-h-72'}`}
    >
      <span className="bg-[#1D2421] px-3 py-2 text-[.68rem] font-bold tracking-[.16em] text-white uppercase">
        {label}
      </span>
    </div>
  );
}

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[.22em] text-[#24507A] uppercase">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.5rem)] leading-[.95] tracking-[-.04em] text-[#222522]">
        {children}
      </h2>
    </div>
  );
}

export function HomeEditorial() {
  return (
    <>
      <section className="bg-[#1D2421] text-white">
        <PageContainer>
          <dl className="grid divide-y divide-white/10 py-2 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              ['Since', '1987'],
              ['California license', '513674'],
              ['Built for', 'Monterey Bay'],
              ['Workforce', 'Dedicated crews'],
            ].map(([term, value]) => (
              <div key={term} className="px-0 py-7 first:pl-0 last:pr-0 sm:px-7">
                <dt className="text-[.65rem] font-bold tracking-[.18em] text-white/45 uppercase">
                  {term}
                </dt>
                <dd className="mt-2 text-xl font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </PageContainer>
      </section>

      <section className="bg-white py-24 md:py-32">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-[.62fr_1.38fr] lg:gap-24">
            <SectionTitle eyebrow="Hardscape authority">
              Outdoor work that reads as architecture.
            </SectionTitle>
            <div>
              <p className="max-w-3xl text-2xl leading-9 text-[#535B57]">
                Large-format paver and permeable interlocking concrete pavement driveways anchor our
                hardscape work, supported by residential outdoor spaces and complete site
                preparation.
              </p>
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                <Media label="Paver + PICP driveways" tall />
                <div className="md:pt-24">
                  <Media label="Backyards + outdoor spaces" />
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-[#E9E3D8] py-24 md:py-32">
        <PageContainer>
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-bold tracking-[.22em] text-[#24507A] uppercase">
                Signature capability
              </p>
              <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] leading-[.95] text-[#222522]">
                Mechanical paver installation.
              </h2>
              <p className="mt-7 max-w-xl text-xl leading-8 text-[#535B57]">
                People, equipment, and process aligned for controlled placement across larger or
                more demanding hardscape scopes.
              </p>
              <Link
                href="/mechanical-installation"
                className="mt-8 inline-flex items-center gap-2 font-bold text-[#24507A]"
              >
                See the installation approach <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Prepare', 'Install', 'Finish'].map((item, index) => (
                <div key={item}>
                  <Media label={`0${index + 1} ${item}`} />
                  <p className="mt-4 border-t border-[#BEB6AA] pt-3 text-xs font-bold tracking-[.16em] uppercase">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-[#F6F3EC] py-24 md:py-32">
        <PageContainer>
          <SectionTitle eyebrow="One accountable contractor">
            Three divisions. One clear path through the work.
          </SectionTitle>
          <div className="mt-16 grid border-t border-[#C9C2B7] lg:grid-cols-3">
            {[
              [
                '01',
                'Hardscape',
                'Paver driveways, outdoor spaces, and mechanical installation lead the work.',
              ],
              [
                '02',
                'Construction + Remodeling',
                'Construction support and remodeling extend the project beyond the exterior surface.',
              ],
              [
                '03',
                'Sitework + Underground',
                'Preparation, grading, and underground support connect the site to the finished result.',
              ],
            ].map(([number, title, body]) => (
              <article
                key={title}
                className="border-b border-[#C9C2B7] py-10 first:pl-0 last:border-r-0 lg:border-r lg:px-8"
              >
                <span className="text-xs font-bold text-[#7A3B45]">{number}</span>
                <h3 className="mt-10 text-3xl text-[#222522]">{title}</h3>
                <p className="mt-5 text-lg leading-8 text-[#535B57]">{body}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-24 md:py-32">
        <PageContainer>
          <SectionTitle eyebrow="Featured work">Let the built work carry the story.</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#535B57]">
            The editorial project system is ready for approved Stowe photography and verified
            project captions. No stock or scraped imagery is used.
          </p>
          <div className="mt-14">
            <Media label="Featured hardscape project" tall />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Media label="Residential hardscape" />
            <Media label="Mechanical installation" />
          </div>
        </PageContainer>
      </section>

      <section className="bg-[#1D2421] py-24 text-white md:py-32">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
            <Media label="Crew + equipment on site" tall />
            <div className="flex flex-col justify-between border-l-4 border-[#24507A] bg-[#222522] p-9 md:p-12">
              <div>
                <p className="text-xs font-bold tracking-[.22em] text-[#A9C2D9] uppercase">
                  Site capability
                </p>
                <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[.95] text-white">
                  The crew behind the finish.
                </h2>
              </div>
              <p className="mt-14 text-xl leading-8 text-white/70">
                Dedicated local crews and specialized equipment keep responsibility close—from site
                preparation through installation.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-[#E9E3D8] py-24 md:py-32">
        <PageContainer>
          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <SectionTitle eyebrow="Built here">A Monterey Bay contractor since 1987.</SectionTitle>
            <div>
              <p className="text-2xl leading-9 text-[#535B57]">
                Stowe Contracting combines long-standing local knowledge with dedicated crews and
                modern installation capability. Trusted, reliable, and accountable to the
                communities where the work is built.
              </p>
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {[
                  'CA License 513674',
                  'CMHA: Concrete Paver Installer',
                  'CMHA: Permeable Interlocking Concrete Paver Installer',
                  'CMHA: Commercial Installer',
                  'CMHA: Advanced Residential Installer',
                  'Dedicated local crews',
                  'Monterey Bay Area',
                ].map((item) => (
                  <p
                    key={item}
                    className="border-t border-[#BEB6AA] pt-5 text-sm font-bold tracking-[.08em] text-[#222522] uppercase"
                  >
                    {item}
                  </p>
                ))}
              </div>
              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 font-bold text-[#24507A]"
              >
                Our company story <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
