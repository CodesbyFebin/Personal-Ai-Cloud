/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mcpserver/db', '@mcpserver/config'],
  output: 'standalone',
};
module.exports = nextConfig;
