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
 * 1. 名称: 朝霞市民祭典「彩夏祭」（あさかしみん祭典　さいかさい）
 * 2. 所在地: 〒351-0016　埼玉県朝霞市青葉台1-9-1付近、北原1-3、浜崎669-1
 * 3. 开催期间: 2025年8月1日～3日　 花火大会/2日19:15～20:15
 * 4. 开催场所: 埼玉県朝霞市　朝霞中央公園、青葉台公園および周辺　ほか
 * 5. 交通方式: 朝霞会場まで/東武東上線「朝霞駅」南口步行5分　北朝霞会場まで/ＪＲ武蔵野線「北朝霞駅」或者東武東上線「朝霞台駅」步行5分
 * 6. 主办方: 朝霞市コミュニティ協議会（朝霞市民祭典実行委員会）
 * 7. 料金: 有料観覧席有　※詳細は官网参照
 * 8. 联系方式: 朝霞市民祭典実行委員会事務局（朝霞市役所地域づくり支援課内）　048-463-2645
 * 9. 官方网站: https://saikasai.com/
 * 10. 谷歌地图: 35.790832,139.594207
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947635227",
  name: "朝霞市民祭典「彩夏祭」（あさかしみん祭典　さいかさい）",
  address: "〒351-0016　埼玉県朝霞市青葉台1-9-1付近、北原1-3、浜崎669-1",
  datetime: "2025年8月1日～3日　 花火大会/2日19:15～20:15",
  venue: "埼玉県朝霞市　朝霞中央公園、青葉台公園および周辺　ほか",
  access: "朝霞会場まで/東武東上線「朝霞駅」南口步行5分　北朝霞会場まで/ＪＲ武蔵野線「北朝霞駅」或者東武東上線「朝霞台駅」步行5分",
  organizer: "朝霞市コミュニティ協議会（朝霞市民祭典実行委員会）",
  price: "有料観覧席有　※詳細は官网参照",
  contact: "朝霞市民祭典実行委員会事務局（朝霞市役所地域づくり支援課内）　048-463-2645",
  website: "https://saikasai.com/",
  googleMap: "https://maps.google.com/maps?q=35.790832,139.594207&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "每年有73万人以上的来场者热闹的‘朝霞市民祭“彩夏祭”’，在市内各会场举办。以首次在本州引进的YOSAKOI Naruko舞蹈庆典“关八州YOSAKOI Festa”为首，举办了各种各样的活动。在第2天的晚上，将举行作为主要活动之一的烟火大会，持续约1小时的时间，预定要发射Star Mine和最大4号球等约9000发的烟火，可以体验近时降下的震撼力满溢的烟火。因为它是在城市里发射的，所以从车站到会场都很近，交通便利也很吸引人。※发射数：去年9000发观众数：去年73万人次",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://image.omatsurijapan.com/articleimg/2019/08/13-8-1200x900.jpg",
      title: "朝霞市民祭典「彩夏祭」（あさかしみん祭典　さいかさい）图片1",
      alt: "朝霞市民祭典「彩夏祭」（あさかしみん祭典　さいかさい）图片1",
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