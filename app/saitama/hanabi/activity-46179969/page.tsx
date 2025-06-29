import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750946179969
 * 生成时间: 2025/6/26 22:56:19
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）
 * 2. 所在地: 〒335-0024　埼玉県戸田市
 * 3. 开催期间: 2025年8月2日　 19:00～20:30　※雨天中止（順延なし）
 * 4. 开催场所: 埼玉県戸田市　国道17号戸田橋上流荒川河川敷
 * 5. 交通方式: ＪＲ埼京線「戸田公園駅」から徒歩20分（東側会場）もしくは40分～50分（西側会場）※混雑状況により異なる
 * 6. 主办方: 戸田橋花火大会実行委員会
 * 7. 料金: 有料観覧席あり（会場内は全席有料）
 * 8. 联系方式: 戸田橋花火大会実行委員会事務局　048-431-0206
 * 9. 官方网站: https://www.todabashi-hanabi.jp/
 * 10. 谷歌地图: 35.800781,139.674973
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750946179969",
  name: "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）",
  address: "〒335-0024　埼玉県戸田市",
  datetime: "2025年8月2日　 19:00～20:30　※雨天中止（順延なし）",
  venue: "埼玉県戸田市　国道17号戸田橋上流荒川河川敷",
  access: "ＪＲ埼京線「戸田公園駅」から徒歩20分（東側会場）もしくは40分～50分（西側会場）※混雑状況により異なる",
  organizer: "戸田橋花火大会実行委員会",
  price: "有料観覧席あり（会場内は全席有料）",
  contact: "戸田橋花火大会実行委員会事務局　048-431-0206",
  website: "https://www.todabashi-hanabi.jp/",
  googleMap: "https://maps.google.com/maps?q=35.800781,139.674973&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "荒川の夜空を彩る「戸田橋花火大会 Sky Fantasia」が、今年も開催されます。対岸の「いたばし花火大会」とあわせて、スターマイン、音楽花火、尺玉など、首都圏最大級の約1万5000発が打ち上げられます。迫力のシンクロ演出など、ここでしか見ることのできない2大会による合同プログラムが繰り広げられます。東西エリアで異なる楽しみ方もでき、東側には花火を目前で観賞できる新席種が登場します。思い出に残る最高の花火体験が満喫できます。 ※打ち上げ数：1万5000発、昨年度1万5000発（※いずれもいたばし花火大会との合計） 観客数：昨年度45万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://hanabi-navi.info/wp-content/uploads/2025/05/30339796_m-e1746797273379.jpg",
      title: "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）图片1",
      alt: "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）图片1",
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
  const regionKey = REGION_MAP["saitama"] || 'tokyo';

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