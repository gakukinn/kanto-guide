import WalkerPlusMatsuriTemplate from '../../../../src/components/WalkerPlusMatsuriTemplate';
import { Metadata } from 'next';

const pageData = {
  "name": "第74回 江户风情纳凉大会 上野夏日祭 上野恩赐公园不忍池畔",
  "reservationSystem": "予約不要",
  "viewingPoints": "不忍池の蓮",
  "expectedVisitors": "約1万5000人",
  "date": "2025年7月11日(金)～8月11日(祝) 日程は因活动而异",
  "time": "因活动而异",
  "venue": "上野恩賜公園不忍池畔",
  "access": "【電車】JR・東京地铁上野駅からすぐ 【車】首都高速道路1号上野線上野出入口から約4分、入谷出入口から約5分",
  "weatherInfo": "当日の天候により中止の場合あり",
  "parking": "无",
  "price": "入場無料 一部事件は有料",
  "contact": "03-3833-0030 上野観光連盟",
  "foodStalls": "有",
  "notes": "详见官网",
  "spotName": "上野恩賜公園不忍池畔",
  "spotAddress": "東京都台東区",
  "website": "https://ueno.or.jp/",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.712336,139.772326&center=35.712336,139.772326",
  "id": "1751523819113",
  "region": "tokyo",
  "activityType": "matsuri",
  "description": "在上野恩赐公园举行的“江户风情纳凉大会上野夏日祭”，是无论男女老少、全家都能尽情享受的夏季盛会。节日期间的周五、周六、周日及节假日会开设庙会摊位，可在美食区品尝丰富的屋台美食。不忍池旁的水上音乐堂将每日举办不同主题的音乐演出、戏剧等多种表演。此外，还有在弁天堂举行的和太鼓演奏、大道艺表演，纳凉浴衣摄影会、日光猴子军团杂技、古董市集、放水灯、冰雕大赛等丰富多彩的活动。会场悬挂风铃，傍晚高挂的提灯点亮后，营造出梦幻般的夏夜氛围。",
  "highlights": "在冰雕大赛中，拥有冰雕技艺的料理师们会在50分钟内将约135公斤重的冰块雕刻成精美细致的作品，游客可现场观赏这一紧张而精彩的制作过程，欣赏美丽的冰雕艺术品。",
  "themeColor": "orange",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://cdn.midjourney.com/e828832c-9334-4b40-b7f9-025c4676c896/0_3.png",
      "title": "第74回 江戸趣味納涼大会うえの夏まつり 上野恩賜公園不忍池畔图片1",
      "alt": "第74回 江戸趣味納涼大会うえの夏まつり 上野恩賜公園不忍池畔图片1",
      "caption": ""
    }
  ],
  "detailLink": "/tokyo/matsuri/activity-74-23819113",
  "createdAt": "2025-07-03T06:23:39.115Z",
  "source": "walkerplus-generator"
} as const;

export const metadata: Metadata = {
  title: '第74回 江戸趣味納涼大会うえの夏まつり 上野恩賜公園不忍池畔 | TOKYO祭典活动指南',
  description: '上野恩賜公園で縁日や日替りステージ事件が行われ、老若男女問わず家族みんなで楽しめる江戸趣味納涼大会うえの夏まつり。金土日祝限定で縁日が開催され、飲食ブースで屋台グルメを味わうことができる。また、不忍池横の水上音楽堂では音楽ライブや、演劇などの幅広いジャンルの催しが日替わりで行われる。そのほか、和太鼓の演奏が披露される弁天堂大道芸、納涼ゆかた撮影会、日光さる軍団さる回し、骨董市、灯ろう流し、氷の彫刻コンクール大会など、さまざまな事件が楽しめる。会場には風鈴が飾られるほか、夕方には高張提灯が点灯し、幻想的な光景が広がる。',
  keywords: '第74回 江戸趣味納涼大会うえの夏まつり 上野恩賜公園不忍池畔, 祭典, tokyo, 传统活动, 日本',
  openGraph: {
    title: '第74回 江戸趣味納涼大会うえの夏まつり 上野恩賜公園不忍池畔',
    description: '上野恩賜公園で縁日や日替りステージ事件が行われ、老若男女問わず家族みんなで楽しめる江戸趣味納涼大会うえの夏まつり。金土日祝限定で縁日が開催され、飲食ブースで屋台グルメを味わうことができる。また、不忍池横の水上音楽堂では音楽ライブや、演劇などの幅広いジャンルの催しが日替わりで行われる。そのほか、和太鼓の演奏が披露される弁天堂大道芸、納涼ゆかた撮影会、日光さる軍団さる回し、骨董市、灯ろう流し、氷の彫刻コンクール大会など、さまざまな事件が楽しめる。会場には風鈴が飾られるほか、夕方には高張提灯が点灯し、幻想的な光景が広がる。',
    type: 'article',
    locale: 'zh_CN',
  },
};

export default function DetailPage() {
  return (
    <WalkerPlusMatsuriTemplate
      data={pageData}
      regionKey="tokyo"
      activityKey="matsuri"
    />
  );
}