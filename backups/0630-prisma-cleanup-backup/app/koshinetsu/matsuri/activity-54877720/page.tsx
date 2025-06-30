import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750954877720
 * 生成时间: 2025/6/27 01:21:17
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 蒲原祭典（かんばら祭典）
 * 2. 所在地: 〒950-0085　新潟県新潟市中央区長嶺町3-18
 * 3. 开催期间: 2025年6月30日～7月2日　 露店/10:00～23:00（初日は13:00～）、御託宣/7月1日19:00～　ほか
 * 4. 开催场所: 新潟市　蒲原神社および周辺
 * 5. 交通方式: ＪＲ「新潟駅」から東へ徒歩12分或者新潟交通巴士「蒲原町」下車
 * 6. 主办方: 蒲原祭典実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 蒲原祭典実行委員会　025-246-8602、蒲原神社社務所　025-244-4541
 * 9. 官方网站: https://minekomi.sakura.ne.jp/
 * 10. 谷歌地图: 37.914764,139.070089
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750954877720",
  name: "蒲原祭典（かんばら祭典）",
  address: "〒950-0085　新潟県新潟市中央区長嶺町3-18",
  datetime: "2025年6月30日～7月2日　 露店/10:00～23:00（初日は13:00～）、御託宣/7月1日19:00～　ほか",
  venue: "新潟市　蒲原神社および周辺",
  access: "ＪＲ「新潟駅」から東へ徒歩12分或者新潟交通巴士「蒲原町」下車",
  organizer: "蒲原祭典実行委員会",
  price: "",
  contact: "蒲原祭典実行委員会　025-246-8602、蒲原神社社務所　025-244-4541",
  website: "https://minekomi.sakura.ne.jp/",
  googleMap: "https://maps.google.com/maps?q=37.914764,139.070089&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "被称为新潟三大高市之一的“蒲原祭”在蒲原神社及其周边地区举行。总共有500多个摊位在1公里内排列，以日本最大的范围和分店数量而自豪。在过去的三天里，它吸引了超过300，000名游客。还举行了夜宫旗游行、万代太鼓表演和浴衣祭。在7月1日的节日期间，会举行蒲原神社最大的祭神仪式“祭神仪式（Otakusen）”，占卜一年中水稻的丰收，并祈祷丰收。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.clipkit.co/tenants/1044/articles/images/000/004/020/large/98e30a18-c97b-46af-82ce-9589dcdc3196.jpg?1716536140",
      title: "蒲原祭典（かんばら祭典）图片1",
      alt: "蒲原祭典（かんばら祭典）图片1",
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
  const regionKey = REGION_MAP["koshinetsu"] || 'tokyo';

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