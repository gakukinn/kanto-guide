const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function manualUpdateActivity2() {
  console.log('🔄 手动更新デザインフェスタ vol.61的完整信息...');

  try {
    // 查找第二个活动
    const activity = await prisma.cultureEvent.findFirst({
      where: { 
        name: 'デザインフェスタ vol.61'
      }
    });

    if (!activity) {
      console.log('❌ 未找到活动记录');
      return;
    }

    // 从Jalan页面获取的完整十项信息
    const completeData = {
      name: 'デザインフェスタ vol.61',
      address: '〒135-0063 東京都江東区有明3-11-1',
      datetime: '2025年7月5日～6日 両日10:00～18:00',
      venue: '東京都 東京ビッグサイト 西・南展示棟',
      access: 'ゆりかもめ「東京ビッグサイト駅」から徒歩3分、またはりんかい線「国際展示場駅」から徒歩7分',
      organizer: 'デザインフェスタ有限会社',
      price: '前売券/1日券800円・両日券1500円（両日券はネット販売のみ）、当日券/1日券1000円（両日券は取り扱いなし）',
      contact: 'デザインフェスタオフィス 03-3479-1433 info@designfesta.com',
      website: 'https://designfesta.com/',
      googleMap: 'https://maps.google.com/maps?ll=35.630307,139.793534&z=15&t=m',
      region: '東京都'
    };

    const updatedActivity = await prisma.cultureEvent.update({
      where: { id: activity.id },
      data: completeData
    });

    console.log('✅ 更新成功！');
    console.log('1. 名称:', updatedActivity.name);
    console.log('2. 所在地:', updatedActivity.address);
    console.log('3. 開催期間:', updatedActivity.datetime);
    console.log('4. 開催場所:', updatedActivity.venue);
    console.log('5. 交通アクセス:', updatedActivity.access);
    console.log('6. 主催:', updatedActivity.organizer);
    console.log('7. 料金:', updatedActivity.price);
    console.log('8. 問合せ先:', updatedActivity.contact);
    console.log('9. ホームページ:', updatedActivity.website);
    console.log('10. 谷歌网站:', updatedActivity.googleMap);
    console.log('11. 地区:', updatedActivity.region);

    // 检查空字段
    const fields = [
      updatedActivity.name, updatedActivity.address, updatedActivity.datetime, 
      updatedActivity.venue, updatedActivity.access, updatedActivity.organizer, 
      updatedActivity.price, updatedActivity.contact, updatedActivity.website, 
      updatedActivity.googleMap, updatedActivity.region
    ];
    const emptyFields = fields.filter(field => !field || field.trim() === '').length;
    console.log(`\n📊 空字段数量: ${emptyFields}/11`);

    if (emptyFields === 0) {
      console.log('🎉 完美！所有字段都已完整更新！');
    }

  } catch (error) {
    console.error('❌ 更新失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

manualUpdateActivity2(); 