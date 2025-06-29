import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花见会详情页面
 * 数据库ID: recognition-hanami-1750934114046
 * 生成时间: 2025/6/26 19:35:14
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第51回水戸のあじさいまつり（みとのあじさいまつり）
 * 2. 所在地: 〒310-0052　茨城県水戸市松本町13-19
 * 3. 开催期间: 2025年6月7日～29日　 ※イベントにより異なる
 * 4. 开催场所: 水戸市　保和苑及び周辺史跡
 * 5. 交通方式: ＪＲ「水戸駅」北口7番乗り場から「栄町経由茨大・渡里行」の茨城交通バス約15分「保和苑入口」～徒歩4分、または常磐自動車道「水戸IC」から国道50号大工町交差点経由車約20分
 * 6. 主办方: 水戸のあじさいまつり実行委員会
 * 7. 料金: 無料
 * 8. 联系方式: 事務局（水戸市産業経済部観光課）　029-224-1111　（代表）
 * 9. 官方网站: https://www.city.mito.lg.jp/site/kankouinfo/94415.html
 * 10. 谷歌地图: 36.391576,140.455102
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanami-1750934114046",
  name: "第51回水戸のあじさいまつり（みとのあじさいまつり）",
  address: "〒310-0052　茨城県水戸市松本町13-19",
  datetime: "2025年6月7日～29日　 ※イベントにより異なる",
  venue: "水戸市　保和苑及び周辺史跡",
  access: "ＪＲ「水戸駅」北口7番乗り場から「栄町経由茨大・渡里行」の茨城交通バス約15分「保和苑入口」～徒歩4分、または常磐自動車道「水戸IC」から国道50号大工町交差点経由車約20分",
  organizer: "水戸のあじさいまつり実行委員会",
  price: "無料",
  contact: "事務局（水戸市産業経済部観光課）　029-224-1111　（代表）",
  website: "https://www.city.mito.lg.jp/site/kankouinfo/94415.html",
  googleMap: "https://maps.google.com/maps?q=36.391576,140.455102&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "保和苑のあじさいの見頃に合わせ、「水戸のあじさいまつり」が開催されます。水戸市街北西部の保和苑を中心とした「水戸のロマンチックゾーン」を会場に、さまざまな催しが行われます。日本式庭園の保和苑内（1.5ha）では、青や白色の西洋アジサイやガクアジサイなど、約100品種6000株が色鮮やかに咲き誇り、来苑者を出迎えます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://mitokoumon.com/img/slide/ajisai2025.jpg",
      title: "第51回水戸のあじさいまつり（みとのあじさいまつり）图片1",
      alt: "第51回水戸のあじさいまつり（みとのあじさいまつり）图片1",
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
        activityKey="hanami"
      />
    </div>
  );
};

export default DetailPage;