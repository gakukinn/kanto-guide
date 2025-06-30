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
 * 1. 名称: 佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつ祭典　やさかじんじゃぎおんさい）
 * 2. 所在地: 〒287-0003　千葉県香取市佐原イ
 * 3. 开催期间: 2025年7月11日～13日　 10:00～22:00
 * 4. 开催场所: 千葉県香取市　八坂神社周辺（佐原本宿地区）
 * 5. 交通方式: ＪＲ成田線「佐原駅」步行10分、或東関東自動車道「佐原・香取IC」驾车约10分或者「大栄IC」驾车约20分
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
  name: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつ祭典　やさかじんじゃぎおんさい）",
  address: "〒287-0003　千葉県香取市佐原イ",
  datetime: "2025年7月11日～13日　 10:00～22:00",
  venue: "千葉県香取市　八坂神社周辺（佐原本宿地区）",
  access: "ＪＲ成田線「佐原駅」步行10分、或東関東自動車道「佐原・香取IC」驾车约10分或者「大栄IC」驾车约20分",
  organizer: "",
  price: "",
  contact: "香取市商工観光課（代表）　0478-54-1111、一般社団法人水郷佐原観光協会　0478-52-6675",
  website: "https://www.city.katori.lg.jp/sightseeing/matsuri/",
  googleMap: "https://maps.google.com/maps?q=35.889679,140.501541&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "被认为是关东三大花车节之一的“佐原大祭夏季祭”，在靖国神社周围举行。传达日本三大子“佐原子”的声音的同时，壮豪华的10辆花车在重要传统建筑物群保存地区中进行，让人想起江户时代的情景。引以为豪的山车，在厚重的总榉制造的主体上加上豪华的雕刻，上部装饰高达4m的大人偶。在中日的12日，排列好的10辆花车将按顺序表演“的字旋转”。这个拥有约300年传统的祭典，是2016年被登录为联合国教科文组织非物质文化遗产的“山··屋台活动”33个祭典之一。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://i.ytimg.com/vi/w5blXOurDeM/maxresdefault.jpg",
      title: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつ祭典　やさかじんじゃぎおんさい）图片1",
      alt: "佐原の大祭夏祭り（八坂神社祇園祭）（さわらのたいさいなつ祭典　やさかじんじゃぎおんさい）图片1",
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