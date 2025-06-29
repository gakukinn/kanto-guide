const fs = require('fs');
const path = require('path');

// 需要转换的模板文件
const templates = [
  'MatsuriDetailTemplate.tsx',
  'HanamiDetailTemplate.tsx', 
  'MomijiDetailTemplate.tsx',
  'IlluminationDetailTemplate.tsx',
  'CultureArtDetailTemplate.tsx'
];

const componentsDir = path.join(__dirname, '../src/components');

console.log('🔄 开始批量转换模板为纯静态版本...\n');

templates.forEach(templateFile => {
  const filePath = path.join(componentsDir, templateFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${templateFile}`);
    return;
  }

  console.log(`🔧 处理文件: ${templateFile}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // 1. 移除 'use client' 指令
    content = content.replace(/'use client';\s*\n\s*\n?/g, '// 🔄 纯静态页面模板 - 移除客户端交互\n');
    
    // 2. 移除 React hooks 导入
    content = content.replace(/import\s*\{\s*useMemo,\s*useState\s*\}\s*from\s*['"]react['"];\s*\n?/g, '');
    content = content.replace(/import\s*\{\s*useState,\s*useMemo\s*\}\s*from\s*['"]react['"];\s*\n?/g, '');
    content = content.replace(/import\s*\{\s*useState\s*\}\s*from\s*['"]react['"];\s*\n?/g, '');
    content = content.replace(/import\s*\{\s*useMemo\s*\}\s*from\s*['"]react['"];\s*\n?/g, '');
    
    // 3. 替换 MediaDisplay 为 StaticMediaDisplay
    content = content.replace(/import\s+MediaDisplay\s+from\s+['"]\.\/MediaDisplay['"];?\s*\n?/g, 
      'import StaticMediaDisplay from \'./StaticMediaDisplay\';\n');
    content = content.replace(/<MediaDisplay/g, '<StaticMediaDisplay');
    content = content.replace(/MediaDisplay>/g, 'StaticMediaDisplay>');
    
    // 4. 移除 useState 调用
    content = content.replace(/const\s*\[\s*selectedTab,\s*setSelectedTab\s*\]\s*=\s*useState\(['"][^'"]*['"]\);?\s*\n?/g, 
      '// 🔄 移除状态管理，改为静态渲染\n');
    
    // 5. 移除 useMemo 调用，改为直接计算
    content = content.replace(/const\s+themeColors\s*=\s*useMemo\(\s*\(\)\s*=>\s*getThemeColors\([^)]+\),\s*\[[^\]]*\]\s*\);?\s*\n?/g,
      '  const themeColors = getThemeColors(data.themeColor || \'red\');\n');
    
    content = content.replace(/const\s+regionConfig\s*=\s*useMemo\(\(\)\s*=>\s*getRegionConfig\([^)]+\),\s*\[[^\]]*\]\s*\);?\s*\n?/g,
      '  const regionConfig = getRegionConfig(regionKey);\n');
    
    // 6. 移除交互处理函数
    content = content.replace(/const\s+handleMapClick\s*=\s*\(\)\s*=>\s*\{[^}]*\};\s*\n?/g, 
      '// 🔄 移除交互处理函数\n');
    
    // 7. 移除标签页相关的交互代码
    content = content.replace(/onClick=\{[^}]*setSelectedTab[^}]*\}/g, '');
    content = content.replace(/className=\{[^}]*selectedTab[^}]*\}/g, 'className="tab-static"');
    
    // 8. 移除条件渲染的标签页内容，改为显示所有内容
    content = content.replace(/\{selectedTab === ['"][^'"]*['"] && \(/g, '{true && (');
    
    // 写入修改后的内容
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 转换完成: ${templateFile}`);
    
  } catch (error) {
    console.log(`❌ 转换失败: ${templateFile} - ${error.message}`);
  }
});

console.log('\n🎉 批量转换完成！所有模板已转换为纯静态版本');
console.log('📝 注意: 请检查转换后的文件，确保没有语法错误'); 