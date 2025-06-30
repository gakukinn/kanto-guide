import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750948520819
 * 生成时间: 2025/6/26 23:35:20
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 松戸花火大会2025（まつどはなびたいかい）
 * 2. 所在地: 〒271-0068　千葉県松戸市古ヶ崎2441
 * 3. 开催期间: 2025年8月2日　 19:15～20:20　※荒天中止（延期なし）
 * 4. 开催场所: 千葉県松戸市　古ケ崎河川敷スポーツ広場
 * 5. 交通方式: ＪＲ常磐線「松戸駅」或者「北松戸駅」步行35分
 * 6. 主办方: 松戸花火大会実行委員会
 * 7. 料金: 有料観覧席有　シート席（エリア1・5）/1人3000円　ほか　※詳細は官网参照
 * 8. 联系方式: 松戸花火大会実行委員会事務局（松戸市文化にぎわい創造課内）　047-366-7327
 * 9. 官方网站: https://matsudo-hanabi.com/
 * 10. 谷歌地图: 35.803218,139.89228
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750948520819",
  name: "松戸花火大会2025（まつどはなびたいかい）",
  address: "〒271-0068　千葉県松戸市古ヶ崎2441",
  datetime: "2025年8月2日　 19:15～20:20　※荒天中止（延期なし）",
  venue: "千葉県松戸市　古ケ崎河川敷スポーツ広場",
  access: "ＪＲ常磐線「松戸駅」或者「北松戸駅」步行35分",
  organizer: "松戸花火大会実行委員会",
  price: "有料観覧席有　シート席（エリア1・5）/1人3000円　ほか　※詳細は官网参照",
  contact: "松戸花火大会実行委員会事務局（松戸市文化にぎわい創造課内）　047-366-7327",
  website: "https://matsudo-hanabi.com/",
  googleMap: "https://maps.google.com/maps?q=35.803218,139.89228&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "松岛市夏季的大型活动“松岛烟花节2025”将在古崎河边体育广场举行。包含最大5号球的星矿和各种装置烟火等，约有1万发，为夏季夜空增添色彩。会场上有各种各样的厨房车，你可以一边享用食物和饮料一边欣赏烟花。※发射数：10，000发，去年15，000发，观众数：去年270，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/8f53196e-88df-4cca-a018-4f7ac85004b5/0_3.png",
      title: "松戸花火大会2025（まつどはなびたいかい）图片1",
      alt: "松戸花火大会2025（まつどはなびたいかい）图片1",
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
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;