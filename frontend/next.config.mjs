/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dhwrtxrsf/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
