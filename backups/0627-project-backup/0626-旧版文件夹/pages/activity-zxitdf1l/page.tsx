import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc96k7x8000zvlr0zxitdf1l
 * 生成时间: 2025/6/25 22:30:53
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 信州千曲市　千曲川納涼煙火大会（しんしゅうちくまし　ちくまがわのうりょうえんかたいかい）
 * 2. 所在地: 〒389-0807　長野県千曲市
 * 3. 开催期间: 2025年8月7日　 19:30～21:00
 * 4. 开催场所: 長野県千曲市　戸倉上山田温泉　千曲川河畔（大正橋～万葉橋間）
 * 5. 交通方式: しなの鉄道「戸倉駅」から徒歩25分、または長野自動車道「更埴IC」から車約15分、または上信越自動車道「坂城IC」から車約8分
 * 6. 主办方: 千曲川納涼煙火大会実行委員会
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 千曲川納涼煙火大会実行委員会事務局　026-261-0300
 * 9. 官方网站: https://chikuma-hanabi.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.145627!3d36.480223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688204767!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96k7x8000zvlr0zxitdf1l",
  name: "信州千曲市　千曲川納涼煙火大会（しんしゅうちくまし　ちくまがわのうりょうえんかたいかい）",
  address: "〒389-0807　長野県千曲市",
  datetime: "2025年8月7日　 19:30～21:00",
  venue: "長野県千曲市　戸倉上山田温泉　千曲川河畔（大正橋～万葉橋間）",
  access: "しなの鉄道「戸倉駅」から徒歩25分、または長野自動車道「更埴IC」から車約15分、または上信越自動車道「坂城IC」から車約8分",
  organizer: "千曲川納涼煙火大会実行委員会",
  price: "有料観覧席あり",
  contact: "千曲川納涼煙火大会実行委員会事務局　026-261-0300",
  website: "https://chikuma-hanabi.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.145627!3d36.480223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688204767!5m2!1sja!2sjp",
  region: "koshinetsu",
  description: "長野県内でも屈指の煙火大会が、千曲川河畔で繰り広げられます。歴史と伝統を重ねた戸倉上山田温泉の夏の風物詩ともなっています。メッセージ花火、ミュージック花火など、5号から10号玉までさまざまな花火が次々と打ち上げられ、中盤には地上・水中スターマイン、フィナーレにはナイアガラの滝、超特大スターマインと続きます。※花火の内容は予定です。 ※打ち上げ数：1万発、昨年度1万発 観客数：7万人、昨年度6万5000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://hanabi-navi.info/wp-content/uploads/2025/05/3e651e87cf6d898fda6d4745739d5d474113d81e-e1747067550102.jpg",
      title: "信州千曲市　千曲川納涼煙火大会（しんしゅうちくまし　ちくまがわのうりょうえんかたいかい）图片1",
      alt: "信州千曲市　千曲川納涼煙火大会（しんしゅうちくまし　ちくまがわのうりょうえんかたいかい）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;