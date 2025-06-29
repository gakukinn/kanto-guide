import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750934039934",
  "name": "久里浜佩里祭烟花大会，久里浜佩里祭烟花大会",
  "address": "〒239-0831　神奈川県横須賀市久里浜",
  "datetime": "2025年8月2日　 19:30～20:00（予定）　※荒天中止",
  "venue": "神奈川县横须贺市佩里公园、久里浜海岸、凯恩斯家后岸壁（旧ニチロ岸壁）、凯恩斯横须贺久里浜店屋顶、长濑海岸绿地",
  "access": "从京滨急行“京急久里浜站”步行15分钟，或从JR横须贺线“久里浜站”步行17分钟",
  "organizer": "久里浜観光協会、久里浜商店会協同組合、横須賀市",
  "price": "有收费观众席",
  "contact": "横须贺市呼叫中心046-822-4000",
  "website": "https://perryfes.jp/",
  "googleMap": "https://maps.google.com/maps?q=35.22406,139.71295&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kanagawa",
  "description": "“久里滨佩里节”的最后一场烟火表演将在久里滨海岸附近举行，以纪念佩里海军上将以黑船的到来而闻名的成就。从久里浜港发射出4号玉、星矿等雄伟的烟花，标志着烟花季节的到来。到2025年，大约有7000枚火箭，这将是历史以来最高的发射次数。还举办了“横须卡开放集市”、“夜市”和“水手佩里海军上将登陆纪念仪式”。※发射数：7000发，去年5000发观众：70，000人，去年80，000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://yakei-fan.com/images/magazine/fireworks/pic_hanabi-kanagawa2023071501.jpg",
      "title": "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）图片1",
      "alt": "久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T10:33:59.944Z",
  "updatedAt": "2025-06-26T10:33:59.944Z",
  "detailLink": "/kanagawa/hanabi/activity--34039934",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "“久里滨佩里节”的最后一场烟火表演将在久里滨海岸附近举行，以纪念佩里海军上将以黑船的到来而闻名的成就。从久里浜港发射出4号玉、星矿等雄伟的烟花，标志着烟花季节的到来。到2025年，大约有7000枚火箭，这将是有史以来最高的发射次数。还举办了“横须卡开放集市”、“夜市”和“水手佩里海军上将登陆纪念仪式”。※发射数：7000发，去年5000发观众：70，000人，去年80，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kanagawa" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい） - 神奈川花火大会',
    description: '黒船来航で知られるペリー提督の偉業を称える「久里浜ペリー祭」の、フィナーレを飾る花火大会が久里浜海岸周辺で開催举行。4号玉、スターマインをはじめ、水面に映える雄大な花火が久里浜港から打燃放げられ、...',
  };
}
