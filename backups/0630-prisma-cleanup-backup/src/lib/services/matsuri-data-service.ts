import fs from 'fs/promises';
import path from 'path';
import { MatsuriEvent, MatsuriEventSchema, CrawlResult } from '@/types/matsuri';

export class MatsuriDataService {
  private dataPath: string;
  private crawler: any = null;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'matsuri');
    this.ensureDataDirectory();
  }

  // 懒加载爬虫
  private async getCrawler() {
    if (!this.crawler) {
      const { MatsuriCrawler } = await import('@/lib/crawler/matsuri-crawler');
      this.crawler = new MatsuriCrawler();
    }
    return this.crawler;
  }

  // 确保数据目录存在
  private async ensureDataDirectory() {
    try {
      await fs.mkdir(this.dataPath, { recursive: true });
    } catch (error) {
      console.error(
        'Error creating data directory:',
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  // 获取数据文件路径
  private getDataFilePath(prefecture: string = 'tokyo'): string {
    return path.join(this.dataPath, `${prefecture}-matsuri.json`);
  }

  // 保存祭典数据
  async saveMatsuriData(
    prefecture: string,
    data: MatsuriEvent[]
  ): Promise<void> {
    try {
      const filePath = this.getDataFilePath(prefecture);
      const jsonData = {
        lastUpdated: new Date().toISOString(),
        count: data.length,
        data: data,
      };

      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
      console.log(`Saved ${data.length} matsuri events for ${prefecture}`);
    } catch (error) {
      console.error(
        'Error saving matsuri data:',
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  // 加载祭典数据
  async loadMatsuriData(prefecture: string = 'tokyo'): Promise<MatsuriEvent[]> {
    try {
      const filePath = this.getDataFilePath(prefecture);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      // 验证数据格式
      const validatedData = jsonData.data.map((item: any) =>
        MatsuriEventSchema.parse(item)
      );

      return validatedData;
    } catch (error) {
      console.log(
        `No existing data found for ${prefecture}, returning empty array`
      );
      return [];
    }
  }

  // 更新祭典数据（通过爬虫）
  async updateMatsuriData(prefecture: string = 'tokyo'): Promise<CrawlResult> {
    const urls = this.getDataSourceUrls(prefecture);

    try {
      console.log(`Starting data update for ${prefecture}...`);
      const crawler = await this.getCrawler();
      const result = await crawler.crawl(urls);

      if (result.success && result.data.length > 0) {
        // 合并现有数据和新数据
        const existingData = await this.loadMatsuriData(prefecture);
        const mergedData = this.mergeMatsuriData(existingData, result.data);

        await this.saveMatsuriData(prefecture, mergedData);
        console.log(`Successfully updated ${prefecture} matsuri data`);
      }

      return result;
    } catch (error) {
      console.error(
        'Error updating matsuri data:',
        error instanceof Error ? error.message : String(error)
      );
      return {
        success: false,
        data: [],
        errors: [
          `Update error: ${error instanceof Error ? error.message : String(error)}`,
        ],
        timestamp: new Date().toISOString(),
        source: 'matsuri-data-service',
      };
    } finally {
      if (this.crawler) {
        await this.crawler.cleanup();
      }
    }
  }

  // 获取数据源URL
  private getDataSourceUrls(prefecture: string): string[] {
    const urlMap: Record<string, string[]> = {
      tokyo: [
        'https://omaturilink.com/%E6%9D%B1%E4%BA%AC%E9%83%BD/',
        'https://matcha-jp.com/jp/20117',
        'https://www.on-japan.jp/home/eventinfo/matsuri-info/',
      ],
      kanagawa: [
        'https://omaturilink.com/%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C/',
      ],
      saitama: ['https://omaturilink.com/%E5%9F%BC%E7%8E%89%E7%9C%8C/'],
    };

    return urlMap[prefecture] || urlMap.tokyo;
  }

  // 合并祭典数据（去重和更新）
  private mergeMatsuriData(
    existing: MatsuriEvent[],
    newData: MatsuriEvent[]
  ): MatsuriEvent[] {
    const merged = [...existing];

    newData.forEach(newEvent => {
      const existingIndex = merged.findIndex(
        existing =>
          existing.title === newEvent.title && existing.date === newEvent.date
      );

      if (existingIndex >= 0) {
        // 更新现有数据，保留点赞数
        merged[existingIndex] = {
          ...newEvent,
          likes: merged[existingIndex].likes,
          id: merged[existingIndex].id,
        };
      } else {
        // 添加新数据
        merged.push(newEvent);
      }
    });

    return merged;
  }

  // 获取祭典统计信息
  async getMatsuriStats(prefecture: string = 'tokyo'): Promise<{
    total: number;
    byCategory: Record<string, number>;
    upcoming: number;
    lastUpdated: string;
  }> {
    const data = await this.loadMatsuriData(prefecture);
    const now = new Date();

    const stats = {
      total: data.length,
      byCategory: data.reduce(
        (acc, event) => {
          acc[event.category] = (acc[event.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      upcoming: data.filter(event => new Date(event.date) >= now).length,
      lastUpdated:
        data.length > 0 ? data[0].lastUpdated : new Date().toISOString(),
    };

    return stats;
  }

  // 搜索祭典
  async searchMatsuri(
    prefecture: string = 'tokyo',
    query: string,
    filters?: {
      category?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<MatsuriEvent[]> {
    const data = await this.loadMatsuriData(prefecture);

    let filtered = data.filter(
      event =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
    );

    if (filters?.category) {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    if (filters?.startDate) {
      filtered = filtered.filter(event => event.date >= filters.startDate!);
    }

    if (filters?.endDate) {
      filtered = filtered.filter(event => event.date <= filters.endDate!);
    }

    return filtered;
  }

  // 更新点赞数
  async updateLikes(
    prefecture: string,
    eventId: string,
    likes: number
  ): Promise<void> {
    const data = await this.loadMatsuriData(prefecture);
    const eventIndex = data.findIndex(event => event.id === eventId);

    if (eventIndex >= 0) {
      data[eventIndex].likes = likes;
      await this.saveMatsuriData(prefecture, data);
    }
  }

  // 验证数据完整性
  async validateData(prefecture: string = 'tokyo'): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    try {
      const data = await this.loadMatsuriData(prefecture);
      const errors: string[] = [];
      const warnings: string[] = [];

      data.forEach((event, index) => {
        try {
          MatsuriEventSchema.parse(event);
        } catch (error) {
          errors.push(`Event ${index}: ${error}`);
        }

        // 检查日期是否合理
        const eventDate = new Date(event.date);
        const now = new Date();
        const oneYearAgo = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        const twoYearsLater = new Date(
          now.getFullYear() + 2,
          now.getMonth(),
          now.getDate()
        );

        if (eventDate < oneYearAgo || eventDate > twoYearsLater) {
          warnings.push(
            `Event "${event.title}" has unusual date: ${event.date}`
          );
        }

        // 检查网站URL是否可访问（简单检查）
        if (!event.website.startsWith('http')) {
          warnings.push(`Event "${event.title}" has invalid website URL`);
        }
      });

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [`Validation error: ${error}`],
        warnings: [],
      };
    }
  }
}
