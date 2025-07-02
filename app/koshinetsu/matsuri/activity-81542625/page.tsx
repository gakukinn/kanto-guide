import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1751381542625
 * 生成时间: 2025/7/1 23:52:22
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 南部の火祭り（なんぶのひまつり）
 * 2. 所在地: 〒409-2212　山梨県南部町南部地内
 * 3. 开催期间: 2025年8月15日　 20:10～
 * 4. 开催场所: 山梨県南部町　富士川河川敷南部橋上下流
 * 5. 交通方式: ＪＲ身延線「内船駅」から徒歩20分、または中部横断自動車道「富沢IC」から車約10分
 * 6. 主办方: 南部町火祭り実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 南部町火祭り実行委員会　0556-66-2111
 * 9. 官方网站: https://www.town.nanbu.yamanashi.jp/kankou/omatsuri/himatsuri/
 * 10. 谷歌地图: 35.285583,138.457869
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1751381542625",
  name: "南部の火祭り（なんぶのひまつり）",
  address: "〒409-2212　山梨県南部町南部地内",
  datetime: "2025年8月15日　 20:10～",
  venue: "山梨県南部町　富士川河川敷南部橋上下流",
  access: "从JR身延线“内船站”步行约20分钟，或从中部横断自动车道“富泽IC”驾车约10分钟可达。",
  organizer: "南部町火祭り実行委員会",
  price: "有料観覧席なし",
  contact: "南部町火祭り実行委員会　0556-66-2111",
  website: "https://www.town.nanbu.yamanashi.jp/kankou/omatsuri/himatsuri/",
  googleMap: "https://maps.google.com/maps?q=35.285583,138.457869&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "在富士川河川敷南部桥上下游，将举办起源于江户时代中期的“南部火祭”。此祭典寓意着盂兰盆节的“送魂火”和“送虫火”。活动包括以星型花束和尺玉为看点的烟火大会、伴随诵经声燃起的大火炬、灯笼流放等，此外沿两岸2公里排列的108堆柴火“百八炬”被点燃，营造出幽玄的氛围。※发射数量：3000发（去年3000发）观众人数：3万人（去年3万人）。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://japan47go.g.kuroco-img.app/v=1688492435/files/topics/162339_ext_30_0.jpg?width=2048&quality=70",
      title: "南部の火祭り（なんぶのひまつり）图片1",
      alt: "南部の火祭り（なんぶのひまつり）图片1",
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