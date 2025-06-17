/**
 * 甲信越花火链接检查脚本
 * 检查哪些活动的详情链接没有对应的页面
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 从甲信越花火页面提取活动数据
function extractKoshinetsuHanabiEvents() {
  const pageFile = path.join(__dirname, '../src/app/koshinetsu/hanabi/page.tsx');
  const content = fs.readFileSync(pageFile, 'utf8');
  
  // 提取活动数组
  const eventsMatch = content.match(/const koshinetsuHanabiEvents = \[([\s\S]*?)\];/);
  if (!eventsMatch) {
    throw new Error('无法找到甲信越花火活动数据');
  }
  
  // 解析活动ID和detailLink
  const eventsText = eventsMatch[1];
  const events = [];
  
  // 匹配每个活动对象
  const eventMatches = eventsText.match(/\{[\s\S]*?\}/g);
  if (eventMatches) {
    eventMatches.forEach(eventText => {
      const idMatch = eventText.match(/id:\s*['"`]([^'"`]+)['"`]/);
      const nameMatch = eventText.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const detailLinkMatch = eventText.match(/detailLink:\s*['"`]([^'"`]+)['"`]/);
      
      if (idMatch && nameMatch) {
        events.push({
          id: idMatch[1],
          name: nameMatch[1],
          detailLink: detailLinkMatch ? detailLinkMatch[1] : null
        });
      }
    });
  }
  
  return events;
}

// 检查详情页面是否存在
function checkDetailPageExists(detailLink) {
  if (!detailLink) return false;
  
  // 移除开头的斜杠并构建文件路径
  const relativePath = detailLink.startsWith('/') ? detailLink.slice(1) : detailLink;
  const pagePath = path.join(__dirname, '../src/app', relativePath, 'page.tsx');
  
  return fs.existsSync(pagePath);
}

// 从花火连接管理器获取已注册的页面
function getRegisteredPages() {
  try {
    const managerFile = path.join(__dirname, '../src/utils/hanabi-link-manager.ts');
    const content = fs.readFileSync(managerFile, 'utf8');
    
    // 提取HANABI_DETAIL_PAGES数组
    const pagesMatch = content.match(/const HANABI_DETAIL_PAGES[\s\S]*?\[([\s\S]*?)\];/);
    if (!pagesMatch) return [];
    
    const pagesText = pagesMatch[1];
    const registered = [];
    
    // 匹配每个页面配置
    const pageMatches = pagesText.match(/\{[\s\S]*?\}/g);
    if (pageMatches) {
      pageMatches.forEach(pageText => {
        const idMatch = pageText.match(/id:\s*['"`]([^'"`]+)['"`]/);
        const regionMatch = pageText.match(/region:\s*['"`]([^'"`]+)['"`]/);
        const slugMatch = pageText.match(/slug:\s*['"`]([^'"`]+)['"`]/);
        const isActiveMatch = pageText.match(/isActive:\s*(true|false)/);
        
        if (idMatch && regionMatch && slugMatch) {
          registered.push({
            id: idMatch[1],
            region: regionMatch[1],
            slug: slugMatch[1],
            isActive: isActiveMatch ? isActiveMatch[1] === 'true' : false,
            expectedLink: `/${regionMatch[1]}/hanabi/${slugMatch[1]}`
          });
        }
      });
    }
    
    return registered;
  } catch (error) {
    console.error('读取花火连接管理器失败:', error.message);
    return [];
  }
}

// 主检查函数
function checkKoshinetsuHanabiLinks() {
  console.log('🎯 甲信越花火详情链接检查\n');
  
  try {
    const events = extractKoshinetsuHanabiEvents();
    const registeredPages = getRegisteredPages();
    
    console.log(`📊 统计信息:`);
    console.log(`   - 甲信越花火活动总数: ${events.length}`);
    console.log(`   - 已注册详情页面数: ${registeredPages.length}`);
    console.log('');
    
    const results = {
      hasValidLink: [],
      hasInvalidLink: [],
      noLink: [],
      linkMismatch: []
    };
    
    events.forEach(event => {
      const registered = registeredPages.find(p => p.id === event.id);
      
      if (!event.detailLink) {
        results.noLink.push({
          ...event,
          registered: registered || null
        });
      } else {
        const pageExists = checkDetailPageExists(event.detailLink);
        
        if (pageExists) {
          // 检查链接是否与注册的匹配
          if (registered && registered.expectedLink !== event.detailLink) {
            results.linkMismatch.push({
              ...event,
              registered,
              expectedLink: registered.expectedLink
            });
          } else {
            results.hasValidLink.push({
              ...event,
              registered: registered || null
            });
          }
        } else {
          results.hasInvalidLink.push({
            ...event,
            registered: registered || null
          });
        }
      }
    });
    
    // 输出结果
    console.log('✅ 有效链接的活动:');
    if (results.hasValidLink.length === 0) {
      console.log('   无');
    } else {
      results.hasValidLink.forEach(event => {
        console.log(`   - ${event.name} (${event.id})`);
        console.log(`     链接: ${event.detailLink}`);
        console.log(`     状态: ${event.registered ? '已注册' : '未注册但页面存在'}`);
      });
    }
    console.log('');
    
    console.log('❌ 无效链接的活动:');
    if (results.hasInvalidLink.length === 0) {
      console.log('   无');
    } else {
      results.hasInvalidLink.forEach(event => {
        console.log(`   - ${event.name} (${event.id})`);
        console.log(`     链接: ${event.detailLink}`);
        console.log(`     状态: 页面不存在`);
        if (event.registered) {
          console.log(`     建议: 创建页面 ${event.registered.expectedLink}`);
        }
      });
    }
    console.log('');
    
    console.log('⚠️  链接不匹配的活动:');
    if (results.linkMismatch.length === 0) {
      console.log('   无');
    } else {
      results.linkMismatch.forEach(event => {
        console.log(`   - ${event.name} (${event.id})`);
        console.log(`     当前链接: ${event.detailLink}`);
        console.log(`     期望链接: ${event.expectedLink}`);
      });
    }
    console.log('');
    
    console.log('🔗 没有详情链接的活动:');
    if (results.noLink.length === 0) {
      console.log('   无');
    } else {
      results.noLink.forEach(event => {
        console.log(`   - ${event.name} (${event.id})`);
        if (event.registered && event.registered.isActive) {
          console.log(`     建议: 添加链接 ${event.registered.expectedLink}`);
        } else {
          console.log(`     状态: 未注册详情页面`);
        }
      });
    }
    console.log('');
    
    // 总结
    const totalProblems = results.hasInvalidLink.length + results.linkMismatch.length + results.noLink.length;
    console.log('📋 检查总结:');
    console.log(`   - 有效链接: ${results.hasValidLink.length}`);
    console.log(`   - 无效链接: ${results.hasInvalidLink.length}`);
    console.log(`   - 链接不匹配: ${results.linkMismatch.length}`);
    console.log(`   - 缺少链接: ${results.noLink.length}`);
    console.log(`   - 总问题数: ${totalProblems}`);
    
    if (totalProblems === 0) {
      console.log('\n🎉 所有链接检查通过！');
    } else {
      console.log(`\n⚠️  发现 ${totalProblems} 个问题需要处理`);
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ 检查过程中出现错误:', error.message);
    return null;
  }
}

// 运行检查
checkKoshinetsuHanabiLinks(); 