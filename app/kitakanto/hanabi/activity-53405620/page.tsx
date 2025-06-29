import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750953405620
 * 生成时间: 2025/6/27 00:56:45
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第109回足利花火大会（あしかがはなびたいかい）
 * 2. 所在地: 〒326-0054　栃木県足利市伊勢南町
 * 3. 开催期间: 2025年8月2日　 19:15～20:50　※雨天時は翌日に順延
 * 4. 开催场所: 栃木県足利市　渡良瀬川河畔　田中橋下流
 * 5. 交通方式: ＪＲ両毛線「足利駅」から徒歩5分、或東武伊勢崎線「足利市駅」から徒歩10分、或東北自動車道「佐野藤岡IC」から車約20分、或北関東自動車道「足利IC」から車約10分
 * 6. 主办方: 足利花火大会実行委員会
 * 7. 料金: 有料観覧席有（問い合わせが必要）
 * 8. 联系方式: 足利花火大会実行委員会（足利商工会議所内）　0284-21-1354
 * 9. 官方网站: https://ashikaga.info/
 * 10. 谷歌地图: 36.328025,139.457238
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750953405620",
  name: "第109回足利花火大会（あしかがはなびたいかい）",
  address: "〒326-0054　栃木県足利市伊勢南町",
  datetime: "2025年8月2日　 19:15～20:50　※雨天時は翌日に順延",
  venue: "栃木県足利市　渡良瀬川河畔　田中橋下流",
  access: "ＪＲ両毛線「足利駅」から徒歩5分、或東武伊勢崎線「足利市駅」から徒歩10分、或東北自動車道「佐野藤岡IC」から車約20分、或北関東自動車道「足利IC」から車約10分",
  organizer: "足利花火大会実行委員会",
  price: "有料観覧席有（問い合わせが必要）",
  contact: "足利花火大会実行委員会（足利商工会議所内）　0284-21-1354",
  website: "https://ashikaga.info/",
  googleMap: "https://maps.google.com/maps?q=36.328025,139.457238&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "足利烟火大会创办于明治36年（1903年），是一个拥有120年以上传统和历史的烟火大会。作为关东地区屈指可数的烟花大会而广为人知，每年都有来自关东一带的众多观众前来观看，成为足利最热闹的一天。大约20，000支烟花（计划中）将照亮石贺的夜空，包括连续发射的5号烟花、同时发射的长玉、大玉和宽星地雷。“尼亚加拉”的高潮尤其令人叹为观止。※发射数：去年2万发观众数：去年45万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://pbs.twimg.com/media/GsMHXMlaUAA_vyg?format=jpg&name=medium",
      title: "第109回足利花火大会（あしかがはなびたいかい）图片1",
      alt: "第109回足利花火大会（あしかがはなびたいかい）图片1",
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
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;