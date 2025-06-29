import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750954439222",
  "name": "山梨市制施行20周年纪念事业笛吹川县下纳凉烟花大会（长冈烟花大会）",
  "address": "〒405-0018　山梨県山梨市上神内川",
  "datetime": "2025年7月26日　 花火打ち上げ/19:30～21:00（予定）　※小雨決行、荒天時は翌日に順延",
  "venue": "山梨県山梨市　笛吹川万力大橋下流",
  "access": "从JR中央本线“山梨市站”步行3分钟",
  "organizer": "笛吹川県下納涼花火大会山梨市実行委員会",
  "price": "没有收费座位。",
  "contact": "笛吹川県下納涼花火大会山梨市実行委員会　0553-22-1111",
  "website": "https://www.city.yamanashi.yamanashi.jp/soshiki/17/",
  "googleMap": "https://maps.google.com/maps?q=35.689679,138.682815&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "koshinetsu",
  "description": "这是在雨季的同时举办的烟花大会。2025年，作为“山梨市制实施20周年纪念事业”，将比往年增加约2000发，实施。4号球、早打、星光、大星光、制作烟火等，使夜空变得华丽，在富福井河清澈的溪流和万里林绿色的大自然的背景下放出的烟火吸引了观众的目光。由于发射地点和观赏地点很近，你可以感受到令人叹为观看的震撼力。*发射次数：5000张，去年3000张，观众人数：25，000人，去年20，000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://cdn.midjourney.com/ead6b34a-80a2-4c3c-a48d-f2a4a02287d8/0_0.png",
      "title": "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）图片1",
      "alt": "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T16:13:59.253Z",
  "updatedAt": "2025-06-26T16:13:59.253Z",
  "detailLink": "/koshinetsu/hanabi/activity-event-20-54439222",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "这是在雨季的同时举行的烟花大会。2025年，作为“山梨市制施行20周年纪念事业”，将比往年增加约2000发，实施。4号球、早打、星光、大星光、制作烟火等，使夜空变得华丽，在富福井河清澈的溪流和万里林绿色的大自然的背景下施放的烟火吸引了观众的目光。由于发射地点和观赏地点很近，你可以感受到令人叹为观止的震撼力。* 发射次数：5000枚，去年3000枚，观众人数：25，000人，去年20，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="koshinetsu" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい） - 甲信越花火大会',
    description: '梅雨明けと同時に開催される花火大会です。2025年は「山梨市制施行20周年記念事業」として、例年より約2000発増発して、実施されます。4号玉、早打ち、スターマイン、大スターマイン、仕掛花火などが夜空...',
  };
}
