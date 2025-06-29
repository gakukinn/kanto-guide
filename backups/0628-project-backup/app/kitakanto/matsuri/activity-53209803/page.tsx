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
  description: "筑西最大の夏祭りで知られる「下館祇園まつり」が、大町の羽黒神社を中心に開催されます。明治28年（1895年）からの歴史を持つ明治神輿、羽黒神社の相殿神・玉依姫の女子神輿、毎年担ぎ出される神輿としては日本最大級の重量を誇る平成神輿の3基による渡御や、旧下館市内各所から30数基の町会神輿が参集する連合渡御が見どころとなっています。最終日の早朝には、市内の五行川に明治神輿を担ぎ入れる川渡御も行われます。",
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