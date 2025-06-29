const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

// 十项数据模板示例
const sampleData = {
  name: "河口湖香草节",                    // 1. 名称
  address: "山梨県富士河口湖町大石2585",    // 2. 所在地
  datetime: "2025年6月21日～7月21日 9:00～17:00", // 3. 开催期间时间(合并)
  venue: "河口湖畔 大石公园",              // 4. 开催场所
  access: "富士急行「河口湖駅」转乘巴士30分钟", // 5. 交通方式
  organizer: "河口湖香草节实行委员会",      // 6. 主办方
  price: "免费",                         // 7. 料金
  contact: "0555-72-3168",              // 8. 联系方式
  website: "https://fujisan.ne.jp/pages/380/", // 9. 官方网站
  googleMap: "35.5011,138.7637"          // 10. 谷歌地图位置
};

async function addActivity(activityType, regionCode, activityData) {
  try {
    console.log(`\n🎯 添加${activityType}活动到${regionCode}地区...`);

    // 获取地区ID
    const region = await prisma.region.findUnique({
      where: { code: regionCode }
    });

    if (!region) {
      throw new Error(`找不到地区: ${regionCode}`);
    }

    // 根据活动类型选择对应的数据库表
    let result;
    const data = {
      ...activityData,
      regionId: region.id,
      verified: true
    };

    switch (activityType) {
      case 'hanabi':
        result = await prisma.hanabiEvent.create({ data });
        break;
      case 'matsuri':
        result = await prisma.matsuriEvent.create({ data });
        break;
      case 'hanami':
        result = await prisma.hanamiEvent.create({ data });
        break;
      case 'momiji':
        result = await prisma.momijiEvent.create({ data });
        break;
      case 'illumination':
        result = await prisma.illuminationEvent.create({ data });
        break;
      case 'culture':
        result = await prisma.cultureEvent.create({ data });
        break;
      default:
        throw new Error(`不支持的活动类型: ${activityType}`);
    }

    console.log(`✅ 成功添加: ${result.name}`);
    console.log(`📍 地区: ${region.nameCn}`);
    console.log(`🆔 ID: ${result.id}`);
    
    return result;

  } catch (error) {
    console.error('❌ 添加失败:', error.message);
    return null;
  }
}

// 批量添加活动数据
async function batchAddActivities(activities) {
  console.log(`🚀 开始批量添加 ${activities.length} 个活动...`);
  
  const results = [];
  for (const activity of activities) {
    const result = await addActivity(
      activity.type,
      activity.region,
      activity.data
    );
    if (result) {
      results.push(result);
    }
    // 避免过快请求
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n🎉 批量添加完成！成功添加 ${results.length} 个活动`);
  return results;
}

// 使用示例
async function example() {
  // 单个活动添加示例
  await addActivity('hanami', 'koshinetsu', sampleData);

  // 批量添加示例
  const batchData = [
    {
      type: 'hanabi',
      region: 'tokyo',
      data: {
        name: "东京花火大会示例",
        address: "东京都某区某地",
        datetime: "2025年7月20日 19:30～21:00",
        venue: "某某公园",
        access: "JR某某线某某站步行10分钟",
        organizer: "某某实行委员会",
        price: "免费",
        contact: "03-1234-5678",
        website: "https://example.com",
        googleMap: "35.6762,139.6503"
      }
    }
    // 可以添加更多活动...
  ];

  // await batchAddActivities(batchData);
}

// 如果直接运行此脚本，执行示例
if (require.main === module) {
  example().finally(() => prisma.$disconnect());
}

module.exports = {
  addActivity,
  batchAddActivities,
  sampleData
}; 