import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc7o9npm0006vlcwyv9s596j
 * 生成时间: 2025/6/24 23:23:01
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 熊谷うちわ祭（くまがやうちわまつり）
 * 2. 所在地: 〒360-0046　埼玉県熊谷市
 * 3. 开催期间: 2025年7月20日～22日　 ※開催日により異なる
 * 4. 开催场所: 埼玉県熊谷市　お祭り広場　ほか
 * 5. 交通方式: ＪＲ高崎線・秩父鉄道「熊谷駅」から徒歩10分
 * 6. 主办方: うちわ祭年番町（第弐本町区）
 * 7. 料金: 未设置
 * 8. 联系方式: 一般社団法人熊谷市観光協会　kumagaya.uchiwamatsuri@gmail.com
 * 9. 官方网站: http://uchiwamatsuri.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.381317!3d36.143508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662025066!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7o9npm0006vlcwyv9s596j",
  name: "熊谷うちわ祭（くまがやうちわまつり）",
    description: "",
  address: "〒360-0046　埼玉県熊谷市",
  datetime: "2025年7月20日～22日　 ※開催日により異なる",
  venue: "埼玉県熊谷市　お祭り広場　ほか",
  access: "ＪＲ高崎線・秩父鉄道「熊谷駅」から徒歩10分",
  organizer: "うちわ祭年番町（第弐本町区）",
  price: "",
  contact: "一般社団法人熊谷市観光協会　kumagaya.uchiwamatsuri@gmail.com",
  website: "http://uchiwamatsuri.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.381317!3d36.143508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662025066!5m2!1sja!2sjp",
  region: "saitama",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://image.omatsurijapan.com/articleimg/2022/07/3825dd8f-img_1009-1200x800.jpg",
      title: "熊谷うちわ祭（くまがやうちわまつり）图片1",      alt: "熊谷うちわ祭（くまがやうちわまつり）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;