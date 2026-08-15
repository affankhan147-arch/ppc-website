/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.plumbinghands.com' }],
        destination: 'https://plumbinghands.com/:path*',
        permanent: true,
      },
      {
        source: '/cost-guides/emergency-plumbing-cost-dfw',
        destination: '/guides/dfw-emergency-plumbing-costs',
        permanent: true,
      },
      {
        source: '/blog/main-sewer-line-clogged-in-dallas-warning-signs-and-fast-options',
        destination: '/blog/main-sewer-line-clogged-in-dallas-warning-signs',
        permanent: true,
      },
      {
        source: '/blog/toilet-overflowing-at-night-in-dallas-fast-steps-for-homeowners',
        destination: '/blog/toilet-overflowing-at-night-in-dallas-fast-steps',
        permanent: true,
      },
      {
        source: '/services/burst-pipe-emergency-what-to-do-first',
        destination: '/services/burst-pipe-emergency',
        permanent: true,
      },
      {
        source: '/services/water-heater-not-heating-emergency-service',
        destination: '/services/water-heater-emergency',
        permanent: true,
      },
      {
        source: '/services/same-day-emergency-plumber-dfw',
        destination: '/services/same-day-plumber-connection',
        permanent: true,
      },
      {
        source: '/services/toilet-backup-emergency-repair-dallas',
        destination: '/services/toilet-overflow-emergency',
        permanent: true,
      },
      {
        source: '/services/emergency-plumbing-under-200-dallas',
        destination: '/services/24-hour-emergency-plumber',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;