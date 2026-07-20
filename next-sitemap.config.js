/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://stowecontracting.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
  // Exclude routes that should not be indexed
  exclude: ['/api/*', '/admin/*'],
  // Change frequency and priority overrides
  changefreq: 'weekly',
  priority: 0.7,
  // Additional sitemap entries (e.g., dynamically generated pages)
  // additionalPaths: async (config) => {
  //   return [await config.transform(config, '/custom-path')];
  // },
};

module.exports = config;
