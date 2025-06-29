// 测试新的优先级顺序：花火、红叶、灯光、花见、祭典、文艺

// 模拟前端分类逻辑
function classifyActivityFromText(textData) {
  if (!textData || !textData.name) return '';
  
  const name = textData.name.toLowerCase();
  
  // 🔥 优先级1：花火大会识别
  if (name.includes('花火') || name.includes('はなび') || name.includes('ハナビ')) {
    return 'hanabi';
  }
  
  // 🔥 优先级2：红叶狩识别
  if (name.includes('紅葉') || name.includes('もみじ') || name.includes('モミジ')) {
    return 'momiji';
  }
  
  // 🔥 优先级3：灯光秀识别
  if (name.includes('イルミネーション') || name.includes('ライトアップ') || name.includes('LED')) {
    return 'illumination';
  }
  
  // 🔥 优先级4：花见会识别
  if (name.includes('花見') || name.includes('桜') || name.includes('さくら') || name.includes('サクラ') ||
      name.includes('あじさい') || name.includes('アジサイ') || name.includes('紫陽花')) {
    return 'hanami';
  }
  
  // 优先级5：传统祭典识别
  if (name.includes('祭') || name.includes('まつり') || name.includes('マツリ') || 
      name.includes('納涼') || name.includes('神社') || name.includes('神輿')) {
    return 'matsuri';
  }
  
  // 优先级6：文化艺术识别
  if (name.includes('文化') || name.includes('芸術') || name.includes('美術') || name.includes('展覧会')) {
    return 'culture';
  }
  
  return '';
}

// 测试用例 - 包含优先级冲突的情况
const testCases = [
  // 花火大会（最高优先级）
  {
    name: '葛飾納涼花火大会',
    expected: 'hanabi',
    description: '包含花火和納涼，花火优先级最高'
  },
  {
    name: '紅葉祭り花火大会',
    expected: 'hanabi',
    description: '包含花火、紅葉、祭，花火优先级最高'
  },
  
  // 红叶狩（第二优先级）
  {
    name: '紅葉祭り',
    expected: 'momiji',
    description: '包含紅葉和祭，红叶优先级高于祭典'
  },
  {
    name: 'もみじライトアップ',
    expected: 'momiji',
    description: '包含もみじ和ライトアップ，红叶优先级高于灯光'
  },
  
  // 灯光秀（第三优先级）
  {
    name: 'イルミネーション祭り',
    expected: 'illumination',
    description: '包含イルミネーション和祭，灯光优先级高于祭典'
  },
  {
    name: '桜ライトアップ',
    expected: 'illumination',
    description: '包含桜和ライトアップ，灯光优先级高于花见'
  },
  
  // 花见会（第四优先级）
  {
    name: '桜祭り',
    expected: 'hanami',
    description: '包含桜和祭，花见优先级高于祭典'
  },
  {
    name: 'あじさい文化祭',
    expected: 'hanami',
    description: '包含あじさい和文化，花见优先级高于文艺'
  },
  
  // 传统祭典（第五优先级）
  {
    name: '神田祭',
    expected: 'matsuri',
    description: '只包含祭，应该识别为传统祭典'
  },
  {
    name: '文化祭',
    expected: 'matsuri',
    description: '包含文化和祭，祭典优先级高于文艺'
  },
  
  // 文化艺术（最低优先级）
  {
    name: '美術展覧会',
    expected: 'culture',
    description: '只包含美術和展覧会，应该识别为文化艺术'
  }
];

console.log('🎯 新优先级顺序测试：花火 > 红叶 > 灯光 > 花见 > 祭典 > 文艺\n');
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
  console.log('✅ 所有测试通过！新优先级顺序设置成功！');
  console.log('\n🏆 优先级排序:');
  console.log('1. 🎆 花火大会 (最高优先级)');
  console.log('2. 🍁 红叶狩');
  console.log('3. 💡 灯光秀');
  console.log('4. 🌸 花见会');
  console.log('5. 🏮 传统祭典');
  console.log('6. 🎨 文化艺术 (最低优先级)');
} else {
  console.log('❌ 部分测试失败，需要进一步调整');
} 