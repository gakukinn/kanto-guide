import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  url: string;
  title: string;
  size?: string;
  width?: number;
  height?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    console.log('原始请求体:', body);
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      return NextResponse.json(
        { success: false, error: 'JSON格式错误' },
        { status: 400 }
      );
    }
    
    const { query } = parsedBody;
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: '搜索关键词不能为空' },
        { status: 400 }
      );
    }

    // 清理搜索关键词：去掉括号内容
    const cleanQuery = query.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim();
    
    console.log('搜索关键词:', cleanQuery);
    console.log('关键词长度:', cleanQuery.length);

    // 优先使用 Google Custom Search API 进行真实图片搜索
    try {
      const googleApiKey = process.env.GOOGLE_API_KEY;
      const googleSearchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
      
      if (!googleApiKey || !googleSearchEngineId) {
        console.error('Google API配置缺失');
        return NextResponse.json({
          success: false,
          message: '图片搜索服务配置错误',
          results: [],
          source: 'error'
        });
      }

      // 构建搜索URL - 使用更安全的编码方式
      const encodedQuery = encodeURIComponent(cleanQuery);
      const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleSearchEngineId}&q=${encodedQuery}&searchType=image&imgSize=xxlarge&num=8&safe=active`;
      
      console.log('Google搜索URL:', searchUrl);
      console.log('编码后的查询:', encodedQuery);
      
      const response = await fetch(searchUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        // 简化过滤条件 - 只检查基本要求
        const results = data.items?.filter((item: any) => {
          if (!item.image || !item.image.width || !item.image.height) return false;
          const ratio = item.image.width / item.image.height;
          return ratio >= 0.5 && ratio <= 3.0; // 放宽比例要求
        }).slice(0, 8).map((item: any) => ({
          url: item.link,
          title: item.title,
          size: `${item.image.width}×${item.image.height}`,
          width: item.image.width,
          height: item.image.height
        })) || [];

        console.log(`Google搜索成功，找到 ${results.length} 张图片`);
        
        return NextResponse.json({
          success: true,
          message: `找到 ${results.length} 张相关图片`,
          results: results,
          source: 'google'
        });
      } else {
        console.error('Google API错误:', response.status, response.statusText);
        const errorData = await response.text();
        console.error('错误详情:', errorData);
      }
    } catch (googleError) {
      console.error('Google搜索失败:', googleError);
    }

    // 如果Google搜索失败，尝试Unsplash API
    try {
      const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
      
      if (unsplashAccessKey) {
        console.log('尝试Unsplash搜索...');
        
        const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cleanQuery)}&per_page=8&orientation=landscape`;
        
        const response = await fetch(searchUrl, {
          headers: {
            'Authorization': `Client-ID ${unsplashAccessKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          const results = data.results?.slice(0, 8).map((item: any) => ({
            url: item.urls.regular,
            title: item.alt_description || item.description || `Photo by ${item.user.name}`,
            size: `${item.width}×${item.height}`,
            width: item.width,
            height: item.height
          })) || [];

          console.log(`Unsplash搜索成功，找到 ${results.length} 张图片`);
          
          return NextResponse.json({
            success: true,
            message: `找到 ${results.length} 张相关图片`,
            results: results,
            source: 'unsplash'
          });
        }
      }
    } catch (unsplashError) {
      console.error('Unsplash搜索失败:', unsplashError);
    }

    // 所有搜索都失败时返回空结果
    console.log('所有图片搜索方法都失败，返回空结果');
    return NextResponse.json({
      success: true,
      message: '未找到相关图片',
      results: [],
      source: 'none'
    });

  } catch (error) {
    console.error('图片搜索API错误:', error);
    return NextResponse.json(
      { success: false, error: '搜索过程中出现错误' },
      { status: 500 }
    );
  }
} 