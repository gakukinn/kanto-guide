const fs = require('fs');
const path = require('path');

// 生成URL友好的slug
const generateSlug = (name) => {
  let slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 30);
    
  if (/^\d/.test(slug)) {
    slug = 'event-' + slug;
  }
  
  return slug;
};

// 生成页面文件
const generatePageFile = (data, detailPageFolder) => {
  const pageContent = `import { WalkerPlusHanabiTemplate } from '@/src/components/WalkerPlusHanabiTemplate';

const activityData = ${JSON.stringify(data, null, 2)};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="${data.region}" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '${data.name} - ${data.region === 'tokyo' ? '东京' : data.region === 'saitama' ? '埼玉' : data.region === 'chiba' ? '千叶' : data.region === 'kanagawa' ? '神奈川' : data.region === 'kitakanto' ? '北关东' : '甲信越'}花火大会',
    description: '${data.description ? data.description.substring(0, 100) + '...' : data.name + '的详细信息'}',
  };
}
`;

  return pageContent;
};

async function generateMissingHanabiPages() {
  console.log('\n🚀 为缺少页面的花火活动生成页面');
  console.log('=' .repeat(60));

  const dataDir = path.join(process.cwd(), 'data', 'activities');
  const files = fs.readdirSync(dataDir).filter(file => 
    file.includes('hanabi') && file.endsWith('.json')
  );
  
  console.log(`📊 找到 ${files.length} 个花火数据文件`);
  
  let processedCount = 0;
  let generatedCount = 0;
  let skippedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    processedCount++;
    console.log(`\n📁 处理 ${processedCount}/${files.length}: ${file}`);
    console.log(`   名称: ${data.name}`);
    console.log(`   地区: ${data.region}`);
    
    // 如果已经有detailLink，跳过
    if (data.detailLink) {
      console.log('   ⏭️ 已有页面，跳过');
      skippedCount++;
      continue;
    }
    
    try {
      // 生成detailPageFolder
      const baseFolder = generateSlug(data.name);
      const timestamp = data.id.slice(-8);
      const detailPageFolder = `activity-${baseFolder}-${timestamp}`;
      const detailLink = `/${data.region}/hanabi/${detailPageFolder}`;
      
      // 确保目录存在
      const targetDir = path.join(process.cwd(), 'app', data.region, 'hanabi', detailPageFolder);
      fs.mkdirSync(targetDir, { recursive: true });
      
      // 更新data对象
      const updatedData = {
        ...data,
        detailLink,
        
        // 确保WalkerPlus字段存在
        fireworksCount: data.fireworksCount || '详见官网',
        fireworksTime: data.fireworksTime || '详见官网',
        expectedVisitors: data.expectedVisitors || '详见官网',
        weatherInfo: data.weatherInfo || '详见官网',
        parking: data.parking || '详见官网',
        contact: data.contact || '详见官网',
        foodStalls: data.foodStalls || '详见官网',
        notes: data.notes || data.description || '详见官网',
        
        // 确保基本字段
        date: data.date || '详见官网',
        time: data.time || '详见官网',
        venue: data.venue || data.address || '详见官网',
        access: data.access || '详见官网',
        price: data.price || '详见官网',
        organizer: data.organizer || '详见官网',
      };
      
      // 生成页面文件
      const pageContent = generatePageFile(updatedData, detailPageFolder);
      const pagePath = path.join(targetDir, 'page.tsx');
      fs.writeFileSync(pagePath, pageContent, 'utf8');
      
      // 更新JSON数据文件
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
      
      console.log(`   ✅ 生成页面: ${detailLink}`);
      generatedCount++;
      
    } catch (error) {
      console.log(`   ❌ 生成失败: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🏁 页面生成完成！');
  console.log(`📊 处理统计:`);
  console.log(`   总计处理: ${processedCount} 个文件`);
  console.log(`   新生成页面: ${generatedCount} 个`);
  console.log(`   跳过已有页面: ${skippedCount} 个`);
  console.log(`   成功率: ${processedCount > 0 ? ((generatedCount / processedCount) * 100).toFixed(1) : 0}%`);
  
  if (generatedCount > 0) {
    console.log('\n💡 建议：');
    console.log('1. 在浏览器中测试新生成的页面');
    console.log('2. 检查WalkerPlus模板是否正确显示所有字段');
    console.log('3. 根据需要进一步优化数据内容');
  }
}

if (require.main === module) {
  generateMissingHanabiPages().catch(console.error);
}

module.exports = { generateMissingHanabiPages }; 