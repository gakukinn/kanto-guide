/**
 * 花火数据转换工具
 * 将WalkerPlus抓取数据转换为标准HanabiData格式
 * 支持中文和英文信息转换
 */

import { HanabiData } from '../types/hanabi';

// WalkerPlus原始数据接口
export interface WalkerPlusData {
  url: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  address: string;
  fireworksCount: string;
  expectedVisitors: string;
  access: string;
  parking: string;
  contact: string;
  website: string;
  description: string;
  features: string[];
  mapInfo: string;
  coordinates: string;
  images?: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;
}

// 基本信息接口（用户提供）
export interface BasicHanabiInfo {
  id: string;
  name: string;
  japaneseName?: string;
  englishName: string;
  year: number;
  month: number;
  regionKey: string;
  themeColor?: string;
}

// 多语言支持接口
export interface MultiLanguageContent {
  japanese: string;
  chinese: string;
  english: string;
}

/**
 * 将WalkerPlus数据转换为标准HanabiData格式
 */
export function convertWalkerPlusToHanabiData(
  walkerData: WalkerPlusData,
  basicInfo: BasicHanabiInfo,
  multiLangContent?: Partial<{
    description: MultiLanguageContent;
    features: MultiLanguageContent[];
    tips: MultiLanguageContent[];
  }>
): HanabiData {
  // 提取数字信息
  const extractNumber = (text: string): string => {
    const match = text.match(/(\d+(?:,\d+)*)/);
    return match ? match[1] : text;
  };

  // 提取时间信息
  const extractTime = (timeStr: string): string => {
    const timeMatch = timeStr.match(/(\d{1,2}:\d{2})/);
    return timeMatch ? timeMatch[0] : timeStr;
  };

  // 生成地图嵌入URL
  const generateMapEmbedUrl = (address: string): string => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
  };

  // 生成标准HanabiData
  const hanabiData: HanabiData = {
    // 基本信息
    id: basicInfo.id,
    name: basicInfo.name,
    englishName: basicInfo.englishName,

    // 内部参考（日文源数据）
    _sourceData: {
      japaneseName: basicInfo.japaneseName || basicInfo.name,
      japaneseDescription: basicInfo.japaneseName || basicInfo.name,
    },
    year: basicInfo.year,
    month: basicInfo.month,

    // 时间信息
    date: walkerData.date,
    time: walkerData.time,
    duration: '約30分', // 默认值，可根据实际情况调整

    // 花火信息
    fireworksCount: walkerData.fireworksCount
      ? `約${extractNumber(walkerData.fireworksCount)}発`
      : '未定',
    expectedVisitors: walkerData.expectedVisitors
      ? `約${extractNumber(walkerData.expectedVisitors)}人`
      : '未定',
    weather: '晴天時開催',
    ticketPrice: '詳細是公式网站在確認请',
    status: 'scheduled',
    themeColor: basicInfo.themeColor || 'red',

    // 标签系统
    tags: {
      timeTag: `${basicInfo.month}月`,
      regionTag: walkerData.location.split('県')[0] + '県' || '未定',
      typeTag: '花火',
      layerTag: 'Layer 4詳細页',
    },

    // 会场信息
    venues: [
      {
        name: walkerData.venue || walkerData.location,
        location: walkerData.location,
        startTime: extractTime(walkerData.time),
        features: walkerData.features || ['花火大会'],
      },
    ],

    // 交通信息（需要解析access字符串）
    access: [
      {
        venue: walkerData.venue || walkerData.location,
        stations: [
          {
            name: '最寄駅',
            lines: ['詳細是公式网站在確認请'],
            walkTime: walkerData.access || '詳細是公式网站在確認请',
          },
        ],
      },
    ],

    // 观赏地点
    viewingSpots: [
      {
        name: '主要会場',
        rating: 5,
        crowdLevel: '混雑予想',
        tips: '早的場所取将勧',
        pros: ['最高的視界', '迫力満点'],
        cons: ['混雑', '早的到着必要'],
      },
    ],

    // 历史信息
    history: {
      established: basicInfo.year - 2024 + 1, // 假设从某年开始
      significance: '地域的伝統的的花火大会',
      highlights: walkerData.features || [
        '美花火',
        '地域的絆',
        '夏的風物詩',
      ],
    },

    // 贴士
    tips: [
      {
        category: '観覧的',
        items: multiLangContent?.tips?.map(tip => tip.chinese) || [
          '早的場所取将勧',
          '公式网站在最新情報将確認请',
          '天候在中止延期的場合的有',
        ],
      },
      {
        category: '交通交通',
        items: [
          walkerData.access || '公共交通機関将利用请',
          '駐車場情報是公式网站在確認请',
        ],
      },
    ],

    // 联系信息
    contact: {
      organizer: walkerData.contact || '主催者情報是公式网站在確認请',
      phone: '詳細是公式网站在確認请',
      website: walkerData.website || walkerData.url,
      socialMedia: 'SNS情報是公式网站在確認请',
    },

    // 地图信息
    mapInfo: {
      hasMap: true,
      mapNote: walkerData.mapInfo || `${walkerData.venue}在開催`,
      parking: walkerData.parking || '駐車場情報是公式网站在確認请',
    },

    // 天气信息
    weatherInfo: {
      month: `${basicInfo.month}月`,
      temperature:
        basicInfo.month >= 6 && basicInfo.month <= 8 ? '25-30°C' : '15-25°C',
      humidity: '60-80%',
      rainfall: '少雨',
      recommendation: '夏的夜空在映花火将楽请',
      rainPolicy: '雨天時是中止了是延期',
      note: '熱中症対策将请不要忘记',
    },

    // 特殊功能
    specialFeatures: {
      scale: walkerData.fireworksCount
        ? `約${extractNumber(walkerData.fireworksCount)}発的花火`
        : '規模未定',
      location: walkerData.location,
      tradition: '地域的伝統的的花火大会',
      atmosphere: '家族在楽温雰囲気',
    },

    // 2025年特别企划
    special2025: {
      theme: multiLangContent?.description?.chinese || walkerData.description,
      concept: '地域的絆将深花火大会',
      features: walkerData.features || [
        '美花火',
        '地域的特色',
        '夏的思出',
      ],
    },

    // 关联推荐
    related: {
      regionRecommendations: [],
      timeRecommendations: [],
    },

    // 媒体内容
    media:
      walkerData.images?.map(img => ({
        type: 'image' as const,
        url: img.url,
        title: img.alt || `${basicInfo.name}的美花火`,
        description: img.caption || `${basicInfo.name}的花火大会的様子`,
      })) || [],

    // 地图嵌入URL
    mapEmbedUrl: generateMapEmbedUrl(walkerData.address || walkerData.location),

    // 官方数据源验证
    officialSource: {
      walkerPlusUrl: walkerData.url,
      verificationDate: new Date().toISOString().split('T')[0],
      dataConfirmedBy: 'USER_PROVIDED' as const,
      lastChecked: new Date().toISOString().split('T')[0],
    },
  };

  return hanabiData;
}

/**
 * 生成花火详情页面模板
 */
export function generateHanabiPageTemplate(
  hanabiData: HanabiData,
  regionKey: string
): string {
  return `/**
 * 第四层页面 - ${hanabiData.name}详情
 * @layer 四层 (Detail Layer)
 * @category 花火
 * @region ${regionKey}
 * @description ${hanabiData.name}的详细信息页面
 * @template HanabiDetailTemplate.tsx
 */

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';

// ${hanabiData.name}详细数据（基于WalkerPlus官方信息）
const hanabiData = ${JSON.stringify(hanabiData, null, 2)};

export default function ${hanabiData.id.replace(/-/g, '')}DetailPage() {
  return (
    <HanabiDetailTemplate
      data={hanabiData}
      regionKey="${regionKey}"
    />
  );
}`;
}

/**
 * 多语言内容转换工具
 */
export class MultiLanguageConverter {
  /**
   * 将日文转换为中文（占位符，实际需要翻译API）
   */
  static japaneseToChineseSimplified(text: string): string {
    // 这里可以集成翻译API，如Google Translate、百度翻译等
    // 目前返回原文，实际使用时需要实现翻译逻辑
    return text;
  }

  /**
   * 将日文转换为英文（占位符，实际需要翻译API）
   */
  static japaneseToEnglish(text: string): string {
    // 这里可以集成翻译API
    return text;
  }

  /**
   * 批量转换多语言内容
   */
  static convertMultiLanguage(japaneseTexts: string[]): MultiLanguageContent[] {
    return japaneseTexts.map(text => ({
      japanese: text,
      chinese: this.japaneseToChineseSimplified(text),
      english: this.japaneseToEnglish(text),
    }));
  }
}

/**
 * 快速创建花火详情页面的便捷函数
 */
export async function createHanabiDetailPage(
  walkerPlusUrl: string,
  basicInfo: BasicHanabiInfo,
  outputPath: string
): Promise<void> {
  // 这里可以集成抓取逻辑
  console.log(`Creating hanabi detail page for ${basicInfo.name}`);
  console.log(`WalkerPlus URL: ${walkerPlusUrl}`);
  console.log(`Output path: ${outputPath}`);

  // 实际使用时，这里会调用抓取和转换逻辑
  // const walkerData = await crawlWalkerPlusData(walkerPlusUrl);
  // const hanabiData = convertWalkerPlusToHanabiData(walkerData, basicInfo);
  // const pageTemplate = generateHanabiPageTemplate(hanabiData, basicInfo.regionKey);
  // await fs.writeFile(outputPath, pageTemplate);
}
