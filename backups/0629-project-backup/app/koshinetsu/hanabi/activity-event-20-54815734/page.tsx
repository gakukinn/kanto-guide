import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750954815734",
  "name": "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）",
  "address": "〒386-0018　長野県上田市",
  "datetime": "2025年8月5日　 19:00～20:30　※雨天決行、荒天中止",
  "venue": "長野県上田市　千曲川河川敷（常田新橋下流約300m）",
  "access": "北陸新幹線「上田駅」から徒歩5分、または上信越自動車道「上田菅平IC」から車約15分",
  "organizer": "信州上田大花火大会実行委員会",
  "price": "有料観覧席あり　※桟敷席/1万9800円、立ち見スペース5500円",
  "contact": "信州上田大花火大会実行委員会事務局（上田商工会議所内）　0268-22-4500",
  "website": "https://www.ucci.or.jp/info/news/shinsyuuedadaihanabitaikai2025/",
  "googleMap": "https://maps.google.com/maps?q=36.390707,138.252438&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "koshinetsu",
  "description": "信州上田の夏を彩る大花火大会が、千曲川河川敷で開催されます。2025年で第38回を迎え、創作花火、ワイドスターマイン、ミュージックスターマインを中心に、5号玉など約8000発の花火が打ち上げられます。見通しの良い河川敷にて、目の前に打ち上げられる迫力の花火を楽しむことができます。 ※打ち上げ数：昨年度8000発 観客数：昨年度8万人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://cdn.midjourney.com/61292bc9-9d0d-4566-b563-36e2fef95be7/0_1.png",
      "title": "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）图片1",
      "alt": "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T16:20:15.764Z",
  "updatedAt": "2025-06-26T16:20:15.764Z",
  "detailLink": "/koshinetsu/hanabi/activity-event-20-54815734",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "信州上田の夏を彩る大花火大会が、千曲川河川敷で開催されます。2025年で第38回を迎え、創作花火、ワイドスターマイン、ミュージックスターマインを中心に、5号玉など約8000発の花火が打ち上げられます。見通しの良い河川敷にて、目の前に打ち上げられる迫力の花火を楽しむことができます。 ※打ち上げ数：昨年度8000発 観客数：昨年度8万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="koshinetsu" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい） - 甲信越花火大会',
    description: '信州上田の夏を彩る大花火大会が、千曲川河川敷で開催されます。2025年で第38回を迎え、創作花火、ワイドスターマイン、ミュージックスターマインを中心に、5号玉など約8000発の花火が打ち上げられます。...',
  };
}
