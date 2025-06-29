import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750943380783
 * 生成时间: 2025/6/26 22:09:40
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 長岡祭典大花火大会（ながおか祭典おおはなびたいかい）
 * 2. 所在地: 〒940-0098　新潟県長岡市信濃
 * 3. 开催期间: 2025年8月2日～3日　 打上時間/19:20～21:10　※最新情報はホームページ参照
 * 4. 开催场所: 新潟県長岡市　信濃川河川敷
 * 5. 交通方式: ＪＲ信越本線・上越新幹線「長岡駅」から徒歩30分
 * 6. 主办方: 一般財団法人長岡花火財団
 * 7. 料金: 有料観覧席有/2000円～　※花火会場内は全席有料（無料席は有ません）
 * 8. 联系方式: 一般財団法人長岡花火財団　0570-00-8283 （ナビダイヤル）、長岡花火チケットセンター（有料観覧席の問合せ）　0570-082-083　（ナビダイヤル）
 * 9. 官方网站: https://nagaokamatsuri.com/
 * 10. 谷歌地图: 37.447019,138.836664
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750943380783",
  name: "長岡祭典大花火大会（ながおか祭典おおはなびたいかい）",
  address: "〒940-0098　新潟県長岡市信濃",
  datetime: "2025年8月2日～3日　 打上時間/19:20～21:10　※最新情報はホームページ参照",
  venue: "新潟県長岡市　信濃川河川敷",
  access: "ＪＲ信越本線・上越新幹線「長岡駅」から徒歩30分",
  organizer: "一般財団法人長岡花火財団",
  price: "有料観覧席有/2000円～　※花火会場内は全席有料（無料席は有ません）",
  contact: "一般財団法人長岡花火財団　0570-00-8283 （ナビダイヤル）、長岡花火チケットセンター（有料観覧席の問合せ）　0570-082-083　（ナビダイヤル）",
  website: "https://nagaokamatsuri.com/",
  googleMap: "https://maps.google.com/maps?q=37.447019,138.836664&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "“长冈祭大烟花大会”将在信浓川河边举行，以纪念在长冈空袭中丧生的人们，感谢致力于复兴的先辈，以及对复兴与永久和平的愿望等，承载着长冈市民的特殊愿望。2025年，以“祈祷绽放”为主题，将举行尼亚加拉、维苏比亚斯超大型星光、超大型星光等烟花的燃放。在信诺河的两岸都设置了观众席，充分利用了可以从两个方向观看烟花的特点，以竹玉为中心的许多演出而闻名。其中，开花宽约650m的正三尺玉和开花宽约2km的不死鸟在夜空中飞舞的独一无二的烟火“复兴祈愿烟火凤凰”是必看的，将长冈的夜空涂上鲜艳的色彩。※发射人数：非公开观众数：去年34万人（2天）",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://niigata-nippo.ismcdn.jp/mwimgs/9/9/1200m/img_99683b9dbac88bab41dd532f30c0a172356481.jpg",
      title: "長岡祭典大花火大会（ながおか祭典おおはなびたいかい）图片1",
      alt: "長岡祭典大花火大会（ながおか祭典おおはなびたいかい）图片1",
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