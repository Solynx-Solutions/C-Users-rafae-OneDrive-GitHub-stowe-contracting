import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { HomeHero } from '@/components/sections/home-hero';
import { HomeEditorial } from '@/components/sections/home-editorial';

export const metadata: Metadata = generatePageMetadata({
  title: 'Monterey Built — Hardscape First | Stowe Contracting',
  description:
    'Monterey Bay hardscape contractor for paver driveways, outdoor spaces, mechanical paver installation, construction, remodeling, and sitework. CA License 513674.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeEditorial />
    </>
  );
}
