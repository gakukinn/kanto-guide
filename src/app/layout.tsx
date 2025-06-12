import type { Metadata } from "next";
import "./globals.css";
import StagewiseProvider from '../components/StagewiseProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import Script from 'next/script';
export const metadata: Metadata = {
  title: "东京四季旅游指南 - 春樱夏火秋枫冬灯完全攻略",
  description: "探索东京四季之美：春季樱花盛典、夏季花火大会、秋季红叶狩猎、冬季灯光秀。涵盖节日庆典、文化活动、美食祭典的完整旅游指南。",
  keywords: "东京旅游,樱花,花火大会,红叶,灯光秀,东京四季,日本旅游,东京活动,节日庆典",
  openGraph: {
    title: "关东地区花火大会指南",
    description: "发现关东地区最精彩的花火大会，享受夏日烟花之美",
    type: "website",
    locale: "zh_CN"
  },
  robots: {
    index: true,
    follow: true
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="zh">
 <head>
   {/* Google Analytics */}
   <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');
     `}
   </Script>
 </head>
 <body className="antialiased">
 <ErrorBoundary>
   <StagewiseProvider />
   {children}
 </ErrorBoundary>
 </body>
 </html>;
}