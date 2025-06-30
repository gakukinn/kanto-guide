const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function migrateRegionField() {
  console.log('🔄 开始迁移region字段到前面...');
  console.log('================================');
  
  try {
    // 活动表列表
    const tables = [
      { name: 'hanabi_events', model: 'hanabiEvent' },
      { name: 'matsuri_events', model: 'matsuriEvent' },
      { name: 'hanami_events', model: 'hanamiEvent' },
      { name: 'momiji_events', model: 'momijiEvent' },
      { name: 'illumination_events', model: 'illuminationEvent' },
      { name: 'culture_events', model: 'cultureEvent' }
    ];
    
    for (const table of tables) {
      console.log(`\n📋 处理 ${table.name}...`);
      
      // 1. 创建临时表
      const createTempTableSQL = `
        CREATE TABLE ${table.name}_temp (
          id TEXT PRIMARY KEY,
          region TEXT NOT NULL,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          datetime TEXT NOT NULL,
          venue TEXT NOT NULL,
          access TEXT NOT NULL,
          organizer TEXT NOT NULL,
          price TEXT NOT NULL,
          contact TEXT NOT NULL,
          website TEXT NOT NULL,
          googleMap TEXT NOT NULL,
          detailLink TEXT,
          regionId TEXT NOT NULL,
          verified BOOLEAN NOT NULL DEFAULT false,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL,
          FOREIGN KEY (regionId) REFERENCES regions (id) ON DELETE RESTRICT ON UPDATE CASCADE
        )
      `;
      
      await prisma.$executeRawUnsafe(createTempTableSQL);
      console.log(`   ✅ 创建临时表 ${table.name}_temp`);
      
      // 2. 复制数据到临时表
      const copyDataSQL = `
        INSERT INTO ${table.name}_temp 
        (id, region, name, address, datetime, venue, access, organizer, price, contact, website, googleMap, detailLink, regionId, verified, createdAt, updatedAt)
        SELECT id, region, name, address, datetime, venue, access, organizer, price, contact, website, googleMap, detailLink, regionId, verified, createdAt, updatedAt
        FROM ${table.name}
      `;
      
      await prisma.$executeRawUnsafe(copyDataSQL);
      console.log(`   ✅ 复制数据到临时表`);
      
      // 3. 删除原表
      await prisma.$executeRawUnsafe(`DROP TABLE ${table.name}`);
      console.log(`   ✅ 删除原表 ${table.name}`);
      
      // 4. 重命名临时表
      await prisma.$executeRawUnsafe(`ALTER TABLE ${table.name}_temp RENAME TO ${table.name}`);
      console.log(`   ✅ 重命名临时表为 ${table.name}`);
      
      // 5. 重新创建索引
      await prisma.$executeRawUnsafe(`CREATE INDEX ${table.name}_regionId_idx ON ${table.name}(regionId)`);
      console.log(`   ✅ 重新创建索引`);
    }
    
    console.log('\n🎉 region字段迁移完成！');
    console.log('现在所有表的region字段都在第2位（id之后）');
    
  } catch (error) {
    console.error('❌ 迁移失败:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrateRegionField(); 