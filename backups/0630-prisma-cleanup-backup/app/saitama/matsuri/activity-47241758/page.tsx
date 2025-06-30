import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947241758
 * 生成时间: 2025/6/26 23:14:01
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 秩父川瀬祭（ちちぶかわせ祭典）
 * 2. 所在地: 〒368-0041　埼玉県秩父市番場町1-3
 * 3. 开催期间: 2025年7月19日～20日　 ※状況により内容が変更となる場合有
 * 4. 开催场所: 埼玉県秩父市　秩父神社
 * 5. 交通方式: 秩父鉄道「秩父駅」からすぐ、或西武池袋線「西武秩父駅」步行15分
 * 6. 主办方: 秩父神社
 * 7. 料金: 未设置
 * 8. 联系方式: 秩父神社　0494-22-0262、秩父観光協会　0494-21-2277
 * 9. 官方网站: https://www.chichibu-神社.or.jp/
 * 10. 谷歌地图: 35.997683,139.084145
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947241758",
  name: "秩父川瀬祭（ちちぶかわせ祭典）",
  address: "〒368-0041　埼玉県秩父市番場町1-3",
  datetime: "2025年7月19日～20日　 ※状況により内容が変更となる場合有",
  venue: "埼玉県秩父市　秩父神社",
  access: "秩父鉄道「秩父駅」からすぐ、或西武池袋線「西武秩父駅」步行15分",
  organizer: "秩父神社",
  price: "",
  contact: "秩父神社　0494-22-0262、秩父観光協会　0494-21-2277",
  website: "https://www.chichibu-神社.or.jp/",
  googleMap: "https://maps.google.com/maps?q=35.997683,139.084145&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "在当地以“御祇园”的名义深受人欢迎，拥有300年传统的秩父神社夏季祭典，持续两天举行。白天在市内被拉来的笠和屋台合起来的8辆山车，晚上会变成挂著灯条的美丽幻想的姿态，在燃放烟火升起的时候，会在神社周边被拉去。在第二天，它被有力地作为“神龛清洗”被抬到荒川，即使在清澈的溪流中也很罕见。两岸都挤满了观赏者，节日达到了高潮。它已被指定为埼玉县的非物质民间文化财产。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.chichibu-omotenashi.com/omatsuri/wp-content/uploads/2022/01/IMG_9025.jpg",
      title: "秩父川瀬祭（ちちぶかわせ祭典）图片1",
      alt: "秩父川瀬祭（ちちぶかわせ祭典）图片1",
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