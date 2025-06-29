import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947818147
 * 生成时间: 2025/6/26 23:23:38
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）
 * 2. 所在地: 〒287-0003　千葉県香取市佐原イ
 * 3. 开催期间: 2025年7月11日～13日　 10:00～22:00
 * 4. 开催场所: 千葉県香取市　八坂神社周辺（佐原本宿地区）
 * 5. 交通方式: ＪＲ成田線「佐原駅」から徒歩10分、または東関東自動車道「佐原・香取IC」から車約10分もしくは「大栄IC」から車約20分
 * 6. 主办方: 未设置
 * 7. 料金: 未设置
 * 8. 联系方式: 香取市商工観光課（代表）　0478-54-1111、一般社団法人水郷佐原観光協会　0478-52-6675
 * 9. 官方网站: https://www.city.katori.lg.jp/sightseeing/matsuri/
 * 10. 谷歌地图: 35.889679,140.501541
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947818147",
  name: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）",
  address: "〒287-0003　千葉県香取市佐原イ",
  datetime: "2025年7月11日～13日　 10:00～22:00",
  venue: "千葉県香取市　八坂神社周辺（佐原本宿地区）",
  access: "ＪＲ成田線「佐原駅」から徒歩10分、または東関東自動車道「佐原・香取IC」から車約10分もしくは「大栄IC」から車約20分",
  organizer: "",
  price: "",
  contact: "香取市商工観光課（代表）　0478-54-1111、一般社団法人水郷佐原観光協会　0478-52-6675",
  website: "https://www.city.katori.lg.jp/sightseeing/matsuri/",
  googleMap: "https://maps.google.com/maps?q=35.889679,140.501541&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "関東三大山車祭りの一つとされる「佐原の大祭夏祭り」が、八坂神社周辺で開催されます。日本三大囃子「佐原囃子」の音を響かせながら、勇壮豪華な山車10台が重要伝統的建造物群保存地区の中を進むさまは、江戸時代の情景を彷彿させます。自慢の山車は、重厚な総欅造りの本体に豪華な彫刻が施され、上部には高さ4mにもおよぶ大人形が飾られます。中日の12日には、整列した山車10台が順番に「のの字廻し」を披露します。約300年の伝統を有するこの祭りは、2016年、ユネスコ無形文化遺産に登録された「山・鉾・屋台行事」33の祭礼のひとつです。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://i.ytimg.com/vi/w5blXOurDeM/maxresdefault.jpg",
      title: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）图片1",
      alt: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）图片1",
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