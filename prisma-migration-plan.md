# Prisma 数据库迁移计划

## 📋 迁移概述

将现有的 SQLite + JSON 存储系统升级为 Prisma + PostgreSQL，保持数据完整性和系统稳定性。

## 🎯 目标

1. **类型安全**: 从数据库到API的完整类型安全
2. **性能提升**: PostgreSQL的高性能查询和索引
3. **扩展性**: 支持复杂查询和数据关联
4. **开发体验**: Prisma Studio可视化管理

## 📦 技术栈升级

```json
{
  "当前": {
    "数据库": "SQLite3",
    "ORM": "原生SQL + JSON文件",
    "类型": "手动TypeScript类型"
  },
  "目标": {
    "数据库": "PostgreSQL 15+",
    "ORM": "Prisma 5.x",
    "类型": "自动生成TypeScript类型",
    "管理工具": "Prisma Studio"
  }
}
```

## 🗃️ 数据模型设计

### 核心实体关系

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Region {
  id          String   @id @default(cuid())
  code        String   @unique // tokyo, saitama, etc.
  nameJa      String   // 東京
  nameCn      String   // 东京
  nameEn      String   // Tokyo
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // 关联
  hanabiEvents  HanabiEvent[]
  matsuriEvents MatsuriEvent[]

  @@map("regions")
}

model HanabiEvent {
  id                    String   @id @default(cuid())
  eventId               String   @unique // sumida-river-48
  nameJa                String   // 第48回隅田川花火大会
  nameCn                String   // 第48回 隅田川花火大会
  nameEn                String   // 48th Sumida River Fireworks Festival
  date                  String   // 2025年7月26日
  location              String   // 東京都墨田区 隅田川河川敷
  description           String?
  expectedVisitors      String?  // 約91万人
  expectedVisitorsNum   Int?     // 910000
  fireworksCount        String?  // 約2万発
  fireworksCountNum     Int?     // 20000
  officialWebsite       String?
  mapEmbedUrl           String?
  likes                 Int      @default(0)
  featured              Boolean  @default(false)

  // 验证信息
  verified              Boolean  @default(false)
  verificationDate      DateTime?
  walkerPlusUrl         String?

  // 关联
  regionId              String
  region                Region   @relation(fields: [regionId], references: [id])

  // 元数据
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@map("hanabi_events")
}

model MatsuriEvent {
  id                    String   @id @default(cuid())
  eventId               String   @unique
  nameJa                String
  nameCn                String
  nameEn                String
  date                  String
  location              String
  description           String?
  expectedVisitors      String?
  expectedVisitorsNum   Int?
  officialWebsite       String?
  mapEmbedUrl           String?
  likes                 Int      @default(0)
  featured              Boolean  @default(false)

  // 祭典特有字段
  matsuriType           String?  // 神社祭、盆踊り、etc.
  traditionLevel        Int?     // 传统程度 1-5

  // 验证信息
  verified              Boolean  @default(false)
  verificationDate      DateTime?

  // 关联
  regionId              String
  region                Region   @relation(fields: [regionId], references: [id])

  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@map("matsuri_events")
}

model ValidationResult {
  id                    String   @id @default(cuid())
  eventId               String
  eventType             String   // hanabi, matsuri
  regionCode            String
  fieldName             String
  localValue            String?
  walkerPlusValue       String?
  isConsistent          Boolean
  confidenceScore       Float    @default(0.0)
  notes                 String?
  validationDate        DateTime @default(now())

  @@map("validation_results")
  @@index([eventId, eventType])
  @@index([validationDate])
}

model WalkerPlusRawData {
  id                    String   @id @default(cuid())
  eventId               String
  regionCode            String
  rawHtml               String
  parsedData            Json
  sourceUrl             String
  scrapeDate            DateTime @default(now())

  @@map("walker_plus_raw_data")
  @@index([eventId])
  @@index([scrapeDate])
}
```

## 🔄 迁移步骤

### Step 1: 环境准备

```bash
# 1. 安装Prisma
npm install prisma @prisma/client
npm install -D prisma

# 2. 初始化Prisma
npx prisma init

# 3. 设置环境变量
echo "DATABASE_URL=\"postgresql://username:password@localhost:5432/kanto_travel_guide\"" >> .env
```

### Step 2: 数据迁移脚本

```typescript
// scripts/migrate-to-prisma.js
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function migrateData() {
  try {
    // 1. 创建地区数据
    const regions = [
      { code: 'tokyo', nameJa: '東京', nameCn: '东京', nameEn: 'Tokyo' },
      { code: 'saitama', nameJa: '埼玉', nameCn: '埼玉', nameEn: 'Saitama' },
      { code: 'chiba', nameJa: '千葉', nameCn: '千叶', nameEn: 'Chiba' },
      {
        code: 'kanagawa',
        nameJa: '神奈川',
        nameCn: '神奈川',
        nameEn: 'Kanagawa',
      },
      {
        code: 'kitakanto',
        nameJa: '北関東',
        nameCn: '北关东',
        nameEn: 'Kita-Kanto',
      },
      {
        code: 'koshinetsu',
        nameJa: '甲信越',
        nameCn: '甲信越',
        nameEn: 'Koshinetsu',
      },
    ];

    for (const region of regions) {
      await prisma.region.upsert({
        where: { code: region.code },
        update: region,
        create: region,
      });
    }

    // 2. 迁移花火数据
    const walkerPlusData = JSON.parse(
      fs.readFileSync('src/database/walkerplus-japanese-database.json', 'utf-8')
    );

    for (const [regionCode, regionData] of Object.entries(
      walkerPlusData.regions
    )) {
      const region = await prisma.region.findUnique({
        where: { code: regionCode },
      });

      if (region && regionData.hanabi?.events) {
        for (const event of regionData.hanabi.events) {
          await prisma.hanabiEvent.upsert({
            where: { eventId: event.id },
            update: {
              nameJa: event.japaneseName,
              nameCn: event.chineseName,
              nameEn: event.englishName,
              date: event.date,
              location: event.location,
              expectedVisitors: event.expectedVisitors,
              expectedVisitorsNum: event.expectedVisitorsNum,
              fireworksCount: event.fireworksCount,
              fireworksCountNum: event.fireworksCountNum,
              officialWebsite: event.officialWebsite,
              mapEmbedUrl: event.mapEmbedUrl,
              verified: event.verified,
              verificationDate: event.verificationDate
                ? new Date(event.verificationDate)
                : null,
              walkerPlusUrl: event.walkerPlusUrl,
            },
            create: {
              eventId: event.id,
              nameJa: event.japaneseName,
              nameCn: event.chineseName,
              nameEn: event.englishName,
              date: event.date,
              location: event.location,
              expectedVisitors: event.expectedVisitors,
              expectedVisitorsNum: event.expectedVisitorsNum,
              fireworksCount: event.fireworksCount,
              fireworksCountNum: event.fireworksCountNum,
              officialWebsite: event.officialWebsite,
              mapEmbedUrl: event.mapEmbedUrl,
              verified: event.verified,
              verificationDate: event.verificationDate
                ? new Date(event.verificationDate)
                : null,
              walkerPlusUrl: event.walkerPlusUrl,
              regionId: region.id,
            },
          });
        }
      }
    }

    console.log('✅ 数据迁移完成');
  } catch (error) {
    console.error('❌ 迁移失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData();
```

### Step 3: API层重构

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// src/lib/api/hanabi.ts
import { prisma } from '../prisma';

export async function getHanabiEventsByRegion(regionCode: string) {
  return await prisma.hanabiEvent.findMany({
    where: {
      region: {
        code: regionCode,
      },
    },
    include: {
      region: true,
    },
    orderBy: {
      date: 'asc',
    },
  });
}

export async function getHanabiEventDetail(eventId: string) {
  return await prisma.hanabiEvent.findUnique({
    where: { eventId },
    include: {
      region: true,
    },
  });
}

export async function incrementHanabiLikes(eventId: string) {
  return await prisma.hanabiEvent.update({
    where: { eventId },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
}
```

### Step 4: 页面组件适配

```typescript
// src/app/tokyo/hanabi/page.tsx (重构后)
import { getHanabiEventsByRegion } from '../../../lib/api/hanabi';
import HanabiPageTemplate from '../../../components/HanabiPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // ... 保持现有metadata配置
};

export default async function TokyoHanabiPage() {
  const hanabiEvents = await getHanabiEventsByRegion('tokyo');

  return (
    <HanabiPageTemplate
      region="tokyo"
      events={hanabiEvents}
      title="东京花火大会2025"
      description="东京都2025年花火大会完整指南..."
    />
  );
}
```

## 📈 性能优化

### 1. 数据库索引优化

```sql
-- 关键索引
CREATE INDEX idx_hanabi_region_date ON hanabi_events(region_id, date);
CREATE INDEX idx_hanabi_featured ON hanabi_events(featured, likes DESC);
CREATE INDEX idx_validation_recent ON validation_results(validation_date DESC);
```

### 2. 查询优化

```typescript
// 使用Prisma的高效查询
export async function getFeaturedEvents() {
  return await prisma.hanabiEvent.findMany({
    where: { featured: true },
    include: {
      region: {
        select: { nameJa: true, nameCn: true, nameEn: true },
      },
    },
    orderBy: { likes: 'desc' },
    take: 10,
  });
}
```

## 🧪 测试策略

### 1. 数据一致性测试

```typescript
// tests/data-migration.test.ts
import { prisma } from '../src/lib/prisma';

describe('Data Migration Tests', () => {
  test('should preserve all hanabi events', async () => {
    const totalEvents = await prisma.hanabiEvent.count();
    expect(totalEvents).toBeGreaterThan(0);
  });

  test('should maintain data integrity', async () => {
    const eventsWithRegion = await prisma.hanabiEvent.findMany({
      include: { region: true },
    });

    eventsWithRegion.forEach(event => {
      expect(event.region).toBeDefined();
      expect(event.nameJa).toBeTruthy();
    });
  });
});
```

## 🚀 部署建议

### 1. 环境配置

```bash
# 生产环境
DATABASE_URL="postgresql://user:password@db.example.com:5432/kanto_prod"

# 开发环境
DATABASE_URL="postgresql://user:password@localhost:5432/kanto_dev"
```

### 2. CI/CD Pipeline

```yaml
# .github/workflows/prisma-deploy.yml
name: Deploy with Prisma

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Build application
        run: npm run build
```

## 📋 迁移时间表

| 阶段   | 任务                      | 预估时间 | 依赖   |
| ------ | ------------------------- | -------- | ------ |
| Week 1 | Prisma设置 + 数据模型设计 | 3-4天    | -      |
| Week 2 | 数据迁移脚本 + 测试       | 4-5天    | Week 1 |
| Week 3 | API重构 + 组件适配        | 5-6天    | Week 2 |
| Week 4 | 性能优化 + 部署           | 2-3天    | Week 3 |

## 🎯 预期收益

1. **开发效率**: Prisma Studio可视化管理，类型安全的查询
2. **性能提升**: PostgreSQL的高性能查询和复杂关联
3. **扩展性**: 支持未来的AI功能和复杂业务逻辑
4. **维护性**: 自动迁移和版本控制

## ⚠️ 风险控制

1. **渐进迁移**: 保持现有系统运行，分阶段切换
2. **数据备份**: 完整的数据备份和回滚方案
3. **A/B测试**: 新旧系统并行运行，确保稳定性
4. **监控告警**: 完善的性能监控和错误告警
