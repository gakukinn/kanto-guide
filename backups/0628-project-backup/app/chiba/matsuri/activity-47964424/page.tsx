import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947964424
 * 生成时间: 2025/6/26 23:26:04
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 柏まつり（かしわまつり）
 * 2. 所在地: 〒277-0005　千葉県柏市柏
 * 3. 开催期间: 2025年7月26日～27日　 15:00～21:00
 * 4. 开催场所: 千葉県柏市　柏駅東西中心街
 * 5. 交通方式: ＪＲ常磐線「柏駅」下車
 * 6. 主办方: 柏まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 柏まつり実行委員会（柏商工会議所内）　04-7162-3315
 * 9. 官方网站: https://www.kashiwa-cci.or.jp/other-organizations/kashiwamaturi
 * 10. 谷歌地图: 35.862268,139.971588
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947964424",
  name: "柏まつり（かしわまつり）",
  address: "〒277-0005　千葉県柏市柏",
  datetime: "2025年7月26日～27日　 15:00～21:00",
  venue: "千葉県柏市　柏駅東西中心街",
  access: "ＪＲ常磐線「柏駅」下車",
  organizer: "柏まつり実行委員会",
  price: "",
  contact: "柏まつり実行委員会（柏商工会議所内）　04-7162-3315",
  website: "https://www.kashiwa-cci.or.jp/other-organizations/kashiwamaturi",
  googleMap: "https://maps.google.com/maps?q=35.862268,139.971588&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "夏の柏市の一大イベント「柏まつり」が、柏駅東西中心街で華々しく開催されます。東口駅前ステージ、西口駅前広場でそれぞれ行われるオープニングセレモニーを皮切りに、オープニングパレード、ステージイベントなどが繰り広げられます。4基のみこしが練り歩く、みこしパレードも必見です。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://image.omatsurijapan.com/articleimg/2022/01/34b9a64a-img_7661_original-1200x900.jpg",
      title: "柏まつり（かしわまつり）图片1",
      alt: "柏まつり（かしわまつり）图片1",
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
  const regionKey = REGION_MAP["chiba"] || 'tokyo';

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