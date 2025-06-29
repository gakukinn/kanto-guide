/**
 * 保存じゃらん抓取的久里浜ペリー祭花火大会数据到Prisma数据库
 * 使用实际的数据库schema
 */

const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function saveKurihamaHanabiData() {
  try {
    console.log('💾 开始保存久里浜ペリー祭花火大会数据到数据库...');

    // 首先确保神奈川地区存在
    let kanagawaRegion = await prisma.region.findUnique({
      where: { code: 'kanagawa' }
    });

    if (!kanagawaRegion) {
      console.log('🏞️ 创建神奈川地区记录...');
      kanagawaRegion = await prisma.region.create({
        data: {
          code: 'kanagawa',
          nameJa: '神奈川県',
          nameCn: '神奈川县',
          nameEn: 'Kanagawa Prefecture'
        }
      });
    }

    // 准备花火活动数据（根据抓取结果和实际schema）
    const hanabiData = {
      eventId: 'kurihama-perry-festival-2025',
      name: '久里浜ペリー祭　花火大会',
      englishName: 'Kurihama Perry Festival Fireworks',
      japaneseName: '久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）',
      year: 2025,
      month: 8,
      date: '2025-08-02',
      displayDate: '2025年8月2日（土）',
      time: '19:30～20:00',
      duration: '30分',
      fireworksCount: '7000発',
      expectedVisitors: '7万人',
      weather: '荒天中止',
      ticketPrice: '有料観覧席あり',
      status: '開催予定',
      themeColor: '#1E40AF',
      location: '〒239-0831 神奈川県横須賀市久里浜',
      
      // JSON字段
      venues: {
        main: 'ペリー公園',
        others: [
          '久里浜海岸',
          'カインズホーム裏岸壁（旧ニチロ岸壁）',
          'カインズ横須賀久里浜店屋上',
          '長瀬海岸緑地'
        ]
      },
      
      access: {
        train: [
          '京浜急行「京急久里浜駅」から徒歩15分',
          'ＪＲ横須賀線「久里浜駅」から徒歩17分'
        ],
        car: '有料駐車場あり、混雑注意'
      },
      
      viewingSpots: {
        recommended: [
          'ペリー公園（メイン会場）',
          '久里浜海岸',
          'カインズ店屋上（有料席）'
        ],
        notes: '海岸からの眺めが絶景'
      },
      
      history: {
        background: 'アメリカ提督ペリーの来航を記念した歴史ある花火大会',
        significance: '日米友好の象徴として毎年開催',
        tradition: 'スターマインを中心とした伝統的なプログラム'
      },
      
      tips: {
        bestTime: '開始30分前には会場到着推奨',
        items: ['折りたたみ椅子', '防寒具', '虫除けスプレー'],
        warnings: ['混雑のため早めの移動を', '駐車場は数に限りあり']
      },
      
      contact: {
        phone: '046-822-4000',
        organization: '横須賀市コールセンター',
        organizers: [
          '久里浜観光協会',
          '久里浜商店会協同組合',
          '横須賀市'
        ],
        website: 'https://perryfes.jp/'
      },
      
      mapInfo: {
        latitude: 35.248,
        longitude: 139.688,
        zoom: 15,
        address: '神奈川県横須賀市久里浜',
        landmarks: ['ペリー公園', '久里浜駅', '京急久里浜駅']
      },
      
      weatherInfo: {
        cancelConditions: '荒天時中止',
        backup: '延期情報は公式サイトで発表',
        season: '夏季（8月上旬）'
      },
      
      media: {
        photos: [],
        videos: [],
        coverage: '地元メディアで毎年取材',
        social: '#久里浜ペリー祭'
      },
      
      related: {
        nearby: ['横須賀軍港めぐり', 'ペリー記念館'],
        sameDay: ['ペリー祭市民祭', '久里浜商店街イベント'],
        website: 'https://perryfes.jp/'
      },
      
      walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00243/',
      verified: true,
      verificationDate: new Date(),
      featured: true,
      detailLink: '/kanagawa/hanabi/kurihama-perry-festival-2025',
      
      tags: {
        keywords: ['ペリー祭', '歴史', '海岸', 'スターマイン'],
        categories: ['伝統行事', '花火大会', '観光イベント'],
        audience: ['ファミリー', 'カップル', '観光客']
      },
      
      regionId: kanagawaRegion.id
    };

    // 既存のイベントをチェック
    const existingEvent = await prisma.hanabiEvent.findUnique({
      where: { eventId: hanabiData.eventId }
    });

    let result;
    if (existingEvent) {
      // 既存レコードを更新
      result = await prisma.hanabiEvent.update({
        where: { eventId: hanabiData.eventId },
        data: hanabiData
      });
      console.log(`✅ 更新了现有记录: ${result.name} (ID: ${result.id})`);
    } else {
      // 新しいレコードを作成
      result = await prisma.hanabiEvent.create({
        data: hanabiData
      });
      console.log(`✅ 创建了新记录: ${result.name} (ID: ${result.id})`);
    }

    console.log('\n📊 保存的数据详情:');
    console.log('================');
    console.log('活动名称:', result.name);
    console.log('英文名称:', result.englishName);
    console.log('日文名称:', result.japaneseName);
    console.log('日期:', result.date);
    console.log('时间:', result.time);
    console.log('地点:', result.location);
    console.log('花火数量:', result.fireworksCount);
    console.log('预计观众:', result.expectedVisitors);
    console.log('联系电话:', result.contact?.phone);
    console.log('官方网站:', result.contact?.website);
    console.log('地区ID:', result.regionId);
    console.log('验证状态:', result.verified ? '已验证' : '未验证');
    console.log('特色活动:', result.featured ? '是' : '否');

    console.log('\n🎉 久里浜ペリー祭花火大会数据保存成功！');
    
    return result;

  } catch (error) {
    console.error('❌ 数据保存失败:', error.message);
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('🔌 数据库连接已关闭');
  }
}

// 运行保存操作
saveKurihamaHanabiData().catch(console.error); 