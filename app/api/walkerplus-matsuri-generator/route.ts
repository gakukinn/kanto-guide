import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import fs from 'fs/promises';
import { join } from 'path';
import * as path from 'path';

// 活动类型配置 - 专门用于祭典
const ACTIVITY_CONFIGS = {
  matsuri: { 
    model: 'matsuriEvent',
    table: 'MatsuriEvent',
    template: 'WalkerPlusMatsuriTemplate'
  }
} as const;

// 生成URL友好的slug
const generateSlug = (name: string): string => {
  let slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
    
  // 确保slug不以数字开头（用于函数名）
  if (/^\d/.test(slug)) {
    slug = 'event-' + slug;
  }
  
  return slug;
};

// 生成有效的React组件名
const generateComponentName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '') + 'Page';
};

// 🔧 智能分离日期和时间
const separateDateAndTime = (datetime: string) => {
  if (!datetime) return { date: '', time: '' };
  
  // 按换行符分割
  const lines = datetime.split('\n').filter(line => line.trim());
  
  // 查找日期模式：年月日
  const datePattern = /(\d{4}年\d{1,2}月\d{1,2}日[^0-9]*)/;
  let date = '';
  let time = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (datePattern.test(trimmed)) {
      // 提取日期部分
      const dateMatch = trimmed.match(datePattern);
      if (dateMatch) {
        date = dateMatch[1].trim();
        // 剩余部分作为时间
        const remaining = trimmed.replace(dateMatch[1], '').trim();
        if (remaining) {
          time = remaining;
        }
      }
    } else if (trimmed.includes('開場') || trimmed.includes('開演') || trimmed.match(/\d{1,2}:\d{2}/)) {
      // 这行包含时间信息
      if (time) {
        time += ' ' + trimmed;
      } else {
        time = trimmed;
      }
    }
  }
  
  // 如果没有找到分离的日期，尝试整体处理
  if (!date && datetime.includes('年') && datetime.includes('月') && datetime.includes('日')) {
    const match = datetime.match(/(\d{4}年\d{1,2}月\d{1,2}日[^\d]*)/);
    if (match) {
      date = match[1].trim();
      time = datetime.replace(match[1], '').trim();
    }
  }
  
  return { date: date || datetime, time: time || '' };
};

// 🔧 从合并的contact字段中解析出14项WalkerPlus祭典字段
const parseContactFields = (contactText: string) => {
  const fields = {
    reservationSystem: '',  // 预约制 (替代fireworksCount)
    viewingPoints: '',      // 观赏点 (替代fireworksTime)
    expectedVisitors: '',
    weatherInfo: '',
    foodStalls: '',
    parking: '',
    notes: ''
  };
  
  if (!contactText) return fields;
  
  const lines = contactText.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('予約制:') || trimmedLine.startsWith('予約制：')) {
      fields.reservationSystem = trimmedLine.replace(/^予約制[:：]/, '').trim();
    } else if (trimmedLine.startsWith('観覧ポイント:') || trimmedLine.startsWith('観覧ポイント：')) {
      fields.viewingPoints = trimmedLine.replace(/^観覧ポイント[:：]/, '').trim();
    } else if (trimmedLine.startsWith('例年の人出:') || trimmedLine.startsWith('例年の人出：')) {
      fields.expectedVisitors = trimmedLine.replace(/^例年の人出[:：]/, '').trim();
    } else if (trimmedLine.startsWith('荒天の場合:') || trimmedLine.startsWith('荒天の場合：')) {
      fields.weatherInfo = trimmedLine.replace(/^荒天の場合[:：]/, '').trim();
    } else if (trimmedLine.startsWith('屋台など:') || trimmedLine.startsWith('屋台など：')) {
      fields.foodStalls = trimmedLine.replace(/^屋台など[:：]/, '').trim();
    } else if (trimmedLine.startsWith('駐車場:') || trimmedLine.startsWith('駐車場：')) {
      fields.parking = trimmedLine.replace(/^駐車場[:：]/, '').trim();
    } else if (trimmedLine.startsWith('その他・全体備考:') || trimmedLine.startsWith('その他・全体備考：')) {
      fields.notes = trimmedLine.replace(/^その他・全体備考[:：]/, '').trim();
    }
  }
  
  return fields;
};

// 🧠 智能相似度计算函数
const calculateSimilarity = (str1: string, str2: string): number => {
  if (!str1 || !str2) return 0;
  
  // 清理字符串（移除空格、标点符号、括号内容等）
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      // 移除括号及其内容
      .replace(/[（(][^）)]*[）)]/g, '')
      // 移除特殊符号
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      .trim();
  };
  
  const s1 = normalize(str1);
  const s2 = normalize(str2);
  
  if (s1 === s2) return 1.0;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // 检查包含关系（一个字符串是另一个的子集）
  if (s1.includes(s2) || s2.includes(s1)) {
    const shorter = Math.min(s1.length, s2.length);
    const longer = Math.max(s1.length, s2.length);
    return shorter / longer * 0.9; // 稍微降低权重
  }
  
  // 使用编辑距离算法
  const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  
  for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }
  
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - (matrix[s2.length][s1.length] / maxLength);
};

// 🗓️ 日期相似度判断 - 返回详细状态
const compareDates = (date1: string, date2: string): { similar: boolean; status: 'match' | 'mismatch' | 'unknown' | 'missing' } => {
  // 检查数据是否缺失或无效
  const isValidDate = (dateStr: string) => {
    if (!dateStr) return false;
    const normalized = dateStr.toLowerCase().trim();
    return !['未知', 'unknown', '未识别', '', 'null', 'undefined'].includes(normalized);
  };
  
  const valid1 = isValidDate(date1);
  const valid2 = isValidDate(date2);
  
  // 如果任一日期无效，返回无法比较状态
  if (!valid1 || !valid2) {
    return { similar: false, status: 'unknown' };
  }
  
  // 提取年月日数字
  const extractNumbers = (dateStr: string) => {
    const matches = dateStr.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  };
  
  const nums1 = extractNumbers(date1);
  const nums2 = extractNumbers(date2);
  
  // 如果都有年月日信息，比较年月日
  if (nums1.length >= 3 && nums2.length >= 3) {
    const isMatch = nums1[0] === nums2[0] && nums1[1] === nums2[1] && nums1[2] === nums2[2];
    return { similar: isMatch, status: isMatch ? 'match' : 'mismatch' };
  }
  
  // 如果只有月日信息，比较月日
  if (nums1.length >= 2 && nums2.length >= 2) {
    const month1 = nums1[nums1.length >= 3 ? 1 : 0];
    const day1 = nums1[nums1.length >= 3 ? 2 : 1];
    const month2 = nums2[nums2.length >= 3 ? 1 : 0];
    const day2 = nums2[nums2.length >= 3 ? 2 : 1];
    const isMatch = month1 === month2 && day1 === day2;
    return { similar: isMatch, status: isMatch ? 'match' : 'mismatch' };
  }
  
  return { similar: false, status: 'mismatch' };
};

// 🏠 地址相似度判断 - 返回详细状态
const compareAddresses = (addr1: string, addr2: string): { similar: boolean; status: 'match' | 'mismatch' | 'unknown' | 'missing' } => {
  // 检查数据是否缺失或无效
  const isValidAddress = (addrStr: string) => {
    if (!addrStr) return false;
    const normalized = addrStr.toLowerCase().trim();
    return !['未知', 'unknown', '未识别', '', 'null', 'undefined'].includes(normalized);
  };
  
  const valid1 = isValidAddress(addr1);
  const valid2 = isValidAddress(addr2);
  
  // 如果任一地址无效，返回无法比较状态
  if (!valid1 || !valid2) {
    return { similar: false, status: 'unknown' };
  }
  
  // 提取关键地名信息
  const extractKeywords = (address: string) => {
    // 匹配区、市、町、村等地名关键词
    const matches = address.match(/[^\s]+?[区市町村]/g) || [];
    return matches.map(match => match.replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ''));
  };
  
  const keywords1 = extractKeywords(addr1);
  const keywords2 = extractKeywords(addr2);
  
  // 检查是否有相同的地名关键词
  const hasCommonKeywords = keywords1.some(k1 => keywords2.some(k2 => k1.includes(k2) || k2.includes(k1)));
  
  return { similar: hasCommonKeywords, status: hasCommonKeywords ? 'match' : 'mismatch' };
};

// 🚨 智能重复检测函数（祭典版本）
const checkForDuplicates = async (activityName: string, region: string, activityType: string, activityData: any) => {
  const activitiesDir = path.join(process.cwd(), 'data', 'activities');
  
  try {
    const files = await fs.readdir(activitiesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const similarActivities = []; // 存储所有相似活动
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(activitiesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const existingData = JSON.parse(content);
        
        // 只检查相同地区和活动类型的活动
        if (existingData.region === region && existingData.activityType === activityType) {
          
          // 🧠 智能相似度判断（使用通用字段）
          const nameSimilarity = calculateSimilarity(activityName || '', existingData.name || '');
          const dateComparison = compareDates(activityData.date || '', existingData.date || '');
          const addressComparison = compareAddresses(activityData.venue || '', existingData.venue || '');
          
          console.log(`🔍 相似度分析 - ${existingData.name}:`);
          console.log(`   名称相似度: ${(nameSimilarity * 100).toFixed(1)}%`);
          console.log(`   日期状态: ${dateComparison.status} (相似: ${dateComparison.similar ? '是' : '否'})`);
          console.log(`   地址状态: ${addressComparison.status} (相似: ${addressComparison.similar ? '是' : '否'})`);
          
          // 判断条件：名称相似度 >= 85% 或者 (名称相似度 >= 75% 且 (日期相似 或 地址相似)) 或者 (名称相似度 >= 30% 且 日期相似 且 地址相似)
          const overallSimilarity = nameSimilarity >= 0.85 ? nameSimilarity : 
                                    (nameSimilarity >= 0.75 && (dateComparison.similar || addressComparison.similar)) ? nameSimilarity :
                                    (nameSimilarity >= 0.3 && dateComparison.similar && addressComparison.similar) ? nameSimilarity : 0;
          
          // 只收集相似度>0的活动
          if (overallSimilarity > 0) {
            console.log(`✅ 高度相似活动 (${(overallSimilarity * 100).toFixed(1)}%)`);
            
            const existingId = existingData.id || file.replace('.json', '');
            
            // 从现有的detailLink中提取folder名称
            let existingFolder = '';
            if (existingData.detailLink) {
              const pathParts = existingData.detailLink.split('/');
              existingFolder = pathParts[pathParts.length - 1]; // 获取最后一部分作为folder名
            } else {
              // 如果没有detailLink，尝试从活动名称生成
              const existingName = existingData.name || '';
              const baseFolder = existingName
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .substring(0, 30);
              
              // 使用ID的后8位作为时间戳
              const timestamp = existingId.toString().slice(-8);
              existingFolder = `activity-${baseFolder}-${timestamp}`;
            }
            
            const existingPath = `/${region}/${activityType}/${existingFolder}`;
            const existingTargetDir = path.join(process.cwd(), 'app', region, activityType, existingFolder);
            
            console.log(`📁 计算的覆盖路径: ${existingPath}`);
            
            similarActivities.push({
              similarity: overallSimilarity,
              activity: existingData,
              id: existingId,
              file: file,
              path: existingPath,
              folder: existingFolder,
              targetDir: existingTargetDir,
              url: `http://localhost:3000${existingPath}`,
              similarityDetails: {
                name: nameSimilarity,
                date: dateComparison,
                address: addressComparison
              }
            });
          } else {
            console.log(`❌ 相似度不足 (${(overallSimilarity * 100).toFixed(1)}%)`);
          }
        }
      } catch (error) {
        console.error(`检查文件 ${file} 时出错:`, error);
      }
    }
    
    // 按相似度排序，取前3个
    similarActivities.sort((a, b) => b.similarity - a.similarity);
    const topSimilar = similarActivities.slice(0, 3);
    
    if (topSimilar.length > 0) {
      console.log(`🎯 找到 ${topSimilar.length} 个高度相似活动`);
      return {
        isDuplicate: true,
        count: topSimilar.length,
        similarActivities: topSimilar
      };
    }
    
    return { isDuplicate: false, count: 0, similarActivities: [] };
  } catch (error) {
    console.error('重复检查失败:', error);
    return { isDuplicate: false, count: 0, similarActivities: [] };
  }
};

// 字符串清理函数 - 移除换行符和多余空格
const cleanString = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/\n/g, ' ')          // 换行符替换为空格
    .replace(/\r/g, ' ')          // 回车符替换为空格
    .replace(/\s+/g, ' ')         // 多个空格合并为一个
    .trim();                      // 去除首尾空格
};

// 页面文件生成逻辑 - 祭典版本
const generatePageFile = async (
  region: string,
  activityType: string,
  data: any,
  detailPageFolder: string
): Promise<{ filePath: string; detailLink: string }> => {
  const config = ACTIVITY_CONFIGS[activityType as keyof typeof ACTIVITY_CONFIGS];
  const templateName = config?.template || 'UniversalStaticDetailTemplate';
  const componentName = 'DetailPage';
  
  // 解析contact字段
  const contactFields = parseContactFields(data.contact || data.contactInfo || '');
  const { date: separatedDate, time: separatedTime } = separateDateAndTime(data.datetime || '');
  
  // 从WalkerPlus字段中提取
  const extractWalkerField = (label: string) => {
    if (data.walkerFields && Array.isArray(data.walkerFields)) {
      const field = data.walkerFields.find((f: any) => f.label === label);
      return field ? field.value : '';
    }
    return '';
  };

  // 🏮 准备祭典数据格式（使用祭典字段名）
  const standardData = {
    name: cleanString(data.name || data.eventName || extractWalkerField('事件名') || '详见官网'),
    reservationSystem: cleanString(data.reservationSystem || extractWalkerField('予約') || contactFields.reservationSystem || '详见官网'),
    viewingPoints: cleanString(data.viewingPoints || extractWalkerField('おすすめビューポイント') || contactFields.viewingPoints || '详见官网'),
    expectedVisitors: cleanString(data.expectedVisitors || extractWalkerField('例年の人出') || contactFields.expectedVisitors || '详见官网'),
    date: cleanString(data.date || data.eventPeriod || extractWalkerField('開催日程') || separatedDate || '详见官网'),
    time: cleanString(data.time || data.eventTime || extractWalkerField('開催時間') || separatedTime || '详见官网'),
    venue: cleanString(data.venue || extractWalkerField('開催場所・会場') || '详见官网'),
    access: cleanString(data.access || data.venueAccess || extractWalkerField('交通アクセス') || '详见官网'),
    weatherInfo: cleanString(data.weatherInfo || data.weatherPolicy || extractWalkerField('雨天・荒天時の対応') || contactFields.weatherInfo || '详见官网'),
    parking: cleanString(data.parking || extractWalkerField('駐車場') || contactFields.parking || '详见官网'),
    price: cleanString(data.price || data.fee || extractWalkerField('料金') || ''),
    contact: cleanString(data.contact || data.contactInfo || extractWalkerField('お問い合わせ') || '详见官网'),
    foodStalls: cleanString(data.foodStalls || extractWalkerField('屋台の有無') || contactFields.foodStalls || '详见官网'),
    notes: cleanString(data.notes || data.otherNotes || extractWalkerField('その他・全体備考') || contactFields.notes || '详见官网'),
    
    // 🏮 祭典专用字段映射
    spotName: cleanString(data.spotName || extractWalkerField('スポット名') || ''),
    spotAddress: cleanString(data.spotAddress || extractWalkerField('住所') || ''),
    website: cleanString(data.officialSite || data.website || ''),
    googleMap: cleanString(data.googleMap || ''),
    
    // ✅ 将images转换为media格式，供WalkerPlusMatsuriTemplate使用
    media: (data.images || []).map((url: string, index: number) => ({
      type: 'image' as const,
      url: url,
      title: `${cleanString(data.name || data.eventName || '祭典活动')}图片${index + 1}`,
      alt: `${cleanString(data.name || data.eventName || '祭典活动')}图片${index + 1}`,
      caption: ''
    })),
    
    id: data.id,
    region: data.region || region,
    activityType: activityType,
    description: cleanString(data.description || data.name || data.eventName || ''),
    highlights: cleanString(data.highlights || ''),
    themeColor: 'orange',
    status: 'scheduled',
    detailPageFolder,
    generatedBy: 'WalkerPlus祭典生成器',
    generatedAt: new Date().toISOString()
  };

  // 生成React页面文件内容（确保字符串安全）
  const safeName = cleanString(standardData.name);
  const safeDescription = cleanString(standardData.description || standardData.name);
  


  // 生成详情页链接
  const detailLink = `/${region}/${activityType}/${path.basename(detailPageFolder)}`;

  // 添加系统字段到standardData中
  const completeData = {
    ...standardData,
    detailLink: detailLink,
    createdAt: new Date().toISOString(),
    source: "walkerplus-generator"
  };

  // 生成完整的数据对象代码（统一格式 - 移除属性名引号）
  const dataObjectCode = JSON.stringify(completeData, null, 2)
    .replace(/"type": "image"/g, 'type: "image" as const')  // 先添加类型断言
    .replace(/"type": "video"/g, 'type: "video" as const')
    .replace(/"([^"]+)":/g, '$1:')  // 再移除属性名的引号
    .replace(/"createdAt": "([^"]*)"/, 'createdAt: new Date("$1")')
    .replace(/"updatedAt": "([^"]*)"/, 'updatedAt: new Date("$1")');

  const pageContent = `import ${templateName} from '../../../../src/components/${templateName}';
import { Metadata } from 'next';

const activityData = ${dataObjectCode};

export const metadata: Metadata = {
  title: '${safeName} | ${region.toUpperCase()}祭典活动指南',
  description: '${safeDescription}',
  keywords: '${safeName}, 祭典, ${region}, 传统活动, 日本',
  openGraph: {
    title: '${safeName}',
    description: '${safeDescription}',
    type: 'article',
    locale: 'zh_CN',
  },
};

export default function ${componentName}() {
  return (
    <${templateName}
      data={activityData}
      regionKey="${region}"
      activityKey="${activityType}"
    />
  );
}`;

  const pagePath = join(detailPageFolder, 'page.tsx');
  await mkdir(detailPageFolder, { recursive: true });
  await writeFile(pagePath, pageContent, 'utf-8');

  console.log(`✅ 祭典页面文件已生成: ${pagePath}`);
  console.log(`🔗 详情页链接: ${detailLink}`);
  
  return { filePath: pagePath, detailLink };
};

// 🔄 完整的JSON文件生成函数（祭典版本 - 支持地区汇总）
const generateJsonFiles = async (
  region: string,
  activityType: string,
  activityData: any,
  detailLink: string
): Promise<{ activityFile: string; regionFile: string; data: any }> => {
  // 转换数据为JSON格式 - 祭典字段（修复字段映射）
  const jsonData = {
    id: activityData.id,
    // 祭典字段（正确映射祭典解析器的字段名）
    name: activityData.name || activityData.eventName || '详见官网',
    reservationSystem: activityData.reservationSystem || activityData.reservationRequired || '详见官网',
    viewingPoints: activityData.viewingPoints || activityData.recommendedViewpoint || '详见官网',
    expectedVisitors: activityData.expectedVisitors || '详见官网',
    date: activityData.date || activityData.eventPeriod || '详见官网',
    time: activityData.time || activityData.eventTime || '详见官网',
    venue: activityData.venue || '详见官网',
    access: activityData.access || activityData.venueAccess || '详见官网',
    weatherInfo: activityData.weatherInfo || activityData.weatherPolicy || '详见官网',
    parking: activityData.parking || '详见官网',
    price: activityData.price || activityData.fee || '', // 价格特殊：空字符串表示免费
    contact: activityData.contact || activityData.contactInfo || '详见官网',
    foodStalls: activityData.foodStalls || '详见官网',
    notes: activityData.notes || activityData.otherNotes || '详见官网',
    website: activityData.website || '',
    googleMap: activityData.googleMap || '',
    description: activityData.description || '',
    highlights: activityData.highlights || '',
    
    // 系统字段
    region: activityData.region || region,
    activityType: activityType,
    detailLink: detailLink,
    themeColor: 'orange',
    status: 'scheduled',
    // 媒体格式转换
    media: (activityData.images || []).map((url: string, index: number) => ({
      type: 'image' as const,
      url: url,
      title: `${activityData.name || '活动'}图片${index + 1}`,
      alt: `${activityData.name || '活动'}图片${index + 1}`,
      caption: ''
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    // 1. 创建单个活动JSON文件
    const activitiesDir = path.join(process.cwd(), 'data', 'activities');
    await mkdir(activitiesDir, { recursive: true });
    
    const cleanId = activityData.id.replace(/^recognition-[^-]+-/, '');
    const standardFileName = `recognition-${activityType}-${cleanId}.json`;
    const activityFilePath = path.join(activitiesDir, standardFileName);
    await writeFile(activityFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    
    // 2. 更新地区汇总JSON文件
    const regionDir = path.join(process.cwd(), 'data', 'regions', region);
    await mkdir(regionDir, { recursive: true });
    
    const regionFilePath = path.join(regionDir, `${activityType}.json`);
    
    // 读取现有的地区文件
    let regionData = [];
    try {
      const existingContent = await fs.readFile(regionFilePath, 'utf-8');
      regionData = JSON.parse(existingContent);
    } catch (error) {
      // 文件不存在，创建新数组
      regionData = [];
    }
    
    // 创建地区汇总格式的数据（基本字段，无祭典特有字段）
    const regionSummaryData = {
      id: activityData.id,
      title: activityData.name || activityData.eventName || '',
      description: activityData.description || '',
      location: activityData.venue || '',
      date: activityData.date || activityData.eventPeriod || '',
      time: activityData.time || activityData.eventTime || '',
      expectedVisitors: activityData.expectedVisitors || '',
      image: (activityData.images && activityData.images.length > 0) ? activityData.images[0] : '',
      detailLink: detailLink,
      likes: 0,
      themeColor: 'orange'
    };

    // 检查是否已存在同ID的活动
    const existingIndex = regionData.findIndex((item: any) => item.id === activityData.id);
    if (existingIndex >= 0) {
      // 更新现有记录
      regionData[existingIndex] = regionSummaryData;
      console.log(`🔄 更新地区汇总中的现有记录: ID=${activityData.id}`);
    } else {
      // 添加新记录
      regionData.push(regionSummaryData);
      console.log(`➕ 添加新记录到地区汇总: ID=${activityData.id}`);
    }
    
    // 按创建时间排序
    regionData.sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    
    await writeFile(regionFilePath, JSON.stringify(regionData, null, 2), 'utf-8');
    
    console.log(`✅ JSON文件生成成功:`);
    console.log(`   - 单个活动: ${activityFilePath}`);
    console.log(`   - 地区汇总: ${regionFilePath}`);
    
    return {
      activityFile: activityFilePath.replace(process.cwd(), ''),
      regionFile: regionFilePath.replace(process.cwd(), ''),
      data: jsonData
    };
    
  } catch (error) {
    console.error('❌ JSON文件生成失败:', error);
    throw error;
  }
};

// 主要POST处理函数
export async function POST(request: NextRequest) {
  try {
    console.log('🏮 WalkerPlus祭典生成器 API 被调用');
    
    const body = await request.json();
    const { 
      region, 
      activityType = 'matsuri', 
      activityData, 
      images = [],           // ✅ 添加图片处理
      duplicateAction,       // ✅ 添加重复检测支持
      overwriteTarget,       // ✅ 添加覆盖支持
      forceOverwrite = false 
    } = body;

    // 验证参数
    if (!region || !activityData) {
      return NextResponse.json(
        { error: '缺少必要参数: region 和 activityData' },
        { status: 400 }
      );
    }

    if (activityType !== 'matsuri') {
      return NextResponse.json(
        { error: '此API仅支持祭典活动 (matsuri)' },
        { status: 400 }
      );
    }

    // 🚨 智能重复检测：基于活动名称、日期、地址的智能判断
    const activityName = activityData.name || activityData.eventName || '未命名活动';
    const duplicateCheck = await checkForDuplicates(activityName, region, activityType, activityData);
    
    let detailPageFolder: string;
    let detailLink: string;
    let activityId: string;
    
    if (duplicateCheck.isDuplicate && !forceOverwrite) {
      console.log(`⚠️ 检测到 ${duplicateCheck.count} 个高度相似活动，需要用户确认`);
      return NextResponse.json({
        success: false,
        isConflict: true,
        message: `检测到 ${duplicateCheck.count} 个高度相似活动，请仔细对比后选择处理方式`,
        data: {
          // 当前要生成的活动信息
          currentActivity: {
            name: activityData.name || activityData.eventName,
            date: activityData.date || activityData.eventPeriod,
            venue: activityData.venue,
            reservationSystem: activityData.reservationSystem,
            viewingPoints: activityData.viewingPoints
          },
          // 所有相似活动的详细信息
          similarActivities: duplicateCheck.similarActivities.map(item => ({
            similarity: item.similarity,
            activity: {
              name: item.activity.name,
              date: item.activity.date,
              venue: item.activity.venue,
              reservationSystem: item.activity.reservationSystem,
              viewingPoints: item.activity.viewingPoints,
              id: item.id,
              file: item.file
            },
            url: item.url,
            path: item.path,
            similarityDetails: item.similarityDetails
          })),
          suggestion: '请仔细对比活动信息，选择要覆盖的活动或创建新活动'
        }
      }, { status: 409 });
    } else if (duplicateCheck.isDuplicate && forceOverwrite) {
      console.log(`🔄 强制覆盖模式：覆盖现有活动 ${activityName}`);
      
      // 支持指定覆盖目标
      let targetActivity = duplicateCheck.similarActivities[0]; // 默认覆盖第一个
      
      if (overwriteTarget) {
        // 用户指定了要覆盖的活动ID
        const specifiedTarget = duplicateCheck.similarActivities.find(item => item.id === overwriteTarget);
        if (specifiedTarget) {
          targetActivity = specifiedTarget;
          console.log(`🎯 用户指定覆盖活动: ${overwriteTarget} (${specifiedTarget.activity.name})`);
        } else {
          console.log(`⚠️ 指定的覆盖目标ID ${overwriteTarget} 不在相似活动列表中，使用默认目标`);
        }
      } else {
        console.log(`🔄 使用默认覆盖目标: ${targetActivity.id} (${targetActivity.activity.name})`);
      }
      
      // 使用选定活动的路径和ID
      activityId = targetActivity.id;
      const folderName = path.basename(targetActivity.path); // 从路径提取文件夹名
      detailPageFolder = join(process.cwd(), 'app', region, activityType, folderName);
      detailLink = targetActivity.path;
      
      console.log(`📁 覆盖现有页面: ${targetActivity.path}`);
    } else {
      // 新建模式：生成新的页面路径
      console.log(`🆕 新建模式：生成新的活动页面`);
      
      activityId = activityData.id || Date.now().toString();
      // 统一格式：activity-年份-地区-活动类型-标号
      const currentYear = new Date().getFullYear();
      const serialNumber = Date.now().toString().slice(-3); // 使用时间戳后3位作为标号
      const folderName = `activity-${currentYear}-${region}-${activityType}-${serialNumber}`;
      detailPageFolder = join(process.cwd(), 'app', region, activityType, folderName);
      detailLink = `/${region}/${activityType}/${folderName}`;
      
      console.log(`✨ 新建页面：${detailLink}`);
    }

    console.log(`📁 准备生成祭典页面: ${detailLink}`);
    console.log(`🆔 活动ID: ${activityId}`);

    // 添加ID和图片到活动数据
    const dataWithId = {
      ...activityData,
      id: activityId,
      images: images || []  // ✅ 添加图片数据
    };

    // 生成页面文件
    const { filePath } = await generatePageFile(
      region,
      activityType,
      dataWithId,
      detailPageFolder
    );

    // 生成JSON文件
    const { activityFile, regionFile, data } = await generateJsonFiles(
      region,
      activityType,
      dataWithId,
      detailLink
    );

    // 构建返回结果
    const result = {
      success: true,
      databaseId: activityId,
      pageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${detailLink}`,
      detailLink,
      jsonFiles: [activityFile, regionFile],
      generatedFiles: [filePath, activityFile, regionFile],
      message: '祭典四层页面生成成功'
    };

    console.log('✅ 祭典页面生成完成:', result);

    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ 祭典页面生成失败:', error);
    
    return NextResponse.json(
      { 
        error: '祭典页面生成失败', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 