import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750949980422
 * 生成时间: 2025/6/26 23:59:40
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 水戸黄門祭典　水戸偕楽園花火大会（みとこうもん祭典　みとかいらくえんはなびたいかい）
 * 2. 所在地: 〒310-0851　茨城県水戸市千波町
 * 3. 开催期间: 2025年7月26日　 打燃放げ/19:30～20:30　※恶劣天气时翌日に順延
 * 4. 开催场所: 水戸市　千波湖畔
 * 5. 交通方式: ＪＲ「水戸駅」步行15分、或常磐自動車道「水戸IC」驾车约20分
 * 6. 主办方: 水戸黄門祭典実行委員会
 * 7. 料金: 有料観覧席有　※詳しくは官网で要確認
 * 8. 联系方式: 水戸市観光課　029-232-9189、水戸観光コンベンション協会　029-224-0441
 * 9. 官方网站: https://mitokoumon.com/event/summer/mitokairakuenhanabi/
 * 10. 谷歌地图: 36.371896,140.460808
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750949980422",
  name: "水戸黄門祭典　水戸偕楽園花火大会（みとこうもん祭典　みとかいらくえんはなびたいかい）",
  address: "〒310-0851　茨城県水戸市千波町",
  datetime: "2025年7月26日　 打燃放げ/19:30～20:30　※恶劣天气时翌日に順延",
  venue: "水戸市　千波湖畔",
  access: "ＪＲ「水戸駅」步行15分、或常磐自動車道「水戸IC」驾车约20分",
  organizer: "水戸黄門祭典実行委員会",
  price: "有料観覧席有　※詳しくは官网で要確認",
  contact: "水戸市観光課　029-232-9189、水戸観光コンベンション協会　029-224-0441",
  website: "https://mitokoumon.com/event/summer/mitokairakuenhanabi/",
  googleMap: "https://maps.google.com/maps?q=36.371896,140.460808&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "为夏季水户夜空上色的“水户凯乐园花火大会”，在千波湖畔举行。连续花火、音乐连续花火、尺玉、创作烟火等，内阁总理大臣奖最多获奖的野村烟火工业制作的约5000发烟火被施放，千波湖面被美丽地照亮。我们推荐您从千波湖北园路观赏。※发射数量：去年5000发观众数：去年23万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/5dc66e40-2206-41b9-9550-0dcbfd33e650/0_3.png",
      title: "水戸黄門祭典　水戸偕楽園花火大会（みとこうもん祭典　みとかいらくえんはなびたいかい）图片1",
      alt: "水戸黄門祭典　水戸偕楽園花火大会（みとこうもん祭典　みとかいらくえんはなびたいかい）图片1",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;