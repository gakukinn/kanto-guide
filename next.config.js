// 移除next-intl配置，使用自定义翻译系统
// 不再需要next-intl插件

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // 开发时注释掉
  // trailingSlash: true, // 暂时注释掉，避免API路由重定向问题
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
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
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
  // output: 'export', // 注释掉静态导出，以支持API路由
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

// 使用标准Next.js配置，不依赖next-intl
module.exports = nextConfig;
 