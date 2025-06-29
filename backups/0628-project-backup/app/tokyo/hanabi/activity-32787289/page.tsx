import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750955570727
 * 生成时间: 2025/6/27 01:32:50
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 葛飾納涼花火大会（かつしかのうりょうはなびたいかい）
 * 2. 所在地: 〒125-0052　東京都葛飾区柴又7-17-13地先
 * 3. 开催期间: 2025年7月22日　 打上時間/19:20～20:20　※雨天決行（荒天中止）
 * 4. 开催场所: 東京都　柴又野球場（江戸川河川敷）
 * 5. 交通方式: 京成金町線「柴又駅」から徒歩10分、または北総鉄道北総線「新柴又駅」から徒歩15分、またはＪＲ常磐線・地下鉄千代田線「金町駅」もしくは京成金町線「京成金町駅」から徒歩20分
 * 6. 主办方: 葛飾納涼花火大会実行委員会（葛飾区、一般社団法人葛飾区観光協会）
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 葛飾区コールセンター（はなしょうぶコール）　03-6758-2222
 * 9. 官方网站: https://www.city.katsushika.lg.jp/tourism/1000064/1000065/1031830.html
 * 10. 谷歌地图: 35.761263,139.881299
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750955570727",
  name: "葛飾納涼花火大会（かつしかのうりょうはなびたいかい）",
  address: "〒125-0052　東京都葛飾区柴又7-17-13地先",
  datetime: "2025年7月22日　 打上時間/19:20～20:20　※雨天決行（荒天中止）",
  venue: "東京都　柴又野球場（江戸川河川敷）",
  access: "京成金町線「柴又駅」から徒歩10分、または北総鉄道北総線「新柴又駅」から徒歩15分、またはＪＲ常磐線・地下鉄千代田線「金町駅」もしくは京成金町線「京成金町駅」から徒歩20分",
  organizer: "葛飾納涼花火大会実行委員会（葛飾区、一般社団法人葛飾区観光協会）",
  price: "有料観覧席あり",
  contact: "葛飾区コールセンター（はなしょうぶコール）　03-6758-2222",
  website: "https://www.city.katsushika.lg.jp/tourism/1000064/1000065/1031830.html",
  googleMap: "https://maps.google.com/maps?q=35.761263,139.881299&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "華麗に進化し続ける古き良き下町の花火「葛飾納涼花火大会」が、今年も開催されます。スターマイン、ナイアガラ、ミュージック花火など最大4号玉を含む約1万5000発の花火が、葛飾の夜空を彩ります。観客席から打ち上げ場所が近いため、都内でも屈指の臨場感満点の花火大会として有名です。花火の迫力を特等席で味わえる有料指定席もあります。のんびりと下町情緒あふれる柴又帝釈天参道をそぞろ歩きしてから、花火を堪能するのもおすすめ。格別な夏の風物詩を楽しめます。 ※打ち上げ数：1万5000発、昨年度1万5000発 観客数：昨年度77万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/f8aa4a24-841f-4d48-9ae3-fabadac46ee4/0_2.png",
      title: "葛飾納涼花火大会（かつしかのうりょうはなびたいかい）图片1",
      alt: "葛飾納涼花火大会（かつしかのうりょうはなびたいかい）图片1",
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