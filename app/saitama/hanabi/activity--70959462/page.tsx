/**
 * 熊谷花火大会 详情页面
 * 自动生成于 2025-06-29T04:22:39.464Z
 * 使用模板: WalkerPlusHanabiTemplate
 */
import WalkerPlusHanabiTemplate from '../../../../src/components/WalkerPlusHanabiTemplate';

const pageData = {
  "name": "熊谷花火大会",
  "fireworksCount": "約1万発",
  "fireworksTime": "120分(変更になる場合有)",
  "expectedVisitors": "約42万人",
  "date": "2025年8月9日(土)",
  "time": "下午7：00至21：00（预定）",
  "venue": "荒川河畔(荒川大橋下流)",
  "access": "[电车]从JR·秩父铁路熊谷站南口步行5分钟[乘车]从关越道东松山IC约30分钟",
  "weatherInfo": "因恶劣天气而延期的情况下，将于2025年8月10日（星期日）举行，进一步延期的情况下，将于16日（星期六）、17日（星期日）举行",
  "parking": "* 2 500美元。在官方网站上确认。",
  "price": "在往年的收费展览席销售期（6月下旬），将从众筹销售中剩余的座位进行第二次销售。详情请浏览官方网站。",
  "contact": "048-594-6677 熊谷市観光協会",
  "foodStalls": "有",
  "notes": "详见官网",
  "website": "https://www.oideyo-熊谷.com/cate-spot/303/",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=36.131809,139.383212&center=36.131809,139.383212",
  "id": "1751170959462",
  "region": "saitama",
  "activityType": "hanabi",
  "description": "这是自1948年（昭和23年）持续的传统活动，在埼玉县拥有悠久历史的烟火大会。传达婚礼和生日信息的“信息烟花”也是特色菜。会场的景色很好，即使从远处也能看到，漆黑的夜空中也可以看到壮观的烟花。此外，河岸上还有约500家夜店林立，令人印象深刻。",
  "highlights": "将发射尺玉和星马因等约1万发。信息烟花和多个赞助者的“斯库玛姆!“广域星马因”等看点满满的烟花升起。",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://cdn.midjourney.com/1fa036a7-14dd-450b-a131-6191dd73fdbc/0_1.png",
      "title": "熊谷花火大会图片1",
      "alt": "熊谷花火大会图片1",
      "caption": ""
    }
  ],
  "detailLink": "/saitama/hanabi/activity--70959462",
  "createdAt": "2025-06-29T04:22:39.462Z",
  "source": "walkerplus-generator"
} as const;

export default function DetailPage() {
  return (
    <WalkerPlusHanabiTemplate
      data={pageData}
      regionKey="saitama"
      activityKey="hanabi"
    />
  );
}

export const metadata = {
  title: '熊谷花火大会 - 日本活动指南',
  description: '1948年(昭和23年)から続く伝統の活动で、埼玉県では長い歴史を誇る花火大会。ウエディングや誕生日のメッセージを伝える「メッセージ花火」も名物だ。会場は見晴らしがよく遠くからでも眺められ、漆黒の夜空に大迫力の花火が映える。また、河川敷には約500の夜店がズラリと軒を並べ、圧巻だ。',
};
