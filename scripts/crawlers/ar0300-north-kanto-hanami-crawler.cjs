const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * AR0300北关东花见爬虫
 * 使用Playwright+Cheerio技术爬取关东地区数据，筛选北关东三县
 * 目标：https://hanami.walkerplus.com/ranking/ar0300/
 * 数据结构：三层（地区→花见会→列表）
 * 筛选范围：茨城县、栃木县、群马县
 */
class AR0300NorthKantoHanamiCrawler {
  constructor() {
    this.baseUrl = 'https://hanami.walkerplus.com/ranking/ar0300/';
    this.regionCode = 'ar0300';
    this.regionName = '北关东';
    this.activityType = 'hanami';
    this.level = '三層';
    this.results = [];

    // 北关东三县筛选条件
    this.northKantoPrefectures = ['茨城県', '栃木県', '群馬県'];

    console.log('🌸 AR0300北关东花见爬虫初始化');
    console.log(`📍 目标URL: ${this.baseUrl}`);
    console.log(`🎯 数据层级: ${this.level}`);
    console.log(`🔍 筛选范围: ${this.northKantoPrefectures.join('、')}`);
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
   * 提取地点信息并判断是否为北关东
   */
  extractLocationAndCheckNorthKanto(text) {
    if (!text)
      return { location: '未确认', isNorthKanto: false, prefecture: '' };

    // 检查是否包含北关东县名
    let prefecture = '';
    let isNorthKanto = false;

    for (const pref of this.northKantoPrefectures) {
      if (text.includes(pref)) {
        prefecture = pref;
        isNorthKanto = true;
        break;
      }
    }

    if (!isNorthKanto) {
      return { location: '未确认', isNorthKanto: false, prefecture: '' };
    }

    // 提取具体地点（市区町村）
    let location = text
      .replace(new RegExp(`^(${prefecture}[・・]?|県内[・・]?)`), '')
      .trim();

    const areaMatch = location.match(
      /([^・\s]+市|[^・\s]+区|[^・\s]+町|[^・\s]+村)/
    );
    if (areaMatch) {
      location = areaMatch[1];
    } else {
      // 如果没有找到具体区域，返回县名
      location = prefecture.replace('県', '');
    }

    return {
      location: location,
      isNorthKanto: true,
      prefecture: prefecture.replace('県', '县'),
    };
  }

  /**
   * 提取投票数据
   */
  extractVoteCount(text, type) {
    if (!text) return '0';

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

    // 提取名称
    let name = '';
    let subTitle = '';

    const nameSelectors = ['h2', 'h3', '.title', '.name', 'a[href*="detail"]'];

    for (const selector of nameSelectors) {
      const nameElement = $element.find(selector);
      if (nameElement.length > 0) {
        const candidateName = this.cleanText(nameElement.text());
        if (
          candidateName &&
          candidateName.length > 3 &&
          candidateName.includes('桜')
        ) {
          name = candidateName;
          break;
        }
      }
    }

    // 如果还是没有找到名称，从文本中提取
    if (!name) {
      const lines = fullText.split(/[\n]/);
      for (const line of lines) {
        const cleanLine = line.trim();
        if (
          cleanLine.includes('桜') &&
          cleanLine.length > 5 &&
          cleanLine.length < 100
        ) {
          name = cleanLine;
          break;
        }
      }
    }

    if (!name || name.length < 3) {
      return null;
    }

    // 清理名称
    name = name
      .replace(/例年の見頃：[^行]*/g, '')
      .replace(/行って[みよ]たい：\d+/g, '')
      .replace(/行ってよかった：\d+/g, '')
      .trim();

    // 检查地点并判断是否为北关东
    const locationInfo = this.extractLocationAndCheckNorthKanto(fullText);
    if (!locationInfo.isNorthKanto) {
      return null; // 不是北关东，跳过
    }

    // 提取详情链接
    const detailLink = $element.find('a[href*="detail"]').attr('href') || '';
    const fullDetailUrl = detailLink
      ? `https://hanami.walkerplus.com${detailLink}`
      : '';

    // 提取见樱时间
    const viewingSeason = this.extractViewingSeason(fullText);

    // 提取投票数据
    const wantToVisit = this.extractVoteCount(fullText, '行ってみたい');
    const haveVisited = this.extractVoteCount(fullText, '行ってよかった');

    // 提取副标题
    const subtitleSelectors = ['.comment', '.description', 'h3'];
    for (const selector of subtitleSelectors) {
      const subtitleElement = $element.find(selector);
      if (subtitleElement.length > 0) {
        const candidateSubtitle = this.cleanText(subtitleElement.text());
        if (
          candidateSubtitle &&
          candidateSubtitle !== name &&
          candidateSubtitle.length > 5 &&
          candidateSubtitle.length < 100 &&
          !candidateSubtitle.includes('行って')
        ) {
          subTitle = candidateSubtitle;
          break;
        }
      }
    }

    return {
      rank: rank,
      name: name,
      location: locationInfo.location,
      viewingSeason: viewingSeason,
      wantToVisit: wantToVisit,
      haveVisited: haveVisited,
      subTitle: subTitle || '',
      prefecture: locationInfo.prefecture,
      regionCode: this.regionCode,
      detailUrl: fullDetailUrl,
      scrapedAt: new Date().toISOString(),
      source: this.baseUrl,
    };
  }

  /**
   * 爬取多页数据
   */
  async crawlAllPages() {
    console.log('🚀 开始爬取AR0300关东地区花见数据（筛选北关东）...');

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
      let allSpots = [];
      let currentPage = 1;
      let hasNextPage = true;

      while (hasNextPage && currentPage <= 10) {
        // 最多爬取10页
        const pageUrl =
          currentPage === 1
            ? this.baseUrl
            : `${this.baseUrl}${currentPage}.html`;

        console.log(`📡 正在访问第${currentPage}页: ${pageUrl}`);

        await page.goto(pageUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 60000,
        });

        await page.waitForTimeout(2000);

        const html = await page.content();
        const $ = cheerio.load(html);

        // 查找排行榜项目
        const possibleSelectors = [
          '.ranking_list li',
          '.ranking_item',
          '.list_item',
          'li[class*="ranking"]',
        ];

        let $items = $();
        for (const selector of possibleSelectors) {
          $items = $(selector);
          if ($items.length > 0) {
            console.log(
              `✅ 第${currentPage}页使用选择器 "${selector}" 找到 ${$items.length} 个项目`
            );
            break;
          }
        }

        if ($items.length === 0) {
          console.log(`⚠️ 第${currentPage}页未找到排行榜项目`);
          break;
        }

        // 解析当前页数据
        let pageSpots = [];
        let rank = (currentPage - 1) * 10 + 1; // 假设每页10个项目

        $items.each((index, element) => {
          try {
            const spotInfo = this.extractSpotInfo($, element, rank);
            if (spotInfo) {
              pageSpots.push(spotInfo);
              console.log(
                `✅ 已提取北关东景点: ${rank}. ${spotInfo.name} - ${spotInfo.prefecture}${spotInfo.location}`
              );
              rank++;
            }
          } catch (error) {
            console.error(`❌ 解析第${rank}个项目时出错:`, error.message);
          }
        });

        allSpots = allSpots.concat(pageSpots);

        // 检查是否有下一页
        const nextPageLink = $('.pagination a')
          .filter(
            (i, el) => $(el).text().includes('次') || $(el).text().includes('>')
          )
          .first();
        hasNextPage = nextPageLink.length > 0;

        if (hasNextPage) {
          currentPage++;
          console.log(`🔄 继续爬取第${currentPage}页...`);
        } else {
          console.log('📄 已到达最后一页');
        }
      }

      // 重新排序（按北关东优先级排序）
      allSpots.forEach((spot, index) => {
        spot.rank = index + 1;
      });

      this.results = allSpots;
      console.log(`📊 总共成功提取了 ${allSpots.length} 个北关东花见景点`);

      return allSpots;
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
    const fileName = `ar0300-north-kanto-hanami-${timestamp}.json`;
    const outputDir = path.join(process.cwd(), 'data', 'walkerplus-crawled');
    const outputPath = path.join(outputDir, fileName);

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
        technology: 'Playwright + Cheerio (Multi-Page)',
        commercial: '真实数据，严禁编造',
        precision: '从关东地区数据中筛选北关东三县',
        quality: '仅包含茨城县、栃木县、群马县的真实花见地点数据',
        filterCriteria: this.northKantoPrefectures,
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
    console.log('\n🌸 ===== AR0300北关东花见爬取报告 =====');
    console.log(`📊 总景点数: ${data.length}`);
    console.log(`📂 保存路径: ${savedPath}`);
    console.log(`🌐 源网址: ${this.baseUrl}`);
    console.log(`⏰ 爬取时间: ${new Date().toLocaleString('zh-CN')}`);
    console.log(`🔧 技术栈: Playwright + Cheerio`);
    console.log(`🔍 筛选范围: ${this.northKantoPrefectures.join('、')}`);

    if (data.length > 0) {
      console.log('\n🏆 北关东TOP花见景点:');
      data.forEach((spot, index) => {
        console.log(`${index + 1}. ${spot.name}`);
        console.log(`   📍 地点: ${spot.prefecture}${spot.location}`);
        console.log(`   🌸 见顷时期: ${spot.viewingSeason}`);
        console.log(
          `   👥 想去: ${spot.wantToVisit}人, 去过: ${spot.haveVisited}人`
        );
        if (spot.subTitle) {
          console.log(`   💡 特色: ${spot.subTitle}`);
        }
        console.log('');
      });

      console.log('📍 北关东地区分布统计:');
      const prefectureStats = {};
      data.forEach(spot => {
        prefectureStats[spot.prefecture] =
          (prefectureStats[spot.prefecture] || 0) + 1;
      });

      Object.entries(prefectureStats)
        .sort(([, a], [, b]) => b - a)
        .forEach(([prefecture, count]) => {
          console.log(`   ${prefecture}: ${count}个景点`);
        });
    }

    console.log('\n✅ 北关东花见数据爬取完成！');
  }
}

// 主函数
async function main() {
  const crawler = new AR0300NorthKantoHanamiCrawler();

  try {
    // 爬取数据
    const data = await crawler.crawlAllPages();

    if (data.length === 0) {
      console.log('⚠️ 未获取到任何北关东数据，请检查网站结构或筛选条件');
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

module.exports = AR0300NorthKantoHanamiCrawler;
