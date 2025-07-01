import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750949360256",
  "name": "湘南光之花火大会",
  "address": "〒254-0803　神奈川県平塚市千石河岸",
  "datetime": "2025年8月22日　 19:00～20:00（予定）　※雨天時は24日延期",
  "venue": "神奈川県平塚市　相模川河口（湘南潮来）",
  "access": "从JR东海道本线“平冢站”南口乘坐“须贺港”的巴士“终点”~步行5分钟，或从圈央道“茅崎海岸IC”开车约5分钟，或从小田原厚木道“平冢IC”开车约20分钟",
  "organizer": "湘南ひらつか花火大会実行委員会",
  "price": "有收费观众席",
  "contact": "湘南平冢花火大会实行委员会 0463-35-8107，仅当日/自动音讯召开情报电话050-3665-9603",
  "website": "https://www.city.hiratsuka.kanagawa.jp/kanko/page-c_01068.html",
  "googleMap": "https://maps.google.com/maps?q=35.314991,139.364417&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kanagawa",
  "description": "在相模川河口（湘南潮来）举行了作为湘南夏天的风景而受欢迎的“湘南平田花火大会”。以湘南的大海为背景，约3000发五彩缤纷的烟花被燃烧释放，在夏季的夜晚空中放生巨大的花朵。在节日目的后半部分，将举行与音乐和谐的音乐烟花表演，您可以欣赏到充满震撼力的烟花。※从平冢站南口开始的收费临时巴士运行：3000发，去年3000发观众：85，000人，去年85，000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
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
  "notes": "在相模川河口（湘南潮来）举行了作为湘南夏天的风景而受欢迎的“湘南平田花火大会”。以湘南的大海为背景，约3000发五彩缤纷的烟花被燃放，在夏季的夜空中绽放巨大的花朵。在节目的后半部分，将举行与音乐和谐的音乐烟花表演，您可以欣赏到充满震撼力的烟花。※从平冢站南口开始的付费临时巴士运行：3000发，去年3000发观众：85，000人，去年85，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kanagawa" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '湘南ひらつか花火大会（しょうなんひらつかはなびたいかい） - 神奈川花火大会',
    description: '湘南の夏装点風物詩として親しまれている「湘南ひらつか花火大会」が、相模川河口（湘南潮来）で開催举行。湘南の海を背景に、连发烟花など、約3000発の色とりどりの花火が打燃放げられ、夏の夜空に大...',
  };
}
