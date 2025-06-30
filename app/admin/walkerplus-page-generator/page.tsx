/**
 * WalkerPlus四层页面生成器
 * @description 输入WalkerPlus URL，自动抓取数据并生成四层页面结构
 * 支持：祭典、花见、花火、红叶、灯光、文化艺术
 */
'use client';

import { useState, useRef } from 'react';
import ImageSearchWidget from '../../../src/components/shared/ImageSearchWidget';

type ActivityType = 'hanabi';
type RegionType = 'tokyo' | 'saitama' | 'chiba' | 'kanagawa' | 'kitakanto' | 'koshinetsu';

// 地区配置
const REGION_CONFIGS = {
  tokyo: { name: '东京', emoji: '🗼' },
  saitama: { name: '埼玉', emoji: '🌾' },
  chiba: { name: '千叶', emoji: '🌊' },
  kanagawa: { name: '神奈川', emoji: '⛩️' },
  kitakanto: { name: '北关东', emoji: '🏔️' },
  koshinetsu: { name: '甲信越', emoji: '🏔️' }
};

// 活动类型配置 - 专门用于花火
const ACTIVITY_CONFIGS = {
  hanabi: { name: '花火会', emoji: '🎆' }
};

// 自动识别函数
const autoDetectRegion = (text: string): RegionType | null => {
  const keywords = {
    tokyo: ['東京', '东京', '新宿', '渋谷', '池袋', '銀座', '浅草'],
    saitama: ['埼玉', '大宮', '浦和', 'さいたま'],
    chiba: ['千葉', '千叶', '船橋', '柏', '松戸'],
    kanagawa: ['神奈川', '横浜', '川崎', '鎌倉'],
    kitakanto: ['群馬', '栃木', '茨城', '前橋', '宇都宮', '水戸'],
    koshinetsu: ['山梨', '長野', '新潟', '甲府', '松本']
  };
  
  const lowerText = text.toLowerCase();
  for (const [region, words] of Object.entries(keywords)) {
    if (words.some(word => lowerText.includes(word.toLowerCase()))) {
      return region as RegionType;
    }
  }
  return null;
};

const autoDetectActivityType = (text: string): ActivityType | null => {
  const keywords = {
    hanabi: ['花火', 'はなび', 'fireworks', '花火大会']
  };
  
  const lowerText = text.toLowerCase();
  if (keywords.hanabi.some(word => lowerText.includes(word.toLowerCase()))) {
    return 'hanabi';
  }
  return null;
};

// 状态图标显示函数
const getStatusIcon = (comparisonResult: any) => {
  if (!comparisonResult || typeof comparisonResult === 'boolean') {
    // 兼容旧的布尔值格式
    return comparisonResult ? '✅' : '❌';
  }
  
  // 新的对象格式
  switch (comparisonResult.status) {
    case 'match':
      return '✅';
    case 'mismatch':
      return '❌';
    case 'unknown':
    case 'missing':
      return '❓';
    default:
      return '❌';
  }
};

export default function WalkerPlusPageGeneratorPage() {
  // 基本状态
  const [walkerPlusUrl, setWalkerPlusUrl] = useState('');
  const [walkerPlusText, setWalkerPlusText] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>('hanabi');
  const [region, setRegion] = useState<RegionType>('tokyo');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  
  // 数据状态
  const [textResult, setTextResult] = useState<any>(null);
  const [urlResult, setUrlResult] = useState<any>(null);
  const [textLoading, setTextLoading] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  
  // 自动检测状态
  const [autoDetectedRegion, setAutoDetectedRegion] = useState<RegionType | null>(null);
  
  // 图片管理状态
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  
  // 重复检测状态
  const [duplicateCheck, setDuplicateCheck] = useState<{
    found: boolean;
    duplicates: Array<{id: string; name: string; similarity: number}>;
  }>({ found: false, duplicates: [] });
  const [duplicateAction, setDuplicateAction] = useState<'create' | 'overwrite'>('create');
  const [overwriteTarget, setOverwriteTarget] = useState<string | null>(null);
  const [forceOverwrite, setForceOverwrite] = useState(false); // 覆盖选项
  
  // 相似活动冲突状态
  const [conflictData, setConflictData] = useState<any>(null);
  const [showConflictDialog, setShowConflictDialog] = useState(false);

  // 文本识别处理函数
  const handleTextRecognition = async () => {
    if (!walkerPlusText.trim()) {
      setError('请输入要识别的文本');
      return;
    }

    setTextLoading(true);
    setError('');
    setTextResult(null);

    try {
      const response = await fetch('/api/walkerplus-text-parser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: walkerPlusText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '文本识别失败');

      if (data.success) {
        // 将walkerFields数据也保存到textResult中
        const textResultWithWalkerFields = {
          ...data.data,
          walkerFields: data.walkerFields
        };
        setTextResult(textResultWithWalkerFields);
        
        // 自动识别地区
        const detectedRegion = autoDetectRegion(data.data.address || data.data.venue || '');
        
        if (detectedRegion) {
          setRegion(detectedRegion);
          setAutoDetectedRegion(detectedRegion);
        }
      } else {
        throw new Error(data.error || '文本识别失败');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '文本识别失败');
    } finally {
      setTextLoading(false);
    }
  };

  // URL爬取处理函数
  const handleUrlScraping = async () => {
    if (!walkerPlusUrl.trim()) {
      setError('请输入WalkerPlus URL');
      return;
    }

    setUrlLoading(true);
    setError('');
    setUrlResult(null);

    try {
      const response = await fetch('/api/walkerplus-scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: walkerPlusUrl }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'URL爬取失败');

      // 🔧 调试：检查接收到的数据
      console.log('🔍 前端接收到的URL爬取数据:');
      console.log('  name:', data.name);
      console.log('  description:', data.description);
      console.log('  highlights:', data.highlights);
      console.log('  完整数据对象:', data);

      // 直接使用返回的数据
      setUrlResult(data);
      
      // 自动识别地区
      const detectedRegion = autoDetectRegion(data.description || data.name || '');
      
      if (detectedRegion) {
        setRegion(detectedRegion);
        setAutoDetectedRegion(detectedRegion);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'URL爬取失败');
    } finally {
      setUrlLoading(false);
    }
  };

  // 图片选择处理函数
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages(prev => [...prev, imageUrl]);
  };

  // 页面生成处理函数
  const handlePageGeneration = async () => {
    // 🔧 修复：智能合并两种数据源
    const currentData = (() => {
      if (urlResult && textResult) {
        // 如果两种数据都存在，合并它们
        return {
          ...textResult,  // 基础数据（14项WalkerPlus字段）
          ...urlResult,   // URL爬取数据（description, highlights等）
          // 确保name字段使用最准确的
          name: urlResult.name || textResult.name || textResult.eventName,
          // 🔧 修复：将URL爬取的字段名映射为页面生成器期望的字段名
          googleMap: urlResult.googleMapUrl || textResult.googleMap,
          website: urlResult.officialWebsite || textResult.website
        };
      } else if (urlResult) {
        // 只有URL爬取数据，映射字段名
        return {
          ...urlResult,
          googleMap: urlResult.googleMapUrl,
          website: urlResult.officialWebsite
        };
      }
      // 只有文本识别数据，直接使用
      return textResult;
    })();
    
    // 🔧 新增：对于仅文本识别的情况，添加字段映射
    if (currentData && textResult && !urlResult) {
      Object.assign(currentData, {
        date: textResult.eventPeriod || currentData.date,
        time: textResult.eventTime || currentData.time,
        fireworksTime: textResult.fireworksDuration || currentData.fireworksTime
      });
    }
    
    if (!currentData) {
      setError('请先识别文本或爬取URL数据');
      return;
    }

    // 🔧 调试：检查即将传递给API的数据
    console.log('🔍 前端即将传递给页面生成器API的数据:');
    console.log('  currentData.name:', currentData.name);
    console.log('  currentData.description:', currentData.description);
    console.log('  currentData.highlights:', currentData.highlights);
    console.log('  currentData.googleMap:', currentData.googleMap);
    console.log('  currentData.website:', currentData.website);
    console.log('  完整currentData对象:', currentData);
    
    // 🚨 关键调试：检查数据来源
    console.log('🔍 数据来源分析:');
    console.log('  textResult存在:', !!textResult);
    console.log('  urlResult存在:', !!urlResult);
    if (urlResult && textResult) {
      console.log('  数据合并模式: textResult(14项字段) + urlResult(详细描述)');
    } else if (urlResult) {
      console.log('  仅URL爬取模式: 只有详细描述，四个卡片将显示"详见官网"');
    } else if (textResult) {
      console.log('  仅文本识别模式: 只有14项字段，缺少详细描述');
    } else {
      console.log('  无数据');
    }

    setGenerating(true);
    setGenerationProgress('开始生成页面...');
    setError('');

    try {
      const response = await fetch('/api/walkerplus-page-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: currentData,
          activityType,
          region,
          images: selectedImages,
          duplicateAction,
          overwriteTarget,
          forceOverwrite
        }),
      });

      const result = await response.json();
      
      // 处理409冲突状态（检测到相似活动）
      if (response.status === 409 && result.isConflict) {
        setConflictData(result.data);
        setShowConflictDialog(true);
        setGenerationProgress('');
        setGenerating(false);
        return;
      }
      
      if (!response.ok) throw new Error(result.error || '页面生成失败');

      setResult(result);
      setGenerationProgress('页面生成完成！');
    } catch (error) {
      setError(error instanceof Error ? error.message : '页面生成失败');
      setGenerationProgress('');
    } finally {
      setGenerating(false);
    }
  };

  // 处理冲突选择
  const handleConflictChoice = async (choice: 'create' | 'overwrite', targetId?: string) => {
    setShowConflictDialog(false);
    setGenerating(true);
    setGenerationProgress(`处理冲突选择: ${choice === 'overwrite' ? '覆盖现有活动' : '创建新活动'}...`);

    // 🔧 修复：智能合并两种数据源
    const currentData = (() => {
      if (urlResult && textResult) {
        // 如果两种数据都存在，合并它们
        return {
          ...textResult,  // 基础数据（14项WalkerPlus字段）
          ...urlResult,   // URL爬取数据（description, highlights等）
          // 确保name字段使用最准确的
          name: urlResult.name || textResult.name || textResult.eventName,
          // 🔧 修复：将URL爬取的字段名映射为页面生成器期望的字段名
          googleMap: urlResult.googleMapUrl || textResult.googleMap,
          website: urlResult.officialWebsite || textResult.website
        };
      } else if (urlResult) {
        // 只有URL爬取数据，映射字段名
        return {
          ...urlResult,
          googleMap: urlResult.googleMapUrl,
          website: urlResult.officialWebsite
        };
      }
      // 只有文本识别数据，直接使用
      return textResult;
    })();
    
    // 🔧 新增：对于仅文本识别的情况，添加字段映射
    if (currentData && textResult && !urlResult) {
      Object.assign(currentData, {
        date: textResult.eventPeriod || currentData.date,
        time: textResult.eventTime || currentData.time,
        fireworksTime: textResult.fireworksDuration || currentData.fireworksTime
      });
    }
    
    // 调试信息：确认传递的数据
    console.log('🔧 冲突处理 - 传递给API的数据:');
    console.log('  choice:', choice);
    console.log('  targetId:', targetId);
    console.log('  currentData.description:', currentData?.description);
    console.log('  currentData.highlights:', currentData?.highlights);
    
    try {
      const response = await fetch('/api/walkerplus-page-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: currentData,
          activityType,
          region,
          images: selectedImages,
          duplicateAction: choice,
          overwriteTarget: targetId,
          forceOverwrite: true // 强制执行用户的选择
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || '页面生成失败');

      setResult(result);
      setGenerationProgress('页面生成完成！');
      setConflictData(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '页面生成失败');
      setGenerationProgress('');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🌐 WalkerPlus 四层页面生成器
          </h1>
          <p className="text-gray-600">
            基于 WalkerPlus 官方数据，自动生成四层页面结构。支持文本识别和URL爬取两种方式。
          </p>
          
          {/* 🆕 数据连接状态指示器 */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">数据格式已统一</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700">与三层生成器兼容</span>
              </div>
              <div className="text-gray-400">|</div>
              <span className="text-blue-600">
                生成的数据将自动出现在 
                <a href="/admin/third-layer-generator" target="_blank" className="underline hover:text-blue-800">
                  三层页面生成器
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800">❌ {error}</div>
          </div>
        )}

        {/* 第一部分：文本识别 */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border-2 border-blue-200 shadow-md">
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                📝 文本识别
              </h3>
              <p className="text-sm text-blue-700 mt-1">粘贴 WalkerPlus 格式文本，自动识别活动信息</p>
            </div>
            
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                粘贴 WalkerPlus 格式文本：
              </label>
              <textarea
                value={walkerPlusText}
                onChange={(e) => setWalkerPlusText(e.target.value)}
                placeholder={`请粘贴 WalkerPlus 格式文本，例如：
大会名	東京競馬場花火 2025 〜花火と聴きたい J-POP BEST〜
打ち上げ数	1万4000発　
打ち上げ時間	70分(予定)
例年の人出	非公表　
開催期間	2025年7月2日(水)
開催時間	19:30～20:40(終演後は規制退場あり)
...`}
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
              />

              <div className="flex gap-2 mt-3">
                <button 
                  onClick={handleTextRecognition}
                  disabled={textLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                >
                  {textLoading ? '识别中...' : '开始识别'}
                </button>
                <button
                  onClick={() => {
                    setWalkerPlusText('');
                    setTextResult(null);
                  }}
                  disabled={textLoading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                >
                  清空
                </button>
              </div>

              {/* 文本识别结果 */}
              {textResult && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm">✅ 识别成功</h4>
                  
                  {/* 如果有walkerFields数据，优先显示13项格式 */}
                  {(textResult as any).walkerFields ? (
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-600 mb-2">📊 WalkerPlus 13项信息：</div>
                      <div className="space-y-1 text-xs">
                        {(textResult as any).walkerFields.map((field: {label: string, value: string}, index: number) => (
                          <div key={index} className="flex">
                            <span className="font-medium text-gray-700 w-32 flex-shrink-0 text-left">{field.label}：</span>
                            <span className="text-gray-800 flex-1">{field.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* 标准格式显示 */
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <div><span className="font-medium">名称：</span>{textResult.name || '未识别'}</div>
                      <div><span className="font-medium">地址：</span>{textResult.address || '未识别'}</div>
                      <div><span className="font-medium">期间：</span>{textResult.datetime || '未识别'}</div>
                      <div><span className="font-medium">场所：</span>{textResult.venue || '未识别'}</div>
                      <div><span className="font-medium">交通：</span>{textResult.access || '未识别'}</div>
                      <div><span className="font-medium">主办：</span>{textResult.organizer || '未识别'}</div>
                      <div><span className="font-medium">费用：</span>{textResult.price || '未识别'}</div>
                      <div><span className="font-medium">联系：</span>{textResult.contact || '未识别'}</div>
                      <div><span className="font-medium">网站：</span>{textResult.website || '未识别'}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 第二部分：URL爬取 */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border-2 border-green-200 shadow-md">
            <div className="p-4 border-b bg-gradient-to-r from-green-50 to-green-100">
              <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                🔗 URL 爬取
              </h3>
              <p className="text-sm text-green-700 mt-1">输入 WalkerPlus URL，自动爬取活动信息</p>
            </div>
            
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WalkerPlus URL：
              </label>
              <input
                type="url"
                value={walkerPlusUrl}
                onChange={(e) => setWalkerPlusUrl(e.target.value)}
                placeholder="https://hanabi.walkerplus.com/..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              />

              <div className="flex gap-2 mt-3">
                <button 
                  onClick={handleUrlScraping}
                  disabled={urlLoading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                >
                  {urlLoading ? '爬取中...' : '开始爬取'}
                </button>
                <button
                  onClick={() => {
                    setWalkerPlusUrl('');
                    setUrlResult(null);
                  }}
                  disabled={urlLoading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                >
                  清空
                </button>
              </div>

              {/* URL爬取结果 */}
              {urlResult && (
                                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="font-semibold text-green-800 mb-2 text-sm">✅ 爬取成功</h4>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <div><span className="font-medium">名称：</span>{urlResult.name || '未识别'}</div>
                      <div><span className="font-medium">内容简介：</span>{urlResult.description || '未识别'}</div>
                      <div><span className="font-medium">見どころ：</span>{urlResult.highlights || '未识别'}</div>
                      <div><span className="font-medium">官方网站：</span>
                        {urlResult.officialWebsite && urlResult.officialWebsite !== '未识别' ? (
                          <a href={urlResult.officialWebsite} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline ml-1">
                            {urlResult.officialWebsite}
                          </a>
                        ) : (
                          <span className="ml-1">未识别</span>
                        )}
                      </div>
                      <div><span className="font-medium">谷歌地图：</span>
                        {urlResult.googleMapUrl && urlResult.googleMapUrl !== '未识别' ? (
                          <a href={urlResult.googleMapUrl} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline ml-1">
                            {urlResult.googleMapUrl}
                          </a>
                        ) : (
                          <span className="ml-1">未识别</span>
                        )}
                      </div>
                      <div><span className="font-medium">来源URL：</span>
                        <a href={urlResult.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                          {urlResult.sourceUrl}
                        </a>
                      </div>
                      <div><span className="font-medium">爬取时间：</span>{urlResult.extractedAt ? new Date(urlResult.extractedAt).toLocaleString('zh-CN') : '未知'}</div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* 第三部分：活动分类选择 - 只有在有识别结果时才显示 */}
        {(textResult || urlResult) && (
          <div className="mb-8">
            <div className="bg-white rounded-lg border-2 border-purple-200 shadow-md">
              <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-purple-100">
                <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                  🎯 活动分类选择
                </h3>
                <p className="text-sm text-purple-700 mt-1">选择活动类型和地区，系统已自动识别</p>
              </div>
              
              <div className="p-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 活动类型显示 - 固定为花火 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🎭 活动类型
                    </label>
                    <div className="w-full p-3 border border-gray-300 rounded-lg bg-purple-50">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🎆</span>
                        <span className="font-medium text-purple-800">花火会</span>
                        <span className="text-sm text-purple-600">(WP专用)</span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-purple-600">✨ WalkerPlus页面生成器专门用于花火活动</p>
                  </div>

                  {/* 地区选择 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🗾 地区 {autoDetectedRegion && <span className="text-green-600">(已自动识别)</span>}
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as RegionType)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    >
                      {Object.entries(REGION_CONFIGS).map(([key, config]) => (
                        <option key={key} value={key}>{config.emoji} {config.name}</option>
                      ))}
                    </select>
                    {autoDetectedRegion && autoDetectedRegion === region && (
                      <p className="mt-1 text-xs text-green-600">✨ 基于识别内容自动选择</p>
                    )}
                  </div>
                </div>

                {/* 当前选择状态 */}
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-800">
                    <strong>当前选择：</strong>
                    <span className="ml-2">
                      {REGION_CONFIGS[region].emoji} {REGION_CONFIGS[region].name} - {ACTIVITY_CONFIGS[activityType].emoji} {ACTIVITY_CONFIGS[activityType].name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 第四部分：图片管理 */}
        {(textResult || urlResult) && (
          <div className="mb-8">
            <div className="bg-white rounded-lg border-2 border-indigo-200 shadow-md">
              <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-indigo-100">
                <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                  🖼️ 图片管理
                </h3>
                <p className="text-sm text-indigo-700 mt-1">为活动添加图片，支持智能搜索</p>
              </div>
              
              <div className="p-4">
                <ImageSearchWidget
                  activityName={(textResult || urlResult)?.name || ''}
                  activityType={ACTIVITY_CONFIGS[activityType].name}
                  region={region}
                  onImageSelect={handleImageSelect}
                  maxResults={10}
                  allowMultiSelect={false}
                  autoSearch={false}
                  className="w-full"
                  activityData={{
                    venue: (textResult || urlResult)?.venue,
                    address: (textResult || urlResult)?.address,
                    name: (textResult || urlResult)?.name
                  }}
                />

                {/* 已选择的图片显示 */}
                {selectedImages.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-800 mb-3">
                      ✅ 已选择的图片 ({selectedImages.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedImages.map((imageUrl, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg border">
                          <img
                            src={imageUrl}
                            alt={`选择的图片 ${index + 1}`}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2Zz4K';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 truncate">
                              图片 {index + 1}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {imageUrl}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedImages(prev => prev.filter((_, i) => i !== index));
                            }}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="删除此图片"
                          >
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedImages([])}
                      className="mt-3 text-sm text-red-600 hover:text-red-800"
                    >
                      🗑️ 清除所有图片
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 第五部分：页面生成 */}
        {(textResult || urlResult) && (
          <div className="mb-8">
            <div className="bg-white rounded-lg border-2 border-red-200 shadow-md">
              <div className="p-4 border-b bg-gradient-to-r from-red-50 to-red-100">
                <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                  🚀 页面生成
                </h3>
                <p className="text-sm text-red-700 mt-1">生成四层页面和JSON文件</p>
              </div>
              
              <div className="p-4">
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
                  onClick={handlePageGeneration}
                  disabled={generating || (!textResult && !urlResult)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-all transform hover:scale-105"
                >
                  {generating ? '生成中...' : `🚀 生成四层页面 ${forceOverwrite ? '(自动覆盖)' : '(安全模式)'}`}
                </button>

                {/* 生成进度 */}
                {generationProgress && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800">{generationProgress}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 相似活动冲突对话框 */}
        {showConflictDialog && conflictData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-red-50">
                <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2">
                  ⚠️ 检测到相似活动
                </h3>
                <p className="text-sm text-orange-700 mt-1">
                  系统检测到 {conflictData.similarActivities?.length || 0} 个高度相似的活动，请仔细对比后选择处理方式
                </p>
              </div>
              
              <div className="p-6">
                {/* 当前要生成的活动信息 */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">🆕 当前要生成的活动</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">名称：</span>{conflictData.currentActivity?.name || '未知'}</div>
                    <div><span className="font-medium">日期：</span>{conflictData.currentActivity?.date || '未知'}</div>
                    <div><span className="font-medium">会场：</span>{conflictData.currentActivity?.venue || '未知'}</div>
                    <div><span className="font-medium">打ち上げ数：</span>{conflictData.currentActivity?.fireworksCount || '未知'}</div>
                  </div>
                </div>

                {/* 相似活动列表 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">🔍 发现的相似活动</h4>
                  <div className="space-y-4">
                    {conflictData.similarActivities?.map((item: any, index: number) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.activity?.name || '未知活动'}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              相似度: {((item.similarity || 0) * 100).toFixed(1)}% | 
                              页面: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{item.path}</a>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">ID: {item.activity?.id}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><span className="font-medium">日期：</span>{item.activity?.date || '未知'}</div>
                          <div><span className="font-medium">会场：</span>{item.activity?.venue || '未知'}</div>
                          <div><span className="font-medium">打ち上げ数：</span>{item.activity?.fireworksCount || '未知'}</div>
                          <div><span className="font-medium">打ち上げ時間：</span>{item.activity?.fireworksTime || '未知'}</div>
                        </div>

                        {/* 相似度详情 */}
                        <div className="mt-3 p-2 bg-white rounded border text-xs">
                          <div className="font-medium text-gray-700 mb-2">相似度分析：</div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">名称:</span>
                              <span className="text-right">
                                {((item.similarityDetails?.name || 0) * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium">日期:</span>
                              <div className="text-right text-xs">
                                <div className="flex items-center gap-1">
                                  <span>{getStatusIcon(item.similarityDetails?.date)}</span>
                                </div>
                                <div className="text-gray-500 mt-1">
                                  <div>新: "{conflictData.currentActivity?.date || '未知'}"</div>
                                  <div>旧: "{item.activity?.date || '未知'}"</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium">地址:</span>
                              <div className="text-right text-xs">
                                <div className="flex items-center gap-1">
                                  <span>{getStatusIcon(item.similarityDetails?.address)}</span>
                                </div>
                                <div className="text-gray-500 mt-1">
                                  <div>新: "{conflictData.currentActivity?.venue || '未知'}"</div>
                                  <div>旧: "{item.activity?.venue || '未知'}"</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 覆盖按钮 */}
                        <div className="mt-3 pt-3 border-t">
                          <button
                            onClick={() => handleConflictChoice('overwrite', item.activity?.id)}
                            className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
                          >
                            🔄 覆盖此活动
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleConflictChoice('create')}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    🆕 创建新活动
                  </button>
                  <button
                    onClick={() => {
                      setShowConflictDialog(false);
                      setConflictData(null);
                    }}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    ❌ 取消
                  </button>
                </div>

                {/* 建议信息 */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm text-yellow-800">
                    💡 <strong>建议：</strong>{conflictData.suggestion || '请仔细对比活动信息，选择要覆盖的活动或创建新活动'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 生成结果 */}
        {result && (
          <div className="mb-8">
            <div className="bg-white rounded-lg border-2 border-green-300 shadow-lg">
              <div className="p-4 border-b bg-gradient-to-r from-green-50 to-green-100">
                <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                  ✅ 生成成功
                </h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">数据库ID：</span>
                    <span className="text-blue-600 font-mono">{result.databaseId}</span>
                  </div>
                  <div>
                    <span className="font-medium">页面路径：</span>
                    <a 
                      href={result.pageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      {result.pageUrl} ↗
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">JSON文件：</span>
                    <span className="text-green-600 ml-2">{result.jsonFiles?.length || 0} 个文件已生成</span>
                  </div>
                  {result.jsonFiles && result.jsonFiles.length > 0 && (
                    <div className="ml-4">
                      {result.jsonFiles.map((file: string, index: number) => (
                        <div key={index} className="text-sm text-gray-600">• {file}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 