import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750948343463",
  "name": "Suigo-O-O-O-O-O-O-O-Waha Hanga-hai",
  "address": "〒289-0313　千葉県香取市小見川",
  "datetime": "2025年8月1日　 19:15～20:45（予定）　※荒天時は4日に延期",
  "venue": "千葉県香取市　小見川大橋下流利根川河畔",
  "access": "从JR成田线“小见川站”步行30分钟，或从东关东自动车道“佐原香取IC”开车约20分钟",
  "organizer": "水郷小見川観光協会",
  "price": "有收费观众席/餐桌席2万1000日元，椅子席3000日元※6月2日起开始网上申请受理（预定）",
  "contact": "香取市商工観光課　0478-50-1212",
  "website": "https://www.city.katori.lg.jp/sightseeing/gyoji/natsu/hanabi.html",
  "googleMap": "https://maps.google.com/maps?q=35.862072,140.615603&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "chiba",
  "description": "从明治41年（1908年）开始，持续为小见川夜空上颜色的传统“水乡大华烟花大会”，迎接第126届。你可以欣赏到大约5，000发（预定）在通川河上爆炸的壮观烟花，包括关东地区最大的水下明星矿、长玉、水下烟花、制作烟花、气息烟花、花园（预定）等。全国烟火店和工厂的烟火师，带著自己引以为豪的烟火--“全国烟火大赛”，竞争美丽的“全国烟火大赛”也是一大看点。*发射次数：5，000次，去年7，000次，观众：80，000次，去年110，000次",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://cdn.midjourney.com/f53f3dc4-490c-4949-b220-549d492e24fe/0_3.png",
      "title": "水郷おみがわ花火大会（すいごうおみがわはなびたいかい）图片1",
      "alt": "水郷おみがわ花火大会（すいごうおみがわはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:32:23.485Z",
  "updatedAt": "2025-06-26T14:32:23.485Z",
  "detailLink": "/chiba/hanabi/activity--48343463",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "从明治41年（1908年）开始，持续为小见川夜空上色的传统“水乡大华花火大会”，迎来第126届。你可以欣赏到大约5，000发（预定）在通川河上爆炸的壮观烟花，包括关东地区最大的水下明星矿、长玉、水下烟花、制作烟花、讯息烟花、花园（预定）等。全国烟火店和工厂的烟火师，带著自己引以为豪的烟火--“全国烟火大赛”，竞争美丽的“全国烟火大赛”也是一大看点。* 发射次数：5，000次，去年7，000次，观众：80，000次，去年110，000次",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="chiba" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '水郷おみがわ花火大会（すいごうおみがわはなびたいかい） - 千叶花火大会',
    description: '明治41年（1908年）から、小見川の夜空を彩り続けている伝統の「水郷おみがわ花火大会」が、126回目を迎え開催举行。関東でも有数の規模を誇る特大水中スターマイン、尺玉、水中花火、仕掛花火、メッセ...',
  };
}
