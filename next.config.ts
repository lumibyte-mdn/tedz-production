import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => [
    {
      source: '/admin',
      destination: '/admin/dashboard',
      permanent: true,
    },
  ],
  experimental: {
    optimizePackageImports: ['@tabler/icons-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.w3schools.com',
        port: '',
        pathname: '/html/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
