import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dranmytas.com' },
      { protocol: 'https', hostname: '*.dranmytas.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
