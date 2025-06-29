import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947360245
 * 生成时间: 2025/6/26 23:16:00
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 熊谷うちわ祭（くまがやうちわ祭典）
 * 2. 所在地: 〒360-0046　埼玉県熊谷市
 * 3. 开催期间: 2025年7月20日～22日　 ※開催日により異なる
 * 4. 开催场所: 埼玉県熊谷市　お祭り広場　ほか
 * 5. 交通方式: ＪＲ高崎線・秩父鉄道「熊谷駅」から徒歩10分
 * 6. 主办方: うちわ祭年番町（第弐本町区）
 * 7. 料金: 未设置
 * 8. 联系方式: 一般社団法人熊谷市観光協会　kumagaya.uchiwamatsuri@gmail.com
 * 9. 官方网站: http://uchiwamatsuri.com/
 * 10. 谷歌地图: 36.143508,139.381317
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947360245",
  name: "熊谷うちわ祭（くまがやうちわ祭典）",
  address: "〒360-0046　埼玉県熊谷市",
  datetime: "2025年7月20日～22日　 ※開催日により異なる",
  venue: "埼玉県熊谷市　お祭り広場　ほか",
  access: "ＪＲ高崎線・秩父鉄道「熊谷駅」から徒歩10分",
  organizer: "うちわ祭年番町（第弐本町区）",
  price: "",
  contact: "一般社団法人熊谷市観光協会　kumagaya.uchiwamatsuri@gmail.com",
  website: "http://uchiwamatsuri.com/",
  googleMap: "https://maps.google.com/maps?q=36.143508,139.381317&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "被称为“关东第一的祇园”的“熊谷扇子祭”将持续3天。从渡御祭开始，到第二天，绚烂豪华的12辆山车和车台，与熊谷子一起在市区巡回。祭典最大的表演场“打合”，各镇区的山车与屋台聚集在各地，在熊谷的夜晚响起雄壮的子。最后一天在祭典广场展开的“打击”，是祭典的高潮，其震撼力吸引了来访的人。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://images.keizai.biz/kumagaya_keizai/headline/1689683229_photo.jpg",
      title: "熊谷うちわ祭（くまがやうちわ祭典）图片1",
      alt: "熊谷うちわ祭（くまがやうちわ祭典）图片1",
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
  const regionKey = REGION_MAP["saitama"] || 'tokyo';

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