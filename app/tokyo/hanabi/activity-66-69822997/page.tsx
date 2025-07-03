/**
 * 第66回 板桥花火大会 详情页面
 * 自动生成于 2025-06-29T04:03:43.000Z
 * 使用模板: WalkerPlusHanabiTemplate
 */
import WalkerPlusHanabiTemplate from '../../../../src/components/WalkerPlusHanabiTemplate';

const pageData = {
  "name": "第66回 板桥花火大会",
  "fireworksCount": "約1万5000発　(同時举办戸田橋花火大会との合算値)",
  "fireworksTime": "90分",
  "expectedVisitors": "57万人",
  "date": "2025年8月2日(土)",
  "time": "19：00至20：30",
  "venue": "板橋区 荒川河川敷",
  "access": "[电车] JR浮间舟渡站步行20分钟，都营三田线高岛平站或西台站或莲根站步行20分钟",
  "weatherInfo": "少下雨了。恶劣天气下不顺延",
  "parking": "无",
  "price": "详见官网",
  "contact": "03-3579-2255 板橋区観光協会",
  "foodStalls": "有",
  "notes": "详见官网",
  "website": "https://itabashihanabi.jp/",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.798307,139.673254&center=35.798307,139.673254",
  "id": "1751169822998",
  "region": "tokyo",
  "activityType": "hanabi",
  "description": "与荒川对岸埼玉县户田市“户田桥花火大会”同时举行的烟花大会，是东京都内规模屈指可数的盛大活动，双方合计燃放约一万五千发烟花。现场可欣赏由日本顶级烟花师制作的艺术烟花、东京最大的大型烟花“尺玉”，以及压轴登场的“天空尼亚加拉”等精彩表演。发射地点距离观众席非常近，能感受到震撼心腹的爆炸声，也是其独特魅力之一。",
  "highlights": "将同时进行5个地方发射的广域星雷的质量和数量都进行升级，在开场和终曲上进行有震撼力的演出。此外，2025年还将燃放烟花，以纪念博洛尼亚友好城市交流20周年。",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://pbs.twimg.com/media/GrTB5BcXwAAqfav?format=jpg&name=large",
      "title": "第66回 板桥花火大会图片1",
      "alt": "第66回 板桥花火大会图片1",
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
  title: '第66回 板桥花火大会 - 日本活动指南',
  description: '荒川をはさんで対岸にある埼玉県戸田市の「戸田橋花火大会」と同時举办花火大会。東京都内屈指の規模を誇り、両岸で約1万5000発の花火が被燃放。恒例となっている日本最高峰の花火師が手掛けた「芸術玉」や東京最大級の大玉「尺五寸玉」、フィナーレを飾るワイド连发烟花「天空のナイアガラ」など、見どころが満載。打燃放げ場所が観客席に近いことから、おなかに響く音も醍醐味の一つ。',
};
