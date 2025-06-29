import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750933381770
 * 生成时间: 2025/6/26 19:23:01
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 本庄祇園まつり（ほんじょうぎおんまつり）
 * 2. 所在地: 〒367-0053　埼玉県本庄市中央、銀座
 * 3. 开催期间: 2025年7月12日～13日　 【12日】16:00～22:00　　【13日】14:00～22:00
 * 4. 开催场所: 埼玉県本庄市　本庄市街地
 * 5. 交通方式: ＪＲ高崎線「本庄駅」北口から徒歩5分
 * 6. 主办方: 本庄祇園まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 本庄市観光協会（本庄市役所商工観光課内）　0495-25-1111
 * 9. 官方网站: https://www.honjo-kanko.jp/event/honjogionmatsuri.html
 * 10. 谷歌地图: 36.240437,139.186066
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750933381770",
  name: "本庄祇園まつり（ほんじょうぎおんまつり）",
  address: "〒367-0053　埼玉県本庄市中央、銀座",
  datetime: "2025年7月12日～13日　 【12日】16:00～22:00　　【13日】14:00～22:00",
  venue: "埼玉県本庄市　本庄市街地",
  access: "ＪＲ高崎線「本庄駅」北口から徒歩5分",
  organizer: "本庄祇園まつり実行委員会",
  price: "",
  contact: "本庄市観光協会（本庄市役所商工観光課内）　0495-25-1111",
  website: "https://www.honjo-kanko.jp/event/honjogionmatsuri.html",
  googleMap: "https://maps.google.com/maps?q=36.240437,139.186066&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "疫病を追い払うため、獅子舞を奉納し、みこしを担いだのが「本庄祇園まつり」の始まりとされます。八坂神社の境内で、無病息災や五穀豊穣などを祈念し、埼玉県の無形民俗文化財に指定されている獅子舞が奉納されます。「セイヤ、セイヤ」の威勢のよいかけ声とともに、旧中山道を大人みこしや子どもみこしが巡行し、大勢の観客で賑わいます。木遣り、纏（まとい）振り、梯子乗りなども披露されます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.honjo-kanko.jp/wp-content/uploads/2017/02/395-DSC_7606-786x525.jpg",
      title: "本庄祇園まつり（ほんじょうぎおんまつり）图片1",
      alt: "本庄祇園まつり（ほんじょうぎおんまつり）图片1",
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