import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750946880972",
  "name": "熊谷市诞生20周年纪念第73届熊谷烟花大会（熊谷烟花大会）",
  "address": "〒360-0162　埼玉県熊谷市",
  "datetime": "2025年8月9日　 19:00～21:00（変更となる場合有）　※荒天の場合は10日、16日、17日の順延期",
  "venue": "埼玉県熊谷市　荒川河川敷（荒川大橋下流）",
  "access": "从JR高崎线“熊谷站”南口步行5分钟",
  "organizer": "一般社団法人熊谷市観光協会",
  "price": "有收费观众席",
  "contact": "一般社団法人熊谷市観光協会　048-594-6677",
  "website": "https://www.oideyo-kumagaya.com/",
  "googleMap": "https://maps.google.com/maps?q=36.136385,139.380707&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "saitama",
  "description": "在熊谷的荒川河边举行了一年一次的烟花节，其中包括Shakugama和Star Mine等烟花，照亮了夜空。昭和23年（1948年），为了从战祸中恢复，以“大熊谷复兴烟火大会”的形式开始举办，在县内也作为历史悠久的烟火大会而闻名。尺玉等约1万发被发射，信息烟花和复数的称赞者的“斯库玛姆! Wide Star Mine”等也是观点。※发射数：去年1万发观众数：去年42万人",
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
  "notes": "在熊谷的荒川河边举行了一年一度的烟花节，其中包括Shakugama和Star Mine等烟花，照亮了夜空。昭和23年（1948年），为了从战灾中恢复，以“大熊谷复兴烟火大会”的形式开始举办，在县内也作为历史悠久的烟火大会而知名。尺玉等约1万发被发射，信息烟花和复数的赞助者的“斯库玛姆! Wide Star Mine”等也是看点。※发射数：去年1万发观众数：去年42万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="saitama" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '熊谷市誕生20周年記念　第73回熊谷花火大会（くまがやはなびたいかい） - 埼玉花火大会',
    description: '尺玉や连发烟花などの花火が装点夜空恒例の花火大会が、熊谷の荒川河川敷で行われます。昭和23年（1948年）、戦災からの立ち直りを願って「大熊谷復興花火大会」として開催されたのが始まりで、県内でも...',
  };
}
