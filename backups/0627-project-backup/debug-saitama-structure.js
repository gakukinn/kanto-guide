const { chromium } = require('playwright');
const { parse } = require('node-html-parser');

async function debugSaitamaPageStructure() {
  console.log('🔍 调试埼玉县页面结构...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const targetUrl = 'https://www.jalan.net/event/110000/?screenId=OUW1702';
    console.log(`🌐 访问: ${targetUrl}`);
    
    await page.goto(targetUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await page.waitForTimeout(5000);

    const content = await page.content();
    const root = parse(content);

    console.log('📋 页面分析结果:');
    console.log(`标题: ${root.querySelector('title')?.text}`);
    
    // 分析所有可能的活动容器
    const testSelectors = [
      '.item',
      '.event-list-item',
      '.event-item', 
      'article',
      '.card',
      '.list-item',
      '[data-event]',
      'a[href*="/event/"]'
    ];

    for (const selector of testSelectors) {
      const elements = root.querySelectorAll(selector);
      console.log(`\n🔍 选择器 "${selector}": 找到 ${elements.length} 个元素`);
      
      if (elements.length > 0 && elements.length < 100) {
        // 分析前3个元素的结构
        for (let i = 0; i < Math.min(3, elements.length); i++) {
          const element = elements[i];
          console.log(`\n--- 元素 ${i + 1} 结构分析 ---`);
          
          // 查找可能的标题
          const titleSelectors = ['h1', 'h2', 'h3', '.title', '.name', 'a', '.event-title', '.card-title'];
          for (const titleSel of titleSelectors) {
            const titleEl = element.querySelector(titleSel);
            if (titleEl && titleEl.text.trim()) {
              console.log(`📋 找到标题 (${titleSel}): "${titleEl.text.trim().substring(0, 50)}..."`);
            }
          }
          
          // 查找可能的链接
          const linkEl = element.querySelector('a');
          if (linkEl) {
            const href = linkEl.getAttribute('href');
            if (href) {
              console.log(`🔗 找到链接: ${href.substring(0, 80)}...`);
            }
          }
          
          // 显示元素的类名和ID
          const className = element.getAttribute('class');
          const id = element.getAttribute('id');
          if (className) console.log(`🏷️ 类名: ${className}`);
          if (id) console.log(`🆔 ID: ${id}`);
          
          // 显示元素文本的前100个字符
          const text = element.text.trim();
          if (text) {
            console.log(`📝 文本内容: "${text.substring(0, 100)}..."`);
          }
        }
      }
    }

    // 特别分析href包含event的链接
    console.log('\n🔗 专门分析活动链接:');
    const eventLinks = root.querySelectorAll('a[href*="/event/"]');
    console.log(`找到 ${eventLinks.length} 个活动链接`);
    
    for (let i = 0; i < Math.min(5, eventLinks.length); i++) {
      const link = eventLinks[i];
      const href = link.getAttribute('href');
      const text = link.text.trim();
      console.log(`${i + 1}. 链接: ${href}`);
      console.log(`   文本: "${text.substring(0, 60)}..."`);
      
      // 检查父元素
      const parent = link.parentNode;
      if (parent) {
        const parentClass = parent.getAttribute('class');
        const parentTag = parent.tagName;
        console.log(`   父元素: <${parentTag}> class="${parentClass}"`);
      }
    }

    console.log('\n✅ 页面结构调试完成');
    console.log('\n📋 建议：根据以上信息调整选择器');

    // 保持浏览器打开30秒供手动检查
    console.log('\n⏰ 浏览器将保持打开30秒，可手动检查页面结构...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error(`❌ 调试失败: ${error.message}`);
  } finally {
    await browser.close();
  }
}

debugSaitamaPageStructure().catch(console.error); 