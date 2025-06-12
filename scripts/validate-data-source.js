const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data/level5');
const missingSourceFiles = [];
let totalFilesChecked = 0;

function validateFile(filePath) {
  totalFilesChecked++;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查新的HanabiData结构中的数据源字段
    // 我们检查 contact.website 字段是否包含 Walker Plus 或官方网站链接
    const hasContactWebsite = content.includes('contact:') && 
                              content.includes('website:') && 
                              (content.includes('hanabi.walkerplus.com') || 
                               content.includes('.go.jp') || 
                               content.includes('.city.jp'));
    
    // 也检查旧的 dataSourceUrl 字段以保持兼容性
    const hasDataSourceUrl = content.includes('dataSourceUrl');
    
    if (!hasContactWebsite && !hasDataSourceUrl) {
      // Store the relative path for a cleaner report
      const relativePath = path.relative(path.join(__dirname, '..'), filePath);
      missingSourceFiles.push(relativePath);
    }
  } catch (error) {
    console.error(`Error reading or processing file: ${filePath}`, error);
  }
}

function traverseDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverseDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      validateFile(fullPath);
    }
  }
}

function runValidation() {
  console.log('🚀 Starting validation for data sources in all level 5 data files...');
  console.log('📋 Checking for: contact.website (Walker Plus/official) or dataSourceUrl fields');
  
  traverseDir(dataDir);

  console.log('--------------------------------------------------');
  console.log(`✅ Validation complete. Total files checked: ${totalFilesChecked}`);
  console.log('--------------------------------------------------');

  if (missingSourceFiles.length === 0) {
    console.log('🎉 Excellent! All level 5 data files have valid data source information.');
  } else {
    console.log(`\n🚨 Found ${missingSourceFiles.length} files missing valid data source information:`);
    missingSourceFiles.forEach(file => {
      // Use forward slashes for consistent path display across OS
      console.log(`  - ${file.replace(/\\/g, '/')}`);
    });
    console.log('\nNext Step: Please ensure each file has either:');
    console.log('  1. contact.website field with Walker Plus or official government URL');
    console.log('  2. dataSourceUrl field (legacy format)');
  }
  console.log('--------------------------------------------------');
}

runValidation(); 