import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750949417203
 * 生成时间: 2025/6/26 23:50:17
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 相模原納涼花火大会（さがみはらのうりょうはなびたいかい）
 * 2. 所在地: 〒252-0246　神奈川県相模原市中央区水郷田名
 * 3. 开催期间: 2025年9月6日　 花火燃放/19:00～20:15　※荒天時・相模川増水時は翌日に順延、翌日も実施できない場合は中止
 * 4. 开催场所: 神奈川県相模原市　相模川高田橋上流
 * 5. 交通方式: ＪＲ横浜線「橋本駅」・「相模原駅」・「淵野辺駅」或者ＪＲ相模線「上溝駅」から「田名巴士ターミナル行」の巴士「田名巴士ターミナル」～徒歩15分
 * 6. 主办方: 相模原納涼花火大会実行委員会
 * 7. 料金: 有料観覧席有　※詳細は官网参照
 * 8. 联系方式: 相模原納涼花火大会実行委員会　sagamihara.hanabi@gmail.com、相模原市観光協会　042-771-3767
 * 9. 官方网站: https://sagamiharahanabi.com
 * 10. 谷歌地图: 35.542701,139.329083
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750949417203",
  name: "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）",
  address: "〒252-0246　神奈川県相模原市中央区水郷田名",
  datetime: "2025年9月6日　 花火燃放/19:00～20:15　※荒天時・相模川増水時は翌日に順延、翌日も実施できない場合は中止",
  venue: "神奈川県相模原市　相模川高田橋上流",
  access: "ＪＲ横浜線「橋本駅」・「相模原駅」・「淵野辺駅」或者ＪＲ相模線「上溝駅」から「田名巴士ターミナル行」の巴士「田名巴士ターミナル」～徒歩15分",
  organizer: "相模原納涼花火大会実行委員会",
  price: "有料観覧席有　※詳細は官网参照",
  contact: "相模原納涼花火大会実行委員会　sagamihara.hanabi@gmail.com、相模原市観光協会　042-771-3767",
  website: "https://sagamiharahanabi.com",
  googleMap: "https://maps.google.com/maps?q=35.542701,139.329083&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "被众多人喜爱的相模原市的夏季风物诗“相模原纳凉烟火大会”，在高田桥上游举行。星光和音乐烟花等各种烟花点缀着夜空，展现出令人难忘的景象。在发射地点和观众席附近，可以欣赏到有震撼力的烟花，这也是很受欢迎的地方之一。舞台活动也在筹划之中。* 发射次数：8，000次，观众人数：50，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://yakei-fan.com/images/magazine/fireworks/pic_sagamihara-hanabi202301.jpg",
      title: "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）图片1",
      alt: "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）图片1",
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
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;