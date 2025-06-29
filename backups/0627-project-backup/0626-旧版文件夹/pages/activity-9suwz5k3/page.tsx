import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc7o9nq9000gvlcw9suwz5k3
 * 生成时间: 2025/6/25 22:44:53
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）
 * 2. 所在地: 〒360-0162　埼玉県熊谷市
 * 3. 开催期间: 2025年8月9日　 19:00～21:00（変更となる場合あり）　※荒天の場合は10日、16日、17日の順に延期
 * 4. 开催场所: 埼玉県熊谷市　荒川河川敷（荒川大橋下流）
 * 5. 交通方式: ＪＲ高崎線「熊谷駅」南口から徒歩5分
 * 6. 主办方: 一般社団法人熊谷市観光協会
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 一般社団法人熊谷市観光協会　048-594-6677
 * 9. 官方网站: https://www.oideyo-kumagaya.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.380707!3d36.136385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662218011!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7o9nq9000gvlcw9suwz5k3",
  name: "熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）",
  address: "〒360-0162　埼玉県熊谷市",
  datetime: "2025年8月9日　 19:00～21:00（変更となる場合あり）　※荒天の場合は10日、16日、17日の順に延期",
  venue: "埼玉県熊谷市　荒川河川敷（荒川大橋下流）",
  access: "ＪＲ高崎線「熊谷駅」南口から徒歩5分",
  organizer: "一般社団法人熊谷市観光協会",
  price: "有料観覧席あり",
  contact: "一般社団法人熊谷市観光協会　048-594-6677",
  website: "https://www.oideyo-kumagaya.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.380707!3d36.136385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662218011!5m2!1sja!2sjp",
  region: "saitama",
  description: "“関東一の祇園”と称される「熊谷うちわ祭」が、3日間にわたり開催されます。渡御祭にはじまり、2日目には絢爛豪華な12台の山車と屋台が、熊谷囃子とともに市街地を巡行します。祭の最大の見せ場である「叩き合い」では、各町区の山車と屋台が各所に集結し、熊谷の夜に勇壮な囃子を響かせます。最終日にお祭り広場で繰り広げられる「叩き合い」は祭りのクライマックスで、その迫力は訪れた人々を魅了します。",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;