/**
 * 甲信越花见数据精确清理脚本
 * 功能：清理排行榜数据中的人气信息和观赏季节
 */

const fs = require('fs').promises;
const path = require('path');

async function cleanKoshinetsuHanamiData() {
  console.log('🧹 开始精确清理甲信越花见数据...');

  try {
    // 读取最终数据
    const dataPath = path.join(
      __dirname,
      '..',
      'data',
      'walkerplus-crawled',
      'ar0400-koshinetsu-hanami-final-2025-06-18T11-48-54-551Z.json'
    );
    const content = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(content);

    console.log(`📂 读取数据：${data.length}个景点`);

    // 精确清理每个景点的数据
    const cleanedData = data.map((spot, index) => {
      console.log(`\n🔧 处理第${index + 1}个景点：${spot.name}`);

      // 提取观赏季节
      let cleanViewingSeason = '4月上旬～4月下旬';
      let wantToVisit = 0;
      let haveVisited = 0;
      let cleanDescription = spot.description;

      if (spot.viewingSeason && spot.viewingSeason.length > 20) {
        const rawData = spot.viewingSeason;
        console.log(`  原始数据长度：${rawData.length}字符`);

        // 提取观赏季节
        const seasonMatch = rawData.match(/例年の見頃[：:]\s*([^\n]+)/);
        if (seasonMatch) {
          cleanViewingSeason = seasonMatch[1].trim();
          console.log(`  ✅ 观赏季节：${cleanViewingSeason}`);
        }

        // 提取想去人数
        const wantMatch = rawData.match(/行ってみたい[：:]\s*(\d+)/);
        if (wantMatch) {
          wantToVisit = parseInt(wantMatch[1]);
          console.log(`  ✅ 想去人数：${wantToVisit}人`);
        }

        // 提取去过人数
        const visitedMatch = rawData.match(/行ってよかった[：:]\s*(\d+)/);
        if (visitedMatch) {
          haveVisited = parseInt(visitedMatch[1]);
          console.log(`  ✅ 去过人数：${haveVisited}人`);
        }

        // 提取描述
        const lines = rawData
          .split('\n')
          .map(line => line.trim())
          .filter(line => line);
        const descLine = lines.find(
          line =>
            line.length > 10 &&
            !line.includes('県') &&
            !line.includes('例年') &&
            !line.includes('行って') &&
            !line.includes(spot.name)
        );

        if (descLine) {
          cleanDescription = descLine;
          console.log(`  ✅ 描述：${cleanDescription}`);
        }
      }

      // 如果描述太简单，生成更好的描述
      if (
        !cleanDescription ||
        cleanDescription.includes('是甲信越地区著名的花见景点')
      ) {
        if (spot.name.includes('城')) {
          cleanDescription = `${spot.name}以其壮丽的城樱相映景色而闻名，是日本著名的赏樱胜地。`;
        } else if (spot.name.includes('山')) {
          cleanDescription = `${spot.name}位于山间，拥有绝美的山樱景色，春季樱花盛开时格外迷人。`;
        } else if (spot.name.includes('寺')) {
          cleanDescription = `${spot.name}是历史悠久的古寺，院内古樱参天，春日樱花飞舞，意境深远。`;
        } else if (spot.name.includes('公園')) {
          cleanDescription = `${spot.name}是当地人喜爱的赏樱公园，每年春季樱花盛开，是家庭踏青的好去处。`;
        } else {
          cleanDescription = `${spot.name}是甲信越地区的知名花见景点，春季樱花绽放时美不胜收。`;
        }
      }

      return {
        id: spot.id,
        name: spot.name,
        location: spot.location,
        viewingSeason: cleanViewingSeason,
        wantToVisit: wantToVisit,
        haveVisited: haveVisited,
        description: cleanDescription,
        likes: wantToVisit + haveVisited,
        category: '花见会',
        rank: index + 1,
        detailLink: spot.detailLink,
        sakuraVariety: spot.sakuraVariety || 'ソメイヨシノ',
        prefecture: spot.prefecture,
        peakTime: cleanViewingSeason,
        features: ['🌸 花见', '⛰️ 甲信越', '🏔️ 山间'],
      };
    });

    // 保存清理后的数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `ar0400-koshinetsu-hanami-cleaned-${timestamp}.json`;
    const outputPath = path.join(
      __dirname,
      '..',
      'data',
      'walkerplus-crawled',
      filename
    );

    await fs.writeFile(
      outputPath,
      JSON.stringify(cleanedData, null, 2),
      'utf8'
    );

    console.log(`\n💾 清理后数据已保存：${filename}`);

    // 生成最终报告
    console.log('\n📋 甲信越花见会数据清理完成汇报：');
    console.log(`📊 总计景点：${cleanedData.length}个`);

    const provinceStats = {};
    cleanedData.forEach(spot => {
      provinceStats[spot.prefecture] =
        (provinceStats[spot.prefecture] || 0) + 1;
    });

    console.log(`🗾 地区分布：`);
    Object.entries(provinceStats).forEach(([province, count]) => {
      console.log(`  - ${province}：${count}个景点`);
    });

    const totalWantToVisit = cleanedData.reduce(
      (sum, spot) => sum + spot.wantToVisit,
      0
    );
    const totalHaveVisited = cleanedData.reduce(
      (sum, spot) => sum + spot.haveVisited,
      0
    );
    console.log(
      `👥 总人气：想去${totalWantToVisit}人，去过${totalHaveVisited}人`
    );

    console.log('\n🌸 前5名最受欢迎景点：');
    const sortedByPopularity = [...cleanedData].sort(
      (a, b) => b.likes - a.likes
    );
    sortedByPopularity.slice(0, 5).forEach((spot, index) => {
      console.log(
        `  ${index + 1}. ${spot.name} (想去${spot.wantToVisit}人，去过${spot.haveVisited}人)`
      );
    });

    return {
      data: cleanedData,
      filename: filename,
      outputPath: outputPath,
    };
  } catch (error) {
    console.error('❌ 数据清理过程中出现错误:', error.message);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  cleanKoshinetsuHanamiData()
    .then(result => {
      console.log('\n🎊 甲信越花见数据清理完成！');
      console.log(`📁 清理后文件：${result.filename}`);
    })
    .catch(error => {
      console.error('💥 清理失败:', error.message);
      process.exit(1);
    });
}

module.exports = { cleanKoshinetsuHanamiData };
