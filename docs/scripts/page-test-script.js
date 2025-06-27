// 日本旅游网站页面测试脚本
const baseUrl = 'http://localhost:3000';

// 定义所有需要测试的页面
const testConfig = {
  regions: ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'],
  activities: ['hanabi', 'matsuri', 'hanami', 'illumination', 'culture', 'momiji'],
  pages: {
    homepage: '/',
    regions: [],
    activityLists: [],
    // 活动详情页面将动态发现
  }
};

// 生成所有页面URL
testConfig.pages.regions = testConfig.regions.map(region => `/${region}`);
testConfig.pages.activityLists = testConfig.regions.flatMap(region => 
  testConfig.activities.map(activity => `/${region}/${activity}`)
);

console.log('页面测试配置:');
console.log('地区页面数量:', testConfig.pages.regions.length);
console.log('活动列表页面数量:', testConfig.pages.activityLists.length);
console.log('总页面数量:', 1 + testConfig.pages.regions.length + testConfig.pages.activityLists.length);

// 测试函数
async function testPageResponse(url) {
  try {
    const response = await fetch(baseUrl + url);
    return {
      url,
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get('content-type'),
      error: null
    };
  } catch (error) {
    return {
      url,
      status: null,
      ok: false,
      contentType: null,
      error: error.message
    };
  }
}

// 主测试流程
async function runPageTests() {
  console.log('\n🚀 开始页面功能测试...\n');
  
  const results = {
    homepage: null,
    regions: [],
    activityLists: [],
    summary: {
      total: 0,
      passed: 0,
      failed: 0
    }
  };

  // 测试首页
  console.log('📍 测试首页...');
  results.homepage = await testPageResponse('/');
  console.log(`   ${results.homepage.ok ? '✅' : '❌'} 首页 - 状态: ${results.homepage.status}`);

  // 测试地区页面
  console.log('\n📍 测试地区页面...');
  for (const regionUrl of testConfig.pages.regions) {
    const result = await testPageResponse(regionUrl);
    results.regions.push(result);
    console.log(`   ${result.ok ? '✅' : '❌'} ${regionUrl} - 状态: ${result.status}`);
  }

  // 测试活动列表页面
  console.log('\n📍 测试活动列表页面...');
  for (const activityUrl of testConfig.pages.activityLists) {
    const result = await testPageResponse(activityUrl);
    results.activityLists.push(result);
    console.log(`   ${result.ok ? '✅' : '❌'} ${activityUrl} - 状态: ${result.status}`);
  }

  // 计算统计信息
  const allResults = [results.homepage, ...results.regions, ...results.activityLists];
  results.summary.total = allResults.length;
  results.summary.passed = allResults.filter(r => r && r.ok).length;
  results.summary.failed = results.summary.total - results.summary.passed;

  // 显示测试总结
  console.log('\n📊 测试结果总结:');
  console.log(`   总页面数: ${results.summary.total}`);
  console.log(`   通过测试: ${results.summary.passed} ✅`);
  console.log(`   失败测试: ${results.summary.failed} ❌`);
  console.log(`   成功率: ${(results.summary.passed / results.summary.total * 100).toFixed(1)}%`);

  return results;
}

// 导出测试函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runPageTests, testConfig };
} else {
  // 在浏览器中直接运行
  runPageTests();
} 