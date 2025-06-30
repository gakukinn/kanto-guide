import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750949251142
 * 生成时间: 2025/6/26 23:47:31
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）
 * 2. 所在地: 〒250-0002　神奈川県小田原市寿町5-22
 * 3. 开催期间: 2025年8月2日　 19:10～20:00　※荒天中止
 * 4. 开催场所: 神奈川県小田原市　酒匂川スポーツ広場
 * 5. 交通方式: ＪＲ東海道本線「鴨宮駅」步行15分
 * 6. 主办方: 一般社団法人小田原市観光協会
 * 7. 料金: 有料観覧席有　1人3500円～（全7タイプ販売）
 * 8. 联系方式: 一般社団法人小田原市観光協会　0465-20-4192
 * 9. 官方网站: https://www.odawara-kankou.com/
 * 10. 谷歌地图: 35.266076,139.174371
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750949251142",
  name: "小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）",
  address: "〒250-0002　神奈川県小田原市寿町5-22",
  datetime: "2025年8月2日　 19:10～20:00　※荒天中止",
  venue: "神奈川県小田原市　酒匂川スポーツ広場",
  access: "ＪＲ東海道本線「鴨宮駅」步行15分",
  organizer: "一般社団法人小田原市観光協会",
  price: "有料観覧席有　1人3500円～（全7タイプ販売）",
  contact: "一般社団法人小田原市観光協会　0465-20-4192",
  website: "https://www.odawara-kankou.com/",
  googleMap: "https://maps.google.com/maps?q=35.266076,139.174371&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "小田原酒川烟花节将在酒川河畔举行，届时将燃放约10，000发烟花，包括星光、音乐烟花、讯息烟花和4号烟花。除了以传统和情感为基础的传统烟花外，您还可以欣赏到烟花和音乐同步的华丽烟花表演等丰富多彩的烟花表演。在最后一场比赛中，横跨清酒川的全长300米高30米的尼亚加拉烟花将出现，欢呼雀跃。* 发射次数：10，000，去年10，000，观众：250，000，去年250，000",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/738dc805-02ca-4c5d-9de1-a0151f086778/0_1.png",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;