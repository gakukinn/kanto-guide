import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc7p4sph0001vl4o06l98zqd
 * 生成时间: 2025/6/24 23:34:08
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼりまつり）
 * 2. 所在地: 〒248-8588　神奈川県鎌倉市雪ノ下2-1-31
 * 3. 开催期间: 2025年8月6日～9日　 9:00～21:00（予定）
 * 4. 开催场所: 神奈川県鎌倉市　鶴岡八幡宮
 * 5. 交通方式: 江ノ島電鉄「鎌倉駅」もしくはＪＲ横須賀線「鎌倉駅」東口から徒歩10分
 * 6. 主办方: 鶴岡八幡宮
 * 7. 料金: 未设置
 * 8. 联系方式: 鶴岡八幡宮　0467-22-0315
 * 9. 官方网站: https://www.hachimangu.or.jp/matsuri/index.html#tabpanel8
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.556253!3d35.32592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684964056!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7p4sph0001vl4o06l98zqd",
  name: "鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼりまつり）",
    description: "",
  address: "〒248-8588　神奈川県鎌倉市雪ノ下2-1-31",
  datetime: "2025年8月6日～9日　 9:00～21:00（予定）",
  venue: "神奈川県鎌倉市　鶴岡八幡宮",
  access: "江ノ島電鉄「鎌倉駅」もしくはＪＲ横須賀線「鎌倉駅」東口から徒歩10分",
  organizer: "鶴岡八幡宮",
  price: "",
  contact: "鶴岡八幡宮　0467-22-0315",
  website: "https://www.hachimangu.or.jp/matsuri/index.html#tabpanel8",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.556253!3d35.32592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684964056!5m2!1sja!2sjp",
  region: "kanagawa",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanaloco.jp/archives/newsxml/2015/08/2dd7e2798941990281cec45f7ed737b5.jpg",
      title: "鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼりまつり）图片1",      alt: "鶴岡八幡宮　ぼんぼり祭（つるがおかはちまんぐう　ぼんぼりまつり）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;