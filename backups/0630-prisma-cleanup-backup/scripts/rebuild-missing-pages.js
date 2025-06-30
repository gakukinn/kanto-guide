const fs = require('fs').promises;
const path = require('path');

// 从detailLink提取activity文件夹名
function extractActivityFolder(detailLink) {
  const parts = detailLink.split('/');
  return parts[parts.length - 1]; // 最后一部分就是文件夹名
}

// 生成页面内容
function generatePageContent(data) {
  const template = data.activityType === 'hanabi' ? 'WalkerPlusHanabiTemplate' : 'UniversalStaticDetailTemplate';
  
  return `import React from 'react';
import ${template} from '../../../../src/components/${template}';

/**
 * 🔄 ${data.name} 详情页面
 * 数据ID: ${data.id}
 * 重建时间: ${new Date().toLocaleString()}
 * 模板: ${template}
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
    <${template}
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

async function rebuildMissingPages() {
  console.log('🔄 开始重建缺失的页面文件...');
  
  try {
    // 读取所有JSON数据文件
    const dataDir = path.join(process.cwd(), 'data', 'activities');
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    console.log(`📊 找到 ${jsonFiles.length} 个数据文件`);
    
    let rebuilt = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const file of jsonFiles) {
      try {
        // 读取数据文件
        const filePath = path.join(dataDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(content);
        
        // 提取页面路径信息
        const detailLink = data.detailLink;
        if (!detailLink) {
          console.log(`⚠️ ${file}: 缺少detailLink，跳过`);
          skipped++;
          continue;
        }
        
        // 构建页面目录路径
        const parts = detailLink.split('/').filter(p => p);
        if (parts.length < 3) {
          console.log(`⚠️ ${file}: detailLink格式错误 (${detailLink})，跳过`);
          skipped++;
          continue;
        }
        
        const [region, activityType, activityFolder] = parts;
        const pageDir = path.join(process.cwd(), 'app', region, activityType, activityFolder);
        const pagePath = path.join(pageDir, 'page.tsx');
        
        // 检查页面是否已存在
        try {
          await fs.access(pagePath);
          console.log(`✅ ${activityFolder}: 页面已存在，跳过`);
          skipped++;
          continue;
        } catch {
          // 页面不存在，需要重建
        }
        
        // 创建目录
        await fs.mkdir(pageDir, { recursive: true });
        
        // 生成页面内容
        const pageContent = generatePageContent(data);
        
        // 写入页面文件
        await fs.writeFile(pagePath, pageContent, 'utf-8');
        
        console.log(`🔨 重建: ${detailLink}`);
        rebuilt++;
        
      } catch (error) {
        console.error(`❌ 处理 ${file} 失败:`, error.message);
        errors++;
      }
    }
    
    console.log(`\n🎉 重建完成！`);
    console.log(`   - 重建页面: ${rebuilt} 个`);
    console.log(`   - 跳过页面: ${skipped} 个`);
    console.log(`   - 错误页面: ${errors} 个`);
    console.log(`   - 总计数据: ${jsonFiles.length} 个`);
    
  } catch (error) {
    console.error('💥 重建过程失败:', error);
  }
}

// 执行重建
rebuildMissingPages().then(() => {
  console.log('\n✨ 脚本执行完成');
  process.exit(0);
}).catch(error => {
  console.error('💥 脚本执行失败:', error);
  process.exit(1);
}); 