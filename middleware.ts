import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 🔒 完全阻止admin路径访问
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return new NextResponse(null, { status: 404 })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 