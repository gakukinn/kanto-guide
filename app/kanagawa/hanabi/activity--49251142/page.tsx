import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750949251142",
  "name": "小田原酒香川烟火大会（小田原酒香川烟火大会）",
  "address": "〒250-0002　神奈川県小田原市寿町5-22",
  "datetime": "2025年8月2日　 19:10～20:00　※荒天中止",
  "venue": "神奈川县小田原市酒壶川体育广场",
  "access": "从JR东海道本线“鸭宫站”步行15分钟",
  "organizer": "一般社団法人小田原市観光協会",
  "price": "收费观赏席1人3500日圆起（共7种类型贩售）",
  "contact": "一般社団法人小田原市観光協会　0465-20-4192",
  "website": "https://www.odawara-kankou.com/",
  "googleMap": "https://maps.google.com/maps?q=35.266076,139.174371&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kanagawa",
  "description": "小田原酒川烟花节将在酒川河畔举行，届时将燃放约10，000发烟花，包括星光、音乐烟花、讯息烟花和4号烟花。除了以传统和情感为基础的传统烟花外，您还可以欣赏到烟花和音乐同步的华丽烟花表演等丰富多彩的烟花表演。在最后一场比赛中，横跨清酒川的全长300米高30米的尼亚加拉烟花将出现，欢呼雀跃。* 发射次数：10，000，去年10，000，观众：250，000，去年250，000",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://cdn.midjourney.com/738dc805-02ca-4c5d-9de1-a0151f086778/0_1.png",
      "title": "小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）图片1",
      "alt": "小田原酒匂川花火大会（おだわらさかわがわはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:47:31.165Z",
  "updatedAt": "2025-06-26T14:47:31.165Z",
  "detailLink": "/kanagawa/hanabi/activity--49251142",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "小田原酒川烟花节将在酒川河畔举行，届时将燃放约10，000发烟花，包括星光、音乐烟花、讯息烟花和4号烟花。除了以传统和情感为基础的传统烟花外，您还可以欣赏到烟花和音乐同步的华丽烟花表演等丰富多彩的烟花表演。在最后一场比赛中，横跨清酒川的全长300米高30米的尼亚加拉烟花将出现，欢呼雀跃。* 发射次数：10，000，去年10，000，观众：250，000，去年250，000",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kanagawa" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '小田原酒匂川花火大会（おだわらさかわがわはなびたいかい） - 神奈川花火大会',
    description: '酒匂川の河川敷で、连发烟花、ミュージック花火、メッセージ花火、4号玉など約1万発の花火が被燃放「小田原酒匂川花火大会」が開催举行。伝統と情緒を基本としてきた従来の花火に加え、花火と音楽...',
  };
}
