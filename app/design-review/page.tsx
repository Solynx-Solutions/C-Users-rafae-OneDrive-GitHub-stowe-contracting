import type { Metadata } from 'next';
import { StoweDesignReview } from '@/components/sections/stowe-design-review';


export const metadata: Metadata = {
  title: 'Stowe Contracting — Design Review',
  robots: { index: false, follow: false },
};
export default function DesignReviewPage() { return <StoweDesignReview />; }

