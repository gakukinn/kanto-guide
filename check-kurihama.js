const { PrismaClient } = require('./src/generated/prisma');

async function checkKurihamaRecord() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 查找久里浜ペリー祭花火大会记录...');
    
    const records = await prisma.hanabiEvent.findMany({
      where: {
        eventId: 'kurihama-perry-festival-2025'
      }
    });
    
    if (records.length > 0) {
      console.log('✅ 找到记录:', records.length, '条');
      console.log('\n📋 记录详情:');
      records.forEach((record, index) => {
        console.log(`\n记录 ${index + 1}:`);
        console.log(`- ID: ${record.id}`);
        console.log(`- Event ID: ${record.eventId}`);
        console.log(`- 名称: ${record.name}`);
        console.log(`- 日期: ${record.date}`);
        console.log(`- 地点: ${record.location}`);
        console.log(`- 创建时间: ${record.createdAt}`);
      });
    } else {
      console.log('❌ 未找到记录');
      console.log('\n🔍 查找所有包含"kurihama"的记录...');
      
      const kurihamaRecords = await prisma.hanabiEvent.findMany({
        where: {
          OR: [
            { eventId: { contains: 'kurihama' } },
            { name: { contains: 'kurihama' } },
            { name: { contains: '久里浜' } },
            { name: { contains: 'ペリー' } }
          ]
        }
      });
      
      if (kurihamaRecords.length > 0) {
        console.log(`✅ 找到相关记录: ${kurihamaRecords.length} 条`);
        kurihamaRecords.forEach((record, index) => {
          console.log(`${index + 1}. ${record.eventId} - ${record.name}`);
        });
      } else {
        console.log('❌ 未找到任何相关记录');
      }
    }
    
  } catch (error) {
    console.error('❌ 查询出错:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkKurihamaRecord(); 