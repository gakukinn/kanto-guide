import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc8ku2gf000bvlgga8kgtpu4
 * 生成时间: 2025/6/25 22:24:26
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）
 * 2. 所在地: 〒405-0018　山梨県山梨市上神内川
 * 3. 开催期间: 2025年7月26日　 花火打ち上げ/19:30～21:00（予定）　※小雨決行、荒天時は翌日に順延
 * 4. 开催场所: 山梨県山梨市　笛吹川万力大橋下流
 * 5. 交通方式: ＪＲ中央本線「山梨市駅」から徒歩3分
 * 6. 主办方: 笛吹川県下納涼花火大会山梨市実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 笛吹川県下納涼花火大会山梨市実行委員会　0553-22-1111
 * 9. 官方网站: https://www.city.yamanashi.yamanashi.jp/soshiki/17/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.682815!3d35.689679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750658916863!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc8ku2gf000bvlgga8kgtpu4",
  name: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）",
  address: "〒405-0018　山梨県山梨市上神内川",
  datetime: "2025年7月26日　 花火打ち上げ/19:30～21:00（予定）　※小雨決行、荒天時は翌日に順延",
  venue: "山梨県山梨市　笛吹川万力大橋下流",
  access: "ＪＲ中央本線「山梨市駅」から徒歩3分",
  organizer: "笛吹川県下納涼花火大会山梨市実行委員会",
  price: "有料観覧席なし",
  contact: "笛吹川県下納涼花火大会山梨市実行委員会　0553-22-1111",
  website: "https://www.city.yamanashi.yamanashi.jp/soshiki/17/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.682815!3d35.689679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750658916863!5m2!1sja!2sjp",
  region: "koshinetsu",
  description: "2025年で第51回を迎える「高崎まつり」が、2日間にわたり高崎市中心市街地で開催されます。神輿渡御や、山車の巡行などの伝統的な祭りに加え、さまざまな催しが行われます。初日の夜には“一心共生～繋がる心、響き合う高崎まつり～”を2025年のテーマに、打ち上げ数約1万5000発を誇る北関東最大級の大花火大会が、烏川和田橋上流の河川敷で行われます。花火の種類が豊富で豪華なのはもちろん、短時間に夜空が覆いつくされる大迫力の演出が見どころとなっています。有料観覧エリアからの観賞がおすすめです。 ※打ち上げ数：1万5000発、昨年度1万5000発 観客数：90万人、昨年度90万人（まつり全体）",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750857863519_xinrumingyue_imagine_prompt_A_realistic_photograph_of_the_Shi_e6f7b1f0-07f4-49bf-9b22-c41137d61e71_1_compressed.jpg",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;