import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmca1elue000bvlg87uqcmg5c
 * 生成时间: 2025/6/24 23:28:25
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）
 * 2. 所在地: 〒287-0003　千葉県香取市佐原イ
 * 3. 开催期间: 2025年7月11日～13日　 10:00～22:00
 * 4. 开催场所: 千葉県香取市　八坂神社周辺（佐原本宿地区）
 * 5. 交通方式: ＪＲ成田線「佐原駅」から徒歩10分、または東関東自動車道「佐原・香取IC」から車約10分もしくは「大栄IC」から車約20分
 * 6. 主办方: 未设置
 * 7. 料金: 未设置
 * 8. 联系方式: 香取市商工観光課（代表）　0478-54-1111、一般社団法人水郷佐原観光協会　0478-52-6675
 * 9. 官方网站: https://www.city.katori.lg.jp/sightseeing/matsuri/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.501541!3d35.889679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750686885730!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmca1elue000bvlg87uqcmg5c",
  name: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）",
    description: "",
  address: "〒287-0003　千葉県香取市佐原イ",
  datetime: "2025年7月11日～13日　 10:00～22:00",
  venue: "千葉県香取市　八坂神社周辺（佐原本宿地区）",
  access: "ＪＲ成田線「佐原駅」から徒歩10分、または東関東自動車道「佐原・香取IC」から車約10分もしくは「大栄IC」から車約20分",
  organizer: "",
  price: "",
  contact: "香取市商工観光課（代表）　0478-54-1111、一般社団法人水郷佐原観光協会　0478-52-6675",
  website: "https://www.city.katori.lg.jp/sightseeing/matsuri/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.501541!3d35.889679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750686885730!5m2!1sja!2sjp",
  region: "chiba",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750775301173_佐原の大祭夏祭り_compressed.jpg",
      title: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）图片1",      alt: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつまつり　やさかじんじゃぎおんさい）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;