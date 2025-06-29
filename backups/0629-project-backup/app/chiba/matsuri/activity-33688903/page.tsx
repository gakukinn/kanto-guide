import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750933688903
 * 生成时间: 2025/6/26 19:28:08
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 成田祇園祭（なりたぎおんさい）
 * 2. 所在地: 〒286-0023　千葉県成田市成田1
 * 3. 开催期间: 2025年7月4日～6日
 * 4. 开催场所: 千葉県成田市　成田山新勝寺とその周辺
 * 5. 交通方式: ＪＲ成田線・京成「成田駅」から徒歩10分
 * 6. 主办方: 未设置
 * 7. 料金: 未设置
 * 8. 联系方式: 一般社団法人成田市観光協会　0476-22-2102
 * 9. 官方网站: https://www.nrtk.jp/enjoy/shikisaisai/gion-festival.html
 * 10. 谷歌地图: 35.786063,140.318295
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750933688903",
  name: "成田祇園祭（なりたぎおんさい）",
  address: "〒286-0023　千葉県成田市成田1",
  datetime: "2025年7月4日～6日",
  venue: "千葉県成田市　成田山新勝寺とその周辺",
  access: "ＪＲ成田線・京成「成田駅」から徒歩10分",
  organizer: "",
  price: "",
  contact: "一般社団法人成田市観光協会　0476-22-2102",
  website: "https://www.nrtk.jp/enjoy/shikisaisai/gion-festival.html",
  googleMap: "https://maps.google.com/maps?q=35.786063,140.318295&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "成田山新勝寺のご本尊である不動明王の本地仏、奥之院大日如来を供養する祭礼の「成田山祇園会」にあわせて、周辺の町内が一体となり、夏祭りとして「成田祇園祭」が開催されます。新勝寺で執り行われる「成田山祇園会」は約300年の歴史があり、大日如来に五穀豊穣や万民豊楽などが祈願され、大日如来が祀られた奥之院が特別開帳されます。市内一帯では、豪華絢爛な御輿と10台の山車や屋台が3日間にわたり引き回され、踊りとお囃子の競演が披露されます。例年40万人を超える見物客が集まります。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Narita-gion-festival-1%2CNarita-city%2CJapan.jpg/2880px-Narita-gion-festival-1%2CNarita-city%2CJapan.jpg",
      title: "成田祇園祭（なりたぎおんさい）图片1",
      alt: "成田祇園祭（なりたぎおんさい）图片1",
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
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;