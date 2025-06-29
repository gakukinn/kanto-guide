/**
 * 简化智能内容解析器
 * @description 直接一一对照文本中的字段，保持简单有效
 */

export interface ParsedHanabiData {
  name?: string;
  japaneseName?: string;
  fireworksCount?: string;
  duration?: string;
  expectedVisitors?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  weather?: string;
  ticketInfo?: string;
  venue?: string;
  access?: string;
  parking?: string;
  contactPhone?: string;
  website?: string;
  region?: 'tokyo' | 'kanagawa' | 'chiba' | 'saitama' | 'kitakanto' | 'koshinetsu';
}

class SimpleContentParser {
  
  /**
   * 主要解析函数 - 直接对照字段
   */
  parse(content: string): ParsedHanabiData {
    const result: ParsedHanabiData = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      
      // 大会名（活动名称）
      if (trimmedLine.includes('大会名') && trimmedLine.includes('活动名称')) {
        const match = trimmedLine.match(/大会名[^　\t]*?活动名称[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.name = match[1].trim();
          result.japaneseName = match[1].trim(); // 同时作为日文名
        }
      }
      
      // 打ち上げ数（花火数）
      if (trimmedLine.includes('打ち上げ数') && trimmedLine.includes('花火数')) {
        const match = trimmedLine.match(/打ち上げ数[^　\t]*?花火数[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.fireworksCount = match[1].trim();
        }
      }
      
      // 打ち上げ時間（花火时间）
      if (trimmedLine.includes('打ち上げ時間') && trimmedLine.includes('花火时间')) {
        const match = trimmedLine.match(/打ち上げ時間[^　\t]*?花火时间[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.duration = match[1].trim();
        }
      }
      
      // 例年の人出（往年观众数）
      if (trimmedLine.includes('例年の人出') && trimmedLine.includes('往年观众数')) {
        const match = trimmedLine.match(/例年の人出[^　\t]*?往年观众数[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.expectedVisitors = match[1].trim();
        }
      }
      
      // 開催期間（举办日期）
      if (trimmedLine.includes('開催期間') && trimmedLine.includes('举办日期')) {
        const match = trimmedLine.match(/開催期間[^　\t]*?举办日期[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          const dateStr = match[1].trim();
          // 标准化日期格式：2025年8月2日(土) -> 2025-08-02
          const dateMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
          if (dateMatch) {
            const year = dateMatch[1];
            const month = dateMatch[2].padStart(2, '0');
            const day = dateMatch[3].padStart(2, '0');
            result.date = `${year}-${month}-${day}`;
          } else {
            result.date = dateStr;
          }
        }
      }
      
      // 開催時間（活动时间）
      if (trimmedLine.includes('開催時間') && trimmedLine.includes('活动时间')) {
        const match = trimmedLine.match(/開催時間[^　\t]*?活动时间[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          const timeStr = match[1].trim();
          // 解析时间段：19:00～20:00
          const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*[～~－-]\s*(\d{1,2}):(\d{2})/);
          if (timeMatch) {
            result.startTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
            result.endTime = `${timeMatch[3].padStart(2, '0')}:${timeMatch[4]}`;
          }
        }
      }
      
      // 荒天の場合（恶劣天气情况）
      if (trimmedLine.includes('荒天の場合') && trimmedLine.includes('恶劣天气')) {
        const match = trimmedLine.match(/荒天の場合[^　\t]*?恶劣天气[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.weather = match[1].trim();
        }
      }
      
      // 有料席（付费座位）
      if (trimmedLine.includes('有料席') && trimmedLine.includes('付费座位')) {
        const match = trimmedLine.match(/有料席[^　\t]*?付费座位[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.ticketInfo = match[1].trim();
        }
      }
      
      // 会場（会场名称）
      if (trimmedLine.includes('会場') && trimmedLine.includes('会场名称')) {
        const match = trimmedLine.match(/会場[^　\t]*?会场名称[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.venue = match[1].trim();
        }
      }
      
      // 会場アクセス（抵达方式）
      if (trimmedLine.includes('会場アクセス') && trimmedLine.includes('抵达方式')) {
        const match = trimmedLine.match(/会場アクセス[^　\t]*?抵达方式[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.access = match[1].trim();
        }
      }
      
      // 駐車場（停车场）
      if (trimmedLine.includes('駐車場') && trimmedLine.includes('停车场')) {
        const match = trimmedLine.match(/駐車場[^　\t]*?停车场[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.parking = match[1].trim();
        }
      }
      
      // 問い合わせ（联系方式）
      if (trimmedLine.includes('問い合わせ') && trimmedLine.includes('联系方式')) {
        const match = trimmedLine.match(/問い合わせ[^　\t]*?联系方式[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          const contactStr = match[1].trim();
          // 提取电话号码
          const phoneMatch = contactStr.match(/(\d{3}-\d{4}-\d{4})/);
          if (phoneMatch) {
            result.contactPhone = phoneMatch[1];
          }
        }
      }
      
      // 公式サイト（官方网站）
      if (trimmedLine.includes('公式サイト') && trimmedLine.includes('官方网站')) {
        const match = trimmedLine.match(/公式サイト[^　\t]*?官方网站[^　\t]*?[：:\t　]+(.+)/);
        if (match) {
          result.website = match[1].trim();
        }
      }
    }
    
    // 智能推断地区
    result.region = this.inferRegion(content);
    
    return result;
  }
  
  /**
   * 根据地址推断地区
   */
  private inferRegion(content: string): 'tokyo' | 'kanagawa' | 'chiba' | 'saitama' | 'kitakanto' | 'koshinetsu' | undefined {
    const regionKeywords = {
      'tokyo': ['東京', '新宿', '渋谷', '池袋', '銀座', '浅草', '上野', '品川', '立川', '八王子'],
      'kanagawa': ['神奈川', '横浜', '川崎', '藤沢', '鎌倉', '小田原', '厚木', '相模', '茅ヶ崎'],
      'chiba': ['千葉', '船橋', '松戸', '市川', '浦安', '木更津', '成田', '柏', '流山'],
      'saitama': ['埼玉', 'さいたま', '川口', '所沢', '春日部', '熊谷', '越谷', '草加'],
      'kitakanto': ['茨城', '栃木', '群馬', '水戸', 'つくば', '宇都宮', '前橋', '高崎'],
      'koshinetsu': ['新潟', '長野', '山梨', '松本', '甲府', '長岡', '上越']
    };
    
    for (const [region, keywords] of Object.entries(regionKeywords)) {
      for (const keyword of keywords) {
        if (content.includes(keyword)) {
          return region as any;
        }
      }
    }
    
    return undefined;
  }
  
  /**
   * 获取置信度评分
   */
  getConfidenceScore(parsedData: ParsedHanabiData): number {
    let score = 0;
    let maxScore = 0;
    
    const weights = {
      name: 25,
      date: 20,
      venue: 15,
      fireworksCount: 10,
      expectedVisitors: 10,
      access: 10,
      startTime: 5,
      contactPhone: 5
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

export default SimpleContentParser; 