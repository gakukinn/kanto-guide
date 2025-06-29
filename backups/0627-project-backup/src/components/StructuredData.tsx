/**
 * 结构化数据组件
 * 为页面添加JSON-LD结构化数据，提升SEO效果
 */

import { Fragment } from 'react';

interface StructuredDataProps {
  type: 'website' | 'event' | 'tourist-attraction' | 'organization';
  data: Record<string, any>;
}

interface EventData {
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
  };
  description: string;
  image: string;
  url: string;
  organizer?: {
    name: string;
    type: string;
  };
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

interface WebsiteData {
  name: string;
  url: string;
  description: string;
  publisher: {
    name: string;
    type: string;
  };
  sameAs?: string[];
}

interface TouristAttractionData {
  name: string;
  description: string;
  image: string;
  address: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  url: string;
  touristType: string[];
}

/**
 * 生成事件结构化数据
 */
function generateEventStructuredData(data: EventData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    startDate: data.startDate,
    endDate: data.endDate || data.startDate,
    location: {
      '@type': 'Place',
      name: data.location.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.location.address,
        addressCountry: '日本',
      },
      ...(data.location.latitude && data.location.longitude
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            },
          }
        : {}),
    },
    description: data.description,
    image: data.image,
    url: data.url,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    ...(data.organizer
      ? {
          organizer: {
            '@type': data.organizer.type || 'Organization',
            name: data.organizer.name,
          },
        }
      : {}),
    ...(data.offers
      ? {
          offers: {
            '@type': 'Offer',
            price: data.offers.price,
            priceCurrency: data.offers.priceCurrency,
            availability: data.offers.availability,
          },
        }
      : {}),
    inLanguage: 'zh-CN',
    audience: {
      '@type': 'Audience',
      audienceType: ['tourists', 'families', 'culture enthusiasts'],
    },
  };
}

/**
 * 生成网站结构化数据
 */
function generateWebsiteStructuredData(data: WebsiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    publisher: {
      '@type': data.publisher.type,
      name: data.publisher.name,
    },
    inLanguage: 'zh-CN',
    ...(data.sameAs ? { sameAs: data.sameAs } : {}),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 生成旅游景点结构化数据
 */
function generateTouristAttractionStructuredData(data: TouristAttractionData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: data.name,
    description: data.description,
    image: data.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.address,
      addressCountry: '日本',
    },
    ...(data.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.geo.latitude,
            longitude: data.geo.longitude,
          },
        }
      : {}),
    url: data.url,
    touristType: data.touristType,
    inLanguage: 'zh-CN',
  };
}

/**
 * 生成组织结构化数据
 */
function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '关东旅游指南',
    url: 'https://www.kanto-travel-guide.com',
    description: '专业的关东地区旅游指南，提供最新的花火大会、祭典活动信息',
    foundingDate: '2024',
    specialty: ['旅游指南', '文化活动', '花火大会', '祭典信息'],
    serviceArea: {
      '@type': 'AdministrativeArea',
      name: '关东地区',
      containedInPlace: {
        '@type': 'Country',
        name: '日本',
      },
    },
    knowsAbout: ['花火大会', '日本祭典', '关东旅游', '文化活动', '旅游攻略'],
    inLanguage: 'zh-CN',
  };
}

/**
 * 结构化数据组件
 */
export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, any>;

  switch (type) {
    case 'event':
      structuredData = generateEventStructuredData(data as EventData);
      break;
    case 'website':
      structuredData = generateWebsiteStructuredData(data as WebsiteData);
      break;
    case 'tourist-attraction':
      structuredData = generateTouristAttractionStructuredData(
        data as TouristAttractionData
      );
      break;
    case 'organization':
      structuredData = generateOrganizationStructuredData();
      break;
    default:
      return null;
  }

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
    </Fragment>
  );
}

/**
 * 花火大会结构化数据工具函数
 */
export function createHanabiEventStructuredData(hanabiData: {
  name: string;
  date: string;
  location: string;
  description: string;
  prefecture: string;
  url: string;
}) {
  return {
    type: 'event' as const,
    data: {
      name: hanabiData.name,
      startDate: hanabiData.date,
      location: {
        name: hanabiData.location,
        address: `${hanabiData.location}, ${hanabiData.prefecture}`,
      },
      description: hanabiData.description,
      image: `/images/hanabi/${hanabiData.name.toLowerCase().replace(/\s+/g, '-')}-fireworks.svg`,
      url: hanabiData.url,
      organizer: {
        name: `${hanabiData.prefecture}観光協会`,
        type: 'Organization',
      },
      offers: {
        price: '0',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
    } as EventData,
  };
}

/**
 * 祭典活动结构化数据工具函数
 */
export function createMatsuriEventStructuredData(matsuriData: {
  name: string;
  date: string;
  location: string;
  description: string;
  prefecture: string;
  url: string;
}) {
  return {
    type: 'event' as const,
    data: {
      name: matsuriData.name,
      startDate: matsuriData.date,
      location: {
        name: matsuriData.location,
        address: `${matsuriData.location}, ${matsuriData.prefecture}`,
      },
      description: matsuriData.description,
      image: `/images/matsuri/${matsuriData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      url: matsuriData.url,
      organizer: {
        name: `${matsuriData.prefecture}観光協会`,
        type: 'Organization',
      },
      offers: {
        price: '0',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
    } as EventData,
  };
}

// 导出类型定义供其他组件使用
export type { EventData, TouristAttractionData, WebsiteData };
