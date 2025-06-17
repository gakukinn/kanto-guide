/**
 * 抓取数据查看工具
 * 用于快速查看和分析保存的WalkerPlus抓取数据
 */

import fs from 'fs';
import path from 'path';

function viewCrawledData(eventName = 'ojiya-matsuri') {
  const dataDir = 'data/walkerplus-crawled';
  const latestFile = path.join(dataDir, `${eventName}-latest.json`);
  
  console.log('🔍 查看抓取数据工具');
  console.log('=' .repeat(50));
  
  if (!fs.existsSync(latestFile)) {
    console.log(`❌ 未找到 ${eventName} 的数据文件`);
    console.log(`📁 请检查 ${latestFile} 是否存在`);
    return;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
    
    console.log('📊 数据概览:');
    console.log(`📅 抓取时间: ${data.metadata?.crawlTime || '未知'}`);
    console.log(`🌐 数据源: ${data.metadata?.sourceUrl || '未知'}`);
    console.log(`🔧 抓取器: ${data.metadata?.crawler || '未知'}`);
    console.log('');
    
    console.log('📝 基本信息:');
    console.log(`标题: ${data.basicInfo?.title || '未获取'}`);
    console.log(`日期: ${data.basicInfo?.date || '未获取'}`);
    console.log(`时间: ${data.basicInfo?.time || '未获取'}`);
    console.log(`地点: ${data.basicInfo?.location || data.basicInfo?.venue || '未获取'}`);
    console.log(`地址: ${data.basicInfo?.address || '未获取'}`);
    console.log('');
    
    console.log('🎆 花火信息:');
    console.log(`花火数: ${data.fireworksInfo?.count || '未获取'}`);
    console.log(`观众数: ${data.fireworksInfo?.expectedVisitors || '未获取'}`);
    console.log(`规模: ${data.fireworksInfo?.scale || '未获取'}`);
    console.log('');
    
    console.log('🚗 交通信息:');
    console.log(`最近车站: ${data.accessInfo?.nearestStation || '未获取'}`);
    console.log(`步行时间: ${data.accessInfo?.walkTime || '未获取'}`);
    console.log(`汽车交通: ${data.accessInfo?.carAccess || '未获取'}`);
    console.log(`停车场: ${data.accessInfo?.parking || '未获取'}`);
    console.log('');
    
    console.log('📞 联系信息:');
    console.log(`主办方: ${data.contactInfo?.organizer || '未获取'}`);
    console.log(`电话: ${data.contactInfo?.phone || '未获取'}`);
    console.log(`官网: ${data.contactInfo?.website || data.contactInfo?.officialSite || '未获取'}`);
    console.log('');
    
    console.log('📖 描述信息:');
    console.log(`摘要: ${data.description?.summary || '未获取'}`);
    console.log(`特色数量: ${data.description?.features?.length || 0}`);
    console.log(`亮点数量: ${data.description?.highlights?.length || 0}`);
    console.log('');
    
    console.log('🖼️ 媒体信息:');
    console.log(`图片数量: ${data.media?.images?.length || 0}`);
    console.log(`视频数量: ${data.media?.videos?.length || 0}`);
    
    if (data.media?.images?.length > 0) {
      console.log('图片列表:');
      data.media.images.forEach((img, index) => {
        console.log(`  ${index + 1}. ${img.url}`);
        if (img.alt) console.log(`     Alt: ${img.alt}`);
      });
    }
    console.log('');
    
    console.log('📄 原始页面信息:');
    console.log(`页面标题: ${data.rawData?.pageTitle || '未获取'}`);
    console.log(`H1标题: ${data.rawData?.h1Title || '未获取'}`);
    console.log(`Meta描述: ${(data.rawData?.metaDescription || '未获取').substring(0, 100)}...`);
    console.log('');
    
    // 数据质量评估
    console.log('📊 数据质量评估:');
    const fields = [
      data.basicInfo?.title,
      data.basicInfo?.date || data.basicInfo?.time,
      data.basicInfo?.location || data.basicInfo?.venue,
      data.fireworksInfo?.count,
      data.fireworksInfo?.expectedVisitors
    ];
    const filledFields = fields.filter(field => field && field.trim()).length;
    const totalFields = fields.length;
    const completeness = Math.round((filledFields / totalFields) * 100);
    
    console.log(`完整性: ${completeness}% (${filledFields}/${totalFields} 字段已填充)`);
    
    if (completeness >= 80) {
      console.log('✅ 数据质量: 优秀');
    } else if (completeness >= 60) {
      console.log('⚠️ 数据质量: 良好');
    } else {
      console.log('❌ 数据质量: 需要改进');
    }
    
    console.log('');
    console.log('📁 文件信息:');
    const stats = fs.statSync(latestFile);
    console.log(`文件大小: ${Math.round(stats.size / 1024 * 100) / 100} KB`);
    console.log(`最后修改: ${stats.mtime.toLocaleString()}`);
    
  } catch (error) {
    console.error('❌ 读取数据文件时出错:', error.message);
  }
}

// 列出所有可用的数据文件
function listAvailableData() {
  const dataDir = 'data/walkerplus-crawled';
  
  if (!fs.existsSync(dataDir)) {
    console.log('❌ 数据目录不存在:', dataDir);
    return;
  }
  
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
  
  console.log('📁 可用的数据文件:');
  console.log('=' .repeat(50));
  
  if (files.length === 0) {
    console.log('📭 暂无数据文件');
    return;
  }
  
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const stats = fs.statSync(filePath);
    const isLatest = file.includes('-latest');
    const prefix = isLatest ? '📌' : '📄';
    
    console.log(`${prefix} ${file}`);
    console.log(`   大小: ${Math.round(stats.size / 1024 * 100) / 100} KB`);
    console.log(`   修改: ${stats.mtime.toLocaleString()}`);
    console.log('');
  });
}

// 命令行参数处理
const args = process.argv.slice(2);
const command = args[0];
const eventName = args[1];

if (command === 'list') {
  listAvailableData();
} else if (command === 'view') {
  viewCrawledData(eventName || 'ojiya-matsuri');
} else {
  console.log('🔍 抓取数据查看工具');
  console.log('');
  console.log('使用方法:');
  console.log('  node scripts/crawlers/view-crawled-data.js list           # 列出所有数据文件');
  console.log('  node scripts/crawlers/view-crawled-data.js view [event]   # 查看指定事件数据');
  console.log('');
  console.log('示例:');
  console.log('  node scripts/crawlers/view-crawled-data.js view ojiya-matsuri');
  console.log('');
  
  // 默认显示列表
  listAvailableData();
} 