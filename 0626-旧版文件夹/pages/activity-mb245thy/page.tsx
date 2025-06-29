import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc968kfy000fvlr0mb245thy
 * 生成时间: 2025/6/25 22:22:37
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 第73回小山の花火（おやまのはなび）
 * 2. 所在地: 〒323-0023　栃木県小山市中央町
 * 3. 开催期间: 2025年9月23日　 18:30～
 * 4. 开催场所: 栃木県小山市　観晃橋下流思川河畔
 * 5. 交通方式: JR東北本線「小山駅」から徒歩8分、または東北自動車道「佐野藤岡IC」から車約35分
 * 6. 主办方: 小山の花火実行委員会
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 小山の花火実行委員会事務局（小山市観光協会内）　0285-30-4772
 * 9. 官方网站: https://oyamanohanabi.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.797058!3d36.315458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687667915!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc968kfy000fvlr0mb245thy",
  name: "第73回小山の花火（おやまのはなび）",
  address: "〒323-0023　栃木県小山市中央町",
  datetime: "2025年9月23日　 18:30～",
  venue: "栃木県小山市　観晃橋下流思川河畔",
  access: "JR東北本線「小山駅」から徒歩8分、または東北自動車道「佐野藤岡IC」から車約35分",
  organizer: "小山の花火実行委員会",
  price: "有料観覧席あり",
  contact: "小山の花火実行委員会事務局（小山市観光協会内）　0285-30-4772",
  website: "https://oyamanohanabi.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.797058!3d36.315458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687667915!5m2!1sja!2sjp",
  region: "kitakanto",
  description: "小山市の夜空を美しく彩る「小山の花火」が、73回目を迎え開催されます。2025年は夏の時期を避け、9月に変更して行われます。市役所西側の観晃橋下流思川河畔で、スターマインを中心に、尺玉連発やワイドスターマイン、市民花火、ナイアガラ瀑布など、多種多様な花火が打ち上げられ、小山の夜空に大輪の華を咲かせます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750857754310_xinrumingyue_Japanese_fireworks_festival_realistic_photograph_c077aadc-48e0-4c3c-8208-c8fad4f87b1c_1_compressed.jpg",
      title: "第73回小山の花火（おやまのはなび）图片1",
      alt: "第73回小山の花火（おやまのはなび）图片1",
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
  const regionKey = REGION_MAP["kitakanto"] || 'tokyo';

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