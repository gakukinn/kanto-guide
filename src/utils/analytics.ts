// 用户行为分析和转化追踪
export class Analytics {
  // 追踪页面访问
  static trackPageView(pagePath: string, pageTitle: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  }

  // 追踪事件
  static trackEvent(action: string, category: string, label?: string, value?: number) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }

  // 追踪联盟链接点击
  static trackAffiliateClick(provider: string, linkType: string, location?: string) {
    this.trackEvent('affiliate_click', 'monetization', `${provider}_${linkType}_${location}`);
  }

  // 追踪花火大会查看
  static trackHanabiView(hanabiName: string, region: string, month: string) {
    this.trackEvent('hanabi_view', 'engagement', `${month}_${region}_${hanabiName}`);
  }

  // 追踪搜索
  static trackSearch(searchTerm: string, resultCount: number) {
    this.trackEvent('search', 'engagement', searchTerm, resultCount);
  }

  // 追踪收藏
  static trackFavorite(hanabiName: string, action: 'add' | 'remove') {
    this.trackEvent(`favorite_${action}`, 'engagement', hanabiName);
  }

  // 追踪分享
  static trackShare(platform: string, content: string) {
    this.trackEvent('share', 'social', `${platform}_${content}`);
  }

  // 追踪邮件订阅
  static trackSubscription(email: string, source: string) {
    this.trackEvent('subscription', 'conversion', source);
  }
}

// 声明全局gtag类型
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 