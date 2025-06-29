import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750946179969",
  "name": "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）",
  "address": "〒335-0024　埼玉県戸田市",
  "datetime": "2025年8月2日　 19:00～20:30　※雨天中止（順延なし）",
  "venue": "埼玉県戸田市　国道17号戸田橋上流荒川河川敷",
  "access": "ＪＲ埼京線「戸田公園駅」から徒歩20分（東側会場）もしくは40分～50分（西側会場）※混雑状況により異なる",
  "organizer": "戸田橋花火大会実行委員会",
  "price": "有料観覧席あり（会場内は全席有料）",
  "contact": "戸田橋花火大会実行委員会事務局　048-431-0206",
  "website": "https://www.todabashi-hanabi.jp/",
  "googleMap": "https://maps.google.com/maps?q=35.800781,139.674973&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "saitama",
  "description": "荒川の夜空を彩る「戸田橋花火大会 Sky Fantasia」が、今年も開催されます。対岸の「いたばし花火大会」とあわせて、スターマイン、音楽花火、尺玉など、首都圏最大級の約1万5000発が打ち上げられます。迫力のシンクロ演出など、ここでしか見ることのできない2大会による合同プログラムが繰り広げられます。東西エリアで異なる楽しみ方もでき、東側には花火を目前で観賞できる新席種が登場します。思い出に残る最高の花火体験が満喫できます。 ※打ち上げ数：1万5000発、昨年度1万5000発（※いずれもいたばし花火大会との合計） 観客数：昨年度45万人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://hanabi-navi.info/wp-content/uploads/2025/05/30339796_m-e1746797273379.jpg",
      "title": "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）图片1",
      "alt": "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T13:56:19.981Z",
  "updatedAt": "2025-06-26T13:56:19.981Z",
  "detailLink": "/saitama/hanabi/activity-sky-fantasia-46179969",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "荒川の夜空を彩る「戸田橋花火大会 Sky Fantasia」が、今年も開催されます。対岸の「いたばし花火大会」とあわせて、スターマイン、音楽花火、尺玉など、首都圏最大級の約1万5000発が打ち上げられます。迫力のシンクロ演出など、ここでしか見ることのできない2大会による合同プログラムが繰り広げられます。東西エリアで異なる楽しみ方もでき、東側には花火を目前で観賞できる新席種が登場します。思い出に残る最高の花火体験が満喫できます。 ※打ち上げ数：1万5000発、昨年度1万5000発（※いずれもいたばし花火大会との合計） 観客数：昨年度45万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="saitama" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア） - 埼玉花火大会',
    description: '荒川の夜空を彩る「戸田橋花火大会 Sky Fantasia」が、今年も開催されます。対岸の「いたばし花火大会」とあわせて、スターマイン、音楽花火、尺玉など、首都圏最大級の約1万5000発が打ち上げられ...',
  };
}
