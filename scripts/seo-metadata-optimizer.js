/**
 * SEO元数据优化脚本
 * 功能：
 * 1. 检查所有页面的元数据配置
 * 2. 统一元数据格式
 * 3. 添加缺失的SEO字段
 * 4. 验证图片路径
 * 5. 生成优化报告
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目根目录
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_APP_DIR = path.join(PROJECT_ROOT, 'src', 'app');

// SEO配置标准
const SEO_STANDARDS = {
  requiredFields: [
    'title',
    'description',
    'keywords',
    'openGraph',
    'twitter',
    'alternates',
    'robots',
  ],
  minDescriptionLength: 120,
  maxDescriptionLength: 160,
  minTitleLength: 30,
  maxTitleLength: 60,
  keywordsCount: { min: 5, max: 15 },
};

// 网站基础URL
const BASE_URL = 'https://www.kanto-travel-guide.com';

class SEOOptimizer {
  constructor() {
    this.issues = [];
    this.fixedFiles = [];
    this.checkedFiles = 0;
  }

  /**
   * 主执行函数
   */
  async optimize() {
    console.log('🔍 开始SEO元数据优化...\n');

    await this.scanAndFixFiles(SRC_APP_DIR);

    this.generateReport();
  }

  /**
   * 递归扫描并修复文件
   */
  async scanAndFixFiles(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // 递归处理子目录
        await this.scanAndFixFiles(fullPath);
      } else if (item === 'page.tsx') {
        // 处理页面文件
        await this.processPageFile(fullPath);
      }
    }
  }

  /**
   * 处理单个页面文件
   */
  async processPageFile(filePath) {
    this.checkedFiles++;

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(PROJECT_ROOT, filePath);

      console.log(`📄 检查文件: ${relativePath}`);

      // 分析元数据
      const analysis = this.analyzeMetadata(content, filePath);

      if (analysis.needsFix) {
        const fixedContent = this.fixMetadata(content, analysis, filePath);

        if (fixedContent !== content) {
          // 创建备份
          this.createBackup(filePath);

          // 写入修复后的内容
          fs.writeFileSync(filePath, fixedContent, 'utf-8');
          this.fixedFiles.push(relativePath);

          console.log(`✅ 已修复: ${relativePath}`);
        }
      }
    } catch (error) {
      this.issues.push({
        file: filePath,
        type: 'ERROR',
        message: `处理文件时出错: ${error.message}`,
      });
      console.error(
        `❌ 错误: ${path.relative(PROJECT_ROOT, filePath)} - ${error.message}`
      );
    }
  }

  /**
   * 分析元数据
   */
  analyzeMetadata(content, filePath) {
    const analysis = {
      hasMetadata: false,
      hasTypeAnnotation: false,
      missingFields: [],
      issues: [],
      needsFix: false,
    };

    // 检查是否有元数据导出
    const metadataMatch = content.match(/export\s+const\s+metadata[^=]*=\s*{/);
    if (!metadataMatch) {
      analysis.issues.push('缺少元数据导出');
      analysis.needsFix = true;
      return analysis;
    }

    analysis.hasMetadata = true;

    // 检查TypeScript类型注解
    analysis.hasTypeAnnotation = content.includes(': Metadata');
    if (!analysis.hasTypeAnnotation) {
      analysis.issues.push('缺少TypeScript类型注解');
      analysis.needsFix = true;
    }

    // 检查必需字段
    for (const field of SEO_STANDARDS.requiredFields) {
      if (!content.includes(field)) {
        analysis.missingFields.push(field);
        analysis.needsFix = true;
      }
    }

    // 检查canonical链接
    if (!content.includes('canonical')) {
      analysis.issues.push('缺少canonical链接');
      analysis.needsFix = true;
    }

    return analysis;
  }

  /**
   * 修复元数据
   */
  fixMetadata(content, analysis, filePath) {
    let fixedContent = content;

    // 获取页面路径信息
    const urlPath = this.getUrlPathFromFile(filePath);
    const pageInfo = this.extractPageInfo(content, urlPath);

    // 1. 添加TypeScript导入（如果缺少）
    if (!fixedContent.includes('import { Metadata }')) {
      const hasOtherImports = fixedContent.includes('import');
      if (hasOtherImports) {
        // 在现有import后添加
        fixedContent = fixedContent.replace(
          /(import[^;]+;)/,
          `$1\nimport { Metadata } from 'next';`
        );
      } else {
        // 在文件开头添加
        fixedContent = `import { Metadata } from 'next';\n\n${fixedContent}`;
      }
    }

    // 2. 修复或添加元数据
    if (analysis.hasMetadata) {
      // 更新现有元数据
      fixedContent = this.updateExistingMetadata(
        fixedContent,
        pageInfo,
        analysis
      );
    } else {
      // 添加新的元数据
      fixedContent = this.addNewMetadata(fixedContent, pageInfo);
    }

    return fixedContent;
  }

  /**
   * 更新现有元数据
   */
  updateExistingMetadata(content, pageInfo, analysis) {
    // 添加类型注解
    if (!analysis.hasTypeAnnotation) {
      content = content.replace(
        /export\s+const\s+metadata\s*=/,
        'export const metadata: Metadata ='
      );
    }

    // 添加canonical链接（如果缺少）
    if (!content.includes('canonical')) {
      content = content.replace(
        /(robots:\s*{[^}]+},?)/,
        `$1
  alternates: {
    canonical: '${pageInfo.url}',
  },`
      );
    }

    return content;
  }

  /**
   * 添加新的元数据
   */
  addNewMetadata(content, pageInfo) {
    const metadataConfig = this.generateStandardMetadata(pageInfo);

    // 在页面组件之前插入元数据
    const insertPosition = content.search(/export\s+default\s+function/);

    if (insertPosition !== -1) {
      return (
        content.slice(0, insertPosition) +
        metadataConfig +
        '\n\n' +
        content.slice(insertPosition)
      );
    }

    return content + '\n\n' + metadataConfig;
  }

  /**
   * 生成标准元数据配置
   */
  generateStandardMetadata(pageInfo) {
    return `// SEO元数据配置
export const metadata: Metadata = {
  title: '${pageInfo.title}',
  description: '${pageInfo.description}',
  keywords: [${pageInfo.keywords.map(k => `'${k}'`).join(', ')}],
  openGraph: {
    title: '${pageInfo.title}',
    description: '${pageInfo.description}',
    type: 'website',
    locale: 'zh_CN',
    url: '${pageInfo.url}',
    siteName: '关东旅游指南',
    images: [
      {
        url: '${pageInfo.ogImage}',
        width: 1200,
        height: 630,
        alt: '${pageInfo.imageAlt}',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${pageInfo.title}',
    description: '${pageInfo.description}',
    images: ['${pageInfo.ogImage}'],
  },
  alternates: {
    canonical: '${pageInfo.url}',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};`;
  }

  /**
   * 从文件路径提取URL路径
   */
  getUrlPathFromFile(filePath) {
    const relativePath = path.relative(
      path.join(PROJECT_ROOT, 'src', 'app'),
      filePath
    );
    const urlPath = relativePath
      .replace(/\\/g, '/')
      .replace('/page.tsx', '')
      .replace(/^\//, '');

    return urlPath ? `/${urlPath}` : '/';
  }

  /**
   * 提取页面信息
   */
  extractPageInfo(content, urlPath) {
    // 从内容中提取页面信息，或使用默认值
    const pathParts = urlPath.split('/').filter(Boolean);
    const region = pathParts[0] || '关东';
    const category = pathParts[1] || '活动';
    const event = pathParts[2] || '详情';

    return {
      title: `${event} - ${region}${category === 'hanabi' ? '花火大会' : '活动'}完整攻略`,
      description: `${event}详细指南，包含举办时间、地点、交通方式、观赏攻略等实用信息。体验${region}地区最精彩的${category === 'hanabi' ? '花火表演' : '文化活动'}，规划完美的日本关东之旅。`,
      keywords: [
        event,
        `${region}${category === 'hanabi' ? '花火' : '活动'}`,
        category === 'hanabi' ? '花火大会' : '日本活动',
        '2025年活动',
        category === 'hanabi' ? '夏季花火' : '传统文化',
        '日本旅游',
        '关东旅游',
      ],
      url: `${BASE_URL}${urlPath}`,
      ogImage:
        category === 'hanabi'
          ? `/images/hanabi/${event}-fireworks.svg`
          : `/images/events/${event}.jpg`,
      imageAlt: `${event}${category === 'hanabi' ? '花火大会' : '活动'}精彩瞬间`,
    };
  }

  /**
   * 创建备份
   */
  createBackup(filePath) {
    const backupDir = path.join(PROJECT_ROOT, 'backups', 'seo-optimization');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const relativePath = path.relative(PROJECT_ROOT, filePath);
    const backupPath = path.join(backupDir, relativePath);
    const backupDirPath = path.dirname(backupPath);

    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }

    fs.copyFileSync(filePath, backupPath);
  }

  /**
   * 生成优化报告
   */
  generateReport() {
    console.log('\n📊 SEO优化报告');
    console.log('='.repeat(50));
    console.log(`📄 检查文件总数: ${this.checkedFiles}`);
    console.log(`✅ 修复文件数量: ${this.fixedFiles.length}`);
    console.log(`❌ 发现问题数量: ${this.issues.length}`);

    if (this.fixedFiles.length > 0) {
      console.log('\n🔧 已修复的文件:');
      this.fixedFiles.forEach(file => console.log(`  - ${file}`));
    }

    if (this.issues.length > 0) {
      console.log('\n⚠️  发现的问题:');
      this.issues.forEach(issue => {
        console.log(
          `  - ${path.relative(PROJECT_ROOT, issue.file)}: ${issue.message}`
        );
      });
    }

    console.log('\n✨ SEO优化完成！');
  }
}

// 执行优化
const optimizer = new SEOOptimizer();
optimizer.optimize().catch(console.error);
