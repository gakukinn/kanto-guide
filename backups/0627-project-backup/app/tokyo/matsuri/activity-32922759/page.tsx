import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750932922759
 * 生成时间: 2025/6/26 19:15:22
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第28回新橋こいち祭（しんばしこいちまつり）
 * 2. 所在地: 〒105-0004　東京都港区新橋
 * 3. 开催期间: 2025年7月24日～25日　 盆踊り・ステージ・縁日・出店など/15:00～20:30（各会場により内容が異なる）、ビアガーデン/17:00～20:30（ニュー新橋ビル4階テラス）
 * 4. 开催场所: 東京都　JR新橋駅前SL広場、桜田公園、烏森通り、柳通り、ニュー新橋ビル周辺
 * 5. 交通方式: ＪＲ山手線「新橋駅」下車
 * 6. 主办方: 新橋地区商店会
 * 7. 料金: 未设置
 * 8. 联系方式: 新橋こいち祭事務局　03-5537-6115
 * 9. 官方网站: http://www.shinbashi.net/top/koichi/2025/
 * 10. 谷歌地图: 35.667108,139.757624
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750932922759",
  name: "第28回新橋こいち祭（しんばしこいちまつり）",
  address: "〒105-0004　東京都港区新橋",
  datetime: "2025年7月24日～25日　 盆踊り・ステージ・縁日・出店など/15:00～20:30（各会場により内容が異なる）、ビアガーデン/17:00～20:30（ニュー新橋ビル4階テラス）",
  venue: "東京都　JR新橋駅前SL広場、桜田公園、烏森通り、柳通り、ニュー新橋ビル周辺",
  access: "ＪＲ山手線「新橋駅」下車",
  organizer: "新橋地区商店会",
  price: "",
  contact: "新橋こいち祭事務局　03-5537-6115",
  website: "http://www.shinbashi.net/top/koichi/2025/",
  googleMap: "https://maps.google.com/maps?q=35.667108,139.757624&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "新橋地区の有志により始められた「新橋こいち祭」が、JR新橋駅前SL広場をはじめ、桜田公園などで開催されます。桜田公園で盆踊りや「ゆかた美人コンテスト」が行われるほか、烏森通りで縁日などが催されます。会場周辺には屋台も多数出店し、2日間にわたり大勢の人で賑わいます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://rstatic.enjoytokyo.jp/assets/images/event/79/631780/img_1.jpg?1748582772&p=t&w=1800",
      title: "第28回新橋こいち祭（しんばしこいちまつり）图片1",
      alt: "第28回新橋こいち祭（しんばしこいちまつり）图片1",
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
  const regionKey = REGION_MAP["tokyo"] || 'tokyo';

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