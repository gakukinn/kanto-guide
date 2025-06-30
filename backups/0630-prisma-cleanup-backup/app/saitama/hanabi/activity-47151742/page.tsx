import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750947151742
 * 生成时间: 2025/6/26 23:12:31
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 東浦和大間木公園会場花火大会（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）
 * 2. 所在地: 〒336-0923　埼玉県さいたま市緑区大間木地内
 * 3. 开催期间: 2025年8月9日　 19:30～　※荒天中止（順延日なし）
 * 4. 开催场所: さいたま市　東浦和大間木公園周辺
 * 5. 交通方式: ＪＲ武蔵野線「東浦和駅」から観覧場所誘導ルートで徒歩15分
 * 6. 主办方: さいたま市花火大会実行委員会
 * 7. 料金: 有料観覧席有　※事前販売制、詳細はさいたま市公式観光サイトを参照
 * 8. 联系方式: NTT IP Voice（音声案内）　050-3665-9607　※7月18日～8月16日まで24時間対応。プリペイド携帯、一部のIP・光ラインなどでは利用できない場合有
 * 9. 官方网站: https://visitsaitamacity.jp/events/29
 * 10. 谷歌地图: 35.864478,139.710207
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750947151742",
  name: "東浦和大間木公園会場花火大会（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）",
  address: "〒336-0923　埼玉県さいたま市緑区大間木地内",
  datetime: "2025年8月9日　 19:30～　※荒天中止（順延日なし）",
  venue: "さいたま市　東浦和大間木公園周辺",
  access: "ＪＲ武蔵野線「東浦和駅」から観覧場所誘導ルートで徒歩15分",
  organizer: "さいたま市花火大会実行委員会",
  price: "有料観覧席有　※事前販売制、詳細はさいたま市公式観光サイトを参照",
  contact: "NTT IP Voice（音声案内）　050-3665-9607　※7月18日～8月16日まで24時間対応。プリペイド携帯、一部のIP・光ラインなどでは利用できない場合有",
  website: "https://visitsaitamacity.jp/events/29",
  googleMap: "https://maps.google.com/maps?q=35.864478,139.710207&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "埼玉市烟火大会之一，在浦和地区（东浦和大间木公园）举行。在夜空中快速射击，星星矿等被发射，你可以一边享受见沼的大自然，一边欣赏烟花。埼玉市烟花节在大宫地区（小和田公园）和岩崎地区（岩崎文化公园）举行。※发射数：去年2500发观众数：去年5万人次",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/ca8d31c8-4dff-45b7-bdd4-f26c56d3a7f1/0_2.png",
      title: "東浦和大間木公園会場花火大会（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）图片1",
      alt: "東浦和大間木公園会場花火大会（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）图片1",
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
  const regionKey = REGION_MAP["saitama"] || 'tokyo';

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