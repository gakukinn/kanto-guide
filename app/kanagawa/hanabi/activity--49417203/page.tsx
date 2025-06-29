import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750949417203",
  "name": "相模原納涼花火大会（さがみはらのうりょうはなびたいかい）",
  "address": "〒252-0246　神奈川県相模原市中央区水郷田名",
  "datetime": "2025年9月6日　 花火打ち上げ/19:00～20:15　※荒天時・相模川増水時は翌日に順延、翌日も実施できない場合は中止",
  "venue": "神奈川県相模原市　相模川高田橋上流",
  "access": "ＪＲ横浜線「橋本駅」・「相模原駅」・「淵野辺駅」もしくはＪＲ相模線「上溝駅」から「田名バスターミナル行」のバス「田名バスターミナル」～徒歩15分",
  "organizer": "相模原納涼花火大会実行委員会",
  "price": "有料観覧席あり　※詳細はホームページ参照",
  "contact": "相模原納涼花火大会実行委員会　sagamihara.hanabi@gmail.com、相模原市観光協会　042-771-3767",
  "website": "https://sagamiharahanabi.com",
  "googleMap": "https://maps.google.com/maps?q=35.542701,139.329083&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kanagawa",
  "description": "多くの人々に愛される相模原市の夏の風物詩、「相模原納涼花火大会」が、高田橋上流で開催されます。スターマインやミュージック花火など、さまざまな花火が夜空を彩り、心に残る光景が繰り広げられます。打ち上げ場所と観客席が近く、迫力ある花火が楽しめるのも、人気の一つです。ステージイベントも企画されています。 ※打ち上げ数：8000発 観客数：5万人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
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
  "notes": "多くの人々に愛される相模原市の夏の風物詩、「相模原納涼花火大会」が、高田橋上流で開催されます。スターマインやミュージック花火など、さまざまな花火が夜空を彩り、心に残る光景が繰り広げられます。打ち上げ場所と観客席が近く、迫力ある花火が楽しめるのも、人気の一つです。ステージイベントも企画されています。 ※打ち上げ数：8000発 観客数：5万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kanagawa" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '相模原納涼花火大会（さがみはらのうりょうはなびたいかい） - 神奈川花火大会',
    description: '多くの人々に愛される相模原市の夏の風物詩、「相模原納涼花火大会」が、高田橋上流で開催されます。スターマインやミュージック花火など、さまざまな花火が夜空を彩り、心に残る光景が繰り広げられます。打ち上げ場...',
  };
}
