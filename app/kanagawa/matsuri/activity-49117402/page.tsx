import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750949117402
 * 生成时间: 2025/6/26 23:45:17
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼり祭典）
 * 2. 所在地: 〒248-8588　神奈川県鎌倉市雪ノ下2-1-31
 * 3. 开催期间: 2025年8月6日～9日　 9:00～21:00（予定）
 * 4. 开催场所: 神奈川県鎌倉市　鶴岡八幡宮
 * 5. 交通方式: 江ノ島電鉄「鎌倉駅」或者ＪＲ横須賀線「鎌倉駅」東口步行10分
 * 6. 主办方: 鶴岡八幡宮
 * 7. 料金: 未设置
 * 8. 联系方式: 鶴岡八幡宮　0467-22-0315
 * 9. 官方网站: https://www.hachimangu.or.jp/matsuri/index.html#tabpanel8
 * 10. 谷歌地图: 35.32592,139.556253
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750949117402",
  name: "鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼり祭典）",
  address: "〒248-8588　神奈川県鎌倉市雪ノ下2-1-31",
  datetime: "2025年8月6日～9日　 9:00～21:00（予定）",
  venue: "神奈川県鎌倉市　鶴岡八幡宮",
  access: "江ノ島電鉄「鎌倉駅」或者ＪＲ横須賀線「鎌倉駅」東口步行10分",
  organizer: "鶴岡八幡宮",
  price: "",
  contact: "鶴岡八幡宮　0467-22-0315",
  website: "https://www.hachimangu.or.jp/matsuri/index.html#tabpanel8",
  googleMap: "https://maps.google.com/maps?q=35.32592,139.556253&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "玉仓的夏季风物诗“宝登祭”在鹤冈八幡宫举行。以镰仓附近的文化人士为首，各界著名人士挥毫的约400幅书画，被制作成灯笼，排列在参道、流布马马场、舞殿周围。到了晚上，灯光就会亮起。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://buzz-trip.com/kamakura/wp-content/uploads/2022/07/pixta_11649727_M-1.jpg",
      title: "鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼり祭典）图片1",
      alt: "鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼり祭典）图片1",
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
  const regionKey = REGION_MAP["kanagawa"] || 'tokyo';

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