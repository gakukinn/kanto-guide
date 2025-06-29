import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947635227
 * 生成时间: 2025/6/26 23:20:35
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 朝霞市民まつり「彩夏祭」（あさかしみんまつり　さいかさい）
 * 2. 所在地: 〒351-0016　埼玉県朝霞市青葉台1-9-1付近、北原1-3、浜崎669-1
 * 3. 开催期间: 2025年8月1日～3日　 花火大会/2日19:15～20:15
 * 4. 开催场所: 埼玉県朝霞市　朝霞中央公園、青葉台公園および周辺　ほか
 * 5. 交通方式: 朝霞会場まで/東武東上線「朝霞駅」南口から徒歩5分　北朝霞会場まで/ＪＲ武蔵野線「北朝霞駅」もしくは東武東上線「朝霞台駅」から徒歩5分
 * 6. 主办方: 朝霞市コミュニティ協議会（朝霞市民まつり実行委員会）
 * 7. 料金: 有料観覧席あり　※詳細はホームページ参照
 * 8. 联系方式: 朝霞市民まつり実行委員会事務局（朝霞市役所地域づくり支援課内）　048-463-2645
 * 9. 官方网站: https://saikasai.com/
 * 10. 谷歌地图: 35.790832,139.594207
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947635227",
  name: "朝霞市民まつり「彩夏祭」（あさかしみんまつり　さいかさい）",
  address: "〒351-0016　埼玉県朝霞市青葉台1-9-1付近、北原1-3、浜崎669-1",
  datetime: "2025年8月1日～3日　 花火大会/2日19:15～20:15",
  venue: "埼玉県朝霞市　朝霞中央公園、青葉台公園および周辺　ほか",
  access: "朝霞会場まで/東武東上線「朝霞駅」南口から徒歩5分　北朝霞会場まで/ＪＲ武蔵野線「北朝霞駅」もしくは東武東上線「朝霞台駅」から徒歩5分",
  organizer: "朝霞市コミュニティ協議会（朝霞市民まつり実行委員会）",
  price: "有料観覧席あり　※詳細はホームページ参照",
  contact: "朝霞市民まつり実行委員会事務局（朝霞市役所地域づくり支援課内）　048-463-2645",
  website: "https://saikasai.com/",
  googleMap: "https://maps.google.com/maps?q=35.790832,139.594207&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "例年73万人以上の来場者でにぎわう『朝霞市民まつり「彩夏祭」』が、市内各会場で開催されます。本州ではじめて取り入れたよさこい鳴子踊りの祭典である「関八州よさこいフェスタ」をはじめ、さまざまなイベントが催されます。2日目の夜には、メインイベントの一つとなる花火大会が行われ、およそ1時間にわたり、スターマインや最大4号玉など、約9000発の打ち上げが予定されており、間近で降り注ぐような迫力満点の花火を体験できます。市街地で打ち上げられるため、駅から会場までが近く、好アクセスな点も魅力です。 ※打ち上げ数：昨年度9000発 観客数：昨年度73万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://image.omatsurijapan.com/articleimg/2019/08/13-8-1200x900.jpg",
      title: "朝霞市民まつり「彩夏祭」（あさかしみんまつり　さいかさい）图片1",
      alt: "朝霞市民まつり「彩夏祭」（あさかしみんまつり　さいかさい）图片1",
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
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;