const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * WalkerPlus 通用灯光秀排行榜数据抓取器
 * 技术栈：Pure Playwright + Cheerio
 * 层级：三层 - 地区 - 灯光秀 - 列表 - 数据库
 * 目标：获取指定地区灯光秀排行榜数据
 * 商业要求：所有信息必须真实，严禁编造
 * 数据分类：活动名称、地点、日期、时间、电球数
 *
 * 使用方法：
 * node universal-illumination-walkerplus-scraper.cjs --region ar0311
 * node universal-illumination-walkerplus-scraper.cjs --region ar0312
 * node universal-illumination-walkerplus-scraper.cjs --region ar0314
 * node universal-illumination-walkerplus-scraper.cjs --region ar0300
 * node universal-illumination-walkerplus-scraper.cjs --region ar0400
 */

class UniversalIlluminationWalkerplusScraper {
  constructor(regionCode) {
    this.results = [];
    this.regionCode = regionCode;
    this.regionInfo = this.getRegionInfo(regionCode);
    this.baseUrl = `https://illumi.walkerplus.com/ranking/${regionCode}/`;
    this.outputDir = path.join(__dirname, '../../data/walkerplus-crawled');
    this.activityType = 'illumination';
    this.level = '三層';

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 获取地区信息
   */
  getRegionInfo(regionCode) {
    const regionMap = {
      ar0311: { name: '埼玉県', nameEn: 'Saitama' },
      ar0312: { name: '千葉県', nameEn: 'Chiba' },
      ar0313: { name: '東京都', nameEn: 'Tokyo' },
      ar0314: { name: '神奈川県', nameEn: 'Kanagawa' },
      ar0300: { name: '北関東', nameEn: 'Kitakanto' },
      ar0400: { name: '甲信越', nameEn: 'Koshinetsu' },
    };

    return regionMap[regionCode] || { name: '不明地区', nameEn: 'Unknown' };
  }

  /**
   * 智能文本清理函数
   */
  cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * 提取日期信息
   */
  extractDateFromText(text) {
    if (!text) return '';

    const patterns = [
      /開催期間[：:]?\s*([^\n\r]+?)(?=ライトアップ|電球数|行って|$)/i,
      /期間[：:]?\s*([^\n\r]+?)(?=ライトアップ|電球数|行って|$)/i,
      /(\d{4}年\d{1,2}月\d{1,2}日[^～]*(?:～\d{4}年\d{1,2}月\d{1,2}日)?)/i,
      /(\d{1,2}月\d{1,2}日[^～]*(?:～\d{1,2}月\d{1,2}日)?)/i,
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
   * 提取时间信息（ライトアップ時間）
   */
  extractTimeFromText(text) {
    if (!text) return '';

    const patterns = [
      /ライトアップ時間[：:]?\s*([^\n\r]+?)(?=電球数|行って|$)/i,
      /点灯時間[：:]?\s*([^\n\r]+?)(?=電球数|行って|$)/i,
      /時間[：:]?\s*(\d{1,2}:\d{2}[^～]*(?:～\d{1,2}:\d{2})?)/i,
      /(\d{1,2}:\d{2}[^～]*(?:～\d{1,2}:\d{2})?)/,
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
   * 提取电球数信息
   */
  extractLightBulbsFromText(text) {
    if (!text) return '';

    const patterns = [
      /電球数[：:]?\s*([^\n\r]+?)(?=行って|$)/i,
      /電球数[：:]?\s*([\d,]+)/i,
      /([\d,]+)\s*球/i,
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

    const regionPrefix = this.regionInfo.name
      .replace('県', '')
      .replace('都', '')
      .replace('関東', '');

    const patterns = [
      new RegExp(`(${this.regionInfo.name}[・·]?[^・\\n\\r]+)`, 'i'),
      new RegExp(`(${regionPrefix}[・·]?[^・\\n\\r]+)`, 'i'),
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
   * 从单个列表项提取灯光秀信息
   */
  extractFromElement($, element) {
    const $element = $(element);

    // 获取主链接元素，这是每个灯光秀项目的容器
    const $link = $element.find('a[href*="detail"]').first();
    if (!$link.length) return null;

    // 1. 提取名称 - 从 h2 标题获取
    const $nameElement = $link.find('h2').first();
    const name = this.cleanText($nameElement.text());
    if (!name || name.length < 3) return null;

    // 2. 提取地点
    let location = '';
    const regionName = this.regionInfo.name;
    const $locationElements = $link
      .find('div')
      .find('div')
      .find('div')
      .filter(function () {
        const text = $(this).text();
        return (
          (text.includes(`${regionName}・`) ||
            text.includes(
              `${regionName.replace('県', '').replace('都', '')}・`
            )) &&
          !text.includes('開催期間') &&
          !text.includes('ライトアップ') &&
          !text.includes('電球数') &&
          !text.includes('行って')
        );
      });

    if ($locationElements.length > 0) {
      const locationText = this.cleanText($locationElements.first().text());
      const locationMatch = locationText.match(
        new RegExp(`(${this.regionInfo.name}?[・·][^開ライ電行]+)`)
      );
      if (locationMatch) {
        location = this.cleanText(locationMatch[1]);
      }
    }

    // 如果上面的方法没有找到，尝试其他选择器
    if (!location) {
      const allText = $link.text();
      const locationMatch = allText.match(
        new RegExp(
          `(${this.regionInfo.name}?[・·][^開ライ電行]+?)(?=\\s*開催期間|$)`
        )
      );
      if (locationMatch) {
        location = this.cleanText(locationMatch[1]);
      }
    }

    // 3. 提取完整文本用于进一步解析
    const fullText = $link.text();

    // 4. 提取各种信息
    const date = this.extractDateFromText(fullText);
    const time = this.extractTimeFromText(fullText);
    const lightBulbs = this.extractLightBulbsFromText(fullText);
    let wantToVisit = this.extractWantToVisitFromText(fullText);

    // 如果没有找到，使用默认值
    if (!wantToVisit) {
      wantToVisit = '0';
    }

    // 获取详情链接
    const detailLink = $link.attr('href') || '';

    return {
      name: name,
      location: location || `${this.regionInfo.name}内`,
      date: date || '情報確認中',
      time: time || '情報確認中',
      lightBulbs: lightBulbs || '情報確認中',
      wantToVisit: wantToVisit || '0',
      detailUrl: detailLink ? `https://illumi.walkerplus.com${detailLink}` : '',
      sourceUrl: this.baseUrl,
      extractedAt: new Date().toISOString(),
    };
  }

  /**
   * 主要抓取函数
   */
  async scrapeData() {
    console.log(`💡 开始抓取${this.regionInfo.name}灯光秀排行榜数据...`);
    console.log(`📍 目标URL: ${this.baseUrl}`);
    console.log(
      `🎯 层级: ${this.level} - ${this.regionInfo.name} - ${this.activityType}`
    );
    console.log('⚠️  商业项目要求：所有信息必须真实，严禁编造');

    let browser = null;
    let page = null;

    try {
      // 启动浏览器
      console.log('🚀 启动Playwright浏览器...');
      browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--ignore-certificate-errors',
        ],
        timeout: 60000,
      });

      page = await browser.newPage();

      // 设置页面超时
      page.setDefaultTimeout(60000);
      page.setDefaultNavigationTimeout(60000);

      // 设置用户代理
      await page.setExtraHTTPHeaders({
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });

      console.log(`🔍 正在访问: ${this.baseUrl}`);

      // 访问页面，使用更宽松的条件和重试机制
      let pageLoaded = false;
      let retryCount = 0;
      const maxRetries = 3;

      while (!pageLoaded && retryCount < maxRetries) {
        try {
          console.log(`🔄 尝试访问页面 (第${retryCount + 1}次)`);

          await page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
          });

          // 等待页面内容加载
          await page.waitForTimeout(2000);

          // 检查页面是否加载了内容
          const content = await page.content();
          if (content.length > 1000) {
            pageLoaded = true;
            console.log('✅ 页面加载成功');
          } else {
            throw new Error('页面内容不足，可能加载失败');
          }
        } catch (error) {
          retryCount++;
          console.log(`⚠️ 第${retryCount}次尝试失败: ${error.message}`);

          if (retryCount < maxRetries) {
            console.log(`🔄 等待3秒后重试...`);
            await page.waitForTimeout(3000);
          } else {
            console.log('⚠️ 所有重试均失败，尝试使用已加载的内容...');
            // 最后一次尝试获取页面内容
            try {
              await page.waitForTimeout(5000);
            } catch (finalError) {
              console.log('⚠️ 最终等待也失败，继续处理现有内容');
            }
          }
        }
      }

      console.log('📄 页面加载完成，开始解析数据...');

      // 获取页面HTML
      const html = await page.content();
      const $ = cheerio.load(html);

      // 查找灯光秀列表项
      const listSelectors = [
        'li',
        '.event-item',
        '.spot-item',
        '.ranking-item',
        'article',
      ];

      let eventElements = [];
      for (const selector of listSelectors) {
        eventElements = $(selector).toArray();
        // 过滤出包含detail链接的元素
        eventElements = eventElements.filter(el => {
          return $(el).find('a[href*="detail"]').length > 0;
        });

        if (eventElements.length > 0) {
          console.log(
            `✅ 找到 ${eventElements.length} 个元素使用选择器: ${selector}`
          );
          break;
        }
      }

      if (eventElements.length === 0) {
        console.log('⚠️ 未找到灯光秀列表项，尝试通用选择器...');
        eventElements = $('a[href*="detail"]').parent().toArray();
      }

      console.log(`📊 总共找到 ${eventElements.length} 个潜在的灯光秀项目`);

      // 提取每个灯光秀项目的信息
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

      console.log(`🎉 成功提取 ${successCount} 个灯光秀项目数据`);

      if (this.results.length === 0) {
        throw new Error('未能提取到任何有效的灯光秀数据');
      }

      // 保存结果
      await this.saveResults();

      console.log(`🎊 ${this.regionInfo.name}灯光秀数据抓取完成！`);
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
    const regionCode = this.regionCode.toLowerCase();
    const filename = `${regionCode}-illumination-complete-${timestamp}.json`;
    const filepath = path.join(this.outputDir, filename);

    const output = {
      timestamp: new Date().toISOString(),
      source: this.baseUrl,
      method: 'Pure Playwright + Cheerio Complete Scraping',
      region: this.regionInfo.name,
      regionCode: this.regionCode,
      activityType: this.activityType,
      level: this.level,
      summary: {
        totalEventsFound: this.results.length,
        dataFields: [
          'name',
          'location',
          'date',
          'time',
          'lightBulbs',
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
 * 命令行参数解析
 */
function parseArguments() {
  const args = process.argv.slice(2);
  let regionCode = 'ar0311'; // 默认为埼玉县

  // 解析 --region 参数
  const regionIndex = args.indexOf('--region');
  if (regionIndex !== -1 && args[regionIndex + 1]) {
    regionCode = args[regionIndex + 1];
  }

  return { regionCode };
}

/**
 * 主执行函数
 */
async function main() {
  const { regionCode } = parseArguments();

  const validRegions = [
    'ar0311',
    'ar0312',
    'ar0313',
    'ar0314',
    'ar0300',
    'ar0400',
  ];

  if (!validRegions.includes(regionCode)) {
    console.error(`❌ 无效的地区代码: ${regionCode}`);
    console.log('✅ 有效的地区代码:');
    console.log('   - ar0311 (埼玉県)');
    console.log('   - ar0312 (千葉県)');
    console.log('   - ar0313 (東京都)');
    console.log('   - ar0314 (神奈川県)');
    console.log('   - ar0300 (北関東)');
    console.log('   - ar0400 (甲信越)');
    process.exit(1);
  }

  console.log('🚀 启动通用灯光秀数据爬虫');
  console.log(`📋 地区代码: ${regionCode}`);
  console.log(`📋 项目信息: 三層 - 地区 - illumination - 列表 - 数据库`);
  console.log('🔧 技术栈: Pure Playwright + Cheerio');

  const scraper = new UniversalIlluminationWalkerplusScraper(regionCode);

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
  main().catch(console.error);
}

module.exports = UniversalIlluminationWalkerplusScraper;
