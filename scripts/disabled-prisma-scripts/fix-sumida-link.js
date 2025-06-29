const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function fixSumidaLink() {
  try {
    console.log('🔧 修复隅田川花火链接...\n');

    // 获取东京地区
    const tokyoRegion = await prisma.region.findFirst({
      where: { code: 'tokyo' }
    });

    // 找到隅田川花火活动
    const sumidaEvent = await prisma.hanabiEvent.findFirst({
      where: {
        regionId: tokyoRegion.id,
        eventId: 'tokyo-sumida-hanabi-2025'
      }
    });

    if (sumidaEvent) {
      console.log(`当前隅田川花火数据:`);
      console.log(`   名称: ${sumidaEvent.name}`);
      console.log(`   eventId: ${sumidaEvent.eventId}`);
      console.log(`   当前链接: ${sumidaEvent.detailLink}`);

      // 修复链接为匹配实际的目录结构
      const newDetailLink = '/tokyo/hanabi/sumida';
      
      await prisma.hanabiEvent.update({
        where: { id: sumidaEvent.id },
        data: { 
          detailLink: newDetailLink,
          eventId: 'sumida' // 同时修复eventId以保持一致性
        }
      });

      console.log(`\n✅ 已修复:`);
      console.log(`   新eventId: sumida`);
      console.log(`   新链接: ${newDetailLink}`);
      
      // 验证页面文件是否存在
      const fs = require('fs');
      const path = require('path');
      const pagePath = path.join(process.cwd(), 'app', 'tokyo', 'hanabi', 'sumida', 'page.tsx');
      const exists = fs.existsSync(pagePath);
      
      console.log(`   页面文件: ${exists ? '✅ 存在' : '❌ 不存在'}`);
      
    } else {
      console.log('❌ 未找到隅田川花火活动数据');
    }

  } catch (error) {
    console.error('❌ 修复链接时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixSumidaLink(); 