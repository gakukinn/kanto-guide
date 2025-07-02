import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1751377955102
 * 生成时间: 2025/7/1 22:52:35
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 男体山登拝祭奉賛行人行列・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）
 * 2. 所在地: 〒321-1661　栃木県日光市中宮祠2484
 * 3. 开催期间: 2025年7月31日　 花火打ち上げ/20:30～（雨天中止）
 * 4. 开催场所: 栃木県日光市　日光二荒山神社中宮祠境内・湖畔
 * 5. 交通方式: ＪＲ日光線「日光駅」から「湯元温泉行」の東武バス約50分「二荒山神社中宮祠」すぐ、またはＪＲ日光線「日光駅」から「中禅寺温泉行」の東武バス約40分「終点」～徒歩15分
 * 6. 主办方: 二荒山神社
 * 7. 料金: 男体山登拝/有料、花火/有料観覧席なし
 * 8. 联系方式: 一般社団法人日光市観光協会　0288-22-1525、二荒山神社中宮祠　0288-55-0017
 * 9. 官方网站: http://www.futarasan.jp/
 * 10. 谷歌地图: 36.741773,139.487462
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1751377955102",
  name: "男体山登拜祭奉纳行人游行・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）",
  address: "〒321-1661　栃木県日光市中宮祠2484",
  datetime: "2025年7月31日　 花火打ち上げ/20:30～（雨天中止）",
  venue: "栃木県日光市　日光二荒山神社中宮祠境内・湖畔",
  access: "ＪＲ日光線「日光駅」から「湯元温泉行」の東武バス約50分「二荒山神社中宮祠」すぐ、またはＪＲ日光線「日光駅」から「中禅寺温泉行」の東武バス約40分「終点」～徒歩15分",
  organizer: "二荒山神社",
  price: "男体山登拝/有料、花火/有料観覧席なし",
  contact: "一般社団法人日光市観光協会　0288-22-1525、二荒山神社中宮祠　0288-55-0017",
  website: "http://www.futarasan.jp/",
  googleMap: "https://maps.google.com/maps?q=36.741773,139.487462&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "拥有1200年以上历史、被视为奥日光灵场的二荒山神社中宫祠将举行一年中最盛大的祭典。活动包括“男体山登拜”“御内殿参拜”“奉纳烟火”“深山舞蹈”等奉纳仪式，以及行人游行和儿童神轿在街道上巡游，也会举办舞蹈比赛。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.midjourney.com/8a6aab46-6fdd-48d1-96c7-01451f4323fc/0_0.png",
      title: "男体山登拝祭奉賛行人行列・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）图片1",
      alt: "男体山登拝祭奉賛行人行列・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）图片1",
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
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;