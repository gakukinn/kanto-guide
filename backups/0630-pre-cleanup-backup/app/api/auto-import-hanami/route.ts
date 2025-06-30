import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

// 地区映射
const regionMapping = {
  '東京': 'tokyo',
  '神奈川': 'kanagawa', 
  '埼玉': 'saitama',
  '千葉': 'chiba',
  '茨城': 'kitakanto',
  '栃木': 'kitakanto',
  '群馬': 'kitakanto',
  '山梨': 'koshinetsu',
  '長野': 'koshinetsu',
  '新潟': 'koshinetsu'
};

// 定义解析数据类型
interface ParsedData {
  name: string;
  address: string;
  period: string;
  venue: string;
  access: string;
  organizer: string;
  price: string;
  contact: string;
  website: string;
  googleMaps: string;
  coordinates?: {
    lat: number;
    lng: number;
  } | null;
  coordsSource?: string;
}

// 验证日本坐标范围
function isValidJapanCoordinates(lat: number, lng: number): boolean {
  return lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145;
}

// 使用crawl+Playwright+Cheerio抓取网页数据
async function crawlWebPage(url: string): Promise<ParsedData> {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置User-Agent避免被识别为爬虫
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    console.log('正在访问页面:', url);
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    // 等待页面完全加载
    await page.waitForTimeout(3000);
    
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    
    console.log('页面加载完成，开始解析数据...');
    
    // 通用数据提取函数
    const extractUniversalData = (pageText: string, $: any) => {
    const data: any = {};
      
      // 1. 通用活动名称提取
      data.name = extractUniversalName(pageText, $);
      
      // 2. 通用地址提取
      data.address = extractUniversalAddress(pageText, $);
      
      // 3. 通用日期提取
      data.period = extractUniversalPeriod(pageText, $);
      
      // 4. 通用场所提取
      data.venue = extractUniversalVenue(pageText, $);
      
      // 5. 通用交通提取
      data.access = extractUniversalAccess(pageText, $);
      
      // 6. 通用主办方提取
      data.organizer = extractUniversalOrganizer(pageText, $);
      
      // 7. 通用价格提取
      data.price = extractUniversalPrice(pageText, $);
      
      // 8. 通用联系方式提取
      data.contact = extractUniversalContact(pageText, $);
      
      // 9. 通用网站提取
      data.website = extractUniversalWebsite(pageText, $);
      
      return data;
    };
    
    // 通用名称提取函数
    const extractUniversalName = (pageText: string, $: any): string => {
      // 方法1: H1标签
      let name = $('h1').first().text().trim();
      if (name && name.length > 3 && name.length < 100) {
        return name;
      }
      
      // 方法2: 标题标签清理
      name = $('title').text().trim()
        .replace(/【.*?】/g, '')
        .replace(/｜.*$/g, '')
        .replace(/\s*-\s*.*$/g, '')
        .replace(/\s*じゃらん.*$/g, '')
        .trim();
      
      if (name && name.length > 3 && name.length < 100) {
        return name;
      }
      
      // 方法3: 从URL推断
      try {
        const eventPart = url.split('/').find((part: string) => part.includes('evt_'));
        if (eventPart) {
          return eventPart.replace(/evt_|[0-9]/g, '').replace(/-/g, ' ');
        }
      } catch (e) {
        // URL解析失败，忽略
      }
      
      return '';
    };
    
    // 通用地址提取函数
    const extractUniversalAddress = (pageText: string, $: any): string => {
      // 通用日本地址正则表达式
      const addressPatterns = [
        /〒\d{3}\s*-?\s*\d{4}[^\n\r]*?[都道府県][^\n\r]*?[市区町村][^\n\r]*?/,
        /[都道府県][^\n\r]*?[市区町村][^\n\r]*?[0-9\-]+[^\n\r]*/,
        /東京都[^\n\r]*?区[^\n\r]*?/,
        /[都道府県][^\n\r]*?市[^\n\r]*?/
      ];
      
      for (const pattern of addressPatterns) {
        const match = pageText.match(pattern);
        if (match) {
          const address = match[0].trim();
          // 过滤掉包含地图控制文本的结果
          if (!address.includes('Move left') && 
              !address.includes('Zoom') && 
              address.length < 200) {
            return address;
          }
        }
      }
      
      return '';
    };
    
    // 通用日期提取函数
    const extractUniversalPeriod = (pageText: string, $: any): string => {
      const datePatterns = [
        /\d{4}年\d{1,2}月\d{1,2}日[^\n\r]*?[0-9:：]+[^\n\r]*/,
        /\d{4}年\d{1,2}月\d{1,2}日〜?\d{1,2}日?/,
        /\d{1,2}月\d{1,2}日[^\n\r]*?時間[^\n\r]*/,
        /開催期間[：:][^\n\r]*?\d{4}年[^\n\r]*/
      ];
      
      for (const pattern of datePatterns) {
        const match = pageText.match(pattern);
        if (match) {
          return match[0].trim().replace(/\s+/g, ' ');
        }
      }
      
      return '';
    };
    
    // 通用场所提取函数
    const extractUniversalVenue = (pageText: string, $: any): string => {
      const venuePatterns = [
        /会場[：:][^\n\r]*?[都道府県][^\n\r]*?/,
        /開催場所[：:][^\n\r]*?[都道府県][^\n\r]*?/,
        /場所[：:][^\n\r]*?[都道府県][^\n\r]*?/,
        /[都道府県][^\n\r]*?[ホール|会館|センター|広場|公園|球場][^\n\r]*/
      ];
      
      for (const pattern of venuePatterns) {
        const match = pageText.match(pattern);
        if (match) {
          return match[0].replace(/^[^：:]*[：:]/, '').trim();
        }
      }
      
      return '';
    };
    
    // 通用交通提取函数
    const extractUniversalAccess = (pageText: string, $: any): string => {
      const accessPatterns = [
        /交通[アクセス]*[：:][^\n\r]*?[駅|線][^\n\r]*?/,
        /アクセス[：:][^\n\r]*?[駅|線][^\n\r]*?/,
        /[ＪＲ|JR|京成|東急|小田急][^\n\r]*?線[^\n\r]*?駅[^\n\r]*?/
      ];
      
      for (const pattern of accessPatterns) {
        const match = pageText.match(pattern);
        if (match) {
          return match[0].replace(/^[^：:]*[：:]/, '').trim();
        }
      }
      
      return '';
    };
    
    // 通用主办方提取函数
    const extractUniversalOrganizer = (pageText: string, $: any): string => {
      const organizerPatterns = [
        /主催[：:][^\n\r]*?[委員会|協会|区|市|都|府|県][^\n\r]*/,
        /主办[：:][^\n\r]*?[委員会|協会|区|市|都|府|県][^\n\r]*/,
        /[実行委員会|観光協会|区役所|市役所][^\n\r]*/
      ];
      
      for (const pattern of organizerPatterns) {
        const match = pageText.match(pattern);
        if (match) {
          return match[0].replace(/^[^：:]*[：:]/, '').trim();
        }
      }
      
      return '';
    };
    
    // 通用价格提取函数
    const extractUniversalPrice = (pageText: string, $: any): string => {
      const pricePatterns = [
        /料金[：:][^\n\r]*?[無料|有料|円][^\n\r]*/,
        /入場[：:][^\n\r]*?[無料|有料|円][^\n\r]*/,
        /[観覧無料|入場無料|有料観覧席]/,
        /\d+円[^\n\r]*/
      ];
      
      for (const pattern of pricePatterns) {
        const match = pageText.match(pattern);
        if (match) {
          return match[0].replace(/^[^：:]*[：:]/, '').trim();
        }
      }
      
      return '';
    };
    
    // 通用联系方式提取函数
    const extractUniversalContact = (pageText: string, $: any): string => {
      const contactPatterns = [
        /問[い合わせ]*[：:][^\n\r]*?\d{2,4}-\d{4}-\d{4}[^\n\r]*/,
        /連絡先[：:][^\n\r]*?\d{2,4}-\d{4}-\d{4}[^\n\r]*/,
        /[コールセンター|お問い合わせ][^\n\r]*?\d{2,4}-\d{4}-\d{4}[^\n\r]*/
      ];
      
      for (const pattern of contactPatterns) {
        const match = pageText.match(pattern);
        if (match) {
          return match[0].replace(/^[^：:]*[：:]/, '').trim();
        }
      }
      
      return '';
    };
    
    // 通用网站提取函数
    const extractUniversalWebsite = (pageText: string, $: any): string => {
      const websitePatterns = [
        /https?:\/\/[^\s"'<>]*\.lg\.jp[^\s"'<>]*/,
        /https?:\/\/[^\s"'<>]*\.city\.[^\s"'<>]*/,
        /https?:\/\/[^\s"'<>]*\.or\.jp[^\s"'<>]*/,
        /https?:\/\/[^\s"'<>]*\.jp[^\s"'<>]*/
      ];
      
      for (const pattern of websitePatterns) {
        const match = pageText.match(pattern);
        if (match) {
          return match[0];
        }
      }
      
      return '';
    };
    
    const extractedData = extractUniversalData($('body').text(), $);
    
    console.log('数据提取完成:', extractedData);
    
    // 提取地图坐标 - 修复坐标提取逻辑
    let coordinates: { lat: number; lng: number } | null = null;
    let coordsSource = '';
    
    try {
      // 方法1: 查找Google Maps链接中的坐标
      const mapLinks = $('a[href*=\"maps.google\"], a[href*=\"google.com/maps\"]');
      for (let i = 0; i < mapLinks.length; i++) {
        const href = $(mapLinks[i]).attr('href');
        if (href) {
          const llMatch = href.match(/ll=([+-]?\d+\.\d+),([+-]?\d+\.\d+)/);
          if (llMatch) {
            const lat = parseFloat(llMatch[1]);
            const lng = parseFloat(llMatch[2]);
            if (isValidJapanCoordinates(lat, lng)) {
              coordinates = { lat, lng };
              coordsSource = 'Google Maps链接';
              console.log('从Google Maps链接提取到坐标:', coordinates);
              break;
            }
          }
        }
      }
      
      // 方法2: 查找iframe中的地图坐标
      if (!coordinates) {
        const iframes = $('iframe[src*=\"maps\"], iframe[src*=\"google\"]');
        for (let i = 0; i < iframes.length; i++) {
          const src = $(iframes[i]).attr('src');
          if (src) {
            const coordMatch = src.match(/[?&]ll=([+-]?\d+\.\d+),([+-]?\d+\.\d+)/);
            if (coordMatch) {
              const lat = parseFloat(coordMatch[1]);
              const lng = parseFloat(coordMatch[2]);
              if (isValidJapanCoordinates(lat, lng)) {
                coordinates = { lat, lng };
                coordsSource = 'iframe地图';
                console.log('从iframe提取到坐标:', coordinates);
              break;
              }
            }
          }
        }
      }
      
      // 方法3: 搜索JavaScript中的坐标变量
      if (!coordinates) {
        const scriptTags = $('script');
        for (let i = 0; i < scriptTags.length; i++) {
          const scriptContent = $(scriptTags[i]).html() || '';
          const latLngMatches = scriptContent.match(/lat[\"']?\s*:\s*([+-]?\d+\.\d+)[^}]*lng[\"']?\s*:\s*([+-]?\d+\.\d+)/i) ||
                               scriptContent.match(/([+-]?\d+\.\d+)\s*,\s*([+-]?\d+\.\d+)/g);
          
          if (latLngMatches) {
            for (const match of latLngMatches) {
              const coords = match.match(/([+-]?\d+\.\d+)/g);
              if (coords && coords.length >= 2) {
                const lat = parseFloat(coords[0]);
                const lng = parseFloat(coords[1]);
                if (isValidJapanCoordinates(lat, lng)) {
                  coordinates = { lat, lng };
                  coordsSource = 'JavaScript变量';
                  console.log('从JavaScript提取到坐标:', coordinates);
                  break;
                }
              }
            }
            if (coordinates) break;
          }
        }
      }
      
    } catch (error) {
      console.log('坐标提取过程中出现错误:', error);
    }
    
    if (!coordinates) {
      console.log('未能提取到有效坐标');
    }
    
    return {
      name: extractedData.name || '',
      address: extractedData.address || '',
      period: extractedData.period || '',
      venue: extractedData.venue || '',
      access: extractedData.access || '',
      organizer: extractedData.organizer || '',
      price: extractedData.price || '',
      contact: extractedData.contact || '',
      website: extractedData.website || '',
      googleMaps: '',
      coordinates,
      coordsSource
    };
    
  } finally {
    await browser.close();
  }
}

// 解析文本数据
function parseTextData(text: string): ParsedData {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const parsed: ParsedData = {
    name: '',
    address: '',
    period: '',
    venue: '',
    access: '',
    organizer: '',
    price: '',
    contact: '',
    website: '',
    googleMaps: ''
  };

  for (const line of lines) {
    if (line.includes('名称') || line.includes('イベント名')) {
      parsed.name = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('所在地') || line.includes('住所')) {
      parsed.address = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('開催期間') || line.includes('期間')) {
      parsed.period = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('開催場所') || line.includes('会場')) {
      parsed.venue = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('交通アクセス') || line.includes('アクセス')) {
      parsed.access = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('主催')) {
      parsed.organizer = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('料金')) {
      parsed.price = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('問合せ先') || line.includes('連絡先')) {
      parsed.contact = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('ホームページ') || line.includes('URL')) {
      parsed.website = line.split(/[：:]/)[1]?.trim() || '';
    } else if (line.includes('Google') || line.includes('地図')) {
      parsed.googleMaps = line.split(/[：:]/)[1]?.trim() || '';
    }
  }

  return parsed;
}

// 检测地区
function detectRegion(address: string, venue: string): string {
  const text = (address + ' ' + venue).toLowerCase();
  
  for (const [japanese, english] of Object.entries(regionMapping)) {
    if (text.includes(japanese.toLowerCase()) || text.includes(english)) {
      return english;
    }
  }
  
  return 'tokyo'; // 默认为东京
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const url = searchParams.get('url');

    if (!text && !url) {
      return NextResponse.json({ 
        success: false, 
        error: '请提供要解析的文本或网址' 
      });
    }

    let parsed: ParsedData;

    if (url) {
      // 网址抓取模式
      console.log('开始抓取网址:', url);
      parsed = await crawlWebPage(url);
      console.log('抓取结果:', parsed);
    } else {
      // 文本解析模式
      parsed = parseTextData(text!);
    }
    
    return NextResponse.json({
      success: true,
      parsed
    });
    
  } catch (error) {
    console.error('解析错误:', error);
    return NextResponse.json({
      success: false,
      error: '解析过程中发生错误: ' + (error as Error).message
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, url, action } = body;

    if (action !== 'create') {
      return NextResponse.json({
        success: false,
        error: '不支持的操作'
      });
    }

    let parsed: ParsedData;

    if (url) {
      // 网址抓取模式
      console.log('开始抓取网址:', url);
      parsed = await crawlWebPage(url);
    } else if (text) {
      // 文本解析模式
      parsed = parseTextData(text);
    } else {
      return NextResponse.json({
        success: false,
        error: '请提供要解析的文本或网址'
      });
    }

    // 检测地区
    const detectedRegion = detectRegion(parsed.address, parsed.venue);
    
    // 生成事件ID
    const eventId = `hanami-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // 准备保存到数据库的数据
    const saveData = {
      id: eventId,
      name: parsed.name || '',
      address: parsed.address || '',
      datetime: parsed.period || new Date().toISOString(),
      venue: parsed.venue || '',
      access: parsed.access || '',
      organizer: parsed.organizer || '',
      price: parsed.price || '',
      contact: parsed.contact || '',
      website: parsed.website || '',
      googleMap: parsed.googleMaps || '',
      region: detectedRegion,
      verified: !!parsed.coordinates,
      regionRef: {
        connect: { id: detectedRegion }
      }
    };

    // 检查是否存在同名活动
    const existingEvent = await prisma.matsuriEvent.findFirst({
      where: {
        name: saveData.name
      }
    });
    
    let result;
    if (existingEvent) {
      // 更新现有活动
      const updateData = { ...saveData };
      delete (updateData as any).regionRef;
      
      result = await prisma.matsuriEvent.update({
        where: { id: existingEvent.id },
        data: updateData
      });
      
      return NextResponse.json({
        success: true,
        message: `活动信息已更新！ID: ${result.id}`,
        data: result
      });
    } else {
      // 创建新活动
      result = await prisma.matsuriEvent.create({
        data: saveData
      });
      
      return NextResponse.json({
        success: true,
        message: `新活动已创建！ID: ${result.id}`,
        data: result
      });
    }

  } catch (error) {
    console.error('保存错误:', error);
    return NextResponse.json({
      success: false,
      error: '保存过程中发生错误: ' + (error as Error).message
    });
  } finally {
    await prisma.$disconnect();
  }
} 