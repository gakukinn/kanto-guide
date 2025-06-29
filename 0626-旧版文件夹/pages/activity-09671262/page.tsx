import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: recognition-hanabi-1750909925694
 * 生成时间: 2025/6/26 12:52:05
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 越谷花火大会（こしがやはなびたいかい）
 * 2. 所在地: 〒343-0813　埼玉県越谷市越ヶ谷4丁目1-1
 * 3. 开催期间: 2025年7月26日　 19:00～21:00　※雨天中止
 * 4. 开催场所: 埼玉県越谷市　越谷市中央市民会館東側、葛西用水中土手
 * 5. 交通方式: 東武スカイツリーライン「越谷駅」から徒歩8分
 * 6. 主办方: 一般社団法人越谷市観光協会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 一般社団法人越谷市観光協会　048-971-9002
 * 9. 官方网站: https://www.koshigaya-sightseeing.jp/
 * 10. 谷歌地图: 35.889863,139.791746
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750909925694",
  name: "越谷花火大会（こしがやはなびたいかい）",
  address: "〒343-0813　埼玉県越谷市越ヶ谷4丁目1-1",
  datetime: "2025年7月26日　 19:00～21:00　※雨天中止",
  venue: "埼玉県越谷市　越谷市中央市民会館東側、葛西用水中土手",
  access: "東武スカイツリーライン「越谷駅」から徒歩8分",
  organizer: "一般社団法人越谷市観光協会",
  price: "有料観覧席なし",
  contact: "一般社団法人越谷市観光協会　048-971-9002",
  website: "https://www.koshigaya-sightseeing.jp/",
  googleMap: "https://maps.google.com/maps?q=35.889863,139.791746&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "水郷こしがやに浮かぶ花火で多くの人に感動を与え、周辺地域に夢を届ける「越谷花火大会」が開催されます。スターマインを中心に2.5号玉など、色とりどりの約5000発の花火が打ち上げられ、無数の光の華が夜空と水面を彩ります。打ち上げの高度が低いため、ダイナミックで迫力ある花火が楽しめます。おすすめの観覧場所は、葛西親水緑道です。 ※打ち上げ数：昨年度5000発 観客数：昨年度27万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://koshigaya.goguynet.jp/wp-content/uploads/sites/48/2023/07/27026476_m.jpg",
      title: "越谷花火大会（こしがやはなびたいかい）图片1",
      alt: "越谷花火大会（こしがやはなびたいかい）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;