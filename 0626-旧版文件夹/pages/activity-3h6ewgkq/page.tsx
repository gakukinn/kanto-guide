import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc8n5zfr0007vlhs3h6ewgkq
 * 生成时间: 2025/6/25 23:40:45
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 第28回新橋こいち祭（しんばしこいちまつり）
 * 2. 所在地: 〒105-0004　東京都港区新橋
 * 3. 开催期间: 2025年7月24日～25日　 盆踊り・ステージ・縁日・出店など/15:00～20:30（各会場により内容が異なる）、ビアガーデン/17:00～20:30（ニュー新橋ビル4階テラス）
 * 4. 开催场所: 開催期間	2025年7月24日～25日　 盆踊り・ステージ・縁日・出店など/15:00～20:30（各会場により内容が異なる）、ビアガーデン/17:00～20:30（ニュー新橋ビル4階テラス）
 * 5. 交通方式: ＪＲ山手線「新橋駅」下車
 * 6. 主办方: 新橋地区商店会
 * 7. 料金: 未设置
 * 8. 联系方式: 新橋こいち祭事務局　03-5537-6115
 * 9. 官方网站: http://www.shinbashi.net/top/koichi/2025/
 * 10. 谷歌地图: https://maps.google.com/maps?q=35.667108,139.757624&z=15&output=embed
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc8n5zfr0007vlhs3h6ewgkq",
  name: "第28回新橋こいち祭（しんばしこいちまつり）",
  address: "〒105-0004　東京都港区新橋",
  datetime: "2025年7月24日～25日　 盆踊り・ステージ・縁日・出店など/15:00～20:30（各会場により内容が異なる）、ビアガーデン/17:00～20:30（ニュー新橋ビル4階テラス）",
  venue: "開催期間\t2025年7月24日～25日　 盆踊り・ステージ・縁日・出店など/15:00～20:30（各会場により内容が異なる）、ビアガーデン/17:00～20:30（ニュー新橋ビル4階テラス）",
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
      url: "http://iza-machi.com/wp-content/uploads/2024/07/%E6%A1%9C%E7%94%B0%E4%BC%9A%E5%A0%B4%EF%BC%8F%E7%9B%86%E8%B8%8A%E3%82%8A.jpg",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;