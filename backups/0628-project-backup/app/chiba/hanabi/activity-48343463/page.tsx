import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750948343463
 * 生成时间: 2025/6/26 23:32:23
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 水郷おみがわ花火大会（すいごうおみがわはなびたいかい）
 * 2. 所在地: 〒289-0313　千葉県香取市小見川
 * 3. 开催期间: 2025年8月1日　 19:15～20:45（予定）　※荒天時は4日に延期
 * 4. 开催场所: 千葉県香取市　小見川大橋下流利根川河畔
 * 5. 交通方式: ＪＲ成田線「小見川駅」から徒歩30分、または東関東自動車道「佐原香取IC」から車約20分
 * 6. 主办方: 水郷小見川観光協会
 * 7. 料金: 有料観覧席あり/テーブル席2万1000円、イス席3000円　※6月2日からインターネットで申込受付開始（予定）
 * 8. 联系方式: 香取市商工観光課　0478-50-1212
 * 9. 官方网站: https://www.city.katori.lg.jp/sightseeing/gyoji/natsu/hanabi.html
 * 10. 谷歌地图: 35.862072,140.615603
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750948343463",
  name: "水郷おみがわ花火大会（すいごうおみがわはなびたいかい）",
  address: "〒289-0313　千葉県香取市小見川",
  datetime: "2025年8月1日　 19:15～20:45（予定）　※荒天時は4日に延期",
  venue: "千葉県香取市　小見川大橋下流利根川河畔",
  access: "ＪＲ成田線「小見川駅」から徒歩30分、または東関東自動車道「佐原香取IC」から車約20分",
  organizer: "水郷小見川観光協会",
  price: "有料観覧席あり/テーブル席2万1000円、イス席3000円　※6月2日からインターネットで申込受付開始（予定）",
  contact: "香取市商工観光課　0478-50-1212",
  website: "https://www.city.katori.lg.jp/sightseeing/gyoji/natsu/hanabi.html",
  googleMap: "https://maps.google.com/maps?q=35.862072,140.615603&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "明治41年（1908年）から、小見川の夜空を彩り続けている伝統の「水郷おみがわ花火大会」が、126回目を迎え開催されます。関東でも有数の規模を誇る特大水中スターマイン、尺玉、水中花火、仕掛花火、メッセージ花火、フラワーガーデン（予定）など、利根川の川面に炸裂する約5000発（予定）の豪快な花火が楽しめます。全国の煙火店や工場の花火師が、自慢の花火、尺玉を持ち寄って美しさを競い合う「全国尺玉コンクール」も見どころです。 ※打ち上げ数：5000発、昨年度7000発 観客数：8万人、昨年度11万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/f53f3dc4-490c-4949-b220-549d492e24fe/0_3.png",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;