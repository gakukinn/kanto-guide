import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750954439222
 * 生成时间: 2025/6/27 01:13:59
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）
 * 2. 所在地: 〒405-0018　山梨県山梨市上神内川
 * 3. 开催期间: 2025年7月26日　 花火打ち上げ/19:30～21:00（予定）　※小雨決行、荒天時は翌日に順延
 * 4. 开催场所: 山梨県山梨市　笛吹川万力大橋下流
 * 5. 交通方式: ＪＲ中央本線「山梨市駅」から徒歩3分
 * 6. 主办方: 笛吹川県下納涼花火大会山梨市実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 笛吹川県下納涼花火大会山梨市実行委員会　0553-22-1111
 * 9. 官方网站: https://www.city.yamanashi.yamanashi.jp/soshiki/17/
 * 10. 谷歌地图: 35.689679,138.682815
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750954439222",
  name: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）",
  address: "〒405-0018　山梨県山梨市上神内川",
  datetime: "2025年7月26日　 花火打ち上げ/19:30～21:00（予定）　※小雨決行、荒天時は翌日に順延",
  venue: "山梨県山梨市　笛吹川万力大橋下流",
  access: "ＪＲ中央本線「山梨市駅」から徒歩3分",
  organizer: "笛吹川県下納涼花火大会山梨市実行委員会",
  price: "有料観覧席なし",
  contact: "笛吹川県下納涼花火大会山梨市実行委員会　0553-22-1111",
  website: "https://www.city.yamanashi.yamanashi.jp/soshiki/17/",
  googleMap: "https://maps.google.com/maps?q=35.689679,138.682815&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "梅雨明けと同時に開催される花火大会です。2025年は「山梨市制施行20周年記念事業」として、例年より約2000発増発して、実施されます。4号玉、早打ち、スターマイン、大スターマイン、仕掛花火などが夜空を華やかに彩り、笛吹川の清流と万力林の緑豊かな自然を背景に打ち上げられる花火は、観客を魅了します。打ち上げ場所と観覧場所が近いため、息を呑むほどの迫力が体感できます。 ※打ち上げ数：5000発、昨年度3000発 観客数：2万5000人、昨年度2万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/ead6b34a-80a2-4c3c-a48d-f2a4a02287d8/0_0.png",
      title: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）图片1",
      alt: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）图片1",
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
  const regionKey = REGION_MAP["koshinetsu"] || 'tokyo';

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