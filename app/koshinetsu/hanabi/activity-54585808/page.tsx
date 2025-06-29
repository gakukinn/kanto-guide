import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1750954585808
 * 生成时间: 2025/6/27 01:16:25
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい）
 * 2. 所在地: 〒409-3606　山梨県市川三郷町高田682
 * 3. 开催期间: 2025年8月7日　 19:15～21:00　※雨天決行、荒天時は8日或9日に順延
 * 4. 开催场所: 山梨県市川三郷町　三郡橋下流笛吹川河畔
 * 5. 交通方式: ＪＲ身延線「市川大門駅」から徒歩10分、或中央自動車道「甲府南IC」から車約20分、或中部横断自動車道「増穂IC」から車約5分
 * 6. 主办方: 市川三郷町ふるさと夏祭典実行委員会
 * 7. 料金: 有料観覧席有/ダイナミックVIP席10万円、ダイナミックリクライニング席2万円、通常席4000円～　ほか
 * 8. 联系方式: 市川三郷町ふるさと夏祭典実行委員会　055-272-1101
 * 9. 官方网站: http://www.town.ichikawamisato.yamanashi.jp/shinmei/
 * 10. 谷歌地图: 35.561077,138.483284
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1750954585808",
  name: "市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい）",
  address: "〒409-3606　山梨県市川三郷町高田682",
  datetime: "2025年8月7日　 19:15～21:00　※雨天決行、荒天時は8日或9日に順延",
  venue: "山梨県市川三郷町　三郡橋下流笛吹川河畔",
  access: "ＪＲ身延線「市川大門駅」から徒歩10分、或中央自動車道「甲府南IC」から車約20分、或中部横断自動車道「増穂IC」から車約5分",
  organizer: "市川三郷町ふるさと夏祭典実行委員会",
  price: "有料観覧席有/ダイナミックVIP席10万円、ダイナミックリクライニング席2万円、通常席4000円～　ほか",
  contact: "市川三郷町ふるさと夏祭典実行委員会　055-272-1101",
  website: "http://www.town.ichikawamisato.yamanashi.jp/shinmei/",
  googleMap: "https://maps.google.com/maps?q=35.561077,138.483284&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "在武田信玄活跃的时代，被认为是作为战争的狼烟而开始的市川烟花，在江户时代被认为是日本三大烟花之一，是在为市川和纸的兴盛做出贡献的纸工“甚左卫门”的忌日7月20日举行。平成元年（1989年），作为山梨县最大规模的烟火大会复活，现在每年8月7日（烟火之日）举办。2025年的主题是“光的轨迹--旋转的思想，连接的未来--”，伴随着音乐，长玉、超大的星光、主题火、讯息烟花等将照亮夜空，将迎来一个盛大的结局。它的特点是具有故事性的节目构成，每年有18万多人前来参观，非常热闹。* 发射次数：20，000次，去年20，000次观众：180，000次，去年180，000次",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/61292bc9-9d0d-4566-b563-36e2fef95be7/0_0.png",
      title: "市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい）图片1",
      alt: "市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい）图片1",
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
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;