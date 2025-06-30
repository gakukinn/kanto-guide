/**
 * URL内容抓取器
 * @description 从WalkerPlus等网站自动抓取花火活动详细信息
 */

export interface UrlFetchResult {
  success: boolean;
  data?: any;
  error?: string;
  source?: string;
}

class UrlContentFetcher {
  
  /**
   * 支持的网站模式
   */
  private supportedSites = {
    walkerplus: {
      pattern: /hanabi\.walkerplus\.com/,
      name: 'WalkerPlus花火',
      fetchMethod: 'fetchWalkerPlus'
    },
    jalan: {
      pattern: /jalan\.net/,
      name: 'じゃらん',
      fetchMethod: 'fetchJalan'
    },
    jorudan: {
      pattern: /jorudan\.co\.jp/,
      name: 'ジョルダン',
      fetchMethod: 'fetchJorudan'
    }
  };

  /**
   * 主要抓取函数
   */
  async fetchFromUrl(url: string): Promise<UrlFetchResult> {
    try {
      // 验证URL格式
      const urlObj = new URL(url);
      
      // 识别网站类型
      const siteInfo = this.identifySite(url);
      if (!siteInfo) {
        return {
          success: false,
          error: '不支持的网站。目前支持：WalkerPlus、じゃらん、ジョルダン等'
        };
      }

      // 调用对应的抓取方法
      const fetchMethod = this[siteInfo.fetchMethod as keyof this] as Function;
      const result = await fetchMethod.call(this, url);

      return {
        success: true,
        data: result,
        source: siteInfo.name
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '抓取失败'
      };
    }
  }

  /**
   * 识别网站类型
   */
  private identifySite(url: string): { name: string; fetchMethod: string } | null {
    for (const [key, site] of Object.entries(this.supportedSites)) {
      if (site.pattern.test(url)) {
        return {
          name: site.name,
          fetchMethod: site.fetchMethod
        };
      }
    }
    return null;
  }

  /**
   * 抓取WalkerPlus数据
   */
  private async fetchWalkerPlus(url: string): Promise<any> {
    try {
      // 使用代理API抓取内容以避免CORS问题
      const proxyUrl = `/api/fetch-content?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      return this.parseWalkerPlusHtml(html);

    } catch (error) {
      throw new Error(`WalkerPlus抓取失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * 解析WalkerPlus HTML内容
   */
  private parseWalkerPlusHtml(html: string): any {
    // 创建一个临时的DOM解析器
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const result: any = {};

    try {
      // 活动名称
      const titleElement = doc.querySelector('h1') || doc.querySelector('.ttl01') || doc.querySelector('.detail_title');
      if (titleElement) {
        result.name = titleElement.textContent?.trim();
      }

      // ===== 增强：谷歌地图坐标抓取 =====
      console.log('开始提取地图坐标...');
      
      // 1. 从Google Maps嵌入链接中提取坐标
      const mapIframe = doc.querySelector('iframe[src*="google.com/maps"]') || doc.querySelector('iframe[src*="maps.google"]');
      if (mapIframe) {
        const src = mapIframe.getAttribute('src');
        console.log('找到Google Maps iframe:', src);
        if (src) {
          // 解析坐标：!3d35.1234567!4d139.7654321
          const coordMatch = src.match(/!3d([\d.-]+)!4d([\d.-]+)/);
          if (coordMatch) {
            result.latitude = parseFloat(coordMatch[1]);
            result.longitude = parseFloat(coordMatch[2]);
            console.log('从Google Maps iframe提取坐标:', result.latitude, result.longitude);
          }
        }
      }

      // 2. 从JavaScript代码中提取坐标
      const scripts = doc.querySelectorAll('script');
      console.log('找到script标签数量:', scripts.length);
      
      scripts.forEach((script, index) => {
        const content = script.textContent || '';
        
        // 查找：lat: 35.123, lng: 139.456
        const latLngMatch = content.match(/lat\s*:\s*([\d.-]+).*?lng\s*:\s*([\d.-]+)/);
        if (latLngMatch && !result.latitude) {
          result.latitude = parseFloat(latLngMatch[1]);
          result.longitude = parseFloat(latLngMatch[2]);
          console.log('从JavaScript lat/lng提取坐标:', result.latitude, result.longitude);
        }

        // 查找：new google.maps.LatLng(35.123, 139.456)
        const latLngConstructor = content.match(/new\s+google\.maps\.LatLng\s*\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/);
        if (latLngConstructor && !result.latitude) {
          result.latitude = parseFloat(latLngConstructor[1]);
          result.longitude = parseFloat(latLngConstructor[2]);
          console.log('从LatLng构造函数提取坐标:', result.latitude, result.longitude);
        }

        // 查找：center: [35.123, 139.456]
        const centerArray = content.match(/center\s*:\s*\[\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\]/);
        if (centerArray && !result.latitude) {
          result.latitude = parseFloat(centerArray[1]);
          result.longitude = parseFloat(centerArray[2]);
          console.log('从center数组提取坐标:', result.latitude, result.longitude);
        }

        // 增加：查找WalkerPlus特有的坐标格式
        // 查找：latitude: 35.123, longitude: 139.456
        const latitudeLongitude = content.match(/latitude\s*:\s*([\d.-]+).*?longitude\s*:\s*([\d.-]+)/);
        if (latitudeLongitude && !result.latitude) {
          result.latitude = parseFloat(latitudeLongitude[1]);
          result.longitude = parseFloat(latitudeLongitude[2]);
          console.log('从latitude/longitude提取坐标:', result.latitude, result.longitude);
        }

        // 查找：{lat: 35.123, lng: 139.456}
        const objectLatLng = content.match(/\{\s*lat\s*:\s*([\d.-]+)\s*,\s*lng\s*:\s*([\d.-]+)\s*\}/);
        if (objectLatLng && !result.latitude) {
          result.latitude = parseFloat(objectLatLng[1]);
          result.longitude = parseFloat(objectLatLng[2]);
          console.log('从对象格式提取坐标:', result.latitude, result.longitude);
        }

        // 查找：position: {lat: 35.123, lng: 139.456}
        const positionLatLng = content.match(/position\s*:\s*\{\s*lat\s*:\s*([\d.-]+)\s*,\s*lng\s*:\s*([\d.-]+)\s*\}/);
        if (positionLatLng && !result.latitude) {
          result.latitude = parseFloat(positionLatLng[1]);
          result.longitude = parseFloat(positionLatLng[2]);
          console.log('从position对象提取坐标:', result.latitude, result.longitude);
        }

        // 查找：任何包含数字的坐标模式 (35.xxxxx, 139.xxxxx)
        const generalCoords = content.match(/(35\.\d{4,})[^\d]+(139\.\d{4,})/);
        if (generalCoords && !result.latitude) {
          result.latitude = parseFloat(generalCoords[1]);
          result.longitude = parseFloat(generalCoords[2]);
          console.log('从通用坐标格式提取:', result.latitude, result.longitude);
        }
      });

      // 3. 从链接href中提取坐标
      const mapLinks = doc.querySelectorAll('a[href*="maps.google"], a[href*="google.com/maps"]');
      console.log('找到地图链接数量:', mapLinks.length);
      
      mapLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !result.latitude) {
          console.log('检查地图链接:', href);
          
          // 解析：@35.123456,139.654321
          const coordMatch = href.match(/@([\d.-]+),([\d.-]+)/);
          if (coordMatch) {
            result.latitude = parseFloat(coordMatch[1]);
            result.longitude = parseFloat(coordMatch[2]);
            console.log('从地图链接提取坐标:', result.latitude, result.longitude);
          }
          
          // 解析：ll=35.123456,139.654321
          const llMatch = href.match(/ll=([\d.-]+),([\d.-]+)/);
          if (llMatch && !result.latitude) {
            result.latitude = parseFloat(llMatch[1]);
            result.longitude = parseFloat(llMatch[2]);
            console.log('从ll参数提取坐标:', result.latitude, result.longitude);
          }

          // 解析：q=35.123456,139.654321
          const qMatch = href.match(/q=([\d.-]+),([\d.-]+)/);
          if (qMatch && !result.latitude) {
            result.latitude = parseFloat(qMatch[1]);
            result.longitude = parseFloat(qMatch[2]);
            console.log('从q参数提取坐标:', result.latitude, result.longitude);
          }
        }
      });

      // 4. 从meta标签或data属性中提取坐标
      const metaTags = doc.querySelectorAll('meta[name*="lat"], meta[name*="lng"], meta[name*="coordinate"]');
      metaTags.forEach(meta => {
        const name = meta.getAttribute('name');
        const content = meta.getAttribute('content');
        if (name && content && !result.latitude) {
          if (name.includes('lat')) {
            result.latitude = parseFloat(content);
            console.log('从meta标签提取纬度:', result.latitude);
          } else if (name.includes('lng')) {
            result.longitude = parseFloat(content);
            console.log('从meta标签提取经度:', result.longitude);
          }
        }
      });

      // 5. 从任何data属性中提取坐标
      const dataElements = doc.querySelectorAll('[data-lat], [data-lng], [data-latitude], [data-longitude]');
      dataElements.forEach(element => {
        if (!result.latitude) {
          const lat = element.getAttribute('data-lat') || element.getAttribute('data-latitude');
          const lng = element.getAttribute('data-lng') || element.getAttribute('data-longitude');
          if (lat && lng) {
            result.latitude = parseFloat(lat);
            result.longitude = parseFloat(lng);
            console.log('从data属性提取坐标:', result.latitude, result.longitude);
          }
        }
      });

      console.log('坐标提取完成，最终结果:', result.latitude, result.longitude);

      // ===== 增强：官方网站链接抓取 =====
      // 1. 查找"公式サイト"相关区域
      const officialSiteElements = doc.querySelectorAll('*');
      let officialWebsite = '';
      
      officialSiteElements.forEach(element => {
        const text = element.textContent || '';
        // 如果包含"公式サイト"、"公式ホームページ"、"オフィシャルサイト"等关键词
        if ((text.includes('公式サイト') || text.includes('公式ホームページ') || text.includes('オフィシャルサイト') || text.includes('関連サイト')) && !officialWebsite) {
          // 在这个元素或其父元素中查找链接
          const linkInElement = element.querySelector('a[href^="http"]') || element.closest('*')?.querySelector('a[href^="http"]');
          if (linkInElement) {
            const href = linkInElement.getAttribute('href');
            if (href && href !== window.location.href && !href.includes('walkerplus.com')) {
              officialWebsite = href;
              console.log('从公式サイト区域提取官网:', officialWebsite);
            }
          }
        }
      });

      // 2. 查找表格中的官网信息
      const infoTable = doc.querySelector('.basicInfo') || doc.querySelector('.info_table') || doc.querySelector('.detail_info');
      let foundOfficialInTable = false;
      
      if (infoTable && !officialWebsite) {
        const rows = infoTable.querySelectorAll('tr');
        
        rows.forEach(row => {
          const th = row.querySelector('th');
          const td = row.querySelector('td');
          
          if (th && td && !foundOfficialInTable) {
            const label = th.textContent?.trim() || '';
            
            // 根据标签解析不同字段
            if (label.includes('開催日') || label.includes('日程')) {
              result.date = this.parseDate(td.textContent?.trim() || '');
            } else if (label.includes('開催時間') || label.includes('時間')) {
              const timeData = this.parseTime(td.textContent?.trim() || '');
              result.startTime = timeData.startTime;
              result.endTime = timeData.endTime;
              result.duration = timeData.duration;
            } else if (label.includes('会場') || label.includes('場所')) {
              result.venue = td.textContent?.trim();
            } else if (label.includes('住所') || label.includes('所在地')) {
              const address = td.textContent?.trim() || '';
              result.address = address;
              result.region = this.inferRegionFromAddress(address);
            } else if (label.includes('花火') && label.includes('数')) {
              const count = td.textContent?.trim() || '';
              result.fireworksCount = count.replace(/[^0-9,]/g, '') + '发';
            } else if (label.includes('人出') || label.includes('観客')) {
              result.expectedVisitors = this.parseVisitorCount(td.textContent?.trim() || '');
            } else if (label.includes('アクセス') || label.includes('交通')) {
              result.access = td.textContent?.trim();
            } else if (label.includes('駐車場')) {
              result.parking = td.textContent?.trim();
            } else if (label.includes('料金')) {
              result.ticketInfo = td.textContent?.trim();
            } else if (label.includes('問い合わせ') || label.includes('連絡先')) {
              const contactText = td.textContent?.trim() || '';
              const phoneMatch = contactText.match(/\d{2,4}-\d{2,4}-\d{4}/);
              if (phoneMatch) {
                result.contactPhone = phoneMatch[0];
              }
            } else if (label.includes('サイト') || label.includes('ホームページ') || label.includes('URL') || label.includes('WEB')) {
              // 在表格中查找官网链接
              const linkInTd = td.querySelector('a[href^="http"]');
              if (linkInTd) {
                const href = linkInTd.getAttribute('href');
                if (href && !href.includes('walkerplus.com')) {
                  officialWebsite = href;
                  foundOfficialInTable = true;
                  console.log('从表格中提取官网:', officialWebsite);
                }
              }
            }
          }
        });
      }

      // 3. 设置官网结果
      if (officialWebsite) {
        result.website = officialWebsite;
      } else {
        // 如果找不到官网，记录调试信息
        console.log('未找到官方网站链接，将搜索所有外部链接...');
        const allExternalLinks = doc.querySelectorAll('a[href^="http"]');
        const externalUrls: string[] = [];
        allExternalLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.includes('walkerplus.com') && !href.includes('google.com')) {
            externalUrls.push(href);
          }
        });
        console.log('找到的外部链接:', externalUrls);
        
        // 选择第一个非Google的外部链接作为可能的官网
        if (externalUrls.length > 0) {
          result.website = externalUrls[0];
          console.log('使用第一个外部链接作为官网:', result.website);
        }
      }

      // 详细描述
      const descElement = doc.querySelector('.description') || doc.querySelector('.detail_text') || doc.querySelector('.event_description');
      if (descElement) {
        result.description = descElement.textContent?.trim();
      }

      // 亮点特色
      const highlightElements = doc.querySelectorAll('.highlight, .point, .feature');
      if (highlightElements.length > 0) {
        const highlights: string[] = [];
        highlightElements.forEach(el => {
          const text = el.textContent?.trim();
          if (text) highlights.push(text);
        });
        result.highlights = highlights.join(',');
      }

      // 图片
      const imgElements = doc.querySelectorAll('img[src*="hanabi"], img[src*="firework"], img[alt*="花火"]');
      if (imgElements.length > 0) {
        const images: string[] = [];
        imgElements.forEach(img => {
          const src = img.getAttribute('src');
          if (src) {
            // 转换相对路径为绝对路径
            if (src.startsWith('/')) {
              images.push(`https://hanabi.walkerplus.com${src}`);
            } else if (src.startsWith('http')) {
              images.push(src);
            }
          }
        });
        result.images = images.slice(0, 5); // 最多5张图片
      }

      // 智能推断活动类型
      const fullText = html.toLowerCase();
      if (fullText.includes('海上') || fullText.includes('海岸')) {
        result.category = '海上花火';
      } else if (fullText.includes('川') || fullText.includes('河')) {
        result.category = '河川花火';
      } else if (fullText.includes('音楽') || fullText.includes('ミュージック')) {
        result.category = '音乐花火';
      } else {
        result.category = '传统花火';
      }

      // 默认天气备案
      if (fullText.includes('雨天中止') || fullText.includes('荒天中止')) {
        result.weather = '雨天中止';
      } else {
        result.weather = '雨天中止';
      }

      // 调试输出
      console.log('抓取结果汇总:', {
        name: result.name,
        coordinates: result.latitude && result.longitude ? `${result.latitude}, ${result.longitude}` : '未找到',
        website: result.website || '未找到',
        venue: result.venue,
        address: result.address
      });

      return result;

    } catch (error) {
      throw new Error(`HTML解析失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * 解析日期
   */
  private parseDate(dateStr: string): string | undefined {
    // 2025年7月18日 -> 2025-07-18
    const match1 = dateStr.match(/(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/);
    if (match1) {
      const year = match1[1];
      const month = match1[2].padStart(2, '0');
      const day = match1[3].padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // 7月18日 -> 当前年-07-18
    const match2 = dateStr.match(/(\d{1,2})月\s*(\d{1,2})日/);
    if (match2) {
      const currentYear = new Date().getFullYear();
      const month = match2[1].padStart(2, '0');
      const day = match2[2].padStart(2, '0');
      return `${currentYear}-${month}-${day}`;
    }

    return undefined;
  }

  /**
   * 解析时间
   */
  private parseTime(timeStr: string): { startTime?: string; endTime?: string; duration?: string } {
    // 19:30～20:20
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*[～~-]\s*(\d{1,2}):(\d{2})/);
    if (match) {
      const startTime = `${match[1].padStart(2, '0')}:${match[2]}`;
      const endTime = `${match[3].padStart(2, '0')}:${match[4]}`;
      
      // 计算时长
      const startMinutes = parseInt(match[1]) * 60 + parseInt(match[2]);
      const endMinutes = parseInt(match[3]) * 60 + parseInt(match[4]);
      const diffMinutes = endMinutes - startMinutes;
      
      let duration = '';
      if (diffMinutes > 0 && diffMinutes < 300) {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        
        if (hours > 0) {
          duration = `约${hours}小时${minutes > 0 ? minutes + '分钟' : ''}`;
        } else {
          duration = `约${minutes}分钟`;
        }
      }

      return { startTime, endTime, duration };
    }

    return {};
  }

  /**
   * 解析观众数量
   */
  private parseVisitorCount(countStr: string): string {
    // 16万人
    const match1 = countStr.match(/(\d+(?:\.\d+)?)\s*万人/);
    if (match1) {
      return `约${match1[1]}万人`;
    }

    // 160,000人
    const match2 = countStr.match(/(\d+(?:,\d{3})*)\s*人/);
    if (match2) {
      const num = parseInt(match2[1].replace(/,/g, ''));
      return `约${(num / 10000).toFixed(1)}万人`;
    }

    return countStr;
  }

  /**
   * 根据地址推断地区
   */
  private inferRegionFromAddress(address: string): string | undefined {
    if (address.includes('東京都')) return 'tokyo';
    if (address.includes('神奈川県')) return 'kanagawa';
    if (address.includes('千葉県')) return 'chiba';
    if (address.includes('埼玉県')) return 'saitama';
    if (address.includes('茨城県') || address.includes('栃木県') || address.includes('群馬県')) return 'kitakanto';
    if (address.includes('新潟県') || address.includes('長野県') || address.includes('山梨県')) return 'koshinetsu';
    
    return undefined;
  }

  /**
   * 抓取じゃらん数据（简化版）
   */
  private async fetchJalan(url: string): Promise<any> {
    // 实现类似的抓取逻辑，这里先返回基本结构
    return {
      name: '从じゃらん抓取的活动（功能开发中）',
      source: 'jalan'
    };
  }

  /**
   * 抓取ジョルダン数据（简化版）
   */
  private async fetchJorudan(url: string): Promise<any> {
    // 实现类似的抓取逻辑，这里先返回基本结构
    return {
      name: '从ジョルダン抓取的活动（功能开发中）',
      source: 'jorudan'
    };
  }
}

export default UrlContentFetcher; 