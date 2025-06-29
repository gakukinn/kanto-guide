import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc7ojtqj000evlagsyli625m
 * 生成时间: 2025/6/25 21:35:41
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 水郷おみがわ花火大会（すいごうおみがわはなびたいかい）
 * 2. 所在地: 〒289-0313　千葉県香取市小見川
 * 3. 开催期间: 2025年8月1日　 19:15～20:45（予定）　※荒天時は4日に延期
 * 4. 开催场所: 千葉県香取市　小見川大橋下流利根川河畔
 * 5. 交通方式: ＪＲ成田線「小見川駅」から徒歩30分、または東関東自動車道「佐原香取IC」から車約20分
 * 6. 主办方: 水郷小見川観光協会
 * 7. 料金: 有料観覧席あり/テーブル席2万1000円、イス席3000円　※6月2日からインターネットで申込受付開始（予定）
 * 8. 联系方式: 香取市商工観光課　0478-50-1212
 * 9. 官方网站: https://www.city.katori.lg.jp/sightseeing/gyoji/natsu/hanabi.html
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.615603!3d35.862072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750686930021!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ojtqj000evlagsyli625m",
  name: "水郷おみがわ花火大会（すいごうおみがわはなびたいかい）",
  address: "〒289-0313　千葉県香取市小見川",
  datetime: "2025年8月1日　 19:15～20:45（予定）　※荒天時は4日に延期",
  venue: "千葉県香取市　小見川大橋下流利根川河畔",
  access: "ＪＲ成田線「小見川駅」から徒歩30分、または東関東自動車道「佐原香取IC」から車約20分",
  organizer: "水郷小見川観光協会",
  price: "有料観覧席あり/テーブル席2万1000円、イス席3000円　※6月2日からインターネットで申込受付開始（予定）",
  contact: "香取市商工観光課　0478-50-1212",
  website: "https://www.city.katori.lg.jp/sightseeing/gyoji/natsu/hanabi.html",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.615603!3d35.862072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750686930021!5m2!1sja!2sjp",
  region: "chiba",
  description: "明治41年（1908年）から、小見川の夜空を彩り続けている伝統の「水郷おみがわ花火大会」が、126回目を迎え開催されます。関東でも有数の規模を誇る特大水中スターマイン、尺玉、水中花火、仕掛花火、メッセージ花火、フラワーガーデン（予定）など、利根川の川面に炸裂する約5000発（予定）の豪快な花火が楽しめます。全国の煙火店や工場の花火師が、自慢の花火、尺玉を持ち寄って美しさを競い合う「全国尺玉コンクール」も見どころです。 ※打ち上げ数：5000発、昨年度7000発 観客数：8万人、昨年度11万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750854937681_xinrumingyue_Japanese_fireworks_festival_realistic_photograph_751a461a-1856-4ea1-a59e-921c8aef3ea9_0_compressed.jpg",
      title: "水郷おみがわ花火大会（すいごうおみがわはなびたいかい）图片1",
      alt: "水郷おみがわ花火大会（すいごうおみがわはなびたいかい）图片1",
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