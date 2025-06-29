const axios = require('axios');

// 配置
const BASE_URL = 'http://localhost:3001';
const regions = ['tokyo', 'kanagawa', 'chiba', 'saitama', 'kitakanto', 'koshinetsu'];
const activities = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

async function testAPI(endpoint, description) {
  try {
    console.log(`🧪 测试: ${description}`);
    console.log(`   URL: ${endpoint}`);
    
    const response = await axios.get(endpoint, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (response.status === 200) {
      const data = response.data;
      if (data && typeof data === 'object') {
        console.log(`   ✅ 成功 - 状态: ${response.status}`);
        console.log(`   📊 数据类型: ${typeof data}`);
        if (data.events && Array.isArray(data.events)) {
          console.log(`   📋 活动数量: ${data.events.length}`);
        } else if (data.data && Array.isArray(data.data)) {
          console.log(`   📋 活动数量: ${data.data.length}`);
        } else if (data.total !== undefined) {
          console.log(`   📋 总数: ${data.total}`);
        }
        return { success: true, status: response.status, data: data };
      } else {
        console.log(`   ⚠️  警告 - 返回非JSON数据`);
        return { success: false, status: response.status, error: 'Non-JSON response' };
      }
    } else {
      console.log(`   ❌ 失败 - 状态: ${response.status}`);
      return { success: false, status: response.status, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log(`   ❌ 连接拒绝 - 服务器未运行`);
      return { success: false, error: 'Server not running' };
    } else if (error.response) {
      console.log(`   ❌ HTTP错误 - 状态: ${error.response.status}`);
      return { success: false, status: error.response.status, error: error.response.statusText };
    } else {
      console.log(`   ❌ 网络错误: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  console.log('');
}

async function runAllTests() {
  console.log('🚀 开始API测试...\n');
  
  const results = [];
  let successCount = 0;
  let totalCount = 0;

  // 测试花火API（每个地区单独的路由）
  console.log('=== 花火API测试 ===');
  for (const region of regions) {
    const endpoint = `${BASE_URL}/api/hanabi/${region}`;
    const description = `${region}地区花火API`;
    const result = await testAPI(endpoint, description);
    results.push({ type: 'hanabi', region, ...result });
    totalCount++;
    if (result.success) successCount++;
  }

  // 测试其他活动API（动态路由）
  console.log('\n=== 其他活动API测试 ===');
  for (const activity of activities.filter(a => a !== 'hanabi')) {
    for (const region of regions) {
      const endpoint = `${BASE_URL}/api/${activity}/${region}`;
      const description = `${region}地区${activity}API`;
      const result = await testAPI(endpoint, description);
      results.push({ type: activity, region, ...result });
      totalCount++;
      if (result.success) successCount++;
    }
  }

  // 总结报告
  console.log('\n📊 测试总结报告');
  console.log('='.repeat(50));
  console.log(`总测试数: ${totalCount}`);
  console.log(`成功: ${successCount}`);
  console.log(`失败: ${totalCount - successCount}`);
  console.log(`成功率: ${(successCount / totalCount * 100).toFixed(1)}%`);

  // 失败详情
  const failures = results.filter(r => !r.success);
  if (failures.length > 0) {
    console.log('\n❌ 失败的API:');
    failures.forEach(failure => {
      console.log(`   ${failure.type}/${failure.region}: ${failure.error || failure.status}`);
    });
  }

  // 成功详情
  const successes = results.filter(r => r.success);
  if (successes.length > 0) {
    console.log('\n✅ 成功的API:');
    successes.forEach(success => {
      const dataInfo = success.data?.events?.length || success.data?.data?.length || success.data?.total || '未知';
      console.log(`   ${success.type}/${success.region}: ${dataInfo}条记录`);
    });
  }

  return results;
}

// 运行测试
if (require.main === module) {
  runAllTests()
    .then(() => {
      console.log('\n🏁 API测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试过程中发生错误:', error);
      process.exit(1);
    });
}

module.exports = { testAPI, runAllTests }; 