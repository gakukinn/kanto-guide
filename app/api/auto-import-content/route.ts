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
    
    // 🎯 新策略：优先查找"について"标题后的段落内容
    console.log('策略1: 查找"について"标题后的段落内容');
    
    // 策略1：直接查找"について"标题后的段落
    const aboutSelectors = [
      // 查找包含"について"的标题，然后找其后的段落
      'h1:contains("について") + p',
      'h2:contains("について") + p', 
      'h3:contains("について") + p',
      'h4:contains("について") + p',
      'h5:contains("について") + p',
      
      // 查找"について"标题后的div中的段落
      'h1:contains("について") + div p',
      'h2:contains("について") + div p',
      'h3:contains("について") + div p', 
      'h4:contains("について") + div p',
      
      // 查找"について"标题的下一个兄弟元素中的文本
      'h1:contains("について") ~ p',
      'h2:contains("について") ~ p',
      'h3:contains("について") ~ p'
    ];

    for (const selector of aboutSelectors) {
      try {
        const elements = $(selector);
        if (elements.length > 0) {
          // 获取第一个匹配元素的文本
          let text = elements.first().text().trim();
          
          if (text.length > 50 && isValidJapaneseText(text)) {
            description = text;
            console.log('策略1成功 - 选择器:', selector);
            console.log('找到内容:', description.substring(0, 100) + '...');
            break;
          }
          
          // 如果第一个段落太短，尝试获取多个段落的组合
          if (elements.length > 1) {
            const combinedText = elements.slice(0, 3).map((i, elem) => $(elem).text().trim()).get().join(' ');
            if (combinedText.length > 100 && isValidJapaneseText(combinedText)) {
              description = combinedText;
              console.log('策略1成功（组合段落） - 选择器:', selector);
              console.log('找到内容:', description.substring(0, 100) + '...');
              break;
            }
          }
        }
      } catch (error) {
        console.log('选择器出错:', selector, (error as Error).message);
        continue;
      }
    }

    // 策略2：查找包含"について"的section或div内的段落
    if (!description) {
      console.log('策略2: 查找包含"について"的容器内的段落');
      
      const containerSelectors = [
        'section:contains("について") p',
        'div:contains("について") p',
        'article:contains("について") p',
        '.about p',
        '.description p',
        '.detail p',
        '.content p'
      ];

      for (const selector of containerSelectors) {
        try {
          const elements = $(selector);
          if (elements.length > 0) {
            // 找最长的段落
            let longestText = '';
            elements.each((i, elem) => {
              const text = $(elem).text().trim();
              if (text.length > longestText.length && text.length > 50 && isValidJapaneseText(text)) {
                longestText = text;
              }
            });
            
            if (longestText) {
              description = longestText;
              console.log('策略2成功 - 选择器:', selector);
              console.log('找到内容:', description.substring(0, 100) + '...');
              break;
            }
          }
        } catch (error) {
          console.log('选择器出错:', selector, (error as Error).message);
          continue;
        }
      }
    }

    // 策略3：查找所有段落，按长度和质量排序
    if (!description) {
      console.log('策略3: 查找最佳质量的段落');
      
      interface ParagraphInfo {
        text: string;
        length: number;
        quality: number;
      }
      
      const allParagraphs: ParagraphInfo[] = [];
      $('p').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.length > 80 && text.length < 800 && isValidJapaneseText(text)) {
          allParagraphs.push({
            text: text,
            length: text.length,
            quality: calculateTextQuality(text)
          });
        }
      });
      
      // 按质量和长度排序
      allParagraphs.sort((a, b) => b.quality - a.quality);
      
      if (allParagraphs.length > 0) {
        description = allParagraphs[0].text;
        console.log('策略3成功 - 选择最佳段落');
        console.log('找到内容:', description.substring(0, 100) + '...');
      }
    }

    // 策略4：从meta description获取（最后备选）
    if (!description) {
      console.log('策略4: 尝试meta description');
      const metaDesc = $('meta[name="description"]').attr('content');
      if (metaDesc && metaDesc.trim().length > 30 && isValidJapaneseText(metaDesc)) {
        description = metaDesc.trim();
        console.log('策略4成功 - meta description');
        console.log('找到内容:', description.substring(0, 100) + '...');
      }
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

// 新增：计算文本质量分数
function calculateTextQuality(text: string): number {
  let score = 0;
  
  // 基础长度分（100-400字为最佳长度）
  if (text.length >= 100 && text.length <= 400) {
    score += 50;
  } else if (text.length >= 50 && text.length <= 600) {
    score += 30;
  } else {
    score += 10;
  }
  
  // 句子完整性分（包含句号、感叹号等）
  const sentences = text.match(/[。！？]/g);
  if (sentences && sentences.length >= 2) {
    score += 20;
  }
  
  // 内容丰富性分（包含多种词性）
  const hasTimeWords = /年間|時代|期間|毎年|開催|行われ/.test(text);
  const hasLocationWords = /地区|神社|会場|場所|商店街/.test(text);
  const hasEventWords = /まつり|祭|イベント|行事|催し/.test(text);
  
  if (hasTimeWords) score += 10;
  if (hasLocationWords) score += 10;  
  if (hasEventWords) score += 10;
  
  return score;
} 