import fs from 'fs/promises';
import path from 'path';

interface MatsuriEvent {
  id: string;
  title: string;
  japaneseName: string;
  englishName: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  highlights: string[];
  likes: number;
  website: string;
  description: string;
  prefecture: string;
  region: string;
}

class SummerAutumnMatsuriFilter {
  
  async loadCompleteData(): Promise<MatsuriEvent[]> {
    const filePath = path.join(process.cwd(), 'data', 'saitama-matsuri-complete-final.json');
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('❌ 读取完整数据失败:', error);
      return [];
    }
  }

  filterHighQualityEvents(events: MatsuriEvent[]): MatsuriEvent[] {
    return events.filter(event => {
      // 1. 排除明显的网站导航元素
      const excludeKeywords = [
        'ホーム', 'メニュー', 'お祭りりんく', 'シア', 'プライバシー', 'お問い合わせ',
        '免責事項', 'YouTube', 'Wikipedia', 'テーブル検索', '開催日開催地',
        '北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島', '茨城', '栃木', '群馬',
        '千葉', '東京', '神奈川', '新潟', '山梨', '長野', '日本各地', '注目のお祭り',
        'お祭りの種類', '季節の祭り', '伝統行事', '炎のまつり', '海と川のまつり',
        '行列のまつり', 'その他の祭り', '無形文化遺産', 'copyright', '©'
      ];

      // 检查标题是否包含排除关键词
      if (excludeKeywords.some(keyword => event.title.includes(keyword))) {
        return false;
      }

      // 2. 检查是否真的是祭典活动（标题长度和内容）
      if (event.title.length < 4 || event.title.length > 50) {
        return false;
      }

      // 3. 必须有具体的地点信息（不只是"埼玉县"）
      if (event.location === '埼玉县' && !this.hasSpecificLocation(event.title)) {
        return false;
      }

      return true;
    });
  }

  filterSummerAutumnEvents(events: MatsuriEvent[]): MatsuriEvent[] {
    return events.filter(event => {
      const date = event.date.toLowerCase();
      
      // 7月以后的月份
      const summerAutumnKeywords = [
        '7月', '７月', '8月', '８月', '9月', '９月', '10月', '１０月',
        '11月', '１１月', '12月', '１２月', '夏', '秋', '冬'
      ];

      // 如果日期包含7月以后的关键词
      if (summerAutumnKeywords.some(keyword => date.includes(keyword))) {
        return true;
      }

      // 检查标题中是否包含夏秋冬相关词汇
      const seasonKeywords = ['夏祭', '秋祭', '冬祭', '花火', '七夕', '盆踊', '紅葉', '雪'];
      if (seasonKeywords.some(keyword => event.title.includes(keyword))) {
        return true;
      }

      return false;
    });
  }

  hasSpecificLocation(title: string): boolean {
    const locations = [
      '川越', '熊谷', '秩父', '所沢', '春日部', '草加', '越谷', '大宮', '浦和',
      '狭山', '入間', '朝霞', '志木', '和光', '新座', '桶川', '久喜', '北本',
      '八潮', '富士見', '三郷', '蓮田', '坂戸', '鶴ヶ島', '日高', '吉川',
      'ふじみ野', '白岡', '伊奈', '三芳', '毛呂山', '越生', '滑川', '嵐山',
      '小川', '川島', '吉見', '鳩山', 'ときがわ', '横瀬', '皆野', '長瀞',
      '小鹿野', '東秩父', '美里', '神川', '上里', '寄居', '宮代', '杉戸',
      '松伏', '本庄', '深谷', '加須', '羽生', '鴻巣', '行田', '飯能'
    ];

    return locations.some(location => title.includes(location));
  }

  enhanceEventData(events: MatsuriEvent[]): MatsuriEvent[] {
    return events.map(event => {
      // 改善描述
      let enhancedDescription = '';
      if (event.title.includes('花火')) {
        enhancedDescription = `${event.title}は埼玉県で開催される美しい花火大会です。夏の夜空を彩る花火が地域の人々と観光客を魅了します。`;
      } else if (event.title.includes('祭')) {
        enhancedDescription = `${event.title}は地域の伝統と文化を体験できる素晴らしいお祭りです。埼玉県の豊かな文化遺産を感じることができます。`;
      } else {
        enhancedDescription = event.description;
      }

      // 改善亮点
      let enhancedHighlights = [...event.highlights];
      if (event.title.includes('花火')) {
        enhancedHighlights = ['壮观花火表演', '夏夜浪漫体验', '传统节庆文化'];
      } else if (event.title.includes('夏祭')) {
        enhancedHighlights = ['传统夏日祭典', '地方特色表演', '美食体验'];
      } else if (event.title.includes('秋祭')) {
        enhancedHighlights = ['秋季传统庆典', '丰收庆祝活动', '文化艺术展示'];
      }

      return {
        ...event,
        description: enhancedDescription,
        highlights: enhancedHighlights.slice(0, 3)
      };
    });
  }

  async updateAPI(filteredEvents: MatsuriEvent[]) {
    // 更新API数据文件
    const apiDataPath = path.join(process.cwd(), 'src', 'data', 'saitama-matsuri.json');
    
    try {
      await fs.writeFile(apiDataPath, JSON.stringify(filteredEvents, null, 2), 'utf-8');
      console.log(`✅ API数据文件已更新: ${apiDataPath}`);
    } catch (error) {
      console.error('❌ 更新API数据文件失败:', error);
      throw error;
    }

    // 更新API路由
    const routeContent = `import { NextResponse } from 'next/server';

// 埼玉祭典数据 - ${filteredEvents.length}个7月以后的高质量活动
const saitamaMatsuri = ${JSON.stringify(filteredEvents, null, 2)};

export async function GET() {
  try {
    console.log('🎋 埼玉祭典API调用成功，返回', saitamaMatsuri.length, '个7月以后的活动');
    
    return NextResponse.json({
      success: true,
      data: saitamaMatsuri,
      count: saitamaMatsuri.length,
      region: 'saitama',
      prefecture: '埼玉県',
      period: '7月以后',
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ 埼玉祭典API错误:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '无法获取埼玉祭典数据',
        count: 0
      },
      { status: 500 }
    );
  }
}`;

    const apiRoutePath = path.join(process.cwd(), 'src', 'app', 'api', 'matsuri', 'saitama', 'route.ts');
    try {
      await fs.writeFile(apiRoutePath, routeContent, 'utf-8');
      console.log(`✅ API路由已更新: ${apiRoutePath}`);
    } catch (error) {
      console.error('❌ 更新API路由失败:', error);
      throw error;
    }
  }

  generateFilterReport(originalCount: number, filteredCount: number, events: MatsuriEvent[]): string {
    const categoryStats = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const monthStats = events.reduce((acc, event) => {
      if (event.date.includes('7月') || event.date.includes('７月')) acc['7月'] = (acc['7月'] || 0) + 1;
      if (event.date.includes('8月') || event.date.includes('８月')) acc['8月'] = (acc['8月'] || 0) + 1;
      if (event.date.includes('9月') || event.date.includes('９月')) acc['9月'] = (acc['9月'] || 0) + 1;
      if (event.date.includes('10月') || event.date.includes('１０月')) acc['10月'] = (acc['10月'] || 0) + 1;
      if (event.date.includes('11月') || event.date.includes('１１月')) acc['11月'] = (acc['11月'] || 0) + 1;
      if (event.date.includes('12月') || event.date.includes('１２月')) acc['12月'] = (acc['12月'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return `# 埼玉祭典筛选报告 - 7月以后活动

## 📊 筛选结果
- **原始数据**: ${originalCount} 个活动
- **筛选后**: ${filteredCount} 个活动
- **筛选率**: ${Math.round((filteredCount / originalCount) * 100)}%
- **筛选时间**: ${new Date().toLocaleString('zh-CN')}

## 🎭 活动分类统计
${Object.entries(categoryStats)
  .sort(([,a], [,b]) => b - a)
  .map(([category, count]) => `- **${category}**: ${count} 个`)
  .join('\n')}

## 📅 月份分布
${Object.entries(monthStats)
  .map(([month, count]) => `- **${month}**: ${count} 个`)
  .join('\n')}

## 🎯 筛选标准
1. **时间范围**: 7月以后的活动
2. **质量过滤**: 排除网站导航、通用标题等
3. **地点明确**: 必须有具体的埼玉县内地点
4. **内容优化**: 改善描述和亮点展示

## 🌟 代表性活动
${events.slice(0, 10).map((event, index) => 
  `${index + 1}. **${event.title}** (${event.date}) - ${event.location}`
).join('\n')}

---
*筛选后的数据更加精准，用户体验更佳*`;
  }

  async saveFilterReport(report: string) {
    const reportPath = path.join(process.cwd(), 'data', 'saitama-summer-autumn-filter-report.md');
    
    try {
      await fs.writeFile(reportPath, report, 'utf-8');
      console.log(`📋 筛选报告已保存: ${reportPath}`);
    } catch (error) {
      console.error('❌ 保存筛选报告失败:', error);
    }
  }
}

// 主执行函数
async function main() {
  const filter = new SummerAutumnMatsuriFilter();

  try {
    console.log('🔥 开始筛选7月以后的高质量埼玉祭典...\n');
    
    const allEvents = await filter.loadCompleteData();
    if (allEvents.length === 0) {
      console.log('❌ 没有找到原始数据');
      return;
    }
    
    console.log(`📊 原始数据: ${allEvents.length} 个活动`);
    
    // 第一步：过滤高质量事件
    const qualityEvents = filter.filterHighQualityEvents(allEvents);
    console.log(`🎯 质量筛选后: ${qualityEvents.length} 个活动`);
    
    // 第二步：筛选7月以后的事件
    const summerAutumnEvents = filter.filterSummerAutumnEvents(qualityEvents);
    console.log(`🌞 7月以后筛选: ${summerAutumnEvents.length} 个活动`);
    
    // 第三步：增强事件数据
    const enhancedEvents = filter.enhanceEventData(summerAutumnEvents);
    
    // 更新API
    await filter.updateAPI(enhancedEvents);
    
    // 生成报告
    const report = filter.generateFilterReport(allEvents.length, enhancedEvents.length, enhancedEvents);
    await filter.saveFilterReport(report);
    
    console.log(`\n🎉 筛选完成！`);
    console.log(`📈 最终活动数: ${enhancedEvents.length} 个`);
    console.log(`📅 时间范围: 7月以后`);
    console.log(`🎯 质量: 高质量祭典活动`);
    console.log(`🌐 访问: http://localhost:3001/saitama/matsuri`);

  } catch (error) {
    console.error('❌ 筛选失败:', error);
    process.exit(1);
  }
}

// 直接运行主函数
main().catch(console.error);

export { SummerAutumnMatsuriFilter }; 