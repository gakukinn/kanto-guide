import { NextRequest, NextResponse } from 'next/server';
import { CheerioCrawler, Dataset } from 'crawlee';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: 'URL参数是必需的' }, { status: 400 });
    }

    console.log('开始使用Crawlee抓取网址:', url);

    let extractedData: any = {};

    // 配置Crawlee爬虫 - 简化配置避免系统兼容性问题
    const crawler = new CheerioCrawler({
      // 设置请求处理器
      async requestHandler({ request, $ }) {
        console.log('正在处理页面:', request.loadedUrl);
        
        // 获取页面文本
        const pageText = $('body').text();
        
        // 使用通用提取函数
        extractedData = extractUniversalData(pageText, $, request.loadedUrl || '');
        
        console.log('Crawlee数据提取完成:', extractedData);
      },
      
      // 错误处理
      failedRequestHandler({ request }: any) {
        console.log(`请求失败: ${request.url}`);
      },
      
      // 简化配置
      maxRequestRetries: 1,
      minConcurrency: 1,
      maxConcurrency: 1,
      
      // 设置请求头
      preNavigationHooks: [
        async (crawlingContext) => {
          crawlingContext.request.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
          };
        }
      ]
    });

    // 运行爬虫
    await crawler.run([url]);

    // 提取坐标信息
    const coordinates = await extractCoordinates(extractedData, url);

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

    console.log('Crawlee抓取结果:', result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Crawlee抓取过程中发生错误:', error);
    return NextResponse.json(
      { error: 'Crawlee抓取失败', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// 通用数据提取函数
function extractUniversalData(pageText: string, $: any, url: string) {
  const data: any = {};
  
  // 1. 通用活动名称提取
  data.name = extractUniversalName(pageText, $, url);
  
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
}

// 通用名称提取函数
function extractUniversalName(pageText: string, $: any, url: string): string {
  // 方法1: H1标签
  let name = $('h1').first().text().trim();
  if (name && name.length > 3 && name.length < 100) {
    return cleanText(name);
  }
  
  // 方法2: 标题标签清理
  name = $('title').text().trim()
    .replace(/【.*?】/g, '')
    .replace(/｜.*$/g, '')
    .replace(/\s*-\s*.*$/g, '')
    .replace(/\s*じゃらん.*$/g, '')
    .trim();
  
  if (name && name.length > 3 && name.length < 100) {
    return cleanText(name);
  }
  
  // 方法3: 从meta标签提取
  const metaTitle = $('meta[property="og:title"]').attr('content');
  if (metaTitle && metaTitle.length > 3) {
    return cleanText(metaTitle);
  }
  
  return '';
}

// 通用地址提取函数 - 改进版
function extractUniversalAddress(pageText: string, $: any): string {
  // 方法1: 查找特定的地址元素
  const addressSelectors = [
    'dt:contains("所在地") + dd',
    'th:contains("所在地") + td',
    '.address',
    '.location'
  ];
  
  for (const selector of addressSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      const text = cleanText(element.text());
      if (text.includes('〒') && text.includes('都') && !text.includes('Move')) {
        return text;
      }
    }
  }
  
  // 方法2: 使用改进的正则表达式
  const addressPatterns = [
    /〒\d{3}\s*-?\s*\d{4}[^\n\r]*?[都道府県][^\n\r]*?[市区町村][^\n\r]*?/,
    /[都道府県][^\n\r]*?[市区町村][^\n\r]*?[0-9\-]+[^\n\r]*/,
    /東京都[^\n\r]*?区[^\n\r]*?/,
    /[都道府県][^\n\r]*?市[^\n\r]*?/
  ];
  
  // 按行分割，查找干净的地址行
  const lines = pageText.split('\n');
  for (const line of lines) {
    const cleanLine = cleanText(line);
    if (cleanLine.includes('〒') && 
        cleanLine.includes('都') && 
        !cleanLine.includes('Move') &&
        !cleanLine.includes('Zoom') &&
        cleanLine.length < 150) {
      return cleanLine;
    }
  }
  
  // 方法3: 正则表达式匹配
  for (const pattern of addressPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      const address = cleanText(match[0]);
      if (!address.includes('Move') && !address.includes('Zoom')) {
        return address;
      }
    }
  }
  
  return '';
}

// 其他提取函数保持不变，但添加文本清理
function extractUniversalPeriod(pageText: string, $: any): string {
  const datePatterns = [
    /\d{4}年\d{1,2}月\d{1,2}日[^\n\r]*?[0-9:：]+[^\n\r]*/,
    /\d{4}年\d{1,2}月\d{1,2}日〜?\d{1,2}日?/,
    /\d{1,2}月\d{1,2}日[^\n\r]*?時間[^\n\r]*/,
    /開催期間[：:][^\n\r]*?\d{4}年[^\n\r]*/
  ];
  
  for (const pattern of datePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0]);
    }
  }
  
  return '';
}

function extractUniversalVenue(pageText: string, $: any): string {
  const venuePatterns = [
    /会場[：:][^\n\r]*?[都道府県][^\n\r]*?/,
    /開催場所[：:][^\n\r]*?[都道府県][^\n\r]*?/,
    /場所[：:][^\n\r]*?[都道府県][^\n\r]*?/,
    /[都道府県][^\n\r]*?[ホール|会館|センター|広場|公園|球場][^\n\r]*/
  ];
  
  for (const pattern of venuePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

function extractUniversalAccess(pageText: string, $: any): string {
  const accessPatterns = [
    /交通[アクセス]*[：:][^\n\r]*?[駅|線][^\n\r]*?/,
    /アクセス[：:][^\n\r]*?[駅|線][^\n\r]*?/,
    /[ＪＲ|JR|京成|東急|小田急][^\n\r]*?線[^\n\r]*?駅[^\n\r]*?/
  ];
  
  for (const pattern of accessPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

function extractUniversalOrganizer(pageText: string, $: any): string {
  const organizerPatterns = [
    /主催[：:][^\n\r]*?[委員会|協会|区|市|都|府|県][^\n\r]*/,
    /主办[：:][^\n\r]*?[委員会|協会|区|市|都|府|県][^\n\r]*/,
    /[実行委員会|観光協会|区役所|市役所][^\n\r]*/
  ];
  
  for (const pattern of organizerPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      const result = cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
      // 过滤掉包含网站信息的结果
      if (!result.includes('じゃらん') && !result.includes('最大級')) {
        return result;
      }
    }
  }
  
  return '';
}

function extractUniversalPrice(pageText: string, $: any): string {
  const pricePatterns = [
    /料金[：:][^\n\r]*?[無料|有料|円][^\n\r]*/,
    /入場[：:][^\n\r]*?[無料|有料|円][^\n\r]*/,
    /[観覧無料|入場無料|有料観覧席]/,
    /\d+円[^\n\r]*/
  ];
  
  for (const pattern of pricePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

function extractUniversalContact(pageText: string, $: any): string {
  const contactPatterns = [
    /問[い合わせ]*[：:][^\n\r]*?\d{2,4}-\d{4}-\d{4}[^\n\r]*/,
    /連絡先[：:][^\n\r]*?\d{2,4}-\d{4}-\d{4}[^\n\r]*/,
    /[コールセンター|お問い合わせ][^\n\r]*?\d{2,4}-\d{4}-\d{4}[^\n\r]*/
  ];
  
  for (const pattern of contactPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return cleanText(match[0].replace(/^[^：:]*[：:]/, ''));
    }
  }
  
  return '';
}

function extractUniversalWebsite(pageText: string, $: any): string {
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
async function extractCoordinates(data: any, url: string) {
  // 这里可以实现坐标提取逻辑
  // 暂时返回null，后续可以集成地图API
  return null;
} 