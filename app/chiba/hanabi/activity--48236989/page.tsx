import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750948236989",
  "name": "鸭川市民烟火大会（かみ）",
  "address": "〒296-0002　千葉県鴨川市前原",
  "datetime": "2025年7月29日　 花火打ち上げ/19:30～20:00（予定）　※小雨決行、荒天の場合は翌日か翌々日に順延（状況により変更となる場合あり）",
  "venue": "千叶县鸭川市前原·横渚海岸",
  "access": "从JR外房线“安房鸭川站”步行5分钟",
  "organizer": "鴨川市民花火大会実行委員会",
  "price": "没有收费座位。",
  "contact": "鴨川市観光協会　04-7092-0086",
  "website": "http://www.chiba-kamogawa.jp",
  "googleMap": "https://maps.google.com/maps?q=35.10543,140.107426&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "chiba",
  "description": "为了让孩子们愉快地度过鸭川的夏天，怀着希望能让能引以为豪鸭川的孩子多一个，举行了“鸭川市民烟花大会”。尺玉等发射的烟花约3000发，点亮了鸭川的夜空。被选择为“日本的渚100选”之一的前原·横渚海岸沿岸的任何地方都可以看到烟花。从JR安福鸭川站步行5分钟，交通也很便利。*发射次数：3000次，观众人数：30，000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://cdn.midjourney.com/b9993aed-dd51-431c-8aa2-61ebc7bb1478/0_3.png",
      "title": "鴨川市民花火大会（かもがわしみんはなびたいかい）图片1",
      "alt": "鴨川市民花火大会（かもがわしみんはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:30:37.008Z",
  "updatedAt": "2025-06-26T14:30:37.008Z",
  "detailLink": "/chiba/hanabi/activity--48236989",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "为了让孩子们愉快地度过鸭川的夏天，怀着希望能让能引以为豪鸭川的孩子多一个，举行了“鸭川市民烟花大会”。尺玉等发射的烟花约3000发，点亮了鸭川的夜空。被选为“日本的渚100选”之一的前原·横渚海岸沿岸的任何地方都可以看到烟火。从JR安福鸭川站步行5分钟，交通也很方便。* 发射次数：3000次，观众人数：30，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="chiba" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '鴨川市民花火大会（かもがわしみんはなびたいかい） - 千叶花火大会',
    description: '鴨川の夏を子どもたちが楽しく過ごせるように、鴨川を自慢できる子どもが1人でも増えるようにと願いを込め、「鴨川市民花火大会」が開催されます。尺玉などの打ち上げ花火約3000発が鴨川の夜空を彩ります。「日...',
  };
}
