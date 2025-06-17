/**
 * 花火活动详情页面链接验证脚本 (通用版)
 * 检查所有地区花火活动的谷歌地图和官方连接是否正确
 *
 * 支持地区：东京都、埼玉县、千叶县、神奈川县、北关东、甲信越
 */

import { readFileSync } from 'fs';

// 地区配置 - 直接从页面文件读取数据
const regions = {
  Tokyo: {
    pagePath: 'src/app/tokyo/hanabi/page.tsx',
    nameInTitle: '东京',
  },
  Saitama: {
    pagePath: 'src/app/saitama/hanabi/page.tsx',
    nameInTitle: '埼玉',
  },
  Chiba: {
    pagePath: 'src/app/chiba/hanabi/page.tsx',
    nameInTitle: '千叶',
  },
  Kanagawa: {
    pagePath: 'src/app/kanagawa/hanabi/page.tsx',
    nameInTitle: '神奈川',
  },
  Kitakanto: {
    pagePath: 'src/app/kitakanto/hanabi/page.tsx',
    nameInTitle: '北关东',
  },
  Koshinetsu: {
    pagePath: 'src/app/koshinetsu/hanabi/page.tsx',
    nameInTitle: '甲信越',
  },
};

/**
 * 从页面文件中提取活动数据
 */
function extractEventsFromPage(pagePath) {
  try {
    const content = readFileSync(pagePath, 'utf-8');

    // 从title中提取活动数量
    const titleMatch = content.match(/title:\s*'[^']+?(\d+)场[^']*'/);
    const declaredCount = titleMatch ? parseInt(titleMatch[1]) : 0;

    // 从events数组中提取实际数据
    const eventsArrayMatch = content.match(
      /const\s+\w+HanabiEvents\s*=\s*\[([\s\S]*?)\];/
    );
    if (!eventsArrayMatch) {
      console.warn(`无法在 ${pagePath} 中找到事件数组`);
      return { events: [], declaredCount };
    }

    const eventsString = eventsArrayMatch[1];

    // 解析每个事件对象
    const events = [];
    const eventMatches =
      eventsString.match(/\{[^}]*id:\s*'[^']*'[^}]*\}/g) || [];

    for (const eventMatch of eventMatches) {
      try {
        // 提取基本信息
        const idMatch = eventMatch.match(/id:\s*'([^']*)'/);
        const nameMatch = eventMatch.match(/name:\s*'([^']*)'/);
        const websiteMatch = eventMatch.match(/website:\s*'([^']*)'/);
        const detailLinkMatch = eventMatch.match(/detailLink:\s*'([^']*)'/);

        if (idMatch && nameMatch) {
          const event = {
            id: idMatch[1],
            name: nameMatch[1],
            website: websiteMatch ? websiteMatch[1] : null,
            detailLink: detailLinkMatch ? detailLinkMatch[1] : null,
          };
          events.push(event);
        }
      } catch (error) {
        console.warn(`解析事件时出错: ${error.message}`);
      }
    }

    return { events, declaredCount };
  } catch (error) {
    console.warn(`读取页面文件 ${pagePath} 时出错: ${error.message}`);
    return { events: [], declaredCount: 0 };
  }
}

/**
 * 检查详情页面是否存在mapEmbedUrl
 */
async function checkDetailPageForMap(detailLink) {
  if (!detailLink) return false;

  try {
    // 构建详情页面路径
    const detailPagePath = `src/app${detailLink}/page.tsx`;
    const content = readFileSync(detailPagePath, 'utf-8');

    // 检查是否包含mapEmbedUrl
    return content.includes('mapEmbedUrl');
  } catch (error) {
    // 如果文件不存在或读取失败，返回false
    return false;
  }
}

/**
 * 验证网站URL是否有效
 */
function isValidWebsite(website) {
  if (!website) return false;

  // 排除常见的placeholder网站
  const invalidSites = [
    'https://hanabi.walkerplus.com/',
    'https://walkerplus.com/',
    'https://hanabi.walkerplus.com/detail/',
  ];

  // 检查是否为无效网站
  for (const invalid of invalidSites) {
    if (website.startsWith(invalid)) {
      return false;
    }
  }

  // 检查URL格式
  try {
    new URL(website);
    return true;
  } catch {
    return false;
  }
}

/**
 * 主验证函数
 */
async function validateAllRegions() {
  console.log('='.repeat(80));
  console.log('🎆 关东花火活动Google Maps和官方网站链接验证报告');
  console.log('='.repeat(80));

  let totalEvents = 0;
  let totalMissingMaps = 0;
  let totalInvalidWebsites = 0;
  const results = {};

  for (const [regionName, config] of Object.entries(regions)) {
    console.log(`\n🗾 正在验证 ${regionName} (${config.nameInTitle})`);
    console.log('-'.repeat(50));

    try {
      const { events, declaredCount } = extractEventsFromPage(config.pagePath);
      const actualCount = events.length;

      console.log(`📊 声明活动数量: ${declaredCount}场`);
      console.log(`📊 实际活动数量: ${actualCount}场`);

      if (declaredCount !== actualCount) {
        console.log(
          `⚠️  数量不匹配! 声明${declaredCount}场，实际${actualCount}场`
        );
      }

      let missingMaps = 0;
      let invalidWebsites = 0;

      // 验证每个活动
      for (const event of events) {
        const hasMap = await checkDetailPageForMap(event.detailLink);
        const hasValidWebsite = isValidWebsite(event.website);

        if (!hasMap) {
          missingMaps++;
          console.log(`   ❌ 缺少地图: ${event.name}`);
        }

        if (!hasValidWebsite) {
          invalidWebsites++;
          console.log(
            `   ❌ 无效网站: ${event.name} - ${event.website || '未设置'}`
          );
        }
      }

      // 统计结果
      const validMaps = actualCount - missingMaps;
      const validWebsites = actualCount - invalidWebsites;
      const mapValidRate =
        actualCount > 0 ? ((validMaps / actualCount) * 100).toFixed(1) : '0.0';
      const websiteValidRate =
        actualCount > 0
          ? ((validWebsites / actualCount) * 100).toFixed(1)
          : '0.0';

      console.log(
        `✅ Google Maps: ${validMaps}/${actualCount} (${mapValidRate}%)`
      );
      console.log(
        `✅ 官方网站: ${validWebsites}/${actualCount} (${websiteValidRate}%)`
      );

      if (missingMaps === 0 && invalidWebsites === 0) {
        console.log(`🎯 ${regionName}: 完美! 所有链接都有效`);
      }

      // 记录结果
      results[regionName] = {
        declaredCount,
        actualCount,
        validMaps,
        validWebsites,
        missingMaps,
        invalidWebsites,
        mapValidRate,
        websiteValidRate,
      };

      totalEvents += actualCount;
      totalMissingMaps += missingMaps;
      totalInvalidWebsites += invalidWebsites;
    } catch (error) {
      console.error(`❌ 验证 ${regionName} 时出错: ${error.message}`);
      results[regionName] = {
        error: error.message,
      };
    }
  }

  // 总结报告
  console.log('\n');
  console.log('='.repeat(80));
  console.log('📈 总体验证结果');
  console.log('='.repeat(80));

  console.log(`📊 总活动数量: ${totalEvents}场`);
  console.log(`🗺️  缺少地图的活动: ${totalMissingMaps}场`);
  console.log(`🌐 无效网站的活动: ${totalInvalidWebsites}场`);

  const totalValidMaps = totalEvents - totalMissingMaps;
  const totalValidWebsites = totalEvents - totalInvalidWebsites;
  const overallMapRate =
    totalEvents > 0 ? ((totalValidMaps / totalEvents) * 100).toFixed(1) : '0.0';
  const overallWebsiteRate =
    totalEvents > 0
      ? ((totalValidWebsites / totalEvents) * 100).toFixed(1)
      : '0.0';

  console.log(`✅ 整体Google Maps覆盖率: ${overallMapRate}%`);
  console.log(`✅ 整体官方网站覆盖率: ${overallWebsiteRate}%`);

  // 详细统计表
  console.log('\n📋 详细统计表:');
  console.log(
    '地区'.padEnd(12) +
      '声明'.padEnd(8) +
      '实际'.padEnd(8) +
      'Maps'.padEnd(12) +
      '网站'.padEnd(12)
  );
  console.log('-'.repeat(52));

  for (const [regionName, result] of Object.entries(results)) {
    if (result.error) {
      console.log(`${regionName.padEnd(12)}ERROR: ${result.error}`);
    } else {
      const mapStatus = `${result.validMaps}/${result.actualCount}(${result.mapValidRate}%)`;
      const websiteStatus = `${result.validWebsites}/${result.actualCount}(${result.websiteValidRate}%)`;
      console.log(
        regionName.padEnd(12) +
          `${result.declaredCount}场`.padEnd(8) +
          `${result.actualCount}场`.padEnd(8) +
          mapStatus.padEnd(12) +
          websiteStatus.padEnd(12)
      );
    }
  }

  console.log('\n🎯 验证完成！');

  if (totalMissingMaps > 0 || totalInvalidWebsites > 0) {
    console.log('\n📝 建议采取的行动:');
    if (totalMissingMaps > 0) {
      console.log(`- 为 ${totalMissingMaps} 个活动添加mapEmbedUrl字段`);
    }
    if (totalInvalidWebsites > 0) {
      console.log(`- 为 ${totalInvalidWebsites} 个活动更新有效的官方网站链接`);
    }
  }
}

// 执行验证
validateAllRegions().catch(error => {
  console.error('验证过程中发生错误:', error);
  process.exit(1);
});
