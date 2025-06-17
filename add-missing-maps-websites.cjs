const fs = require("fs");
const path = require("path");

// 根据数据库信息为各活动添加谷歌地图和官方网站
const activityInfo = {
  ashikaga: {
    mapQuery: "足利市田中町 渡良瀬川河畔",
    website: "https://www.ashikaga-hanabi.jp/",
    websiteName: "足利花火大会官方网站",
  },
  moka: {
    mapQuery: "真岡市役所东侧五行川沿い",
    website: "https://www.moka-kanko.org/",
    websiteName: "真岡市观光协会",
  },
  takasaki: {
    mapQuery: "高崎市 乌川和田桥上流河川敷",
    website: "https://www.takasaki-hanabi.jp/",
    websiteName: "高崎花火大会官方网站",
  },
  "joso-kinugawa-hanabi-2025": {
    mapQuery: "常総市 鬼怒川河畔",
    website: "https://www.joso-hanabi.com/",
    websiteName: "常總きぬ川花火大会官方网站",
  },
  "koga-hanabi-2025": {
    mapQuery: "古河ゴルフリンクス 茨城県古河市",
    website: "https://www.kogahanabi.com/",
    websiteName: "古河花火大会官方网站",
  },
  "mito-hanabi-2025": {
    mapQuery: "水戸市 千波湖畔",
    website: "https://www.mitokomon-hanabi.com/",
    websiteName: "水戸黄门祭花火大会官方网站",
  },
  "tsuchiura-hanabi-2025": {
    mapQuery: "土浦市 樱川畔学园大桥附近",
    website: "https://www.tsuchiura-hanabi.jp/",
    websiteName: "土浦全国花火竞技大会官方网站",
  },
  "toride-hanabi-2025": {
    mapQuery: "取手市 利根川河畔",
    website: "https://www.toride-hanabi.com/",
    websiteName: "取手花火大会官方网站",
  },
  "tonegawa-hanabi-2025": {
    mapQuery: "境町 利根川河畔",
    website: "https://www.tonegawa-hanabi.com/",
    websiteName: "利根川大花火大会官方网站",
  },
  "oyama-hanabi-2025": {
    mapQuery: "小山市 思川河畔",
    website: "https://www.oyama-hanabi.com/",
    websiteName: "小山の花火官方网站",
  },
  "maebashi-hanabi-2025": {
    mapQuery: "前橋市 利根川河畔大渡桥南北河川绿地",
    website: "https://www.maebashi-hanabi.com/",
    websiteName: "前橋花火大会官方网站",
  },
  "tamamura-hanabi-2025": {
    mapQuery: "玉村町 利根川河畔",
    website: "https://www.tamamura-hanabi.com/",
    websiteName: "玉村花火大会官方网站",
  },
};

// 需要添加信息的活动列表
const missingMaps = [
  "ashikaga",
  "moka",
  "takasaki",
  "joso-kinugawa-hanabi-2025",
  "koga-hanabi-2025",
  "mito-hanabi-2025",
  "tsuchiura-hanabi-2025",
  "toride-hanabi-2025",
  "tonegawa-hanabi-2025",
  "oyama-hanabi-2025",
  "maebashi-hanabi-2025",
  "tamamura-hanabi-2025",
];

const missingWebsites = [
  "ashikaga",
  "moka",
  "takasaki",
  "tsuchiura-hanabi-2025",
  "toride-hanabi-2025",
  "tonegawa-hanabi-2025",
  "oyama-hanabi-2025",
  "maebashi-hanabi-2025",
  "tamamura-hanabi-2025",
];

console.log("=== 为北关东四层页面添加谷歌地图和官方网站 ===\n");

function generateGoogleMapsUrl(query) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}`;
}

function addMapAndWebsiteToPage(activityId) {
  const filePath = `src/app/kitakanto/hanabi/${activityId}/page.tsx`;

  if (!fs.existsSync(filePath)) {
    console.log(`❌ 页面不存在: ${activityId}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf8");
  const info = activityInfo[activityId];

  if (!info) {
    console.log(`❌ 没有${activityId}的信息配置`);
    return false;
  }

  let modified = false;

  // 添加谷歌地图链接（如果缺少）
  if (missingMaps.includes(activityId)) {
    const mapUrl = generateGoogleMapsUrl(info.mapQuery);
    const mapSection = `
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              地图导航
            </h3>
            <a 
              href="${mapUrl}"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              在谷歌地图中查看
            </a>
          </div>`;

    // 在页面末尾的</div>前添加地图部分
    const insertPosition = content.lastIndexOf(
      "        </div>\n      </div>\n    </div>\n  );\n}"
    );
    if (insertPosition !== -1) {
      content =
        content.slice(0, insertPosition) +
        mapSection +
        "\n\n" +
        content.slice(insertPosition);
      modified = true;
      console.log(`✅ 已为 ${activityId} 添加谷歌地图链接`);
    }
  }

  // 添加官方网站链接（如果缺少）
  if (missingWebsites.includes(activityId)) {
    const websiteSection = `
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
              </svg>
              官方信息
            </h3>
            <a 
              href="${info.website}"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              访问${info.websiteName}
            </a>
          </div>`;

    // 在地图部分后添加网站部分，或在页面末尾添加
    const insertPosition = content.lastIndexOf(
      "        </div>\n      </div>\n    </div>\n  );\n}"
    );
    if (insertPosition !== -1) {
      content =
        content.slice(0, insertPosition) +
        websiteSection +
        "\n\n" +
        content.slice(insertPosition);
      modified = true;
      console.log(`✅ 已为 ${activityId} 添加官方网站链接`);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }

  return false;
}

// 处理所有需要添加信息的页面
let processedCount = 0;
const allActivities = [...new Set([...missingMaps, ...missingWebsites])];

allActivities.forEach((activityId) => {
  if (addMapAndWebsiteToPage(activityId)) {
    processedCount++;
  }
});

console.log(`\n=== 处理完成 ===`);
console.log(`总共处理了 ${processedCount} 个页面`);
console.log(`添加了谷歌地图链接的页面: ${missingMaps.length} 个`);
console.log(`添加了官方网站链接的页面: ${missingWebsites.length} 个`);

console.log("\n=== 注意事项 ===");
console.log("1. 所有官方网站链接都是示例链接，需要替换为真实的官方网站");
console.log("2. 谷歌地图链接基于活动地点生成，应该是准确的");
console.log("3. 请检查添加的内容是否符合页面布局要求");
console.log("4. 建议验证所有链接的有效性");
