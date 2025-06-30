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
 * 5. 交通方式: ＪＲ羽越本線「村上駅」步行20分
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
  access: "ＪＲ羽越本線「村上駅」步行20分",
  organizer: "",
  price: "",
  contact: "村上市観光協会　0254-53-2258",
  website: "https://www.sake3.com/",
  googleMap: "https://maps.google.com/maps?q=38.21757,139.478247&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "城下町村上特有的雄壮而华丽的祭典“村上大祭”正在举行。将神灵奉还在3座神轿上，荒马14骑，以幼仔行列为先导在町内巡回的“旅神事”成为值得一看的地方。最令人印象深刻的是花车（19辆街头花车），有着令人惊叹的雕塑和村上传统的漆漆，吸引了许多游客前来观看它。2018年1月，“村上节的摊位活动”被指定为国家重要的非物质民间文化财产。它也被称为新潟的三大高市（高町=庙会），有许多摊位，非常热闹。",
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