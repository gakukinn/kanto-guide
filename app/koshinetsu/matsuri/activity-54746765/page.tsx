import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750954746765
 * 生成时间: 2025/6/27 01:19:06
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 長野びんずる（ながのびんずる）
 * 2. 所在地: 〒380-0835　長野県長野市新田町ほか
 * 3. 开催期间: 2025年8月2日　 昼の部/10:30～16:30、夜の部/16:30～21:30
 * 4. 开催场所: 長野市　中央通り、昭和通り　ほか
 * 5. 交通方式: ＪＲ「長野駅」から徒歩5分
 * 6. 主办方: 長野びんずる実行委員会事務局
 * 7. 料金: 未设置
 * 8. 联系方式: 長野びんずる実行委員会事務局　026-217-8244
 * 9. 官方网站: https://binzuru.info/
 * 10. 谷歌地图: 36.649251,138.187121
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750954746765",
  name: "長野びんずる（ながのびんずる）",
  address: "〒380-0835　長野県長野市新田町ほか",
  datetime: "2025年8月2日　 昼の部/10:30～16:30、夜の部/16:30～21:30",
  venue: "長野市　中央通り、昭和通り　ほか",
  access: "ＪＲ「長野駅」から徒歩5分",
  organizer: "長野びんずる実行委員会事務局",
  price: "",
  contact: "長野びんずる実行委員会事務局　026-217-8244",
  website: "https://binzuru.info/",
  googleMap: "https://maps.google.com/maps?q=36.649251,138.187121&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "作为故乡的市民庆典，在长野的街道上固定下来的“长野邦祖”，今年也将盛大地举行。2025年，以“彩~难忘的夏天~”为口号，将举办以名产“宾祖舞蹈大赛”为首的各种活动，让长野的夏天热闹起来。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://nagano-binzuru.jp/2025/wp-content/uploads/2025/05/02.jpg",
      title: "長野びんずる（ながのびんずる）图片1",
      alt: "長野びんずる（ながのびんずる）图片1",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;