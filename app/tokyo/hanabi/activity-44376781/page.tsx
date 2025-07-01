import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750944376781
 * 生成时间: 2025/6/26 22:26:16
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 隅田川花火大会（すみだがわはなびたいかい）
 * 2. 所在地: 〒111-0033　東京都墨田区・台東区
 * 3. 开催期间: 2025年7月26日　 19:00～20:30（第1会場打上開始/19:00～、第2会場打上開始/19:30～）　※荒天中止。実施可否については、原則当日8:00に判断。
 * 4. 开催场所: 東京都　隅田川（第1会場/桜橋下流～言問橋上流、第2会場/駒形橋下流～厩橋上流）
 * 5. 交通方式: 第1会場/地下鉄銀座線「浅草駅」或者地下鉄都営浅草線「浅草駅」・「本所吾妻橋駅」・「蔵前駅」下車、或東武伊勢崎線「浅草駅」下車　第2会場/ＪＲ総武線「両国駅」・「浅草橋駅」下車、或地下鉄都営浅草線「浅草駅」・「蔵前駅」或者地下鉄都営大江戸線「両国駅」・「蔵前駅」下車
 * 6. 主办方: 隅田川花火大会実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 隅田川花火大会実行委員会事務局　03-5246-1111　（代表）
 * 9. 官方网站: https://www.sumidagawa-hanabi.com/
 * 10. 谷歌地图: 35.716462,139.806937
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750944376781",
  name: "隅田川花火大会（すみだがわはなびたいかい）",
  address: "〒111-0033　東京都墨田区・台東区",
  datetime: "2025年7月26日　 19:00～20:30（第1会場打上開始/19:00～、第2会場打上開始/19:30～）　※荒天中止。実施可否については、原則当日8:00に判断。",
  venue: "東京都　隅田川（第1会場/桜橋下流～言問橋上流、第2会場/駒形橋下流～厩橋上流）",
  access: "第1会場/地下鉄銀座線「浅草駅」或者地下鉄都営浅草線「浅草駅」・「本所吾妻橋駅」・「蔵前駅」下車、或東武伊勢崎線「浅草駅」下車　第2会場/ＪＲ総武線「両国駅」・「浅草橋駅」下車、或地下鉄都営浅草線「浅草駅」・「蔵前駅」或者地下鉄都営大江戸線「両国駅」・「蔵前駅」下車",
  organizer: "隅田川花火大会実行委員会",
  price: "",
  contact: "隅田川花火大会実行委員会事務局　03-5246-1111　（代表）",
  website: "https://www.sumidagawa-hanabi.com/",
  googleMap: "https://maps.google.com/maps?q=35.716462,139.806937&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "作为继承传统的两国川开花火大会的活动而闻名的“隅田川花火大会”，在2个会场举行。第1会场与第2会场合起来的烟火发射数量约为2万发。在第1会场，还将举行由两国烟火有关的业者，以及在国内代表性花火大会上取得优秀成绩的10家业者组成的烟火活动。※发射数量：2万发（两场合计，包含活动球200发）观众数：95万人（两场合计）",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2012%E5%B9%B4%E9%9A%85%E7%94%B0%E5%B7%9D%E8%8A%B1%E7%81%AB%E5%A4%A7%E4%BC%9A.jpg/1200px-2012%E5%B9%B4%E9%9A%85%E7%94%B0%E5%B7%9D%E8%8A%B1%E7%81%AB%E5%A4%A7%E4%BC%9A.jpg",
      title: "隅田川花火大会（すみだがわはなびたいかい）图片1",
      alt: "隅田川花火大会（すみだがわはなびたいかい）图片1",
      caption: ""
    }
  ]
};

  // 确定地区键 - 使用标准化的地区映射
  const REGION_MAP = {
    'tokyo': 'tokyo',
    'saitama': 'saitama', 
    'chiba': 'chiba',
    'kanagawa': 'kanagawa',
    'kitakanto': 'kitakanto',
    'koshinetsu': 'koshinetsu',
    '東京都': 'tokyo',
    '東京': 'tokyo',
    '埼玉県': 'saitama',
    '埼玉': 'saitama',
    '千葉県': 'chiba',
    '千葉': 'chiba',
    '神奈川県': 'kanagawa',
    '神奈川': 'kanagawa',
    '茨城県': 'kitakanto',
    '栃木県': 'kitakanto',
    '群馬県': 'kitakanto',
    '新潟県': 'koshinetsu',
    '長野県': 'koshinetsu',
    '山梨県': 'koshinetsu'
  };
  const regionKey = REGION_MAP["tokyo"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;