#!/usr/bin/env python3
"""
东京活动信息爬取工具
专门爬取 jalan.net 东京活动页面的前10个活动详情
"""

import asyncio
import json
import re
from datetime import datetime
from crawl4ai import AsyncWebCrawler
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy

class TokyoEventsCrawler:
    def __init__(self):
        self.base_url = "https://www.jalan.net/event/130000/?screenId=OUW1025"
        self.events_data = []
    
    async def extract_event_links(self):
        """从主页面提取前10个活动的链接"""
        print("🔍 正在提取活动链接...")
        
        # 定义提取活动链接的策略
        schema = {
            "name": "event_links",
            "baseSelector": "body",
            "fields": [
                {
                    "name": "event_items",
                    "selector": ".event-item, .eventListItem, [class*='event'], [class*='item']",
                    "type": "nested",
                    "fields": [
                        {"name": "title", "selector": "h3, .title, .eventTitle, a", "type": "text"},
                        {"name": "link", "selector": "a", "type": "attribute", "attribute": "href"},
                        {"name": "date", "selector": ".date, .period, time", "type": "text"},
                        {"name": "location", "selector": ".location, .area, .place", "type": "text"}
                    ]
                }
            ]
        }
        
        extraction_strategy = JsonCssExtractionStrategy(schema, verbose=True)
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                result = await crawler.arun(
                    url=self.base_url,
                    extraction_strategy=extraction_strategy,
                    wait_for=3,
                    remove_overlay_elements=True
                )
                
                if result.success:
                    print("✅ 成功获取页面内容")
                    
                    # 保存原始页面内容以供分析
                    with open("tokyo_events_page.md", "w", encoding="utf-8") as f:
                        f.write(f"# 东京活动页面内容\n")
                        f.write(f"# 爬取时间: {datetime.now()}\n")
                        f.write(f"# 源URL: {self.base_url}\n\n")
                        f.write(result.markdown)
                    
                    # 从markdown中提取活动链接
                    event_links = self.parse_event_links_from_markdown(result.markdown)
                    
                    if result.extracted_content:
                        try:
                            extracted_data = json.loads(result.extracted_content)
                            print(f"📊 提取到的结构化数据: {extracted_data}")
                        except json.JSONDecodeError:
                            print("⚠️ 结构化数据解析失败，使用markdown解析")
                    
                    return event_links[:10]  # 返回前10个
                else:
                    print(f"❌ 获取页面失败: {result.error_message}")
                    return []
                    
            except Exception as e:
                print(f"❌ 发生错误: {e}")
                return []
    
    def parse_event_links_from_markdown(self, markdown_content):
        """从markdown内容中解析活动链接"""
        print("🔍 从markdown中解析活动链接...")
        
        event_links = []
        lines = markdown_content.split('\n')
        
        current_event = {}
        event_counter = 0
        
        for line in lines:
            line = line.strip()
            
            # 查找链接
            link_match = re.search(r'\[([^\]]+)\]\((https://[^)]+)\)', line)
            if link_match:
                title = link_match.group(1)
                url = link_match.group(2)
                
                # 过滤掉明显不是活动页面的链接
                if any(keyword in url for keyword in ['/event/', '/kanko/', '/activity/']):
                    event_links.append({
                        'title': title,
                        'url': url,
                        'line_content': line
                    })
                    event_counter += 1
                    print(f"📌 找到活动 {event_counter}: {title}")
                    
                    if event_counter >= 10:
                        break
        
        # 如果没找到足够的链接，尝试其他模式
        if len(event_links) < 3:
            print("🔄 使用备用解析模式...")
            # 查找所有包含数字开头的行（可能是活动列表）
            for i, line in enumerate(lines):
                if re.match(r'^\d+', line.strip()) and 'http' in line:
                    # 提取这行的链接
                    urls = re.findall(r'https://[^\s)]+', line)
                    for url in urls:
                        if len(event_links) < 10:
                            event_links.append({
                                'title': f"活动 {len(event_links) + 1}",
                                'url': url.rstrip(')'),
                                'line_content': line
                            })
        
        print(f"📊 总共找到 {len(event_links)} 个活动链接")
        return event_links
    
    async def crawl_event_details(self, event_link):
        """爬取单个活动的详细信息"""
        print(f"🕷️ 正在爬取活动: {event_link['title']}")
        
        # 定义活动详情提取策略
        schema = {
            "name": "event_details",
            "baseSelector": "body",
            "fields": [
                {"name": "title", "selector": "h1, .title, .event-title, .page-title", "type": "text"},
                {"name": "date", "selector": ".date, .period, .event-date, time, .schedule", "type": "text"},
                {"name": "location", "selector": ".location, .venue, .place, .address", "type": "text"},
                {"name": "description", "selector": ".description, .content, .detail, .summary, p", "type": "text"},
                {"name": "access", "selector": ".access, .transportation, .traffic", "type": "text"},
                {"name": "contact", "selector": ".contact, .tel, .phone, .inquiry", "type": "text"},
                {"name": "price", "selector": ".price, .fee, .cost, .charge", "type": "text"},
                {"name": "website", "selector": "a[href*='http']", "type": "attribute", "attribute": "href"},
                {"name": "images", "selector": "img", "type": "attribute", "attribute": "src"}
            ]
        }
        
        extraction_strategy = JsonCssExtractionStrategy(schema, verbose=True)
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                result = await crawler.arun(
                    url=event_link['url'],
                    extraction_strategy=extraction_strategy,
                    wait_for=3,
                    remove_overlay_elements=True
                )
                
                if result.success:
                    event_data = {
                        'source_title': event_link['title'],
                        'source_url': event_link['url'],
                        'crawl_time': datetime.now().isoformat(),
                        'markdown_content': result.markdown,
                        'extracted_data': None
                    }
                    
                    if result.extracted_content:
                        try:
                            event_data['extracted_data'] = json.loads(result.extracted_content)
                        except json.JSONDecodeError:
                            print(f"⚠️ {event_link['title']} 的结构化数据解析失败")
                    
                    return event_data
                else:
                    print(f"❌ 爬取 {event_link['title']} 失败: {result.error_message}")
                    return None
                    
            except Exception as e:
                print(f"❌ 爬取 {event_link['title']} 时发生错误: {e}")
                return None
    
    async def crawl_top_10_events(self):
        """爬取前10个活动的完整信息"""
        print("🚀 开始爬取东京前10个活动...")
        
        # 第一步：获取活动链接
        event_links = await self.extract_event_links()
        
        if not event_links:
            print("❌ 未能获取到活动链接")
            return
        
        print(f"📋 准备爬取 {len(event_links)} 个活动的详细信息")
        
        # 第二步：爬取每个活动的详情
        all_events_data = []
        
        for i, event_link in enumerate(event_links, 1):
            print(f"\n📄 处理第 {i}/{len(event_links)} 个活动...")
            
            event_data = await self.crawl_event_details(event_link)
            if event_data:
                all_events_data.append(event_data)
                
                # 保存单个活动的详细信息
                filename = f"event_{i:02d}_{event_link['title'][:20].replace('/', '_')}.json"
                with open(filename, 'w', encoding='utf-8') as f:
                    json.dump(event_data, f, ensure_ascii=False, indent=2)
                print(f"💾 已保存: {filename}")
            
            # 添加延迟避免被封
            if i < len(event_links):
                print("⏱️ 等待3秒...")
                await asyncio.sleep(3)
        
        # 第三步：保存汇总信息
        summary_data = {
            'crawl_time': datetime.now().isoformat(),
            'source_url': self.base_url,
            'total_events': len(all_events_data),
            'events': all_events_data
        }
        
        with open("tokyo_events_summary.json", 'w', encoding='utf-8') as f:
            json.dump(summary_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n🎉 爬取完成！")
        print(f"📊 成功爬取 {len(all_events_data)} 个活动")
        print(f"📁 汇总文件: tokyo_events_summary.json")
        
        return all_events_data

async def main():
    crawler = TokyoEventsCrawler()
    await crawler.crawl_top_10_events()

if __name__ == "__main__":
    asyncio.run(main()) 