import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

// 页面元数据
export const metadata = {
  title: '第51回水戸のあじさい祭典 | 北关东花见会指南',
  description: '第51回水戸のあじさい祭典是位于〒310-0052　茨城県水戸市松本町13-19的知名观赏胜地，每年夏季2025年6月7日～29日期间吸引众多游客前来观赏。这里的景色优美，約100種類6,000株の紫陽花品种丰富，是体验自然观赏文化的绝佳场所。',
  keywords: '第51回水戸のあじさい祭典, 花见会, 北关东, 樱花, 日本花见',
  openGraph: {
    title: '第51回水戸のあじさい祭典 | 北关东花见会',
    description: '第51回水戸のあじさい祭典是位于〒310-0052　茨城県水戸市松本町13-19的知名观赏胜地，每年夏季2025年6月7日～29日期间吸引众多游客前来观赏。这里的景色优美，約100種類6,000株の紫陽花品种丰富，是体验自然观赏文化的绝佳场所。',
    type: 'article',
    locale: 'zh_CN',
  },
};

// 第51回水戸のあじさい祭典 详情页面数据
const hanamiData = {
  "id": "cmc76havw0001vl5keikxtygf",
  "title": "第51回水戸のあじさい祭典",
  "name": "第51回水户的魅力",
  "englishName": "The 51st 水户 Hydrangea Festival",
  "_sourceData": {
    "japaneseName": "第51回水戸のあじさい祭典",
    "japaneseDescription": ""
  },
  "date": "待确认",
  "dates": "待确认",
  "endDate": "",
  "viewingSeason": "夏季",
  "peakTime": "2025年6月7日～29日",
  "sakuraVariety": "約100種類6,000株の紫陽花",
  "location": "〒310-0052　茨城県水戸市松本町13-19",
  "category": "hanami",
  "expectedVisitors": "数万人",
  "venue": "310-0052 13-19松本町，水户，茨城",
  "prefecture": "北関東",
  "access": {
    "train": "ＪＲ「水戸駅」北口7番乗り場から「栄町経由茨大・渡里行」の茨城交通巴士約15分「保和苑入口」～徒歩4分",
    "car": "常磐自動車道「水戸IC」から国道50号大工町交差点経由車約20分"
  },
  "wantToVisit": 0,
  "haveVisited": 0,
  "rank": 0,
  "highlights": [
    "無料観賞",
    "多品種の紫陽花",
    "歴史ある庭園",
    "アクセス良好"
  ],
  "features": [
    "最佳观赏期：2025年6月7日～29日",
    "观赏品种：約100種類6,000株の紫陽花"
  ],
  "tips": {
    "venue": "水户市保和苑及周边史迹",
    "bestTime": "6月7日～29日",
    "varieties": "約100種類6,000株の紫陽花",
    "price": "免费",
    "features": [
      "無料観賞",
      "多品種の紫陽花",
      "歴史ある庭園",
      "アクセス良好"
    ],
    "notes": "在水户市的保和苑及周边史迹举办的紫阳花祭"
  },
  "description": "第51届水户棒球节是位于茨城县水户市松本町13 - 19的著名观赏胜地，每年夏季2025年6月7日至29日期间吸引观众多游客前前来观看。这里的景色优美，约100种类6，000株的绣球品种丰富，是体验自然观赏文化的绝佳场所。",
  "media": [],
  "website": "https://www.city.mito.lg.jp/site/kankouinfo/94415.html",
  "contact": {
    "organizer": "水戸のあじさい祭典実行委員会",
    "phone": "029-224-1111",
    "office": "事務局（水戸市産業経済部観光課）",
    "website": "https://www.city.mito.lg.jp/site/kankouinfo/94415.html"
  },
  "mapInfo": {
    "address": "〒310-0052　茨城県水戸市松本町13-19",
    "coordinates": {
      "lat": 36.391576,
      "lng": 140.455102,
      "source": "verified"
    },
    "mapUrl": "https://maps.google.com/?q=36.391576,140.455102",
    "coordsSource": "verified"
  },
  "likes": 0
};

export default function HanamiEventPage() {
  return (
          <UniversalStaticDetailTemplate 
        data={hanamiData as any}
        regionKey="kitakanto"
        activityKey="hanami"
    />
  );
}
