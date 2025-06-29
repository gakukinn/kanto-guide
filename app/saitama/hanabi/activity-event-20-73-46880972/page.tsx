import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750946880972",
  "name": "熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）",
  "address": "〒360-0162　埼玉県熊谷市",
  "datetime": "2025年8月9日　 19:00～21:00（変更となる場合あり）　※荒天の場合は10日、16日、17日の順に延期",
  "venue": "埼玉県熊谷市　荒川河川敷（荒川大橋下流）",
  "access": "ＪＲ高崎線「熊谷駅」南口から徒歩5分",
  "organizer": "一般社団法人熊谷市観光協会",
  "price": "有料観覧席あり",
  "contact": "一般社団法人熊谷市観光協会　048-594-6677",
  "website": "https://www.oideyo-kumagaya.com/",
  "googleMap": "https://maps.google.com/maps?q=36.136385,139.380707&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "saitama",
  "description": "尺玉やスターマインなどの花火が夜空を彩る恒例の花火大会が、熊谷の荒川河川敷で行われます。昭和23年（1948年）、戦災からの立ち直りを願って「大熊谷復興花火大会」として開催されたのが始まりで、県内でも歴史ある花火大会として知られます。尺玉など約1万発が打ち上げられ、メッセージ花火や、複数の協賛者による「スクマム！ワイドスターマイン」なども見どころです。 ※打ち上げ数：昨年度1万発 観客数：昨年度42万人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "http://sai2.info/wp-content/uploads/2025/05/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2025-05-03-22.49.21.png",
      "title": "熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）图片1",
      "alt": "熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:08:01.126Z",
  "updatedAt": "2025-06-26T14:08:01.126Z",
  "detailLink": "/saitama/hanabi/activity-event-20-73-46880972",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "尺玉やスターマインなどの花火が夜空を彩る恒例の花火大会が、熊谷の荒川河川敷で行われます。昭和23年（1948年）、戦災からの立ち直りを願って「大熊谷復興花火大会」として開催されたのが始まりで、県内でも歴史ある花火大会として知られます。尺玉など約1万発が打ち上げられ、メッセージ花火や、複数の協賛者による「スクマム！ワイドスターマイン」なども見どころです。 ※打ち上げ数：昨年度1万発 観客数：昨年度42万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="saitama" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい） - 埼玉花火大会',
    description: '尺玉やスターマインなどの花火が夜空を彩る恒例の花火大会が、熊谷の荒川河川敷で行われます。昭和23年（1948年）、戦災からの立ち直りを願って「大熊谷復興花火大会」として開催されたのが始まりで、県内でも...',
  };
}
