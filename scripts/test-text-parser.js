/**
 * 测试文本解析功能
 * 使用用户提供的示例数据
 */

const testText = `名称	葛飾納涼花火大会（かつしかのうりょうはなびたいかい）
所在地	〒125 - 0052　東京都葛飾区柴又7-17-13地先
開催期間	2025年7月22日　 打上時間/19:20～20:20　※雨天決行（荒天中止）
開催場所	東京都　柴又野球場（江戸川河川敷）
交通アクセス	京成金町線「柴又駅」から徒歩10分、または北総鉄道北総線「新柴又駅」から徒歩15分、またはＪＲ常磐線・地下鉄千代田線「金町駅」もしくは京成金町線「京成金町駅」から徒歩20分
主催	葛飾納涼花火大会実行委員会（葛飾区、一般社団法人葛飾区観光協会）
料金	有料観覧席あり
問合せ先	葛飾区コールセンター（はなしょうぶコール）　03-6758-2222
ホームページ	https://www.city.katsushika.lg.jp/tourism/1000064/1000065/1031830.html
谷歌地图位置	https://maps.google.com/example`;

async function testTextParser() {
  try {
    console.log('🧪 测试文本解析功能...\n');
    console.log('测试文本:');
    console.log(testText);
    console.log('\n' + '='.repeat(50) + '\n');
    
    const response = await fetch(`http://localhost:3001/api/auto-import-hanami?text=${encodeURIComponent(testText)}`);
    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ 解析成功!');
      console.log('\n解析结果:');
      console.log('名称:', result.parsed.name || '未解析到');
      console.log('所在地:', result.parsed.address || '未解析到');
      console.log('開催期間:', result.parsed.period || '未解析到');
      console.log('開催場所:', result.parsed.venue || '未解析到');
      console.log('交通アクセス:', result.parsed.access || '未解析到');
      console.log('主催:', result.parsed.organizer || '未解析到');
      console.log('料金:', result.parsed.price || '未解析到');
      console.log('問合せ先:', result.parsed.contact || '未解析到');
      console.log('ホームページ:', result.parsed.website || '未解析到');
      console.log('谷歌地图:', result.parsed.googleMaps || '未解析到');
      
      // 检查解析完整度
      const fields = ['name', 'address', 'period', 'venue', 'access', 'organizer', 'price', 'contact', 'website', 'googleMaps'];
      const parsedFields = fields.filter(field => result.parsed[field]);
      console.log(`\n📊 解析完整度: ${parsedFields.length}/${fields.length} (${Math.round(parsedFields.length/fields.length*100)}%)`);
      
    } else {
      console.log('\n❌ 解析失败!');
      console.log('错误:', result.error);
    }
    
  } catch (error) {
    console.error('\n💥 测试异常:', error.message);
  }
}

// 运行测试
testTextParser(); 