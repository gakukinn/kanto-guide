'use client';

import ModernImageUploader from '@/components/modern-image-uploader';
import { useState } from 'react';

export default function ImageUploadPage() {
  const [selectedPage, setSelectedPage] = useState(
    'tokyo/hanabi/katsushika-noryo'
  );
  const [uploadHistory, setUploadHistory] = useState<any[]>([]);

  const pages = [
    // 东京花火大会
    {
      id: 'tokyo/hanabi/katsushika-noryo',
      name: '葛饰纳凉花火大会',
      url: '/tokyo/hanabi/katsushika-noryo',
      region: '东京',
    },
    {
      id: 'tokyo/hanabi/hachioji',
      name: '八王子花火大会',
      url: '/tokyo/hanabi/hachioji',
      region: '东京',
    },
    {
      id: 'tokyo/hanabi/edogawa',
      name: '江户川区花火大会',
      url: '/tokyo/hanabi/edogawa',
      region: '东京',
    },
    {
      id: 'tokyo/hanabi/sumida',
      name: '隅田川花火大会',
      url: '/tokyo/hanabi/sumida',
      region: '东京',
    },

    // 千叶花火大会
    {
      id: 'chiba/hanabi/makuhari-beach',
      name: '幕张海滩花火节',
      url: '/chiba/hanabi/makuhari-beach',
      region: '千叶',
    },
    {
      id: 'chiba/hanabi/yachiyo-furusato',
      name: '八千代故乡亲子祭',
      url: '/chiba/hanabi/yachiyo-furusato',
      region: '千叶',
    },

    // 神奈川花火大会
    {
      id: 'kanagawa/hanabi/kanazawa-matsuri',
      name: '金泽祭花火大会',
      url: '/kanagawa/hanabi/kanazawa-matsuri',
      region: '神奈川',
    },
    {
      id: 'kanagawa/hanabi/nightflowers',
      name: '横滨夜间花火',
      url: '/kanagawa/hanabi/nightflowers',
      region: '神奈川',
    },

    // 甲信越花火大会
    {
      id: 'koshinetsu/hanabi/ichikawa-shinmei',
      name: '市川三郷神明花火大会',
      url: '/koshinetsu/hanabi/ichikawa-shinmei',
      region: '甲信越',
    },
    {
      id: 'koshinetsu/hanabi/nagaoka-matsuri',
      name: '长冈祭大花火大会',
      url: '/koshinetsu/hanabi/nagaoka-matsuri',
      region: '甲信越',
    },
    {
      id: 'koshinetsu/hanabi/fuji-kawaguchi',
      name: '富士山河口湖花火大会',
      url: '/koshinetsu/hanabi/fuji-kawaguchi',
      region: '甲信越',
    },

    // 北关东花火大会
    {
      id: 'kitakanto/hanabi/hitachinaka',
      name: '常陆那珂祭花火大会',
      url: '/kitakanto/hanabi/hitachinaka',
      region: '北关东',
    },
    {
      id: 'kitakanto/hanabi/tonegawa',
      name: '利根川大花火',
      url: '/kitakanto/hanabi/tonegawa',
      region: '北关东',
    },
  ];

  const handleUploadComplete = (result: any) => {
    setUploadHistory(prev => [
      {
        timestamp: new Date().toLocaleString(),
        page: selectedPage,
        result,
      },
      ...prev.slice(0, 9),
    ]); // 保留最近10条记录
  };

  const currentPage = pages.find(p => p.id === selectedPage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            🖼️ 页面图片管理系统
          </h1>
          <p className="text-gray-600">为关东旅游指南网站上传和管理图片</p>
        </div>

        {/* 页面选择器 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            📄 选择要更新的页面
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {pages.map(page => (
              <div
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                  selectedPage === page.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium text-gray-900">{page.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{page.id}</p>
                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800"
                  onClick={e => e.stopPropagation()}
                >
                  查看页面 →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 图片上传器 */}
        <div className="mb-8">
          <ModernImageUploader
            maxFiles={3}
            maxSize={10 * 1024 * 1024} // 10MB
            pagePath={selectedPage}
            onUploadComplete={handleUploadComplete}
          />
        </div>

        {/* 上传历史 */}
        {uploadHistory.length > 0 && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              📋 上传历史
            </h2>
            <div className="space-y-4">
              {uploadHistory.map((record, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {pages.find(p => p.id === record.page)?.name}
                      </h3>
                      <p className="text-sm text-gray-500">{record.page}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {record.timestamp}
                    </span>
                  </div>

                  <div
                    className={`rounded p-2 text-sm ${
                      record.result.success
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {record.result.success ? (
                      <>
                        ✅ {record.result.message}
                        {record.result.results && (
                          <div className="mt-1">
                            生成文件: {record.result.results.length} 张图片，
                            每张生成{' '}
                            {record.result.results[0]?.generatedFiles?.length ||
                              0}{' '}
                            个尺寸
                          </div>
                        )}
                      </>
                    ) : (
                      <>❌ {record.result.error}</>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使用指南 */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-blue-900">
            📖 使用指南
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium text-blue-800">🚀 上传流程</h3>
              <ol className="space-y-1 text-sm text-blue-700">
                <li>1. 选择要更新的页面</li>
                <li>2. 拖拽或选择图片文件</li>
                <li>3. 点击上传按钮</li>
                <li>4. 等待处理完成</li>
                <li>5. 刷新页面查看效果</li>
              </ol>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-blue-800">⚙️ 技术特性</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 自动生成多个尺寸</li>
                <li>• WebP + JPG 双格式</li>
                <li>• 智能图片压缩</li>
                <li>• 数据文件自动更新</li>
                <li>• 实时上传进度</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
