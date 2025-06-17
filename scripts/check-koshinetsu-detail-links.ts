import * as fs from 'fs';
import * as path from 'path';

interface HanabiEvent {
  id: string;
  name: string;
  detailLink: string;
}

interface HanabiData {
  events: HanabiEvent[];
}

function checkDetailLinks() {
  try {
    console.log('🔍 甲信越花火详情连接检查...\n');
    
    // 读取甲信越花火数据
    const dataPath = path.join(process.cwd(), 'src/data/koshinetsu-hanabi.json');
    const data: HanabiData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const totalEvents = data.events.length;
    let existingPages = 0;
    const missingPages: { name: string; detailLink: string; expectedPath: string }[] = [];
    const existingPagesList: { name: string; detailLink: string; filePath: string }[] = [];
    
    console.log(`📊 总共 ${totalEvents} 个花火大会活动\n`);
    
    // 检查每个detailLink
    data.events.forEach((event, index) => {
      // 从detailLink构建文件路径
      // 例如: /koshinetsu/hanabi/suwa -> src/app/koshinetsu/hanabi/suwa/page.tsx
      const segments = event.detailLink.split('/').filter(Boolean);
      const filePath = path.join(process.cwd(), 'src/app', ...segments, 'page.tsx');
      
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   详情链接: ${event.detailLink}`);
      console.log(`   期望文件: ${filePath}`);
      
      if (fs.existsSync(filePath)) {
        console.log(`   状态: ✅ 页面存在\n`);
        existingPages++;
        existingPagesList.push({
          name: event.name,
          detailLink: event.detailLink,
          filePath: filePath.replace(process.cwd(), '.')
        });
      } else {
        console.log(`   状态: ❌ 页面缺失\n`);
        missingPages.push({
          name: event.name,
          detailLink: event.detailLink,
          expectedPath: filePath.replace(process.cwd(), '.')
        });
      }
    });
    
    // 输出统计结果
    console.log('📊 检查结果统计:');
    console.log(`总花火大会: ${totalEvents}`);
    console.log(`有详情页面: ${existingPages}`);
    console.log(`缺失页面: ${missingPages.length}`);
    console.log(`页面完整性: ${((existingPages / totalEvents) * 100).toFixed(1)}%\n`);
    
    if (missingPages.length > 0) {
      console.log('❌ 缺失的详情页面:');
      missingPages.forEach((page, index) => {
        console.log(`${index + 1}. ${page.name}`);
        console.log(`   链接: ${page.detailLink}`);
        console.log(`   需要文件: ${page.expectedPath}\n`);
      });
    }
    
    if (existingPagesList.length > 0) {
      console.log('✅ 存在的详情页面:');
      existingPagesList.forEach((page, index) => {
        console.log(`${index + 1}. ${page.name}`);
        console.log(`   链接: ${page.detailLink}`);
        console.log(`   文件: ${page.filePath}\n`);
      });
    }
    
  } catch (error) {
    console.error('❌ 检查过程中出现错误:', error);
  }
}

// 运行检查
checkDetailLinks(); 