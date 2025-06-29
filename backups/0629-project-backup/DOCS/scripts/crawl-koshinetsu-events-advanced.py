#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
使用Crawl4AI + Playwright + Cheerio技术精确爬取甲信越地区（新潟県）活动信息
包含高级Google Maps坐标提取功能
URL: https://www.jalan.net/event/150000/?screenId=OUW1702
地区：甲信越
参考: 0622-谷歌地图Playwright和Cheerio坐标提取技术指南
"""

import asyncio
import json
import re
from datetime import datetime
from playwright.async_api import async_playwright

class KoshinetsuAdvancedMapCrawler:
    def __init__(self):
        self.url = "https://www.jalan.net/event/150000/?screenId=OUW1702"
        self.events_data = []
        
    def classify_event(self, name, description=""):
        """精确分类活动"""
        text = f"{name} {description}".lower()
        
        # 花火大会优先级最高
        if any(keyword in text for keyword in ["花火", "はなび", "fireworks"]):
            return "花火"
        
        # 祭典活动
        if any(keyword in text for keyword in ["祭", "まつり", "festival", "神社", "寺院"]):
            return "祭典"
            
        # 赏花活动
        if any(keyword in text for keyword in ["花", "さくら", "桜", "あじさい", "紫陽花", "つつじ", "ばら", "薔薇", "ユリ", "百合"]):
            return "赏花"
            
        # 狩枫活动
        if any(keyword in text for keyword in ["紅葉", "もみじ", "autumn", "fall"]):
            return "狩枫"
            
        # 灯光活动
        if any(keyword in text for keyword in ["イルミネーション", "ライトアップ", "illumination", "light"]):
            return "灯光"
            
        return "祭典"  # 默认分类

    def validate_japan_coordinates(self, lat, lng):
        """验证坐标是否在日本范围内"""
        try:
            lat_f = float(lat)
            lng_f = float(lng)
            # 日本坐标范围：纬度30-45，经度129-146
            return 30 <= lat_f <= 45 and 129 <= lng_f <= 146
        except (ValueError, TypeError):
            return False

    async def extract_coordinates_advanced(self, page):
        """
        使用多种方法提取真实的Google Maps坐标
        参考：0622-谷歌地图Playwright和Cheerio坐标提取技术指南
        """
        print("      🗺️  开始高级坐标提取...")
        
        coordinates_result = await page.evaluate("""
            () => {
                const results = [];
                
                // 方法1: iframe地图分析
                console.log('🔍 方法1: 检查iframe地图...');
                const iframes = Array.from(document.querySelectorAll('iframe'));
                for (const iframe of iframes) {
                    const src = iframe.src;
                    if (src && (src.includes('maps.google') || src.includes('google.com/maps'))) {
                        console.log('找到地图iframe:', src);
                        
                        // 多种坐标格式匹配
                        const patterns = [
                            /[!@]([0-9.-]+),([0-9.-]+)/,
                            /center=([0-9.-]+),([0-9.-]+)/,
                            /ll=([0-9.-]+),([0-9.-]+)/,
                            /q=([0-9.-]+),([0-9.-]+)/
                        ];
                        
                        for (const pattern of patterns) {
                            const match = src.match(pattern);
                            if (match) {
                                const lat = parseFloat(match[1]);
                                const lng = parseFloat(match[2]);
                                if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 146) {
                                    results.push({
                                        method: 'iframe',
                                        lat: lat,
                                        lng: lng,
                                        source: 'Google Maps iframe: ' + src.substring(0, 100),
                                        priority: 1
                                    });
                                    console.log('✅ iframe坐标:', lat, lng);
                                }
                            }
                        }
                    }
                }
                
                // 方法2: JavaScript变量搜索
                console.log('🔍 方法2: 检查JavaScript变量...');
                const scripts = Array.from(document.querySelectorAll('script'));
                for (const script of scripts) {
                    const text = script.textContent || '';
                    const patterns = [
                        /lat[:\\s]*([0-9.]+)[\\s,]*lng[:\\s]*([0-9.]+)/gi,
                        /latitude[:\\s]*([0-9.]+)[\\s,]*longitude[:\\s]*([0-9.]+)/gi,
                        /"lat":\\s*([0-9.]+)[\\s,]*"lng":\\s*([0-9.]+)/gi,
                        /position:\\s*{[^}]*lat:\\s*([0-9.]+)[^}]*lng:\\s*([0-9.]+)/gi
                    ];
                    
                    for (const pattern of patterns) {
                        let match;
                        while ((match = pattern.exec(text)) !== null) {
                            const lat = parseFloat(match[1]);
                            const lng = parseFloat(match[2]);
                            if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 146) {
                                results.push({
                                    method: 'javascript',
                                    lat: lat,
                                    lng: lng,
                                    source: 'JavaScript变量',
                                    priority: 2
                                });
                                console.log('✅ JS坐标:', lat, lng);
                            }
                        }
                    }
                }
                
                // 方法3: 链接坐标提取 (⭐ 成功方法)
                console.log('🔍 方法3: 检查地图链接...');
                const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
                for (const link of links) {
                    const href = link.href;
                    console.log('检查链接:', href);
                    
                    const patterns = [
                        /@([0-9.-]+),([0-9.-]+)/,
                        /ll=([0-9.-]+),([0-9.-]+)/,
                        /center=([0-9.-]+),([0-9.-]+)/,
                        /q=([0-9.-]+),([0-9.-]+)/,
                        /!2d([0-9.-]+)!3d([0-9.-]+)/,
                        /!3d([0-9.-]+)!4d([0-9.-]+)/
                    ];
                    
                    for (const pattern of patterns) {
                        const match = href.match(pattern);
                        if (match) {
                            const lat = parseFloat(match[1]);
                            const lng = parseFloat(match[2]);
                            if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 146) {
                                results.push({
                                    method: 'link',
                                    lat: lat,
                                    lng: lng,
                                    source: 'Google Maps链接: ' + href.substring(0, 100),
                                    priority: 3
                                });
                                console.log('✅ 链接坐标:', lat, lng);
                            }
                        }
                    }
                }
                
                // 方法4: Meta标签检查
                console.log('🔍 方法4: 检查Meta标签...');
                const geoPosition = document.querySelector('meta[name="geo.position"]');
                const icbm = document.querySelector('meta[name="ICBM"]');
                
                if (geoPosition) {
                    const content = geoPosition.getAttribute('content');
                    const match = content.match(/([0-9.-]+)[,;]([0-9.-]+)/);
                    if (match) {
                        const lat = parseFloat(match[1]);
                        const lng = parseFloat(match[2]);
                        if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 146) {
                            results.push({
                                method: 'meta',
                                lat: lat,
                                lng: lng,
                                source: 'Meta geo.position',
                                priority: 4
                            });
                        }
                    }
                }
                
                // 按优先级排序
                results.sort((a, b) => a.priority - b.priority);
                console.log('🎯 坐标提取结果:', results);
                
                return results.length > 0 ? results[0] : null;
            }
        """)
        
        if coordinates_result:
            print(f"      ✅ 成功提取坐标: {coordinates_result['lat']}, {coordinates_result['lng']}")
            print(f"      📍 坐标来源: {coordinates_result['source']}")
            
            # 生成正确的Google Maps URLs
            lat, lng = coordinates_result['lat'], coordinates_result['lng']
            
            # 标准地图URL
            map_url = f"https://maps.google.com/?q={lat},{lng}"
            
            # 嵌入式地图URL
            embed_url = f"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d{lng}!3d{lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5rSb5YuV5L2N572u!5e0!3m2!1sja!2sjp!4v{int(datetime.now().timestamp() * 1000)}!5m2!1sja!2sjp"
            
            return {
                'coordinates': {'lat': lat, 'lng': lng},
                'map_url': map_url,
                'embed_url': embed_url,
                'source': coordinates_result['source'],
                'method': coordinates_result['method']
            }
        else:
            print("      ❌ 未能提取到有效坐标")
            return None

    async def crawl_with_advanced_coordinates(self):
        """使用高级坐标提取的Playwright + Cheerio方法"""
        print("🎭 使用Playwright + 高级坐标提取技术...")
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                args=[
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor'
                ]
            )
            page = await browser.new_page()
            
            # 设置用户代理避免反爬虫
            await page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            })
            
            try:
                # 导航到页面
                print(f"📡 正在访问: {self.url}")
                await page.goto(self.url, wait_until='domcontentloaded', timeout=30000)
                await page.wait_for_timeout(3000)
                
                # 获取活动列表
                events_data = await page.evaluate("""
                    () => {
                        const events = [];
                        const eventItems = document.querySelectorAll('li:has(a[href*="/event/evt_"])');
                        
                        for (let i = 0; i < Math.min(3, eventItems.length); i++) {
                            const item = eventItems[i];
                            const link = item.querySelector('a[href*="/event/evt_"]');
                            
                            if (link) {
                                events.push({
                                    title: link.textContent?.trim() || '',
                                    url: link.href
                                });
                            }
                        }
                        
                        return events;
                    }
                """)
                
                print(f"🔍 发现 {len(events_data)} 个活动")
                
                # 访问每个活动的详情页面并提取坐标
                detailed_events = []
                for i, event in enumerate(events_data):
                    print(f"\n📝 正在处理第 {i+1} 个活动: {event['title']}")
                    
                    try:
                        detail_page = await browser.new_page()
                        await detail_page.set_extra_http_headers({
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                        })
                        
                        print(f"   📡 访问详情页: {event['url']}")
                        await detail_page.goto(event['url'], wait_until='domcontentloaded', timeout=30000)
                        await detail_page.wait_for_timeout(2000)
                        
                        # 提取基本信息
                        event_details = await detail_page.evaluate("""
                            () => {
                                const details = {};
                                
                                const nameEl = document.querySelector('h1, .event-title, [class*="title"]');
                                details.name = nameEl?.textContent?.trim() || '';
                                
                                const infoElements = document.querySelectorAll('tr, .info-item, .detail-item, dt, dd');
                                
                                for (const el of infoElements) {
                                    const text = el.textContent || '';
                                    
                                    if (text.includes('所在地') || text.includes('住所')) {
                                        details.location = text.replace(/所在地|住所/g, '').trim();
                                    } else if (text.includes('開催期間') || text.includes('期間')) {
                                        details.period = text.replace(/開催期間|期間/g, '').trim();
                                    } else if (text.includes('開催場所') || text.includes('会場')) {
                                        details.venue = text.replace(/開催場所|会場/g, '').trim();
                                    } else if (text.includes('交通アクセス') || text.includes('アクセス')) {
                                        details.access = text.replace(/交通アクセス|アクセス/g, '').trim();
                                    } else if (text.includes('主催')) {
                                        details.organizer = text.replace(/主催/g, '').trim();
                                    } else if (text.includes('料金') || text.includes('入場料')) {
                                        details.fee = text.replace(/料金|入場料/g, '').trim();
                                    } else if (text.includes('問合せ先') || text.includes('お問い合わせ')) {
                                        details.contact = text.replace(/問合せ先|お問い合わせ/g, '').trim();
                                    }
                                }
                                
                                const websiteEl = document.querySelector('a[href^="http"]:not([href*="jalan.net"])');
                                details.website = websiteEl?.href || '';
                                
                                const descEl = document.querySelector('.description, .summary, .detail-text, .event-description');
                                details.description = descEl?.textContent?.trim() || '';
                                
                                return details;
                            }
                        """)
                        
                        # 🗺️ 高级坐标提取
                        map_info = await self.extract_coordinates_advanced(detail_page)
                        
                        # 清理数据
                        def clean_address(address):
                            if not address:
                                return ''
                            lines = address.split('\n')
                            main_line = lines[0] if lines else ''
                            match = re.search(r'〒\d{3}\s*-\s*\d{4}\s*(.+?)(?=\s*←|$)', main_line)
                            return match.group(0).strip() if match else main_line.split('←')[0].strip()
                        
                        def clean_period(period):
                            if not period:
                                return ''
                            cleaned = re.sub(r'\s+', ' ', period.replace('\n', ' ')).strip()
                            date_match = re.search(r'\d{4}年\d{1,2}月\d{1,2}日[^\t\n]*', cleaned)
                            return date_match.group(0) if date_match else cleaned
                        
                        # 分类活动
                        category = self.classify_event(event_details.get('name', ''), event_details.get('description', ''))
                        
                        detailed_event = {
                            "name": event_details.get('name', event['title']),
                            "location": clean_address(event_details.get('location', '')),
                            "period": clean_period(event_details.get('period', '')),
                            "venue": event_details.get('venue', ''),
                            "access": event_details.get('access', ''),
                            "organizer": event_details.get('organizer', ''),
                            "fee": event_details.get('fee', ''),
                            "contact": event_details.get('contact', ''),
                            "website": event_details.get('website', ''),
                            "description": event_details.get('description', ''),
                            "category": category,
                            "prefecture": "新潟県",
                            "region": "甲信越"
                        }
                        
                        # 添加地图信息
                        if map_info:
                            detailed_event.update({
                                "google_map": map_info['map_url'],
                                "coordinates": map_info['coordinates'],
                                "embed_url": map_info['embed_url'],
                                "coords_source": map_info['source'],
                                "extraction_method": map_info['method']
                            })
                            print(f"   🗺️  地图信息已提取 ({map_info['method']}方法)")
                        else:
                            # 备用方案：使用地址生成搜索链接
                            search_location = detailed_event.get('venue') or detailed_event.get('location')
                            if search_location:
                                detailed_event["google_map"] = f"https://www.google.com/maps/search/{search_location}"
                                detailed_event["coords_source"] = "地址搜索链接"
                                print(f"   🔍 使用地址搜索链接作为备用方案")
                        
                        detailed_events.append(detailed_event)
                        print(f"   ✅ 已获取活动信息，分类为: {category}")
                        
                        await detail_page.close()
                        
                    except Exception as e:
                        print(f"   ❌ 获取活动详情失败: {str(e)}")
                        continue
                
                await browser.close()
                return detailed_events
                
            except Exception as e:
                print(f"❌ Playwright爬取失败: {str(e)}")
                await browser.close()
                return []

    async def main(self):
        """主执行函数"""
        print("🚀 开始爬取甲信越地区（新潟県）活动信息...")
        print(f"🎯 目标URL: {self.url}")
        print("🗺️  使用高级Google Maps坐标提取技术")
        
        # 使用高级坐标提取方法
        self.events_data = await self.crawl_with_advanced_coordinates()
        
        # 保存结果
        if self.events_data:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"koshinetsu_events_advanced_{timestamp}.json"
            
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.events_data, f, ensure_ascii=False, indent=2)
            
            print(f"\n💾 已保存 {len(self.events_data)} 个活动信息到 {filename}")
            
            # 显示结果摘要
            print("\n📊 爬取结果摘要:")
            for i, event in enumerate(self.events_data, 1):
                coords_info = ""
                if event.get('coordinates'):
                    coords = event['coordinates']
                    coords_info = f" [{coords['lat']:.6f}, {coords['lng']:.6f}]"
                elif event.get('google_map'):
                    coords_info = " [地址链接]"
                
                print(f"  {i}. {event.get('name', 'N/A')} - 分类: {event.get('category', 'N/A')}{coords_info}")
            
            return self.events_data
        else:
            print("❌ 未能成功爬取任何活动信息")
            return []

if __name__ == "__main__":
    crawler = KoshinetsuAdvancedMapCrawler()
    asyncio.run(crawler.main()) 