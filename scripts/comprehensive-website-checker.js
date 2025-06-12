#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 分析网站类型的函数
function analyzeWebsiteType(website) {
  if (!website) return { type: 'missing', isOfficial: false };
  
  const url = website.toLowerCase();
  
  // 政府官方网站
  if (url.includes('.go.jp') || url.includes('.city.jp') || url.includes('.lg.jp') || url.includes('.or.jp')) {
    return { type: 'government', isOfficial: true };
  }
  
  // Walker Plus - 权威旅游信息网站
  if (url.includes('walkerplus.com')) {
    return { type: 'walker_plus', isOfficial: true };
  }
  
  // 主办方官方网站判断
  if (url.includes('hanabi') || url.includes('fireworks') || url.includes('matsuri') || url.includes('festival')) {
    return { type: 'event_official', isOfficial: true };
  }
  
  // 旅游局或观光协会
  if (url.includes('kanko') || url.includes('tourism') || url.includes('visit')) {
    return { type: 'tourism_official', isOfficial: true };
  }
  
  // 企业主办方官网
  if (url.includes('motherfarm') || url.includes('seaparadise') || url.includes('seibu') || url.includes('jra')) {
    return { type: 'corporate_official', isOfficial: true };
  }
  
  // 一般商业网站
  return { type: 'commercial', isOfficial: false };
}

async function checkJulyWebsites() {
  const dataDir = path.join(process.cwd(), 'src/data');
  
  // 获取所有7月文件
  const julyFiles = fs.readdirSync(dataDir)
    .filter(file => file.startsWith('level5-july') && file.endsWith('.ts'))
    .sort();

  console.log(`\n🔍 检查 ${julyFiles.length} 个7月花火页面的官方网站\n`);

  const results = {
    total: julyFiles.length,
    official: 0,
    nonOfficial: 0,
    missing: 0,
    details: []
  };

  for (const file of julyFiles) {
    try {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // 提取花火名称
      const nameMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const name = nameMatch ? nameMatch[1] : file;
      
      // 提取网站
      const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
      const website = websiteMatch ? websiteMatch[1] : '';
      
      const analysis = analyzeWebsiteType(website);
      
      const detail = {
        file: file.replace('level5-july-hanabi-', '').replace('.ts', ''),
        name,
        website,
        type: analysis.type,
        isOfficial: analysis.isOfficial
      };
      
      results.details.push(detail);
      
      if (!website) {
        results.missing++;
      } else if (analysis.isOfficial) {
        results.official++;
      } else {
        results.nonOfficial++;
      }
      
      // 输出详情
      const status = analysis.isOfficial ? '✅ 官方' : (website ? '❌ 非官方' : '⚠️  缺失');
      const typeLabel = {
        'government': '政府',
        'walker_plus': 'Walker Plus',
        'event_official': '活动官方',
        'tourism_official': '旅游官方',
        'corporate_official': '企业官方',
        'commercial': '商业网站',
        'missing': '缺失'
      }[analysis.type] || analysis.type;
      
      console.log(`${status} ${name}`);
      console.log(`   类型: ${typeLabel}`);
      console.log(`   网站: ${website || '无'}\n`);
      
    } catch (error) {
      console.error(`❌ 处理文件 ${file} 时出错:`, error.message);
    }
  }

  // 统计报告
  console.log(`\n📊 统计报告:`);
  console.log(`总计: ${results.total} 个页面`);
  console.log(`✅ 官方网站: ${results.official} 个 (${(results.official/results.total*100).toFixed(1)}%)`);
  console.log(`❌ 非官方网站: ${results.nonOfficial} 个 (${(results.nonOfficial/results.total*100).toFixed(1)}%)`);
  console.log(`⚠️  缺失网站: ${results.missing} 个 (${(results.missing/results.total*100).toFixed(1)}%)`);

  // 按类型分组
  const typeGroups = {};
  results.details.forEach(detail => {
    if (!typeGroups[detail.type]) {
      typeGroups[detail.type] = [];
    }
    typeGroups[detail.type].push(detail);
  });

  console.log(`\n📋 按类型分组:`);
  Object.entries(typeGroups).forEach(([type, items]) => {
    const typeLabel = {
      'government': '政府网站',
      'walker_plus': 'Walker Plus',
      'event_official': '活动官方网站',
      'tourism_official': '旅游官方网站',
      'corporate_official': '企业官方网站',
      'commercial': '商业网站',
      'missing': '缺失网站'
    }[type] || type;
    
    console.log(`\n${typeLabel}: ${items.length} 个`);
    items.forEach(item => {
      console.log(`  - ${item.name}`);
    });
  });

  return results;
}

if (require.main === module) {
  checkJulyWebsites();
}

module.exports = { checkJulyWebsites }; 