import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花见会详情页面
 * 数据库ID: recognition-hanami-1750933861522
 * 生成时间: 2025/6/26 19:31:01
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 明月院的紫阳花（めいげついん的紫阳花）
 * 2. 所在地: 〒247-0062　神奈川県鎌倉市山ノ内189
 * 3. 开催期间: 2025年6月上旬～下旬　 期間中の拝観時間/8:30～受付終了16:30（閉門17:00）
 * 4. 开催场所: 神奈川県鎌倉市　明月院
 * 5. 交通方式: ＪＲ横須賀線「北鎌倉駅」步行10分
 * 6. 主办方: 未设置
 * 7. 料金: 拝観料/大人500円、小中学生300円
 * 8. 联系方式: 明月院　0467-24-3437
 * 9. 官方网站: 未设置
 * 10. 谷歌地图: 35.334897,139.551438
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanami-1750933861522",
  name: "明月院的紫阳花（めいげついん的紫阳花）",
  address: "〒247-0062　神奈川県鎌倉市山ノ内189",
  datetime: "2025年6月上旬～下旬　 期間中の拝観時間/8:30～受付終了16:30（閉門17:00）",
  venue: "神奈川県鎌倉市　明月院",
  access: "ＪＲ横須賀線「北鎌倉駅」步行10分",
  organizer: "",
  price: "拝観料/大人500円、小中学生300円",
  contact: "明月院　0467-24-3437",
  website: "",
  googleMap: "https://maps.google.com/maps?q=35.334897,139.551438&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "每年6月，素有“紫阳花寺”美誉的镰仓明月院，会迎来最佳观赏期，寺内约2500株绣球花盛放，蓝紫色花海沿着石阶步道延伸至山门，静谧古朴的寺院与浓密花丛交相辉映，构成镰仓初夏最具代表性的景色。寺内还有枯山水庭园和竹林可散步参观，让人在赏花的同时享受幽静时光，是体验镰仓季节风情不可错过的景点。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://hanamap.com/media/002/202203/%E6%98%8E%E6%9C%88%E9%99%A2.jpg",
      title: "明月院的紫阳花（めいげついん的紫阳花）图片1",
      alt: "明月院的紫阳花（めいげついん的紫阳花）图片1",
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