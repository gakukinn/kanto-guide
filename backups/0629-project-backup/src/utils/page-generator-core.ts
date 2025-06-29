/**
 * 页面生成器核心逻辑
 * @description 将用户输入的数据转换为完整的页面文件和数据库记录
 */

import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

// 表单数据接口（与页面中的接口一致）
interface HanabiFormData {
  name: string;
  englishName?: string;
  japaneseName?: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string;
  location: string;
  venue: string;
  address: string;
  mapUrl?: string;
  fireworksCount: string;
  expectedVisitors: string;
  category: string;
  description: string;
  highlights: string;
  access: string;
  parking: string;
  weather: string;
  ticketInfo: string;
  website?: string;
  contactPhone?: string;
  region: 'tokyo' | 'kanagawa' | 'chiba' | 'saitama' | 'kitakanto' | 'koshinetsu';
}

interface GenerationOptions {
  selectedLocation?: { lat: number; lng: number };
  uploadedImages?: string[];
}

class PageGeneratorCore {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * 生成页面URL slug
   */
  private generateSlug(name: string, date: string): string {
    // 移除特殊字符，生成URL友好的slug
    const cleanName = name
      .replace(/第\d+回/g, '') // 移除"第XX回"
      .replace(/\d{4}年?/g, '') // 移除年份
      .replace(/[^\w\s-]/g, '') // 移除特殊字符
      .trim()
      .toLowerCase();
    
    // 转换为拼音或英文（简化版）
    const slug = cleanName
      .replace(/花火/g, 'hanabi')
      .replace(/大会/g, 'festival')
      .replace(/祭/g, 'matsuri')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    const year = new Date(date).getFullYear();
    return `${slug}-${year}`;
  }

  /**
   * 转换表单数据为数据库格式
   */
  private convertFormToDbData(formData: HanabiFormData, options: GenerationOptions) {
    const highlights = formData.highlights ? formData.highlights.split(',').map(h => h.trim()) : [];
    
    return {
      id: this.generateSlug(formData.name, formData.date),
      name: formData.name,
      englishName: formData.englishName || '',
      japaneseName: formData.japaneseName || '',
      date: new Date(formData.date),
      startTime: formData.startTime || '',
      endTime: formData.endTime || '',
      duration: formData.duration || '',
      location: formData.location,
      venue: formData.venue,
      address: formData.address || '',
      mapUrl: options.selectedLocation 
        ? `https://www.google.com/maps?q=${options.selectedLocation.lat},${options.selectedLocation.lng}`
        : '',
      latitude: options.selectedLocation?.lat || 0,
      longitude: options.selectedLocation?.lng || 0,
      fireworksCount: formData.fireworksCount || '',
      expectedVisitors: formData.expectedVisitors || '',
      category: formData.category || '花火大会',
      description: formData.description || '',
      highlights: highlights,
      access: formData.access || '',
      parking: formData.parking || '',
      weather: formData.weather || '雨天中止',
      ticketInfo: formData.ticketInfo || '',
      website: formData.website || '',
      contactPhone: formData.contactPhone || '',
      region: formData.region,
      images: options.uploadedImages || [],
      status: 'active' as const,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * 生成页面文件内容
   */
  private generatePageContent(dbData: any): string {
    const slug = dbData.id;
    
    return `/**
 * ${dbData.name} - 详情页面
 * 生成时间: ${new Date().toLocaleString('zh-CN')}
 * 自动生成 - 请勿手动修改
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';

// 页面数据
const hanabiData = {
  id: '${slug}',
  name: '${dbData.name}',
  englishName: '${dbData.englishName}',
  japaneseName: '${dbData.japaneseName}',
  date: new Date('${dbData.date.toISOString()}'),
  startTime: '${dbData.startTime}',
  endTime: '${dbData.endTime}',
  duration: '${dbData.duration}',
  location: '${dbData.location}',
  venue: '${dbData.venue}',
  address: '${dbData.address}',
  mapUrl: '${dbData.mapUrl}',
  latitude: ${dbData.latitude},
  longitude: ${dbData.longitude},
  fireworksCount: '${dbData.fireworksCount}',
  expectedVisitors: '${dbData.expectedVisitors}',
  category: '${dbData.category}',
  description: \`${dbData.description.replace(/`/g, '\\`')}\`,
  highlights: ${JSON.stringify(dbData.highlights)},
  access: \`${dbData.access.replace(/`/g, '\\`')}\`,
  parking: '${dbData.parking}',
  weather: '${dbData.weather}',
  ticketInfo: \`${dbData.ticketInfo.replace(/`/g, '\\`')}\`,
  website: '${dbData.website}',
  contactPhone: '${dbData.contactPhone}',
  region: '${dbData.region}',
  images: ${JSON.stringify(dbData.images)},
  status: '${dbData.status}',
  featured: ${dbData.featured},
  createdAt: new Date('${dbData.createdAt.toISOString()}'),
  updatedAt: new Date('${dbData.updatedAt.toISOString()}')
};

// SEO元数据
export const metadata: Metadata = {
  title: \`\${hanabiData.name} | 日本东部花火指南\`,
  description: \`\${hanabiData.name}详细信息：举办时间\${hanabiData.date.toLocaleDateString('zh-CN')}，地点\${hanabiData.venue}。花火数量\${hanabiData.fireworksCount}，预计观众\${hanabiData.expectedVisitors}。\${hanabiData.description.slice(0, 100)}...\`,
  keywords: [
    hanabiData.name,
    '花火大会',
    hanabiData.region,
    hanabiData.venue,
    '日本花火',
    '烟花节',
    '旅游指南'
  ],
  openGraph: {
    title: hanabiData.name,
    description: hanabiData.description,
    type: 'article',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: \`/\${hanabiData.region}/hanabi/\${hanabiData.id}\`
  }
};

export default function HanabiDetailPage() {
  // 验证数据完整性
  if (!hanabiData || !hanabiData.name) {
    notFound();
  }

  return (
    <HanabiDetailTemplate 
      hanabiData={hanabiData}
      region={hanabiData.region}
    />
  );
}

// 页面配置
export const revalidate = 86400; // ISR 24小时重新验证
`;
  }

  /**
   * 主要生成函数
   */
  async generatePage(formData: HanabiFormData, options: GenerationOptions = {}): Promise<{
    success: boolean;
    message: string;
    slug?: string;
    filePath?: string;
  }> {
    try {
      // 1. 数据验证
      if (!formData.name || !formData.date || !formData.venue || !formData.region) {
        return {
          success: false,
          message: '缺少必填字段：活动名称、日期、会场、地区必须填写'
        };
      }

      // 2. 转换数据
      const dbData = this.convertFormToDbData(formData, options);
      const slug = dbData.id;

      // 3. 检查是否已存在
      const existing = await this.prisma.hanabi.findUnique({
        where: { id: slug }
      });

      if (existing) {
        return {
          success: false,
          message: `页面已存在：${slug}，请修改活动名称或日期`
        };
      }

      // 4. 生成页面文件
      const pageContent = this.generatePageContent(dbData);
      const filePath = path.join(process.cwd(), 'app', dbData.region, 'hanabi', slug, 'page.tsx');
      const dirPath = path.dirname(filePath);

      // 5. 创建目录和文件
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(filePath, pageContent, 'utf-8');

      // 6. 保存到数据库
      await this.prisma.hanabi.create({
        data: {
          id: dbData.id,
          name: dbData.name,
          englishName: dbData.englishName,
          japaneseName: dbData.japaneseName,
          date: dbData.date,
          startTime: dbData.startTime,
          endTime: dbData.endTime,
          duration: dbData.duration,
          location: dbData.location,
          venue: dbData.venue,
          address: dbData.address,
          mapUrl: dbData.mapUrl,
          latitude: dbData.latitude,
          longitude: dbData.longitude,
          fireworksCount: dbData.fireworksCount,
          expectedVisitors: dbData.expectedVisitors,
          category: dbData.category,
          description: dbData.description,
          highlights: dbData.highlights,
          access: dbData.access,
          parking: dbData.parking,
          weather: dbData.weather,
          ticketInfo: dbData.ticketInfo,
          website: dbData.website,
          contactPhone: dbData.contactPhone,
          region: dbData.region,
          images: dbData.images,
          status: dbData.status,
          featured: dbData.featured
        }
      });

      return {
        success: true,
        message: `页面生成成功！已创建 ${slug}`,
        slug,
        filePath
      };

    } catch (error) {
      console.error('页面生成失败:', error);
      return {
        success: false,
        message: `生成失败: ${error instanceof Error ? error.message : '未知错误'}`
      };
    }
  }

  /**
   * 验证数据完整性
   */
  async validateData(formData: HanabiFormData): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 必填字段检查
    if (!formData.name?.trim()) errors.push('活动名称不能为空');
    if (!formData.date) errors.push('举办日期不能为空');
    if (!formData.venue?.trim()) errors.push('会场名称不能为空');
    if (!formData.region) errors.push('地区必须选择');

    // 日期有效性检查
    if (formData.date) {
      const eventDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        warnings.push('活动日期早于今天，请确认是否正确');
      }
    }

    // 时间格式检查
    if (formData.startTime && !/^\d{2}:\d{2}$/.test(formData.startTime)) {
      errors.push('开始时间格式不正确（应为HH:MM）');
    }
    if (formData.endTime && !/^\d{2}:\d{2}$/.test(formData.endTime)) {
      errors.push('结束时间格式不正确（应为HH:MM）');
    }

    // URL格式检查
    if (formData.website && formData.website.trim()) {
      try {
        new URL(formData.website);
      } catch {
        errors.push('官方网站URL格式不正确');
      }
    }

    // 重复性检查
    if (formData.name && formData.date) {
      const slug = this.generateSlug(formData.name, formData.date);
      const existing = await this.prisma.hanabi.findUnique({
        where: { id: slug }
      });
      
      if (existing) {
        errors.push(`活动已存在：${existing.name}，请修改名称或日期`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * 基于HanabiData生成花火详情页面
   */
  async generateHanabiDetailPage(hanabiData: any, regionKey: string, eventId: string): Promise<{
    success: boolean;
    message: string;
    filePath?: string;
    url?: string;
  }> {
    try {
      // 生成页面内容使用HanabiDetailTemplate
      const pageContent = this.generateHanabiDetailPageContent(hanabiData, regionKey, eventId);
      
      // 确定文件路径
      const regionDir = path.join(process.cwd(), 'app', regionKey, 'hanabi');
      const filePath = path.join(regionDir, `${eventId}`, 'page.tsx');
      
      // 确保目录存在
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      
      // 写入文件
      await fs.writeFile(filePath, pageContent, 'utf8');
      
      console.log('✅ 页面文件生成成功:', filePath);
      
      return {
        success: true,
        message: '花火详情页面生成成功！',
        filePath: filePath.replace(process.cwd(), ''),
        url: `/${regionKey}/hanabi/${eventId}`
      };
      
    } catch (error) {
      console.error('生成页面失败:', error);
      return {
        success: false,
        message: `生成页面失败: ${error instanceof Error ? error.message : '未知错误'}`
      };
    }
  }

  /**
   * 生成HanabiDetailTemplate页面内容
   */
  private generateHanabiDetailPageContent(hanabiData: any, regionKey: string, eventId: string): string {
    return `/**
 * ${hanabiData.name} - 花火详情页面
 * 基于数据库记录生成
 * 生成时间: ${new Date().toLocaleString('zh-CN')}
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { HanabiData } from '@/types/hanabi';

// 花火数据
const hanabiData: HanabiData = ${JSON.stringify(hanabiData, null, 2)};

// SEO元数据
export const metadata: Metadata = {
  title: \`\${hanabiData.name} | 日本东部花火指南 - 2025年花火大会详情\`,
  description: hanabiData.description || \`\${hanabiData.name}将于\${hanabiData.date}举行，地点位于\${hanabiData.venues?.[0]?.location || '待确认'}。精彩花火表演，不容错过！\`,
  keywords: [
    hanabiData.name,
    '花火大会',
    '${regionKey}',
    '2025年花火',
    '日本花火',
    '烟花节',
    '旅游指南',
    hanabiData.tags?.regionTag || '',
    hanabiData.tags?.timeTag || ''
  ].filter(Boolean),
  openGraph: {
    title: hanabiData.name,
    description: hanabiData.description || \`\${hanabiData.name} - 2025年花火大会详情\`,
    type: 'article',
    locale: 'zh_CN',
    images: hanabiData.media?.map(m => ({
      url: m.url,
      alt: m.alt || hanabiData.name
    })) || []
  },
  alternates: {
    canonical: \`/${regionKey}/hanabi/${eventId}\`
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function HanabiDetailPage() {
  // 验证数据完整性
  if (!hanabiData || !hanabiData.name) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <HanabiDetailTemplate 
        data={hanabiData}
        regionKey="${regionKey}"
      />
    </div>
  );
}

// 生成静态参数（用于静态生成）
export async function generateStaticParams() {
  return [];
}
`;
  }

  /**
   * 清理资源
   */
  async disconnect() {
    await this.prisma.$disconnect();
  }
}

export default PageGeneratorCore; 