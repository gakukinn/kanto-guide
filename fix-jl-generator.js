const fs = require('fs');
const path = require('path');

console.log('🔧 修复JL生成器：删除Prisma依赖');

const filePath = 'app/api/activity-page-generator/route.ts';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log('📝 开始修复...');
  
  // 1. 删除参数验证中的databaseId支持，只支持识别模式
  content = content.replace(
    /\/\/ 验证参数 - 支持两种模式：数据库模式和识别数据模式[\s\S]*?if \(!recognitionData\) \{[\s\S]*?\}\s*}/,
    `// 验证参数 - 只支持识别数据模式
    if (!recognitionData) {
      return NextResponse.json({
        success: false,
        message: '缺少识别数据'
      }, { status: 400 });
    }`
  );
  
  // 2. 删除数据库查询的整个代码块
  content = content.replace(
    /if \(databaseId\) \{[\s\S]*?\} else \{/,
    'if (recognitionData) {'
  );
  
  // 3. 删除数据库更新的整个代码块
  content = content.replace(
    /\/\/ 🔗 自动更新数据库中的detailLink字段[\s\S]*?console\.log\(`🤖 识别模式：跳过数据库detailLink更新`\);\s*}/,
    `// 🔗 静态模式：不需要数据库连接
    console.log(\`🤖 静态模式：页面已生成，使用JSON数据存储\`);`
  );
  
  // 4. 删除finally块中的prisma断开连接
  content = content.replace(
    /} finally \{[\s\S]*?await prisma\.\$disconnect\(\);\s*}/,
    '}'
  );
  
  // 5. 更新参数解构，移除databaseId
  content = content.replace(
    /const \{ databaseId, recognitionData, activityType, forceOverwrite = false, overwriteTargetId = null, options = \{\} \} = body;/,
    'const { recognitionData, activityType, forceOverwrite = false, overwriteTargetId = null, options = {} } = body;'
  );
  
  // 6. 删除isRecognitionMode变量，因为现在只有一种模式
  content = content.replace(/let isRecognitionMode = false;/, '');
  content = content.replace(/isRecognitionMode = true;/, '');
  content = content.replace(/isRecognitionMode/g, 'true');
  
  // 7. 更新注释，删除数据库模式的说明
  content = content.replace(
    /\/\/ 数据库模式/g,
    '// 静态模式'
  );
  
  // 8. 更新连接状态的返回信息
  content = content.replace(
    /connectionEstablished: isRecognitionMode \? '🤖 识别模式：页面已生成，未连接数据库' : '✅ 已自动建立与三层卡片的连接',/,
    `connectionEstablished: '🤖 静态模式：页面已生成，数据存储在JSON文件中',`
  );
  
  // 写回文件
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log('✅ JL生成器修复完成');
  console.log('📋 修复内容：');
  console.log('  - 删除数据库查询代码');
  console.log('  - 删除数据库更新代码');
  console.log('  - 删除Prisma断开连接');
  console.log('  - 只保留识别模式');
  console.log('  - 更新参数验证逻辑');
  
} catch (error) {
  console.error('❌ 修复失败:', error.message);
  process.exit(1);
} 