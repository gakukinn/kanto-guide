# 🎌 祭典系统快速操作指南

## 🚀 5分钟快速上手

### 1. 系统状态检查
```bash
npm run matsuri:health    # 检查系统健康
npm run matsuri:stats     # 查看数据统计
```

### 2. 数据更新
```bash
npm run matsuri:update    # 手动更新所有数据
npm run matsuri:validate  # 验证数据完整性
```

### 3. 页面访问
- 祭典页面: http://localhost:3001/tokyo/matsuri
- API接口: http://localhost:3001/api/matsuri

## ⏰ 自动调度频率

| 任务 | 频率 | 时间 | 说明 |
|------|------|------|------|
| 数据更新 | 每月 | 1日凌晨2点 | 更新所有祭典数据 |
| 数据验证 | 每月 | 15日凌晨3点 | 验证数据完整性 |
| 活动检查 | 每周 | 周一凌晨1点 | 检查即将到来的祭典 |

## 🛠️ 常用命令

### 数据管理
```bash
# 更新特定地区
node scripts/matsuri-cli.js update --prefecture tokyo

# 强制重新抓取
node scripts/matsuri-cli.js update --force

# 搜索祭典
node scripts/matsuri-cli.js search --query "神田祭"
```

### 系统管理
```bash
# 启动调度器
npm run matsuri:schedule

# 查看演示
npm run matsuri:demo

# 系统备份
node scripts/matsuri-cli.js backup
```

## 🚨 问题排查

### 数据不显示
1. 检查API: `/api/matsuri`
2. 验证数据: `npm run matsuri:validate`
3. 重启服务器: `npm run dev`

### 更新失败
1. 检查网络连接
2. 验证数据源可用性
3. 查看错误日志

## 📊 关键文件

- **页面**: `src/app/tokyo/matsuri/page.tsx`
- **API**: `src/app/api/matsuri/route.ts`
- **爬虫**: `src/lib/crawler/matsuri-crawler.ts`
- **调度**: `src/lib/scheduler/matsuri-scheduler.ts`
- **CLI**: `scripts/matsuri-cli.js`

## 🎯 核心原则

- ✅ 基于真实数据源
- ✅ 月度更新频率
- ✅ 严格数据验证
- ❌ 绝不编造数据
- ❌ 避免频繁请求

---
*最后更新: 2025年1月13日* 