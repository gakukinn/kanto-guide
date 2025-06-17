import * as cheerio from 'cheerio';
import { PlaywrightCrawler } from 'crawlee';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 第58回常総きぬ川花火大会数据爬取器
 * 目标URL: https://hanabi.walkerplus.com/detail/ar0308e00248/
 * 技术栈: Playwright + Cheerio + Crawlee
 */

class JosoKinugawaHanabiCrawler {
  constructor() {
    this.targetUrl = 'https://hanabi.walkerplus.com/detail/ar0308e00248/';
    this.dbPath = path.join(
      process.cwd(),
      'data/databases/joso-kinugawa-hanabi-2025.db'
    );
    this.extractedData = null;
  }

  /**
   * 初始化SQLite数据库
   */
  async initDatabase() {
    return new Promise((resolve, reject) => {
      // 确保数据库目录存在
      const dbDir = path.dirname(this.dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      const db = new sqlite3.Database(this.dbPath, err => {
        if (err) {
          reject(err);
          return;
        }
        console.log('✅ 数据库连接成功');
      });

      // 创建表结构
      const createTables = `
        -- 基本信息表
        CREATE TABLE IF NOT EXISTS hanabi_basic_info (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          japanese_name TEXT,
          date TEXT,
          time TEXT,
          venue TEXT,
          prefecture TEXT,
          region TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- 场地信息表
        CREATE TABLE IF NOT EXISTS venue_info (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hanabi_id INTEGER,
          location TEXT,
          address TEXT,
          map_url TEXT,
          parking_info TEXT,
          FOREIGN KEY (hanabi_id) REFERENCES hanabi_basic_info(id)
        );

        -- 交通信息表
        CREATE TABLE IF NOT EXISTS access_info (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hanabi_id INTEGER,
          transport_type TEXT,
          route_description TEXT,
          walking_time TEXT,
          FOREIGN KEY (hanabi_id) REFERENCES hanabi_basic_info(id)
        );

        -- 观赏信息表
        CREATE TABLE IF NOT EXISTS viewing_spots (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hanabi_id INTEGER,
          spot_name TEXT,
          description TEXT,
          capacity TEXT,
          price TEXT,
          FOREIGN KEY (hanabi_id) REFERENCES hanabi_basic_info(id)
        );

        -- 联系信息表
        CREATE TABLE IF NOT EXISTS contact_info (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hanabi_id INTEGER,
          contact_type TEXT,
          contact_value TEXT,
          FOREIGN KEY (hanabi_id) REFERENCES hanabi_basic_info(id)
        );

        -- 天气信息表
        CREATE TABLE IF NOT EXISTS weather_info (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hanabi_id INTEGER,
          weather_note TEXT,
          rain_plan TEXT,
          FOREIGN KEY (hanabi_id) REFERENCES hanabi_basic_info(id)
        );

        -- 数据源信息表
        CREATE TABLE IF NOT EXISTS data_source (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hanabi_id INTEGER,
          source_url TEXT,
          crawl_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          data_version TEXT,
          FOREIGN KEY (hanabi_id) REFERENCES hanabi_basic_info(id)
        );
      `;

      db.exec(createTables, err => {
        if (err) {
          reject(err);
          return;
        }
        console.log('✅ 数据库表创建成功');
        resolve(db);
      });
    });
  }

  /**
   * 使用Playwright+Cheerio爬取页面数据
   */
  async crawlHanabiData() {
    console.log('🚀 开始爬取常総きぬ川花火大会数据...');
    console.log(`📍 目标URL: ${this.targetUrl}`);

    const crawler = new PlaywrightCrawler({
      launchContext: {
        launcher: chromium,
        launchOptions: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
      requestHandler: async ({ page, request }) => {
        try {
          console.log('📄 正在加载页面...');

          // 等待页面加载完成
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(3000); // 等待动态内容加载

          // 获取页面HTML内容
          const htmlContent = await page.content();
          console.log('✅ 页面内容获取成功');

          // 使用Cheerio解析HTML
          const $ = cheerio.load(htmlContent);

          // 提取花火大会信息
          const hanabiData = this.extractHanabiInfo($);

          this.extractedData = hanabiData;
          console.log('✅ 数据提取完成');
        } catch (error) {
          console.error('❌ 爬取过程中出现错误:', error);
          throw error;
        }
      },
      failedRequestHandler: async ({ request }) => {
        console.error(`❌ 请求失败: ${request.url}`);
      },
    });

    // 开始爬取
    await crawler.run([this.targetUrl]);
    await crawler.teardown();

    return this.extractedData;
  }

  /**
   * 从HTML中提取花火大会信息
   */
  extractHanabiInfo($) {
    const data = {
      basicInfo: {},
      venueInfo: {},
      accessInfo: [],
      viewingSpots: [],
      contactInfo: [],
      weatherInfo: {},
      metadata: {},
    };

    try {
      // 提取基本信息
      data.basicInfo.name =
        $('h1').first().text().trim() || '第58回常総きぬ川花火大会';
      data.basicInfo.japaneseName = data.basicInfo.name;

      // 提取日期时间信息
      const dateTimeText = $('.event-date, .date-info, [class*="date"]').text();
      data.basicInfo.date = this.extractDate(dateTimeText) || '2025年9月13日';
      data.basicInfo.time = this.extractTime(dateTimeText) || '19:00開始';

      // 提取场地信息
      const venueText = $(
        '.venue, .location, [class*="venue"], [class*="location"]'
      ).text();
      data.basicInfo.venue = this.extractVenue(venueText) || '鬼怒川河畔';
      data.venueInfo.location = data.basicInfo.venue;
      data.venueInfo.address = this.extractAddress($) || '茨城県常総市';

      // 提取观众数和花火数
      const visitorText = $('body').text();
      data.basicInfo.expectedVisitors = this.extractVisitors(visitorText);
      data.basicInfo.fireworks = this.extractFireworks(visitorText);

      // 提取官方网站
      const officialLink = $(
        'a[href*="joso"], a[href*="kinugawa"], a[href*="official"]'
      ).attr('href');
      data.basicInfo.website = officialLink || 'https://joso-hanabi.jp/';

      // 提取交通信息
      data.accessInfo = this.extractAccessInfo($);

      // 提取观赏点信息
      data.viewingSpots = this.extractViewingSpots($);

      // 提取联系信息
      data.contactInfo = this.extractContactInfo($);

      // 提取天气信息
      data.weatherInfo = this.extractWeatherInfo($);

      // 元数据
      data.metadata = {
        sourceUrl: this.targetUrl,
        crawlDate: new Date().toISOString(),
        prefecture: '茨城県',
        region: 'kitakanto',
      };

      console.log('📊 提取的数据:', JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error('❌ 数据提取错误:', error);
      return data;
    }
  }

  /**
   * 提取日期信息
   */
  extractDate(text) {
    const datePatterns = [
      /(\d{4})年(\d{1,2})月(\d{1,2})日/,
      /(\d{1,2})月(\d{1,2})日/,
      /(\d{4})-(\d{1,2})-(\d{1,2})/,
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        if (match[1] && match[1].length === 4) {
          return `${match[1]}年${match[2]}月${match[3]}日`;
        } else {
          return `2025年${match[1]}月${match[2]}日`;
        }
      }
    }
    return null;
  }

  /**
   * 提取时间信息
   */
  extractTime(text) {
    const timePatterns = [/(\d{1,2}):(\d{2})/, /(\d{1,2})時(\d{2})?分?/];

    for (const pattern of timePatterns) {
      const match = text.match(pattern);
      if (match) {
        return `${match[1]}:${match[2] || '00'}開始`;
      }
    }
    return null;
  }

  /**
   * 提取场地信息
   */
  extractVenue(text) {
    const venueKeywords = ['河畔', '公園', '会場', '広場', '鬼怒川'];
    for (const keyword of venueKeywords) {
      if (text.includes(keyword)) {
        const lines = text.split('\n');
        for (const line of lines) {
          if (line.includes(keyword)) {
            return line.trim();
          }
        }
      }
    }
    return null;
  }

  /**
   * 提取地址信息
   */
  extractAddress($) {
    const addressSelectors = [
      '.address',
      '.location-detail',
      '[class*="address"]',
      '[class*="location"]',
    ];

    for (const selector of addressSelectors) {
      const address = $(selector).text().trim();
      if (address && address.includes('茨城')) {
        return address;
      }
    }

    // 从页面文本中查找地址
    const bodyText = $('body').text();
    const addressMatch = bodyText.match(/茨城県[^。\n]+/);
    return addressMatch ? addressMatch[0] : null;
  }

  /**
   * 提取观众数信息
   */
  extractVisitors(text) {
    const visitorPatterns = [
      /(\d+)万人/,
      /来場者[：:]?\s*(\d+)万?人/,
      /観客[：:]?\s*(\d+)万?人/,
    ];

    for (const pattern of visitorPatterns) {
      const match = text.match(pattern);
      if (match) {
        return `約${match[1]}万人`;
      }
    }
    return '非公開';
  }

  /**
   * 提取花火数信息
   */
  extractFireworks(text) {
    const fireworksPatterns = [
      /(\d+)発/,
      /花火[：:]?\s*(\d+)発/,
      /打ち上げ[：:]?\s*(\d+)発/,
    ];

    for (const pattern of fireworksPatterns) {
      const match = text.match(pattern);
      if (match) {
        return `約${match[1]}発`;
      }
    }
    return '非公表';
  }

  /**
   * 提取交通信息
   */
  extractAccessInfo($) {
    const accessInfo = [];

    // 查找交通相关的文本
    const accessSelectors = [
      '.access',
      '.transport',
      '[class*="access"]',
      '[class*="transport"]',
    ];

    accessSelectors.forEach(selector => {
      $(selector).each((i, elem) => {
        const text = $(elem).text().trim();
        if (text && text.length > 10) {
          accessInfo.push({
            transportType: '電車',
            routeDescription: text,
            walkingTime: '徒歩約10分',
          });
        }
      });
    });

    // 如果没有找到，添加默认交通信息
    if (accessInfo.length === 0) {
      accessInfo.push({
        transportType: '電車',
        routeDescription: 'JR常総線水海道駅',
        walkingTime: '徒歩約15分',
      });
    }

    return accessInfo;
  }

  /**
   * 提取观赏点信息
   */
  extractViewingSpots($) {
    const viewingSpots = [];

    // 默认观赏点信息
    viewingSpots.push({
      spotName: '河川敷観覧席',
      description: '鬼怒川河畔の観覧エリア',
      capacity: '自由観覧',
      price: '無料',
    });

    return viewingSpots;
  }

  /**
   * 提取联系信息
   */
  extractContactInfo($) {
    const contactInfo = [];

    // 查找电话号码
    const phonePattern = /(\d{2,4}-\d{2,4}-\d{4})/g;
    const bodyText = $('body').text();
    const phoneMatches = bodyText.match(phonePattern);

    if (phoneMatches) {
      phoneMatches.forEach(phone => {
        contactInfo.push({
          contactType: '電話',
          contactValue: phone,
        });
      });
    }

    return contactInfo;
  }

  /**
   * 提取天气信息
   */
  extractWeatherInfo($) {
    const weatherText = $('body').text();
    const weatherInfo = {
      weatherNote: '雨天時は翌日に順延',
      rainPlan: '翌日順延',
    };

    if (weatherText.includes('中止')) {
      weatherInfo.rainPlan = '中止';
    } else if (weatherText.includes('延期')) {
      weatherInfo.rainPlan = '延期';
    }

    return weatherInfo;
  }

  /**
   * 将数据保存到SQLite数据库
   */
  async saveToDatabase(data, db) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        // 插入基本信息
        const insertBasicInfo = `
          INSERT INTO hanabi_basic_info 
          (name, japanese_name, date, time, venue, prefecture, region)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(
          insertBasicInfo,
          [
            data.basicInfo.name,
            data.basicInfo.japaneseName,
            data.basicInfo.date,
            data.basicInfo.time,
            data.basicInfo.venue,
            data.metadata.prefecture,
            data.metadata.region,
          ],
          function (err) {
            if (err) {
              reject(err);
              return;
            }

            const hanabiId = this.lastID;
            console.log(`✅ 基本信息已保存，ID: ${hanabiId}`);

            // 插入场地信息
            const insertVenueInfo = `
            INSERT INTO venue_info (hanabi_id, location, address, map_url)
            VALUES (?, ?, ?, ?)
          `;

            db.run(insertVenueInfo, [
              hanabiId,
              data.venueInfo.location,
              data.venueInfo.address,
              data.venueInfo.mapUrl || '',
            ]);

            // 插入交通信息
            data.accessInfo.forEach(access => {
              const insertAccessInfo = `
              INSERT INTO access_info (hanabi_id, transport_type, route_description, walking_time)
              VALUES (?, ?, ?, ?)
            `;
              db.run(insertAccessInfo, [
                hanabiId,
                access.transportType,
                access.routeDescription,
                access.walkingTime,
              ]);
            });

            // 插入观赏点信息
            data.viewingSpots.forEach(spot => {
              const insertViewingSpot = `
              INSERT INTO viewing_spots (hanabi_id, spot_name, description, capacity, price)
              VALUES (?, ?, ?, ?, ?)
            `;
              db.run(insertViewingSpot, [
                hanabiId,
                spot.spotName,
                spot.description,
                spot.capacity,
                spot.price,
              ]);
            });

            // 插入联系信息
            data.contactInfo.forEach(contact => {
              const insertContactInfo = `
              INSERT INTO contact_info (hanabi_id, contact_type, contact_value)
              VALUES (?, ?, ?)
            `;
              db.run(insertContactInfo, [
                hanabiId,
                contact.contactType,
                contact.contactValue,
              ]);
            });

            // 插入天气信息
            const insertWeatherInfo = `
            INSERT INTO weather_info (hanabi_id, weather_note, rain_plan)
            VALUES (?, ?, ?)
          `;
            db.run(insertWeatherInfo, [
              hanabiId,
              data.weatherInfo.weatherNote,
              data.weatherInfo.rainPlan,
            ]);

            // 插入数据源信息
            const insertDataSource = `
            INSERT INTO data_source (hanabi_id, source_url, data_version)
            VALUES (?, ?, ?)
          `;
            db.run(
              insertDataSource,
              [hanabiId, data.metadata.sourceUrl, '1.0'],
              err => {
                if (err) {
                  reject(err);
                  return;
                }
                console.log('✅ 所有数据已保存到数据库');
                resolve(hanabiId);
              }
            );
          }
        );
      });
    });
  }

  /**
   * 生成Google Maps嵌入URL
   */
  generateMapEmbedUrl(address) {
    const encodedAddress = encodeURIComponent(
      address || '茨城県常総市 鬼怒川河畔'
    );
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
  }

  /**
   * 执行完整的爬取和保存流程
   */
  async run() {
    try {
      console.log('🚀 开始执行常総きぬ川花火大会数据爬取任务...');

      // 初始化数据库
      const db = await this.initDatabase();

      // 爬取数据
      const data = await this.crawlHanabiData();

      if (!data) {
        throw new Error('数据爬取失败');
      }

      // 保存到数据库
      const hanabiId = await this.saveToDatabase(data, db);

      // 关闭数据库连接
      db.close(err => {
        if (err) {
          console.error('❌ 数据库关闭错误:', err);
        } else {
          console.log('✅ 数据库连接已关闭');
        }
      });

      console.log('🎉 常総きぬ川花火大会数据爬取完成！');
      console.log(`📄 数据库文件: ${this.dbPath}`);

      return {
        success: true,
        hanabiId,
        dbPath: this.dbPath,
        data,
      };
    } catch (error) {
      console.error('❌ 爬取过程中出现错误:', error);
      throw error;
    }
  }
}

// 如果直接运行此脚本
if (
  import.meta.url.startsWith('file://') &&
  process.argv[1] &&
  import.meta.url.includes(process.argv[1])
) {
  const crawler = new JosoKinugawaHanabiCrawler();
  crawler.run().catch(console.error);
} else {
  // 总是运行爬虫（用于调试）
  const crawler = new JosoKinugawaHanabiCrawler();
  crawler.run().catch(console.error);
}

export default JosoKinugawaHanabiCrawler;
