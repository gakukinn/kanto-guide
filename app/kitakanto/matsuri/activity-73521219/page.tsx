import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1751373521219
 * 生成时间: 2025/7/1 21:38:41
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 柿岡のおまつり（八坂神社　祇園祭礼）（かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）
 * 2. 所在地: 〒315-0116　茨城県石岡市柿岡
 * 3. 举办时间: 2025年7月26日～27日　 【26日】17:00～19:30　　【27日】12:00～21:00
 * 4. 举办地点: 茨城県石岡市　柿岡地区
 * 5. 交通方式: ＪＲ常磐線「石岡駅」から関東鉄道バス約30分「下宿坂下」下車
 * 6. 主办方: 柿岡まつり振興協議会
 * 7. 参观费用: 未设置
 * 8. 联系方式: 石岡市産業戦略部商工観光課　0299-23-1111
 * 9. 官方网站: https://www.city.ishioka.lg.jp/ishiokameguri/omatsuri/page001096.html
 * 10. 谷歌地图: 36.242444,140.193511
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1751373521219",
  name: "柿冈祭 八坂神社祇园祭 （かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）",
  address: "〒315-0116　茨城県石岡市柿岡",
  datetime: "2025年7月26日～27日　 【26日】17:00～19:30　　【27日】12:00～21:00",
  venue: "茨城県石岡市　柿岡地区",
  access: "ＪＲ常磐線「石岡駅」から関東鉄道巴士約30分「下宿坂下」下車",
  organizer: "柿岡まつり振興協議会",
  price: "",
  contact: "石岡市産業戦略部商工観光課　0299-23-1111",
  website: "https://www.city.ishioka.lg.jp/ishiokameguri/omatsuri/page001096.html",
  googleMap: "https://maps.google.com/maps?q=36.242444,140.193511&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "相传在享禄年间，柿冈城主将神灵从那珂郡迁移至八坂神社，因此每年7月包含第四个星期日的周末，会在柿冈地区举行祭典。活动中会有“柿冈机关人偶”、柿冈馆“狮子舞”、柿冈荒宿“竹叶舞”、山车等在街道上巡游。被指定为县级无形民俗文化财的“柿冈机关人偶”表演时，约3米高的粗柱上架着粗木材作台座，台上的三体唐人偶“言语人偶”“晕眩人偶”“波澜拜人偶”由绳索操控，配合“风车拍子”的静雅乐声，展示华丽的技巧与杂技表演。载有机关人偶的山车从八幡神社出发，巡游柿冈商店街。※“柿冈机关人偶”并非每年固定演出，有时可能不进行展示。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/f344c721-9605-45ef-82ce-af844a67f008/0_0.png",
      title: "柿岡のおまつり（八坂神社　祇園祭礼）（かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）图片1",
      alt: "柿岡のおまつり（八坂神社　祇園祭礼）（かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）图片1",
      caption: ""
    }
  ]
};

  // 确定地区键 - 使用标准化的地区映射
  const REGION_MAP = {
    'tokyo': 'tokyo',
    'saitama': 'saitama', 
    'chiba': 'chiba',
    'kanagawa': 'kanagawa',
    'kitakanto': 'kitakanto',
    'koshinetsu': 'koshinetsu',
    '東京都': 'tokyo',
    '東京': 'tokyo',
    '埼玉県': 'saitama',
    '埼玉': 'saitama',
    '千葉県': 'chiba',
    '千葉': 'chiba',
    '神奈川県': 'kanagawa',
    '神奈川': 'kanagawa',
    '茨城県': 'kitakanto',
    '栃木県': 'kitakanto',
    '群馬県': 'kitakanto',
    '新潟県': 'koshinetsu',
    '長野県': 'koshinetsu',
    '山梨県': 'koshinetsu'
  };
  const regionKey = REGION_MAP["kitakanto"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;