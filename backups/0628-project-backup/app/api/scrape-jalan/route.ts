/**
 * じゃらん网站抓取API
 * @description 使用Playwright抓取じゃらん等网站的花火活动信息并存储到数据库
 */

import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

interface ScrapedData {
  name: string;
  japaneseName?: string;
  address?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  access?: string;
  organizer?: string;
  ticketInfo?: string;
  contactPhone?: string;
  website?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

export async function POST(request: NextRequest) {
  let browser;
  
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log('开始抓取URL:', url);

    // 启动浏览器
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    // 访问页面
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // 抓取数据
    const scrapedData = await page.evaluate(() => {
      const data: any = {};

      // 抓取活动名称
      const nameElement = document.querySelector('.title_h1_s, .event-title, h1, .event-name');
      if (nameElement) {
        data.name = nameElement.textContent?.trim();
      }

      // 抓取基本信息表格
      const infoRows = document.querySelectorAll('tr, .info-row, .detail-item');
      
      infoRows.forEach(row => {
        const cells = row.querySelectorAll('th, td, .label, .value');
        if (cells.length >= 2) {
          const label = cells[0].textContent?.trim() || '';
          const value = cells[1].textContent?.trim() || '';
          
          console.log('找到信息:', label, '=', value);
          
          if (label.includes('所在地') || label.includes('住所')) {
            data.address = value;
          } else if (label.includes('開催期間') || label.includes('日程')) {
            // 解析日期和时间
            const dateMatch = value.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
            if (dateMatch) {
              const year = dateMatch[1];
              const month = dateMatch[2].padStart(2, '0');
              const day = dateMatch[3].padStart(2, '0');
              data.date = `${year}-${month}-${day}`;
            }
            
            // 解析时间
            const timeMatch = value.match(/(\d{1,2}):(\d{2})\s*[～~－-]\s*(\d{1,2}):(\d{2})/);
            if (timeMatch) {
              data.startTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
              data.endTime = `${timeMatch[3].padStart(2, '0')}:${timeMatch[4]}`;
            }
          } else if (label.includes('開催場所') || label.includes('会場')) {
            data.venue = value;
          } else if (label.includes('交通アクセス') || label.includes('アクセス')) {
            data.access = value;
          } else if (label.includes('主催')) {
            data.organizer = value;
          } else if (label.includes('料金')) {
            data.ticketInfo = value;
          } else if (label.includes('問合せ先') || label.includes('問い合わせ')) {
            // 提取电话号码
            const phoneMatch = value.match(/\d{2,4}-\d{2,4}-\d{4}/);
            if (phoneMatch) {
              data.contactPhone = phoneMatch[0];
            }
          } else if (label.includes('ホームページ') || label.includes('公式サイト')) {
            // 查找链接
            const linkElement = row.querySelector('a[href^="http"]');
            if (linkElement) {
              data.website = linkElement.getAttribute('href');
            }
          }
        }
      });

      // 抓取地图坐标
      const mapElements = document.querySelectorAll('script');
      mapElements.forEach(script => {
        const content = script.textContent || '';
        
        // 多种坐标格式
        const patterns = [
          /lat\s*:\s*([\d.-]+).*?lng\s*:\s*([\d.-]+)/,
          /latitude\s*:\s*([\d.-]+).*?longitude\s*:\s*([\d.-]+)/,
          /\{\s*lat\s*:\s*([\d.-]+)\s*,\s*lng\s*:\s*([\d.-]+)\s*\}/,
          /(35\.\d{4,})[^\d]+(139\.\d{4,})/
        ];

        for (const pattern of patterns) {
          const match = content.match(pattern);
          if (match && !data.latitude) {
            data.latitude = parseFloat(match[1]);
            data.longitude = parseFloat(match[2]);
            console.log('提取到坐标:', data.latitude, data.longitude);
            break;
          }
        }
      });

      // 推断地区
      if (data.address) {
        const regionMap: { [key: string]: string[] } = {
          'kanagawa': ['神奈川', '横浜', '川崎', '藤沢', '鎌倉', '小田原', '厚木', '横須賀'],
          'tokyo': ['東京', '新宿', '渋谷', '池袋', '銀座', '浅草', '上野', '品川'],
          'chiba': ['千葉', '船橋', '松戸', '市川', '浦安', '木更津', '成田'],
          'saitama': ['埼玉', 'さいたま', '川口', '所沢', '春日部', '熊谷'],
          'kitakanto': ['茨城', '栃木', '群馬', '水戸', 'つくば', '宇都宮'],
          'koshinetsu': ['新潟', '長野', '山梨', '松本', '甲府', '長岡']
        };

        for (const [region, keywords] of Object.entries(regionMap)) {
          for (const keyword of keywords) {
            if (data.address.includes(keyword)) {
              data.region = region;
              break;
            }
          }
          if (data.region) break;
        }
      }

      return data;
    });

    console.log('抓取到的数据:', scrapedData);

    // 验证必要字段
    if (!scrapedData.name) {
      return NextResponse.json({ error: '无法获取活动名称' }, { status: 400 });
    }

    // 检查数据库中是否已存在
    const existingEvent = await prisma.hanabiEvent.findFirst({
      where: {
        OR: [
          { walkerPlusUrl: url },
          { name: scrapedData.name }
        ]
      }
    });

    let result;
    if (existingEvent) {
      // 更新现有记录
      result = await prisma.hanabiEvent.update({
        where: { id: existingEvent.id },
        data: {
          name: scrapedData.name,
          japaneseName: scrapedData.japaneseName || scrapedData.name,
          location: scrapedData.address || scrapedData.venue || '',
          date: scrapedData.date || '',
          time: scrapedData.startTime || '',
          walkerPlusUrl: url,
          updatedAt: new Date()
        }
      });
      
      console.log('更新了现有记录, ID:', result.id);
    } else {
      // 创建新记录
      result = await prisma.hanabiEvent.create({
        data: {
          eventId: scrapedData.name.toLowerCase().replace(/\s+/g, '-'),
          name: scrapedData.name,
          japaneseName: scrapedData.japaneseName || scrapedData.name,
          englishName: '',
          year: 2025,
          month: 8,
          date: scrapedData.date || '2025-08-01',
          displayDate: '8/1',
          time: scrapedData.startTime || '',
          location: scrapedData.address || scrapedData.venue || '',
          walkerPlusUrl: url,
          regionId: 'kitakanto-region-id' // 需要实际的region ID
        }
      });
      
      console.log('创建了新记录, ID:', result.id);
    }

    return NextResponse.json({
      success: true,
      message: existingEvent ? '数据已更新' : '数据已保存',
      data: {
        id: result.id,
        name: result.name,
        isUpdated: !!existingEvent,
        extractedFields: Object.keys(scrapedData).length
      }
    });

  } catch (error) {
    console.error('抓取失败:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '抓取失败'
    }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
} 