import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750948087236
 * 生成时间: 2025/6/26 23:28:07
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: あびこカッパまつり（あびこカッパまつり）
 * 2. 所在地: 〒270-1147　千葉県我孫子市若松1
 * 3. 开催期间: 2025年8月30日　 10:00～20:00
 * 4. 开催场所: 千葉県我孫子市　手賀沼公園
 * 5. 交通方式: ＪＲ常盤線「我孫子駅」南口から徒歩10分もしくはバス「手賀沼公園」下車
 * 6. 主办方: あびこカッパまつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: あびこカッパまつり実行委員会　080-4914-5416
 * 9. 官方网站: https://www.abikokappa.website/
 * 10. 谷歌地图: 35.865514,140.014571
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750948087236",
  name: "あびこカッパまつり（あびこカッパまつり）",
  address: "〒270-1147　千葉県我孫子市若松1",
  datetime: "2025年8月30日　 10:00～20:00",
  venue: "千葉県我孫子市　手賀沼公園",
  access: "ＪＲ常盤線「我孫子駅」南口から徒歩10分もしくはバス「手賀沼公園」下車",
  organizer: "あびこカッパまつり実行委員会",
  price: "",
  contact: "あびこカッパまつり実行委員会　080-4914-5416",
  website: "https://www.abikokappa.website/",
  googleMap: "https://maps.google.com/maps?q=35.865514,140.014571&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "我孫子のシンボル的なお祭りとして、“カッパ”をテーマとした「あびこカッパまつり」が、手賀沼公園で開催されます。子どもから若者、高齢者まであらゆる世代が参加し、河童音頭大行進をはじめ、仮装カッパコンテスト、カッパダンスが行われます。ステージイベントが催されるほか、竹宵なども楽しめます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://abiko.goguynet.jp/wp-content/uploads/sites/106/2022/08/20220827_165007.jpg",
      title: "あびこカッパまつり（あびこカッパまつり）图片1",
      alt: "あびこカッパまつり（あびこカッパまつり）图片1",
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