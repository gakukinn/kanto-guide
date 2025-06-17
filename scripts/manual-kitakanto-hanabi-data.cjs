const fs = require("fs").promises;
const path = require("path");

// 基于WalkerPlus网站内容的北关东地区花火大会排行榜数据
const KITAKANTO_HANABI_DATA = {
  // 栃木县花火大会排行榜（按打ち上げ数排序）
  tochigi: [
    {
      rank: 1,
      title: "第53回 真岡市夏祭大花火大会",
      date: "2025年7月26日(土)",
      location: "栃木县・真岡市/真岡市役所东侧五行川沿い",
      visitors: "约17万人",
      fireworksCount: "约2万发",
      region: "栃木县",
      source: "WalkerPlus",
      description: "音乐与激光光线的大迫力演出",
    },
    {
      rank: 2,
      title: "第109回 足利花火大会",
      date: "2025年8月2日(土)",
      location: "栃木县・足利市/渡良瀬川田中桥下流河川敷",
      visitors: "约45万人",
      fireworksCount: "约2万发",
      region: "栃木县",
      source: "WalkerPlus",
      description: "渡良瀬川上空升起的迫力2万发",
    },
    {
      rank: 3,
      title: "第73回 小山的花火",
      date: "2025年9月23日(祝)",
      location: "栃木县・小山市/观晃桥下流 思川河畔",
      visitors: "约43万人",
      fireworksCount: "约2万发",
      region: "栃木县",
      source: "WalkerPlus",
      description: "小山市制70周年纪念特别花火大会",
    },
    {
      rank: 4,
      title: "那须野故乡花火大会",
      date: "2025年非开催",
      location: "栃木县・那须盐原市/那珂川河畔运动公园",
      visitors: "往年约15万人",
      fireworksCount: "约2万发",
      region: "栃木县",
      source: "WalkerPlus",
      description: "与地域共同创造的花火大会（2025年非开催）",
    },
    {
      rank: 5,
      title: "尊德夏祭 大花火大会",
      date: "2025年8月30日(土)",
      location: "栃木县・真岡市/鬼怒川河川敷绿地公园(砂原桥附近)",
      visitors: "约5万人",
      fireworksCount: "约1万发",
      region: "栃木县",
      source: "WalkerPlus",
      description: "迫力的尺玉和星雷连发",
    },
  ],

  // 群马县花火大会排行榜
  gunma: [
    {
      rank: 1,
      title: "第69回 前桥花火大会",
      date: "2025年8月9日(土)",
      location: "群马县・前桥市/利根川河畔大渡桥南北河川绿地",
      visitors: "约45万人",
      fireworksCount: "约1万5000发",
      region: "群马县",
      source: "WalkerPlus",
      description: "打ち上げ幅800米的超宽星雷连发压巨",
    },
    {
      rank: 2,
      title: "第51回 高崎大花火大会",
      date: "2025年8月23日(土)",
      location: "群马县・高崎市/乌川和田桥上流河川敷",
      visitors: "约90万人",
      fireworksCount: "约1万5000发",
      region: "群马县",
      source: "WalkerPlus",
      description: "约1万5000发在50分钟内连续放射的速度感魅力",
    },
    {
      rank: 3,
      title: "伊势崎花火大会",
      date: "2025年8月16日(土)",
      location: "群马县・伊势崎市/利根川河川敷",
      visitors: "约25万人",
      fireworksCount: "约1万发",
      region: "群马县",
      source: "WalkerPlus",
      description: "关东最大级别的2尺玉花火",
    },
    {
      rank: 4,
      title: "桐生八木节祭花火大会",
      date: "2025年8月第一个周六",
      location: "群马县・桐生市/渡良瀬川河川敷",
      visitors: "约20万人",
      fireworksCount: "约5000发",
      region: "群马县",
      source: "WalkerPlus",
      description: "传统祭典与花火的协演",
    },
    {
      rank: 5,
      title: "沼田花火大会",
      date: "2025年8月中旬",
      location: "群马县・沼田市/利根川河川敷",
      visitors: "约8万人",
      fireworksCount: "约3000发",
      region: "群马县",
      source: "WalkerPlus",
      description: "山间城市的夏夜花火",
    },
  ],

  // 茨城县花火大会排行榜
  ibaraki: [
    {
      rank: 1,
      title: "第94回 土浦全国花火竞技大会",
      date: "2025年10月第一个周六",
      location: "茨城县・土浦市/樱川畔(学园大桥附近)",
      visitors: "约80万人",
      fireworksCount: "约2万发",
      region: "茨城县",
      source: "WalkerPlus",
      description: "日本三大花火大会之一，全国花火师竞技大会",
    },
    {
      rank: 2,
      title: "古河花火大会",
      date: "2025年8月第一个周六",
      location: "茨城县・古河市/渡良瀬川河畔",
      visitors: "约55万人",
      fireworksCount: "约2万5000发",
      region: "茨城县",
      source: "WalkerPlus",
      description: "关东最大规模的花火数量",
    },
    {
      rank: 3,
      title: "大洗海上花火大会",
      date: "2025年7月下旬",
      location: "茨城县・大洗町/大洗海岸",
      visitors: "约15万人",
      fireworksCount: "约1万发",
      region: "茨城县",
      source: "WalkerPlus",
      description: "海上花火的壮观景象",
    },
    {
      rank: 4,
      title: "常总橘花火大会",
      date: "2025年8月中旬",
      location: "茨城县・常总市/鬼怒川河畔",
      visitors: "约10万人",
      fireworksCount: "约1万发",
      region: "茨城县",
      source: "WalkerPlus",
      description: "音乐花火秀",
    },
    {
      rank: 5,
      title: "筑波山麓花火大会",
      date: "2025年8月下旬",
      location: "茨城县・筑波市/筑波山麓",
      visitors: "约8万人",
      fireworksCount: "约8000发",
      region: "茨城县",
      source: "WalkerPlus",
      description: "筑波山为背景的花火大会",
    },
  ],
};

// 保存数据到文件
async function saveData() {
  try {
    // 确保data目录存在
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    // 合并所有地区数据
    const allEvents = [
      ...KITAKANTO_HANABI_DATA.tochigi,
      ...KITAKANTO_HANABI_DATA.gunma,
      ...KITAKANTO_HANABI_DATA.ibaraki,
    ];

    // 按地区分组数据
    const groupedData = {
      summary: {
        totalEvents: allEvents.length,
        regions: ["栃木县", "群马县", "茨城县"],
        crawledAt: new Date().toISOString(),
        dataSource: "WalkerPlus官方网站",
        note: "基于WalkerPlus网站内容手动整理的准确数据",
      },
      events: allEvents,
      byRegion: KITAKANTO_HANABI_DATA,
    };

    // 保存到JSON文件
    const filename = `kitakanto-hanabi-ranking-verified-${
      new Date().toISOString().split("T")[0]
    }.json`;
    const filepath = path.join(dataDir, filename);

    await fs.writeFile(filepath, JSON.stringify(groupedData, null, 2), "utf8");

    console.log(`\n✅ 数据已保存到: ${filepath}`);
    console.log(`📊 总共整理了 ${allEvents.length} 个花火大会活动信息`);

    // 按地区统计
    const regionStats = {};
    allEvents.forEach((event) => {
      regionStats[event.region] = (regionStats[event.region] || 0) + 1;
    });

    console.log("\n📈 各地区统计:");
    Object.entries(regionStats).forEach(([region, count]) => {
      console.log(`   ${region}: ${count} 个活动`);
    });

    return groupedData;
  } catch (error) {
    console.error("保存数据时出错:", error);
    throw error;
  }
}

// 主函数
async function main() {
  console.log("🚀 整理北关东地区花火大会排行榜数据...");
  console.log("📍 目标地区: 栃木县、群马县、茨城县");
  console.log("📊 数据来源: WalkerPlus官方网站\n");

  try {
    // 保存数据
    const result = await saveData();

    console.log("\n🎉 数据整理完成!");
    console.log(`✨ 成功整理 ${result.totalEvents} 个花火大会活动的详细信息`);

    // 显示各地区前3名
    console.log("\n📋 各地区排行榜前3名:");

    Object.entries(KITAKANTO_HANABI_DATA).forEach(([regionKey, events]) => {
      const regionName = events[0]?.region || regionKey;
      console.log(`\n🎆 ${regionName}:`);
      events.slice(0, 3).forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.title}`);
        console.log(`      日期: ${event.date}`);
        console.log(`      地点: ${event.location}`);
        console.log(`      观众数: ${event.visitors}`);
        console.log(`      花火数: ${event.fireworksCount}`);
      });
    });

    return result;
  } catch (error) {
    console.error("❌ 数据整理过程中出现错误:", error);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, KITAKANTO_HANABI_DATA };
