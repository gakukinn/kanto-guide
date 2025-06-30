const { chromium } = require('playwright');
const cheerio = require('cheerio');

class JalanStructureAnalyzer {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initBrowser() {
    console.log('🚀 启动浏览器分析工具...');
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });

    this.page = await this.browser.newPage();
    
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    console.log('✅ 浏览器启动成功');
  }

  async analyzePageStructure(url) {
    console.log(`\n📡 分析页面结构: ${url}`);
    
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await this.page.waitForTimeout(3000);
      
      const content = await this.page.content();
      const $ = cheerio.load(content);
      
      console.log('\n🔍 分析页面主要结构...');
      
      // 分析主要容器
      this.analyzeMainContainers($);
      
      // 分析详情信息区域
      this.analyzeDetailSections($);
      
      // 分析文本内容
      this.analyzeTextContent($);
      
      // 分析地图相关
      this.analyzeMapElements($);
      
      return true;
      
    } catch (error) {
      console.error(`❌ 页面分析失败: ${error.message}`);
      return false;
    }
  }

  analyzeMainContainers($) {
    console.log('\n📦 主要容器结构:');
    console.log('─'.repeat(50));
    
    const containers = [
      '.eventDetailContainer',
      '.eventDetailHead', 
      '.eventDetailData',
      '.eventDetailInfo',
      '.eventDetail',
      '.main-content',
      '.content',
      '.container'
    ];
    
    containers.forEach(selector => {
      const element = $(selector);
      if (element.length > 0) {
        console.log(`✅ ${selector}: ${element.length} 个元素`);
        // 输出子元素
        const children = element.children();
        if (children.length > 0) {
          console.log(`   子元素: ${children.length} 个`);
          children.each((i, child) => {
            if (i < 5) { // 只显示前5个
              const tagClass = $(child).attr('class') || '无class';
              console.log(`   - <${child.tagName}> .${tagClass}`);
            }
          });
        }
      } else {
        console.log(`❌ ${selector}: 未找到`);
      }
    });
  }

  analyzeDetailSections($) {
    console.log('\n📋 详情信息区域:');
    console.log('─'.repeat(50));
    
    // 查找所有可能包含详情的区域
    const detailSelectors = [
      '.eventDetailItem',
      '.eventDetailText', 
      '.eventDetailData',
      '.eventDetailInfo',
      '.detail-item',
      '.info-item',
      'dt',
      'dd',
      'tr',
      'td'
    ];
    
    detailSelectors.forEach(selector => {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`\n✅ ${selector}: ${elements.length} 个元素`);
        
        // 显示前3个元素的内容
        elements.each((i, element) => {
          if (i < 3) {
            const text = $(element).text().trim().substring(0, 100);
            const classes = $(element).attr('class') || '无class';
            console.log(`   [${i+1}] .${classes}: ${text}...`);
          }
        });
      }
    });
  }

  analyzeTextContent($) {
    console.log('\n📝 关键文本内容分析:');
    console.log('─'.repeat(50));
    
    // 查找包含关键词的元素
    const keywords = [
      '開催期間', '期間', '日時',
      '会場', '場所', '住所',
      'アクセス', '交通',
      '主催', '実行委員会',
      '料金', '入場料', '観覧料',
      'お問い合わせ', '連絡先', 'TEL'
    ];
    
    keywords.forEach(keyword => {
      const elements = $(`*:contains("${keyword}")`);
      if (elements.length > 0) {
        console.log(`\n🔍 "${keyword}" 相关元素:`);
        
        elements.each((i, element) => {
          if (i < 2) { // 只显示前2个匹配
            const tagName = element.tagName;
            const classes = $(element).attr('class') || '无class';
            const text = $(element).text().trim().substring(0, 80);
            console.log(`   <${tagName}> .${classes}: ${text}...`);
            
            // 查看父元素和兄弟元素
            const parent = $(element).parent();
            const parentClass = parent.attr('class') || '无class';
            console.log(`   父元素: <${parent[0]?.tagName}> .${parentClass}`);
            
            const nextSibling = $(element).next();
            if (nextSibling.length > 0) {
              const siblingText = nextSibling.text().trim().substring(0, 60);
              console.log(`   下一个元素: ${siblingText}...`);
            }
          }
        });
      }
    });
  }

  analyzeMapElements($) {
    console.log('\n🗺️ 地图相关元素:');
    console.log('─'.repeat(50));
    
    // 检查iframe
    const iframes = $('iframe');
    console.log(`iframe 数量: ${iframes.length}`);
    iframes.each((i, iframe) => {
      const src = $(iframe).attr('src');
      if (src) {
        console.log(`iframe [${i+1}]: ${src.substring(0, 100)}...`);
      }
    });
    
    // 检查地图链接
    const mapLinks = $('a[href*="maps"], a[href*="google"]');
    console.log(`\n地图链接数量: ${mapLinks.length}`);
    mapLinks.each((i, link) => {
      const href = $(link).attr('href');
      const text = $(link).text().trim();
      console.log(`链接 [${i+1}]: ${text} -> ${href?.substring(0, 80)}...`);
    });
    
    // 检查脚本中的坐标
    const scripts = $('script');
    console.log(`\n脚本标签数量: ${scripts.length}`);
    let coordFound = false;
    scripts.each((i, script) => {
      const content = $(script).html() || '';
      if (content.includes('lat') || content.includes('lng') || content.includes('google')) {
        if (!coordFound) {
          console.log(`发现可能包含坐标的脚本:`);
          console.log(content.substring(0, 200) + '...');
          coordFound = true;
        }
      }
    });
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('\n🔚 浏览器已关闭');
    }
  }

  async analyze(url) {
    console.log('🎯 Jalan页面结构分析工具');
    console.log('⚙️ 目标: 理解实际HTML结构以优化选择器');
    console.log('======================================================================');
    
    try {
      await this.initBrowser();
      const result = await this.analyzePageStructure(url);
      
      if (result) {
        console.log('\n🎉 页面结构分析完成！');
        console.log('✅ 根据以上分析结果优化选择器配置');
      }
      
      return result;
      
    } catch (error) {
      console.error(`❌ 分析失败: ${error.message}`);
      return false;
    } finally {
      await this.cleanup();
    }
  }
}

// 命令行执行
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('❌ 请提供要分析的URL');
    console.log('用法: node scripts/analyze-jalan-structure.js <URL>');
    console.log('示例: node scripts/analyze-jalan-structure.js https://www.jalan.net/event/evt_343864/');
    process.exit(1);
  }
  
  const analyzer = new JalanStructureAnalyzer();
  
  try {
    await analyzer.analyze(url);
    console.log('✅ 分析程序执行完成');
  } catch (error) {
    console.error(`❌ 程序执行失败: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = JalanStructureAnalyzer; 