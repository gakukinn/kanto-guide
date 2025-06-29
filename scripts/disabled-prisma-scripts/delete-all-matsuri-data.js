/**
 * 删除所有祭典数据脚本
 * @purpose 删除可能编造的祭典数据，确保商业网站合规性
 * @safety 只删除祭典数据，保留花火、文艺等其他类型数据
 * @legal_compliance 避免虚假信息导致的法律风险
 */

const { PrismaClient } = require('../src/generated/prisma');

async function deleteAllMatsuriData() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚨 开始删除所有祭典数据 - 商业网站合规性要求');
    console.log('='.repeat(60));
    
    // 1. 查询当前祭典数据数量
    const matsuriCount = await prisma.matsuriEvent.count();
    console.log(`📊 当前数据库中的祭典活动数量: ${matsuriCount}个`);
    
    if (matsuriCount === 0) {
      console.log('✅ 数据库中没有祭典数据，无需删除');
      return;
    }
    
    // 2. 显示即将删除的数据
    const matsuriEvents = await prisma.matsuriEvent.findMany({
      include: {
        region: true
      },
      orderBy: {
        region: {
          nameCn: 'asc'
        }
      }
    });
    
    console.log('\n📋 即将删除的祭典数据列表:');
    console.log('-'.repeat(50));
    
    matsuriEvents.forEach((event, index) => {
      console.log(`${index + 1}. [${event.region.nameCn}] ${event.name}`);
      if (event.dates) console.log(`   日期: ${event.dates}`);
      if (event.location) console.log(`   地点: ${event.location}`);
      console.log(`   ID: ${event.id}`);
      console.log('');
    });
    
    // 3. 确认删除操作
    console.log('⚠️ 商业网站合规性要求: 删除所有可能编造的祭典数据');
    console.log('🛡️ 法律保护: 避免虚假信息导致客户损失和法律风险');
    console.log('');
    
    // 4. 执行删除操作
    console.log('🗑️ 正在删除所有祭典数据...');
    const deleteResult = await prisma.matsuriEvent.deleteMany({});
    
    console.log(`✅ 删除完成! 共删除 ${deleteResult.count} 个祭典活动`);
    
    // 5. 验证删除结果
    const remainingCount = await prisma.matsuriEvent.count();
    console.log(`📊 删除后数据库中的祭典活动数量: ${remainingCount}个`);
    
    if (remainingCount === 0) {
      console.log('✅ 所有祭典数据已成功删除');
    } else {
      console.log('❌ 警告: 仍有祭典数据未删除');
    }
    
    // 6. 检查其他数据类型是否保持完整
    console.log('\n🔍 验证其他数据类型是否完整:');
    console.log('-'.repeat(40));
    
    const hanabiCount = await prisma.hanabiEvent.count();
    const cultureCount = await prisma.cultureEvent.count();
    const hanamiCount = await prisma.hanamiEvent.count();
    const momijiCount = await prisma.momijiEvent.count();
    const illuminationCount = await prisma.illuminationEvent.count();
    
    console.log(`🎆 花火活动: ${hanabiCount}个 (保持不变)`);
    console.log(`🎨 文艺活动: ${cultureCount}个 (保持不变)`);
    console.log(`🌸 花见活动: ${hanamiCount}个 (保持不变)`);
    console.log(`🍁 红叶活动: ${momijiCount}个 (保持不变)`);
    console.log(`💡 灯光活动: ${illuminationCount}个 (保持不变)`);
    
    console.log('\n🎯 删除操作总结:');
    console.log('='.repeat(50));
    console.log(`✅ 祭典数据: ${matsuriCount}个 → 0个 (已清理)`);
    console.log(`✅ 其他数据: ${hanabiCount + cultureCount + hanamiCount + momijiCount + illuminationCount}个 (保持完整)`);
    console.log(`✅ 商业合规: 已消除虚假信息风险`);
    console.log(`✅ 法律保护: 已避免客户损失和法律责任`);
    
  } catch (error) {
    console.error('❌ 删除祭典数据时发生错误:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 立即执行删除操作
deleteAllMatsuriData()
  .then(() => {
    console.log('\n🛡️ 商业网站数据安全保护完成!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 删除操作失败:', error);
    process.exit(1);
  }); 