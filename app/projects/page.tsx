import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { PageContainer } from '@/components/layout/page-container';

export const metadata: Metadata = generatePageMetadata({
  title: 'Projects',
  description:
    'A project photography collection is being prepared for Stowe Contracting. Final Stowe project photography and verified captions are coming soon.',
  path: '/projects',
});

const projectTypes = ['Paver driveways', 'Outdoor living spaces', 'Sitework and preparation'];

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-[#1D2421] py-20 text-white md:py-28">
        <PageContainer>
          <p className="text-xs font-bold tracking-[.22em] text-[#6FA0CA] uppercase">
            Project journal
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(3.5rem,8vw,7rem)] leading-[.88] tracking-[-.05em] text-white">
            The work deserves the frame.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/70">
            Final Stowe project photography and verified project captions are being prepared for
            this collection.
          </p>
        </PageContainer>
      </section>

      <section className="bg-[#F6F3EC] py-20 md:py-28">
        <PageContainer>
          <div className="grid gap-6 lg:grid-cols-3">
            {projectTypes.map((projectType, index) => (
              <article key={projectType}>
                <div
                  className="relative min-h-96 overflow-hidden border-l-4 border-[#7A3B45] bg-[repeating-linear-gradient(90deg,transparent_0,transparent_59px,rgba(36,80,122,.13)_60px,rgba(36,80,122,.13)_62px),repeating-linear-gradient(0deg,transparent_0,transparent_39px,rgba(36,80,122,.1)_40px,rgba(36,80,122,.1)_42px),linear-gradient(145deg,#D6D1C8,#E9E3D8)]"
                  role="img"
                  aria-label={`Reserved space for approved Stowe ${projectType.toLowerCase()} photography`}
                >
                  <span className="absolute right-4 bottom-4 bg-[#1D2421] px-4 py-3 text-[.65rem] font-bold tracking-[.14em] text-white uppercase">
                    Final Stowe photography coming soon
                  </span>
                </div>
                <p className="mt-5 text-xs font-bold tracking-[.14em] text-[#24507A] uppercase">
                  0{index + 1}
                </p>
                <h2 className="mt-2 text-2xl text-[#222522]">{projectType}</h2>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-[#C9C2B7] pt-10">
            <Link
              href="/contact#contact-form"
              className="inline-flex min-h-14 items-center bg-[#24507A] px-7 font-semibold text-white transition hover:bg-[#183A58]"
            >
              Request an Estimate
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
