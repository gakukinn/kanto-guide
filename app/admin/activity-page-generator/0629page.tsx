/**
 * 活动页面生成器（六大类型）
 * @description 基于6个DetailTemplate，输入数据库ID，一键生成详情页面
 * 支持：祭典、花见、花火、红叶、灯光、文化艺术
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import ImageSearchWidget from '../../../src/components/shared/ImageSearchWidget';

type ActivityType = 'matsuri' | 'hanami' | 'hanabi' | 'momiji' | 'illumination' | 'culture';

// 🆕 添加地区类型
type RegionType = 'tokyo' | 'saitama' | 'chiba' | 'kanagawa' | 'kitakanto' | 'koshinetsu';

// 可选记录的类型定义
interface SelectableRecord {
  id: string;
  name: string;
}

// 识别功能状态接口
interface RecognitionState {
  text: {
    input: string;
    result: any;
    loading: boolean;
  };
  content: {
    url: string;
    result: string;
    loading: boolean;
  };
  map: {
    url: string;
    result: any;
    loading: boolean;
  };
}

// 🆕 地区配置
const REGION_CONFIGS = {
  tokyo: {
    name: '东京',
    emoji: '🗼',
    description: '首都圈核心地区',
    colors: 'from-red-500 to-pink-500',
    hoverColors: 'from-red-700 to-pink-700'
  },
  saitama: {
    name: '埼玉',
    emoji: '🌾',
    description: '田园与都市的融合',
    colors: 'from-green-500 to-emerald-500',
    hoverColors: 'from-green-700 to-emerald-700'
  },
  chiba: {
    name: '千叶',
    emoji: '🌊',
    description: '海岸与自然的魅力',
    colors: 'from-blue-500 to-cyan-500',
    hoverColors: 'from-blue-700 to-cyan-700'
  },
  kanagawa: {
    name: '神奈川',
    emoji: '⛩️',
    description: '历史与现代的交汇',
    colors: 'from-purple-500 to-indigo-500',
    hoverColors: 'from-purple-700 to-indigo-700'
  },
  kitakanto: {
    name: '北关东',
    emoji: '🏔️',
    description: '山地与温泉的故乡',
    colors: 'from-orange-500 to-amber-500',
    hoverColors: 'from-orange-700 to-amber-700'
  },
  koshinetsu: {
    name: '甲信越',
    emoji: '🏔️',
    description: '山岳与湖泊的绝景',
    colors: 'from-teal-500 to-blue-500',
    hoverColors: 'from-teal-700 to-blue-700'
  }
};

// 活动类型配置 - 统一使用UniversalStaticDetailTemplate
const ACTIVITY_CONFIGS = {
  matsuri: {
    name: '传统祭典',
    emoji: '🏮',
    template: 'UniversalStaticDetailTemplate',
    table: 'MatsuriEvent',
    colors: 'from-orange-500 to-red-500',
    hoverColors: 'from-orange-700 to-red-700'
  },
  hanami: {
    name: '花见会',
    emoji: '🌸',
    template: 'UniversalStaticDetailTemplate', 
    table: 'HanamiEvent',
    colors: 'from-pink-500 to-rose-500',
    hoverColors: 'from-pink-700 to-rose-700'
  },
  hanabi: {
    name: '花火会',
    emoji: '🎆',
    template: 'UniversalStaticDetailTemplate',
    table: 'HanabiEvent', 
    colors: 'from-blue-500 to-purple-500',
    hoverColors: 'from-blue-700 to-purple-700'
  },
  momiji: {
    name: '红叶狩',
    emoji: '🍁',
    template: 'UniversalStaticDetailTemplate',
    table: 'MomijiEvent',
    colors: 'from-yellow-500 to-orange-500',
    hoverColors: 'from-yellow-700 to-orange-700'
  },
  illumination: {
    name: '灯光秀',
    emoji: '✨',
    template: 'UniversalStaticDetailTemplate',
    table: 'IlluminationEvent',
    colors: 'from-indigo-500 to-purple-500',
    hoverColors: 'from-indigo-700 to-purple-700'
  },
  culture: {
    name: '文艺术',
    emoji: '🎭',
    template: 'UniversalStaticDetailTemplate',
    table: 'CultureEvent',
    colors: 'from-green-500 to-teal-500',
    hoverColors: 'from-green-700 to-teal-700'
  }
};

// 🆕 自动地区识别函数 - 优化版本，优先匹配县名
const autoDetectRegion = (text: string): RegionType | null => {
  const regionKeywords = {
    // 第一优先级：县名（最准确）
    primary: {
      tokyo: ['東京都', '东京都', '東京', '东京'],
      saitama: ['埼玉県', '埼玉县', '埼玉'],
      chiba: ['千葉県', '千叶县', '千葉', '千叶'],
      kanagawa: ['神奈川県', '神奈川县', '神奈川'],
      kitakanto: ['群馬県', '群马县', '群馬', '群马', '栃木県', '栃木县', '栃木', '茨城県', '茨城县', '茨城'],
      koshinetsu: ['山梨県', '山梨县', '山梨', '長野県', '长野县', '長野', '长野', '新潟県', '新潟县', '新潟']
    },
    // 第二优先级：主要城市名
    secondary: {
      tokyo: ['新宿', '渋谷', '涉谷', '池袋', '銀座', '银座', '浅草', '上野', '秋葉原', '秋叶原', '六本木', '原宿', '品川', '新橋', '新桥'],
      saitama: ['大宮', '大宫', '浦和', 'さいたま', '川口', '所沢', '越谷', '春日部', '草加', '朝霞'],
      chiba: ['船橋', '船桥', '柏', '松戸', '木更津', '成田', '佐倉', '習志野', '习志野'],
      kanagawa: ['横浜', '横滨', '川崎', '相模原', '藤沢', '茅ヶ崎', '茅崎', '平塚', '鎌倉', '镰仓', '厚木'],
      kitakanto: ['前橋', '前桥', '高崎', '宇都宮', '宇都宫', '水戸', '水户', 'つくば', '筑波'],
      koshinetsu: ['甲府', '松本', '長岡', '长冈', '上越', '富士河口湖', '諏訪', '诹访']
    },
    // 第三优先级：可能重复的城市名（最后检查）
    tertiary: {
      chiba: ['市川'] // 市川市在千叶，但山梨县有市川三郷町，所以放在最低优先级
    }
  };

  const lowerText = text.toLowerCase();
  
  // 第一优先级：检查县名
  for (const [region, keywords] of Object.entries(regionKeywords.primary)) {
    if (keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      return region as RegionType;
    }
  }
  
  // 第二优先级：检查主要城市名
  for (const [region, keywords] of Object.entries(regionKeywords.secondary)) {
    if (keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      return region as RegionType;
    }
  }
  
  // 第三优先级：检查可能重复的城市名
  for (const [region, keywords] of Object.entries(regionKeywords.tertiary)) {
    if (keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      return region as RegionType;
    }
  }
  
  return null;
};

// 🆕 自动活动类型识别函数
const autoDetectActivityType = (text: string): ActivityType | null => {
  const activityKeywords = {
    // 花火优先级最高 - 包含"花火"二字的一定是花火
    hanabi: ['花火', 'はなび', 'ハナビ', 'hanabi', 'fireworks', '花火大会', '花火祭', '打ち上げ花火', '尺玉', 'スターマイン'],
    
    // 传统祭典
    matsuri: ['祭', '祭り', 'まつり', 'matsuri', '祇園祭', '例大祭', '夏祭り', '秋祭り', '神輿', '山車', '盆踊り', '夜店', '屋台'],
    
    // 花见会
    hanami: ['桜', '花見', 'はなみ', 'hanami', 'さくら', 'サクラ', '桜祭り', '桜まつり', '花見会', '桜並木', '桜の名所'],
    
    // 红叶狩
    momiji: ['紅葉', 'もみじ', 'モミジ', 'momiji', '紅葉狩り', '紅葉まつり', '秋の紅葉', '楓', 'かえで', 'カエデ'],
    
    // 灯光秀
    illumination: ['イルミネーション', 'illumination', 'ライトアップ', '点灯', '電飾', 'LED', '夜景', '光の祭典', '光のページェント'],
    
    // 文化艺术
    culture: ['美術館', '博物館', '展覧会', '芸術', 'アート', 'art', '文化祭', '音楽会', 'コンサート', '演劇', '舞台']
  };

  const lowerText = text.toLowerCase();
  
  // 花火优先级最高 - 先检查花火关键词
  if (activityKeywords.hanabi.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
    return 'hanabi';
  }
  
  // 检查其他活动类型
  for (const [activity, keywords] of Object.entries(activityKeywords)) {
    if (activity !== 'hanabi' && keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      return activity as ActivityType;
    }
  }
  
  return null;
};

// 图片压缩函数 - 优化版本，统一16:9比例 (1200x675)
const compressImage = (file: File, maxWidth: number = 1200, maxHeight: number = 675, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // 强制16:9比例
      const targetRatio = 16 / 9;
      let { width, height } = img;
      
      // 先按16:9比例裁剪
      let cropWidth = width;
      let cropHeight = height;
      let cropX = 0;
      let cropY = 0;
      
      const currentRatio = width / height;
      
      if (currentRatio > targetRatio) {
        // 图片太宽，需要裁剪宽度
        cropWidth = height * targetRatio;
        cropX = (width - cropWidth) / 2;
      } else if (currentRatio < targetRatio) {
        // 图片太高，需要裁剪高度
        cropHeight = width / targetRatio;
        cropY = (height - cropHeight) / 2;
      }
      
      // 计算最终输出尺寸（保持16:9）- 优化版本
      let outputWidth = Math.min(maxWidth, cropWidth);   // 不超过最大宽度
      let outputHeight = Math.min(maxHeight, cropHeight); // 不超过最大高度
      
      // 确保比例正确
      if (outputWidth / outputHeight !== targetRatio) {
        if (outputWidth / targetRatio < outputHeight) {
          outputHeight = Math.round(outputWidth / targetRatio);
        } else {
          outputWidth = Math.round(outputHeight * targetRatio);
        }
      }
      
      // 设置canvas尺寸为16:9
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      
      // 启用高质量图像平滑
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // 绘制裁剪并缩放后的图片
        ctx.drawImage(
          img,
          cropX, cropY, cropWidth, cropHeight,  // 源图裁剪区域
          0, 0, outputWidth, outputHeight       // 目标区域
        );
        
        // 调试信息
        console.log('🖼️ 压缩详情:', {
          原图尺寸: `${img.width}x${img.height}`,
          裁剪区域: `${cropWidth}x${cropHeight}`,
          输出尺寸: `${outputWidth}x${outputHeight}`,
          质量设置: quality,
          原文件大小: `${(file.size / 1024 / 1024).toFixed(2)}MB`
        });
        
        // 输出为Blob格式，直接可用于上传
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('📊 压缩结果:', {
              压缩后大小: `${(blob.size / 1024 / 1024).toFixed(2)}MB`,
              压缩率: `${((1 - blob.size / file.size) * 100).toFixed(1)}%`
            });
            resolve(blob);
          } else {
            reject(new Error('图片压缩失败'));
          }
        }, 'image/jpeg', quality);
      } else {
        reject(new Error('Canvas context 获取失败'));
      }
    };
    
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    
    // 读取原始图片
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    reader.readAsDataURL(file);
  });
};



export default function ActivityPageGeneratorPage() {
  const [region, setRegion] = useState<RegionType>('tokyo'); // 🆕 添加地区状态
  const [activityType, setActivityType] = useState<ActivityType>('matsuri');
  const [databaseId, setDatabaseId] = useState('');
  const [availableRecords, setAvailableRecords] = useState<SelectableRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [forceOverwrite, setForceOverwrite] = useState(false); // 默认关闭自动覆盖，让用户选择
  const [selectedOverwriteTarget, setSelectedOverwriteTarget] = useState<string | null>(null); // 选择要覆盖的活动ID
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const [imageSourceMode, setImageSourceMode] = useState<'upload' | 'search' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(''); // 图片获取方式
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🆕 识别功能状态
  const [recognition, setRecognition] = useState<RecognitionState>({
    text: { input: '', result: null, loading: false },
    content: { url: '', result: '', loading: false },
    map: { url: '', result: null, loading: false }
  });
  const [autoDetectedRegion, setAutoDetectedRegion] = useState<RegionType | null>(null);
  const [autoDetectedActivity, setAutoDetectedActivity] = useState<ActivityType | null>(null);

  const currentConfig = ACTIVITY_CONFIGS[activityType];
  const currentRegionConfig = REGION_CONFIGS[region]; // 🆕 添加当前地区配置

  // 🆕 文本识别处理函数 - 带重试机制
  const handleTextRecognition = async (retryCount = 0) => {
    if (!recognition.text.input.trim()) {
      return;
    }

    setRecognition(prev => ({
      ...prev,
      text: { ...prev.text, loading: true }
    }));

    try {
      console.log('发送文本识别请求，重试次数:', retryCount);
      console.log('请求内容:', { text: recognition.text.input.substring(0, 100) + '...' });
      
      const response = await fetch('/api/auto-import-text', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ text: recognition.text.input }),
        cache: 'no-store'
      });

      console.log('文本识别响应状态:', response.status, response.statusText);

      // 先检查响应状态
      if (!response.ok) {
        if (response.status === 404) {
          // 404错误重试机制
          if (retryCount < 2) {
            console.log(`文本识别API返回404，${retryCount + 1}秒后重试...`);
            setTimeout(() => {
              handleTextRecognition(retryCount + 1);
            }, (retryCount + 1) * 1000);
            return;
          }
          throw new Error('文本识别API持续不可用，请检查服务器配置');
        }
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      // 检查响应是否为JSON格式
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('非JSON响应内容:', responseText);
        throw new Error(`服务器返回了非JSON格式的响应 (${response.status})`);
      }

      const result = await response.json();
      console.log('文本识别成功，结果:', result);

      if (result.success) {
        setRecognition(prev => ({
          ...prev,
          text: { ...prev.text, result, loading: false }
        }));
        
        // 🆕 自动识别地区
        const detectedRegion = autoDetectRegion(result.address || result.venue || result.name || '');
        if (detectedRegion) {
          setAutoDetectedRegion(detectedRegion);
          setRegion(detectedRegion); // 自动设置地区
        }
        
        // 🆕 自动识别活动类型 - 花火优先
        const detectedActivity = autoDetectActivityType(result.name || result.description || recognition.text.input);
        if (detectedActivity) {
          setAutoDetectedActivity(detectedActivity);
          setActivityType(detectedActivity); // 自动设置活动类型
        }
        
        // 自动填充表单字段（如果有预览数据）
        if (previewData) {
          setPreviewData((prev: any) => ({
            ...prev,
            name: result.name || prev.name,
            address: result.address || prev.address,
            period: result.period || prev.period,
            venue: result.venue || prev.venue,
            access: result.access || prev.access,
            organizer: result.organizer || prev.organizer,
            price: result.price || prev.price,
            contact: result.contact || prev.contact,
            website: result.website || prev.website
          }));
        }
        
        // 成功提示已通过识别结果显示，无需alert
      } else {
        throw new Error(result.error || '识别失败');
      }
    } catch (error) {
      console.error('文本识别失败:', error);
      // 错误信息通过识别结果区域显示，无需alert
      setRecognition(prev => ({
        ...prev,
        text: { ...prev.text, loading: false }
      }));
    }
  };

  // 🆕 内容识别处理函数 - 带重试机制
  const handleContentRecognition = async (retryCount = 0) => {
    if (!recognition.content.url.trim()) {
      return;
    }

    if (!recognition.content.url.includes('jalan.net')) {
      return;
    }

    setRecognition(prev => ({
      ...prev,
      content: { ...prev.content, loading: true }
    }));

    try {
      console.log('发送内容识别请求，重试次数:', retryCount);
      console.log('请求URL:', recognition.content.url);
      
      const response = await fetch('/api/auto-import-content', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ url: recognition.content.url }),
        cache: 'no-store'
      });

      console.log('内容识别响应状态:', response.status, response.statusText);

      // 先检查响应状态
      if (!response.ok) {
        if (response.status === 404) {
          // 404错误重试机制
          if (retryCount < 2) {
            console.log(`内容识别API返回404，${retryCount + 1}秒后重试...`);
            setTimeout(() => {
              handleContentRecognition(retryCount + 1);
            }, (retryCount + 1) * 1000);
            return;
          }
          throw new Error('内容识别API持续不可用，请检查服务器配置');
        }
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      // 检查响应是否为JSON格式
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('非JSON响应内容:', responseText);
        throw new Error(`服务器返回了非JSON格式的响应 (${response.status})`);
      }

      const result = await response.json();

      if (result.success) {
        setRecognition(prev => ({
          ...prev,
          content: { ...prev.content, result: result.description, loading: false }
        }));
        
        // 自动填充描述字段
        if (previewData) {
          setPreviewData((prev: any) => ({
            ...prev,
            description: result.description || prev.description
          }));
        }
        
        // 成功提示已通过识别结果显示，无需alert
      } else {
        throw new Error(result.message || '识别失败');
      }
    } catch (error) {
      console.error('内容识别失败:', error);
      // 错误信息通过识别结果区域显示，无需alert
      setRecognition(prev => ({
        ...prev,
        content: { ...prev.content, loading: false }
      }));
    }
  };

  // 🆕 地图识别处理函数 - 带重试机制
  const handleMapRecognition = async (retryCount = 0) => {
    if (!recognition.map.url.trim()) {
      return;
    }

    setRecognition(prev => ({
      ...prev,
      map: { ...prev.map, loading: true }
    }));

    try {
      console.log('发送地图识别请求，重试次数:', retryCount);
      console.log('请求URL:', recognition.map.url);
      
      const response = await fetch('/api/auto-import-maps', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ url: recognition.map.url }),
        cache: 'no-store'
      });

      console.log('地图识别响应状态:', response.status, response.statusText);

      // 先检查响应状态
      if (!response.ok) {
        if (response.status === 404) {
          // 404错误重试机制
          if (retryCount < 2) {
            console.log(`地图识别API返回404，${retryCount + 1}秒后重试...`);
            setTimeout(() => {
              handleMapRecognition(retryCount + 1);
            }, (retryCount + 1) * 1000);
            return;
          }
          throw new Error('地图识别API持续不可用，请检查服务器配置');
        }
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      // 检查响应是否为JSON格式
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('非JSON响应内容:', responseText);
        throw new Error(`服务器返回了非JSON格式的响应 (${response.status})`);
      }

      const result = await response.json();

      if (result.success) {
        setRecognition(prev => ({
          ...prev,
          map: { ...prev.map, result, loading: false }
        }));
        
        // 自动填充地图相关字段
        if (previewData && result.coordinates) {
          setPreviewData((prev: any) => ({
            ...prev,
            latitude: result.coordinates.lat,
            longitude: result.coordinates.lng,
            mapEmbedUrl: result.mapEmbedUrl || result.standardEmbedUrl
          }));
        }
        
        // 成功提示已通过识别结果显示，无需alert
      } else {
        throw new Error(result.error || '识别失败');
      }
    } catch (error) {
      console.error('地图识别失败:', error);
      // 错误信息通过识别结果区域显示，无需alert
      setRecognition(prev => ({
        ...prev,
        map: { ...prev.map, loading: false }
      }));
    }
  };

  // 获取可用的记录列表（detailLink为null的记录）
  const fetchAvailableRecords = async (type: ActivityType, selectedRegion: RegionType, retryCount = 0) => {
    setLoadingRecords(true);
    try {
      console.log('开始获取记录，类型:', type, '地区:', selectedRegion, '重试次数:', retryCount);
      const url = `/api/get-null-detaillink-records?type=${type}&region=${selectedRegion}`;
      console.log('请求URL:', url);
      
      // 添加超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        cache: 'no-store',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      console.log('响应状态:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API响应数据:', data);
      
      if (data.success) {
        setAvailableRecords(data.records || []);
        console.log('设置记录成功，数量:', data.records?.length || 0);
      } else {
        console.error('API返回错误:', data.error);
        setAvailableRecords([]);
      }
    } catch (error) {
      console.error('获取记录失败:', error);
      console.error('错误详情:', error instanceof Error ? error.message : '未知错误');
      
      // 如果是网络错误且重试次数少于3次，则重试
      if (retryCount < 3 && (
        error instanceof TypeError || 
        (error instanceof Error && error.message.includes('fetch'))
      )) {
        console.log(`网络错误，${retryCount + 1}秒后重试...`);
        setTimeout(() => {
          fetchAvailableRecords(type, selectedRegion, retryCount + 1);
        }, (retryCount + 1) * 1000);
        return; // 不设置loading为false，继续重试
      }
      
      setAvailableRecords([]);
    } finally {
      if (retryCount >= 3) {
        setLoadingRecords(false);
      } else {
        // 只有在不重试的情况下才设置loading为false
        setLoadingRecords(false);
      }
    }
  };

  // 当活动类型或地区改变时，重新获取可用记录
  useEffect(() => {
    fetchAvailableRecords(activityType, region);
  }, [activityType, region]);



  // 处理图片上传（带压缩）
  const handleImageUpload = async (files: FileList) => {
    console.log('handleImageUpload 被调用，文件数量:', files ? files.length : 0);
    
    if (!files || files.length === 0) {
      console.log('没有选择文件');
      return;
    }

    setUploading(true);
    const newImages: string[] = [];
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    let processedCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`处理文件 ${i + 1}:`, file.name, file.type, file.size);
        
        // 检查文件类型
        if (!file.type.startsWith('image/')) {
          alert(`文件 ${file.name} 不是图片格式`);
          continue;
        }

        // 记录原始文件大小
        const originalSize = file.size;
        totalOriginalSize += originalSize;

        try {
          // 🖼️ 统一图片处理流程：压缩 → 上传到服务器 → 获取标准路径
          console.log(`开始压缩 ${file.name}...`);
          const compressedBlob = await compressImage(file, 1200, 675, 0.8); // 优化版本16:9比例 (1200x675)
          
          // 记录压缩后大小
          const compressedSize = compressedBlob.size;
          totalCompressedSize += compressedSize;
          
          console.log(`${file.name} 压缩完成:`, {
            原始大小: `${(originalSize / 1024 / 1024).toFixed(2)}MB`,
            压缩后大小: `${(compressedSize / 1024 / 1024).toFixed(2)}MB`,
            压缩率: `${((1 - compressedSize / originalSize) * 100).toFixed(1)}%`
          });

          // 🚀 上传到服务器，获取标准路径格式
          console.log(`开始上传 ${file.name} 到服务器...`);
          
          // 直接使用压缩后的Blob创建File
          const compressedFile = new File([compressedBlob], `${file.name.split('.')[0]}_compressed.jpg`, { type: 'image/jpeg' });
          
          // 创建FormData
          const formData = new FormData();
          formData.append('images', compressedFile);
          
          const uploadResponse = await fetch('/api/upload-images', {
            method: 'POST',
            body: formData
          });

          if (!uploadResponse.ok) {
            throw new Error(`上传失败: ${uploadResponse.statusText}`);
          }

          const uploadResult = await uploadResponse.json();
          if (uploadResult.success && uploadResult.data?.uploadedFiles && uploadResult.data.uploadedFiles.length > 0) {
            const serverPath = uploadResult.data.uploadedFiles[0].url; // 获取服务器返回的路径
            console.log(`${file.name} 上传成功，服务器路径:`, serverPath);
            newImages.push(serverPath);
            processedCount++;
          } else {
            throw new Error('上传响应格式错误');
          }
          
        } catch (compressionError) {
          console.error(`处理 ${file.name} 失败:`, compressionError);
          const errorMessage = compressionError instanceof Error ? compressionError.message : '未知错误';
          alert(`处理 ${file.name} 失败: ${errorMessage}`);
        }
      }

      if (newImages.length > 0) {
        setUploadedImages(prev => [...prev, ...newImages]);
        
        const compressionRatio = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1);
        alert(`成功处理 ${processedCount} 张图片
压缩率: ${compressionRatio}%
原始大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB
压缩后: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB
图片已上传到服务器`);
      }
      
    } catch (error) {
      console.error('图片处理失败:', error);
      alert('图片处理失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  // 删除图片
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // 清空所有图片
  const clearAllImages = () => {
    setUploadedImages([]);
  };

  // 处理搜索图片选择 - 支持直接链接模式
  const handleSearchImageSelect = async (imageUrl: string, imageData?: any) => {
    // 检查是否是直接链接（以http开头且不是本地路径）
    const isDirectLink = imageUrl.startsWith('http') && !imageUrl.includes(window.location.hostname);
    
    if (isDirectLink) {
      // 直接模式：使用外部链接
      setUploadedImages(prev => [...prev, imageUrl]);
      console.log('添加直接链接图片:', imageUrl);
      return;
    }
    
    // 本地模式：下载并处理图片
    setUploading(true);
    try {
      // 下载搜索到的图片并转换为base64
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // 将blob转换为File对象
      const file = new File([blob], 'searched-image.jpg', { type: blob.type });
      
      // 使用现有的图片处理流程
      const compressedBlob = await compressImage(file, 1200, 675, 0.8);
      
      // 直接使用压缩后的Blob创建File
      const compressedFile = new File([compressedBlob], 'searched_image_compressed.jpg', { type: 'image/jpeg' });
      
      // 创建FormData
      const formData = new FormData();
      formData.append('images', compressedFile);
      
      // 上传到服务器
      const uploadResponse = await fetch('/api/upload-images', {
        method: 'POST',
        body: formData
      });

      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        if (uploadResult.success && uploadResult.data?.uploadedFiles?.length > 0) {
          const serverPath = uploadResult.data.uploadedFiles[0].url;
          setUploadedImages(prev => [...prev, serverPath]);
          

        }
      }
    } catch (error) {
      console.error('处理搜索图片失败:', error);
      alert('添加图片失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  // 处理批量搜索图片选择
  const handleSearchImagesSelect = async (images: any[]) => {
    for (const image of images) {
      await handleSearchImageSelect(image.url);
    }
  };

  // 处理URL图片添加
  const handleUrlImageAdd = async () => {
    if (!urlInput.trim()) {
      alert('请输入图片URL');
      return;
    }

    // 简单的URL验证
    try {
      const url = new URL(urlInput);
      if (!url.protocol.startsWith('http')) {
        throw new Error('URL必须以http或https开头');
      }
    } catch (error) {
      alert('请输入有效的图片URL');
      return;
    }

    // 检查是否是图片URL
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const isImageUrl = imageExtensions.some(ext => 
      urlInput.toLowerCase().includes(ext) || 
      urlInput.toLowerCase().includes('image') ||
      urlInput.toLowerCase().includes('img')
    );

    if (!isImageUrl) {
      const confirm = window.confirm('URL似乎不是图片链接，是否仍要添加？');
      if (!confirm) return;
    }

    try {
      // 测试图片是否可以加载
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const loadPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error('图片加载失败'));
        setTimeout(() => reject(new Error('图片加载超时')), 10000); // 10秒超时
      });

      img.src = urlInput;
      await loadPromise;

      // 添加到图片列表
      setUploadedImages(prev => [...prev, urlInput]);
      setUrlInput(''); // 清空输入框
      
      alert('图片URL添加成功！');
      
    } catch (error) {
      console.error('图片URL验证失败:', error);
      const forceAdd = window.confirm('图片URL验证失败，是否仍要添加？\n（注意：无效的图片URL可能导致页面显示问题）');
      if (forceAdd) {
        setUploadedImages(prev => [...prev, urlInput]);
        setUrlInput('');
      }
    }
  };

  const handleGenerate = async () => {
    // 检查是否有识别数据
    const hasRecognitionData = recognition.text.result || recognition.content.result || recognition.map.result;
    
    if (!hasRecognitionData && !previewData) {
      console.error('请使用识别功能获取数据');
      return;
    }

    // 防止页面跳转的额外保护
    if (window.onbeforeunload) {
      window.onbeforeunload = null;
    }

    setLoading(true);
    setResult(null);
    setGenerationProgress('🚀 开始生成页面...');

    try {
      console.log(`开始生成${currentConfig.name}页面`);
      console.log('已上传图片数量:', uploadedImages.length);
      console.log('强制覆盖模式:', forceOverwrite);
      
      setGenerationProgress('📡 正在发送请求到服务器...');
      
      // 构建请求数据 - 使用识别数据模式
      const requestData: any = {
        activityType: activityType,
        region: region, // 🆕 添加地区信息
        forceOverwrite: forceOverwrite,
        overwriteTargetId: selectedOverwriteTarget, // 🆕 指定要覆盖的活动ID
        options: {
          uploadedImages: uploadedImages
        },
        recognitionData: {
          textResult: recognition.text.result,
          contentResult: recognition.content.result,
          mapResult: recognition.map.result,
          previewData: previewData
        }
      };

      const response = await fetch('/api/activity-page-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      setGenerationProgress('⚙️ 正在处理服务器响应...');
      const data = await response.json();
      console.log('生成结果:', data);

      // 如果是409冲突（页面已存在），显示特殊提示
      if (response.status === 409 || data.isConflict) {
        setResult({
          success: false,
          message: data.message || '页面已存在',
          warning: data.warning,
          data: data.data,
          isConflict: true
        });
      } else if (data.success) {
        setResult({
          success: true,
          message: `${currentConfig.name}页面生成成功！`,
          data: data.data,
          generatedPageUrl: data.data?.detailLink || data.data?.pageUrl
        });
        
        // 清空表单数据，准备下一次生成
        setRecognition({
          text: { input: '', result: null, loading: false },
          content: { url: '', result: '', loading: false },
          map: { url: '', result: null, loading: false }
        });
        setUploadedImages([]);
        setPreviewData(null);
        
        // 防止页面自动跳转 - 阻止默认行为
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.href);
        }
      } else {
        setResult({
          success: false,
          message: data.message || '生成失败',
          error: data.error
        });
      }

    } catch (error) {
      console.error('生成失败:', error);
      setResult({
        success: false,
        message: '网络错误',
        error: error instanceof Error ? error.message : '未知错误'
      });
    } finally {
      setLoading(false);
      setGenerationProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎌 活动页面生成器
            </h1>
            <p className="text-lg text-gray-600">
              选择地区和活动类型，智能识别信息，一键生成详情页面
            </p>
            <p className="text-sm text-blue-600 mt-2">
              🔗 自动建立与三层卡片的连接，生成页面后"查看详情"按钮可直接跳转
            </p>
            
            {/* 🆕 数据连接状态指示器 */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">数据格式统一</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">与三层生成器兼容</span>
                </div>
                <div className="text-gray-400">|</div>
                <span className="text-blue-600">
                  专门处理祭典、花见、红叶、灯光、文化等活动
                </span>
              </div>
            </div>
          </div>

          {/* 地区和活动选择器已移至识别功能后 */}

          {/* 使用说明 */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
              📋 页面生成流程
            </h2>
            <div className="text-sm text-blue-800 space-y-1">
              <p>1. 🤖 <strong>智能识别</strong>：粘贴日文活动信息，系统自动识别九项基础信息和地区</p>
              <p>2. 🎯 <strong>选择设置</strong>：识别完成后选择地区和活动类型（不同活动使用不同模板）</p>
              <p>3. 🚀 <strong>生成页面</strong>：选择数据库记录，获取图片，一键生成详情页面</p>
            </div>
          </div>

          {/* 🆕 智能识别功能区域 */}
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                🤖 智能识别助手
              </h2>
              <p className="text-gray-600">
                自动识别活动信息和地区，为后续页面生成做准备
              </p>
            </div>

            {/* 功能区域 - 垂直排列 */}
            <div className="space-y-6">
              {/* 1. 文本识别九项信息 */}
              <div className="bg-white rounded-lg border-2 border-blue-200 shadow-md">
                <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
                  <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    📝 文本识别九项信息
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">粘贴日文活动信息，自动识别九项内容</p>
                </div>
                
                <div className="p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    粘贴日文活动信息：
                  </label>
                  <textarea
                    value={recognition.text.input}
                    onChange={(e) => setRecognition(prev => ({
                      ...prev,
                      text: { ...prev.text, input: e.target.value }
                    }))}
                    placeholder="请粘贴完整的日文活动信息..."
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
                  />

                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => handleTextRecognition()}
                      disabled={recognition.text.loading}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                    >
                      {recognition.text.loading ? '识别中...' : '开始识别'}
                    </button>
                    <button
                      onClick={() => setRecognition(prev => ({
                        ...prev,
                        text: { input: '', result: null, loading: false }
                      }))}
                      disabled={recognition.text.loading}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                    >
                      清空
                    </button>
                  </div>

                  {/* 文本识别结果 */}
                  {recognition.text.result && recognition.text.result.success && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                      <h4 className="font-semibold text-green-800 mb-1 text-sm">✅ 识别成功</h4>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div><span className="font-medium">名称：</span>{recognition.text.result.name || '未识别'}</div>
                        <div><span className="font-medium">地址：</span>{recognition.text.result.address || '未识别'}</div>
                        <div><span className="font-medium">期间：</span>{recognition.text.result.period || '未识别'}</div>
                        <div><span className="font-medium">场所：</span>{recognition.text.result.venue || '未识别'}</div>
                        <div><span className="font-medium">交通：</span>{recognition.text.result.access || '未识别'}</div>
                        <div><span className="font-medium">主办：</span>{recognition.text.result.organizer || '未识别'}</div>
                        <div><span className="font-medium">费用：</span>{recognition.text.result.price || '未识别'}</div>
                        <div><span className="font-medium">联系：</span>{recognition.text.result.contact || '未识别'}</div>
                        <div><span className="font-medium">网站：</span>{recognition.text.result.website || '未识别'}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. 网址识别内容简介 */}
              <div className="bg-white rounded-lg border-2 border-orange-200 shadow-md">
                <div className="p-4 border-b bg-gradient-to-r from-orange-50 to-orange-100">
                  <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2">
                    📄 内容识别
                  </h3>
                  <p className="text-sm text-orange-700 mt-1">输入Jalan网址，自动提取活动简介</p>
                </div>
                
                <div className="p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jalan活动网址：
                  </label>
                  <input
                    type="url"
                    value={recognition.content.url}
                    onChange={(e) => setRecognition(prev => ({
                      ...prev,
                      content: { ...prev.content, url: e.target.value }
                    }))}
                    placeholder="https://www.jalan.net/..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />

                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => handleContentRecognition()}
                      disabled={recognition.content.loading}
                      className="flex-1 px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                    >
                      {recognition.content.loading ? '识别中...' : '获取简介'}
                    </button>
                    <button
                      onClick={() => setRecognition(prev => ({
                        ...prev,
                        content: { url: '', result: '', loading: false }
                      }))}
                      disabled={recognition.content.loading}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                    >
                      清空
                    </button>
                  </div>

                  {/* 内容识别结果 */}
                  {recognition.content.result && (
                    <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-md">
                      <h4 className="font-semibold text-orange-800 mb-1 text-sm">📄 识别到的内容简介</h4>
                      <div className="text-xs text-gray-700 bg-white p-2 rounded border max-h-32 overflow-y-auto">
                        {recognition.content.result || '未识别到内容简介'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. 网址识别地图坐标 */}
              <div className="bg-white rounded-lg border-2 border-green-200 shadow-md">
                <div className="p-4 border-b bg-gradient-to-r from-green-50 to-green-100">
                  <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                    🗺️ 地图识别
                  </h3>
                  <p className="text-sm text-green-700 mt-1">输入官方网址，自动提取地图坐标</p>
                </div>
                
                <div className="p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    官方网址：
                  </label>
                  <input
                    type="url"
                    value={recognition.map.url}
                    onChange={(e) => setRecognition(prev => ({
                      ...prev,
                      map: { ...prev.map, url: e.target.value }
                    }))}
                    placeholder="https://example.com"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  />

                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => handleMapRecognition()}
                      disabled={recognition.map.loading}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                    >
                      {recognition.map.loading ? '识别中...' : '获取坐标'}
                    </button>
                    <button
                      onClick={() => setRecognition(prev => ({
                        ...prev,
                        map: { url: '', result: null, loading: false }
                      }))}
                      disabled={recognition.map.loading}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                    >
                      清空
                    </button>
                  </div>

                  {/* 地图识别结果 */}
                  {recognition.map.result && (
                    <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                      <h4 className="font-semibold text-blue-800 mb-1 text-sm">🎯 地图识别结果</h4>
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="font-medium">坐标：</span>
                          {recognition.map.result.coordinates ? (
                            <span className="text-green-600">✅ {recognition.map.result.coordinates.lat}, {recognition.map.result.coordinates.lng}</span>
                          ) : (
                            <span className="text-red-600">❌ 未找到</span>
                          )}
                        </div>
                        <div><span className="font-medium">来源：</span>{recognition.map.result.coordsSource || '未知'}</div>
                        {recognition.map.result.address && <div><span className="font-medium">地址：</span>{recognition.map.result.address}</div>}
                        {recognition.map.result.venue && <div><span className="font-medium">场所：</span>{recognition.map.result.venue}</div>}
                        {recognition.map.result.googleMapsUrl && (
                          <div>
                            <span className="font-medium">地图链接：</span>
                            <a href={recognition.map.result.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                              打开谷歌地图 ↗
                            </a>
                          </div>
                        )}
                      </div>

                      {/* 地图预览 */}
                      {recognition.map.result.coordinates && (
                        <div className="mt-3 border border-gray-300 rounded-lg overflow-hidden bg-white">
                          <div className="bg-gray-100 px-2 py-1 border-b">
                            <h5 className="text-xs font-medium text-gray-700">📍 地图预览</h5>
                          </div>
                          <div className="relative">
                            <iframe
                              src={`https://maps.google.com/maps?q=${recognition.map.result.coordinates.lat},${recognition.map.result.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                              width="100%"
                              height="200"
                              style={{ border: 0 }}
                              allowFullScreen={false}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              className="w-full"
                            />
                            <div className="absolute top-1 right-1">
                              <a 
                                href={`https://www.google.com/maps?q=${recognition.map.result.coordinates.lat},${recognition.map.result.coordinates.lng}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white px-2 py-1 rounded shadow text-xs text-blue-600 hover:bg-blue-50"
                              >
                                大地图 ↗
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
            
            {/* 识别结果汇总 */}
            {(recognition.text.result || recognition.content.result || recognition.map.result) && (
              <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">📋 识别结果汇总</h4>
                <div className="text-sm text-green-700 space-y-1">
                  {recognition.text.result && (
                    <div>✅ 文本识别：已获取基础信息 ({Object.keys(recognition.text.result).filter(key => recognition.text.result[key]).length} 项)</div>
                  )}
                  {recognition.content.result && (
                    <div>✅ 内容识别：已获取活动简介 ({recognition.content.result.length} 字)</div>
                  )}
                  {recognition.map.result?.coordinates && (
                    <div>✅ 地图识别：已获取坐标位置 ({recognition.map.result.coordsSource})</div>
                  )}
                  {autoDetectedRegion && (
                    <div>✅ 地区识别：已自动识别为 {REGION_CONFIGS[autoDetectedRegion].name}</div>
                  )}
                  {autoDetectedActivity && (
                    <div>✅ 活动类型识别：已自动识别为 {ACTIVITY_CONFIGS[autoDetectedActivity].emoji} {ACTIVITY_CONFIGS[autoDetectedActivity].name}</div>
                  )}
                </div>
                <div className="mt-2 text-xs text-green-600">
                  💡 识别完成后，请选择地区和活动类型进行页面生成
                </div>
              </div>
            )}
          </div>

          {/* 🆕 地区和活动选择器 - 识别完成后显示 */}
          {(recognition.text.result || recognition.content.result || recognition.map.result) && (
            <div className="mb-8">
              <div className="bg-white rounded-lg border-2 border-blue-300 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  🎯 选择地区和活动类型
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 地区选择 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🗾 选择地区 {autoDetectedRegion && <span className="text-green-600">(已自动识别)</span>}
                    </label>
                    <select
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value as RegionType);
                        setPreviewData(null);
                        setResult(null);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {Object.entries(REGION_CONFIGS).map(([key, config]) => (
                        <option key={key} value={key}>
                          {config.emoji} {config.name} - {config.description}
                        </option>
                      ))}
                    </select>
                    {autoDetectedRegion && autoDetectedRegion === region && (
                      <p className="mt-1 text-xs text-green-600">✨ 基于识别内容自动选择</p>
                    )}
                  </div>

                  {/* 活动类型选择 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🎭 选择活动类型 {autoDetectedActivity && <span className="text-green-600">(已自动识别)</span>}
                    </label>
                    <select
                      value={activityType}
                      onChange={(e) => {
                        setActivityType(e.target.value as ActivityType);
                        setPreviewData(null);
                        setResult(null);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {Object.entries(ACTIVITY_CONFIGS).map(([key, config]) => (
                        <option key={key} value={key}>
                          {config.emoji} {config.name}{key === 'hanabi' ? ' ⭐优先识别' : ''} - 使用 {config.template}
                        </option>
                      ))}
                    </select>
                    {autoDetectedActivity && autoDetectedActivity === activityType ? (
                      <p className="mt-1 text-xs text-green-600">✨ 基于识别内容自动选择（包含"花火"关键词优先识别为花火）</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">
                        💡 不同活动类型使用不同的模板进行页面生成
                      </p>
                    )}
                  </div>
                </div>

                {/* 当前选择状态 */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <strong>当前选择：</strong>
                    <span className="ml-2">
                      {REGION_CONFIGS[region].emoji} {REGION_CONFIGS[region].name} - 
                      {ACTIVITY_CONFIGS[activityType].emoji} {ACTIVITY_CONFIGS[activityType].name}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    将使用 {ACTIVITY_CONFIGS[activityType].template} 模板生成页面
                  </div>
                </div>
                
                {/* 自动识别规则说明 */}
                <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-xs text-amber-800">
                    <strong>🤖 自动识别规则：</strong>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      <li><strong>花火优先：</strong>包含"花火"二字的活动自动识别为花火类型</li>
                      <li><strong>地区识别：</strong>根据地址、场所名称自动识别地区</li>
                      <li><strong>其他类型：</strong>根据关键词识别祭典、花见、红叶、灯光、文艺等类型</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 数据库记录ID和预览区域 */}
          <div className="mb-8">
            <div className="space-y-6">


              {/* 十项数据预览 */}
              {previewData && (
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    📋 十项数据预览 ({currentConfig.template})
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-1 gap-2">
                      <div><strong>1. 名称:</strong> <span className="text-blue-600">{previewData.name || '❌ 未设置'}</span></div>
                      <div><strong>2. 所在地:</strong> <span className="text-blue-600">{previewData.address || '❌ 未设置'}</span></div>
                      <div><strong>3. 开催期间:</strong> <span className="text-blue-600">{previewData.datetime || '❌ 未设置'}</span></div>
                      <div><strong>4. 开催场所:</strong> <span className="text-blue-600">{previewData.venue || '❌ 未设置'}</span></div>
                      <div><strong>5. 交通方式:</strong> <span className="text-blue-600">{previewData.access || '❌ 未设置'}</span></div>
                      <div><strong>6. 主办方:</strong> <span className="text-blue-600">{previewData.organizer || '❌ 未设置'}</span></div>
                      <div><strong>7. 料金:</strong> <span className="text-blue-600">{previewData.price || '❌ 未设置'}</span></div>
                      <div><strong>8. 联系方式:</strong> <span className="text-blue-600">{previewData.contact || '❌ 未设置'}</span></div>
                      <div><strong>9. 官方网站:</strong> <span className="text-blue-600">{previewData.website || '❌ 未设置'}</span></div>
                      <div><strong>10. 谷歌地图:</strong> <span className="text-blue-600">{previewData.googleMap || '❌ 未设置'}</span></div>
                    </div>
                    
                    {/* 数据完整度统计 */}
                    <div className="mt-4 p-3 bg-white rounded border">
                      {(() => {
                        const fields = ['name', 'address', 'datetime', 'venue', 'access', 'organizer', 'price', 'contact', 'website', 'googleMap'];
                        const filledFields = fields.filter(field => previewData[field]);
                        const completeness = Math.round((filledFields.length / fields.length) * 100);
                        return (
                          <div className="text-center">
                            <div className={`text-lg font-bold ${completeness === 100 ? 'text-green-600' : completeness >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              📊 数据完整度: {completeness}% ({filledFields.length}/10)
                            </div>
                            {completeness < 100 && (
                              <div className="text-xs text-red-500 mt-1">
                                ⚠️ 数据不完整，生成的页面可能缺少部分信息
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* 图片获取区域 - 全宽 */}
          <div className="mb-8">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                {currentRegionConfig.emoji} {currentRegionConfig.name} - {currentConfig.emoji} {currentConfig.name}图片获取
              </label>
              
              {/* 图片获取方式切换 */}
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setImageSourceMode('upload')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    imageSourceMode === 'upload'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📁 本地上传
                </button>
                <button
                  onClick={() => setImageSourceMode('search')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    imageSourceMode === 'search'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🔍 智能搜索
                </button>
                <button
                  onClick={() => setImageSourceMode('url')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    imageSourceMode === 'url'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🔗 URL链接
                </button>
              </div>
              
              {/* 图片获取内容区域 */}
              {imageSourceMode === 'upload' ? (
                // 图片上传区域
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      handleImageUpload(files);
                    }
                  }}
                  className={`border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50 ${
                    uploading ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleImageUpload(e.target.files);
                    }
                  }}
                  className="hidden"
                />
                
                <div className="space-y-2">
                  <div className="text-4xl">📷</div>
                  <div className="text-lg font-semibold text-gray-700">
                    {uploading ? '⏳ 正在上传...' : '点击或拖拽上传图片'}
                  </div>
                  <div className="text-sm text-gray-500">
                    支持 JPG、PNG、GIF 格式，自动压缩至1200*675 (16:9比例)
                  </div>
                </div>
                </div>
              ) : imageSourceMode === 'search' ? (
                // 图片搜索区域
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6">
                  <ImageSearchWidget
                    activityName={recognition.text.result?.name || previewData?.name || ''}
                    activityType={currentConfig.name}
                    region={region}
                    onImageSelect={handleSearchImageSelect}
                    onImagesSelect={handleSearchImagesSelect}
                    maxResults={10}
                    allowMultiSelect={true}
                    autoSearch={false}
                    className="w-full"
                    activityData={{
                      venue: recognition.text.result?.venue || previewData?.venue,
                      address: recognition.text.result?.address || previewData?.address,
                      name: recognition.text.result?.name || previewData?.name
                    }}
                  />
                </div>
              ) : (
                // URL图片添加区域
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔗</div>
                      <div className="text-lg font-semibold text-gray-700 mb-2">
                        添加图片URL链接
                      </div>
                      <div className="text-sm text-gray-500">
                        支持直接引用外部图片链接，无需下载上传
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="请输入图片URL，例如：https://example.com/image.jpg"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleUrlImageAdd();
                          }
                        }}
                      />
                      <button
                        onClick={handleUrlImageAdd}
                        disabled={!urlInput.trim()}
                        className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                          urlInput.trim()
                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        添加
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium mb-1">📝 使用说明：</div>
                      <div>• 支持 HTTP/HTTPS 协议的图片链接</div>
                      <div>• 建议使用官方网站、图片托管服务的链接</div>
                      <div>• 系统会自动验证图片可访问性</div>
                      <div>• URL链接图片不会占用服务器存储空间</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 已上传的图片预览 */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-gray-700">
                        已获取图片 ({uploadedImages.length})
                      </span>
                      {(() => {
                        const directLinks = uploadedImages.filter(img => img.startsWith('http') && !img.includes(window.location.hostname));
                        const localImages = uploadedImages.length - directLinks.length;
                        return (
                          <div className="flex items-center space-x-2 text-xs">
                            {directLinks.length > 0 && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                🔗 直接链接: {directLinks.length}
                              </span>
                            )}
                            {localImages > 0 && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                💾 本地图片: {localImages}
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                    <button
                      onClick={clearAllImages}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      清空全部
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                    {uploadedImages.map((image, index) => {
                      const isDirectLink = image.startsWith('http') && !image.includes(window.location.hostname);
                      return (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`图片 ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border-2 border-gray-200"
                          />
                          {/* 图片类型标识 */}
                          <div className={`absolute top-1 left-1 text-xs px-1 py-0.5 rounded text-white font-bold ${
                            isDirectLink ? 'bg-green-500' : 'bg-blue-500'
                          }`}>
                            {isDirectLink ? '🔗' : '💾'}
                          </div>
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 页面生成控制区域 - 全宽 */}
          <div className="mb-8">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                🚀 {currentRegionConfig.name}{currentConfig.name}页面生成
              </label>

              {/* 覆盖选项 - 默认关闭，让用户选择 */}
              <div className={`mb-4 p-4 border rounded-lg ${forceOverwrite ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={forceOverwrite}
                    onChange={(e) => setForceOverwrite(e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${forceOverwrite ? 'text-orange-800' : 'text-blue-800'}`}>
                      {forceOverwrite ? '🔄 智能覆盖模式' : '🆕 安全模式（推荐）'}
                    </div>
                    <div className={`text-xs ${forceOverwrite ? 'text-orange-700' : 'text-blue-700'}`}>
                      {forceOverwrite 
                        ? '检测到重复活动时自动覆盖现有页面和数据' 
                        : '检测到重复活动时会暂停并询问您的选择，避免误覆盖'
                      }
                    </div>
                  </div>
                </label>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleGenerate();
                }}
                disabled={loading || (!previewData && !(recognition.text.result || recognition.content.result || recognition.map.result))}
                className={`w-full py-4 px-6 rounded-lg text-xl font-bold text-white transition-all ${
                  loading || (!previewData && !(recognition.text.result || recognition.content.result || recognition.map.result))
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : `bg-gradient-to-r ${currentConfig.colors} hover:${currentConfig.hoverColors} hover:shadow-lg transform hover:-translate-y-1`
                }`}
              >
                {loading 
                  ? generationProgress || '⏳ 正在生成页面...' 
                  : (!previewData && !(recognition.text.result || recognition.content.result || recognition.map.result))
                    ? '🔍 请使用识别功能获取数据'
                    : `🚀 生成${currentRegionConfig.name}${currentConfig.name}详情页面 ${forceOverwrite ? '(自动覆盖)' : '(安全模式)'}`
                }
              </button>
              
              {/* 生成进度显示 */}
              {loading && generationProgress && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800 text-center">
                    {generationProgress}
                  </div>
                  <div className="mt-2 text-xs text-blue-600 text-center">
                    请耐心等待，生成过程可能需要几秒钟...
                  </div>
                </div>
              )}

              {/* 页面生成统计信息 */}
              {!loading && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold mb-2">📊 生成统计</div>
                    <div className="space-y-1 text-xs">
                      <div>已上传图片: {uploadedImages.length} 张</div>
                      <div>数据完整度: {previewData ? (() => {
                        const fields = ['name', 'address', 'datetime', 'venue', 'access', 'organizer', 'price', 'contact', 'website', 'googleMap'];
                        const filledFields = fields.filter(field => previewData[field]);
                        return Math.round((filledFields.length / fields.length) * 100);
                      })() : 0}%</div>
                      <div>生成模式: {forceOverwrite ? '自动覆盖' : '安全模式'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 生成结果显示 */}
          {result && (
            <div className={`p-6 rounded-xl border-2 ${
              result.success 
                ? 'bg-green-50 border-green-300' 
                : result.isConflict 
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-red-50 border-red-300'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">
                  {result.success ? '✅' : result.isConflict ? '⚠️' : '❌'}
                </span>
                <h3 className={`text-xl font-bold ${
                  result.success 
                    ? 'text-green-800' 
                    : result.isConflict 
                      ? 'text-yellow-800'
                      : 'text-red-800'
                }`}>
                  {result.message}
              </h3>
              </div>
              
              {result.success && result.data && (
                <div className="space-y-4">
                  {/* 页面生成信息 */}
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">📄 页面生成成功</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>活动名称:</strong> {result.data.activityName}</p>
                      <p><strong>生成路径:</strong> {result.data.filePath}</p>
                      <p><strong>访问链接:</strong> 
                    <a 
                      href={result.data.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      {result.data.url}
                    </a>
                      </p>
                      <p><strong>模板:</strong> {result.data.template}</p>
                      <p><strong>数据完整度:</strong> {result.data.dataCompleteness?.filled || 0}/{result.data.dataCompleteness?.total || 10}</p>
                  </div>
                  </div>

                  {/* 🆕 JSON文件生成信息 */}
                  {result.data.activityFile && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-blue-800 mb-2">📊 JSON数据文件生成成功</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p><strong>单个活动文件:</strong> {result.data.activityFile}</p>
                        <p><strong>地区汇总文件:</strong> {result.data.regionFile}</p>
                        <p className="text-blue-600 font-medium">✨ 静态化数据准备完成，支持未来的静态部署</p>
                      </div>
                    </div>
                  )}
                  
                  {/* 页面结构信息 */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-2">🏗️ 四层页面结构</h4>
                    <div className="text-sm text-gray-700">
                      {result.data.pageStructure && Object.entries(result.data.pageStructure as Record<string, string>).map(([layer, path]) => (
                        <p key={layer}><strong>{layer}:</strong> {path as string}</p>
                      ))}
                      </div>
                    </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-2">🔗 连接状态</h4>
                    <p className="text-sm text-gray-700">{result.data.connectionEstablished}</p>
                  </div>
                </div>
              )}
              
              {/* 🆕 多重相似活动智能检测提示 */}
              {!result.success && result.isConflict && result.data && (
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-bold text-orange-800 mb-3">
                      🧠 检测到 {result.data.similarActivities?.length || 1} 个高度相似活动
                    </h4>
                    
                    {/* 当前要生成的活动 */}
                    <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-200 mb-4">
                      <h5 className="font-semibold text-blue-800 mb-2">🆕 当前要生成的活动</h5>
                      <div className="text-sm space-y-1">
                        <div><strong>名称:</strong> {result.data.currentActivity?.name || '未知'}</div>
                        <div><strong>时间:</strong> {result.data.currentActivity?.period || '未知'}</div>
                        <div><strong>地点:</strong> {result.data.currentActivity?.address || '未知'}</div>
                        <div><strong>会场:</strong> {result.data.currentActivity?.venue || '未知'}</div>
                      </div>
                    </div>

                    {/* 🆕 所有相似活动展示 */}
                    <div className="space-y-3 mb-4">
                      <h5 className="font-semibold text-orange-800">📄 现有相似活动列表</h5>
                      
                      {result.data.similarActivities ? (
                        result.data.similarActivities.map((similar: any, index: number) => (
                          <div 
                            key={similar.activity.id}
                            className={`rounded-lg p-3 border-2 cursor-pointer transition-all ${
                              selectedOverwriteTarget === similar.activity.id 
                                ? 'bg-orange-100 border-orange-400' 
                                : 'bg-gray-50 border-gray-200 hover:border-orange-300'
                            }`}
                            onClick={() => setSelectedOverwriteTarget(similar.activity.id)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="overwriteTarget"
                                  checked={selectedOverwriteTarget === similar.activity.id}
                                  onChange={() => setSelectedOverwriteTarget(similar.activity.id)}
                                  className="text-orange-600"
                                />
                                <h6 className="font-medium text-gray-800">相似活动 #{index + 1}</h6>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500">总体相似度</div>
                                <div className={`text-sm font-bold ${
                                  similar.similarity >= 0.9 ? 'text-red-600' : 
                                  similar.similarity >= 0.8 ? 'text-orange-600' : 'text-yellow-600'
                                }`}>
                                  {(similar.similarity * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="text-sm space-y-1">
                                <div><strong>名称:</strong> {similar.activity.name}</div>
                                <div><strong>时间:</strong> {similar.activity.period}</div>
                                <div><strong>地点:</strong> {similar.activity.address}</div>
                                <div><strong>会场:</strong> {similar.activity.venue}</div>
                                <div><strong>ID:</strong> <span className="font-mono text-xs">{similar.activity.id}</span></div>
                                <div>
                                  <a href={similar.url} target="_blank" rel="noopener noreferrer" 
                                     className="text-blue-600 hover:text-blue-800 text-xs underline">
                                    📎 查看现有页面
                                  </a>
                                </div>
                              </div>
                              
                              <div className="bg-white rounded p-2 text-xs">
                                <div className="font-medium text-gray-700 mb-1">📊 详细分析</div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span>名称相似度:</span>
                                    <span className={`font-bold ${
                                      similar.similarityDetails.name >= 0.8 ? 'text-red-600' : 
                                      similar.similarityDetails.name >= 0.6 ? 'text-orange-600' : 'text-green-600'
                                    }`}>
                                      {(similar.similarityDetails.name * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>日期匹配:</span>
                                    <span className={`font-bold ${similar.similarityDetails.date ? 'text-red-600' : 'text-green-600'}`}>
                                      {similar.similarityDetails.date ? '✅' : '❌'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>地址相似:</span>
                                    <span className={`font-bold ${similar.similarityDetails.address ? 'text-red-600' : 'text-green-600'}`}>
                                      {similar.similarityDetails.address ? '✅' : '❌'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        // 向后兼容：如果没有similarActivities数组（旧版本），显示单个活动
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="text-sm space-y-1">
                            <div><strong>名称:</strong> {result.data.existingActivity?.name || '未知'}</div>
                            <div><strong>时间:</strong> {result.data.existingActivity?.period || '未知'}</div>
                            <div><strong>地点:</strong> {result.data.existingActivity?.address || '未知'}</div>
                            <div><strong>会场:</strong> {result.data.existingActivity?.venue || '未知'}</div>
                            <div><strong>ID:</strong> <span className="font-mono text-xs">{result.data.existingActivity?.id || '未知'}</span></div>
                          </div>
                          <div className="mt-2">
                            <a href={result.data.url} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-600 hover:text-blue-800 text-xs underline">
                              📎 查看现有页面
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-3 p-2 bg-blue-50 rounded border border-blue-200">
                      <strong>💡 建议:</strong> {result.data.suggestion}
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (result.data.similarActivities && selectedOverwriteTarget) {
                            // 多重相似活动模式：覆盖选中的活动
                            setForceOverwrite(true);
                            setResult(null);
                            // 不重置selectedOverwriteTarget，因为需要传递给API
                          } else {
                            // 单个相似活动模式（向后兼容）
                            setForceOverwrite(true);
                            setResult(null);
                            setSelectedOverwriteTarget(null);
                          }
                        }}
                        disabled={result.data.similarActivities && !selectedOverwriteTarget}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          result.data.similarActivities && !selectedOverwriteTarget
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        🔄 覆盖{result.data.similarActivities && selectedOverwriteTarget ? '选中' : '现有'}活动
                        {selectedOverwriteTarget && ` (${selectedOverwriteTarget.slice(-8)})`}
                      </button>
                      <button
                        onClick={() => {
                          setResult(null);
                          setSelectedOverwriteTarget(null);
                          // 保持forceOverwrite为false，用户可以再次生成（会生成新路径）
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
                      >
                        🆕 创建新活动页面
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 错误信息显示 */}
              {!result.success && !result.isConflict && result.error && (
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h4 className="font-bold text-red-800 mb-2">❌ 生成失败</h4>
                  <div className="text-sm text-red-700">
                    <p><strong>错误详情:</strong> {result.error}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 