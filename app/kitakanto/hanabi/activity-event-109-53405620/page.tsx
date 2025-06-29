import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750953405620",
  "name": "第109届足利烟花节（Akashiga Hanabaikaka）",
  "address": "〒326-0054　栃木県足利市伊勢南町",
  "datetime": "2025年8月2日　 19:15～20:50　※雨天時は翌日に順延",
  "venue": "栃木県足利市　渡良瀬川河畔　田中橋下流",
  "access": "从JR两毛线“足利站”步行5分钟，或者从东武伊势崎线“足利市站”步行10分钟，或者从东北自动车道“佐野藤冈IC”开车约20分钟，或者从北关东自动车道“足利IC”开车约10分钟",
  "organizer": "足利花火大会実行委員会",
  "price": "有收费座位（需要查询）",
  "contact": "足利花火大会実行委員会（足利商工会議所内）　0284-21-1354",
  "website": "https://ashikaga.info/",
  "googleMap": "https://maps.google.com/maps?q=36.328025,139.457238&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kitakanto",
  "description": "足利烟火大会创办于明治36年（1903年），是一个拥有120年以上传统和历史的烟火大会。作为关东地区屈指可数的烟花大会而广为人知，每年都有来自关东一带的众多观众前来观看，成为足利最热闹的一天。大约20，000支烟花（计划中）将亮石贺的夜空，包括连续发射的5号烟花、同时发射的长玉、大玉和宽星地雷。“尼亚加拉”的高潮尤为令人赞叹不已。※发射数：去年2万发观众数：去年45万人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://pbs.twimg.com/media/GsMHXMlaUAA_vyg?format=jpg&name=medium",
      "title": "第109回足利花火大会（あしかがはなびたいかい）图片1",
      "alt": "第109回足利花火大会（あしかがはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T15:56:45.705Z",
  "updatedAt": "2025-06-26T15:56:45.705Z",
  "detailLink": "/kitakanto/hanabi/activity-event-109-53405620",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "足利烟火大会创办于明治36年（1903年），是一个拥有120年以上传统和历史的烟火大会。作为关东地区屈指可数的烟花大会而广为人知，每年都有来自关东一带的众多观众前来观看，成为足利最热闹的一天。大约20，000支烟花（计划中）将照亮石贺的夜空，包括连续发射的5号烟花、同时发射的长玉、大玉和宽星地雷。“尼亚加拉”的高潮尤其令人叹为观止。※发射数：去年2万发观众数：去年45万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kitakanto" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '第109回足利花火大会（あしかがはなびたいかい） - 北关东花火大会',
    description: '足利花火大会は、明治36年（1903年）に創始され、120年以上の伝統と歴史のある花火大会です。関東地域でも屈指の花火大会として知られ、毎年関東一円から多くの観覧者が訪れ、足利が最も活気に満ちた一日と...',
  };
}
