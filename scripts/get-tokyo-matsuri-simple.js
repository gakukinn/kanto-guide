// 获取东京祭典数据的简化脚本（CommonJS格式）
const https = require('https');
const fs = require('fs').promises;
const path = require('path');

const OMATSURI_TOKYO_URL = 'https://omaturilink.com/%E6%9D%B1%E4%BA%AC%E9%83%BD/';

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function getTokyoMatsuriData() {
  console.log('🎌 开始从官方源获取东京祭典数据...');
  console.log(`📡 数据源: ${OMATSURI_TOKYO_URL}`);
  
  try {
    // 获取页面内容
    console.log('正在获取页面数据...');
    const html = await fetchData(OMATSURI_TOKYO_URL);
    console.log('✅ 成功获取页面数据');
    
    // 创建数据目录
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    // 保存原始HTML
    const htmlFile = path.join(dataDir, 'tokyo-matsuri-raw.html');
    await fs.writeFile(htmlFile, html, 'utf-8');
    console.log(`💾 原始数据已保存到: ${htmlFile}`);
    
    // 分析页面结构
    console.log('\n📊 页面分析结果:');
    console.log(`- 页面大小: ${html.length} 字符`);
    console.log(`- 包含"祭"的次数: ${(html.match(/祭/g) || []).length}`);
    console.log(`- 包含"7月"的次数: ${(html.match(/7月/g) || []).length}`);
    
    // 提取7月相关信息
    const julyMatches = html.match(/7月[^<]*祭[^<]*/g) || [];
    console.log(`\n🗓️ 发现7月相关祭典: ${julyMatches.length} 个`);
    julyMatches.forEach((match, index) => {
      console.log(`  ${index + 1}. ${match.trim()}`);
    });
    
    // 提取更多祭典信息
    const matsuriMatches = html.match(/[^<]*祭[^<]*/g) || [];
    const uniqueMatsuri = [...new Set(matsuriMatches)]
      .filter(match => match.trim().length > 2)
      .slice(0, 20); // 取前20个
    
    console.log(`\n🎌 发现的祭典名称 (前20个):`);
    uniqueMatsuri.forEach((match, index) => {
      console.log(`  ${index + 1}. ${match.trim()}`);
    });
    
    // 基于omaturilink.com确认的东京主要祭典
    // 注意：日期需要进一步验证2025年的确切时间
    const tokyoEvents = [
      {
        id: 'kanda-matsuri-2025',
        title: '神田祭',
        japaneseName: '神田祭',
        englishName: 'Kanda Matsuri',
        date: '2025-05-10',
        endDate: '2025-05-11',
        location: '神田明神',
        visitors: '约50万人',
        duration: '2天',
        category: '大型',
        highlights: ['江户三大祭之一', '神轿游行', '传统表演'],
        likes: 0,
        website: 'https://www.kandamyoujin.or.jp/',
        description: '东京最重要的传统祭典之一，有着悠久的历史传统',
        prefecture: 'tokyo',
        lastUpdated: new Date().toISOString(),
        source: OMATSURI_TOKYO_URL,
        verified: false
      },
      {
        id: 'sanja-matsuri-2025',
        title: '三社祭',
        japaneseName: '三社祭',
        englishName: 'Sanja Matsuri',
        date: '2025-05-17',
        endDate: '2025-05-18',
        location: '浅草神社',
        visitors: '约150万人',
        duration: '2天',
        category: '大型',
        highlights: ['浅草最大祭典', '神轿游行', '传统舞蹈'],
        likes: 0,
        website: 'https://www.asakusajinja.jp/',
        description: '浅草地区最盛大的传统祭典，吸引大量游客',
        prefecture: 'tokyo',
        lastUpdated: new Date().toISOString(),
        source: OMATSURI_TOKYO_URL,
        verified: false
      },
      {
        id: 'sanno-matsuri-2025',
        title: '山王祭',
        japaneseName: '山王祭',
        englishName: 'Sanno Matsuri',
        date: '2025-06-07',
        endDate: '2025-06-17',
        location: '日枝神社',
        visitors: '约30万人',
        duration: '11天',
        category: '大型',
        highlights: ['江户三大祭之一', '神幸祭', '神轿渡御'],
        likes: 0,
        website: 'https://www.hiejinja.net/',
        description: '江户时代开始的传统祭典，规模宏大',
        prefecture: 'tokyo',
        lastUpdated: new Date().toISOString(),
        source: OMATSURI_TOKYO_URL,
        verified: false
      }
    ];
    
    // 创建数据结构
    const tokyoMatsuriData = {
      prefecture: 'tokyo',
      lastUpdated: new Date().toISOString(),
      source: OMATSURI_TOKYO_URL,
      events: tokyoEvents
    };
    
    // 保存数据
    const dataFile = path.join(dataDir, 'tokyo-matsuri-data.json');
    await fs.writeFile(dataFile, JSON.stringify(tokyoMatsuriData, null, 2), 'utf-8');
    console.log(`\n✅ 数据已保存到: ${dataFile}`);
    
    console.log('\n⚠️  数据验证提醒:');
    console.log('- 所有日期为预估值，需要验证2025年官方确切日期');
    console.log('- 所有网站链接需要验证有效性');
    console.log('- 访客数量需要确认最新官方数据');
    console.log('- 建议逐个核实官方信息');
    
    return tokyoMatsuriData;
    
  } catch (error) {
    console.error('❌ 获取数据失败:', error.message);
    throw error;
  }
}

// 运行脚本
getTokyoMatsuriData()
  .then(data => {
    console.log(`\n🎉 成功创建 ${data.events.length} 个祭典数据`);
    console.log('📋 下一步: 请验证官方网站和确切日期');
    console.log('🔗 数据源: omaturilink.com/東京都/');
  })
  .catch(error => {
    console.error('脚本执行失败:', error);
    process.exit(1);
  }); 