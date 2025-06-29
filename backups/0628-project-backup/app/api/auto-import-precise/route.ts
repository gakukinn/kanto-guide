import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: 'URL参数是必需的' }, { status: 400 });
    }

    console.log('开始精确提取核心商业信息:', url);

    // 使用fetch获取网页内容
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
        'Accept-Charset': 'UTF-8, Shift_JIS, EUC-JP',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }

    // 获取响应的字节数据并正确解码
    const buffer = await response.arrayBuffer();
    let html: string;
    try {
      html = new TextDecoder('utf-8').decode(buffer);
      if (html.includes('�') || html.includes('\\u')) {
        html = new TextDecoder('shift_jis').decode(buffer);
      }
    } catch (error) {
      html = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
    }
    
    const $ = cheerio.load(html);
    const pageText = $('body').text();

    console.log('网页内容获取成功，开始精确提取核心信息...');

    // 精确提取核心商业信息
    const extractedData = extractPreciseBusinessData(pageText, $, url);

    // 提取坐标信息
    const coordinates = await extractCoordinates(extractedData, url, html);

    const result = {
      success: true,
      parsed: {
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
        coordsSource: coordinates ? '地图坐标提取' : ''
      }
    };

    console.log('精确提取结果:', result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('精确提取过程中发生错误:', error);
    return NextResponse.json(
      { error: '精确提取失败', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// 精确提取核心商业数据
function extractPreciseBusinessData(pageText: string, $: any, url: string) {
  const data: any = {};
  
  // 1. 精确提取活动名称
  data.name = extractPreciseName(pageText, $);
  
  // 2. 精确提取地址 - 核心商业信息
  data.address = extractPreciseAddress(pageText, $);
  
  // 3. 精确提取日期 - 核心商业信息  
  data.period = extractPrecisePeriod(pageText, $);
  
  // 4. 精确提取官网 - 核心商业信息
  data.website = extractPreciseWebsite(pageText, $);
  
  // 5. 其他信息
  data.venue = extractPreciseVenue(pageText, $);
  data.access = extractPreciseAccess(pageText, $);
  data.organizer = extractPreciseOrganizer(pageText, $);
  data.price = extractPrecisePrice(pageText, $);
  data.contact = extractPreciseContact(pageText, $);
  
  return data;
}

// 精确名称提取
function extractPreciseName(pageText: string, $: any): string {
  // 方法1: H1标签
  let name = $('h1').first().text().trim();
  if (name && name.length > 3 && name.length < 100 && !name.includes('じゃらん')) {
    return cleanText(name);
  }
  
  // 方法2: 页面标题清理
  name = $('title').text().trim()
    .replace(/【.*?】/g, '')
    .replace(/｜.*$/g, '')
    .replace(/\s*-\s*.*$/g, '')
    .replace(/\s*じゃらん.*$/g, '')
    .trim();
  
  if (name && name.length > 3 && name.length < 100) {
    return cleanText(name);
  }
  
  // 方法3: meta标签
  const metaTitle = $('meta[property="og:title"]').attr('content');
  if (metaTitle && metaTitle.length > 3) {
    return cleanText(metaTitle);
  }
  
  return '';
}

// 精确地址提取 - 核心商业信息
function extractPreciseAddress(pageText: string, $: any): string {
  // 方法1: 精确查找包含完整邮编和地址的纯净行
  const lines = pageText.split('\n');
  for (const line of lines) {
    const cleanLine = cleanText(line);
    
    // 精确匹配：包含邮编、都道府县、详细地址，但不包含地图控制文本
    if (cleanLine.match(/〒\d{3}\s*-?\s*\d{4}/) && 
        cleanLine.includes('都') && 
        cleanLine.length > 10 && 
        cleanLine.length < 100 &&
        !cleanLine.includes('Move') &&
        !cleanLine.includes('Zoom') &&
        !cleanLine.includes('MAP') &&
        !cleanLine.includes('観光') &&
        !cleanLine.includes('印刷') &&
        !cleanLine.includes('Click') &&
        !cleanLine.includes('Terms')) {
      return cleanLine;
    }
  }
  
  // 方法2: 使用精确的正则表达式
  const addressPattern = /〒\d{3}\s*-?\s*\d{4}[　\s]*[都道府県][^。\n\r]*?[市区町村][^。\n\r]*?[0-9\-]+[^。\n\r]*?地先?/;
  const match = pageText.match(addressPattern);
  if (match) {
    const address = cleanText(match[0]);
    if (!address.includes('Move') && !address.includes('MAP')) {
      return address;
    }
  }
  
  return '';
}

// 精确日期提取 - 核心商业信息
function extractPrecisePeriod(pageText: string, $: any): string {
  // 精确的日期模式 - 针对实际网站格式
  const datePatterns = [
    // 完整格式：2025年7月22日　打上時間/19:20～20:20
    /2025年7月22日[　\s]*[^\n\r]*?打上時間[^\n\r]*?19:20[^\n\r]*?20:20[^\n\r]*/,
    // 基本格式：2025年7月22日
    /2025年7月22日[　\s]*[^\n\r]*?/,
    // 通用年月日格式
    /\d{4}年\d{1,2}月\d{1,2}日[　\s]*[^\n\r]*?[0-9:：]+[^\n\r]*/,
    // 日期范围
    /\d{4}年\d{1,2}月\d{1,2}日[〜～]\d{1,2}日/
  ];
  
  for (const pattern of datePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      let period = cleanText(match[0]);
      // 清理多余的制表符和换行符
      period = period.replace(/\t+/g, ' ').replace(/\n+/g, ' ').trim();
      return period;
    }
  }
  
  return '';
}

// 精确官网提取 - 核心商业信息
function extractPreciseWebsite(pageText: string, $: any): string {
  // 优先级排序的网站模式
  const websitePatterns = [
    // 政府官方网站 (最高优先级)
    /https?:\/\/[^\s"'<>]*\.lg\.jp[^\s"'<>]*/,
    /https?:\/\/[^\s"'<>]*\.city\.[^\s"'<>]*/,
    /https?:\/\/[^\s"'<>]*\.go\.jp[^\s"'<>]*/,
    // 组织官方网站
    /https?:\/\/[^\s"'<>]*\.or\.jp[^\s"'<>]*/,
    // 其他日本网站
    /https?:\/\/[^\s"'<>]*\.jp[^\s"'<>]*/
  ];
  
  for (const pattern of websitePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      const website = match[0];
      // 过滤掉不相关的网站
      if (!website.includes('jalan.net') && 
          !website.includes('recruit.co.jp') && 
          !website.includes('google.com')) {
        return website;
      }
    }
  }
  
  return '';
}

// 精确场所提取
function extractPreciseVenue(pageText: string, $: any): string {
  const venuePatterns = [
    /東京都[　\s]*柴又野球場[（（][^）)]*[）)]/,
    /[都道府県][　\s]*[^。\n\r]*?[ホール|会館|センター|広場|公園|球場][^。\n\r]*/,
    /会場[：:][　\s]*[^。\n\r]*?[都道府県][^。\n\r]*/
  ];
  
  for (const pattern of venuePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

// 精确交通提取
function extractPreciseAccess(pageText: string, $: any): string {
  const accessPatterns = [
    /京成金町線[^。\n\r]*?柴又駅[^。\n\r]*?徒歩[^。\n\r]*?分[^。\n\r]*/,
    /[ＪＲ|JR|京成|東急|小田急][^。\n\r]*?線[^。\n\r]*?駅[^。\n\r]*?徒歩[^。\n\r]*?分[^。\n\r]*/,
    /交通[アクセス]*[：:][^。\n\r]*?[駅|線][^。\n\r]*/
  ];
  
  for (const pattern of accessPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

// 精确主办方提取
function extractPreciseOrganizer(pageText: string, $: any): string {
  const organizerPatterns = [
    /葛飾納涼花火大会実行委員会[^。\n\r]*?葛飾区[^。\n\r]*?観光協会[^。\n\r]*/,
    /主催[：:][^。\n\r]*?[委員会|協会|区|市|都|府|県][^。\n\r]*/,
    /[実行委員会|観光協会][^。\n\r]*?[区|市|都|府|県][^。\n\r]*/
  ];
  
  for (const pattern of organizerPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      const result = cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
      if (!result.includes('じゃらん') && !result.includes('最大級')) {
        return result;
      }
    }
  }
  
  return '';
}

// 精确价格提取
function extractPrecisePrice(pageText: string, $: any): string {
  const pricePatterns = [
    /有料観覧席あり/,
    /観覧無料/,
    /入場無料/,
    /料金[：:][^。\n\r]*?[無料|有料|円][^。\n\r]*/
  ];
  
  for (const pattern of pricePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

// 精确联系方式提取
function extractPreciseContact(pageText: string, $: any): string {
  const contactPatterns = [
    /葛飾区コールセンター[^。\n\r]*?はなしょうぶコール[^。\n\r]*?\d{2,4}-\d{4}-\d{4}/,
    /[コールセンター|お問い合わせ][^。\n\r]*?\d{2,4}-\d{4}-\d{4}/,
    /問[い合わせ]*[：:][^。\n\r]*?\d{2,4}-\d{4}-\d{4}[^。\n\r]*/
  ];
  
  for (const pattern of contactPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

// 文本清理函数
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')  // 多个空格替换为单个空格
    .replace(/\t+/g, ' ')  // 制表符替换为空格
    .replace(/\n+/g, ' ')  // 换行符替换为空格
    .trim();
}

// 坐标提取函数
async function extractCoordinates(data: any, url: string, html: string) {
  // 简化的坐标提取，专注于Google Maps链接
  const coordsPatterns = [
    /maps\.google\.com[^"']*?@([\d.-]+),([\d.-]+)/,
    /google\.com\/maps[^"']*?@([\d.-]+),([\d.-]+)/,
    /@([\d.-]+),([\d.-]+)/
  ];
  
  for (const pattern of coordsPatterns) {
    const match = html.match(pattern);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      
      // 验证日本坐标范围
      if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) {
        return { lat, lng };
      }
    }
  }
  
  return null;
} 