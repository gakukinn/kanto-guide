import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc7ovoll000cvl9cj5mxgl8o
 * 生成时间: 2025/6/25 22:35:21
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）
 * 2. 所在地: 〒250-0002　神奈川県小田原市寿町5-22
 * 3. 开催期间: 2025年8月2日　 19:10～20:00　※荒天中止
 * 4. 开催场所: 神奈川県小田原市　酒匂川スポーツ広場
 * 5. 交通方式: ＪＲ東海道本線「鴨宮駅」から徒歩15分
 * 6. 主办方: 一般社団法人小田原市観光協会
 * 7. 料金: 有料観覧席あり　1人3500円～（全7タイプ販売）
 * 8. 联系方式: 一般社団法人小田原市観光協会　0465-20-4192
 * 9. 官方网站: https://www.odawara-kankou.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.174371!3d35.266076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684382478!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ovoll000cvl9cj5mxgl8o",
  name: "小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）",
  address: "〒250-0002　神奈川県小田原市寿町5-22",
  datetime: "2025年8月2日　 19:10～20:00　※荒天中止",
  venue: "神奈川県小田原市　酒匂川スポーツ広場",
  access: "ＪＲ東海道本線「鴨宮駅」から徒歩15分",
  organizer: "一般社団法人小田原市観光協会",
  price: "有料観覧席あり　1人3500円～（全7タイプ販売）",
  contact: "一般社団法人小田原市観光協会　0465-20-4192",
  website: "https://www.odawara-kankou.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.174371!3d35.266076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684382478!5m2!1sja!2sjp",
  region: "kanagawa",
  description: "酒匂川の河川敷で、スターマイン、ミュージック花火、メッセージ花火、4号玉など約1万発の花火が打ち上げられる「小田原酒匂川花火大会」が開催されます。伝統と情緒を基本としてきた従来の花火に加え、花火と音楽をシンクロさせた華麗な花火ショーなど、多彩な演出の花火を楽しむことができます。フィナーレには、酒匂川を横断する全長300m高さ30mのナイアガラ花火が出現し、歓声が上がります。 ※打ち上げ数：1万発、昨年度1万発 観客数：25万人、昨年度25万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://trip.pref.kanagawa.jp/img/spots/photos/506e1b0139136c5c91ad5b45b48ee613.jpeg",
      title: "小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）图片1",
      alt: "小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;