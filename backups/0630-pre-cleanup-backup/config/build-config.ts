/**
 * 构建配置文件 - 控制自动构建行为
 * @description 用户可以通过修改此文件来控制是否启用自动构建
 */

export const BuildConfig = {
  // 是否启用自动构建 - 设置为false可以禁用所有自动构建
  enableAutoBuild: false,

  // 是否在部署前强制构建
  forcePreDeployBuild: false,

  // 是否在质量检查后自动构建
  buildAfterQualityCheck: false,

  // 是否在CI/CD中自动构建
  enableCIBuild: false,

  // 构建触发条件
  buildTriggers: {
    onDeploy: false,
    onQualityCheck: false,
    onTypeCheck: false,
    onLint: false,
  },

  // 用户友好的设置说明
  settings: {
    description: '通过修改enableAutoBuild为true可以重新启用自动构建',
    note: '建议只在需要时手动运行 npm run build',
    manualBuildCommand: 'npm run build',
  },
} as const;

export default BuildConfig;
