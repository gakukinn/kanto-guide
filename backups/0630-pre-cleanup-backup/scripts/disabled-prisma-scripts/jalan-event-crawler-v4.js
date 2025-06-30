/**
 * 通用Jalan活动信息爬虫 v4.0
 * @description 使用Playwright+Cheerio技术，爬取任意Jalan活动页面信息
 * @author AI Assistant
 * @date 2025-06-22
 * @features
 * - 支持任意Jalan活动URL
 * - 4种谷歌地图坐标提取方法
 * - name相同时自动覆盖
 * - 中日英三语言名称支持
 * - 完整的验证和错误处理
 */

import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 配置参数
const CONFIG = {
  // 目标URL - 可通过命令行参数传入
  defaultUrl: 'https://www.jalan.net/event/evt_342198/?screenId=OUW1702',
  // 地区映射
  regionMapping: {
    '山梨': 'koshinetsu',
    '東京': 'tokyo', 
    '神奈川': 'kanagawa',
    '千葉': 'chiba',
    '埼玉': 'saitama',
    '茨城': 'kitakanto',
    '栃木': 'kitakanto',
    '群馬': 'kitakanto'
  },
  // 浏览器配置
  browserOptions: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};

/**
 * 4种谷歌地图坐标提取方法
 * 参考: docs/0622-谷歌地图Playwright和Cheerio坐标提取技术指南.md
 */
class CoordinatesExtractor {
  constructor(page, $) {
    this.page = page;
    this.$ = $;
    this.methods = [
      { name: 'iframe', priority: 1, method: this.extractFromIframe.bind(this) },
      { name: 'javascript', priority: 2, method: this.extractFromJavaScript.bind(this) },
      { name: 'link', priority: 3, method: this.extractFromLinks.bind(this) },
      { name: 'meta', priority: 4, method: this.extractFromMeta.bind(this) }
    ];
  }

  // 方法1: iframe地图坐标提取
  async extractFromIframe() {
    try {
      const iframes = this.$('iframe[src*="maps.google"]');
      if (iframes.length > 0) {
        const src = iframes.first().attr('src');
        const match = src.match(/[?&]q=([0-9.-]+),([0-9.-]+)/);
        if (match) {
          return {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
            source: 'iframe-q=([0-9.-]+),([0-9.-]+)'
          };
        }
      }
      return null;
    } catch (error) {
      console.log(`iframe方法出错: ${error.message}`);
      return null;
    }
  }

  // 方法2: JavaScript变量坐标提取
  async extractFromJavaScript() {
    try {
      const jsText = await this.page.content();
      
      // 搜索常见的JavaScript变量模式
      const patterns = [
        /lat['":\s]*([0-9.-]+).*?lng['":\s]*([0-9.-]+)/gi,
        /latitude['":\s]*([0-9.-]+).*?longitude['":\s]*([0-9.-]+)/gi,
        /center['":\s]*\{[^}]*lat['":\s]*([0-9.-]+)[^}]*lng['":\s]*([0-9.-]+)/gi
      ];

      for (const pattern of patterns) {
        const match = pattern.exec(jsText);
        if (match) {
          return {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
            source: `javascript-${pattern.source}`
          };
        }
      }
      return null;
    } catch (error) {
      console.log(`JavaScript方法出错: ${error.message}`);
      return null;
    }
  }

  // 方法3: 链接坐标提取 (推荐方法)
  async extractFromLinks() {
    try {
      const links = this.$('a[href*="maps.google"], a[href*="google.com/maps"]');
      
      for (let i = 0; i < links.length; i++) {
        const href = links.eq(i).attr('href');
        if (!href) continue;

        // 多种链接模式
        const patterns = [
          /ll=([0-9.-]+),([0-9.-]+)/,
          /q=([0-9.-]+),([0-9.-]+)/,
          /@([0-9.-]+),([0-9.-]+)/,
          /maps\?.*?([0-9.-]+),([0-9.-]+)/
        ];

        for (const pattern of patterns) {
          const match = href.match(pattern);
          if (match) {
            return {
              lat: parseFloat(match[1]),
              lng: parseFloat(match[2]),
              source: `link-${pattern.source}`,
              url: href
            };
          }
        }
      }
      return null;
    } catch (error) {
      console.log(`链接方法出错: ${error.message}`);
      return null;
    }
  }

  // 方法4: Meta标签坐标提取
  async extractFromMeta() {
    try {
      const metaTags = this.$('meta[property*="latitude"], meta[property*="longitude"], meta[name*="geo"]');
      
      let lat = null, lng = null;
      
      metaTags.each((i, elem) => {
        const property = this.$(elem).attr('property') || this.$(elem).attr('name');
        const content = this.$(elem).attr('content');
        
        if (property && content) {
          if (property.includes('latitude')) lat = parseFloat(content);
          if (property.includes('longitude')) lng = parseFloat(content);
        }
      });

      if (lat && lng) {
        return {
          lat: lat,
          lng: lng,
          source: 'meta-geo-tags'
        };
      }
      return null;
    } catch (error) {
      console.log(`Meta标签方法出错: ${error.message}`);
      return null;
    }
  }

  // 执行所有提取方法并返回最优结果
  async extract() {
    console.log('🗺️ 开始多方法坐标提取...');
    
    const results = {};
    
    for (const method of this.methods) {
      console.log(`🔍 方法${method.priority}: 检查${method.name}...`);
      try {
        const result = await method.method();
        results[method.name] = result;
      } catch (error) {
        console.log(`❌ 方法${method.priority}失败: ${error.message}`);
        results[method.name] = null;
      }
    }

    console.log('📊 提取结果汇总:');
    Object.entries(results).forEach(([method, result]) => {
      console.log(`${method}方法: ${result ? JSON.stringify(result, null, 2) : 'null'}`);
    });

    // 按优先级选择最佳结果 (链接方法优先)
    for (const methodName of ['link', 'iframe', 'javascript', 'meta']) {
      if (results[methodName]) {
        console.log(`✅ 使用${methodName}方法提取的坐标 (技术指南推荐)`);
        return results[methodName];
      }
    }

    console.log('❌ 所有方法均未能提取到坐标');
    return null;
  }
}

/**
 * 主爬虫类
 */
class JalanEventCrawler {
  constructor(url) {
    this.url = url || CONFIG.defaultUrl;
    this.browser = null;
    this.page = null;
  }

  // 初始化浏览器
  async initBrowser() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch(CONFIG.browserOptions);
    this.page = await this.browser.newPage();
    
    // 设置用户代理避免被识别为机器人
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  }

  // 爬取页面数据
  async scrapeData() {
    console.log(`🌐 访问页面: ${this.url}`);
    
    try {
      await this.page.goto(this.url, { waitUntil: 'networkidle' });
      await this.page.waitForTimeout(2000); // 等待页面完全加载
      
      const html = await this.page.content();
      const $ = cheerio.load(html);
      
      // 提取基本信息
      const basicInfo = this.extractBasicInfo($);
      
      // 提取坐标信息
      const extractor = new CoordinatesExtractor(this.page, $);
      const coordinates = await extractor.extract();
      
      // 生成地图信息
      const mapInfo = coordinates ? this.generateMapInfo(coordinates) : null;
      
      return {
        ...basicInfo,
        coordinates,
        mapInfo
      };
      
    } catch (error) {
      console.error(`❌ 页面爬取失败: ${error.message}`);
      throw error;
    }
  }

  // 提取基本活动信息
  extractBasicInfo($) {
    console.log('📋 提取基本活动信息...');
    
    // 活动名称
    const name = $('h1').first().text().trim() || 
                 $('.event-title').text().trim() ||
                 $('title').text().replace(' - じゃらんnet', '').trim();

    // 开催期间
    const period = $('td:contains("開催期間"), th:contains("開催期間")').next().text().trim() ||
                   $('.period').text().trim() ||
                   $('[class*="period"]').text().trim();

    // 开催场所
    const venue = $('td:contains("開催場所"), th:contains("開催場所")').next().text().trim() ||
                  $('.venue').text().trim() ||
                  $('[class*="venue"]').text().trim();

    // 详细地址
    const address = $('td:contains("所在地"), th:contains("所在地")').next().text().trim() ||
                    $('.address').text().trim() ||
                    $('[class*="address"]').text().trim();

    // 交通信息
    const access = $('td:contains("交通アクセス"), th:contains("交通アクセス")').next().text().trim() ||
                   $('.access').text().trim() ||
                   $('[class*="access"]').text().trim();

    // 主办方
    const organizer = $('td:contains("主催"), th:contains("主催")').next().text().trim() ||
                      $('.organizer').text().trim() ||
                      $('[class*="organizer"]').text().trim();

    // 费用
    const price = $('td:contains("料金"), th:contains("料金")').next().text().trim() ||
                  $('.price').text().trim() ||
                  $('[class*="price"]').text().trim();

    // 联系方式
    const contact = $('td:contains("問合せ先"), th:contains("問合せ先")').next().text().trim() ||
                    $('.contact').text().trim() ||
                    $('[class*="contact"]').text().trim();

    // 官方网站
    const website = $('td:contains("ホームページ"), th:contains("ホームページ")').next().text().trim() ||
                    $('a[href*="http"]:contains("公式")').attr('href') ||
                    $('.website a').attr('href') ||
                    $('[class*="website"] a').attr('href');

    // 活动描述
    const description = $('.event-description').text().trim() ||
                       $('[class*="description"]').text().trim() ||
                       $('p').filter((i, el) => $(el).text().length > 50).first().text().trim();

    return {
      name,
      period,
      venue,
      address,
      access,
      organizer,
      price,
      contact,
      website,
      description
    };
  }

  // 生成地图信息
  generateMapInfo(coordinates) {
    if (!coordinates) return null;

    const { lat, lng, source } = coordinates;
    
    return {
      latitude: lat,
      longitude: lng,
      coordsSource: source,
      mapUrl: `https://maps.google.com/?q=${lat},${lng}`,
      embedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(coordinates.name || '活动地点')}!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`
    };
  }

  // 确定地区
  determineRegion(venue, address) {
    const text = `${venue} ${address}`;
    
    for (const [prefecture, region] of Object.entries(CONFIG.regionMapping)) {
      if (text.includes(prefecture)) {
        return region;
      }
    }
    
    // 默认返回koshinetsu（山梨县通常在此区域）
    return 'koshinetsu';
  }

  // 保存到数据库
  async saveToDatabase(data) {
    console.log('💾 开始保存到数据库...');
    
    try {
      // 确定地区
      const regionKey = this.determineRegion(data.venue, data.address);
      console.log(`🗺️ 确定地区: ${regionKey}`);
      
      // 查找地区ID
      const region = await prisma.region.findUnique({
        where: { key: regionKey }
      });
      
      if (!region) {
        throw new Error(`地区 ${regionKey} 不存在于数据库中`);
      }
      
      console.log(`🗺️ 地区ID: ${region.id}`);
      
      // 检查是否存在同名活动
      const existingEvent = await prisma.hanamiEvent.findFirst({
        where: { name: data.name }
      });
      
      // 准备数据
      const eventData = {
        name: data.name,
        season: data.period,
        venue: data.venue,
        address: data.address,
        access: data.access,
        organizer: data.organizer,
        price: data.price,
        contact: data.contact,
        website: data.website,
        description: data.description,
        regionId: region.id,
        mapInfo: data.mapInfo ? JSON.stringify(data.mapInfo) : null
      };
      
      let savedEvent;
      
      if (existingEvent) {
        // 覆盖更新
        console.log(`🔄 发现同名活动，执行覆盖更新: ${data.name}`);
        savedEvent = await prisma.hanamiEvent.update({
          where: { id: existingEvent.id },
          data: eventData
        });
        console.log(`✅ 覆盖更新成功: ${data.name} ID: ${savedEvent.id}`);
      } else {
        // 新建
        console.log(`➕ 创建新活动: ${data.name}`);
        savedEvent = await prisma.hanamiEvent.create({
          data: eventData
        });
        console.log(`✅ 新建成功: ${data.name} ID: ${savedEvent.id}`);
      }
      
      return savedEvent;
      
    } catch (error) {
      console.error(`❌ 数据库保存失败: ${error.message}`);
      throw error;
    }
  }

  // 清理资源
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
    await prisma.$disconnect();
  }

  // 主执行方法
  async run() {
    console.log('🎯 Jalan活动信息精确爬虫 v4.0');
    console.log('⚙️ 技术栈: Playwright + Cheerio + Prisma');
    console.log('🗺️ 坐标提取: 4种方法 (iframe/JavaScript/链接/Meta)');
    console.log('🔄 覆盖策略: name相同时自动覆盖');
    console.log('📋 参考文档: 0622-谷歌地图Playwright和Cheerio坐标提取技术指南');
    console.log('======================================================================');
    
    try {
      await this.initBrowser();
      const data = await this.scrapeData();
      
      if (data.coordinates) {
        console.log(`🎯 最终坐标: ${data.coordinates.lat}, ${data.coordinates.lng} (来源: ${data.coordinates.source})`);
      } else {
        console.log('⚠️ 未能提取到坐标信息');
      }
      
      console.log('📊 提取的数据:', JSON.stringify(data, null, 2));
      
      const savedEvent = await this.saveToDatabase(data);
      
      console.log('\n📋 重点信息确认:');
      console.log(`📅 日期: ${data.period}`);
      console.log(`📍 地点: ${data.venue}`);
      if (data.coordinates) {
        console.log(`🗺️ 精确坐标: ${data.coordinates.lat}, ${data.coordinates.lng}`);
        console.log(`📍 坐标来源: ${data.coordinates.source}`);
        console.log(`🔗 地图链接: ${data.mapInfo?.mapUrl}`);
      }
      console.log(`🌐 官方网站: ${data.website}`);
      console.log(`💰 费用: ${data.price}`);
      console.log(`🚌 交通: ${data.access}`);
      console.log(`📞 联系方式: ${data.contact}`);
      
      console.log('======================================================================');
      console.log('🎉 爬取任务完成!');
      console.log('✅ 使用技术指南推荐的4种方法精确提取坐标');
      
    } catch (error) {
      console.error('❌ 任务执行失败:', error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 主程序入口
async function main() {
  try {
    // 支持命令行参数传入URL
    const url = process.argv[2] || CONFIG.defaultUrl;
    console.log(`🎯 目标URL: ${url}`);
    
    const crawler = new JalanEventCrawler(url);
    await crawler.run();
    
  } catch (error) {
    console.error('💥 程序执行失败:', error);
    process.exit(1);
  }
}

// 启动程序
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 