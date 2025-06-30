import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750946880972
 * 生成时间: 2025/6/26 23:08:00
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）
 * 2. 所在地: 〒360-0162　埼玉県熊谷市
 * 3. 开催期间: 2025年8月9日　 19:00～21:00（変更となる場合有）　※荒天の場合は10日、16日、17日の順延期
 * 4. 开催场所: 埼玉県熊谷市　荒川河川敷（荒川大橋下流）
 * 5. 交通方式: ＪＲ高崎線「熊谷駅」南口步行5分
 * 6. 主办方: 一般社団法人熊谷市観光協会
 * 7. 料金: 有料観覧席有
 * 8. 联系方式: 一般社団法人熊谷市観光協会　048-594-6677
 * 9. 官方网站: https://www.oideyo-熊谷.com/
 * 10. 谷歌地图: 36.136385,139.380707
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750946880972",
  name: "熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）",
  address: "〒360-0162　埼玉県熊谷市",
  datetime: "2025年8月9日　 19:00～21:00（変更となる場合有）　※荒天の場合は10日、16日、17日の順延期",
  venue: "埼玉県熊谷市　荒川河川敷（荒川大橋下流）",
  access: "ＪＲ高崎線「熊谷駅」南口步行5分",
  organizer: "一般社団法人熊谷市観光協会",
  price: "有料観覧席有",
  contact: "一般社団法人熊谷市観光協会　048-594-6677",
  website: "https://www.oideyo-熊谷.com/",
  googleMap: "https://maps.google.com/maps?q=36.136385,139.380707&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "在熊谷的荒川河边举行了一年一度的烟花节，其中包括尺玉和连续花火等烟花，照亮了夜空。昭和23年（1948年），为了从战灾中恢复，以“大熊谷复兴烟火大会”的形式开始举办，在县内也作为历史悠久的烟火大会而知名。尺玉等约1万发被发射，信息烟花和复数的赞助者的“斯库玛姆! 大型连续花火”等也是看点。※发射数：去年1万发观众数：去年42万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "http://sai2.info/wp-content/uploads/2025/05/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2025-05-03-22.49.21.png",
      title: "熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）图片1",
      alt: "熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）图片1",
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