import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── Images ──────────────────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add external image domains here as needed:
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'images.unsplash.com' },
    // ],
  },

  // ── Security Headers ────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // ── Redirects ────────────────────────────────────────────────────────────────
  // Add URL redirects here (e.g., old page slugs after rebrand)
  async redirects() {
    return [
      { source: '/us', destination: '/about', permanent: true },
      { source: '/construction', destination: '/services/construction-remodeling', permanent: true },
      { source: '/paving-stones', destination: '/services/paving-stones', permanent: true },
      { source: '/synthetic-grass', destination: '/services/synthetic-grass', permanent: true },
      { source: '/grading', destination: '/services/grading-site-preparation', permanent: true },
      { source: '/portfolio/construction-1', destination: '/services/construction-remodeling', permanent: true },
      { source: '/portfolio/construction-2', destination: '/services/construction-remodeling', permanent: true },
      { source: '/portfolio/construction-3', destination: '/services/construction-remodeling', permanent: true },
      { source: '/portfolio/commercial-tenant-improvement', destination: '/services/construction-remodeling', permanent: true },
    ];
  },

  // ── Compiler ─────────────────────────────────────────────────────────────────
  compiler: {
    // Remove console.log and console.debug in production only.
    // console.warn and console.error are preserved for runtime diagnostics.
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // ── Experimental ────────────────────────────────────────────────────────────
  experimental: {
    // Enable when using MDX with App Router
    mdxRs: true,
  },
};

export default nextConfig;
