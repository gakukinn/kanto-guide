import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750949360256",
  "name": "湘南ひらつか花火大会（しょうなんひらつかはなびたいかい）",
  "address": "〒254-0803　神奈川県平塚市千石河岸",
  "datetime": "2025年8月22日　 19:00～20:00（予定）　※雨天時は24日に延期",
  "venue": "神奈川県平塚市　相模川河口（湘南潮来）",
  "access": "ＪＲ東海道本線「平塚駅」南口から「須賀港行」のバス「終点」～徒歩5分、または圏央道「茅ヶ崎海岸IC」から車約5分、または小田原厚木道路「平塚IC」から車約20分",
  "organizer": "湘南ひらつか花火大会実行委員会",
  "price": "有料観覧席あり",
  "contact": "湘南ひらつか花火大会実行委員会　0463-35-8107、当日のみ/自動音声開催案内電話　050-3665-9603",
  "website": "https://www.city.hiratsuka.kanagawa.jp/kanko/page-c_01068.html",
  "googleMap": "https://maps.google.com/maps?q=35.314991,139.364417&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kanagawa",
  "description": "湘南の夏を彩る風物詩として親しまれている「湘南ひらつか花火大会」が、相模川河口（湘南潮来）で開催されます。湘南の海を背景に、スターマインなど、約3000発の色とりどりの花火が打ち上げられ、夏の夜空に大輪の花を咲かせます。プログラムの後半には、音楽との調和が魅力的なミュージック花火の打ち上げが予定されており、迫力満点の花火を楽しめます。 ※平塚駅南口から有料臨時バス運行 打ち上げ数：3000発、昨年度3000発 観客数：8万5000人、昨年度8万5000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://yakei-fan.com/images/magazine/fireworks/pic_shonan-hiratsuka-hanabi2023082501.jpg",
      "title": "湘南ひらつか花火大会（しょうなんひらつかはなびたいかい）图片1",
      "alt": "湘南ひらつか花火大会（しょうなんひらつかはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:52:50.616Z",
  "updatedAt": "2025-06-26T14:52:50.616Z",
  "detailLink": "/kanagawa/hanabi/activity--49360256",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "湘南の夏を彩る風物詩として親しまれている「湘南ひらつか花火大会」が、相模川河口（湘南潮来）で開催されます。湘南の海を背景に、スターマインなど、約3000発の色とりどりの花火が打ち上げられ、夏の夜空に大輪の花を咲かせます。プログラムの後半には、音楽との調和が魅力的なミュージック花火の打ち上げが予定されており、迫力満点の花火を楽しめます。 ※平塚駅南口から有料臨時バス運行 打ち上げ数：3000発、昨年度3000発 観客数：8万5000人、昨年度8万5000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kanagawa" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '湘南ひらつか花火大会（しょうなんひらつかはなびたいかい） - 神奈川花火大会',
    description: '湘南の夏を彩る風物詩として親しまれている「湘南ひらつか花火大会」が、相模川河口（湘南潮来）で開催されます。湘南の海を背景に、スターマインなど、約3000発の色とりどりの花火が打ち上げられ、夏の夜空に大...',
  };
}
