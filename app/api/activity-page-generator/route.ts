import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// 活动类型配置 - 统一使用UniversalStaticDetailTemplate
const ACTIVITY_CONFIGS = {
  matsuri: {
    name: '传统祭典',
    template: 'UniversalStaticDetailTemplate',
    model: 'matsuriEvent',
    urlPath: 'matsuri'
  },
  hanami: {
    name: '花见会',
    template: 'UniversalStaticDetailTemplate', 
    model: 'hanamiEvent',
    urlPath: 'hanami'
  },
  hanabi: {
    name: '花火会',
    template: 'UniversalStaticDetailTemplate',
    model: 'hanabiEvent',
    urlPath: 'hanabi'
  },
  momiji: {
    name: '红叶狩',
    template: 'UniversalStaticDetailTemplate',
    model: 'momijiEvent',
    urlPath: 'momiji'
  },
  illumination: {
    name: '灯光秀',
    template: 'UniversalStaticDetailTemplate',
    model: 'illuminationEvent',
    urlPath: 'illumination'
  },
  culture: {
    name: '文艺术',
    template: 'UniversalStaticDetailTemplate',
    model: 'cultureEvent',
    urlPath: 'culture'
  }
} as const;

// 🆕 JSON文件生成函数
async function generateJSONFiles(activityType: keyof typeof ACTIVITY_CONFIGS, data: any, region: string, uploadedImages: string[] = [], detailLink?: string) {
  const config = ACTIVITY_CONFIGS[activityType];
  
  // 转换数据为JSON格式
  const jsonData = {
    id: data.id,
    name: data.name || '',
    address: data.address || '',
    datetime: data.datetime || '',
    venue: data.venue || '',
    access: data.access || '',
    organizer: data.organizer || '',
    price: data.price || '',
    contact: data.contact || '',
    website: data.website || '',
    googleMap: generateMapEmbedUrl(data.googleMap || ''),
    region: data.region || region,
    description: data.description || '',
    activityType: activityType,
    themeColor: 'red',
    status: 'scheduled',
    media: uploadedImages.map((url, index) => ({
      type: 'image',
      url: url,
      title: `${data.name || '活动'}图片${index + 1}`,
      alt: `${data.name || '活动'}图片${index + 1}`,
      caption: ''
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    // 1. 创建单个活动JSON文件 (data/activities/{id}.json)
    const activitiesDir = path.join(process.cwd(), 'data', 'activities');
    await fs.mkdir(activitiesDir, { recursive: true });
    
    const activityFilePath = path.join(activitiesDir, `${data.id}.json`);
    await fs.writeFile(activityFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    
    // 2. 更新地区汇总JSON文件 (data/regions/{region}/{activity}.json)
    const regionDir = path.join(process.cwd(), 'data', 'regions', region);
    await fs.mkdir(regionDir, { recursive: true });
    
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
      id: data.id,
      title: data.name || '',
      description: data.description || '',
      location: data.address || '',
      date: data.datetime || '',
      image: uploadedImages.length > 0 ? uploadedImages[0] : '',
      detailLink: detailLink,
      likes: 0,
      themeColor: 'red'
    };

    // 检查是否已存在同ID的活动
    const existingIndex = regionData.findIndex((item: any) => item.id === data.id);
    if (existingIndex >= 0) {
      // 更新现有记录
      regionData[existingIndex] = regionSummaryData;
    } else {
      // 添加新记录
      regionData.push(regionSummaryData);
    }
    
    // 按创建时间排序
    regionData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    await fs.writeFile(regionFilePath, JSON.stringify(regionData, null, 2), 'utf-8');
    
    console.log(`✅ JSON文件生成成功:`);
    console.log(`   - 单个活动: ${activityFilePath}`);
    console.log(`   - 地区汇总: ${regionFilePath}`);
    
    return {
      activityFile: activityFilePath,
      regionFile: regionFilePath,
      data: jsonData
    };
    
  } catch (error) {
    console.error('❌ JSON文件生成失败:', error);
    throw error;
  }
}

// 数据转换函数 - 根据活动类型转换数据格式
function transformDataForTemplate(activityType: keyof typeof ACTIVITY_CONFIGS, data: any, uploadedImages: string[] = []) {
  // 🚨 只使用数据库中实际存在的十一项字段，删除所有虚假字段
  // 1. name - 名称
  // 2. address - 所在地  
  // 3. datetime - 开催期间时间
  // 4. venue - 开催场所
  // 5. access - 交通方式
  // 6. organizer - 主办方
  // 7. price - 料金
  // 8. contact - 联系方式
  // 9. website - 官方网站
  // 10. googleMap - 谷歌地图位置
  // 11. region - 地区
  
  const baseData = {
    // 🔥 核心数据库字段 - 直接映射，不添加任何虚假字段
    id: data.id,
    name: data.name || '',
    address: data.address || '',
    datetime: data.datetime || '',
    venue: data.venue || '',
    access: data.access || '',
    organizer: data.organizer || '',
    price: data.price || '',
    contact: data.contact || '',
    website: data.website || '',
    googleMap: generateMapEmbedUrl(data.googleMap || ''),
    region: data.region || '',
    description: data.description || '', // ✅ 添加活动描述字段

    // 🎯 模板显示需要的最小字段（固定值）
    themeColor: 'red',
    status: 'scheduled',
    
    // 🖼️ 媒体文件（上传的图片）- 统一16:9比例格式
    media: uploadedImages.map((url, index) => ({
      type: 'image' as const,
      url: url, // 前端已提供正确的服务器路径
      title: `${data.name || '活动'}图片${index + 1}`,
      alt: `${data.name || '活动'}图片${index + 1}`,
      caption: ''
    }))
  };

  return baseData;
}

// 生成页面内容的函数
function generatePageContent(activityType: keyof typeof ACTIVITY_CONFIGS, data: any, uploadedImages: string[] = []) {
  const config = ACTIVITY_CONFIGS[activityType];
  
  // 转换数据为模板期望的格式
  const transformedData = transformDataForTemplate(activityType, data, uploadedImages);
  
  // 生成页面内容 - 🔄 纯静态页面
  return `import React from 'react';
import ${config.template} from '../../../../src/components/${config.template}';

/**
 * 🔄 纯静态${config.name}详情页面
 * 数据库ID: ${data.id}
 * 生成时间: ${new Date().toLocaleString()}
 * 模板: ${config.template}
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: ${data.name || '未设置'}
 * 2. 所在地: ${data.address || '未设置'}
 * 3. 开催期间: ${data.datetime || '未设置'}
 * 4. 开催场所: ${data.venue || '未设置'}
 * 5. 交通方式: ${data.access || '未设置'}
 * 6. 主办方: ${data.organizer || '未设置'}
 * 7. 料金: ${data.price || '未设置'}
 * 8. 联系方式: ${data.contact || '未设置'}
 * 9. 官方网站: ${data.website || '未设置'}
 * 10. 谷歌地图: ${data.googleMap || '未设置'}
 * 11. 地区: ${data.region || '未设置'}
 */

const ${config.name.replace(/[^a-zA-Z0-9]/g, '')}DetailPage = () => {
  // 转换后的活动数据
  const activityData = ${JSON.stringify(transformedData, null, 2)
    .replace(/"type": "image"/g, 'type: "image" as const')  // 先添加类型断言
    .replace(/"type": "video"/g, 'type: "video" as const')
    .replace(/"([^"]+)":/g, '$1:')  // 再移除属性名的引号
    .replace(/"createdAt": "([^"]*)"/, 'createdAt: new Date("$1")')
    .replace(/"updatedAt": "([^"]*)"/, 'updatedAt: new Date("$1")')};

  // 确定地区键 - 使用标准化的地区映射
  const REGION_MAP = {
    'tokyo': 'tokyo',
    'saitama': 'saitama', 
    'chiba': 'chiba',
    'kanagawa': 'kanagawa',
    'kitakanto': 'kitakanto',
    'koshinetsu': 'koshinetsu',
    '東京都': 'tokyo',
    '東京': 'tokyo',
    '埼玉県': 'saitama',
    '埼玉': 'saitama',
    '千葉県': 'chiba',
    '千葉': 'chiba',
    '神奈川県': 'kanagawa',
    '神奈川': 'kanagawa',
    '茨城県': 'kitakanto',
    '栃木県': 'kitakanto',
    '群馬県': 'kitakanto',
    '新潟県': 'koshinetsu',
    '長野県': 'koshinetsu',
    '山梨県': 'koshinetsu'
  };
  const regionKey = REGION_MAP["${data.region || ''}"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <${config.template}
        data={activityData}
        regionKey={regionKey}
        activityKey="${activityType}"
      />
    </div>
  );
};

export default ${config.name.replace(/[^a-zA-Z0-9]/g, '')}DetailPage;`;
}

/**
 * 智能地图URL生成器 - 修复404问题
 * 支持多种输入格式：
 * 1. 完整的Google Maps嵌入URL
 * 2. 地址文本（自动转换为嵌入URL）
 * 3. 坐标（lat,lng格式）
 */
function generateMapEmbedUrl(input: string): string {
  if (!input || input.trim() === '') {
    return '';
  }

  const trimmedInput = input.trim();

  // 1. 如果已经是Google Maps嵌入URL，检查格式
  if (trimmedInput.includes('google.com/maps')) {
    // 如果已经有output=embed，直接返回
    if (trimmedInput.includes('output=embed')) {
      return trimmedInput;
    }
    // 如果是其他格式的Google Maps URL，转换为嵌入格式
    if (trimmedInput.includes('maps.google.com') || trimmedInput.includes('google.com/maps')) {
      return trimmedInput;
    }
  }

  // 2. 如果是坐标格式 (lat,lng) - 使用修复后的格式
  const coordMatch = trimmedInput.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
  if (coordMatch) {
    const [, lat, lng] = coordMatch;
    return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  // 3. 普通地址文本，转换为搜索URL - 使用修复后的格式
  const encodedAddress = encodeURIComponent(trimmedInput);
  return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

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

// 🗓️ 日期相似度判断
const areDatesSimilar = (date1: string, date2: string): boolean => {
  if (!date1 || !date2) return false;
  
  // 提取年月日数字
  const extractNumbers = (dateStr: string) => {
    const matches = dateStr.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  };
  
  const nums1 = extractNumbers(date1);
  const nums2 = extractNumbers(date2);
  
  // 如果都有年月日信息，比较年月日
  if (nums1.length >= 3 && nums2.length >= 3) {
    return nums1[0] === nums2[0] && nums1[1] === nums2[1] && nums1[2] === nums2[2];
  }
  
  // 如果只有月日信息，比较月日
  if (nums1.length >= 2 && nums2.length >= 2) {
    const month1 = nums1[nums1.length >= 3 ? 1 : 0];
    const day1 = nums1[nums1.length >= 3 ? 2 : 1];
    const month2 = nums2[nums2.length >= 3 ? 1 : 0];
    const day2 = nums2[nums2.length >= 3 ? 2 : 1];
    return month1 === month2 && day1 === day2;
  }
  
  return false;
};

// 🏠 地址相似度判断
const areAddressesSimilar = (addr1: string, addr2: string): boolean => {
  if (!addr1 || !addr2) return false;
  
  // 提取关键地名信息
  const extractKeywords = (address: string) => {
    // 匹配区、市、町、村等地名关键词
    const matches = address.match(/[^\s]+?[区市町村]/g) || [];
    return matches.map(match => match.replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ''));
  };
  
  const keywords1 = extractKeywords(addr1);
  const keywords2 = extractKeywords(addr2);
  
  // 检查是否有相同的地名关键词
  return keywords1.some(k1 => keywords2.some(k2 => k1.includes(k2) || k2.includes(k1)));
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { databaseId, recognitionData, activityType, forceOverwrite = false, overwriteTargetId = null, options = {} } = body;
    
    // 🐛 调试信息：检查forceOverwrite的值
    console.log(`🔧 调试信息 - forceOverwrite: ${forceOverwrite} (类型: ${typeof forceOverwrite})`);

    // 验证参数 - 支持两种模式：数据库模式和识别数据模式
    if (!databaseId && !recognitionData) {
      return NextResponse.json({
        success: false,
        message: '缺少数据库记录ID或识别数据'
      }, { status: 400 });
    }

    if (!activityType || !ACTIVITY_CONFIGS[activityType as keyof typeof ACTIVITY_CONFIGS]) {
      return NextResponse.json({
        success: false,
        message: '无效的活动类型'
      }, { status: 400 });
    }

    const config = ACTIVITY_CONFIGS[activityType as keyof typeof ACTIVITY_CONFIGS];
    
    let data: any;
    let isRecognitionMode = false;

    if (databaseId) {
      // JSON文件模式 - 从data/activities目录读取活动数据
      console.log(`开始生成${config.name}页面，活动ID: ${databaseId}`);
      
      try {
        // 从JSON文件读取活动数据
        const activitiesDir = path.join(process.cwd(), 'data', 'activities');
        const activityFilePath = path.join(activitiesDir, `${databaseId.trim()}.json`);
        
        const content = await fs.readFile(activityFilePath, 'utf-8');
        data = JSON.parse(content);
        
        // 验证活动类型是否匹配
        if (data.activityType !== activityType) {
          return NextResponse.json({
            success: false,
            message: `活动类型不匹配：期望 ${activityType}，实际 ${data.activityType}`
          }, { status: 400 });
        }
        
      } catch (fileError) {
        console.error('JSON文件读取错误:', fileError);
        return NextResponse.json({
          success: false,
          message: `读取活动数据失败: ${fileError instanceof Error ? fileError.message : '未知错误'}`
        }, { status: 500 });
      }

      if (!data) {
        return NextResponse.json({
          success: false,
          message: `未找到ID为 ${databaseId} 的${config.name}记录`
        }, { status: 404 });
      }
    } else {
      // 识别数据模式
      console.log(`开始生成${config.name}页面，使用识别数据`);
      isRecognitionMode = true;
      
      // 从识别数据构建数据对象
      const textResult = recognitionData.textResult;
      const contentResult = recognitionData.contentResult;
      const mapResult = recognitionData.mapResult;
      
      // 生成临时ID
      const timestamp = Date.now();
      const tempId = `recognition-${activityType}-${timestamp}`;
      
      // 地区识别逻辑
      const identifyRegionFromAddress = (address: string): string => {
        if (!address) return 'tokyo';
        
        const regionRules = {
          'tokyo': ['东京都', '東京都'],
          'saitama': ['埼玉県', '埼玉县'],
          'chiba': ['千葉県', '千叶县'],
          'kanagawa': ['神奈川県', '神奈川'],
          'kitakanto': ['茨城県', '栃木県', '群馬県'],
          'koshinetsu': ['山梨県', '長野県', '新潟県', '富山県']
        };
        
        for (const [region, keywords] of Object.entries(regionRules)) {
          if (keywords.some(keyword => address.includes(keyword))) {
            return region;
          }
        }
        
        return 'tokyo';
      };

      // 构建数据对象
      data = {
        id: tempId,
        name: textResult?.name || '未命名活动',
        address: textResult?.address || '',
        datetime: textResult?.period || '',
        venue: textResult?.venue || '',
        access: textResult?.access || '',
        organizer: textResult?.organizer || '',
        price: textResult?.price || '',
        contact: textResult?.contact || '',
        website: textResult?.website || '',
        googleMap: mapResult?.coordinates ? `${mapResult.coordinates.lat},${mapResult.coordinates.lng}` : '',
        region: identifyRegionFromAddress(textResult?.address || ''),
        description: contentResult || '',
        englishName: '', // 识别模式下没有英文名
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }

    console.log(`成功读取${config.name}数据:`, {
      id: data.id,
      name: data.name,
      region: data.region,
      verified: data.verified
    });

    // 生成页面内容
    const pageContent = generatePageContent(
      activityType as keyof typeof ACTIVITY_CONFIGS,
      data,
      options.uploadedImages || []
    );

    // 🏗️ 四层页面结构生成
    // 第一层：根目录 (/)
    // 第二层：地区页面 (/tokyo, /saitama, /chiba, /kanagawa, /kitakanto, /koshinetsu)
    // 第三层：活动类型页面 (/tokyo/matsuri, /tokyo/hanami, 等)
    // 第四层：活动详情页面 (/tokyo/matsuri/活动名称-id/) ← 我们要生成的
    
    // 标准化地区映射 - 六个地区（支持日文和英文格式）
    const REGION_MAP: { [key: string]: string } = {
      // 日文格式
      '東京都': 'tokyo',
      '東京': 'tokyo',
      '埼玉県': 'saitama', 
      '埼玉': 'saitama',
      '千葉県': 'chiba',
      '千葉': 'chiba',
      '神奈川県': 'kanagawa',
      '神奈川': 'kanagawa',
      '茨城県': 'kitakanto',
      '栃木県': 'kitakanto', 
      '群馬県': 'kitakanto',
      '新潟県': 'koshinetsu',
      '長野県': 'koshinetsu',
      '山梨県': 'koshinetsu',
      // 英文格式（已经是标准格式）
      'tokyo': 'tokyo',
      'saitama': 'saitama',
      'chiba': 'chiba',
      'kanagawa': 'kanagawa',
      'kitakanto': 'kitakanto',
      'koshinetsu': 'koshinetsu'
    };
    
    // 确定地区路径（第二层）
    const regionPath = REGION_MAP[data.region] || 'tokyo';
    console.log(`🗺️ 地区映射: ${data.region} → ${regionPath}`);
    
    // 活动类型路径（第三层）- 六个活动类型
    const activityTypePath = config.urlPath; // matsuri, hanami, hanabi, momiji, illumination, culture
    
    // 活动详情路径（第四层）- 统一格式：activity-年份-地区-活动类型-标号
    const currentYear = new Date().getFullYear();
    const serialNumber = Date.now().toString().slice(-3); // 使用时间戳后3位作为标号
    let detailPageFolder = `activity-${currentYear}-${regionPath}-${activityTypePath}-${serialNumber}`;
    
    // 额外安全检查，防止双连字符
    detailPageFolder = detailPageFolder.replace(/--+/g, '-'); // 将多个连字符合并为一个
    
    // 完整的四层目录结构：app/{region}/{activityType}/{activityDetail}/
    let targetDir = path.join(process.cwd(), 'app', regionPath, activityTypePath, detailPageFolder);
    
    console.log(`📁 四层页面结构生成:`);
    console.log(`   第一层: / (根目录)`);
    console.log(`   第二层: /${regionPath} (地区)`);
    console.log(`   第三层: /${regionPath}/${activityTypePath} (活动类型)`);
    console.log(`   第四层: /${regionPath}/${activityTypePath}/${detailPageFolder} (活动详情)`);
    console.log(`   目标目录: ${targetDir}`);
    
    // 🚨 重复检查：基于活动名称、日期、地址的智能判断
    const checkForDuplicates = async (activityName: string, region: string, activityType: string) => {
      const activitiesDir = path.join(process.cwd(), 'data', 'activities');
      
      try {
        const files = await fs.readdir(activitiesDir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        const similarActivities = []; // 🆕 存储所有相似活动
        
        for (const file of jsonFiles) {
          try {
            const filePath = path.join(activitiesDir, file);
            const content = await fs.readFile(filePath, 'utf-8');
            const existingData = JSON.parse(content);
            
            // 只检查相同地区和活动类型的活动
            if (existingData.region === region && existingData.activityType === activityType) {
              
              // 🧠 智能相似度判断
              const nameSimilarity = calculateSimilarity(activityName || '', existingData.name || '');
              const dateSimilar = areDatesSimilar(data.period || '', existingData.period || '');
              const addressSimilar = areAddressesSimilar(data.address || '', existingData.address || '');
              
              console.log(`🔍 相似度分析 - ${existingData.name}:`);
              console.log(`   名称相似度: ${(nameSimilarity * 100).toFixed(1)}%`);
              console.log(`   日期相似: ${dateSimilar ? '是' : '否'}`);
              console.log(`   地址相似: ${addressSimilar ? '是' : '否'}`);
              
              // 判断条件：名称相似度 >= 85% 或者 (名称相似度 >= 75% 且 (日期相似 或 地址相似)) 或者 (名称相似度 >= 30% 且 日期相似 且 地址相似)
              const overallSimilarity = nameSimilarity >= 0.85 ? nameSimilarity : 
                                      (nameSimilarity >= 0.75 && (dateSimilar || addressSimilar)) ? nameSimilarity :
                                      (nameSimilarity >= 0.3 && dateSimilar && addressSimilar) ? nameSimilarity : 0;
              
              // 🆕 只收集相似度>0的活动（包括日期+地址匹配的情况）
              if (overallSimilarity > 0) {
                console.log(`✅ 高度相似活动 (${(overallSimilarity * 100).toFixed(1)}%)`);
                
                // 计算现有活动的路径信息
                const existingEnglishName = existingData.englishName || '';
                const existingSanitizedName = existingEnglishName
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, '-')
                  .replace(/-+/g, '-')
                  .replace(/^-|-$/g, '')
                  .substring(0, 30);
                
                // 🔧 修复双连字符：清理现有数据的ID后缀
                const existingIdSuffix = existingData.id.slice(-8).replace(/^-+|-+$/g, '');
                const existingFolder = existingSanitizedName && existingSanitizedName.length >= 3 
                  ? `${existingSanitizedName}-${existingIdSuffix}` 
                  : `activity-${existingIdSuffix}`;
                
                const existingPath = `/${regionPath}/${activityTypePath}/${existingFolder}`;
                const existingTargetDir = path.join(process.cwd(), 'app', regionPath, activityTypePath, existingFolder);
                
                similarActivities.push({
                  similarity: overallSimilarity,
                  activity: existingData,
                  id: existingData.id,
                  file: file,
                  path: existingPath,
                  folder: existingFolder,
                  targetDir: existingTargetDir,
                  url: `http://localhost:3000${existingPath}`,
                  similarityDetails: {
                    name: nameSimilarity,
                    date: dateSimilar,
                    address: addressSimilar
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
        
        // 🆕 按相似度排序，取前3个
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
    
    // 检查重复
    const duplicateCheck = await checkForDuplicates(data.name || '', data.region || '', activityType);
    
    if (duplicateCheck.isDuplicate && !forceOverwrite) {
      console.log(`⚠️ 检测到 ${duplicateCheck.count} 个高度相似活动，需要用户确认`);
      return NextResponse.json({
        success: false,
        isConflict: true,
        message: `检测到 ${duplicateCheck.count} 个高度相似活动，请仔细对比后选择处理方式`,
        data: {
          // 🆕 当前要生成的活动信息
          currentActivity: {
            name: data.name,
            period: data.period || data.datetime,
            address: data.address,
            venue: data.venue
          },
          // 🆕 所有相似活动的详细信息
          similarActivities: duplicateCheck.similarActivities.map(item => ({
            similarity: item.similarity,
            activity: {
              name: item.activity.name,
              period: item.activity.period || item.activity.datetime,
              address: item.activity.address,
              venue: item.activity.venue,
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
      console.log(`🔄 强制覆盖模式：覆盖现有活动 ${data.name}`);
      
      // 🆕 支持指定覆盖目标
      let targetActivity = duplicateCheck.similarActivities[0]; // 默认覆盖第一个
      
      if (overwriteTargetId) {
        // 用户指定了要覆盖的活动ID
        const specifiedTarget = duplicateCheck.similarActivities.find(item => item.id === overwriteTargetId);
        if (specifiedTarget) {
          targetActivity = specifiedTarget;
          console.log(`🎯 用户指定覆盖活动: ${overwriteTargetId} (${specifiedTarget.activity.name})`);
        } else {
          console.log(`⚠️ 指定的覆盖目标ID ${overwriteTargetId} 不在相似活动列表中，使用默认目标`);
        }
      } else {
        console.log(`🔄 使用默认覆盖目标: ${targetActivity.id} (${targetActivity.activity.name})`);
      }
      
      // 使用选定活动的ID和路径
      data.id = targetActivity.id;
      detailPageFolder = targetActivity.folder;
      targetDir = targetActivity.targetDir;
      
      console.log(`📁 覆盖现有页面: ${targetActivity.path}`);
    } else {
      // 🆕 新建模式：生成新的活动页面
      console.log(`🆕 新建模式：生成新的活动页面`);
      
      targetDir = path.join(process.cwd(), 'app', regionPath, activityTypePath, detailPageFolder);
      
      console.log(`📁 新建页面路径: ${targetDir}`);
    }
    
    // 原有的文件路径检查逻辑（现在主要用于日志）
    const fileName = 'page.tsx';
    const filePath = path.join(targetDir, fileName);
    
    try {
      await fs.access(filePath);
      console.log(`🔄 覆盖现有页面文件：${filePath}`);
    } catch (error) {
      console.log(`✨ 新页面生成：${filePath}`);
    }

    await fs.mkdir(targetDir, { recursive: true });

    // 写入文件
    await fs.writeFile(filePath, pageContent, 'utf-8');

    console.log(`${config.name}页面生成成功:`, filePath);

    // 生成访问URL - 标准四层结构
    const url = `http://localhost:3000/${regionPath}/${activityTypePath}/${detailPageFolder}`;
    const detailLink = `/${regionPath}/${activityTypePath}/${detailPageFolder}`;

    // ✅ JSON文件模式：detailLink已在JSON文件生成时包含，无需额外更新
    console.log(`✅ 页面链接已生成: ${detailLink}`);

    // 生成JSON文件
    const jsonResult = await generateJSONFiles(
      activityType as keyof typeof ACTIVITY_CONFIGS,
      data,
      regionPath,
      options.uploadedImages || [],
      detailLink
    );

    return NextResponse.json({
      success: true,
      message: `${config.name}页面生成成功！`,
              data: {
          filePath: filePath.replace(process.cwd(), ''),
          fileName,
          url,
          detailLink,
          databaseId: data.id,
          activityName: data.name,
          template: config.template,
          regionPath,
          activityTypePath,
          detailPageFolder,
          generatedAt: new Date().toISOString(),
          pageStructure: {
            layer1: '根目录 (/)',
            layer2: `地区页面 (/${regionPath})`,
            layer3: `活动类型 (/${regionPath}/${activityTypePath})`,
            layer4: `活动详情 (/${regionPath}/${activityTypePath}/${detailPageFolder})`
          },
          dataCompleteness: {
            total: 10,
            filled: [data.name, data.address, data.datetime, data.venue, data.access, data.organizer, data.price, data.contact, data.website, data.googleMap].filter(Boolean).length
          },
        connectionEstablished: isRecognitionMode ? '🤖 识别模式：页面已生成，未连接数据库' : '✅ 已自动建立与三层卡片的连接',
        activityFile: jsonResult.activityFile,
        regionFile: jsonResult.regionFile,
        jsonData: jsonResult.data
        }
    });

  } catch (error) {
    console.error('页面生成失败:', error);
    return NextResponse.json({
      success: false,
      message: '页面生成失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 