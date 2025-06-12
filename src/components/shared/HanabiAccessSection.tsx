'use client';

import { HanabiData } from '@/types/hanabi';
import { hanabiDetailConfig } from '@/config/hanabi-detail-template';

interface HanabiAccessSectionProps {
 data: HanabiData;
 themeColors: typeof hanabiDetailConfig.themes.blue.colors;
}

export default function HanabiAccessSection({ data, themeColors }: HanabiAccessSectionProps) {
 return (
 <div className="space-y-6" role="tabpanel" aria-labelledby="access-tab">
 <h3 className="text-2xl font-bold text-gray-800 mb-4">交通指南</h3>
 
 {/* 交通信息 */}
 {data.access.map((accessInfo, index) => (
 <div key={index} className={`${themeColors.bg50} rounded-lg p-6 border ${themeColors.border200}`}>
 <h4 className="text-xl font-bold text-gray-800 mb-4">前往 {accessInfo.venue}</h4>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {accessInfo.stations.map((station, stationIndex) => (
 <div key={stationIndex} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
 <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
 <span className="mr-2" aria-hidden="true">🚇</span>
 {station.name}
 </h5>
 
 {/* 线路信息 */}
 {station.lines && station.lines.length > 0 && (
 <div className="mb-3">
 <div className="text-sm text-gray-600 mb-2">可用线路：</div>
 <div className="flex flex-wrap gap-2">
 {station.lines.map((line, lineIndex) => (
 <span 
 key={lineIndex}
 className={`${themeColors.bg200} ${themeColors.text800} text-xs px-2 py-1 rounded-full border ${themeColors.border200}`}
 >
 {line}
 </span>
 ))}
 </div>
 </div>
 )}
 
 {/* 步行时间 */}
 <div className="flex items-center space-x-2 text-sm text-gray-700">
 <span aria-hidden="true">🚶</span>
 <span>{station.walkTime}</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 ))}

 {/* 交通建议 */}
 <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
 <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
 <span className="mr-2" aria-hidden="true">💡</span>
 交通建议
 </h4>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <h5 className="font-semibold text-gray-800 mb-3">最佳路线</h5>
 <ul className="space-y-2 text-sm text-gray-700" role="list">
 <li className="flex items-start space-x-2">
 <span className="text-amber-600 mt-1" aria-hidden="true">•</span>
 <span>建议选择距离最近的车站，减少步行时间</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-amber-600 mt-1" aria-hidden="true">•</span>
 <span>避开换乘复杂的路线，选择直达线路</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-amber-600 mt-1" aria-hidden="true">•</span>
 <span>花火大会当天车站会很拥挤，预留充足时间</span>
 </li>
 </ul>
 </div>
 
 <div>
 <h5 className="font-semibold text-gray-800 mb-3">返程注意</h5>
 <ul className="space-y-2 text-sm text-gray-700" role="list">
 <li className="flex items-start space-x-2">
 <span className="text-amber-600 mt-1" aria-hidden="true">•</span>
 <span>花火结束后车站会非常拥挤</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-amber-600 mt-1" aria-hidden="true">•</span>
 <span>可考虑提前离场或稍晚离场避开人流</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-amber-600 mt-1" aria-hidden="true">•</span>
 <span>确认最晚班车时间，安排好返程计划</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* 停车信息 */}
 {data.mapInfo?.parking && (
 <div className="bg-red-50 rounded-lg p-6 border border-red-200">
 <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
 <span className="mr-2" aria-hidden="true">🚗</span>
 停车信息
 </h4>
 <p className="text-gray-700 mb-4">{data.mapInfo.parking}</p>
 
 {data.mapInfo.parking.includes('无') || data.mapInfo.parking.includes('×') ? (
 <div className="bg-red-100 rounded-lg p-4 border border-red-300">
 <div className="flex items-center space-x-2 text-red-800">
 <span aria-hidden="true">⚠️</span>
 <span className="font-semibold">强烈建议使用公共交通</span>
 </div>
 <p className="text-sm text-red-700 mt-2">
 由于停车场有限或不提供停车服务，建议优先选择电车等公共交通方式前往。
 </p>
 </div>
 ) : (
 <div className="bg-green-100 rounded-lg p-4 border border-green-300">
 <div className="text-sm text-green-700">
 请注意停车场可能会很快满载，建议提早到达或选择公共交通。
 </div>
 </div>
 )}
 </div>
 )}

 {/* 时间规划建议 */}
 <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
 <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
 <span className="mr-2" aria-hidden="true">⏰</span>
 时间规划
 </h4>
 
 <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
 <div className="text-center">
 <div className="font-semibold text-gray-800 mb-2">出发时间</div>
 <div className="text-gray-700">
 建议提前1-2小时<br/>
 避开交通高峰
 </div>
 </div>
 
 <div className="text-center">
 <div className="font-semibold text-gray-800 mb-2">到达会场</div>
 <div className="text-gray-700">
 开始前30-60分钟<br/>
 确保有好位置
 </div>
 </div>
 
 <div className="text-center">
 <div className="font-semibold text-gray-800 mb-2">返程规划</div>
 <div className="text-gray-700">
 确认末班车时间<br/>
 预留缓冲时间
 </div>
 </div>
 </div>
 
 <div className="bg-white rounded-lg p-4 border border-blue-200">
 <p className="text-sm text-gray-700">
 <strong>温馨提示：</strong>
 花火大会当天公共交通会比平时拥挤，建议使用IC卡（Suica/PASMO）快速通过检票口，
 并提前了解备用路线以应对可能的交通管制。
 </p>
 </div>
 </div>
 </div>
 </div>
 );
} 

