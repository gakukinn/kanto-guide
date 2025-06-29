import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ 
        success: false, 
        message: '请提供网址' 
      });
    }

    // 验证是否为Jalan网站
    if (!url.includes('jalan.net')) {
      return NextResponse.json({ 
        success: false, 
        message: '请输入Jalan网站的活动页面网址' 
      });
    }

    console.log('开始识别内容简介:', url);

    // 获取网页内容，正确处理日文编码
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ 
        success: false, 
        message: '无法访问该网址' 
      });
    }

    // 获取响应的ArrayBuffer并正确解码
    const buffer = await response.arrayBuffer();
    
    // 尝试多种编码方式
    let html = '';
    try {
      // 首先尝试UTF-8
      const decoder = new TextDecoder('utf-8', { fatal: true });
      html = decoder.decode(buffer);
    } catch (error) {
      try {
        // 如果UTF-8失败，尝试Shift_JIS（日文常用编码）
        const decoder = new TextDecoder('shift_jis');
        html = decoder.decode(buffer);
        console.log('使用Shift_JIS编码解码');
      } catch (error) {
        try {
          // 最后尝试EUC-JP
          const decoder = new TextDecoder('euc-jp');
          html = decoder.decode(buffer);
          console.log('使用EUC-JP编码解码');
        } catch (error) {
          // 如果都失败，使用UTF-8但不抛出错误
          const decoder = new TextDecoder('utf-8');
          html = decoder.decode(buffer);
          console.log('使用UTF-8编码解码（可能有乱码）');
        }
      }
    }
    
    // 使用cheerio解析HTML
    const $ = cheerio.load(html);
    
    let description = '';
    
    // 方法1：寻找活动简介部分（について、詳細、概要等关键词）
    const aboutSelectors = [
      'div:contains("について") p',
      'div:contains("詳細") p', 
      'div:contains("概要") p',
      'div:contains("イベント内容") p',
      'div:contains("内容") p',
      'section:contains("について") p',
      'section:contains("詳細") p',
      '.event-description p',
      '.description p',
      '.detail-text p',
      '.event-detail p',
      '.content p'
    ];

    for (const selector of aboutSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        const text = element.text().trim();
        if (text.length > 30 && isValidJapaneseText(text)) {
          description = text;
          console.log('方法1找到描述:', description.substring(0, 100) + '...');
          break;
        }
      }
    }

    // 方法2：寻找包含花火相关关键词的较长段落
    if (!description) {
      $('p').each((i, elem) => {
        const text = $(elem).text().trim();
        
        // 检查是否包含活动相关关键词且文本足够长
        if (text.length > 50 && isValidJapaneseText(text) && (
          text.includes('花火') || 
          text.includes('祭') || 
          text.includes('開催') || 
          text.includes('イベント') ||
          text.includes('会場') ||
          text.includes('観客') ||
          text.includes('打ち上げ') ||
          text.includes('夏祭り') ||
          text.includes('納涼') ||
          text.includes('大会') ||
          text.includes('フェスティバル')
        )) {
          description = text;
          console.log('方法2找到描述:', description.substring(0, 100) + '...');
          return false; // 跳出each循环
        }
      });
    }

    // 方法3：从meta description获取
    if (!description) {
      const metaDesc = $('meta[name="description"]').attr('content');
      if (metaDesc && metaDesc.trim().length > 20 && isValidJapaneseText(metaDesc)) {
        description = metaDesc.trim();
        console.log('方法3找到描述:', description.substring(0, 100) + '...');
      }
    }

    // 方法4：寻找页面标题下方的描述文本
    if (!description) {
      const titleSelectors = ['h1', '.title', '.event-title', '.page-title'];
      for (const selector of titleSelectors) {
        const titleElement = $(selector).first();
        if (titleElement.length > 0) {
          // 查找标题后面的段落
          const nextElements = titleElement.nextAll('p').slice(0, 3);
          nextElements.each((i, elem) => {
            const text = $(elem).text().trim();
            if (text.length > 30 && isValidJapaneseText(text)) {
              description = text;
              console.log('方法4找到描述:', description.substring(0, 100) + '...');
              return false;
            }
          });
          if (description) break;
        }
      }
    }

    // 方法5：寻找div或section中的长文本
    if (!description) {
      $('div, section').each((i, elem) => {
        const text = $(elem).text().trim();
        // 检查是否是纯文本段落（不包含太多子元素）
        const childrenCount = $(elem).children().length;
        if (text.length > 100 && text.length < 500 && childrenCount < 3 && isValidJapaneseText(text) && (
          text.includes('花火') || 
          text.includes('祭') || 
          text.includes('開催') ||
          text.includes('イベント')
        )) {
          description = text;
          console.log('方法5找到描述:', description.substring(0, 100) + '...');
          return false;
        }
      });
    }

    console.log('最终提取到的内容简介:', description);

    if (!description) {
      return NextResponse.json({ 
        success: false, 
        message: '未能从该页面提取到活动简介内容' 
      });
    }

    // 清理和格式化描述文本
    description = description
      .replace(/\s+/g, ' ') // 合并多个空格
      .replace(/\n+/g, ' ') // 替换换行符
      .replace(/\t+/g, ' ') // 替换制表符
      .trim();

    return NextResponse.json({
      success: true,
      description: description,
      sourceUrl: url,
      extractedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('内容识别错误:', error);
    return NextResponse.json({ 
      success: false, 
      message: '处理过程中发生错误: ' + (error instanceof Error ? error.message : '未知错误')
    });
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