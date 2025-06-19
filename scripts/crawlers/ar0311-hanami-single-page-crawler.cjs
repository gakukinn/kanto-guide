const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * AR0311埼玉县花见单页爬虫
 * 使用Playwright+Cheerio技术爬取第一页数据
 * 目标：https://hanami.walkerplus.com/ranking/ar0311/
 * 数据结构：三层（地区→花见会→列表）
 */
class AR0311HanamiSinglePageCrawler {
  constructor() {
    this.baseUrl = 'https://hanami.walkerplus.com/ranking/ar0311/';
    this.regionCode = 'ar0311';
    this.regionName = '埼玉县';
    this.activityType = 'hanami';
    this.level = '三層';
    this.results = [];

    console.log('🌸 AR0311埼玉县花见单页爬虫初始化');
    console.log(`📍 目标URL: ${this.baseUrl}`);
    console.log(`🎯 数据层级: ${this.level}`);
  }

  /**
   * 清理文本内容
   */
  cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * 提取例年见顷（往年见樱时间）
   */
  extractViewingSeason(text) {
    if (!text) return '見頃時期未確認';

    const seasonPatterns = [
      /(\d{1,2}月[上中下]旬～\d{1,2}月[上中下]旬)/g, // 3月下旬～4月上旬
      /(\d{1,2}月[上中下]旬)/g, // 4月上旬
      /(\d{1,2}月中旬～\d{1,2}月[上中下]旬)/g, // 2月中旬～4月上旬
      /(\d{1,2}月～\d{1,2}月)/g, // 3月～4月
    ];

    for (const pattern of seasonPatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }

    return '見頃時期未確認';
  }

  /**
   * 提取地点信息
   */
  extractLocation(text) {
    if (!text) return '埼玉県内';

    // 移除常见前缀
    let location = text.replace(/^(埼玉県[・・]?|県内[・・]?)/g, '').trim();

    // 提取区域信息（如：埼玉県・さいたま市等）
    const areaMatch = location.match(
      /([^・\s]+市|[^・\s]+区|[^・\s]+町|[^・\s]+村)/
    );
    if (areaMatch) {
      return areaMatch[1];
    }

    // 如果没有找到具体区域，查找包含地名关键词的部分
    const locationKeywords = ['市', '区', '町', '村'];
    const parts = text.split(/[・、\s]/);
    for (const part of parts) {
      if (locationKeywords.some(keyword => part.includes(keyword))) {
        return part.trim();
      }
    }

    return '埼玉県内';
  }

  /**
   * 提取投票数据
   */
  extractVoteCount(text, type) {
    if (!text) return '0';

    // 查找"行ってみたい"或"行ってよかった"后面的数字
    const patterns = [
      new RegExp(`${type}[：:]?\\s*(\\d+)`, 'g'),
      new RegExp(`${type}.*?(\\d+)`, 'g'),
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const numberMatch = match[0].match(/(\d+)/);
        if (numberMatch) {
          return numberMatch[1];
        }
      }
    }

    return '0';
  }

  /**
   * 从HTML元素中提取花见景点信息
   */
  extractSpotInfo($, element, rank) {
    const $element = $(element);
    const fullText = this.cleanText($element.text());

    // 提取名称 - 尝试多个选择器
    let name = '';
    let subTitle = '';

    const nameSelectors = [
      'h3 a',
      'h2 a',
      '.title a',
      '.name a',
      'a[href*="detail"]',
      '.spot_name a',
    ];

    for (const selector of nameSelectors) {
      const nameElement = $element.find(selector);
      if (nameElement.length > 0) {
        const candidateName = this.cleanText(nameElement.text());
        if (
          candidateName &&
          candidateName.length > 3 &&
          !candidateName.includes('特集') &&
          !candidateName.includes('ランキング')
        ) {
          name = candidateName;
          break;
        }
      }
    }

    // 如果还是没有找到名称，从文本中提取包含"桜"的行
    if (!name) {
      const lines = fullText.split(/[\n・]/);
      for (const line of lines) {
        const cleanLine = line.trim();
        if (
          cleanLine.includes('桜') &&
          cleanLine.length > 5 &&
          cleanLine.length < 50
        ) {
          name = cleanLine;
          break;
        }
      }
    }

    // 清理名称，分离主要名称和描述
    if (name) {
      // 如果名称包含描述性文本，尝试分离
      const parts = name.split(/\s+/);
      if (parts.length > 1) {
        // 寻找包含"桜"的部分作为主名称
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].includes('桜')) {
            name = parts.slice(0, i + 1).join(' ');
            subTitle = parts.slice(i + 1).join(' ');
            break;
          }
        }
      }

      // 进一步清理：移除地区和时间信息
      name = name
        .replace(/埼玉県[・・]?/g, '')
        .replace(/例年の見頃：[^行]*/g, '')
        .replace(/行って[みよ]たい：\d+/g, '')
        .replace(/行ってよかった：\d+/g, '')
        .trim();

      // 如果名称太长，截取前面部分
      if (name.length > 50) {
        const shortName = name.substring(0, 50);
        const lastSpace = shortName.lastIndexOf(' ');
        name = lastSpace > 0 ? shortName.substring(0, lastSpace) : shortName;
      }
    }

    if (!name || name.length < 3) {
      return null; // 跳过无效数据
    }

    // 提取详情链接
    const detailLink = $element.find('a[href*="detail"]').attr('href') || '';
    const fullDetailUrl = detailLink
      ? `https://hanami.walkerplus.com${detailLink}`
      : '';

    // 提取地点
    const locationSelectors = ['.area', '.location', '.address', '.place'];
    let locationText = '';
    for (const selector of locationSelectors) {
      const locationElement = $element.find(selector);
      if (locationElement.length > 0) {
        locationText = this.cleanText(locationElement.text());
        if (locationText) break;
      }
    }

    // 如果没找到专门的地点元素，从全文中提取
    if (!locationText) {
      locationText = fullText;
    }

    const location = this.extractLocation(locationText);

    // 提取见樱时间
    const viewingSeason = this.extractViewingSeason(fullText);

    // 提取投票数据
    const wantToVisit = this.extractVoteCount(fullText, '行ってみたい');
    const haveVisited = this.extractVoteCount(fullText, '行ってよかった');

    // 如果没有从名称中提取到副标题，尝试其他方式
    if (!subTitle) {
      const descriptionSelectors = ['.comment', '.description', '.subtitle'];
      for (const selector of descriptionSelectors) {
        const descElement = $element.find(selector);
        if (descElement.length > 0) {
          subTitle = this.cleanText(descElement.text());
          if (subTitle && subTitle.length > 5) break;
        }
      }

      // 从全文中提取描述性文字
      if (!subTitle) {
        const textParts = fullText.split(/行って[みよ]たい/)[0]; // 取投票信息之前的部分
        const sentences = textParts.split(/[。・]/);
        for (const sentence of sentences) {
          const clean = sentence.trim();
          if (
            clean.length > 10 &&
            clean.length < 100 &&
            !clean.includes('桜') &&
            !clean.includes('埼玉県') &&
            !clean.includes('例年') &&
            !clean.includes('月')
          ) {
            subTitle = clean;
            break;
          }
        }
      }
    }

    return {
      rank: rank,
      name: name,
      location: location,
      viewingSeason: viewingSeason,
      wantToVisit: wantToVisit,
      haveVisited: haveVisited,
      subTitle: subTitle || '',
      prefecture: this.regionName,
      regionCode: this.regionCode,
      detailUrl: fullDetailUrl,
      scrapedAt: new Date().toISOString(),
      source: this.baseUrl,
    };
  }

  /**
   * 主要爬取函数
   */
  async crawlSinglePage() {
    console.log('🚀 开始爬取AR0311埼玉县花见排行榜第一页数据...');

    const browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });

    try {
      const page = await browser.newPage();

      console.log('📡 正在访问目标页面...');
      await page.goto(this.baseUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      console.log('⏳ 等待页面完全加载...');
      await page.waitForTimeout(3000);

      // 获取页面HTML
      const html = await page.content();
      const $ = cheerio.load(html);

      console.log('🔍 开始解析页面内容...');

      // 尝试多种可能的选择器来找到排行榜项目
      const possibleSelectors = [
        '.ranking_list .ranking_item',
        '.ranking_list li',
        '.ranking_item',
        '.list_item',
        '.spot_item',
        'li[class*="ranking"]',
        'div[class*="ranking"]',
      ];

      let $items = $();
      let usedSelector = '';

      for (const selector of possibleSelectors) {
        $items = $(selector);
        if ($items.length > 0) {
          usedSelector = selector;
          console.log(
            `✅ 使用选择器 "${selector}" 找到 ${$items.length} 个项目`
          );
          break;
        }
      }

      if ($items.length === 0) {
        console.log('⚠️ 未找到排行榜项目，尝试查看页面结构...');

        // 保存HTML用于调试
        const debugPath = path.join(
          process.cwd(),
          'debug-output',
          'ar0311-hanami-debug.html'
        );
        fs.writeFileSync(debugPath, html, 'utf8');
        console.log(`🔧 页面HTML已保存到: ${debugPath}`);

        return [];
      }

      // 解析每个项目
      const spots = [];
      let rank = 1;

      $items.each((index, element) => {
        try {
          const spotInfo = this.extractSpotInfo($, element, rank);
          if (spotInfo) {
            spots.push(spotInfo);
            console.log(
              `✅ 已提取: ${rank}. ${spotInfo.name} - ${spotInfo.location}`
            );
            rank++;
          }
        } catch (error) {
          console.error(`❌ 解析第${rank}个项目时出错:`, error.message);
        }
      });

      this.results = spots;
      console.log(`📊 总共成功提取了 ${spots.length} 个花见景点`);

      return spots;
    } catch (error) {
      console.error('❌ 爬取过程出现错误:', error.message);
      throw error;
    } finally {
      await browser.close();
    }
  }

  /**
   * 保存数据到文件
   */
  async saveData(data) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `ar0311-hanami-single-page-${timestamp}.json`;
    const outputDir = path.join(process.cwd(), 'data', 'walkerplus-crawled');
    const outputPath = path.join(outputDir, fileName);

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputData = {
      metadata: {
        regionCode: this.regionCode,
        regionName: this.regionName,
        activityType: this.activityType,
        level: this.level,
        sourceUrl: this.baseUrl,
        scrapedAt: new Date().toISOString(),
        totalResults: data.length,
        technology: 'Playwright + Cheerio (Single Page)',
        commercial: '真实数据，严禁编造',
        precision: '基于页面HTML结构精确提取',
        quality: '仅包含真实花见地点数据，排除所有无关内容',
      },
      data: data,
    };

    try {
      fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf8');
      console.log(`💾 数据已保存到: ${outputPath}`);
      console.log(
        `📁 文件大小: ${(fs.statSync(outputPath).size / 1024).toFixed(2)}KB`
      );
      return outputPath;
    } catch (error) {
      console.error('❌ 保存文件失败:', error.message);
      throw error;
    }
  }

  /**
   * 生成汇总报告
   */
  generateReport(data, savedPath) {
    console.log('\n🌸 ===== AR0311埼玉县花见爬取报告 =====');
    console.log(`📊 总景点数: ${data.length}`);
    console.log(`📂 保存路径: ${savedPath}`);
    console.log(`🌐 源网址: ${this.baseUrl}`);
    console.log(`⏰ 爬取时间: ${new Date().toLocaleString('zh-CN')}`);
    console.log(`🔧 技术栈: Playwright + Cheerio`);

    if (data.length > 0) {
      console.log('\n🏆 前5名花见景点:');
      data.slice(0, 5).forEach((spot, index) => {
        console.log(`${index + 1}. ${spot.name}`);
        console.log(`   📍 地点: ${spot.location}`);
        console.log(`   🌸 见顷时期: ${spot.viewingSeason}`);
        console.log(
          `   👥 想去: ${spot.wantToVisit}人, 去过: ${spot.haveVisited}人`
        );
        console.log('');
      });

      console.log('📍 地区分布统计:');
      const locationStats = {};
      data.forEach(spot => {
        locationStats[spot.location] = (locationStats[spot.location] || 0) + 1;
      });

      Object.entries(locationStats)
        .sort(([, a], [, b]) => b - a)
        .forEach(([location, count]) => {
          console.log(`   ${location}: ${count}个景点`);
        });
    }

    console.log('\n✅ 数据爬取完成！');
  }
}

// 主函数
async function main() {
  const crawler = new AR0311HanamiSinglePageCrawler();

  try {
    // 爬取数据
    const data = await crawler.crawlSinglePage();

    if (data.length === 0) {
      console.log('⚠️  未获取到任何数据，请检查网站结构或网络连接');
      return;
    }

    // 保存数据
    const savedPath = await crawler.saveData(data);

    // 生成报告
    crawler.generateReport(data, savedPath);
  } catch (error) {
    console.error('❌ 爬取过程出现错误:', error.message);
    console.error('错误详情:', error.stack);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = AR0311HanamiSinglePageCrawler;
