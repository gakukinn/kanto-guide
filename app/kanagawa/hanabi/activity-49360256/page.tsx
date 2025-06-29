import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750949570593
 * 生成时间: 2025/6/26 23:52:50
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 湘南ひらつか花火大会（しょうなんひらつかはなびたいかい）
 * 2. 所在地: 〒254-0803　神奈川県平塚市千石河岸
 * 3. 开催期间: 2025年8月22日　 19:00～20:00（予定）　※雨天時は24日に延期
 * 4. 开催场所: 神奈川県平塚市　相模川河口（湘南潮来）
 * 5. 交通方式: ＪＲ東海道本線「平塚駅」南口から「須賀港行」のバス「終点」～徒歩5分、または圏央道「茅ヶ崎海岸IC」から車約5分、または小田原厚木道路「平塚IC」から車約20分
 * 6. 主办方: 湘南ひらつか花火大会実行委員会
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 湘南ひらつか花火大会実行委員会　0463-35-8107、当日のみ/自動音声開催案内電話　050-3665-9603
 * 9. 官方网站: https://www.city.hiratsuka.kanagawa.jp/kanko/page-c_01068.html
 * 10. 谷歌地图: 35.314991,139.364417
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750949570593",
  name: "湘南ひらつか花火大会（しょうなんひらつかはなびたいかい）",
  address: "〒254-0803　神奈川県平塚市千石河岸",
  datetime: "2025年8月22日　 19:00～20:00（予定）　※雨天時は24日に延期",
  venue: "神奈川県平塚市　相模川河口（湘南潮来）",
  access: "ＪＲ東海道本線「平塚駅」南口から「須賀港行」のバス「終点」～徒歩5分、または圏央道「茅ヶ崎海岸IC」から車約5分、または小田原厚木道路「平塚IC」から車約20分",
  organizer: "湘南ひらつか花火大会実行委員会",
  price: "有料観覧席あり",
  contact: "湘南ひらつか花火大会実行委員会　0463-35-8107、当日のみ/自動音声開催案内電話　050-3665-9603",
  website: "https://www.city.hiratsuka.kanagawa.jp/kanko/page-c_01068.html",
  googleMap: "https://maps.google.com/maps?q=35.314991,139.364417&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "湘南の夏を彩る風物詩として親しまれている「湘南ひらつか花火大会」が、相模川河口（湘南潮来）で開催されます。湘南の海を背景に、スターマインなど、約3000発の色とりどりの花火が打ち上げられ、夏の夜空に大輪の花を咲かせます。プログラムの後半には、音楽との調和が魅力的なミュージック花火の打ち上げが予定されており、迫力満点の花火を楽しめます。 ※平塚駅南口から有料臨時バス運行 打ち上げ数：3000発、昨年度3000発 観客数：8万5000人、昨年度8万5000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://yakei-fan.com/images/magazine/fireworks/pic_shonan-hiratsuka-hanabi2023082501.jpg",
      title: "湘南ひらつか花火大会（しょうなんひらつかはなびたいかい）图片1",
      alt: "湘南ひらつか花火大会（しょうなんひらつかはなびたいかい）图片1",
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