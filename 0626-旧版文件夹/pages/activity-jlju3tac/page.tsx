import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc98913e0001vlrgjlju3tac
 * 生成时间: 2025/6/25 22:45:30
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 令和7年度さいたま市花火大会（大和田公園会場）（さいたましはなびたいかい　おおわだこうえんかいじょう）
 * 2. 所在地: 〒330-0805　埼玉県さいたま市大宮区寿能町2-519
 * 3. 开催期间: 2025年7月27日　 19:30～　※荒天中止（順延日なし）
 * 4. 开催场所: さいたま市　大和田公園周辺
 * 5. 交通方式: 東武野田線（東武アーバンパークライン）「大宮公園駅」・「大和田駅」から徒歩15分
 * 6. 主办方: さいたま市花火大会実行委員会
 * 7. 料金: 有料観覧席あり　※事前販売制、詳細はさいたま市公式観光サイトを参照
 * 8. 联系方式: NTT IP Voice（音声案内）　050-3665-9607　※7月18日～8月16日まで24時間対応。プリペイド携帯、一部のIP・光ラインなどでは利用できない場合あり
 * 9. 官方网站: https://visitsaitamacity.jp/events/28
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.641392!3d35.921885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750690945458!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc98913e0001vlrgjlju3tac",
  name: "令和7年度さいたま市花火大会（大和田公園会場）（さいたましはなびたいかい　おおわだこうえんかいじょう）",
  address: "〒330-0805　埼玉県さいたま市大宮区寿能町2-519",
  datetime: "2025年7月27日　 19:30～　※荒天中止（順延日なし）",
  venue: "さいたま市　大和田公園周辺",
  access: "東武野田線（東武アーバンパークライン）「大宮公園駅」・「大和田駅」から徒歩15分",
  organizer: "さいたま市花火大会実行委員会",
  price: "有料観覧席あり　※事前販売制、詳細はさいたま市公式観光サイトを参照",
  contact: "NTT IP Voice（音声案内）　050-3665-9607　※7月18日～8月16日まで24時間対応。プリペイド携帯、一部のIP・光ラインなどでは利用できない場合あり",
  website: "https://visitsaitamacity.jp/events/28",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.641392!3d35.921885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750690945458!5m2!1sja!2sjp",
  region: "saitama",
  description: "さいたま市花火大会のオープニングを飾る花火大会が、大和田公園で開催されます。早打ち、スターマインなどが打ち上げられ、夏の夜空を華やかに彩ります。大和田公園会場は、見通しの良さが特徴でどの方角からも美しい花火が楽しめます。さいたま市花火大会は、浦和地区（大間木公園）と岩槻地区（岩槻文化公園）でも催されます。 ※打ち上げ数：昨年度4000発 観客数：昨年度9万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://visitsaitamacity.jp/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTM2MjEsInB1ciI6ImJsb2JfaWQifX0=--737d265fb9e72bd6726bc011496a2252b34bb3bc/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplX3RvX2ZpdCI6WzE5MjAsMTA4MF0sInNhdmVyIjp7InF1YWxpdHkiOjgwfX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--772cc9d1a056963b4ab06d595a9f3bcbf7fb19a2/%E3%81%95%E3%81%84%E3%81%9F%E3%81%BE%E5%B8%82%E8%8A%B1%E7%81%AB%E5%A4%A7%E4%BC%9A%E5%A4%A7%E5%92%8C%E7%94%B0%E5%85%AC%E5%9C%92%E4%BC%9A%E5%A0%B41.jpg",
      title: "令和7年度さいたま市花火大会（大和田公園会場）（さいたましはなびたいかい　おおわだこうえんかいじょう）图片1",
      alt: "令和7年度さいたま市花火大会（大和田公園会場）（さいたましはなびたいかい　おおわだこうえんかいじょう）图片1",
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