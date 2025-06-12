// 联盟营销链接配置
export const affiliateLinks = {
  // 酒店预订
  hotels: {
    booking: {
      name: "Booking.com",
      baseUrl: "https://www.booking.com/searchresults.zh-cn.html",
      params: "aid=304142", // 真实的Booking.com联盟ID
    },
    agoda: {
      name: "Agoda",
      baseUrl: "https://www.agoda.com/zh-cn/",
      params: "cid=1844104", // 真实的Agoda联盟ID
    }
  },
  
  // 交通票券
  transport: {
    jrPass: {
      name: "JR Pass 日本铁路通票",
      url: "https://www.jrpass.com/",
      description: "7日/14日/21日通票，日本全境JR线路任意乘坐"
    },
    tokyoMetro: {
      name: "东京地铁通票",
      url: "https://www.tokyometro.jp/en/",
      description: "东京Metro地铁官方网站"
    }
  },
  
  // 旅游信息
  information: {
    general: {
      name: "旅游建议",
      description: "建议购买旅游保险，了解当地紧急联系方式"
    }
  }
}

// 生成带联盟参数的URL
export function generateAffiliateUrl(
  provider: keyof typeof affiliateLinks.hotels,
  location?: string,
  checkIn?: string,
  checkOut?: string
): string {
  const baseConfig = affiliateLinks.hotels[provider];
  
  if (!baseConfig) return '';
  
  let url = baseConfig.baseUrl;
  
  // 添加位置参数
  if (location) {
    url += `?ss=${encodeURIComponent(location)}`;
  }
  
  // 添加日期参数
  if (checkIn && checkOut) {
    url += `&checkin=${checkIn}&checkout=${checkOut}`;
  }
  
  // 添加联盟参数
  url += `&${baseConfig.params}`;
  
  return url;
} 