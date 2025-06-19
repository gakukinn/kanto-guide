const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * AR0310群马县花见单页爬虫
 * 使用Playwright+Cheerio技术爬取第一页数据
 * 目标：https://hanami.walkerplus.com/ranking/ar0310/
 * 数据结构：三层（地区→花见会→列表）
 */
class AR0310HanamiSinglePageCrawler {
  constructor() {
    this.baseUrl = 'https://hanami.walkerplus.com/ranking/ar0310/';
    this.regionCode = 'ar0310';
    this.regionName = '群马县';
    this.activityType = 'hanami';
    this.level = '三層';
    this.results = [];

    console.log('🌸 AR0310群马县花见单页爬虫初始化');
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
    if (!text) return '';

    // 匹配常见的日期格式
    const seasonPatterns = [
      /例年見頃[：:]?\s*([^。\n\r]+)/,
      /見頃[：:]?\s*([^。\n\r]+)/,
      /(\d+月[上中下旬～\d月]*)/,
      /(春|[3-5]月)/,
    ];

    for (const pattern of seasonPatterns) {
      const match = text.match(pattern);
      if (match) {
        return this.cleanText(match[1] || match[0]);
      }
    }

    return '';
  }

  /**
   * 提取地点信息，优化群马县地名处理
   */
  extractLocation(text) {
    if (!text) return '';

    // 群马县特有的地名模式
    const locationPatterns = [
      // 群馬県・市名
      /群馬県[・･]?([^・･\s]+)/,
      // 直接的市名（群马县内）
      /([^・･\s]*市|[^・･\s]*町|[^・･\s]*村)/,
      // 其他格式
      /([^。\n\r，,]+)/,
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) {
        let location = this.cleanText(match[1] || match[0]);
        // 确保包含群马县信息
        if (!location.includes('群馬') && !location.includes('県')) {
          location = `群馬県・${location}`;
        }
        return location;
      }
    }

    return this.cleanText(text);
  }

  /**
   * 提取排名
   */
  extractRank(text) {
    if (!text) return 0;
    const rankMatch = text.match(/(\d+)/);
    return rankMatch ? parseInt(rankMatch[1]) : 0;
  }

  /**
   * 提取投票数据
   */
  extractVoteData(text) {
    const result = { wantToVisit: 0, haveVisited: 0 };

    if (!text) return result;

    // 匹配"行きたい"和"行った"的数字
    const wantMatch = text.match(/行きたい[^\d]*(\d+)/);
    const visitedMatch = text.match(/行った[^\d]*(\d+)/);

    if (wantMatch) result.wantToVisit = parseInt(wantMatch[1]);
    if (visitedMatch) result.haveVisited = parseInt(visitedMatch[1]);

    return result;
  }

  /**
   * 提取景点名称，分离主要名称和描述
   */
  extractSpotName(nameText) {
    if (!nameText) return { name: '', subTitle: '' };

    const cleanName = this.cleanText(nameText);

    // 分离主要名称和描述性文字
    const patterns = [
      // 括号内的描述
      /^([^（(]+)[（(]([^）)]+)[）)]/,
      // 换行分隔
      /^([^\n\r]+)[\n\r]+(.+)/,
      // 其他分隔符
      /^([^・]+)[・](.+)/,
    ];

    for (const pattern of patterns) {
      const match = cleanName.match(pattern);
      if (match) {
        return {
          name: this.cleanText(match[1]),
          subTitle: this.cleanText(match[2]),
        };
      }
    }

    return { name: cleanName, subTitle: '' };
  }

  /**
   * 解析单个花见景点数据
   */
  parseSpotData($, element, index) {
    try {
      const $element = $(element);

      // 提取排名
      const rankText = $element
        .find('.number, .rank, .ranking-number')
        .first()
        .text();
      const rank = this.extractRank(rankText) || index + 1;

      // 提取景点名称
      const nameElement = $element
        .find('h3, .spot-name, .title, a[href*="/detail/"]')
        .first();
      const nameText = nameElement.text();
      const { name, subTitle } = this.extractSpotName(nameText);

      // 提取详情链接
      const detailLink =
        nameElement.find('a').attr('href') ||
        $element.find('a[href*="/detail/"]').attr('href') ||
        '';
      const detailUrl = detailLink.startsWith('http')
        ? detailLink
        : detailLink
          ? `https://hanami.walkerplus.com${detailLink}`
          : '';

      // 提取地点信息
      const locationElement = $element
        .find('.area, .location, .address')
        .first();
      const locationText = locationElement.text();
      const location = this.extractLocation(locationText);

      // 提取见顷时期
      const seasonElement = $element.find('.season, .period, .time').first();
      const seasonText = seasonElement.text() || $element.text();
      const viewingSeason = this.extractViewingSeason(seasonText);

      // 提取投票数据
      const voteElement = $element.find('.vote, .count, .number');
      const voteText = voteElement.text() || $element.text();
      const voteData = this.extractVoteData(voteText);

      // 构建结果对象
      const spotData = {
        rank: rank,
        name: name,
        location: location,
        viewingSeason: viewingSeason,
        wantToVisit: voteData.wantToVisit,
        haveVisited: voteData.haveVisited,
        subTitle: subTitle,
        prefecture: '群馬県',
        regionCode: this.regionCode,
        detailUrl: detailUrl,
      };

      console.log(`✅ 解析景点 ${rank}: ${name} (${location})`);
      return spotData;
    } catch (error) {
      console.error(`❌ 解析景点数据时出错:`, error.message);
      return null;
    }
  }

  /**
   * 爬取单页数据
   */
  async crawlSinglePage() {
    let browser = null;
    try {
      console.log('\n🚀 开始爬取AR0310群马县花见数据...');

      // 启动浏览器
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const context = await browser.newContext({
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      });
      const page = await context.newPage();

      // 导航到目标页面
      console.log(`📡 访问页面: ${this.baseUrl}`);
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // 等待页面加载
      await page.waitForTimeout(3000);

      // 获取页面HTML
      const html = await page.content();
      console.log(`📄 页面HTML长度: ${html.length}`);

      // 使用Cheerio解析
      const $ = cheerio.load(html);

      // 查找花见景点列表
      const selectors = [
        'li[class*="ranking"]',
        '.ranking-item',
        '.spot-item',
        '.list-item',
        'article',
        '.item',
      ];

      let spots = $();
      for (const selector of selectors) {
        spots = $(selector);
        if (spots.length > 0) {
          console.log(`🎯 找到选择器: ${selector}, 数量: ${spots.length}`);
          break;
        }
      }

      if (spots.length === 0) {
        console.log('⚠️ 未找到预期的景点列表，尝试通用解析...');
        // 备用解析逻辑
        spots = $('li, article, .item').filter((i, el) => {
          const text = $(el).text();
          return (
            text.includes('見頃') ||
            text.includes('桜') ||
            text.includes('花見')
          );
        });
      }

      console.log(`📊 共找到 ${spots.length} 个潜在景点`);

      // 解析每个景点
      const results = [];
      spots.each((index, element) => {
        if (index >= 10) return false; // 只取前10个

        const spotData = this.parseSpotData($, element, index);
        if (spotData && spotData.name) {
          results.push(spotData);
        }
      });

      console.log(`✅ 成功解析 ${results.length} 个群马县花见景点`);
      this.results = results;

      return results;
    } catch (error) {
      console.error('❌ 爬取过程中出错:', error.message);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  /**
   * 保存数据到文件
   */
  async saveData() {
    try {
      // 确保输出目录存在
      const outputDir = path.join(process.cwd(), 'data', 'walkerplus-crawled');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 生成文件名
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `ar0310-hanami-single-page-${timestamp}.json`;
      const filepath = path.join(outputDir, filename);

      // 构建数据结构
      const output = {
        metadata: {
          regionCode: this.regionCode,
          regionName: this.regionName,
          activityType: this.activityType,
          level: this.level,
          sourceUrl: this.baseUrl,
          crawlTime: new Date().toISOString(),
          totalCount: this.results.length,
          dataStructure: '三层（地区→花见会→列表）',
        },
        data: this.results,
      };

      // 保存文件
      fs.writeFileSync(filepath, JSON.stringify(output, null, 2), 'utf8');

      console.log(`💾 数据已保存到: ${filepath}`);
      console.log(
        `📊 文件大小: ${(fs.statSync(filepath).size / 1024).toFixed(2)}KB`
      );

      return filepath;
    } catch (error) {
      console.error('❌ 保存数据时出错:', error.message);
      throw error;
    }
  }

  /**
   * 生成结果报告
   */
  generateReport() {
    console.log('\n🌸 === AR0310群马县花见爬取报告 ===');
    console.log(`📍 目标URL: ${this.baseUrl}`);
    console.log(`🎯 数据层级: ${this.level}`);
    console.log(`📊 爬取数量: ${this.results.length} 个景点`);

    if (this.results.length > 0) {
      console.log('\n🏆 TOP 5 群马县花见景点:');
      this.results.slice(0, 5).forEach((spot, index) => {
        console.log(`${index + 1}. ${spot.name} (${spot.location})`);
        console.log(`   见顷时期: ${spot.viewingSeason}`);
        console.log(
          `   想去: ${spot.wantToVisit}人 | 去过: ${spot.haveVisited}人`
        );
        if (spot.subTitle) console.log(`   特色: ${spot.subTitle}`);
        console.log('');
      });
    }

    console.log('✅ AR0310群马县花见数据爬取完成！');
  }

  /**
   * 执行完整的爬取流程
   */
  async run() {
    try {
      await this.crawlSinglePage();
      await this.saveData();
      this.generateReport();
    } catch (error) {
      console.error('❌ 爬取流程失败:', error.message);
      throw error;
    }
  }
}

// 执行爬虫
(async () => {
  const crawler = new AR0310HanamiSinglePageCrawler();
  await crawler.run();
})();
