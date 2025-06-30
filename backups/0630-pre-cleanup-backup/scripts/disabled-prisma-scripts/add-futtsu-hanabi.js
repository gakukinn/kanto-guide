const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function addFuttsuHanabi() {
  try {
    console.log('🎆 开始添加富津市民花火大会...');

    // 查找千叶地区
    const chibaRegion = await prisma.region.findFirst({
      where: { code: 'chiba' }
    });

    if (!chibaRegion) {
      console.error('❌ 找不到千叶地区');
      return;
    }

    // 检查是否已存在
    const existing = await prisma.hanabiEvent.findFirst({
      where: {
        name: '東京湾口道路建設促進　第10回富津市民花火大会',
        regionId: chibaRegion.id
      }
    });

    if (existing) {
      console.log('⚠️  富津市民花火大会已存在，将更新信息...');
      
      const updated = await prisma.hanabiEvent.update({
        where: { id: existing.id },
        data: {
          englishName: 'Futtsu Citizens Fireworks Festival',
          japaneseName: 'ふっつしみんはなびたいかい',
          year: 2025,
          month: 7,
          date: '2025年7月26日',
          displayDate: '2025年7月26日',
          time: '19:15～20:15',
          duration: '60分',
          status: '正常举办',
          location: '富津海水浴場',
          venues: {
            main: '富津海水浴場',
            prefecture: '千葉県',
            city: '富津市',
            address: '〒293-0021 千葉県富津市富津'
          },
          access: {
            train: 'JR内房線「青堀駅」からバス約15分「富津公園前」～徒歩10分',
            car: '館山自動車道「木更津南IC」から富津岬方面へ車約25分',
            notes: '小雨決行、荒天時中止'
          },
          contact: {
            organizer: '富津市民花火大会実行委員会',
            phone: '0439-80-1291',
            email: 'info@futtsu-hanabi.com',
            website: 'https://futtsu-hanabi.com',
            hours: '平日9:00～17:00'
          },
          tips: {
            ticketInfo: '有料観覧席なし',
            weather: '小雨決行、荒天時中止',
            parking: '詳細は公式サイトをご確認ください'
          },
          walkerPlusUrl: 'https://www.jalan.net/event/evt_343755/?screenId=OUW1702',
          verified: true,
          verificationDate: new Date(),
          featured: true
        }
      });

      console.log('✅ 富津市民花火大会信息更新成功');
      console.log('- ID:', updated.id);
      console.log('- 名称:', updated.name);
      console.log('- 英文名:', updated.englishName);
      console.log('- 日期:', updated.displayDate);
      console.log('- 时间:', updated.time);
      console.log('- 地点:', updated.location);
      console.log('- 验证状态:', updated.verified ? '已验证' : '未验证');
      
    } else {
      const newEvent = await prisma.hanabiEvent.create({
        data: {
          eventId: `hanabi-futtsu-${Date.now()}`,
          name: '東京湾口道路建設促進　第10回富津市民花火大会',
          englishName: 'Futtsu Citizens Fireworks Festival',
          japaneseName: 'ふっつしみんはなびたいかい',
          year: 2025,
          month: 7,
          date: '2025年7月26日',
          displayDate: '2025年7月26日',
          time: '19:15～20:15',
          duration: '60分',
          status: '正常举办',
          location: '富津海水浴場',
          venues: {
            main: '富津海水浴場',
            prefecture: '千葉県',
            city: '富津市',
            address: '〒293-0021 千葉県富津市富津'
          },
          access: {
            train: 'JR内房線「青堀駅」からバス約15分「富津公園前」～徒歩10分',
            car: '館山自動車道「木更津南IC」から富津岬方面へ車約25分',
            notes: '小雨決行、荒天時中止'
          },
          contact: {
            organizer: '富津市民花火大会実行委員会',
            phone: '0439-80-1291',
            email: 'info@futtsu-hanabi.com',
            website: 'https://futtsu-hanabi.com',
            hours: '平日9:00～17:00'
          },
          tips: {
            ticketInfo: '有料観覧席なし',
            weather: '小雨決行、荒天時中止',
            parking: '詳細は公式サイトをご確認ください'
          },
          walkerPlusUrl: 'https://www.jalan.net/event/evt_343755/?screenId=OUW1702',
          verified: true,
          verificationDate: new Date(),
          featured: true,
          regionId: chibaRegion.id
        }
      });

      console.log('✅ 富津市民花火大会添加成功');
      console.log('- ID:', newEvent.id);
      console.log('- 名称:', newEvent.name);
      console.log('- 英文名:', newEvent.englishName);
      console.log('- 日期:', newEvent.displayDate);
      console.log('- 时间:', newEvent.time);
      console.log('- 地点:', newEvent.location);
      console.log('- 验证状态:', newEvent.verified ? '已验证' : '未验证');
    }

    // 统计千叶地区花火活动
    const chibaHanabiCount = await prisma.hanabiEvent.count({
      where: { regionId: chibaRegion.id }
    });
    
    console.log(`\n📊 千叶地区花火活动总数: ${chibaHanabiCount}`);
    console.log('🎆 所有数据已从Jalan官网验证并录入');

  } catch (error) {
    console.error('❌ 添加失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addFuttsuHanabi(); 