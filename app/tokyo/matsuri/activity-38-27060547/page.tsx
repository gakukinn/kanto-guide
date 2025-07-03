import WalkerPlusMatsuriTemplate from '../../../../src/components/WalkerPlusMatsuriTemplate';
import { Metadata } from 'next';

const pageData = {
  "name": "第38回 下町七夕祭 合羽桥本通",
  "reservationSystem": "予約不要",
  "viewingPoints": "東京晴空塔を背景にした景色",
  "expectedVisitors": "約12万2000人(2日間合計)",
  "date": "2025年7月5日(土)・6日(日) 七夕飾りは7月4日(金)～8日(火)まで展示",
  "time": "10:00～19:00",
  "venue": "かっぱ橋本通り",
  "access": "【電車】JR上野駅から徒歩5分。筑波快线浅草駅から徒歩すぐ",
  "weatherInfo": "雨天時はイベントの内容が変更、中止になる可能性あり",
  "parking": "无",
  "price": "入場無料",
  "contact": "03-5246-1111 ときめきたいとうフェスタ事務局(台東区都市交流課内 平日9:00～17:00)",
  "foodStalls": "有",
  "notes": "详见官网",
  "spotName": "かっぱ橋本通り",
  "spotAddress": "東京都台東区",
  "website": "https://shitamachi-tanabata.com/",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.714867,139.787043&center=35.714867,139.787043",
  "id": "1751527060547",
  "region": "tokyo",
  "activityType": "matsuri",
  "description": "连接浅草与上野的合羽桥本通在七夕祭期间将实施步行者天堂，街道两旁以色彩缤纷的七夕装饰点缀，充满节日氛围。7月5日（周六）将举办盛大的游行，从上野至浅草方向，包含当地小学鼓笛队、幼儿园儿童的七夕装扮游行、警视厅白摩托车队及警视厅乐队等队伍巡游。7月6日（周日）则有充满活力的阿波舞表演，以及新潟县佐渡岛传统的佐渡御笠流动盆舞，此外还有舞蹈、搞笑等街头表演丰富节日内容。期间商店街各处设置了竹枝和许愿短笺，游客可自由写下愿望悬挂。会场内还有众多美食摊位，可以一边观赏游行一边享受庙会乐趣。",
  "highlights": "以东京晴空塔为背景上演的浅草雷连阿波舞表演极具震撼力，舞者们身着华丽服装，带来热情洋溢的舞蹈，为七夕夜增添难忘的精彩回忆。",
  "themeColor": "orange",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://i0.wp.com/tokyo-trip.org/wp-content/uploads/2019/06/shitamachi-tanabata1.jpg?w=1920&ssl=1",
      "title": "第38回 下町七夕まつり かっぱ橋本通り图片1",
      "alt": "第38回 下町七夕まつり かっぱ橋本通り图片1",
      "caption": ""
    }
  ],
  "detailLink": "/tokyo/matsuri/activity-38-27060547",
  "createdAt": "2025-07-03T07:17:40.548Z",
  "source": "walkerplus-generator"
} as const;

export const metadata: Metadata = {
  title: '第38回 下町七夕まつり かっぱ橋本通り | TOKYO祭典活动指南',
  description: '浅草から上野までを結ぶかっぱ橋本通りが歩行者天国となり、色鮮やかな七夕飾りで彩られる七夕まつり。7月5日(土)は、地元小学校の鼓笛隊をはじめ、幼稚園の園児による七夕仮装行列や、警視庁白バイ隊、警視庁音楽隊などが上野側から浅草側までを練り歩くパレードが実施される。6日(日)は、活気ある阿波踊りや、新潟県の佐渡島に伝わる盆踊りの佐渡おけさの流し踊りが行われるほか、ダンスやお笑いなどのストリートパフォーマンスが披露される。期間中は商店街各所に笹竹と短冊が用意され、自由に願い事を記入することができる。会場にはたくさんの模擬店が立ち並び、パレードと一緒に模擬店を楽しむこともできる。',
  keywords: '第38回 下町七夕まつり かっぱ橋本通り, 祭典, tokyo, 传统活动, 日本',
  openGraph: {
    title: '第38回 下町七夕まつり かっぱ橋本通り',
    description: '浅草から上野までを結ぶかっぱ橋本通りが歩行者天国となり、色鮮やかな七夕飾りで彩られる七夕まつり。7月5日(土)は、地元小学校の鼓笛隊をはじめ、幼稚園の園児による七夕仮装行列や、警視庁白バイ隊、警視庁音楽隊などが上野側から浅草側までを練り歩くパレードが実施される。6日(日)は、活気ある阿波踊りや、新潟県の佐渡島に伝わる盆踊りの佐渡おけさの流し踊りが行われるほか、ダンスやお笑いなどのストリートパフォーマンスが披露される。期間中は商店街各所に笹竹と短冊が用意され、自由に願い事を記入することができる。会場にはたくさんの模擬店が立ち並び、パレードと一緒に模擬店を楽しむこともできる。',
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

// Force rebuild - 2025-01-03