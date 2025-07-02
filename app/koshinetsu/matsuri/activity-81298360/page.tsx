import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1751381298360
 * 生成时间: 2025/7/1 23:48:18
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 鉱山祭（こうざんまつり）
 * 2. 所在地: 〒952-1511　新潟県佐渡市相川栄町
 * 3. 开催期间: 2025年7月26日～27日　 【26日】8:45～21:00　　【27日】9:30～21:00　※花火大会/20:00～20:30（小雨決行）
 * 4. 开催场所: 新潟県佐渡市　相川市街地周辺、相川浜公園（花火打上場所/相川春日崎）
 * 5. 交通方式: 「新潟港」からジェットフォイル約1時間7分「両津港」～本線のバス「相川」下車、または「直江津港」からカーフェリー（※冬期運休）約2時間40分「小木港」～小木線のバス「佐和田BS」乗換～七浦海岸線のバス「相川」下車
 * 6. 主办方: 鉱山祭実行委員会
 * 7. 料金: 花火大会/有料観覧席なし、汐風リレーマラソン/参加料が必要
 * 8. 联系方式: 鉱山祭実行委員会事務局　0259-74-3515
 * 9. 官方网站: https://www.s-nets.info/sado.kouzan/
 * 10. 谷歌地图: 38.028651,138.239339
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1751381298360",
  name: "鉱山祭（こうざんまつり）",
  address: "〒952-1511　新潟県佐渡市相川栄町",
  datetime: "2025年7月26日～27日　 【26日】8:45～21:00　　【27日】9:30～21:00　※花火大会/20:00～20:30（小雨決行）",
  venue: "新潟県佐渡市　相川市街地周辺、相川浜公園（花火打上場所/相川春日崎）",
  access: "从“新潟港”乘坐水翼船约1小时7分钟至“两津港”，换乘本线巴士在“相川”站下车，或从“直江津港”乘坐汽车渡轮（※冬季停运）约2小时40分钟至“小木港”，换乘小木线巴士至“佐和田BS”后转乘七浦海岸线巴士，在“相川”站下车。",
  organizer: "鉱山祭実行委員会",
  price: "花火大会/有料観覧席なし、汐風リレーマラソン/参加料が必要",
  contact: "鉱山祭実行委員会事務局　0259-74-3515",
  website: "https://www.s-nets.info/sado.kouzan/",
  googleMap: "https://maps.google.com/maps?q=38.028651,138.239339&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "佐渡三大祭之一的“矿山祭”将作为开场，在两天内于相川市区周边举行。这是源于曾在金山工作的人们一年一次可外出至城镇游玩的日子而诞生的祭典。活动中将举行儿童神轿、鼓笛队巡游、祭典游行、御笠舞巡游，以及不定期登场的“跳跃御笠”等。第二天将举行“潮风接力马拉松”，在作为压轴的烟火大会中，将发射快打、连发花束等含最大5号烟火在内的各色焰火，现场将被欢呼声包围。烟火发射地点相川春日崎海滨距离市区较近，包括相川滨公园在内的市区大部分地点均可观赏烟火。※发射数量：500发（去年500发） 观众人数：1万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://niigata-kankou.or.jp/image/rendering/attraction_image/178806/trim.900/3/2?v=7da67255ddf90de7715378bf0a55d2880fd9955a",
      title: "鉱山祭（こうざんまつり）图片1",
      alt: "鉱山祭（こうざんまつり）图片1",
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