// Authentic artwork recovered from Stowe's existing website; provenance lives
// alongside the assets. These are resource links, not new membership claims.
const associations = [
  {
    name: 'BXCC',
    description: 'Builders Exchange of the Central Coast, Inc.',
    image: '/images/associations/bxccweb.jpg',
    href: 'http://www.constructionexchange.com/',
    width: 143,
    height: 96,
  },
  {
    name: 'ICPI',
    description: 'Interlocking Concrete Pavement Institute — now CMHA',
    image: '/images/associations/iciplogo.png',
    href: 'https://www.cmha.org/',
    width: 143,
    height: 56,
  },
  {
    name: 'NARI',
    description: 'National Association of the Remodeling Industry',
    image: '/images/associations/logo_nari.gif',
    href: 'https://nari.org/',
    width: 69,
    height: 55,
  },
  {
    name: 'NFIB',
    description: 'National Federation of Independent Business',
    image: '/images/associations/logo_nfib.gif',
    href: 'https://www.nfib.com/',
    width: 133,
    height: 55,
  },
] as const;

/** Compact, authentic association marks; inherits the surrounding typography. */
export function StoweAssociations({ className = '' }: { className?: string }) {
  return (
    <section aria-label="Industry resources and social links" className={className}>
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-current/70">
        Industry resources
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {associations.map((association) => (
          <a
            key={association.name}
            href={association.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${association.description} (opens in a new tab)`}
            className="flex min-h-28 items-center justify-center border border-black/10 bg-white px-3 py-5 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {/* Preserve the original low-resolution marks without cropping. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={association.image}
              alt={association.name}
              width={association.width}
              height={association.height}
              loading="lazy"
              className="h-auto max-h-16 max-w-full object-contain"
            />
          </a>
        ))}
      </div>
      <nav aria-label="Follow Stowe Contracting" className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <span className="text-current/70">Follow our work</span>
        <a className="underline decoration-current/30 underline-offset-4 hover:decoration-current" href="https://www.facebook.com/stowecontractinginc" target="_blank" rel="noopener noreferrer">
          Facebook <span aria-hidden="true">↗</span>
        </a>
        <a className="underline decoration-current/30 underline-offset-4 hover:decoration-current" href="https://www.linkedin.com/company/stowe-contracting-inc." target="_blank" rel="noopener noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </section>
  );
}
