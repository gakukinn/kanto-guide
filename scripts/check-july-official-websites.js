const fs = require('fs');
const path = require('path');

console.log('🔍 7月花火五层页面官方网站检查\n');

// 数据目录路径
const dataDir = path.join(__dirname, '../src/data');

// 读取所有数据文件
function getAllDataFiles() {
  try {
    const files = fs.readdirSync(dataDir)
      .filter(file => file.startsWith('level5-july-hanabi-') && file.endsWith('.ts'))
      .sort();
    
    console.log(`📂 发现 ${files.length} 个7月花火五层页面文件\n`);
    return files;
  } catch (error) {
    console.error('❌ 读取数据目录失败:', error);
    return [];
  }
}

// 解析文件内容获取官方网站
function extractOfficialWebsites(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const websites = [];
    
    // 查找 officialWebsite 字段
    const officialWebsiteMatch = content.match(/officialWebsite:\s*['"`]([^'"`]+)['"`]/);
    if (officialWebsiteMatch) {
      websites.push(officialWebsiteMatch[1]);
    }
    
    // 查找 website 字段
    const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
    if (websiteMatch) {
      websites.push(websiteMatch[1]);
    }
    
    // 查找其他可能的网站链接（排除 walkerplus）
    const linkMatches = content.match(/https?:\/\/[^\s'"`,)]+/g) || [];
    linkMatches.forEach(link => {
      if (!link.includes('walkerplus') && 
          !link.includes('unsplash') && 
          !link.includes('youtube') &&
          !websites.includes(link)) {
        websites.push(link);
      }
    });
    
    return websites;
  } catch (error) {
    console.error(`❌ 读取文件失败 ${filePath}:`, error);
    return [];
  }
}

// 从文件名和内容中提取地区和活动信息
function extractEventInfo(filename, content) {
  try {
    // 提取活动名称
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const chineseTitle = titleMatch ? titleMatch[1] : '未知活动';
    
    // 从文件名推断地区
    let region = '未知地区';
    if (filename.includes('tokyo') || filename.includes('sumida') || filename.includes('tachikawa') || 
        filename.includes('keibajo') || filename.includes('katsushika') || filename.includes('hachioji') || 
        filename.includes('mikurajima')) {
      region = '东京';
    } else if (filename.includes('chiba') || filename.includes('futtsu') || filename.includes('kamogawa') || 
               filename.includes('marines') || filename.includes('motherfarm') || filename.includes('oamishirasato') || 
               filename.includes('shirahama') || filename.includes('sanmu')) {
      region = '千叶';
    } else if (filename.includes('saitama') || filename.includes('koshigaya') || filename.includes('iruma') || 
               filename.includes('seibu') || filename.includes('metsza') || filename.includes('ogawa')) {
      region = '埼玉';
    } else if (filename.includes('kanagawa') || filename.includes('kamakura') || filename.includes('yokohama') || 
               filename.includes('seaparadise') || filename.includes('nightflowers')) {
      region = '神奈川';
    } else if (filename.includes('kitakanto') || filename.includes('mito') || filename.includes('moka') || 
               filename.includes('tamura') || filename.includes('tatebayashi')) {
      region = '北关东';
    } else if (filename.includes('koshinetsu') || filename.includes('fuji') || filename.includes('gion') || 
               filename.includes('sanjo') || filename.includes('suzaka') || filename.includes('nojiri') || 
               filename.includes('anime')) {
      region = '甲信越';
    }
    
    return { region, title: chineseTitle };
  } catch (error) {
    console.error(`❌ 解析事件信息失败 ${filename}:`, error);
    return { region: '未知地区', title: '未知活动' };
  }
}

// 主检查功能
function checkJulyOfficialWebsites() {
  const files = getAllDataFiles();
  
  if (files.length === 0) {
    console.log('❌ 没有找到7月花火五层页面文件');
    return;
  }
  
  const results = {
    withOfficialSites: [],
    withoutOfficialSites: [],
    regionSummary: {}
  };
  
  console.log('📊 7月花火五层页面官方网站检查结果\n');
  
  files.forEach(filename => {
    const filePath = path.join(dataDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const websites = extractOfficialWebsites(filePath);
    const eventInfo = extractEventInfo(filename, content);
    
    const fileInfo = {
      filename,
      region: eventInfo.region,
      title: eventInfo.title,
      websites: websites.filter(site => !site.includes('walkerplus'))
    };
    
    // 按地区分类
    if (!results.regionSummary[eventInfo.region]) {
      results.regionSummary[eventInfo.region] = [];
    }
    results.regionSummary[eventInfo.region].push(fileInfo);
    
    if (fileInfo.websites.length > 0) {
      results.withOfficialSites.push(fileInfo);
    } else {
      results.withoutOfficialSites.push(fileInfo);
    }
  });
  
  // 按月份-地区-活动方式汇报
  console.log('📈 按地区统计结果:\n');
  
  Object.entries(results.regionSummary).sort().forEach(([region, events]) => {
    console.log(`🏮 七月${region}花火 (${events.length}个活动):`);
    
    events.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title}`);
      if (event.websites.length > 0) {
        console.log(`      ✅ 官方网站: ${event.websites.length}个`);
        event.websites.forEach(site => {
          console.log(`         🌐 ${site}`);
        });
      } else {
        console.log(`      ❌ 缺少官方网站`);
      }
      console.log('');
    });
  });
  
  // 总结统计
  console.log('📊 统计总结:');
  console.log(`   总检查文件: ${files.length}个`);
  console.log(`   有官方网站: ${results.withOfficialSites.length}个`);
  console.log(`   缺少官方网站: ${results.withoutOfficialSites.length}个`);
  console.log(`   覆盖地区: ${Object.keys(results.regionSummary).length}个\n`);
  
  // 按地区显示数量
  console.log('📍 各地区活动数量:');
  Object.entries(results.regionSummary).sort().forEach(([region, events]) => {
    const withSites = events.filter(e => e.websites.length > 0).length;
    const withoutSites = events.filter(e => e.websites.length === 0).length;
    console.log(`   ${region}: ${events.length}个 (✅${withSites} / ❌${withoutSites})`);
  });
  
  // 保存详细报告
  const reportPath = path.join(__dirname, '../july-official-website-check-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    checkDate: new Date().toISOString(),
    totalFiles: files.length,
    withOfficialSites: results.withOfficialSites.length,
    withoutOfficialSites: results.withoutOfficialSites.length,
    regionSummary: results.regionSummary,
    details: results
  }, null, 2));
  
  console.log(`\n💾 详细结果已保存到: ${reportPath}`);
  console.log('🎯 7月花火官方网站检查完成！');
  
  if (results.withoutOfficialSites.length > 0) {
    console.log(`⚠️ 发现 ${results.withoutOfficialSites.length} 个页面缺少官方网站`);
    return false;
  } else {
    console.log(`✅ 所有 ${results.withOfficialSites.length} 个页面都有官方网站`);
    return true;
  }
}

// 运行检查
checkJulyOfficialWebsites(); 