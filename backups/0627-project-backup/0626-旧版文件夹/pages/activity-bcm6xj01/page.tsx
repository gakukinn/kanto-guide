import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc7o9npv000avlcwbcm6xj01
 * 生成时间: 2025/6/25 22:43:54
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 令和7年度さいたま市花火大会（東浦和大間木公園会場）（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）
 * 2. 所在地: 〒336-0923　埼玉県さいたま市緑区大間木地内
 * 3. 开催期间: 2025年8月9日　 19:30～　※荒天中止（順延日なし）
 * 4. 开催场所: さいたま市　東浦和大間木公園周辺
 * 5. 交通方式: ＪＲ武蔵野線「東浦和駅」から観覧場所誘導ルートで徒歩15分
 * 6. 主办方: さいたま市花火大会実行委員会
 * 7. 料金: 有料観覧席あり　※事前販売制、詳細はさいたま市公式観光サイトを参照
 * 8. 联系方式: NTT IP Voice（音声案内）　050-3665-9607　※7月18日～8月16日まで24時間対応。プリペイド携帯、一部のIP・光ラインなどでは利用できない場合あり
 * 9. 官方网站: https://visitsaitamacity.jp/events/29
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.710207!3d35.864478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750691077801!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7o9npv000avlcwbcm6xj01",
  name: "令和7年度さいたま市花火大会（東浦和大間木公園会場）（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）",
  address: "〒336-0923　埼玉県さいたま市緑区大間木地内",
  datetime: "2025年8月9日　 19:30～　※荒天中止（順延日なし）",
  venue: "さいたま市　東浦和大間木公園周辺",
  access: "ＪＲ武蔵野線「東浦和駅」から観覧場所誘導ルートで徒歩15分",
  organizer: "さいたま市花火大会実行委員会",
  price: "有料観覧席あり　※事前販売制、詳細はさいたま市公式観光サイトを参照",
  contact: "NTT IP Voice（音声案内）　050-3665-9607　※7月18日～8月16日まで24時間対応。プリペイド携帯、一部のIP・光ラインなどでは利用できない場合あり",
  website: "https://visitsaitamacity.jp/events/29",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.710207!3d35.864478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750691077801!5m2!1sja!2sjp",
  region: "saitama",
  description: "尺玉やスターマインなどの花火が夜空を彩る恒例の花火大会が、熊谷の荒川河川敷で行われます。昭和23年（1948年）、戦災からの立ち直りを願って「大熊谷復興花火大会」として開催されたのが始まりで、県内でも歴史ある花火大会として知られます。尺玉など約1万発が打ち上げられ、メッセージ花火や、複数の協賛者による「スクマム！ワイドスターマイン」なども見どころです。 ※打ち上げ数：昨年度1万発 観客数：昨年度42万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750859032108_xinrumingyue_imagine_prompt_A_realistic_photograph_of_the_Sai_f9e41f52-d573-4abd-a8ca-dbb0fc4beb37_1_compressed.jpg",
      title: "令和7年度さいたま市花火大会（東浦和大間木公園会場）（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）图片1",
      alt: "令和7年度さいたま市花火大会（東浦和大間木公園会場）（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;