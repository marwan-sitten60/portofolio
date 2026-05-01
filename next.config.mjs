/** @type {import('next').NextConfig} */
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(isGitHubPagesBuild
    ? {
        output: 'export',
        distDir: 'dist',
        trailingSlash: true,
        basePath: '/revil',
        assetPrefix: '/revil/',
      }
    : {}),
};

export default nextConfig;
