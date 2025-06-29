/**
 * 图片搜索组件
 * @description 可复用的图片搜索和选择组件，支持智能搜索、预览和选择功能
 */
'use client';

import React, { useState } from 'react';

interface SearchResult {
  url: string;
  title: string;
  size?: string;
  width?: number;
  height?: number;
}

interface ImageSearchWidgetProps {
  activityName?: string;
  activityType?: string;
  region?: string;
  onImageSelect?: (imageUrl: string, imageData?: SearchResult) => void;
  onImagesSelect?: (images: SearchResult[]) => void;
  maxResults?: number;
  allowMultiSelect?: boolean;
  className?: string;
  autoSearch?: boolean;
  activityData?: {
    venue?: string;
    address?: string;
    name?: string;
  };
}

export default function ImageSearchWidget({
  activityName = '',
  activityType = '',
  region = '',
  onImageSelect,
  onImagesSelect,
  maxResults = 5,
  allowMultiSelect = false,
  className = '',
  autoSearch = false,
  activityData
}: ImageSearchWidgetProps) {
  const [searchQuery, setSearchQuery] = useState(activityName);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<SearchResult[]>([]);
  const [imageMode, setImageMode] = useState<'direct' | 'download'>('direct');
  const [processing, setProcessing] = useState(false);

  // 生成智能搜索关键词 - 简化版
  const generateSearchKeywords = (name: string): string => {
    // 优先使用用户输入的搜索关键词
    const cleanName = name.replace(/（[^）]*）/g, '');
    return cleanName.trim();
  };

  // 执行图片搜索
  const searchImages = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;

    setSearchLoading(true);
    try {
      const response = await fetch('/api/search-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: generateSearchKeywords(searchTerm)
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSearchResults(data.results.slice(0, maxResults));
      } else {
        console.error('搜索失败:', data.error);
      }
    } catch (error) {
      console.error('搜索图片失败:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  // 处理图片下载和压缩（本地模式）
  const downloadAndProcessImage = async (imageUrl: string): Promise<string | null> => {
    try {
      // 下载图片
      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();
      
      // 将blob转换为File对象
      const file = new File([blob], 'searched-image.jpg', { type: blob.type });
      
      // 压缩图片
      const compressedDataUrl = await compressImage(file, 1200, 675, 0.9);
      
      // 将压缩后的图片转换为Blob
      const dataUrlResponse = await fetch(compressedDataUrl);
      const compressedBlob = await dataUrlResponse.blob();
      const compressedFile = new File([compressedBlob], `compressed-${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      // 创建FormData并上传到服务器
      const formData = new FormData();
      formData.append('images', compressedFile);
      
      const uploadResponse = await fetch('/api/upload-images', {
        method: 'POST',
        body: formData
      });

      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        if (uploadResult.success && uploadResult.data?.uploadedFiles?.length > 0) {
          return uploadResult.data.uploadedFiles[0].url;
        }
      }
      return null;
    } catch (error) {
      console.error('处理图片失败:', error);
      return null;
    }
  };

  // 图片压缩函数
  const compressImage = (file: File, maxWidth: number = 1200, maxHeight: number = 675, quality: number = 0.9): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        
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
        
        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } else {
          reject(new Error('Canvas context 获取失败'));
        }
      };
      
      img.onerror = () => reject(new Error('图片加载失败'));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsDataURL(file);
    });
  };

  // 选择单张图片
  const handleImageSelect = async (result: SearchResult) => {
    if (allowMultiSelect) {
      const isSelected = selectedImages.some(img => img.url === result.url);
      if (isSelected) {
        const newSelected = selectedImages.filter(img => img.url !== result.url);
        setSelectedImages(newSelected);
        onImagesSelect?.(newSelected);
      } else {
        const newSelected = [...selectedImages, result];
        setSelectedImages(newSelected);
        onImagesSelect?.(newSelected);
      }
    } else {
      setProcessing(true);
      try {
        if (imageMode === 'direct') {
          // 直接模式：使用原始链接
          onImageSelect?.(result.url, result);
        } else {
          // 下载模式：下载并处理图片
          const localPath = await downloadAndProcessImage(result.url);
          if (localPath) {
            onImageSelect?.(localPath, result);
          } else {
            alert('图片处理失败，请重试');
          }
        }
      } finally {
        setProcessing(false);
      }
    }
  };

  // 自动搜索
  React.useEffect(() => {
    if (autoSearch && activityName) {
      searchImages(activityName);
    }
  }, [autoSearch, activityName]);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {/* 搜索输入区域 */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          🔍 图片搜索
        </label>
        
        {/* 模式切换开关 */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">图片处理模式：</span>
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="imageMode"
                  value="direct"
                  checked={imageMode === 'direct'}
                  onChange={(e) => setImageMode(e.target.value as 'direct' | 'download')}
                  className="mr-2"
                />
                <span className="text-sm">
                  🚀 快速模式 <span className="text-gray-500">(直接使用链接)</span>
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="imageMode"
                  value="download"
                  checked={imageMode === 'download'}
                  onChange={(e) => setImageMode(e.target.value as 'direct' | 'download')}
                  className="mr-2"
                />
                <span className="text-sm">
                  💾 本地模式 <span className="text-gray-500">(下载到服务器)</span>
                </span>
              </label>
            </div>
          </div>
          
          {/* 模式说明 */}
          <div className="mt-2 text-xs text-gray-600">
            {imageMode === 'direct' ? (
              <span>✨ 推荐：速度快，节省空间，使用外部图片链接</span>
            ) : (
              <span>🛡️ 稳定：下载图片到服务器，占用存储但更稳定</span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="输入搜索关键词..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                searchImages();
              }
            }}
          />
          <button
            onClick={() => searchImages()}
            disabled={searchLoading || !searchQuery.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searchLoading ? '搜索中...' : '搜索'}
          </button>
        </div>
        
        {/* 搜索提示 */}
        {activityType && (
          <p className="text-xs text-gray-500 mt-2">
            💡 搜索关键词：{generateSearchKeywords(searchQuery)}
          </p>
        )}
      </div>

      {/* URL直接添加功能 */}
      <div className="mb-6 border-t pt-6">
        <URLImageInput onImageSelect={onImageSelect} imageMode={imageMode} />
      </div>

      {/* 搜索加载状态 */}
      {searchLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">正在搜索合适的图片...</p>
        </div>
      )}

      {/* 处理状态 */}
      {processing && (
        <div className="text-center py-4 mb-4 bg-blue-50 rounded-lg">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-blue-600 text-sm">
            {imageMode === 'direct' ? '正在添加图片链接...' : '正在下载和处理图片...'}
          </p>
        </div>
      )}

      {/* 搜索结果 */}
      {searchResults.length > 0 && !searchLoading && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              搜索结果 ({searchResults.length} 张图片)
            </h3>
            {allowMultiSelect && selectedImages.length > 0 && (
              <span className="text-sm text-blue-600 font-medium">
                已选择 {selectedImages.length} 张
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            {searchResults.map((result, index) => {
              const isSelected = allowMultiSelect && selectedImages.some(img => img.url === result.url);
              
              return (
                <div 
                  key={index} 
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleImageSelect(result)}
                >
                  <div className="flex">
                    {/* 图片区域 - 16:9比例 */}
                    <div className="relative w-80 flex-shrink-0" style={{ height: '180px' }}>
                      <img
                        src={result.url}
                        alt={result.title}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: '16/9' }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          
                          // 避免重复处理
                          if (parent && parent.querySelector('.error-placeholder')) {
                            return;
                          }
                          
                          console.log('图片加载失败:', result.url);
                          target.style.display = 'none';
                          
                          if (parent) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'error-placeholder absolute inset-0 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg';
                            placeholder.innerHTML = `
                              <div class="text-center text-gray-500 p-4">
                                <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="text-sm font-medium">预览不可用</p>
                                <p class="text-xs text-gray-400 mt-1">点击"查看原图"按钮查看</p>
                              </div>
                            `;
                            parent.appendChild(placeholder);
                          }
                        }}
                      />
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    
                    {/* 信息区域 */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-lg text-gray-800 mb-2 font-semibold line-clamp-2">
                          {result.title}
                        </p>
                        {result.size && (
                          <p className="text-sm text-gray-600 mb-1">
                            📏 {result.size} • 16:9比例优化
                          </p>
                        )}
                        {(result as any).source && (
                          <p className="text-xs text-gray-500 mb-3">
                            🌐 来源: {(result as any).source}
                          </p>
                        )}
                        
                        {/* 模式提示 */}
                        <div className="text-xs text-gray-500 mb-2">
                          {imageMode === 'direct' ? (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                              🚀 快速模式：直接使用链接
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              💾 本地模式：下载到服务器
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {!allowMultiSelect && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageSelect(result);
                            }}
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {processing ? '处理中...' : '选择此图片'}
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(result.url, '_blank');
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          查看原图
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 多选模式的操作按钮 */}
          {allowMultiSelect && selectedImages.length > 0 && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => onImagesSelect?.(selectedImages)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                添加选中图片 ({selectedImages.length})
              </button>
              <button
                onClick={() => {
                  setSelectedImages([]);
                  onImagesSelect?.([]);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                清除选择
              </button>
            </div>
          )}
        </div>
      )}

      {/* 无搜索结果 */}
      {searchResults.length === 0 && !searchLoading && searchQuery && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">🔍 未找到相关图片</p>
          <p className="text-sm">请尝试其他关键词或检查网络连接</p>
        </div>
      )}
    </div>
  );
}

// URL图片输入组件
interface URLImageInputProps {
  onImageSelect?: (imageUrl: string, imageData?: SearchResult) => void;
  imageMode: 'direct' | 'download';
}

function URLImageInput({ onImageSelect, imageMode }: URLImageInputProps) {
  const [urlInput, setUrlInput] = useState('');
  const [urlProcessing, setUrlProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  // 验证URL是否为有效的图片链接
  const validateImageUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname.toLowerCase();
      return /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(pathname) || 
             url.includes('unsplash.com') || 
             url.includes('pexels.com') ||
             url.includes('pixabay.com') ||
             url.includes('imgur.com');
    } catch {
      return false;
    }
  };

  // 预览URL图片
  const previewUrlImage = () => {
    if (!urlInput.trim()) return;
    
    if (!validateImageUrl(urlInput)) {
      setUrlError('请输入有效的图片URL（支持jpg、png、gif、webp等格式）');
      return;
    }

    setUrlError(null);
    setPreviewUrl(urlInput);
  };

  // 处理URL图片添加
  const handleUrlImageAdd = async () => {
    if (!urlInput.trim() || !validateImageUrl(urlInput)) {
      setUrlError('请输入有效的图片URL');
      return;
    }

    setUrlProcessing(true);
    setUrlError(null);

    try {
      if (imageMode === 'direct') {
        // 直接模式：使用原始链接
        const imageData: SearchResult = {
          url: urlInput,
          title: '手动添加的图片',
          size: '未知尺寸'
        };
        onImageSelect?.(urlInput, imageData);
        setUrlInput('');
        setPreviewUrl(null);
      } else {
        // 下载模式：下载并处理图片
        const response = await fetch(urlInput);
        const blob = await response.blob();
        
        // 验证是否为图片
        if (!blob.type.startsWith('image/')) {
          throw new Error('URL不是有效的图片文件');
        }

        // 转换为File对象并压缩
        const file = new File([blob], 'url-image.jpg', { type: blob.type });
        const compressedDataUrl = await compressImage(file, 1200, 675, 0.9);
        
        // 上传到服务器
        const dataUrlResponse = await fetch(compressedDataUrl);
        const compressedBlob = await dataUrlResponse.blob();
        const compressedFile = new File([compressedBlob], `url-${Date.now()}.jpg`, { type: 'image/jpeg' });
        
        const formData = new FormData();
        formData.append('images', compressedFile);
        
        const uploadResponse = await fetch('/api/upload-images', {
          method: 'POST',
          body: formData
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          if (uploadResult.success && uploadResult.data?.uploadedFiles?.length > 0) {
            const localPath = uploadResult.data.uploadedFiles[0].url;
            const imageData: SearchResult = {
              url: localPath,
              title: '手动添加的图片',
              size: '已优化'
            };
            onImageSelect?.(localPath, imageData);
            setUrlInput('');
            setPreviewUrl(null);
          } else {
            throw new Error('图片上传失败');
          }
        } else {
          throw new Error('图片上传失败');
        }
      }
    } catch (error) {
      console.error('处理URL图片失败:', error);
      setUrlError(error instanceof Error ? error.message : '处理图片失败，请重试');
    } finally {
      setUrlProcessing(false);
    }
  };

  // 图片压缩函数（复制自主组件）
  const compressImage = (file: File, maxWidth: number = 1200, maxHeight: number = 675, quality: number = 0.9): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        
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
        
        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } else {
          reject(new Error('Canvas context 获取失败'));
        }
      };
      
      img.onerror = () => reject(new Error('图片加载失败'));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        🔗 直接添加图片URL
      </label>
      
      <div className="space-y-3">
        {/* URL输入 */}
        <div className="flex gap-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setUrlError(null);
              setPreviewUrl(null);
            }}
            placeholder="粘贴图片URL链接..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                previewUrlImage();
              }
            }}
          />
          <button
            onClick={previewUrlImage}
            disabled={!urlInput.trim()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            预览
          </button>
        </div>

        {/* 错误提示 */}
        {urlError && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            ❌ {urlError}
          </div>
        )}

        {/* 预览区域 */}
        {previewUrl && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-18 flex-shrink-0">
                <img
                  src={previewUrl}
                  alt="预览图片"
                  className="w-full h-full object-cover rounded"
                  onError={() => {
                    setUrlError('图片加载失败，请检查URL是否正确');
                    setPreviewUrl(null);
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">
                  📷 图片预览成功
                </p>
                <p className="text-xs text-gray-500 mb-3 break-all">
                  {previewUrl}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleUrlImageAdd}
                    disabled={urlProcessing}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 text-sm"
                  >
                    {urlProcessing ? '处理中...' : '添加此图片'}
                  </button>
                  <button
                    onClick={() => {
                      setPreviewUrl(null);
                      setUrlInput('');
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 处理状态 */}
        {urlProcessing && (
          <div className="text-center py-4 bg-blue-50 rounded-lg">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-blue-600 text-sm">
              {imageMode === 'direct' ? '正在添加图片链接...' : '正在下载和处理图片...'}
            </p>
          </div>
        )}

        {/* 使用提示 */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          💡 <strong>提示：</strong>
          <ul className="mt-1 space-y-1">
            <li>• 支持 jpg、png、gif、webp 等图片格式</li>
            <li>• 推荐使用 Unsplash、Pexels 等免费图片网站</li>
            <li>• {imageMode === 'direct' ? '快速模式：直接使用外部链接' : '本地模式：下载到服务器并优化'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 