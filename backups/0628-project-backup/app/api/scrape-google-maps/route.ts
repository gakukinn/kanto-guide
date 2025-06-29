/**
 * 谷歌地图信息爬取API
 * @description 使用Playwright+Cheerio技术爬取谷歌地图信息，更新Prisma数据库
 */

import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

// 定义地图信息类型接口
interface MapInfo {
  address: string | null;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  rating: number | null;
  reviews: number | null;
  phone: string | null;
  website: string | null;
  hours: string | null;
  mapUrl: string | null;
  embedUrl: string | null;
  coordsSource: string;
}

export async function POST(request: NextRequest) {
  let browser = null;
  
  try {
    console.log('📥 接收到谷歌地图爬取请求');
    
    const body = await request.json();
    const { searchQuery, databaseId, updateType = 'hanami', testMode = false } = body;
    
    if (!searchQuery) {
      return NextResponse.json({
        success: false,
        message: '缺少搜索关键词',
        error: 'searchQuery is required'
      }, { status: 400 });
    }
    
    console.log('🔍 搜索关键词:', searchQuery);
    console.log('📊 数据库ID:', databaseId);
    console.log('🏷️ 更新类型:', updateType);
    console.log('🧪 测试模式:', testMode);
    
    // 如果是测试模式，返回模拟数据
    if (testMode) {
      const mockMapInfo: MapInfo = {
        address: '〒247-0062 神奈川県鎌倉市山ノ内189',
        coordinates: {
          lat: 35.3374,
          lng: 139.5436
        },
        rating: 4.2,
        reviews: 1234,
        phone: null,
        website: null,
        hours: null,
        mapUrl: 'https://www.google.com/maps/place/明月院/@35.3374,139.5436,17z',
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280905481636!2d139.5436!3d35.3374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sja!2sjp!4v1640995200000!5m2!1sja!2sjp',
        coordsSource: 'test_mode'
      };
      
      if (databaseId) {
        await updateDatabase(databaseId, mockMapInfo, updateType);
      }
      
      return NextResponse.json({
        success: true,
        message: '测试模式：谷歌地图信息模拟成功',
        data: {
          searchQuery,
          mapInfo: mockMapInfo,
          databaseId,
          updateType,
          testMode: true,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // 启动浏览器
    console.log('🚀 启动Playwright浏览器...');
    browser = await chromium.launch({ 
      headless: true,  // 设置为true以提高稳定性
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    // 构建谷歌地图搜索URL
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    console.log('🗺️ 访问谷歌地图:', searchUrl);
    
    await page.goto(searchUrl, { waitUntil: 'networkidle' });
    
    // 等待页面加载
    await page.waitForTimeout(3000);
    
    // 获取页面HTML内容
    const htmlContent = await page.content();
    
    // 使用Cheerio解析HTML
    const $ = cheerio.load(htmlContent);
    
    // 提取地图信息
    const mapInfo = await extractMapInfo($, page);
    
    console.log('📍 提取的地图信息:', JSON.stringify(mapInfo, null, 2));
    
    // 更新数据库
    if (databaseId) {
      await updateDatabase(databaseId, mapInfo, updateType);
    }
    
    return NextResponse.json({
      success: true,
      message: '谷歌地图信息爬取成功',
      data: {
        searchQuery,
        mapInfo,
        databaseId,
        updateType,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ 爬取错误:', error);
    
    return NextResponse.json({
      success: false,
      message: '谷歌地图爬取失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
    
  } finally {
    if (browser) {
      await browser.close();
    }
    await prisma.$disconnect();
  }
}

/**
 * 使用Cheerio提取地图信息
 */
async function extractMapInfo($: cheerio.Root, page: any): Promise<MapInfo> {
  const mapInfo: MapInfo = {
    address: null,
    coordinates: null,
    rating: null,
    reviews: null,
    phone: null,
    website: null,
    hours: null,
    mapUrl: null,
    embedUrl: null,
    coordsSource: 'google_maps'
  };
  
  try {
    // 尝试获取地址信息
    const addressSelectors = [
      '[data-item-id] [data-value="Address"]',
      '.LrzXr',
      '[jsaction*="address"]',
      '.rogA2c .Io6YTe'
    ];
    
    for (const selector of addressSelectors) {
      const address = $(selector).first().text().trim();
      if (address) {
        mapInfo.address = address;
        break;
      }
    }
    
    // 尝试获取评分
    const ratingSelectors = [
      '.MW4etd',
      '.ceNzKf',
      '[jsaction*="rating"]'
    ];
    
    for (const selector of ratingSelectors) {
      const rating = $(selector).first().text().trim();
      if (rating && /^\d+\.?\d*$/.test(rating)) {
        mapInfo.rating = parseFloat(rating);
        break;
      }
    }
    
    // 尝试获取评论数量
    const reviewSelectors = [
      '.UY7F9',
      '.RDApEe',
      '[jsaction*="review"]'
    ];
    
    for (const selector of reviewSelectors) {
      const reviews = $(selector).first().text().trim();
      const match = reviews.match(/(\d+)/);
      if (match) {
        mapInfo.reviews = parseInt(match[1]);
        break;
      }
    }
    
    // 尝试从URL获取坐标
    const currentUrl = page.url();
    const coordsMatch = currentUrl.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (coordsMatch) {
      mapInfo.coordinates = {
        lat: parseFloat(coordsMatch[1]),
        lng: parseFloat(coordsMatch[2])
      };
    }
    
    // 设置地图URL
    mapInfo.mapUrl = currentUrl;
    
    // 生成正确的嵌入URL格式（修复404问题）
    if (mapInfo.coordinates) {
      mapInfo.embedUrl = `https://maps.google.com/maps?q=${mapInfo.coordinates.lat},${mapInfo.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    
    // 确保所有字段都有默认值
    mapInfo.phone = mapInfo.phone || null;
    mapInfo.website = mapInfo.website || null;
    mapInfo.hours = mapInfo.hours || null;
    
    console.log('📋 Cheerio解析结果:', mapInfo);
    
  } catch (error) {
    console.error('❌ Cheerio解析错误:', error);
  }
  
  return mapInfo;
}

/**
 * 更新数据库
 */
async function updateDatabase(databaseId: string, mapInfo: MapInfo, updateType: string) {
  try {
    console.log('💾 更新数据库记录:', databaseId);
    
    if (updateType === 'hanami') {
      // 更新谷歌地图链接和地址信息
      await prisma.hanamiEvent.update({
        where: { id: databaseId },
        data: {
          googleMap: mapInfo.mapUrl || '',
          address: mapInfo.address || ''
        }
      });
    } else if (updateType === 'matsuri') {
      // 如果有祭典表，可以在这里添加
      console.log('⚠️ 祭典类型更新暂未实现');
    }
    
    console.log('✅ 数据库更新成功');
    
  } catch (error) {
    console.error('❌ 数据库更新错误:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: '谷歌地图爬取API',
    description: '使用Playwright+Cheerio技术爬取谷歌地图信息',
    usage: {
      method: 'POST',
      body: {
        searchQuery: '搜索关键词（必需）',
        databaseId: '数据库记录ID（可选）',
        updateType: 'hanami | matsuri（默认hanami）'
      }
    },
    example: {
      searchQuery: '明月院 神奈川県鎌倉市',
      databaseId: 'cmc7b4m440001vluwsfpzbohk',
      updateType: 'hanami'
    }
  });
} 