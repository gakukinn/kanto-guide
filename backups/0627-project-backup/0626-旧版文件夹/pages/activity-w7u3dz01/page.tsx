import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc7ojtqf000cvlagw7u3dz01
 * 生成时间: 2025/6/25 21:34:03
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 鴨川市民花火大会（かもがわしみんはなびたいかい）
 * 2. 所在地: 〒296-0002　千葉県鴨川市前原
 * 3. 开催期间: 2025年7月29日　 花火打ち上げ/19:30～20:00（予定）　※小雨決行、荒天の場合は翌日か翌々日に順延（状況により変更となる場合あり）
 * 4. 开催场所: 千葉県鴨川市　前原・横渚海岸
 * 5. 交通方式: ＪＲ外房線「安房鴨川駅」から徒歩5分
 * 6. 主办方: 鴨川市民花火大会実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 鴨川市観光協会　04-7092-0086
 * 9. 官方网站: http://www.chiba-kamogawa.jp
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.107426!3d35.10543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662802403!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ojtqf000cvlagw7u3dz01",
  name: "鴨川市民花火大会（かもがわしみんはなびたいかい）",
  address: "〒296-0002　千葉県鴨川市前原",
  datetime: "2025年7月29日　 花火打ち上げ/19:30～20:00（予定）　※小雨決行、荒天の場合は翌日か翌々日に順延（状況により変更となる場合あり）",
  venue: "千葉県鴨川市　前原・横渚海岸",
  access: "ＪＲ外房線「安房鴨川駅」から徒歩5分",
  organizer: "鴨川市民花火大会実行委員会",
  price: "有料観覧席なし",
  contact: "鴨川市観光協会　04-7092-0086",
  website: "http://www.chiba-kamogawa.jp",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.107426!3d35.10543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662802403!5m2!1sja!2sjp",
  region: "chiba",
  description: "鴨川の夏を子どもたちが楽しく過ごせるように、鴨川を自慢できる子どもが1人でも増えるようにと願いを込め、「鴨川市民花火大会」が開催されます。尺玉などの打ち上げ花火約3000発が鴨川の夜空を彩ります。「日本の渚100選」にも選ばれた前原・横渚海岸沿いのどこからでも花火を見ることができます。JR安房鴨川駅から徒歩5分と、アクセスも良好です。 ※打ち上げ数：3000発 観客数：3万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.gurutto-chiba.co.jp/wordpress/wp-content/uploads/2021/07/ba239f161676372563e6c96c751b1f45.jpg",
      title: "鴨川市民花火大会（かもがわしみんはなびたいかい）图片1",
      alt: "鴨川市民花火大会（かもがわしみんはなびたいかい）图片1",
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
  const regionKey = REGION_MAP["chiba"] || 'tokyo';

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