import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花见会详情页面
 * 数据库ID: recognition-hanami-1750933572105
 * 生成时间: 2025/6/26 19:26:12
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 能護寺　あじさい（のうごじ　あじさい）
 * 2. 所在地: 〒360-0237　埼玉県熊谷市永井太田1141
 * 3. 开催期间: 2025年6月上旬～下旬　 無料シャトル巴士で行く小さないい旅/6月14日～15日8:30～14:15（JR籠原駅北口出発）
 * 4. 开催场所: 埼玉県熊谷市　能護寺（あじさい寺）
 * 5. 交通方式: ＪＲ高崎線「籠原駅」乘巴士约30分「能護寺（あじさい寺）」下車
 * 6. 主办方: 一般社団法人熊谷市観光協会
 * 7. 料金: あじさい開花時期のみ拝観料が必要/一般300円、小学生以下無料
 * 8. 联系方式: 一般社団法人熊谷市観光協会　048-594-6677
 * 9. 官方网站: https://www.city.熊谷.lg.jp/kanko/midokoro/nogoji.html
 * 10. 谷歌地图: 36.230979,139.339145
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanami-1750933572105",
  name: "能护寺绣球花（のうごじ　あじさい）",
  address: "〒360-0237　埼玉県熊谷市永井太田1141",
  datetime: "2025年6月上旬～下旬　 無料シャトル巴士で行く小さないい旅/6月14日～15日8:30～14:15（JR籠原駅北口出発）",
  venue: "埼玉県熊谷市　能護寺（あじさい寺）",
  access: "ＪＲ高崎線「籠原駅」乘巴士约30分「能護寺（あじさい寺）」下車",
  organizer: "一般社団法人熊谷市観光協会",
  price: "あじさい開花時期のみ拝観料が必要/一般300円、小学生以下無料",
  contact: "一般社団法人熊谷市観光協会　048-594-6677",
  website: "https://www.city.熊谷.lg.jp/kanko/midokoro/nogoji.html",
  googleMap: "https://maps.google.com/maps?q=36.230979,139.339145&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "能护寺绣球花每年六月中旬至七月上旬迎来最佳观赏期，寺内约有一万株绣球花盛开，色彩从淡蓝到深紫在山坡与石阶间层叠交织，被称为“关东绣球花寺”。沿着寺内石阶而上，绣球花在两侧环绕铺展，雨后水珠挂在花瓣上更加清透动人，散发静谧氛围。寺内还设有茶席与限定御朱印，为访客留下夏日限定的美好回忆，是体验日本梅雨季自然美景与宁静寺院氛围的绝佳场所。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://hanatera.jp/wp/wp-content/uploads/2019/09/IMG_0062.jpg",
      title: "能護寺　あじさい（のうごじ　あじさい）图片1",
      alt: "能護寺　あじさい（のうごじ　あじさい）图片1",
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
        activityKey="hanami"
      />
    </div>
  );
};

export default DetailPage;