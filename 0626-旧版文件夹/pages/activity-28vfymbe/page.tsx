import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc96cst9000lvlr028vfymbe
 * 生成时间: 2025/6/25 22:23:29
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 高崎まつり（たかさきまつり）
 * 2. 所在地: 〒370-0829　群馬県高崎市高松町ほか
 * 3. 开催期间: 2025年8月23日～24日　 大花火大会/23日19:30～20:20（雨天時は翌日に順延）※予定、神輿渡御・高崎山車まつり/23日～24日
 * 4. 开催场所: 群馬県高崎市　中心市街地、もてなし広場、烏川和田橋上流の河川敷　ほか
 * 5. 交通方式: ＪＲ「高崎駅」西口から徒歩10分
 * 6. 主办方: 高崎まつり実行委員会
 * 7. 料金: 花火/有料観覧席あり
 * 8. 联系方式: 高崎まつり実行委員会（一般社団法人高崎観光協会）　027-330-5333
 * 9. 官方网站: https://www.takasaki-matsuri.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.003143!3d36.325071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687851830!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96cst9000lvlr028vfymbe",
  name: "高崎まつり（たかさきまつり）",
  address: "〒370-0829　群馬県高崎市高松町ほか",
  datetime: "2025年8月23日～24日　 大花火大会/23日19:30～20:20（雨天時は翌日に順延）※予定、神輿渡御・高崎山車まつり/23日～24日",
  venue: "群馬県高崎市　中心市街地、もてなし広場、烏川和田橋上流の河川敷　ほか",
  access: "ＪＲ「高崎駅」西口から徒歩10分",
  organizer: "高崎まつり実行委員会",
  price: "花火/有料観覧席あり",
  contact: "高崎まつり実行委員会（一般社団法人高崎観光協会）　027-330-5333",
  website: "https://www.takasaki-matsuri.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.003143!3d36.325071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687851830!5m2!1sja!2sjp",
  region: "kitakanto",
  description: "2025年で第51回を迎える「高崎まつり」が、2日間にわたり高崎市中心市街地で開催されます。神輿渡御や、山車の巡行などの伝統的な祭りに加え、さまざまな催しが行われます。初日の夜には“一心共生～繋がる心、響き合う高崎まつり～”を2025年のテーマに、打ち上げ数約1万5000発を誇る北関東最大級の大花火大会が、烏川和田橋上流の河川敷で行われます。花火の種類が豊富で豪華なのはもちろん、短時間に夜空が覆いつくされる大迫力の演出が見どころとなっています。有料観覧エリアからの観賞がおすすめです。 ※打ち上げ数：1万5000発、昨年度1万5000発 観客数：90万人、昨年度90万人（まつり全体）",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750857805913_xinrumingyue_Japanese_fireworks_festival_realistic_photograph_ddc092dd-27f0-4cb0-9e81-c2daf31298bd_2_compressed.jpg",
      title: "高崎まつり（たかさきまつり）图片1",
      alt: "高崎まつり（たかさきまつり）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;