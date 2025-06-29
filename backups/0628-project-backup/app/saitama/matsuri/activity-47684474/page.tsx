import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947684474
 * 生成时间: 2025/6/26 23:21:24
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 長瀞船玉まつり（ながとろふなだままつり）
 * 2. 所在地: 〒369-1305　埼玉県長瀞町
 * 3. 开催期间: 2025年8月15日　 まつり/17:00～20:45、花火/19:15～20:45（予定）
 * 4. 开催场所: 埼玉県長瀞町　長瀞岩畳
 * 5. 交通方式: 秩父鉄道「長瀞駅」から徒歩5分
 * 6. 主办方: 長瀞船玉まつり実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 長瀞町観光協会　0494-66-3311
 * 9. 官方网站: https://www.nagatoro.gr.jp/
 * 10. 谷歌地图: 36.094732,139.115724
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947684474",
  name: "長瀞船玉まつり（ながとろふなだままつり）",
  address: "〒369-1305　埼玉県長瀞町",
  datetime: "2025年8月15日　 まつり/17:00～20:45、花火/19:15～20:45（予定）",
  venue: "埼玉県長瀞町　長瀞岩畳",
  access: "秩父鉄道「長瀞駅」から徒歩5分",
  organizer: "長瀞船玉まつり実行委員会",
  price: "有料観覧席なし",
  contact: "長瀞町観光協会　0494-66-3311",
  website: "https://www.nagatoro.gr.jp/",
  googleMap: "https://maps.google.com/maps?q=36.094732,139.115724&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "水上安全祈願と水難供養を行う「船玉まつり」の最後をしめくくる花火大会が、長瀞岩畳で開催されます。「宙と瀞に華が咲く」をテーマに、仕掛け花火やスターマイン、ナイアガラ、メッセージ花火、ミュージック花火、尺玉など約3000発が打ち上げられ、祭りはクライマックスに達します。「船玉まつり」では、宝登山神社の神官が船に乗り、清流で清め祓いを行うと、2隻の万灯船が屋台囃しの演奏とともに瀞をゆるやかに上下します。その一方で多数の灯籠が流され、水難の犠牲となった人々の供養が行われます。 ※打ち上げ数：3000発",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.nagatoro.gr.jp/wp-content/uploads/2013/07/554543878ed0152426e5d51c762f6aec.jpg",
      title: "長瀞船玉まつり（ながとろふなだままつり）图片1",
      alt: "長瀞船玉まつり（ながとろふなだままつり）图片1",
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