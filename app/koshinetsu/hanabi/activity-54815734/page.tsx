import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750954815734
 * 生成时间: 2025/6/27 01:20:15
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）
 * 2. 所在地: 〒386-0018　長野県上田市
 * 3. 开催期间: 2025年8月5日　 19:00～20:30　※雨天決行、荒天中止
 * 4. 开催场所: 長野県上田市　千曲川河川敷（常田新橋下流約300m）
 * 5. 交通方式: 北陸新幹線「上田駅」から徒歩5分、または上信越自動車道「上田菅平IC」から車約15分
 * 6. 主办方: 信州上田大花火大会実行委員会
 * 7. 料金: 有料観覧席あり　※桟敷席/1万9800円、立ち見スペース5500円
 * 8. 联系方式: 信州上田大花火大会実行委員会事務局（上田商工会議所内）　0268-22-4500
 * 9. 官方网站: https://www.ucci.or.jp/info/news/shinsyuuedadaihanabitaikai2025/
 * 10. 谷歌地图: 36.390707,138.252438
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750954815734",
  name: "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）",
  address: "〒386-0018　長野県上田市",
  datetime: "2025年8月5日　 19:00～20:30　※雨天決行、荒天中止",
  venue: "長野県上田市　千曲川河川敷（常田新橋下流約300m）",
  access: "北陸新幹線「上田駅」から徒歩5分、または上信越自動車道「上田菅平IC」から車約15分",
  organizer: "信州上田大花火大会実行委員会",
  price: "有料観覧席あり　※桟敷席/1万9800円、立ち見スペース5500円",
  contact: "信州上田大花火大会実行委員会事務局（上田商工会議所内）　0268-22-4500",
  website: "https://www.ucci.or.jp/info/news/shinsyuuedadaihanabitaikai2025/",
  googleMap: "https://maps.google.com/maps?q=36.390707,138.252438&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "为信州上田的夏天增色的大型烟花节将在千曲川河岸举行。2025年迎来第38回，以创作烟火、Wide Star Mine、Music Star Mine为中心，5号球等约8000发烟火将被施放。在风景优美的河岸上，你可以欣赏到在你眼前燃放的壮观烟花。※发射数：去年8000发观众数：去年80，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/61292bc9-9d0d-4566-b563-36e2fef95be7/0_1.png",
      title: "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）图片1",
      alt: "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）图片1",
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