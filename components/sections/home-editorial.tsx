import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { resolveControlledClaim, resolveControlledMessage } from '@/lib/content';

function Media({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${label} staging placeholder`}
      className={`flex items-end bg-[linear-gradient(135deg,transparent_48%,rgba(154,84,53,.18)_48%,rgba(154,84,53,.18)_49%,transparent_49%),linear-gradient(145deg,#d4d0c8,#ece8e0)] p-5 ${tall ? 'min-h-[32rem]' : 'min-h-64'}`}
    >
      <span className="bg-[#202220] px-3 py-2 text-xs font-semibold tracking-[.15em] text-white uppercase">
        {label}
      </span>
    </div>
  );
}

const SectionTitle = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div>
    <p className="text-sm font-semibold tracking-[.18em] text-[#9a5435] uppercase">{eyebrow}</p>
    <h2 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] text-[#202220]">
      {children}
    </h2>
  </div>
);

export function HomeEditorial() {
  const positioning = resolveControlledMessage('positioning-statement');
  const trust = [
    resolveControlledClaim('years-in-business'),
    resolveControlledClaim('locally-owned'),
    resolveControlledClaim('in-house-crews'),
  ].filter(Boolean);
  return (
    <>
      <section className="bg-[#f7f5f0] py-24 md:py-32">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <p className="text-sm font-semibold tracking-[.18em] text-[#9a5435] uppercase">
              Built around accountable work
            </p>
            <div>
              <h2 className="max-w-4xl text-[clamp(2rem,4vw,2.75rem)] leading-[1.05]">
                Local knowledge, experienced crews, and the equipment to carry demanding work
                through.
              </h2>
              <p className="mt-7 max-w-3xl text-xl leading-8 text-[#565b57]">{positioning}</p>
              <div className="mt-12 flex flex-wrap gap-8 border-t border-[#d4d0c8] pt-6 text-sm font-semibold">
                {trust.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-24 md:py-32">
        <PageContainer>
          <SectionTitle eyebrow="Capabilities">
            One contractor. Two distinct project paths.
          </SectionTitle>
          <div className="mt-14 grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <Media label="Residential project photography" />
              <h3 className="mt-6 text-3xl">Residential</h3>
              <p className="mt-3 text-lg text-[#565b57]">
                A clear route for homeowners planning concrete and construction work.
              </p>
              <Link
                className="mt-5 inline-flex items-center gap-2 font-semibold text-[#7c4029]"
                href="/estimate/residential"
              >
                Residential estimates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:pt-24">
              <Media label="Commercial project photography" />
              <h3 className="mt-6 text-3xl">Commercial</h3>
              <p className="mt-3 text-lg text-[#565b57]">
                A dedicated path for commercial scopes and project requirements.
              </p>
              <Link
                className="mt-5 inline-flex items-center gap-2 font-semibold text-[#7c4029]"
                href="/estimate/commercial"
              >
                Commercial estimates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-[#1e211f] py-24 text-white md:py-32">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-sm tracking-[.18em] text-[#c98767] uppercase">
                Signature capability
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] text-white">
                Mechanical installation
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#d4d0c8]">
                Specialized equipment and in-house crews create a controlled path from preparation
                to finished work.
              </p>
              <Link
                href="/mechanical-installation"
                className="mt-7 inline-flex items-center gap-2 font-semibold"
              >
                Explore the process <ArrowRight className="h-4 w-4 text-[#c98767]" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Prepare', 'Place', 'Finish'].map((x, i) => (
                <div key={x}>
                  <Media label={`0${i + 1} ${x}`} />
                  <p className="mt-4 border-t border-white/20 pt-3 text-sm tracking-[.14em] uppercase">
                    {x}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-[#ece8e0] py-24 md:py-32">
        <PageContainer>
          <SectionTitle eyebrow="Selected work">Projects, presented at full scale.</SectionTitle>
          <p className="mt-5 max-w-xl text-lg text-[#565b57]">
            Architectural staging fields remain in place until approved project photography and
            metadata are supplied.
          </p>
          <div className="mt-14">
            <Media label="Oversized featured project" tall />
            <div className="grid border-y border-[#b9a58d] py-5 text-sm md:grid-cols-3">
              <span>Featured project</span>
              <span>Monterey Bay</span>
              <span className="md:text-right">Verified details pending</span>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Media label="Supporting project" />
              <Media label="Supporting project" />
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-24 md:py-32">
        <PageContainer>
          <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
            <Media label="Crew and operator photography" tall />
            <div className="flex flex-col justify-between bg-[#202220] p-8 text-white md:p-10">
              <div>
                <p className="text-sm tracking-[.16em] text-[#c98767] uppercase">
                  People + equipment
                </p>
                <h2 className="mt-5 text-[clamp(2rem,4vw,2.75rem)] text-white">
                  The crew behind the capability.
                </h2>
              </div>
              <p className="mt-12 text-lg leading-8 text-[#d4d0c8]">
                Experienced people and specialized equipment, working as one accountable team.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-[#f7f5f0] py-24 md:py-32">
        <PageContainer>
          <SectionTitle eyebrow="How work moves">A clean six-stage process.</SectionTitle>
          <ol className="mt-14 grid border-t border-[#d4d0c8] md:grid-cols-3 lg:grid-cols-6">
            {['Inquiry', 'Review', 'Plan', 'Prepare', 'Build', 'Finish'].map((x, i) => (
              <li
                key={x}
                className="border-b border-[#d4d0c8] py-7 first:pl-0 last:border-r-0 md:pr-5 lg:border-r lg:px-5"
              >
                <span className="text-sm text-[#9a5435]">0{i + 1}</span>
                <h3 className="mt-7 text-xl">{x}</h3>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>

      <section className="bg-[#ece8e0] py-24 md:py-32">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <SectionTitle eyebrow="Heritage to modern">Experience carried forward.</SectionTitle>
              <p className="mt-6 text-lg leading-8 text-[#565b57]">
                A visual timeline reserved for verified historical and current operations
                photography.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Media label="Historical operations" tall />
              <Media label="Current operations" tall />
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
