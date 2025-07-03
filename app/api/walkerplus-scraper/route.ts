import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 爬取三个页面URL（调试信息已注释）
    //// console.log('开始三重爬取URL:', url);

    // 生成三个URL
    const baseUrl = url.replace('/data.html', '').replace('/map.html', '').replace(/\/$/, '');
    const mainUrl = baseUrl + '/';
    const dataUrl = baseUrl + '/data.html';
    const mapUrl = baseUrl + '/map.html';
    
    //// console.log('主页面URL:', mainUrl);
    //// console.log('数据页面URL:', dataUrl);
    //// console.log('地图页面URL:', mapUrl);

    // 并行爬取三个页面
    const [mainResponse, dataResponse, mapResponse] = await Promise.all([
      fetch(mainUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
          'Cache-Control': 'no-cache'
        }
      }),
      fetch(dataUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
          'Cache-Control': 'no-cache'
        }
      }),
      fetch(mapUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
          'Cache-Control': 'no-cache'
        }
      })
    ]);

    if (!mainResponse.ok) {
      throw new Error(`主页面HTTP错误: ${mainResponse.status}`);
    }
    if (!dataResponse.ok) {
      throw new Error(`数据页面HTTP错误: ${dataResponse.status}`);
    }
    if (!mapResponse.ok) {
      throw new Error(`地图页面HTTP错误: ${mapResponse.status}`);
    }

    // 使用分离函数处理不同页面
    const mainResult = await scrapeMainPage(await mainResponse.text());
    const dataResult = await scrapeDataPage(await dataResponse.text());
    const mapResult = await scrapeMapPage(await mapResponse.text());

    // 最终合并结果（调试信息已注释）
    //// console.log('🔍 最终合并结果:');
    //// console.log('  标题:', mainResult.title);
    //// console.log('  描述长度:', mainResult.description ? mainResult.description.length : 0);
    //// console.log('  見どころ长度:', mainResult.highlights ? mainResult.highlights.length : 0);
    //// console.log('  官方网站:', dataResult.officialWebsite);
    //// console.log('  谷歌地图:', mapResult.googleMapUrl);

    // 🔧 重要调试：确认返回的数据结构
    const finalResult = {
      name: mainResult.title,
      description: mainResult.description,
      highlights: mainResult.highlights,
      officialWebsite: dataResult.officialWebsite,
      googleMapUrl: mapResult.googleMapUrl,
      sourceUrl: mainUrl,
      extractedAt: new Date().toISOString()
    };
    
    // 返回给前端的数据（调试信息已注释）
    //// console.log('🚀 即将返回给前端的数据:');
    //// console.log('  name:', finalResult.name);
    //// console.log('  description:', finalResult.description);
    //// console.log('  highlights:', finalResult.highlights);

    return NextResponse.json(finalResult);



  } catch (error) {
    console.error('爬取错误:', error);
    return NextResponse.json({ 
      error: '处理过程中发生错误: ' + (error instanceof Error ? error.message : '未知错误')
    }, { status: 500 });
  }
}

// 辅助函数：检查文本是否为有效的日文文本
function isValidJapaneseText(text: string): boolean {
  // 检查是否包含日文字符
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
  
  // 检查是否不是乱码（乱码通常包含很多特殊字符）
  const specialCharRatio = (text.match(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\w\s\d.,!?()（）「」。、]/g) || []).length / text.length;
  
  return hasJapanese && specialCharRatio < 0.3; // 特殊字符比例小于30%
}

// 辅助函数：检查文本是否包含不需要的内容
function containsUnwantedContent(text: string): boolean {
  const unwantedKeywords = [
    'ツアー', '販売中', 'ホテル', 'セット', 'プラン', '予約', 
    'お得な', 'ランキング', '人気', 'おすすめ', '関連記事',
    'アクセス', '最寄り駅', '交通規制', '地図', '会場アクセス'
  ];
  
  return unwantedKeywords.some(keyword => text.includes(keyword));
}

// 页面类型自动分类函数
function analyzePageStructure(html: string) {
  const $ = cheerio.load(html);
  
  const features = {
    hasDetailSection: $('.s_detail').length > 0,
    hasAddQrSection: $('.add_qr').length > 0,
    hasEventInfo: $('.event-info').length > 0,
    hasContentMain: $('.content-main').length > 0,
    paragraphCount: $('p').length,
    divCount: $('div').length,
    hasTable: $('table').length > 0,
    hasDataList: $('.data-list, .info-list').length > 0,
    titlePattern: $('h1').first().text().trim()
  };
  
  // 基于特征判断页面类型
  let pageType = 'unknown';
  
  if (features.hasDetailSection && features.hasAddQrSection) {
    pageType = 'standard'; // 标准类型（如鎌倉、江戸川）
  } else if (features.hasEventInfo || features.hasContentMain) {
    pageType = 'modern'; // 现代类型（如東京競馬場）
  } else if (features.hasTable || features.hasDataList) {
    pageType = 'structured'; // 结构化类型
  } else if (features.paragraphCount > 10) {
    pageType = 'content-rich'; // 内容丰富类型
  }
  
  // 页面结构分析（调试信息已注释）
  //// console.log('页面结构分析:', { pageType, paragraphCount: features.paragraphCount });
  
  return { pageType, features };
}

// 基于页面类型的描述提取策略
function getDescriptionByPageType(html: string, pageType: string) {
  const $ = cheerio.load(html);
  let description = '';
  
  switch (pageType) {
    case 'standard':
      // 标准类型：优先使用.s_detail.add_qr > p.s_detail
      const standardDesc = $('.s_detail.add_qr > p.s_detail').text().trim();
      if (standardDesc && standardDesc.length > 50) {
        description = standardDesc;
        //// console.log('标准类型CSS选择器成功:', description.substring(0, 100) + '...');
      }
      break;
      
    case 'modern':
      // 现代类型：尝试多种选择器
      const selectors = [
        '.event-description p',
        '.content-main p',
        '.description p',
        '.event-info .description',
        '.main-content p'
      ];
      
      for (const selector of selectors) {
        const text = $(selector).first().text().trim();
        if (text && text.length > 50 && isValidJapaneseText(text)) {
          description = text;
          //// console.log(`现代类型选择器 ${selector} 成功:`, description.substring(0, 100) + '...');
          break;
        }
      }
      break;
      
    case 'structured':
      // 结构化类型：从表格或列表中提取
      $('td, .data-item, .info-content').each((i: any, elem: any) => {
        const text = $(elem).text().trim();
        if (text.length > 100 && text.length < 800 && isValidJapaneseText(text)) {
          description = text;
          //// console.log('结构化类型提取成功:', description.substring(0, 100) + '...');
          return false;
        }
      });
      break;
      
    case 'content-rich':
      // 内容丰富类型：智能段落分析
      $('p').each((i: any, elem: any) => {
        const text = $(elem).text().trim();
        if (text.length > 150 && text.length < 800 && 
            isValidJapaneseText(text) && !containsUnwantedContent(text)) {
          description = text;
          //// console.log('内容丰富类型提取成功:', description.substring(0, 100) + '...');
          return false;
        }
      });
      break;
  }
  
  return description;
}

// 主页面爬取函数 - 获取标题、内容简介、見どころ
async function scrapeMainPage(html: string) {
  const $ = cheerio.load(html);
  
  // 提取页面标题
  const title = $('h1').first().text().trim() || '未识别';
  
  // 第一步：页面结构自动分析
  const { pageType, features } = analyzePageStructure(html);
  
  // 第二步：基于页面类型提取描述
  let description = getDescriptionByPageType(html, pageType);
  
  // Fallback：如果页面类型分析没找到，使用原来的六层搜索策略
  if (!description) {
    //// console.log(`${pageType}类型分析未找到内容简介，使用fallback搜索...`);
    
    // 第一层：优先搜索包含详细活动信息的段落（150-800字符）
    $('p, div').each((i: any, elem: any) => {
      const text = $(elem).text().trim();
      const childrenCount = $(elem).children().length;
      
      if (text.length > 150 && text.length < 800 && childrenCount < 5 &&
          isValidJapaneseText(text) && !containsUnwantedContent(text) && (
        text.includes('花火大会') || 
        text.includes('打ち上げ') || 
        text.includes('開催') ||
        text.includes('会場') ||
        text.includes('観覧') ||
        text.includes('見どころ') ||
        text.includes('魅力') ||
        text.includes('特色') ||
        text.includes('プログラム')
      )) {
        description = text;
        //// console.log('第一层搜索找到描述:', description.substring(0, 100) + '...');
        return false;
      }
    });

    // 第二层：搜索表格或结构化数据中的描述信息
    if (!description) {
      $('td, th, .data-item, .info-item').each((i: any, elem: any) => {
        const text = $(elem).text().trim();
        
        if (text.length > 100 && text.length < 600 && 
            isValidJapaneseText(text) && !containsUnwantedContent(text) && (
          text.includes('水中花火') || 
          text.includes('海上') || 
          text.includes('扇状') ||
          text.includes('伝統') ||
          text.includes('職人技') ||
          text.includes('唯一無二')
        )) {
          description = text;
// console.log('第二层搜索找到描述:', description.substring(0, 100) + '...');
          return false;
        }
      });
    }

    // 第三层：从meta标签或页面描述中搜索
    if (!description) {
      const metaDesc = $('meta[name="description"]').attr('content');
      if (metaDesc && metaDesc.trim().length > 50 && metaDesc.trim().length < 400 && 
          isValidJapaneseText(metaDesc) && !containsUnwantedContent(metaDesc)) {
        description = metaDesc.trim();
// console.log('第三层搜索找到描述:', description.substring(0, 100) + '...');
      }
    }

    // 第四层：搜索包含特色描述的内容
    if (!description) {
      $('p, div, span').each((i: any, elem: any) => {
        const text = $(elem).text().trim();
        
        if (text.length > 80 && text.length < 500 && 
            isValidJapaneseText(text) && !containsUnwantedContent(text) && (
          text.includes('テーマに') || 
          text.includes('実施され') || 
          text.includes('花火プログラム') ||
          text.includes('事件の開催') ||
          text.includes('祭典') ||
          text.includes('公園') ||
          text.includes('競馬場')
        )) {
          description = text;
// console.log('第四层搜索找到描述:', description.substring(0, 100) + '...');
          return false;
        }
      });
    }

    // 第五层：更宽泛的搜索（80-500字符）
    if (!description) {
      $('p, div').each((i: any, elem: any) => {
        const text = $(elem).text().trim();
        
        if (text.length > 80 && text.length < 500 && 
            isValidJapaneseText(text) && !containsUnwantedContent(text) && (
          text.includes('花火') || 
          text.includes('祭') || 
          text.includes('開催') ||
          text.includes('事件')
        )) {
          description = text;
// console.log('第五层搜索找到描述:', description.substring(0, 100) + '...');
          return false;
        }
      });
    }

    // 第六层：从句子中搜索（60-300字符）
    if (!description) {
      $('*').each((i: any, elem: any) => {
        const text = $(elem).text().trim();
        const childrenCount = $(elem).children().length;
        
        if (text.length > 60 && text.length < 300 && childrenCount === 0 &&
            isValidJapaneseText(text) && !containsUnwantedContent(text) && (
          text.includes('花火') || text.includes('開催')
        )) {
          description = text;
// console.log('第六层搜索找到描述:', description.substring(0, 100) + '...');
          return false;
        }
      });
    }
  }

  // 🔧 修复：提取見どころ - 改进CSS选择器逻辑
  let highlights = '';
  
// console.log('🔍 開始見どころ提取...');
  
  // 第一策略：查找標題為"見どころ"的相鄰內容
  $('h1, h2, h3, h4, h5, h6, .title, .heading').each((i: any, elem: any) => {
    const titleText = $(elem).text().trim();
    if (titleText === '見どころ' || titleText.includes('見どころ')) {
// console.log('🎯 找到見どころ標題:', titleText);
      
      // 查找下一個兄弟元素
      const nextSibling = $(elem).next();
      if (nextSibling.length > 0) {
        const content = nextSibling.text().trim();
        if (content.length > 20 && content.length < 500 && isValidJapaneseText(content)) {
          highlights = content;
// console.log('✅ 策略1成功 - 下一兄弟元素:', content.substring(0, 100) + '...');
          return false;
        }
      }
      
      // 查找父級元素的下一個兄弟
      const parentNext = $(elem).parent().next();
      if (parentNext.length > 0) {
        const content = parentNext.text().trim();
        if (content.length > 20 && content.length < 500 && isValidJapaneseText(content)) {
          highlights = content;
// console.log('✅ 策略1成功 - 父級下一兄弟:', content.substring(0, 100) + '...');
          return false;
        }
      }
    }
  });

  // 第二策略：查找包含見どころ但排除標題的內容
  if (!highlights) {
// console.log('🔍 策略2：查找包含見どころ的內容段落...');
    $('p, div').each((i: any, elem: any) => {
      const text = $(elem).text().trim();
      const hasTitle = $(elem).find('h1, h2, h3, h4, h5, h6').length > 0;
      
      if (!hasTitle && text.includes('見どころ') && text.length > 50 && text.length < 400 && 
          isValidJapaneseText(text) && !containsUnwantedContent(text)) {
        // 移除"見どころ"標題部分
        highlights = text.replace(/見どころ\s*[:：]?\s*/g, '').trim();
// console.log('✅ 策略2成功:', highlights.substring(0, 100) + '...');
        return false;
      }
    });
  }

  // 第三策略：搜索特色描述關鍵詞
  if (!highlights) {
// console.log('🔍 策略3：查找特色描述...');
    $('p, div').each((i: any, elem: any) => {
      const text = $(elem).text().trim();
      
      if (text.length > 50 && text.length < 300 && 
          isValidJapaneseText(text) && !containsUnwantedContent(text) && (
        text.includes('水中花火') || 
        text.includes('音楽') || 
        text.includes('ライブ') || 
        text.includes('観覧') ||
        text.includes('特色') ||
        text.includes('魅力') ||
        text.includes('ワイドスターマイン') ||
        text.includes('オープニング') ||
        text.includes('フィナーレ') ||
        text.includes('記念した花火')
      )) {
        highlights = text;
// console.log('✅ 策略3成功:', highlights.substring(0, 100) + '...');
        return false;
      }
    });
  }

// console.log('🏁 見どころ提取結果:', highlights || '未找到');

  // 清理和格式化文本
  if (description) {
    description = description
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .replace(/\t+/g, ' ')
      .trim();
  }

  if (highlights) {
    highlights = highlights
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .replace(/\t+/g, ' ')
      .replace(/^見どころ\s*/, '') // 删除开头的"見どころ "前缀
      .trim();
  }

  return {
    title,
    description: description || '未识别',
    highlights: highlights || '未识别'
  };
}

// 数据页面爬取函数 - 获取官方网站
async function scrapeDataPage(html: string) {
  const $ = cheerio.load(html);
  
  // 数据页面分析（调试信息已注释）
  //// console.log('Data页面内容片段:', $('body').text().substring(0, 200) + '...');
  //// console.log('页面链接数量:', $('a').length);
  
  let officialWebsite = '';
  
  // 多策略搜索官方网站
  const strategies = [
    // 策略1：直接搜索包含关键词的链接
    () => {
      $('a').each((i: any, elem: any) => {
        const href = $(elem).attr('href');
        const text = $(elem).text().trim();
        const parentText = $(elem).parent().text().trim();
        
        if (href && (
          text.includes('官方网站') || 
          text.includes('関連サイト') || 
          text.includes('公式ホームページ') ||
          text.includes('詳細はこちら') ||
          text.includes('オフィシャルサイト') ||
          text.includes('公式WEB') ||
          text.includes('公式HP') ||
          text.includes('官方网站ほか') ||
          text.includes('関連サイトはこちら') ||
          parentText.includes('官方网站ほか') ||
          parentText.includes('関連サイトはこちら')
        )) {
          if (href.startsWith('http')) {
            officialWebsite = href;
            //// console.log('策略1找到官方网站:', officialWebsite);
            return false;
          }
        }
      });
    },
    
    // 策略2：搜索表格中的官方网站信息
    () => {
      $('table tr').each((i: any, elem: any) => {
        const cellText = $(elem).find('td, th').first().text().trim();
        if (cellText.includes('公式') || cellText.includes('サイト') || cellText.includes('HP')) {
          const link = $(elem).find('a').attr('href');
          if (link && link.startsWith('http')) {
            officialWebsite = link;
            //// console.log('策略2找到官方网站:', officialWebsite);
            return false;
          }
        }
      });
    },
    
    // 策略3：搜索包含主办方域名的链接
    () => {
      $('a[href^="http"]').each((i: any, elem: any) => {
        const href = $(elem).attr('href');
        if (href && (
          href.includes('.city.') ||
          href.includes('.go.jp') ||
          href.includes('.or.jp') ||
          href.includes('hanabi') ||
          href.includes('fireworks') ||
          href.includes('matsuri')
        ) && !href.includes('walkerplus.com')) {
          officialWebsite = href;
          //// console.log('策略3找到官方网站:', officialWebsite);
          return false;
        }
      });
    }
  ];
  
  // 依次执行策略直到找到结果
  for (const strategy of strategies) {
    if (!officialWebsite) {
      strategy();
    }
  }

  return {
    officialWebsite: officialWebsite || '未识别'
  };
}

// 地图页面爬取函数 - 获取谷歌地图位置
async function scrapeMapPage(html: string) {
  const $ = cheerio.load(html);
  
  // 地图页面分析（调试信息已注释）
  //// console.log('Map页面内容片段:', $('body').text().substring(0, 200) + '...');
  //// console.log('页面iframe数量:', $('iframe').length);
  
  let googleMapUrl = '';
  
  // 多策略搜索谷歌地图
  const mapStrategies = [
    // 策略1：搜索iframe中的谷歌地图
    () => {
      $('iframe').each((i: any, elem: any) => {
        const src = $(elem).attr('src');
        if (src && (
          src.includes('google.com/maps') ||
          src.includes('maps.google.com') ||
          src.includes('maps.googleapis.com')
        )) {
          googleMapUrl = src;
          //// console.log('策略1找到谷歌地图iframe:', googleMapUrl);
          return false;
        }
      });
    },
    
    // 策略2：搜索链接中的谷歌地图
    () => {
      $('a').each((i: any, elem: any) => {
        const href = $(elem).attr('href');
        if (href && (
          href.includes('google.com/maps') ||
          href.includes('maps.google.com') ||
          href.includes('goo.gl/maps') ||
          href.includes('maps.app.goo.gl')
        )) {
          googleMapUrl = href;
          //// console.log('策略2找到谷歌地图链接:', googleMapUrl);
          return false;
        }
      });
    },
    
    // 策略3：搜索JavaScript中的地图配置
    () => {
      $('script').each((i: any, elem: any) => {
        const scriptContent = $(elem).html() || '';
        const mapMatch = scriptContent.match(/maps\.google\.com[^"'\s]+/);
        if (mapMatch) {
          googleMapUrl = 'https://' + mapMatch[0];
          //// console.log('策略3找到JS中的谷歌地图:', googleMapUrl);
          return false;
        }
      });
    },
    
    // 策略4：搜索data属性中的地图信息
    () => {
      $('[data-map], [data-location], [data-coordinates]').each((i: any, elem: any) => {
        const mapData = $(elem).attr('data-map') || $(elem).attr('data-location');
        if (mapData && mapData.includes('google')) {
          googleMapUrl = mapData;
          //// console.log('策略4找到data属性中的地图:', googleMapUrl);
          return false;
        }
      });
    }
  ];
  
  // 依次执行策略直到找到结果
  for (const strategy of mapStrategies) {
    if (!googleMapUrl) {
      strategy();
    }
  }

  return {
    googleMapUrl: googleMapUrl || '未识别'
  };
} 
