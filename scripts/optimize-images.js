import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 配置
const CONFIG = {
  inputDir: './public/images',
  outputDir: './public/images/optimized',
  formats: ['webp', 'jpeg'],
  qualities: {
    webp: 80,
    jpeg: 85,
  },
  sizes: [
    { name: 'thumbnail', width: 400, height: 300 },
    { name: 'medium', width: 800, height: 600 },
    { name: 'large', width: 1200, height: 900 },
  ],
};

// 获取所有图片文件
function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(item.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

// 优化单个图片
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(CONFIG.inputDir, path.dirname(inputPath));
  const outputSubDir = path.join(outputDir, relativePath);

  // 确保输出目录存在
  fs.mkdirSync(outputSubDir, { recursive: true });

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`处理: ${inputPath}`);
    console.log(
      `原始尺寸: ${metadata.width}x${metadata.height}, 大小: ${metadata.size} bytes`
    );

    for (const size of CONFIG.sizes) {
      for (const format of CONFIG.formats) {
        const outputPath = path.join(
          outputSubDir,
          `${filename}-${size.name}.${format}`
        );

        await image
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center',
          })
          .toFormat(format, {
            quality: CONFIG.qualities[format],
            progressive: true,
            mozjpeg: format === 'jpeg',
          })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        console.log(`  生成: ${outputPath} (${stats.size} bytes)`);
      }
    }

    // 生成原始尺寸的WebP版本
    const originalWebP = path.join(outputSubDir, `${filename}-original.webp`);
    await image
      .toFormat('webp', { quality: CONFIG.qualities.webp })
      .toFile(originalWebP);

    const webpStats = fs.statSync(originalWebP);
    console.log(`  原始WebP: ${originalWebP} (${webpStats.size} bytes)`);
  } catch (error) {
    console.error(`处理失败 ${inputPath}:`, error.message);
  }
}

// 生成图片映射文件
function generateImageMap(outputDir) {
  const imageMap = {};

  function scanDir(dir, prefix = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath, prefix + item.name + '/');
      } else if (/\.(webp|jpeg)$/i.test(item.name)) {
        const key = prefix + item.name;
        const relativePath = path.relative('./public', fullPath);
        imageMap[key] = `/${relativePath.replace(/\\/g, '/')}`;
      }
    }
  }

  scanDir(outputDir);

  const mapPath = './src/config/image-map.json';
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  console.log(`图片映射文件已生成: ${mapPath}`);
}

// 主函数
async function main() {
  console.log('开始图片优化...');

  // 创建输出目录
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });

  // 获取所有图片文件
  const imageFiles = getImageFiles(CONFIG.inputDir);
  console.log(`找到 ${imageFiles.length} 个图片文件`);

  // 优化所有图片
  for (const imagePath of imageFiles) {
    await optimizeImage(imagePath, CONFIG.outputDir);
  }

  // 生成图片映射
  generateImageMap(CONFIG.outputDir);

  console.log('图片优化完成！');
}

// 运行脚本
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch(console.error);
}

export { generateImageMap, optimizeImage };
