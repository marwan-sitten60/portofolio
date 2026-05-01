/** @type {import('next').NextConfig} */
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isVercelBuild = process.env.VERCEL === '1';
const isStaticExportBuild = isGitHubPagesBuild || isVercelBuild;

const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(isStaticExportBuild
    ? {
        output: 'export',
        distDir: 'dist',
        trailingSlash: true,
        ...(isGitHubPagesBuild
          ? {
              basePath: '/revil',
              assetPrefix: '/revil/',
            }
          : {}),
      }
    : {}),
};

export default nextConfig;
