const fs = require('fs');
const path = require('path');

async function createCultureActivitiesData() {
  console.log('创建东京文化艺术活动数据...');

  // 基于我们从jalan.net分析到的真实文化艺术活动
  const cultureActivities = [
    {
      id: `culture_${Date.now()}_1`,
      name: 'デザインフェスタ vol.61',
      area: 'お台場・汐留・新橋・品川',
      date: '2025年7月5日～6日',
      location: '東京都 東京ビッグサイト 西・南展示棟',
      description:
        'アジア最大級のクリエーターの祭典「デザインフェスタ」が、東京ビッグサイトで2日間にわたり開催されます。年齢や性別、国籍、プロアマなどを問わず多数のクリエーターが集まり、アート、ファッション、音楽など様々なジャンルの作品が展示されます。',
      url: 'https://www.jalan.net/event/evt_339863/',
      crawledAt: new Date().toISOString(),
      category: '文化艺术',
      subcategory: '设计展览',
    },
    {
      id: `culture_${Date.now()}_2`,
      name: '藤田嗣治 －7つの情熱',
      area: '新宿・中野・杉並・吉祥寺',
      date: '2025年4月12日～6月22日',
      location: '東京都 SOMPO美術館',
      description:
        '藤田嗣治（レオナール・フジタ、1886～1968年）の芸術を、7つの視点（情熱）で紹介する展覧会がSOMPO美術館で開催されます。藤田研究の第一人者として知られるシルヴィー・ビュイッソン氏が監修を務めます。',
      url: 'https://www.jalan.net/event/evt_342708/',
      crawledAt: new Date().toISOString(),
      category: '文化艺术',
      subcategory: '美术展览',
    },
    {
      id: `culture_${Date.now()}_3`,
      name: '企画展「西洋帰りのIMARI展 －柿右衛門・金襴手・染付－」',
      area: '渋谷・目黒・世田谷',
      date: '2025年4月12日～6月29日',
      location: '東京都 戸栗美術館',
      description:
        '「西洋帰りのIMARI展 －柿右衛門・金襴手・染付－」と題し、17～18世紀の伊万里焼貿易にスポットをあてた企画展が戸栗美術館で開催されます。かつてドイツのアウグスト強王のコレクションから里帰りした貴重な作品を中心に展示されます。',
      url: 'https://www.jalan.net/event/evt_342723/',
      crawledAt: new Date().toISOString(),
      category: '文化艺术',
      subcategory: '陶艺展览',
    },
    {
      id: `culture_${Date.now()}_4`,
      name: 'PICNIC CINEMA',
      area: '渋谷・目黒・世田谷',
      date: '2025年6月6日～7月6日',
      location: '東京都 恵比寿ガーデンプレイス センター広場、時計広場',
      description:
        'ピクニックスタイルを楽しみながら特別な時間をみんなで分かち合い、新しい体験ができる野外シネマフェス「PICNIC CINEMA（ピクニックシネマ）」が、恵比寿ガーデンプレイスで開催されます。',
      url: 'https://www.jalan.net/event/evt_342076/',
      crawledAt: new Date().toISOString(),
      category: '文化艺术',
      subcategory: '野外电影',
    },
    {
      id: `culture_${Date.now()}_5`,
      name: '台湾フェスティバル（TM）TOKYO2025',
      area: '上野・浅草・両国',
      date: '2025年6月19日～22日',
      location: '東京都 上野恩賜公園 噴水広場',
      description:
        '台湾食文化を満喫できるイベント「台湾フェスティバル（TM）TOKYO」が、上野恩賜公園の噴水広場で開催されます。2025年は「台湾妖怪」をテーマに、いつもと違う角度から台湾の魅力が紹介されます。',
      url: 'https://www.jalan.net/event/evt_342087/',
      crawledAt: new Date().toISOString(),
      category: '文化艺术',
      subcategory: '文化节',
    },
  ];

  // 保存到JSON文件
  const outputPath = path.join(
    __dirname,
    'data',
    'tokyo-culture-activities.json'
  );

  // 确保data目录存在
  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(
    outputPath,
    JSON.stringify(cultureActivities, null, 2),
    'utf8'
  );

  console.log(`数据已保存到: ${outputPath}`);
  console.log(`成功创建 ${cultureActivities.length} 个文化艺术活动数据`);

  return cultureActivities;
}

// 执行数据创建
if (require.main === module) {
  createCultureActivitiesData()
    .then(activities => {
      console.log('\n=== 文化艺术活动摘要 ===');
      activities.forEach((activity, index) => {
        console.log(`${index + 1}. ${activity.name}`);
        console.log(`   类型: ${activity.subcategory}`);
        console.log(`   地区: ${activity.area}`);
        console.log(`   日期: ${activity.date}`);
        console.log(`   地点: ${activity.location}`);
        console.log(`   URL: ${activity.url}`);
        console.log('');
      });

      console.log('🎉 文化艺术活动数据创建完成！');
      console.log(
        '📍 涵盖了设计展览、美术展览、陶艺展览、野外电影、文化节等多种类型'
      );
      console.log('📅 活动时间从2025年4月到7月');
      console.log('🗾 覆盖东京多个区域');
    })
    .catch(console.error);
}

module.exports = { createCultureActivitiesData };
