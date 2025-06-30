const fs = require('fs');
const path = require('path');

// 活动类型配置（基于WalkerPlus生成器）
const ACTIVITY_CONFIGS = {
  hanabi: { 
    template: 'WalkerPlusHanabiTemplate'
  }
};

// 智能分离日期和时间（基于WalkerPlus生成器逻辑）
const separateDateAndTime = (datetime) => {
  if (!datetime) return { date: '', time: '' };
  
  const lines = datetime.split('\n').filter(line => line.trim());
  const datePattern = /(\d{4}年\d{1,2}月\d{1,2}日[^0-9]*)/;
  let date = '';
  let time = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (datePattern.test(trimmed)) {
      const dateMatch = trimmed.match(datePattern);
      if (dateMatch) {
        date = dateMatch[1].trim();
        const remaining = trimmed.replace(dateMatch[1], '').trim();
        if (remaining) {
          time = remaining;
        }
      }
    } else if (trimmed.includes('開場') || trimmed.includes('開演') || trimmed.match(/\d{1,2}:\d{2}/)) {
      if (time) {
        time += ' ' + trimmed;
      } else {
        time = trimmed;
      }
    }
  }
  
  if (!date && datetime.includes('年') && datetime.includes('月') && datetime.includes('日')) {
    const match = datetime.match(/(\d{4}年\d{1,2}月\d{1,2}日[^\d]*)/);
    if (match) {
      date = match[1].trim();
      time = datetime.replace(match[1], '').trim();
    }
  }
  
  return { date: date || datetime, time: time || '' };
};

// 从合并的contact字段中解析出14项WalkerPlus字段（基于WalkerPlus生成器逻辑）
const parseContactFields = (contactText) => {
  const fields = {
    fireworksCount: '',
    fireworksTime: '',
    expectedVisitors: '',
    weatherInfo: '',
    foodStalls: '',
    parking: '',
    notes: ''
  };
  
  if (!contactText) return fields;
  
  const lines = contactText.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('打ち上げ数:')) {
      fields.fireworksCount = trimmedLine.replace('打ち上げ数:', '').trim();
    } else if (trimmedLine.startsWith('打ち上げ時間:')) {
      fields.fireworksTime = trimmedLine.replace('打ち上げ時間:', '').trim();
    } else if (trimmedLine.startsWith('例年の人出:')) {
      fields.expectedVisitors = trimmedLine.replace('例年の人出:', '').trim();
    } else if (trimmedLine.startsWith('荒天の場合:')) {
      fields.weatherInfo = trimmedLine.replace('荒天の場合:', '').trim();
    } else if (trimmedLine.startsWith('屋台など:')) {
      fields.foodStalls = trimmedLine.replace('屋台など:', '').trim();
    } else if (trimmedLine.startsWith('駐車場:')) {
      fields.parking = trimmedLine.replace('駐車場:', '').trim();
    } else if (trimmedLine.startsWith('その他・全体備考:')) {
      fields.notes = trimmedLine.replace('その他・全体備考:', '').trim();
    }
  }
  
  return fields;
};

// 生成符合WalkerPlusHanabiTemplate标准的页面文件
const generateWalkerPlusPageFile = (data, detailPageFolder) => {
  const { date, time } = separateDateAndTime(data.datetime || '');
  const contactFields = parseContactFields(data.contact || '');
  
  // 准备符合WalkerPlusHanabiTemplate期望的数据格式（14项独立字段）
  const standardData = {
    // 基本信息
    name: data.name || '',
    date: date || data.date || '',
    time: time || data.time || '',
    venue: data.venue || data.address || '',
    access: data.access || '',
    
    // WalkerPlus 14项字段（独立字段，不是数组）
    fireworksCount: data.fireworksCount || contactFields.fireworksCount || '详见官网',
    fireworksTime: data.fireworksTime || contactFields.fireworksTime || '详见官网',
    expectedVisitors: data.expectedVisitors || contactFields.expectedVisitors || '详见官网',
    ticketPrice: data.ticketPrice || data.price || '详见官网',
    weatherInfo: data.weatherInfo || contactFields.weatherInfo || '详见官网',
    foodStalls: data.foodStalls || contactFields.foodStalls || '详见官网',
    parking: data.parking || contactFields.parking || '详见官网',
    notes: data.notes || contactFields.notes || '详见官网',
    
    // 联系信息
    organizer: data.organizer || '详见官网',
    contact: data.contact || '详见官网',
    website: data.website || '',
    
    // 地图和图片
    googleMap: data.googleMap || '',
    images: data.images || [],
    
    // 完整描述和亮点（关键！）
    description: data.description || '',
    highlights: data.highlights || '',
    
    // 元数据
    id: data.id,
    region: data.region || '',
    activityType: 'hanabi',
    detailLink: data.detailLink || '',
    createdAt: data.createdAt || new Date().toISOString(),
    source: 'walkerplus-style-fix'
  };

  console.log(`📊 数据映射完成: name=${standardData.name}, description=${standardData.description ? '已设置' : '未设置'}, highlights=${standardData.highlights ? '已设置' : '未设置'}`);

  // 生成页面文件内容（基于WalkerPlus生成器的模板）
  const pageContent = `import { WalkerPlusHanabiTemplate } from '@/src/components/WalkerPlusHanabiTemplate';

const activityData = ${JSON.stringify(standardData, null, 2)};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} />;
}

export async function generateMetadata() {
  return {
    title: '${standardData.name} - ${standardData.region === 'tokyo' ? '东京' : standardData.region === 'saitama' ? '埼玉' : standardData.region === 'chiba' ? '千叶' : standardData.region === 'kanagawa' ? '神奈川' : standardData.region === 'kitakanto' ? '北关东' : '甲信越'}花火大会',
    description: '${standardData.description ? standardData.description.substring(0, 100) + '...' : standardData.name + '的详细信息'}',
  };
}
`;

  return { pageContent, standardData };
};

// 主函数：批量修复花火页面
async function fixHanabiPagesWalkerPlusStyle() {
  console.log('\n🚀 开始修复花火页面 - 使用WalkerPlus生成器标准');
  console.log('=' .repeat(60));

  const dataDir = path.join(process.cwd(), 'data', 'activities');
  let totalProcessed = 0;
  let successCount = 0;
  let skipCount = 0;
  
  // 获取所有花火活动文件
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // 只处理花火活动
    if (data.activityType !== 'hanabi') {
      continue;
    }
    
    totalProcessed++;
    console.log(`\n📁 处理文件 ${totalProcessed}: ${file}`);
    console.log(`   活动名称: ${data.name}`);
    console.log(`   地区: ${data.region}`);
    
    // 检查是否有现有的页面路径
    if (!data.detailLink) {
      console.log('   ⚠️ 缺少detailLink，跳过');
      skipCount++;
      continue;
    }
    
    // 解析页面路径
    const pathParts = data.detailLink.split('/');
    const detailPageFolder = pathParts[pathParts.length - 1];
    const pagePath = path.join(process.cwd(), 'app', data.region, 'hanabi', detailPageFolder, 'page.tsx');
    
    console.log(`   📄 页面路径: ${pagePath}`);
    
    // 检查页面文件是否存在
    if (!fs.existsSync(pagePath)) {
      console.log('   ❌ 页面文件不存在，跳过');
      skipCount++;
      continue;
    }
    
    try {
      // 生成新的页面内容
      const { pageContent, standardData } = generateWalkerPlusPageFile(data, detailPageFolder);
      
      // 写入页面文件
      fs.writeFileSync(pagePath, pageContent, 'utf8');
      
      // 更新JSON数据文件（添加WalkerPlus标准字段）
      const updatedData = { ...data, ...standardData };
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
      
      console.log('   ✅ 修复成功');
      successCount++;
      
    } catch (error) {
      console.log(`   ❌ 修复失败: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🏁 修复完成！');
  console.log(`📊 处理统计:`);
  console.log(`   总计处理: ${totalProcessed} 个花火页面`);
  console.log(`   修复成功: ${successCount} 个`);
  console.log(`   跳过: ${skipCount} 个`);
  console.log(`   成功率: ${totalProcessed > 0 ? ((successCount / totalProcessed) * 100).toFixed(1) : 0}%`);
  
  if (successCount > 0) {
    console.log('\n💡 建议：');
    console.log('1. 在浏览器中测试修复后的页面');
    console.log('2. 检查页面是否正确显示14项WalkerPlus字段');
    console.log('3. 确认description和highlights内容是否完整');
  }
}

// 运行修复
if (require.main === module) {
  fixHanabiPagesWalkerPlusStyle().catch(console.error);
}

module.exports = { fixHanabiPagesWalkerPlusStyle }; 