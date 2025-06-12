/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  // 移除静态导出配置以支持API路由
  // output: 'export',
  // trailingSlash: true,
  // distDir: 'out'
  
  // 添加webpack配置来处理服务器端依赖
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 排除一些在构建时不需要的依赖
      config.externals = config.externals || [];
      config.externals.push({
        'playwright': 'commonjs playwright',
        'puppeteer': 'commonjs puppeteer',
        'canvas': 'commonjs canvas'
      });
    }
    return config;
  }
};

export default nextConfig; 