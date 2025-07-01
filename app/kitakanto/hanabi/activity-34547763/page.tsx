import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750934547763
 * 生成时间: 2025/6/26 19:42:27
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 真岡の夏祭典　荒神祭（もおかのなつ祭典　こうじんさい）
 * 2. 所在地: 〒321-4305　栃木県真岡市
 * 3. 开催期间: 2025年7月25日～27日　 花火大会/26日19:30～21:00　※恶劣天气时28日に順延
 * 4. 开催场所: 栃木県真岡市　真岡市内中心部、真岡市役所周辺
 * 5. 交通方式: 真岡鐡道「真岡駅」步行15分、或ＪＲ東北本線「石橋駅」から「真岡営業所行」の関東自動車巴士約40分「真岡市役所前」～徒歩3分、或北関東自動車道「真岡IC」驾车约10分
 * 6. 主办方: 荒神祭祭典本部・荒神祭町会連合会
 * 7. 料金: 花火大会/有料観覧席有
 * 8. 联系方式: 真岡市商工観光課　0285-83-8135
 * 9. 官方网站: https://mokahanabi.com/
 * 10. 谷歌地图: 36.440856,140.012631
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750934547763",
  name: "真岡の夏祭典　荒神祭（もおかのなつ祭典　こうじんさい）",
  address: "〒321-4305　栃木県真岡市",
  datetime: "2025年7月25日～27日　 花火大会/26日19:30～21:00　※恶劣天气时28日に順延",
  venue: "栃木県真岡市　真岡市内中心部、真岡市役所周辺",
  access: "真岡鐡道「真岡駅」步行15分、或ＪＲ東北本線「石橋駅」から「真岡営業所行」の関東自動車巴士約40分「真岡市役所前」～徒歩3分、或北関東自動車道「真岡IC」驾车约10分",
  organizer: "荒神祭祭典本部・荒神祭町会連合会",
  price: "花火大会/有料観覧席有",
  contact: "真岡市商工観光課　0285-83-8135",
  website: "https://mokahanabi.com/",
  googleMap: "https://maps.google.com/maps?q=36.440856,140.012631&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "以神轿与屋台的市内渡御，以及壮的神轿的川渡御为看点的“真冈之夏祭荒神祭”持续3天举行。从第一天的神轿的宫出到町会渡御开始，第二天市中心成为步行者天国，举行“祭典广场”。主要的荒宫神轿 神輿、儿童神輿、每个地区的神輿、初中生手工制作的神輿和花车摊位都出现了，许多音乐家为节日增添了光彩。在夜晚的花火大会上，神轿在五行川“川渡御”中，最多4号玉和星光等约2万发发，以音乐和激光光线的华丽而有震撼力的演出，吸引观众的目光。在最后一天，将有充满传统的宫殿奉献灯和英勇的宫殿入口，以及花车摊位上的音乐和撞击。* 发射次数：20，000次观众人数：170，000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.city.moka.lg.jp/material/images/group/19/moka-no-natumaturi-dasiyatai-buttuke-1.jpg",
      title: "真岡の夏祭典　荒神祭（もおかのなつ祭典　こうじんさい）图片1",
      alt: "真岡の夏祭典　荒神祭（もおかのなつ祭典　こうじんさい）图片1",
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
  const regionKey = REGION_MAP["kitakanto"] || 'tokyo';

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