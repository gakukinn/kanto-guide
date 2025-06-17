/**
 * 修复版 WalkerPlus ar0400地区花火信息抓取器
 * 使用 Playwright + Cheerio 技术栈
 * 目标网站: https://hanabi.walkerplus.com/crowd/ar0400/
 */

import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeWalkerPlusAr0400() {
  console.log('🚀 开始抓取WalkerPlus ar0400地区花火信息...');
  console.log('📍 目标网站: https://hanabi.walkerplus.com/crowd/ar0400/');
  console.log('🛠️ 技术栈: Playwright + Cheerio');
  
  let browser;
  let scrapedData = [];
  
  try {
    // 启动浏览器
    console.log('🌐 启动浏览器...');
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    console.log('📄 正在访问页面...');
    
    // 访问目标页面
    const response = await page.goto('https://hanabi.walkerplus.com/crowd/ar0400/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    if (!response || !response.ok()) {
      throw new Error(`HTTP错误: ${response ? response.status() : '无响应'}`);
    }
    
    console.log('✅ 页面加载成功');
    
    // 等待内容加载
    await page.waitForTimeout(5000);
    
    // 获取页面HTML
    const html = await page.content();
    
    // 保存原始HTML用于调试
    fs.writeFileSync('debug-ar0400-page.html', html, 'utf8');
    console.log('💾 已保存原始HTML到 debug-ar0400-page.html');
    
    // 使用Cheerio解析HTML
    const $ = cheerio.load(html);
    
    console.log('🔍 开始解析花火大会信息...');
    
    // 检查页面标题
    const pageTitle = $('title').text();
    console.log(`📄 页面标题: ${pageTitle}`);
    
    // 尝试多种选择器策略
    const selectors = [
      '.p-event-list__item',
      '.event-item',
      '.hanabi-item', 
      '.list-item',
      '.event-list li',
      '.hanabi-list li',
      'article',
      '.article',
      '.event',
      '.item',
      'li'
    ];
    
    let foundEvents = false;
    
    for (const selector of selectors) {
      console.log(`🔎 尝试选择器: ${selector} (找到 ${$(selector).length} 个元素)`);
      
      $(selector).each((index, element) => {
        const $item = $(element);
        const text = $item.text();
        
        // 检查是否包含花火相关内容
        if (text.includes('花火') || text.includes('hanabi') || text.includes('fireworks') || text.includes('Fireworks')) {
          foundEvents = true;
          
          // 提取标题
          let title = $item.find('h1, h2, h3, h4, h5, .title, .event-title, .hanabi-title, strong, b').first().text().trim();
          if (!title) {
            const lines = text.split('\n').filter(line => line.trim().length > 5);
            title = lines[0]?.trim() || text.substring(0, 50).trim();
          }
          
          // 提取日期
          const dateMatch = text.match(/(\d{4})[年\/\-](\d{1,2})[月\/\-](\d{1,2})[日]?|(\d{1,2})[月\/\-](\d{1,2})[日]?|2025[年]?.*?[月日]/);
          const date = dateMatch ? dateMatch[0] : '日期待确认';
          
          // 提取地点
          let location = 'ar0400地区';
          const locationPatterns = [
            /(県|市|区|町|村)[^。\n]*?[で|にて|会場]/,
            /(県|市|区|町|村)[^。\n]{0,20}/,
            /会場[：:][^。\n]*/
          ];
          
          for (const pattern of locationPatterns) {
            const locationMatch = text.match(pattern);
            if (locationMatch) {
              location = locationMatch[0];
              break;
            }
          }
          
          // 提取花火数量
          const fireworksMatch = text.match(/(\d+(?:,\d+)*)\s*発/);
          const fireworksCount = fireworksMatch ? parseInt(fireworksMatch[1].replace(/,/g, '')) : null;
          
          // 提取观众数
          const visitorsMatch = text.match(/(\d+(?:,\d+)*)\s*万人|(\d+(?:,\d+)*)\s*人/);
          const expectedVisitors = visitorsMatch ? 
            (visitorsMatch[1] ? parseInt(visitorsMatch[1].replace(/,/g, '')) * 10000 : 
             parseInt(visitorsMatch[2].replace(/,/g, ''))) : null;
          
          // 提取链接
          const link = $item.find('a').first().attr('href');
          const sourceUrl = link ? (link.startsWith('http') ? link : `https://hanabi.walkerplus.com${link}`) : null;
          
          if (title && title.length > 3 && title.length < 200) {
            const eventData = {
              id: `ar0400-${scrapedData.length + 1}`,
              title: title,
              date: date,
              location: location,
              description: text.substring(0, 300).replace(/\s+/g, ' ').trim(),
              fireworksCount: fireworksCount,
              expectedVisitors: expectedVisitors,
              sourceUrl: sourceUrl,
              selector: selector,
              scrapedAt: new Date().toISOString()
            };
            
            // 避免重复
            const isDuplicate = scrapedData.some(existing => 
              existing.title === eventData.title || 
              (existing.title.includes(eventData.title) || eventData.title.includes(existing.title))
            );
            
            if (!isDuplicate) {
              scrapedData.push(eventData);
            }
          }
        }
      });
      
      if (foundEvents && scrapedData.length > 0) {
        console.log(`✅ 使用选择器 ${selector} 找到 ${scrapedData.length} 个事件`);
        break;
      }
    }
    
    // 如果仍然没有找到，尝试全文搜索
    if (scrapedData.length === 0) {
      console.log('🔍 尝试全文搜索花火相关内容...');
      
      const bodyText = $('body').text();
      console.log(`📄 页面总文本长度: ${bodyText.length} 字符`);
      
      // 搜索包含花火的行
      const lines = bodyText.split('\n').filter(line => {
        const trimmed = line.trim();
        return (trimmed.includes('花火') || trimmed.includes('hanabi') || trimmed.includes('fireworks')) && 
               trimmed.length > 10 && trimmed.length < 200;
      });
      
      console.log(`🔍 找到 ${lines.length} 行包含花火相关内容`);
      
      lines.slice(0, 10).forEach((line, index) => {
        scrapedData.push({
          id: `ar0400-search-${index + 1}`,
          title: line.trim(),
          date: '需要进一步确认',
          location: 'ar0400地区',
          description: line.trim(),
          fireworksCount: null,
          expectedVisitors: null,
          sourceUrl: 'https://hanabi.walkerplus.com/crowd/ar0400/',
          selector: 'fulltext-search',
          scrapedAt: new Date().toISOString()
        });
      });
    }
    
    // 检查是否有错误页面或重定向
    const currentUrl = page.url();
    if (currentUrl !== 'https://hanabi.walkerplus.com/crowd/ar0400/') {
      console.log(`⚠️ 页面重定向到: ${currentUrl}`);
    }
    
  } catch (error) {
    console.error('❌ 抓取过程中出现错误:', error.message);
    
    // 创建错误报告
    const errorData = {
      source: 'https://hanabi.walkerplus.com/crowd/ar0400/',
      scrapedAt: new Date().toISOString(),
      region: 'ar0400',
      error: error.message,
      stack: error.stack,
      note: '抓取过程中遇到错误，可能是网站结构变化或网络问题'
    };
    
    fs.writeFileSync(`error-report-ar0400-${Date.now()}.json`, JSON.stringify(errorData, null, 2), 'utf8');
    
  } finally {
    // 关闭浏览器
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
  
  // 保存结果
  console.log(`\n📊 抓取完成！共找到 ${scrapedData.length} 个花火大会信息`);
  
  if (scrapedData.length > 0) {
    // 保存到JSON文件
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `walkerplus-ar0400-hanabi-${timestamp}.json`;
    
    const outputData = {
      source: 'https://hanabi.walkerplus.com/crowd/ar0400/',
      scrapedAt: new Date().toISOString(),
      region: 'ar0400',
      totalEvents: scrapedData.length,
      technology: 'Playwright + Cheerio',
      events: scrapedData
    };
    
    fs.writeFileSync(filename, JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`💾 数据已保存到: ${filename}`);
    
    // 显示结果摘要
    console.log('\n📋 抓取结果摘要:');
    scrapedData.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      if (event.date !== '需要进一步确认' && event.date !== '日期待确认') {
        console.log(`   📅 日期: ${event.date}`);
      }
      if (event.location !== 'ar0400地区') {
        console.log(`   📍 地点: ${event.location}`);
      }
      if (event.fireworksCount) {
        console.log(`   🎆 花火数: ${event.fireworksCount}发`);
      }
      if (event.expectedVisitors) {
        console.log(`   👥 预计观众: ${event.expectedVisitors}人`);
      }
      if (event.sourceUrl) {
        console.log(`   🔗 链接: ${event.sourceUrl}`);
      }
      console.log('');
    });
    
    return outputData;
  } else {
    console.log('\n⚠️ 未找到花火大会信息');
    console.log('💡 可能原因:');
    console.log('   - 网站结构已变化');
    console.log('   - 该地区暂无花火大会信息');
    console.log('   - 网络访问问题');
    console.log('   - 页面需要JavaScript渲染');
    console.log('📄 请检查 debug-ar0400-page.html 文件了解页面内容');
    
    return null;
  }
}

// 运行抓取
scrapeWalkerPlusAr0400().catch(console.error); 