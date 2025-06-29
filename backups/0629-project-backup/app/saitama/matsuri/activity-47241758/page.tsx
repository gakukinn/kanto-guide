import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947241758
 * 生成时间: 2025/6/26 23:14:01
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 秩父川瀬祭（ちちぶかわせまつり）
 * 2. 所在地: 〒368-0041　埼玉県秩父市番場町1-3
 * 3. 开催期间: 2025年7月19日～20日　 ※状況により内容が変更となる場合あり
 * 4. 开催场所: 埼玉県秩父市　秩父神社
 * 5. 交通方式: 秩父鉄道「秩父駅」からすぐ、または西武池袋線「西武秩父駅」から徒歩15分
 * 6. 主办方: 秩父神社
 * 7. 料金: 未设置
 * 8. 联系方式: 秩父神社　0494-22-0262、秩父観光協会　0494-21-2277
 * 9. 官方网站: https://www.chichibu-jinja.or.jp/
 * 10. 谷歌地图: 35.997683,139.084145
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947241758",
  name: "秩父川瀬祭（ちちぶかわせまつり）",
  address: "〒368-0041　埼玉県秩父市番場町1-3",
  datetime: "2025年7月19日～20日　 ※状況により内容が変更となる場合あり",
  venue: "埼玉県秩父市　秩父神社",
  access: "秩父鉄道「秩父駅」からすぐ、または西武池袋線「西武秩父駅」から徒歩15分",
  organizer: "秩父神社",
  price: "",
  contact: "秩父神社　0494-22-0262、秩父観光協会　0494-21-2277",
  website: "https://www.chichibu-jinja.or.jp/",
  googleMap: "https://maps.google.com/maps?q=35.997683,139.084145&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "地元では「お祇園（おぎおん）」の名で親しまれ、300年の伝統を誇る秩父神社の夏祭りが、2日間にわたり行われます。昼間に市中を引き回された笠鉾と、屋台あわせて8台の山車が、夜にはぼんぼりをつけた美しく幻想的な姿に変わり、打上げ花火が上がる中、神社周辺を引き回されます。2日目には、荒川の中へ「神輿洗い」として勢いよく担ぎ込まれ、清流の中でもまれます。両岸は見物人で大変賑わい、祭りはクライマックスを迎えます。埼玉県の無形民俗文化財に指定されています。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.chichibu-omotenashi.com/omatsuri/wp-content/uploads/2022/01/IMG_9025.jpg",
      title: "秩父川瀬祭（ちちぶかわせまつり）图片1",
      alt: "秩父川瀬祭（ちちぶかわせまつり）图片1",
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