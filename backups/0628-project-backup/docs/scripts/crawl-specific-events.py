#!/usr/bin/env python3
"""
东京活动详细信息爬取工具
专门获取前10个活动的10项具体信息
"""

import asyncio
import json
import re
from datetime import datetime
from crawl4ai import AsyncWebCrawler
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy

class SpecificEventsCrawler:
    def __init__(self):
        self.base_url = "https://www.jalan.net/event/130000/?screenId=OUW1025"
        self.target_fields = [
            "名称", "所在地", "開催期間", "開催場所", 
            "交通アクセス", "主催", "料金", "問合せ先", 
            "ホームページ", "谷歌网站"
        ]
    
    async def extract_event_detail_links(self):
        """从主页面提取前10个具体活动的详情链接"""
        print("🔍 正在提取具体活动的详情链接...")
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                result = await crawler.arun(
                    url=self.base_url,
                    wait_for=3,
                    remove_overlay_elements=True
                )
                
                if result.success:
                    print("✅ 成功获取活动列表页面")
                    
                    # 从markdown中解析具体活动的详情链接
                    event_links = self.parse_specific_event_links(result.markdown)
                    return event_links[:10]  # 返回前10个
                else:
                    print(f"❌ 获取页面失败: {result.error_message}")
                    return []
                    
            except Exception as e:
                print(f"❌ 发生错误: {e}")
                return []
    
    def parse_specific_event_links(self, markdown_content):
        """从markdown中解析具体活动的详情链接"""
        print("🔍 解析具体活动链接...")
        
        event_links = []
        lines = markdown_content.split('\n')
        
        for line in lines:
            line = line.strip()
            
            # 查找形如：[活动名称](https://www.jalan.net/event/evt_数字/) 的链接
            link_match = re.search(r'\[([^\]]+)\]\((https://www\.jalan\.net/event/evt_\d+/)\)', line)
            if link_match:
                title = link_match.group(1)
                url = link_match.group(2)
                
                event_links.append({
                    'name': title,
                    'url': url,
                    'line_content': line
                })
                print(f"📌 找到活动: {title}")
                
                if len(event_links) >= 10:
                    break
        
        print(f"📊 总共找到 {len(event_links)} 个具体活动链接")
        return event_links
    
    async def crawl_event_specific_info(self, event_link):
        """爬取单个活动的十项具体信息"""
        print(f"🕷️ 正在爬取活动详情: {event_link['name']}")
        
        # 定义专门的提取策略，针对活动详情页面
        schema = {
            "name": "event_specific_info",
            "baseSelector": "body",
            "fields": [
                {"name": "event_title", "selector": "h1, .event-title, .page-title", "type": "text"},
                {"name": "period", "selector": ".period, .date, .schedule, .event-date", "type": "text"},
                {"name": "location_area", "selector": ".area, .prefecture, .region", "type": "text"},
                {"name": "venue", "selector": ".venue, .place, .location, .address", "type": "text"},
                {"name": "access", "selector": ".access, .transportation, .traffic", "type": "text"},
                {"name": "organizer", "selector": ".organizer, .sponsor, .host", "type": "text"},
                {"name": "fee", "selector": ".fee, .price, .cost, .charge", "type": "text"},
                {"name": "contact", "selector": ".contact, .inquiry, .tel, .phone", "type": "text"},
                {"name": "website", "selector": ".website, .homepage, .official", "type": "text"},
                {"name": "all_links", "selector": "a[href*='http']", "type": "attribute", "attribute": "href"}
            ]
        }
        
        extraction_strategy = JsonCssExtractionStrategy(schema, verbose=True)
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                result = await crawler.arun(
                    url=event_link['url'],
                    extraction_strategy=extraction_strategy,
                    wait_for=4,
                    remove_overlay_elements=True
                )
                
                if result.success:
                    # 解析并整理十项信息
                    event_info = self.extract_ten_fields(result.markdown, result.extracted_content, event_link)
                    return event_info
                else:
                    print(f"❌ 爬取失败: {result.error_message}")
                    return None
                    
            except Exception as e:
                print(f"❌ 爬取时发生错误: {e}")
                return None
    
    def extract_ten_fields(self, markdown_content, extracted_json, event_link):
        """从爬取内容中提取十项具体信息"""
        print(f"📊 正在提取 {event_link['name']} 的十项信息...")
        
        event_info = {
            "名称": "",
            "所在地": "",
            "開催期間": "", 
            "開催場所": "",
            "交通アクセス": "",
            "主催": "",
            "料金": "",
            "問合せ先": "",
            "ホームページ": "",
            "谷歌网站": ""
        }
        
        # 1. 名称 - 从链接信息或页面标题获取
        event_info["名称"] = event_link['name']
        
        lines = markdown_content.split('\n')
        
        # 逐行分析markdown内容
        for i, line in enumerate(lines):
            line = line.strip()
            
            # 2. 開催期間 - 查找日期信息
            if any(keyword in line for keyword in ['期間', '日時', '開催日', '実施期間']):
                date_match = re.search(r'(\d{4}年.*?[日月]|\d{4}/\d{1,2}/\d{1,2}.*?|\d{1,2}月\d{1,2}日.*?)', line)
                if date_match and not event_info["開催期間"]:
                    event_info["開催期間"] = date_match.group(1)
            
            # 3. 開催場所 - 查找场所信息
            if any(keyword in line for keyword in ['場所', '会場', '開催場所', '場所：']):
                venue_match = re.search(r'(?:場所|会場|開催場所)[:：]\s*(.+)', line)
                if venue_match and not event_info["開催場所"]:
                    event_info["開催場所"] = venue_match.group(1)
            
            # 4. 所在地 - 查找地区信息
            if any(keyword in line for keyword in ['東京都', '所在地', '地域']):
                if '東京都' in line and not event_info["所在地"]:
                    event_info["所在地"] = "東京都"
            
            # 5. 交通アクセス - 查找交通信息
            if any(keyword in line for keyword in ['アクセス', '交通', 'アクセス方法', '最寄り駅']):
                access_match = re.search(r'(?:アクセス|交通)[:：]\s*(.+)', line)
                if access_match and not event_info["交通アクセス"]:
                    event_info["交通アクセス"] = access_match.group(1)
            
            # 6. 主催 - 查找主办方信息
            if any(keyword in line for keyword in ['主催', '主催者', '主催：']):
                organizer_match = re.search(r'主催[:：]\s*(.+)', line)
                if organizer_match and not event_info["主催"]:
                    event_info["主催"] = organizer_match.group(1)
            
            # 7. 料金 - 查找费用信息
            if any(keyword in line for keyword in ['料金', '参加費', '入場料', '費用', '無料', '円']):
                if not event_info["料金"] and ('円' in line or '無料' in line):
                    event_info["料金"] = line
            
            # 8. 問合せ先 - 查找联系方式
            if any(keyword in line for keyword in ['問合せ', '連絡先', 'TEL', '電話', 'お問い合わせ']):
                contact_match = re.search(r'(?:問合せ|連絡先|TEL|電話)[:：]\s*(.+)', line)
                if contact_match and not event_info["問合せ先"]:
                    event_info["問合せ先"] = contact_match.group(1)
            
            # 9. ホームページ - 查找官方网站
            if 'http' in line and any(keyword in line for keyword in ['ホームページ', '公式', 'HP', 'サイト']):
                url_match = re.search(r'(https?://[^\s)]+)', line)
                if url_match and not event_info["ホームページ"]:
                    event_info["ホームページ"] = url_match.group(1)
        
        # 10. 谷歌网站 - 如果有官网，生成谷歌搜索链接
        if event_info["ホームページ"]:
            search_query = f"site:{event_info['ホームページ']}"
            event_info["谷歌网站"] = f"https://www.google.com/search?q={search_query}"
        elif event_info["名称"]:
            search_query = f"{event_info['名称']} 東京"
            event_info["谷歌网站"] = f"https://www.google.com/search?q={search_query.replace(' ', '+')}"
        
        # 如果某些字段为空，设置默认值
        if not event_info["所在地"]:
            event_info["所在地"] = "東京都"
        
        return event_info
    
    async def crawl_top_10_specific_events(self):
        """爬取前10个活动的十项具体信息"""
        print("🚀 开始爬取前10个活动的详细信息...")
        
        # 第一步：获取活动详情链接
        event_links = await self.extract_event_detail_links()
        
        if not event_links:
            print("❌ 未能获取到活动链接")
            return
        
        print(f"📋 准备爬取 {len(event_links)} 个活动的十项信息")
        
        # 第二步：爬取每个活动的十项信息
        all_events_info = []
        
        for i, event_link in enumerate(event_links, 1):
            print(f"\n📄 处理第 {i}/{len(event_links)} 个活动...")
            
            event_info = await self.crawl_event_specific_info(event_link)
            if event_info:
                all_events_info.append(event_info)
                
                # 显示提取到的信息
                print("✅ 提取到的信息:")
                for field, value in event_info.items():
                    if value:
                        print(f"  {field}: {value}")
                
                print(f"💾 已保存活动 {i}")
            
            # 添加延迟
            if i < len(event_links):
                print("⏱️ 等待3秒...")
                await asyncio.sleep(3)
        
        # 第三步：保存最终结果
        final_result = {
            'crawl_time': datetime.now().isoformat(),
            'source_url': self.base_url,
            'total_events': len(all_events_info),
            'target_fields': self.target_fields,
            'events': all_events_info
        }
        
        with open("tokyo_events_ten_fields.json", 'w', encoding='utf-8') as f:
            json.dump(final_result, f, ensure_ascii=False, indent=2)
        
        print(f"\n🎉 爬取完成！")
        print(f"📊 成功爬取 {len(all_events_info)} 个活动的十项信息")
        print(f"📁 结果文件: tokyo_events_ten_fields.json")
        
        # 打印汇总表格
        print("\n📋 爬取结果汇总:")
        print("-" * 100)
        for i, event in enumerate(all_events_info, 1):
            print(f"{i:2d}. {event['名称'][:30]:<30} | {event['開催期間'][:20]:<20} | {event['開催場所'][:30]:<30}")
        print("-" * 100)
        
        return all_events_info

async def main():
    crawler = SpecificEventsCrawler()
    await crawler.crawl_top_10_specific_events()

if __name__ == "__main__":
    asyncio.run(main()) 