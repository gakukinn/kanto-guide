/**
 * 智能内容解析器
 * @description 自动识别粘贴的花火活动信息，智能提取各个字段
 */

export interface ParsedHanabiData {
  name?: string;
  englishName?: string;
  japaneseName?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  location?: string;
  venue?: string;
  address?: string;
  fireworksCount?: string;
  expectedVisitors?: string;
  category?: string;
  description?: string;
  highlights?: string;
  access?: string;
  parking?: string;
  weather?: string;
  ticketInfo?: string;
  website?: string;
  contactPhone?: string;
  region?: 'tokyo' | 'kanagawa' | 'chiba' | 'saitama' | 'kitakanto' | 'koshinetsu';
}

class SmartContentParser {
  private patterns = {
    // 活动名称模式
    name: [
      // 新增：大会名（活动名称）	市制70周年記念 第79回 あつぎ鮎祭典
      /(?:大会名|活動名稱|活动名称)(?:：|:|\t|　)+(.+)/g,
      /第?\d+回\s*([^花火]*花火[^会]*会?)/g,
      /([^第\d]*花火大会)/g,
      /([^会]*会\s*花火)/g,
      /(.*花火祭)/g,
      /(.*花火フェスティバル)/g,
      /(.*祭典)/g
    ],
    
    // 日期模式
    date: [
      // 新增：開催期間（举办日期）	2025年8月2日(土)
      /(?:開催期間|举办日期|开催日期)(?:：|:|\t|　)+([^　\n\r]+)/g,
      /(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/g,
      /(\d{4})-(\d{1,2})-(\d{1,2})/g,
      /(\d{4})\/(\d{1,2})\/(\d{1,2})/g,
      /(\d{1,2})月\s*(\d{1,2})日/g
    ],
    
    // 时间模式
    time: [
      // 新增：開催時間（活动时间）19:00～20:00
      /(?:開催時間|活动时间|活動時間)(?:：|:|\t|　)+([^　\n\r]+)/g,
      // 新增：打ち上げ時間（花火时间）	60分
      /(?:打ち上げ時間|花火时间|烟火时间)(?:：|:|\t|　)+([^　\n\r]+)/g,
      /(\d{1,2}):(\d{2})\s*[～~-]\s*(\d{1,2}):(\d{2})/g,
      /(\d{1,2})時(\d{2})分\s*[～~-]\s*(\d{1,2})時(\d{2})分/g,
      /(\d{1,2}):(\d{2})\s*(?:開始|start)/gi,
      /(\d{1,2}):(\d{2})\s*(?:終了|end)/gi
    ],
    
    // 花火数量模式
    fireworksCount: [
      // 新增：打ち上げ数（花火数）	約1万発
      /(?:打ち上げ数|花火数|花火发数)(?:：|:|\t|　)+(?:約|约|およそ)?\s*([^　\n\r]+)/g,
      /(?:約|约|およそ)?\s*(\d+(?:,\d{3})*)\s*発/g,
      /(\d+(?:,\d{3})*)\s*(?:発|shots?)/g,
      /花火\s*(?:約|约)?\s*(\d+(?:,\d{3})*)/g,
      /約(\d+(?:\.\d+)?万発)/g
    ],
    
    // 观众数量模式
    expectedVisitors: [
      // 新增：例年の人出（往年观众数）	約28万人
      /(?:例年の人出|往年观众数|观众数)(?:：|:|\t|　)+(?:約|约|およそ)?\s*([^　\n\r]+)/g,
      /(?:約|约|およそ)?\s*(\d+(?:\.\d+)?)\s*万人/g,
      /(\d+(?:,\d{3})*)\s*人/g,
      /観客\s*(?:約|约)?\s*(\d+(?:\.\d+)?)\s*万/g
    ],
    
    // 会场模式
    venue: [
      // 新增：会場（地点）	相模川河川敷(三川合流点)
      /(?:会場|地点|场地)(?:：|:|\t|　|\（[^）]*\）)+([^　\n\r]+)/g,
      /会場[：:]\s*([^\n\r]+)/g,
      /場所[：:]\s*([^\n\r]+)/g,
      /会場\s*([^\n\r]+)/g,
      /開催地[：:]\s*([^\n\r]+)/g
    ],
    
    // 地址模式
    address: [
      /((?:東京都|神奈川県|千葉県|埼玉県|茨城県|栃木県|群馬県|新潟県|長野県|山梨県)[^\n\r]+)/g,
      /住所[：:]\s*([^\n\r]+)/g,
      /所在地[：:]\s*([^\n\r]+)/g
    ],
    
    // 交通方式模式
    access: [
      // 新增：会場アクセス（抵达方式）	【電車】小田急小田原線本厚木駅北口から徒歩15分MAP
      /(?:会場アクセス|抵达方式|交通方式)(?:：|:|\t|　|\（[^）]*\）)+([^　\n\r]+)/g,
      /交通[：:]\s*([^\n\r]+(?:\n[^\n\r]+)*)/g,
      /アクセス[：:]\s*([^\n\r]+(?:\n[^\n\r]+)*)/g,
      /最寄り駅[：:]\s*([^\n\r]+)/g,
      /(?:電車|バス|車)[：:]?\s*([^\n\r]+)/g
    ],
    
    // 停车信息模式
    parking: [
      // 新增：駐車場（停车场）	×
      /(?:駐車場|停车场)(?:：|:|\t|　|\（[^）]*\）)+([^　\n\r]+)/g,
      /駐車場[：:]\s*([^\n\r]+)/g,
      /parking[：:]\s*([^\n\r]+)/gi,
      /駐車\s*([^\n\r]+)/g
    ],
    
    // 网站模式
    website: [
      /(https?:\/\/[^\s\n\r]+)/g,
      /(?:URL|website|ウェブサイト)[：:]\s*(https?:\/\/[^\s\n\r]+)/gi
    ],
    
    // 电话模式
    phone: [
      // 新增：問い合わせ（联系方式）	080-7826-4362 あつぎ鮎祭典実行委員会
      /(?:問い合わせ|联系方式|聯絡方式)(?:：|:|\t|　|\（[^）]*\）)+([^　\n\r]+)/g,
      /(?:電話|TEL|Tel|phone)[：:]?\s*([0-9\-\(\)\s]+)/gi,
      /(\d{2,4}-\d{2,4}-\d{4})/g,
      /(\(\d{2,4}\)\s*\d{2,4}-\d{4})/g,
      /(0\d{1,3}-\d{2,4}-\d{4})/g
    ],
    
    // 天气备案模式
    weather: [
      // 新增：荒天の場合（恶劣天气）	雨天決行。荒天時は中止
      /(?:荒天の場合|恶劣天气|天气备案)(?:：|:|\t|　|\（[^）]*\）)+([^　\n\r]+)/g,
      /(?:雨天|悪天候|荒天)[：:]?\s*([^\n\r]+)/g,
      /中止[：:]?\s*([^\n\r]+)/g
    ],
    
    // 票务信息模式
    ticket: [
      // 新增：有料席	あり（有付费座位）
      /(?:有料席|付费座位|票务信息)(?:：|:|\t|　)+([^　\n\r]+)/g,
      /(?:料金|チケット|ticket)[：:]?\s*([^\n\r]+)/g
    ],
    
    // 小吃摊模式
    food: [
      // 新增：屋台など	あり（有小吃摊）
      /(?:屋台など|小吃摊|屋台)(?:：|:|\t|　)+([^　\n\r]+)/g
    ]
  };

  private regionKeywords = {
    'tokyo': ['東京', '新宿', '渋谷', '池袋', '银座', '浅草', '上野', '品川', '立川', '八王子', '調布'],
    'kanagawa': ['神奈川', '横浜', '川崎', '藤沢', '鎌倉', '小田原', '茅ヶ崎', '相模原', '厚木'],
    'chiba': ['千葉', '船橋', '松戸', '市川', '浦安', '木更津', '成田', '柏', '流山'],
    'saitama': ['埼玉', 'さいたま', '川口', '所沢', '春日部', '熊谷', '越谷', '草加'],
    'kitakanto': ['茨城', '栃木', '群馬', '水戸', 'つくば', '宇都宮', '前橋', '高崎'],
    'koshinetsu': ['新潟', '長野', '山梨', '松本', '甲府', '長岡', '上越']
  };

  /**
   * 主要解析函数
   */
  parse(content: string): ParsedHanabiData {
    const result: ParsedHanabiData = {};
    
    // 清理输入内容
    const cleanContent = this.cleanContent(content);
    
    // 解析各个字段
    result.name = this.extractName(cleanContent);
    result.date = this.extractDate(cleanContent);
    const timeData = this.extractTime(cleanContent);
    result.startTime = timeData.startTime;
    result.endTime = timeData.endTime;
    result.duration = timeData.duration;
    result.fireworksCount = this.extractFireworksCount(cleanContent);
    result.expectedVisitors = this.extractExpectedVisitors(cleanContent);
    result.venue = this.extractVenue(cleanContent);
    result.address = this.extractAddress(cleanContent);
    result.access = this.extractAccess(cleanContent);
    result.parking = this.extractParking(cleanContent);
    result.website = this.extractWebsite(cleanContent);
    result.contactPhone = this.extractPhone(cleanContent);
    result.weather = this.extractWeather(cleanContent);
    result.ticketInfo = this.extractTicketInfo(cleanContent);
    result.region = this.extractRegion(cleanContent);
    
    // 根据名称和地址智能推断类别
    result.category = this.inferCategory(cleanContent);
    
    // 提取亮点
    result.highlights = this.extractHighlights(cleanContent);
    
    return result;
  }

  private cleanContent(content: string): string {
    return content
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private extractName(content: string): string | undefined {
    for (const pattern of this.patterns.name) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    
    // 如果没有匹配到标准模式，尝试从第一行提取
    const firstLine = content.split('\n')[0]?.trim();
    if (firstLine && firstLine.includes('花火')) {
      return firstLine;
    }
    
    return undefined;
  }

  private extractDate(content: string): string | undefined {
    const currentYear = new Date().getFullYear();
    
    for (const pattern of this.patterns.date) {
      const match = pattern.exec(content);
      if (match) {
        if (match.length === 4) { // YYYY-MM-DD format
          const year = match[1];
          const month = match[2].padStart(2, '0');
          const day = match[3].padStart(2, '0');
          return `${year}-${month}-${day}`;
        } else if (match.length === 3) { // MM-DD format, assume current year
          const month = match[1].padStart(2, '0');
          const day = match[2].padStart(2, '0');
          return `${currentYear}-${month}-${day}`;
        }
      }
    }
    
    return undefined;
  }

  private extractTime(content: string): { startTime?: string; endTime?: string; duration?: string } {
    for (const pattern of this.patterns.time) {
      const match = pattern.exec(content);
      if (match) {
        if (match.length === 5) { // HH:MM - HH:MM format
          const startHour = match[1].padStart(2, '0');
          const startMin = match[2].padStart(2, '0');
          const endHour = match[3].padStart(2, '0');
          const endMin = match[4].padStart(2, '0');
          
          return {
            startTime: `${startHour}:${startMin}`,
            endTime: `${endHour}:${endMin}`,
            duration: this.calculateDuration(`${startHour}:${startMin}`, `${endHour}:${endMin}`)
          };
        }
      }
    }
    
    return {};
  }

  private calculateDuration(startTime: string, endTime: string): string {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const diffMinutes = endMinutes - startMinutes;
    
    if (diffMinutes > 0 && diffMinutes < 300) { // 5小时内合理
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      
      if (hours > 0) {
        return `约${hours}小时${minutes > 0 ? minutes + '分钟' : ''}`;
      } else {
        return `约${minutes}分钟`;
      }
    }
    
    return '';
  }

  private extractFireworksCount(content: string): string | undefined {
    for (const pattern of this.patterns.fireworksCount) {
      const match = pattern.exec(content);
      if (match) {
        return `约${match[1]}发`;
      }
    }
    return undefined;
  }

  private extractExpectedVisitors(content: string): string | undefined {
    for (const pattern of this.patterns.expectedVisitors) {
      const match = pattern.exec(content);
      if (match) {
        if (match[1].includes('.')) {
          return `约${match[1]}万人`;
        } else if (match[1].includes(',')) {
          const num = parseInt(match[1].replace(/,/g, ''));
          return `约${(num / 10000).toFixed(1)}万人`;
        } else {
          return `约${match[1]}人`;
        }
      }
    }
    return undefined;
  }

  private extractVenue(content: string): string | undefined {
    for (const pattern of this.patterns.venue) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    return undefined;
  }

  private extractAddress(content: string): string | undefined {
    for (const pattern of this.patterns.address) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    return undefined;
  }

  private extractAccess(content: string): string | undefined {
    for (const pattern of this.patterns.access) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    return undefined;
  }

  private extractParking(content: string): string | undefined {
    for (const pattern of this.patterns.parking) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    return undefined;
  }

  private extractWebsite(content: string): string | undefined {
    for (const pattern of this.patterns.website) {
      const match = pattern.exec(content);
      if (match) {
        return match[1] || match[0];
      }
    }
    return undefined;
  }

  private extractPhone(content: string): string | undefined {
    for (const pattern of this.patterns.phone) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    return undefined;
  }

  private extractWeather(content: string): string | undefined {
    for (const pattern of this.patterns.weather) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    
    // 默认值
    if (content.includes('雨') || content.includes('中止')) {
      return '雨天中止';
    }
    
    return undefined;
  }

  private extractTicketInfo(content: string): string | undefined {
    for (const pattern of this.patterns.ticket) {
      const match = pattern.exec(content);
      if (match) {
        return match[1]?.trim();
      }
    }
    return undefined;
  }

  private extractRegion(content: string): 'tokyo' | 'kanagawa' | 'chiba' | 'saitama' | 'kitakanto' | 'koshinetsu' | undefined {
    for (const [region, keywords] of Object.entries(this.regionKeywords)) {
      for (const keyword of keywords) {
        if (content.includes(keyword)) {
          return region as any;
        }
      }
    }
    return undefined;
  }

  private inferCategory(content: string): string | undefined {
    if (content.includes('海上') || content.includes('海岸') || content.includes('港')) {
      return '海上花火';
    }
    if (content.includes('川') || content.includes('河')) {
      return '河川花火';
    }
    if (content.includes('音楽') || content.includes('ミュージック') || content.includes('音乐')) {
      return '音乐花火';
    }
    if (content.includes('大規模') || content.includes('大型')) {
      return '大型花火';
    }
    return '传统花火';
  }

  private extractHighlights(content: string): string | undefined {
    const highlights: string[] = [];
    
    // 常见亮点关键词
    const highlightKeywords = [
      '海上花火', '有料席', '音楽花火', '特大花火', '連続花火',
      '屋台', '露店', '海の家', '観覧席', '駐車場あり',
      '無料', '入場無料', 'フードコート', 'ライブ'
    ];
    
    for (const keyword of highlightKeywords) {
      if (content.includes(keyword)) {
        highlights.push(keyword);
      }
    }
    
    return highlights.length > 0 ? highlights.join(',') : undefined;
  }

  /**
   * 获取置信度评分
   */
  getConfidenceScore(parsedData: ParsedHanabiData): number {
    let score = 0;
    let maxScore = 0;
    
    const weights = {
      name: 20,
      date: 20,
      venue: 15,
      region: 10,
      fireworksCount: 10,
      expectedVisitors: 10,
      access: 5,
      startTime: 5,
      address: 5
    };
    
    for (const [field, weight] of Object.entries(weights)) {
      maxScore += weight;
      if (parsedData[field as keyof ParsedHanabiData]) {
        score += weight;
      }
    }
    
    return Math.round((score / maxScore) * 100);
  }
}

export default SmartContentParser; 