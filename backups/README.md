# 数据库备份目录

这个目录用于存储Prisma数据库的备份文件。

## 备份文件命名规则

- `dev-YYYY-MM-DDTHH-MM-SS.db` - 开发环境数据库备份
- 例如：`dev-2024-01-15T14-30-25.db`

## 如何使用备份

### 恢复数据库
```bash
# 停止应用程序
# 将备份文件复制回prisma目录
cp backups/dev-2024-01-15T14-30-25.db prisma/dev.db
# 重启应用程序
```

### 手动备份
```bash
# 创建手动备份
cp prisma/dev.db backups/manual-$(date +%Y%m%d-%H%M%S).db
```

## 注意事项

- 备份文件不会被提交到Git仓库
- 建议定期清理旧的备份文件以节省空间
- 重要操作前请务必备份数据库 