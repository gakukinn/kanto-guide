/**
 * 图片压缩工具函数库
 * @description 提供通用的图片压缩功能，支持自定义压缩参数
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: 'jpeg' | 'png' | 'webp';
}

export interface CompressionResult {
  compressedDataUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  count: number;
}

/**
 * 压缩单个图片
 * @param file 原始图片文件
 * @param options 压缩选项
 * @returns Promise<CompressionResult>
 */
export const compressImage = (
  file: File, 
  options: CompressionOptions = {}
): Promise<CompressionResult> => {
  const {
    maxWidth = 1200,
    maxHeight = 800,
    quality = 0.8,
    outputFormat = 'jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      try {
        // 计算压缩后的尺寸
        let { width, height } = img;
        
        // 按比例缩放
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        // 设置canvas尺寸
        canvas.width = width;
        canvas.height = height;
        
        // 绘制压缩后的图片
        ctx?.drawImage(img, 0, 0, width, height);
        
        // 确定输出格式
        let mimeType: string;
        if (outputFormat === 'png') {
          mimeType = 'image/png';
        } else if (outputFormat === 'webp') {
          mimeType = 'image/webp';
        } else {
          mimeType = 'image/jpeg';
        }
        
        // 转换为base64
        const compressedDataUrl = canvas.toDataURL(mimeType, quality);
        
        // 计算压缩结果
        const originalSize = file.size;
        const compressedSize = getDataUrlSize(compressedDataUrl);
        const compressionRatio = ((1 - compressedSize / originalSize) * 100);
        
        resolve({
          compressedDataUrl,
          originalSize,
          compressedSize,
          compressionRatio
        });
      } catch (error) {
        reject(new Error(`图片压缩失败: ${error}`));
      }
    };
    
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    
    // 读取原始图片
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 批量压缩图片
 * @param files 图片文件列表
 * @param options 压缩选项
 * @param onProgress 进度回调函数
 * @returns Promise<CompressionResult[]>
 */
export const compressImages = async (
  files: FileList | File[],
  options: CompressionOptions = {},
  onProgress?: (current: number, total: number, result: CompressionResult) => void
): Promise<CompressionResult[]> => {
  const results: CompressionResult[] = [];
  const fileArray = Array.from(files);
  
  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];
    
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      throw new Error(`文件 ${file.name} 不是图片格式`);
    }
    
    try {
      const result = await compressImage(file, options);
      results.push(result);
      
      // 调用进度回调
      if (onProgress) {
        onProgress(i + 1, fileArray.length, result);
      }
    } catch (error) {
      throw new Error(`压缩文件 ${file.name} 失败: ${error}`);
    }
  }
  
  return results;
};

/**
 * 获取Data URL的字节大小（估算）
 * @param dataUrl Data URL字符串
 * @returns 字节大小
 */
export const getDataUrlSize = (dataUrl: string): number => {
  // Base64编码大约比原始数据大33%，去掉data:image/...;base64,前缀
  const base64Data = dataUrl.split(',')[1];
  return Math.round((base64Data.length * 3) / 4);
};

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化的大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 计算压缩统计信息
 * @param results 压缩结果数组
 * @returns 统计信息
 */
export const calculateCompressionStats = (results: CompressionResult[]): CompressionStats => {
  const totalOriginalSize = results.reduce((sum, result) => sum + result.originalSize, 0);
  const totalCompressedSize = results.reduce((sum, result) => sum + result.compressedSize, 0);
  
  return {
    originalSize: totalOriginalSize,
    compressedSize: totalCompressedSize,
    count: results.length
  };
};

/**
 * 预设的压缩配置
 */
export const COMPRESSION_PRESETS = {
  // 高质量（适合重要图片）
  HIGH_QUALITY: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.9,
    outputFormat: 'jpeg' as const
  },
  
  // 标准质量（适合一般用途）
  STANDARD: {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 0.8,
    outputFormat: 'jpeg' as const
  },
  
  // 低质量（适合缩略图）
  LOW_QUALITY: {
    maxWidth: 800,
    maxHeight: 600,
    quality: 0.6,
    outputFormat: 'jpeg' as const
  },
  
  // 缩略图
  THUMBNAIL: {
    maxWidth: 300,
    maxHeight: 200,
    quality: 0.7,
    outputFormat: 'jpeg' as const
  }
}; 