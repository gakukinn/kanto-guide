import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 花见会详情页面
 * 数据库ID: cmc7okpxj0001vlj41zwu3leu
 * 生成时间: 2025/6/23 02:53:19
 * 模板: HanamiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 水郷佐原あやめ祭り
 * 2. 所在地: 〒287 - 0801 千葉県
 * 3. 开催期间: 2025年5月24日～6月22日 開園時間/8:00～18:00（入園は閉園の1時間前まで）
 * 4. 开催场所: 千葉県香取市 水郷佐原あやめパーク
 * 5. 交通方式: ＪＲ成田線「佐原駅」から車約25分、または東関東自動車道「佐原香取IC」・「大栄IC」もしくは圏央道「神崎IC」から車約30分
 * 6. 主办方: 一般社団法人水郷佐原観光協会
 * 7. 料金: 観覧無料
 * 8. 联系方式: 水郷佐原あやめパーク 0478-56-0411
 * 9. 官方网站: https://ayamepark.jp/
 * 10. 谷歌地图: https://www.google.com/search?q=site:https://ayamepark.jp/
 */

const DetailPage = () => {
  // 转换为UniversalActivityData格式
  const activityData = {
    id: "cmc7okpxj0001vlj41zwu3leu",
    name: "水郷佐原あやめ祭り",
    address: "〒287 - 0801 千葉県",
    datetime: "2025年5月24日～6月22日 開園時間/8:00～18:00（入園は閉園の1時間前まで）",
    venue: "千葉県香取市 水郷佐原あやめパーク",
    access: "ＪＲ成田線「佐原駅」から車約25分、または東関東自動車道「佐原香取IC」・「大栄IC」もしくは圏央道「神崎IC」から車約30分",
    organizer: "一般社団法人水郷佐原観光協会",
    price: "観覧無料",
    contact: "水郷佐原あやめパーク 0478-56-0411",
    website: "https://ayamepark.jp/",
    googleMap: "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dgsWMVHf7MhXgU&q=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dsite%3Ahttps%3A%2F%2Fayamepark.jp%2F",
    region: "chiba",
    description: "",
    themeColor: "pink",
    status: "active",
    media: [],
    createdAt: "2025-06-22T17:53:19.783Z",
    activityType: "hanami"
  };

  // 确定地区键
  const regionKey = "千葉県".includes('東京') || "千葉県".includes('东京') ? 'tokyo' :
                   "千葉県".includes('埼玉') ? 'saitama' :
                   "千葉県".includes('千葉') || "千葉県".includes('千叶') ? 'chiba' :
                   "千葉県".includes('神奈川') ? 'kanagawa' :
                   "千葉県".includes('茨城') || "千葉県".includes('栃木') || "千葉県".includes('群馬') ? 'kitakanto' :
                   "千葉県".includes('新潟') || "千葉県".includes('長野') || "千葉県".includes('山梨') ? 'koshinetsu' : 'tokyo';

  return (
    <div className="min-h-screen">
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanami"
      />
    </div>
  );
};

export default DetailPage;