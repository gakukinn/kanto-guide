const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function verifySaitamaData() {
  try {
    console.log('🔍 验证埼玉县活动数据...\n');
    
    // 查找埼玉县地区
    const saitamaRegion = await prisma.region.findFirst({
      where: { nameCn: '埼玉' }
    });
    
    if (!saitamaRegion) {
      console.log('❌ 未找到埼玉县地区记录');
      return;
    }
    
    console.log(`✅ 埼玉县地区记录 - ID: ${saitamaRegion.id}, 名称: ${saitamaRegion.nameCn} (${saitamaRegion.nameJp})\n`);
    
    // 查找埼玉县的祭典活动
    const matsuriEvents = await prisma.matsuriEvent.findMany({
      where: { regionId: saitamaRegion.id },
      orderBy: { updatedAt: 'desc' }
    });
    
    console.log(`📊 埼玉县祭典活动总数: ${matsuriEvents.length}\n`);
    
    if (matsuriEvents.length === 0) {
      console.log('⚠️ 没有找到埼玉县的祭典活动数据');
      return;
    }
    
    // 显示最新更新的活动（应该是我们刚刚抓取的）
    console.log('🎌 最新的祭典活动数据:\n');
    
    matsuriEvents.forEach((event, index) => {
      const updateTime = new Date(event.updatedAt).toLocaleString('zh-CN');
      console.log(`${index + 1}. 📋 活动详情:`);
      console.log(`   🎯 名称: ${event.name}`);
      console.log(`   📅 时间: ${event.datetime}`);
      console.log(`   📍 地址: ${event.address}`);
      console.log(`   🏛️ 场所: ${event.venue}`);
      console.log(`   🚇 交通: ${event.access}`);
      console.log(`   👥 主办: ${event.organizer}`);
      console.log(`   💰 费用: ${event.price || '未设置'}`);
      console.log(`   📞 联系: ${event.contact}`);
      console.log(`   🌐 网站: ${event.website}`);
      console.log(`   🗺️ 地图: ${event.googleMap || '未设置'}`);
      console.log(`   🏢 地区: ${event.region}`);
      console.log(`   ✅ 已验证: ${event.verified ? '是' : '否'}`);
      console.log(`   🕐 更新时间: ${updateTime}`);
      console.log(`   🆔 ID: ${event.id}\n`);
    });
    
    // 统计分析
    const verifiedCount = matsuriEvents.filter(e => e.verified).length;
    const withContactCount = matsuriEvents.filter(e => e.contact).length;
    const withPriceCount = matsuriEvents.filter(e => e.price).length;
    const withMapCount = matsuriEvents.filter(e => e.googleMap).length;
    
    console.log('📈 数据质量分析:');
    console.log(`   ✅ 已验证活动: ${verifiedCount}/${matsuriEvents.length} (${Math.round(verifiedCount/matsuriEvents.length*100)}%)`);
    console.log(`   📞 有联系方式: ${withContactCount}/${matsuriEvents.length} (${Math.round(withContactCount/matsuriEvents.length*100)}%)`);
    console.log(`   💰 有费用信息: ${withPriceCount}/${matsuriEvents.length} (${Math.round(withPriceCount/matsuriEvents.length*100)}%)`);
    console.log(`   🗺️ 有地图信息: ${withMapCount}/${matsuriEvents.length} (${Math.round(withMapCount/matsuriEvents.length*100)}%)`);
    
    // 检查今天更新的活动（应该是刚刚抓取的）
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEvents = matsuriEvents.filter(e => new Date(e.updatedAt) >= today);
    
    console.log(`\n🆕 今天更新的活动: ${todayEvents.length}个`);
    if (todayEvents.length > 0) {
      console.log('最新抓取的活动名称:');
      todayEvents.forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.name}`);
      });
    }
    
  } catch (error) {
    console.error('❌ 验证数据失败:', error.message);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 数据库连接已断开');
  }
}

verifySaitamaData(); 