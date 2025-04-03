/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8000/api',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig 