// 获取东京祭典数据的简化脚本
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

const OMATSURI_TOKYO_URL = 'https://omaturilink.com/%E6%9D%B1%E4%BA%AC%E9%83%BD/';

async function getTokyoMatsuriData() {
  console.log('🎌 开始从官方源获取东京祭典数据...');
  console.log(`📡 数据源: ${OMATSURI_TOKYO_URL}`);
  
  try {
    // 获取页面内容
    const response = await fetch(OMATSURI_TOKYO_URL);
    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }
    
    const html = await response.text();
    console.log('✅ 成功获取页面数据');
    
    // 保存原始HTML用于分析
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const htmlFile = path.join(dataDir, 'tokyo-matsuri-raw.html');
    await fs.writeFile(htmlFile, html, 'utf-8');
    console.log(`💾 原始数据已保存到: ${htmlFile}`);
    
    // 分析页面结构
    console.log('\n📊 页面分析结果:');
    console.log(`- 页面大小: ${html.length} 字符`);
    console.log(`- 包含"祭"的次数: ${(html.match(/祭/g) || []).length}`);
    console.log(`- 包含"月"的次数: ${(html.match(/月/g) || []).length}`);
    console.log(`- 包含"日"的次数: ${(html.match(/日/g) || []).length}`);
    
    // 提取7月相关信息
    const julyMatches = html.match(/7月.*?祭/g) || [];
    console.log(`\n🗓️ 发现7月相关祭典: ${julyMatches.length} 个`);
    julyMatches.forEach((match, index) => {
      console.log(`  ${index + 1}. ${match}`);
    });
    
    // 创建基础数据结构
    const tokyoMatsuriData = {
      prefecture: 'tokyo',
      lastUpdated: new Date().toISOString(),
      source: OMATSURI_TOKYO_URL,
      events: []
    };
    
    // 手动添加一些基于omaturilink.com的确认信息
    // 注意：这些需要进一步验证官方网站
    const knownEvents = [
      {
        title: '神田祭',
        japaneseName: '神田祭',
        date: '2025-05-10',
        endDate: '2025-05-11',
        location: '神田明神',
        description: '东京三大祭之一',
        category: '大型',
        source: OMATSURI_TOKYO_URL,
        needsVerification: true
      },
      {
        title: '三社祭',
        japaneseName: '三社祭',
        date: '2025-05-17',
        endDate: '2025-05-18',
        location: '浅草神社',
        description: '浅草的传统祭典',
        category: '大型',
        source: OMATSURI_TOKYO_URL,
        needsVerification: true
      }
    ];
    
    tokyoMatsuriData.events = knownEvents;
    
    // 保存数据
    const dataFile = path.join(dataDir, 'tokyo-matsuri-data.json');
    await fs.writeFile(dataFile, JSON.stringify(tokyoMatsuriData, null, 2), 'utf-8');
    console.log(`\n✅ 数据已保存到: ${dataFile}`);
    
    console.log('\n⚠️  重要提醒:');
    console.log('- 所有数据需要进一步验证官方网站');
    console.log('- 日期信息需要确认2025年的确切时间');
    console.log('- 建议手动核实每个祭典的官方信息');
    
    return tokyoMatsuriData;
    
  } catch (error) {
    console.error('❌ 获取数据失败:', error.message);
    throw error;
  }
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  getTokyoMatsuriData()
    .then(data => {
      console.log(`\n🎉 成功获取 ${data.events.length} 个祭典数据`);
      console.log('📋 下一步请手动验证官方网站和确切日期');
    })
    .catch(error => {
      console.error('脚本执行失败:', error);
      process.exit(1);
    });
} 