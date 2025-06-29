import { Browser, chromium, Page } from 'playwright';
import { ActivityDataSource } from './data-source-extractor';

export interface CrawledData {
  activityId: string;
  activityName: string;
  source: 'official' | 'walkerplus';
  url: string;
  success: boolean;
  extractedData?: {
    title?: string;
    date?: string;
    time?: string;
    location?: string;
    description?: string;
    fireworksCount?: string;
    expectedVisitors?: string;
  };
  error?: string;
  crawledAt: string;
}

export interface CrawlReport {
  totalActivities: number;
  crawledOfficialSites: number;
  crawledWalkerPlus: number;
  successfulCrawls: number;
  failedCrawls: number;
  crawlResults: CrawledData[];
  summary: {
    highPriority: number; // 有两个数据源的
    mediumPriority: number; // 只有官网的
    dataConsistencyIssues: number; // 数据不一致的
  };
}

export class TokyoDataCrawler {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private crawlResults: CrawledData[] = [];

  async initialize(): Promise<void> {
    console.log('🚀 初始化Playwright浏览器...');
    this.browser = await chromium.launch({
      headless: true,
      timeout: 30000,
    });

    // 创建页面时设置用户代理
    this.page = await this.browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    // 设置默认超时
    this.page.setDefaultTimeout(15000);

    console.log('✅ 浏览器初始化完成');
  }

  async crawlActivity(activity: ActivityDataSource): Promise<void> {
    console.log(`\n🔍 开始爬取: ${activity.name}`);

    // 爬取官方网站
    if (activity.hasOfficialWebsite && activity.officialWebsite) {
      await this.crawlWebsite(activity, activity.officialWebsite, 'official');
    }

    // 爬取WalkerPlus
    if (activity.hasWalkerPlusUrl && activity.walkerPlusUrl) {
      await this.crawlWebsite(activity, activity.walkerPlusUrl, 'walkerplus');
    }
  }

  private async crawlWebsite(
    activity: ActivityDataSource,
    url: string,
    source: 'official' | 'walkerplus'
  ): Promise<void> {
    const sourceLabel = source === 'official' ? '官网' : 'WalkerPlus';
    console.log(`  📄 爬取${sourceLabel}: ${url}`);

    try {
      if (!this.page) throw new Error('浏览器未初始化');

      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(2000); // 等待页面加载

      let extractedData: any = {};

      if (source === 'walkerplus') {
        extractedData = await this.extractWalkerPlusData();
      } else {
        extractedData = await this.extractOfficialSiteData();
      }

      const crawlResult: CrawledData = {
        activityId: activity.id,
        activityName: activity.name,
        source,
        url,
        success: true,
        extractedData,
        crawledAt: new Date().toISOString(),
      };

      this.crawlResults.push(crawlResult);
      console.log(`  ✅ ${sourceLabel}爬取成功`);

      // 显示提取的关键信息
      if (extractedData.date)
        console.log(`     📅 日期: ${extractedData.date}`);
      if (extractedData.time)
        console.log(`     ⏰ 时间: ${extractedData.time}`);
      if (extractedData.location)
        console.log(`     📍 地点: ${extractedData.location}`);
    } catch (error) {
      const crawlResult: CrawledData = {
        activityId: activity.id,
        activityName: activity.name,
        source,
        url,
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
        crawledAt: new Date().toISOString(),
      };

      this.crawlResults.push(crawlResult);
      console.log(`  ❌ ${sourceLabel}爬取失败: ${crawlResult.error}`);
    }
  }

  private async extractWalkerPlusData(): Promise<any> {
    if (!this.page) return {};

    const extractedData: any = {};

    try {
      // WalkerPlus特定的数据提取
      const title = await this.page
        .$eval('h1, .event-title, .title', el => el.textContent?.trim())
        .catch(() => null);
      const date = await this.page
        .$eval('[data-date], .date, .event-date', el => el.textContent?.trim())
        .catch(() => null);
      const time = await this.page
        .$eval('[data-time], .time, .event-time', el => el.textContent?.trim())
        .catch(() => null);
      const location = await this.page
        .$eval('.location, .venue, .address', el => el.textContent?.trim())
        .catch(() => null);
      const description = await this.page
        .$eval('.description, .event-description, .summary', el =>
          el.textContent?.trim()
        )
        .catch(() => null);

      // WalkerPlus页面的特殊结构
      const eventInfo = await this.page
        .$$eval('.event-info tr, .detail-info tr', rows => {
          const info: any = {};
          rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            if (cells.length >= 2) {
              const key = cells[0].textContent?.trim().toLowerCase();
              const value = cells[1].textContent?.trim();
              if (key && value) {
                if (key.includes('日時') || key.includes('date'))
                  info.date = value;
                if (key.includes('時間') || key.includes('time'))
                  info.time = value;
                if (
                  key.includes('場所') ||
                  key.includes('会場') ||
                  key.includes('venue')
                )
                  info.location = value;
                if (key.includes('花火') && key.includes('数'))
                  info.fireworksCount = value;
                if (key.includes('来場') || key.includes('観客'))
                  info.expectedVisitors = value;
              }
            }
          });
          return info;
        })
        .catch(() => ({}));

      return {
        title: title || eventInfo.title,
        date: date || eventInfo.date,
        time: time || eventInfo.time,
        location: location || eventInfo.location,
        description,
        fireworksCount: eventInfo.fireworksCount,
        expectedVisitors: eventInfo.expectedVisitors,
      };
    } catch (error) {
      console.log(`    ⚠️ WalkerPlus数据提取出错: ${error}`);
      return extractedData;
    }
  }

  private async extractOfficialSiteData(): Promise<any> {
    if (!this.page) return {};

    try {
      // 通用的官方网站数据提取
      const title = await this.page
        .$eval('h1, .title, .event-title', el => el.textContent?.trim())
        .catch(() => null);

      // 查找日期信息
      const datePatterns = [
        '[data-date]',
        '.date',
        '.event-date',
        '.schedule',
        'time[datetime]',
        '.datetime',
        '.when',
      ];
      let date = null;
      for (const pattern of datePatterns) {
        date = await this.page
          .$eval(pattern, el => el.textContent?.trim())
          .catch(() => null);
        if (date) break;
      }

      // 查找时间信息
      const timePatterns = [
        '[data-time]',
        '.time',
        '.event-time',
        '.schedule-time',
      ];
      let time = null;
      for (const pattern of timePatterns) {
        time = await this.page
          .$eval(pattern, el => el.textContent?.trim())
          .catch(() => null);
        if (time) break;
      }

      // 查找地点信息
      const locationPatterns = [
        '.location',
        '.venue',
        '.address',
        '.place',
        '.where',
      ];
      let location = null;
      for (const pattern of locationPatterns) {
        location = await this.page
          .$eval(pattern, el => el.textContent?.trim())
          .catch(() => null);
        if (location) break;
      }

      return {
        title,
        date,
        time,
        location,
      };
    } catch (error) {
      console.log(`    ⚠️ 官网数据提取出错: ${error}`);
      return {};
    }
  }

  async generateReport(activities: ActivityDataSource[]): Promise<CrawlReport> {
    const totalActivities = activities.length;
    const crawledOfficialSites = this.crawlResults.filter(
      r => r.source === 'official'
    ).length;
    const crawledWalkerPlus = this.crawlResults.filter(
      r => r.source === 'walkerplus'
    ).length;
    const successfulCrawls = this.crawlResults.filter(r => r.success).length;
    const failedCrawls = this.crawlResults.filter(r => !r.success).length;

    const highPriority = activities.filter(
      a => a.hasOfficialWebsite && a.hasWalkerPlusUrl
    ).length;
    const mediumPriority = activities.filter(
      a => a.hasOfficialWebsite && !a.hasWalkerPlusUrl
    ).length;

    const report: CrawlReport = {
      totalActivities,
      crawledOfficialSites,
      crawledWalkerPlus,
      successfulCrawls,
      failedCrawls,
      crawlResults: this.crawlResults,
      summary: {
        highPriority,
        mediumPriority,
        dataConsistencyIssues: 0, // 待后续分析
      },
    };

    return report;
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 浏览器已关闭');
    }
  }

  async crawlTokyoActivities(
    activities: ActivityDataSource[]
  ): Promise<CrawlReport> {
    try {
      await this.initialize();

      console.log(
        `\n📊 开始阶段2：爬取东京${activities.length}个活动的外部数据源`
      );
      console.log('='.repeat(50));

      // 按优先级处理活动
      const highPriorityActivities = activities.filter(
        a => a.hasOfficialWebsite && a.hasWalkerPlusUrl
      );
      const mediumPriorityActivities = activities.filter(
        a => a.hasOfficialWebsite && !a.hasWalkerPlusUrl
      );

      console.log(
        `\n🟢 处理高优先级活动（官网+WalkerPlus）: ${highPriorityActivities.length}个`
      );
      for (const activity of highPriorityActivities) {
        await this.crawlActivity(activity);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒延迟
      }

      console.log(
        `\n🟡 处理中优先级活动（仅官网）: ${mediumPriorityActivities.length}个`
      );
      for (const activity of mediumPriorityActivities) {
        await this.crawlActivity(activity);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒延迟
      }

      console.log('\n📊 生成爬取报告...');
      const report = await this.generateReport(activities);

      return report;
    } finally {
      await this.cleanup();
    }
  }
}

// 导出便捷函数
export async function crawlTokyoData(
  activities: ActivityDataSource[]
): Promise<CrawlReport> {
  const crawler = new TokyoDataCrawler();
  return await crawler.crawlTokyoActivities(activities);
}
