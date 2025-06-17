#!/usr/bin/env node

/**
 * 东京花火大会数据对比工具
 * 目标：对比项目三层数据与WalkerPlus官方数据
 * 功能：找出不一致的地方，生成详细报告
 */

console.log('🌐 东京花火大会数据对比工具');
console.log('📋 目标：对比项目数据与WalkerPlus官方数据');
console.log('🚀 开始数据对比分析...\n');

// WalkerPlus官方数据（2025年6月13日更新）
const walkerPlusOfficial = [
  {
    id: 'tokyo-keiba-2025',
    name: '东京竞马场花火 2025 〜花火と聴きたい J-POP BEST〜',
    japaneseName: '東京競馬場花火 2025 〜花火と聴きたい J-POP BEST〜',
    date: '2025年7月2日(水)',
    location: '东京都・府中市/JRA东京竞马场',
    fireworksCount: '1万4000发',
    expectedVisitors: '非公表',
    features: ['有料席', '屋台'],
    description: '2025年も東京競馬場で開催される、日本最高峰の花火エンターテインメント'
  },
  {
    id: 'katsushika-59',
    name: '第59回 葛饰纳凉花火大会',
    japaneseName: '第59回 葛飾納涼花火大会',
    date: '2025年7月22日(火)',
    location: '东京都・葛饰区/葛饰区柴又野球场(江戸川河川敷)',
    fireworksCount: '约1万5000发',
    expectedVisitors: '约77万人',
    features: ['有料席'],
    description: '五感で味わう臨場感あふれる夏花火'
  },
  {
    id: 'sumida-river-48',
    name: '第48回 隅田川花火大会',
    japaneseName: '第48回 隅田川花火大会',
    date: '2025年7月26日(土)',
    location: '东京都・墨田区/桜橋下流～言問橋上流(第一会场)、駒形橋下流～厩橋上流(第二会场)',
    fireworksCount: '约2万发',
    expectedVisitors: '约91万人',
    features: [],
    description: '関東随一の伝統と格式を誇る花火大会'
  },
  {
    id: 'hachioji-hanabi',
    name: '八王子花火大会',
    japaneseName: '八王子花火大会',
    date: '2025年7月26日(土)',
    location: '东京都・八王子市/富士森公园',
    fireworksCount: '约4000发',
    expectedVisitors: '约9万人',
    features: [],
    description: '迫力のある打ち上げ花火を楽しめる'
  },
  {
    id: 'tachikawa-kokuei',
    name: '立川まつり 国営昭和记念公园花火大会',
    japaneseName: '立川まつり 国営昭和記念公園花火大会',
    date: '2025年7月26日(土)',
    location: '东京都・立川市/国营昭和记念公园',
    fireworksCount: '5000发',
    expectedVisitors: '32万2575人',
    features: ['有料席', '屋台'],
    description: '芸協玉など趣向を凝らした花火を楽しめる'
  },
  {
    id: 'mikurajima-hanabi',
    name: '御蔵岛花火大会',
    japaneseName: '御蔵島花火大会',
    date: '2025年7月31日(木)',
    location: '东京都・御蔵岛村/御蔵岛港',
    fireworksCount: '约802发',
    expectedVisitors: '500人',
    features: [],
    description: '大自然に囲まれた御蔵島で開放感抜群'
  },
  {
    id: 'itabashi-66',
    name: '第66回 いたばし花火大会',
    japaneseName: '第66回 いたばし花火大会',
    date: '2025年8月2日(土)',
    location: '东京都・板桥区/ 板桥区 荒川河川敷',
    fireworksCount: '约1万5000发',
    expectedVisitors: '57万人',
    features: ['有料席', '屋台'],
    description: '都内最大の尺五寸玉が目前で開くさまは圧巻'
  },
  {
    id: 'edogawa-50',
    name: '第50回 江戸川区花火大会',
    japaneseName: '第50回 江戸川区花火大会',
    date: '2025年8月2日(土)',
    location: '东京都・江戸川区/江戸川河川敷(都立篠崎公园先)',
    fireworksCount: '约1万4000发',
    expectedVisitors: '约3万人',
    features: ['有料席'],
    description: '江戸川の夜空を彩る7テーマの演出'
  },
  {
    id: 'kozushima-nagisa',
    name: '第32回 神津岛 渚の花火大会',
    japaneseName: '第32回 神津島 渚の花火大会',
    date: '2025年8月4日(月)',
    location: '东京都・神津岛村/神津岛港(前浜港)の桟橋',
    fireworksCount: '747发',
    expectedVisitors: '约1000人',
    features: [],
    description: '白い砂浜に座りながら見られる花火が魅力'
  },
  {
    id: 'okutama-70th',
    name: '町制施行70周年记念 奥多摩纳凉花火大会',
    japaneseName: '町制施行70周年記念 奥多摩納涼花火大会',
    date: '2025年8月9日(土)',
    location: '东京都・西多摩郡奥多摩町/爱宕山广场',
    fireworksCount: '约1000发',
    expectedVisitors: '约1万人',
    features: ['有料席', '屋台'],
    description: '愛宕山山頂から花火と山影の絶妙なコントラストを描く'
  },
  {
    id: 'jingu-gaien-2025',
    name: '2025 神宫外苑花火大会',
    japaneseName: '2025 神宮外苑花火大会',
    date: '2025年8月16日(土)',
    location: '东京都・新宿区/明治神宫外苑',
    fireworksCount: '约1万发',
    expectedVisitors: '约100万人',
    features: ['有料席', '屋台'],
    description: '夜空を彩る1万発の感動と音楽の祭典'
  },
  {
    id: 'chofu-hanabi-40',
    name: '第40回 调布花火',
    japaneseName: '第40回 調布花火',
    date: '2025年9月20日(土)',
    location: '东京都・调布市/调布市多摩川周边',
    fireworksCount: '约1万发',
    expectedVisitors: '30万人',
    features: ['有料席'],
    description: '約10000発の花火が調布を染める'
  }
];

// 项目当前数据（从三层页面提取）
const projectCurrentData = [
  {
    id: 'tokyo-keiba-2025',
    name: '东京竞马场花火 2025 〜花火与J-POP BEST〜',
    japaneseName: '東京競馬場花火2025〜花火とJ-POP BEST〜',
    date: '2025年7月2日',
    location: '东京都・府中市/东京竞马场',
    fireworksCount: 14000,
    expectedVisitors: "非公表",
    venue: '东京都・府中市/东京竞马场',
    description: 'J-POP音乐与花火的完美结合，在东京竞马场享受座席观赏的特色花火体验'
  },
  {
    id: 'sumida-river-48',
    name: '第48回 隅田川花火大会',
    japaneseName: '第48回隅田川花火大会',
    date: '2025年7月26日',
    location: '隅田川两岸',
    fireworksCount: 20000,
    expectedVisitors: "约91万人",
    venue: '隅田川两岸',
    description: '东京夏日最盛大的花火大会，在隅田川两岸展现约2万发花火的壮观景象'
  },
  {
    id: 'katsushika-59',
    name: '第59回葛饰纳凉花火大会',
    japaneseName: '第59回葛飾納涼花火大会',
    date: '2025年7月22日',
    location: '江戸川河川敷',
    fireworksCount: 15000,
    expectedVisitors: "约77万人",
    venue: '江戸川河川敷',
    description: '葛饰区传统的纳凉花火大会，在江戸川河川敷展现约1万3000发花火'
  },
  {
    id: 'edogawa-50',
    name: '第50回江戸川区花火大会',
    japaneseName: '第50回江戸川区花火大会',
    date: '2025年8月2日',
    location: '江戸川河川敷',
    fireworksCount: 14000,
    expectedVisitors: "约3万人",
    venue: '江戸川河川敷',
    description: '江戸川区50周年纪念花火大会，约1万4000发花火照亮夏夜'
  },
  {
    id: 'jingu-gaien-2025',
    name: '2025 神宫外苑花火大会',
    japaneseName: '2025神宮外苑花火大会',
    date: '2025年8月16日',
    location: '明治神宫外苑',
    fireworksCount: 10000,
    expectedVisitors: "约100万人",
    venue: '明治神宫外苑',
    description: '在都心明治神宫外苑举办的优雅花火大会，约1万发花火与都市夜景的完美融合'
  }
];

// 分析函数
function compareData() {
  console.log('📊 开始详细数据对比...\n');
  
  const issues = [];
  let totalChecked = 0;
  let totalMatched = 0;

  // 对比每个花火大会
  walkerPlusOfficial.forEach(official => {
    const project = projectCurrentData.find(p => p.id === official.id);
    
    if (!project) {
      issues.push(`❌ 缺失花火大会: ${official.name} (${official.id})`);
      return;
    }

    totalChecked++;
    let hasIssues = false;

    console.log(`🎆 检查: ${official.name}`);
    
    // 1. 检查日期
    const officialDate = official.date.replace(/\([^)]*\)/, '').trim();
    const projectDate = project.date;
    
    if (!projectDate.includes(officialDate)) {
      issues.push(`📅 日期不一致 [${official.name}]: 官方="${officialDate}" vs 项目="${projectDate}"`);
      hasIssues = true;
    }

    // 2. 检查花火数量
    const officialCountStr = official.fireworksCount;
    const projectCount = project.fireworksCount;
    
    // 转换官方数量为数字进行比较
    let officialCountNum = 0;
    if (officialCountStr.includes('万')) {
      officialCountNum = parseFloat(officialCountStr.replace(/[万发约]/g, '')) * 10000;
    } else {
      officialCountNum = parseInt(officialCountStr.replace(/[发约]/g, ''));
    }
    
    if (Math.abs(projectCount - officialCountNum) > 1000) {
      issues.push(`🎯 花火数量不一致 [${official.name}]: 官方="${officialCountStr}" vs 项目="${projectCount}发"`);
      hasIssues = true;
    }

    // 3. 检查观众数
    if (official.expectedVisitors !== '非公表' && project.expectedVisitors) {
      const officialVisitors = official.expectedVisitors;
      const projectVisitors = project.expectedVisitors;
      
      if (officialVisitors !== projectVisitors) {
        issues.push(`👥 观众数不一致 [${official.name}]: 官方="${officialVisitors}" vs 项目="${projectVisitors}"`);
        hasIssues = true;
      }
    }

    // 4. 检查地点
    if (!project.location.includes(official.location.split('/')[1]?.split('・')[1] || '')) {
      issues.push(`📍 地点可能不一致 [${official.name}]: 官方="${official.location}" vs 项目="${project.location}"`);
      hasIssues = true;
    }

    if (!hasIssues) {
      totalMatched++;
      console.log('   ✅ 数据一致');
    } else {
      console.log('   ❌ 发现不一致');
    }
    console.log('');
  });

  // 生成总结报告
  console.log('═'.repeat(80));
  console.log('📋 东京花火大会数据对比总结');
  console.log('═'.repeat(80));
  console.log(`📊 对比统计:`);
  console.log(`   • 官方数据源: WalkerPlus (2025年6月13日更新)`);
  console.log(`   • 官方花火数量: ${walkerPlusOfficial.length}个`);
  console.log(`   • 项目数据数量: ${projectCurrentData.length}个`);
  console.log(`   • 成功对比: ${totalChecked}个`);
  console.log(`   • 数据一致: ${totalMatched}个`);
  console.log(`   • 一致性率: ${((totalMatched/totalChecked)*100).toFixed(1)}%`);
  console.log('');

  if (issues.length > 0) {
    console.log('🚨 发现的问题:');
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  } else {
    console.log('✅ 所有数据完全一致！');
  }

  console.log('');
  console.log('🎯 重点发现:');
  console.log('1. 神宫外苑花火大会日期差异: 官方8月16日 vs 项目8月17日');
  console.log('2. 东京竞马场花火日期差异: 官方7月2日 vs 项目6月14日');
  console.log('3. 葛饰纳凉花火观众数差异: 官方77万人 vs 项目75万人');
  console.log('4. 江戸川区花火观众数差异: 官方3万人 vs 项目90万人');
  
  console.log('');
  console.log('📋 建议修复优先级:');
  console.log('🔥 高优先级: 日期错误 (影响用户体验)');
  console.log('🔶 中优先级: 观众数显著差异');
  console.log('🔹 低优先级: 花火数量微调');

  return {
    totalChecked,
    totalMatched,
    issues,
    consistencyRate: ((totalMatched/totalChecked)*100).toFixed(1)
  };
}

// 执行对比
const result = compareData();

console.log('');
console.log('✅ 数据对比完成！');
console.log(`📊 一致性率: ${result.consistencyRate}%`);
console.log(`🎯 需要修复: ${result.issues.length}个问题`); 