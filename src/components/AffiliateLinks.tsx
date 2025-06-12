'use client';

import Link from 'next/link';
import { useState } from 'react';

interface AffiliateLinkProps {
  type: 'hotel' | 'transport';
  eventName?: string;
  location?: string;
}

export default function AffiliateLinks({ type, eventName, location }: AffiliateLinkProps) {
  const [clickedLink, setClickedLink] = useState<string>('');

  const handleLinkClick = (linkName: string) => {
    setClickedLink(linkName);
    // 这里可以添加Google Analytics事件追踪
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        event_category: 'monetization',
        event_label: linkName,
        value: 1
      });
    }
  };

  if (type === 'hotel') {
    return (
      <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🏨 推荐住宿 {location && `- ${location}周边`}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Link 
            href="https://www.booking.com/searchresults.zh-cn.html?ss=东京&checkin=2025-07-25&checkout=2025-07-27&aid=2311226&label=hanabi-guide-affiliate"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-200 to-blue-200 hover:from-red-300 hover:to-blue-300 text-gray-700 font-bold py-4 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm min-h-[90px]"
            onClick={() => handleLinkClick('booking.com')}
          >
            <span className="mr-2">🏢</span>
            Booking.com 查看酒店
          </Link>
          <Link 
            href="https://www.agoda.com/zh-cn/city/tokyo-jp.html?checkin=2025-07-25&checkout=2025-07-27&cid=1844104&tag=hanabi-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-200 to-blue-200 hover:from-red-300 hover:to-blue-300 text-gray-700 font-bold py-4 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm min-h-[90px]"
            onClick={() => handleLinkClick('agoda')}
          >
            <span className="mr-2">🌟</span>
            Agoda 特价优惠
          </Link>
          <Link 
            href="https://jp.hotels.com/de1640262/hotels-tokyo-japan/?locale=zh_CN&pos=HCOM_CN&siteid=300000001&PSRC=hanabi-guide&rffrid=affiliate.hotels.hanabi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-200 to-blue-200 hover:from-red-300 hover:to-blue-300 text-gray-700 font-bold py-4 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm min-h-[90px]"
            onClick={() => handleLinkClick('hotels.com')}
          >
            <span className="mr-2">🏨</span>
            Hotels.com 优惠
          </Link>
          <Link 
            href="https://www.expedia.com/Tokyo-Hotels.d180028.Travel-Guide-Hotels?locale=zh_CN&semcid=hanabi-guide.affiliate&kword=tokyo-hotels"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-200 to-blue-200 hover:from-red-300 hover:to-blue-300 text-gray-700 font-bold py-4 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm min-h-[90px]"
            onClick={() => handleLinkClick('expedia')}
          >
            <span className="mr-2">✈️</span>
            Expedia 套餐
          </Link>
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          💡 提示：花火大会期间酒店需求量大，建议提前预订
        </p>
      </div>
    );
  }

  if (type === 'transport') {
    return (
      <div className="bg-gradient-to-r from-red-50 to-blue-100 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-200 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🚄 交通信息
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-red-200 to-blue-200 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">🎫 JR Pass</h4>
            <p className="text-sm text-gray-600 mb-2">适合跨城市旅行，可在JR官网或授权代理商购买</p>
            <Link 
              href="https://www.jrpass.com/?affiliate=hanabi-guide&utm_source=hanabi-guide&utm_medium=affiliate&utm_campaign=tokyo-hanabi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => handleLinkClick('jrpass')}
            >
              JR Pass官方网站 →
            </Link>
          </div>
          <div className="bg-gradient-to-r from-red-200 to-blue-200 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">🚇 东京地铁</h4>
            <p className="text-sm text-gray-600 mb-2">市内交通首选，可在地铁站购买一日券或多日券</p>
            <Link 
              href="https://www.tokyometro.jp/en/?ref=hanabi-guide&utm_source=hanabi-guide&utm_medium=affiliate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => handleLinkClick('tokyo-metro')}
            >
              东京地铁官网 →
            </Link>
          </div>
        </div>
      </div>
    );
  }



  return null;
} 