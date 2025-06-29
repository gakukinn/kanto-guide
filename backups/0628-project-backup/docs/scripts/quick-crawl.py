#!/usr/bin/env python3
"""
快速网页爬取工具
适用于日本旅游指南项目
"""

import asyncio
import sys
from crawl4ai import AsyncWebCrawler

async def quick_crawl(url):
    """快速爬取单个网页"""
    print(f"🚀 开始爬取: {url}")
    
    async with AsyncWebCrawler(verbose=True) as crawler:
        try:
            result = await crawler.arun(
                url=url,
                wait_for=2,
                remove_overlay_elements=True,
                process_iframes=True
            )
            
            if result.success:
                print(f"✅ 爬取成功！")
                print(f"📄 标题: {result.metadata.get('title', '未找到')}")
                print(f"📝 内容长度: {len(result.markdown)} 字符")
                print(f"🔗 URL: {result.url}")
                
                # 保存到文件
                filename = f"crawled_{url.split('/')[-1][:20]}.md"
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(f"# 爬取来源: {url}\n\n")
                    f.write(result.markdown)
                
                print(f"💾 内容已保存到: {filename}")
                
                # 显示前500字符预览
                print("\n📋 内容预览:")
                print("-" * 50)
                print(result.markdown[:500] + "..." if len(result.markdown) > 500 else result.markdown)
                print("-" * 50)
                
                return result.markdown
            else:
                print(f"❌ 爬取失败: {result.error_message}")
                return None
                
        except Exception as e:
            print(f"❌ 发生错误: {e}")
            return None

def main():
    """主函数"""
    if len(sys.argv) != 2:
        print("使用方法: python quick-crawl.py <URL>")
        print("示例: python quick-crawl.py https://www.jalan.net/")
        sys.exit(1)
    
    url = sys.argv[1]
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    result = asyncio.run(quick_crawl(url))
    
    if result:
        print("\n🎉 爬取完成！您可以在 Cursor 中查看保存的文件。")
    else:
        print("\n😞 爬取失败，请检查URL或网络连接。")

if __name__ == "__main__":
    main() 