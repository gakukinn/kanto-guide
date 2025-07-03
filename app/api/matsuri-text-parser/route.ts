import { NextRequest, NextResponse } from 'next/server';

// 祭典专用数据接口（严格按照用户提供的字段）
interface MatsuriData {
  // 基本信息（祭典格式）
  eventName: string;               // 事件名
  venue: string;                   // 開催場所・会場
  eventPeriod: string;             // 開催日程
  eventTime: string;               // 開催時間
  reservationRequired: string;     // 予約
  fee: string;                     // 料金
  expectedVisitors: string;        // 例年の人出
  recommendedViewpoint: string;    // おすすめビューポイント
  foodStalls: string;              // 屋台の有無
  weatherPolicy: string;           // 雨天・荒天時の対応
  
  // スポット情報
  spotName: string;                // スポット名
  spotAddress: string;             // 住所
  parking: string;                 // 駐車場
  venueAccess: string;             // 交通アクセス
  contactInfo: string;             // お問い合わせ1
  
  // 自动提取的信息
  detectedRegion: string;          // 自动识别的地区
  detectedActivityType: string;    // 自动识别的活动类型
  
  // 解析的内容简介
  parsedDescription: string;       // 解析的内容简介
  
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
    
    if (!text) {
      return NextResponse.json({ error: '请提供要解析的文本' }, { status: 400 });
    }

    // 解析祭典文本
    const result = parseMatsuriText(text);
    
    // 构建祭典字段数组用于前端显示
    const matsuriFields = buildMatsuriFieldsArray(result);
    
    return NextResponse.json({
      success: true,
      data: result,
      matsuriFields: matsuriFields,
      // 保持与花火解析器的兼容性
      walkerFields: matsuriFields,
      displayText: buildMatsuriDisplay(result)
    });

  } catch (error) {
    console.error('祭典文本解析错误:', error);
    return NextResponse.json({ 
      error: '文本解析失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

// 解析祭典格式文本
function parseMatsuriText(text: string): MatsuriData {
  const result: MatsuriData = {
    // 基本信息初始化
    eventName: '',
    venue: '',
    eventPeriod: '',
    eventTime: '',
    reservationRequired: '',
    fee: '',
    expectedVisitors: '',
    recommendedViewpoint: '',
    foodStalls: '',
    weatherPolicy: '',
    
    // スポット情報初始化
    spotName: '',
    spotAddress: '',
    parking: '',
    venueAccess: '',
    contactInfo: '',
    
    detectedRegion: '',
    detectedActivityType: '',
    parsedDescription: '',
    
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

  // 按行分割文本
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
    if (line === 'スポット情報' || line === 'スポット情報：' || line === '基本情報' || line === '詳細情報') {
      inSpotInfo = (line.includes('スポット'));
      currentField = '';
      continue;
    }

    // 改进的分隔符检测：支持制表符、空格、或冒号分隔
    let key = '', value = '';
    if (line.includes('\t')) {
      [key, value] = line.split('\t', 2);
    } else {
      const colonMatch = line.match(/^([^：]+)：\s*(.*)$/);
      if (colonMatch) {
        key = colonMatch[1];
        value = colonMatch[2];
      } else {
        // 支持单个或多个空格分隔，优先匹配多个空格
        const multiSpaceMatch = line.match(/^([^\s]+)\s{2,}(.+)$/);
        if (multiSpaceMatch) {
          key = multiSpaceMatch[1];
          value = multiSpaceMatch[2];
        } else {
          // 支持单个空格分隔
          const singleSpaceMatch = line.match(/^([^\s]+)\s+(.+)$/);
          if (singleSpaceMatch) {
            key = singleSpaceMatch[1];
            value = singleSpaceMatch[2];
          }
        }
      }
    }
    
    // 如果找到了键值对
    if (key && value !== undefined) {
      const cleanKey = key.trim();
      const cleanValue = value ? value.trim() : '';
      currentField = cleanKey; // 更新当前字段

      // 🏮 祭典专用字段映射
      switch (cleanKey) {
        case '事件名':
        case 'イベント名':
          result.eventName = cleanValue;
          break;
        case '開催場所・会場':
        case '開催場所':
        case '会場':
          result.venue = cleanValue;
          break;
        case '開催日程':
        case '開催期間':
          result.eventPeriod = cleanValue;
          break;
        case '開催時間':
          result.eventTime = cleanValue;
          break;
        case '予約':
          result.reservationRequired = cleanValue;
          break;
        case '料金':
          result.fee = cleanValue;
          break;
        case '例年の人出':
          result.expectedVisitors = cleanValue;
          break;
        case 'おすすめビューポイント':
          result.recommendedViewpoint = cleanValue;
          break;
        case '屋台の有無':
          result.foodStalls = cleanValue;
          break;
        case '雨天・荒天時の対応':
        case '荒天の場合':
          result.weatherPolicy = cleanValue;
          break;

        // スポット情報
        case 'スポット名':
          result.spotName = cleanValue;
          break;
        case '住所':
          result.spotAddress = cleanValue;
          break;
        case '駐車場':
          result.parking = cleanValue;
          break;
        case '交通アクセス':
        case '会場アクセス':
          result.venueAccess = cleanValue;
          break;
        case 'お問い合わせ1':
        case 'お問い合わせ':
        case '問い合わせ':
          result.contactInfo = cleanValue;
          break;
        case '内容簡介':
        case '内容简介':
        case '活動簡介':
        case '活动简介':
        case '簡介':
        case '简介':
        case 'description':
          result.parsedDescription = cleanValue;
          break;
        default:
          // 其他未知字段，不处理
          break;
      }
    }
    // 处理续行内容（没有键值对格式的行）
    else if (line.length > 0 && currentField) {
      // 根据当前字段添加续行内容
      switch (currentField) {
        case '開催時間':
          if (result.eventTime) {
            result.eventTime += '\n' + line;
          } else {
            result.eventTime = line;
          }
          break;
        case '開催日程':
        case '開催期間':
          if (result.eventPeriod) {
            result.eventPeriod += '\n' + line;
          } else {
            result.eventPeriod = line;
          }
          break;
        case '料金':
          if (result.fee) {
            result.fee += '\n' + line;
          } else {
            result.fee = line;
          }
          break;
        case '雨天・荒天時の対応':
        case '荒天の場合':
          if (result.weatherPolicy) {
            result.weatherPolicy += '\n' + line;
          } else {
            result.weatherPolicy = line;
          }
          break;
        case '内容簡介':
        case '内容简介':
        case '活動簡介':
        case '活动简介':
        case '簡介':
        case '简介':
        case 'description':
          if (result.parsedDescription) {
            result.parsedDescription += '\n' + line;
          } else {
            result.parsedDescription = line;
          }
          break;
        default:
          break;
      }
    }
  }

  // 自动识别地区
  result.detectedRegion = detectRegion(result.venue + ' ' + result.venueAccess + ' ' + result.spotAddress);
  
  // 自动识别活动类型（祭典）
  result.detectedActivityType = detectActivityType(result.eventName);

  // 转换为标准格式
  result.standardData = convertToStandardFormat(result);

  return result;
}

// 地区识别函数
function detectRegion(locationText: string): string {
  const text = locationText.toLowerCase();
  
  if (text.includes('東京') || text.includes('tokyo') || text.includes('新宿') || text.includes('渋谷') || 
      text.includes('池袋') || text.includes('上野') || text.includes('台東区') || text.includes('千代田区')) {
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
  
  // 祭典相关关键词
  if (text.includes('祭') || text.includes('matsuri') || text.includes('festival') || 
      text.includes('まつり') || text.includes('納涼') || text.includes('夏まつり')) {
    return 'matsuri';
  } else if (text.includes('花火') || text.includes('fireworks') || text.includes('打ち上げ')) {
    return 'hanabi';
  } else if (text.includes('桜') || text.includes('花見') || text.includes('hanami') || text.includes('cherry')) {
    return 'hanami';
  } else if (text.includes('紅葉') || text.includes('もみじ') || text.includes('autumn') || text.includes('fall')) {
    return 'momiji';
  } else if (text.includes('イルミネーション') || text.includes('illumination') || text.includes('light')) {
    return 'illumination';
  } else if (text.includes('文化') || text.includes('芸術') || text.includes('art') || text.includes('culture')) {
    return 'culture';
  }
  
  return 'matsuri'; // 默认为祭典
}

// 转换为标准格式函数
function convertToStandardFormat(matsuriData: MatsuriData): MatsuriData['standardData'] {
  const standard = {
    name: matsuriData.eventName || '',
    address: matsuriData.spotAddress || extractAddress(matsuriData.venueAccess) || '',
    datetime: combineDateTime(matsuriData.eventPeriod, matsuriData.eventTime),
    venue: matsuriData.venue || matsuriData.spotName || '',
    access: matsuriData.venueAccess || '',
    organizer: '', // 不编造，只使用实际存在的信息
    price: matsuriData.fee || '',
    contact: matsuriData.contactInfo || '',
    website: '',
    googleMap: '', // 需要单独处理
    region: matsuriData.detectedRegion,
    description: matsuriData.parsedDescription || ''
  };

  return standard;
}

// 从访问信息中提取地址
function extractAddress(accessInfo: string): string {
  // 尝试从访问信息中提取地址
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

// 构建祭典字段数组，用于前端分行显示
function buildMatsuriFieldsArray(matsuriData: MatsuriData): Array<{label: string, value: string}> {
  return [
    { label: '事件名', value: matsuriData.eventName || '' },
    { label: '開催場所・会場', value: matsuriData.venue || '' },
    { label: '開催日程', value: matsuriData.eventPeriod || '' },
    { label: '開催時間', value: matsuriData.eventTime ? matsuriData.eventTime.replace(/\n/g, ' ').trim() : '' },
    { label: '予約', value: matsuriData.reservationRequired || '' },
    { label: '料金', value: matsuriData.fee ? matsuriData.fee.replace(/\n/g, ' ').trim() : '' },
    { label: '例年の人出', value: matsuriData.expectedVisitors || '' },
    { label: 'おすすめビューポイント', value: matsuriData.recommendedViewpoint || '' },
    { label: '屋台の有無', value: matsuriData.foodStalls || '' },
    { label: '雨天・荒天時の対応', value: matsuriData.weatherPolicy || '' },
    { label: 'スポット名', value: matsuriData.spotName || '' },
    { label: '住所', value: matsuriData.spotAddress || '' },
    { label: '駐車場', value: matsuriData.parking || '' },
    { label: '交通アクセス', value: matsuriData.venueAccess || '' },
    { label: 'お問い合わせ', value: matsuriData.contactInfo || '' }
  ];
}

// 构建祭典显示文本
function buildMatsuriDisplay(matsuriData: MatsuriData): string {
  const displayLines = [];
  
  // 按照祭典格式显示
  displayLines.push(`事件名\t${matsuriData.eventName || ''}`);
  displayLines.push(`開催場所・会場\t${matsuriData.venue || ''}`);
  displayLines.push(`開催日程\t${matsuriData.eventPeriod || ''}`);
  displayLines.push(`開催時間\t${matsuriData.eventTime ? matsuriData.eventTime.replace(/\n/g, ' ').trim() : ''}`);
  displayLines.push(`予約\t${matsuriData.reservationRequired || ''}`);
  displayLines.push(`料金\t${matsuriData.fee ? matsuriData.fee.replace(/\n/g, ' ').trim() : ''}`);
  displayLines.push(`例年の人出\t${matsuriData.expectedVisitors || ''}`);
  displayLines.push(`おすすめビューポイント\t${matsuriData.recommendedViewpoint || ''}`);
  displayLines.push(`屋台の有無\t${matsuriData.foodStalls || ''}`);
  displayLines.push(`雨天・荒天時の対応\t${matsuriData.weatherPolicy || ''}`);
  
  displayLines.push(''); // 分隔符
  displayLines.push('スポット情報');
  displayLines.push(`スポット名\t${matsuriData.spotName || ''}`);
  displayLines.push(`住所\t${matsuriData.spotAddress || ''}`);
  displayLines.push(`駐車場\t${matsuriData.parking || ''}`);
  displayLines.push(`交通アクセス\t${matsuriData.venueAccess || ''}`);
  displayLines.push(`お問い合わせ\t${matsuriData.contactInfo || ''}`);
  
  return displayLines.join('\n');
} 