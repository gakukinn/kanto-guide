import fs from 'fs';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const DATABASE_PATH = 'data/databases/joso-kinugawa-hanabi-2025-updated.db';
const CRAWLED_DATA_PATH =
  'data/scraped-hanabi/joso-kinugawa-hanabi-2025-crawled.json';

async function createAndUpdateDatabase() {
  try {
    console.log('🔄 创建并更新常總きぬ川花火大会数据库...');

    // 读取爬取的数据
    const crawledData = JSON.parse(fs.readFileSync(CRAWLED_DATA_PATH, 'utf8'));
    const eventData = crawledData.eventData;

    // 删除旧数据库文件（如果存在）
    if (fs.existsSync(DATABASE_PATH)) {
      fs.unlinkSync(DATABASE_PATH);
    }

    // 打开新数据库连接
    const db = await open({
      filename: DATABASE_PATH,
      driver: sqlite3.Database,
    });

    // 创建主要事件表
    await db.exec(`
      CREATE TABLE hanabi_events (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        japanese_name TEXT,
        english_name TEXT,
        date TEXT NOT NULL,
        display_date TEXT,
        time TEXT,
        duration TEXT,
        venue TEXT,
        location TEXT,
        fireworks_count TEXT,
        expected_visitors TEXT,
        established INTEGER,
        history TEXT,
        weather_policy TEXT,
        organizer TEXT,
        phone TEXT,
        website TEXT,
        walker_plus_url TEXT,
        crawl_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 创建票务信息表
    await db.exec(`
      CREATE TABLE ticket_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT,
        ticket_type TEXT,
        price TEXT,
        FOREIGN KEY (event_id) REFERENCES hanabi_events (id)
      )
    `);

    // 创建交通信息表
    await db.exec(`
      CREATE TABLE access_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT,
        access_type TEXT,
        description TEXT,
        FOREIGN KEY (event_id) REFERENCES hanabi_events (id)
      )
    `);

    // 创建亮点信息表
    await db.exec(`
      CREATE TABLE highlights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT,
        highlight TEXT,
        FOREIGN KEY (event_id) REFERENCES hanabi_events (id)
      )
    `);

    // 插入主要事件数据
    await db.run(
      `
      INSERT INTO hanabi_events (
        id, name, japanese_name, english_name, date, display_date,
        time, duration, venue, location, fireworks_count, expected_visitors,
        established, history, weather_policy, organizer, phone, website,
        walker_plus_url, crawl_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        eventData.id,
        eventData.name,
        eventData.japaneseName,
        eventData.englishName,
        eventData.date,
        eventData.displayDate,
        eventData.time,
        eventData.duration,
        eventData.venue,
        eventData.location,
        eventData.fireworksCount,
        eventData.expectedVisitors,
        eventData.established,
        eventData.history,
        eventData.weatherPolicy,
        eventData.contact.organizer,
        eventData.contact.phone,
        eventData.contact.website,
        crawledData.crawlInfo.url,
        crawledData.crawlInfo.crawlDate,
      ]
    );

    // 插入票务信息
    for (const [ticketType, price] of Object.entries(eventData.ticketInfo)) {
      if (ticketType !== '販売期間') {
        await db.run(
          `
          INSERT INTO ticket_info (event_id, ticket_type, price)
          VALUES (?, ?, ?)
        `,
          [eventData.id, ticketType, price]
        );
      }
    }

    // 插入交通信息
    await db.run(
      `
      INSERT INTO access_info (event_id, access_type, description)
      VALUES (?, ?, ?)
    `,
      [eventData.id, 'train', eventData.access.train]
    );

    await db.run(
      `
      INSERT INTO access_info (event_id, access_type, description)
      VALUES (?, ?, ?)
    `,
      [eventData.id, 'car', eventData.access.car]
    );

    await db.run(
      `
      INSERT INTO access_info (event_id, access_type, description)
      VALUES (?, ?, ?)
    `,
      [
        eventData.id,
        'parking',
        `${eventData.access.parking.capacity}、${eventData.access.parking.fee}`,
      ]
    );

    // 插入亮点信息
    for (const highlight of eventData.highlights) {
      await db.run(
        `
        INSERT INTO highlights (event_id, highlight)
        VALUES (?, ?)
      `,
        [eventData.id, highlight]
      );
    }

    // 验证数据插入
    const eventCount = await db.get(
      'SELECT COUNT(*) as count FROM hanabi_events'
    );
    const ticketCount = await db.get(
      'SELECT COUNT(*) as count FROM ticket_info'
    );
    const accessCount = await db.get(
      'SELECT COUNT(*) as count FROM access_info'
    );
    const highlightCount = await db.get(
      'SELECT COUNT(*) as count FROM highlights'
    );

    // 关闭数据库连接
    await db.close();

    console.log('✅ 数据库创建和更新完成！');
    console.log(`📊 事件ID: ${eventData.id}`);
    console.log(`📅 日期: ${eventData.displayDate}`);
    console.log(`🎆 花火数: ${eventData.fireworksCount}`);
    console.log(`👥 预计观众: ${eventData.expectedVisitors}`);
    console.log(`🏢 主办方: ${eventData.contact.organizer}`);
    console.log(`\n📈 数据统计:`);
    console.log(`   - 事件记录: ${eventCount.count}`);
    console.log(`   - 票务信息: ${ticketCount.count}`);
    console.log(`   - 交通信息: ${accessCount.count}`);
    console.log(`   - 亮点信息: ${highlightCount.count}`);
    console.log(`\n💾 数据库文件: ${DATABASE_PATH}`);
  } catch (error) {
    console.error('❌ 数据库创建失败:', error);
    throw error;
  }
}

// 运行更新
createAndUpdateDatabase().catch(console.error);
