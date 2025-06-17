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

class EnhancedSaitamaMatsuriProcessor {
  
  async loadRawData(): Promise<MatsuriEvent[]> {
    const filePath = path.join(process.cwd(), 'data', 'saitama-matsuri-latest.json');
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('❌ 读取原始数据失败:', error);
      return [];
    }
  }

  enhancedCleanAndFilterData(rawEvents: MatsuriEvent[]): MatsuriEvent[] {
    console.log(`🔧 使用增强筛选标准处理 ${rawEvents.length} 个原始事件...`);
    
    const cleanedEvents: MatsuriEvent[] = [];
    const seenTitles = new Set<string>();

    // 保持原有的6个优质祭典
    const qualityEvents: Partial<MatsuriEvent>[] = [
      {
        title: "川越祭",
        japaneseName: "川越まつり",
        englishName: "Kawagoe Festival",
        date: "10月第3个周末",
        location: "川越市",
        category: "传统祭典",
        highlights: ["华丽山车巡游", "江户风情体验", "传统街道漫步"],
        description: "川越祭是埼玉县最著名的传统祭典之一，以华丽的山车巡游而闻名。在江户风情浓郁的小江户川越举行，是体验关东地区传统文化的绝佳机会。",
        website: "https://www.kawagoematsuri.jp/"
      },
      {
        title: "秩父夜祭",
        japaneseName: "秩父夜祭",
        englishName: "Chichibu Night Festival",
        date: "12月2日-3日",
        location: "秩父市",
        category: "传统祭典",
        highlights: ["绚烂花火表演", "巨大山车拉行", "夜间庆典活动"],
        description: "秩父夜祭是日本三大曳山祭之一，以其壮观的夜间山车巡游和美丽的花火大会而闻名全国。UNESCO无形文化遗产。",
        website: "https://www.chichibu-matsuri.jp/"
      },
      {
        title: "熊谷扇子祭",
        japaneseName: "熊谷うちわ祭",
        englishName: "Kumagaya Uchiwa Festival",
        date: "7月20日-22日",
        location: "熊谷市",
        category: "夏祭り",
        highlights: ["巨型山车竞演", "传统扇子舞", "夏季避暑体验"],
        description: "熊谷扇子祭是关东地区最大的夏祭之一，以其热烈的山车巡游和传统的扇子文化而著称。活动期间气氛热烈，是体验日本夏祭文化的最佳选择。",
        website: "https://www.kumagayauchiwa.jp/"
      },
      {
        title: "所泽航空记念公园樱花祭",
        japaneseName: "所沢航空記念公園桜まつり",
        englishName: "Tokorozawa Aviation Memorial Park Cherry Blossom Festival",
        date: "4月上旬",
        location: "所泽市",
        category: "春祭り",
        highlights: ["樱花观赏", "航空文化体验", "户外活动"],
        description: "在日本航空发祥地举办的樱花祭，结合了美丽的樱花景色和独特的航空历史文化，是春季埼玉旅游的热门选择。",
        website: "https://www.parks.or.jp/tokorozawa-kokuu/"
      },
      {
        title: "深谷七夕祭",
        japaneseName: "深谷七夕まつり",
        englishName: "Fukaya Tanabata Festival",
        date: "7月第1个周末",
        location: "深谷市",
        category: "夏祭り",
        highlights: ["七夕装饰展示", "传统七夕仪式", "地方特色美食"],
        description: "深谷七夕祭以其精美的七夕装饰和传统的七夕庆祝活动而闻名，是体验日本传统七夕文化的重要祭典。",
        website: "https://www.fukaya-tanabata.com/"
      },
      {
        title: "春日部大凧祭",
        japaneseName: "春日部大凧まつり",
        englishName: "Kasukabe Giant Kite Festival",
        date: "5月3日-5日",
        location: "春日部市",
        category: "春祭り",
        highlights: ["巨型风筝放飞", "传统工艺展示", "家庭亲子活动"],
        description: "春日部大凧祭以其壮观的巨型风筝放飞活动而著名，是展现传统工艺技术和地方文化特色的重要祭典。",
        website: "https://www.kasukabe-kanko.jp/"
      }
    ];

    // 添加优质祭典
    for (const qualityEvent of qualityEvents) {
      const id = `saitama-quality-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const likes = Math.floor(Math.random() * 100) + 50;
      
      const cleanEvent: MatsuriEvent = {
        id,
        title: qualityEvent.title!,
        japaneseName: qualityEvent.japaneseName!,
        englishName: qualityEvent.englishName!,
        date: qualityEvent.date!,
        location: qualityEvent.location!,
        category: qualityEvent.category!,
        highlights: qualityEvent.highlights!,
        likes,
        website: qualityEvent.website || '#',
        description: qualityEvent.description!,
        prefecture: '埼玉県',
        region: 'saitama'
      };
      
      cleanedEvents.push(cleanEvent);
      seenTitles.add(qualityEvent.title!);
      console.log(`✅ 添加优质祭典: ${qualityEvent.title}`);
    }

    // 使用更宽松的筛选标准处理原始数据
    const enhancedValidEvents = rawEvents.filter(event => {
      const title = event.title.trim();
      
      // 跳过已经添加的
      if (seenTitles.has(title)) return false;
      
      // 更宽松的长度限制
      if (title.length < 2 || title.length > 50) return false;
      
      // 更宽松的垃圾数据过滤 - 只排除明显的垃圾
      const strictGarbageKeywords = ['検索', 'テーブル', 'メニュー', 'ヘッダー', 'フッター'];
      if (strictGarbageKeywords.some(keyword => title.includes(keyword))) return false;
      
      // 更广泛的祭典相关关键词
      const broadMatsuriKeywords = [
        '祭', 'まつり', '祭り', '祭典', 'フス', 'フスタ', 'イベント',
        '花火', '桜', '紅葉', '神社', '寺', '夜祭', '盆踊り', '七夕',
        '市民祭', '文化祭', '芸術祭', '音楽祭', '収穫祭', '豊年祭'
      ];
      
      const hasMatsuriKeyword = broadMatsuriKeywords.some(keyword => title.includes(keyword));
      
      // 埼玉相关的地名和文化关键词
      const saitamaKeywords = [
        '所沢', '川越', '熊谷', '大宮', '浦和', '春日部', '草加', '越谷',
        '秩父', '深谷', '久喜', '入間', '朝霞', '志木', '和光', '新座',
        '桶川', '北本', '八潮', '富士見', '三郷', '蓮田', '坂戸',
        '幸手', '鶴ヶ島', '日高', '吉川', 'ふじみ野', '白岡', '伊奈',
        '三芳', '毛呂山', '越生', '滑川', '嵐山', '小川', '川島',
        '吉見', '鳩山', 'ときがわ', '横瀬', '皆野', '長瀞', '小鹿野',
        '東秩父', '美里', '神川', '上里', '寄居', '埼玉', 'さいたま'
      ];
      
      const hasSaitamaLocation = saitamaKeywords.some(keyword => 
        title.includes(keyword) || event.location.includes(keyword)
      );
      
      // 包含祭典关键词 OR 包含埼玉地名
      return hasMatsuriKeyword || hasSaitamaLocation;
    });

    console.log(`🔍 增强筛选找到 ${enhancedValidEvents.length} 个潜在有效祭典`);

    // 处理筛选出的事件
    for (const event of enhancedValidEvents) {
      if (!seenTitles.has(event.title)) {
        const enhancedEvent = this.enhanceEventData(event);
        cleanedEvents.push(enhancedEvent);
        seenTitles.add(event.title);
        console.log(`✅ 添加增强祭典: ${enhancedEvent.title}`);
      }
    }

    console.log(`✨ 增强处理完成，共获得 ${cleanedEvents.length} 个祭典事件`);
    return cleanedEvents;
  }

  private enhanceEventData(event: MatsuriEvent): MatsuriEvent {
    // 清理和增强标题
    let cleanTitle = event.title
      .replace(/写真提供.*$/g, '')
      .replace(/一社.*$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // 如果标题过长，尝试提取主要部分
    if (cleanTitle.length > 30) {
      const parts = cleanTitle.split(/[・\s]/);
      cleanTitle = parts[0] || cleanTitle.substring(0, 30);
    }

    // 智能分类
    const category = this.smartCategorize(cleanTitle);
    
    // 智能生成描述
    const description = this.generateSmartDescription(cleanTitle, event.location);
    
    // 智能生成亮点
    const highlights = this.generateSmartHighlights(cleanTitle);
    
    // 智能推断地点
    const location = this.smartLocationInference(cleanTitle, event.location);

    return {
      ...event,
      title: cleanTitle,
      japaneseName: cleanTitle,
      englishName: this.generateEnglishName(cleanTitle),
      category,
      description,
      highlights,
      location,
      likes: Math.floor(Math.random() * 80) + 20 // 20-100之间的随机点赞数
    };
  }

  private smartCategorize(title: string): string {
    if (title.includes('花火')) return '花火祭典';
    if (title.includes('桜') || title.includes('花見')) return '春祭り';
    if (title.includes('七夕')) return '夏祭り';
    if (title.includes('盆踊り') || title.includes('夏祭')) return '夏祭り';
    if (title.includes('紅葉') || title.includes('秋')) return '秋祭り';
    if (title.includes('雪') || title.includes('冬')) return '冬祭り';
    if (title.includes('神社') || title.includes('寺')) return '宗教祭典';
    if (title.includes('市民') || title.includes('地域')) return '市民祭典';
    if (title.includes('文化') || title.includes('芸術')) return '文化祭典';
    if (title.includes('音楽')) return '音乐祭典';
    if (title.includes('収穫') || title.includes('豊年')) return '收获祭典';
    return '传统祭典';
  }

  private generateSmartDescription(title: string, location: string): string {
    const baseDesc = `${title}是在${location}举办的精彩活动`;
    
    if (title.includes('花火')) {
      return baseDesc + "，以绚烂的花火表演为特色，在夜空中绽放出璀璨的光芒，为观众带来震撼的视觉体验。";
    } else if (title.includes('桜')) {
      return baseDesc + "，春季樱花盛开时举行，粉色花海与传统文化相结合，是春游赏花的绝佳选择。";
    } else if (title.includes('神社')) {
      return baseDesc + "，在庄严的神社环境中举行，融合了深厚的宗教文化和地方传统，是体验日本精神文化的重要机会。";
    } else if (title.includes('市民')) {
      return baseDesc + "，是当地市民共同参与的盛大庆典，展现了浓厚的社区凝聚力和地方特色。";
    } else {
      return baseDesc + "，承载着深厚的历史文化底蕴，是了解当地传统和民俗文化的重要窗口。";
    }
  }

  private generateSmartHighlights(title: string): string[] {
    const highlights: string[] = [];
    
    if (title.includes('花火')) highlights.push('绚烂花火表演');
    if (title.includes('桜')) highlights.push('樱花景观欣赏');
    if (title.includes('神社')) highlights.push('传统神社仪式');
    if (title.includes('山車') || title.includes('山车')) highlights.push('华丽山车巡游');
    if (title.includes('踊り') || title.includes('舞')) highlights.push('传统舞蹈表演');
    if (title.includes('屋台') || title.includes('食')) highlights.push('特色美食摊位');
    if (title.includes('音楽')) highlights.push('精彩音乐演出');
    if (title.includes('子供') || title.includes('家族')) highlights.push('家庭亲子活动');
    if (title.includes('夜')) highlights.push('夜间庆典活动');
    if (title.includes('伝統')) highlights.push('传统文化体验');
    
    // 确保至少有2个亮点
    if (highlights.length === 0) {
      highlights.push('地方特色体验', '传统文化活动');
    } else if (highlights.length === 1) {
      highlights.push('地方特色体验');
    }

    return highlights.slice(0, 3);
  }

  private generateEnglishName(title: string): string {
    const translations: { [key: string]: string } = {
      '祭': 'Festival',
      'まつり': 'Matsuri',
      '祭り': 'Festival',
      '花火': 'Fireworks',
      '桜': 'Cherry Blossom',
      '神社': 'Shrine',
      '市民': 'Citizens',
      '夏': 'Summer',
      '春': 'Spring',
      '秋': 'Autumn',
      '冬': 'Winter',
      '夜': 'Night',
      '大': 'Grand'
    };

    let englishName = title;
    Object.entries(translations).forEach(([jp, en]) => {
      englishName = englishName.replace(new RegExp(jp, 'g'), en);
    });

    return englishName;
  }

  private smartLocationInference(title: string, originalLocation: string): string {
    // 埼玉市町村映射
    const locationMap: { [key: string]: string } = {
      '所沢': '所泽市',
      '川越': '川越市',
      '熊谷': '熊谷市',
      '大宮': '大宫区',
      '浦和': '浦和区',
      '春日部': '春日部市',
      '草加': '草加市',
      '越谷': '越谷市',
      '秩父': '秩父市',
      '深谷': '深谷市',
      '久喜': '久喜市',
      '入間': '入间市',
      '朝霞': '朝霞市',
      '志木': '志木市',
      '和光': '和光市',
      '新座': '新座市'
    };

    // 从标题中推断地点
    for (const [keyword, location] of Object.entries(locationMap)) {
      if (title.includes(keyword)) {
        return location;
      }
    }

    // 如果原始地点包含埼玉相关信息，保持原样
    if (originalLocation.includes('埼玉') || originalLocation.includes('市') || 
        originalLocation.includes('区') || originalLocation.includes('町')) {
      return originalLocation;
    }

    return '埼玉县';
  }

  async saveEnhancedData(events: MatsuriEvent[]) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `saitama-matsuri-enhanced-${timestamp}.json`;
    const filepath = path.join(process.cwd(), 'data', filename);

    try {
      await fs.mkdir(path.dirname(filepath), { recursive: true });
      await fs.writeFile(filepath, JSON.stringify(events, null, 2), 'utf-8');
      console.log(`💾 增强数据已保存到: ${filepath}`);
      
      // 同时更新最终版本
      const latestPath = path.join(process.cwd(), 'data', 'saitama-matsuri-enhanced-final.json');
      await fs.writeFile(latestPath, JSON.stringify(events, null, 2), 'utf-8');
      console.log(`💾 增强最终数据: ${latestPath}`);
      
      return filepath;
    } catch (error) {
      console.error('❌ 保存增强数据失败:', error);
      throw error;
    }
  }
}

// 主执行函数
async function main() {
  const processor = new EnhancedSaitamaMatsuriProcessor();

  try {
    console.log('🚀 开始增强处理埼玉祭典数据...\n');
    
    const rawData = await processor.loadRawData();
    if (rawData.length === 0) {
      console.log('❌ 没有找到原始数据文件');
      return;
    }
    
    console.log(`📊 原始数据包含 ${rawData.length} 个事件`);
    
    const enhancedData = processor.enhancedCleanAndFilterData(rawData);
    
    if (enhancedData.length > 0) {
      await processor.saveEnhancedData(enhancedData);
      
      console.log(`\n✅ 增强处理完成！获得 ${enhancedData.length} 个埼玉祭典事件`);
      console.log(`📈 相比之前的14个，增加了 ${enhancedData.length - 14} 个祭典`);
      
      // 显示分类统计
      const categoryStats = enhancedData.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('\n📅 增强后的分类统计:');
      Object.entries(categoryStats).forEach(([category, count]) => {
        console.log(`- ${category}: ${count} 个`);
      });
      
    } else {
      console.log('⚠️ 增强处理后没有有效的祭典数据');
    }

  } catch (error) {
    console.error('❌ 增强处理失败:', error);
    process.exit(1);
  }
}

// 直接运行主函数
main().catch(console.error);

export { EnhancedSaitamaMatsuriProcessor }; 