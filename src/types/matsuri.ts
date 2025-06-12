import { z } from 'zod';

// 祭典数据的Zod验证模式
export const MatsuriEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  japaneseName: z.string(),
  englishName: z.string(),
  date: z.string(), // ISO date format
  endDate: z.string().optional(),
  location: z.string(),

  category: z.enum(['大型', '中型', '小型']),
  highlights: z.array(z.string()),
  likes: z.number().default(0),
  website: z.string().url(),
  description: z.string(),
  prefecture: z.string().default('東京都'),
  lastUpdated: z.string().default(() => new Date().toISOString()),
  source: z.string().url(),
  verified: z.boolean().default(false)
});

// TypeScript类型推导
export type MatsuriEvent = z.infer<typeof MatsuriEventSchema>;

// 数据源配置
export const DataSourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  selector: z.string(),
  fields: z.record(z.string()),
  lastCrawled: z.string().optional(),
  isActive: z.boolean().default(true)
});

export type DataSource = z.infer<typeof DataSourceSchema>;

// 爬虫结果
export const CrawlResultSchema = z.object({
  success: z.boolean(),
  data: z.array(MatsuriEventSchema),
  errors: z.array(z.string()),
  timestamp: z.string(),
  source: z.string()
});

export type CrawlResult = z.infer<typeof CrawlResultSchema>; 