/**
 * WalkerPlus ar0400地区花火信息抓取器
 * 使用 Playwright + Cheerio + Crawlee 技术栈
 * 目标网站: https://hanabi.walkerplus.com/crowd/ar0400/
 */

import { PlaywrightCrawler } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';

// 抓取到的花火数据
let scrapedData = [];

// 创建Playwright爬虫
const crawler = new PlaywrightCrawler({
  // 请求处理器
  requestHandler: async ({ page, request, log }) => {
    log.info(`正在处理页面: ${request.url}`);
    
    try {
      // 等待页面加载完成
      await page.waitForLoadState('networkidle');
      
      // 获取页面HTML内容
      const html = await page.content();
      
      // 使用Cheerio解析HTML
      const $ = cheerio.load(html);
      
      log.info('开始解析花火大会信息...');
      
      // 解析花火大会列表
      const hanabiEvents = [];
      
      // 查找花火大会条目（根据WalkerPlus的HTML结构）
      $('.p-event-list__item, .event-item, .hanabi-item, .list-item').each((index, element) => {
        const $item = $(element);
        
        // 提取基本信息
        const title = $item.find('h3, .title, .event-title, .hanabi-title').first().text().trim();
        const date = $item.find('.date, .event-date, .hanabi-date, .schedule').first().text().trim();
        const location = $item.find('.location, .venue, .place, .address').first().text().trim();
        const description = $item.find('.description, .summary, .detail').first().text().trim();
        const link = $item.find('a').first().attr('href');
        
        // 提取花火数量信息
        const fireworksText = $item.text();
        const fireworksMatch = fireworksText.match(/(\d+(?:,\d+)*)\s*発/);
        const fireworksCount = fireworksMatch ? parseInt(fireworksMatch[1].replace(/,/g, '')) : null;
        
        // 提取观众数信息
        const visitorsMatch = fireworksText.match(/(\d+(?:,\d+)*)\s*万人|(\d+(?:,\d+)*)\s*人/);
        const expectedVisitors = visitorsMatch ? 
          (visitorsMatch[1] ? parseInt(visitorsMatch[1].replace(/,/g, '')) * 10000 : 
           parseInt(visitorsMatch[2].replace(/,/g, ''))) : null;
        
        if (title && title.length > 0) {
          hanabiEvents.push({
            id: `ar0400-${index + 1}`,
            title: title,
            date: date || '日期未确定',
            location: location || '地点未确定',
            description: description || '',
            fireworksCount: fireworksCount,
            expectedVisitors: expectedVisitors,
            sourceUrl: link ? (link.startsWith('http') ? link : `https://hanabi.walkerplus.com${link}`) : null,
            scrapedAt: new Date().toISOString()
          });
        }
      });
      
      // 如果没有找到标准结构，尝试其他选择器
      if (hanabiEvents.length === 0) {
        log.info('尝试其他选择器...');
        
        // 尝试更通用的选择器
        $('article, .article, .event, .item, li').each((index, element) => {
          const $item = $(element);
          const text = $item.text();
          
          // 检查是否包含花火相关关键词
          if (text.includes('花火') || text.includes('hanabi') || text.includes('fireworks')) {
            const title = $item.find('h1, h2, h3, h4, .title, strong').first().text().trim() || 
                         text.split('\n')[0].trim();
            
            if (title && title.length > 5 && title.length < 100) {
              hanabiEvents.push({
                id: `ar0400-alt-${index + 1}`,
                title: title,
                date: '需要进一步确认',
                location: 'ar0400地区',
                description: text.substring(0, 200).trim(),
                fireworksCount: null,
                expectedVisitors: null,
                sourceUrl: request.url,
                scrapedAt: new Date().toISOString()
              });
            }
          }
        });
      }
      
      log.info(`找到 ${hanabiEvents.length} 个花火大会信息`);
      scrapedData = hanabiEvents;
      
      // 保存原始HTML用于调试
      fs.writeFileSync('debug-ar0400-page.html', html, 'utf8');
      log.info('已保存原始HTML到 debug-ar0400-page.html');
      
    } catch (error) {
      log.error(`页面处理出错: ${error.message}`);
      
      // 保存错误页面用于调试
      try {
        const html = await page.content();
        fs.writeFileSync('error-ar0400-page.html', html, 'utf8');
      } catch (e) {
        log.error(`无法保存错误页面: ${e.message}`);
      }
    }
  },
  
  // 失败请求处理器
  failedRequestHandler: async ({ request, log }) => {
    log.error(`请求失败: ${request.url}`);
  },
  
  // 爬虫配置
  maxRequestsPerCrawl: 5,
  requestHandlerTimeoutSecs: 60,
  navigationTimeoutSecs: 30,
});

// 主函数
async function main() {
  console.log('🚀 开始抓取WalkerPlus ar0400地区花火信息...');
  console.log('📍 目标网站: https://hanabi.walkerplus.com/crowd/ar0400/');
  console.log('🛠️ 技术栈: Playwright + Cheerio + Crawlee');
  
  try {
    // 启动爬虫
    await crawler.run(['https://hanabi.walkerplus.com/crowd/ar0400/']);
    
    console.log('\n✅ 抓取完成！');
    console.log(`📊 共找到 ${scrapedData.length} 个花火大会信息`);
    
    // 保存数据到JSON文件
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `walkerplus-ar0400-hanabi-${timestamp}.json`;
    
    const outputData = {
      source: 'https://hanabi.walkerplus.com/crowd/ar0400/',
      scrapedAt: new Date().toISOString(),
      region: 'ar0400',
      totalEvents: scrapedData.length,
      events: scrapedData
    };
    
    fs.writeFileSync(filename, JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`💾 数据已保存到: ${filename}`);
    
    // 显示抓取结果摘要
    if (scrapedData.length > 0) {
      console.log('\n📋 抓取结果摘要:');
      scrapedData.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        if (event.date !== '日期未确定') console.log(`   📅 日期: ${event.date}`);
        if (event.location !== '地点未确定') console.log(`   📍 地点: ${event.location}`);
        if (event.fireworksCount) console.log(`   🎆 花火数: ${event.fireworksCount}发`);
        if (event.expectedVisitors) console.log(`   👥 预计观众: ${event.expectedVisitors}人`);
        console.log('');
      });
    } else {
      console.log('\n⚠️ 未找到花火大会信息，可能需要调整选择器或网站结构已变化');
      console.log('💡 请检查 debug-ar0400-page.html 文件了解页面结构');
    }
    
  } catch (error) {
    console.error('❌ 抓取过程中出现错误:', error.message);
    
    // 使用备用数据（如果网站无法访问）
    console.log('\n🔄 尝试使用备用方案...');
    const backupData = {
      source: 'https://hanabi.walkerplus.com/crowd/ar0400/',
      scrapedAt: new Date().toISOString(),
      region: 'ar0400',
      note: '由于网站访问问题，使用备用数据结构',
      totalEvents: 0,
      events: [],
      error: error.message
    };
    
    const backupFilename = `walkerplus-ar0400-backup-${Date.now()}.json`;
    fs.writeFileSync(backupFilename, JSON.stringify(backupData, null, 2), 'utf8');
    console.log(`💾 备用数据已保存到: ${backupFilename}`);
  }
}

// 运行主函数
main().catch(console.error); 