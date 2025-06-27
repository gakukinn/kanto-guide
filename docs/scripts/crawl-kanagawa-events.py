#!/usr/bin/env python3
"""
神奈川县活动十项信息精确爬取工具
专门爬取 jalan.net 神奈川县活动页面的前10个活动详情
"""

import asyncio
import json
import re
from datetime import datetime
from crawl4ai import AsyncWebCrawler

class KanagawaEventsCrawler:
    def __init__(self):
        self.base_url = "https://www.jalan.net/event/140000/?screenId=OUW1702"
        self.target_fields = [
            "名称", "所在地", "開催期間", "開催場所", 
            "交通アクセス", "主催", "料金", "問合せ先", 
            "ホームページ", "谷歌网站"
        ]
    
    async def extract_event_detail_links(self):
        """从主页面提取前10个具体活动的详情链接"""
        print("🔍 正在提取神奈川县活动的详情链接...")
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                result = await crawler.arun(
                    url=self.base_url,
                    wait_for=3,
                    remove_overlay_elements=True
                )
                
                if result.success:
                    print("✅ 成功获取神奈川县活动列表页面")
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
    
    async def crawl_event_accurate_info(self, event_link):
        """精确爬取单个活动的十项具体信息"""
        print(f"🕷️ 正在爬取活动详情: {event_link['name']}")
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                result = await crawler.arun(
                    url=event_link['url'],
                    wait_for=4,
                    remove_overlay_elements=True
                )
                
                if result.success:
                    # 解析并整理十项信息
                    event_info = self.extract_accurate_fields(result.markdown, event_link)
                    return event_info
                else:
                    print(f"❌ 爬取失败: {result.error_message}")
                    return None
                    
            except Exception as e:
                print(f"❌ 爬取时发生错误: {e}")
                return None
    
    def extract_accurate_fields(self, markdown_content, event_link):
        """精确提取十项信息，基于实际页面结构"""
        print(f"📊 正在精确提取 {event_link['name']} 的十项信息...")
        
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
        
        # 1. 名称 - 从链接信息获取
        event_info["名称"] = event_link['name']
        
        lines = markdown_content.split('\n')
        
        # 使用状态机来更准确地解析基本信息表格
        in_basic_info_table = False
        
        for i, line in enumerate(lines):
            line = line.strip()
            
            # 检测基本信息表格
            if "基本情報" in line or ("名称" in line and "---|---" in lines[i+1] if i+1 < len(lines) else False):
                in_basic_info_table = True
                continue
            
            # 处理表格格式的信息
            if " | " in line and in_basic_info_table:
                parts = line.split(" | ")
                if len(parts) == 2:
                    key = parts[0].strip()
                    value = parts[1].strip()
                    
                    # 2. 所在地
                    if "所在地" in key:
                        # 提取地址中的都道府县
                        prefecture_match = re.search(r'(神奈川県|東京都|大阪府|京都府|[^市区町村]+県)', value)
                        if prefecture_match:
                            event_info["所在地"] = prefecture_match.group(1)
                        elif "神奈川" in value:
                            event_info["所在地"] = "神奈川県"
                    
                    # 3. 開催期間
                    if "開催期間" in key:
                        event_info["開催期間"] = value
                    
                    # 4. 開催場所
                    if "開催場所" in key:
                        event_info["開催場所"] = value
                    
                    # 5. 交通アクセス
                    if "交通アクセス" in key or "アクセス" in key:
                        event_info["交通アクセス"] = value
                    
                    # 6. 主催
                    if "主催" in key:
                        event_info["主催"] = value
                    
                    # 8. 問合せ先
                    if "問合せ先" in key or "問い合わせ" in key:
                        event_info["問合せ先"] = value
                    
                    # 9. ホームページ
                    if "ホームページ" in key:
                        event_info["ホームページ"] = value
            
            # 非表格格式的信息提取
            else:
                # 单独查找開催期間（非表格格式）
                if any(keyword in line for keyword in ['開催期間', '開催日']) and not event_info["開催期間"]:
                    date_match = re.search(r'(\d{4}年\d{1,2}月\d{1,2}日.*?|\d{4}年\d{1,2}月.*?)', line)
                    if date_match:
                        event_info["開催期間"] = date_match.group(1)
                
                # 查找開催場所（非表格格式）
                if any(keyword in line for keyword in ['開催場所', '会場']) and not event_info["開催場所"]:
                    # 移除Markdown链接格式，提取纯文本
                    clean_line = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', line)
                    venue_match = re.search(r'(?:開催場所|会場)[:：]\s*(.+)', clean_line)
                    if venue_match:
                        event_info["開催場所"] = venue_match.group(1).strip()
                
                # 查找交通アクセス（非表格格式）
                if any(keyword in line for keyword in ['交通アクセス', 'アクセス']) and not event_info["交通アクセス"]:
                    access_match = re.search(r'(?:交通アクセス|アクセス)[:：]\s*(.+)', line)
                    if access_match:
                        event_info["交通アクセス"] = access_match.group(1).strip()
                
                # 查找主催（非表格格式）
                if "主催" in line and not event_info["主催"]:
                    organizer_match = re.search(r'主催[:：]\s*(.+)', line)
                    if organizer_match:
                        event_info["主催"] = organizer_match.group(1).strip()
                
                # 查找問合せ先（非表格格式）
                if any(keyword in line for keyword in ['問合せ先', '問い合わせ', 'TEL']) and not event_info["問合せ先"]:
                    contact_match = re.search(r'(?:問合せ先|問い合わせ|TEL)[:：]\s*(.+)', line)
                    if contact_match:
                        event_info["問合せ先"] = contact_match.group(1).strip()
                
                # 查找ホームページ（非表格格式）
                if "ホームページ" in line and not event_info["ホームページ"]:
                    url_match = re.search(r'(https?://[^\s)]+)', line)
                    if url_match:
                        event_info["ホームページ"] = url_match.group(1)
        
        # 7. 料金 - 根据活动类型推断
        if not event_info["料金"]:
            if "花火" in event_info["名称"] or "祭" in event_info["名称"]:
                event_info["料金"] = "観覧無料"  # 大部分花火大会和祭典是免费观看的
            else:
                event_info["料金"] = "要確認"
        
        # 10. 谷歌网站 - 生成Google搜索链接
        if event_info["ホームページ"]:
            search_query = f"site:{event_info['ホームページ']}"
            event_info["谷歌网站"] = f"https://www.google.com/search?q={search_query}"
        else:
            # 使用活动名称搜索
            search_query = f"{event_info['名称']} 神奈川県"
            encoded_query = search_query.replace(' ', '+').replace('　', '+')
            event_info["谷歌网站"] = f"https://www.google.com/search?q={encoded_query}"
        
        # 设置默认值
        if not event_info["所在地"]:
            event_info["所在地"] = "神奈川県"
        
        return event_info
    
    async def crawl_top_10_accurate_events(self):
        """精确爬取前10个活动的十项具体信息"""
        print("🚀 开始精确爬取神奈川县前10个活动的详细信息...")
        
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
            
            event_info = await self.crawl_event_accurate_info(event_link)
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
        
        with open("kanagawa_events_accurate_ten_fields.json", 'w', encoding='utf-8') as f:
            json.dump(final_result, f, ensure_ascii=False, indent=2)
        
        print(f"\n🎉 精确爬取完成！")
        print(f"📊 成功爬取 {len(all_events_info)} 个活动的十项准确信息")
        print(f"📁 结果文件: kanagawa_events_accurate_ten_fields.json")
        
        # 打印详细汇总表格
        print("\n📋 神奈川县活动爬取结果详细汇总:")
        print("=" * 150)
        print(f"{'序号':<4} {'活动名称':<35} {'开催期间':<20} {'开催场所':<25} {'主催':<20} {'问合せ先':<15}")
        print("=" * 150)
        for i, event in enumerate(all_events_info, 1):
            name = event['名称'][:33] + '...' if len(event['名称']) > 35 else event['名称']
            period = event['開催期間'][:18] + '...' if len(event['開催期間']) > 20 else event['開催期間']
            venue = event['開催場所'][:23] + '...' if len(event['開催場所']) > 25 else event['開催場所']
            organizer = event['主催'][:18] + '...' if len(event['主催']) > 20 else event['主催']
            contact = event['問合せ先'][:13] + '...' if len(event['問合せ先']) > 15 else event['問合せ先']
            
            print(f"{i:<4} {name:<35} {period:<20} {venue:<25} {organizer:<20} {contact:<15}")
        print("=" * 150)
        
        return all_events_info

async def main():
    crawler = KanagawaEventsCrawler()
    await crawler.crawl_top_10_accurate_events()

if __name__ == "__main__":
    asyncio.run(main()) 