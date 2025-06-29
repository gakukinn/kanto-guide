/**
 * 第66回 いたばし花火大会 详情页面
 * 自动生成于 2025-06-29T04:03:43.000Z
 * 使用模板: WalkerPlusHanabiTemplate
 */
import WalkerPlusHanabiTemplate from '../../../../src/components/WalkerPlusHanabiTemplate';

const pageData = {
  "name": "第66回烟花大会",
  "fireworksCount": "約1万5000発　(同時開催される戸田橋花火大会との合算値)",
  "fireworksTime": "90分",
  "expectedVisitors": "57万人",
  "date": "2025年8月2日(土)",
  "time": "19：00至20：30",
  "venue": "板橋区 荒川河川敷",
  "access": "[电车] JR浮间舟渡站步行20分钟，都营三田线高岛平站或西台站或莲根站步行20分钟MAP",
  "weatherInfo": "少下雨了。恶劣天气下不顺延",
  "parking": "×",
  "price": "详情请参阅官方网站https：//itabashihanabi.jp/paidseat.html。",
  "contact": "03-3579-2255 板橋区観光協会",
  "foodStalls": "あり",
  "notes": "详见官网",
  "website": "https://itabashihanabi.jp/",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.798307,139.673254&center=35.798307,139.673254",
  "id": "1751169822998",
  "region": "tokyo",
  "activityType": "hanabi",
  "description": "与位于荒川对岸的埼玉县户田市的“户田桥烟花大会”同时举行的烟花大会。以东京都内屈指可数的规模而自豪，两岸约有1万5000发烟花。这里有很多景点，包括由日本最好的烟火师制作的“艺术玉”、东京最大的大烟花“Shaka-gazu玉”，以及将装饰最后一幕的大明星矿“天空中的尼亚加拉”。由于发射地点离观众席很近，肚子里回荡的声音也是其中的乐趣之一。",
  "highlights": "将同时进行5个地方发射的广域星马因的质量和数量都进行升级，在开场和终曲上进行有震撼力的演出。此外，2025年还将燃放烟花，以纪念博洛尼亚友好城市交流20周年。",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://pbs.twimg.com/media/GrTB5BcXwAAqfav?format=jpg&name=large",
      "title": "第66回 いたばし花火大会图片1",
      "alt": "第66回 いたばし花火大会图片1",
      "caption": ""
    }
  ],
  "detailLink": "/tokyo/hanabi/activity-66-69822997",
  "createdAt": "2025-06-29T04:03:42.998Z",
  "source": "walkerplus-generator"
} as const;

export default function DetailPage() {
  return (
    <WalkerPlusHanabiTemplate
      data={pageData}
      regionKey="tokyo"
      activityKey="hanabi"
    />
  );
}

export const metadata = {
  title: '第66回 いたばし花火大会 - 日本活动指南',
  description: '荒川をはさんで対岸にある埼玉県戸田市の「戸田橋花火大会」と同時開催される花火大会。東京都内屈指の規模を誇り、両岸で約1万5000発の花火が打ち上げられる。恒例となっている日本最高峰の花火師が手掛けた「芸術玉」や東京最大級の大玉「尺五寸玉」、フィナーレを飾るワイドスターマイン「天空のナイアガラ」など、見どころが満載。打ち上げ場所が観客席に近いことから、おなかに響く音も醍醐味の一つ。',
};
