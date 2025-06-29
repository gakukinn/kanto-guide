import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750945709271
 * 生成时间: 2025/6/26 22:48:29
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 江戸川区花火大会（えどがわくはなびたいかい）
 * 2. 所在地: 〒133-0054　東京都江戸川区
 * 3. 开催期间: 2025年8月2日　 19:15～20:20　※荒天中止（延期なし）
 * 4. 开催场所: 東京都　江戸川河川敷（都立篠崎公園先）
 * 5. 交通方式: 地下鉄都営新宿線「篠崎駅」から徒歩15分、またはＪＲ総武線「小岩駅」から徒歩25分もしくは京成バス「南小岩二丁目」～徒歩10分
 * 6. 主办方: 江戸川区、江戸川区花火大会実行委員会
 * 7. 料金: 有料観覧席あり　※詳細は江戸川区花火大会ホームページを参照
 * 8. 联系方式: 江戸川区花火大会実行委員会事務局　03-5662-0523
 * 9. 官方网站: https://www.city.edogawa.tokyo.jp/hanabi/
 * 10. 谷歌地图: 35.721263,139.897602
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750945709271",
  name: "江戸川区花火大会（えどがわくはなびたいかい）",
  address: "〒133-0054　東京都江戸川区",
  datetime: "2025年8月2日　 19:15～20:20　※荒天中止（延期なし）",
  venue: "東京都　江戸川河川敷（都立篠崎公園先）",
  access: "地下鉄都営新宿線「篠崎駅」から徒歩15分、またはＪＲ総武線「小岩駅」から徒歩25分もしくは京成バス「南小岩二丁目」～徒歩10分",
  organizer: "江戸川区、江戸川区花火大会実行委員会",
  price: "有料観覧席あり　※詳細は江戸川区花火大会ホームページを参照",
  contact: "江戸川区花火大会実行委員会事務局　03-5662-0523",
  website: "https://www.city.edogawa.tokyo.jp/hanabi/",
  googleMap: "https://maps.google.com/maps?q=35.721263,139.897602&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "夏の江戸川を彩る「江戸川区花火大会」が、江戸川河川敷で開催されます。2025年は、異なる7つのテーマをもとに、それぞれのイメージに沿ったBGMに乗って、8号玉やミュージック花火など約1万4000発が夜空を彩ります。大会50周年の目玉企画として、江戸川名物「富士の大仕掛け」が、「最も高い山型の仕掛け花火」でギネス世界記録に挑戦します。花火デザインの公募が行われ、宗家花火鍵屋による審査のもと、自由で独創的な花火が打ち上げられます。 ※打ち上げ数：1万4000発、昨年度打ち上げ数：1万4000発 観客数：3万人、昨年度3万人（※いずれも協賛席・有料席の来場者数）",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/4249ed1a-b154-4a69-9d90-e8e61c01358d/0_0.png",
      title: "江戸川区花火大会（えどがわくはなびたいかい）图片1",
      alt: "江戸川区花火大会（えどがわくはなびたいかい）图片1",
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
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;