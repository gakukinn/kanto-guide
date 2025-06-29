import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc9zsm3a0007vlg8qz2bsf26
 * 生成时间: 2025/6/24 22:02:52
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: ぎおん柏崎まつり（ぎおんかしわざきまつり）
 * 2. 所在地: 〒945-0066　新潟県柏崎市
 * 3. 开催期间: 2025年7月24日～26日　 【24日】民謡街頭流し/18:00～19:30　　【25日】たる仁和賀パレード/18:00～20:15　　【26日】海の大花火大会/19:30～21:10（雨天決行、荒天時は延期）　※当日の朝9:00に市ホームページで発表
 * 4. 开催场所: 新潟県柏崎市　東本町～西本町、みなとまち海浜公園、中央海岸一帯
 * 5. 交通方式: ＪＲ信越本線「柏崎駅」から徒歩15分
 * 6. 主办方: ぎおん柏崎まつり協賛会
 * 7. 料金: 花火大会/有料観覧席あり　※2025年の申し込みは終了
 * 8. 联系方式: ぎおん柏崎まつり協賛会（柏崎市産業振興部商業観光課内）　0257-21-2334
 * 9. 官方网站: https://www.city.kashiwazaki.lg.jp/kashiwazakihanabi/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.552954!3d37.369411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750770138563!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc9zsm3a0007vlg8qz2bsf26",
  name: "ぎおん柏崎まつり（ぎおんかしわざきまつり）",
    description: "",
  address: "〒945-0066　新潟県柏崎市",
  datetime: "2025年7月24日～26日　 【24日】民謡街頭流し/18:00～19:30　　【25日】たる仁和賀パレード/18:00～20:15　　【26日】海の大花火大会/19:30～21:10（雨天決行、荒天時は延期）　※当日の朝9:00に市ホームページで発表",
  venue: "新潟県柏崎市　東本町～西本町、みなとまち海浜公園、中央海岸一帯",
  access: "ＪＲ信越本線「柏崎駅」から徒歩15分",
  organizer: "ぎおん柏崎まつり協賛会",
  price: "花火大会/有料観覧席あり　※2025年の申し込みは終了",
  contact: "ぎおん柏崎まつり協賛会（柏崎市産業振興部商業観光課内）　0257-21-2334",
  website: "https://www.city.kashiwazaki.lg.jp/kashiwazakihanabi/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.552954!3d37.369411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750770138563!5m2!1sja!2sjp",
  region: "koshinetsu",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.nsu.ac.jp/sandaiworld/images/w03/detail.jpg",
      title: "ぎおん柏崎まつり（ぎおんかしわざきまつり）图片1",      alt: "ぎおん柏崎まつり（ぎおんかしわざきまつり）图片1",
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
  const regionKey = REGION_MAP["koshinetsu"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;