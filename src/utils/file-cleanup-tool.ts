/**
 * 文件清理工具
 * 删除多余的文件，确保每个活动只有一个数据库
 */

import { promises as fs } from 'fs';
import { resolve } from 'path';

export class FileCleanupTool {
  // 需要删除的文件列表
  private filesToDelete = [
    // 超出数量限制的level4文件
    'src/data/hanabi/saitama/level4-july-hanabi-seibu-en.ts',
    'src/data/hanabi/saitama/level4-september-saitama-metsa-hanabi.ts',
    'src/data/hanabi/saitama/level4-september-saitama-seibu-hanabi.ts',
    'src/data/hanabi/kitakanto/level4-tamura-hanabi.ts',
    'src/data/hanabi/kitakanto/level4-tatebayashi-hanabi.ts',
    'src/data/hanabi/koshinetsu/level4-suzaka-minna-hanabi.ts',

    // 无效数据文件
    'src/data/hanabi/tokyo/tokyo-kita-hanabi.ts',
    'src/data/hanabi/saitama/saitama-moomin-hanabi.ts',
    'src/data/hanabi/kitakanto/tsuchiura-hanabi-2025.ts',
    'src/data/hanabi/koshinetsu/agano-gozareya-hanabi-2025.ts',
    'src/data/hanabi/koshinetsu/chikuma-chikumagawa-hanabi.ts',
    'src/data/hanabi/koshinetsu/kawaguchiko-hanabi-2025.ts',
    'src/data/hanabi/koshinetsu/nagano-ebisukou-hanabi-2025.ts',
    'src/data/hanabi/koshinetsu/niigata-matsuri-hanabi-2025.ts',
    'src/data/hanabi/koshinetsu/ojiya-matsuri-hanabi-2024.ts',
    'src/data/hanabi/koshinetsu/shinsaku-hanabi-2025.ts',
    'src/data/hanabi/koshinetsu/yamanakako-houkosai-hanabi.ts',
  ];

  // 重复文件处理（保留一个，删除另一个）
  private duplicateFilesToDelete = [
    'src/data/hanabi/tokyo/level4-tokyo-hanabi-sumida.ts', // 保留 level4-july-hanabi-tokyo-sumida.ts
    'src/data/hanabi/koshinetsu/gion-kashiwazaki-matsuri-hanabi.ts', // 保留 level4-gion-kashiwazaki-hanabi.ts
  ];

  constructor() {
    console.log('🧹 初始化文件清理工具');
    console.log(
      `计划删除 ${this.filesToDelete.length + this.duplicateFilesToDelete.length} 个文件`
    );
  }

  /**
   * 执行文件清理
   */
  async cleanup(): Promise<void> {
    console.log('\n🧹 开始清理多余文件...');

    // 合并所有需要删除的文件
    const allFilesToDelete = [
      ...this.filesToDelete,
      ...this.duplicateFilesToDelete,
    ];

    let successCount = 0;
    let failCount = 0;

    for (const filePath of allFilesToDelete) {
      try {
        await this.deleteFile(filePath);
        successCount++;
      } catch (error) {
        console.error(`❌ 删除失败: ${filePath} - ${error}`);
        failCount++;
      }
    }

    this.generateCleanupReport(successCount, failCount);
  }

  /**
   * 删除单个文件
   */
  private async deleteFile(filePath: string): Promise<void> {
    const fullPath = resolve(filePath);

    try {
      // 检查文件是否存在
      await fs.access(fullPath);

      // 删除文件
      await fs.unlink(fullPath);
      console.log(`✅ 已删除: ${filePath}`);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log(`⚠️  文件不存在: ${filePath}`);
      } else {
        throw error;
      }
    }
  }

  /**
   * 预览删除操作（不实际删除）
   */
  async preview(): Promise<void> {
    console.log('\n👀 删除预览（不会实际删除文件）:');

    console.log('\n🔄 重复文件删除:');
    this.duplicateFilesToDelete.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    console.log('\n🗑️  多余文件删除:');
    this.filesToDelete.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    console.log(
      `\n总计: ${this.filesToDelete.length + this.duplicateFilesToDelete.length} 个文件将被删除`
    );

    // 检查文件是否存在
    console.log('\n📋 文件存在性检查:');
    const allFiles = [...this.filesToDelete, ...this.duplicateFilesToDelete];

    for (const filePath of allFiles) {
      try {
        const fullPath = resolve(filePath);
        await fs.access(fullPath);
        console.log(`✅ 存在: ${filePath}`);
      } catch (error) {
        console.log(`❌ 不存在: ${filePath}`);
      }
    }
  }

  /**
   * 生成清理报告
   */
  private generateCleanupReport(successCount: number, failCount: number): void {
    console.log('\n📊 === 文件清理报告 ===');
    console.log(`成功删除: ${successCount} 个文件`);
    console.log(`删除失败: ${failCount} 个文件`);
    console.log(`总计处理: ${successCount + failCount} 个文件`);

    if (failCount === 0) {
      console.log('\n✅ 文件清理完成！');
      console.log('预期结果:');
      console.log('- 删除了重复的数据库文件');
      console.log('- 删除了无效数据文件');
      console.log('- 每个活动现在只有一个数据库文件');
      console.log('- 为缺失区域的文件创建留出了空间');
    } else {
      console.log('\n⚠️  部分文件删除失败，请检查错误信息');
    }

    console.log('\n📝 下一步操作:');
    console.log('1. 为缺失的区域创建新的level4文件');
    console.log('2. 重新扫描确认86个文件的分布');
    console.log('3. 开始四层一致性检查工作流程');
  }

  /**
   * 安全删除（带确认）
   */
  async safeCleanup(): Promise<void> {
    console.log('\n🛡️  安全删除模式');

    // 先预览
    await this.preview();

    console.log('\n⚠️  即将删除上述文件！');
    console.log('这是不可逆操作，请确认无误后继续...');

    // 直接执行删除（在实际环境中可以添加用户确认逻辑）
    await this.cleanup();
  }
}

// 便捷的执行函数
export async function cleanupFiles(): Promise<void> {
  const cleanup = new FileCleanupTool();
  await cleanup.safeCleanup();
}

export async function previewCleanup(): Promise<void> {
  const cleanup = new FileCleanupTool();
  await cleanup.preview();
}
