// 基础类型定义
export interface Activity {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  region?: string;
  category?: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: any;
}

export interface HanabiAccess {
  train?: string;
  car?: string;
  bus?: string;
}

// 地区配置类型
export interface Region {
  id: string;
  name: string;
  displayName: string;
  emoji: string;
}

// 活动类型
export interface ActivityType {
  id: string;
  name: string;
  displayName: string;
  emoji: string;
}

// 路由类型声明已移除，使用Next.js内置类型

// 全局类型声明
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL?: string;
      DATABASE_URL?: string;
    }
  }
  
  var process: NodeJS.Process;
}

export {};
