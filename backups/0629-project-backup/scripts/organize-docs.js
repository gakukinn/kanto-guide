const fs = require('fs');
const path = require('path');

// 定义需要移动的文档文件和目标目录
const docFiles = [
  // Markdown文档
  '活动内容简介示例.md',
  '页面测试结果详细报告.md', 
  '页面测试报告.md',
  'project-requirements.md',
  'AGENTS.md',
  'CLAUDE.md',
  'crawled_.md',
  'tokyo_events_page.md',
  
  // 测试和验证脚本
  'page-test-script.js',
  'test-precise.js',
  'test-text-parse.js', 
  'test-crawlee.js',
  'test-simple.js',
  'test-address.js',
  'test-all-fields.js',
  'test-fix.js',
  'test-universal.js',
  
  // 数据分析和比较脚本
  'compare-tokyo-saitama.js',
  'debug-saitama-structure.js',
  'final-verification.js',
  
  // 爬虫和数据处理脚本
  'crawl-saitama-optimized.js',
  'crawl-saitama-activities.js',
  'create-unified-activity-system.js',
  'crawl-tokyo-complete-stack.js',
  'crawl-tokyo-10-activities.js',
  'crawl-nagano-advanced.js',
  'crawl-koshinetsu-events-advanced.py',
  'crawl-kanagawa-events.py',
  'crawl-chiba-events.py',
  'crawl-saitama-events.py',
  'final-accurate-crawler.py',
  'crawl-specific-events.py',
  'crawl-tokyo-events.py',
  'quick-crawl.py',
  
  // 检查和验证脚本
  'check-activity-2-new-name.js',
  'check-tokyo-region-id.js',
  'check-all-tokyo-activities.js',
  'check-first-activity-details.js',
  'check-tokyo-current-count.js',
  'verify-kanagawa-import.js',
  'verify-chiba-import.js',
  'verify-saitama-import.js',
  'verify-tokyo-import.js',
  
  // 修复和更新脚本
  'manual-update-activity-2-complete.js',
  'manual-update-activity-2.js',
  'fix-correct-parser.js',
  'fix-cheerio-parser.js',
  'fix-bonbori-classification.js',
  'update-first-activity-address.js',
  'import-tokyo-activity-2.js',
  'import-tokyo-activity-1.js',
  
  // JSON数据文件
  'koshinetsu_events_advanced_20250622_224415.json',
  'three_regions_browser_extract_20250622_222810.json',
  'three_regions_events_20250622_222704.json',
  'three_regions_events_20250622_222554.json',
  'three_regions_events_20250622_222516.json',
  'kanagawa_events_accurate_ten_fields.json',
  'chiba_events_accurate_ten_fields.json',
  'saitama_events_accurate_ten_fields.json',
  'tokyo_events_accurate_ten_fields.json',
  'tokyo_events_ten_fields.json',
  'tokyo_events_summary.json',
  'event_10_宮城.json',
  'event_09_岩手.json', 
  'event_08_青森.json',
  'event_07_北海道.json',
  'event_06_東京.json',
  'event_05_全国.json',
  'event_04_イベントガイド.json',
  'event_03_イベントガイド.json',
  'event_02_イベントガイド.json',
  'event_01_遊び・体験.json'
];

// 按类型分类文档
const categories = {
  'markdown': {
    dir: 'docs/markdown',
    files: docFiles.filter(f => f.endsWith('.md'))
  },
  'scripts': {
    dir: 'docs/scripts',
    files: docFiles.filter(f => f.endsWith('.js') || f.endsWith('.py'))
  },
  'data': {
    dir: 'docs/data',
    files: docFiles.filter(f => f.endsWith('.json'))
  }
};

function organizeDocs() {
  console.log('🗂️ 开始整理文档文件...\n');
  
  let movedCount = 0;
  let skippedCount = 0;
  
  // 创建分类目录
  Object.values(categories).forEach(category => {
    if (!fs.existsSync(category.dir)) {
      fs.mkdirSync(category.dir, { recursive: true });
      console.log(`📁 创建目录: ${category.dir}`);
    }
  });
  
  // 移动文件
  Object.entries(categories).forEach(([categoryName, category]) => {
    console.log(`\n📂 处理 ${categoryName} 类文档:`);
    
    category.files.forEach(fileName => {
      const sourcePath = fileName;
      const targetPath = path.join(category.dir, fileName);
      
      try {
        if (fs.existsSync(sourcePath)) {
          // 检查目标文件是否已存在
          if (fs.existsSync(targetPath)) {
            console.log(`⚠️  文件已存在，跳过: ${fileName}`);
            skippedCount++;
          } else {
            // 移动文件
            fs.renameSync(sourcePath, targetPath);
            console.log(`✅ 移动: ${fileName} → ${category.dir}/`);
            movedCount++;
          }
        } else {
          console.log(`❌ 文件不存在: ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ 移动失败 ${fileName}:`, error.message);
      }
    });
  });
  
  console.log(`\n📊 整理完成统计:`);
  console.log(`✅ 成功移动: ${movedCount} 个文件`);
  console.log(`⚠️  跳过文件: ${skippedCount} 个文件`);
  
  // 显示整理后的目录结构
  console.log(`\n📁 整理后的docs目录结构:`);
  Object.values(categories).forEach(category => {
    if (fs.existsSync(category.dir)) {
      const files = fs.readdirSync(category.dir);
      console.log(`${category.dir}: ${files.length} 个文件`);
    }
  });
}

// 运行整理函数
organizeDocs(); 