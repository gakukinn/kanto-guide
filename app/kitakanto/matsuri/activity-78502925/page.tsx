import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1751378502925
 * 生成时间: 2025/7/1 23:01:42
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 桐生八木節まつり（きりゅうやぎぶしまつり）
 * 2. 所在地: 〒376-0031　群馬県桐生市本町、末広町　ほか
 * 3. 开催期间: 2025年8月1日～3日　 ※催しにより日時が異なる（詳細はホームページで要確認）
 * 4. 开催场所: 群馬県桐生市　本町通り、末広通り、市内各所
 * 5. 交通方式: ＪＲ両毛線「桐生駅」下車、または東武桐生線「新桐生駅」下車
 * 6. 主办方: 桐生八木節まつり協賛会
 * 7. 料金: 未设置
 * 8. 联系方式: 桐生市役所観光交流課　0277-44-0754、桐生商工会議所　0277-45-1201　※開催中の問い合わせは桐生八木節まつり協賛会事務局0277-46-5215へ
 * 9. 官方网站: http://kiryu-maturi.net/
 * 10. 谷歌地图: 36.410501,139.338471
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1751378502925",
  name: "桐生八木節祭（きりゅうやぎぶしまつり）",
  address: "〒376-0031　群馬県桐生市本町、末広町",
  datetime: "2025年8月1日～3日　 ※不同活动的举办时间各不相同（详情请确认官方网站）。",
  venue: "群馬県桐生市　本町通り、末広通り、市内各所",
  access: "ＪＲ両毛線「桐生駅」下車、或者東武桐生線「新桐生駅」下車",
  organizer: "桐生八木節まつり協賛会",
  price: "",
  contact: "桐生市役所観光交流課　0277-44-0754、桐生商工会議所　0277-45-1201　※開催中の問い合わせは桐生八木節まつり協賛会事務局0277-46-5215へ",
  website: "http://kiryu-maturi.net/",
  googleMap: "https://maps.google.com/maps?q=36.410501,139.338471&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "代表桐生夏季的桐生八木节祭即将举办。活动包括来自群马县内外参与者展示自豪音头的全日本八木节竞演大会、桐生祇园神轿巡游、桐生织物大特卖、八木节舞蹈、八木节儿童大会、舞蹈八木节等将在市内各地精彩上演。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/0f970f7b-6f11-4f17-91df-a50a8da4ef41/0_2.png",
      title: "桐生八木節まつり（きりゅうやぎぶしまつり）图片1",
      alt: "桐生八木節まつり（きりゅうやぎぶしまつり）图片1",
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
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;