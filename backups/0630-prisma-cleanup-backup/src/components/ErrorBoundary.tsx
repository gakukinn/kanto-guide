'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // 如果有自定义的 fallback UI，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认的错误 UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-rose-100 to-blue-100 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
              {/* 错误图标 */}
              <div className="mb-8">
                <div className="mb-4 text-8xl md:text-9xl">⚠️</div>
                <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
                  页面出错了
                </h1>
                <p className="mb-6 text-lg text-gray-600">
                  抱歉，页面遇到了一个意外错误。
                  <br />
                  请尝试以下解决方案：
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <button
                  onClick={this.handleReload}
                  className="transform rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">🔄</span>
                    <span>刷新页面</span>
                  </div>
                </button>

                <button
                  onClick={this.handleReset}
                  className="transform rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">🔧</span>
                    <span>重试</span>
                  </div>
                </button>

                <Link
                  href="/"
                  className="transform rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4 text-center font-medium text-white transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-rose-600 hover:shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">🏠</span>
                    <span>返回首页</span>
                  </div>
                </Link>
              </div>

              {/* 快速导航 */}
              <div className="mb-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  🔗 快速导航
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    href={("/" as any)}
                    className="rounded-full border border-red-200 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-200 hover:border-red-300 hover:from-red-500/20 hover:to-rose-500/20"
                  >
                    东京花火
                  </Link>
                  <Link
                    href={("/" as any)}
                    className="rounded-full border border-blue-200 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-200 hover:border-blue-300 hover:from-blue-500/20 hover:to-cyan-500/20"
                  >
                    神奈川花火
                  </Link>
                  <Link
                    href={("/" as any)}
                    className="rounded-full border border-sky-200 bg-gradient-to-r from-sky-500/10 to-blue-500/10 px-4 py-2 text-sm font-medium text-sky-700 transition-all duration-200 hover:border-sky-300 hover:from-sky-500/20 hover:to-blue-500/20"
                  >
                    千叶花火
                  </Link>
                  <Link
                    href={("/" as any)}
                    className="rounded-full border border-orange-200 bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-4 py-2 text-sm font-medium text-orange-700 transition-all duration-200 hover:border-orange-300 hover:from-orange-500/20 hover:to-amber-500/20"
                  >
                    埼玉花火
                  </Link>
                </div>
              </div>

              {/* 错误详情（开发模式显示） */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-8 rounded-lg bg-gray-100 p-4 text-left">
                  <h4 className="mb-2 font-semibold text-gray-800">
                    开发者信息：
                  </h4>
                  <details className="text-sm text-gray-600">
                    <summary className="mb-2 cursor-pointer font-medium">
                      查看错误详情
                    </summary>
                    <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded border bg-white p-3">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </div>
              )}

              {/* 提示信息 */}
              <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
                <p className="mb-2">
                  💡 <strong>如果问题持续存在：</strong>
                </p>
                <ul className="list-inside list-disc space-y-1 text-left">
                  <li>清除浏览器缓存并重试</li>
                  <li>检查网络连接是否正常</li>
                  <li>尝试使用其他浏览器访问</li>
                  <li>稍后再试，可能是临时性问题</li>
                </ul>
              </div>
            </div>

            {/* 装饰元素 */}
            <div className="mt-8 opacity-60">
              <div className="flex justify-center space-x-4 text-4xl">
                <span className="animate-pulse">🔧</span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                >
                  ⚡
                </span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: '1s' }}
                >
                  🎋
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
