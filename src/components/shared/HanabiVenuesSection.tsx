'use client';

import { HanabiData } from '@/types/hanabi';
import { hanabiDetailConfig } from '@/config/hanabi-detail-template';

// 提取最早时间的工具函数
const getEarliestTime = (timeString: string): string => {
 const timeMatches = timeString.match(/\d{1,2}:\d{2}/g);
 if (timeMatches && timeMatches.length > 0) {
 return `${timeMatches[0]}开始`;
 }
 return timeString;
};

interface HanabiVenuesSectionProps {
 data: HanabiData;
 themeColors: typeof hanabiDetailConfig.themes.blue.colors;
}

export default function HanabiVenuesSection({ data, themeColors }: HanabiVenuesSectionProps) {
 return (
 <div className="space-y-6" role="tabpanel" aria-labelledby="venues-tab">
 <h3 className="text-2xl font-bold text-gray-800 mb-4">会场信息</h3>
 
 {/* 会场列表 */}
 {data.venues.map((venue, index) => (
 <div key={index} className={`${themeColors.bg50} rounded-lg p-6 border ${themeColors.border200}`}>
 <h4 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h4>
 <div className="space-y-3">
 <div className="flex items-start space-x-2">
 <span className="text-gray-500 mt-1" aria-hidden="true">📍</span>
 <span className="text-gray-700">{venue.location}</span>
 </div>
 
 <div className="flex items-center space-x-2">
 <span className="text-gray-500" aria-hidden="true">🕐</span>
 <span className="text-gray-600 text-sm">开始时间：{getEarliestTime(data.time)}</span>
 </div>
 

 </div>
 </div>
 ))}

 {/* 地图信息 */}
 {data.mapInfo && (
 <div className="space-y-4">
 <h4 className="text-xl font-bold text-gray-800">位置地图</h4>
 
 {/* 地图说明 */}
 <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
 <div className="space-y-2 text-sm text-gray-700">
 {data.mapInfo.mapNote && (
 <p>
 <strong>位置说明：</strong>{data.mapInfo.mapNote}
 </p>
 )}
 {data.mapInfo.parking && (
 <p>
 <strong>停车信息：</strong>{data.mapInfo.parking}
 </p>
 )}
 </div>
 </div>

 {/* 地图嵌入 */}
 {data.mapEmbedUrl && (
 <div id="map-section" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
 <iframe
 src={data.mapEmbedUrl}
 width="100%"
 height="400"
 style={{ border: 0 }}
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title={`${data.name}位置地图`}
 aria-label={`${data.name}的详细位置地图`}
 />
 </div>
 )}
 </div>
 )}

 {/* 会场设施信息 */}
 {data.dynamicData?.venueDetails && (
 <div className="bg-green-50 rounded-lg p-6 border border-green-200">
 <h4 className="text-xl font-bold text-gray-800 mb-4">设施信息</h4>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* 容纳人数 */}
 {data.dynamicData.venueDetails.capacity && (
 <div>
 <h5 className="font-semibold text-gray-800 mb-2">容纳人数</h5>
 <p className="text-gray-700">约 {data.dynamicData.venueDetails.capacity.toLocaleString()} 人</p>
 </div>
 )}
 
 {/* 设施列表 */}
 {data.dynamicData.venueDetails.facilities.length > 0 && (
 <div>
 <h5 className="font-semibold text-gray-800 mb-2">可用设施</h5>
 <ul className="space-y-1" role="list">
 {data.dynamicData.venueDetails.facilities.map((facility, index) => (
 <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
 <span className="text-green-600" aria-hidden="true">✓</span>
 <span>{facility}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>

 {/* 限制事项 */}
 {data.dynamicData.venueDetails.restrictions.length > 0 && (
 <div className="mt-4 pt-4 border-t border-green-200">
 <h5 className="font-semibold text-gray-800 mb-2">注意事项</h5>
 <ul className="space-y-1" role="list">
 {data.dynamicData.venueDetails.restrictions.map((restriction, index) => (
 <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
 <span className="text-yellow-600 mt-1" aria-hidden="true">⚠</span>
 <span>{restriction}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 )}

 {/* 无障碍信息 */}
 <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
 <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
 <span className="mr-2" aria-hidden="true">♿</span>
 无障碍设施
 </h4>
 <p className="text-sm text-gray-700">
 如需无障碍设施或特殊协助，请提前联系主办方确认具体安排。
 详情请参考官方网站或致电咨询。
 </p>
 </div>
 </div>
 );
} 