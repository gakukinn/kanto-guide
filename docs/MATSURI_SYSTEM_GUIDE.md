# 🎌 祭典数据管理系统完整指南

## 📋 系统概述

这是一套专业级的祭典数据管理系统，采用现代化技术栈构建，为关东地区旅游网站提供完整的数据抓取、处理、存储和管理解决方案。

### 🏗️ 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                    前端展示层 (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│                    API 路由层 (Next.js API)                  │
├─────────────────────────────────────────────────────────────┤
│                    业务逻辑层 (Services)                     │
├─────────────────────────────────────────────────────────────┤
│                    数据抓取层 (Crawlee + Playwright)         │
├─────────────────────────────────────────────────────────────┤
│                    数据存储层 (JSON → SQLite → PostgreSQL)   │
├─────────────────────────────────────────────────────────────┤
│                    任务调度层 (Node-cron)                    │
└─────────────────────────────────────────────────────────────┘
```

### 🛠️ 核心技术栈

- **前端**: Next.js 15 + TypeScript + Tailwind CSS
- **数据抓取**: Crawlee + Playwright (最现代化的解决方案)
- **数据验证**: Zod (类型安全)
- **任务调度**: Node-cron (定时更新)
- **数据存储**: JSON文件 (可扩展到数据库)
- **API**: Next.js API Routes
- **CLI工具**: Node.js 命令行界面

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install crawlee playwright zod node-cron @types/node-cron
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 使用CLI工具

```bash
# 查看帮助
npm run matsuri help

# 更新东京祭典数据
npm run matsuri:update tokyo

# 验证所有数据
npm run matsuri:validate

# 查看统计信息
npm run matsuri:stats

# 系统健康检查
npm run matsuri:health
```

## 📁 文件结构

```
src/
├── types/
│   └── matsuri.ts                    # 数据类型定义和验证
├── lib/
│   ├── crawler/
│   │   └── matsuri-crawler.ts        # 专业级数据爬虫
│   ├── services/
│   │   └── matsuri-data-service.ts   # 数据管理服务
│   └── scheduler/
│       └── matsuri-scheduler.ts      # 定时任务调度器
├── app/
│   ├── api/
│   │   ├── matsuri/
│   │   │   └── route.ts              # 祭典数据API
│   │   └── admin/
│   │       └── matsuri/
│   │           └── route.ts          # 管理面板API
│   └── tokyo/
│       └── matsuri/
│           └── page.tsx              # 祭典展示页面
└── components/
    └── matsuri-page-template-exact.tsx  # 祭典页面模板

scripts/
└── matsuri-cli.js                   # 命令行工具

docs/
└── MATSURI_SYSTEM_GUIDE.md          # 系统文档
```

## 🔧 核心功能

### 1. 数据抓取 (MatsuriCrawler)

**支持的数据源:**
- omaturilink.com (主要数据源)
- matcha-jp.com (MATCHA旅游网站)
- on-japan.jp (Real Japan 'on)

**特性:**
- 智能网站识别和适配
- 多种数据格式解析
- 错误处理和重试机制
- 数据标准化和验证

**使用示例:**
```typescript
import { MatsuriCrawler } from '@/lib/crawler/matsuri-crawler';

const crawler = new MatsuriCrawler();
const result = await crawler.crawl([
  'https://omaturilink.com/%E6%9D%B1%E4%BA%AC%E9%83%BD/'
]);

console.log(`抓取到 ${result.data.length} 个祭典活动`);
```

### 2. 数据管理 (MatsuriDataService)

**核心功能:**
- 数据存储和加载
- 数据验证和完整性检查
- 搜索和过滤
- 统计信息生成
- 点赞数管理

**使用示例:**
```typescript
import { MatsuriDataService } from '@/lib/services/matsuri-data-service';

const service = new MatsuriDataService();

// 加载数据
const events = await service.loadMatsuriData('tokyo');

// 搜索祭典
const results = await service.searchMatsuri('tokyo', '神田祭');

// 获取统计信息
const stats = await service.getMatsuriStats('tokyo');
```

### 3. 任务调度 (MatsuriScheduler)

**定时任务:**
- 每月1日凌晨2点自动更新数据
- 每月15日凌晨3点数据验证
- 每周一凌晨1点检查即将到来的祭典

**手动操作:**
```typescript
import { matsuriScheduler } from '@/lib/scheduler/matsuri-scheduler';

// 启动调度器
matsuriScheduler.start();

// 手动更新
await matsuriScheduler.manualUpdate('tokyo');

// 获取状态
const status = matsuriScheduler.getStatus();
```

### 4. API接口

#### 祭典数据API (`/api/matsuri`)

**GET 请求参数:**
- `prefecture`: 都道府县 (默认: tokyo)
- `q`: 搜索关键词
- `category`: 祭典类型 (大型/中型/小型)
- `startDate`: 开始日期
- `endDate`: 结束日期

**POST 操作:**
- `update`: 更新数据
- `validate`: 验证数据
- `like`: 更新点赞数

**使用示例:**
```javascript
// 获取东京祭典数据
const response = await fetch('/api/matsuri?prefecture=tokyo');
const data = await response.json();

// 搜索祭典
const searchResponse = await fetch('/api/matsuri?prefecture=tokyo&q=神田祭');

// 更新数据
await fetch('/api/matsuri', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'update', prefecture: 'tokyo' })
});
```

#### 管理面板API (`/api/admin/matsuri`)

**功能:**
- 系统仪表板
- 数据统计
- 调度器管理
- 健康检查
- 数据备份和恢复

### 5. 命令行工具 (CLI)

**可用命令:**

```bash
# 数据管理
npm run matsuri update tokyo          # 更新东京数据
npm run matsuri validate all          # 验证所有数据
npm run matsuri stats                 # 查看统计信息
npm run matsuri search tokyo "神田祭"  # 搜索祭典

# 系统管理
npm run matsuri scheduler start       # 启动调度器
npm run matsuri scheduler stop        # 停止调度器
npm run matsuri scheduler status      # 查看调度器状态

# 数据备份
npm run matsuri backup tokyo          # 备份东京数据

# 系统监控
npm run matsuri health                # 系统健康检查
```

## 📊 数据结构

### 祭典事件数据 (MatsuriEvent)

```typescript
interface MatsuriEvent {
  id: string;                    // 唯一标识符
  title: string;                 // 祭典名称
  japaneseName: string;          // 日文名称
  englishName: string;           // 英文名称
  date: string;                  // 开始日期 (ISO格式)
  endDate?: string;              // 结束日期 (可选)
  location: string;              // 举办地点
  visitors: string;              // 预计访客数
  duration: string;              // 活动时长
  category: '大型' | '中型' | '小型';  // 祭典规模
  highlights: string[];          // 特色亮点
  likes: number;                 // 点赞数
  website: string;               // 官方网站
  description: string;           // 详细描述
  prefecture: string;            // 都道府县
  lastUpdated: string;           // 最后更新时间
  source: string;                // 数据来源
  verified: boolean;             // 是否已验证
}
```

### 爬虫结果 (CrawlResult)

```typescript
interface CrawlResult {
  success: boolean;              // 是否成功
  data: MatsuriEvent[];          // 抓取的数据
  errors: string[];              // 错误信息
  timestamp: string;             // 时间戳
  source: string;                // 数据源
}
```

## 🔍 数据验证

系统使用 Zod 进行严格的数据验证：

```typescript
import { MatsuriEventSchema } from '@/types/matsuri';

// 验证单个事件
const validatedEvent = MatsuriEventSchema.parse(rawData);

// 验证数组
const validatedEvents = rawDataArray.map(item => 
  MatsuriEventSchema.parse(item)
);
```

**验证规则:**
- 必填字段检查
- URL格式验证
- 日期格式验证
- 枚举值验证
- 数据类型检查

## 📈 监控和统计

### 系统健康检查

```bash
npm run matsuri health
```

**检查项目:**
- 数据文件完整性
- 调度器运行状态
- 系统资源使用情况
- 内存使用量
- 系统运行时间

### 数据统计

```bash
npm run matsuri stats
```

**统计信息:**
- 总祭典数量
- 按类型分类统计
- 即将到来的祭典数量
- 最后更新时间
- 各都道府县数据状态

## 🚨 错误处理

### 常见错误和解决方案

1. **数据抓取失败**
   ```bash
   npm run matsuri health  # 检查系统状态
   npm run matsuri update tokyo  # 重新抓取
   ```

2. **数据验证错误**
   ```bash
   npm run matsuri validate all  # 查看详细错误
   ```

3. **调度器问题**
   ```bash
   npm run matsuri scheduler status  # 检查状态
   npm run matsuri scheduler start   # 重启调度器
   ```

### 日志和调试

系统提供详细的日志输出：
- 抓取过程日志
- 数据验证日志
- 调度器执行日志
- API请求日志

## 🔧 配置和自定义

### 数据源配置

在 `MatsuriDataService` 中修改数据源URL：

```typescript
private getDataSourceUrls(prefecture: string): string[] {
  const urlMap: Record<string, string[]> = {
    tokyo: [
      'https://omaturilink.com/%E6%9D%B1%E4%BA%AC%E9%83%BD/',
      'https://matcha-jp.com/jp/20117',
      // 添加新的数据源...
    ]
  };
  return urlMap[prefecture] || urlMap.tokyo;
}
```

### 调度任务配置

在 `MatsuriScheduler` 中修改定时任务：

```typescript
// 每天凌晨2点更新数据
this.scheduleTask('daily-update', '0 2 * * *', async () => {
  await this.updateAllPrefectures();
});

// 自定义调度时间
this.scheduleTask('custom-task', '0 */6 * * *', async () => {
  // 每6小时执行一次
});
```

## 🚀 部署和扩展

### 生产环境部署

1. **环境变量配置**
   ```bash
   NODE_ENV=production
   MATSURI_DATA_PATH=/var/data/matsuri
   SCHEDULER_TIMEZONE=Asia/Tokyo
   ```

2. **数据库升级**
   - 从JSON文件迁移到SQLite
   - 进一步升级到PostgreSQL
   - 添加Redis缓存层

3. **监控和告警**
   - 集成Prometheus监控
   - 设置Grafana仪表板
   - 配置告警通知

### 扩展功能

1. **多语言支持**
   - 添加英文、韩文等语言
   - 自动翻译功能

2. **高级搜索**
   - 全文搜索引擎
   - 地理位置搜索
   - 智能推荐

3. **用户功能**
   - 用户收藏
   - 评论系统
   - 社交分享

## 📞 技术支持

### 常用命令速查

```bash
# 快速诊断
npm run matsuri health

# 数据更新
npm run matsuri:update

# 完整验证
npm run matsuri:validate

# 查看统计
npm run matsuri:stats

# 创建备份
npm run matsuri:backup

# 调度器状态
npm run matsuri:scheduler
```

### 开发调试

```bash
# 开发模式启动
npm run dev

# 实时数据更新
npm run matsuri update tokyo && npm run dev

# 数据验证和修复
npm run matsuri validate all
npm run matsuri update tokyo
```

---

## 🎯 总结

这套祭典数据管理系统提供了：

✅ **专业级数据抓取** - 使用最现代化的Crawlee + Playwright技术栈  
✅ **完整的数据管理** - 从抓取到存储到展示的全流程管理  
✅ **自动化调度** - 定时更新和维护，无需人工干预  
✅ **强大的CLI工具** - 方便开发者和管理员操作  
✅ **完善的API接口** - 支持前端集成和第三方调用  
✅ **严格的数据验证** - 确保数据质量和一致性  
✅ **可扩展架构** - 支持未来功能扩展和性能优化  

这是一个生产就绪的解决方案，可以直接用于商业项目，并且具备良好的可维护性和扩展性。 