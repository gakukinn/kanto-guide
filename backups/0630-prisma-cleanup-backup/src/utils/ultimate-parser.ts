/**
 * 终极简化版解析器
 * @description 仅识别用户提供格式中的前10个字段，使用最简单的字符串匹配
 */

export interface UltimateParsedData {
  name?: string;           // 1. 大会名（活动名称和日文名称）
  japaneseName?: string;   // 日文名称
  fireworksCount?: string; // 2. 打ち上げ数（花火数）
  duration?: string;       // 3. 打ち上げ時間（花火时间）
  expectedVisitors?: string; // 4. 例年の人出（往年观众数）
  date?: string;           // 5. 開催期間（举办日期）
  startTime?: string;      // 6. 開催時間（活动时间）
  endTime?: string;
  weather?: string;        // 7. 荒天の場合（恶劣天气情况）
  ticketInfo?: string;     // 8. 有料席（付费座位）
  officialSiteNotice?: string; // 9. 有料観覧席につきましては官方网站をご確認ください
  foodStalls?: string;     // 10. 屋台など（小吃摊）
  spotInfo?: string;       // 11. スポット情報（景点信息）
  venue?: string;          // 12. 会場（会场名称）
  access?: string;         // 13. 会場アクセス（抵达方式）
  parking?: string;        // 14. 駐車場（停车场）
  contactPhone?: string;   // 15. 問い合わせ（联系方式）
  website?: string;        // 16. 官方网站
  region?: 'tokyo' | 'kanagawa' | 'chiba' | 'saitama' | 'kitakanto' | 'koshinetsu';
}

class UltimateParser {
  
  /**
   * 解析用户标准格式的数据
   */
  parse(content: string): UltimateParsedData {
    const result: UltimateParsedData = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine) continue;
      
      try {
        // 1. 大会名（活动名称和日文名称）
        if (cleanLine.includes('大会名')) {
          const value = this.extractValue(cleanLine);
          if (value) {
            result.name = value;
            result.japaneseName = value; // 同时作为日文名
          }
        }
        
        // 2. 打ち上げ数（花火数）
        else if (cleanLine.includes('打ち上げ数') || cleanLine.includes('花火数')) {
          const value = this.extractValue(cleanLine);
          if (value) result.fireworksCount = value;
        }
        
        // 3. 打ち上げ時間（花火时间）
        else if (cleanLine.includes('打ち上げ時間') || cleanLine.includes('花火时间')) {
          const value = this.extractValue(cleanLine);
          if (value) result.duration = value;
        }
        
        // 4. 例年の人出（往年观众数）
        else if (cleanLine.includes('例年の人出') || cleanLine.includes('往年观众数')) {
          const value = this.extractValue(cleanLine);
          if (value) result.expectedVisitors = value;
        }
        
        // 5. 開催期間（举办日期）
        else if (cleanLine.includes('開催期間') || cleanLine.includes('举办日期')) {
          const value = this.extractValue(cleanLine);
          if (value) {
            result.date = this.formatDate(value);
          }
        }
        
        // 6. 開催時間（活动时间）
        else if (cleanLine.includes('開催時間') || cleanLine.includes('活动时间')) {
          const value = this.extractValue(cleanLine);
          if (value) {
            const timeRange = this.parseTimeRange(value);
            if (timeRange) {
              result.startTime = timeRange.start;
              result.endTime = timeRange.end;
            }
          }
        }
        
        // 7. 荒天の場合（恶劣天气情况）
        else if (cleanLine.includes('荒天の場合') || cleanLine.includes('恶劣天气')) {
          const value = this.extractValue(cleanLine);
          if (value) result.weather = value;
        }
        
        // 8. 有料席（付费座位）
        else if (cleanLine.includes('有料席') && !cleanLine.includes('有料観覧席')) {
          const value = this.extractValue(cleanLine);
          if (value) result.ticketInfo = value;
        }
        
        // 9. 有料観覧席につきましては官方网站をご確認ください
        else if (cleanLine.includes('有料観覧席') && (cleanLine.includes('官方网站') || cleanLine.includes('ご確認'))) {
          result.officialSiteNotice = cleanLine;
        }
        
        // 10. 屋台など（小吃摊）
        else if (cleanLine.includes('屋台') || cleanLine.includes('小吃摊')) {
          const value = this.extractValue(cleanLine);
          if (value) result.foodStalls = value;
        }
        
        // 11. スポット情報（景点信息）
        else if (cleanLine.includes('スポット情報') || cleanLine.includes('景点信息')) {
          const value = this.extractValue(cleanLine);
          if (value) result.spotInfo = value;
        }
        
        // 12. 会場（会场名称）
        else if (cleanLine.includes('会場') && !cleanLine.includes('アクセス')) {
          const value = this.extractValue(cleanLine);
          if (value) result.venue = value;
        }
        
        // 13. 会場アクセス（抵达方式）
        else if (cleanLine.includes('会場アクセス') || cleanLine.includes('抵达方式') || (cleanLine.includes('アクセス') && !cleanLine.includes('会場'))) {
          const value = this.extractValue(cleanLine);
          if (value) result.access = value;
        }
        
        // 14. 駐車場（停车场）
        else if (cleanLine.includes('駐車場') || cleanLine.includes('停车场')) {
          const value = this.extractValue(cleanLine);
          if (value) result.parking = value;
        }
        
        // 15. 問い合わせ（联系方式）
        else if (cleanLine.includes('問い合わせ') || cleanLine.includes('联系方式')) {
          const value = this.extractValue(cleanLine);
          if (value) {
            result.contactPhone = this.extractPhone(value);
          }
        }
        
        // 16. 官方网站
        else if (cleanLine.includes('官方网站') && !cleanLine.includes('有料観覧席')) {
          const value = this.extractValue(cleanLine);
          if (value) result.website = value;
        }
        
      } catch (error) {
        console.log(`解析行出错: ${cleanLine}`, error);
        continue;
      }
    }
    
    // 智能推断地区
    result.region = this.inferRegion(content);
    
    return result;
  }
  
  /**
   * 从行中提取值 - 最简单的实现
   */
  private extractValue(line: string): string | null {
    // 尝试多种分隔符
    const separators = ['\t', '　', '：', ':', '）', ')', ' '];
    
    for (const sep of separators) {
      if (line.includes(sep)) {
        const parts = line.split(sep);
        if (parts.length >= 2) {
          const value = parts[parts.length - 1].trim();
          if (value && value.length > 0) {
            return value;
          }
        }
      }
    }
    
    return null;
  }
  
  /**
   * 格式化日期
   */
  private formatDate(dateStr: string): string {
    // 2025年8月2日(土) -> 2025-08-02
    const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const year = match[1];
      const month = match[2].padStart(2, '0');
      const day = match[3].padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  }
  
  /**
   * 解析时间段
   */
  private parseTimeRange(timeStr: string): { start: string; end: string } | null {
    // 19:00～20:00
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*[～~－-]\s*(\d{1,2}):(\d{2})/);
    if (match) {
      return {
        start: `${match[1].padStart(2, '0')}:${match[2]}`,
        end: `${match[3].padStart(2, '0')}:${match[4]}`
      };
    }
    return null;
  }

  /**
   * 提取电话号码
   */
  private extractPhone(text: string): string {
    // 常见日本电话号码格式：03-1234-5678, 0467-23-3050, 090-1234-5678
    const phonePattern = /(\d{2,4})-(\d{2,4})-(\d{4})/;
    const match = text.match(phonePattern);
    
    if (match) {
      return match[0];
    }
    
    // 如果没找到标准格式，返回原文本去除多余字符
    return text.replace(/[^\d-]/g, '').trim();
  }
  
  /**
   * 推断地区
   */
  private inferRegion(content: string): 'tokyo' | 'kanagawa' | 'chiba' | 'saitama' | 'kitakanto' | 'koshinetsu' | undefined {
    const regionKeywords = {
      'tokyo': ['東京', '新宿', '渋谷', '池袋', '銀座', '浅草', '上野', '品川'],
      'kanagawa': ['神奈川', '横浜', '川崎', '藤沢', '鎌倉', '小田原', '厚木'],
      'chiba': ['千葉', '船橋', '松戸', '市川', '浦安', '木更津', '成田'],
      'saitama': ['埼玉', 'さいたま', '川口', '所沢', '春日部', '熊谷'],
      'kitakanto': ['茨城', '栃木', '群馬', '水戸', 'つくば', '宇都宮'],
      'koshinetsu': ['新潟', '長野', '山梨', '松本', '甲府', '長岡']
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
   * 获取识别统计
   */
  getStats(parsedData: UltimateParsedData): { identified: number; total: number; percentage: number } {
    const fields = [
      'name', 'fireworksCount', 'duration', 'expectedVisitors', 'date', 'startTime', 
      'weather', 'ticketInfo', 'officialSiteNotice', 'foodStalls', 'spotInfo', 
      'venue', 'access', 'parking', 'contactPhone', 'website'
    ];
    let identified = 0;
    
    for (const field of fields) {
      if (parsedData[field as keyof UltimateParsedData]) {
        identified++;
      }
    }
    
    return {
      identified,
      total: fields.length,
      percentage: Math.round((identified / fields.length) * 100)
    };
  }
}

export default UltimateParser; 