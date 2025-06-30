/**
 * 测试完整的文本解析+保存功能
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

async function testFullImport() {
  try {
    console.log('🧪 测试完整的文本解析+保存功能...\n');
    
    // 第一步：解析预览
    console.log('📝 第一步：解析预览');
    const previewResponse = await fetch(`http://localhost:3001/api/auto-import-hanami?text=${encodeURIComponent(testText)}`);
    const previewResult = await previewResponse.json();
    
    if (!previewResponse.ok || !previewResult.success) {
      console.log('❌ 解析失败:', previewResult.error);
      return;
    }
    
    console.log('✅ 解析成功!');
    console.log('解析结果预览:');
    console.log('- 名称:', previewResult.parsed.name);
    console.log('- 所在地:', previewResult.parsed.address);
    console.log('- 開催期間:', previewResult.parsed.period);
    console.log('- 開催場所:', previewResult.parsed.venue);
    console.log('- 主催:', previewResult.parsed.organizer);
    console.log('- 料金:', previewResult.parsed.price);
    console.log('- 問合せ先:', previewResult.parsed.contact);
    console.log('- ホームページ:', previewResult.parsed.website);
    console.log('- 谷歌地图:', previewResult.parsed.googleMaps);
    
    console.log('\n' + '='.repeat(50));
    
    // 第二步：保存数据
    console.log('\n💾 第二步：保存到数据库');
    const saveResponse = await fetch('http://localhost:3001/api/auto-import-hanami', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: testText,
        action: 'create'
      })
    });
    
    const saveResult = await saveResponse.json();
    
    if (saveResponse.ok && saveResult.success) {
      console.log('✅ 保存成功!');
      console.log('操作类型:', saveResult.operationType);
      console.log('记录ID:', saveResult.data?.id);
      console.log('消息:', saveResult.message);
      
      console.log('\n🔍 第三步：验证保存结果');
      // 验证数据是否正确保存
      const { PrismaClient } = require('../src/generated/prisma');
      const prisma = new PrismaClient();
      
      const savedEvent = await prisma.hanamiEvent.findFirst({
        where: { name: '葛飾納涼花火大会' }
      });
      
      if (savedEvent) {
        console.log('✅ 数据库验证成功!');
        console.log('保存的数据:');
        console.log('- ID:', savedEvent.id);
        console.log('- 名称:', savedEvent.name);
        console.log('- 地址:', savedEvent.address);
        console.log('- 时间:', savedEvent.datetime);
        console.log('- 场地:', savedEvent.venue);
        console.log('- 交通:', savedEvent.access);
        console.log('- 主办方:', savedEvent.organizer);
        console.log('- 价格:', savedEvent.price);
        console.log('- 联系方式:', savedEvent.contact);
        console.log('- 网站:', savedEvent.website);
        console.log('- 谷歌地图:', savedEvent.googleMap);
        console.log('- 地区:', savedEvent.region);
        console.log('- 已验证:', savedEvent.verified);
      } else {
        console.log('❌ 数据库验证失败：未找到保存的记录');
      }
      
      await prisma.$disconnect();
      
    } else {
      console.log('❌ 保存失败!');
      console.log('错误:', saveResult.error);
    }
    
  } catch (error) {
    console.error('\n💥 测试异常:', error.message);
  }
}

// 运行测试
testFullImport(); 