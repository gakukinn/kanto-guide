/**
 * 甲信越花见数据对比脚本
 * 功能：对比新旧甲信越花见数据，选择最完整的版本
 * 选项C：对比两套数据，保留最完整的版本
 */

const fs = require('fs').promises;
const path = require('path');

async function compareKoshinetsuHanamiData() {
  console.log('📊 开始对比甲信越花见数据...');

  try {
    // 读取原有数据（AR0400基础爬取）
    const originalDataPath = path.join(
      __dirname,
      '..',
      'data',
      'walkerplus-crawled',
      'ar0400-koshinetsu-hanami-2025-06-18T08-20-36Z.json'
    );
    let originalData = [];
    try {
      const originalContent = await fs.readFile(originalDataPath, 'utf8');
      originalData = JSON.parse(originalContent);
      console.log(
        `📂 原有数据：${originalData.length}个景点 (来源：基础列表爬取)`
      );
    } catch (error) {
      console.log('⚠️ 未找到原有基础数据文件，将直接使用新排行榜数据');
    }

    // 读取新排行榜数据
    const newDataPath = path.join(
      __dirname,
      '..',
      'data',
      'walkerplus-crawled',
      'ar0400-koshinetsu-hanami-ranking-2025-06-18T11-47-48-903Z.json'
    );
    const newContent = await fs.readFile(newDataPath, 'utf8');
    const newData = JSON.parse(newContent);
    console.log(`📈 排行榜数据：${newData.length}个景点 (来源：排行榜页面)`);

    // 分析数据完整性
    console.log('\n🔍 数据完整性分析：');

    // 分析原有数据
    if (originalData.length > 0) {
      console.log('\n📊 原有数据详情：');
      originalData.forEach((spot, index) => {
        console.log(
          `  ${index + 1}. ${spot.name} (${spot.prefecture || '未分类'})`
        );
      });

      const originalProvinces = [
        ...new Set(originalData.map(spot => spot.prefecture)),
      ];
      console.log(`  🗾 覆盖地区：${originalProvinces.join('、')}`);
    }

    // 分析新数据
    console.log('\n📈 排行榜数据详情：');
    newData.forEach((spot, index) => {
      console.log(
        `  ${index + 1}. ${spot.name} (${spot.prefecture || '未分类'})`
      );
    });

    const newProvinces = [...new Set(newData.map(spot => spot.prefecture))];
    console.log(`  🗾 覆盖地区：${newProvinces.join('、')}`);

    // 数据质量评估
    console.log('\n⚖️ 数据质量对比：');

    const evaluateDataQuality = (data, name) => {
      const score = {
        quantity: data.length,
        hasWantToVisit: data.filter(spot => spot.wantToVisit > 0).length,
        hasDescription: data.filter(
          spot => spot.description && spot.description.length > 20
        ).length,
        hasDetailLink: data.filter(spot => spot.detailLink).length,
        hasViewingSeason: data.filter(
          spot => spot.viewingSeason && spot.viewingSeason.length > 5
        ).length,
        provinces: [...new Set(data.map(spot => spot.prefecture))].length,
      };

      console.log(`  ${name}：`);
      console.log(`    - 景点数量：${score.quantity}`);
      console.log(
        `    - 有人气数据：${score.hasWantToVisit}/${score.quantity}`
      );
      console.log(
        `    - 有详情描述：${score.hasDescription}/${score.quantity}`
      );
      console.log(`    - 有详情链接：${score.hasDetailLink}/${score.quantity}`);
      console.log(
        `    - 有观赏季节：${score.hasViewingSeason}/${score.quantity}`
      );
      console.log(`    - 覆盖县数：${score.provinces}`);

      return score;
    };

    const originalScore =
      originalData.length > 0
        ? evaluateDataQuality(originalData, '原有数据')
        : null;
    const newScore = evaluateDataQuality(newData, '排行榜数据');

    // 决定最终数据
    let finalData = newData;
    let dataSource = '排行榜数据';
    let reason = '排行榜数据包含10个景点，覆盖甲信越三县，数据更完整';

    if (originalScore && originalData.length > 0) {
      // 比较数据完整性
      if (originalScore.quantity > newScore.quantity) {
        if (originalScore.hasWantToVisit >= newScore.hasWantToVisit) {
          finalData = originalData;
          dataSource = '原有数据';
          reason = '原有数据景点数量更多且人气数据不逊色';
        }
      }
    }

    console.log(`\n✅ 最终选择：${dataSource}`);
    console.log(`📋 选择理由：${reason}`);

    // 数据清理和标准化
    console.log('\n🧹 清理和标准化数据...');
    const cleanedData = finalData.map((spot, index) => {
      // 清理观赏季节数据（移除HTML标签和多余文本）
      let cleanViewingSeason = spot.viewingSeason || '4月上旬～4月下旬';
      if (cleanViewingSeason.includes('例年の見頃：')) {
        const match = cleanViewingSeason.match(/例年の見頃：([^\\n]+)/);
        if (match) {
          cleanViewingSeason = match[1].trim();
        }
      }

      // 清理描述数据
      let cleanDescription = spot.description;
      if (cleanDescription && cleanDescription.includes('\n')) {
        // 如果描述包含HTML内容，提取关键描述
        const lines = cleanDescription.split('\n').filter(line => line.trim());
        const descLine = lines.find(
          line =>
            line.length > 10 && !line.includes('県') && !line.includes('例年')
        );
        if (descLine) {
          cleanDescription = descLine.trim();
        } else {
          cleanDescription = `${spot.name}是甲信越地区著名的花见景点。`;
        }
      }

      // 提取人气数据
      let wantToVisit = spot.wantToVisit || 0;
      let haveVisited = spot.haveVisited || 0;

      if (spot.viewingSeason && spot.viewingSeason.includes('行きたい')) {
        const wantMatch = spot.viewingSeason.match(/行きたい[：:]\s*(\d+)/);
        if (wantMatch) {
          wantToVisit = parseInt(wantMatch[1]);
        }
      }

      if (spot.viewingSeason && spot.viewingSeason.includes('行った')) {
        const visitedMatch = spot.viewingSeason.match(/行った[：:]\s*(\d+)/);
        if (visitedMatch) {
          haveVisited = parseInt(visitedMatch[1]);
        }
      }

      return {
        id: spot.id || `koshinetsu-hanami-${index + 1}`,
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
        features: spot.features || ['🌸 花见', '⛰️ 甲信越', '🏔️ 山间'],
      };
    });

    console.log(`✨ 清理完成，最终数据：${cleanedData.length}个景点`);

    // 保存最终数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const finalFilename = `ar0400-koshinetsu-hanami-final-${timestamp}.json`;
    const outputPath = path.join(
      __dirname,
      '..',
      'data',
      'walkerplus-crawled',
      finalFilename
    );

    await fs.writeFile(
      outputPath,
      JSON.stringify(cleanedData, null, 2),
      'utf8'
    );

    console.log(`💾 最终数据已保存：${finalFilename}`);

    // 生成报告
    console.log('\n📋 最终数据汇报：');
    console.log(`📊 总计景点：${cleanedData.length}个`);

    const finalProvinces = [
      ...new Set(cleanedData.map(spot => spot.prefecture)),
    ];
    console.log(`🗾 覆盖地区：${finalProvinces.join('、')}`);

    const provinceStats = finalProvinces.map(province => {
      const count = cleanedData.filter(
        spot => spot.prefecture === province
      ).length;
      return `${province}(${count}个)`;
    });
    console.log(`📈 地区分布：${provinceStats.join('、')}`);

    console.log('\n🌸 景点列表：');
    cleanedData.forEach((spot, index) => {
      console.log(`  ${index + 1}. ${spot.name} - ${spot.location}`);
      console.log(`     观赏季节：${spot.viewingSeason}`);
      console.log(
        `     人气：想去${spot.wantToVisit}人，去过${spot.haveVisited}人`
      );
    });

    return {
      finalData: cleanedData,
      filename: finalFilename,
      dataSource: dataSource,
      outputPath: outputPath,
    };
  } catch (error) {
    console.error('❌ 数据对比过程中出现错误:', error.message);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  compareKoshinetsuHanamiData()
    .then(result => {
      console.log('\n🎊 甲信越花见数据对比完成！');
      console.log(`📁 最终文件：${result.filename}`);
      console.log(`📊 数据来源：${result.dataSource}`);
    })
    .catch(error => {
      console.error('💥 对比失败:', error.message);
      process.exit(1);
    });
}

module.exports = { compareKoshinetsuHanamiData };
