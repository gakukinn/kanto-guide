'use client';

import { useState, useEffect } from 'react';

interface ImageStats {
  total: number;
  withImages: number;
  withoutImages: number;
  percentage: number;
}

interface ActivityRecord {
  id: string;
  name: string;
  region: string;
  detailLink: string | null;
  hasImage?: boolean;
  type: string;
}

interface SearchResult {
  url: string;
  title: string;
  size?: string;
  width?: number;
  height?: number;
}

type ActivityType = 'matsuri' | 'hanami' | 'hanabi' | 'momiji' | 'illumination' | 'culture';

const activityTypeConfig = {
  matsuri: { name: '🏮 传统祭典', table: 'MatsuriEvent', color: 'red' },
  hanami: { name: '🌸 花见会', table: 'HanamiEvent', color: 'pink' },
  hanabi: { name: '🎆 花火大会', table: 'HanabiEvent', color: 'blue' },
  momiji: { name: '🍁 红叶狩', table: 'MomijiEvent', color: 'orange' },
  illumination: { name: '✨ 灯光秀', table: 'IlluminationEvent', color: 'yellow' },
  culture: { name: '🎨 文化艺术', table: 'CultureEvent', color: 'purple' }
};

const regionNames = {
  tokyo: '东京',
  kanagawa: '神奈川',
  saitama: '埼玉', 
  chiba: '千叶',
  kitakanto: '北关东',
  koshinetsu: '甲信越'
};

export default function ImageManagerPage() {
  const [loading, setLoading] = useState(false);
  const [imageStats, setImageStats] = useState<Record<ActivityType, Record<string, ImageStats>>>({} as any);
  const [selectedActivity, setSelectedActivity] = useState<ActivityRecord | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activities, setActivities] = useState<Record<ActivityType, ActivityRecord[]>>({} as any);

  // 获取图片统计数据
  const fetchImageStats = async () => {
    setLoading(true);
    try {
      console.log('DEBUG: Starting to fetch image stats...');
      const response = await fetch('/api/image-stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        cache: 'no-store',
      });
      console.log('DEBUG: API response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('DEBUG: Complete API response data:', data);
      console.log('DEBUG: Stats data:', data.stats);
      console.log('DEBUG: Activities data:', data.activities);
      setImageStats(data.stats || {});
      setActivities(data.activities || {});
      console.log('DEBUG: Data set successfully');
      console.log('DEBUG: imageStats after setting:', data.stats);
      console.log('DEBUG: activities after setting:', data.activities);
    } catch (error) {
      console.error('DEBUG: Failed to fetch image stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // 搜索图片
  const searchImages = async (activityName: string) => {
    setSearchLoading(true);
    try {
      const response = await fetch('/api/search-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activityName })
      });
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('搜索图片失败:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // 保存选择的图片
  const saveImage = async (imageUrl: string) => {
    if (!selectedActivity) return;
    
    try {
      const response = await fetch('/api/save-activity-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId: selectedActivity.id,
          activityType: getActivityTypeFromRecord(selectedActivity),
          imageUrl: imageUrl,
          region: selectedActivity.region
        })
      });

      if (response.ok) {
        alert('图片保存成功！');
        // 重新获取统计数据
        fetchImageStats();
        setSelectedActivity(null);
        setSearchResults([]);
      } else {
        alert('图片保存失败');
      }
    } catch (error) {
      console.error('保存图片失败:', error);
      alert('保存图片失败');
    }
  };

  // 根据活动记录判断活动类型
  const getActivityTypeFromRecord = (record: ActivityRecord): ActivityType => {
    return record.type as ActivityType;
  };

  useEffect(() => {
    console.log('DEBUG: useEffect triggered, calling fetchImageStats');
    fetchImageStats();
  }, []);

  const totalStats = Object.values(imageStats).reduce((acc, regionStats) => {
    Object.values(regionStats).forEach(stats => {
      acc.total += stats.total;
      acc.withImages += stats.withImages;
      acc.withoutImages += stats.withoutImages;
    });
    return acc;
  }, { total: 0, withImages: 0, withoutImages: 0, percentage: 0 });

  totalStats.percentage = totalStats.total > 0 ? (totalStats.withImages / totalStats.total) * 100 : 0;
  
  // 调试信息
  console.log('DEBUG: 计算过程详情:', {
    imageStats,
    imageStatsType: typeof imageStats,
    imageStatsKeys: Object.keys(imageStats),
    imageStatsValues: Object.values(imageStats),
    firstValue: Object.values(imageStats)[0],
    totalStats,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🖼️ 图片管理中心
            </h1>
            <p className="text-lg text-gray-600">
              检查活动图片完整性，搜索和添加合适的活动图片
            </p>
          </div>
        </div>

        {/* 总体统计 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 图片完整性概览</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">正在统计图片数据...</p>
            </div>
          ) : (
            <>
              {/* 总体数据 */}
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{totalStats.total}</div>
                    <div className="text-sm text-gray-600">总活动数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{totalStats.withImages}</div>
                    <div className="text-sm text-gray-600">有图片</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{totalStats.withoutImages}</div>
                    <div className="text-sm text-gray-600">缺少图片</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{totalStats.percentage.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">完整性</div>
                  </div>
                </div>
              </div>

              {/* 按活动类型和地区统计 */}
              <div className="space-y-6">
                {Object.entries(activityTypeConfig).map(([type, config]) => (
                  <div key={type} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">{config.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {Object.entries(regionNames).map(([regionKey, regionName]) => {
                        const stats = imageStats[type as ActivityType]?.[regionKey];
                        if (!stats || stats.total === 0) return null;
                        
                        return (
                          <div key={regionKey} className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="font-semibold text-gray-800">{regionName}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {stats.withImages}/{stats.total}
                            </div>
                            <div className={`text-xs mt-1 ${
                              stats.percentage >= 80 ? 'text-green-600' :
                              stats.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {stats.percentage.toFixed(0)}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 图片搜索和管理 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 图片搜索与管理</h2>
          
          {/* 缺少图片的活动统计提示 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  发现 {totalStats.withoutImages} 个活动缺少图片
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    以下列表仅显示缺少图片的活动，请为这些活动添加合适的图片以提升用户体验。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 活动选择 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              选择需要添加图片的活动 <span className="text-red-500">（仅显示缺少图片的活动）</span>
            </label>
            <select
              value={selectedActivity?.id || ''}
              onChange={(e) => {
                const activityId = e.target.value;
                if (activityId) {
                  // 在所有活动中查找选中的活动
                  let found = null;
                  Object.values(activities).forEach(typeActivities => {
                    const activity = typeActivities.find(a => a.id === activityId);
                    if (activity) found = activity;
                  });
                  setSelectedActivity(found);
                  setSearchResults([]);
                } else {
                  setSelectedActivity(null);
                  setSearchResults([]);
                }
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">请选择活动...</option>
              {Object.entries(activities).map(([type, typeActivities]) => {
                const activitiesWithoutImages = typeActivities.filter(activity => !activity.hasImage);
                return activitiesWithoutImages.map(activity => (
                  <option key={activity.id} value={activity.id}>
                    [{activityTypeConfig[type as ActivityType].name}] {regionNames[activity.region as keyof typeof regionNames]} - {activity.name}
                  </option>
                ));
              })}
            </select>
            <p className="text-sm text-gray-600 mt-2">
              💡 提示：下拉列表已自动筛选，只显示缺少图片的 {totalStats.withoutImages} 个活动
            </p>
          </div>

          {/* 缺少图片的活动详细列表 */}
          {totalStats.withoutImages > 0 && (
            <div className="mb-6 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 缺少图片的活动列表</h3>
              <div className="space-y-4">
                {Object.entries(activities).map(([type, typeActivities]) => {
                  const activitiesWithoutImages = typeActivities.filter(activity => !activity.hasImage);
                  if (activitiesWithoutImages.length === 0) return null;
                  
                  return (
                    <div key={type} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 mb-3">
                        {activityTypeConfig[type as ActivityType].name} 
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {activitiesWithoutImages.length} 个缺少图片
                        </span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {activitiesWithoutImages.map(activity => (
                          <div 
                            key={activity.id}
                            className={`p-3 rounded border cursor-pointer transition-colors ${
                              selectedActivity?.id === activity.id 
                                ? 'bg-blue-100 border-blue-300' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => {
                              setSelectedActivity(activity);
                              setSearchResults([]);
                            }}
                          >
                            <div className="text-sm font-medium text-gray-800">
                              {regionNames[activity.region as keyof typeof regionNames]}
                            </div>
                            <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {activity.name}
                            </div>
                            {selectedActivity?.id === activity.id && (
                              <div className="mt-2 text-xs text-blue-600 font-medium">
                                ✓ 已选中
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 搜索按钮 */}
          {selectedActivity && (
            <div className="mb-6">
              <button
                onClick={() => searchImages(selectedActivity.name)}
                disabled={searchLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {searchLoading ? '🔍 搜索中...' : '🔍 搜索图片'}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                搜索关键词：{selectedActivity.name}
              </p>
            </div>
          )}

          {/* 搜索结果 */}
          {searchResults.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">搜索结果 ({searchResults.length} 张图片)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.slice(0, 5).map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={result.url}
                      alt={result.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.error-placeholder')) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'error-placeholder w-full h-48 bg-gray-200 flex items-center justify-center';
                          placeholder.innerHTML = `
                            <div class="text-center text-gray-500">
                              <svg class="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
                              </svg>
                              <p class="text-sm">图片加载失败</p>
                            </div>
                          `;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{result.title}</p>
                      {result.size && (
                        <p className="text-xs text-gray-500 mb-3">尺寸: {result.size}</p>
                      )}
                      <button
                        onClick={() => saveImage(result.url)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                      >
                        选择此图片
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">正在搜索图片...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 