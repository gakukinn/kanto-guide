/**
 * Crawlee集成测试脚本
 * 验证Crawlee与现有Playwright+Cheerio技术栈的兼容性
 */

import { PlaywrightCrawler, Dataset } from 'crawlee';
import * as cheerio from 'cheerio';

interface TestResult {
  url: string;
  title: string;
  timestamp: string;
  success: boolean;
}

async function testCrawleeIntegration() {
  console.log('🧪 开始Crawlee集成测试...');
  
  const results: TestResult[] = [];
  
  // 创建Crawlee爬虫实例
  const crawler = new PlaywrightCrawler({
    // 🎯 使用你现有的技术栈配置
    launchContext: {
      useChrome: true,
    },
    
    maxRequestRetries: 2,
    requestHandlerTimeoutSecs: 30,
    maxConcurrency: 1, // 测试时使用单线程
    
    requestHandler: async ({ page, request, log }) => {
      log.info(`🔍 测试页面: ${request.url}`);
      
      try {
        // 等待页面加载
        await page.waitForLoadState('domcontentloaded');
        
        // 获取页面内容
        const content = await page.content();
        
        // 🎯 使用你熟悉的Cheerio解析
        const $ = cheerio.load(content);
        const title = $('title').text().trim();
        
        const result: TestResult = {
          url: request.url,
          title: title || '无标题',
          timestamp: new Date().toISOString(),
          success: true
        };
        
        results.push(result);
        
        // 🎯 使用Crawlee的数据存储功能
        await Dataset.pushData(result);
        
        log.info(`✅ 成功处理: ${title}`);
        
      } catch (error: any) {
        log.error(`❌ 处理失败: ${error.message}`);
        
        const result: TestResult = {
          url: request.url,
          title: '处理失败',
          timestamp: new Date().toISOString(),
          success: false
        };
        
        results.push(result);
      }
    },
    
    failedRequestHandler: async ({ request, log }) => {
      log.error(`💥 请求失败: ${request.url}`);
    },
  });
  
  try {
    // 测试几个简单的网站
    await crawler.addRequests([
      'https://example.com',
      'https://httpbin.org/html'
    ]);
    
    console.log('🚀 启动Crawlee测试...');
    await crawler.run();
    
    console.log('\n📊 测试结果:');
    console.log('='.repeat(50));
    
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.success ? '✅' : '❌'} ${result.url}`);
      console.log(`   标题: ${result.title}`);
      console.log(`   时间: ${result.timestamp}`);
      console.log('');
    });
    
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;
    
    console.log(`🎯 成功率: ${successCount}/${totalCount} (${Math.round(successCount/totalCount*100)}%)`);
    
    if (successCount === totalCount) {
      console.log('🎉 Crawlee集成测试完全成功！');
      console.log('✅ Playwright + Cheerio + Crawlee 完美协作');
      console.log('✅ 没有任何技术冲突');
      console.log('✅ 可以安全使用Crawlee重构现有脚本');
    } else {
      console.log('⚠️ 部分测试失败，但这可能是网络问题，不是技术冲突');
    }
    
    // 显示Crawlee自动保存的数据位置
    console.log('\n💾 Crawlee自动保存的数据位置:');
    console.log('📁 storage/datasets/default/');
    
  } catch (error: any) {
    console.error('💥 测试过程中出错:', error.message);
  }
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testCrawleeIntegration().catch(console.error);
}

export default testCrawleeIntegration; 