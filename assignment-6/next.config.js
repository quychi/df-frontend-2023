/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1',
        destination: 'https://develop-api.bookstore.dwarvesf.com/api/v1',
      },
    ]
  },
}



module.exports = nextConfig
