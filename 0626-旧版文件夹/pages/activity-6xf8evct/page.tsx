import React from 'react';
import CultureArtDetailTemplate from '../../../../src/components/CultureArtDetailTemplate';

/**
 * 文艺术详情页面
 * 数据库ID: cmc96a2ec000hvlr06xf8evct
 * 生成时间: 2025/6/24 20:47:22
 * 模板: CultureArtDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）
 * 2. 所在地: 〒377-1611　群馬県嬬恋村干俣2401
 * 3. 开催期间: 2025年6月29日　 スタート/9:00～（順次）　※雨天決行
 * 4. 开催场所: 群馬県嬬恋村　東海大学嬬恋高原研修センター多目的グラウンド
 * 5. 交通方式: ＪＲ吾妻線「万座・鹿沢口駅」から車約30分、または上信越自動車「碓氷・軽井沢IC」から車約1時間
 * 6. 主办方: 嬬恋高原キャベツマラソン実行委員会、嬬恋村
 * 7. 料金: 一般（高校生以上）5500円、小中学生3500円（村民1000円）、親子ペア7000円（村民2000円）、夫婦ペア1万1000円　※エントリー期間/2月12日～5月15日（予定）、詳しくはホームページで要確認
 * 8. 联系方式: 嬬恋高原キャベツマラソン実行委員会事務局　0279-82-1293　（平日8:30～17:15）
 * 9. 官方网站: で要確認
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.465197!3d36.548621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687727052!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96a2ec000hvlr06xf8evct",
  name: "第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）",
    description: "",
  address: "〒377-1611　群馬県嬬恋村干俣2401",
  datetime: "2025年6月29日　 スタート/9:00～（順次）　※雨天決行",
  venue: "群馬県嬬恋村　東海大学嬬恋高原研修センター多目的グラウンド",
  access: "ＪＲ吾妻線「万座・鹿沢口駅」から車約30分、または上信越自動車「碓氷・軽井沢IC」から車約1時間",
  organizer: "嬬恋高原キャベツマラソン実行委員会、嬬恋村",
  price: "一般（高校生以上）5500円、小中学生3500円（村民1000円）、親子ペア7000円（村民2000円）、夫婦ペア1万1000円　※エントリー期間/2月12日～5月15日（予定）、詳しくはホームページで要確認",
  contact: "嬬恋高原キャベツマラソン実行委員会事務局　0279-82-1293　（平日8:30～17:15）",
  website: "で要確認",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.465197!3d36.548621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687727052!5m2!1sja!2sjp",
  region: "kitakanto",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://furusato.jreast.co.jp/html/upload/save_image/shop/17246/product/1056033/0128122950_67984f2e21999.jpg",
      title: "第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）图片1",      alt: "第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）图片1",
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
  const regionKey = REGION_MAP["kitakanto"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <CultureArtDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;