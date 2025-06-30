#!/usr/bin/env python3
"""
真正从Jalan页面提取东京活动数据
严格从指定页面获取真实信息，禁止硬编码
"""

import asyncio
import json
import sqlite3
import uuid
from datetime import datetime
from crawl4ai import AsyncWebCrawler
from bs4 import BeautifulSoup
import re

class RealJalanCrawler:
    def __init__(self):
        self.target_url = 'https://www.jalan.net/event/130000/?screenId=OUW1025'
        self.activities = []
        
    async def crawl_real_data(self):
        """真正从页面提取数据"""
        print("🔍 正在从Jalan页面提取真实数据...")
        print(f"📍 目标页面: {self.target_url}")
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                # 爬取页面
                result = await crawler.arun(
                    url=self.target_url,
                    bypass_cache=True,
                    wait_for="networkidle"
                )
                
                if result.success:
                    print("✅ 页面爬取成功!")
                    print(f"📄 页面标题: {result.metadata.get('title', 'Unknown')}")
                    
                    # 输出原始HTML用于调试
                    print("\n📄 开始分析页面内容...")
                    
                    # 使用BeautifulSoup解析HTML
                    soup = BeautifulSoup(result.cleaned_html, 'html.parser')
                    
                    # 查找活动列表容器
                    self.extract_activities_from_soup(soup)
                    
                    if not self.activities:
                        print("⚠️ 未找到活动数据，输出页面结构用于调试...")
                        self.debug_page_structure(soup)
                        
                else:
                    print(f"❌ 页面爬取失败: {result.error_message}")
                    
            except Exception as e:
                print(f"❌ 爬取过程失败: {str(e)}")

    def extract_activities_from_soup(self, soup):
        """从BeautifulSoup对象中提取活动信息"""
        print("🔍 在页面中查找活动列表...")
        
        # 尝试多种可能的活动容器选择器
        selectors = [
            'div[class*="item"]',
            'li[class*="item"]',
            'div[class*="event"]',
            'li[class*="event"]',
            'article',
            '.ranking-item',
            '.event-item',
            '.list-item'
        ]
        
        activities_found = False
        
        for selector in selectors:
            elements = soup.select(selector)
            if elements:
                print(f"✅ 找到 {len(elements)} 个可能的活动元素 (选择器: {selector})")
                
                for i, element in enumerate(elements[:20]):  # 限制前20个
                    activity_data = self.extract_single_activity(element, i + 1)
                    if activity_data and self.is_tokyo_activity(activity_data):
                        self.activities.append(activity_data)
                        activities_found = True
                        print(f"📍 提取活动 {len(self.activities)}: {activity_data.get('name', 'Unknown')}")
                        
                        if len(self.activities) >= 10:
                            break
                
                if activities_found:
                    break
        
        if not activities_found:
            print("❌ 未找到任何活动信息")

    def extract_single_activity(self, element, index):
        """从单个元素中提取活动信息"""
        try:
            # 获取所有文本内容
            text_content = element.get_text(strip=True)
            
            # 查找活动名称
            name_element = element.find(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
            if name_element:
                name = name_element.get_text(strip=True)
            else:
                # 尝试从链接或第一行文本获取名称
                link = element.find('a')
                if link and link.get_text(strip=True):
                    name = link.get_text(strip=True)
                else:
                    lines = text_content.split('\n')
                    name = lines[0] if lines else f"活动{index}"
            
            # 查找日期信息
            date_patterns = [
                r'\d{4}年\d{1,2}月\d{1,2}日',
                r'\d{1,2}月\d{1,2}日',
                r'\d{4}/\d{1,2}/\d{1,2}',
                r'\d{1,2}/\d{1,2}'
            ]
            
            datetime_info = ""
            for pattern in date_patterns:
                match = re.search(pattern, text_content)
                if match:
                    datetime_info = match.group()
                    break
            
            # 查找地点信息
            venue_keywords = ['会場', '場所', '開催地', '駅', '公園', '館', '場', '広場']
            venue = ""
            for keyword in venue_keywords:
                if keyword in text_content:
                    # 尝试提取包含关键词的句子
                    sentences = text_content.split('。')
                    for sentence in sentences:
                        if keyword in sentence:
                            venue = sentence.strip()
                            break
                    if venue:
                        break
            
            # 检查是否包含东京相关信息
            tokyo_indicators = text_content.lower()
            is_tokyo = any(keyword in tokyo_indicators for keyword in ['東京', 'tokyo', '新宿', '渋谷', '浅草', '上野', '池袋'])
            
            if name and len(name) > 2:  # 确保名称有意义
                return {
                    'name': name[:100],  # 限制长度
                    'datetime': datetime_info,
                    'venue': venue[:100] if venue else '会場未確認',
                    'address': '東京都' if is_tokyo else '地址未確認',
                    'raw_text': text_content[:200],  # 保留原始文本用于调试
                    'is_tokyo': is_tokyo
                }
            
            return None
            
        except Exception as e:
            print(f"⚠️ 提取活动 {index} 信息时出错: {str(e)}")
            return None

    def is_tokyo_activity(self, activity):
        """验证是否为东京活动"""
        text = f"{activity.get('name', '')} {activity.get('venue', '')} {activity.get('address', '')} {activity.get('raw_text', '')}"
        tokyo_keywords = ['東京', 'tokyo', '東京都', '新宿', '渋谷', '銀座', '浅草', '上野', '池袋', '秋葉原']
        
        return any(keyword in text.lower() for keyword in tokyo_keywords) or activity.get('is_tokyo', False)

    def debug_page_structure(self, soup):
        """调试页面结构"""
        print("\n🔍 页面结构调试信息:")
        
        # 查找所有可能的容器
        containers = soup.find_all(['div', 'section', 'article', 'ul', 'ol'])
        
        structure_info = {}
        for container in containers:
            class_name = ' '.join(container.get('class', []))
            if class_name:
                if class_name not in structure_info:
                    structure_info[class_name] = 0
                structure_info[class_name] += 1
        
        print("📊 页面中的主要CSS类:")
        for class_name, count in sorted(structure_info.items(), key=lambda x: x[1], reverse=True)[:20]:
            print(f"   .{class_name}: {count} 个元素")
        
        # 查找所有链接
        links = soup.find_all('a', href=True)
        event_links = [link for link in links if '/event/' in link.get('href', '')]
        
        print(f"\n🔗 找到 {len(event_links)} 个活动相关链接:")
        for i, link in enumerate(event_links[:10]):
            href = link.get('href', '')
            text = link.get_text(strip=True)[:50]
            print(f"   {i+1}. {text} → {href}")

    async def run(self):
        """主程序"""
        print("🎯 真实Jalan数据提取器")
        print("⚠️ 严格模式：只提取页面真实数据，禁止硬编码")
        print(f"📍 目标页面: {self.target_url}\n")
        
        await self.crawl_real_data()
        
        print(f"\n📊 提取结果:")
        print(f"   总活动数: {len(self.activities)}")
        print(f"   东京活动: {len([a for a in self.activities if self.is_tokyo_activity(a)])}")
        
        if self.activities:
            print("\n📋 提取到的活动列表:")
            for i, activity in enumerate(self.activities, 1):
                print(f"   {i}. {activity.get('name', 'Unknown')}")
                print(f"      时间: {activity.get('datetime', 'Unknown')}")
                print(f"      地点: {activity.get('venue', 'Unknown')}")
                print(f"      原文: {activity.get('raw_text', '')[:100]}...")
                print()
        else:
            print("❌ 未提取到任何活动数据")
            print("💡 建议检查页面结构或选择器")

def main():
    crawler = RealJalanCrawler()
    asyncio.run(crawler.run())

if __name__ == "__main__":
    main() 