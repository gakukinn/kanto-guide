const { PlaywrightCrawler } = require('crawlee');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// 引入统一花见数据库管理器
const UnifiedHanamiDatabaseManager = require('../core/unified-hanami-database-manager.cjs');

/**
 * ar0313东京都花见会数据抓取器
 * 技术栈：Playwright + Cheerio + Crawlee
 * 目标：https://hanami.walkerplus.com/ranking/ar0313/
 * 数据库：统一花见数据库 data/hanami-database.json
 * 结构：三层（地区→花见会→列表）
 */
class Ar0313HanamiWalkerplusScraper {
  constructor() {
    this.results = [];
    this.targetUrl = 'https://hanami.walkerplus.com/ranking/ar0313/';
    this.regionCode = 'ar0313';
    this.regionName = '东京都';

    // 初始化数据库管理器
    this.dbManager = new UnifiedHanamiDatabaseManager();

    console.log('🌸 ar0313东京都花见会爬虫初始化');
    console.log(`📍 目标URL: ${this.targetUrl}`);
    console.log(`🗄️ 数据库: 统一花见数据库 (data/hanami-database.json)`);
  }

  /**
   * 清理文本
   */
  cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * 提取例年见顷（往年开花时间）
   */
  extractViewingSeason(text) {
    if (!text) return '';

    const seasonPatterns = [
      /(\d{1,2}月[上中下]旬～\d{1,2}月[上中下]旬)/, // 3月下旬～4月上旬
      /(\d{1,2}月[上中下]旬)/, // 4月上旬
      /(\d{1,2}月～\d{1,2}月)/, // 3月～4月
      /(\d{1,2}月\d{1,2}日～\d{1,2}月\d{1,2}日)/, // 3月20日～4月10日
      /(\d{1,2}月\d{1,2}日)/, // 4月5日
    ];

    for (const pattern of seasonPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return '';
  }

  /**
   * 从元素中提取花见信息
   */
  extractHanamiInfo($, element) {
    const $element = $(element);

    // 提取排名
    let rank = '';
    const rankElement = $element.find('.rank, .number, .ranking');
    if (rankElement.length > 0) {
      rank = this.cleanText(rankElement.text());
    }

    // 提取名称
    let name = '';
    const nameSelectors = [
      '.name a',
      '.title a',
      'h3 a',
      'h2 a',
      'a[href*="detail"]',
      '.event-name a',
    ];

    for (const selector of nameSelectors) {
      const nameElement = $element.find(selector);
      if (nameElement.length > 0) {
        name = this.cleanText(nameElement.text());
        if (name && name.length > 3) break;
      }
    }

    // 如果没找到名称，尝试从文本中提取
    if (!name) {
      const elementText = this.cleanText($element.text());
      const lines = elementText.split('\n').filter(line => line.trim());
      for (const line of lines) {
        if (
          line.includes('桜') ||
          line.includes('花見') ||
          line.includes('公園')
        ) {
          name = line;
          break;
        }
      }
    }

    if (!name || name.length < 3) return null;

    // 获取完整文本用于提取其他信息
    const fullText = this.cleanText($element.text());

    // 提取地点
    let location = '';
    const locationSelectors = ['.location', '.area', '.place', '.address'];

    for (const selector of locationSelectors) {
      const locationElement = $element.find(selector);
      if (locationElement.length > 0) {
        location = this.cleanText(locationElement.text());
        if (location) break;
      }
    }

    // 如果没找到地点，从文本中提取
    if (!location) {
      const locationKeywords = ['区', '市', '町', '村', '県', '都'];
      const lines = fullText.split(/[、。\n]/).filter(line => line.trim());
      for (const line of lines) {
        if (locationKeywords.some(keyword => line.includes(keyword))) {
          location = this.cleanText(line);
          break;
        }
      }
    }

    // 提取例年见顷（往年开花时间）
    const viewingSeason = this.extractViewingSeason(fullText);

    // 提取详情链接
    const detailLink = $element.find('a[href*="detail"]').attr('href') || '';

    // 提取排名数字
    const rankMatch = rank.match(/\d+/);
    const rankNumber = rankMatch ? parseInt(rankMatch[0]) : 0;

    return {
      rank: rankNumber,
      name: name,
      location: location || '地点待确认',
      viewingSeason: viewingSeason || '时期待确认',
      detailUrl: detailLink ? `https://hanami.walkerplus.com${detailLink}` : '',
      sourceUrl: this.targetUrl,
      scrapedAt: new Date().toISOString(),
    };
  }

  /**
   * 主要抓取函数
   */
  async scrape() {
    console.log('🚀 开始抓取东京都花见会排行榜数据...');
    console.log(`📍 目标URL: ${this.targetUrl}`);

    const crawler = new PlaywrightCrawler({
      launchContext: {
        launchOptions: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
          ],
        },
      },
      maxRequestRetries: 2,
      requestHandlerTimeoutSecs: 60,
      maxConcurrency: 1,

      requestHandler: async ({ page, request, log }) => {
        log.info(`正在处理页面: ${request.url}`);

        try {
          // 等待页面完全加载
          await page.waitForLoadState('networkidle', { timeout: 30000 });
          await page.waitForTimeout(3000);

          // 获取页面HTML
          const html = await page.content();
          const $ = cheerio.load(html);

          log.info('开始解析花见会数据...');

          // 检查页面标题
          const pageTitle = $('title').text();
          log.info(`页面标题: ${pageTitle}`);

          if (!pageTitle.includes('花見') && !pageTitle.includes('桜')) {
            log.warn('⚠️ 页面不是花见相关内容');
            return;
          }

          // 多种选择器策略提取花见地点
          const selectors = [
            '.ranking_list .item',
            '.ranking-list .item',
            '.event-list .item',
            '.hanami-list .item',
            '.list-item',
            '.ranking-item',
            '.item',
            'li[class*="item"]',
            '.entry',
            'article',
          ];

          let foundData = false;

          for (const selector of selectors) {
            const items = $(selector);
            if (items.length > 0) {
              log.info(`找到 ${items.length} 个花见地点 (选择器: ${selector})`);

              items.each((index, element) => {
                const hanamiInfo = this.extractHanamiInfo($, element);
                if (hanamiInfo && hanamiInfo.name) {
                  this.results.push(hanamiInfo);
                  foundData = true;
                  log.info(`✅ 提取花见地点: ${hanamiInfo.name}`);
                }
              });

              if (foundData && this.results.length >= 5) break;
            }
          }

          // 如果结构化提取失败，尝试文本分析
          if (!foundData) {
            log.info('⚠️ 结构化提取失败，尝试文本分析...');

            const bodyText = $('body').text();
            const lines = bodyText.split('\n');

            lines.forEach((line, index) => {
              const trimmedLine = line.trim();
              if (trimmedLine.length > 10 && trimmedLine.length < 100) {
                const hasSakura = ['桜', '花見', '公園', '神社', '寺'].some(
                  keyword => trimmedLine.includes(keyword)
                );

                if (hasSakura) {
                  const hanamiInfo = {
                    rank: this.results.length + 1,
                    name: trimmedLine.substring(0, 50),
                    location: '地点待确认',
                    viewingSeason: '时期待确认',
                    detailUrl: '',
                    sourceUrl: this.targetUrl,
                    scrapedAt: new Date().toISOString(),
                  };

                  this.results.push(hanamiInfo);
                  foundData = true;

                  if (this.results.length <= 3) {
                    log.info(`📝 文本提取: ${hanamiInfo.name}`);
                  }
                }
              }
            });
          }

          log.info(`✅ 总共提取 ${this.results.length} 个花见地点`);
        } catch (error) {
          log.error(`❌ 抓取失败: ${error.message}`);
          throw error;
        }
      },

      failedRequestHandler: async ({ request, log }) => {
        log.error(`💥 请求失败: ${request.url}`);
      },
    });

    // 添加目标URL
    await crawler.addRequests([this.targetUrl]);

    // 启动抓取
    await crawler.run();

    console.log(`🎯 抓取完成，共获取 ${this.results.length} 个花见地点`);
    return this.results;
  }

  /**
   * 保存数据到统一花见数据库
   */
  async saveToDatabase() {
    console.log('💾 保存数据到统一花见数据库...');

    const regionData = {
      regionName: this.regionName,
      spots: this.results,
      sourceUrl: this.targetUrl,
      scrapedAt: new Date().toISOString(),
      technology: 'Playwright + Cheerio',
    };

    const success = this.dbManager.updateRegionData(
      this.regionCode,
      regionData
    );

    if (success) {
      console.log(`✅ 数据已保存到统一花见数据库`);
      console.log(`📊 地区: ${this.regionName} (${this.regionCode})`);
      console.log(`🌸 花见地点数: ${this.results.length}`);
      return true;
    } else {
      console.error('❌ 数据保存失败');
      return false;
    }
  }

  /**
   * 生成报告
   */
  generateReport() {
    console.log('\n📋 东京都花见会数据爬取报告');
    console.log('='.repeat(60));
    console.log(`🌸 目标地区: ${this.regionName} (${this.regionCode})`);
    console.log(`📍 数据来源: ${this.targetUrl}`);
    console.log(`⏰ 抓取时间: ${new Date().toLocaleString('zh-CN')}`);
    console.log(`🎯 总花见地点数: ${this.results.length}`);
    console.log(`🗄️ 数据库: 统一花见数据库 (data/hanami-database.json)`);
    console.log(`🏗️ 数据结构: 三层（地区→花见会→列表）`);

    if (this.results.length > 0) {
      console.log('\n🌸 花见地点列表:');
      this.results.forEach((spot, index) => {
        console.log(`${index + 1}. ${spot.name}`);
        console.log(`   📍 地点: ${spot.location}`);
        console.log(`   🌸 例年见顷: ${spot.viewingSeason}`);
        if (spot.rank) {
          console.log(`   🏆 排名: ${spot.rank}`);
        }
        console.log('');
      });
    }

    console.log('='.repeat(60));
  }

  /**
   * 运行完整流程
   */
  async run() {
    try {
      console.log('🌸 开始东京都花见会数据抓取流程...');

      // 1. 抓取数据
      await this.scrape();

      if (this.results.length === 0) {
        console.log('⚠️ 未获取到任何花见数据');
        return false;
      }

      // 2. 保存到数据库
      const saved = await this.saveToDatabase();

      if (!saved) {
        console.log('❌ 数据保存失败');
        return false;
      }

      // 3. 生成报告
      this.generateReport();

      // 4. 显示数据库统计
      const stats = this.dbManager.getStatistics();
      if (stats) {
        console.log('\n📊 数据库统计信息:');
        console.log(`总地区数: ${stats.totalRegions}`);
        console.log(`总花见地点数: ${stats.totalSpots}`);
        console.log(
          `最后更新: ${new Date(stats.lastUpdated).toLocaleString('zh-CN')}`
        );
      }

      console.log('\n✅ 东京都花见会数据抓取任务完成');
      return true;
    } catch (error) {
      console.error('❌ 抓取流程出错:', error.message);
      return false;
    }
  }
}

// 主函数
async function main() {
  const scraper = new Ar0313HanamiWalkerplusScraper();
  const success = await scraper.run();

  if (success) {
    console.log('🎉 任务成功完成');
  } else {
    console.log('💥 任务执行失败');
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(error => {
    console.error('💥 程序异常:', error);
    process.exit(1);
  });
}

module.exports = Ar0313HanamiWalkerplusScraper;
