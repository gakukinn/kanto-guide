import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import fs from 'fs/promises'; // 添加fs导入
import { join } from 'path';
import path from 'path'; // 添加path导入

// 活动类型配置 - 专门用于花火
const ACTIVITY_CONFIGS = {
  hanabi: { 
    model: 'hanabiEvent',
    table: 'HanabiEvent',
    template: 'WalkerPlusHanabiTemplate'
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

// 🔧 从合并的contact字段中解析出14项WalkerPlus字段
const parseContactFields = (contactText: string) => {
  const fields = {
    fireworksCount: '',
    fireworksTime: '',
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
    
    if (trimmedLine.startsWith('打ち上げ数:')) {
      fields.fireworksCount = trimmedLine.replace('打ち上げ数:', '').trim();
    } else if (trimmedLine.startsWith('打ち上げ時間:')) {
      fields.fireworksTime = trimmedLine.replace('打ち上げ時間:', '').trim();
    } else if (trimmedLine.startsWith('例年の人出:')) {
      fields.expectedVisitors = trimmedLine.replace('例年の人出:', '').trim();
    } else if (trimmedLine.startsWith('荒天の場合:')) {
      fields.weatherInfo = trimmedLine.replace('荒天の場合:', '').trim();
    } else if (trimmedLine.startsWith('屋台など:')) {
      fields.foodStalls = trimmedLine.replace('屋台など:', '').trim();
    } else if (trimmedLine.startsWith('駐車場:')) {
      fields.parking = trimmedLine.replace('駐車場:', '').trim();
    } else if (trimmedLine.startsWith('その他・全体備考:')) {
      fields.notes = trimmedLine.replace('その他・全体備考:', '').trim();
    }
  }
  
  return fields;
};

// 🔄 统一页面文件生成逻辑 - 遵循Activity Generator标准
const generatePageFile = async (
  region: string,
  activityType: string,
  data: any,
  detailPageFolder: string
): Promise<{ filePath: string; detailLink: string }> => {
  const config = ACTIVITY_CONFIGS[activityType as keyof typeof ACTIVITY_CONFIGS];
  const templateName = config?.template || 'UniversalStaticDetailTemplate';
  
  // 🔧 修复1：使用标准的DetailPage组件名（与Activity Generator一致）
  const componentName = 'DetailPage';
  
  // 🔧 解析合并在contact字段中的WalkerPlus字段
  const contactFields = parseContactFields(data.contact || data.contactInfo || '');
  
  // 🔧 智能分离日期和时间
  const { date: separatedDate, time: separatedTime } = separateDateAndTime(data.datetime || '');
  
  // 调试日志：检查传入generatePageFile的数据
  console.log(`🔧 generatePageFile: description=${data.description ? '已设置' : '未设置'}, highlights=${data.highlights ? '已设置' : '未设置'}`);
  console.log(`🔧 日期时间分离: separatedDate="${separatedDate}", separatedTime="${separatedTime}"`);
  
  // 🔧 修复：从WalkerPlus文本识别的walkerFields中提取字段
  const extractWalkerField = (label: string) => {
    if (data.walkerFields && Array.isArray(data.walkerFields)) {
      const field = data.walkerFields.find((f: any) => f.label === label);
      return field ? field.value : '';
    }
    return '';
  };

  // 🔧 调试：检查walkerFields数据
  console.log('🔍 WalkerFields数据检查:');
  console.log('  data.walkerFields存在:', !!data.walkerFields);
  if (data.walkerFields && Array.isArray(data.walkerFields)) {
    console.log('  walkerFields数量:', data.walkerFields.length);
    console.log('  可用字段:', data.walkerFields.map((f: any) => f.label).join(', '));
    console.log('  打ち上げ数:', extractWalkerField('打ち上げ数'));
    console.log('  打ち上げ時間:', extractWalkerField('打ち上げ時間'));
    console.log('  例年の人出:', extractWalkerField('例年の人出'));
  }

  // 准备符合WalkerPlusHanabiTemplate期望的数据格式（14项独立字段）
  const standardData = {
    // 14项WalkerPlus花火数据字段（独立字段，不是数组）- 统一兜底逻辑
    name: data.name || data.eventName || extractWalkerField('大会名') || '详见官网',
    fireworksCount: data.fireworksCount || extractWalkerField('打ち上げ数') || contactFields.fireworksCount || '详见官网',
    fireworksTime: data.fireworksTime || data.fireworksDuration || extractWalkerField('打ち上げ時間') || contactFields.fireworksTime || '详见官网',
    expectedVisitors: data.expectedVisitors || extractWalkerField('例年の人出') || contactFields.expectedVisitors || '详见官网',
    date: data.date || data.eventPeriod || extractWalkerField('開催期間') || separatedDate || '详见官网',
    time: data.time || data.eventTime || extractWalkerField('開催時間') || separatedTime || '详见官网',
    venue: data.venue || extractWalkerField('会場') || '详见官网',
    access: data.access || data.venueAccess || extractWalkerField('会場アクセス') || '详见官网',
    weatherInfo: data.weatherInfo || data.weatherPolicy || extractWalkerField('荒天の場合') || contactFields.weatherInfo || '详见官网',
    parking: data.parking || extractWalkerField('駐車場') || contactFields.parking || '详见官网',
    price: data.price || data.paidSeats || extractWalkerField('有料席') || '', // 价格特殊：空字符串表示免费
    contact: data.contact || data.contactInfo || extractWalkerField('問い合わせ') || '详见官网',
    foodStalls: data.foodStalls || extractWalkerField('屋台など') || contactFields.foodStalls || '详见官网',
    notes: data.notes || data.otherNotes || extractWalkerField('その他・全体備考') || contactFields.notes || '详见官网',
    
    // 附加字段
    website: data.officialSite || data.website || '',
    googleMap: data.googleMap || '',
    
    // 系统字段
    id: data.id,
    region: data.region || region,
    activityType: activityType,
    description: data.description || data.name || data.eventName || '',
    highlights: data.highlights,
    themeColor: 'red',
    status: 'scheduled',
    
    // 图片数据
    media: data.images ? data.images.map((url: string, index: number) => ({
      type: 'image' as const,
      url: url,
      title: `${data.eventName || data.name || '活动'}图片${index + 1}`,
      alt: `${data.eventName || data.name || '活动'}图片${index + 1}`,
      caption: ''
    })) : (data.media || []),
    
    // 其他必要字段
    detailLink: `/${region}/${activityType}/${detailPageFolder}`,
    createdAt: data.createdAt || new Date().toISOString(),
    source: 'walkerplus-generator',
  };

  // 🔧 调试：验证最终字段映射效果
  console.log('🎯 最终字段映射验证:');
  console.log('  fireworksCount:', standardData.fireworksCount || '空');
  console.log('  fireworksTime:', standardData.fireworksTime || '空');
  console.log('  expectedVisitors:', standardData.expectedVisitors || '空');
  console.log('  weatherInfo:', standardData.weatherInfo || '空');
  console.log('  parking:', standardData.parking || '空');
  console.log('  contact:', standardData.contact || '空');

  // 🔧 修复3：使用与Activity Generator相同的页面结构和注释格式
  const pageContent = `/**
 * ${data.name || data.eventName || '活动'} 详情页面
 * 自动生成于 ${new Date().toISOString()}
 * 使用模板: ${templateName}
 */
import ${templateName} from '../../../../src/components/${templateName}';

const activityData = ${JSON.stringify(standardData, null, 2)
    .replace(/"type": "image"/g, 'type: "image" as const')  // 先添加类型断言
    .replace(/"type": "video"/g, 'type: "video" as const')
    .replace(/"([^"]+)":/g, '$1:')  // 再移除属性名的引号
    .replace(/"createdAt": "([^"]*)"/, 'createdAt: new Date("$1")')
    .replace(/"updatedAt": "([^"]*)"/, 'updatedAt: new Date("$1")')};

export default function ${componentName}() {
  return (
    <${templateName}
      data={activityData}
      regionKey="${region}"
      activityKey="${activityType}"
    />
  );
}

export const metadata = {
  title: '${data.name || data.eventName || '活动'} - 日本活动指南',
  description: '${data.description || data.parsedDescription || data.name || data.eventName || '详细的活动信息和参观指南'}',
};
`;

  // 使用Activity Generator的标准路径结构
  const targetDir = path.join(process.cwd(), 'app', region, activityType, detailPageFolder);
  const filePath = path.join(targetDir, 'page.tsx');
  
  // 确保目录存在
  await mkdir(targetDir, { recursive: true });
  
  // 写入文件
  await writeFile(filePath, pageContent, 'utf8');
  
  const detailLink = `/${region}/${activityType}/${detailPageFolder}`;
  
  return {
    filePath: filePath.replace(process.cwd(), ''),
    detailLink
  };
};

// 🔄 统一JSON文件生成逻辑 - 遵循Activity Generator标准
const generateJsonFiles = async (
  region: string,
  activityType: string,
  activityData: any,
  detailLink: string
): Promise<{ activityFile: string; regionFile: string; data: any }> => {
  // 转换数据为JSON格式 - 包含完整18项WalkerPlus字段
  const jsonData = {
    id: activityData.id,
    // 🔧 修复：包含完整的14项WalkerPlus字段 - 统一兜底逻辑
    name: activityData.name || '详见官网',
    fireworksCount: activityData.fireworksCount || '详见官网',
    fireworksTime: activityData.fireworksTime || '详见官网',
    expectedVisitors: activityData.expectedVisitors || '详见官网',
    date: activityData.date || '详见官网',
    time: activityData.time || '详见官网',
    venue: activityData.venue || '详见官网',
    access: activityData.access || '详见官网',
    weatherInfo: activityData.weatherInfo || '详见官网',
    parking: activityData.parking || '详见官网',
    price: activityData.price || '', // 价格特殊：空字符串表示免费
    contact: activityData.contact || '详见官网',
    foodStalls: activityData.foodStalls || '详见官网',
    notes: activityData.notes || '详见官网',
    website: activityData.website || '',
    googleMap: activityData.googleMap || '',
    description: activityData.description || '',
    highlights: activityData.highlights || '',
    
    // 系统字段
    region: activityData.region || region,
    activityType: activityType,
    detailLink: detailLink,
    themeColor: 'red',
    status: 'scheduled',
    // 🔧 修复：将images转换为media格式，供WalkerPlusHanabiTemplate使用
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
    // 1. 创建单个活动JSON文件 (data/activities/recognition-{type}-{timestamp}.json) - 与三层生成器兼容
    const activitiesDir = path.join(process.cwd(), 'data', 'activities');
    await mkdir(activitiesDir, { recursive: true });
    
    // 🔧 修复：使用标准的recognition格式文件命名，确保三层生成器能识别
    // 🚨 防止双重前缀：清理ID中已存在的recognition前缀
    const cleanId = activityData.id.replace(/^recognition-[^-]+-/, '');
    const standardFileName = `recognition-${activityType}-${cleanId}.json`;
    const activityFilePath = path.join(activitiesDir, standardFileName);
    await writeFile(activityFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    
    // 2. 更新地区汇总JSON文件 (data/regions/{region}/{activity}.json) - Activity Generator标准
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
    
    // 创建地区汇总格式的数据（与三层页面生成器兼容）
    const regionSummaryData = {
      id: activityData.id,
      title: activityData.name || '',
      description: activityData.description || '',
      location: activityData.venue || '',
      date: activityData.date || '',
      time: activityData.time || '',
      fireworksCount: activityData.fireworksCount || '',
      expectedVisitors: activityData.expectedVisitors || '',
      image: (activityData.images && activityData.images.length > 0) ? activityData.images[0] : '',
      detailLink: detailLink,
      likes: 0,
      themeColor: 'red'
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

// 🚨 智能重复检测函数
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
          
          // 🧠 智能相似度判断
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
            
            // 🔧 修复：正确计算现有活动的路径信息
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

export async function POST(request: NextRequest) {
  try {
    const { 
      data, 
      activityType, 
      region, 
      images = [], 
      duplicateAction, 
      overwriteTarget: providedOverwriteTarget,
      forceOverwrite = false
    } = await request.json();

    // 🔍 详细调试：输入数据分析
    console.log('='.repeat(50));
    console.log('🔍 WalkerPlus页面生成器 - 输入数据分析');
    console.log('='.repeat(50));
    console.log('📥 接收到的原始data对象:');
    console.log('  data.name:', data?.name || 'undefined');
    console.log('  data.eventName:', data?.eventName || 'undefined');
    console.log('  data.description:', data?.description || 'undefined');
    console.log('  data.highlights:', data?.highlights || 'undefined');
    console.log('  data.parsedDescription:', data?.parsedDescription || 'undefined');
    console.log('📍 活动类型和地区:');
    console.log('  activityType:', activityType);
    console.log('  region:', region);
    console.log('='.repeat(50));

    if (!data || !(data.name || data.eventName)) {
      return NextResponse.json({ 
        success: false, 
        error: '缺少必要的活动数据' 
      }, { status: 400 });
    }

    if (!ACTIVITY_CONFIGS[activityType as keyof typeof ACTIVITY_CONFIGS]) {
      return NextResponse.json({ 
        success: false, 
        error: `不支持的活动类型: ${activityType}` 
      }, { status: 400 });
    }

    // 🚨 智能重复检测：基于活动名称、日期、地址的智能判断
    const duplicateCheck = await checkForDuplicates(data.eventName || data.name || '', region, activityType, data);
    
    let detailPageFolder: string;
    let detailLink: string;
    let targetDir: string;
    let overwriteTarget = providedOverwriteTarget;
    
    if (duplicateCheck.isDuplicate && !forceOverwrite) {
      console.log(`⚠️ 检测到 ${duplicateCheck.count} 个高度相似活动，需要用户确认`);
      return NextResponse.json({
        success: false,
        isConflict: true,
        message: `检测到 ${duplicateCheck.count} 个高度相似活动，请仔细对比后选择处理方式`,
        data: {
          // 当前要生成的活动信息（使用解析器字段名）
          currentActivity: {
            name: data.eventName || data.name,
            date: data.eventPeriod || data.date,
            venue: data.venue,
            fireworksCount: data.fireworksCount,
            fireworksTime: data.fireworksDuration || data.fireworksTime
          },
          // 所有相似活动的详细信息
          similarActivities: duplicateCheck.similarActivities.map(item => ({
            similarity: item.similarity,
            activity: {
              name: item.activity.name,
              date: item.activity.date,
              venue: item.activity.venue,
              fireworksCount: item.activity.fireworksCount,
              fireworksTime: item.activity.fireworksTime,
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
      console.log(`🔄 强制覆盖模式：覆盖现有活动 ${data.name || data.eventName}`);
      
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
      
      // 确保overwriteTarget被设置
      if (!overwriteTarget) {
        overwriteTarget = targetActivity.id;
      }
      
      // 使用选定活动的路径
      detailPageFolder = targetActivity.folder;
      detailLink = targetActivity.path;
      targetDir = targetActivity.targetDir;
      
      console.log(`📁 覆盖现有页面: ${targetActivity.path}`);
    } else {
      // 新建模式：生成新的页面路径
      console.log(`🆕 新建模式：生成新的活动页面`);
      
      // 统一格式：activity-年份-地区-活动类型-标号
      const currentYear = new Date().getFullYear();
      const serialNumber = Date.now().toString().slice(-3); // 使用时间戳后3位作为标号
      detailPageFolder = `activity-${currentYear}-${region}-${activityType}-${serialNumber}`;
      detailLink = `/${region}/${activityType}/${detailPageFolder}`;
      targetDir = path.join(process.cwd(), 'app', region, activityType, detailPageFolder);
      
      console.log(`✨ 新建页面：${detailLink}`);
    }
    
    // 🔧 修复：应用与generatePageFile相同的字段映射逻辑
    const { date: separatedDate, time: separatedTime } = separateDateAndTime(data.datetime || '');
    const contactFields = parseContactFields(data.contact || '');
    
    // 提取WalkerPlus字段的辅助函数
    const extractWalkerField = (label: string) => {
      if (data.walkerFields && Array.isArray(data.walkerFields)) {
        const field = data.walkerFields.find((f: any) => f.label === label);
        return field ? field.value : '';
      }
      return '';
    };

    // 准备完整的活动数据 - 应用完整的14项WalkerPlus字段映射（与generatePageFile保持一致）
    const completeActivityData = {
      // 🔧 14项WalkerPlus标准字段（与generatePageFile中的standardData完全一致）- 统一兜底逻辑
      name: data.name || data.eventName || extractWalkerField('大会名') || '详见官网',
      fireworksCount: data.fireworksCount || extractWalkerField('打ち上げ数') || contactFields.fireworksCount || '详见官网',
      fireworksTime: data.fireworksTime || data.fireworksDuration || extractWalkerField('打ち上げ時間') || contactFields.fireworksTime || '详见官网',
      expectedVisitors: data.expectedVisitors || extractWalkerField('例年の人出') || contactFields.expectedVisitors || '详见官网',
      date: data.date || data.eventPeriod || extractWalkerField('開催期間') || separatedDate || '详见官网',
      time: data.time || data.eventTime || extractWalkerField('開催時間') || separatedTime || '详见官网',
      venue: data.venue || extractWalkerField('会場') || '详见官网',
      access: data.access || data.venueAccess || extractWalkerField('会場アクセス') || '详见官网',
      weatherInfo: data.weatherInfo || data.weatherPolicy || extractWalkerField('荒天の場合') || contactFields.weatherInfo || '详见官网',
      parking: data.parking || extractWalkerField('駐車場') || contactFields.parking || '详见官网',
      price: data.price || data.paidSeats || extractWalkerField('有料席') || '', // 价格特殊：空字符串表示免费
      contact: data.contact || data.contactInfo || extractWalkerField('問い合わせ') || '详见官网',
      foodStalls: data.foodStalls || extractWalkerField('屋台など') || contactFields.foodStalls || '详见官网',
      notes: data.notes || data.otherNotes || extractWalkerField('その他・全体備考') || contactFields.notes || '详见官网',
      website: data.officialSite || data.website || '',
      googleMap: data.googleMap || '',
      
      // 描述和亮点字段
      description: (() => {
        if (data.description && data.description.length > 50) {
          return data.description;
        }
        return data.parsedDescription || data.name || data.eventName || '';
      })(),
      highlights: (() => {
        if (data.highlights && data.highlights.length > 10) {
          return data.highlights;
        }
        return '';
      })(),
      
      // 系统字段
      id: '', // 稍后设置
      region,
      activityType,
      images: images,
      detailLink: detailLink,
      createdAt: new Date().toISOString(),
      source: 'walkerplus-generator',
      themeColor: 'red',
      status: 'scheduled'
    };

    // 🚨 静态页面模式：不使用数据库，生成或重用ID
    let staticId: string;
    
    if (duplicateCheck.isDuplicate && forceOverwrite && overwriteTarget) {
      // 覆盖模式：重用现有ID
      staticId = overwriteTarget;
      console.log(`🔄 覆盖模式：重用现有ID=${staticId}`);
    } else {
      // 新建模式：生成新ID
      staticId = Date.now().toString();
      console.log(`🆕 新建模式：生成新ID=${staticId}`);
    }
    
    completeActivityData.id = staticId;

    // 生成页面文件
    const pageResult = await generatePageFile(region, activityType, completeActivityData, detailPageFolder);
    
    // 生成JSON文件
    const jsonResult = await generateJsonFiles(region, activityType, completeActivityData, detailLink);

    // 构建页面URL
    const pageUrl = `${request.nextUrl.origin}${pageResult.detailLink}`;

    return NextResponse.json({
      success: true,
      pagePath: pageResult.filePath,
      pageUrl,
      detailLink: pageResult.detailLink,
      detailPageFolder,
      staticId,
      jsonFiles: [jsonResult.activityFile, jsonResult.regionFile], // 统一格式
      activityData: completeActivityData,
      jsonData: jsonResult.data // 添加JSON数据
    });

  } catch (error) {
    console.error('页面生成失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : '页面生成失败' 
    }, { status: 500 });
  }
}