/**
 * 测试页面生成器完整功能
 * 1. 测试数据预览API
 * 2. 测试页面生成API
 */

async function testPageGenerator() {
  try {
    console.log('🧪 测试页面生成器功能...\n');
    
    // 使用现有的花见会记录ID
    const testId = 'cmc7wqz6a0001vlk4kftbu9uu';
    const activityType = 'hanami';
    
    console.log(`📋 第一步：测试数据预览API`);
    console.log(`活动类型: ${activityType}, ID: ${testId}\n`);
    
    // 测试数据预览API
    const previewResponse = await fetch(`http://localhost:3000/api/activity-data-preview?id=${testId}&type=${activityType}`);
    const previewResult = await previewResponse.json();
    
    if (!previewResponse.ok || !previewResult.success) {
      console.log('❌ 数据预览失败:', previewResult.message);
      return;
    }
    
    console.log('✅ 数据预览成功!');
    console.log('十项数据预览:');
    const data = previewResult.data;
    console.log(`1. 名称: ${data.name || '❌ 未设置'}`);
    console.log(`2. 所在地: ${data.address || '❌ 未设置'}`);
    console.log(`3. 开催期间: ${data.datetime || '❌ 未设置'}`);
    console.log(`4. 开催场所: ${data.venue || '❌ 未设置'}`);
    console.log(`5. 交通方式: ${data.access || '❌ 未设置'}`);
    console.log(`6. 主办方: ${data.organizer || '❌ 未设置'}`);
    console.log(`7. 料金: ${data.price || '❌ 未设置'}`);
    console.log(`8. 联系方式: ${data.contact || '❌ 未设置'}`);
    console.log(`9. 官方网站: ${data.website || '❌ 未设置'}`);
    console.log(`10. 谷歌地图: ${data.googleMap || '❌ 未设置'}`);
    
    // 计算数据完整度
    const fields = ['name', 'address', 'datetime', 'venue', 'access', 'organizer', 'price', 'contact', 'website', 'googleMap'];
    const filledFields = fields.filter(field => data[field]);
    const completeness = Math.round((filledFields.length / fields.length) * 100);
    console.log(`\n📊 数据完整度: ${completeness}% (${filledFields.length}/10)`);
    
    if (completeness < 80) {
      console.log('⚠️ 数据完整度不足80%，生成的页面可能缺少信息');
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // 测试页面生成API
    console.log(`🚀 第二步：测试页面生成API`);
    
    const generateResponse = await fetch('http://localhost:3000/api/activity-page-generator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        databaseId: testId,
        activityType: activityType,
        options: {
          uploadedImages: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=' // 测试用的小图片
          ]
        }
      })
    });
    
    const generateResult = await generateResponse.json();
    
    if (!generateResponse.ok || !generateResult.success) {
      console.log('❌ 页面生成失败:', generateResult.message);
      if (generateResult.error) {
        console.log('错误详情:', generateResult.error);
      }
      return;
    }
    
    console.log('✅ 页面生成成功!');
    console.log('\n生成结果:');
    console.log(`📁 文件路径: ${generateResult.data.filePath}`);
    console.log(`📄 文件名: ${generateResult.data.fileName}`);
    console.log(`🌐 访问链接: ${generateResult.data.url}`);
    console.log(`🏮 模板类型: ${generateResult.data.template}`);
    console.log(`🆔 数据库ID: ${generateResult.data.databaseId}`);
    console.log(`🎯 活动名称: ${generateResult.data.activityName}`);
    console.log(`🕐 生成时间: ${new Date(generateResult.data.generatedAt).toLocaleString()}`);
    console.log(`📊 数据完整度: ${generateResult.data.dataCompleteness.filled}/${generateResult.data.dataCompleteness.total}`);
    
    console.log('\n🎉 页面生成器测试完成！');
    console.log(`\n🌐 您可以访问: ${generateResult.data.url}`);
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

// 运行测试
testPageGenerator(); 