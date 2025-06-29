import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750945788095
 * 生成时间: 2025/6/26 22:49:48
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第66回いたばし花火大会（いたばしはなびたいかい）
 * 2. 所在地: 〒174-0041　東京都板橋区舟渡4丁目
 * 3. 开催期间: 2025年8月2日　 19:00～20:30　※荒天中止（順延なし）
 * 4. 开催场所: 東京都　板橋区荒川河川敷
 * 5. 交通方式: ＪＲ埼京線「浮間舟渡駅」から徒歩20分、或地下鉄都営三田線「高島平駅」・「西台駅」・「蓮根駅」から徒歩20分
 * 6. 主办方: 板橋区、板橋区観光協会
 * 7. 料金: 有料観覧席有
 * 8. 联系方式: 板橋区観光協会（板橋区役所くらしと観光課内）　03-3579-2255
 * 9. 官方网站: https://itabashihanabi.jp/
 * 10. 谷歌地图: 35.797463,139.68227
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750945788095",
  name: "第66回いたばし花火大会（いたばしはなびたいかい）",
  address: "〒174-0041　東京都板橋区舟渡4丁目",
  datetime: "2025年8月2日　 19:00～20:30　※荒天中止（順延なし）",
  venue: "東京都　板橋区荒川河川敷",
  access: "ＪＲ埼京線「浮間舟渡駅」から徒歩20分、或地下鉄都営三田線「高島平駅」・「西台駅」・「蓮根駅」から徒歩20分",
  organizer: "板橋区、板橋区観光協会",
  price: "有料観覧席有",
  contact: "板橋区観光協会（板橋区役所くらしと観光課内）　03-3579-2255",
  website: "https://itabashihanabi.jp/",
  googleMap: "https://maps.google.com/maps?q=35.797463,139.68227&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "两个烟花节将同时在东京的Itabashi区和埼玉县的Toda市举行，这两个烟花节位于荒川对岸。在两岸发射约1万5000发烟火，是东京都内屈指可数的烟火大会。这里有许多值得一看的地方，包括由日本最好的烟火师制作的“艺术玉”、东京最大的大玉“Shaka-gami玉”和最后的大明星矿“天空中的尼亚加拉”。由于发射地点离观众席很近，轰鸣声在你的肚子里回荡也是其中的一个乐趣。五个地点同时发射的Wide Star Mine将在质量和数量上得到升级，并将在开幕式和最后一场精彩的演出中进行。* 发射次数：15，000枚，去年15，000枚，观众人数：55万人，去年57万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://pbs.twimg.com/media/GrTB5BcXwAAqfav?format=jpg&name=large",
      title: "第66回いたばし花火大会（いたばしはなびたいかい）图片1",
      alt: "第66回いたばし花火大会（いたばしはなびたいかい）图片1",
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