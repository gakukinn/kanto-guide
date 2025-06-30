import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花见会详情页面
 * 数据库ID: recognition-hanami-1750933800811
 * 生成时间: 2025/6/26 19:30:00
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 本土寺的紫阳花（ほんどじ的紫阳花）
 * 2. 所在地: 〒270-0002　千葉県松戸市平賀63
 * 3. 开催期间: 2025年6月上旬～7月上旬　 9:00～16:30（最終受付16:00）
 * 4. 开催场所: 千葉県松戸市　本土寺
 * 5. 交通方式: ＪＲ常磐線「北小金駅」步行10分
 * 6. 主办方: 未设置
 * 7. 料金: 大人（中学生以上）500円　ほか
 * 8. 联系方式: 本土寺テレホンサービス（6月中）　047-341-0405
 * 9. 官方网站: https://www.hondoji.net/
 * 10. 谷歌地图: 35.839946,139.928461
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanami-1750933800811",
  name: "本土寺的紫阳花（ほんどじ的紫阳花）",
  address: "〒270-0002　千葉県松戸市平賀63",
  datetime: "2025年6月上旬～7月上旬　 9:00～16:30（最終受付16:00）",
  venue: "千葉県松戸市　本土寺",
  access: "ＪＲ常磐線「北小金駅」步行10分",
  organizer: "",
  price: "大人（中学生以上）500円　ほか",
  contact: "本土寺テレホンサービス（6月中）　047-341-0405",
  website: "https://www.hondoji.net/",
  googleMap: "https://maps.google.com/maps?q=35.839946,139.928461&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "本土寺紫阳花举办时间：2025年6月上旬~7月上旬。在旅游网站上，我们介绍了对大岛寺绣球花的评论和投稿照片。你也可以在这里找到通往大岛寺绣球花的信息和拥挤的情况。酒店/观光景点/当地美食/活动信息都很丰富。大岛寺绣球周围的绣球花。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://maruchiba.jp/lsc/upfile/spot/0001/0041/10041_1_l.jpg",
      title: "本土寺的紫阳花（ほんどじ的紫阳花）图片1",
      alt: "本土寺的紫阳花（ほんどじ的紫阳花）图片1",
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
  const regionKey = REGION_MAP["chiba"] || 'tokyo';

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