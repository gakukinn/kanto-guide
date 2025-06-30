const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function addTestData() {
  try {
    console.log('开始添加测试数据...');

    // 1. 确保地区存在
    let tokyoRegion = await prisma.region.findFirst({
      where: { code: 'tokyo' }
    });

    if (!tokyoRegion) {
      tokyoRegion = await prisma.region.create({
        data: {
          code: 'tokyo',
          nameCn: '东京都',
          nameJp: '東京都'
        }
      });
    }

    // 2. 添加测试活动数据
    const testEvent = await prisma.matsuriEvent.create({
      data: {
        name: '雪の大谷ウォーク（ゆきのおおたにウォーク）',
        address: '〒930-1414 富山県立山町室堂',
        datetime: '2025年4月15日～11月30日',
        venue: '立山黒部アルペンルート室堂',
        access: 'JR富山駅から立山駅へ、そこから立山黒部アルペンルートで室堂へ',
        organizer: '立山黒部貫光株式会社',
        price: '大人 往復8,690円',
        contact: '076-431-3331',
        website: 'https://www.alpen-route.com/',
        googleMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d137.59208!3d36.57444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM0JzI4LjAiTiAxMzfCsDM1JzMxLjUiRQ!5e0!3m2!1sja!2sjp!4v1000000000000!5m2!1sja!2sjp',
        region: 'koshinetsu',
        regionId: tokyoRegion.id, // 临时使用tokyo的ID
        verified: true
      }
    });

    console.log('测试数据添加成功！');
    console.log('活动ID:', testEvent.id);
    console.log('活动名称:', testEvent.name);

    // 3. 添加第二个相似的测试数据
    const similarEvent = await prisma.matsuriEvent.create({
      data: {
        name: '雪の大谷ウォーク',
        address: '富山県立山町室堂',
        datetime: '2025年4月15日-11月30日',
        venue: '立山室堂',
        access: 'JR富山駅から立山駅へ',
        organizer: '立山黒部貫光',
        price: '大人往復8,690円',
        contact: '076-431-3331',
        website: 'https://www.alpen-route.com/',
        googleMap: 'https://maps.google.com/example',
        region: 'koshinetsu',
        regionId: tokyoRegion.id,
        verified: true
      }
    });

    console.log('第二个相似测试数据添加成功！');
    console.log('活动ID:', similarEvent.id);
    console.log('活动名称:', similarEvent.name);

    console.log('\n现在可以测试重复数据检查功能了！');
    console.log('测试方法：输入类似的活动信息，系统应该会检测到重复并显示选择对话框');

  } catch (error) {
    console.error('添加测试数据失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestData(); 