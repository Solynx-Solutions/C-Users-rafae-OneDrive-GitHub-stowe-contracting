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
    return [];
  },

  // ── Compiler ─────────────────────────────────────────────────────────────────
  compiler: {
    // Remove console.log and console.debug in production only.
    // console.warn and console.error are preserved for runtime diagnostics.
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },


  // ── Experimental ────────────────────────────────────────────────────────────
  experimental: {
    // Enable when using MDX with App Router
    mdxRs: true,
  },
};

export default nextConfig;

