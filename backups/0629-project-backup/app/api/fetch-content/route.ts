/**
 * 内容抓取代理API
 * @description 解决CORS问题，代理抓取外部网站内容
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');
    
    if (!targetUrl) {
      return NextResponse.json({
        success: false,
        error: '缺少URL参数'
      }, { status: 400 });
    }

    // 验证URL格式
    let urlObj: URL;
    try {
      urlObj = new URL(targetUrl);
    } catch {
      return NextResponse.json({
        success: false,
        error: 'URL格式不正确'
      }, { status: 400 });
    }

    // 安全检查：只允许特定域名
    const allowedDomains = [
      'hanabi.walkerplus.com',
      'jalan.net',
      'jorudan.co.jp'
    ];

    const isAllowed = allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );

    if (!isAllowed) {
      return NextResponse.json({
        success: false,
        error: '不支持的域名，仅支持：' + allowedDomains.join(', ')
      }, { status: 403 });
    }

    // 抓取内容
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      }, { status: response.status });
    }

    const content = await response.text();
    
    // 返回纯文本内容
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('抓取内容失败:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '抓取失败'
    }, { status: 500 });
  }
}

// 处理OPTIONS请求（CORS预检）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 