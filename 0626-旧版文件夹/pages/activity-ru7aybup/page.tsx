import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc9ddk8g0001vl9cru7aybup
 * 生成时间: 2025/6/25 00:06:40
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 男体山登拝祭奉賛行人行列・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）
 * 2. 所在地: 〒321-1661　栃木県日光市中宮祠2484
 * 3. 开催期间: 2025年7月31日　 花火打ち上げ/20:30～（雨天中止）
 * 4. 开催场所: 栃木県日光市　日光二荒山神社中宮祠境内・湖畔
 * 5. 交通方式: ＪＲ日光線「日光駅」から「湯元温泉行」の東武バス約50分「二荒山神社中宮祠」すぐ、またはＪＲ日光線「日光駅」から「中禅寺温泉行」の東武バス約40分「終点」～徒歩15分
 * 6. 主办方: 二荒山神社
 * 7. 料金: 男体山登拝/有料、花火/有料観覧席なし
 * 8. 联系方式: 一般社団法人日光市観光協会　0288-22-1525、二荒山神社中宮祠　0288-55-0017
 * 9. 官方网站: http://www.futarasan.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.487462!3d36.741773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687562512!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc9ddk8g0001vl9cru7aybup",
  name: "男体山登拝祭奉賛行人行列・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）",
    description: "",
  address: "〒321-1661　栃木県日光市中宮祠2484",
  datetime: "2025年7月31日　 花火打ち上げ/20:30～（雨天中止）",
  venue: "栃木県日光市　日光二荒山神社中宮祠境内・湖畔",
  access: "ＪＲ日光線「日光駅」から「湯元温泉行」の東武バス約50分「二荒山神社中宮祠」すぐ、またはＪＲ日光線「日光駅」から「中禅寺温泉行」の東武バス約40分「終点」～徒歩15分",
  organizer: "二荒山神社",
  price: "男体山登拝/有料、花火/有料観覧席なし",
  contact: "一般社団法人日光市観光協会　0288-22-1525、二荒山神社中宮祠　0288-55-0017",
  website: "http://www.futarasan.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.487462!3d36.741773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687562512!5m2!1sja!2sjp",
  region: "kitakanto",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.jalan.net/jalan/img/3/event/0343/KXL/e343465a.jpg",
      title: "男体山登拝祭奉賛行人行列・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）图片1",      alt: "男体山登拝祭奉賛行人行列・深山踊り（なんたいさんとはいさいほうさんぎょうにんぎょうれつ　みやまおどり）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;