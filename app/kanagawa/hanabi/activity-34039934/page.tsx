import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750934039934
 * 生成时间: 2025/6/26 19:33:59
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）
 * 2. 所在地: 〒239-0831　神奈川県横須賀市久里浜
 * 3. 开催期间: 2025年8月2日　 19:30～20:00（予定）　※荒天中止
 * 4. 开催场所: 神奈川県横須賀市　ペリー公園、久里浜海岸、カインズホーム裏岸壁（旧ニチロ岸壁）、カインズ横須賀久里浜店屋上、長瀬海岸緑地
 * 5. 交通方式: 京浜急行「京急久里浜駅」步行15分、或ＪＲ横須賀線「久里浜駅」步行17分
 * 6. 主办方: 久里浜観光協会、久里浜商店会協同組合、横須賀市
 * 7. 料金: 有料観覧席有
 * 8. 联系方式: 横須賀市コールセンター　046-822-4000
 * 9. 官方网站: https://perryfes.jp/
 * 10. 谷歌地图: 35.22406,139.71295
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750934039934",
  name: "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）",
  address: "〒239-0831　神奈川県横須賀市久里浜",
  datetime: "2025年8月2日　 19:30～20:00（予定）　※荒天中止",
  venue: "神奈川県横須賀市　ペリー公園、久里浜海岸、カインズホーム裏岸壁（旧ニチロ岸壁）、カインズ横須賀久里浜店屋上、長瀬海岸緑地",
  access: "京浜急行「京急久里浜駅」步行15分、或ＪＲ横須賀線「久里浜駅」步行17分",
  organizer: "久里浜観光協会、久里浜商店会協同組合、横須賀市",
  price: "有料観覧席有",
  contact: "横須賀市コールセンター　046-822-4000",
  website: "https://perryfes.jp/",
  googleMap: "https://maps.google.com/maps?q=35.22406,139.71295&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "“久里滨佩里节”的最后一场烟火表演将在久里滨海岸附近举行，以纪念佩里海军上将以黑船的到来而闻名的成就。从久里浜港发射出4号玉、星火等雄伟的烟花，标志着烟花季节的到来。到2025年，大约有7000枚火箭，这将是有史以来最高的发射次数。还举办了“横须卡开放集市”、“夜市”和“水手佩里海军上将登陆纪念仪式”。※发射数：7000发，去年5000发观众：70，000人，去年80，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://yakei-fan.com/images/magazine/fireworks/pic_hanabi-kanagawa2023071501.jpg",
      title: "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）图片1",
      alt: "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）图片1",
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
  const regionKey = REGION_MAP["kanagawa"] || 'tokyo';

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