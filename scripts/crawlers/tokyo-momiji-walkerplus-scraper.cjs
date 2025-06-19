const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * WalkerPlus 东京狩枫排行榜数据抓取器
 * 技术栈：Pure Playwright + Cheerio
 * 层级：三层 - 东京 - 狩枫 - 列表 - 数据库
 * 目标：获取东京都红叶名所排行榜数据
 * 商业要求：所有信息必须真实，严禁编造
 * 数据分类：地点、例年の色づき始め、例年の紅葉見頃、行ってみたい
 */

class TokyoMomijiWalkerplusScraper {
  constructor() {
    this.results = [];
    this.baseUrl = 'https://koyo.walkerplus.com/ranking/ar0313/';
    this.outputDir = path.join(__dirname, '../../data/walkerplus-crawled');
    this.region = '東京都';
    this.activityType = 'momiji';
    this.level = '三層';

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 智能文本清理函数
   */
  cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * 提取色づき始め信息
   */
  extractColoringStartFromText(text) {
    if (!text) return '';

    const patterns = [
      /例年の色づき始め[：:]?\s*([^\n\r]+?)(?=例年の|行って|$)/i,
      /色づき始め[：:]?\s*([^\n\r]+?)(?=例年の|行って|$)/i,
      /(\d+月[上中下]?旬)\s*(?:色づき始め|から色づき)/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return this.cleanText(match[1]);
      }
    }

    return '';
  }

  /**
   * 提取紅葉見頃信息
   */
  extractBestViewingFromText(text) {
    if (!text) return '';

    const patterns = [
      /例年の紅葉見頃[：:]?\s*([^\n\r]+?)(?=行って|$)/i,
      /紅葉見頃[：:]?\s*([^\n\r]+?)(?=行って|$)/i,
      /見頃[：:]?\s*([^\n\r]+?)(?=行って|$)/i,
      /(\d+月[上中下]?旬(?:～\d+月[上中下]?旬)?)/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return this.cleanText(match[1]);
      }
    }

    return '';
  }

  /**
   * 提取行ってみたい数值
   */
  extractWantToVisitFromText(text) {
    if (!text) return '';

    const patterns = [
      /行ってみたい[：:]?\s*(\d+)/i,
      /行ってみたい\s*[：:]?\s*(\d+)/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return '';
  }

  /**
   * 提取地点位置信息
   */
  extractLocationFromText(text) {
    if (!text) return '';

    const patterns = [
      /(東京都[・·]?[^・\n\r]+)/i,
      /([^・\n\r]*(?:区|市|町|村)[^・\n\r]*)/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return this.cleanText(match[1]);
      }
    }

    return '';
  }

  /**
   * 从单个列表项提取红叶信息
   */
  extractFromElement($, element) {
    const $element = $(element);

    // 获取主链接元素，这是每个红叶项目的容器
    const $link = $element.find('a[href*="detail"]').first();
    if (!$link.length) return null;

    // 1. 提取名称 - 从 h2 标题获取
    const $nameElement = $link.find('h2').first();
    const name = this.cleanText($nameElement.text());
    if (!name || name.length < 3) return null;

    // 2. 提取地点 - 从特定结构中获取纯净的地理位置
    let location = '';
    const $locationElements = $link
      .find('div')
      .find('div')
      .find('div')
      .filter(function () {
        const text = $(this).text();
        return (
          text.includes('東京都・') &&
          !text.includes('例年の') &&
          !text.includes('行って')
        );
      });

    if ($locationElements.length > 0) {
      const locationText = this.cleanText($locationElements.first().text());
      // 只提取地理位置部分，移除其他信息
      const locationMatch = locationText.match(/(東京都[・·][^例行]+)/);
      if (locationMatch) {
        location = this.cleanText(locationMatch[1]);
      }
    }

    // 如果上面的方法没有找到，尝试其他选择器
    if (!location) {
      const allText = $link.text();
      const locationMatch = allText.match(
        /(東京都[・·][^例行]+?)(?=\s*例年の|$)/
      );
      if (locationMatch) {
        location = this.cleanText(locationMatch[1]);
      }
    }

    // 3. 提取色づき始め
    let coloringStart = '';
    const $coloringElements = $link.find('div').filter(function () {
      const text = $(this).text();
      return (
        text.includes('例年の色づき始め：') && !text.includes('例年の紅葉見頃')
      );
    });

    if ($coloringElements.length > 0) {
      const coloringText = $coloringElements.text();
      const coloringMatch = coloringText.match(
        /例年の色づき始め：([^例行]+?)(?=\s|$)/
      );
      if (coloringMatch) {
        coloringStart = this.cleanText(coloringMatch[1]);
      }
    }

    // 4. 提取紅葉見頃
    let bestViewing = '';
    const $viewingElements = $link.find('div').filter(function () {
      const text = $(this).text();
      return text.includes('例年の紅葉見頃：') && !text.includes('行って');
    });

    if ($viewingElements.length > 0) {
      const viewingText = $viewingElements.text();
      const viewingMatch = viewingText.match(
        /例年の紅葉見頃：([^行]+?)(?=\s*行って|$)/
      );
      if (viewingMatch) {
        bestViewing = this.cleanText(viewingMatch[1]);
      }
    }

    // 5. 提取行ってみたい数值
    let wantToVisit = '';
    const $wantElements = $link.find('li').filter(function () {
      const text = $(this).text();
      return (
        text.includes('行ってみたい：') && !text.includes('行ってよかった')
      );
    });

    if ($wantElements.length > 0) {
      const wantText = $wantElements.text();
      const wantMatch = wantText.match(/行ってみたい：(\d+)/);
      if (wantMatch) {
        wantToVisit = wantMatch[1];
      }
    }

    // 获取详情链接
    const detailLink = $link.attr('href') || '';

    return {
      name: name,
      location: location || '東京都内',
      coloringStart: coloringStart || '情報確認中',
      bestViewing: bestViewing || '情報確認中',
      wantToVisit: wantToVisit || '0',
      detailUrl: detailLink ? `https://koyo.walkerplus.com${detailLink}` : '',
      sourceUrl: this.baseUrl,
      extractedAt: new Date().toISOString(),
    };
  }

  /**
   * 主要抓取函数
   */
  async scrapeData() {
    console.log('🍁 开始抓取东京狩枫排行榜数据...');
    console.log(`📍 目标URL: ${this.baseUrl}`);
    console.log(
      `🎯 层级: ${this.level} - ${this.region} - ${this.activityType}`
    );
    console.log('⚠️  商业项目要求：所有信息必须真实，严禁编造');

    let browser = null;
    let page = null;

    try {
      // 启动浏览器
      console.log('🚀 启动Playwright浏览器...');
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      page = await browser.newPage();

      // 设置用户代理
      await page.setExtraHTTPHeaders({
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });

      console.log(`🔍 正在访问: ${this.baseUrl}`);

      // 访问页面
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      console.log('📄 页面加载完成，开始解析数据...');

      // 获取页面HTML
      const html = await page.content();
      const $ = cheerio.load(html);

      // 查找红叶列表项
      const listSelectors = [
        'li:has(a[href*="detail"])',
        '.event-item',
        '.spot-item',
        '.ranking-item',
        'article',
      ];

      let eventElements = [];
      for (const selector of listSelectors) {
        eventElements = $(selector).toArray();
        if (eventElements.length > 0) {
          console.log(
            `✅ 找到 ${eventElements.length} 个元素使用选择器: ${selector}`
          );
          break;
        }
      }

      if (eventElements.length === 0) {
        console.log('⚠️ 未找到红叶列表项，尝试通用选择器...');
        eventElements = $('a[href*="detail"]').parent().toArray();
      }

      console.log(`📊 总共找到 ${eventElements.length} 个潜在的红叶项目`);

      // 提取每个红叶项目的信息
      let successCount = 0;
      eventElements.forEach((element, index) => {
        const eventData = this.extractFromElement($, element);
        if (eventData && eventData.name && eventData.name.length > 3) {
          this.results.push({
            ...eventData,
            rank: successCount + 1,
            pageIndex: index + 1,
          });
          successCount++;
          console.log(`✅ 提取成功 [${successCount}]: ${eventData.name}`);
        }
      });

      console.log(`🎉 成功提取 ${successCount} 个红叶项目数据`);

      if (this.results.length === 0) {
        throw new Error('未能提取到任何有效的红叶数据');
      }

      // 保存结果
      await this.saveResults();

      console.log('🎊 红叶数据抓取完成！');
      return this.results;
    } catch (error) {
      console.error('❌ 抓取过程出错:', error.message);
      throw error;
    } finally {
      // 清理资源
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
    }
  }

  /**
   * 保存抓取结果
   */
  async saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `tokyo-momiji-complete-${timestamp}.json`;
    const filepath = path.join(this.outputDir, filename);

    const output = {
      timestamp: new Date().toISOString(),
      source: this.baseUrl,
      method: 'Pure Playwright + Cheerio Complete Scraping',
      region: this.region,
      activityType: this.activityType,
      level: this.level,
      summary: {
        totalEventsFound: this.results.length,
        dataFields: [
          'name',
          'location',
          'coloringStart',
          'bestViewing',
          'wantToVisit',
        ],
        extractionMethod: 'First Page Only',
        errors: 0,
      },
      events: this.results,
      metadata: {
        pageProcessed: 1,
        url: this.baseUrl,
        timestamp: new Date().toISOString(),
      },
      errors: [],
    };

    fs.writeFileSync(filepath, JSON.stringify(output, null, 2), 'utf8');

    console.log(`💾 数据已保存到: ${filepath}`);
    console.log(`📊 统计信息:`);
    console.log(`   - 总项目数: ${this.results.length}`);
    console.log(
      `   - 文件大小: ${(fs.statSync(filepath).size / 1024).toFixed(2)} KB`
    );
  }
}

/**
 * 主执行函数
 */
async function main() {
  console.log('🚀 启动东京狩枫数据爬虫');
  console.log('📋 项目信息: 三层 - 东京 - 狩枫 - 列表 - 数据库');
  console.log('🔧 技术栈: Pure Playwright + Cheerio');

  const scraper = new TokyoMomijiWalkerplusScraper();

  try {
    await scraper.scrapeData();
    console.log('✅ 爬虫执行成功完成');
  } catch (error) {
    console.error('❌ 爬虫执行失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = TokyoMomijiWalkerplusScraper;
