import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750948448154
 * 生成时间: 2025/6/26 23:34:08
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 手賀沼花火大会2025（てがぬまはなびたいかい）
 * 2. 所在地: 〒277-0011　千葉県柏市
 * 3. 开催期间: 2025年8月2日　 19:00～20:10　※雨天・荒天中止
 * 4. 开催场所: 千葉県柏市　柏会場（手賀沼自然ふれあい緑道）、我孫子市　我孫子会場（手賀沼公園・手賀沼横丁など）
 * 5. 交通方式: 柏会場（有料観覧席）/ＪＲ常磐線「北柏駅」から徒歩25分、柏会場（一般観覧席）/ＪＲ常磐線「柏駅」東口から「沼南方面行」の東武巴士「大井停留所」～徒歩20分、我孫子会場/ＪＲ常磐線「我孫子駅」南口から徒歩10分
 * 6. 主办方: 手賀沼花火大会実行委員会（柏市、我孫子市、柏商工会議所、柏市沼南商工会、我孫子市商工会）
 * 7. 料金: 有料観覧席有　※詳しくはホームページで要確認
 * 8. 联系方式: 柏商工会議所　04-7162-3325、我孫子市商工会　04-7182-3131
 * 9. 官方网站: https://teganuma-hanabi.kashiwa-cci.or.jp/
 * 10. 谷歌地图: 35.865227,139.994443
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750948448154",
  name: "手賀沼花火大会2025（てがぬまはなびたいかい）",
  address: "〒277-0011　千葉県柏市",
  datetime: "2025年8月2日　 19:00～20:10　※雨天・荒天中止",
  venue: "千葉県柏市　柏会場（手賀沼自然ふれあい緑道）、我孫子市　我孫子会場（手賀沼公園・手賀沼横丁など）",
  access: "柏会場（有料観覧席）/ＪＲ常磐線「北柏駅」から徒歩25分、柏会場（一般観覧席）/ＪＲ常磐線「柏駅」東口から「沼南方面行」の東武巴士「大井停留所」～徒歩20分、我孫子会場/ＪＲ常磐線「我孫子駅」南口から徒歩10分",
  organizer: "手賀沼花火大会実行委員会（柏市、我孫子市、柏商工会議所、柏市沼南商工会、我孫子市商工会）",
  price: "有料観覧席有　※詳しくはホームページで要確認",
  contact: "柏商工会議所　04-7162-3325、我孫子市商工会　04-7182-3131",
  website: "https://teganuma-hanabi.kashiwa-cci.or.jp/",
  googleMap: "https://maps.google.com/maps?q=35.865227,139.994443&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "围绕着手贺沼举行的柏市和我子市的夏季特色“手贺沼烟花大会”。在平成30年（2018年）被选定为“想留给下一代的‘千叶文化资产’”的烟花大会。梦幻般的水下烟花，以及连续发射数百个烟花的Ultra Jumbo Star Mine，包括Shakugama在内的华丽烟花，将为夜空增添色彩。* 并非所有场地都有停车位。请不要开车来这里。※发射数：13，500发，去年13，500发，观众数：48万人，去年48万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/40045328-1728-4970-a02f-a047587b806b/0_0.png",
      title: "手賀沼花火大会2025（てがぬまはなびたいかい）图片1",
      alt: "手賀沼花火大会2025（てがぬまはなびたいかい）图片1",
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
  const regionKey = REGION_MAP["chiba"] || 'tokyo';

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