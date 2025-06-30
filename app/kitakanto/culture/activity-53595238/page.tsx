import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态文艺术详情页面
 * 数据库ID: recognition-culture-1750953595238
 * 生成时间: 2025/6/27 00:59:55
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）
 * 2. 所在地: 〒377-1611　群馬県嬬恋村干俣2401
 * 3. 开催期间: 2025年6月29日　 スタート/9:00～（順次）　※雨天決行
 * 4. 开催场所: 群馬県嬬恋村　東海大学嬬恋高原研修センター多目的グラウンド
 * 5. 交通方式: ＪＲ吾妻線「万座・鹿沢口駅」から車約30分、または上信越自動車「碓氷・軽井沢IC」から車約1時間
 * 6. 主办方: 嬬恋高原キャベツマラソン実行委員会、嬬恋村
 * 7. 料金: 一般（高校生以上）5500円、小中学生3500円（村民1000円）、親子ペア7000円（村民2000円）、夫婦ペア1万1000円　※エントリー期間/2月12日～5月15日（予定）、詳しくはホームページで要確認
 * 8. 联系方式: 嬬恋高原キャベツマラソン実行委員会事務局　0279-82-1293　（平日8:30～17:15）
 * 9. 官方网站: https://www.cabbage-marathon.jp/
 * 10. 谷歌地图: 36.548621,138.465197
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-culture-1750953595238",
  name: "第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）",
  address: "〒377-1611　群馬県嬬恋村干俣2401",
  datetime: "2025年6月29日　 スタート/9:00～（順次）　※雨天決行",
  venue: "群馬県嬬恋村　東海大学嬬恋高原研修センター多目的グラウンド",
  access: "ＪＲ吾妻線「万座・鹿沢口駅」から車約30分、または上信越自動車「碓氷・軽井沢IC」から車約1時間",
  organizer: "嬬恋高原キャベツマラソン実行委員会、嬬恋村",
  price: "一般（高校生以上）5500円、小中学生3500円（村民1000円）、親子ペア7000円（村民2000円）、夫婦ペア1万1000円　※エントリー期間/2月12日～5月15日（予定）、詳しくはホームページで要確認",
  contact: "嬬恋高原キャベツマラソン実行委員会事務局　0279-82-1293　（平日8:30～17:15）",
  website: "https://www.cabbage-marathon.jp/",
  googleMap: "https://maps.google.com/maps?q=36.548621,138.465197&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "標高700～1400mに位置する日本一の夏秋キャベツの産地として知られる嬬恋村で、「第17回嬬恋高原キャベツマラソン」が開催されます。2km、5.4km、10km、ハーフの4コースがあり、東海大学嬬恋高原研修センター多目的グラウンドをスタートします。アップダウンが多くハードなコースで、目前には浅間山や四阿山などの名峰がそびえる雄大な景色の中、熱戦が繰り広げられます。ゴール後は近隣の温泉で、疲れた体をリフレッシュできます。 ※会場まで臨時バス運行（詳しくは嬬恋高原キャベツマラソンのホームページで要確認）",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://furusato.jreast.co.jp/html/upload/save_image/shop/17246/product/1056032/0128122605_67984e4d4f0aa.jpg",
      title: "第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）图片1",
      alt: "第17回嬬恋高原キャベツマラソン（つまごいこうげんキャベツマラソン）图片1",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="culture"
      />
    </div>
  );
};

export default DetailPage;