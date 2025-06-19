const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * Jalan.net 文化艺术活动爬虫
 * 目标：爬取非五大活动类型的文化艺术活动数据
 */
class JalanCultureActivitiesCrawler {
  constructor() {
    this.targetUrl = 'https://www.jalan.net/event/130000/?screenId=OUW1211';
    this.browser = null;
    this.page = null;
    this.outputPath = path.join(
      __dirname,
      '../../data/tokyo-culture-activities.json'
    );

    // 五大活动类型关键词（需要排除的）
    this.excludeKeywords = [
      '花火',
      '祭',
      '祭り',
      '桜',
      '花見',
      '紅葉',
      'もみじ',
      'イルミネーション',
      '夜景',
      '灯り',
      'ライトアップ',
      '花火大会',
      'hanabi',
      'matsuri',
    ];

    // 文化艺术活动关键词（优先选择的）
    this.cultureKeywords = [
      '美術館',
      '博物館',
      '展覧会',
      '展示',
      'アート',
      '芸術',
      '文化',
      '音楽',
      'コンサート',
      '演劇',
      '舞台',
      '映画',
      '写真',
      'デザイン',
      '工芸',
      '伝統',
      '歴史',
      'ギャラリー',
      'フェスティバル',
      '体験',
    ];
  }

  async initialize() {
    console.log('🚀 初始化浏览器...');
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // 创建带用户代理的浏览器上下文
    const context = await this.browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
    });

    this.page = await context.newPage();
  }

  async navigateToTarget() {
    console.log('📍 导航到目标页面...');
    try {
      await this.page.goto(this.targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      console.log('✅ 页面加载完成');

      // 等待内容加载 - 等待页面主要内容加载
      await this.page.waitForSelector('h1', { timeout: 15000 });
      console.log('✅ 页面主要内容加载完成');
    } catch (error) {
      console.error('❌ 页面导航失败:', error.message);
      throw error;
    }
  }

  async extractActivities() {
    console.log('🔍 开始提取活动数据...');

    const htmlContent = await this.page.content();
    const $ = cheerio.load(htmlContent);

    const activities = [];
    const processedActivities = new Set(); // 防重复

    console.log('📄 开始分析活动列表...');

    // 查找活动列表 - 基于浏览器快照的实际结构
    // 从快照可以看到活动在 list[ref="e160"] 下的 listitem 中
    const listItems = $('li, listitem').filter((i, el) => {
      const $el = $(el);
      // 查找包含活动链接的项目
      return $el.find('a').length > 0 || $el.find('link').length > 0;
    });

    console.log(`找到 ${listItems.length} 个活动项目`);

    // 查找活动项
    listItems.each((index, element) => {
      try {
        const $item = $(element);

        // Debug: 查看前几个元素的HTML结构
        if (index < 3) {
          console.log(`\n=== 活动项 ${index + 1} 结构 ===`);
          console.log($item.html().substring(0, 200));
        }

        // 提取基本信息 - 基于快照看到的实际结构
        // 从快照看到活动名称在 paragraph 中的 link 元素内
        const linkElement = $item.find('paragraph link').first();
        let name = linkElement.text().trim();
        let detailUrl = linkElement.attr('href') || '';

        // 如果没找到，尝试其他选择器
        if (!name) {
          const aElement = $item.find('a').first();
          name = aElement.text().trim();
          detailUrl = aElement.attr('href') || '';
        }

        if (index < 3) {
          console.log(`活动名称: "${name}"`);
          console.log(`详情链接: "${detailUrl}"`);
        }

        if (!name || name.length < 3 || processedActivities.has(name)) return;

        // 检查是否为文化艺术活动
        if (!this.isCultureActivity(name)) return;

        // 提取日期信息 - 基于快照结构查找期间信息
        let dateText = '';
        $item.find('definition').each((i, def) => {
          const prev = $(def).prev();
          if (prev.text().includes('期間')) {
            dateText = $(def).text().trim();
          }
        });
        const { startDate, endDate } = this.parseDateRange(dateText);

        // 提取地点信息 - 查找场所信息
        let locationText = '';
        $item.find('definition').each((i, def) => {
          const prev = $(def).prev();
          if (prev.text().includes('場所')) {
            locationText = $(def).text().trim();
          }
        });
        const { prefecture, city, venue } = this.parseLocation(locationText);

        // 提取图片 - 第一个图片元素
        const imageElement = $item.find('img').first();
        const image = imageElement.attr('src') || '';

        // 提取描述 - 最后一个段落通常是描述
        const description = $item.find('paragraph').last().text().trim();

        // 提取标签
        const tags = [];
        $item.find('.eventTag .tag').each((i, tagEl) => {
          tags.push($(tagEl).text().trim());
        });

        const activity = {
          id: `tokyo-culture-${Date.now()}-${index}`,
          name,
          category: 'culture-art',
          subcategory: this.determineSubcategory(name, description, tags),
          startDate,
          endDate,
          prefecture: prefecture || '東京都',
          city,
          venue,
          fullLocation: locationText,
          description,
          image: image
            ? image.startsWith('http')
              ? image
              : `https:${image}`
            : '',
          detailUrl: detailUrl
            ? detailUrl.startsWith('http')
              ? detailUrl
              : `https://www.jalan.net${detailUrl}`
            : '',
          tags,
          source: 'jalan.net',
          crawledAt: new Date().toISOString(),
          status: 'active',
        };

        activities.push(activity);
        processedActivities.add(name);

        console.log(`✅ 提取活动: ${name}`);

        // 限制获取数量
        if (activities.length >= 5) return false;
      } catch (error) {
        console.error('❌ 提取活动数据时出错:', error.message);
      }
    });

    console.log(`🎯 成功提取 ${activities.length} 个文化艺术活动`);
    return activities;
  }

  isCultureActivity(name) {
    // 排除五大活动类型
    const isExcluded = this.excludeKeywords.some(keyword =>
      name.includes(keyword)
    );

    if (isExcluded) return false;

    // 优先选择文化艺术相关活动
    const isCulture = this.cultureKeywords.some(keyword =>
      name.includes(keyword)
    );

    return isCulture;
  }

  determineSubcategory(name, description, tags) {
    const text = `${name} ${description} ${tags.join(' ')}`;

    if (
      text.includes('美術館') ||
      text.includes('アート') ||
      text.includes('芸術')
    )
      return 'art-exhibition';
    if (text.includes('博物館') || text.includes('歴史')) return 'museum';
    if (text.includes('音楽') || text.includes('コンサート')) return 'music';
    if (text.includes('演劇') || text.includes('舞台')) return 'theater';
    if (text.includes('映画')) return 'film';
    if (text.includes('デザイン')) return 'design';
    if (text.includes('工芸') || text.includes('伝統'))
      return 'traditional-craft';
    if (text.includes('体験')) return 'experience';

    return 'other-culture';
  }

  parseDateRange(dateText) {
    try {
      // 处理日期格式：2025年1月25日～2025年3月30日
      const dateMatch = dateText.match(
        /(\d{4})年(\d{1,2})月(\d{1,2})日(?:～(\d{4})年(\d{1,2})月(\d{1,2})日)?/
      );

      if (dateMatch) {
        const [, startYear, startMonth, startDay, endYear, endMonth, endDay] =
          dateMatch;
        const startDate = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`;
        const endDate = endYear
          ? `${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}`
          : startDate;

        return { startDate, endDate };
      }
    } catch (error) {
      console.warn('日期解析失败:', dateText, error.message);
    }

    return { startDate: '', endDate: '' };
  }

  parseLocation(locationText) {
    try {
      // 解析地点：東京都新宿区 SOMPO美術館
      const parts = locationText.split(/\s+/);
      let prefecture = '';
      let city = '';
      let venue = '';

      if (parts.length > 0) {
        const firstPart = parts[0];
        if (
          firstPart.includes('都') ||
          firstPart.includes('県') ||
          firstPart.includes('府')
        ) {
          prefecture = firstPart.match(/(.+?[都県府])/)?.[1] || '';
          const remaining = firstPart.replace(prefecture, '');
          if (remaining.includes('区') || remaining.includes('市')) {
            city = remaining;
          }
        }

        if (parts.length > 1) {
          venue = parts.slice(1).join(' ');
        }
      }

      return { prefecture, city, venue };
    } catch (error) {
      console.warn('地点解析失败:', locationText, error.message);
      return { prefecture: '', city: '', venue: locationText };
    }
  }

  async saveData(activities) {
    console.log('💾 保存数据...');

    // 确保目录存在
    const dataDir = path.dirname(this.outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 读取现有数据
    let existingData = [];
    if (fs.existsSync(this.outputPath)) {
      try {
        const fileContent = fs.readFileSync(this.outputPath, 'utf8');
        existingData = JSON.parse(fileContent);
      } catch (error) {
        console.warn('读取现有数据失败，将创建新文件');
        existingData = [];
      }
    }

    // 合并数据（避免重复）
    const existingNames = new Set(existingData.map(item => item.name));
    const newActivities = activities.filter(
      activity => !existingNames.has(activity.name)
    );

    const finalData = [...existingData, ...newActivities];

    // 保存到文件
    fs.writeFileSync(
      this.outputPath,
      JSON.stringify(finalData, null, 2),
      'utf8'
    );

    console.log(`✅ 数据已保存到: ${this.outputPath}`);
    console.log(`📊 新增活动: ${newActivities.length} 个`);
    console.log(`📊 总活动数: ${finalData.length} 个`);

    return { newCount: newActivities.length, totalCount: finalData.length };
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 浏览器已关闭');
    }
  }

  async run() {
    try {
      await this.initialize();
      await this.navigateToTarget();
      const activities = await this.extractActivities();

      if (activities.length === 0) {
        console.log('⚠️  未找到符合条件的文化艺术活动');
        return;
      }

      const result = await this.saveData(activities);

      console.log('\n🎉 爬取完成！');
      console.log('活动详情:');
      activities.forEach((activity, index) => {
        console.log(`${index + 1}. ${activity.name}`);
        console.log(`   分类: ${activity.subcategory}`);
        console.log(`   日期: ${activity.startDate} ~ ${activity.endDate}`);
        console.log(`   地点: ${activity.fullLocation}`);
        console.log('');
      });

      return result;
    } catch (error) {
      console.error('❌ 爬取过程中出现错误:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 主执行函数
async function main() {
  const crawler = new JalanCultureActivitiesCrawler();
  try {
    await crawler.run();
  } catch (error) {
    console.error('❌ 爬虫执行失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  main();
}

module.exports = JalanCultureActivitiesCrawler;
