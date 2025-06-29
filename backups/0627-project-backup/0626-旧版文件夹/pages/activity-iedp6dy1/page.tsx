import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc962osd0001vlr0iedp6dy1
 * 生成时间: 2025/6/25 22:19:53
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 水戸黄門まつり　水戸偕楽園花火大会（みとこうもんまつり　みとかいらくえんはなびたいかい）
 * 2. 所在地: 〒310-0851　茨城県水戸市千波町
 * 3. 开催期间: 2025年7月26日　 打ち上げ/19:30～20:30　※荒天時は翌日に順延
 * 4. 开催场所: 水戸市　千波湖畔
 * 5. 交通方式: ＪＲ「水戸駅」から徒歩15分、または常磐自動車道「水戸IC」から車約20分
 * 6. 主办方: 水戸黄門まつり実行委員会
 * 7. 料金: 有料観覧席あり　※詳しくはホームページで要確認
 * 8. 联系方式: 水戸市観光課　029-232-9189、水戸観光コンベンション協会　029-224-0441
 * 9. 官方网站: https://mitokoumon.com/event/summer/mitokairakuenhanabi/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.460808!3d36.371896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750769014477!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc962osd0001vlr0iedp6dy1",
  name: "水戸黄門まつり　水戸偕楽園花火大会（みとこうもんまつり　みとかいらくえんはなびたいかい）",
  address: "〒310-0851　茨城県水戸市千波町",
  datetime: "2025年7月26日　 打ち上げ/19:30～20:30　※荒天時は翌日に順延",
  venue: "水戸市　千波湖畔",
  access: "ＪＲ「水戸駅」から徒歩15分、または常磐自動車道「水戸IC」から車約20分",
  organizer: "水戸黄門まつり実行委員会",
  price: "有料観覧席あり　※詳しくはホームページで要確認",
  contact: "水戸市観光課　029-232-9189、水戸観光コンベンション協会　029-224-0441",
  website: "https://mitokoumon.com/event/summer/mitokairakuenhanabi/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.460808!3d36.371896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750769014477!5m2!1sja!2sjp",
  region: "kitakanto",
  description: "夏の水戸の夜空を彩る「水戸偕楽園花火大会」が、千波湖畔で開催されます。スターマインやミュージックスターマイン、尺玉、創作花火など、内閣総理大臣賞最多受賞の野村花火工業プロデュースによる趣向を凝らした約5000発の花火が打ち上げられ、千波湖面が美しく照らされます。千波湖の北側園路からの観覧がおすすめです。 ※打ち上げ数：昨年度5000発 観客数：昨年度23万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://yakei-fan.com/images/magazine/fireworks/pic_mito-hanabi202301.jpg",
      title: "水戸黄門まつり　水戸偕楽園花火大会（みとこうもんまつり　みとかいらくえんはなびたいかい）图片1",
      alt: "水戸黄門まつり　水戸偕楽園花火大会（みとこうもんまつり　みとかいらくえんはなびたいかい）图片1",
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