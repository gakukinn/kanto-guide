const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 地区映射
const regionMapping = {
  'tokyo': 'tokyo',
  'kanagawa': 'kanagawa', 
  'chiba': 'chiba',
  'saitama': 'saitama',
  'kitakanto': 'kitakanto',
  'koshinetsu': 'koshinetsu'
};

// 查找现有数据文件
function findDataFiles() {
  const patterns = [
    'src/data/level5-*.ts',
    'src/data/hanabi-*.ts',
    'src/data/*-hanabi*.ts',
    'src/data/*-matsuri*.ts'
  ];

  let allFiles = [];
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    allFiles = allFiles.concat(files);
  });

  return [...new Set(allFiles)]; // 去重
}

// 分析文件属于哪个地区
function analyzeFileRegion(filePath) {
  const fileName = path.basename(filePath, '.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  // 从文件名推断地区
  for (const [region, code] of Object.entries(regionMapping)) {
    if (fileName.includes(region) || content.includes(`regionTag: '${region}'`)) {
      return region;
    }
  }

  // 从内容分析地区
  const regionMatches = content.match(/regionTag:\s*['"]([^'"]+)['"]/);
  if (regionMatches) {
    const tag = regionMatches[1].toLowerCase();
    for (const [region, code] of Object.entries(regionMapping)) {
      if (tag.includes(region)) {
        return region;
      }
    }
  }

  return 'unknown';
}

// 创建符号链接或复制文件
function createDataLink(sourcePath, targetPath) {
  try {
    // 确保目标目录存在
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // 如果目标文件已存在，先删除
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }

    // 复制文件（而不是创建符号链接，避免权限问题）
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ 映射: ${sourcePath} -> ${targetPath}`);
    return true;
  } catch (error) {
    console.error(`❌ 映射失败: ${sourcePath} -> ${targetPath}`, error.message);
    return false;
  }
}

function main() {
  console.log('🗂️ 开始创建数据文件映射...\n');

  const dataFiles = findDataFiles();
  console.log(`📁 找到 ${dataFiles.length} 个数据文件\n`);

  let mappedCount = 0;
  const regionStats = {};

  dataFiles.forEach(filePath => {
    const region = analyzeFileRegion(filePath);
    const fileName = path.basename(filePath);
    
    if (region !== 'unknown') {
      // 创建映射到hanabi目录
      const targetPath = path.join('src', 'data', 'hanabi', region, fileName);
      if (createDataLink(filePath, targetPath)) {
        mappedCount++;
        regionStats[region] = (regionStats[region] || 0) + 1;
      }
    } else {
      console.log(`⚠️ 无法确定地区: ${filePath}`);
    }
  });

  console.log(`\n📊 映射统计:`);
  console.log(`- 总文件数: ${dataFiles.length}`);
  console.log(`- 成功映射: ${mappedCount}`);
  console.log(`- 地区分布:`);
  
  Object.entries(regionStats).forEach(([region, count]) => {
    console.log(`  - ${region}: ${count} 个文件`);
  });

  console.log(`\n✨ 数据文件映射完成！`);
}

main(); 