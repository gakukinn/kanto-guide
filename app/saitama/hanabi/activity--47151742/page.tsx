import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750947151742",
  "name": "东浦和大间木公园会场花火大会",
  "address": "〒336-0923　埼玉県さいたま市緑区大間木地内",
  "datetime": "2025年8月9日　 19:30～　※荒天中止（順延日なし）",
  "venue": "埼玉市东浦和大间木公园周边",
  "access": "从JR武藏野线“东浦和站”出发，乘坐观光场所引导路线步行15分钟",
  "organizer": "さいたま市花火大会実行委員会",
  "price": "有收费观赏席※事前贩售制，详情请参考埼玉市官方观光网站",
  "contact": "050-3665-9607",
  "website": "https://visitsaitamacity.jp/events/29",
  "googleMap": "https://maps.google.com/maps?q=35.864478,139.710207&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "saitama",
  "description": "埼玉市花火大会之一，在浦和地区（东浦和大间木公园）举行。在夜晚空中快速射击，星火等被燃放，你可以一边享受见沼的大自然，一边欣赏烟花。埼玉市烟花节在大宫地区（大和田公园）和岩崎地区（岩崎文化公园）举行。※发送数：去年2500发观众数：去年5万人次",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://cdn.midjourney.com/ca8d31c8-4dff-45b7-bdd4-f26c56d3a7f1/0_2.png",
      "title": "東浦和大間木公園会場花火大会（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）图片1",
      "alt": "東浦和大間木公園会場花火大会（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:12:31.761Z",
  "updatedAt": "2025-06-26T14:12:31.761Z",
  "detailLink": "/saitama/hanabi/activity--47151742",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "埼玉市花火大会之一，在浦和地区（东浦和大间木公园）举行。在夜空中快速射击，星星火等被燃放，你可以一边享受见沼的大自然，一边欣赏烟花。埼玉市烟花节在大宫地区（大和田公园）和岩崎地区（岩崎文化公园）举行。※发射数：去年2500发观众数：去年5万人次",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="saitama" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '東浦和大間木公園会場花火大会（さいたましはなびたいかい　ひがしうらわおおまぎこうえんかいじょう） - 埼玉花火大会',
    description: 'さいたま市花火大会のひとつが、浦和地区（東浦和大間木公園）で開催举行。夜空に早打ち、连发烟花などが打燃放げられ、見沼の大自然を満喫しながら、花火を堪能することができます。さいたま市花火大会は、...',
  };
}
