'use client';

import { useState } from 'react';

export default function GoogleMapsScraperPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [databaseId, setDatabaseId] = useState('');
  const [updateType, setUpdateType] = useState('hanami');
  const [testMode, setTestMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScrape = async () => {
    if (!searchQuery.trim()) {
      setError('请输入搜索关键词');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/scrape-google-maps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery: searchQuery.trim(),
          databaseId: databaseId.trim() || undefined,
          updateType,
          testMode
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        setError('');
      } else {
        setError(data.message || '爬取失败');
      }
    } catch (err) {
      setError('网络错误：' + (err instanceof Error ? err.message : '未知错误'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleExample = () => {
    setSearchQuery('明月院 神奈川県鎌倉市');
    setDatabaseId('cmc7b4m440001vluwsfpzbohk');
    setUpdateType('hanami');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">管理面板</h1>
            <div className="flex space-x-4">
              <a href="/admin/auto-import" className="text-blue-600 hover:text-blue-800">
                自动导入
              </a>
              <a href="/admin/page-generator" className="text-blue-600 hover:text-blue-800">
                页面生成
              </a>
              <a href="/admin/google-maps-scraper" className="text-blue-600 hover:text-blue-800 font-semibold">
                地图爬取
              </a>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                返回网站
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">🗺️ 谷歌地图信息爬取</h1>
            <p className="mt-2 text-gray-600">
              使用Playwright+Cheerio技术爬取谷歌地图信息，自动更新数据库
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 爬取配置</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    搜索关键词 *
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="例如：明月院 神奈川県鎌倉市"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    数据库记录ID（可选）
                  </label>
                  <input
                    type="text"
                    value={databaseId}
                    onChange={(e) => setDatabaseId(e.target.value)}
                    placeholder="例如：cmc7b4m440001vluwsfpzbohk"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    数据库类型
                  </label>
                  <select
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="hanami">花见会 (HanamiEvent)</option>
                    <option value="matsuri">祭典 (MatsuriEvent)</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={testMode}
                      onChange={(e) => setTestMode(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      测试模式（使用模拟数据，不实际爬取）
                    </span>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleScrape}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? '🔄 爬取中...' : '🚀 开始爬取'}
                  </button>
                  <button
                    onClick={handleExample}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    示例
                  </button>
                </div>
              </div>
            </div>

            {/* 使用说明 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 使用说明</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>搜索关键词：</strong>输入要在谷歌地图中搜索的地点名称</li>
                <li>• <strong>数据库ID：</strong>如果提供，将自动更新对应记录的mapInfo字段</li>
                <li>• <strong>数据库类型：</strong>选择要更新的数据库表类型</li>
                <li>• <strong>技术栈：</strong>Playwright自动化 + Cheerio解析 + Prisma数据库</li>
                <li>• <strong>提取信息：</strong>地址、坐标、评分、评论数、地图链接等</li>
              </ul>
            </div>
          </div>

          {/* 右侧：结果区域 */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 爬取结果</h3>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-red-400">❌</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <span className="text-green-400">✅</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-800">{result.message}</p>
                      </div>
                    </div>
                  </div>

                  {result.data?.mapInfo && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">📍 提取的地图信息：</h4>
                      <div className="space-y-2 text-sm">
                        {result.data.mapInfo.address && (
                          <div>
                            <span className="font-medium">地址：</span>
                            <span className="text-gray-700">{result.data.mapInfo.address}</span>
                          </div>
                        )}
                        {result.data.mapInfo.coordinates && (
                          <div>
                            <span className="font-medium">坐标：</span>
                            <span className="text-gray-700">
                              {result.data.mapInfo.coordinates.lat}, {result.data.mapInfo.coordinates.lng}
                            </span>
                          </div>
                        )}
                        {result.data.mapInfo.rating && (
                          <div>
                            <span className="font-medium">评分：</span>
                            <span className="text-gray-700">{result.data.mapInfo.rating}</span>
                          </div>
                        )}
                        {result.data.mapInfo.reviews && (
                          <div>
                            <span className="font-medium">评论数：</span>
                            <span className="text-gray-700">{result.data.mapInfo.reviews}</span>
                          </div>
                        )}
                        {result.data.mapInfo.mapUrl && (
                          <div>
                            <span className="font-medium">地图链接：</span>
                            <a 
                              href={result.data.mapInfo.mapUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 break-all"
                            >
                              查看地图
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">📋 完整响应数据：</h4>
                    <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-auto max-h-64">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {!result && !error && !isLoading && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🗺️</div>
                  <p className="text-gray-500">请输入搜索关键词，然后点击"开始爬取"</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔄</div>
                  <p className="text-gray-500">正在爬取谷歌地图信息...</p>
                  <p className="text-sm text-gray-400 mt-2">请稍候，这可能需要几秒钟</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 