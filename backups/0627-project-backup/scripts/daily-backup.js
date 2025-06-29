const fs = require('fs');
const path = require('path');

function createDailyBackup() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const backupDir = 'backups';
  const sourceDb = 'prisma/dev.db';
  const backupFile = `${backupDir}/dev-${today}.db`;
  
  // 确保备份目录存在
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // 复制数据库文件
  if (fs.existsSync(sourceDb)) {
    fs.copyFileSync(sourceDb, backupFile);
    console.log(`✅ 数据库已备份到: ${backupFile}`);
    
    // 保留最近7天的备份
    cleanOldBackups(backupDir);
  } else {
    console.log('❌ 源数据库文件不存在');
  }
}

function cleanOldBackups(backupDir) {
  const files = fs.readdirSync(backupDir);
  const dbFiles = files.filter(file => file.startsWith('dev-') && file.endsWith('.db'));
  
  if (dbFiles.length > 7) {
    // 按时间排序，删除最旧的文件
    dbFiles.sort();
    const filesToDelete = dbFiles.slice(0, dbFiles.length - 7);
    
    filesToDelete.forEach(file => {
      fs.unlinkSync(path.join(backupDir, file));
      console.log(`🗑️ 删除旧备份: ${file}`);
    });
  }
}

// 运行备份
createDailyBackup(); 