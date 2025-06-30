import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1751175960436
 * 生成时间: 2025/6/29 14:46:00
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 鴨川市民花火大会（かもがわしみんはなびたいかい）
 * 2. 所在地: 〒296-0002　千葉県鴨川市前原
 * 3. 开催期间: 2025年7月29日　 花火燃放/19:30～20:00（予定）　※小雨決行、荒天の場合は翌日か翌々日に順延（根据情况可能会有变更）
 * 4. 开催场所: 千葉県鴨川市　前原・横渚海岸
 * 5. 交通方式: ＪＲ外房線「安房鴨川駅」步行5分
 * 6. 主办方: 鴨川市民花火大会実行委員会
 * 7. 料金: 无收费观览席
 * 8. 联系方式: 鴨川市観光協会　04-7092-0086
 * 9. 官方网站: http://www.chiba-kamogawa.jp
 * 10. 谷歌地图: 35.10543,140.107426
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1751175960436",
  name: "鴨川市民花火大会（かもがわしみんはなびたいかい）",
  address: "〒296-0002　千葉県鴨川市前原",
  datetime: "2025年7月29日　 花火燃放/19:30～20:00（予定）　※小雨決行、荒天の場合は翌日か翌々日に順延（根据情况可能会有变更）",
  venue: "千葉県鴨川市　前原・横渚海岸",
  access: "ＪＲ外房線「安房鴨川駅」步行5分",
  organizer: "鴨川市民花火大会実行委員会",
  price: "无收费观览席",
  contact: "鴨川市観光協会　04-7092-0086",
  website: "http://www.chiba-kamogawa.jp",
  googleMap: "https://maps.google.com/maps?q=35.10543,140.107426&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "为了让孩子们愉快地度过鸭川的夏天，怀着希望能让能引以为豪鸭川的孩子多一个，举行了“鸭川市民烟花大会”。尺玉等发射的烟花约3000发，点亮了鸭川的夜空。被选为“日本的渚100选”之一的前原·横渚海岸沿岸的任何地方都可以看到烟火。从JR安福鸭川站步行5分钟，交通也很方便。* 发射次数：3000次，观众人数：30，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://prcdn.freetls.fastly.net/release_image/143847/8/143847-8-4f52110c164130632869586a3eb1df4e-3000x2000.jpg?width=1950&height=1350&quality=85%2C65&format=jpeg&auto=webp&fit=bounds&bg-color=fff",
      title: "鴨川市民花火大会（かもがわしみんはなびたいかい）图片1",
      alt: "鴨川市民花火大会（かもがわしみんはなびたいかい）图片1",
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