import fs from 'fs';

/**
 * 甲信越花火数据对比分析器
 * 对比WalkerPlus抓取数据与本地页面数据，找出遗漏的重要花火信息
 */

// WalkerPlus抓取的数据（来自之前的成功抓取）
const walkerPlusData = [
  {
    title: "第119回 長野えびす講煙火大会",
    date: "2025-11-23",
    location: "長野大橋西側  犀川第2緑地",
    audience: "",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0420e01112/"
  },
  {
    title: "長岡まつり大花火大会",
    date: "2025-08-02",
    location: "信濃川河川敷",
    audience: "",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0415e00665/"
  },
  {
    title: "新潟まつり花火大会",
    date: "2025-08-10",
    location: "新潟市中央区信濃川河畔(昭和大橋周辺)",
    audience: "",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0415e00666/"
  },
  {
    title: "全国新作花火チャレンジカップ2025",
    date: "2025-09-06",
    location: "長野県諏訪市湖畔公園前諏訪湖上",
    audience: "20名",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0420e00806/"
  },
  {
    title: "市川三郷町ふるさと夏まつり　第37回「神明の花火大会」",
    date: "2025-08-07",
    location: "三郡橋下流笛吹川河畔",
    audience: "20万人",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0419e00910/"
  },
  {
    title: "第51回 阿賀野川ござれや花火",
    date: "2025-08-25",
    location: "阿賀野川松浜橋上流側",
    audience: "1070人",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0415e00061/"
  },
  {
    title: "おぢやまつり大花火大会2024",
    date: "2024-08-24",
    location: "信濃川河川敷(旭橋下流)",
    audience: "",
    fireworks: "7000発",
    url: "https://hanabi.walkerplus.com/detail/ar0415e00060/"
  },
  {
    title: "ぎおん柏崎まつり 海の大花火大会",
    date: "2025-07-26",
    location: "柏崎市中央海岸・みなとまち海浜公園一帯",
    audience: "",
    fireworks: "6000発",
    url: "https://hanabi.walkerplus.com/detail/ar0415e00663/"
  },
  {
    title: "浅原神社 秋季例大祭奉納大煙火",
    date: "2025-09-12",
    location: "片貝町浅原神社裏手",
    audience: "",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0415e00667/"
  },
  {
    title: "河口湖湖上祭",
    date: "2025-08-05",
    location: "河口湖畔船津浜",
    audience: "",
    fireworks: "",
    url: "https://hanabi.walkerplus.com/detail/ar0419e00681/"
  }
];

// 本地甲信越花火页面数据（从page.tsx提取的关键信息）
const localKoshinetsuData = [
  {
    name: '富士山河口湖山开花火大会',
    japaneseName: '富士山・河口湖山開き花火大会',
    date: '2025年7月5日',
    location: '山梨県・南都留郡富士河口湖町/大池公园主会场',
    fireworksCount: 2000,
    expectedVisitors: 50000
  },
  {
    name: '动漫经典动画歌曲花火',
    japaneseName: 'アニメクラシックス アニソン花火',
    date: '2025年7月5日',
    location: '山梨県・南巨摩郡富士川町/富士川生机运动公园特设会场',
    fireworksCount: 10000,
    expectedVisitors: 30000
  },
  {
    name: '河口湖湖上祭',
    japaneseName: '河口湖湖上祭',
    date: '2025年8月5日',
    location: '山梨県・南都留郡富士河口湖町/河口湖畔船津浜',
    fireworksCount: 10000,
    expectedVisitors: 100000
  },
  {
    name: '市川三郷町神明花火大会',
    japaneseName: '市川三郷町神明の花火大会',
    date: '2025年8月7日',
    location: '山梨県・西八代郡市川三郷町/笛吹川河畔',
    fireworksCount: 20000,
    expectedVisitors: 200000
  },
  {
    name: '祇园柏崎祭海之大花火大会',
    japaneseName: 'ぎおん柏崎まつり 海の大花火大会',
    date: '2025年7月26日',
    location: '新潟県・柏崎市/中央海岸',
    fireworksCount: 16000,
    expectedVisitors: 170000
  },
  {
    name: '祇园柏崎祭 海之大花火大会',
    japaneseName: 'ぎおん柏崎まつり 海の大花火大会',
    date: '2024年7月26日',
    location: '新潟県・柏崎市/柏崎市中央海岸',
    fireworksCount: 15000,
    expectedVisitors: 200000
  },
  {
    name: '上越祭大花火大会(直江津地区)',
    japaneseName: '上越まつり大花火大会（直江津地区）',
    date: '2024年7月29日',
    location: '新潟県・上越市/直江津港周边',
    fireworksCount: 5000,
    expectedVisitors: 100000
  },
  {
    name: '长冈祭大花火大会',
    japaneseName: '長岡まつり大花火大会',
    date: '2025年8月2日、3日',
    location: '新潟県・长冈市/信濃川河川敷',
    fireworksCount: 20000,
    expectedVisitors: 345000
  },
  {
    name: '第119回长野惠比寿讲烟火大会',
    japaneseName: '第119回長野えびす講煙火大会',
    date: '2025年11月23日',
    location: '长野県・长野市/长野大桥西侧 犀川第2绿地',
    fireworksCount: 10000,
    expectedVisitors: 400000
  },
  {
    name: '第77回诹访湖祭湖上花火大会',
    japaneseName: '第77回諏訪湖祭湖上花火大会',
    date: '2025年8月15日',
    location: '长野県・諏訪市/諏訪市湖畔公園前諏訪湖上',
    fireworksCount: 40000,
    expectedVisitors: 500000
  },
  {
    name: '新潟祭花火大会',
    japaneseName: '新潟まつり花火大会',
    date: '2025年8月10日',
    location: '新潟県・新潟市中央区/信濃川河畔 昭和大橋西詰',
    fireworksCount: 3000,
    expectedVisitors: 320000
  },
  {
    name: '第51回阿贺野川花火音乐祭ござれや花火',
    japaneseName: '第51回あがの川花火音楽祭ござれや花火',
    date: '2025年8月17日',
    location: '新潟県・阿賀野市/阿賀野川河川敷',
    fireworksCount: 4000,
    expectedVisitors: 95000
  },
  {
    name: '三条市合并20周年纪念 第21回三条夏祭大花火大会',
    japaneseName: '三条市合併20周年記念 第21回 三条夏まつり大花火大会',
    date: '2024年8月4日',
    location: '新潟県・三条市/信浓川河川敷',
    fireworksCount: 8000,
    expectedVisitors: 100000
  },
  {
    name: '第38回须坂大家花火大会',
    japaneseName: '第38回須坂みんなの花火大会',
    date: '2024年7月27日',
    location: '长野県・须坂市/千曲川河川敷百々川绿地',
    fireworksCount: 6000,
    expectedVisitors: 60000
  },
  {
    name: '上田市诞生20周年纪念 第38回信州上田大花火大会',
    japaneseName: '上田市誕生20周年記念　第38回 信州上田大花火大会',
    date: '2024年8月5日',
    location: '长野県・上田市/千曲川河川敷',
    fireworksCount: 10000,
    expectedVisitors: 120000
  },
  {
    name: '全国新作花火竞技大会',
    japaneseName: '全国新作花火競技大会',
    date: '2025年9月7日',
    location: '長野県・諏訪市/諏訪湖',
    fireworksCount: 2000,
    expectedVisitors: 300000
  }
];

/**
 * 标准化日期格式
 */
function normalizeDate(dateStr) {
  if (!dateStr) return '';
  
  // 处理各种日期格式
  if (dateStr.includes('年') && dateStr.includes('月') && dateStr.includes('日')) {
    // 2025年8月5日 -> 2025-08-05
    const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const [, year, month, day] = match;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  
  if (dateStr.includes('-')) {
    // 已经是标准格式
    return dateStr;
  }
  
  return dateStr;
}

/**
 * 标准化花火名称（用于匹配）
 */
function normalizeTitle(title) {
  if (!title) return '';
  
  return title
    .replace(/第\d+回\s*/, '') // 移除第XX回
    .replace(/\d{4}年?\s*/, '') // 移除年份
    .replace(/\s+/g, '') // 移除空格
    .toLowerCase();
}

/**
 * 检查两个花火是否匹配
 */
function isMatchingEvent(walkerEvent, localEvent) {
  const walkerTitle = normalizeTitle(walkerEvent.title);
  const localTitle = normalizeTitle(localEvent.japaneseName);
  const localTitleCn = normalizeTitle(localEvent.name);
  
  // 检查标题匹配
  if (walkerTitle.includes(localTitle.substring(0, 5)) || 
      localTitle.includes(walkerTitle.substring(0, 5)) ||
      walkerTitle.includes(localTitleCn.substring(0, 5))) {
    return true;
  }
  
  // 检查日期匹配
  const walkerDate = normalizeDate(walkerEvent.date);
  const localDate = normalizeDate(localEvent.date);
  
  if (walkerDate && localDate && walkerDate === localDate) {
    return true;
  }
  
  return false;
}

/**
 * 执行数据对比分析
 */
function compareHanabiData() {
  console.log('🎆 甲信越花火数据对比分析');
  console.log('=' .repeat(50));
  
  console.log(`📊 数据统计:`);
  console.log(`   WalkerPlus抓取数据: ${walkerPlusData.length} 个花火大会`);
  console.log(`   本地页面数据: ${localKoshinetsuData.length} 个花火大会`);
  console.log('');
  
  // 找出WalkerPlus中有但本地没有的
  const walkerOnlyEvents = [];
  const matchedEvents = [];
  
  walkerPlusData.forEach(walkerEvent => {
    const matchFound = localKoshinetsuData.some(localEvent => 
      isMatchingEvent(walkerEvent, localEvent)
    );
    
    if (matchFound) {
      matchedEvents.push(walkerEvent);
    } else {
      walkerOnlyEvents.push(walkerEvent);
    }
  });
  
  // 找出本地有但WalkerPlus没有的
  const localOnlyEvents = [];
  
  localKoshinetsuData.forEach(localEvent => {
    const matchFound = walkerPlusData.some(walkerEvent => 
      isMatchingEvent(walkerEvent, localEvent)
    );
    
    if (!matchFound) {
      localOnlyEvents.push(localEvent);
    }
  });
  
  // 输出匹配结果
  console.log(`✅ 匹配成功的花火大会 (${matchedEvents.length} 个):`);
  matchedEvents.forEach((event, index) => {
    console.log(`${index + 1}. ${event.title} - ${event.date}`);
  });
  console.log('');
  
  // 输出WalkerPlus独有的（可能是本地遗漏的重要信息）
  console.log(`🔍 WalkerPlus独有的花火大会 (${walkerOnlyEvents.length} 个) - 可能遗漏的重要信息:`);
  walkerOnlyEvents.forEach((event, index) => {
    console.log(`${index + 1}. ${event.title}`);
    console.log(`   📅 日期: ${event.date}`);
    console.log(`   📍 地点: ${event.location}`);
    if (event.audience) console.log(`   👥 观众: ${event.audience}`);
    if (event.fireworks) console.log(`   🎆 花火: ${event.fireworks}`);
    console.log(`   🔗 链接: ${event.url}`);
    console.log('');
  });
  
  // 输出本地独有的
  console.log(`📋 本地页面独有的花火大会 (${localOnlyEvents.length} 个):`);
  localOnlyEvents.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name} (${event.japaneseName})`);
    console.log(`   📅 日期: ${event.date}`);
    console.log(`   📍 地点: ${event.location}`);
    console.log(`   👥 观众: ${event.expectedVisitors}人`);
    console.log(`   🎆 花火: ${event.fireworksCount}発`);
    console.log('');
  });
  
  // 生成对比报告
  const comparisonReport = {
    timestamp: new Date().toISOString(),
    summary: {
      walkerPlusTotal: walkerPlusData.length,
      localTotal: localKoshinetsuData.length,
      matched: matchedEvents.length,
      walkerOnly: walkerOnlyEvents.length,
      localOnly: localOnlyEvents.length
    },
    matchedEvents: matchedEvents,
    walkerOnlyEvents: walkerOnlyEvents,
    localOnlyEvents: localOnlyEvents,
    analysis: {
      coverageRate: ((matchedEvents.length / Math.max(walkerPlusData.length, localKoshinetsuData.length)) * 100).toFixed(1),
      missingFromLocal: walkerOnlyEvents.length,
      missingFromWalker: localOnlyEvents.length
    }
  };
  
  // 保存报告
  const reportFile = `koshinetsu-hanabi-comparison-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(reportFile, JSON.stringify(comparisonReport, null, 2), 'utf8');
  
  console.log('📈 分析结果:');
  console.log(`   数据覆盖率: ${comparisonReport.analysis.coverageRate}%`);
  console.log(`   本地可能遗漏: ${comparisonReport.analysis.missingFromLocal} 个重要花火`);
  console.log(`   WalkerPlus未收录: ${comparisonReport.analysis.missingFromWalker} 个本地花火`);
  console.log('');
  console.log(`📁 详细报告已保存: ${reportFile}`);
  
  return comparisonReport;
}

/**
 * 主函数
 */
function main() {
  try {
    console.log('🎌 甲信越花火数据对比分析器');
    console.log('🛠️ 技术栈: Playwright + Cheerio + 数据分析');
    console.log('📍 对比: WalkerPlus ar0400 vs 本地甲信越花火页面');
    console.log('');
    
    const report = compareHanabiData();
    
    if (report.analysis.missingFromLocal > 0) {
      console.log('⚠️ 发现本地页面可能遗漏的重要花火信息！');
      console.log('💡 建议将WalkerPlus独有的花火大会添加到本地页面中');
    } else {
      console.log('✅ 本地页面已包含所有WalkerPlus的重要花火信息');
    }
    
  } catch (error) {
    console.error('❌ 分析过程中出错:', error.message);
    console.error('📋 错误详情:', error.stack);
  }
}

// 运行分析
main(); 