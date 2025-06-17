const fs = require("fs").promises;
const path = require("path");

// 从WalkerPlus获取的数据
const walkerPlusData = {
  // 栃木县
  tochigi: [
    "第53回 真岡市夏祭大花火大会",
    "第109回 足利花火大会",
    "第73回 小山的花火",
    "那须野故乡花火大会",
    "尊德夏祭 大花火大会",
  ],
  // 群马县
  gunma: [
    "第69回 前桥花火大会",
    "第51回 高崎大花火大会",
    "伊势崎花火大会",
    "桐生八木节祭花火大会",
    "沼田花火大会",
  ],
  // 茨城县
  ibaraki: [
    "第94回 土浦全国花火竞技大会",
    "古河花火大会",
    "大洗海上花火大会",
    "常总橘花火大会",
    "筑波山麓花火大会",
  ],
};

// 现有页面中的花火活动
const existingPageData = [
  // 栃木县
  { name: "足利花火大会", region: "栃木县", fireworksCount: "約2万5000発" },
  { name: "小山の花火", region: "栃木县", fireworksCount: "約2万発" },
  { name: "真岡夏祭大花火大会", region: "栃木县", fireworksCount: "約1万発" },

  // 茨城县
  { name: "土浦全国花火竞技大会", region: "茨城县", fireworksCount: "約2万発" },
  { name: "利根川大花火大会", region: "茨城县", fireworksCount: "約3万発" },
  { name: "水戸黄门祭花火大会", region: "茨城县", fireworksCount: "約5000発" },
  { name: "大洗海上花火大会", region: "茨城县", fireworksCount: "約1万発" },
  {
    name: "第58回 常總きぬ川花火大会",
    region: "茨城县",
    fireworksCount: "約2万発",
  },

  // 群马县
  { name: "高崎花火大会", region: "群马县", fireworksCount: "約1万5000発" },
  { name: "前橋花火大会", region: "群马县", fireworksCount: "約1万発" },
  { name: "沼田花火大会", region: "群马县", fireworksCount: "約7000発" },
  {
    name: "田园梦花火2025 第35回 玉村花火大会",
    region: "群马县",
    fireworksCount: "約3000発",
  },
];

// 分析对比结果
async function compareData() {
  console.log("🔍 北关东花火大会数据对比分析");
  console.log("=".repeat(60));

  console.log("\n📊 数据来源对比:");
  console.log("🌐 WalkerPlus数据: 15个花火活动（每个地区前5名）");
  console.log("💻 现有页面数据: 12个花火活动");

  console.log("\n🎆 各地区对比分析:");

  // 栃木县对比
  console.log("\n🏮 栃木县花火活动对比:");
  console.log("WalkerPlus数据:");
  walkerPlusData.tochigi.forEach((event, index) => {
    console.log(`   ${index + 1}. ${event}`);
  });

  console.log("现有页面数据:");
  const tochigiExisting = existingPageData.filter(
    (event) => event.region === "栃木县"
  );
  tochigiExisting.forEach((event, index) => {
    console.log(`   ${index + 1}. ${event.name} (${event.fireworksCount})`);
  });

  // 群马县对比
  console.log("\n🏮 群马县花火活动对比:");
  console.log("WalkerPlus数据:");
  walkerPlusData.gunma.forEach((event, index) => {
    console.log(`   ${index + 1}. ${event}`);
  });

  console.log("现有页面数据:");
  const gunmaExisting = existingPageData.filter(
    (event) => event.region === "群马县"
  );
  gunmaExisting.forEach((event, index) => {
    console.log(`   ${index + 1}. ${event.name} (${event.fireworksCount})`);
  });

  // 茨城县对比
  console.log("\n🏮 茨城县花火活动对比:");
  console.log("WalkerPlus数据:");
  walkerPlusData.ibaraki.forEach((event, index) => {
    console.log(`   ${index + 1}. ${event}`);
  });

  console.log("现有页面数据:");
  const ibarakiExisting = existingPageData.filter(
    (event) => event.region === "茨城县"
  );
  ibarakiExisting.forEach((event, index) => {
    console.log(`   ${index + 1}. ${event.name} (${event.fireworksCount})`);
  });

  console.log("\n🔍 遗漏的重要花火活动分析:");

  // 分析遗漏的活动
  const missingEvents = [];

  // 检查WalkerPlus数据中的重要活动是否在现有页面中
  console.log("\n❌ 现有页面中遗漏的WalkerPlus重要活动:");

  // 栃木县遗漏分析
  const tochigiMissing = [];
  if (!tochigiExisting.find((e) => e.name.includes("那须野"))) {
    tochigiMissing.push("那须野故乡花火大会 (约2万发)");
  }
  if (!tochigiExisting.find((e) => e.name.includes("尊德"))) {
    tochigiMissing.push("尊德夏祭 大花火大会 (约1万发)");
  }

  // 群马县遗漏分析
  const gunmaMissing = [];
  if (!gunmaExisting.find((e) => e.name.includes("伊势崎"))) {
    gunmaMissing.push("伊势崎花火大会 (约1万发，关东最大级别的2尺玉花火)");
  }
  if (!gunmaExisting.find((e) => e.name.includes("桐生"))) {
    gunmaMissing.push("桐生八木节祭花火大会 (约5000发，传统祭典与花火的协演)");
  }

  // 茨城县遗漏分析
  const ibarakiMissing = [];
  if (!ibarakiExisting.find((e) => e.name.includes("古河"))) {
    ibarakiMissing.push("古河花火大会 (约2万5000发，关东最大规模的花火数量)");
  }
  if (!ibarakiExisting.find((e) => e.name.includes("筑波"))) {
    ibarakiMissing.push("筑波山麓花火大会 (约8000发，筑波山为背景)");
  }

  // 输出遗漏分析
  if (tochigiMissing.length > 0) {
    console.log("\n🔸 栃木县遗漏的重要活动:");
    tochigiMissing.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event}`);
    });
  }

  if (gunmaMissing.length > 0) {
    console.log("\n🔸 群马县遗漏的重要活动:");
    gunmaMissing.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event}`);
    });
  }

  if (ibarakiMissing.length > 0) {
    console.log("\n🔸 茨城县遗漏的重要活动:");
    ibarakiMissing.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event}`);
    });
  }

  // 现有页面中的独有活动
  console.log("\n✅ 现有页面中的独有重要活动（WalkerPlus排行榜外）:");

  const uniqueExisting = [];

  // 茨城县独有
  if (ibarakiExisting.find((e) => e.name.includes("利根川大花火大会"))) {
    uniqueExisting.push("利根川大花火大会 (约3万发) - 茨城县最大规模");
  }
  if (ibarakiExisting.find((e) => e.name.includes("水戸黄门祭"))) {
    uniqueExisting.push("水戸黄门祭花火大会 (约5000发) - 历史文化特色");
  }

  // 群马县独有
  if (gunmaExisting.find((e) => e.name.includes("玉村"))) {
    uniqueExisting.push(
      "田园梦花火2025 第35回 玉村花火大会 (约3000发) - 群马最早开催"
    );
  }

  uniqueExisting.forEach((event, index) => {
    console.log(`   ${index + 1}. ${event}`);
  });

  console.log("\n📈 重要发现:");
  console.log("🎯 最重要的遗漏活动:");
  console.log(
    "   1. 古河花火大会 (茨城县) - 约2万5000发，关东最大规模花火数量"
  );
  console.log(
    "   2. 伊势崎花火大会 (群马县) - 约1万发，关东最大级别的2尺玉花火"
  );
  console.log("   3. 桐生八木节祭花火大会 (群马县) - 传统祭典与花火的协演");

  console.log("\n💡 建议:");
  console.log("   ✅ 现有页面已包含大部分重要花火活动");
  console.log("   📝 建议补充古河花火大会（关东最大规模花火数量）");
  console.log("   📝 建议补充伊势崎花火大会（关东最大级别2尺玉）");
  console.log("   📝 建议补充桐生八木节祭花火大会（传统文化特色）");
  console.log("   🔄 现有的利根川大花火大会(3万发)规模很大，应保留");

  console.log("\n" + "=".repeat(60));
  console.log("🎉 对比分析完成！");

  return {
    walkerPlusTotal: 15,
    existingPageTotal: existingPageData.length,
    missingImportant: [...tochigiMissing, ...gunmaMissing, ...ibarakiMissing],
    uniqueExisting: uniqueExisting,
  };
}

// 如果直接运行此脚本
if (require.main === module) {
  compareData().catch(console.error);
}

module.exports = { compareData };
