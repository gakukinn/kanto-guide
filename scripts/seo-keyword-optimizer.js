const fs = require('fs');
const path = require('path');

// 花火大会专门关键词库
const hanabiKeywords = {
  general: [
    '花火大会', '东京花火', '日本花火', '花火观赏', '花火旅游',
    '夏季祭典', '花火节', '烟火大会', '日本旅游', '关东花火'
  ],
  locations: {
    itabashi: ['板桥花火', '荒川花火', '关东最大', '板桥区', '57万人'],
    edogawa: ['江户川花火', '第50回', '音乐花火', 'BGM同步', '1万4000发'],
    jingu: ['神宫外苑', '100万人', '明治神宫', '新宿花火', '都心花火'],
    okutama: ['奥多摩', '山间花火', '自然花火', '避暑', '70周年'],
    kozushima: ['神津岛', '离岛花火', '海岛', '渚花火', '1000人'],
    akishima: ['昭岛', '鲸鱼祭', '市民花火', '青梅线', '梦花火']
  },
  attributes: [
    '2025年', '8月', 'Walker Plus', '中国游客', '交通指南',
    '观赏攻略', '有料席', '免费观赏', '河川敷', '夜景'
  ]
};

// 生成页面专属关键词
function generatePageKeywords(location, hanabiData) {
  const locationKeywords = hanabiKeywords.locations[location] || [];
  const keywords = [
    ...hanabiKeywords.general.slice(0, 5),
    ...locationKeywords,
    ...hanabiKeywords.attributes.slice(0, 8),
    hanabiData.name,
    `${hanabiData.date.split('年')[1]}`,
    `${hanabiData.expectedVisitors}`,
    `${hanabiData.fireworksCount}`
  ];
  
  return [...new Set(keywords)].filter(k => k && k.length > 1);
}

// 生成SEO标题
function generateSEOTitle(location, hanabiData) {
  const templates = {
    itabashi: `${hanabiData.name} 2025 | 关东最大57万人观赏完全指南`,
    edogawa: `${hanabiData.name} 2025 | 第50回纪念音乐花火攻略`,
    jingu: `${hanabiData.name} 2025 | 100万人都心花火完全指南`,
    okutama: `${hanabiData.name} 2025 | 山间避暑花火70周年纪念`,
    kozushima: `${hanabiData.name} 2025 | 离岛海景花火独特体验`,
    akishima: `${hanabiData.name} 2025 | 鲸鱼祭梦花火市民盛典`
  };
  
  return templates[location] || `${hanabiData.name} 2025 | 东京花火大会完全指南`;
}

// 生成SEO描述
function generateSEODescription(location, hanabiData) {
  const templates = {
    itabashi: `2025年8月2日，第66回板桥花火大会。荒川河川敷57万人观赏，关东最大规模1万5000发花火。详细交通指南、观赏攻略、有料席信息。`,
    edogawa: `2025年8月2日，第50回江户川区花火大会纪念。1万4000发音乐花火BGM同步演出，7个主题创意花火。专为中国游客提供详细攻略。`,
    jingu: `2025年8月16日，神宫外苑花火大会。明治神宫外苑100万人观赏，都心最大花火盛典。详细交通、有料席、观赏位置完全指南。`,
    okutama: `2025年8月9日，奥多摩纳凉花火大会70周年纪念。山间避暑胜地1万人花火祭，远离都市喧嚣的自然花火体验。`,
    kozushima: `2025年8月4日，神津岛渚花火大会。东京离岛独特花火体验，海景与花火绝美共演，1000人规模的私密花火盛典。`,
    akishima: `2025年8月23日，昭岛市民鲸鱼祭梦花火。第53回市民参与型花火大会，2000发花火照亮昭岛夜空，青梅线便利交通。`
  };
  
  return templates[location] || `${hanabiData.name}详细信息、交通指南、观赏攻略。专为中国游客提供的东京花火大会完全指南。`;
}

// 优化现有页面文件
function optimizePageSEO() {
  console.log('🔍 开始SEO关键词优化...\n');
  
  const appDir = path.join(__dirname, '../src/app/august/hanabi/tokyo');
  const dataDir = path.join(__dirname, '../src/data');
  const locations = ['itabashi', 'edogawa', 'jingu-gaien', 'okutama', 'kozushima', 'akishima'];
  
  const seoReport = [];
  
  locations.forEach(location => {
    const pagePath = path.join(appDir, location, 'page.tsx');
    
    if (fs.existsSync(pagePath)) {
      // 读取对应的数据文件
      const dataFile = `level5-august-${location === 'jingu-gaien' ? 'jingu-gaien' : location}-hanabi.ts`;
      const dataPath = path.join(dataDir, dataFile);
      
      if (fs.existsSync(dataPath)) {
        try {
          const dataContent = fs.readFileSync(dataPath, 'utf8');
          
          // 简单解析数据（实际项目中建议使用AST解析）
          const nameMatch = dataContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
          const dateMatch = dataContent.match(/date:\s*['"`]([^'"`]+)['"`]/);
          const visitorsMatch = dataContent.match(/expectedVisitors:\s*['"`]([^'"`]+)['"`]/);
          const fireworksMatch = dataContent.match(/fireworksCount:\s*['"`]([^'"`]+)['"`]/);
          
          if (nameMatch && dateMatch) {
            const hanabiData = {
              name: nameMatch[1],
              date: dateMatch[1],
              expectedVisitors: visitorsMatch ? visitorsMatch[1] : '',
              fireworksCount: fireworksMatch ? fireworksMatch[1] : ''
            };
            
            const keywords = generatePageKeywords(location, hanabiData);
            const title = generateSEOTitle(location, hanabiData);
            const description = generateSEODescription(location, hanabiData);
            
            seoReport.push({
              location,
              title,
              description,
              keywords: keywords.slice(0, 15), // 限制关键词数量
              keywordCount: keywords.length
            });
            
            console.log(`✅ ${location}:`);
            console.log(`   标题: ${title}`);
            console.log(`   描述: ${description.substring(0, 100)}...`);
            console.log(`   关键词数: ${keywords.length}`);
            console.log('');
          }
        } catch (error) {
          console.log(`❌ ${location}: 数据解析错误 - ${error.message}`);
        }
      }
    }
  });
  
  // 生成SEO优化报告
  const reportPath = path.join(__dirname, '../docs/seo-keyword-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalPages: seoReport.length,
    pages: seoReport,
    recommendations: [
      '在页面metadata中添加生成的title和description',
      '在页面内容中自然融入关键词',
      '添加结构化数据标记',
      '优化图片alt标签',
      '创建面包屑导航'
    ]
  }, null, 2));
  
  console.log(`📊 SEO优化报告已生成: docs/seo-keyword-report.json`);
  return seoReport;
}

// 生成关键词密度分析
function analyzeKeywordDensity() {
  console.log('\n📈 关键词密度分析...');
  
  const recommendations = {
    primary: '目标关键词密度 2-3%',
    secondary: '相关关键词密度 1-2%',
    longtail: '长尾关键词自然融入',
    tips: [
      '避免关键词堆砌',
      '使用同义词和变体',
      '在标题、描述、正文中均衡分布',
      '重视用户体验'
    ]
  };
  
  Object.entries(recommendations).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      console.log(`${key}:`);
      value.forEach(tip => console.log(`  - ${tip}`));
    } else {
      console.log(`${key}: ${value}`);
    }
  });
  
  return recommendations;
}

// 主执行函数
function runSEOOptimization() {
  console.log('🚀 启动SEO关键词优化系统...\n');
  
  try {
    const seoReport = optimizePageSEO();
    const densityAnalysis = analyzeKeywordDensity();
    
    console.log('\n🎯 SEO优化完成！');
    console.log(`优化了 ${seoReport.length} 个页面的SEO配置`);
    
    return { seoReport, densityAnalysis };
  } catch (error) {
    console.error('❌ SEO优化过程中出现错误:', error);
    return { error: error.message };
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runSEOOptimization();
}

module.exports = { runSEOOptimization, generatePageKeywords, generateSEOTitle, generateSEODescription }; 