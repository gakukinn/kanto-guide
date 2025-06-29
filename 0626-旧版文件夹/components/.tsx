// 🔄 纯静态页面模板 - 移除客户端交互
import { HanabiData } from '../types/hanabi';
import StaticStaticMediaDisplay from './StaticStaticMediaDisplay';
// import HanabiHeader from './shared/HanabiHeader';
import {
  getRegionConfig,
  getThemeColors,
  validateHanabiData,
} from '../config/hanabi-detail-template';
import AffiliateLinks from './AffiliateLinks';
import CultureArtBreadcrumb from './shared/CultureArtBreadcrumb';

interface HanabiDetailTemplateProps {
  data: HanabiData;
  regionKey: string;
}

export default function HanabiDetailTemplate({
  data,
  regionKey,
}: HanabiDetailTemplateProps) {
  // 🔄 移除状态管理，改为静态渲染
// 验证数据格式
  const validation = validateHanabiData(data);
  if (!validation.isValid && process.env.NODE_ENV === 'development') {
    console.warn('数据格式警告:', validation.errors);
  }

  // 使用 useMemo 优化计算
    const themeColors = getThemeColors(data.themeColor || 'red');
  const regionConfig = getRegionConfig(regionKey);
const handleMapClick = () => {
    setSelectedTab('overview');
    setTimeout(() => {
      const mapElement = document.getElementById('map-section');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // 删除time字段相关代码

  // 状态翻译函数
  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      active: '正常举办',
      scheduled: '预定举行',
      confirmed: '确认举行',
      cancelled: '已取消',
      postponed: '延期举办',
      completed: '已结束',
      // 已经是中文的状态直接返回
      '正常举办': '正常举办',
      '预定举行': '预定举行',
      '确认举行': '确认举行',
      '已取消': '已取消',
      '延期举办': '延期举办',
      '已结束': '已结束'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-blue-100">
      {/* 面包屑导航 */}
             <CultureArtBreadcrumb regionKey={regionKey} cultureArtName={data.name} />

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部图片展示区域 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 pb-8 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 花火展示图片区域 - 置顶显示 */}
            <div className="mb-8 rounded-3xl border-2 border-red-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
              <StaticStaticStaticMediaDisplay
                media={data.media}
                themeColors={themeColors}
                eventName={data.name}
                hideTitle={true}
              />
            </div>

            {/* 标题区域 */}
            <div className="mb-12 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
              <h1 className="mb-4 text-xl font-bold leading-tight text-gray-900 md:text-2xl lg:text-3xl">
                {data.name}
              </h1>
              
              {/* 内容简介 */}
              {data.description && data.description !== '详见官网' && (
                <div className="mt-6 transform rounded-3xl bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                  <h2 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                    <span className="mr-2">📝</span>
                    活动简介
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {data.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 主要内容区域 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 四个卡片平均分布网格布局 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {/* 活动信息卡片 */}
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">活动信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📅 举办时间：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.datetime || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📍 举办地点：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.venue || '详见官网'}
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🏕️ 所在地：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.address || '详见官网'}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-2">
                      🚇 交通方式：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.access || '详见官网'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 联系信息卡片 */}
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  联系信息
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🏯 主办方：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.organizer || '详见官网'}
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      💰 参观费用：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.price || '详见官网'}
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📞 联系电话：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.contact || '详见官网'}
                    </div>
                  </div>
                  {data.website && (
                    <div className="border-b border-gray-200 pb-3">
                      <div className="font-semibold text-gray-800 mb-2">
                        🌐 官方网站：
                      </div>
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeColors.text600} hover:${themeColors.text800} font-bold transition-colors duration-300 block`}
                      >
                        请以官方信息为准
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 位置地图卡片 */}
            <div className="mt-8">
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl">
                <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-900">
                  <span className="text-2xl">🗺️</span>
                  <span>位置地图</span>
                </h3>
                <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                  {data.googleMap ? (
                    <iframe
                      src={data.googleMap}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${data.name}位置地图`}
                    ></iframe>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                      <div className="text-center">
                        <div className="text-4xl text-gray-400 mb-4">🗺️</div>
                        <p className="text-gray-500">地图信息详见官网</p>
                        <p className="text-xs text-gray-400 mt-2">
                          地址: {data.address || '未设置'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 评论区 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                💬 观赏心得分享
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                分享您的观赏体验，为其他花火爱好者提供实用建议
              </p>
            </div>

            {/* 发表评论 */}
            <div className="mb-8 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
              <h3 className="mb-4 flex items-center space-x-2 text-xl font-bold text-gray-800">
                <span>✍️</span>
                <span>发表评论</span>
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      昵称
                    </label>
                    <input
                      type="text"
                      placeholder="请输入您的昵称"
                      className="w-full rounded-lg border border-rose-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      邮箱（可选）
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-rose-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    评论内容
                  </label>
                  <textarea
                    rows={4}
                    placeholder="分享您的观赏体验、最佳观赏位置、交通建议等..."
                    className="w-full resize-none rounded-lg border border-rose-200 bg-white/80 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    💡 提示：分享实用信息帮助其他游客更好地观赏花火
                  </p>
                  <button
                    className="rounded-lg border border-gray-200 bg-white px-6 py-2 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                    
                  >
                    发表评论
                  </button>
                </div>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="space-y-6">
              <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <span>💭</span>
                <span>游客评论 (1)</span>
              </h3>

              {/* 示例评论1 */}
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-blue-500 font-bold text-white">
                    花
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">花火爱好者小李</h4>
                      <span className="text-sm text-gray-500">
                        2024年8月15日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      今年第一次来看这个花火大会，真的太震撼了！建议大家提前2小时到达会场占位，特别是想要好位置的话。我们选择了河边的观赏点，视野非常开阔。晚上的连续花火表演持续了将近1小时，每一发都很精彩。交通方面，JR站下车后步行确实只需要10分钟左右，很方便。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-rose-600"
                        )`;
                              button.classList.add('text-rose-600');
                              button.disabled = true;
                            }
                          }
                        }}
                      >
                        👍 有用 (18)
                      </button>
                      <button
                        className="transition-colors hover:text-blue-600"
                        
                      >
                        💬 回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 加载更多 */}
              <div className="text-center">
                <button
                  className="transform rounded-full border border-red-200/50 bg-gradient-to-r from-red-50 to-blue-100 px-6 py-2 font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:from-red-100 hover:to-blue-200 hover:shadow-lg"
                  
                >
                  📄 加载更多评论
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
