import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花见会详情页面
 * 数据库ID: recognition-hanami-1750934729000
 * 生成时间: 2025/6/26 19:45:29
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）
 * 2. 所在地: 〒401-0305　山梨県富士河口湖町大石2585
 * 3. 开催期间: 2025年6月21日～7月21日　 9:00～17:00
 * 4. 开催场所: 山梨県富士河口湖町　河口湖畔　大石公園
 * 5. 交通方式: 富士急行「河口湖駅」から河口湖周遊バス約30分「河口湖自然生活館」下車
 * 6. 主办方: 河口湖ハーブフェスティバル実行委員会
 * 7. 料金: 無料
 * 8. 联系方式: 河口湖ハーブフェスティバル実行委員会（富士河口湖町観光課内）　0555-72-3168
 * 9. 官方网站: https://fujisan.ne.jp/pages/380/
 * 10. 谷歌地图: 35.523073,138.745577
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanami-1750934729000",
  name: "河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）",
  address: "〒401-0305　山梨県富士河口湖町大石2585",
  datetime: "2025年6月21日～7月21日　 9:00～17:00",
  venue: "山梨県富士河口湖町　河口湖畔　大石公園",
  access: "富士急行「河口湖駅」から河口湖周遊バス約30分「河口湖自然生活館」下車",
  organizer: "河口湖ハーブフェスティバル実行委員会",
  price: "無料",
  contact: "河口湖ハーブフェスティバル実行委員会（富士河口湖町観光課内）　0555-72-3168",
  website: "https://fujisan.ne.jp/pages/380/",
  googleMap: "https://maps.google.com/maps?q=35.523073,138.745577&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "世界遺産富士山をバックに、河口湖畔にラベンダーが咲く季節に、「河口湖ハーブフェスティバル」が開催されます。大石公園から望む富士山と河口湖、紫のじゅうたんを敷き詰めたかのような一面のラベンダーは、美しいコントラストを醸し、SNS映えする写真撮影を楽しむ人々で賑わいます。八木崎公園でもラベンダーを観賞することができます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://fujisan.ne.jp/files/libs/3275/pw/202104231402098581.jpg?1619154132",
      title: "河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）图片1",
      alt: "河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）图片1",
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
        activityKey="hanami"
      />
    </div>
  );
};

export default DetailPage;