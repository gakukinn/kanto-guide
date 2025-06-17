/**
 * おぢやまつり大花火大会 数据抓取器
 * 使用Playwright+Cheerio+Crawlee技术栈
 * 目标：https://hanabi.walkerplus.com/detail/ar0415e00060/
 * 
 * 创建时间：2025-06-14
 * 用途：定期抓取和验证数据
 */

import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function crawlOjiyaMatsuriData() {
  let browser;
  const crawlTime = new Date().toISOString();
  
  try {
    console.log('🚀 启动おぢやまつり大花火大会数据抓取...');
    console.log('📅 抓取时间:', crawlTime);
    
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    console.log('📄 访问WalkerPlus页面...');
    await page.goto('https://hanabi.walkerplus.com/detail/ar0415e00060/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    console.log('⏳ 等待页面加载...');
    await page.waitForTimeout(5000);
    
    console.log('📊 解析页面内容...');
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // 抓取数据结构
    const crawledData = {
      // 元数据
      metadata: {
        crawlTime: crawlTime,
        sourceUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00060/',
        crawler: 'ojiya-matsuri-crawler.js',
        version: '1.0.0'
      },
      
      // 基本信息
      basicInfo: {
        title: '',
        date: '',
        time: '',
        location: '',
        venue: '',
        address: ''
      },
      
      // 花火信息
      fireworksInfo: {
        count: '',
        expectedVisitors: '',
        scale: ''
      },
      
      // 交通信息
      accessInfo: {
        nearestStation: '',
        walkTime: '',
        carAccess: '',
        parking: ''
      },
      
      // 联系信息
      contactInfo: {
        organizer: '',
        phone: '',
        website: '',
        officialSite: ''
      },
      
      // 描述信息
      description: {
        summary: '',
        features: [],
        highlights: []
      },
      
      // 媒体信息
      media: {
        images: [],
        videos: []
      },
      
      // 原始页面信息
      rawData: {
        pageTitle: $('title').text().trim(),
        h1Title: $('h1').first().text().trim(),
        metaDescription: $('meta[name="description"]').attr('content') || '',
        pageText: $('body').text().substring(0, 1000) // 保存前1000字符用于分析
      }
    };
    
    // 提取标题
    const titleElement = $('h1').first();
    if (titleElement.length) {
      crawledData.basicInfo.title = titleElement.text().trim();
      console.log('📝 标题:', crawledData.basicInfo.title);
    }
    
    // 提取基本信息表格
    $('.basicInfoTable tr, .basic-info tr, table tr').each((i, element) => {
      const $row = $(element);
      const label = $row.find('th, td:first-child').text().trim();
      const value = $row.find('td:last-child').text().trim();
      
      if (label.includes('開催日') || label.includes('日程')) {
        crawledData.basicInfo.date = value;
        console.log('📅 日期:', value);
      } else if (label.includes('開催時間') || label.includes('時間')) {
        crawledData.basicInfo.time = value;
        console.log('🕐 时间:', value);
      } else if (label.includes('会場') || label.includes('場所')) {
        crawledData.basicInfo.venue = value;
        console.log('📍 会场:', value);
      } else if (label.includes('住所') || label.includes('所在地')) {
        crawledData.basicInfo.address = value;
        console.log('🏠 地址:', value);
      } else if (label.includes('花火打上数') || label.includes('花火数')) {
        crawledData.fireworksInfo.count = value;
        console.log('🎆 花火数:', value);
      } else if (label.includes('例年の人出') || label.includes('来場者数')) {
        crawledData.fireworksInfo.expectedVisitors = value;
        console.log('👥 预计观众:', value);
      } else if (label.includes('アクセス') || label.includes('交通')) {
        crawledData.accessInfo.carAccess = value;
        console.log('🚗 交通:', value);
      } else if (label.includes('駐車場')) {
        crawledData.accessInfo.parking = value;
        console.log('🅿️ 停车:', value);
      } else if (label.includes('問い合わせ') || label.includes('連絡先')) {
        crawledData.contactInfo.organizer = value;
        console.log('📞 联系:', value);
      }
    });
    
    // 提取描述信息
    const descriptionElements = $('.eventDescription, .description, .event-detail p');
    if (descriptionElements.length) {
      crawledData.description.summary = descriptionElements.first().text().trim();
      console.log('📖 描述:', crawledData.description.summary.substring(0, 100) + '...');
    }
    
    // 提取特色信息
    $('.feature-list li, .highlight-list li, .point-list li').each((i, element) => {
      const feature = $(element).text().trim();
      if (feature) {
        crawledData.description.features.push(feature);
      }
    });
    
    // 提取图片信息
    $('img').each((i, element) => {
      const $img = $(element);
      const src = $img.attr('src');
      const alt = $img.attr('alt') || '';
      
      if (src && (src.includes('hanabi') || src.includes('firework')) && !src.includes('icon') && !src.includes('logo')) {
        crawledData.media.images.push({
          url: src.startsWith('http') ? src : `https://hanabi.walkerplus.com${src}`,
          alt: alt,
          caption: alt || crawledData.basicInfo.title
        });
      }
    });
    
    // 从页面文本中提取更多信息
    const pageText = $('body').text();
    
    // 提取地点信息
    if (!crawledData.basicInfo.location && !crawledData.basicInfo.venue) {
      const locationMatch = pageText.match(/(新潟県[^。\n]+)/);
      if (locationMatch) {
        crawledData.basicInfo.location = locationMatch[1];
        console.log('📍 提取的地点:', crawledData.basicInfo.location);
      }
    }
    
    // 提取时间信息
    if (!crawledData.basicInfo.time) {
      const timeMatch = pageText.match(/(\d{1,2}:\d{2}[^。\n]*)/);
      if (timeMatch) {
        crawledData.basicInfo.time = timeMatch[1];
        console.log('🕐 提取的时间:', crawledData.basicInfo.time);
      }
    }
    
    // 保存数据到永久位置
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `ojiya-matsuri-${timestamp}.json`;
    const filepath = path.join('data', 'walkerplus-crawled', filename);
    
    // 确保目录存在
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, JSON.stringify(crawledData, null, 2), 'utf8');
    console.log(`💾 数据已保存到: ${filepath}`);
    
    // 同时保存最新版本（便于快速访问）
    const latestPath = path.join('data', 'walkerplus-crawled', 'ojiya-matsuri-latest.json');
    fs.writeFileSync(latestPath, JSON.stringify(crawledData, null, 2), 'utf8');
    console.log(`📌 最新版本已保存到: ${latestPath}`);
    
    // 输出抓取摘要
    console.log('\n📋 抓取摘要:');
    console.log('标题:', crawledData.basicInfo.title);
    console.log('日期:', crawledData.basicInfo.date);
    console.log('时间:', crawledData.basicInfo.time);
    console.log('地点:', crawledData.basicInfo.venue || crawledData.basicInfo.location);
    console.log('花火数:', crawledData.fireworksInfo.count);
    console.log('观众数:', crawledData.fireworksInfo.expectedVisitors);
    console.log('图片数量:', crawledData.media.images.length);
    console.log('抓取时间:', crawlTime);
    
    return crawledData;
    
  } catch (error) {
    console.error('❌ 抓取过程中出现错误:', error);
    
    // 保存错误日志
    const errorLog = {
      timestamp: crawlTime,
      error: error.message,
      stack: error.stack,
      url: 'https://hanabi.walkerplus.com/detail/ar0415e00060/'
    };
    
    const errorPath = path.join('data', 'verification', 'crawl-errors.json');
    let errors = [];
    if (fs.existsSync(errorPath)) {
      errors = JSON.parse(fs.readFileSync(errorPath, 'utf8'));
    }
    errors.push(errorLog);
    fs.writeFileSync(errorPath, JSON.stringify(errors, null, 2), 'utf8');
    
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

// 如果直接运行此脚本
if (process.argv[1] && process.argv[1].endsWith('ojiya-matsuri-crawler.js')) {
  crawlOjiyaMatsuriData()
    .then(data => {
      console.log('✅ おぢやまつり大花火大会数据抓取完成!');
      console.log('📁 数据已保存到 data/walkerplus-crawled/ 目录');
    })
    .catch(error => {
      console.error('💥 抓取失败:', error);
      process.exit(1);
    });
}

export { crawlOjiyaMatsuriData }; 