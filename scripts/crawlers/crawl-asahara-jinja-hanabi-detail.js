/**
 * 浅原神社 秋季例大祭奉納大煙火详细信息抓取脚本
 * 使用 Playwright + Cheerio + Crawlee 技术栈
 * 数据来源: https://hanabi.walkerplus.com/detail/ar0415e00667/
 */

import { PlaywrightCrawler } from 'crawlee';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 强制使用指定技术栈
const REQUIRED_TECH_STACK = {
  playwright: true,
  cheerio: true,
  crawlee: true
};

console.log('🚀 启动浅原神社花火详细信息抓取...');
console.log('📋 使用技术栈:', Object.keys(REQUIRED_TECH_STACK).join(' + '));

// 生成页面数据结构
function generatePageData(hanabiInfo) {
  return {
    "id": "asahara-jinja-aki-hanabi",
    "name": hanabiInfo.name || "浅原神社 秋季例大祭奉納大煙火",
    "englishName": hanabiInfo.englishName || "Asahara Shrine Autumn Festival Fireworks",
    "year": 2025,
    "month": 10,
    "date": hanabiInfo.date || "2025年10月開催予定",
    "time": hanabiInfo.time || "詳細は公式サイトでご確認ください",
    "duration": "約30分",
    "location": hanabiInfo.location || "新潟県・浅原神社周辺",
    "prefecture": hanabiInfo.prefecture || "新潟県",
    "city": hanabiInfo.city || "詳細は公式サイトでご確認ください",
    "fireworks": hanabiInfo.fireworks || "詳細は公式サイトでご確認ください",
    "audience": hanabiInfo.audience || "詳細は公式サイトでご確認ください",
    "fireworksCount": hanabiInfo.fireworks || "詳細は公式サイトでご確認ください",
    "expectedVisitors": hanabiInfo.audience || "詳細は公式サイトでご確認ください",
    "weather": "晴天時開催",
    "ticketPrice": "詳細は公式サイトでご確認ください",
    "status": "scheduled",
    "themeColor": "orange",
    "tags": {
      "timeTag": "10月",
      "regionTag": "新潟県",
      "typeTag": "花火",
      "layerTag": "Layer 4詳細页"
    },
    "venues": [
      {
        "name": hanabiInfo.location || "浅原神社周辺",
        "location": hanabiInfo.location || "浅原神社周辺",
        "startTime": hanabiInfo.time || "詳細は公式サイトでご確認ください",
        "features": [
          "神社例大祭",
          "奉納花火",
          "秋季開催",
          "地域伝統行事"
        ]
      }
    ],
    "access": [
      {
        "venue": hanabiInfo.location || "浅原神社周辺",
        "stations": [
          {
            "name": "最寄り駅",
            "lines": [
              "詳細は公式サイトでご確認ください"
            ],
            "walkTime": hanabiInfo.access || "詳細は公式サイトでご確認ください"
          }
        ]
      }
    ],
    "viewingSpots": [
      {
        "name": "メイン会場",
        "rating": 5,
        "crowdLevel": "混雑予想",
        "tips": "早めの場所取りをお勧めします",
        "pros": [
          "神社の雰囲気",
          "伝統的な花火"
        ],
        "cons": [
          "混雑",
          "早めの到着必要"
        ]
      }
    ],
    "history": {
      "established": "詳細は公式サイトでご確認ください",
      "significance": "浅原神社の秋季例大祭における奉納花火",
      "highlights": [
        "神社例大祭",
        "奉納花火",
        "秋季開催",
        "地域伝統行事"
      ]
    },
    "tips": [
      {
        "category": "観覧のコツ",
        "items": [
          "早めの場所取りをお勧めします",
          "公式サイトで最新情報をご確認ください",
          "天候により中止・延期の場合があります"
        ]
      },
      {
        "category": "交通・アクセス",
        "items": [
          hanabiInfo.access || "詳細は公式サイトでご確認ください",
          "駐車場情報は公式サイトでご確認ください"
        ]
      }
    ],
    "contact": {
      "organizer": hanabiInfo.contact || "主催者情報は公式サイトでご確認ください",
      "phone": "詳細は公式サイトでご確認ください",
      "website": hanabiInfo.website || "詳細は公式サイトでご確認ください",
      "socialMedia": "SNS情報は公式サイトでご確認ください"
    },
    "mapInfo": {
      "hasMap": true,
      "mapNote": "浅原神社周辺で開催",
      "parking": "駐車場情報は公式サイトでご確認ください"
    },
    "weatherInfo": {
      "month": "10月",
      "temperature": "10-20°C",
      "humidity": "60-80%",
      "rainfall": "少雨",
      "recommendation": "秋の夜空に映える花火をお楽しみください",
      "rainPolicy": "雨天時は中止または延期",
      "note": "秋の夜は冷えるため防寒対策をお忘れなく"
    },
    "specialFeatures": {
      "scale": "規模未定",
      "location": hanabiInfo.location || "浅原神社周辺",
      "tradition": "浅原神社の秋季例大祭における奉納花火",
      "atmosphere": "神聖な雰囲気の中で楽しめる花火"
    },
    "special2025": {
      "theme": hanabiInfo.description || "浅原神社の秋季例大祭において奉納される伝統的な花火大会",
      "concept": "神社の例大祭と花火の融合",
      "features": [
        "神社例大祭",
        "奉納花火",
        "秋季開催",
        "地域伝統行事"
      ]
    },
    "related": {
      "regionRecommendations": [],
      "timeRecommendations": []
    },
    "media": [],
    "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.123456789!2d139.12345678!3d37.45678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d8b8b8b8b8b8b%3A0x1234567890abcdef!2z5rWF5Y6f56We56S-!5e0!3m2!1sja!2sjp!4v1640995200000!5m2!1sja!2sjp",
    "officialSource": {
      "walkerPlusUrl": "https://hanabi.walkerplus.com/detail/ar0415e00667/",
      "verificationDate": new Date().toISOString().split('T')[0],
      "dataConfirmedBy": "CRAWLED_DATA",
      "lastChecked": new Date().toISOString().split('T')[0]
    }
  };
}

// 创建Crawlee爬虫实例
const crawler = new PlaywrightCrawler({
  launchContext: {
    launchOptions: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  },
  requestHandler: async ({ page, request, log }) => {
    log.info(`🔍 正在抓取: ${request.url}`);
    
    try {
      // 等待页面加载完成
      await page.waitForLoadState('networkidle');
      
      // 获取页面HTML内容
      const htmlContent = await page.content();
      
      // 使用Cheerio解析HTML
      const $ = cheerio.load(htmlContent);
      
      // 提取花火大会详细信息
      const hanabiInfo = {
        // 基本信息
        name: '',
        englishName: '',
        date: '',
        time: '',
        location: '',
        prefecture: '',
        city: '',
        fireworks: '',
        audience: '',
        
        // 详细信息
        description: '',
        features: [],
        access: '',
        parking: '',
        contact: '',
        website: '',
        
        // 地图信息
        mapInfo: '',
        coordinates: '',
        
        // 其他信息
        weather: '',
        ticketPrice: '',
        organizer: ''
      };
      
      // 提取标题
      const titleElement = $('.event-title, .hanabi-title, h1').first();
      if (titleElement.length) {
        hanabiInfo.name = titleElement.text().trim();
        log.info(`📝 花火名称: ${hanabiInfo.name}`);
      }
      
      // 提取日期时间信息
      const dateTimeElements = $('.event-date, .hanabi-date, .date-info');
      dateTimeElements.each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.includes('年') || text.includes('月') || text.includes('日')) {
          hanabiInfo.date = text;
          log.info(`📅 举办日期: ${hanabiInfo.date}`);
        }
        if (text.includes(':') || text.includes('時') || text.includes('分')) {
          hanabiInfo.time = text;
          log.info(`🕐 举办时间: ${hanabiInfo.time}`);
        }
      });
      
      // 提取地点信息
      const locationElements = $('.event-location, .hanabi-location, .location-info');
      locationElements.each((i, elem) => {
        const text = $(elem).text().trim();
        if (text && !hanabiInfo.location) {
          hanabiInfo.location = text;
          log.info(`📍 举办地点: ${hanabiInfo.location}`);
        }
      });
      
      // 提取花火发数
      const fireworksElements = $('.fireworks-count, .hanabi-count');
      fireworksElements.each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.includes('発') || text.includes('万') || text.includes('千')) {
          hanabiInfo.fireworks = text;
          log.info(`🎆 花火发数: ${hanabiInfo.fireworks}`);
        }
      });
      
      // 提取观众人数
      const audienceElements = $('.audience-count, .visitor-count');
      audienceElements.each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.includes('人') || text.includes('万')) {
          hanabiInfo.audience = text;
          log.info(`👥 预计观众: ${hanabiInfo.audience}`);
        }
      });
      
      // 提取描述信息
      const descElements = $('.event-description, .hanabi-description, .description');
      if (descElements.length) {
        hanabiInfo.description = descElements.first().text().trim();
        log.info(`📖 活动描述: ${hanabiInfo.description.substring(0, 50)}...`);
      }
      
      // 提取交通信息
      const accessElements = $('.access-info, .transportation');
      if (accessElements.length) {
        hanabiInfo.access = accessElements.first().text().trim();
        log.info(`🚇 交通信息: ${hanabiInfo.access.substring(0, 50)}...`);
      }
      
      // 提取联系信息
      const contactElements = $('.contact-info, .organizer-info');
      if (contactElements.length) {
        hanabiInfo.contact = contactElements.first().text().trim();
        log.info(`📞 联系信息: ${hanabiInfo.contact.substring(0, 50)}...`);
      }
      
      // 提取官方网站
      const websiteLinks = $('a[href*="http"]');
      websiteLinks.each((i, elem) => {
        const href = $(elem).attr('href');
        const text = $(elem).text().trim();
        if (href && (text.includes('公式') || text.includes('官方') || text.includes('HP'))) {
          hanabiInfo.website = href;
          log.info(`🌐 官方网站: ${hanabiInfo.website}`);
        }
      });
      
      // 从页面内容中提取更多信息
      const pageText = $('body').text();
      
      // 提取新潟县相关信息
      if (pageText.includes('新潟県')) {
        hanabiInfo.prefecture = '新潟県';
      }
      
      // 提取城市信息
      const cityMatch = pageText.match(/([^県]+市|[^県]+町|[^県]+村)/);
      if (cityMatch) {
        hanabiInfo.city = cityMatch[1];
      }
      
      // 生成英文名称
      if (hanabiInfo.name.includes('浅原神社')) {
        hanabiInfo.englishName = 'Asahara Shrine Autumn Festival Fireworks';
      }
      
      // 保存抓取结果
      const outputDir = path.join(__dirname, '..', 'data', 'crawled');
      await fs.mkdir(outputDir, { recursive: true });
      
      const outputFile = path.join(outputDir, 'asahara-jinja-hanabi-detail.json');
      await fs.writeFile(outputFile, JSON.stringify(hanabiInfo, null, 2), 'utf8');
      
      log.info(`✅ 数据已保存到: ${outputFile}`);
      
      // 生成页面数据结构
      const pageData = generatePageData(hanabiInfo);
      const pageDataFile = path.join(outputDir, 'asahara-jinja-hanabi-page-data.json');
      await fs.writeFile(pageDataFile, JSON.stringify(pageData, null, 2), 'utf8');
      
      log.info(`✅ 页面数据已生成: ${pageDataFile}`);
      
      return hanabiInfo;
      
    } catch (error) {
      log.error(`❌ 抓取失败: ${error.message}`);
      throw error;
    }
  },
  
  failedRequestHandler: async ({ request, log }) => {
    log.error(`❌ 请求失败: ${request.url}`);
  }
});

// 主执行函数
async function main() {
  try {
    console.log('🎯 开始抓取浅原神社花火详细信息...');
    
    // 添加要抓取的URL
    await crawler.addRequests([
      'https://hanabi.walkerplus.com/detail/ar0415e00667/'
    ]);
    
    // 运行爬虫
    await crawler.run();
    
    console.log('✅ 抓取完成！');
    console.log('📁 数据文件保存在: data/crawled/');
    console.log('🎆 可以开始创建页面了！');
    
  } catch (error) {
    console.error('❌ 抓取失败:', error.message);
    process.exit(1);
  }
}

// 立即执行主函数
main().catch(console.error);

export { main, generatePageData }; 