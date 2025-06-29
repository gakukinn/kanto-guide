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
 * 1. 名称: 蒲原まつり（かんばらまつり）
 * 2. 所在地: 〒950-0085　新潟県新潟市中央区長嶺町3-18
 * 3. 开催期间: 2025年6月30日～7月2日　 露店/10:00～23:00（初日は13:00～）、御託宣/7月1日19:00～　ほか
 * 4. 开催场所: 新潟市　蒲原神社および周辺
 * 5. 交通方式: ＪＲ「新潟駅」から東へ徒歩12分もしくは新潟交通バス「蒲原町」下車
 * 6. 主办方: 蒲原まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 蒲原まつり実行委員会　025-246-8602、蒲原神社社務所　025-244-4541
 * 9. 官方网站: https://minekomi.sakura.ne.jp/
 * 10. 谷歌地图: 37.914764,139.070089
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750954877720",
  name: "蒲原まつり（かんばらまつり）",
  address: "〒950-0085　新潟県新潟市中央区長嶺町3-18",
  datetime: "2025年6月30日～7月2日　 露店/10:00～23:00（初日は13:00～）、御託宣/7月1日19:00～　ほか",
  venue: "新潟市　蒲原神社および周辺",
  access: "ＪＲ「新潟駅」から東へ徒歩12分もしくは新潟交通バス「蒲原町」下車",
  organizer: "蒲原まつり実行委員会",
  price: "",
  contact: "蒲原まつり実行委員会　025-246-8602、蒲原神社社務所　025-244-4541",
  website: "https://minekomi.sakura.ne.jp/",
  googleMap: "https://maps.google.com/maps?q=37.914764,139.070089&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "新潟三大高市の一つとして知られる「蒲原まつり」が、蒲原神社および周辺で開催されます。合計1kmにわたり500余りもの露店が並び、日本一の範囲と出店数を誇ります。例年、3日間で延べ30万人を超える見物客で賑わいます。宵宮のぼり行列や万代太鼓の演奏、ゆかたまつりなども催されます。まつり期間中の7月1日には、蒲原神社最大の神事である「御託宣（おたくせん）」が行われ、一年の稲作の豊凶を占い、五穀豊穣を祈ります。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.clipkit.co/tenants/1044/articles/images/000/004/020/large/98e30a18-c97b-46af-82ce-9589dcdc3196.jpg?1716536140",
      title: "蒲原まつり（かんばらまつり）图片1",
      alt: "蒲原まつり（かんばらまつり）图片1",
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