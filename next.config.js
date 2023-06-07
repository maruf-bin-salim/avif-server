/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiBodyParserSizeLimit: '20mb',
  },
};

module.exports = nextConfig
