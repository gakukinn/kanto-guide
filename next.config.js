/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除静态导出，改为支持Vercel部署
  trailingSlash: true,
  images: {
    unoptimized: true,
    // 当unoptimized为true时，移除其他优化选项
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // 允许开发环境的跨域请求
  allowedDevOrigins: ['192.168.3.2'],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    config.externals = config.externals || [];
    config.externals.push({
      playwright: 'commonjs playwright',
      cheerio: 'commonjs cheerio',
      crawlee: 'commonjs crawlee',
    });

    return config;
  },
  serverExternalPackages: ['playwright', 'cheerio', 'crawlee'],
  experimental: {
    typedRoutes: true,
  },
  compress: true,
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
