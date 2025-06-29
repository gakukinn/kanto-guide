import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc7ojtqr000ivlagu8fs2jal
 * 生成时间: 2025/6/25 21:37:34
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 松戸花火大会2025（まつどはなびたいかい）
 * 2. 所在地: 〒271-0068　千葉県松戸市古ヶ崎2441
 * 3. 开催期间: 2025年8月2日　 19:15～20:20　※荒天中止（延期なし）
 * 4. 开催场所: 千葉県松戸市　古ケ崎河川敷スポーツ広場
 * 5. 交通方式: ＪＲ常磐線「松戸駅」もしくは「北松戸駅」から徒歩35分
 * 6. 主办方: 松戸花火大会実行委員会
 * 7. 料金: 有料観覧席あり　シート席（エリア1・5）/1人3000円　ほか　※詳細はホームページ参照
 * 8. 联系方式: 松戸花火大会実行委員会事務局（松戸市文化にぎわい創造課内）　047-366-7327
 * 9. 官方网站: https://matsudo-hanabi.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.89228!3d35.803218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750768513204!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ojtqr000ivlagu8fs2jal",
  name: "松戸花火大会2025（まつどはなびたいかい）",
  address: "〒271-0068　千葉県松戸市古ヶ崎2441",
  datetime: "2025年8月2日　 19:15～20:20　※荒天中止（延期なし）",
  venue: "千葉県松戸市　古ケ崎河川敷スポーツ広場",
  access: "ＪＲ常磐線「松戸駅」もしくは「北松戸駅」から徒歩35分",
  organizer: "松戸花火大会実行委員会",
  price: "有料観覧席あり　シート席（エリア1・5）/1人3000円　ほか　※詳細はホームページ参照",
  contact: "松戸花火大会実行委員会事務局（松戸市文化にぎわい創造課内）　047-366-7327",
  website: "https://matsudo-hanabi.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.89228!3d35.803218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750768513204!5m2!1sja!2sjp",
  region: "chiba",
  description: "夏の松戸市の一大イベント「松戸花火大会2025」が、古ケ崎河川敷スポーツ広場で開催されます。最大5号玉を含めスターマインや各種仕掛け花火など、約1万発が打ち上げられ夏の夜空を彩ります。会場にはさまざまなキッチンカーが出店し、フードやドリンクを楽しみながら花火を観賞できます。 ※打ち上げ数：1万発、昨年度1万5000発 観客数：昨年度27万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750855051106_2_compressed.jpg",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;