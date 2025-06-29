import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花见会详情页面
 * 数据库ID: recognition-hanami-1750948812517
 * 生成时间: 2025/6/26 23:40:12
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）
 * 2. 所在地: 〒248-0016　神奈川県鎌倉市長谷3-11-2
 * 3. 开催期间: 2025年5月下旬～7月上旬　 拝観時間/8:00～17:00（閉山17:30）　※あじさい路でのアジサイ鑑賞/五分咲き～見頃が終わるまで、あじさい入場券（有料）を領布。詳細はホームページをご確認ください。
 * 4. 开催场所: 神奈川県鎌倉市　長谷寺（長谷観音）
 * 5. 交通方式: 江ノ島電鉄「長谷駅」から徒歩5分、またはＪＲ横須賀線「鎌倉駅」からバス約10分「長谷観音前」下車
 * 6. 主办方: 未设置
 * 7. 料金: 拝観料/大人400円、あじさい入場券/500円
 * 8. 联系方式: 長谷寺　0467-22-6300
 * 9. 官方网站: https://www.hasedera.jp/
 * 10. 谷歌地图: 35.312492,139.533171
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanami-1750948812517",
  name: "長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）",
  address: "〒248-0016　神奈川県鎌倉市長谷3-11-2",
  datetime: "2025年5月下旬～7月上旬　 拝観時間/8:00～17:00（閉山17:30）　※あじさい路でのアジサイ鑑賞/五分咲き～見頃が終わるまで、あじさい入場券（有料）を領布。詳細はホームページをご確認ください。",
  venue: "神奈川県鎌倉市　長谷寺（長谷観音）",
  access: "江ノ島電鉄「長谷駅」から徒歩5分、またはＪＲ横須賀線「鎌倉駅」からバス約10分「長谷観音前」下車",
  organizer: "",
  price: "拝観料/大人400円、あじさい入場券/500円",
  contact: "長谷寺　0467-22-6300",
  website: "https://www.hasedera.jp/",
  googleMap: "https://maps.google.com/maps?q=35.312492,139.533171&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "长谷寺（长谷观音）紫阳花举办期间：2025年5月下旬~7月上旬。在Jalannet上，你可以看到对Hase-ji寺绣球花的评论和张贴的照片。你也可以在这里找到通往Hase-ji寺（Hase-Kannon）绣球花的信息，以及拥挤的情况。酒店/旅游景点/当地美食/活动信息都在Hase-ji寺（Hase-Kannon）附近。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://sumahononakani.com/tjn/upload/img_reports/detail/2c449678d08eef57a2e8a9cd0011ef07ba5e745739bf5dcbb54a9185a472b0ea645b287a8105a.jpg",
      title: "長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）图片1",
      alt: "長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）图片1",
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
  const regionKey = REGION_MAP["kanagawa"] || 'tokyo';

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