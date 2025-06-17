/**
 * WalkerPlus花火数据抓取脚本
 * 数据源：https://hanabi.walkerplus.com/ranking/ar0300/
 * 技术栈：Playwright + Cheerio
 * 目标：获取关东地区完整花火大会信息
 */

import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

interface HanabiInfo {
  id: string;
  name: string;
  japaneseName: string;
  englishName: string;
  date: string;
  location: string;
  prefecture: string;
  description: string;
  features: string[];
  fireworksCount: number;
  expectedVisitors: number;
  website: string;
  walkerPlusUrl: string;
}

interface RegionData {
  [prefecture: string]: HanabiInfo[];
}

// 地区映射
const REGION_MAPPING: {[key: string]: string} = {
  '東京都': 'tokyo',
  '神奈川県': 'kanagawa', 
  '千葉県': 'chiba',
  '埼玉県': 'saitama',
  '群馬県': 'kitakanto',
  '栃木県': 'kitakanto',
  '茨城県': 'kitakanto',
  '新潟県': 'koshinetsu',
  '長野県': 'koshinetsu',
  '山梨県': 'koshinetsu'
};

class WalkerPlusHanabiScraper {
  private browser: any = null;
  private page: any = null;

  async init() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // 设置User-Agent
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  }

  async scrapeMainPage(): Promise<HanabiInfo[]> {
    console.log('📊 抓取WalkerPlus关东花火大会数据...');
    
    const url = 'https://hanabi.walkerplus.com/ranking/ar0300/';
    await this.page.goto(url, { waitUntil: 'networkidle' });
    
    // 等待内容加载
    await this.page.waitForTimeout(3000);
    
    const content = await this.page.content();
    const $ = cheerio.load(content);
    
    const hanabiList: HanabiInfo[] = [];
    
    // 抓取花火大会条目
    $('.ranking-item, .hanabi-item, .event-item').each((index, element) => {
      try {
        const $item = $(element);
        
        // 提取基本信息
        const nameElement = $item.find('h3, .title, .event-title').first();
        const name = nameElement.text().trim();
        
        if (!name || name.length < 3) return;
        
        // 提取日期
        const dateText = $item.find('.date, .event-date, [class*="date"]').text().trim();
        const date = this.normalizeDate(dateText);
        
        // 提取地点
        const locationText = $item.find('.location, .venue, [class*="location"]').text().trim();
        const prefecture = this.extractPrefecture(locationText);
        
        // 提取链接
        const linkElement = $item.find('a').first();
        const relativeUrl = linkElement.attr('href') || '';
        const walkerPlusUrl = relativeUrl.startsWith('http') ? relativeUrl : `https://hanabi.walkerplus.com${relativeUrl}`;
        
        // 提取花火数量
        const fireworksText = $item.find('[class*="fireworks"], [class*="count"]').text();
        const fireworksCount = this.extractNumber(fireworksText);
        
        // 提取观众数量  
        const visitorsText = $item.find('[class*="visitor"], [class*="crowd"]').text();
        const expectedVisitors = this.extractNumber(visitorsText);
        
        if (name && date && locationText && REGION_MAPPING[prefecture]) {
          const hanabi: HanabiInfo = {
            id: this.generateId(name, locationText),
            name: this.translateToChineseName(name),
            japaneseName: name,
            englishName: this.translateToEnglishName(name),
            date: date,
            location: locationText,
            prefecture: prefecture,
            description: this.generateDescription(name, locationText),
            features: this.extractFeatures(name, locationText),
            fireworksCount: fireworksCount,
            expectedVisitors: expectedVisitors,
            website: '',
            walkerPlusUrl: walkerPlusUrl
          };
          
          hanabiList.push(hanabi);
          console.log(`✅ 抓取到: ${name} (${prefecture})`);
        }
      } catch (error) {
        console.log(`⚠️  处理条目时出错:`, error);
      }
    });
    
    return hanabiList;
  }

  async scrapeDetailPage(url: string): Promise<Partial<HanabiInfo>> {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle' });
      await this.page.waitForTimeout(2000);
      
      const content = await this.page.content();
      const $ = cheerio.load(content);
      
      // 抓取详细信息
      const details: Partial<HanabiInfo> = {};
      
      // 更精确的花火数量
      const fireworksText = $('.fireworks-count, [class*="fireworks"]').text();
      if (fireworksText) {
        details.fireworksCount = this.extractNumber(fireworksText);
      }
      
      // 更精确的观众数量
      const visitorsText = $('.visitors-count, [class*="visitor"]').text();
      if (visitorsText) {
        details.expectedVisitors = this.extractNumber(visitorsText);
      }
      
      // 官网链接
      const websiteLink = $('a[href*="official"], a[href*="city"], a[href*="gov"]').first().attr('href');
      if (websiteLink) {
        details.website = websiteLink;
      }
      
      return details;
    } catch (error) {
      console.log(`⚠️  抓取详情页面出错: ${url}`, error);
      return {};
    }
  }

  private generateId(name: string, location: string): string {
    const cleanName = name
      .replace(/第\d+回\s*/, '')
      .replace(/\d+年\s*/, '')
      .replace(/花火大会|花火祭|祭り|まつり/g, '')
      .trim();
    
    const locationPart = location
      .replace(/県|市|区|町|村/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    return `${locationPart}-${cleanName}`.replace(/[^a-z0-9\-]/g, '').substring(0, 30);
  }

  private translateToChineseName(japaneseName: string): string {
    // 常见翻译映射
    const translations: {[key: string]: string} = {
      '花火大会': '花火大会',
      '花火祭': '花火祭',
      'まつり': '祭典', 
      '祭り': '祭典',
      '納涼': '纳凉',
      '夏祭り': '夏日祭典',
      '川': '川',
      '湖': '湖',
      '海': '海',
      '山': '山',
      '市民': '市民',
      '区民': '区民',
      '町民': '町民'
    };
    
    let result = japaneseName;
    Object.entries(translations).forEach(([jp, cn]) => {
      result = result.replace(new RegExp(jp, 'g'), cn);
    });
    
    return result;
  }

  private translateToEnglishName(japaneseName: string): string {
    return japaneseName
      .replace(/花火大会|花火祭/g, 'Fireworks Festival')
      .replace(/まつり|祭り/g, 'Festival')
      .replace(/市民/g, 'Citizens')
      .replace(/区民/g, 'District')
      .replace(/第(\d+)回/g, '$1th')
      .trim();
  }

  private normalizeDate(dateText: string): string {
    // 提取年月日
    const yearMatch = dateText.match(/(\d{4})/);
    const monthMatch = dateText.match(/(\d{1,2})月/);
    const dayMatch = dateText.match(/(\d{1,2})日/);
    
    if (yearMatch && monthMatch && dayMatch) {
      const year = yearMatch[1];
      const month = monthMatch[1].padStart(2, '0');
      const day = dayMatch[1].padStart(2, '0');
      return `${year}年${month}月${day}日`;
    }
    
    return dateText.trim();
  }

  private extractPrefecture(locationText: string): string {
    const prefectures = ['東京都', '神奈川県', '千葉県', '埼玉県', '群馬県', '栃木県', '茨城県', '新潟県', '長野県', '山梨県'];
    
    for (const pref of prefectures) {
      if (locationText.includes(pref.replace(/県|都/, ''))) {
        return pref;
      }
    }
    
    return '東京都'; // 默认
  }

  private extractNumber(text: string): number {
    const matches = text.match(/(\d+(?:,\d+)*)/);
    if (matches) {
      return parseInt(matches[1].replace(/,/g, ''));
    }
    return 0;
  }

  private generateDescription(name: string, location: string): string {
    return `${location}で開催される${name}。地域の夏を彩る花火大会として多くの人々に愛されています。`;
  }

  private extractFeatures(name: string, location: string): string[] {
    const features = [];
    
    if (location.includes('川')) features.push('河川花火');
    if (location.includes('海')) features.push('海上花火'); 
    if (location.includes('湖')) features.push('湖上花火');
    if (location.includes('公園')) features.push('公園会場');
    if (name.includes('納涼')) features.push('纳凉');
    if (name.includes('市民')) features.push('市民祭典');
    
    return features.length > 0 ? features : ['夏日花火'];
  }

  async organizeByRegion(hanabiList: HanabiInfo[]): Promise<RegionData> {
    const regionData: RegionData = {};
    
    for (const hanabi of hanabiList) {
      const region = REGION_MAPPING[hanabi.prefecture];
      if (region) {
        if (!regionData[region]) {
          regionData[region] = [];
        }
        regionData[region].push(hanabi);
      }
    }
    
    return regionData;
  }

  async saveResults(regionData: RegionData) {
    const outputDir = path.join(process.cwd(), 'data', 'scraped');
    await fs.mkdir(outputDir, { recursive: true });
    
    // 保存总数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const allDataPath = path.join(outputDir, `walkerplus-hanabi-${timestamp}.json`);
    await fs.writeFile(allDataPath, JSON.stringify(regionData, null, 2), 'utf-8');
    
    // 保存最新版本
    const latestPath = path.join(outputDir, 'walkerplus-hanabi-latest.json');
    await fs.writeFile(latestPath, JSON.stringify(regionData, null, 2), 'utf-8');
    
    console.log(`💾 数据已保存到: ${allDataPath}`);
    console.log(`📄 最新版本: ${latestPath}`);
    
    // 打印统计信息
    Object.entries(regionData).forEach(([region, events]) => {
      console.log(`📊 ${region}: ${events.length} 个花火大会`);
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 浏览器已关闭');
    }
  }
}

// 主函数
async function main() {
  const scraper = new WalkerPlusHanabiScraper();
  
  try {
    await scraper.init();
    console.log('🔍 开始抓取WalkerPlus花火数据...');
    
    // 抓取主页面数据
    const hanabiList = await scraper.scrapeMainPage();
    console.log(`✅ 共抓取到 ${hanabiList.length} 个花火大会`);
    
    // 组织按地区分类
    const regionData = await scraper.organizeByRegion(hanabiList);
    
    // 保存结果
    await scraper.saveResults(regionData);
    
    console.log('🎉 WalkerPlus花火数据抓取完成！');
    
  } catch (error) {
    console.error('❌ 抓取过程中出现错误:', error);
  } finally {
    await scraper.close();
  }
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

export { WalkerPlusHanabiScraper };
export type { HanabiInfo, RegionData }; 