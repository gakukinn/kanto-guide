const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

// 活动类型映射
const ACTIVITY_TYPES = {
  hanabi: { name: '花火大会', table: 'HanabiEvent' },
  matsuri: { name: '传统祭典', table: 'MatsuriEvent' },
  hanami: { name: '花见会', table: 'HanamiEvent' },
  momiji: { name: '红叶狩', table: 'MomijiEvent' },
  illumination: { name: '灯光秀', table: 'IlluminationEvent' },
  culture: { name: '文艺术', table: 'CultureEvent' }
};

// 创建命令行界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log('🗄️ 数据库活动种类修改工具');
  console.log('================================');
  
  try {
    const action = await askQuestion(`
请选择操作：
1. 查看活动统计
2. 修改活动种类
3. 删除活动记录
4. 批量修改地区
5. 退出

请输入选项 (1-5): `);

    switch (action.trim()) {
      case '1':
        await showActivityStats();
        break;
      case '2':
        await changeActivityType();
        break;
      case '3':
        await deleteActivity();
        break;
      case '4':
        await batchChangeRegion();
        break;
      case '5':
        console.log('👋 再见！');
        process.exit(0);
        break;
      default:
        console.log('❌ 无效选项，请重新选择');
        await main();
    }
  } catch (error) {
    console.error('❌ 操作失败:', error.message);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

// 显示活动统计
async function showActivityStats() {
  console.log('\n📊 数据库活动统计：');
  console.log('==================');
  
  for (const [type, config] of Object.entries(ACTIVITY_TYPES)) {
    try {
      const count = await prisma[type + 'Event'].count();
      console.log(`${config.name}: ${count} 条记录`);
    } catch (error) {
      console.log(`${config.name}: 查询失败 (${error.message})`);
    }
  }
  
  console.log('\n按回车键继续...');
  await askQuestion('');
  await main();
}

// 修改活动种类
async function changeActivityType() {
  console.log('\n🔄 修改活动种类');
  console.log('================');
  
  // 选择源活动类型
  console.log('\n当前活动类型：');
  Object.entries(ACTIVITY_TYPES).forEach(([key, config], index) => {
    console.log(`${index + 1}. ${config.name} (${key})`);
  });
  
  const sourceTypeIndex = await askQuestion('\n请选择源活动类型 (1-6): ');
  const sourceTypeKey = Object.keys(ACTIVITY_TYPES)[parseInt(sourceTypeIndex) - 1];
  
  if (!sourceTypeKey) {
    console.log('❌ 无效选择');
    return await changeActivityType();
  }
  
  // 输入活动ID
  const activityId = await askQuestion('\n请输入要修改的活动ID: ');
  
  // 查找活动
  const sourceActivity = await prisma[sourceTypeKey + 'Event'].findUnique({
    where: { id: activityId }
  });
  
  if (!sourceActivity) {
    console.log('❌ 未找到该活动记录');
    return await changeActivityType();
  }
  
  console.log(`\n📋 找到活动: ${sourceActivity.name}`);
  console.log(`当前类型: ${ACTIVITY_TYPES[sourceTypeKey].name}`);
  
  // 选择目标活动类型
  console.log('\n目标活动类型：');
  Object.entries(ACTIVITY_TYPES).forEach(([key, config], index) => {
    if (key !== sourceTypeKey) {
      console.log(`${index + 1}. ${config.name} (${key})`);
    }
  });
  
  const targetTypeIndex = await askQuestion('\n请选择目标活动类型: ');
  const targetTypeKey = Object.keys(ACTIVITY_TYPES)[parseInt(targetTypeIndex) - 1];
  
  if (!targetTypeKey || targetTypeKey === sourceTypeKey) {
    console.log('❌ 无效选择或与源类型相同');
    return await changeActivityType();
  }
  
  // 确认操作
  const confirm = await askQuestion(`\n⚠️ 确认将活动从 ${ACTIVITY_TYPES[sourceTypeKey].name} 改为 ${ACTIVITY_TYPES[targetTypeKey].name}？(y/N): `);
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 操作已取消');
    return await main();
  }
  
  // 执行迁移
  try {
    // 创建新记录
    const newActivity = await prisma[targetTypeKey + 'Event'].create({
      data: {
        name: sourceActivity.name,
        address: sourceActivity.address,
        datetime: sourceActivity.datetime,
        venue: sourceActivity.venue,
        access: sourceActivity.access,
        organizer: sourceActivity.organizer,
        price: sourceActivity.price,
        contact: sourceActivity.contact,
        website: sourceActivity.website,
        googleMap: sourceActivity.googleMap,
        region: sourceActivity.region,
        detailLink: sourceActivity.detailLink,
        regionId: sourceActivity.regionId,
        verified: sourceActivity.verified
      }
    });
    
    // 删除原记录
    await prisma[sourceTypeKey + 'Event'].delete({
      where: { id: activityId }
    });
    
    console.log(`✅ 成功！活动已从 ${ACTIVITY_TYPES[sourceTypeKey].name} 迁移到 ${ACTIVITY_TYPES[targetTypeKey].name}`);
    console.log(`新活动ID: ${newActivity.id}`);
    
  } catch (error) {
    console.error('❌ 迁移失败:', error.message);
  }
  
  await main();
}

// 删除活动记录
async function deleteActivity() {
  console.log('\n🗑️ 删除活动记录');
  console.log('================');
  
  // 选择活动类型
  console.log('\n活动类型：');
  Object.entries(ACTIVITY_TYPES).forEach(([key, config], index) => {
    console.log(`${index + 1}. ${config.name} (${key})`);
  });
  
  const typeIndex = await askQuestion('\n请选择活动类型 (1-6): ');
  const typeKey = Object.keys(ACTIVITY_TYPES)[parseInt(typeIndex) - 1];
  
  if (!typeKey) {
    console.log('❌ 无效选择');
    return await deleteActivity();
  }
  
  // 输入活动ID
  const activityId = await askQuestion('\n请输入要删除的活动ID: ');
  
  // 查找活动
  const activity = await prisma[typeKey + 'Event'].findUnique({
    where: { id: activityId }
  });
  
  if (!activity) {
    console.log('❌ 未找到该活动记录');
    return await deleteActivity();
  }
  
  console.log(`\n📋 找到活动: ${activity.name}`);
  console.log(`活动类型: ${ACTIVITY_TYPES[typeKey].name}`);
  console.log(`地区: ${activity.region}`);
  
  // 确认删除
  const confirm = await askQuestion(`\n⚠️ 确认删除该活动记录？此操作不可恢复！(y/N): `);
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 操作已取消');
    return await main();
  }
  
  try {
    await prisma[typeKey + 'Event'].delete({
      where: { id: activityId }
    });
    
    console.log('✅ 活动记录已成功删除');
    
  } catch (error) {
    console.error('❌ 删除失败:', error.message);
  }
  
  await main();
}

// 批量修改地区
async function batchChangeRegion() {
  console.log('\n🌍 批量修改地区');
  console.log('================');
  
  // 选择活动类型
  console.log('\n活动类型：');
  Object.entries(ACTIVITY_TYPES).forEach(([key, config], index) => {
    console.log(`${index + 1}. ${config.name} (${key})`);
  });
  
  const typeIndex = await askQuestion('\n请选择活动类型 (1-6): ');
  const typeKey = Object.keys(ACTIVITY_TYPES)[parseInt(typeIndex) - 1];
  
  if (!typeKey) {
    console.log('❌ 无效选择');
    return await batchChangeRegion();
  }
  
  const oldRegion = await askQuestion('\n请输入原地区名称: ');
  const newRegion = await askQuestion('请输入新地区名称: ');
  
  // 查找匹配的活动
  const activities = await prisma[typeKey + 'Event'].findMany({
    where: { region: oldRegion }
  });
  
  if (activities.length === 0) {
    console.log('❌ 未找到匹配的活动记录');
    return await batchChangeRegion();
  }
  
  console.log(`\n📋 找到 ${activities.length} 条记录`);
  activities.forEach((activity, index) => {
    console.log(`${index + 1}. ${activity.name}`);
  });
  
  // 确认批量修改
  const confirm = await askQuestion(`\n⚠️ 确认将这 ${activities.length} 条记录的地区从 "${oldRegion}" 改为 "${newRegion}"？(y/N): `);
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 操作已取消');
    return await main();
  }
  
  try {
    const result = await prisma[typeKey + 'Event'].updateMany({
      where: { region: oldRegion },
      data: { region: newRegion }
    });
    
    console.log(`✅ 成功修改 ${result.count} 条记录的地区`);
    
  } catch (error) {
    console.error('❌ 批量修改失败:', error.message);
  }
  
  await main();
}

// 启动程序
main().catch(console.error); 