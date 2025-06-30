const { PrismaClient } = require('../src/generated/prisma');

async function findWithDescription() {
  const prisma = new PrismaClient();
  
  try {
    const eventWithDesc = await prisma.hanabiEvent.findFirst({
      where: {
        description: {
          not: null,
          not: ''
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        region: true
      }
    });
    
    if (eventWithDesc) {
      console.log('✅ 找到有描述的记录:');
      console.log('ID:', eventWithDesc.id);
      console.log('名称:', eventWithDesc.name);
      console.log('地区:', eventWithDesc.region);
      console.log('描述预览:', eventWithDesc.description.substring(0, 200) + '...');
      console.log('\n这个记录可以用来测试模板是否正确显示描述');
    } else {
      console.log('❌ 没有找到任何有描述的记录');
      console.log('需要先为数据库记录添加description内容');
    }
    
  } catch (error) {
    console.error('错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findWithDescription(); 