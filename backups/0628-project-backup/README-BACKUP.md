# 项目备份说明 - 2024年12月28日

## 备份时间
- 创建时间：2024年12月28日
- 备份原因：WalkerPlus页面生成器修复前的重要文件备份

## 备份内容

### 核心应用目录
- `app/` - Next.js应用页面和API路由
- `components/` - React组件文件
- `src/` - 源代码文件（组件、工具、类型定义等）

### 数据目录
- `data/` - 静态数据文件（活动信息、地区数据等）
- `prisma/` - 数据库文件和迁移

### 配置文件
- `package.json` - 项目依赖和脚本
- `package-lock.json` - 依赖锁定文件
- `tsconfig.json` - TypeScript配置
- `next.config.js` - Next.js配置
- `tailwind.config.js` - Tailwind CSS配置
- `postcss.config.cjs` - PostCSS配置

### 其他重要目录
- `docs/` - 项目文档
- `lib/` - 库文件
- `types/` - TypeScript类型定义

## 项目状态
- 技术栈：Next.js 15 + React 18 + TypeScript + Tailwind CSS
- 数据库：SQLite (Prisma)
- 服务器：localhost:3000
- 主要功能：WalkerPlus页面生成器，日本活动信息管理

## 重要说明
此备份创建于修复WalkerPlus页面生成器活动简介显示问题之前，包含了项目的所有核心文件和配置。

## 恢复方法
如需恢复此备份：
1. 停止开发服务器
2. 将此目录下的文件复制回项目根目录
3. 运行 `npm install` 重新安装依赖
4. 运行 `npm run dev` 启动开发服务器 