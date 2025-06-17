import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

async function extractAllTokyoEvents() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('🔍 正在访问WalkerPlus东京花火页面...');
    await page.goto('https://hanabi.walkerplus.com/launch/ar0313/', {
      waitUntil: 'networkidle',
    });

    // 获取页面中的JSON-LD结构化数据
    const structuredData = await page.evaluate(() => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      const eventData = [];

      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          if (
            data['@type'] === 'Event' ||
            (Array.isArray(data) &&
              data.some(item => item['@type'] === 'Event'))
          ) {
            if (Array.isArray(data)) {
              eventData.push(...data.filter(item => item['@type'] === 'Event'));
            } else {
              eventData.push(data);
            }
          }
        } catch (e) {
          console.log('解析JSON-LD数据时出错:', e.message);
        }
      });

      return eventData;
    });

    console.log(`📊 找到 ${structuredData.length} 个结构化数据事件`);

    // 处理结构化数据
    const events = structuredData.map(event => {
      const startDate = event.startDate ? new Date(event.startDate) : null;
      const endDate = event.endDate ? new Date(event.endDate) : null;

      // 提取花火数量
      let fireworksCount = '';
      if (event.description) {
        const fireworksMatch = event.description.match(
          /(\d+(?:,\d+)*(?:\.\d+)?)[万発]/
        );
        if (fireworksMatch) {
          fireworksCount = fireworksMatch[1] + '万発';
        } else {
          const simpleMatch = event.description.match(/(\d+(?:,\d+)*)[発]/);
          if (simpleMatch) {
            fireworksCount = simpleMatch[1] + '発';
          }
        }
      }

      return {
        name: event.name,
        startDate: startDate ? startDate.toISOString().split('T')[0] : '',
        endDate: endDate ? endDate.toISOString().split('T')[0] : '',
        location: event.location?.name || event.location?.address || '',
        fireworksCount,
        url: event.url || '',
        description: event.description || '',
      };
    });

    // 过滤掉2024年的过期活动
    const current2025Events = events.filter(event => {
      if (!event.startDate) return false;
      const eventDate = new Date(event.startDate);
      return eventDate.getFullYear() >= 2025;
    });

    console.log(`✅ 过滤后的2025年活动数量: ${current2025Events.length}`);

    current2025Events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   日期: ${event.startDate}`);
      console.log(`   地点: ${event.location}`);
      console.log(`   花火数: ${event.fireworksCount}`);
      console.log(`   URL: ${event.url}`);
      console.log('');
    });

    await browser.close();
    return current2025Events;
  } catch (error) {
    console.error('❌ 提取数据时出错:', error);
    await browser.close();
    return [];
  }
}

function updateDatabaseFiles(walkerPlusEvents) {
  const tokyoDataDir = path.join('src', 'data', 'hanabi', 'tokyo');

  if (!fs.existsSync(tokyoDataDir)) {
    console.error(`❌ 目录不存在: ${tokyoDataDir}`);
    return;
  }

  const files = fs
    .readdirSync(tokyoDataDir)
    .filter(file => file.endsWith('.ts'));
  console.log(`📁 找到 ${files.length} 个数据库文件`);

  let updatedCount = 0;
  let totalCount = 0;

  files.forEach(file => {
    const filePath = path.join(tokyoDataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    totalCount++;

    // 尝试匹配WalkerPlus数据
    const matchedEvent = findMatchingEvent(file, content, walkerPlusEvents);

    if (matchedEvent) {
      console.log(`🔄 更新文件: ${file}`);
      console.log(`   匹配事件: ${matchedEvent.name}`);

      // 更新日期
      if (matchedEvent.startDate) {
        content = content.replace(
          /date:\s*["']([^"']+)["']/,
          `date: "${matchedEvent.startDate}"`
        );
      }

      // 更新地点
      if (matchedEvent.location) {
        content = content.replace(
          /location:\s*["']([^"']+)["']/,
          `location: "${matchedEvent.location}"`
        );
      }

      // 更新花火数量
      if (matchedEvent.fireworksCount) {
        content = content.replace(
          /fireworksCount:\s*["']([^"']+)["']/,
          `fireworksCount: "${matchedEvent.fireworksCount}"`
        );
      }

      // 添加WalkerPlus URL（如果不存在）
      if (matchedEvent.url && !content.includes('walkerPlusUrl')) {
        content = content.replace(
          /(\s+)officialWebsite:/,
          `$1walkerPlusUrl: "${matchedEvent.url}",\n$1officialWebsite:`
        );
      }

      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`   ✅ 更新完成`);
    } else {
      console.log(`⚠️  未找到匹配: ${file}`);
    }
  });

  console.log(`\n📊 更新统计:`);
  console.log(`   总文件数: ${totalCount}`);
  console.log(`   成功更新: ${updatedCount}`);
  console.log(`   未更新: ${totalCount - updatedCount}`);
  console.log(`   成功率: ${Math.round((updatedCount / totalCount) * 100)}%`);
}

function findMatchingEvent(filename, fileContent, walkerPlusEvents) {
  // 从文件名提取关键词
  const filenameKeywords = filename
    .replace('.ts', '')
    .replace(/-/g, '')
    .toLowerCase();

  // 从文件内容提取标题
  const titleMatch = fileContent.match(/title:\s*["']([^"']+)["']/);
  const fileTitle = titleMatch ? titleMatch[1] : '';

  // 尝试多种匹配策略
  for (const event of walkerPlusEvents) {
    const eventName = event.name.toLowerCase();

    // 策略1: 文件名关键词匹配
    if (filenameKeywords.includes('sumida') && eventName.includes('隅田川'))
      return event;
    if (filenameKeywords.includes('katsushika') && eventName.includes('葛飾'))
      return event;
    if (filenameKeywords.includes('itabashi') && eventName.includes('いたばし'))
      return event;
    if (filenameKeywords.includes('keibajo') && eventName.includes('競馬場'))
      return event;
    if (filenameKeywords.includes('edogawa') && eventName.includes('江戸川'))
      return event;
    if (filenameKeywords.includes('jingu') && eventName.includes('神宮'))
      return event;
    if (filenameKeywords.includes('chofu') && eventName.includes('調布'))
      return event;
    if (filenameKeywords.includes('setagaya') && eventName.includes('世田谷'))
      return event;
    if (filenameKeywords.includes('tamagawa') && eventName.includes('たまがわ'))
      return event;

    // 策略2: 标题内容匹配
    if (fileTitle && eventName.includes(fileTitle.replace(/第\d+回\s*/, ''))) {
      return event;
    }

    // 策略3: 部分名称匹配
    const eventKeywords = eventName.replace(/第\d+回\s*/, '').split(/\s+/);
    if (
      eventKeywords.some(
        keyword =>
          keyword.length > 1 &&
          (filenameKeywords.includes(keyword) || fileTitle.includes(keyword))
      )
    ) {
      return event;
    }
  }

  return null;
}

// 主执行函数
async function main() {
  console.log('🚀 开始WalkerPlus东京花火数据完整更新...\n');

  const events = await extractAllTokyoEvents();

  if (events.length === 0) {
    console.log('❌ 未能提取到有效数据');
    return;
  }

  console.log('\n🔄 开始更新数据库文件...\n');
  updateDatabaseFiles(events);

  console.log('\n✅ 数据更新完成！');
}

main().catch(console.error);
