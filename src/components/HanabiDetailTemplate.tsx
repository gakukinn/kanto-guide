'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HanabiData } from '../types/hanabi';
import MediaDisplay from './MediaDisplay';
// import HanabiHeader from './shared/HanabiHeader';
import HanabiBreadcrumb from './shared/HanabiBreadcrumb';
import { getThemeColors, getRegionConfig, validateHanabiData } from '../config/hanabi-detail-template';
import AffiliateLinks from './AffiliateLinks';

interface HanabiDetailTemplateProps {
 data: HanabiData;
 regionKey: string;
}

export default function HanabiDetailTemplate({ data, regionKey }: HanabiDetailTemplateProps) {
 const [selectedTab, setSelectedTab] = useState('overview');
 
 // 验证数据格式
 const validation = validateHanabiData(data);
 if (!validation.isValid && process.env.NODE_ENV === 'development') {
 console.warn('数据格式警告:', validation.errors);
 }
 
 const themeColors = getThemeColors(data.themeColor);
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

 // 格式化时间显示 - 只显示最早的开始时间
 const formatTimeDisplay = (timeString: string) => {
 const timeMatches = timeString.match(/\d{1,2}:\d{2}/g);
 if (timeMatches && timeMatches.length > 0) {
 return <span className="text-gray-900 font-bold">{timeMatches[0]}开始</span>;
 }
 return <span className="text-gray-900 font-bold">{timeString}</span>;
 };

 // 状态翻译函数
 const getStatusText = (status: string) => {
 const statusMap: { [key: string]: string } = {
 'scheduled': '预定举行',
 'confirmed': '确认举行', 
 'cancelled': '已取消',
 'postponed': '延期举办',
 'completed': '已结束'
 };
 return statusMap[status] || status;
 };

 return (
 <div className="min-h-screen bg-gradient-to-r from-red-50 to-blue-100">
 
 {/* 面包屑导航 */}
 <HanabiBreadcrumb regionKey={regionKey} hanabiName={data.name} />

 {/* 主要内容 */}
 <main className="relative z-10">
 {/* 英雄区域 */}
 <section className="pt-8 pb-12 bg-gradient-to-r from-red-50 to-blue-100">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
 {/* 左侧：基本信息 */}
 <div className="lg:col-span-2">
 {/* 标题区域背景装饰 */}
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
 {data.name}
 </h1>
 {data.japaneseName && (
 <p className="text-gray-700 text-base font-semibold mb-2 opacity-90">{data.japaneseName}</p>
 )}
 {data.englishName && (
 <p className="text-gray-600 text-base font-medium italic">{data.englishName}</p>
 )}
 </div>

 {/* 花火展示图片区域 */}
 <MediaDisplay 
 media={data.media} 
 themeColors={themeColors} 
 eventName={data.name} 
 />
 </div>

 {/* 右侧：关键信息卡片 */}
 <div className="flex flex-col lg:h-full space-y-3">
   <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200 flex-1">
   <div className="flex justify-between items-start mb-3">
    <h3 className="text-gray-900 font-bold text-xl whitespace-nowrap">活动信息</h3>
 <div className="flex flex-col gap-2 items-end max-w-[200px]">
 <span className={`${themeColors.bg200} ${themeColors.text800} text-xs font-bold px-3 py-1.5 rounded-full border ${themeColors.border200} shadow-sm whitespace-nowrap`}>
 {getStatusText(data.status)}
 </span>
 <span className="bg-pink-200 text-pink-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap text-center leading-tight">
 {data.ticketPrice}
 </span>
 </div>
 </div>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between items-center">
 <span className="text-gray-800 font-semibold flex items-center">📅 日期</span>
 <span className="text-gray-900 font-bold text-right">{data.date}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-gray-800 font-semibold flex items-center">🕐 时间</span>
 <div className="text-right">{formatTimeDisplay(data.time)}</div>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-gray-800 font-semibold flex items-center">🎆 发数</span>
 <span className={`${themeColors.text600} font-bold text-right`}>{data.fireworksCount}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-gray-800 font-semibold flex items-center">👥 预计人数</span>
 <span className="text-gray-900 font-bold text-right">{data.expectedVisitors}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-gray-800 font-semibold flex items-center">⏱️ 持续时间</span>
 <span className="text-gray-900 font-bold text-right">{data.duration}</span>
 </div>
 </div>
 </div>

   <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200 flex-1">
   <h3 className="text-gray-900 font-bold text-xl mb-3">联系信息</h3>
 <div className="space-y-3 text-sm">
 <div>
 <span className="text-gray-800 font-semibold flex items-center">🏢 主办方</span>
 <span className="text-gray-900 font-bold mt-1">{data.contact.organizer}</span>
 </div>
 <div>
 <span className="text-gray-800 font-semibold flex items-center">📞 电话</span>
 <span className="text-gray-900 font-bold mt-1">{data.contact.phone}</span>
 </div>
 <div>
 <a 
 href={data.contact.website} 
 target="_blank" 
 rel="noopener noreferrer"
 className={`${themeColors.text600} hover:${themeColors.text800} transition-colors font-bold flex items-center`}
 >
 🌐 官方网站 → 请以官方网站为主。
 </a>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-xl p-4 border-2 border-red-200 shadow-lg flex-1">
 <h3 className="text-gray-900 font-bold text-xl mb-3">地图&交通</h3>
 <div className="space-y-3 text-sm">
 <div>
 <div className="flex justify-between items-center">
 <span className="text-gray-800 font-semibold flex items-center">📍 地图</span>
 <button 
 onClick={handleMapClick}
 className={`${themeColors.text600} hover:${themeColors.text800} transition-colors font-bold flex items-center space-x-1`}
 >
 <span>查看详细地图 →</span>
 </button>
 </div>
 </div>
 <div>
 <span className="text-gray-800 font-semibold flex items-center">🚗 停车场</span>
 <div className="text-red-700 font-bold mt-1 whitespace-pre-line">{data.mapInfo.parking}</div>
 </div>
 </div>
 </div>
 
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-xl p-4 border-2 border-red-200 shadow-lg flex-1">
 <h3 className="text-gray-900 font-bold text-xl mb-3">天气提醒</h3>
 <div className="space-y-3 text-sm">
 {data.weatherInfo.rainPolicy && (
 <div>
 <span className="text-gray-800 font-semibold flex items-center">🌦️ 举办条件</span>
 <span className="text-gray-900 font-bold mt-1">{data.weatherInfo.rainPolicy}</span>
 </div>
 )}
 {data.weatherInfo.note && (
 <div>
 <span className="text-gray-800 font-semibold flex items-center">💡 建议</span>
 <span className="text-orange-700 font-bold mt-1">{data.weatherInfo.note}</span>
 </div>
 )}
 <div className={`${themeColors.bg50} border ${themeColors.border200} rounded p-2`}>
 <span className={`${themeColors.text700} text-xs font-medium`}>💡 {data.weatherInfo.recommendation}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* 标签导航 */}
 <section className="py-8 bg-gradient-to-r from-red-50 to-blue-100">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
           { id: 'overview', name: '概览', icon: '📋' },
           { id: 'venues', name: '会场信息', icon: '📍' },
           { id: 'access', name: '交通指南', icon: '🚇' },
           { id: 'viewing', name: '观赏攻略', icon: '👀' },
           { id: 'tips', name: '实用建议', icon: '💡' },
           ...(data.id === 'chofu-hanabi-2025' ? [{ id: 'walker-sync', name: '数据同步', icon: '🔄' }] : [])
         ].map((tab) => (
 <button
 key={tab.id}
 onClick={() => setSelectedTab(tab.id)}
 className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all ${
 selectedTab === tab.id
 ? `${themeColors.bg200} ${themeColors.text800} border ${themeColors.border200}`
 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
 }`}
 >
 <span>{tab.icon}</span>
 <span>{tab.name}</span>
 </button>
 ))}
 </div>

 {/* 内容区域 */}
 <div className="bg-gradient-to-r from-red-50 to-blue-100 rounded-xl p-6 border-2 border-red-200 shadow-xl backdrop-blur-sm">
 {selectedTab === 'overview' && (
 <div className="space-y-6">
 <div>
 <h3 className="text-2xl font-bold text-gray-800 mb-4">活动概览</h3>
 {data.history?.significance && (
 <p className="text-gray-700 leading-relaxed mb-6">
 {data.name}是{data.history.significance}
 {data.history?.established && `，自${data.history.established}年开始举办`}。
 {data.expectedVisitors && `每年吸引约${data.expectedVisitors}观众前来观赏`}。
 </p>
 )}
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h4 className="text-gray-800 font-bold mb-3">历史意义</h4>
 <ul className="space-y-2 text-gray-700 text-sm">
 {data.history.highlights.map((highlight, index) => (
 <li key={index} className="flex items-start space-x-2">
 <span className="text-rose-600 mt-1">•</span>
 <span>{highlight}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* 主要会场地址 */}
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h4 className="text-gray-800 font-bold mb-3 flex items-center space-x-2">
 <span>📍</span>
 <span>主要会场</span>
 </h4>
 <div className="space-y-2 text-gray-700 text-sm">
 {data.venues.slice(0, 2).map((venue, index) => (
 <div key={index} className="flex items-start space-x-2">
 <span className="text-blue-600 mt-1">•</span>
 <div>
 <span className="font-semibold">{venue.name}：</span>
 <span>{venue.location}</span>
 </div>
 </div>
 ))}
 {data.venues.length > 2 && (
 <p className="text-blue-600 text-xs mt-2">点击"会场信息"查看全部{data.venues.length}个会场</p>
 )}
 </div>
 </div>
 
 {data.venues[0]?.features && data.venues[0].features.length > 0 && (
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h4 className="text-gray-800 font-bold mb-3">活动特色</h4>
 <div className="space-y-2 text-gray-700 text-sm">
 {data.venues[0].features.map((feature, index) => (
 <p key={index}>• {feature}</p>
 ))}
 </div>
 </div>
 )}
 </div>
 
 {/* 地图 */}
 {data.mapEmbedUrl && (
 <div id="map-section" className="mt-6">
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h4 className="text-xl font-bold text-gray-800 mb-4">会场地图</h4>
 <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
 <iframe
 src={data.mapEmbedUrl}
 width="100%"
 height="100%"
 style={{ border: 0 }}
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title={`${data.name}会场位置`}
 className="rounded-lg"
 ></iframe>
 </div>
 </div>
 </div>
 )}
 </div>
 )}

 {selectedTab === 'venues' && (
 <div className="space-y-6">
 <h3 className="text-2xl font-bold text-gray-800 mb-4">会场信息</h3>
 {data.venues.map((venue, index) => (
 <div key={index} className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h4 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h4>
 <div className="flex items-start space-x-2 mb-3">
 <span className="text-purple-600 mt-1">📍</span>
 <div>
 <span className="text-purple-700 font-semibold text-sm">地址：</span>
 <span className="text-gray-700">{venue.location}</span>
 </div>
 </div>
 <p className="text-gray-600 text-sm mb-4">开始时间：{venue.startTime}</p>
 </div>
 ))}


 </div>
 )}

 {selectedTab === 'access' && (
 <div className="space-y-6">
 <h3 className="text-2xl font-bold text-gray-800 mb-4">交通指南</h3>
 {data.access.map((accessInfo, index) => (
 <div key={index}>
 <h4 className="text-xl font-semibold text-gray-800 mb-4">{accessInfo.venue}</h4>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {accessInfo.stations.map((station, stationIndex) => (
 <div key={stationIndex} className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h5 className="font-bold text-gray-800 mb-2">{station.name}</h5>
 <div className="space-y-1 text-sm text-gray-700">
 {station.lines.map((line, lineIndex) => (
 <p key={lineIndex}>• {line}</p>
 ))}
 <p className={`${themeColors.text600} font-semibold mt-2`}>📍 {station.walkTime}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 )}

 {selectedTab === 'viewing' && (
 <div className="space-y-6">
 <h3 className="text-2xl font-bold text-gray-800 mb-4">观赏攻略</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {data.viewingSpots.map((spot, spotIndex) => (
 <div key={spotIndex} className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <div className="mb-3">
 <h4 className="font-bold text-gray-800">{spot.name}</h4>
 </div>
 <p className="text-sm text-gray-600 mb-3">人流: {spot.crowdLevel}</p>
 <p className="text-sm text-gray-700 mb-3">{spot.tips}</p>
 <div className="space-y-2">
 <div>
 <span className="text-pink-600 font-semibold text-xs">优点：</span>
 <ul className="text-xs text-gray-700">
 {spot.pros.map((pro, proIndex) => (
 <li key={proIndex}>• {pro}</li>
 ))}
 </ul>
 </div>
 <div>
 <span className="text-red-600 font-semibold text-xs">缺点：</span>
 <ul className="text-xs text-gray-700">
 {spot.cons.map((con, conIndex) => (
 <li key={conIndex}>• {con}</li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {selectedTab === 'tips' && (
 <div className="space-y-6">
 <h3 className="text-2xl font-bold text-gray-800 mb-4">实用建议</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {data.tips.map((tipCategory, tipIndex) => {
 // 为不同类别的建议卡片分配不同的渐变色
 const gradientStyles = [
 'bg-gradient-to-br from-rose-100 to-white border-rose-200/60',
 'bg-gradient-to-br from-white to-blue-100 border-blue-200/60', 
 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300/60',
 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200/60',
 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200/60',
 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200/60'
 ];
 
 const cardStyle = gradientStyles[tipIndex % gradientStyles.length];
 
 return (
 <div key={tipIndex} className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <h4 className="font-bold text-gray-800 mb-3">{tipCategory.category}</h4>
 <ul className="space-y-2">
 {tipCategory.items.map((item, itemIndex) => (
 <li key={itemIndex} className="flex items-start space-x-2 text-gray-700 text-sm">
 <span className={`${themeColors.text600} mt-1`}>•</span>
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </div>
 );
          })}
         </div>
         </div>
         )}

         {selectedTab === 'walker-sync' && data.id === 'chofu-hanabi-2025' && (
           <div className="space-y-6">
             <h3 className="text-2xl font-bold text-gray-800 mb-4">Walker Plus 数据同步</h3>
             <p className="text-gray-600 mb-6">
               实时对比官方数据源，确保调布花火信息的准确性和时效性
             </p>
             <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
               <p className="text-blue-700">数据同步功能开发中...</p>
             </div>
           </div>
         )}
         </div>
         </div>
         </section>

 {/* 旅游服务推荐 - 变现区域 */}
 <section className="py-12 bg-gradient-to-r from-red-50 to-blue-100">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-8">
 <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 完美观赏攻略</h2>
 <p className="text-gray-700 max-w-2xl mx-auto">
 为您推荐最佳住宿、交通和体验服务，让花火之旅更加完美！
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <AffiliateLinks type="hotel" location={regionConfig.name} />
 <AffiliateLinks type="transport" />
 </div>
 </div>
 </section>


 {/* 评论区 */}
 <section className="py-12 bg-gradient-to-r from-red-50 to-blue-100">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-8">
 <h2 className="text-3xl font-bold text-gray-900 mb-4">💬 观赏心得分享</h2>
 <p className="text-gray-700 max-w-2xl mx-auto">
 分享您的观赏体验，为其他花火爱好者提供实用建议
 </p>
 </div>

 {/* 发表评论 */}
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200 mb-8">
 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
 <span>✍️</span>
 <span>发表评论</span>
 </h3>
 
 <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-semibold text-gray-700 mb-2">昵称</label>
 <input 
 type="text" 
 placeholder="请输入您的昵称"
 className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all bg-white/80"
 />
 </div>
 <div>
 <label className="block text-sm font-semibold text-gray-700 mb-2">邮箱（可选）</label>
 <input 
 type="email" 
 placeholder="your@email.com"
 className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all bg-white/80"
 />
 </div>
 </div>
 
 <div>
 <label className="block text-sm font-semibold text-gray-700 mb-2">评论内容</label>
 <textarea 
 rows={4}
 placeholder="分享您的观赏体验、最佳观赏位置、交通建议等..."
 className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-none bg-white/80"
 ></textarea>
 </div>
 
 <div className="flex justify-between items-center">
 <p className="text-sm text-gray-500">
 💡 提示：分享实用信息帮助其他游客更好地观赏花火
 </p>
                 <button 
                  className="bg-white text-gray-700 px-6 py-2 rounded-lg font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => alert('评论功能开发中，敬请期待！')}
                >
                  发表评论
                </button>
 </div>
 </div>
 </div>

 {/* 评论列表 */}
 <div className="space-y-6">
 <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
 <span>💭</span>
 <span>游客评论 (3)</span>
 </h3>

 {/* 示例评论 */}
 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
 花
 </div>
 <div className="flex-1">
 <div className="flex items-center space-x-3 mb-2">
 <h4 className="font-bold text-gray-800">花火爱好者</h4>
 <span className="text-sm text-gray-500">2024年9月21日</span>
 </div>
 <p className="text-gray-700 leading-relaxed mb-3">
 今年参加了调布花火，真的很震撼！建议大家下午3点左右就到布田会场占位，晚上的大玉50连发简直太美了。京王多摩川站走过去确实只要10分钟，很方便。
 </p>
                 <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button 
                    className="hover:text-rose-600 transition-colors"
                    onClick={(e) => {
                      const button = e.currentTarget;
                      if (button.textContent) {
                        const match = button.textContent.match(/\d+/);
                        if (match) {
                          const currentCount = parseInt(match[0]);
                          const newCount = currentCount + 1;
                          button.textContent = `👍 有用 (${newCount})`;
                          button.classList.add('text-rose-600');
                          button.disabled = true;
                        }
                      }
                    }}
                  >
                    👍 有用 (12)
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors"
                    onClick={() => alert('回复功能开发中，敬请期待！')}
                  >
                    💬 回复
                  </button>
                </div>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-gradient-to-br from-white to-blue-400 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200">
 旅
 </div>
 <div className="flex-1">
 <div className="flex items-center space-x-3 mb-2">
 <h4 className="font-bold text-gray-800">旅行达人</h4>
 <span className="text-sm text-gray-500">2024年9月20日</span>
 </div>
 <p className="text-gray-700 leading-relaxed mb-3">
 电通大操场会场人相对少一些，适合带小朋友的家庭。虽然距离稍远但观赏效果也很不错，而且有座位比较舒适。记得带野餐垫！
 </p>
                 <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button 
                    className="hover:text-rose-600 transition-colors"
                    onClick={(e) => {
                      const button = e.currentTarget;
                      if (button.textContent) {
                        const match = button.textContent.match(/\d+/);
                        if (match) {
                          const currentCount = parseInt(match[0]);
                          const newCount = currentCount + 1;
                          button.textContent = `👍 有用 (${newCount})`;
                          button.classList.add('text-rose-600');
                          button.disabled = true;
                        }
                      }
                    }}
                  >
                    👍 有用 (8)
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors"
                    onClick={() => alert('回复功能开发中，敬请期待！')}
                  >
                    💬 回复
                  </button>
                </div>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200">
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
 摄
 </div>
 <div className="flex-1">
 <div className="flex items-center space-x-3 mb-2">
 <h4 className="font-bold text-gray-800">摄影师小王</h4>
 <span className="text-sm text-gray-500">2024年9月19日</span>
 </div>
 <p className="text-gray-700 leading-relaxed mb-3">
 作为摄影爱好者，推荐京王多摩川会场！距离打上地点最近，拍摄效果最佳。建议带三脚架，花火幻想曲部分特别适合长曝光拍摄。
 </p>
                 <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button 
                    className="hover:text-rose-600 transition-colors"
                    onClick={(e) => {
                      const button = e.currentTarget;
                      if (button.textContent) {
                        const match = button.textContent.match(/\d+/);
                        if (match) {
                          const currentCount = parseInt(match[0]);
                          const newCount = currentCount + 1;
                          button.textContent = `👍 有用 (${newCount})`;
                          button.classList.add('text-rose-600');
                          button.disabled = true;
                        }
                      }
                    }}
                  >
                    👍 有用 (15)
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors"
                    onClick={() => alert('回复功能开发中，敬请期待！')}
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
                  className="bg-gradient-to-r from-red-50 to-blue-100 text-gray-700 px-6 py-2 rounded-full font-medium hover:from-red-100 hover:to-blue-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-red-200/50"
                  onClick={() => alert('更多评论加载功能开发中，敬请期待！')}
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