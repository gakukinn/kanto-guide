const fs = require('fs');
const path = require('path');

// 生成sitemap.xml
function generateSitemap() {
  const baseUrl = 'https://your-domain.com'; // 需要替换为实际域名
  
  // 扫描所有页面路由
  const routes = [];
  
  // 主要页面
  routes.push({ url: '/', priority: '1.0', changefreq: 'weekly' });
  
  // 月份页面
  const months = ['july', 'august', 'september'];
  months.forEach(month => {
    routes.push({ 
      url: `/${month}`, 
      priority: '0.9', 
      changefreq: 'weekly' 
    });
    routes.push({ 
      url: `/${month}/hanabi`, 
      priority: '0.9', 
      changefreq: 'weekly' 
    });
  });
  
  // 地区页面
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
  months.forEach(month => {
    regions.forEach(region => {
      routes.push({
        url: `/${month}/hanabi/${region}`,
        priority: '0.8',
        changefreq: 'weekly'
      });
    });
  });
  
  // 扫描具体花火页面
  const dataDir = path.join(__dirname, '../src/data');
  const level5Files = fs.readdirSync(dataDir)
    .filter(file => file.startsWith('level5-') && file.endsWith('.ts'));
  
  level5Files.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    
    // 从August文件中提取路径
    if (file.includes('august') && file.includes('hanabi')) {
      const match = file.match(/level5-august-(.+)-hanabi\.ts/);
      if (match) {
        const location = match[1];
        routes.push({
          url: `/august/hanabi/tokyo/${location}`,
          priority: '0.7',
          changefreq: 'monthly'
        });
      }
    }
  });
  
  // 生成XML内容
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // 写入public目录
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xmlContent);
  console.log(`✅ 生成sitemap.xml：${routes.length}个页面`);
}

// 生成robots.txt
function generateRobots() {
  const robotsContent = `User-agent: *
Allow: /

# 禁止爬取开发文件
Disallow: /_next/
Disallow: /api/
Disallow: /.well-known/

# Sitemap位置
Sitemap: https://your-domain.com/sitemap.xml

# 特殊爬虫规则
User-agent: GoogleBot
Allow: /

User-agent: BingBot
Allow: /

User-agent: BaiduSpider
Allow: /
`;
  
  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsContent);
  console.log('✅ 生成robots.txt');
}

// 生成结构化数据
function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "日本花火大会旅游指南",
    "alternateName": "关东花火大会完全指南",
    "url": "https://your-domain.com",
    "description": "专为中国游客打造的日本关东地区花火大会完全指南。7-9月东京、埼玉、千叶、神奈川、北关东、甲信越花火大会详细信息、交通指南、观赏攻略。",
    "inLanguage": "zh-CN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://your-domain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "日本花火大会旅游指南",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/images/logo.png"
      }
    },
    "mainEntity": {
      "@type": "TouristAttraction",
      "name": "关东地区花火大会",
      "description": "日本关东地区夏季花火大会集合，包括东京、埼玉、千叶、神奈川等地区的传统花火祭典",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 35.6762,
        "longitude": 139.6503
      },
      "touristType": "中国游客"
    }
  };
  
  // 创建JSON-LD文件
  const jsonLdPath = path.join(__dirname, '../public/structured-data.json');
  fs.writeFileSync(jsonLdPath, JSON.stringify(structuredData, null, 2));
  console.log('✅ 生成结构化数据');
}

// 优化meta描述
function optimizeMetaDescriptions() {
  const pagesData = [
    {
      title: "东京花火大会2025 | 板桥・江户川・神宫外苑等完全指南",
      description: "2025年东京都花火大会完全指南。板桥花火大会、江户川区花火大会、神宫外苑花火大会等详细信息、交通指南、观赏攻略。专为中国游客提供最实用的东京花火旅游信息。",
      keywords: "东京花火大会,板桥花火,江户川花火,神宫外苑花火,东京旅游,日本花火,2025"
    },
    {
      title: "埼玉花火大会2025 | 越谷・入间基地・小川町七夕祭指南",
      description: "2025年埼玉县花火大会完全指南。越谷花火大会、入间基地纳凉祭、小川町七夕祭等详细信息。田园花火、基地花火、主题花火，感受埼玉独特魅力。",
      keywords: "埼玉花火大会,越谷花火,入间基地,小川町七夕,埼玉旅游,关东花火,2025"
    }
  ];
  
  // 生成meta优化建议文档
  const metaOptimization = {
    general: {
      titleLength: "50-60字符最佳",
      descriptionLength: "150-160字符最佳", 
      keywordsCount: "5-10个关键词",
      tips: [
        "标题包含主要关键词",
        "描述包含地区、年份、类型",
        "使用中文简体，面向中国游客",
        "每页独特的meta信息"
      ]
    },
    pages: pagesData
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../docs/meta-optimization.json'), 
    JSON.stringify(metaOptimization, null, 2)
  );
  console.log('✅ 生成meta优化建议');
}

// 生成性能优化建议
function generatePerformanceOptimizations() {
  const optimizations = {
    images: {
      format: "优先使用WebP/AVIF格式",
      lazy: "启用图片懒加载",
      sizes: "响应式图片尺寸",
      compression: "压缩率80-90%"
    },
    css: {
      critical: "内联关键CSS",
      unused: "移除未使用CSS",
      minification: "CSS压缩"
    },
    javascript: {
      splitting: "代码分割",
      treeshaking: "Tree Shaking",
      minification: "JS压缩"
    },
    caching: {
      static: "静态资源长期缓存",
      api: "API响应缓存",
      browser: "浏览器缓存策略"
    },
    core_web_vitals: {
      LCP: "最大内容绘制 < 2.5s",
      FID: "首次输入延迟 < 100ms", 
      CLS: "累积布局偏移 < 0.1"
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../docs/performance-optimizations.json'),
    JSON.stringify(optimizations, null, 2)
  );
  console.log('✅ 生成性能优化建议');
}

// 主执行函数
function optimizeSEO() {
  console.log('🚀 启动SEO优化系统...\n');
  
  try {
    // 确保docs目录存在
    const docsDir = path.join(__dirname, '../docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    generateSitemap();
    generateRobots();
    generateStructuredData();
    optimizeMetaDescriptions();
    generatePerformanceOptimizations();
    
    console.log('\n🎉 SEO优化完成！搜索引擎排名将得到提升。');
    console.log('\n📝 下一步建议:');
    console.log('1. 将域名替换为实际域名');
    console.log('2. 提交sitemap到Google Search Console');
    console.log('3. 监控Core Web Vitals指标');
    console.log('4. 定期更新内容保持新鲜度');
  } catch (error) {
    console.error('❌ SEO优化过程中出现错误:', error);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  optimizeSEO();
}

module.exports = { optimizeSEO }; 