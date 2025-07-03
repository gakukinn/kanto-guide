import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: '请提供要解析的文本内容' 
      }, { status: 400 });
    }

    console.log('开始解析文本内容...');
    console.log('输入文本:', text);
    
    const result = parseJapaneseEventText(text);
    
    console.log('文本解析结果:', result);
    
    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('文本解析错误:', error);
    return NextResponse.json({ 
      success: false, 
      error: '文本解析失败',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 🔥 字段验证和纠错函数
function validateAndFixFields(data: any) {
  const fixed = { ...data };
  
  // 检查是否存在字段重复内容
  const fields = ['name', 'address', 'period', 'venue', 'access', 'organizer', 'price', 'contact', 'website'];
  
  // 检测时间信息错误分配到其他字段
  const timePattern = /\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}:\d{2}[\s～~\-]\d{1,2}:\d{2}|開始|開催期間/;
  
  // 如果venue字段包含时间信息，但period已有内容，清空venue中的时间部分
  if (fixed.venue && fixed.period && timePattern.test(fixed.venue)) {
    console.log('检测到venue字段包含时间信息，进行纠正...');
    console.log('原venue:', fixed.venue);
    console.log('现有period:', fixed.period);
    
    // 尝试从venue中提取真正的场所信息
    let venueText = fixed.venue;
    
    // 移除时间相关信息
    venueText = venueText.replace(/\d{4}年\d{1,2}月\d{1,2}日[^）】]*/, '');
    venueText = venueText.replace(/\d{1,2}:\d{2}[\s～~\-]\d{1,2}:\d{2}[^）】]*/, '');
    venueText = venueText.replace(/開催期間[^）】]*/, '');
    venueText = venueText.replace(/※[^）】]*/, '');
    
    // 提取可能的地点信息（第1会場、第2会場等）
    const venueMatch = venueText.match(/(第\d+会場[^）】]*|[^）】]*川[^）】]*|[^）】]*桥[^）】]*|[^）】]*公園[^）】]*)/);
    if (venueMatch) {
      fixed.venue = venueMatch[1].trim();
    } else {
      // 如果没有明确的地点信息，从原始文本重新推断
      fixed.venue = extractVenueFromText(data.venue, data.address);
    }
    
    console.log('修正后venue:', fixed.venue);
  }
  
  // 检查其他字段是否有重复内容
  for (let i = 0; i < fields.length; i++) {
    for (let j = i + 1; j < fields.length; j++) {
      const field1 = fields[i];
      const field2 = fields[j];
      
      if (fixed[field1] && fixed[field2] && fixed[field1] === fixed[field2]) {
        console.log(`检测到字段重复: ${field1} 和 ${field2}`);
        // 保留第一个字段，清空第二个
        fixed[field2] = '';
      }
    }
  }
  
  return fixed;
}

// 🔥 从文本中提取真正的场所信息
function extractVenueFromText(venueText: string, addressText: string) {
  if (!venueText) return '';
  
  // 提取隅田川花火大会的场所信息
  if (venueText.includes('隅田川') || addressText.includes('隅田川')) {
    // 检查是否包含具体的会场和桥梁信息
    const venues = [];
    
    if (venueText.includes('第1会場') || venueText.includes('浅草') || venueText.includes('言問')) {
      venues.push('第1会場/隅田川沿岸（浅草～言問橋下流）');
    }
    
    if (venueText.includes('第2会場') || venueText.includes('駒形') || venueText.includes('厩橋')) {
      venues.push('第2会場/隅田川沿岸（駒形橋～厩橋上流）');
    }
    
    if (venues.length > 0) {
      return venues.join('、');
    } else {
      return '隅田川沿岸（第1・第2会場）';
    }
  }
  
  // 其他通用场所提取
  const cleanVenue = venueText.replace(/\d{4}年.*/, '').replace(/\d{1,2}:\d{2}.*/, '').trim();
  return cleanVenue || '详见活动信息';
}

function parseJapaneseEventText(text: string) {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  console.log('解析行数:', lines.length);
  
  lines.forEach((line, index) => {
    console.log(`行${index + 1}:`, line.trim());
  });

  let result = {
    name: '',
    address: '',
    period: '',
    venue: '',
    access: '',
    organizer: '',
    price: '',
    contact: '',
    website: '',
    googleMaps: '',
    coordinates: null as { lat: number; lng: number } | null,
    coordsSource: ''
  };

  // 处理每一行
  for (const line of lines) {
    const cleanLine = line.trim();
    
    // 跳过无用行
    if (cleanLine.includes('観光MAP') || cleanLine.includes('印刷用MAP') || cleanLine.length < 3) {
      continue;
    }

    // 1. 名称 - 优化匹配和清理
    if (!result.name && (cleanLine.includes('名称') || cleanLine.match(/^[^\s\t]+\s*[（(]/))) {
      if (cleanLine.includes('名称')) {
        // 格式: "名称 活动名称" 或 "名称\t活动名称"
        result.name = cleanLine.replace(/^名称[\s\t]*/, '').trim();
      } else {
        // 直接是活动名称的情况
        result.name = cleanLine.trim();
      }
    }

    // 2. 地址 - 完整提取包括邮编
    if (!result.address && (cleanLine.includes('所在地') || cleanLine.match(/〒\d{3}[\s-]*\d{4}/))) {
      // 提取完整地址，包括邮编
      const addressMatch = cleanLine.match(/(〒\d{3}[\s-]*\d{4}[\s　]*[^　\s]+.*)/);
      if (addressMatch) {
        // 清理并格式化邮编
        result.address = addressMatch[1].replace(/〒(\d{3})[\s-]*(\d{4})/, '〒$1-$2').trim();
      } else if (cleanLine.includes('所在地')) {
        result.address = cleanLine.replace(/^所在地[\s\t]*/, '').trim();
      }
    }

    // 3. 开催期间
    if (!result.period && (cleanLine.includes('開催期間') || cleanLine.includes('期間'))) {
      result.period = cleanLine.replace(/^[^】]*開催期間[\s\t]*/, '').replace(/^期間[\s\t]*/, '').trim();
    }

        // 4. 开催场所 - 🔥 简单修复：跳过包含时间信息的行，避免活动名称混入
    if (!result.venue && (cleanLine.includes('開催場所') || cleanLine.includes('場所') || cleanLine.includes('会場'))) {
      // 简单检查：如果该行包含明显的时间信息，跳过
      if (cleanLine.includes('開催期間') || (cleanLine.includes('年') && cleanLine.includes('月') && cleanLine.includes('日'))) {
        // 跳过包含日期时间的行
        continue;
      }
      
      let venueText = cleanLine.replace(/^[^】]*開催場所[\s\t]*/, '')
                             .replace(/^場所[\s\t]*/, '')
                             .replace(/^会場[\s\t]*/, '').trim();
      
      // 🔥 避免将活动名称误识别为场所：如果包含活动名称，则跳过
      if (result.name && venueText.includes(result.name)) {
        continue;
      }
      
      result.venue = venueText;
    }

    // 5. 交通方式 - 清理前缀
    if (!result.access && (cleanLine.includes('交通アクセス') || cleanLine.includes('アクセス'))) {
      result.access = cleanLine.replace(/^[^】]*交通アクセス[\s\t]*/, '')
                            .replace(/^アクセス[\s\t]*/, '').trim();
    }

    // 6. 主办方
    if (!result.organizer && (cleanLine.includes('主催') || cleanLine.includes('主办'))) {
      result.organizer = cleanLine.replace(/^[^】]*主催[\s\t]*/, '')
                               .replace(/^主办[\s\t]*/, '').trim();
    }

    // 7. 料金
    if (!result.price && (cleanLine.includes('料金') || cleanLine.includes('入場料') || cleanLine.includes('参加費'))) {
      result.price = cleanLine.replace(/^[^】]*料金[\s\t]*/, '')
                           .replace(/^入場料[\s\t]*/, '')
                           .replace(/^参加費[\s\t]*/, '').trim();
    }

    // 8. 联系方式 - 智能提取
    if (!result.contact && (cleanLine.includes('問合せ') || cleanLine.includes('連絡先') || cleanLine.match(/\d{2,4}[-\s]\d{2,4}[-\s]\d{3,4}/))) {
      if (cleanLine.includes('問合せ') || cleanLine.includes('連絡先')) {
        result.contact = cleanLine.replace(/^[^】]*問合せ先[\s\t]*/, '')
                               .replace(/^連絡先[\s\t]*/, '').trim();
      } else {
        // 直接包含电话号码的行
        result.contact = cleanLine.trim();
      }
    }

    // 9. 官方网站 - 🔥 修复：只提取真实的URL，避免提取描述性文字
    if (!result.website) {
      // 优先匹配直接的URL
      const urlMatch = cleanLine.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        result.website = urlMatch[1];
      } else if (cleanLine.includes('ホームページ') && cleanLine.includes('http')) {
        // 包含"ホームページ"且包含http的行，提取URL
        const urlInLine = cleanLine.match(/(https?:\/\/[^\s]+)/);
        if (urlInLine) {
          result.website = urlInLine[1];
        }
      } else if (cleanLine.startsWith('ホームページ') && !cleanLine.includes('で要確認')) {
        // 只有当行以"ホームページ"开头且不包含描述性文字时才提取
        const websiteText = cleanLine.replace(/^ホームページ[\s\t]*/, '').trim();
        // 确保提取的内容看起来像URL或域名
        if (websiteText.includes('.') && !websiteText.includes('要確認') && !websiteText.includes('詳しく')) {
          result.website = websiteText;
        }
      }
    }
  }

  // 智能名称推断 - 如果没有明确的名称，从其他信息推断
  if (!result.name && result.venue) {
    // 从会场信息中提取可能的活动名称
    const venueText = result.venue;
    if (venueText.includes('花火大会') || venueText.includes('祭') || venueText.includes('フェスティバル')) {
      // 提取活动相关的关键词作为名称
      const nameMatch = venueText.match(/([^　\s]*(?:花火大会|祭|フェスティバル|事件)[^　\s]*)/);
      if (nameMatch) {
        result.name = nameMatch[1];
      }
    }
  }

  // 最终数据清理
  Object.keys(result).forEach(key => {
    if (typeof result[key as keyof typeof result] === 'string') {
      let value = result[key as keyof typeof result] as string;
      
      // 清理常见的前缀和后缀
      value = value.replace(/^[\s\t　]+|[\s\t　]+$/g, ''); // 清理空白字符
      value = value.replace(/^[：:]+|[：:]+$/g, ''); // 清理冒号
      value = value.replace(/^[　\s]*/, ''); // 清理全角空格
      
      (result as any)[key] = value;
    }
  });

  return result;
} 