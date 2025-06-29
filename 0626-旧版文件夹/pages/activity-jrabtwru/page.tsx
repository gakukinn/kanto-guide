import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc8oz54a0007vlscjrabtwru
 * 生成时间: 2025/6/25 22:28:13
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 長岡まつり大花火大会（ながおかまつりおおはなびたいかい）
 * 2. 所在地: 〒940-0098　新潟県長岡市信濃
 * 3. 开催期间: 2025年8月2日～3日　 打上時間/19:20～21:10　※最新情報はホームページ参照
 * 4. 开催场所: 新潟県長岡市　信濃川河川敷
 * 5. 交通方式: ＪＲ信越本線・上越新幹線「長岡駅」から徒歩30分
 * 6. 主办方: 一般財団法人長岡花火財団
 * 7. 料金: 有料観覧席あり/2000円～　※花火会場内は全席有料（無料席はありません）
 * 8. 联系方式: 一般財団法人長岡花火財団　0570-00-8283 （ナビダイヤル）、長岡花火チケットセンター（有料観覧席の問合せ）　0570-082-083　（ナビダイヤル）
 * 9. 官方网站: https://nagaokamatsuri.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.836664!3d37.447019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750768652871!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc8oz54a0007vlscjrabtwru",
  name: "長岡まつり大花火大会（ながおかまつりおおはなびたいかい）",
  address: "〒940-0098　新潟県長岡市信濃",
  datetime: "2025年8月2日～3日　 打上時間/19:20～21:10　※最新情報はホームページ参照",
  venue: "新潟県長岡市　信濃川河川敷",
  access: "ＪＲ信越本線・上越新幹線「長岡駅」から徒歩30分",
  organizer: "一般財団法人長岡花火財団",
  price: "有料観覧席あり/2000円～　※花火会場内は全席有料（無料席はありません）",
  contact: "一般財団法人長岡花火財団　0570-00-8283 （ナビダイヤル）、長岡花火チケットセンター（有料観覧席の問合せ）　0570-082-083　（ナビダイヤル）",
  website: "https://nagaokamatsuri.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.836664!3d37.447019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750768652871!5m2!1sja!2sjp",
  region: "koshinetsu",
  description: "長岡空襲で亡くなった人々への慰霊と、復興に尽力した先人への感謝、復興と恒久平和への願いなど、長岡市民の特別な想いが込められた「長岡まつり大花火大会」が、信濃川河川敷で開催されます。2025年は、“祈り咲かせて”をテーマに、ナイアガラ、ベスビアス超大型スターマイン、超大型ワイドスターマインなどの花火の打ち上げが行われます。信濃川の両岸に観覧席が設けられ、両方向から花火を観覧できるという特性を活かし、尺玉を中心とした演出が多いことで知られています。なかでも開花幅約650mの正三尺玉と、開花幅約2kmの、不死鳥が夜空を舞う唯一無二の花火「復興祈願花火フェニックス」は必見で、長岡の夜空を鮮やかに彩ります。 ※打ち上げ数：非公開 観客数：昨年度34万人（2日間）",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750858089429_xinrumingyue_imagine_prompt_A_realistic_photograph_of_the_Nag_b717a365-c093-4ebc-8653-33d5640eb68a_1_compressed.jpg",
      title: "長岡まつり大花火大会（ながおかまつりおおはなびたいかい）图片1",
      alt: "長岡まつり大花火大会（ながおかまつりおおはなびたいかい）图片1",
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