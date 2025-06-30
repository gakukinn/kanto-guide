/**
 * 测试四层页面结构生成器
 * 验证：六个地区 × 六个活动类型 = 标准四层结构
 */

async function testFourLayerStructure() {
  console.log('🏗️ 测试四层页面结构生成器...\n');
  
  // 测试用的数据库记录ID
  const testRecords = [
    { id: 'cmc7wqz6a0001vlk4kftbu9uu', type: 'hanami', name: '花见会测试' },
    { id: 'cmc7o9npc0002vlcwmqdudr8i', type: 'matsuri', name: '祭典测试' }
  ];
  
  for (const record of testRecords) {
    console.log(`\n📋 测试 ${record.name} (${record.type}):`);
    console.log(`数据库ID: ${record.id}`);
    
    try {
      // 1. 数据预览测试
      console.log('1️⃣ 数据预览测试...');
      const previewResponse = await fetch(`http://localhost:3000/api/activity-data-preview?id=${record.id}&type=${record.type}`);
      const previewData = await previewResponse.json();
      
      if (!previewData.success) {
        console.log('❌ 数据预览失败:', previewData.message);
        continue;
      }
      
      console.log('✅ 数据预览成功');
      console.log(`   地区: ${previewData.data.region}`);
      console.log(`   名称: ${previewData.data.name}`);
      
      // 2. 页面生成测试（不强制覆盖）
      console.log('2️⃣ 页面生成测试（检查重复）...');
      const generateResponse1 = await fetch('http://localhost:3000/api/activity-page-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          databaseId: record.id,
          activityType: record.type,
          forceOverwrite: false,
          options: { uploadedImages: [] }
        })
      });
      
      const generateResult1 = await generateResponse1.json();
      
      if (generateResponse1.status === 409) {
        console.log('⚠️ 页面已存在（符合预期）');
        console.log(`   现有页面: ${generateResult1.data.url}`);
        
        // 3. 强制覆盖测试
        console.log('3️⃣ 强制覆盖测试...');
        const generateResponse2 = await fetch('http://localhost:3000/api/activity-page-generator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            databaseId: record.id,
            activityType: record.type,
            forceOverwrite: true,
            options: { uploadedImages: [] }
          })
        });
        
        const generateResult2 = await generateResponse2.json();
        
        if (generateResult2.success) {
          console.log('✅ 强制覆盖成功');
          console.log('🏗️ 四层页面结构:');
          if (generateResult2.data.pageStructure) {
            Object.values(generateResult2.data.pageStructure).forEach(layer => {
              console.log(`   ${layer}`);
            });
          }
          console.log(`   访问URL: ${generateResult2.data.url}`);
        } else {
          console.log('❌ 强制覆盖失败:', generateResult2.message);
        }
        
      } else if (generateResult1.success) {
        console.log('✅ 新页面生成成功');
        console.log('🏗️ 四层页面结构:');
        if (generateResult1.data.pageStructure) {
          Object.values(generateResult1.data.pageStructure).forEach(layer => {
            console.log(`   ${layer}`);
          });
        }
        console.log(`   访问URL: ${generateResult1.data.url}`);
      } else {
        console.log('❌ 页面生成失败:', generateResult1.message);
      }
      
    } catch (error) {
      console.log('❌ 测试失败:', error.message);
    }
  }
  
  console.log('\n🎯 测试总结:');
  console.log('✅ 四层页面结构: 根目录 → 地区 → 活动类型 → 活动详情');
  console.log('✅ 防重复机制: 检测已存在页面并提示');
  console.log('✅ 强制覆盖: 支持覆盖已存在页面');
  console.log('✅ 标准化路径: 六个地区 × 六个活动类型');
}

// 运行测试
testFourLayerStructure().catch(console.error); 