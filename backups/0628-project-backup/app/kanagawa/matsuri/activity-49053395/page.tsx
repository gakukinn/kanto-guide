import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750949053395
 * 生成时间: 2025/6/26 23:44:13
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 川崎山王祭（かわさきさんのうさい）
 * 2. 所在地: 〒210-0004　神奈川県川崎市川崎区宮本町7-7
 * 3. 开催期间: 2025年8月1日～3日　 【1日】宵宮祭/18:00～　　【2日】例祭/10:00～、古式宮座式/14:00～　　【3日】神幸祭/6:00～20:00
 * 4. 开催场所: 神奈川県川崎市　稲毛神社
 * 5. 交通方式: ＪＲ京浜東北線「川崎駅」・京急「京急川崎駅」から徒歩8分
 * 6. 主办方: 川崎山王祭実行委員会、稲毛神社
 * 7. 料金: 未设置
 * 8. 联系方式: 稲毛神社　044-222-4554
 * 9. 官方网站: https://www.takemikatsuchi.net/
 * 10. 谷歌地图: 35.531019,139.704662
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750949053395",
  name: "川崎山王祭（かわさきさんのうさい）",
  address: "〒210-0004　神奈川県川崎市川崎区宮本町7-7",
  datetime: "2025年8月1日～3日　 【1日】宵宮祭/18:00～　　【2日】例祭/10:00～、古式宮座式/14:00～　　【3日】神幸祭/6:00～20:00",
  venue: "神奈川県川崎市　稲毛神社",
  access: "ＪＲ京浜東北線「川崎駅」・京急「京急川崎駅」から徒歩8分",
  organizer: "川崎山王祭実行委員会、稲毛神社",
  price: "",
  contact: "稲毛神社　044-222-4554",
  website: "https://www.takemikatsuchi.net/",
  googleMap: "https://maps.google.com/maps?q=35.531019,139.704662&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "川崎の守り神、稲毛神社の山王祭が開催されます。例祭では、中世神社の制度を現代に伝え、古来口伝の方法で調理した料理を、神に供える古式宮座式（県指定民俗文化財）が執り行われるほか、町内みこし連合渡御や、大みこし巡幸が行われます。最終日には、多くの市民に見守られるなか、“孔雀”、“玉”と呼ばれる2基の神社大みこしが、「男女ニ柱の神の結婚」、「御子神の誕生」の物語が隠された道のりを巡り、神社へと還る宮入の行列が行われます。境内では、神楽、奉納演芸が催され、立ち並ぶ露店とともに、賑やかに祭りを盛り上げます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanaloco.jp/archives/newsxml/2015/08/8f2d6936cfbe63ce9ba13f731899e155.jpg",
      title: "川崎山王祭（かわさきさんのうさい）图片1",
      alt: "川崎山王祭（かわさきさんのうさい）图片1",
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
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;