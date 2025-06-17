/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 允许开发环境的跨域请求
  allowedDevOrigins: ['192.168.3.2'],
  // redirects不能与output: 'export'一起使用
  // 静态导出不支持服务器端重定向
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
};

export default nextConfig;
