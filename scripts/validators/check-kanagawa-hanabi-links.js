/**
 * 神奈川花火详情链接检查脚本
 * 使用 Playwright + Cheerio + Crawlee 技术栈
 * 检查哪些详情链接没有对应的页面文件
 */

import fs from 'fs';
import path from 'path';
import { PlaywrightCrawler } from 'crawlee';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 从页面文件中提取的所有详情链接
const detailLinks = [
  '/kanagawa/hanabi/kamakura',
  '/kanagawa/hanabi/yokohama-kaikosai',
  '/kanagawa/hanabi/seaparadise-hanabi-symphonia',
  '/kanagawa/hanabi/yokohama-seaparadise',
  '/kanagawa/hanabi/sagamiko',
  '/kanagawa/hanabi/kurihama',
  '/kanagawa/hanabi/odawara-sakawa',
  '/kanagawa/hanabi/southern-beach-chigasaki',
  '/kanagawa/hanabi/atsugi-ayu-matsuri',
  '/kanagawa/hanabi/minato-mirai-smart',
  '/kanagawa/hanabi/yokohama-night-flowers',
  '/kanagawa/hanabi/kawasaki-tamagawa',
  '/kanagawa/hanabi/kanazawa-matsuri-hanabi',
  '/kanagawa/hanabi/yokohama-hanabi',
  '/kanagawa/hanabi/chigasaki-kaigan',
  '/kanagawa/hanabi/fujisawa-enoshima-jinja',
  '/kanagawa/hanabi/hiratsuka-tanabata',
  '/kanagawa/hanabi/seaparadise-hanabi-sep'
];

// 花火事件名称映射（用于报告）
const eventNames = {
  '/kanagawa/hanabi/kamakura': '第77回 鎌倉花火大会',
  '/kanagawa/hanabi/yokohama-kaikosai': '第44回 横浜開港祭「ビームスペクタクル in ハーバー」',
  '/kanagawa/hanabi/seaparadise-hanabi-symphonia': '横滨・八景岛海洋天堂「花火交响曲」',
  '/kanagawa/hanabi/yokohama-seaparadise': '横滨・八景岛海洋天堂「花火交响曲」（8月）',
  '/kanagawa/hanabi/sagamiko': '第73回 さがみ湖湖上祭花火大会',
  '/kanagawa/hanabi/kurihama': '2025 久里浜ペリー祭花火大会',
  '/kanagawa/hanabi/odawara-sakawa': '第36回 小田原酒匂川花火大会',
  '/kanagawa/hanabi/southern-beach-chigasaki': '第51回南海滩茅崎花火大会',
  '/kanagawa/hanabi/atsugi-ayu-matsuri': '市制70周年記念 第79回 あつぎ鮎まつり',
  '/kanagawa/hanabi/minato-mirai-smart': 'みなとみらいスマートフェスティバル 2025',
  '/kanagawa/hanabi/yokohama-night-flowers': '横滨夜间花火2025',
  '/kanagawa/hanabi/kawasaki-tamagawa': '第84回 川崎市制記念多摩川花火大会',
  '/kanagawa/hanabi/kanazawa-matsuri-hanabi': '第51回 金沢まつり 花火大会',
  '/kanagawa/hanabi/yokohama-hanabi': '横滨夜间花火2025（9月）',
  '/kanagawa/hanabi/chigasaki-kaigan': '茅ヶ崎海岸花火大会',
  '/kanagawa/hanabi/fujisawa-enoshima-jinja': '藤沢江島神社奉納花火',
  '/kanagawa/hanabi/hiratsuka-tanabata': '平塚七夕花火祭',
  '/kanagawa/hanabi/seaparadise-hanabi-sep': '横滨・八景岛海洋天堂「花火交响曲」（9月）'
};

async function checkDetailLinks() {
  console.log('🔍 开始检查神奈川花火详情链接...');
  console.log('📊 使用技术栈: Playwright + Cheerio + Crawlee');
  
  const results = {
    total: detailLinks.length,
    connected: [],
    missing: [],
    errors: []
  };

  // 检查每个链接对应的文件系统路径
  for (const link of detailLinks) {
    try {
      // 将URL路径转换为文件系统路径
      const relativePath = link.replace('/kanagawa/hanabi/', '');
      const dirPath = path.join(__dirname, '..', 'src', 'app', 'kanagawa', 'hanabi', relativePath);
      const pageFilePath = path.join(dirPath, 'page.tsx');
      
      console.log(`\n🔗 检查链接: ${link}`);
      console.log(`📁 对应目录: ${dirPath}`);
      console.log(`📄 页面文件: ${pageFilePath}`);
      
      // 检查目录是否存在
      if (fs.existsSync(dirPath)) {
        // 检查page.tsx文件是否存在
        if (fs.existsSync(pageFilePath)) {
          console.log(`✅ 已连接: ${eventNames[link]}`);
          results.connected.push({
            link,
            name: eventNames[link],
            status: 'connected',
            path: pageFilePath
          });
        } else {
          console.log(`❌ 目录存在但缺少page.tsx: ${eventNames[link]}`);
          results.missing.push({
            link,
            name: eventNames[link],
            status: 'missing_page_file',
            path: dirPath
          });
        }
      } else {
        console.log(`❌ 目录不存在: ${eventNames[link]}`);
        results.missing.push({
          link,
          name: eventNames[link],
          status: 'missing_directory',
          path: dirPath
        });
      }
    } catch (error) {
      console.log(`⚠️ 检查出错: ${link} - ${error.message}`);
      results.errors.push({
        link,
        name: eventNames[link],
        error: error.message
      });
    }
  }

  // 生成详细报告
  console.log('\n' + '='.repeat(60));
  console.log('📋 神奈川花火详情链接检查报告');
  console.log('='.repeat(60));
  
  console.log(`\n📊 总体统计:`);
  console.log(`   总链接数: ${results.total}`);
  console.log(`   已连接: ${results.connected.length}`);
  console.log(`   未连接: ${results.missing.length}`);
  console.log(`   检查错误: ${results.errors.length}`);
  console.log(`   连接率: ${((results.connected.length / results.total) * 100).toFixed(1)}%`);

  if (results.connected.length > 0) {
    console.log(`\n✅ 已连接的详情页面 (${results.connected.length}个):`);
    results.connected.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.name}`);
      console.log(`      链接: ${item.link}`);
      console.log(`      文件: ${path.relative(__dirname, item.path)}`);
    });
  }

  if (results.missing.length > 0) {
    console.log(`\n❌ 未连接的详情页面 (${results.missing.length}个):`);
    results.missing.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.name}`);
      console.log(`      链接: ${item.link}`);
      console.log(`      状态: ${item.status === 'missing_directory' ? '目录不存在' : '缺少page.tsx文件'}`);
      console.log(`      路径: ${path.relative(__dirname, item.path)}`);
    });
  }

  if (results.errors.length > 0) {
    console.log(`\n⚠️ 检查错误 (${results.errors.length}个):`);
    results.errors.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.name}`);
      console.log(`      链接: ${item.link}`);
      console.log(`      错误: ${item.error}`);
    });
  }

  // 保存检查结果到JSON文件
  const reportPath = path.join(__dirname, 'kanagawa-hanabi-links-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n💾 详细报告已保存到: ${path.relative(__dirname, reportPath)}`);

  // 使用Crawlee进行额外验证（如果有本地服务器运行）
  console.log('\n🌐 尝试通过Crawlee进行在线验证...');
  
  try {
    const crawler = new PlaywrightCrawler({
      launchContext: {
        launchOptions: {
          headless: true,
        },
      },
      async requestHandler({ page, request, log }) {
        const url = request.loadedUrl;
        log.info(`访问页面: ${url}`);
        
        try {
          await page.waitForLoadState('networkidle', { timeout: 5000 });
          const title = await page.title();
          log.info(`页面标题: ${title}`);
          
          // 检查是否是404页面
          const is404 = await page.locator('text=404').count() > 0;
          if (is404) {
            log.warning(`发现404页面: ${url}`);
          }
        } catch (error) {
          log.error(`页面加载失败: ${url} - ${error.message}`);
        }
      },
      maxRequestsPerCrawl: 5, // 限制请求数量
      requestHandlerTimeoutSecs: 10,
    });

    // 尝试访问几个示例链接（假设本地服务器在localhost:3000运行）
    const baseUrl = 'http://localhost:3000';
    const sampleLinks = detailLinks.slice(0, 3); // 只测试前3个链接
    
    for (const link of sampleLinks) {
      try {
        await crawler.addRequests([`${baseUrl}${link}`]);
      } catch (error) {
        console.log(`⚠️ 无法访问 ${baseUrl}${link}: ${error.message}`);
      }
    }

    await crawler.run();
    console.log('✅ Crawlee验证完成');
    
  } catch (error) {
    console.log(`⚠️ Crawlee验证跳过 (可能本地服务器未运行): ${error.message}`);
  }

  return results;
}

// 执行检查
checkDetailLinks()
  .then((results) => {
    console.log('\n🎯 检查完成！');
    
    if (results.missing.length > 0) {
      console.log(`\n⚠️ 发现 ${results.missing.length} 个未连接的详情页面需要处理`);
      process.exit(1);
    } else {
      console.log('\n🎉 所有详情链接都已正确连接！');
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error('❌ 检查过程中发生错误:', error);
    process.exit(1);
  }); 