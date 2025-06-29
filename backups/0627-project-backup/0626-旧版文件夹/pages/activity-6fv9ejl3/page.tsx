import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc7ovolh000avl9c6fv9ejl3
 * 生成时间: 2025/6/25 22:15:58
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）
 * 2. 所在地: 〒239-0831　神奈川県横須賀市久里浜
 * 3. 开催期间: 2025年8月2日　 19:30～20:00（予定）　※荒天中止
 * 4. 开催场所: 神奈川県横須賀市　ペリー公園、久里浜海岸、カインズホーム裏岸壁（旧ニチロ岸壁）、カインズ横須賀久里浜店屋上、長瀬海岸緑地
 * 5. 交通方式: 京浜急行「京急久里浜駅」から徒歩15分、またはＪＲ横須賀線「久里浜駅」から徒歩17分
 * 6. 主办方: 久里浜観光協会、久里浜商店会協同組合、横須賀市
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 横須賀市コールセンター　046-822-4000
 * 9. 官方网站: https://perryfes.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.71295!3d35.22406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750657058138!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ovolh000avl9c6fv9ejl3",
  name: "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）",
  address: "〒239-0831　神奈川県横須賀市久里浜",
  datetime: "2025年8月2日　 19:30～20:00（予定）　※荒天中止",
  venue: "神奈川県横須賀市　ペリー公園、久里浜海岸、カインズホーム裏岸壁（旧ニチロ岸壁）、カインズ横須賀久里浜店屋上、長瀬海岸緑地",
  access: "京浜急行「京急久里浜駅」から徒歩15分、またはＪＲ横須賀線「久里浜駅」から徒歩17分",
  organizer: "久里浜観光協会、久里浜商店会協同組合、横須賀市",
  price: "有料観覧席あり",
  contact: "横須賀市コールセンター　046-822-4000",
  website: "https://perryfes.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.71295!3d35.22406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750657058138!5m2!1sja!2sjp",
  region: "kanagawa",
  description: "黒船来航で知られるペリー提督の偉業を称える「久里浜ペリー祭」の、フィナーレを飾る花火大会が久里浜海岸周辺で開催されます。4号玉、スターマインをはじめ、水面に映える雄大な花火が久里浜港から打ち上げられ、花火シーズンの訪れを告げます。2025年は約7000発で、過去最多の打ち上げ数となります。「よこすか開国バザール」や「ナイトバザール」、「水師提督ペリー上陸記念式典」なども催されます。 ※打ち上げ数：7000発、昨年度5000発 観客数：7万人、昨年度8万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750857354068_14_compressed.jpg",
      title: "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）图片1",
      alt: "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;