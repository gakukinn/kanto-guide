import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750949417203
 * 生成时间: 2025/6/26 23:50:17
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 相模原納涼花火大会（さがみはらのうりょうはなびたいかい）
 * 2. 所在地: 〒252-0246　神奈川県相模原市中央区水郷田名
 * 3. 开催期间: 2025年9月6日　 花火打ち上げ/19:00～20:15　※荒天時・相模川増水時は翌日に順延、翌日も実施できない場合は中止
 * 4. 开催场所: 神奈川県相模原市　相模川高田橋上流
 * 5. 交通方式: ＪＲ横浜線「橋本駅」・「相模原駅」・「淵野辺駅」もしくはＪＲ相模線「上溝駅」から「田名バスターミナル行」のバス「田名バスターミナル」～徒歩15分
 * 6. 主办方: 相模原納涼花火大会実行委員会
 * 7. 料金: 有料観覧席あり　※詳細はホームページ参照
 * 8. 联系方式: 相模原納涼花火大会実行委員会　sagamihara.hanabi@gmail.com、相模原市観光協会　042-771-3767
 * 9. 官方网站: https://sagamiharahanabi.com
 * 10. 谷歌地图: 35.542701,139.329083
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750949417203",
  name: "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）",
  address: "〒252-0246　神奈川県相模原市中央区水郷田名",
  datetime: "2025年9月6日　 花火打ち上げ/19:00～20:15　※荒天時・相模川増水時は翌日に順延、翌日も実施できない場合は中止",
  venue: "神奈川県相模原市　相模川高田橋上流",
  access: "ＪＲ横浜線「橋本駅」・「相模原駅」・「淵野辺駅」もしくはＪＲ相模線「上溝駅」から「田名バスターミナル行」のバス「田名バスターミナル」～徒歩15分",
  organizer: "相模原納涼花火大会実行委員会",
  price: "有料観覧席あり　※詳細はホームページ参照",
  contact: "相模原納涼花火大会実行委員会　sagamihara.hanabi@gmail.com、相模原市観光協会　042-771-3767",
  website: "https://sagamiharahanabi.com",
  googleMap: "https://maps.google.com/maps?q=35.542701,139.329083&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "多くの人々に愛される相模原市の夏の風物詩、「相模原納涼花火大会」が、高田橋上流で開催されます。スターマインやミュージック花火など、さまざまな花火が夜空を彩り、心に残る光景が繰り広げられます。打ち上げ場所と観客席が近く、迫力ある花火が楽しめるのも、人気の一つです。ステージイベントも企画されています。 ※打ち上げ数：8000発 観客数：5万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://yakei-fan.com/images/magazine/fireworks/pic_sagamihara-hanabi202301.jpg",
      title: "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）图片1",
      alt: "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）图片1",
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