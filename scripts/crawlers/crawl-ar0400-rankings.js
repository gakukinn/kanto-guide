/**
 * WalkerPlus ar0400地区花火排行信息抓取器
 * 使用Playwright+Cheerio+Crawlee技术栈
 * 目标：https://hanabi.walkerplus.com/launch/ar0400/
 */

import { PlaywrightCrawler } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';

// 抓取配置
const crawlerConfig = {
  requestHandlerTimeoutSecs: 60,
  maxRequestRetries: 3,
  maxConcurrency: 1,
  headless: true
};

// 排行数据存储
let rankingData = {
  region: 'ar0400',
  regionName: '甲信越',
  url: 'https://hanabi.walkerplus.com/launch/ar0400/',
  scrapedAt: new Date().toISOString(),
  rankings: {
    popularity: [],      // 人气排行
    attendance: [],      // 观众数排行
    fireworks: [],       // 花火数排行
    overall: []          // 综合排行
  },
  events: []
};

// 创建Playwright爬虫
const crawler = new PlaywrightCrawler({
  ...crawlerConfig,
  async requestHandler({ page, request, log }) {
    try {
      log.info(`正在抓取: ${request.url}`);
      
      // 等待页面加载完成
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      
      // 获取页面HTML
      const html = await page.content();
      const $ = cheerio.load(html);
      
      log.info('开始解析排行数据...');
      
      // 1. 抓取人气排行
      $('.ranking-popular .ranking-item').each((index, element) => {
        const $item = $(element);
        const rank = index + 1;
        const title = $item.find('.event-title').text().trim();
        const location = $item.find('.event-location').text().trim();
        const date = $item.find('.event-date').text().trim();
        const url = $item.find('a').attr('href');
        
        if (title) {
          rankingData.rankings.popularity.push({
            rank,
            title,
            location,
            date,
            url: url ? `https://hanabi.walkerplus.com${url}` : null
          });
        }
      });
      
      // 2. 抓取观众数排行
      $('.ranking-attendance .ranking-item').each((index, element) => {
        const $item = $(element);
        const rank = index + 1;
        const title = $item.find('.event-title').text().trim();
        const attendance = $item.find('.attendance-count').text().trim();
        const url = $item.find('a').attr('href');
        
        if (title) {
          rankingData.rankings.attendance.push({
            rank,
            title,
            attendance,
            url: url ? `https://hanabi.walkerplus.com${url}` : null
          });
        }
      });
      
      // 3. 抓取花火数排行
      $('.ranking-fireworks .ranking-item').each((index, element) => {
        const $item = $(element);
        const rank = index + 1;
        const title = $item.find('.event-title').text().trim();
        const fireworksCount = $item.find('.fireworks-count').text().trim();
        const url = $item.find('a').attr('href');
        
        if (title) {
          rankingData.rankings.fireworks.push({
            rank,
            title,
            fireworksCount,
            url: url ? `https://hanabi.walkerplus.com${url}` : null
          });
        }
      });
      
      // 4. 抓取综合排行（通用选择器）
      $('.ranking-list .item, .event-item, .hanabi-item').each((index, element) => {
        const $item = $(element);
        const title = $item.find('h3, .title, .event-name').text().trim();
        const location = $item.find('.location, .place, .venue').text().trim();
        const date = $item.find('.date, .event-date').text().trim();
        const attendance = $item.find('.attendance, .visitor, .people').text().trim();
        const fireworks = $item.find('.fireworks, .hanabi-count').text().trim();
        const url = $item.find('a').attr('href');
        
        if (title && index < 20) { // 限制前20个
          rankingData.rankings.overall.push({
            rank: index + 1,
            title,
            location,
            date,
            attendance,
            fireworks,
            url: url ? (url.startsWith('http') ? url : `https://hanabi.walkerplus.com${url}`) : null
          });
        }
      });
      
      // 5. 抓取所有花火事件（备用方法）
      $('a[href*="/detail/"]').each((index, element) => {
        const $link = $(element);
        const href = $link.attr('href');
        const title = $link.text().trim() || $link.find('.title, h3, h4').text().trim();
        
        if (title && href && href.includes('/detail/')) {
          const fullUrl = href.startsWith('http') ? href : `https://hanabi.walkerplus.com${href}`;
          
          // 避免重复
          if (!rankingData.events.find(event => event.url === fullUrl)) {
            rankingData.events.push({
              title,
              url: fullUrl,
              extractedFrom: 'detail-links'
            });
          }
        }
      });
      
      log.info(`抓取完成 - 人气排行: ${rankingData.rankings.popularity.length}个`);
      log.info(`抓取完成 - 观众数排行: ${rankingData.rankings.attendance.length}个`);
      log.info(`抓取完成 - 花火数排行: ${rankingData.rankings.fireworks.length}个`);
      log.info(`抓取完成 - 综合排行: ${rankingData.rankings.overall.length}个`);
      log.info(`抓取完成 - 事件链接: ${rankingData.events.length}个`);
      
    } catch (error) {
      log.error(`抓取失败: ${error.message}`);
      throw error;
    }
  },
  
  failedRequestHandler({ request, log }) {
    log.error(`请求失败: ${request.url}`);
  }
});

// 主函数
async function main() {
  try {
    console.log('🚀 开始抓取WalkerPlus ar0400地区排行信息...');
    
    // 添加起始URL
    await crawler.addRequests([{
      url: 'https://hanabi.walkerplus.com/launch/ar0400/',
      userData: { type: 'ranking-page' }
    }]);
    
    // 运行爬虫
    await crawler.run();
    
    // 保存结果
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFile = `ar0400-rankings-${timestamp}.json`;
    const csvFile = `ar0400-rankings-${timestamp}.csv`;
    
    // 保存JSON格式
    fs.writeFileSync(jsonFile, JSON.stringify(rankingData, null, 2), 'utf8');
    console.log(`✅ JSON数据已保存: ${jsonFile}`);
    
    // 保存CSV格式（综合排行）
    if (rankingData.rankings.overall.length > 0) {
      const csvHeader = 'Rank,Title,Location,Date,Attendance,Fireworks,URL\n';
      const csvContent = rankingData.rankings.overall.map(item => 
        `${item.rank},"${item.title}","${item.location}","${item.date}","${item.attendance}","${item.fireworks}","${item.url}"`
      ).join('\n');
      
      fs.writeFileSync(csvFile, csvHeader + csvContent, 'utf8');
      console.log(`✅ CSV数据已保存: ${csvFile}`);
    }
    
    // 输出统计信息
    console.log('\n📊 抓取统计:');
    console.log(`- 人气排行: ${rankingData.rankings.popularity.length}个`);
    console.log(`- 观众数排行: ${rankingData.rankings.attendance.length}个`);
    console.log(`- 花火数排行: ${rankingData.rankings.fireworks.length}个`);
    console.log(`- 综合排行: ${rankingData.rankings.overall.length}个`);
    console.log(`- 事件链接: ${rankingData.events.length}个`);
    
    // 显示前5个综合排行
    if (rankingData.rankings.overall.length > 0) {
      console.log('\n🏆 综合排行前5名:');
      rankingData.rankings.overall.slice(0, 5).forEach(item => {
        console.log(`${item.rank}. ${item.title} - ${item.location} (${item.date})`);
      });
    }
    
  } catch (error) {
    console.error('❌ 抓取失败:', error.message);
    process.exit(1);
  }
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as crawlAr0400Rankings }; 