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
 * 1. 名称: 戸田橋花火大会　天空幻想（とだばしはなびたいかい　スカイファンタシア）
 * 2. 所在地: 〒335-0024　埼玉県戸田市
 * 3. 开催期间: 2025年8月2日　 19:00～20:30　※雨天中止（順延なし）
 * 4. 开催场所: 埼玉県戸田市　国道17号戸田橋上流荒川河川敷
 * 5. 交通方式: ＪＲ埼京線「戸田公園駅」步行20分（東側会場）或者40分～50分（西側会場）※混雑状況により異なる
 * 6. 主办方: 戸田橋花火大会実行委員会
 * 7. 料金: 有料観覧席有（会場内は全席有料）
 * 8. 联系方式: 戸田橋花火大会実行委員会事務局　048-431-0206
 * 9. 官方网站: https://www.todabashi-hanabi.jp/
 * 10. 谷歌地图: 35.800781,139.674973
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750946179969",
  name: "戸田橋花火大会　天空幻想（とだばしはなびたいかい　スカイファンタシア）",
  address: "〒335-0024　埼玉県戸田市",
  datetime: "2025年8月2日　 19:00～20:30　※雨天中止（順延なし）",
  venue: "埼玉県戸田市　国道17号戸田橋上流荒川河川敷",
  access: "ＪＲ埼京線「戸田公園駅」步行20分（東側会場）或者40分～50分（西側会場）※混雑状況により異なる",
  organizer: "戸田橋花火大会実行委員会",
  price: "有料観覧席有（会場内は全席有料）",
  contact: "戸田橋花火大会実行委員会事務局　048-431-0206",
  website: "https://www.todabashi-hanabi.jp/",
  googleMap: "https://maps.google.com/maps?q=35.800781,139.674973&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "为荒川夜空上色的“户田桥花火大会天空幻想”今年也将举行。与对岸的“鸟鸟花火大会”合起来，将会发放星光、音乐烟火、尺玉等首都圈最大规模的约1万5000发烟火。有两个只有在这里才能看到的活动的联合节目，如令人震撼的同步演出。东西地区也有不同的享受方式，东侧也有可以在眼前观赏烟火的新座位种类登场。在这里，您可以享受最好的烟火体验。※发射数量：1万5000发，去年1万5000发（※全部与花火大会合计）观众数：去年45万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://hanabi-navi.info/wp-content/uploads/2025/05/30339796_m-e1746797273379.jpg",
      title: "戸田橋花火大会　天空幻想（とだばしはなびたいかい　スカイファンタシア）图片1",
      alt: "戸田橋花火大会　天空幻想（とだばしはなびたいかい　スカイファンタシア）图片1",
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