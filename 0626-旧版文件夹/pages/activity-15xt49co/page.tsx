import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc7ovolp000evl9c15xt49co
 * 生成时间: 2025/6/24 23:33:11
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 川崎山王祭（かわさきさんのうさい）
 * 2. 所在地: 〒210-0004　神奈川県川崎市川崎区宮本町7-7
 * 3. 开催期间: 2025年8月1日～3日　 【1日】宵宮祭/18:00～　　【2日】例祭/10:00～、古式宮座式/14:00～　　【3日】神幸祭/6:00～20:00
 * 4. 开催场所: 神奈川県川崎市　稲毛神社
 * 5. 交通方式: ＪＲ京浜東北線「川崎駅」・京急「京急川崎駅」から徒歩8分
 * 6. 主办方: 川崎山王祭実行委員会、稲毛神社
 * 7. 料金: 未设置
 * 8. 联系方式: 稲毛神社　044-222-4554
 * 9. 官方网站: https://www.takemikatsuchi.net/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.704662!3d35.531019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684910752!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ovolp000evl9c15xt49co",
  name: "川崎山王祭（かわさきさんのうさい）",
    description: "",
  address: "〒210-0004　神奈川県川崎市川崎区宮本町7-7",
  datetime: "2025年8月1日～3日　 【1日】宵宮祭/18:00～　　【2日】例祭/10:00～、古式宮座式/14:00～　　【3日】神幸祭/6:00～20:00",
  venue: "神奈川県川崎市　稲毛神社",
  access: "ＪＲ京浜東北線「川崎駅」・京急「京急川崎駅」から徒歩8分",
  organizer: "川崎山王祭実行委員会、稲毛神社",
  price: "",
  contact: "稲毛神社　044-222-4554",
  website: "https://www.takemikatsuchi.net/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.704662!3d35.531019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684910752!5m2!1sja!2sjp",
  region: "kanagawa",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanaloco.jp/archives/newsxml/2015/08/8f2d6936cfbe63ce9ba13f731899e155.jpg",
      title: "川崎山王祭（かわさきさんのうさい）图片1",      alt: "川崎山王祭（かわさきさんのうさい）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;