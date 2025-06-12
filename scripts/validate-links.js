import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 地区配置
const regions = [
  { name: 'tokyo', displayName: '东京' },
  { name: 'saitama', displayName: '埼玉' },
  { name: 'chiba', displayName: '千叶' },
  { name: 'kanagawa', displayName: '神奈川' },
  { name: 'kitakanto', displayName: '北关东' },
  { name: 'koshinetsu', displayName: '甲信越' }
];

// 从第三层页面文件中提取eventToFolderMap
function extractEventToFolderMap(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const mapMatch = content.match(/eventToFolderMap:\s*Record<string,\s*string>\s*=\s*{([^}]+)}/s);
    
    if (!mapMatch) {
      return null;
    }
    
    const mapContent = mapMatch[1];
    const entries = {};
    
    // 解析映射条目
    const lines = mapContent.split('\n');
    for (const line of lines) {
      const match = line.match(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/);
      if (match) {
        entries[match[1]] = match[2];
      }
    }
    
    return entries;
  } catch (error) {
    console.warn(`无法读取文件: ${filePath} - ${error.message}`);
    return null;
  }
}

// 检查页面文件是否存在
function checkPageExists(regionName, folderName) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', regionName, 'hanabi', folderName, 'page.tsx');
  return fs.existsSync(pagePath);
}

// 检查第四层页面目录
function getExistingPages(regionName) {
  const hanabiDir = path.join(__dirname, '..', 'src', 'app', regionName, 'hanabi');
  
  if (!fs.existsSync(hanabiDir)) {
    return [];
  }
  
  try {
    return fs.readdirSync(hanabiDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(folderName => {
        const pagePath = path.join(hanabiDir, folderName, 'page.tsx');
        return fs.existsSync(pagePath);
      });
  } catch (error) {
    console.warn(`无法读取目录: ${hanabiDir} - ${error.message}`);
    return [];
  }
}

// 主验证函数
function validateLinks() {
  console.log('🔍 开始验证链接完整性...\n');
  
  let totalMapped = 0;
  let totalValid = 0;
  let totalBroken = 0;
  let totalUnmapped = 0;
  
  const results = [];
  
  for (const region of regions) {
    console.log(`\n📍 检查地区：${region.displayName} (${region.name})`);
    console.log('='.repeat(50));
    
    // 读取第三层页面的eventToFolderMap
    const thirdLayerPath = path.join(__dirname, '..', 'src', 'app', region.name, 'hanabi', 'page.tsx');
    const eventMap = extractEventToFolderMap(thirdLayerPath);
    
    if (!eventMap) {
      console.log('❌ 未找到eventToFolderMap配置');
      results.push({
        region: region.displayName,
        status: 'ERROR',
        issue: '缺少eventToFolderMap配置'
      });
      continue;
    }
    
    // 检查映射的页面
    const mappedEntries = Object.entries(eventMap);
    console.log(`📋 映射配置: ${mappedEntries.length} 个条目`);
    
    let regionValid = 0;
    let regionBroken = 0;
    
    for (const [eventId, folderName] of mappedEntries) {
      const pageExists = checkPageExists(region.name, folderName);
      const status = pageExists ? '✅' : '❌';
      
      console.log(`  ${status} ${eventId} → ${folderName}`);
      
      if (pageExists) {
        regionValid++;
      } else {
        regionBroken++;
        results.push({
          region: region.displayName,
          status: 'BROKEN',
          issue: `链接断开: ${eventId} → ${folderName}`
        });
      }
    }
    
    // 检查未映射的页面
    const existingPages = getExistingPages(region.name);
    const mappedFolders = Object.values(eventMap);
    const unmappedPages = existingPages.filter(page => !mappedFolders.includes(page));
    
    if (unmappedPages.length > 0) {
      console.log(`\n⚠️  未映射的页面: ${unmappedPages.length} 个`);
      for (const page of unmappedPages) {
        console.log(`  🔗 ${page} (页面存在但缺少映射)`);
        results.push({
          region: region.displayName,
          status: 'UNMAPPED',
          issue: `页面存在但缺少映射: ${page}`
        });
      }
      totalUnmapped += unmappedPages.length;
    }
    
    console.log(`\n📊 ${region.displayName}统计:`);
    console.log(`  ✅ 有效链接: ${regionValid}`);
    console.log(`  ❌ 断开链接: ${regionBroken}`);
    console.log(`  🔗 未映射页面: ${unmappedPages.length}`);
    
    totalMapped += mappedEntries.length;
    totalValid += regionValid;
    totalBroken += regionBroken;
  }
  
  // 总结报告
  console.log('\n' + '='.repeat(60));
  console.log('📊 链接完整性验证总结');
  console.log('='.repeat(60));
  console.log(`总映射配置: ${totalMapped} 个`);
  console.log(`✅ 有效链接: ${totalValid} 个`);
  console.log(`❌ 断开链接: ${totalBroken} 个`);
  console.log(`🔗 未映射页面: ${totalUnmapped} 个`);
  
  if (totalBroken === 0 && totalUnmapped === 0) {
    console.log('\n🎉 所有链接验证通过！');
    return true;
  } else {
    console.log('\n⚠️  发现问题需要修复:');
    
    // 按问题类型分组显示
    const brokenLinks = results.filter(r => r.status === 'BROKEN');
    const unmappedPages = results.filter(r => r.status === 'UNMAPPED');
    const errors = results.filter(r => r.status === 'ERROR');
    
    if (errors.length > 0) {
      console.log('\n❌ 配置错误:');
      errors.forEach(e => console.log(`  - ${e.region}: ${e.issue}`));
    }
    
    if (brokenLinks.length > 0) {
      console.log('\n🔗 断开的链接:');
      brokenLinks.forEach(b => console.log(`  - ${b.region}: ${b.issue}`));
    }
    
    if (unmappedPages.length > 0) {
      console.log('\n📄 未映射的页面:');
      unmappedPages.forEach(u => console.log(`  - ${u.region}: ${u.issue}`));
    }
    
    console.log('\n🔧 修复建议:');
    console.log('1. 为断开的链接创建对应的页面文件');
    console.log('2. 为未映射的页面添加eventToFolderMap条目');
    console.log('3. 运行 npm run validate-links 重新验证');
    
    return false;
  }
}

// 直接运行验证
validateLinks();

export { validateLinks }; 