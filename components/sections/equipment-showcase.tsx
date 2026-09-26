import Image from 'next/image';
import Link from 'next/link';
import { ContentSection } from '@/components/layout/content-section';
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeading } from '@/components/layout/section-heading';

const photographs = [
  { src: '/media/original-stowe/stowe-project-img-0204-original.jpg', title: 'Preparing the site', alt: 'Excavator and skid steer working in an excavation.', description: 'Earthwork from Stowe’s original project collection.' },
  { src: '/media/original-stowe/stowe-grading-original.jpg', title: 'Working with the terrain', alt: 'Excavator working on a slope.', description: 'Grading and site preparation with Stowe’s field equipment.' },
  { src: '/media/facebook-stowe/rancho-cielo-courtyard.jpg', title: 'The finished surface', alt: 'Finished paver courtyard at Rancho Cielo School.', description: 'Rancho Cielo School courtyard, shared by Stowe Contracting.' },
];

export function EquipmentShowcase() {
  return <ContentSection bg="neutral" aria-label="Site preparation and finished work" id="equipment-crew">
    <PageContainer>
      <SectionHeading level="h2" subtitle="A closer look at Stowe’s own project photographs, from earthwork to finished paving.">From the ground up.</SectionHeading>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {photographs.map(photo => <figure key={photo.src}>
          <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full photograph: ${photo.title}`} className="group relative block aspect-[4/3] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </a>
          <figcaption className="mt-5">
            <h3 className="text-2xl text-[var(--color-brand-secondary)]">{photo.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-neutral-600)]">{photo.description}</p>
          </figcaption>
        </figure>)}
      </div>
      <p className="mt-8 max-w-3xl leading-relaxed text-[var(--color-neutral-600)]">The right preparation supports the finished work. Stowe brings grading, drainage and hardscape experience together to plan the work around each property. These photographs show site preparation and completed projects; the installation method is selected for the individual scope.</p>
      <Link href="/projects" className="mt-6 inline-block font-semibold underline underline-offset-4">Explore more Stowe projects →</Link>
    </PageContainer>
  </ContentSection>;
}
