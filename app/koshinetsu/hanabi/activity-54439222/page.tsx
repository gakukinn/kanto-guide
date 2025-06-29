import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750954439222
 * 生成时间: 2025/6/27 01:13:59
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）
 * 2. 所在地: 〒405-0018　山梨県山梨市上神内川
 * 3. 开催期间: 2025年7月26日　 花火燃放/19:30～21:00（予定）　※小雨決行、荒天時は翌日に順延
 * 4. 开催场所: 山梨県山梨市　笛吹川万力大橋下流
 * 5. 交通方式: ＪＲ中央本線「山梨市駅」から徒歩3分
 * 6. 主办方: 笛吹川県下納涼花火大会山梨市実行委員会
 * 7. 料金: 无收费观览席
 * 8. 联系方式: 笛吹川県下納涼花火大会山梨市実行委員会　0553-22-1111
 * 9. 官方网站: https://www.city.yamanashi.yamanashi.jp/soshiki/17/
 * 10. 谷歌地图: 35.689679,138.682815
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750954439222",
  name: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）",
  address: "〒405-0018　山梨県山梨市上神内川",
  datetime: "2025年7月26日　 花火燃放/19:30～21:00（予定）　※小雨決行、荒天時は翌日に順延",
  venue: "山梨県山梨市　笛吹川万力大橋下流",
  access: "ＪＲ中央本線「山梨市駅」から徒歩3分",
  organizer: "笛吹川県下納涼花火大会山梨市実行委員会",
  price: "无收费观览席",
  contact: "笛吹川県下納涼花火大会山梨市実行委員会　0553-22-1111",
  website: "https://www.city.yamanashi.yamanashi.jp/soshiki/17/",
  googleMap: "https://maps.google.com/maps?q=35.689679,138.682815&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "这是在雨季的同时举行的烟花大会。2025年，作为“山梨市制施行20周年纪念事业”，将比往年增加约2000发，实施。4号球、早打、星光、大星光、制作烟火等，使夜空变得华丽，在富福井河清澈的溪流和万里林绿色的大自然的背景下施放的烟火吸引了观众的目光。由于发射地点和观赏地点很近，你可以感受到令人叹为观止的震撼力。* 发射次数：5000枚，去年3000枚，观众人数：25，000人，去年20，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/ead6b34a-80a2-4c3c-a48d-f2a4a02287d8/0_0.png",
      title: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）图片1",
      alt: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）图片1",
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
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;