# 🧹 项目清理计划 - 安全清理残留代码

## 🎯 清理目标
- 移除Prisma相关残留代码和依赖
- 清理不必要的备份文件
- 优化API路由结构
- 清理冗余脚本和配置

## 🔒 核心功能保护清单
### ✅ 必须保留的核心文件
- `src/components/RegionPageTemplate.tsx` (第二层地区模板)
- `src/components/UniversalStaticPageTemplate.tsx` (第三层活动模板)
- `src/components/UniversalStaticDetailTemplate.tsx` (第四层通用详情模板)
- `src/components/WalkerPlusHanabiTemplate.tsx` (第四层花火专用模板)
- `app/admin/activity-page-generator/` (JL四层页面生成器)
- `app/admin/walkerplus-page-generator/` (WP四层页面生成器)
- `app/admin/third-layer-generator/` (三层页面生成器)
- `app/api/activity-page-generator/` (JL生成器API)
- `app/api/walkerplus-page-generator/` (WP生成器API)
- `data/activities/` (所有活动JSON数据)
- `data/regions/` (地区汇总JSON数据)
- `app/tokyo/`, `app/saitama/`, etc. (所有地区页面)

### ❌ 可以安全清理的文件
- `src/lib/prisma.ts` (Prisma连接文件)
- `src/lib/data-fetcher.ts` (包含Prisma调用的数据获取器)
- `src/generated/prisma/` (Prisma生成的文件)
- `backups/` 中的旧备份目录
- `scripts/disabled-prisma-scripts/` (已禁用的Prisma脚本)
- 多余的`.db`文件

## 📋 分阶段清理步骤

### 第一阶段：安全备份 ✅
- [x] 创建完整项目备份
- [ ] 验证备份完整性
- [ ] 记录当前版本状态

### 第二阶段：Prisma残留清理 🔄
- [ ] 从package.json移除Prisma依赖
- [ ] 删除Prisma相关文件
- [ ] 清理Prisma导入语句
- [ ] 更新API路由中的Prisma调用

### 第三阶段：文件系统清理 🔄
- [ ] 清理旧备份目录
- [ ] 移除多余的数据库文件
- [ ] 整理scripts目录
- [ ] 清理无用的API路由

### 第四阶段：依赖优化 🔄
- [ ] 移除不需要的npm包
- [ ] 更新package.json脚本
- [ ] 清理无用的配置文件

### 第五阶段：验证测试 ⏳
- [ ] 运行核心功能测试
- [ ] 验证生成器功能
- [ ] 检查页面正常渲染
- [ ] 确认构建成功

## 🚨 安全措施
1. **增量清理**：一次只清理一种类型的文件
2. **功能验证**：每个阶段后都测试核心功能
3. **回滚机制**：保留完整备份，随时可恢复
4. **分支保护**：在独立分支进行清理操作

## 🎛️ 清理命令参考
```bash
# 清理Prisma依赖
npm uninstall @prisma/client prisma

# 清理生成的文件
rm -rf src/generated/prisma/

# 清理旧备份
rm -rf backups/0627-project-backup/
rm -rf backups/0628-project-backup/
rm -rf backups/0628-prisma-cleanup-backup/
rm -rf backups/0629-project-backup/

# 验证核心功能
npm run build
npm run dev
```

## 📊 预期效果
- 项目大小减少：~300MB → ~100MB
- TypeScript错误减少：256个 → <10个
- 依赖包数量减少：~50个 → ~30个
- 构建时间缩短：~2分钟 → ~1分钟 