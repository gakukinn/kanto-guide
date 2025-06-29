import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750954926834
 * 生成时间: 2025/6/27 01:22:06
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 村上大祭（むらかみたいさい）
 * 2. 所在地: 〒958-0851　新潟県村上市
 * 3. 开催期间: 2025年7月6日～7日
 * 4. 开催场所: 新潟県村上市　西奈彌羽黒神社、村上市内城下町エリア（屋台山車巡行）
 * 5. 交通方式: ＪＲ羽越本線「村上駅」から徒歩20分
 * 6. 主办方: 未设置
 * 7. 料金: 未设置
 * 8. 联系方式: 村上市観光協会　0254-53-2258
 * 9. 官方网站: https://www.sake3.com/
 * 10. 谷歌地图: 38.21757,139.478247
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750954926834",
  name: "村上大祭（むらかみたいさい）",
  address: "〒958-0851　新潟県村上市",
  datetime: "2025年7月6日～7日",
  venue: "新潟県村上市　西奈彌羽黒神社、村上市内城下町エリア（屋台山車巡行）",
  access: "ＪＲ羽越本線「村上駅」から徒歩20分",
  organizer: "",
  price: "",
  contact: "村上市観光協会　0254-53-2258",
  website: "https://www.sake3.com/",
  googleMap: "https://maps.google.com/maps?q=38.21757,139.478247&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "城下町村上ならではの勇壮にして華麗な祭り「村上大祭」が開催されます。3基の神輿に御神霊を奉還し、荒馬14騎、稚児行列を先導に町内を巡行する「お旅神事」が見どころとなっています。圧巻は、見事な彫刻と村上伝統の漆塗りを施したオシャギリ（屋台山車19台）で、その様子を一目見ようと、多くの観光客が訪れます。2018年1月に「村上祭の屋台行事」が、国の重要無形民俗文化財に指定されました。新潟三大高市（たかまち＝縁日のこと）としても知られ、多くの露店が立ち並び、大変賑わいます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://enjoyniigata.com/image/rendering/attraction_image/4196/keep/1200?v=b284a442c1c140c07fff71ae5591a4a4deccf363",
      title: "村上大祭（むらかみたいさい）图片1",
      alt: "村上大祭（むらかみたいさい）图片1",
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