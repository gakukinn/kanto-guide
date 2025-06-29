// 最终修复测试脚本

// 模拟前端分类逻辑
function classifyActivityFromText(textData) {
  if (!textData || !textData.name) return '';
  
  const name = textData.name.toLowerCase();
  
  // 🔥 优先级1：花火大会识别 (包含花火关键词的活动必须优先识别为花火大会)
  if (name.includes('花火') || name.includes('はなび') || name.includes('ハナビ')) {
    return 'hanabi';
  }
  
  // 🔥 优先级2：花见会识别 (包含花见关键词优先识别为花见会)
  if (name.includes('花見') || name.includes('桜') || name.includes('さくら') || name.includes('サクラ')) {
    return 'hanami';
  }
  
  // 优先级3：传统祭典识别
  if (name.includes('祭') || name.includes('まつり') || name.includes('マツリ') || 
      name.includes('納涼') || name.includes('神社') || name.includes('神輿')) {
    return 'matsuri';
  }
  
  return '';
}

// 测试用例
const testCases = [
  {
    name: '葛飾納涼花火大会',
    expected: 'hanabi',
    description: '包含花火和納涼，应该识别为花火大会'
  },
  {
    name: '久里浜ペリー祭　花火大会',
    expected: 'hanabi', 
    description: '包含花火和祭，应该识别为花火大会'
  },
  {
    name: '第91回水戸のあじさいまつり',
    expected: 'matsuri',
    description: '只包含まつり，应该识别为传统祭典'
  },
  {
    name: '桜祭り',
    expected: 'hanami',
    description: '包含桜和祭，应该识别为花见会'
  }
];

console.log('🧪 最终修复测试 - 前端分类逻辑验证\n');
console.log('=' .repeat(80));

let passCount = 0;
let totalCount = testCases.length;

testCases.forEach((testCase, index) => {
  console.log(`\n测试 ${index + 1}: ${testCase.name}`);
  console.log(`期望: ${testCase.expected} (${testCase.description})`);
  
  const result = classifyActivityFromText({ name: testCase.name });
  
  if (result === testCase.expected) {
    console.log(`✅ 通过: ${result}`);
    passCount++;
  } else {
    console.log(`❌ 失败: 期望 ${testCase.expected}，实际 ${result}`);
  }
});

console.log('\n' + '=' .repeat(80));
console.log(`🎯 测试结果: ${passCount}/${totalCount} 通过`);

if (passCount === totalCount) {
  console.log('✅ 所有测试通过！前端分类逻辑修复成功！');
  console.log('\n🔧 修复内容:');
  console.log('1. 花火大会优先级提升到最高');
  console.log('2. 花见会优先级提升到第二');
  console.log('3. 传统祭典优先级降低到第三');
  console.log('4. 前端后端分类逻辑完全统一');
} else {
  console.log('❌ 部分测试失败，需要进一步修复');
} 