import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750949417203",
  "name": "相模原纳凉花火大会",
  "address": "〒252-0246　神奈川県相模原市中央区水郷田名",
  "datetime": "2025年9月6日　 花火燃放/19:00～20:15　※荒天時・相模川増水時は翌日に順延、翌日も実施できない場合は中止",
  "venue": "神奈川県相模原市　相模川高田橋上流",
  "access": "从JR横滨线“桥本站”、“相模原站”、“渊野边站”或JR相模线“上沟站”搭乘“田纳巴士总站”的巴士“田纳巴士总站”~步行15分钟",
  "organizer": "相模原納涼花火大会実行委員会",
  "price": "有收费观众席，详细内容请参照网站",
  "contact": "相模原納涼花火大会実行委員会　相模原.hanabi@gmail.com、相模原市観光協会　042-771-3767",
  "website": "https://sagamiharahanabi.com",
  "googleMap": "https://maps.google.com/maps?q=35.542701,139.329083&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kanagawa",
  "description": "被众多人喜爱的相模原市的夏季风物诗“相模原纳凉花火大会”，在高田桥上游览举行。星光和音乐烟花等各种烟花点缀着夜空，展现出令人难忘的景象。在发射地点和观众席附近，可以欣赏到有震撼力的烟花，这也是很受欢迎的地方之一。舞台活动也在策划中。*发射次数：8，000次，观众人数：50，000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://yakei-fan.com/images/magazine/fireworks/pic_sagamihara-hanabi202301.jpg",
      "title": "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）图片1",
      "alt": "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:50:17.225Z",
  "updatedAt": "2025-06-26T14:50:17.225Z",
  "detailLink": "/kanagawa/hanabi/activity--49417203",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "被众多人喜爱的相模原市的夏季风物诗“相模原纳凉花火大会”，在高田桥上游举行。星光和音乐烟花等各种烟花点缀着夜空，展现出令人难忘的景象。在发射地点和观众席附近，可以欣赏到有震撼力的烟花，这也是很受欢迎的地方之一。舞台活动也在筹划之中。* 发射次数：8，000次，观众人数：50，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kanagawa" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '相模原納涼花火大会（さがみはらのうりょうはなびたいかい） - 神奈川花火大会',
    description: '多くの人々に愛される相模原市の夏の風物詩、「相模原納涼花火大会」が、高田橋上流で開催举行。连发烟花やミュージック花火など、さまざまな花火が夜空を彩り、心に残る光景が繰り広げられます。打燃放げ場...',
  };
}
