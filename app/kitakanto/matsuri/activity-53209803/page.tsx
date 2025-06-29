import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750953209803
 * 生成时间: 2025/6/27 00:53:29
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 下館祇園まつり（しもだてぎおんまつり）
 * 2. 所在地: 〒308-0031　茨城県筑西市
 * 3. 开催期间: 2025年7月24日～27日　 【24日～26日】18:00～22:00　　【27日】6:00～9:00　※最新情報はホームページ参照
 * 4. 开催场所: 茨城県筑西市　下館駅前通りおよびその周辺　五行川大橋　ほか
 * 5. 交通方式: ＪＲ水戸線「下館駅」北口からすぐ
 * 6. 主办方: 下館祇園まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 筑西市商工観光課　0296-20-1160
 * 9. 官方网站: https://www.chikuseikanko.jp/
 * 10. 谷歌地图: 36.304892,139.97858
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750953209803",
  name: "下館祇園まつり（しもだてぎおんまつり）",
  address: "〒308-0031　茨城県筑西市",
  datetime: "2025年7月24日～27日　 【24日～26日】18:00～22:00　　【27日】6:00～9:00　※最新情報はホームページ参照",
  venue: "茨城県筑西市　下館駅前通りおよびその周辺　五行川大橋　ほか",
  access: "ＪＲ水戸線「下館駅」北口からすぐ",
  organizer: "下館祇園まつり実行委員会",
  price: "",
  contact: "筑西市商工観光課　0296-20-1160",
  website: "https://www.chikuseikanko.jp/",
  googleMap: "https://maps.google.com/maps?q=36.304892,139.97858&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "以筑西最大的夏季祭而闻名的“下馆祇园祭”，以大町的羽黑神社为中心举行。从明治28年（1895年）起就有历史的明治神轿、羽黑神社的相殿神·玉依姬的女子神轿、每年举行的日本最重的神轿的Heisei神轿的三座渡御、以及从旧下馆市内各处聚集的30多座町会神轿的联合渡御等都是值得一看的。在最后一天的清晨，还将举行川渡御，将明治神轿抬到市内的五行河。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://stat.ameba.jp/user_images/20230617/16/sayapepe38/d9/e8/j/o1500099815300309130.jpg",
      title: "下館祇園まつり（しもだてぎおんまつり）图片1",
      alt: "下館祇園まつり（しもだてぎおんまつり）图片1",
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