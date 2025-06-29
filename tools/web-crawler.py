import asyncio
import json
import os
from datetime import datetime
from crawl4ai import AsyncWebCrawler
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy

class JapanGuideWebCrawler:
    """专门为日本旅游指南项目设计的网页爬虫"""
    
    def __init__(self):
        self.output_dir = "crawled-data"
        os.makedirs(self.output_dir, exist_ok=True)
    
    async def crawl_event_page(self, url, event_type="hanabi"):
        """
        爬取活动页面信息
        Args:
            url: 目标网页URL
            event_type: 活动类型 (hanabi, matsuri, hanami, etc.)
        """
        print(f"🕷️ 开始爬取 {event_type} 页面: {url}")
        
        # 定义提取策略
        schema = {
            "name": "event_info",
            "baseSelector": "body",
            "fields": [
                {"name": "title", "selector": "h1, .title, .event-title", "type": "text"},
                {"name": "date", "selector": ".date, .event-date, time", "type": "text"},
                {"name": "location", "selector": ".location, .venue, .place", "type": "text"},
                {"name": "description", "selector": ".description, .content, .detail", "type": "text"},
                {"name": "access", "selector": ".access, .transportation", "type": "text"},
                {"name": "contact", "selector": ".contact, .tel, .phone", "type": "text"},
                {"name": "website", "selector": "a[href*='http']", "type": "attribute", "attribute": "href"},
                {"name": "images", "selector": "img", "type": "attribute", "attribute": "src"}
            ]
        }
        
        extraction_strategy = JsonCssExtractionStrategy(schema, verbose=True)
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            try:
                result = await crawler.arun(
                    url=url,
                    extraction_strategy=extraction_strategy,
                    wait_for=3,
                    remove_overlay_elements=True
                )
                
                if result.success:
                    # 保存原始markdown
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"{event_type}_{timestamp}"
                    
                    # 保存markdown内容
                    with open(f"{self.output_dir}/{filename}.md", "w", encoding="utf-8") as f:
                        f.write(f"# 爬取时间: {datetime.now()}\n")
                        f.write(f"# 源URL: {url}\n\n")
                        f.write(result.markdown)
                    
                    # 保存结构化数据
                    if result.extracted_content:
                        extracted_data = json.loads(result.extracted_content)
                        with open(f"{self.output_dir}/{filename}_structured.json", "w", encoding="utf-8") as f:
                            json.dump({
                                "url": url,
                                "crawl_time": datetime.now().isoformat(),
                                "event_type": event_type,
                                "data": extracted_data
                            }, f, ensure_ascii=False, indent=2)
                    
                    print(f"✅ 爬取成功！文件保存为: {filename}")
                    return {
                        "success": True,
                        "markdown": result.markdown,
                        "structured_data": result.extracted_content,
                        "filename": filename
                    }
                else:
                    print(f"❌ 爬取失败: {result.error_message}")
                    return {"success": False, "error": result.error_message}
                    
            except Exception as e:
                print(f"❌ 发生错误: {e}")
                return {"success": False, "error": str(e)}
    
    async def crawl_multiple_pages(self, urls, event_type="hanabi"):
        """批量爬取多个页面"""
        results = []
        for i, url in enumerate(urls, 1):
            print(f"\n📄 处理第 {i}/{len(urls)} 个页面...")
            result = await self.crawl_event_page(url, event_type)
            results.append(result)
            
            # 添加延迟避免被封
            if i < len(urls):
                print("⏱️ 等待3秒...")
                await asyncio.sleep(3)
        
        return results
    
    async def search_and_crawl(self, base_url, search_terms, event_type="hanabi"):
        """搜索并爬取相关页面"""
        print(f"🔍 在 {base_url} 搜索: {search_terms}")
        
        async with AsyncWebCrawler(verbose=True) as crawler:
            # 首先爬取主页面寻找相关链接
            result = await crawler.arun(url=base_url, wait_for=2)
            
            if result.success:
                # 这里可以添加链接提取逻辑
                print("🔗 找到相关链接...")
                # 实际项目中可以解析HTML寻找包含搜索词的链接
                return result.markdown
            else:
                print(f"❌ 搜索失败: {result.error_message}")
                return None

# 使用示例
async def main():
    crawler = JapanGuideWebCrawler()
    
    # 示例：爬取花火大会信息
    test_urls = [
        "https://www.jalan.net/news/article/522677/",  # 示例URL
        # 可以添加更多URL
    ]
    
    print("🚀 开始批量爬取...")
    results = await crawler.crawl_multiple_pages(test_urls, "hanabi")
    
    success_count = sum(1 for r in results if r["success"])
    print(f"\n📊 爬取完成！成功: {success_count}/{len(results)}")

if __name__ == "__main__":
    asyncio.run(main()) 