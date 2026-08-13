import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { HomeHero } from '@/components/sections/home-hero';
import { HomeEditorial } from '@/components/sections/home-editorial';
import { HomeCta } from '@/components/sections/home-cta';

export const metadata: Metadata = generatePageMetadata({
  title: 'Stowe Contracting — Nearly 40 Years Serving Monterey Bay',
  description:
    'Locally owned concrete and construction contractor serving Monterey Bay, with experienced in-house crews and specialized mechanical installation equipment.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeEditorial />
      <HomeCta />
    </>
  );
}
