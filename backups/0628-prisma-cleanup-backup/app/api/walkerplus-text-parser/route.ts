import { NextRequest, NextResponse } from 'next/server';

// WalkerPlus格式解析结果接口
interface WalkerPlusData {
  // 基本信息
  eventName: string;           // 大会名
  fireworksCount: string;      // 打ち上げ数
  fireworksDuration: string;   // 打ち上げ時間
  expectedVisitors: string;    // 例年の人出
  eventPeriod: string;         // 開催期間
  eventTime: string;           // 開催時間
  weatherPolicy: string;       // 荒天の場合
  paidSeats: string;           // 有料席
  foodStalls: string;          // 屋台など
  otherNotes: string;          // その他・全体備考
  
  // 会场信息
  venue: string;               // 会場
  venueAccess: string;         // 会場アクセス
  parking: string;             // 駐車場
  officialSite: string;        // 公式サイト
  contactInfo: string;         // 問い合わせ
  
  // 自动提取的信息
  detectedRegion: string;      // 自动识别的地区
  detectedActivityType: string; // 自动识别的活动类型
  
  // 💡 新增：直接存储解析的内容简介
  parsedDescription: string;   // 解析的内容简介
  
  // 转换为标准格式的数据
  standardData: {
    name: string;
    address: string;
    datetime: string;
    venue: string;
    access: string;
    organizer: string;
    price: string;
    contact: string;
    website: string;
    googleMap: string;
    region: string;
    description: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: '请提供有效的文本内容' }, { status: 400 });
    }

    // 解析WalkerPlus格式文本
    const parsedData = parseWalkerPlusText(text);

    // 返回完整数据，包括原始格式和标准格式
    return NextResponse.json({
      success: true,
      data: parsedData.standardData,
      rawData: parsedData,
      // 添加按WalkerPlus原始格式的显示文本
      displayText: buildWalkerPlusDisplay(parsedData),
      // 添加分解的13项字段用于前端显示
      walkerFields: buildWalkerFieldsArray(parsedData)
    });

  } catch (error) {
    console.error('WalkerPlus文本解析错误:', error);
    return NextResponse.json(
      { error: '文本解析失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}

// WalkerPlus文本解析函数
function parseWalkerPlusText(text: string): WalkerPlusData {
  // 初始化结果对象
  const result: WalkerPlusData = {
    eventName: '',
    fireworksCount: '',
    fireworksDuration: '',
    expectedVisitors: '',
    eventPeriod: '',
    eventTime: '',
    weatherPolicy: '',
    paidSeats: '',
    foodStalls: '',
    otherNotes: '',
    venue: '',
    venueAccess: '',
    parking: '',
    officialSite: '',
    contactInfo: '',
    detectedRegion: '',
    detectedActivityType: '',
    parsedDescription: '', // 💡 新增字段初始化
    standardData: {
      name: '',
      address: '',
      datetime: '',
      venue: '',
      access: '',
      organizer: '',
      price: '',
      contact: '',
      website: '',
      googleMap: '',
      region: '',
      description: ''
    }
  };

  // 按行分割文本，保留空白行用于判断结构
  const lines = text.split('\n').map(line => line.trim());

  let currentField = ''; // 跟踪当前字段，用于处理多行内容
  let inSpotInfo = false; // 是否在スポット情報部分

  // 解析每一行
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 跳过空行
    if (!line) {
      continue;
    }
    
    // 检查是否是分组标题
    if (line === 'スポット情報：' || line === 'スポット情報' || line === '基本情報' || line === '詳細情報') {
      inSpotInfo = (line.includes('スポット'));
      currentField = '';
      continue;
    }

    // 改进的分隔符检测：支持制表符、多个空格、或冒号分隔
    let key = '', value = '';
    if (line.includes('\t')) {
      [key, value] = line.split('\t', 2);
    } else {
      const colonMatch = line.match(/^([^：]+)：\s*(.*)$/);
      if (colonMatch) {
        key = colonMatch[1];
        value = colonMatch[2];
      } else {
        const spaceMatch = line.match(/^([^\s]+)\s{2,}(.+)$/);
        if (spaceMatch) {
          key = spaceMatch[1];
          value = spaceMatch[2];
        }
      }
    }
    
    // 如果找到了键值对
    if (key && value !== undefined) {
      const cleanKey = key.trim();
      const cleanValue = value ? value.trim() : '';
      currentField = cleanKey; // 更新当前字段

      // 根据键名映射到对应字段
      switch (cleanKey) {
        case '大会名':
          result.eventName = cleanValue;
          break;
        case '打ち上げ数':
          result.fireworksCount = cleanValue;
          break;
        case '打ち上げ時間':
          result.fireworksDuration = cleanValue;
          break;
        case '例年の人出':
          result.expectedVisitors = cleanValue;
          break;
        case '開催期間':
          result.eventPeriod = cleanValue;
          break;
        case '開催時間':
          result.eventTime = cleanValue;
          break;
        case '荒天の場合':
          result.weatherPolicy = cleanValue;
          break;
        case '有料席':
          result.paidSeats = cleanValue;
          break;
        case '屋台など':
          result.foodStalls = cleanValue;
          break;
        case 'その他・全体備考':
        case '見どころ':
        case 'みどころ':
          result.otherNotes = cleanValue;
          break;
        case '会場':
          result.venue = cleanValue;
          break;
        case '会場アクセス':
          result.venueAccess = cleanValue;
          break;
        case '駐車場':
          result.parking = cleanValue;
          break;
        case '内容簡介':
        case '内容简介':
        case '活動簡介':
        case '活动简介':
        case '簡介':
        case '简介':
        case 'description':
          // 将内容简介存储到parsedDescription字段中
          result.parsedDescription = cleanValue;
          break;
        case '公式サイト':
          result.officialSite = cleanValue;
          break;
        case '問い合わせ':
        case '問い合わせ２':
        case '問い合わせ先':
        case 'お問い合わせ':
          result.contactInfo = cleanValue;
          break;
        default:
          // 其他未知字段，不处理，绝不编造信息
          break;
      }
    }
    // 处理续行内容（没有键值对格式的行）
    else if (line.length > 0 && currentField) {
      // 根据当前字段添加续行内容
      switch (currentField) {
        case '開催時間':
          // 如果是开催时间的续行（如17:00開場）
          if (result.eventTime) {
            result.eventTime += '\n' + line;
          } else {
            result.eventTime = line;
          }
          break;
        case '有料席':
          // 如果是有料席的续行（详细价格信息）
          if (result.paidSeats) {
            result.paidSeats += '\n' + line;
          } else {
            result.paidSeats = line;
          }
          break;
        case '荒天の場合':
          // 如果是荒天情况的续行
          if (result.weatherPolicy) {
            result.weatherPolicy += '\n' + line;
          } else {
            result.weatherPolicy = line;
          }
          break;
        case 'その他・全体備考':
        case '見どころ':
        case 'みどころ':
          // 如果是备考的续行
          if (result.otherNotes) {
            result.otherNotes += '\n' + line;
          } else {
            result.otherNotes = line;
          }
          break;
        case '内容簡介':
        case '内容简介':
        case '活動簡介':
        case '活动简介':
        case '簡介':
        case '简介':
        case 'description':
          // 如果是内容简介的续行
          if (result.parsedDescription) {
            result.parsedDescription += '\n' + line;
          } else {
            result.parsedDescription = line;
          }
          break;
        default:
          // 其他情况，不处理，绝不编造信息
          break;
      }
    }
  }

  // 自动识别地区
  result.detectedRegion = detectRegion(result.venue + ' ' + result.venueAccess);
  
  // 自动识别活动类型
  result.detectedActivityType = detectActivityType(result.eventName + ' ' + result.fireworksCount + ' ' + result.fireworksDuration);

  // 转换为标准格式
  result.standardData = convertToStandardFormat(result);

  return result;
}

// 地区识别函数
function detectRegion(locationText: string): string {
  const text = locationText.toLowerCase();
  
  if (text.includes('東京') || text.includes('tokyo') || text.includes('新宿') || text.includes('渋谷') || 
      text.includes('池袋') || text.includes('府中') || text.includes('競馬場')) {
    return 'tokyo';
  } else if (text.includes('埼玉') || text.includes('saitama') || text.includes('大宮') || text.includes('川越')) {
    return 'saitama';
  } else if (text.includes('千葉') || text.includes('chiba') || text.includes('船橋') || text.includes('柏')) {
    return 'chiba';
  } else if (text.includes('神奈川') || text.includes('kanagawa') || text.includes('横浜') || text.includes('川崎')) {
    return 'kanagawa';
  } else if (text.includes('茨城') || text.includes('栃木') || text.includes('群馬')) {
    return 'kitakanto';
  } else if (text.includes('山梨') || text.includes('長野') || text.includes('新潟')) {
    return 'koshinetsu';
  }
  
  return 'tokyo'; // 默认为东京
}

// 活动类型识别函数
function detectActivityType(eventText: string): string {
  const text = eventText.toLowerCase();
  
  // 优先检查花火相关关键词
  if (text.includes('花火') || text.includes('fireworks') || text.includes('打ち上げ')) {
    return 'hanabi';
  } else if (text.includes('祭') || text.includes('matsuri') || text.includes('festival')) {
    return 'matsuri';
  } else if (text.includes('桜') || text.includes('花見') || text.includes('hanami') || text.includes('cherry')) {
    return 'hanami';
  } else if (text.includes('紅葉') || text.includes('もみじ') || text.includes('autumn') || text.includes('fall')) {
    return 'momiji';
  } else if (text.includes('イルミネーション') || text.includes('illumination') || text.includes('light')) {
    return 'illumination';
  } else if (text.includes('文化') || text.includes('芸術') || text.includes('art') || text.includes('culture')) {
    return 'culture';
  }
  
  return 'hanabi'; // 默认为花火
}

// 转换为标准格式函数
function convertToStandardFormat(walkerData: WalkerPlusData): WalkerPlusData['standardData'] {
  const standard = {
    name: walkerData.eventName || '',
    address: extractAddress(walkerData.venueAccess) || '',
    datetime: combineDateTime(walkerData.eventPeriod, walkerData.eventTime),
    venue: walkerData.venue || '',
    access: walkerData.venueAccess || '',
    organizer: '', // 不编造，只使用实际存在的信息
    price: walkerData.paidSeats || '',
    contact: buildContactInfo(walkerData),
    website: walkerData.officialSite || '',
    googleMap: '', // 需要单独处理
    region: walkerData.detectedRegion,
    description: walkerData.parsedDescription || ''
  };

  return standard;
}

// 从访问信息中提取地址
function extractAddress(accessInfo: string): string {
  // 尝试从访问信息中提取地址
  // 例如：【电车】京王线府中競馬正門前駅から徒歩2分MAP
  const match = accessInfo.match(/【[^】]+】(.+?)(?:MAP|から|より)/);
  if (match) {
    return match[1].trim();
  }
  return accessInfo;
}

// 合并日期和时间
function combineDateTime(period: string, time: string): string {
  if (period && time) {
    return period + ' ' + time;
  }
  return period || time || '';
}

// 构建联系信息
function buildContactInfo(walkerData: WalkerPlusData): string {
  // 优先使用專門的問い合わせ字段
  if (walkerData.contactInfo) {
    return walkerData.contactInfo;
  }
  
  // 如果没有專門的联系信息，则使用其他相关信息
  const contactParts = [];
  
  if (walkerData.fireworksCount) {
    contactParts.push('打ち上げ数: ' + walkerData.fireworksCount);
  }
  
  if (walkerData.fireworksDuration) {
    contactParts.push('打ち上げ時間: ' + walkerData.fireworksDuration);
  }
  
  if (walkerData.expectedVisitors) {
    contactParts.push('例年の人出: ' + walkerData.expectedVisitors);
  }
  
  if (walkerData.weatherPolicy) {
    contactParts.push('荒天の場合: ' + walkerData.weatherPolicy);
  }
  
  if (walkerData.foodStalls) {
    contactParts.push('屋台など: ' + walkerData.foodStalls);
  }
  
  if (walkerData.parking) {
    contactParts.push('駐車場: ' + walkerData.parking);
  }
  
  if (walkerData.otherNotes) {
    contactParts.push('その他・全体備考: ' + walkerData.otherNotes);
  }
  
  return contactParts.join('\n');
}

// 构建描述信息
function buildDescription(walkerData: WalkerPlusData): string {
  // 优先使用已解析的内容简介
  if (walkerData.parsedDescription) {
    return walkerData.parsedDescription;
  }
  
  // 如果没有专门的描述，则使用活动名称
  const descParts = [];
  if (walkerData.eventName) {
    descParts.push(walkerData.eventName);
  }
  
  return descParts.join(' ');
}

// 构建WalkerPlus原始格式显示文本
function buildWalkerPlusDisplay(walkerData: WalkerPlusData): string {
  const displayLines = [];
  
  // 严格按照14项顺序显示，没有信息的显示"详见官网"，绝不编造信息
  
  // 1. 大会名
  displayLines.push(`大会名\t${walkerData.eventName || '详见官网'}`);
  
  // 2. 打ち上げ数
  displayLines.push(`打ち上げ数\t${walkerData.fireworksCount || '详见官网'}`);
  
  // 3. 打ち上げ時間
  displayLines.push(`打ち上げ時間\t${walkerData.fireworksDuration || '详见官网'}`);
  
  // 4. 例年の人出
  displayLines.push(`例年の人出\t${walkerData.expectedVisitors || '详见官网'}`);
  
  // 5. 開催期間
  displayLines.push(`開催期間\t${walkerData.eventPeriod || '详见官网'}`);
  
  // 6. 開催時間
  if (walkerData.eventTime) {
    // 将所有内容合并到一行，用空格分隔
    const eventTimeText = walkerData.eventTime.replace(/\n/g, ' ').trim();
    displayLines.push(`開催時間\t${eventTimeText}`);
  } else {
    displayLines.push(`開催時間\t详见官网`);
  }
  
  // 7. 荒天の場合
  displayLines.push(`荒天の場合\t${walkerData.weatherPolicy || '详见官网'}`);
  
  // 8. 有料席
  if (walkerData.paidSeats) {
    // 将所有内容合并到一行，用空格分隔
    const paidSeatsText = walkerData.paidSeats.replace(/\n/g, ' ').trim();
    displayLines.push(`有料席\t${paidSeatsText}`);
  } else {
    displayLines.push(`有料席\t详见官网`);
  }
  
  // 9. 屋台など
  displayLines.push(`屋台など\t${walkerData.foodStalls || '详见官网'}`);
  
  // 10. その他・全体備考
  displayLines.push(`その他・全体備考\t${walkerData.otherNotes || '详见官网'}`);
  
  // 11. 会場
  displayLines.push(`会場\t${walkerData.venue || '详见官网'}`);
  
  // 12. 会場アクセス
  displayLines.push(`会場アクセス\t${walkerData.venueAccess || '详见官网'}`);
  
  // 13. 駐車場
  displayLines.push(`駐車場\t${walkerData.parking || '详见官网'}`);
  
  // 14. 問い合わせ
  displayLines.push(`問い合わせ\t${walkerData.contactInfo || '详见官网'}`);
  
  return displayLines.join('\n');
}

// 构建14项字段数组，用于前端分行显示
function buildWalkerFieldsArray(walkerData: WalkerPlusData): Array<{label: string, value: string}> {
  return [
    { label: '大会名', value: walkerData.eventName || '详见官网' },
    { label: '打ち上げ数', value: walkerData.fireworksCount || '详见官网' },
    { label: '打ち上げ時間', value: walkerData.fireworksDuration || '详见官网' },
    { label: '例年の人出', value: walkerData.expectedVisitors || '详见官网' },
    { label: '開催期間', value: walkerData.eventPeriod || '详见官网' },
    { label: '開催時間', value: walkerData.eventTime ? walkerData.eventTime.replace(/\n/g, ' ').trim() : '详见官网' },
    { label: '荒天の場合', value: walkerData.weatherPolicy || '详见官网' },
    { label: '有料席', value: walkerData.paidSeats ? walkerData.paidSeats.replace(/\n/g, ' ').trim() : '详见官网' },
    { label: '屋台など', value: walkerData.foodStalls || '详见官网' },
    { label: 'その他・全体備考', value: walkerData.otherNotes || '详见官网' },
    { label: '会場', value: walkerData.venue || '详见官网' },
    { label: '会場アクセス', value: walkerData.venueAccess || '详见官网' },
    { label: '駐車場', value: walkerData.parking || '详见官网' },
    { label: '問い合わせ', value: walkerData.contactInfo || '详见官网' }
  ];
} 