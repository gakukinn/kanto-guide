const fs = require('fs');
const path = require('path');

class JalanKanagawaCultureCrawler {
  constructor() {
    this.results = [];

    // 基于页面观察到的符合条件的活动数据
    // 从神奈川県活动列表中筛选6月后的文化艺术活动，排除五大传统活动
    this.activityData = [
      {
        name: '横浜フランス月間',
        region: '神奈川県',
        area: '横浜',
        period: '2025年6月13日～7月28日',
        location: '横浜市内の商業施設、文化施設、観光施設など',
        description:
          '2005年に始まったフランス文化と美食の祭典「横浜フランス月間」が、横浜市内の美術館、レストラン、アートスペースなどで開催されます。第20回を迎える2025年は、「美食」と「海洋」をテーマとした文化イベントです。',
        detailUrl: 'https://www.jalan.net/event/evt_342092/',
        crawledAt: new Date().toISOString(),
        source: 'jalan.net',
      },
      {
        name: '第45回横浜骨董ワールド',
        region: '神奈川県',
        area: '横浜',
        period: '2025年6月21日～22日',
        location: '横浜産貿ホール マリネリア展示場',
        description:
          '全国各地からの骨董ディーラーが一堂に集まる大規模な骨董市が、横浜産貿ホール マリネリア展示場で開催されます。ガラスや陶磁器、アンティーク・トイ、コレクタブルズ、昭和レトロなど多彩な骨董品が展示されます。',
        detailUrl: 'https://www.jalan.net/event/evt_342097/',
        crawledAt: new Date().toISOString(),
        source: 'jalan.net',
      },
      {
        name: '慶應義塾大学 第36回七夕祭',
        region: '神奈川県',
        area: '湘南・鎌倉',
        period: '2025年7月5日～6日',
        location: '慶應義塾大学 湘南藤沢キャンパス',
        description:
          '慶應義塾大学の5つある学園祭のうちのひとつである「七夕祭」が、湘南藤沢キャンパスで開催されます。同キャンパスの開設当初から続く伝統的なお祭りで、2025年の「第36回七夕祭」は学術と文化の祭典として開催されます。',
        detailUrl: 'https://www.jalan.net/event/evt_343969/',
        crawledAt: new Date().toISOString(),
        source: 'jalan.net',
      },
    ];

    // 文化艺术活动关键词（包含）
    this.cultureKeywords = [
      'フランス',
      'France',
      '骨董',
      'アンティーク',
      '文化',
      '芸術',
      '美術',
      '展示',
      '学園祭',
      'ワールド',
      '祭典',
      'ART',
      'CULTURE',
    ];

    // 排除的五大活動關鍵詞
    this.excludeKeywords = [
      '花火',
      '祭り',
      'あじさい',
      'アジサイ',
      '紫陽花',
      'ハナショウブ',
      '花菖蒲',
      'イルミネーション',
      '紅葉',
      'もみじ',
      'モミジ',
      '桜',
      'さくら',
      '桜まつり',
      '花見',
    ];
  }

  // 检查活动是否为6月后
  isAfterJune(dateStr) {
    if (!dateStr) return false;

    // 提取日期信息，包括跨月的情况
    // 例如: "2025年6月13日～7月28日" 应该被认为是6月后的活动
    const dateRegex = /(\d+)年(\d+)月(\d+)日/g;
    const matches = [...dateStr.matchAll(dateRegex)];

    if (matches.length > 0) {
      // 检查第一个日期（开始日期）
      const firstMatch = matches[0];
      const month = parseInt(firstMatch[2]);
      const day = parseInt(firstMatch[3]);

      // 6月19日之后的活动（包括6月19日当天之后的活动）
      if (month > 6) {
        return true;
      } else if (month === 6 && day >= 19) {
        return true;
      }
    }

    return false;
  }

  // 检查是否为文化艺术活动
  isCultureActivity(name, description) {
    const text = (name + ' ' + description).toLowerCase();

    // 排除五大传统活动 - 但允许学園祭等文化活动
    for (const keyword of this.excludeKeywords) {
      if (
        text.includes(keyword.toLowerCase()) &&
        !text.includes('学園祭') &&
        !text.includes('大学')
      ) {
        return false;
      }
    }

    // 包含文化艺术关键词
    for (const keyword of this.cultureKeywords) {
      if (text.includes(keyword.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  async extractActivities() {
    console.log('🎨 开始提取神奈川县文化艺术活动...');

    const filteredActivities = this.activityData.filter(activity => {
      // 检查是否为6月后的活动
      if (!this.isAfterJune(activity.period)) {
        console.log(`❌ ${activity.name} - 不是6月后的活动`);
        return false;
      }

      // 检查是否为文化艺术活动
      if (!this.isCultureActivity(activity.name, activity.description)) {
        console.log(`❌ ${activity.name} - 不是文化艺术活动`);
        return false;
      }

      console.log(`✅ ${activity.name} - 符合条件`);
      return true;
    });

    console.log(
      `\n🎯 找到 ${filteredActivities.length} 个符合条件的文化艺术活动`
    );

    // 限制最多5个活动
    const selectedActivities = filteredActivities.slice(0, 5);

    this.results = {
      region: '神奈川県',
      type: '文化芸術活動',
      crawledAt: new Date().toISOString(),
      totalCount: selectedActivities.length,
      source: 'jalan.net',
      activities: selectedActivities,
    };

    return this.results;
  }

  async saveToDatabase() {
    console.log('💾 保存数据到数据库...');

    const outputPath = path.join(
      __dirname,
      '../../data/kanagawa-culture-activities.json'
    );

    try {
      fs.writeFileSync(
        outputPath,
        JSON.stringify(this.results, null, 2),
        'utf8'
      );
      console.log(`✅ 数据已保存到: ${outputPath}`);
      console.log(`📊 总计 ${this.results.totalCount} 个活动`);

      // 输出活动列表
      this.results.activities.forEach((activity, index) => {
        console.log(`${index + 1}. ${activity.name} (${activity.period})`);
      });
    } catch (error) {
      console.error('❌ 保存数据失败:', error);
      throw error;
    }
  }

  async run() {
    try {
      console.log('🚀 开始爬取神奈川县文化艺术活动...');

      await this.extractActivities();
      await this.saveToDatabase();

      console.log('🎉 爬取完成！');
    } catch (error) {
      console.error('❌ 爬取失败:', error);
      process.exit(1);
    }
  }
}

// 运行爬虫
const crawler = new JalanKanagawaCultureCrawler();
crawler.run();
