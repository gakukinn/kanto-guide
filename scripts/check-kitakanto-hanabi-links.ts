import * as fs from 'fs';
import * as path from 'path';

interface HanabiEvent {
  id: string;
  name: string;
  detailLink: string;
}

function extractKitakantoHanabiEvents(): HanabiEvent[] {
  try {
    const localPagePath = path.join(process.cwd(), 'src/app/kitakanto/hanabi/page.tsx');
    const content = fs.readFileSync(localPagePath, 'utf-8');
    
    // 提取kitakantoHanabiEvents数组
    const arrayMatch = content.match(/const kitakantoHanabiEvents = \[([\s\S]*?)\];/);
    if (!arrayMatch) {
      throw new Error('无法找到kitakantoHanabiEvents数组');
    }
    
    const arrayContent = arrayMatch[1];
    const events: HanabiEvent[] = [];
    
    // 分割各个事件对象
    const eventBlocks = arrayContent.split(/},\s*{/).map((block, index, array) => {
      if (index === 0) return block + '}';
      if (index === array.length - 1) return '{' + block;
      return '{' + block + '}';
    });
    
    eventBlocks.forEach((block, index) => {
      try {
        const getId = (str: string) => str.match(/id: '([^']+)'/)?.[1] || `event-${index}`;
        const getName = (str: string) => str.match(/name: '([^']+)'/)?.[1] || '';
        const getDetailLink = (str: string) => str.match(/detailLink: '([^']+)'/)?.[1] || '';
        
        const event: HanabiEvent = {
          id: getId(block),
          name: getName(block),
          detailLink: getDetailLink(block)
        };
        
        if (event.name) {
          events.push(event);
        }
      } catch (error) {
        console.warn(`解析事件块 ${index} 时出错:`, error);
      }
    });
    
    return events;
  } catch (error: any) {
    console.error('读取北关东花火数据失败:', error.message);
    return [];
  }
}

function checkDetailPageExists(detailLink: string): boolean {
  // 从 detailLink 构建文件路径
  const relativePath = detailLink.startsWith('/') ? detailLink.substring(1) : detailLink;
  const filePath = path.join(process.cwd(), 'src/app', relativePath, 'page.tsx');
  
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

function checkKitakantoHanabiLinks() {
  console.log('🔍 检查北关东花火大会四层连接状态...\n');
  
  const events = extractKitakantoHanabiEvents();
  console.log(`📊 北关东花火大会总数: ${events.length}`);
  
  let hasDetailPage = 0;
  let noDetailPage = 0;
  const missingPages: Array<{name: string, detailLink: string}> = [];
  
  events.forEach((event, index) => {
    const exists = checkDetailPageExists(event.detailLink);
    const status = exists ? '✅' : '❌';
    
    console.log(`${index + 1}. ${status} ${event.name}`);
    console.log(`   链接: ${event.detailLink}`);
    
    if (exists) {
      hasDetailPage++;
    } else {
      noDetailPage++;
      missingPages.push({
        name: event.name,
        detailLink: event.detailLink
      });
    }
    
    console.log('');
  });
  
  console.log('📊 统计结果:');
  console.log(`✅ 有四层页面: ${hasDetailPage} 个`);
  console.log(`❌ 缺失四层页面: ${noDetailPage} 个`);
  console.log(`📈 连接完整性: ${((hasDetailPage / events.length) * 100).toFixed(1)}%`);
  
  if (missingPages.length > 0) {
    console.log('\n❌ 缺失四层页面列表:');
    missingPages.forEach((missing, index) => {
      console.log(`${index + 1}. ${missing.name}`);
      console.log(`   需要创建: src/app${missing.detailLink}/page.tsx`);
    });
  }
  
  return {
    total: events.length,
    hasDetailPage,
    noDetailPage,
    completionRate: (hasDetailPage / events.length) * 100,
    missingPages
  };
}

// 运行检查
const result = checkKitakantoHanabiLinks();

export { checkKitakantoHanabiLinks, result }; 