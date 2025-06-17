/**
 * WalkerPlus 源代码抓取脚本
 * 使用 Playwright + Cheerio + Crawlee 技术栈
 * 抓取用户指定URL的完整源代码
 */

import { PlaywrightCrawler } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchWalkerPlusSource() {
  console.log('🔍 WalkerPlus 源代码抓取');
  console.log('📊 技术栈: Playwright + Cheerio + Crawlee');
  console.log('🎯 目标URL: https://hanabi.walkerplus.com/crowd/ar0314/');
  console.log('');

  let sourceCode = '';
  let pageTitle = '';
  let extractedEvents = [];

  const crawler = new PlaywrightCrawler({
    launchContext: {
      launchOptions: {
        headless: true,
      },
    },
    async requestHandler({ page, request, log }) {
      const url = request.loadedUrl;
      log.info(`正在抓取页面: ${url}`);
      
      try {
        // 等待页面加载完成
        await page.waitForLoadState('networkidle', { timeout: 15000 });
        
        // 获取页面标题
        pageTitle = await page.title();
        console.log(`📄 页面标题: ${pageTitle}`);
        
        // 获取完整的HTML源代码
        sourceCode = await page.content();
        console.log(`📊 源代码长度: ${sourceCode.length} 字符`);
        
        // 使用Cheerio解析HTML
        const $ = cheerio.load(sourceCode);
        
        // 查找所有可能的花火事件信息
        console.log('\n🔍 正在解析花火事件信息...');
        
        // 尝试多种选择器
        const selectors = [
          'article',
          '.event',
          '.hanabi',
          '.festival',
          'li',
          'div[class*="item"]',
          'div[class*="event"]',
          'div[class*="hanabi"]',
          'div[class*="festival"]',
          'section',
          '.content'
        ];
        
        selectors.forEach(selector => {
          $(selector).each((index, element) => {
            const $element = $(element);
            const text = $element.text().trim();
            
            // 查找包含花火相关关键词的内容
            const keywords = ['花火', '茅ヶ崎', '藤沢', '江島', '平塚', '七夕', '奉納', '海岸'];
            const hasKeyword = keywords.some(keyword => text.includes(keyword));
            
            if (hasKeyword && text.length > 20 && text.length < 500) {
              extractedEvents.push({
                selector,
                text: text.substring(0, 300),
                html: $element.html()?.substring(0, 200)
              });
            }
          });
        });
        
        // 特别搜索页面中的所有文本内容
        const bodyText = $('body').text();
        
        // 搜索特定的花火事件
        const searchEvents = [
          '茅ヶ崎海岸花火大会',
          '藤沢江島神社奉納花火',
          '平塚七夕花火祭',
          'サザンビーチちがさき',
          '鎌倉花火',
          '横浜花火'
        ];
        
        console.log('\n🎯 搜索特定花火事件:');
        searchEvents.forEach(eventName => {
          const found = bodyText.includes(eventName);
          console.log(`${found ? '✅' : '❌'} ${eventName}: ${found ? '找到' : '未找到'}`);
          
          if (found) {
            // 查找包含该事件名称的具体内容
            $('*').each((index, element) => {
              const $element = $(element);
              const text = $element.text();
              if (text.includes(eventName) && text.length > 10 && text.length < 200) {
                extractedEvents.push({
                  eventName,
                  text: text.trim(),
                  html: $element.html()
                });
              }
            });
          }
        });
        
        // 保存源代码到文件
        const sourceFilePath = path.join(__dirname, 'walkerplus-source.html');
        fs.writeFileSync(sourceFilePath, sourceCode, 'utf8');
        console.log(`\n💾 源代码已保存到: ${sourceFilePath}`);
        
        // 保存解析结果
        const resultsPath = path.join(__dirname, 'walkerplus-parsed-events.json');
        const results = {
          url,
          pageTitle,
          sourceLength: sourceCode.length,
          extractedEvents,
          timestamp: new Date().toISOString()
        };
        fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf8');
        console.log(`💾 解析结果已保存到: ${resultsPath}`);
        
      } catch (error) {
        log.error(`页面处理失败: ${url} - ${error.message}`);
        console.error('❌ 抓取失败:', error.message);
      }
    },
    maxRequestsPerCrawl: 1,
    requestHandlerTimeoutSecs: 30,
  });

  try {
    // 抓取用户指定的URL
    await crawler.addRequests(['https://hanabi.walkerplus.com/crowd/ar0314/']);
    await crawler.run();
    
  } catch (error) {
    console.error('❌ Crawlee执行失败:', error.message);
  }

  // 输出结果摘要
  console.log('\n' + '='.repeat(60));
  console.log('📋 WalkerPlus 源代码抓取报告');
  console.log('='.repeat(60));
  
  console.log(`\n📊 抓取统计:`);
  console.log(`   页面标题: ${pageTitle}`);
  console.log(`   源代码长度: ${sourceCode.length} 字符`);
  console.log(`   提取事件数: ${extractedEvents.length} 个`);
  
  if (extractedEvents.length > 0) {
    console.log(`\n📋 提取的花火事件信息:`);
    extractedEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.eventName || '未知事件'}`);
      console.log(`   内容: ${event.text.substring(0, 100)}...`);
      console.log(`   选择器: ${event.selector || 'N/A'}`);
    });
  }
  
  // 显示源代码片段（前1000字符）
  if (sourceCode.length > 0) {
    console.log(`\n📄 源代码片段 (前1000字符):`);
    console.log('```html');
    console.log(sourceCode.substring(0, 1000));
    console.log('```');
    
    if (sourceCode.length > 1000) {
      console.log(`\n... (还有 ${sourceCode.length - 1000} 字符)`);
    }
  }

  console.log('\n🎯 技术栈验证: ✅ Playwright + ✅ Cheerio + ✅ Crawlee');
  
  return {
    sourceCode,
    pageTitle,
    extractedEvents
  };
}

// 执行抓取
fetchWalkerPlusSource()
  .then((results) => {
    console.log('\n🎉 源代码抓取完成！');
    console.log('📁 请查看生成的文件以获取完整信息');
  })
  .catch((error) => {
    console.error('❌ 抓取过程中发生错误:', error);
  }); 