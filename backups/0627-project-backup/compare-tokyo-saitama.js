const { chromium } = require('playwright');
const { parse } = require('node-html-parser');

async function comparePagesStructure() {
  console.log('🔍 对比东京和埼玉页面结构...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // 先检查东京页面
    console.log('=== 📍 东京页面分析 ===');
    const tokyoUrl = 'https://www.jalan.net/event/130000/?screenId=OUW2401';
    console.log(`🌐 访问: ${tokyoUrl}`);
    
    await page.goto(tokyoUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await page.waitForTimeout(5000);

    let content = await page.content();
    let root = parse(content);

    console.log(`📋 东京页面标题: ${root.querySelector('title')?.text}`);
    
    // 分析东京页面的活动项目
    const tokyoItems = root.querySelectorAll('.item');
    console.log(`🔍 东京 .item 选择器: 找到 ${tokyoItems.length} 个元素`);
    
    if (tokyoItems.length > 0) {
      for (let i = 0; i < Math.min(3, tokyoItems.length); i++) {
        const item = tokyoItems[i];
        console.log(`\n--- 东京元素 ${i + 1} ---`);
        
        const link = item.querySelector('a');
        if (link) {
          const href = link.getAttribute('href');
          const text = link.text.trim();
          console.log(`🔗 链接: ${href ? href.substring(0, 80) : '无'}...`);
          console.log(`📝 文本: "${text.substring(0, 50)}..."`);
        }
        
        const className = item.getAttribute('class');
        console.log(`🏷️ 类名: ${className}`);
      }
    }

    // 检查东京的活动链接
    const tokyoEventLinks = root.querySelectorAll('a[href*="/event/"]');
    console.log(`🔗 东京活动链接总数: ${tokyoEventLinks.length}`);
    
    // 筛选真正的活动详情链接
    const realTokyoLinks = [];
    for (const link of tokyoEventLinks) {
      const href = link.getAttribute('href');
      if (href && href.match(/\/event\/\d+\/\d+/)) {  // 匹配活动详情页格式
        realTokyoLinks.push({
          href: href,
          text: link.text.trim()
        });
      }
    }
    console.log(`📋 东京真实活动链接: ${realTokyoLinks.length} 个`);
    realTokyoLinks.slice(0, 3).forEach((link, index) => {
      console.log(`   ${index + 1}. ${link.text.substring(0, 40)}... -> ${link.href}`);
    });

    await page.waitForTimeout(3000);

    // 再检查埼玉页面
    console.log('\n=== 📍 埼玉页面分析 ===');
    const saitamaUrl = 'https://www.jalan.net/event/110000/?screenId=OUW1702';
    console.log(`🌐 访问: ${saitamaUrl}`);
    
    await page.goto(saitamaUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await page.waitForTimeout(5000);

    content = await page.content();
    root = parse(content);

    console.log(`📋 埼玉页面标题: ${root.querySelector('title')?.text}`);
    
    // 分析埼玉页面的活动项目
    const saitamaItems = root.querySelectorAll('.item');
    console.log(`🔍 埼玉 .item 选择器: 找到 ${saitamaItems.length} 个元素`);
    
    if (saitamaItems.length > 0) {
      for (let i = 0; i < Math.min(3, saitamaItems.length); i++) {
        const item = saitamaItems[i];
        console.log(`\n--- 埼玉元素 ${i + 1} ---`);
        
        const link = item.querySelector('a');
        if (link) {
          const href = link.getAttribute('href');
          const text = link.text.trim();
          console.log(`🔗 链接: ${href ? href.substring(0, 80) : '无'}...`);
          console.log(`📝 文本: "${text.substring(0, 50)}..."`);
        }
        
        const className = item.getAttribute('class');
        console.log(`🏷️ 类名: ${className}`);
      }
    }

    // 检查埼玉的活动链接
    const saitamaEventLinks = root.querySelectorAll('a[href*="/event/"]');
    console.log(`🔗 埼玉活动链接总数: ${saitamaEventLinks.length}`);
    
    // 筛选真正的活动详情链接
    const realSaitamaLinks = [];
    for (const link of saitamaEventLinks) {
      const href = link.getAttribute('href');
      if (href && href.match(/\/event\/\d+\/\d+/)) {  // 匹配活动详情页格式
        realSaitamaLinks.push({
          href: href,
          text: link.text.trim()
        });
      }
    }
    console.log(`📋 埼玉真实活动链接: ${realSaitamaLinks.length} 个`);
    realSaitamaLinks.slice(0, 3).forEach((link, index) => {
      console.log(`   ${index + 1}. ${link.text.substring(0, 40)}... -> ${link.href}`);
    });

    // 对比结论
    console.log('\n=== 📊 对比结论 ===');
    console.log(`东京真实活动: ${realTokyoLinks.length} 个`);
    console.log(`埼玉真实活动: ${realSaitamaLinks.length} 个`);
    
    if (realTokyoLinks.length > 0 && realSaitamaLinks.length > 0) {
      console.log('✅ 两个页面都有活动数据，结构可能相似');
    } else if (realSaitamaLinks.length === 0) {
      console.log('❌ 埼玉页面没有活动数据，可能是导航页面');
    } else {
      console.log('🤔 情况不明，需要进一步分析');
    }

    // 保持浏览器打开供手动检查
    console.log('\n⏰ 浏览器将保持打开20秒，可手动对比页面...');
    await page.waitForTimeout(20000);

  } catch (error) {
    console.error(`❌ 对比分析失败: ${error.message}`);
  } finally {
    await browser.close();
  }
}

comparePagesStructure().catch(console.error); 