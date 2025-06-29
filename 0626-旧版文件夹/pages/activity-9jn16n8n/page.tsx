import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc96iv0p000vvlr09jn16n8n
 * 生成时间: 2025/6/25 00:13:07
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 長野びんずる（ながのびんずる）
 * 2. 所在地: 〒380-0835　長野県長野市新田町ほか
 * 3. 开催期间: 2025年8月2日　 昼の部/10:30～16:30、夜の部/16:30～21:30
 * 4. 开催场所: 長野市　中央通り、昭和通り　ほか
 * 5. 交通方式: ＪＲ「長野駅」から徒歩5分
 * 6. 主办方: 長野びんずる実行委員会事務局
 * 7. 料金: 未设置
 * 8. 联系方式: 長野びんずる実行委員会事務局　026-217-8244
 * 9. 官方网站: https://binzuru.info/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.187121!3d36.649251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688111523!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96iv0p000vvlr09jn16n8n",
  name: "長野びんずる（ながのびんずる）",
    description: "",
  address: "〒380-0835　長野県長野市新田町ほか",
  datetime: "2025年8月2日　 昼の部/10:30～16:30、夜の部/16:30～21:30",
  venue: "長野市　中央通り、昭和通り　ほか",
  access: "ＪＲ「長野駅」から徒歩5分",
  organizer: "長野びんずる実行委員会事務局",
  price: "",
  contact: "長野びんずる実行委員会事務局　026-217-8244",
  website: "https://binzuru.info/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.187121!3d36.649251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688111523!5m2!1sja!2sjp",
  region: "koshinetsu",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://nagano-binzuru.jp/2025/wp-content/uploads/2025/05/02.jpg",
      title: "長野びんずる（ながのびんずる）图片1",      alt: "長野びんずる（ながのびんずる）图片1",
      caption: ""
    },
    {
      type: "image" as const,
      url: "https://nagano-binzuru.jp/2025/wp-content/uploads/2025/05/03.jpg",
      title: "長野びんずる（ながのびんずる）图片2",      alt: "長野びんずる（ながのびんずる）图片2",
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