# 86个活动数据一致性检查工作流程

## 概述

这是一个完整的三步骤工作流程，专门为Kanto Travel Guide项目设计，确保**信息准确性作为基本前提**。

### 核心目标

- 确保86个花火大会活动数据的准确性和一致性
- 遵循数据源优先级：**官方网站 > WalkerPlus > 项目数据**
- 利用现有的30+爬虫文件基础设施

## 系统架构

### 数据存储系统

项目采用TypeScript文件作为数据库，按区域组织：

```
src/data/hanabi/
├── tokyo/          # 东京地区 (16个活动)
├── kanagawa/       # 神奈川县 (15个活动)
├── chiba/          # 千叶县 (15个活动)
├── saitama/        # 埼玉县 (14个活动)
├── kitakanto/      # 北关东 (13个活动)
└── koshinetsu/     # 甲信越 (13个活动)
```

### 数据结构

每个活动使用 `HanabiData` 接口：

- 基本信息：日期、时间、地点、观众数、花火数
- 数据源验证：`officialSource.walkerPlusUrl`
- 数据确认：`dataConfirmedBy: 'USER_PROVIDED'`

## 三步骤工作流程

### 步骤1：从四层详细页面提取信息

```typescript
await workflow.step1_ExtractFromDetailPages();
```

**功能：**

- 扫描6个区域的所有level4详细页面文件
- 提取当前的时间、地点、观众数、花火数信息
- 识别WalkerPlus URL和官方网站URL
- 生成活动信息统计报告

**输出结果：** (最新测试结果)

```
📊 步骤1完成：共提取 80 个活动的详细信息
   - 包含WalkerPlus URL: 37 个
   - 包含官方网站URL: 80 个

区域分布:
  - tokyo: 14 个活动
  - kanagawa: 8 个活动
  - chiba: 14 个活动
  - saitama: 16 个活动
  - kitakanto: 13 个活动
  - koshinetsu: 15 个活动
```

### 步骤2：使用现有爬虫技术提取外部数据

```typescript
await workflow.step2_CrawlExternalData();
```

**功能：**

- 顺序处理，间隔2-3秒确保稳定性
- 优先爬取官方网站数据（可靠性：高）
- 其次爬取WalkerPlus数据（可靠性：中等）
- 使用现有Playwright + Cheerio + Crawlee基础设施
- 错误处理和重试机制

**数据优先级：**

1. 官方网站 (reliability: 'high')
2. WalkerPlus (reliability: 'medium')

### 步骤3：对比和更新数据

```typescript
await workflow.step3_CompareAndUpdate();
```

**功能：**

- 对比项目数据与外部数据源
- 应用数据源优先级规则
- 智能判断是否需要更新
- 自动更新数据文件
- 生成详细的一致性报告

**更新策略：**

- 项目数据为空/过时时优先更新
- 外部数据更具体且可靠性高时更新
- 相似度< 70%且外部源可靠时更新

## 使用方法

### 完整工作流程执行

```typescript
import { DataConsistencyWorkflow } from './src/utils/86-activities-data-consistency-workflow';

// 执行完整工作流程
const workflow = new DataConsistencyWorkflow();
await workflow.executeFullWorkflow();

// 或使用便捷函数
import { runDataConsistencyWorkflow } from './src/utils/86-activities-data-consistency-workflow';
await runDataConsistencyWorkflow();
```

### 分步执行（用于调试）

```typescript
const workflow = new DataConsistencyWorkflow();

// 只执行步骤1：提取信息
const activities = await workflow.step1_ExtractFromDetailPages();

// 只执行步骤2：爬取外部数据
await workflow.step2_CrawlExternalData();

// 只执行步骤3：对比更新
await workflow.step3_CompareAndUpdate();
```

### 测试运行

```bash
# 测试步骤1（提取信息）
npx tsx test-workflow.ts

# 运行完整工作流程
npx tsx -e "import('./src/utils/86-activities-data-consistency-workflow').then(m => m.runDataConsistencyWorkflow())"
```

## 数据一致性检查标准

### 检查字段

- `date`: 活动日期
- `time`: 活动时间
- `location`: 举办地点
- `expectedVisitors`: 预期观众数
- `fireworksCount`: 花火发数

### 可靠性评级

- **高 (high)**: 官方网站数据
- **中等 (medium)**: WalkerPlus数据
- **低 (low)**: 其他第三方数据

### 更新决策算法

```typescript
shouldUpdate(projectValue, externalValue, reliability) {
  // 项目数据为空或过时 → 更新
  if (!projectValue || projectValue === 'TBD') return true;

  // 高可靠性且更详细 → 更新
  if (reliability === 'high' && externalValue.length > projectValue.length) return true;

  // 相似度低且可靠 → 更新
  const similarity = calculateSimilarity(projectValue, externalValue);
  return similarity < 0.7 && reliability !== 'low';
}
```

## 技术特性

### 错误处理

- 文件读取失败：警告并跳过，继续处理其他文件
- 爬虫失败：记录错误，尝试备用数据源
- 数据更新失败：记录错误，不影响其他文件

### 性能优化

- 顺序处理避免服务器过载
- 2-3秒随机间隔确保稳定性
- 智能相似度计算减少不必要更新
- 增量更新只修改变化的字段

### 安全性

- 只更新指定字段，保护其他数据
- 更新前备份原值在比较记录中
- 使用正则表达式精确匹配字段
- 验证数据格式和约束

## 报告系统

### 最终报告内容

```
📊 === 数据一致性检查最终报告 ===
总处理活动数: 80
发现不一致项: X

数据源更新统计:
  - official: X 项更新
  - walkerplus: X 项更新

字段更新统计:
  - date: X 项更新
  - time: X 项更新
  - location: X 项更新
  - expectedVisitors: X 项更新
  - fireworksCount: X 项更新

区域更新统计:
  - tokyo: X 个活动有更新
  - kanagawa: X 个活动有更新
  - chiba: X 个活动有更新
  - saitama: X 个活动有更新
  - kitakanto: X 个活动有更新
  - koshinetsu: X 个活动有更新
```

## 维护说明

### 添加新活动

1. 创建新的TypeScript数据文件
2. 确保包含 `officialSource.walkerPlusUrl`
3. 运行工作流程自动验证数据

### 修改检查规则

修改 `shouldUpdate()` 方法中的判断逻辑

### 添加新数据源

1. 实现新的爬虫方法
2. 在 `step2_CrawlExternalData()` 中添加调用
3. 更新可靠性评级

## 故障排除

### 常见问题

1. **Windows路径问题**: 已修复，使用file://协议
2. **爬虫超时**: 增加间隔时间或重试次数
3. **数据格式不匹配**: 检查正则表达式模式
4. **权限问题**: 确保对data目录有写权限

### 调试建议

1. 使用分步执行定位问题
2. 检查控制台输出的详细日志
3. 验证数据文件格式和结构
4. 测试单个活动的处理流程

## 结论

这个工作流程确保了Kanto Travel Guide项目中86个花火大会活动数据的准确性和一致性，通过自动化的三步骤流程，大大减少了手动维护的工作量，同时提高了数据质量。
