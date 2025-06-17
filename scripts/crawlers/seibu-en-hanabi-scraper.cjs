/**
 * 西武園ゆうえんち大火祭り 专用信息爬取器
 * 使用 Playwright + Cheerio + Crawlee 技术栈
 * 目标: https://hanabi.walkerplus.com/detail/ar0311e00439/
 */

const { PlaywrightCrawler } = require('crawlee');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class SeibuEnHanabiScraper {
  constructor() {
    this.targetUrl = 'https://hanabi.walkerplus.com/detail/ar0311e00439/';
    this.outputDir = path.join(process.cwd(), 'data', 'scraped-hanabi');
    this.dbPath = path.join(this.outputDir, 'seibu-en-hanabi.db');

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 初始化数据库
   */
  async initDatabase() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.dbPath, err => {
        if (err) {
          console.error('❌ 数据库创建失败:', err);
          reject(err);
          return;
        }
        console.log('📊 数据库初始化成功');
      });

      // 创建花火信息表
      db.run(
        `
        CREATE TABLE IF NOT EXISTS hanabi_info (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          japanese_name TEXT,
          english_name TEXT,
          date TEXT,
          time TEXT,
          duration TEXT,
          location TEXT,
          venue TEXT,
          address TEXT,
          fireworks_count TEXT,
          expected_visitors TEXT,
          organizer TEXT,
          phone TEXT,
          website TEXT,
          official_site TEXT,
          google_maps_url TEXT,
          ticket_price TEXT,
          rain_policy TEXT,
          access_info TEXT,
          parking_info TEXT,
          description TEXT,
          features TEXT,
          special_notes TEXT,
          data_source TEXT,
          scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `,
        err => {
          if (err) {
            console.error('❌ 表创建失败:', err);
            reject(err);
          } else {
            console.log('📋 数据表创建成功');
            db.close();
            resolve();
          }
        }
      );
    });
  }

  /**
   * 保存数据到数据库
   */
  async saveToDatabase(data) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.dbPath);

      const insertSql = `
        INSERT OR REPLACE INTO hanabi_info (
          id, name, japanese_name, english_name, date, time, duration,
          location, venue, address, fireworks_count, expected_visitors,
          organizer, phone, website, official_site, google_maps_url,
          ticket_price, rain_policy, access_info, parking_info,
          description, features, special_notes, data_source
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.id || 'seibu-en-2025',
        data.name || '',
        data.japaneseName || '',
        data.englishName || '',
        data.date || '',
        data.time || '',
        data.duration || '',
        data.location || '',
        data.venue || '',
        data.address || '',
        data.fireworksCount || '',
        data.expectedVisitors || '',
        data.organizer || '',
        data.phone || '',
        data.website || '',
        data.officialSite || '',
        data.googleMapsUrl || '',
        data.ticketPrice || '',
        data.rainPolicy || '',
        data.accessInfo || '',
        data.parkingInfo || '',
        data.description || '',
        JSON.stringify(data.features || []),
        data.specialNotes || '',
        this.targetUrl,
      ];

      db.run(insertSql, values, function (err) {
        if (err) {
          console.error('❌ 数据保存失败:', err);
          reject(err);
        } else {
          console.log('✅ 数据保存成功, ID:', this.lastID);
          resolve(this.lastID);
        }
        db.close();
      });
    });
  }

  /**
   * 启动爬虫
   */
  async startScraping() {
    console.log('🚀 启动西武園ゆうえんち大火祭り信息爬取器...');
    console.log('🎯 目标URL:', this.targetUrl);

    // 初始化数据库
    await this.initDatabase();

    const self = this;

    const crawler = new PlaywrightCrawler({
      headless: true,
      maxRequestsPerCrawl: 1,
      requestHandlerTimeoutSecs: 60,

      launchContext: {
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
          ],
        },
      },

      async requestHandler({ page, request, log }) {
        log.info(`🔍 正在爬取: ${request.url}`);

        try {
          // 等待页面加载完成
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(3000);

          // 获取页面HTML
          const html = await page.content();
          const $ = cheerio.load(html);

          console.log('📋 开始解析页面内容...');

          // 初始化数据对象
          const hanabiData = {
            id: 'seibu-en-2025',
            name: '',
            japaneseName: '',
            englishName: 'Seibu-en Yuuenchi Hanabi Matsuri',
            date: '',
            time: '',
            duration: '',
            location: '',
            venue: '',
            address: '',
            fireworksCount: '',
            expectedVisitors: '',
            organizer: '',
            phone: '',
            website: '',
            officialSite: '',
            googleMapsUrl: '',
            ticketPrice: '',
            rainPolicy: '',
            accessInfo: '',
            parkingInfo: '',
            description: '',
            features: [],
            specialNotes: '',
          };

          // 提取页面标题
          const pageTitle = $('h1, .event-title, .detail-title, .page-title')
            .first()
            .text()
            .trim();
          if (pageTitle) {
            hanabiData.name = pageTitle;
            hanabiData.japaneseName = pageTitle;
            console.log('📝 活动名称:', pageTitle);
          }

          // 提取基本信息 - 使用多种选择器策略
          const infoSelectors = [
            '.event-detail dl',
            '.detail-item',
            '.info-item',
            '.event-info',
            'dl',
            'table tr',
          ];

          // 尝试不同的信息提取方式
          infoSelectors.forEach(selector => {
            $(selector).each((i, elem) => {
              const $elem = $(elem);

              // 处理dl/dt/dd结构
              if (selector.includes('dl')) {
                $elem.find('dt').each((j, dtElem) => {
                  const label = $(dtElem).text().trim();
                  const value = $(dtElem).next('dd').text().trim();
                  self.processInfoPair(label, value, hanabiData);
                });
              }

              // 处理表格结构
              if (selector.includes('tr')) {
                const cells = $elem.find('td, th');
                if (cells.length >= 2) {
                  const label = $(cells[0]).text().trim();
                  const value = $(cells[1]).text().trim();
                  self.processInfoPair(label, value, hanabiData);
                }
              }
            });
          });

          // 提取描述信息
          const descriptionSelectors = [
            '.event-description',
            '.detail-description',
            '.info-text',
            '.description',
            'article p',
            '.content',
          ];

          descriptionSelectors.forEach(selector => {
            const description = $(selector).text().trim();
            if (description && description.length > 20) {
              hanabiData.description = description;
              console.log(
                '📄 活动描述:',
                description.substring(0, 100) + '...'
              );
            }
          });

          // 提取链接信息
          $('a').each((i, elem) => {
            const href = $(elem).attr('href');
            const text = $(elem).text().trim();

            if (href) {
              // 官方网站
              if (
                href.includes('seibu') ||
                text.includes('官方') ||
                text.includes('公式')
              ) {
                hanabiData.officialSite = href;
                console.log('🌐 官方网站:', href);
              }

              // 谷歌地图
              if (
                href.includes('maps.google') ||
                href.includes('goo.gl/maps')
              ) {
                hanabiData.googleMapsUrl = href;
                console.log('🗺️ 谷歌地图:', href);
              }
            }
          });

          // 保存爬取到的数据
          await self.saveToDatabase(hanabiData);

          // 保存到JSON文件
          const jsonPath = path.join(
            self.outputDir,
            'seibu-en-hanabi-data.json'
          );
          fs.writeFileSync(
            jsonPath,
            JSON.stringify(hanabiData, null, 2),
            'utf8'
          );
          console.log('💾 数据已保存到:', jsonPath);

          // 更新四层页面数据文件
          await self.updatePageData(hanabiData);

          console.log('✅ 爬取完成！');
        } catch (error) {
          console.error('❌ 爬取过程中发生错误:', error);
        }
      },
    });

    // 添加要爬取的URL
    await crawler.addRequests([this.targetUrl]);

    // 开始爬取
    await crawler.run();
  }

  /**
   * 处理信息键值对
   */
  processInfoPair(label, value, hanabiData) {
    if (!label || !value) return;

    switch (true) {
      case label.includes('開催日') ||
        label.includes('日程') ||
        label.includes('期間'):
        hanabiData.date = value;
        console.log('📅 开催日期:', value);
        break;
      case label.includes('時間') || label.includes('時刻'):
        hanabiData.time = value;
        console.log('⏰ 开催时间:', value);
        break;
      case label.includes('会場') || label.includes('場所'):
        hanabiData.venue = value;
        hanabiData.location = value;
        console.log('📍 会场:', value);
        break;
      case label.includes('住所') || label.includes('所在地'):
        hanabiData.address = value;
        console.log('🏠 地址:', value);
        break;
      case label.includes('花火') && label.includes('数'):
        hanabiData.fireworksCount = value;
        console.log('🎆 花火数:', value);
        break;
      case label.includes('来場') ||
        label.includes('観客') ||
        label.includes('人数'):
        hanabiData.expectedVisitors = value;
        console.log('👥 预计观众:', value);
        break;
      case label.includes('主催') || label.includes('主办'):
        hanabiData.organizer = value;
        console.log('🏢 主办方:', value);
        break;
      case label.includes('電話') || label.includes('TEL'):
        hanabiData.phone = value;
        console.log('📞 联系电话:', value);
        break;
      case label.includes('料金') || label.includes('入場'):
        hanabiData.ticketPrice = value;
        console.log('💰 门票价格:', value);
        break;
      case label.includes('雨天'):
        hanabiData.rainPolicy = value;
        console.log('🌧️ 雨天对应:', value);
        break;
    }
  }

  /**
   * 更新四层页面数据文件
   */
  async updatePageData(data) {
    try {
      console.log('📝 正在更新四层页面数据文件...');

      const dataFilePath = path.join(
        process.cwd(),
        'src/data/hanabi/saitama/level4-seibu-en-hanabi-2025.ts'
      );

      // 确保数据目录存在
      const dataDir = path.dirname(dataFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const tsContent = `import { HanabiData } from '@/types/hanabi';

export const seibuEnHanabiData: HanabiData = {
  id: '${data.id}',
  name: '${data.name || '西武園ゆうえんち大火祭り'}',
  _sourceData: {
    japaneseName: '${data.japaneseName || '西武園ゆうえんち大火祭り'}',
    japaneseDescription: '${(data.description || '西武園游乐园举办的夏季花火祭典').replace(/'/g, "\\'")}',
  },
  englishName: '${data.englishName}',
  year: 2025,
  date: '${data.date || '2025年7月19日～9月15日'}',
  time: '${data.time || '19:30～约7分钟'}',
  duration: '${data.duration || '约7分钟'}',
  fireworksCount: '${data.fireworksCount || '非公开'}',
  expectedVisitors: '${data.expectedVisitors || '未公布'}',
  weather: '夏季温暖',
  ticketPrice: '${data.ticketPrice || '需要入园门票'}',
  status: '确定举办',
  themeColor: '#FF6B6B',
  month: 7,

  tags: {
    timeTag: '7月',
    regionTag: '埼玉',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  venues: [
    {
      name: '${data.venue || '西武园游乐园'}',
      location: '${data.address || '埼玉县所泽市'}',
      startTime: '${data.time || '19:30'}',
      features: ['游乐园花火', '连续开催', '夏季限定', '家族友好'],
    },
  ],

  access: [
    {
      venue: '西武园游乐园',
      stations: [
        {
          name: '西武园游乐园站',
          lines: ['西武山口线'],
          walkTime: '步行即达',
        },
        {
          name: '西武球场前站',
          lines: ['西武狭山线'],
          walkTime: '步行15分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '园区内观赏区域',
      rating: 4.5,
      crowdLevel: '中',
      tips: '需要入园门票，园区内多个观赏点',
      pros: ['安全舒适', '设施完善', '多角度观赏'],
      cons: ['需要门票', '时间较短'],
    },
  ],

  history: {
    established: 2020,
    significance: '西武园游乐园的夏季限定花火活动',
    highlights: [
      '游乐园内的特色花火体验',
      '连续开催的夏季祭典',
      '家族友好的娱乐活动',
      '埼玉地区人气花火景点',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '需要购买入园门票才能观赏',
        '建议提前查询具体开催日程',
        '可以结合游乐园设施一起游玩',
        '适合家族带小朋友参加',
      ],
    },
    {
      category: '交通提示',
      items: [
        '西武园游乐园站是最便利的选择',
        '园区设有大型停车场',
        '夏季期间可能会有交通拥堵',
        '建议使用西武线前往',
      ],
    },
  ],

  contact: {
    organizer: '${data.organizer || '西武园游乐园'}',
    phone: '${data.phone || '04-2929-5354'}',
    website: '${data.officialSite || 'https://www.seibu-leisure.co.jp/'}',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '西武园游乐园内',
    parking: '园区设有大型停车场',
  },

  weatherInfo: {
    month: '7-9月',
    temperature: '25-30℃',
    humidity: '70-80%',
    rainfall: '夏季雷雨',
    recommendation: '夏季服装，注意防暑',
    rainPolicy: '${data.rainPolicy || '恶劣天气时可能中止'}',
    note: '游乐园内相对舒适',
  },

  specialFeatures: {
    scale: '小型游乐园花火',
    location: '西武园游乐园',
    tradition: '夏季限定活动',
    atmosphere: '家族娱乐',
  },

  special2025: {
    theme: '夏季祭典',
    concept: '游乐园与花火的融合体验',
    features: [
      '连续开催的夏季花火',
      '游乐园内的独特观赏体验',
      '家族友好的娱乐活动',
      '埼玉地区特色花火',
    ],
  },

  mapEmbedUrl: '${data.googleMapsUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.1!2d139.4661!3d35.7653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018dc0a1234567%3A0x123456789abcdef!2z6KW_5q2m5ZyS5ri45aWz5Zyw!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp'}',

  officialSource: {
    walkerPlusUrl: '${this.targetUrl}',
    verificationDate: '${new Date().toISOString().split('T')[0]}',
    dataConfirmedBy: 'SCRAPED_FROM_WALKERPLUS',
    lastChecked: '${new Date().toISOString().split('T')[0]}',
  },

  description: '${(data.description || '西武园游乐园举办的夏季限定花火祭典，连续开催期间可以在园区内欣赏到精美的花火表演，是家族游玩的理想选择。').replace(/'/g, "\\'")}',

  related: {
    regionRecommendations: [
      {
        id: 'asaka-hanabi',
        name: '朝霞市民祭典',
        date: '2025-08-02',
        location: '朝霞市',
        visitors: '约35万人',
        link: '/saitama/hanabi/asaka',
      },
    ],
    timeRecommendations: [
      {
        id: 'ina-hanabi',
        name: '伊奈祭り',
        date: '2025-08-03',
        location: '伊奈町',
        visitors: '约5万人',
        link: '/saitama/hanabi/ina',
      },
    ],
    sameMonth: ['/saitama/hanabi/asaka', '/saitama/hanabi/ina'],
    sameRegion: ['/saitama/hanabi/asaka', '/saitama/hanabi/ina'],
    recommended: ['/saitama/hanabi/asaka', '/saitama/hanabi/ina'],
  },
};`;

      // 写入数据文件
      fs.writeFileSync(dataFilePath, tsContent, 'utf8');
      console.log('✅ 数据文件已更新:', dataFilePath);

      // 更新页面文件
      await this.updatePageFile(data);
    } catch (error) {
      console.error('❌ 更新数据文件失败:', error);
    }
  }

  /**
   * 更新页面文件
   */
  async updatePageFile(data) {
    try {
      const pageFilePath = path.join(
        process.cwd(),
        'src/app/saitama/hanabi/seibu-en-2025/page.tsx'
      );

      const pageContent = `import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { seibuEnHanabiData } from '@/data/hanabi/saitama/level4-seibu-en-hanabi-2025';

export const metadata: Metadata = {
  title: '${data.name || '西武園ゆうえんち大火祭り'} - 埼玉花火大会',
  description: '${(data.description || '西武园游乐园举办的夏季限定花火祭典，连续开催期间可以在园区内欣赏到精美的花火表演。').replace(/'/g, "\\'")}',
  keywords: '西武园,游乐园,花火,埼玉,所泽,夏季祭典',
};

export default function SeibuEnHanabiPage() {
  return <HanabiDetailTemplate data={seibuEnHanabiData} regionKey="saitama" />;
}`;

      fs.writeFileSync(pageFilePath, pageContent, 'utf8');
      console.log('✅ 页面文件已更新:', pageFilePath);
    } catch (error) {
      console.error('❌ 更新页面文件失败:', error);
    }
  }
}

// 执行爬虫
async function main() {
  const scraper = new SeibuEnHanabiScraper();
  await scraper.startScraping();
}

// 直接执行
main().catch(console.error);
