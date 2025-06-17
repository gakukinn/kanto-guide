const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

/**
 * 全面检查所有第四层详情页面的链接
 * 检查项目：
 * 1. 谷歌地图链接 (mapEmbedUrl)
 * 2. 官方网址 (website)
 * 3. 链接有效性验证
 */

class DetailPagesLinkChecker {
  constructor() {
    this.results = {
      total: 0,
      checked: 0,
      errors: [],
      warnings: [],
      success: [],
    };
    this.timeout = 10000; // 10秒超时
  }

  /**
   * 获取所有第四层详情页面的数据文件
   */
  getAllDetailPageDataFiles() {
    const dataDir = path.join(process.cwd(), 'src/data');
    const files = [];

    // 递归搜索所有数据文件
    const searchDir = dir => {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          searchDir(fullPath);
        } else if (
          item.endsWith('.ts') &&
          (item.includes('level4') || item.includes('level5')) &&
          !item.includes('.backup') &&
          !item.includes('.test')
        ) {
          files.push(fullPath);
        }
      }
    };

    searchDir(dataDir);
    return files;
  }

  /**
   * 从数据文件中提取链接信息
   */
  extractLinksFromFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);

      const links = {
        file: relativePath,
        mapEmbedUrl: null,
        website: null,
        hasMapInfo: false,
      };

      // 提取 mapEmbedUrl
      const mapEmbedMatch = content.match(/mapEmbedUrl:\s*['"`]([^'"`]+)['"`]/);
      if (mapEmbedMatch) {
        links.mapEmbedUrl = mapEmbedMatch[1];
      }

      // 检查是否有空的 mapEmbedUrl
      const emptyMapEmbedMatch = content.match(/mapEmbedUrl:\s*['"`]['"`]/);
      if (emptyMapEmbedMatch) {
        links.mapEmbedUrl = '';
      }

      // 提取 website
      const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
      if (websiteMatch) {
        links.website = websiteMatch[1];
      }

      // 检查是否有 mapInfo
      const mapInfoMatch = content.match(/mapInfo:\s*{/);
      if (mapInfoMatch) {
        links.hasMapInfo = true;
      }

      return links;
    } catch (error) {
      this.results.errors.push({
        file: filePath,
        type: 'FILE_READ_ERROR',
        message: `无法读取文件: ${error.message}`,
      });
      return null;
    }
  }

  /**
   * 验证谷歌地图链接
   */
  validateMapEmbedUrl(url, fileName) {
    const issues = [];

    if (!url) {
      issues.push({
        type: 'MISSING_MAP_URL',
        severity: 'ERROR',
        message: '缺少 mapEmbedUrl 字段',
      });
    } else if (url === '') {
      issues.push({
        type: 'EMPTY_MAP_URL',
        severity: 'ERROR',
        message: 'mapEmbedUrl 字段为空',
      });
    } else if (!url.includes('google.com/maps/embed')) {
      issues.push({
        type: 'INVALID_MAP_URL_FORMAT',
        severity: 'ERROR',
        message: 'mapEmbedUrl 不是有效的 Google Maps 嵌入链接',
      });
    } else if (!url.startsWith('https://')) {
      issues.push({
        type: 'INSECURE_MAP_URL',
        severity: 'WARNING',
        message: 'mapEmbedUrl 应该使用 HTTPS 协议',
      });
    }

    return issues;
  }

  /**
   * 验证官方网址
   */
  validateWebsiteUrl(url, fileName) {
    const issues = [];

    if (!url) {
      issues.push({
        type: 'MISSING_WEBSITE_URL',
        severity: 'WARNING',
        message: '缺少 website 字段',
      });
    } else if (url === '') {
      issues.push({
        type: 'EMPTY_WEBSITE_URL',
        severity: 'ERROR',
        message: 'website 字段为空',
      });
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      issues.push({
        type: 'INVALID_WEBSITE_URL_FORMAT',
        severity: 'ERROR',
        message: 'website URL 格式不正确，应以 http:// 或 https:// 开头',
      });
    } else if (url.includes('example.com')) {
      issues.push({
        type: 'PLACEHOLDER_WEBSITE_URL',
        severity: 'ERROR',
        message: 'website 使用了占位符 URL (example.com)',
      });
    }

    return issues;
  }

  /**
   * 检查URL是否可访问
   */
  async checkUrlAccessibility(url) {
    return new Promise(resolve => {
      if (!url || !url.startsWith('http')) {
        resolve({ accessible: false, error: 'Invalid URL' });
        return;
      }

      const client = url.startsWith('https://') ? https : http;
      const options = {
        method: 'HEAD',
        timeout: this.timeout,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      };

      const req = client.request(url, options, res => {
        resolve({
          accessible: res.statusCode >= 200 && res.statusCode < 400,
          statusCode: res.statusCode,
          error: null,
        });
      });

      req.on('error', error => {
        resolve({
          accessible: false,
          error: error.message,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          accessible: false,
          error: 'Request timeout',
        });
      });

      req.end();
    });
  }

  /**
   * 检查单个文件的所有链接
   */
  async checkFileLinks(filePath) {
    const links = this.extractLinksFromFile(filePath);
    if (!links) return;

    this.results.total++;

    const fileResult = {
      file: links.file,
      issues: [],
      mapEmbedUrl: links.mapEmbedUrl,
      website: links.website,
      hasMapInfo: links.hasMapInfo,
    };

    // 验证地图链接
    const mapIssues = this.validateMapEmbedUrl(links.mapEmbedUrl, links.file);
    fileResult.issues.push(...mapIssues);

    // 验证官方网址
    const websiteIssues = this.validateWebsiteUrl(links.website, links.file);
    fileResult.issues.push(...websiteIssues);

    // 检查链接可访问性
    if (
      links.mapEmbedUrl &&
      links.mapEmbedUrl.includes('google.com/maps/embed')
    ) {
      const mapAccessibility = await this.checkUrlAccessibility(
        links.mapEmbedUrl
      );
      if (!mapAccessibility.accessible) {
        fileResult.issues.push({
          type: 'MAP_URL_INACCESSIBLE',
          severity: 'WARNING',
          message: `地图链接无法访问: ${mapAccessibility.error || mapAccessibility.statusCode}`,
        });
      }
    }

    if (links.website && links.website.startsWith('http')) {
      const websiteAccessibility = await this.checkUrlAccessibility(
        links.website
      );
      if (!websiteAccessibility.accessible) {
        fileResult.issues.push({
          type: 'WEBSITE_URL_INACCESSIBLE',
          severity: 'WARNING',
          message: `官方网址无法访问: ${websiteAccessibility.error || websiteAccessibility.statusCode}`,
        });
      }
    }

    // 分类结果
    const hasErrors = fileResult.issues.some(
      issue => issue.severity === 'ERROR'
    );
    const hasWarnings = fileResult.issues.some(
      issue => issue.severity === 'WARNING'
    );

    if (hasErrors) {
      this.results.errors.push(fileResult);
    } else if (hasWarnings) {
      this.results.warnings.push(fileResult);
    } else {
      this.results.success.push(fileResult);
    }

    this.results.checked++;
  }

  /**
   * 生成检查报告
   */
  generateReport() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(
      process.cwd(),
      'reports',
      `detail-pages-links-check-${timestamp}.json`
    );

    // 确保报告目录存在
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.total,
        checked: this.results.checked,
        errors: this.results.errors.length,
        warnings: this.results.warnings.length,
        success: this.results.success.length,
      },
      details: {
        errors: this.results.errors,
        warnings: this.results.warnings,
        success: this.results.success,
      },
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // 同时创建最新报告的副本
    const latestReportPath = path.join(
      reportsDir,
      'latest-detail-pages-links-check.json'
    );
    fs.writeFileSync(latestReportPath, JSON.stringify(report, null, 2));

    return { reportPath, report };
  }

  /**
   * 打印控制台报告
   */
  printConsoleReport(report) {
    console.log('\n🔍 第四层详情页面链接检查报告');
    console.log('='.repeat(50));
    console.log(`📊 总计: ${report.summary.total} 个文件`);
    console.log(`✅ 检查完成: ${report.summary.checked} 个文件`);
    console.log(`❌ 错误: ${report.summary.errors} 个文件`);
    console.log(`⚠️  警告: ${report.summary.warnings} 个文件`);
    console.log(`✅ 正常: ${report.summary.success} 个文件`);

    if (report.summary.errors > 0) {
      console.log('\n❌ 错误详情:');
      report.details.errors.forEach((error, index) => {
        console.log(`\n${index + 1}. ${error.file}`);
        error.issues.forEach(issue => {
          if (issue.severity === 'ERROR') {
            console.log(`   ❌ ${issue.message}`);
          }
        });
      });
    }

    if (report.summary.warnings > 0) {
      console.log('\n⚠️  警告详情:');
      report.details.warnings.forEach((warning, index) => {
        console.log(`\n${index + 1}. ${warning.file}`);
        warning.issues.forEach(issue => {
          if (issue.severity === 'WARNING') {
            console.log(`   ⚠️  ${issue.message}`);
          }
        });
      });
    }

    console.log('\n📋 检查项目:');
    console.log('   • mapEmbedUrl - 谷歌地图嵌入链接');
    console.log('   • website - 官方网址');
    console.log('   • 链接可访问性验证');
    console.log('   • URL格式验证');
  }

  /**
   * 执行完整检查
   */
  async runFullCheck() {
    console.log('🚀 开始检查所有第四层详情页面的链接...\n');

    const dataFiles = this.getAllDetailPageDataFiles();
    console.log(`📁 找到 ${dataFiles.length} 个数据文件`);

    // 并发检查文件（限制并发数避免过载）
    const concurrency = 5;
    for (let i = 0; i < dataFiles.length; i += concurrency) {
      const batch = dataFiles.slice(i, i + concurrency);
      await Promise.all(batch.map(file => this.checkFileLinks(file)));

      // 显示进度
      const progress = Math.min(i + concurrency, dataFiles.length);
      console.log(
        `📊 进度: ${progress}/${dataFiles.length} (${Math.round((progress / dataFiles.length) * 100)}%)`
      );
    }

    const { reportPath, report } = this.generateReport();
    this.printConsoleReport(report);

    console.log(`\n📄 详细报告已保存到: ${reportPath}`);

    return report;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const checker = new DetailPagesLinkChecker();
  checker.runFullCheck().catch(console.error);
}

module.exports = DetailPagesLinkChecker;
