import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750945592701
 * 生成时间: 2025/6/26 22:46:32
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 八王子花火大会（はちおうじはなびたいかい）
 * 2. 所在地: 〒193-0931　東京都八王子市台町2-2
 * 3. 开催期间: 2025年7月26日　 19:00～20:15　※小雨決行、荒天中止
 * 4. 开催场所: 東京都八王子市　富士森公園
 * 5. 交通方式: 京王高尾線「山田駅」步行15分、或ＪＲ中央本線「八王子駅」或者「西八王子駅」步行20分
 * 6. 主办方: 公益社団法人八王子観光コンベンション協会
 * 7. 料金: 无收费观览席
 * 8. 联系方式: 公益社団法人八王子観光コンベンション協会　042-649-2827
 * 9. 官方网站: https://www.hkc.or.jp/
 * 10. 谷歌地图: 35.65098,139.322728
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750945592701",
  name: "八王子花火大会（はちおうじはなびたいかい）",
  address: "〒193-0931　東京都八王子市台町2-2",
  datetime: "2025年7月26日　 19:00～20:15　※小雨決行、荒天中止",
  venue: "東京都八王子市　富士森公園",
  access: "京王高尾線「山田駅」步行15分、或ＪＲ中央本線「八王子駅」或者「西八王子駅」步行20分",
  organizer: "公益社団法人八王子観光コンベンション協会",
  price: "无收费观览席",
  contact: "公益社団法人八王子観光コンベンション協会　042-649-2827",
  website: "https://www.hkc.or.jp/",
  googleMap: "https://maps.google.com/maps?q=35.65098,139.322728&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "为八王子市的夜空上色的人气花火大会，在富士森公园举行。连续花火等约4000发烟火爆发，可以欣赏各式各样的光之艺术。您可以近距离观看包括3号球在内的烟花，震撼力也是完美的。※发射数：去年4000发观众数：去年90，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/d48bd04a-25f3-4852-8e59-070afd86278a/0_0.png",
      title: "八王子花火大会（はちおうじはなびたいかい）图片1",
      alt: "八王子花火大会（はちおうじはなびたいかい）图片1",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;