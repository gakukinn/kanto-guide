import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc967zgn000dvlr0oud9t4d0
 * 生成时间: 2025/6/25 22:21:49
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 尊徳夏まつり大花火大会（そんとくなつまつりだいはなびたいかい）
 * 2. 所在地: 〒321-4546　栃木県真岡市砂ケ原
 * 3. 开催期间: 2025年8月30日　 まつり/16:30～、花火打ち上げ/19:30～20:20　※荒天中止
 * 4. 开催场所: 栃木県真岡市　鬼怒川河川敷緑地公園（砂ヶ原橋付近）
 * 5. 交通方式: ＪＲ宇都宮線「自治医大駅」から車約15分、または北関東自動車道「真岡IC」から車約20分
 * 6. 主办方: 尊徳夏まつり実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 尊徳夏まつり実行委員会　0285-74-4666
 * 9. 官方网站: https://sontokunatsu.jp/natsu/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.932972!3d36.380422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687633954!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc967zgn000dvlr0oud9t4d0",
  name: "尊徳夏まつり大花火大会（そんとくなつまつりだいはなびたいかい）",
  address: "〒321-4546　栃木県真岡市砂ケ原",
  datetime: "2025年8月30日　 まつり/16:30～、花火打ち上げ/19:30～20:20　※荒天中止",
  venue: "栃木県真岡市　鬼怒川河川敷緑地公園（砂ヶ原橋付近）",
  access: "ＪＲ宇都宮線「自治医大駅」から車約15分、または北関東自動車道「真岡IC」から車約20分",
  organizer: "尊徳夏まつり実行委員会",
  price: "有料観覧席なし",
  contact: "尊徳夏まつり実行委員会　0285-74-4666",
  website: "https://sontokunatsu.jp/natsu/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.932972!3d36.380422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687633954!5m2!1sja!2sjp",
  region: "kitakanto",
  description: "尊徳太鼓の演奏が名物の「尊徳夏まつり」のフィナーレを花火大会が飾ります。2025年は「夜空を彩る大輪の花！今年もたくさん咲かせます。」をテーマに、尺玉やスターマインをはじめ、創作花火、仕掛け花火、メッセージ花火、ミュージック花火など、個性的な花火が打ち上げられます。至近距離で打ち上げられる尺玉は迫力満点です。鬼怒川河川敷は、湾曲した堤防がちょうどスタジアムのようになり、夏の夜空を彩る大輪の花火をどこからでも観覧しやすくなっています。勇壮な尊徳太鼓の演奏が楽しめるほか、郷土芸能大会や納涼盆踊り大会なども催されます。 ※打ち上げ数：不明 観客数：5万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750857705375_xinrumingyue_Japanese_fireworks_festival_realistic_photograph_78419f8f-6a41-44cc-8a5f-3924044aa106_2_compressed.jpg",
      title: "尊徳夏まつり大花火大会（そんとくなつまつりだいはなびたいかい）图片1",
      alt: "尊徳夏まつり大花火大会（そんとくなつまつりだいはなびたいかい）图片1",
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
  const regionKey = REGION_MAP["kitakanto"] || 'tokyo';

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