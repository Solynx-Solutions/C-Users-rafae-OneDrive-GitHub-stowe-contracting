import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { ProjectGallery } from '@/components/sections/stowe-project-gallery';
import { StoweAssociations } from '@/components/sections/stowe-associations';
export const metadata: Metadata = generatePageMetadata({title:'Projects',description:'Explore Stowe Contracting project photographs: paver driveways, patios, retaining walls, grading, earthwork and synthetic grass.',path:'/projects'});
export default function ProjectsPage(){return <div className="bg-[#f6f3ec] text-[#16283b]">
<section className="mx-auto max-w-6xl px-5 pt-16 pb-12 md:px-8 md:pt-24">
<p className="mb-5 text-xs tracking-[.2em] uppercase text-[#6f6a5e]">Stowe Contracting / Project collection</p>
<h1 className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight" style={{fontFamily:'Georgia, serif',fontWeight:400}}>Built for the setting.<br/><em className="text-[#97733f]">Made to be lived in.</em></h1>
<p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#6f6a5e]">A closer look at our paving, outdoor spaces and groundwork. Explore the photographs below, then tell us what you have in mind for your property.</p>
<Link href="/" className="mt-7 inline-block text-sm underline underline-offset-4">← Back to Stowe</Link></section>
<section aria-label="Stowe project photographs" className="mx-auto max-w-6xl px-5 pb-20 md:px-8"><ProjectGallery /></section>
<section className="bg-[#101d2c] px-5 py-20 text-center text-[#f6f3ec]"><h2 className="text-4xl text-[#f6f3ec]" style={{fontFamily:'Georgia, serif',fontWeight:400}}>What would you like to build?</h2><Link href="/contact#contact-form" className="mt-8 inline-flex min-h-12 items-center bg-[#f6f3ec] px-7 text-[#101d2c]">Start a project ↗</Link></section><StoweAssociations className="mx-auto max-w-6xl px-5 py-16 md:px-8" /></div>;}


