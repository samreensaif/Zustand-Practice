import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'readymadeui.com',
        port: '',        // agar custom port nahi to khali chhor dein
        pathname: '/**', // sabhi paths allow karne ke liye
      },
    ],
  },
};

export default nextConfig;
