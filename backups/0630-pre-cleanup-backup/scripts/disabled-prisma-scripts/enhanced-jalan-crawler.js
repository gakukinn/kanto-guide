const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

class EnhancedJalanCrawler {
  constructor() {
    this.browser = null;
    this.page = null;
    this.extractionLog = [];
  }

  async initBrowser() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });

    this.page = await this.browser.newPage();
    
    // 设置真实浏览器标识
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    console.log('✅ 浏览器启动成功');
  }

  // 增强版字段提取器 - 多重选择器策略
  extractFieldEnhanced($, fieldType) {
    const selectors = this.getEnhancedSelectors(fieldType);
    
    for (const selectorGroup of selectors) {
      console.log(`🔍 尝试 ${selectorGroup.description}...`);
      
      for (const selector of selectorGroup.selectors) {
        let value = '';
        
        if (fieldType === 'website') {
          const element = $(selector).first();
          value = element.attr('href') || element.text().trim();
          if (value && value.includes('http')) {
            console.log(`✅ ${selectorGroup.description}: ${value}`);
            return this.cleanValue(value, fieldType);
          }
        } else {
          value = $(selector).first().text().trim();
          if (value && value.length > 2) {
            console.log(`✅ ${selectorGroup.description}: ${value.substring(0, 50)}...`);
            return this.cleanValue(value, fieldType);
          }
        }
      }
    }
    
    console.log(`⚠️ ${fieldType}: 所有方法均未找到信息`);
    return `${fieldType}信息需要人工确认`;
  }

  // 增强版选择器配置 - 基于Jalan网站实际结构优化
  getEnhancedSelectors(fieldType) {
    const selectorMap = {
      name: [
        {
          description: 'Jalan标题结构',
          selectors: [
            '.eventDetailContainer h1',
            '.eventDetailHeader h1', 
            '.eventDetailTit',
            'h1.eventDetailTit',
            '.eventDetailHead .eventDetailTit'
          ]
        },
        {
          description: '通用标题结构',
          selectors: [
            'h1',
            '.pageTitle h1',
            '.title h1',
            '.main-title'
          ]
        }
      ],
      
      address: [
        {
          description: 'Jalan详情信息区域',
          selectors: [
            '.eventDetailData .eventDetailItem:contains("住所") .eventDetailText',
            '.eventDetailInfo .eventDetailItem:contains("住所") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("会場") .eventDetailText',
            '.eventDetailData .eventDetailText',
            '.eventDetailInfo .eventDetailText'
          ]
        },
        {
          description: 'Jalan地址相关',
          selectors: [
            '.eventDetailMap .eventDetailText',
            '.eventDetailLocation .eventDetailText',
            '.address',
            '.location-text'
          ]
        }
      ],

      datetime: [
        {
          description: 'Jalan日期时间区域',
          selectors: [
            '.eventDetailData .eventDetailItem:contains("開催期間") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("期間") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("日時") .eventDetailText',
            '.eventDetailInfo .eventDetailItem:contains("開催期間") .eventDetailText'
          ]
        },
        {
          description: 'Jalan时间相关通用',
          selectors: [
            '.eventDetailTime .eventDetailText',
            '.eventDetailSchedule .eventDetailText',
            '.schedule-text',
            '.datetime-text'
          ]
        }
      ],

      venue: [
        {
          description: 'Jalan会场信息',
          selectors: [
            '.eventDetailData .eventDetailItem:contains("会場") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("場所") .eventDetailText',
            '.eventDetailInfo .eventDetailItem:contains("会場") .eventDetailText',
            '.eventDetailVenue .eventDetailText'
          ]
        },
        {
          description: '会场相关通用',
          selectors: [
            '.venue-text',
            '.place-text',
            '.location'
          ]
        }
      ],

      access: [
        {
          description: 'Jalan交通信息',
          selectors: [
            '.eventDetailData .eventDetailItem:contains("アクセス") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("交通") .eventDetailText',
            '.eventDetailInfo .eventDetailItem:contains("アクセス") .eventDetailText',
            '.eventDetailAccess .eventDetailText'
          ]
        },
        {
          description: '交通相关通用',
          selectors: [
            '.access-text',
            '.transportation-text',
            '.how-to-get'
          ]
        }
      ],

      organizer: [
        {
          description: 'Jalan主办方信息',
          selectors: [
            '.eventDetailData .eventDetailItem:contains("主催") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("主办") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("実行委員会") .eventDetailText',
            '.eventDetailInfo .eventDetailItem:contains("主催") .eventDetailText'
          ]
        },
        {
          description: '主办方相关通用',
          selectors: [
            '.organizer-text',
            '.sponsor-text',
            '.host-text'
          ]
        }
      ],

      price: [
        {
          description: 'Jalan费用信息',
          selectors: [
            '.eventDetailData .eventDetailItem:contains("料金") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("入場料") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("観覧料") .eventDetailText',
            '.eventDetailInfo .eventDetailItem:contains("料金") .eventDetailText'
          ]
        },
        {
          description: '费用相关通用',
          selectors: [
            '.price-text',
            '.fee-text',
            '.cost-text',
            '.admission-text'
          ]
        }
      ],

      contact: [
        {
          description: 'Jalan联系方式',
          selectors: [
            '.eventDetailData .eventDetailItem:contains("お問い合わせ") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("連絡先") .eventDetailText',
            '.eventDetailData .eventDetailItem:contains("TEL") .eventDetailText',
            '.eventDetailInfo .eventDetailItem:contains("お問い合わせ") .eventDetailText'
          ]
        },
        {
          description: '联系方式相关通用',
          selectors: [
            '.contact-text',
            '.tel-text',
            '.phone-text',
            '.inquiry-text'
          ]
        }
      ],

      website: [
        {
          description: 'Jalan官方网站链接',
          selectors: [
            '.eventDetailData .eventDetailItem a[href*="http"]',
            '.eventDetailInfo .eventDetailItem a[href*="http"]',
            '.eventDetailLink a[href*="http"]',
            '.official-link a'
          ]
        },
        {
          description: '网站链接通用',
          selectors: [
            'a:contains("公式サイト")',
            'a:contains("ホームページ")',
            'a:contains("公式")',
            '.website a',
            '.homepage a'
          ]
        }
      ]
    };

    return selectorMap[fieldType] || [];
  }

  // 数据清理和格式化
  cleanValue(value, fieldType) {
    if (!value) return value;
    
    // 基础清理
    value = value.replace(/\s+/g, ' ').trim();
    
    // 字段特定清理
    switch (fieldType) {
      case 'datetime':
        // 清理日期格式
        value = value.replace(/開催期間[：:]\s*/, '');
        value = value.replace(/期間[：:]\s*/, '');
        break;
        
      case 'price':
        // 清理费用格式
        value = value.replace(/料金[：:]\s*/, '');
        value = value.replace(/入場料[：:]\s*/, '');
        break;
        
      case 'contact':
        // 清理联系方式格式
        value = value.replace(/お問い合わせ[：:]\s*/, '');
        value = value.replace(/連絡先[：:]\s*/, '');
        break;
        
      case 'address':
        // 清理地址格式
        value = value.replace(/住所[：:]\s*/, '');
        break;
    }
    
    return value;
  }

  // 智能地区检测 - 基于地址和关键词
  detectRegionSmart(activityData) {
    const { address, venue, name } = activityData;
    const content = `${address} ${venue} ${name}`.toLowerCase();
    
    const regionKeywords = {
      'tokyo': ['東京', '新宿', '渋谷', '池袋', '品川', '上野', '浅草', '銀座', '新橋'],
      'saitama': ['埼玉', 'さいたま', '大宮', '川越', '所沢', '春日部', '川口'],
      'chiba': ['千葉', '船橋', '柏', '市川', '松戸', '成田', '木更津'],
      'kanagawa': ['神奈川', '横浜', '川崎', '相模原', '藤沢', '茅ヶ崎', '平塚'],
      'kitakanto': ['茨城', '栃木', '群馬', '水戸', '宇都宮', '前橋', '高崎'],
      'koshinetsu': ['長野', '新潟', '山梨', '富士', '甲府', '松本', '河口湖']
    };

    for (const [region, keywords] of Object.entries(regionKeywords)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        console.log(`🎯 地区识别: ${region} (匹配关键词)`);
        return region;
      }
    }
    
    console.log('⚠️ 无法确定地区，默认设置为tokyo');
    return 'tokyo';
  }

  // 增强版坐标提取 - 实现技术指南中的四种方法
  async extractCoordinatesEnhanced() {
    console.log('🗺️ 开始增强版坐标提取...');
    
    const coordinates = {};
    
    try {
      // 方法1: iframe地图分析
      console.log('🔍 方法1: iframe地图分析...');
      coordinates.iframe = await this.page.evaluate(() => {
        const iframes = Array.from(document.querySelectorAll('iframe'));
        for (const iframe of iframes) {
          const src = iframe.src;
          if (src && (src.includes('maps.google') || src.includes('google.com/maps'))) {
            const patterns = [
              /[!@]([0-9.-]+),([0-9.-]+)/,
              /center=([0-9.-]+),([0-9.-]+)/,
              /ll=([0-9.-]+),([0-9.-]+)/
            ];
            
            for (const pattern of patterns) {
              const match = src.match(pattern);
              if (match) {
                const lat = parseFloat(match[1]);
                const lng = parseFloat(match[2]);
                if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                  return { lat, lng, source: 'iframe地图' };
                }
              }
            }
          }
        }
        return null;
      });

      // 方法2: JavaScript变量搜索
      console.log('🔍 方法2: JavaScript变量搜索...');
      coordinates.javascript = await this.page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script'));
        for (const script of scripts) {
          const text = script.textContent || '';
          const patterns = [
            /lat[:\s]*([0-9.]+)[\s,]*lng[:\s]*([0-9.]+)/gi,
            /latitude[:\s]*([0-9.]+)[\s,]*longitude[:\s]*([0-9.]+)/gi,
            /"lat"[:\s]*([0-9.]+)[\s,]*"lng"[:\s]*([0-9.]+)/gi
          ];
          
          for (const pattern of patterns) {
            const match = pattern.exec(text);
            if (match) {
              const lat = parseFloat(match[1]);
              const lng = parseFloat(match[2]);
              if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                return { lat, lng, source: 'JavaScript变量' };
              }
            }
          }
        }
        return null;
      });

      // 方法3: 链接坐标提取 (技术指南推荐)
      console.log('🔍 方法3: 链接坐标提取...');
      coordinates.link = await this.page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
        for (const link of links) {
          const href = link.href;
          const patterns = [
            /@([0-9.-]+),([0-9.-]+)/,
            /ll=([0-9.-]+),([0-9.-]+)/,
            /center=([0-9.-]+),([0-9.-]+)/,
            /q=([0-9.-]+),([0-9.-]+)/
          ];
          
          for (const pattern of patterns) {
            const match = href.match(pattern);
            if (match) {
              const lat = parseFloat(match[1]);
              const lng = parseFloat(match[2]);
              if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                return { lat, lng, source: 'Google Maps链接', url: href };
              }
            }
          }
        }
        return null;
      });

      // 方法4: Meta标签检查
      console.log('🔍 方法4: Meta标签检查...');
      coordinates.meta = await this.page.evaluate(() => {
        const geoTags = Array.from(document.querySelectorAll('meta[name*="geo"], meta[property*="geo"]'));
        for (const tag of geoTags) {
          const content = tag.getAttribute('content');
          if (content) {
            const match = content.match(/([0-9.-]+)[;,\s]+([0-9.-]+)/);
            if (match) {
              const lat = parseFloat(match[1]);
              const lng = parseFloat(match[2]);
              if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                return { lat, lng, source: 'Meta标签' };
              }
            }
          }
        }
        return null;
      });

      // 按技术指南推荐的优先级选择
      const finalCoords = coordinates.link || coordinates.iframe || coordinates.javascript || coordinates.meta;
      
      if (finalCoords) {
        console.log(`✅ 坐标提取成功 (${finalCoords.source}): ${finalCoords.lat}, ${finalCoords.lng}`);
        
        // 生成Google Maps嵌入URL
        const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${finalCoords.lng}!3d${finalCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;
        
        return {
          ...finalCoords,
          embedUrl
        };
      }
      
      console.log('⚠️ 所有方法均未能提取到坐标');
      return null;
      
    } catch (error) {
      console.error(`❌ 坐标提取过程出错: ${error.message}`);
      return null;
    }
  }

  // 主要提取流程 - 完整的十一项数据
  async extractCompleteActivityInfo(url) {
    console.log(`\n📡 访问页面: ${url}`);
    
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await this.page.waitForTimeout(3000); // 等待页面完全加载
      
      const content = await this.page.content();
      const $ = cheerio.load(content);
      
      console.log('\n🔍 开始详细信息提取...');
      
      // 首先尝试从结构化数据提取 (JSON-LD)
      const structuredData = this.extractStructuredData($);
      console.log('📊 结构化数据提取结果:', structuredData);
      
      // 然后使用选择器提取剩余信息
      const activityInfo = {
        name: structuredData.name || this.extractFieldEnhanced($, 'name'),
        address: structuredData.address || this.extractFromDtDd($, '住所') || this.extractFieldEnhanced($, 'address'),
        datetime: structuredData.datetime || this.extractFromDtDd($, '開催期間') || this.extractFieldEnhanced($, 'datetime'),
        venue: structuredData.venue || this.extractFromDtDd($, '開催場所') || this.extractFieldEnhanced($, 'venue'),
        access: this.extractFromDtDd($, 'アクセス') || this.extractFieldEnhanced($, 'access'),
        organizer: this.extractFromDtDd($, '主催') || this.extractFieldEnhanced($, 'organizer'),
        price: this.extractFromDtDd($, '料金') || this.extractFieldEnhanced($, 'price'),
        contact: this.extractFromDtDd($, 'お問い合わせ') || this.extractFieldEnhanced($, 'contact'),
        website: url, // 当前页面作为官方网站
        googleMap: '', // 稍后设置
        region: ''
      };

      // 智能地区检测
      activityInfo.region = this.detectRegionSmart(activityInfo);
      
      // 提取坐标信息
      const coordinates = await this.extractCoordinatesEnhanced();
      if (coordinates) {
        activityInfo.googleMap = coordinates.embedUrl;
        activityInfo.coordinates = {
          lat: coordinates.lat,
          lng: coordinates.lng,
          source: coordinates.source
        };
      }

      return activityInfo;
      
    } catch (error) {
      console.error(`❌ 页面访问失败: ${error.message}`);
      return null;
    }
  }

  // 提取结构化数据 (JSON-LD)
  extractStructuredData($) {
    console.log('🔍 提取JSON-LD结构化数据...');
    
    const structuredData = {};
    
    try {
      const jsonLdScript = $('script[type="application/ld+json"]');
      
      if (jsonLdScript.length > 0) {
        const jsonContent = jsonLdScript.html();
        if (jsonContent) {
          const data = JSON.parse(jsonContent);
          console.log('✅ 找到结构化数据:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
          
          if (data['@type'] === 'Event') {
            structuredData.name = data.name;
            
            // 处理日期
            if (data.startDate && data.endDate) {
              structuredData.datetime = `${data.startDate} 〜 ${data.endDate}`;
            }
            
            // 处理地点信息
            if (data.location && data.location.name) {
              structuredData.venue = data.location.name;
            }
            
            if (data.location && data.location.address) {
              if (typeof data.location.address === 'string') {
                structuredData.address = data.location.address;
              } else if (data.location.address.streetAddress) {
                structuredData.address = data.location.address.streetAddress;
              }
            }
          }
        }
      }
    } catch (error) {
      console.log('⚠️ 结构化数据解析失败:', error.message);
    }
    
    return structuredData;
  }

  // 从dt/dd标签中提取信息
  extractFromDtDd($, keyword) {
    console.log(`🔍 在dt/dd中查找 "${keyword}"...`);
    
    try {
      // 查找包含关键词的dt元素
      const dtElements = $('dt');
      
      for (let i = 0; i < dtElements.length; i++) {
        const dt = dtElements.eq(i);
        const dtText = dt.text().trim();
        
        if (dtText.includes(keyword)) {
          // 找到对应的dd元素
          const dd = dt.next('dd');
          if (dd.length > 0) {
            const ddText = dd.text().trim();
            if (ddText && ddText.length > 2) {
              console.log(`✅ 从dt/dd提取 ${keyword}: ${ddText.substring(0, 50)}...`);
              return ddText;
            }
          }
        }
      }
      
      console.log(`⚠️ 在dt/dd中未找到 "${keyword}"`);
      return null;
    } catch (error) {
      console.log(`❌ dt/dd提取失败: ${error.message}`);
      return null;
    }
  }

  // 智能活动类型检测
  determineActivityType(url, name, content = '') {
    const text = `${url} ${name} ${content}`.toLowerCase();
    
    // 花火 (烟花)
    if (text.includes('花火') || text.includes('hanabi') || text.includes('firework')) {
      return 'hanabi';
    }
    
    // 祭典 (节庆)
    if (text.includes('祭') || text.includes('matsuri') || text.includes('festival')) {
      return 'matsuri';
    }
    
    // 花见 (赏花)
    if (text.includes('桜') || text.includes('花見') || text.includes('hanami') || text.includes('cherry')) {
      return 'hanami';
    }
    
    // 默认为祭典
    return 'matsuri';
  }

  // 保存到数据库
  async saveToDatabase(activityInfo, activityType) {
    try {
      // 首先获取地区ID
      const regionMapping = {
        'tokyo': 'tokyo',
        'saitama': 'saitama', 
        'chiba': 'chiba',
        'kanagawa': 'kanagawa',
        'kitakanto': 'kitakanto',
        'koshinetsu': 'koshinetsu'
      };

      const regionCode = regionMapping[activityInfo.region] || 'tokyo';
      
      const region = await prisma.region.findUnique({
        where: { code: regionCode }
      });

      if (!region) {
        throw new Error(`地区 ${regionCode} 未找到`);
      }

      const saveData = {
        name: activityInfo.name,
        address: activityInfo.address,
        datetime: activityInfo.datetime,
        venue: activityInfo.venue,
        access: activityInfo.access,
        organizer: activityInfo.organizer,
        price: activityInfo.price,
        contact: activityInfo.contact,
        website: activityInfo.website,
        googleMap: activityInfo.googleMap,
        region: activityInfo.region,
        regionId: region.id,
        verified: true
      };

      console.log('\n💾 保存到数据库...');
      console.log(`📍 活动类型: ${activityType}`);
      console.log(`🎯 地区: ${activityInfo.region}`);
      
      let result;
      
      // 根据活动类型保存到对应的表
      switch (activityType) {
        case 'hanabi':
          result = await prisma.hanabiEvent.create({ data: saveData });
          break;
        case 'matsuri':
          result = await prisma.matsuriEvent.create({ data: saveData });
          break;
        case 'hanami':
          result = await prisma.hanamiEvent.create({ data: saveData });
          break;
        case 'momiji':
          result = await prisma.momijiEvent.create({ data: saveData });
          break;
        case 'illumination':
          result = await prisma.illuminationEvent.create({ data: saveData });
          break;
        case 'culture':
          result = await prisma.cultureEvent.create({ data: saveData });
          break;
        default:
          throw new Error(`未知的活动类型: ${activityType}`);
      }

      console.log(`✅ 数据保存成功，ID: ${result.id}`);
      console.log(`✅ 保存到 ${activityType}Event 表`);
      return result;
      
    } catch (error) {
      console.error(`❌ 数据库保存失败: ${error.message}`);
      
      // 如果是重复数据，尝试更新
      if (error.message.includes('Unique constraint')) {
        try {
          let updateResult;
          const updateData = { ...saveData };
          delete updateData.regionId; // 更新时不需要regionId
          
          switch (activityType) {
            case 'hanabi':
              updateResult = await prisma.hanabiEvent.updateMany({
                where: { name: activityInfo.name },
                data: updateData
              });
              break;
            case 'matsuri':
              updateResult = await prisma.matsuriEvent.updateMany({
                where: { name: activityInfo.name },
                data: updateData
              });
              break;
            case 'hanami':
              updateResult = await prisma.hanamiEvent.updateMany({
                where: { name: activityInfo.name },
                data: updateData
              });
              break;
            case 'momiji':
              updateResult = await prisma.momijiEvent.updateMany({
                where: { name: activityInfo.name },
                data: updateData
              });
              break;
            case 'illumination':
              updateResult = await prisma.illuminationEvent.updateMany({
                where: { name: activityInfo.name },
                data: updateData
              });
              break;
            case 'culture':
              updateResult = await prisma.cultureEvent.updateMany({
                where: { name: activityInfo.name },
                data: updateData
              });
              break;
          }
          
          console.log('✅ 重复数据已更新');
          return updateResult;
        } catch (updateError) {
          console.error(`❌ 数据更新也失败: ${updateError.message}`);
          return null;
        }
      }
      
      return null;
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 浏览器已关闭');
    }
    await prisma.$disconnect();
    console.log('🔚 数据库连接已关闭');
  }

  // 主执行方法
  async crawlSingleActivity(url) {
    console.log('🎯 增强版Jalan活动爬虫启动');
    console.log('⚙️ 技术栈: Playwright + Cheerio (增强选择器)');
    console.log('🎯 目标: 完整十一项数据提取');
    console.log('🗺️ 坐标提取: 四种方法 + 智能优先级');
    console.log('======================================================================');
    
    try {
      await this.initBrowser();
      
      const activityInfo = await this.extractCompleteActivityInfo(url);
      
      if (!activityInfo) {
        throw new Error('活动信息提取失败');
      }
      
      const activityType = this.determineActivityType(url, activityInfo.name);
      
      console.log('\n📋 提取结果摘要:');
      console.log('─'.repeat(70));
      console.log(`📝 名称: ${activityInfo.name}`);
      console.log(`📍 地址: ${activityInfo.address}`);
      console.log(`📅 时间: ${activityInfo.datetime}`);
      console.log(`🏢 会场: ${activityInfo.venue}`);
      console.log(`🚌 交通: ${activityInfo.access}`);
      console.log(`👥 主办: ${activityInfo.organizer}`);
      console.log(`💰 费用: ${activityInfo.price}`);
      console.log(`📞 联系: ${activityInfo.contact}`);
      console.log(`🌐 网站: ${activityInfo.website}`);
      console.log(`🗺️ 地图: ${activityInfo.googleMap ? '已提取' : '未找到'}`);
      console.log(`🎯 地区: ${activityInfo.region}`);
      console.log(`🏷️ 类型: ${activityType}`);
      if (activityInfo.coordinates) {
        console.log(`📍 坐标: ${activityInfo.coordinates.lat}, ${activityInfo.coordinates.lng} (${activityInfo.coordinates.source})`);
      }
      console.log('─'.repeat(70));
      
      const result = await this.saveToDatabase(activityInfo, activityType);
      
      console.log('\n🎉 增强版爬取任务完成！');
      console.log('✅ 十一项数据完整提取');
      console.log('✅ 智能选择器多重保障');
      console.log('✅ 坐标提取技术指南标准');
      
      return result;
      
    } catch (error) {
      console.error(`❌ 爬取任务失败: ${error.message}`);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 命令行执行
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('❌ 请提供要爬取的URL');
    console.log('用法: node scripts/enhanced-jalan-crawler.js <URL>');
    console.log('示例: node scripts/enhanced-jalan-crawler.js https://www.jalan.net/event/evt_343864/');
    process.exit(1);
  }
  
  const crawler = new EnhancedJalanCrawler();
  
  try {
    await crawler.crawlSingleActivity(url);
    console.log('✅ 程序执行完成');
  } catch (error) {
    console.error(`❌ 程序执行失败: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = EnhancedJalanCrawler; 