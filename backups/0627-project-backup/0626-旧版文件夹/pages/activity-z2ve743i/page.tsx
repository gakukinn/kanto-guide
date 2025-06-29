import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc8pwwer000bvlscz2ve743i
 * 生成时间: 2025/6/25 21:30:14
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 第66回いたばし花火大会（いたばしはなびたいかい）
 * 2. 所在地: 〒174-0041　東京都板橋区舟渡4丁目
 * 3. 开催期间: 2025年8月2日　 19:00～20:30　※荒天中止（順延なし）
 * 4. 开催场所: 東京都　板橋区荒川河川敷
 * 5. 交通方式: ＪＲ埼京線「浮間舟渡駅」から徒歩20分、または地下鉄都営三田線「高島平駅」・「西台駅」・「蓮根駅」から徒歩20分
 * 6. 主办方: 板橋区、板橋区観光協会
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 板橋区観光協会（板橋区役所くらしと観光課内）　03-3579-2255
 * 9. 官方网站: https://itabashihanabi.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.68227!3d35.797463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750660247106!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc8pwwer000bvlscz2ve743i",
  name: "第66回いたばし花火大会（いたばしはなびたいかい）",
  address: "〒174-0041　東京都板橋区舟渡4丁目",
  datetime: "2025年8月2日　 19:00～20:30　※荒天中止（順延なし）",
  venue: "東京都　板橋区荒川河川敷",
  access: "ＪＲ埼京線「浮間舟渡駅」から徒歩20分、または地下鉄都営三田線「高島平駅」・「西台駅」・「蓮根駅」から徒歩20分",
  organizer: "板橋区、板橋区観光協会",
  price: "有料観覧席あり",
  contact: "板橋区観光協会（板橋区役所くらしと観光課内）　03-3579-2255",
  website: "https://itabashihanabi.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.68227!3d35.797463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750660247106!5m2!1sja!2sjp",
  region: "tokyo",
  description: "荒川を挟んで両岸にある東京都板橋区と埼玉県戸田市で、2つの花火大会が同時開催されます。両岸で約1万5000発が打ち上げられる、東京都内屈指の花火大会です。恒例となっている日本最高峰の花火師が手掛けた「芸術玉」をはじめ、東京最大級の大玉「尺五寸玉」、フィナーレを飾るワイドスターマイン「天空のナイアガラ」など、見どころが満載です。打ち上げ場所が観客席に近いことから、おなかに響くような轟音も醍醐味の一つです。5か所同時打ち上げのワイドスターマインが質、量ともにグレードアップされ、オープニングやフィナーレなどで迫力ある演出が行われます。 ※打ち上げ数：1万5000発、昨年度1万5000発 観客数：55万人、昨年度57万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://static.tokyo-np.co.jp/image/article/size1/2/e/2/1/2e213fd0f02cc89308aa7b52ba9df442_1.jpg",
      title: "第66回いたばし花火大会（いたばしはなびたいかい）图片1",
      alt: "第66回いたばし花火大会（いたばしはなびたいかい）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;