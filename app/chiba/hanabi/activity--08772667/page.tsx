import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "name": "ぎおん柏崎まつり 海の大花火大会",
  "date": "2025年7月26日(土) 19:30～21:10",
  "time": "19:30～21:10",
  "venue": "柏崎市中央海岸・みなとまち海浜公園一帯",
  "access": "【電車】JR柏崎駅から徒歩25分 ※2025年はシャトルバスの運行なしMAP",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "ticketPrice": "あり\n2025年4月28日に、有料観覧席の申し込みは終了",
  "weatherInfo": "详见官网",
  "foodStalls": "详见官网",
  "parking": "详见官网",
  "notes": "新潟県柏崎市の夏を代表する一大花火イベント。川の長岡、山の片貝、海の柏崎と、越後三大花火の一つに数えられている。新型コロナウイルスのまん延により2年連続で中止になっていたが、2022年に3年ぶりに開催された。2025年も、1万6000発の花火が柏崎の夜空に打ちあがる。",
  "organizer": "详见官网",
  "contact": "详见官网",
  "website": "https://www.city.kashiwazaki.lg.jp/kashiwazakihanabi/index.html",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=37.375582,138.546519&center=37.375582,138.546519",
  "media": [],
  "description": "新潟県柏崎市の夏を代表する一大花火イベント。川の長岡、山の片貝、海の柏崎と、越後三大花火の一つに数えられている。新型コロナウイルスのまん延により2年連続で中止になっていたが、2022年に3年ぶりに開催された。2025年も、1万6000発の花火が柏崎の夜空に打ちあがる。",
  "highlights": "",
  "id": "1751108772668",
  "region": "chiba",
  "activityType": "hanabi",
  "detailLink": "/chiba/hanabi/activity--08772667",
  "createdAt": "2025-06-28T11:06:12.676Z",
  "source": "walkerplus-style-fix"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate 
    data={activityData} 
    regionKey="chiba" 
    activityKey="hanabi" 
  />;
}

export async function generateMetadata() {
  return {
    title: 'ぎおん柏崎まつり 海の大花火大会 - 千叶花火大会',
    description: '新潟県柏崎市の夏を代表する一大花火イベント。川の長岡、山の片貝、海の柏崎と、越後三大花火の一つに数えられている。新型コロナウイルスのまん延により2年連続で中止になっていたが、2022年に3年ぶりに開催...',
  };
}
