const { PrismaClient } = require('@prisma/client');

async function checkCurrentData() {
  const prisma = new PrismaClient();
  
  try {
    console.log('=== 当前数据库状态检查 ===\n');
    
    // 检查所有表的记录数
    console.log('🔍 检查各表记录数:');
    
    try {
      const regions = await prisma.region.findMany();
      console.log(`📍 Region: ${regions.length} 条记录`);
      console.log('地区列表:', regions.map(r => `${r.id}. ${r.name}`).join(', '));
    } catch (e) {
      console.log('❌ Region表错误:', e.message);
    }
    
    try {
      const hanami = await prisma.hanamiEvent.findMany();
      console.log(`🌸 HanamiEvent: ${hanami.length} 条记录`);
      if (hanami.length > 0) {
        console.log('花见活动列表:');
        hanami.forEach(h => {
          console.log(`  - ${h.name} (${h.location}) [${h.season}]`);
        });
      }
    } catch (e) {
      console.log('❌ HanamiEvent表错误:', e.message);
    }
    
    try {
      const hanabi = await prisma.hanabiEvent.findMany();
      console.log(`🎆 HanabiEvent: ${hanabi.length} 条记录`);
      if (hanabi.length > 0) {
        console.log('花火活动列表:');
        hanabi.forEach(h => {
          console.log(`  - ${h.name} (${h.location}) [${h.date}]`);
        });
      }
    } catch (e) {
      console.log('❌ HanabiEvent表错误:', e.message);
    }
    
    try {
      const matsuri = await prisma.matsuriEvent.findMany();
      console.log(`🏮 MatsuriEvent: ${matsuri.length} 条记录`);
      if (matsuri.length > 0) {
        console.log('祭典活动列表:');
        matsuri.forEach(m => {
          console.log(`  - ${m.name} (${m.location}) [${m.date}]`);
        });
      }
    } catch (e) {
      console.log('❌ MatsuriEvent表错误:', e.message);
    }
    
    // 检查数据库文件大小
    const fs = require('fs');
    const stats = fs.statSync('prisma/dev.db');
    console.log(`\n📊 数据库文件大小: ${stats.size} 字节 (${(stats.size/1024).toFixed(2)} KB)`);
    
  } catch (error) {
    console.error('❌ 检查数据时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCurrentData(); 