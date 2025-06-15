// Commitlint配置 - 强制使用传统提交格式
// 支持的类型：feat, fix, docs, style, refactor, test, chore
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",    // 新功能
        "fix",     // 修复
        "docs",    // 文档
        "style",   // 格式
        "refactor", // 重构
        "test",    // 测试
        "chore",   // 构建过程或辅助工具的变动
        "perf",    // 性能优化
        "ci",      // CI配置
        "build",   // 构建系统
        "revert",  // 回退
      ],
    ],
    "subject-max-length": [2, "always", 100],
    "subject-case": [0], // 关闭主题大小写检查以支持中文
  },
}; 