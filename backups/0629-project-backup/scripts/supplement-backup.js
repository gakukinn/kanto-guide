const fs = require('fs');
const path = require('path');

console.log('🔧 补充缺失的生成器文件到备份...');

const backupDir = 'backups/0628-prisma-cleanup-backup';

// 需要特别备份的文件
const criticalFiles = [
  {
    src: 'app/admin/activity-page-generator/page.tsx',
    desc: 'JL页面生成器主文件'
  },
  {
    src: 'app/admin/activity-page-generator/0626page.tsx.backup',
    desc: 'JL页面生成器备份文件'
  },
  {
    src: 'app/admin/activity-page-generator/page.tsx.backup',
    desc: 'JL页面生成器历史备份'
  }
];

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

for (const file of criticalFiles) {
  const srcPath = file.src;
  const destPath = path.join(backupDir, file.src);
  
  if (fs.existsSync(srcPath)) {
    ensureDirectoryExists(destPath);
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ 已备份: ${file.desc}`);
  } else {
    console.log(`⚠️ 源文件不存在: ${srcPath}`);
  }
}

console.log('🎯 验证关键模板文件...');

const templateFiles = [
  'src/components/RegionPageTemplate.tsx',
  'src/components/UniversalStaticPageTemplate.tsx', 
  'src/components/UniversalStaticDetailTemplate.tsx',
  'src/components/WalkerPlusHanabiTemplate.tsx'
];

for (const template of templateFiles) {
  const backupPath = path.join(backupDir, template);
  if (fs.existsSync(backupPath)) {
    console.log(`✅ 模板已备份: ${template}`);
  } else {
    console.log(`❌ 模板缺失: ${template}`);
  }
}

console.log('🎯 验证生成器页面...');

const generatorPages = [
  'app/admin/activity-page-generator/page.tsx',
  'app/admin/walkerplus-page-generator/page.tsx',
  'app/admin/third-layer-generator/page.tsx'
];

for (const page of generatorPages) {
  const backupPath = path.join(backupDir, page);
  if (fs.existsSync(backupPath)) {
    console.log(`✅ 生成器已备份: ${page}`);
  } else {
    console.log(`❌ 生成器缺失: ${page}`);
  }
}

console.log('📋 备份完整性报告生成完毕'); 