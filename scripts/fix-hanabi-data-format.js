const fs = require('fs').promises;
const path = require('path');

// 解析contact字段中的复合信息
function parseContactInfo(contactText) {
  if (!contactText) return {};
  
  const info = {};
  const lines = contactText.split('\n');
  
  for (const line of lines) {
    const cleanLine = line.trim();
    
    // 打ち上げ数
    if (cleanLine.includes('打ち上げ数')) {
      info.fireworksCount = cleanLine.replace(/.*打ち上げ数:\s*/, '').trim();
    }
    
    // 打ち上げ時間 
    if (cleanLine.includes('打ち上げ時間')) {
      info.fireworksTime = cleanLine.replace(/.*打ち上げ時間:\s*/, '').trim();
    }
    
    // 例年の人出
    if (cleanLine.includes('例年の人出')) {
      info.expectedVisitors = cleanLine.replace(/.*例年の人出:\s*/, '').trim();
    }
    
    // 荒天の場合
    if (cleanLine.includes('荒天の場合')) {
      info.weatherInfo = cleanLine.replace(/.*荒天の場合:\s*/, '').trim();
    }
    
    // 駐車場
    if (cleanLine.includes('駐車場')) {
      info.parking = cleanLine.replace(/.*駐車場:\s*/, '').trim();
    }
    
    // 屋台など
    if (cleanLine.includes('屋台')) {
      info.foodStalls = cleanLine.replace(/.*屋台など:\s*/, '').trim();
    }
  }
  
  return info;
}

// 解析datetime字段，分离日期和时间
function parseDatetime(datetimeText) {
  if (!datetimeText) return { date: '', time: '' };
  
  // 提取日期部分 (如: "2025年8月16日(土)")
  const dateMatch = datetimeText.match(/(\d{4}年\d{1,2}月\d{1,2}日[^花火打]*)/);
  const date = dateMatch ? dateMatch[1].trim() : '';
  
  // 提取时间部分 (如: "19:30～20:30")
  const timeMatch = datetimeText.match(/(\d{1,2}:\d{2}[～~-]\d{1,2}:\d{2})/);
  const time = timeMatch ? timeMatch[1] : '';
  
  return { date, time };
}

// 转换单个活动数据为WalkerPlus格式
function convertToWalkerPlusFormat(data) {
  // 解析contact信息
  const contactInfo = parseContactInfo(data.contact);
  
  // 解析日期时间
  const { date, time } = parseDatetime(data.datetime);
  
  return {
    // 基本信息保持不变
    id: data.id,
    region: data.region,
    activityType: data.activityType,
    themeColor: data.themeColor || 'red',
    status: data.status || 'scheduled',
    media: data.media || [],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    detailLink: data.detailLink,
    description: data.description,
    website: data.website,
    googleMap: data.googleMap,
    
    // WalkerPlus的14个字段
    name: data.name || '',                                    // 1. 大会名
    fireworksCount: contactInfo.fireworksCount || '详见官网',   // 2. 打ち上げ数
    fireworksTime: contactInfo.fireworksTime || '详见官网',     // 3. 打ち上げ時間  
    expectedVisitors: contactInfo.expectedVisitors || '详见官网', // 4. 例年の人出
    date: date || data.datetime || '详见官网',                   // 5. 開催期間
    time: time || '详见官网',                                   // 6. 開催時間
    venue: data.venue || '详见官网',                            // 7. 会場
    access: data.access || '详见官网',                          // 8. 会場アクセス  
    weatherInfo: contactInfo.weatherInfo || '详见官网',         // 9. 荒天の場合
    parking: contactInfo.parking || '详见官网',                // 10. 駐車場
    price: data.price || '详见官网',                            // 11. 有料席
    contact: data.organizer || '详见官网',                      // 12. 問い合わせ (使用organizer字段)
    foodStalls: contactInfo.foodStalls || '详见官网',          // 13. 屋台など
    notes: data.description || '详见官网'                       // 14. その他・全体備考
  };
}

// 生成转换后的页面内容
function generateFixedPageContent(data) {
  return `import React from 'react';
import WalkerPlusHanabiTemplate from '../../../../src/components/WalkerPlusHanabiTemplate';

/**
 * 🎆 ${data.name} 详情页面
 * 数据ID: ${data.id}
 * 修复时间: ${new Date().toLocaleString()}
 * 模板: WalkerPlusHanabiTemplate (正确格式)
 * 地区: ${data.region}
 * 活动类型: ${data.activityType}
 */

const activityData = ${JSON.stringify(data, null, 2)
  .replace(/"type": "image"/g, 'type: "image" as const')
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"createdAt": "([^"]*)"/, 'createdAt: new Date("$1")')
  .replace(/"updatedAt": "([^"]*)"/, 'updatedAt: new Date("$1")')};

export default function ActivityDetailPage() {
  return (
    <WalkerPlusHanabiTemplate
      data={activityData}
      regionKey="${data.region}"
      activityKey="${data.activityType}"
    />
  );
}

export const metadata = {
  title: '${data.name} - 日本活动指南',
  description: '${data.description || data.name}',
};
`;
}

async function fixHanabiDataFormat() {
  console.log('🔧 开始修复花火数据格式...');
  
  try {
    const dataDir = path.join(process.cwd(), 'data', 'activities');
    const files = await fs.readdir(dataDir);
    
    // 只处理花火类型的文件
    const hanabiFiles = files.filter(f => 
      f.endsWith('.json') && 
      (f.includes('hanabi') || f.includes('recognition-hanabi'))
    );
    
    console.log(`📊 找到 ${hanabiFiles.length} 个花火数据文件`);
    
    let fixed = 0;
    let errors = 0;
    
    for (const file of hanabiFiles) {
      try {
        // 读取原始数据
        const filePath = path.join(dataDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const originalData = JSON.parse(content);
        
        // 跳过非花火类型
        if (originalData.activityType !== 'hanabi') {
          console.log(`⏭️ ${file}: 非花火类型，跳过`);
          continue;
        }
        
        // 检查是否有detailLink
        if (!originalData.detailLink) {
          console.log(`⚠️ ${file}: 缺少detailLink，跳过`);
          continue;
        }
        
        // 转换数据格式
        const convertedData = convertToWalkerPlusFormat(originalData);
        
        // 更新JSON文件
        await fs.writeFile(filePath, JSON.stringify(convertedData, null, 2), 'utf-8');
        
        // 重新生成页面文件
        const parts = originalData.detailLink.split('/').filter(p => p);
        if (parts.length >= 3) {
          const [region, activityType, activityFolder] = parts;
          const pageDir = path.join(process.cwd(), 'app', region, activityType, activityFolder);
          const pagePath = path.join(pageDir, 'page.tsx');
          
          // 生成修复后的页面内容
          const pageContent = generateFixedPageContent(convertedData);
          
          // 确保目录存在
          await fs.mkdir(pageDir, { recursive: true });
          
          // 写入修复后的页面
          await fs.writeFile(pagePath, pageContent, 'utf-8');
          
          console.log(`🔨 修复: ${originalData.detailLink}`);
          fixed++;
        }
        
      } catch (error) {
        console.error(`❌ 处理 ${file} 失败:`, error.message);
        errors++;
      }
    }
    
    console.log(`\n🎉 数据格式修复完成！`);
    console.log(`   - 修复文件: ${fixed} 个`);
    console.log(`   - 错误文件: ${errors} 个`);
    console.log(`   - 总计处理: ${hanabiFiles.length} 个`);
    
  } catch (error) {
    console.error('💥 修复过程失败:', error);
  }
}

// 执行修复
fixHanabiDataFormat().then(() => {
  console.log('\n✨ 数据格式修复完成');
  process.exit(0);
}).catch(error => {
  console.error('💥 脚本执行失败:', error);
  process.exit(1);
}); 