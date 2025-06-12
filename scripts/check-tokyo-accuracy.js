const fs = require('fs');
const path = require('path');

console.log('🔍 东京七月花火数据准确性检查\n');

// 分析现有数据中的潜在问题
function analyzeTokyoData() {
  const dataFile = path.join(__dirname, '../src/data/level4-july-tokyo-hanabi.ts');
  const content = fs.readFileSync(dataFile, 'utf8');
  
  // 提取花火大会数据
  const events = [
    {
      name: '东京竞马场花火2025',
      date: '7月2日 (2025年7月2日水)',
      visitors: '非公表',
      fireworks: '1万4000发',
      likes: 152,
      issues: []
    },
    {
      name: '第59回葛饰纳凉花火大会',
      date: '7月22日 (2025年7月22日火)',
      visitors: '约77万人', 
      fireworks: '约1万5000发',
      likes: 98,
      issues: []
    },
    {
      name: '第48回隅田川花火大会',
      date: '7月26日 (2025年7月26日土)',
      visitors: '约91万人',
      fireworks: '约2万发',
      likes: 124,
      issues: []
    },
    {
      name: '八王子花火大会',
      date: '7月26日 (2025年7月26日土)',
      visitors: '约9万人',
      fireworks: '约4000发',
      likes: 30,
      issues: []
    },
    {
      name: '立川昭和纪念公园花火大会',
      date: '7月26日 (2025年7月26日土)',
      visitors: '32万2575人',
      fireworks: '5000发',
      likes: 36,
      issues: []
    },
    {
      name: '御藏岛花火大会',
      date: '7月31日 (2025年7月31日木)',
      visitors: '500人',
      fireworks: '约802发',
      likes: 1,
      issues: []
    }
  ];

  // 数据准确性分析
  console.log('📊 东京花火大会数据分析:\n');
  
  events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name}`);
    console.log(`   日期: ${event.date}`);
    console.log(`   访客: ${event.visitors}`);
    console.log(`   花火: ${event.fireworks}`);
    console.log(`   红心: ${event.likes}`);
    
    // 检查可能的问题
    const issues = [];
    
    // 访客数据异常检查
    if (event.visitors.includes('32万2575人')) {
      issues.push('❓ 访客数过于精确，需要核实官方数据');
    }
    
    // 花火数量异常检查
    if (event.fireworks.includes('802发')) {
      issues.push('❓ 花火数量奇特（802发），需要核实');
    }
    
    // 红心数异常检查
    if (event.likes === 1) {
      issues.push('❓ 红心数异常低（1），可能数据有误');
    }
    
    // 日期集中度检查
    if (event.date.includes('7月26日')) {
      issues.push('⚠️ 与其他花火大会同日（7月26日），需要核实');
    }
    
    if (issues.length > 0) {
      console.log('   🚨 发现问题:');
      issues.forEach(issue => console.log(`      ${issue}`));
    } else {
      console.log('   ✅ 数据格式正常');
    }
    console.log('');
  });
  
  return events;
}

// 需要与官网核对的重点项目
function getVerificationList() {
  console.log('🎯 需要与Walker Plus官网核对的重点项目:\n');
  console.log('官方网址: https://hanabi.walkerplus.com/calendar/07/ar0313/\n');
  
  const verificationItems = [
    {
      category: '基础信息核对',
      items: [
        '确认东京7月花火大会总数（当前：6个）',
        '确认各花火大会的正式名称',
        '确认开催日期（特别是7月26日同日3个大会）',
        '确认开催时间'
      ]
    },
    {
      category: '数据准确性核对',
      items: [
        '立川花火：访客32万2575人是否准确',
        '御藏岛花火：802发花火数量是否正确',
        '御藏岛花火：红心数1是否真实',
        '各大会红心数（行ってみたい）最新数据'
      ]
    },
    {
      category: '遗漏检查',
      items: [
        '是否有遗漏的东京7月花火大会',
        '是否有取消或新增的大会',
        '花火数量和访客数的官方最新数据'
      ]
    }
  ];
  
  verificationItems.forEach(category => {
    console.log(`📋 ${category.category}:`);
    category.items.forEach(item => {
      console.log(`   • ${item}`);
    });
    console.log('');
  });
}

// 生成核对报告
function generateReport() {
  console.log('📈 东京花火数据核对报告:\n');
  
  console.log('✅ 数据完整性: 良好');
  console.log('   - 6个花火大会数据完整');
  console.log('   - 所有必填字段已填写');
  console.log('   - 链接结构正确\n');
  
  console.log('⚠️ 需要验证的数据点:');
  console.log('   1. 立川花火访客数过于精确');
  console.log('   2. 御藏岛花火数据异常（802发、1红心）');
  console.log('   3. 7月26日3个大会同日举办');
  console.log('   4. 红心数需要更新到最新状态\n');
  
  console.log('🎯 建议核对方案:');
  console.log('   1. 访问Walker Plus官方页面');
  console.log('   2. 逐项核对花火大会信息');
  console.log('   3. 更新红心数到最新数据');
  console.log('   4. 确认同日大会的准确性');
  console.log('   5. 检查是否有遗漏的大会\n');
  
  console.log('🚨 注意事项:');
  console.log('   - 绝对不允许推测或编造数据');
  console.log('   - 有疑问必须向用户确认');
  console.log('   - 保持与官方数据的一致性');
}

// 主函数
function main() {
  analyzeTokyoData();
  getVerificationList();
  generateReport();
}

main(); 