#!/usr/bin/env node

/**
 * 修正"鶴岡八幡宮 ぼんぼり祭"的分类，将其从灯光活动转移回传统祭典活动
 * ぼんぼり祭是传统的祭典活动，不是现代灯光秀
 */

const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function fixBonboriClassification() {
  console.log('🔧 正在修正"鶴岡八幡宮 ぼんぼり祭"的分类...\n');
  console.log('📝 将其从灯光活动重新分类为传统祭典活动\n');

  try {
    // 获取神奈川地区记录
    const kanagawaRegion = await prisma.region.findFirst({
      where: {
        OR: [
          { code: 'kanagawa' },
          { nameCn: '神奈川' },
          { nameJp: '神奈川県' }
        ]
      }
    });

    if (!kanagawaRegion) {
      console.log('❌ 未找到神奈川地区记录');
      return;
    }

    // 查找错误分类的灯光活动记录
    const illuminationEvent = await prisma.illuminationEvent.findFirst({
      where: { 
        name: '鶴岡八幡宮 ぼんぼり祭',
        regionId: kanagawaRegion.id 
      }
    });

    if (!illuminationEvent) {
      console.log('❌ 未找到需要重分类的灯光活动记录');
      return;
    }

    console.log('✅ 找到错误分类的灯光活动记录');

    // 创建正确的传统祭典活动记录
    const matsuriEventData = {
      name: illuminationEvent.name,
      address: illuminationEvent.address,
      datetime: illuminationEvent.datetime,
      venue: illuminationEvent.venue,
      access: illuminationEvent.access,
      organizer: illuminationEvent.organizer,
      price: illuminationEvent.price,
      contact: illuminationEvent.contact,
      website: illuminationEvent.website,
      googleMap: illuminationEvent.googleMap,
      region: illuminationEvent.region,
      regionId: illuminationEvent.regionId,
      verified: illuminationEvent.verified
    };

    const newMatsuriEvent = await prisma.matsuriEvent.create({
      data: matsuriEventData
    });

    console.log('✅ 成功创建传统祭典活动记录');

    // 删除错误的灯光活动记录
    await prisma.illuminationEvent.delete({
      where: { id: illuminationEvent.id }
    });

    console.log('✅ 已删除错误的灯光活动记录');
    console.log(`🎉 "鶴岡八幡宮 ぼんぼり祭"已成功重分类为传统祭典活动 (ID: ${newMatsuriEvent.id})`);
    console.log('📚 ぼんぼり祭是传统的日本祭典，使用传统灯笼装饰，与现代LED灯光秀不同');

  } catch (error) {
    console.error('❌ 修正分类时发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行修正脚本
if (require.main === module) {
  fixBonboriClassification()
    .then(() => {
      console.log('\n✅ 分类修正完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 分类修正失败:', error);
      process.exit(1);
    });
} 