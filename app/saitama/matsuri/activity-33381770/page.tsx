import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750933381770
 * 生成时间: 2025/6/26 19:23:01
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 本庄祇園祭典（ほんじょうぎおん祭典）
 * 2. 所在地: 〒367-0053　埼玉県本庄市中央、銀座
 * 3. 开催期间: 2025年7月12日～13日　 【12日】16:00～22:00　　【13日】14:00～22:00
 * 4. 开催场所: 埼玉県本庄市　本庄市街地
 * 5. 交通方式: ＪＲ高崎線「本庄駅」北口步行5分
 * 6. 主办方: 本庄祇園祭典実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 本庄市観光協会（本庄市役所商工観光課内）　0495-25-1111
 * 9. 官方网站: https://www.honjo-kanko.jp/event/honjogionmatsuri.html
 * 10. 谷歌地图: 36.240437,139.186066
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750933381770",
  name: "本庄祇園祭典（ほんじょうぎおん祭典）",
  address: "〒367-0053　埼玉県本庄市中央、銀座",
  datetime: "2025年7月12日～13日　 【12日】16:00～22:00　　【13日】14:00～22:00",
  venue: "埼玉県本庄市　本庄市街地",
  access: "ＪＲ高崎線「本庄駅」北口步行5分",
  organizer: "本庄祇園祭典実行委員会",
  price: "",
  contact: "本庄市観光協会（本庄市役所商工観光課内）　0495-25-1111",
  website: "https://www.honjo-kanko.jp/event/honjogionmatsuri.html",
  googleMap: "https://maps.google.com/maps?q=36.240437,139.186066&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "为了驱除瘟疫，人们献上了舞狮舞，背上了神轿，这被认为是“本庄祇园祭”的开始。在靖国神社内，人们将供奉被指定为埼玉县非物质民间文化财产的狮子舞，以祈祷无病无灾、丰收等。伴随着“祭典吆喝声，祭典吆喝声”的气势，大人和小孩的轿车在旧中山路巡游，吸引了大批观众。还将展示木工、摇摆、乘梯子等。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.honjo-kanko.jp/wp-content/uploads/2017/02/395-DSC_7606-786x525.jpg",
      title: "本庄祇園祭典（ほんじょうぎおん祭典）图片1",
      alt: "本庄祇園祭典（ほんじょうぎおん祭典）图片1",
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