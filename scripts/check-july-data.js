#!/usr/bin/env node

/**
 * 七月花火数据专项检查（已更新）
 */

const fs = require('fs');
const path = require('path');

console.log('🎆 七月花火数据专项检查（已更新）\n');

// 数据目录路径
const dataDir = path.join(__dirname, '../src/data');
const appJulyDir = path.join(__dirname, '../src/app/july/hanabi');

// 获取所有数据文件
function getDataFiles() {
  const allFiles = fs.readdirSync(dataDir);
  
  // 正确分类文件
  const level4Files = allFiles.filter(f => 
    f.startsWith('level4-july-') && f.endsWith('.ts')
  );
  
  const level5Files = allFiles.filter(f => 
    f.startsWith('level5-july-hanabi-') && f.endsWith('.ts')
  );
  
  // 识别错误的level5地区总览文件（应该删除）
  const incorrectLevel5Files = allFiles.filter(f => 
    (f === 'level5-july-chiba.ts' || 
     f === 'level5-july-kanagawa.ts' || 
     f === 'level5-july-koshinetsu.ts')
  );
  
  return { level4Files, level5Files, incorrectLevel5Files };
}

// 检查页面文件结构
function checkPageStructure() {
  console.log('📂 检查七月页面文件结构:');
  
  function listDirectory(dir, prefix = '') {
    try {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          console.log(`${prefix}📁 ${item}/`);
          listDirectory(itemPath, prefix + '  ');
        } else if (item === 'page.tsx') {
          console.log(`${prefix}📄 ${item}`);
        }
      });
    } catch (error) {
      console.log(`${prefix}❌ 无法访问目录`);
    }
  }
  
  listDirectory(appJulyDir);
}

// 检查Level 4文件的详情链接
function checkLevel4DetailLinks() {
  console.log('\n🔗 检查Level 4文件的详情链接:\n');
  
  const { level4Files } = getDataFiles();
  
  level4Files.forEach(file => {
    console.log(`📄 ${file}:`);
    
    try {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取detailLink
      const detailLinkMatches = content.match(/detailLink:\s*['"`]([^'"`]+)['"`]/g);
      
      if (detailLinkMatches) {
        console.log(`   发现 ${detailLinkMatches.length} 个详情链接:`);
        
        detailLinkMatches.forEach(match => {
          const link = match.match(/['"`]([^'"`]+)['"`]/)[1];
          console.log(`     - ${link}`);
          
          // 检查对应的页面文件是否存在
          const pagePath = path.join(__dirname, '../src/app', link.substring(1), 'page.tsx');
          if (fs.existsSync(pagePath)) {
            console.log(`       ✅ 页面文件存在`);
          } else {
            console.log(`       ❌ 页面文件缺失`);
          }
        });
      } else {
        console.log('   ❌ 未找到详情链接');
      }
      
    } catch (error) {
      console.log(`   ❌ 读取文件失败: ${error.message}`);
    }
    
    console.log('');
  });
}

// 检查Level 5文件的官方网站
function checkLevel5OfficialWebsites() {
  console.log('🌐 检查Level 5文件的官方网站:');
  
  const { level5Files } = getDataFiles();
  
  level5Files.forEach(file => {
    try {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 检查是否有website字段
      if (content.includes('website:')) {
        const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
        if (websiteMatch) {
          console.log(`✅ ${file}: ${websiteMatch[1]}`);
        } else {
          console.log(`⚠️ ${file}: website字段格式异常`);
        }
      } else {
        console.log(`❌ ${file}: 缺少website字段`);
      }
    } catch (error) {
      console.log(`❌ ${file}: 读取失败 - ${error.message}`);
    }
  });
}

// 识别错误文件
function checkIncorrectFiles() {
  const { incorrectLevel5Files } = getDataFiles();
  
  if (incorrectLevel5Files.length > 0) {
    console.log('\n🚨 发现错误的数据文件（应删除）:');
    incorrectLevel5Files.forEach(file => {
      console.log(`❌ ${file} - 这是重复的地区总览文件，第四层页面应使用level4文件`);
    });
  }
}

// 主检查函数
function main() {
  const { level4Files, level5Files, incorrectLevel5Files } = getDataFiles();
  
  console.log('📋 七月文件统计:');
  console.log(`- Level 4文件: ${level4Files.length}个`);
  console.log(`- Level 5文件: ${level5Files.length}个`);
  if (incorrectLevel5Files.length > 0) {
    console.log(`- 错误文件: ${incorrectLevel5Files.length}个 ⚠️`);
  }
  
  console.log('\n📁 Level 4文件详情:');
  level4Files.forEach(file => console.log(`   - ${file}`));
  
  console.log('\n📁 Level 5文件详情:');
  level5Files.forEach(file => console.log(`   - ${file}`));
  
  checkLevel4DetailLinks();
  checkLevel5OfficialWebsites();
  checkIncorrectFiles();
  checkPageStructure();
  
  // 总结
  console.log('\n📊 七月数据检查总结:');
  console.log(`- Level 4地区页面: ${level4Files.length}个`);
  console.log(`- Level 5详情页面: ${level5Files.length}个`);
  
  // 统计官方网站
  let websiteCount = 0;
  let missingWebsiteCount = 0;
  const missingWebsiteFiles = [];
  
  level5Files.forEach(file => {
    try {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('website:')) {
        websiteCount++;
      } else {
        missingWebsiteCount++;
        missingWebsiteFiles.push(file);
      }
    } catch (error) {
      missingWebsiteCount++;
      missingWebsiteFiles.push(file);
    }
  });
  
  const totalLevel5 = level5Files.length;
  const websitePercentage = totalLevel5 > 0 ? ((websiteCount / totalLevel5) * 100).toFixed(1) : '0.0';
  
  console.log(`- 有官方网站: ${websiteCount}个 (${websitePercentage}%)`);
  if (missingWebsiteCount > 0) {
    console.log(`- 缺少官方网站: ${missingWebsiteCount}个`);
    console.log(`  文件: ${missingWebsiteFiles.join(', ')}`);
  }
  
  if (incorrectLevel5Files.length > 0) {
    console.log(`\n⚠️ 需要删除的错误文件: ${incorrectLevel5Files.length}个`);
    console.log('  这些文件是重复的地区总览文件，应该删除');
  }
}

main(); 