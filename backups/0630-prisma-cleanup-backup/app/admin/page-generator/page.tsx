/**
 * 超级简单的页面生成器（包含图片上传）
 * @description 输入数据库ID，上传图片，一键生成HanabiDetailTemplate页面
 */
'use client';

import { useState, useRef } from 'react';

// 图片压缩函数
const compressImage = (file: File, maxWidth: number = 1200, maxHeight: number = 800, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
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
      
      // 转换为base64，根据文件类型选择格式
      const outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const compressedDataUrl = canvas.toDataURL(outputFormat, quality);
      
      resolve(compressedDataUrl);
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

// 获取压缩后的文件大小（估算）
const getCompressedSize = (dataUrl: string): number => {
  // Base64编码大约比原始数据大33%，去掉data:image/...;base64,前缀
  const base64Data = dataUrl.split(',')[1];
  return Math.round((base64Data.length * 3) / 4);
};

export default function PageGeneratorPage() {
  const [databaseId, setDatabaseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{originalSize: number, compressedSize: number, count: number}>({
    originalSize: 0,
    compressedSize: 0,
    count: 0
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理图片上传（带压缩）
  const handleImageUpload = async (files: FileList) => {
    console.log('handleImageUpload 被调用，文件数量:', files ? files.length : 0);
    
    if (!files || files.length === 0) {
      console.log('没有选择文件');
      return;
    }

    setUploading(true);
    const newImages: string[] = [];
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    let processedCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`处理文件 ${i + 1}:`, file.name, file.type, file.size);
        
        // 检查文件类型
        if (!file.type.startsWith('image/')) {
          alert(`文件 ${file.name} 不是图片格式`);
          continue;
        }

        // 记录原始文件大小
        const originalSize = file.size;
        totalOriginalSize += originalSize;

        try {
          // 压缩图片
          console.log(`开始压缩 ${file.name}...`);
          const compressedDataUrl = await compressImage(file, 1200, 800, 0.8);
          
          // 计算压缩后大小
          const compressedSize = getCompressedSize(compressedDataUrl);
          totalCompressedSize += compressedSize;
          
          console.log(`${file.name} 压缩完成:`, {
            原始大小: `${(originalSize / 1024 / 1024).toFixed(2)}MB`,
            压缩后大小: `${(compressedSize / 1024 / 1024).toFixed(2)}MB`,
            压缩率: `${((1 - compressedSize / originalSize) * 100).toFixed(1)}%`
          });

          newImages.push(compressedDataUrl);
          processedCount++;
          
        } catch (compressionError) {
          console.error(`压缩 ${file.name} 失败:`, compressionError);
          alert(`压缩 ${file.name} 失败，请重试`);
        }
      }

      if (newImages.length > 0) {
        setUploadedImages(prev => [...prev, ...newImages]);
        
        // 更新压缩统计
        setCompressionStats(prev => ({
          originalSize: prev.originalSize + totalOriginalSize,
          compressedSize: prev.compressedSize + totalCompressedSize,
          count: prev.count + processedCount
        }));
        
        const compressionRatio = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1);
        alert(`成功上传并压缩 ${processedCount} 张图片
压缩率: ${compressionRatio}%
原始大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB
压缩后: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
      }
      
    } catch (error) {
      console.error('图片上传失败:', error);
      alert('图片上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  // 删除图片
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // 清空所有图片
  const clearAllImages = () => {
    setUploadedImages([]);
    setCompressionStats({
      originalSize: 0,
      compressedSize: 0,
      count: 0
    });
  };

  const handleGenerate = async () => {
    if (!databaseId.trim()) {
      alert('请输入数据库记录ID');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log('开始生成页面，数据库ID:', databaseId);
      console.log('已上传图片数量:', uploadedImages.length);
      
      const response = await fetch('/api/page-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          databaseId: databaseId.trim(),
          options: {
            uploadedImages: uploadedImages
          }
        })
      });

      const data = await response.json();
      console.log('生成结果:', data);

      if (data.success) {
        setResult({
          success: true,
          message: '页面生成成功！',
          data: data.data
        });
      } else {
        setResult({
          success: false,
          message: data.message || '生成失败',
          error: data.error
        });
      }

    } catch (error) {
      console.error('生成失败:', error);
      setResult({
        success: false,
        message: '网络错误',
        error: error instanceof Error ? error.message : '未知错误'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎆 花火页面生成器
            </h1>
            <p className="text-lg text-gray-600">
              输入数据库ID，上传图片，自动生成HanabiDetailTemplate页面
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 左侧：数据库ID输入 */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  🗄️ 数据库记录ID
                </label>
                <input
                  type="text"
                  value={databaseId}
                  onChange={(e) => setDatabaseId(e.target.value)}
                  placeholder="请输入数据库记录ID"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg text-xl font-bold text-white transition-all ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-1'
                }`}
              >
                {loading ? '⏳ 正在生成页面...' : '🚀 一键生成花火详情页面'}
              </button>
            </div>

            {/* 右侧：图片上传 */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  📸 活动图片上传
                </label>
                
                {/* 图片上传区域 */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const files = e.dataTransfer.files;
                    if (files && files.length > 0) {
                      handleImageUpload(files);
                    }
                  }}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors"
                >
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600 mb-2">
                    {uploading ? '上传中...' : '点击或拖拽上传图片'}
                  </p>
                  <p className="text-sm text-gray-500">
                    支持 JPG、PNG、GIF 格式，自动压缩至1200x800以内
                  </p>
                  
                  {/* 压缩统计显示 */}
                  {compressionStats.count > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm text-green-800">
                        <div className="font-semibold mb-1">📊 压缩统计</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>已处理: {compressionStats.count} 张</div>
                          <div>压缩率: {compressionStats.originalSize > 0 ? ((1 - compressionStats.compressedSize / compressionStats.originalSize) * 100).toFixed(1) : 0}%</div>
                          <div>原始: {(compressionStats.originalSize / 1024 / 1024).toFixed(2)}MB</div>
                          <div>压缩后: {(compressionStats.compressedSize / 1024 / 1024).toFixed(2)}MB</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    console.log('文件选择事件触发', e.target.files);
                    if (e.target.files && e.target.files.length > 0) {
                      handleImageUpload(e.target.files);
                    }
                  }}
                  className="hidden"
                />

                {/* 已上传图片预览 */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-700">
                        已上传图片 ({uploadedImages.length})
                      </h4>
                      <button
                        onClick={clearAllImages}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        清空全部
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`上传图片 ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {result && (
            <div className={`mt-8 p-6 rounded-lg ${
              result.success 
                ? 'bg-green-50 border-2 border-green-200' 
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <div className={`font-bold text-lg mb-3 ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.success ? '✅ 生成成功！' : '❌ 生成失败'}
              </div>
              
              <p className={`mb-4 ${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message}
              </p>

              {result.success && result.data && (
                <div className="space-y-2 text-green-700">
                  <p><strong>活动名称：</strong>{result.data.name}</p>
                  <p><strong>页面文件：</strong>{result.data.filePath}</p>
                  <p><strong>访问地址：</strong>
                    <a 
                      href={`http://localhost:3000${result.data.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      {result.data.url} 🔗
                    </a>
                  </p>
                  <p><strong>地区：</strong>{result.data.regionKey}</p>
                  {uploadedImages.length > 0 && (
                    <p><strong>包含图片：</strong>{uploadedImages.length} 张</p>
                  )}
                </div>
              )}

              {!result.success && result.error && (
                <div className="mt-4 p-3 bg-red-100 rounded text-red-800 text-sm">
                  <strong>错误详情：</strong> {result.error}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">📋 使用说明</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• 输入数据库记录ID（如：cmc66rwgl0001vl5wjardlbtt）</li>
              <li>• 可选：上传活动相关图片（支持多张，自动压缩优化）</li>
              <li>• 图片自动压缩至1200x800像素以内，质量80%</li>
              <li>• 点击生成按钮</li>
              <li>• 系统自动读取Prisma数据库</li>
              <li>• 使用HanabiDetailTemplate生成完整页面</li>
              <li>• 生成成功后可直接访问页面</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}