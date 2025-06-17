import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 🎯 高级WalkerPlus数据验证器
 * 
 * 特性：
 * - 智能重试机制
 * - 详细错误处理
 * - 性能监控
 * - 多数据源对比
 * - 自动报告生成
 */
class AdvancedWalkerVerifier {
  constructor(config = {}) {
    this.config = {
      headless: true,
      timeout: 30000,
      retryCount: 3,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ...config
    };
    this.browser = null;
    this.page = null;
    this.metrics = {
      startTime: Date.now(),
      requests: 0,
      errors: 0,
      dataPoints: 0
    };
  }

  /**
   * 🚀 初始化浏览器
   */
  async init() {
    console.log('🎭 启动高级验证器...');
    this.browser = await chromium.launch({
      headless: this.config.headless,
      args: ['--no-sandbox', '--disable-dev-shm-usage']
    });
    
    this.page = await this.browser.newPage({
      userAgent: this.config.userAgent
    });

    // 拦截网络请求以进行性能监控
    this.page.on('request', () => this.metrics.requests++);
    this.page.on('requestfailed', () => this.metrics.errors++);
  }

  /**
   * 🔍 智能抓取WalkerPlus数据
   */
  async scrapeWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📡 第${attempt}次尝试访问: ${url}`);
        
        await this.page.goto(url, {
          waitUntil: 'networkidle',
          timeout: this.config.timeout
        });

        // 等待关键元素加载
        await this.page.waitForSelector('body', { timeout: 5000 });
        
        const html = await this.page.content();
        const $ = cheerio.load(html);
        
        console.log(`✅ 页面加载成功: ${$('title').text()}`);
        return $;
        
      } catch (error) {
        console.log(`❌ 第${attempt}次尝试失败: ${error.message}`);
        if (attempt === maxRetries) {
          throw new Error(`所有${maxRetries}次尝试均失败: ${error.message}`);
        }
        await this.delay(2000 * attempt); // 递增延迟
      }
    }
  }

  /**
   * 🎯 精确提取花火大会数据
   */
  extractHanabiData($) {
    const events = [];
    
    // 多种选择器策略，确保数据准确性
    const selectors = [
      'a[href*="hanabi"]',
      '.item-title',
      'h2, h3, h4',
      '[class*="title"]',
      '[class*="name"]'
    ];

    selectors.forEach(selector => {
      $(selector).each((index, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        
        if (this.isValidHanabiEvent(text)) {
          const event = this.parseEventData($el, $);
          if (event && !events.find(e => e.name === event.name)) {
            events.push(event);
            this.metrics.dataPoints++;
          }
        }
      });
    });

    return events;
  }

  /**
   * 🧠 智能判断是否为有效花火大会
   */
  isValidHanabiEvent(text) {
    const patterns = [
      /花火大会/,
      /花火祭/,
      /花火まつり/,
      /花火フェス/
    ];

    const excludePatterns = [
      /ランキング/,
      /一覧/,
      /について/,
      /カレンダー/,
      /検索/,
      /^広告/
    ];

    return patterns.some(p => p.test(text)) && 
           !excludePatterns.some(p => p.test(text)) &&
           text.length > 3 && text.length < 100;
  }

  /**
   * 📊 解析事件详细数据
   */
  parseEventData($el, $) {
    const name = $el.text().trim();
    const parent = $el.closest('li, div, article, section, tr');
    const context = parent.text();

    return {
      name: name,
      date: this.extractDate(context),
      location: this.extractLocation(context),
      expectedVisitors: this.extractVisitors(context),
      fireworksCount: this.extractFireworks(context),
      url: $el.attr('href') || '',
      source: 'walkerplus',
      extractedAt: new Date().toISOString()
    };
  }

  /**
   * 📅 智能日期提取
   */
  extractDate(text) {
    const patterns = [
      /2025[年\/\-](\d{1,2})[月\/\-](\d{1,2})日?/,
      /(\d{1,2})月(\d{1,2})日/,
      /(\d{4})\/(\d{1,2})\/(\d{1,2})/,
      /(\d{1,2})\/(\d{1,2})/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        if (pattern.source.includes('2025')) {
          return `2025年${match[1]}月${match[2]}日`;
        } else if (match[3]) {
          return `${match[1]}年${match[2]}月${match[3]}日`;
        } else {
          return `2025年${match[1]}月${match[2]}日`;
        }
      }
    }
    return '日期待确认';
  }

  /**
   * 📍 智能地点提取
   */
  extractLocation(text) {
    const locationKeywords = [
      '区', '市', '町', '村', '県', '都',
      '公園', '会場', '河川敷', '競馬場', 
      '外苑', '神宮', '競技場', '広場'
    ];

    const lines = text.split(/[\n\r、。]/);
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (locationKeywords.some(keyword => trimmed.includes(keyword)) && 
          trimmed.length < 50 && trimmed.length > 2) {
        return trimmed;
      }
    }
    return '地点待确认';
  }

  /**
   * 👥 智能观众数提取
   */
  extractVisitors(text) {
    const patterns = [
      /[約约]?(\d+(?:\.\d+)?)[万萬]人/,
      /(\d+(?:,\d+)?)[万萬]?人/,
      /来場者[：:]?\s*[約约]?(\d+(?:\.\d+)?)[万萬]?人?/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const num = parseFloat(match[1].replace(',', ''));
        return num < 1000 ? `约${num}万人` : `约${num}人`;
      }
    }
    return '观众数待确认';
  }

  /**
   * 🎆 智能花火数提取
   */
  extractFireworks(text) {
    const patterns = [
      /[約约]?(\d+(?:\.\d+)?)[万萬][発发]/,
      /(\d+(?:,\d+)?)[发發]/,
      /花火[：:]?\s*[約约]?(\d+(?:\.\d+)?)[万萬]?[発发]/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const num = parseFloat(match[1].replace(',', ''));
        return num < 100 ? `约${num}万发` : `约${num}发`;
      }
    }
    return '花火数待确认';
  }

  /**
   * 📊 高级数据对比分析
   */
  performAdvancedComparison(walkerData, projectData) {
    const analysis = {
      summary: {
        walkerTotal: walkerData.length,
        projectTotal: projectData.length,
        matchedCount: 0,
        accuracyScore: 0
      },
      matches: [],
      discrepancies: [],
      recommendations: []
    };

    // 使用模糊匹配算法
    projectData.forEach(pEvent => {
      const bestMatch = this.findBestMatch(pEvent, walkerData);
      if (bestMatch.score > 0.7) {
        analysis.matches.push({
          project: pEvent,
          walker: bestMatch.event,
          similarity: bestMatch.score,
          differences: this.analyzeDifferences(pEvent, bestMatch.event)
        });
        analysis.summary.matchedCount++;
      } else {
        analysis.discrepancies.push({
          type: 'missing_in_walker',
          event: pEvent,
          reason: `相似度过低 (${bestMatch.score.toFixed(2)})`
        });
      }
    });

    // 计算准确性评分
    analysis.summary.accuracyScore = 
      (analysis.summary.matchedCount / analysis.summary.projectTotal * 100).toFixed(2);

    // 生成改进建议
    this.generateRecommendations(analysis);

    return analysis;
  }

  /**
   * 🧮 模糊匹配算法
   */
  findBestMatch(target, candidates) {
    let bestMatch = { event: null, score: 0 };
    
    candidates.forEach(candidate => {
      const score = this.calculateSimilarity(target.name, candidate.name);
      if (score > bestMatch.score) {
        bestMatch = { event: candidate, score };
      }
    });

    return bestMatch;
  }

  /**
   * 📈 相似度计算
   */
  calculateSimilarity(str1, str2) {
    const normalize = (str) => str.replace(/第\d+回\s?|花火大会|の打ち上げ数・日程など|\s/g, '').toLowerCase();
    
    const norm1 = normalize(str1);
    const norm2 = normalize(str2);
    
    if (norm1 === norm2) return 1.0;
    if (norm1.includes(norm2) || norm2.includes(norm1)) return 0.8;
    
    // Levenshtein距离计算
    const distance = this.levenshteinDistance(norm1, norm2);
    const maxLength = Math.max(norm1.length, norm2.length);
    return 1 - (distance / maxLength);
  }

  /**
   * 📝 生成详细报告
   */
  generateDetailedReport(analysis, walkerData) {
    const report = this.createReportHeader();
    
    report += this.createSummarySection(analysis);
    report += this.createDataSection(walkerData);
    report += this.createComparisonSection(analysis);
    report += this.createRecommendationsSection(analysis);
    report += this.createMetricsSection();
    
    return report;
  }

  createReportHeader() {
    return `
# 🎯 高级WalkerPlus数据验证报告
## Playwright + Cheerio 技术深度应用

**生成时间**: ${new Date().toLocaleString('zh-CN')}
**验证引擎**: Advanced Walker Verifier v2.0
**技术栈**: Playwright ${this.getPlaywrightVersion()} + Cheerio 1.1.0

---

`;
  }

  createSummarySection(analysis) {
    return `
## 📊 执行摘要

| 指标 | 数值 | 评级 |
|------|------|------|
| 🎯 **数据准确性** | ${analysis.summary.accuracyScore}% | ${this.getGrade(analysis.summary.accuracyScore)} |
| 📡 **WalkerPlus抓取** | ${analysis.summary.walkerTotal} 个事件 | ${analysis.summary.walkerTotal > 5 ? '✅' : '⚠️'} |
| 📝 **项目数据** | ${analysis.summary.projectTotal} 个事件 | ✅ |
| 🔄 **成功匹配** | ${analysis.summary.matchedCount} 个事件 | ${analysis.summary.matchedCount === analysis.summary.projectTotal ? '✅' : '⚠️'} |
| ⚡ **响应时间** | ${Date.now() - this.metrics.startTime}ms | ${Date.now() - this.metrics.startTime < 10000 ? '✅' : '⚠️'} |

`;
  }

  /**
   * 🔧 工具方法
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getGrade(score) {
    if (score >= 95) return '🏆 优秀';
    if (score >= 85) return '✅ 良好';
    if (score >= 70) return '⚠️ 一般';
    return '❌ 需改进';
  }

  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 验证器已关闭');
    }
  }

  /**
   * 🎯 主执行方法
   */
  async run() {
    try {
      await this.init();
      
      const $ = await this.scrapeWithRetry('https://hanabi.walkerplus.com/ranking/ar0313/');
      const walkerData = this.extractHanabiData($);
      
      // 项目数据（实际应从文件读取）
      const projectData = [
        { name: '第48回 隅田川花火大会', date: '2025年7月26日', expectedVisitors: '约91万人', fireworksCount: '约2万发' },
        { name: '神宮外苑花火大会', date: '2025年8月16日', expectedVisitors: '约100万人', fireworksCount: '约1万2000发' },
        { name: '東京競馬場花火大会', date: '2025年7月2日', expectedVisitors: '约6万人', fireworksCount: '约1万4000发' },
        { name: '江戸川区花火大会', date: '2025年8月2日', expectedVisitors: '约3万人', fireworksCount: '約1万4000発' },
        { name: '第59回葛饰纳凉花火大会', date: '2025年7月22日', expectedVisitors: '约77万人', fireworksCount: '約1万5000発' }
      ];

      const analysis = this.performAdvancedComparison(walkerData, projectData);
      const report = this.generateDetailedReport(analysis, walkerData);
      
      console.log(report);
      
      // 保存报告
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.join(process.cwd(), `advanced-verification-${timestamp}.md`);
      fs.writeFileSync(reportPath, report, 'utf8');
      console.log(`📄 详细报告已保存: ${reportPath}`);
      
    } catch (error) {
      console.error('❌ 验证过程发生错误:', error);
    } finally {
      await this.close();
    }
  }
}

// 使用示例
console.log('🎯 启动高级WalkerPlus验证器...');
const verifier = new AdvancedWalkerVerifier({
  headless: false, // 显示浏览器便于调试
  timeout: 60000,
  retryCount: 3
});

verifier.run().catch(console.error); 