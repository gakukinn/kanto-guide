import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750934612455
 * 生成时间: 2025/6/26 19:43:32
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 前橋七夕祭典（まえばしたなばた祭典）
 * 2. 所在地: 〒371-0022　群馬県前橋市千代田町
 * 3. 开催期间: 2025年7月11日～13日　 10:00～21:30
 * 4. 开催场所: 前橋市　前橋市中心市街地
 * 5. 交通方式: ＪＲ「前橋駅」步行10分、或関越自動車道「前橋IC」驾车约10分
 * 6. 主办方: 前橋七夕祭典実施委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 前橋七夕祭典実施委員会事務局（前橋市まちづくり公社内）　027-289-5565
 * 9. 官方网站: https://maebashi-tanabata.jp/
 * 10. 谷歌地图: 36.388833,139.072396
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750934612455",
  name: "前橋七夕祭典（まえばしたなばた祭典）",
  address: "〒371-0022　群馬県前橋市千代田町",
  datetime: "2025年7月11日～13日　 10:00～21:30",
  venue: "前橋市　前橋市中心市街地",
  access: "ＪＲ「前橋駅」步行10分、或関越自動車道「前橋IC」驾车约10分",
  organizer: "前橋七夕祭典実施委員会",
  price: "",
  contact: "前橋七夕祭典実施委員会事務局（前橋市まちづくり公社内）　027-289-5565",
  website: "https://maebashi-tanabata.jp/",
  googleMap: "https://maps.google.com/maps?q=36.388833,139.072396&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "从昭和26年（1951年）开始举办的“前桥七夕祭”，在市中心市中心举办。今年也将在前桥市的中心市中心举行。除了在市中心部及周边商店街等地装饰著七夕装饰外，中央活动广场上还装饰著七夕愿事短册装饰，展现七夕的氛围。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.maebashi-cvb.com/image/rendering/attraction_image/789/keep/1200?v=b41fd6641c9447dddbaa2a818643dbb9786976b0",
      title: "前橋七夕祭典（まえばしたなばた祭典）图片1",
      alt: "前橋七夕祭典（まえばしたなばた祭典）图片1",
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