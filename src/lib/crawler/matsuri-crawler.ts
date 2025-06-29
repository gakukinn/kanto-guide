import { CrawlResult, MatsuriEvent, MatsuriEventSchema } from '@/types/matsuri';
import { PlaywrightCrawler } from 'crawlee';

export class MatsuriCrawler {
  private crawler: PlaywrightCrawler;
  private results: MatsuriEvent[] = [];
  private errors: string[] = [];

  constructor() {
    this.crawler = new PlaywrightCrawler({
      headless: true,
      requestHandler: async ({ page, request, log }) => {
        try {
          log.info(`Processing: ${request.url}`);

          // 等待页面加载完成
          await page.waitForLoadState('networkidle');

          // 根据不同网站使用不同的抓取策略
          if (request.url.includes('omaturilink.com')) {
            await this.scrapeOmaturiLink(page);
          } else if (request.url.includes('matcha-jp.com')) {
            await this.scrapeMatcha(page);
          } else if (request.url.includes('on-japan.jp')) {
            await this.scrapeRealJapanOn(page);
          }
        } catch (error) {
          this.errors.push(
            `Error processing ${request.url}: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      },
      failedRequestHandler: async ({ request, error }) => {
        this.errors.push(
          `Failed to process ${request.url}: ${error instanceof Error ? error.message : String(error)}`
        );
      },
    });
  }

  // 抓取 omaturilink.com 数据
  private async scrapeOmaturiLink(page: any) {
    const festivals = await page.evaluate(() => {
      const items: any[] = [];

      // 查找祭典列表项
      const festivalElements = document.querySelectorAll(
        '.festival-item, .event-item, .matsuri-item'
      );

      festivalElements.forEach((element: Element) => {
        try {
          const title = element
            .querySelector('.title, .name, h3, h2')
            ?.textContent?.trim();
          const date = element
            .querySelector('.date, .time')
            ?.textContent?.trim();
          const location = element
            .querySelector('.location, .place')
            ?.textContent?.trim();
          const description = element
            .querySelector('.description, .summary')
            ?.textContent?.trim();

          if (title && date && location) {
            items.push({
              title,
              date,
              location,
              description: description || '',
              source: window.location.href,
            });
          }
        } catch (error) {
          console.error('Error parsing festival item:', error);
        }
      });

      return items;
    });

    // 处理和验证数据
    festivals.forEach((festival: any, index: number) => {
      try {
        const processedFestival = this.processFestivalData(
          festival,
          'omaturilink.com'
        );
        this.results.push(processedFestival);
      } catch (error) {
        this.errors.push(
          `Error processing festival ${index}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  // 抓取 MATCHA 数据
  private async scrapeMatcha(page: any) {
    const festivals = await page.evaluate(() => {
      const items: any[] = [];

      // MATCHA 特定的选择器
      const festivalElements = document.querySelectorAll(
        'article, .article-item, .event-card'
      );

      festivalElements.forEach((element: Element) => {
        try {
          const title = element
            .querySelector('h1, h2, h3, .title')
            ?.textContent?.trim();
          const content = element
            .querySelector('.content, .description, p')
            ?.textContent?.trim();

          // 从内容中提取日期和地点信息
          const dateMatch = content?.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
          const locationMatch = content?.match(/(神社|寺|会場|公園|駅|区|市)/);

          if (title && dateMatch) {
            items.push({
              title,
              date: `${dateMatch[1]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[3].padStart(2, '0')}`,
              location: locationMatch ? locationMatch[0] : '東京都内',
              description: content || '',
              source: window.location.href,
            });
          }
        } catch (error) {
          console.error('Error parsing MATCHA item:', error);
        }
      });

      return items;
    });

    festivals.forEach((festival: any, index: number) => {
      try {
        const processedFestival = this.processFestivalData(
          festival,
          'matcha-jp.com'
        );
        this.results.push(processedFestival);
      } catch (error) {
        this.errors.push(
          `Error processing MATCHA festival ${index}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  // 抓取 Real Japan 'on 数据
  private async scrapeRealJapanOn(page: any) {
    const festivals = await page.evaluate(() => {
      const items: any[] = [];

      // Real Japan 'on 特定的选择器
      const festivalElements = document.querySelectorAll(
        '.festival-card, .event-info, .matsuri-info'
      );

      festivalElements.forEach((element: Element) => {
        try {
          const title = element
            .querySelector('.festival-name, .event-title, h3')
            ?.textContent?.trim();
          const date = element
            .querySelector('.date, .schedule')
            ?.textContent?.trim();
          const location = element
            .querySelector('.venue, .location')
            ?.textContent?.trim();
          const description = element
            .querySelector('.description, .summary')
            ?.textContent?.trim();

          if (title) {
            items.push({
              title,
              date: date || '',
              location: location || '東京都内',
              description: description || '',
              source: window.location.href,
            });
          }
        } catch (error) {
          console.error('Error parsing Real Japan item:', error);
        }
      });

      return items;
    });

    festivals.forEach((festival: any, index: number) => {
      try {
        const processedFestival = this.processFestivalData(
          festival,
          'on-japan.jp'
        );
        this.results.push(processedFestival);
      } catch (error) {
        this.errors.push(
          `Error processing Real Japan festival ${index}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  // 处理和标准化祭典数据
  private processFestivalData(
    rawData: any,
    sourceDomain: string
  ): MatsuriEvent {
    // 生成唯一ID
    const id = `${sourceDomain}-${rawData.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${Date.now()}`;

    // 标准化日期格式
    const date = this.standardizeDate(rawData.date);

    // 推断祭典类型和特色
    const category = this.inferCategory(rawData.title, rawData.description);
    const highlights = this.extractHighlights(
      rawData.title,
      rawData.description
    );

    // 生成官方网站URL（基于已知模式）
    const website = this.generateWebsiteUrl(rawData.title);

    const processedData = {
      id,
      title: rawData.title,
      japaneseName: rawData.title, // 假设原始数据是日文
      englishName: this.translateToEnglish(rawData.title),
      date,
      location: rawData.location,
      category,
      highlights,
      likes: Math.floor(Math.random() * 200), // 随机初始点赞数
      website,
      description: rawData.description,
      prefecture: '東京都',
      lastUpdated: new Date().toISOString(),
      source: rawData.source,
      verified: false,
    };

    // 使用Zod验证数据
    return MatsuriEventSchema.parse(processedData);
  }

  // 标准化日期格式
  private standardizeDate(dateStr: string): string {
    if (!dateStr) return new Date().toISOString().split('T')[0];

    // 处理各种日期格式
    const patterns = [
      /(\d{4})年(\d{1,2})月(\d{1,2})日/,
      /(\d{4})-(\d{1,2})-(\d{1,2})/,
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    ];

    for (const pattern of patterns) {
      const match = dateStr.match(pattern);
      if (match) {
        const [, year, month, day] = match;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }

    return new Date().toISOString().split('T')[0];
  }

  // 推断祭典规模
  private inferCategory(
    title: string,
    description: string
  ): '大型' | '中型' | '小型' {
    const text = `${title} ${description}`.toLowerCase();

    if (
      text.includes('大祭') ||
      text.includes('花火大会') ||
      text.includes('大規模')
    ) {
      return '大型';
    } else if (
      text.includes('地域') ||
      text.includes('小規模') ||
      text.includes('地元')
    ) {
      return '小型';
    }

    return '中型';
  }

  // 提取特色亮点
  private extractHighlights(title: string, description: string): string[] {
    const highlights: string[] = [];
    const text = `${title} ${description}`;

    // 基于关键词提取特色
    const keywords = [
      { pattern: /花火|煙火/, highlight: '花火大会' },
      { pattern: /神輿|这/, highlight: '神轿游行' },
      { pattern: /祭|祭典/, highlight: '传统祭典' },
      { pattern: /踊|舞踊/, highlight: '传统舞蹈' },
      { pattern: /屋台|出店/, highlight: '美食摊位' },
      { pattern: /伝統|歴史/, highlight: '历史传统' },
    ];

    keywords.forEach(({ pattern, highlight }) => {
      if (pattern.test(text) && !highlights.includes(highlight)) {
        highlights.push(highlight);
      }
    });

    return highlights.length > 0 ? highlights : ['传统祭典'];
  }

  // 简单的日英翻译（基于已知模式）
  private translateToEnglish(japaneseName: string): string {
    const translations: Record<string, string> = {
      祭: 'Festival',
      花火大会: 'Fireworks Festival',
      桜祭: 'Cherry Blossom Festival',
      神社: 'Shrine',
      寺: 'Temple',
    };

    let englishName = japaneseName;
    Object.entries(translations).forEach(([jp, en]) => {
      englishName = englishName.replace(new RegExp(jp, 'g'), en);
    });

    return englishName || japaneseName;
  }

  // 估算参观人数
  private estimateVisitors(category: '大型' | '中型' | '小型'): string {
    switch (category) {
      case '大型':
        return '10万人以上';
      case '中型':
        return '1-10万人';
      case '小型':
        return '1万人以下';
      default:
        return '1-10万人';
    }
  }

  // 估算活动时长
  private estimateDuration(description: string): string {
    if (description.includes('一日') || description.includes('1日')) {
      return '1日';
    } else if (description.includes('週末') || description.includes('土日')) {
      return '2日';
    }
    return '3日';
  }

  // 生成网站URL
  private generateWebsiteUrl(title: string): string {
    // 这里可以基于祭典名称生成可能的官方网站URL
    // 暂时返回通用搜索URL
    const searchQuery = encodeURIComponent(title);
    return `https://www.google.com/search?q=${searchQuery}+公式网站`;
  }

  // 主要爬虫方法
  async crawl(urls: string[]): Promise<CrawlResult> {
    try {
      this.results = [];
      this.errors = [];

      // 添加要爬取的URL到队列
      await this.crawler.addRequests(urls);

      // 开始爬取
      await this.crawler.run();

      return {
        success: this.errors.length === 0,
        data: this.results,
        errors: this.errors,
        timestamp: new Date().toISOString(),
        source: 'matsuri-crawler',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        errors: [
          `Crawler failed: ${error instanceof Error ? error.message : String(error)}`,
        ],
        timestamp: new Date().toISOString(),
        source: 'matsuri-crawler',
      };
    }
  }

  // 清理资源
  async cleanup() {
    await this.crawler.teardown();
  }
}
