import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/prisma';
import fs from 'fs';
import path from 'path';

interface ImageStats {
  total: number;
  withImages: number;
  withoutImages: number;
  percentage: number;
}

interface ActivityRecord {
  id: string;
  name: string;
  region: string;
  detailLink: string | null;
  imageMain?: string;
  type: string;
}

// 检查特定活动是否有图片（检查页面中的media数组）
function checkActivityHasImages(activityType: string, region: string, detailLink: string | null, activityId: string, activityName: string): boolean {
  // 检查生成的页面中的media数组
  if (detailLink) {
    const pagePath = path.join(process.cwd(), 'app', detailLink, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      try {
        const pageContent = fs.readFileSync(pagePath, 'utf8');
        
        // 检查是否有data:image/（嵌入式base64图片）
        if (pageContent.includes('data:image/')) {
          return true;
        }
        
        // 检查media数组是否为空
        const mediaMatch = pageContent.match(/media:\s*\[([\s\S]*?)\]/);
        if (mediaMatch) {
          const mediaContent = mediaMatch[1].trim();
          // 如果media数组不为空（包含内容）
          if (mediaContent && mediaContent !== '') {
            return true;
          }
        }
        
        // 检查是否有图片URL（http或https开头的图片链接）
        const imageUrlPattern = /https?:\/\/[^\s"']+\.(jpg|jpeg|png|webp|gif|svg)/i;
        if (imageUrlPattern.test(pageContent)) {
          return true;
        }
        
      } catch (error) {
        console.log(`检查页面图片时出错: ${pagePath}`, error);
      }
    }
  }
  
  return false;
}

export async function GET() {
  try {
    // 获取所有活动类型的数据
    const [matsuri, hanami, hanabi, momiji, illumination, culture] = await Promise.all([
      prisma.matsuriEvent.findMany({ select: { id: true, name: true, region: true, detailLink: true } }),
      prisma.hanamiEvent.findMany({ select: { id: true, name: true, region: true, detailLink: true } }),
      prisma.hanabiEvent.findMany({ select: { id: true, name: true, region: true, detailLink: true } }),
      prisma.momijiEvent.findMany({ select: { id: true, name: true, region: true, detailLink: true } }),
      prisma.illuminationEvent.findMany({ select: { id: true, name: true, region: true, detailLink: true } }),
      prisma.cultureEvent.findMany({ select: { id: true, name: true, region: true, detailLink: true } })
    ]);

    // 为每个活动添加图片检查结果
    const activities = {
      matsuri: matsuri.map((item: any) => ({ 
        ...item, 
        type: 'matsuri',
        hasImage: checkActivityHasImages('matsuri', item.region, item.detailLink, item.id, item.name)
      })),
      hanami: hanami.map((item: any) => ({ 
        ...item, 
        type: 'hanami',
        hasImage: checkActivityHasImages('hanami', item.region, item.detailLink, item.id, item.name)
      })),
      hanabi: hanabi.map((item: any) => ({ 
        ...item, 
        type: 'hanabi',
        hasImage: checkActivityHasImages('hanabi', item.region, item.detailLink, item.id, item.name)
      })),
      momiji: momiji.map((item: any) => ({ 
        ...item, 
        type: 'momiji',
        hasImage: checkActivityHasImages('momiji', item.region, item.detailLink, item.id, item.name)
      })),
      illumination: illumination.map((item: any) => ({ 
        ...item, 
        type: 'illumination',
        hasImage: checkActivityHasImages('illumination', item.region, item.detailLink, item.id, item.name)
      })),
      culture: culture.map((item: any) => ({ 
        ...item, 
        type: 'culture',
        hasImage: checkActivityHasImages('culture', item.region, item.detailLink, item.id, item.name)
      }))
    };

    // 计算统计数据 - 基于实际图片检查结果
    const stats: Record<string, Record<string, ImageStats>> = {};
    const regions = ['tokyo', 'kanagawa', 'saitama', 'chiba', 'kitakanto', 'koshinetsu'];

    Object.entries(activities).forEach(([activityType, records]) => {
      stats[activityType] = {};
      
      regions.forEach(region => {
        const regionRecords = records.filter((r: any) => r.region === region);
        const total = regionRecords.length;
        const withImages = regionRecords.filter((r: any) => r.hasImage).length;
        const withoutImages = total - withImages;
        const percentage = total > 0 ? (withImages / total) * 100 : 0;

        if (total > 0) {
          stats[activityType][region] = {
            total,
            withImages,
            withoutImages,
            percentage
          };
        }
      });
    });

    return NextResponse.json({
      success: true,
      stats,
      activities
    });

  } catch (error) {
    console.error('获取图片统计失败:', error);
    return NextResponse.json(
      { success: false, error: '获取图片统计失败' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 