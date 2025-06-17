const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 扫描所有需要更新导入路径的文件
function findFilesToUpdate() {
  const pagePatterns = [
    'src/app/**/hanabi/**/*.tsx',
    'src/app/**/hanabi/*.tsx',
  ];

  let allFiles = [];
  pagePatterns.forEach(pattern => {
    const files = glob.sync(pattern);
    allFiles.push(...files);
  });

  return allFiles;
}

// 创建文件名到地区的映射
function createFileToRegionMapping() {
  const regions = [
    'tokyo',
    'saitama',
    'chiba',
    'kanagawa',
    'kitakanto',
    'koshinetsu',
  ];
  const mapping = {};

  regions.forEach(region => {
    const regionDir = path.join('src/data/hanabi', region);
    if (fs.existsSync(regionDir)) {
      const files = fs
        .readdirSync(regionDir)
        .filter(file => file.endsWith('.ts'));
      files.forEach(file => {
        const baseName = file.replace('.ts', '');
        mapping[baseName] = region;
      });
    }
  });

  return mapping;
}

// 更新文件中的导入路径
function updateImportsInFile(filePath, fileToRegionMapping) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // 找到所有从 @/data/ 导入的语句
    const importRegex = /from\s+['"]@\/data\/([^'"]+)['"]/g;

    content = content.replace(importRegex, (match, importPath) => {
      // 检查是否是花火文件
      const baseName = path.basename(importPath, '.ts');

      if (fileToRegionMapping[baseName]) {
        const region = fileToRegionMapping[baseName];
        const newImportPath = `@/data/hanabi/${region}/${baseName}`;
        console.log(
          `  📝 更新导入: ${importPath} → hanabi/${region}/${baseName}`
        );
        hasChanges = true;
        return match.replace(importPath, `hanabi/${region}/${baseName}`);
      }

      return match;
    });

    // 还检查 require() 语句
    const requireRegex = /require\(['"]@\/data\/([^'"]+)['"]\)/g;
    content = content.replace(requireRegex, (match, importPath) => {
      const baseName = path.basename(importPath, '.ts');

      if (fileToRegionMapping[baseName]) {
        const region = fileToRegionMapping[baseName];
        const newImportPath = `@/data/hanabi/${region}/${baseName}`;
        console.log(
          `  📝 更新require: ${importPath} → hanabi/${region}/${baseName}`
        );
        hasChanges = true;
        return match.replace(importPath, `hanabi/${region}/${baseName}`);
      }

      return match;
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ 更新文件失败: ${filePath} - ${error.message}`);
    return false;
  }
}

// 主函数
function main() {
  console.log('🔄 开始更新花火文件导入路径...\n');

  // 创建文件名到地区的映射
  const fileToRegionMapping = createFileToRegionMapping();
  console.log(
    `📊 已映射 ${Object.keys(fileToRegionMapping).length} 个花火文件\n`
  );

  // 查找需要更新的文件
  const filesToUpdate = findFilesToUpdate();
  console.log(`🔍 找到 ${filesToUpdate.length} 个需要检查的文件\n`);

  let updatedFiles = 0;
  let totalUpdates = 0;

  filesToUpdate.forEach(filePath => {
    console.log(`🔧 检查文件: ${filePath}`);
    const wasUpdated = updateImportsInFile(filePath, fileToRegionMapping);

    if (wasUpdated) {
      updatedFiles++;
      console.log(`  ✅ 文件已更新`);
    } else {
      console.log(`  ⚪ 无需更新`);
    }
    console.log('');
  });

  console.log(`\n✨ 导入路径更新完成！`);
  console.log(`📁 已更新 ${updatedFiles} 个文件`);
  console.log(`🔧 总共更新了导入引用`);

  // 显示新的目录结构
  console.log(`\n📂 新的花火文件结构:`);
  console.log(
    `   src/data/hanabi/tokyo/      (${Object.values(fileToRegionMapping).filter(r => r === 'tokyo').length} 个文件)`
  );
  console.log(
    `   src/data/hanabi/saitama/    (${Object.values(fileToRegionMapping).filter(r => r === 'saitama').length} 个文件)`
  );
  console.log(
    `   src/data/hanabi/chiba/      (${Object.values(fileToRegionMapping).filter(r => r === 'chiba').length} 个文件)`
  );
  console.log(
    `   src/data/hanabi/kanagawa/   (${Object.values(fileToRegionMapping).filter(r => r === 'kanagawa').length} 个文件)`
  );
  console.log(
    `   src/data/hanabi/kitakanto/  (${Object.values(fileToRegionMapping).filter(r => r === 'kitakanto').length} 个文件)`
  );
  console.log(
    `   src/data/hanabi/koshinetsu/ (${Object.values(fileToRegionMapping).filter(r => r === 'koshinetsu').length} 个文件)`
  );
}

if (require.main === module) {
  main();
}
