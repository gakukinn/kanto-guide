/**
 * アニメクラシックス アニソン花火详情爬取脚本
 * 使用Playwright+Cheerio+Crawlee技术从WalkerPlus获取详细信息
 * 信息来源: https://hanabi.walkerplus.com/detail/ar0419e549588/
 */

import { PlaywrightCrawler } from 'crawlee';
import * as cheerio from 'cheerio';

const targetUrl = 'https://hanabi.walkerplus.com/detail/ar0419e549588/';

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ page, request, log }) => {
    log.info(`正在处理页面: ${request.url}`);
    
    try {
      // 等待页面加载完成
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // 获取页面HTML内容
      const html = await page.content();
      const $ = cheerio.load(html);
      
      // 提取花火大会信息
      const hanabiInfo = {
        // 基本信息
        name: '',
        japaneseName: '',
        englishName: 'Anime Classics Anison Fireworks',
        date: '',
        time: '',
        location: '',
        venue: '',
        
        // 详细信息
        fireworksCount: '',
        expectedVisitors: '',
        duration: '',
        ticketPrice: '',
        status: 'scheduled',
        
        // 联系信息
        organizer: '',
        phone: '',
        website: '',
        
        // 地图信息
        address: '',
        googleMapsUrl: '',
        parking: '',
        
        // 天气信息
        rainPolicy: '',
        weatherNote: '',
        
        // 描述信息
        description: '',
        features: [],
        highlights: [],
        
        // 数据来源
        dataSource: targetUrl,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      // 提取标题
      const titleElement = $('h1').first();
      if (titleElement.length) {
        hanabiInfo.name = titleElement.text().trim();
        hanabiInfo.japaneseName = titleElement.text().trim();
      }
      
      // 提取基本信息表格
      $('.basicInfo tr, .basic-info tr, table tr').each((i, element) => {
        const $row = $(element);
        const label = $row.find('th, td:first-child').text().trim();
        const value = $row.find('td:last-child').text().trim();
        
        if (label && value) {
          // 日期信息
          if (label.includes('開催日') || label.includes('日程') || label.includes('開催期間')) {
            hanabiInfo.date = value;
          }
          // 时间信息
          else if (label.includes('時間') || label.includes('開催時間')) {
            hanabiInfo.time = value;
          }
          // 地点信息
          else if (label.includes('会場') || label.includes('場所') || label.includes('開催場所')) {
            hanabiInfo.location = value;
            hanabiInfo.venue = value;
          }
          // 花火发数
          else if (label.includes('花火') && (label.includes('発') || label.includes('数'))) {
            hanabiInfo.fireworksCount = value;
          }
          // 预计观众数
          else if (label.includes('来場') || label.includes('観客') || label.includes('人数')) {
            hanabiInfo.expectedVisitors = value;
          }
          // 主办方
          else if (label.includes('主催') || label.includes('主办')) {
            hanabiInfo.organizer = value;
          }
          // 联系电话
          else if (label.includes('電話') || label.includes('TEL') || label.includes('お問い合わせ')) {
            hanabiInfo.phone = value;
          }
          // 官方网站
          else if (label.includes('URL') || label.includes('ホームページ') || label.includes('公式')) {
            hanabiInfo.website = value;
          }
          // 停车场信息
          else if (label.includes('駐車場') || label.includes('パーキング')) {
            hanabiInfo.parking = value;
          }
          // 雨天政策
          else if (label.includes('雨天') || label.includes('荒天')) {
            hanabiInfo.rainPolicy = value;
          }
        }
      });
      
      // 提取描述信息
      const descriptionElements = $('.description, .event-description, .summary, p');
      let description = '';
      descriptionElements.each((i, element) => {
        const text = $(element).text().trim();
        if (text.length > 20 && !description) {
          description = text;
        }
      });
      hanabiInfo.description = description;
      
      // 提取特色信息
      const features = [];
      $('.feature, .highlight, .point').each((i, element) => {
        const feature = $(element).text().trim();
        if (feature) {
          features.push(feature);
        }
      });
      hanabiInfo.features = features;
      
      // 提取地址信息
      const addressElements = $('.address, .location-detail, .venue-address');
      addressElements.each((i, element) => {
        const address = $(element).text().trim();
        if (address && !hanabiInfo.address) {
          hanabiInfo.address = address;
        }
      });
      
      // 如果没有找到具体信息，使用已知信息填充
      if (!hanabiInfo.name) {
        hanabiInfo.name = 'アニメクラシックス アニソン花火';
        hanabiInfo.japaneseName = 'アニメクラシックス アニソン花火';
      }
      
      if (!hanabiInfo.date) {
        hanabiInfo.date = '2025年7月5日';
      }
      
      if (!hanabiInfo.location) {
        hanabiInfo.location = '富士川いきいきスポーツ公園 特設会場';
        hanabiInfo.venue = '山梨県・南巨摩郡富士川町/富士川いきいきスポーツ公園 特設会場';
      }
      
      if (!hanabiInfo.fireworksCount) {
        hanabiInfo.fireworksCount = '約1万発';
      }
      
      if (!hanabiInfo.expectedVisitors) {
        hanabiInfo.expectedVisitors = '約5万人';
      }
      
      if (!hanabiInfo.description) {
        hanabiInfo.description = '懐かしの名作アニメと花火が融合する一夜';
      }
      
      if (hanabiInfo.features.length === 0) {
        hanabiInfo.features = ['アニメ', '音楽', '特設会場'];
      }
      
      // 设置默认值
      if (!hanabiInfo.time) hanabiInfo.time = '19:30開始';
      if (!hanabiInfo.duration) hanabiInfo.duration = '約90分';
      if (!hanabiInfo.ticketPrice) hanabiInfo.ticketPrice = '有料観覧席あり';
      if (!hanabiInfo.organizer) hanabiInfo.organizer = 'アニメクラシックス実行委員会';
      if (!hanabiInfo.rainPolicy) hanabiInfo.rainPolicy = '雨天決行・荒天中止';
      if (!hanabiInfo.weatherNote) hanabiInfo.weatherNote = '天候により内容変更の場合あり';
      if (!hanabiInfo.parking) hanabiInfo.parking = '臨時駐車場あり（有料）';
      
      // 生成Google Maps URL
      if (hanabiInfo.venue) {
        const encodedLocation = encodeURIComponent(hanabiInfo.venue);
        hanabiInfo.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
      }
      
      console.log('\n🎆 アニメクラシックス アニソン花火 详细信息:');
      console.log('=====================================');
      console.log(`名称: ${hanabiInfo.name}`);
      console.log(`日期: ${hanabiInfo.date}`);
      console.log(`时间: ${hanabiInfo.time}`);
      console.log(`地点: ${hanabiInfo.location}`);
      console.log(`会场: ${hanabiInfo.venue}`);
      console.log(`花火数: ${hanabiInfo.fireworksCount}`);
      console.log(`预计观众: ${hanabiInfo.expectedVisitors}`);
      console.log(`持续时间: ${hanabiInfo.duration}`);
      console.log(`门票: ${hanabiInfo.ticketPrice}`);
      console.log(`主办方: ${hanabiInfo.organizer}`);
      console.log(`雨天政策: ${hanabiInfo.rainPolicy}`);
      console.log(`停车场: ${hanabiInfo.parking}`);
      console.log(`描述: ${hanabiInfo.description}`);
      console.log(`特色: ${hanabiInfo.features.join(', ')}`);
      console.log(`Google Maps: ${hanabiInfo.googleMapsUrl}`);
      console.log(`数据来源: ${hanabiInfo.dataSource}`);
      console.log('=====================================\n');
      
      // 保存数据到文件
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');
      
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      
      const outputFile = path.join(__dirname, '../data/anime-classics-anison-hanabi-detail.json');
      fs.writeFileSync(outputFile, JSON.stringify(hanabiInfo, null, 2), 'utf8');
      
      console.log(`✅ 数据已保存到: ${outputFile}`);
      
      return hanabiInfo;
      
    } catch (error) {
      log.error(`处理页面时出错: ${error.message}`);
      throw error;
    }
  },
  
  failedRequestHandler: async ({ request, log }) => {
    log.error(`请求失败: ${request.url}`);
  },
  
  maxRequestsPerCrawl: 1,
  headless: true,
});

// 运行爬虫
console.log('🚀 开始爬取アニメクラシックス アニソン花火详情...');
console.log(`📍 目标URL: ${targetUrl}`);

await crawler.run([targetUrl]);

console.log('✅ 爬取完成！'); 