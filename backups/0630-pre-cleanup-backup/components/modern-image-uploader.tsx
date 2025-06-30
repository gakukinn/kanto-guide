'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

interface ModernImageUploaderProps {
  maxFiles?: number;
  maxSize?: number; // in bytes
  pagePath?: string; // 页面路径，如 'tokyo/hanabi/katsushika-noryo'
  onUploadComplete?: (results: any) => void;
}

export default function ModernImageUploader({
  maxFiles = 3,
  maxSize = 5 * 1024 * 1024, // 5MB
  pagePath = 'tokyo/hanabi/katsushika-noryo',
  onUploadComplete,
}: ModernImageUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [uploadResult, setUploadResult] = useState<any>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(7),
      }));

      setFiles(prev => {
        const updated = [...prev, ...newFiles].slice(0, maxFiles);
        return updated;
      });
    },
    [maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize,
    maxFiles,
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      // 清理 URL
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();

      // 添加所有文件
      files.forEach(uploadedFile => {
        formData.append('files', uploadedFile.file);
      });

      // 添加页面路径
      formData.append('pagePath', pagePath);

      // 模拟上传进度
      files.forEach(uploadedFile => {
        setUploadProgress(prev => ({ ...prev, [uploadedFile.id]: 0 }));
      });

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(id => {
            if (updated[id] < 90) {
              updated[id] = Math.min(updated[id] + Math.random() * 20, 90);
            }
          });
          return updated;
        });
      }, 500);

      // 发送到API
      const response = await fetch('/api/upload-images/', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '上传失败');
      }

      const result = await response.json();

      // 完成上传进度
      setUploadProgress(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(id => {
          updated[id] = 100;
        });
        return updated;
      });

      setUploadResult(result);
      onUploadComplete?.(result);

      // 3秒后清空文件
      setTimeout(() => {
        files.forEach(f => URL.revokeObjectURL(f.preview));
        setFiles([]);
        setUploadProgress({});
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadResult({
        success: false,
        error: error instanceof Error ? error.message : '上传失败，请重试',
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        📸 页面图片更新器
      </h2>

      <div className="mb-4 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>当前页面:</strong> {pagePath}
        </p>
        <p className="text-sm text-blue-600">
          选择最多 {maxFiles} 张图片，将自动替换页面现有图片
        </p>
      </div>

      {/* 拖拽上传区域 */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 ease-in-out ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${files.length >= maxFiles ? 'cursor-not-allowed opacity-50' : ''} `}
      >
        <input {...getInputProps()} disabled={files.length >= maxFiles} />

        <div className="flex flex-col items-center">
          <div className="mb-4 h-16 w-16 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {isDragActive ? (
            <p className="font-medium text-blue-600">释放文件到这里...</p>
          ) : (
            <div>
              <p className="mb-2 text-lg font-medium text-gray-700">
                拖拽图片到这里，或点击选择
              </p>
              <p className="text-sm text-gray-500">
                支持 JPG, PNG, WebP 格式，最大 {formatFileSize(maxSize)}
              </p>
              <p className="text-sm text-gray-500">
                最多选择 {maxFiles} 张图片 ({files.length}/{maxFiles})
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 文件预览区域 */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            已选择的图片 ({files.length})
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map(uploadedFile => (
              <div key={uploadedFile.id} className="group relative">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    fill
                    className="object-cover"
                  />

                  {/* 删除按钮 */}
                  {!uploading && (
                    <button
                      onClick={() => removeFile(uploadedFile.id)}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity duration-200 hover:bg-red-600 group-hover:opacity-100"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  {/* 上传进度 */}
                  {uploading &&
                    uploadProgress[uploadedFile.id] !== undefined && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="text-center text-white">
                          <div className="mb-2 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                          <div className="text-sm font-medium">
                            {Math.round(uploadProgress[uploadedFile.id])}%
                          </div>
                        </div>
                      </div>
                    )}

                  {/* 成功标记 */}
                  {uploadProgress[uploadedFile.id] === 100 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-80">
                      <div className="text-center text-white">
                        <svg
                          className="mx-auto h-12 w-12"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="mt-1 text-sm font-medium">完成</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 文件信息 */}
                <div className="mt-2 text-sm">
                  <p className="truncate font-medium text-gray-800">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      {files.length > 0 && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={uploadFiles}
            disabled={uploading}
            className={`rounded-lg px-8 py-3 font-medium transition-all duration-200 ${
              uploading
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            } text-white shadow-md hover:shadow-lg`}
          >
            {uploading ? '处理中...' : `🚀 上传并替换 ${files.length} 张图片`}
          </button>

          {!uploading && (
            <button
              onClick={() => {
                files.forEach(f => URL.revokeObjectURL(f.preview));
                setFiles([]);
                setUploadProgress({});
                setUploadResult(null);
              }}
              className="rounded-lg bg-gray-500 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-gray-600 hover:shadow-lg active:bg-gray-700"
            >
              清空所有
            </button>
          )}
        </div>
      )}

      {/* 上传结果 */}
      {uploadResult && (
        <div
          className={`mt-6 rounded-lg p-4 ${
            uploadResult.success
              ? 'border border-green-200 bg-green-50'
              : 'border border-red-200 bg-red-50'
          }`}
        >
          <div
            className={`font-medium ${
              uploadResult.success ? 'text-green-800' : 'text-red-800'
            }`}
          >
            {uploadResult.success ? '✅ 上传成功！' : '❌ 上传失败'}
          </div>
          <div
            className={`mt-1 text-sm ${
              uploadResult.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {uploadResult.success
              ? `${uploadResult.message} 页面数据已更新，请刷新页面查看效果。`
              : uploadResult.error}
          </div>

          {uploadResult.success && uploadResult.results && (
            <div className="mt-3">
              <p className="text-sm font-medium text-green-700">生成的图片：</p>
              <ul className="mt-1 text-xs text-green-600">
                {uploadResult.results.map((result: any, index: number) => (
                  <li key={index}>
                    {result.originalName} → {result.generatedFiles.length}{' '}
                    个尺寸
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 使用说明 */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 font-medium text-gray-800">📋 使用说明：</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• 支持拖拽或点击选择图片</li>
          <li>• 支持 JPG、PNG、WebP 格式</li>
          <li>• 单个文件最大 {formatFileSize(maxSize)}</li>
          <li>• 最多同时上传 {maxFiles} 张图片</li>
          <li>
            • 自动生成多个尺寸：main(1200x675)、thumb(400x225)、small(600x338) - 统一16:9比例
          </li>
          <li>• 上传完成后会自动更新页面数据，需要刷新页面查看效果</li>
        </ul>
      </div>
    </div>
  );
}
