import asyncio
from crawl4ai import AsyncWebCrawler

async def test_crawl():
    print("🚀 测试 Crawl4AI...")
    
    async with AsyncWebCrawler(verbose=True) as crawler:
        try:
            # 测试爬取一个简单的网页
            result = await crawler.arun(
                url="https://httpbin.org/html",
                wait_for=2
            )
            
            if result.success:
                print("✅ 爬取成功！")
                print(f"📄 页面标题: {result.metadata.get('title', '未找到标题')}")
                print(f"📝 内容长度: {len(result.markdown)} 字符")
                print(f"🔗 URL: {result.url}")
                print("\n📋 部分内容:")
                print(result.markdown[:500] + "..." if len(result.markdown) > 500 else result.markdown)
                return True
            else:
                print("❌ 爬取失败")
                print(f"错误: {result.error_message}")
                return False
                
        except Exception as e:
            print(f"❌ 发生错误: {e}")
            return False

if __name__ == "__main__":
    success = asyncio.run(test_crawl())
    if success:
        print("\n🎉 Crawl4AI 安装成功并正常工作！")
    else:
        print("\n😞 安装可能有问题，请检查错误信息") 