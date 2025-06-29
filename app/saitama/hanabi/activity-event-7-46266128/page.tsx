import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750946266128",
  "name": "Ryowa 7财政年度埼玉市烟花节（小和田公园场地）（Saitaha A-wada Koen Kaijo）",
  "address": "〒330-0805　埼玉県さいたま市大宮区寿能町2-519",
  "datetime": "2025年7月27日　 19:30～　※荒天中止（順延日なし）",
  "venue": "埼玉市大和田公园附近",
  "access": "东武野田线（东武都市公园线）“大宫公园站”、“小和田站”步行15分钟",
  "organizer": "さいたま市花火大会実行委員会",
  "price": "有收费观赏席※事前贩售制，详情请参考埼玉市官方观光网站",
  "contact": "NTT IP Voice（语音指南） 050-3665-9607 * 7月18日至8月16日24小时服务。可能无法在预付费手机、一些IP、光纤线路等上使用",
  "website": "https://visitsaitamacity.jp/events/28",
  "googleMap": "https://maps.google.com/maps?q=35.921885,139.641392&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "saitama",
  "description": "为了庆祝埼玉市烟花节的开幕式，烟花节将在小和田公园举行。早打、星矿等被发射，为夏日的夜空增添了华丽的色彩。小和田公园会场的特点是景色优美，从任何方向都能欣赏到美丽的烟花。埼玉市烟花大会在浦和地区（大间木公园）和岩地区（岩文化公园）也举行。※发射数：去年4000发观众数：去年90，000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://visitsaitamacity.jp/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTM2MjEsInB1ciI6ImJsb2JfaWQifX0=--737d265fb9e72bd6726bc011496a2252b34bb3bc/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplX3RvX2ZpdCI6WzE5MjAsMTA4MF0sInNhdmVyIjp7InF1YWxpdHkiOjgwfX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--772cc9d1a056963b4ab06d595a9f3bcbf7fb19a2/%E3%81%95%E3%81%84%E3%81%9F%E3%81%BE%E5%B8%82%E8%8A%B1%E7%81%AB%E5%A4%A7%E4%BC%9A%E5%A4%A7%E5%92%8C%E7%94%B0%E5%85%AC%E5%9C%92%E4%BC%9A%E5%A0%B41.jpg",
      "title": "令和7年度さいたま市花火大会（大和田公園会場）（さいたましはなびたいかい　おおわだこうえんかいじょう）图片1",
      "alt": "令和7年度さいたま市花火大会（大和田公園会場）（さいたましはなびたいかい　おおわだこうえんかいじょう）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T13:57:46.145Z",
  "updatedAt": "2025-06-26T13:57:46.145Z",
  "detailLink": "/saitama/hanabi/activity-event-7-46266128",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "为了庆祝埼玉市烟花节的开幕式，烟花节将在小和田公园举行。早打、星矿等被发射，为夏日的夜空增添了华丽的色彩。小和田公园会场的特点是景色优美，从任何方向都能欣赏到美丽的烟花。埼玉市烟花大会在浦和地区（大间木公园）和岩地区（岩文化公园）也举行。※发射数：去年4000发观众数：去年90，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="saitama" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '令和7年度さいたま市花火大会（大和田公園会場）（さいたましはなびたいかい　おおわだこうえんかいじょう） - 埼玉花火大会',
    description: 'さいたま市花火大会のオープニングを飾る花火大会が、大和田公園で開催されます。早打ち、スターマインなどが打ち上げられ、夏の夜空を華やかに彩ります。大和田公園会場は、見通しの良さが特徴でどの方角からも美し...',
  };
}
