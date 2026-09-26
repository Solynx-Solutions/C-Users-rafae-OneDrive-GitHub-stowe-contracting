import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { StoweDesignReview } from '@/components/sections/stowe-design-review';

export const metadata: Metadata = generatePageMetadata({
  title: 'Monterey Built — Hardscape First | Stowe Contracting',
  description:
    'Monterey Bay hardscape contractor for paver driveways, outdoor spaces, mechanical paver installation, construction, remodeling, and sitework. CA License 513674.',
  path: '/',
});

export default function HomePage() {
  return (
    <StoweDesignReview />
  );
}
