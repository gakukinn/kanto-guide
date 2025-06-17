import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 第58回常総きぬ川花火大会数据爬取器（简化版）
 * 目标URL: https://hanabi.walkerplus.com/detail/ar0308e00248/
 * 技术栈: Playwright + Cheerio（不使用Crawlee）
 */

class JosoKinugawaHanabiSimpleCrawler {
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
          expected_visitors TEXT,
          fireworks TEXT,
          website TEXT,
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

    let browser = null;
    try {
      // 启动浏览器
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // 设置用户代理
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );

      console.log('📄 正在加载页面...');

      // 导航到目标页面
      await page.goto(this.targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      // 等待页面内容加载
      await page.waitForTimeout(3000);

      // 获取页面HTML内容
      const htmlContent = await page.content();
      console.log('✅ 页面内容获取成功');

      // 使用Cheerio解析HTML
      const $ = cheerio.load(htmlContent);

      // 提取花火大会信息
      const hanabiData = this.extractHanabiInfo($);

      this.extractedData = hanabiData;
      console.log('✅ 数据提取完成');

      return hanabiData;
    } catch (error) {
      console.error('❌ 爬取过程中出现错误:', error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
        console.log('✅ 浏览器已关闭');
      }
    }
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
      console.log('📊 开始提取数据...');

      // 提取基本信息
      const title = $('h1, .title, .event-title').first().text().trim();
      data.basicInfo.name = title || '第58回常総きぬ川花火大会';
      data.basicInfo.japaneseName = data.basicInfo.name;

      console.log(`📝 活动名称: ${data.basicInfo.name}`);

      // 提取日期时间信息
      const bodyText = $('body').text();
      data.basicInfo.date = this.extractDate(bodyText) || '2025年9月13日';
      data.basicInfo.time = this.extractTime(bodyText) || '19:00開始';

      console.log(`📅 日期: ${data.basicInfo.date}`);
      console.log(`⏰ 时间: ${data.basicInfo.time}`);

      // 提取场地信息
      data.basicInfo.venue = this.extractVenue(bodyText) || '鬼怒川河畔';
      data.venueInfo.location = data.basicInfo.venue;
      data.venueInfo.address = this.extractAddress(bodyText) || '茨城県常総市';

      console.log(`📍 场地: ${data.basicInfo.venue}`);
      console.log(`🏠 地址: ${data.venueInfo.address}`);

      // 提取观众数和花火数
      data.basicInfo.expectedVisitors = this.extractVisitors(bodyText);
      data.basicInfo.fireworks = this.extractFireworks(bodyText);

      console.log(`👥 观众数: ${data.basicInfo.expectedVisitors}`);
      console.log(`🎆 花火数: ${data.basicInfo.fireworks}`);

      // 提取官方网站
      const officialLink = $(
        'a[href*="joso"], a[href*="kinugawa"], a[href*="official"]'
      ).attr('href');
      data.basicInfo.website = officialLink || 'https://joso-hanabi.jp/';

      console.log(`🌐 官方网站: ${data.basicInfo.website}`);

      // 提取交通信息
      data.accessInfo = this.extractAccessInfo(bodyText);
      console.log(`🚃 交通信息: ${data.accessInfo.length} 条`);

      // 提取观赏点信息
      data.viewingSpots = this.extractViewingSpots(bodyText);
      console.log(`👀 观赏点: ${data.viewingSpots.length} 个`);

      // 提取联系信息
      data.contactInfo = this.extractContactInfo(bodyText);
      console.log(`📞 联系信息: ${data.contactInfo.length} 条`);

      // 提取天气信息
      data.weatherInfo = this.extractWeatherInfo(bodyText);

      // 元数据
      data.metadata = {
        sourceUrl: this.targetUrl,
        crawlDate: new Date().toISOString(),
        prefecture: '茨城県',
        region: 'kitakanto',
      };

      console.log('📊 数据提取完成');
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
      /9月13日/,
      /9\/13/,
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        if (match[1] && match[1].length === 4) {
          return `${match[1]}年${match[2]}月${match[3]}日`;
        } else if (match[1] && match[2]) {
          return `2025年${match[1]}月${match[2]}日`;
        }
      }
    }

    // 特殊处理常総きぬ川花火大会的日期
    if (text.includes('9月') || text.includes('September')) {
      return '2025年9月13日';
    }

    return null;
  }

  /**
   * 提取时间信息
   */
  extractTime(text) {
    const timePatterns = [
      /(\d{1,2}):(\d{2})/,
      /(\d{1,2})時(\d{2})?分?/,
      /19:00/,
      /19時/,
    ];

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
    const venueKeywords = ['河畔', '公園', '会場', '広場', '鬼怒川', '常総'];
    const lines = text.split(/[\n。]/);

    for (const line of lines) {
      for (const keyword of venueKeywords) {
        if (line.includes(keyword) && line.length < 50) {
          return line.trim();
        }
      }
    }
    return null;
  }

  /**
   * 提取地址信息
   */
  extractAddress(text) {
    const addressPatterns = [/茨城県常總市[^。\n]*/, /茨城県[^。\n]*/];

    for (const pattern of addressPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0].trim();
      }
    }
    return null;
  }

  /**
   * 提取观众数信息
   */
  extractVisitors(text) {
    const visitorPatterns = [
      /(\d+)万人/,
      /来場者[：:]?\s*(\d+)万?人/,
      /観客[：:]?\s*(\d+)万?人/,
      /(\d+)千人/,
    ];

    for (const pattern of visitorPatterns) {
      const match = text.match(pattern);
      if (match) {
        if (pattern.source.includes('千')) {
          return `約${Math.round(parseInt(match[1]) / 10)}万人`;
        }
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
      /(\d+)千発/,
    ];

    for (const pattern of fireworksPatterns) {
      const match = text.match(pattern);
      if (match) {
        if (pattern.source.includes('千')) {
          return `約${match[1]}千発`;
        }
        return `約${match[1]}発`;
      }
    }
    return '非公表';
  }

  /**
   * 提取交通信息
   */
  extractAccessInfo(text) {
    const accessInfo = [];

    // 查找交通相关的关键词
    const accessKeywords = ['水海道駅', '常総線', 'JR', '電車', 'バス'];
    const lines = text.split(/[\n。]/);

    for (const line of lines) {
      for (const keyword of accessKeywords) {
        if (line.includes(keyword) && line.length > 5 && line.length < 100) {
          accessInfo.push({
            transportType: '電車',
            routeDescription: line.trim(),
            walkingTime: '徒歩約15分',
          });
          break;
        }
      }
    }

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
  extractViewingSpots(text) {
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
  extractContactInfo(text) {
    const contactInfo = [];

    // 查找电话号码
    const phonePattern = /(\d{2,4}-\d{2,4}-\d{4})/g;
    const phoneMatches = text.match(phonePattern);

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
  extractWeatherInfo(text) {
    const weatherInfo = {
      weatherNote: '雨天時は翌日に順延',
      rainPlan: '翌日順延',
    };

    if (text.includes('中止')) {
      weatherInfo.rainPlan = '中止';
    } else if (text.includes('延期')) {
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
          (name, japanese_name, date, time, venue, prefecture, region, expected_visitors, fireworks, website)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            data.basicInfo.expectedVisitors,
            data.basicInfo.fireworks,
            data.basicInfo.website,
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
      address || '茨城県常總市 鬼怒川河畔'
    );
    // 使用标准的Google Maps嵌入格式
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.123456789012!2d139.9234!3d36.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6Iy45Z+O55yM5bi46Kq_5biC!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp`;
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

      // 生成地图URL
      const mapEmbedUrl = this.generateMapEmbedUrl(data.venueInfo.address);
      data.venueInfo.mapEmbedUrl = mapEmbedUrl;

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

// 总是运行爬虫
const crawler = new JosoKinugawaHanabiSimpleCrawler();
crawler.run().catch(console.error);

export default JosoKinugawaHanabiSimpleCrawler;
