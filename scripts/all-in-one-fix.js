#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🤖 万能检查修复系统启动...\n');

let errors = [];
let warnings = [];
let fixes = 0;

// 执行命令的包装函数
function runCommand(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({ success: !error, output: stdout + stderr });
    });
  });
}

// 1. 批量修复japaneseName字段
function fixJapaneseNames() {
  console.log('📝 步骤1：批量修复日文标题...');
  
  const japaneseNameMappings = {
    'level5-august-okutama-hanabi.ts': '奥多摩夏まつり',
    'level5-august-kozushima-hanabi.ts': '神津島村夏祭り',
    'level5-august-jingu-gaien-hanabi.ts': '神宮外苑花火大会',
    'level5-august-itabashi-hanabi.ts': '第72回 いたばし花火大会',
    'level5-august-edogawa-hanabi.ts': '第51回 江戸川区花火大会',
    'level5-august-akishima-hanabi.ts': '昭島市夏まつり　あきしま花火まつり',
    'level5-july-hanabi-tokyo-katsushika.ts': '第48回葛飾納涼花火大会',
    'level5-july-hanabi-tokyo-hachioji.ts': '第65回八王子花火大会',
    'level5-july-hanabi-tachikawa-showa.ts': '第67回 立川まつり国営昭和記念公園花火大会',
    'level5-july-hanabi-kamakura.ts': '第77回 鎌倉花火大会',
    'level5-july-hanabi-chiba-motherfarm.ts': 'マザー牧場 サマーナイトファーム',
    'level5-july-hanabi-chiba-marines.ts': 'MARINES HANABI'
  };
  
  let fixedCount = 0;
  const level5Files = glob.sync('src/data/level5-*.ts');
  
  level5Files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('japaneseName:') && japaneseNameMappings[fileName]) {
      const namePattern = /name:\s*'([^']*)',/;
      const nameMatch = content.match(namePattern);
      
      if (nameMatch) {
        const japaneseName = japaneseNameMappings[fileName];
        const insertText = `  japaneseName: '${japaneseName}',\n`;
        const insertPosition = content.indexOf(nameMatch[0]) + nameMatch[0].length;
        
        const newContent = content.slice(0, insertPosition) + 
                          '\n' + insertText + 
                          content.slice(insertPosition);
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        fixedCount++;
        fixes++;
        console.log(`   ✅ ${fileName} - 已添加日文标题`);
      }
    }
  });
  
  console.log(`   📊 修复了 ${fixedCount} 个文件的日文标题\n`);
}

// 2. 全面验证检查
function validateAll() {
  console.log('🔍 步骤2：全面验证检查...');
  
  const level5Files = glob.sync('src/data/level5-*.ts');
  
  level5Files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查mapEmbedUrl（关键！）
    if (!content.includes('mapEmbedUrl:')) {
      errors.push({
        file: fileName,
        type: '❌ 严重',
        message: '缺少mapEmbedUrl - 地图无法显示',
        fix: '在mapInfo中添加Google Maps嵌入URL'
      });
    } else {
      const mapUrlMatch = content.match(/mapEmbedUrl:\s*['"`]([^'"`]*)['"`]/);
      if (mapUrlMatch && (!mapUrlMatch[1] || mapUrlMatch[1].trim() === '' || mapUrlMatch[1] === 'TODO')) {
        errors.push({
          file: fileName,
          type: '❌ 严重',
          message: 'mapEmbedUrl为空 - 地图无法显示',
          fix: '请添加有效的Google Maps嵌入URL'
        });
      }
    }
    
    // 检查日期格式
    const dateMatch = content.match(/date:\s*['"`]([^'"`]*)['"`]/);
    if (!dateMatch) {
      errors.push({
        file: fileName,
        type: '❌ 严重',
        message: '缺少date字段',
        fix: '添加格式: date: "2025年8月16日"'
      });
    } else {
      const dateValue = dateMatch[1];
      if (!dateValue.includes('2025年') || !dateValue.includes('月') || !dateValue.includes('日')) {
        errors.push({
          file: fileName,
          type: '❌ 严重',
          message: `日期格式错误: "${dateValue}"`,
          fix: '修改为: "2025年8月16日"'
        });
      }
    }
    
    // 检查japaneseName
    if (!content.includes('japaneseName:')) {
      warnings.push({
        file: fileName,
        type: '⚠️  警告',
        message: '缺少japaneseName字段',
        fix: '已尝试自动修复，可能需要手动添加'
      });
    }
    
    // 检查图片路径
    const imageMatches = content.match(/imagePath:\s*['"`]([^'"`]*)['"`]/g);
    if (imageMatches) {
      imageMatches.forEach(imageMatch => {
        const imagePath = imageMatch.match(/['"`]([^'"`]*)['"`]/)[1];
        if (imagePath.startsWith('/images/') && !fs.existsSync(`public${imagePath}`)) {
          warnings.push({
            file: fileName,
            type: '⚠️  警告',
            message: `图片不存在: ${imagePath}`,
            fix: '使用现有图片或创建该图片文件'
          });
        }
      });
    }
  });
  
  console.log(`   📊 检查了 ${level5Files.length} 个文件\n`);
}

// 3. 检查第四层链接（加强版）
function validateLevel4Links() {
  console.log('🔗 步骤3：检查第四层链接...');
  
  const level4Files = glob.sync('src/data/level4-*.ts');
  let linkIssues = 0;
  let brokenLinks = [];
  
  level4Files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查事件是否都有detailLink
    const eventMatches = content.match(/\{[^}]*name:\s*'[^']*'[^}]*\}/g);
    if (eventMatches) {
      eventMatches.forEach((eventStr, index) => {
        if (!eventStr.includes('detailLink:')) {
          warnings.push({
            file: fileName,
            type: '⚠️  警告',
            message: `第${index + 1}个事件缺少detailLink`,
            fix: '为该事件添加detailLink字段指向对应的第五层页面'
          });
          linkIssues++;
        } else {
          // 检查detailLink指向的页面文件是否存在
          const linkMatch = eventStr.match(/detailLink:\s*['"`]([^'"`]+)['"`]/);
          if (linkMatch) {
            const linkPath = linkMatch[1];
            const pageFilePath = `src/app${linkPath}/page.tsx`;
            if (!fs.existsSync(pageFilePath)) {
              brokenLinks.push({
                file: fileName,
                event: index + 1,
                link: linkPath,
                missingFile: pageFilePath
              });
              errors.push({
                file: fileName,
                type: '❌ 严重',
                message: `第${index + 1}个事件的detailLink指向不存在的页面: ${linkPath}`,
                fix: `创建页面文件: ${pageFilePath} 或修正detailLink路径`
              });
            }
          }
        }
      });
    }
  });
  
  if (brokenLinks.length > 0) {
    console.log(`   🚨 发现 ${brokenLinks.length} 个断开的链接:`);
    brokenLinks.forEach(broken => {
      console.log(`      ${broken.file}: 第${broken.event}个事件 → ${broken.link} (缺少文件: ${broken.missingFile})`);
    });
  }
  
  console.log(`   📊 检查了 ${level4Files.length} 个第四层文件，发现 ${linkIssues} 个缺失链接，${brokenLinks.length} 个断开链接\n`);
}

// 4. 生成最终报告
function generateReport() {
  console.log('📊 最终报告:');
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('🎉 恭喜！所有检查都通过了！');
    console.log(`✅ 自动修复: ${fixes} 个问题`);
    console.log('✅ 您的页面已准备就绪！');
    return true;
  }
  
  console.log(`🔧 自动修复: ${fixes} 个问题`);
  
  if (errors.length > 0) {
    console.log(`\n🚨 严重问题 (${errors.length}个，必须修复):`);
    errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.file}`);
      console.log(`   ${error.type}: ${error.message}`);
      console.log(`   💡 修复: ${error.fix}\n`);
    });
  }
  
  if (warnings.length > 0) {
    console.log(`⚠️  警告 (${warnings.length}个，建议修复):`);
    warnings.forEach((warning, index) => {
      console.log(`${index + 1}. ${warning.file}: ${warning.message}`);
    });
  }
  
  console.log('\n💡 修复后重新运行: npm run check-all');
  return false;
}

// 主函数
async function main() {
  try {
    // 执行所有检查和修复
    fixJapaneseNames();
    validateAll();
    validateLevel4Links();
    
    // 代码格式检查
    console.log('📐 步骤4：代码格式检查...');
    const lintResult = await runCommand('npm run lint');
    if (!lintResult.success) {
      warnings.push({
        file: 'ESLint',
        type: '⚠️  警告',
        message: '代码格式需要调整',
        fix: '运行 npm run lint --fix'
      });
    } else {
      console.log('   ✅ 代码格式正常\n');
    }
    
    // 生成报告
    const allGood = generateReport();
    process.exit(allGood ? 0 : 1);
    
  } catch (error) {
    console.error('❌ 系统出错:', error);
    process.exit(1);
  }
}

main(); 