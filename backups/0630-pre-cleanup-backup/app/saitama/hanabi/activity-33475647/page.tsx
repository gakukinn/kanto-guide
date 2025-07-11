import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750933475647
 * 生成时间: 2025/6/26 19:24:35
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 越谷花火大会（こしがやはなびたいかい）
 * 2. 所在地: 〒343-0813　埼玉県越谷市越ヶ谷4丁目1-1
 * 3. 开催期间: 2025年7月26日　 19:00～21:00　※雨天中止
 * 4. 开催场所: 埼玉県越谷市　越谷市中央市民会館東側、葛西用水中土手
 * 5. 交通方式: 東武スカイツリーライン「越谷駅」步行8分
 * 6. 主办方: 一般社団法人越谷市観光協会
 * 7. 料金: 无收费观览席
 * 8. 联系方式: 一般社団法人越谷市観光協会　048-971-9002
 * 9. 官方网站: https://www.koshigaya-sightseeing.jp/
 * 10. 谷歌地图: 35.889863,139.791746
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750933475647",
  name: "越谷花火大会（こしがやはなびたいかい）",
  address: "〒343-0813　埼玉県越谷市越ヶ谷4丁目1-1",
  datetime: "2025年7月26日　 19:00～21:00　※雨天中止",
  venue: "埼玉県越谷市　越谷市中央市民会館東側、葛西用水中土手",
  access: "東武スカイツリーライン「越谷駅」步行8分",
  organizer: "一般社団法人越谷市観光協会",
  price: "无收费观览席",
  contact: "一般社団法人越谷市観光協会　048-971-9002",
  website: "https://www.koshigaya-sightseeing.jp/",
  googleMap: "https://maps.google.com/maps?q=35.889863,139.791746&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "以浮在水乡小屋上的烟火让许多人感动，并举办将梦想传递给周边地区的“越谷烟火大会”。以Star Mine为中心，将燃放2.5号球等约5000发多彩的烟火，无数的光华将夜空和水面涂上色彩。由于发射的高度较低，您可以欣赏到充满活力的烟花。我们推荐的观赏地点是开赛亲水绿道。※发射数：去年5000发观众数：去年27万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://hanabi-navi.info/wp-content/uploads/2025/04/1-scaled-1-e1745855212572.jpg",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;