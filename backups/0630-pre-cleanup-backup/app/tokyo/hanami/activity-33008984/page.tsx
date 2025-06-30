import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花见会详情页面
 * 数据库ID: recognition-hanami-1750933008984
 * 生成时间: 2025/6/26 19:16:48
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 旧古河庭園「春のバラフェスティバル」（きゅうふるかわていえん　はるのバラフェスティバル）
 * 2. 所在地: 〒114-0024　東京都北区西ケ原1-27-39
 * 3. 开催期间: 2025年4月29日～6月30日　 開園時間/9:00～17:00（最終入園は16:30）　※春バラの開花時期は気象条件により変動する場合有
 * 4. 开催场所: 東京都　旧古河庭園
 * 5. 交通方式: ＪＲ京浜東北線「上中里駅」或者地下鉄南北線「西ヶ原駅」步行7分、或ＪＲ山手線「駒込駅」步行12分
 * 6. 主办方: 未设置
 * 7. 料金: 入園料/一般150円、65歳以上70円、小学生以下および都内在住・在学の中学生無料　※洋館見学は別途
 * 8. 联系方式: 旧古河庭園サービスセンター　03-3910-0394
 * 9. 官方网站: https://www.tokyo-park.or.jp/park/kyu-furukawa/
 * 10. 谷歌地图: 35.742766,139.746014
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanami-1750933008984",
  name: "旧古河庭園「春のバラフェスティバル」（きゅうふるかわていえん　はるのバラフェスティバル）",
  address: "〒114-0024　東京都北区西ケ原1-27-39",
  datetime: "2025年4月29日～6月30日　 開園時間/9:00～17:00（最終入園は16:30）　※春バラの開花時期は気象条件により変動する場合有",
  venue: "東京都　旧古河庭園",
  access: "ＪＲ京浜東北線「上中里駅」或者地下鉄南北線「西ヶ原駅」步行7分、或ＪＲ山手線「駒込駅」步行12分",
  organizer: "",
  price: "入園料/一般150円、65歳以上70円、小学生以下および都内在住・在学の中学生無料　※洋館見学は別途",
  contact: "旧古河庭園サービスセンター　03-3910-0394",
  website: "https://www.tokyo-park.or.jp/park/kyu-furukawa/",
  googleMap: "https://maps.google.com/maps?q=35.742766,139.746014&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "在以玫瑰闻名的老古川花园里，春天的玫瑰在每年的四月下旬到六月下旬是最好的季节。您可以欣赏到约100种、200株华丽玫瑰盛开的西式庭园、厚重的西式西式庭园、风情十足的日本庭园。在观赏季节的同时，还会举办“春玫瑰节”，除了清晨开放外，还会举办音乐会、春玫瑰人气投票、园林导游等活动，让您在五颜六色的玫瑰和芳香中度过一段优雅的时光。在草坪广场入口处，有一个玫瑰花园市场，出售玫瑰花商品和花盆等。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://prcdn.freetls.fastly.net/release_image/52467/4230/52467-4230-f8811d0dda9db4e5986a7bfc52c438a1-1335x1002.jpg?format=jpeg&auto=webp&fit=bounds&width=2400&height=1260",
      title: "旧古河庭園「春のバラフェスティバル」（きゅうふるかわていえん　はるのバラフェスティバル）图片1",
      alt: "旧古河庭園「春のバラフェスティバル」（きゅうふるかわていえん　はるのバラフェスティバル）图片1",
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
  const regionKey = REGION_MAP["tokyo"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanami"
      />
    </div>
  );
};

export default DetailPage;