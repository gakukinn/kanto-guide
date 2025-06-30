'use client';

import { useState } from 'react';

export default function SimpleUploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('请选择文件');
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('pagePath', 'tokyo/hanabi/katsushika-noryo');

      const response = await fetch('/api/upload-images/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setSelectedFiles([]);
      } else {
        const error = await response.json();
        setResult({ error: error.error || '上传失败' });
      }
    } catch (error) {
      setResult({ error: '网络错误' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          📸 简化版图片上传
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              选择图片文件
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-2 font-medium text-gray-700">
                已选择 {selectedFiles.length} 个文件:
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {selectedFiles.map((file, index) => (
                  <li key={index}>• {file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading ? '上传中...' : '上传图片'}
          </button>

          {result && (
            <div
              className={`mt-6 rounded-lg p-4 ${
                result.error
                  ? 'bg-red-50 text-red-800'
                  : 'bg-green-50 text-green-800'
              }`}
            >
              {result.error ? (
                <p>❌ 错误: {result.error}</p>
              ) : (
                <div>
                  <p>✅ {result.message}</p>
                  {result.results && (
                    <ul className="mt-2 space-y-1 text-sm">
                      {result.results.map((r: any, i: number) => (
                        <li key={i}>• {r.originalName}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-lg bg-blue-50 p-4">
          <h3 className="font-medium text-blue-800">测试说明:</h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• 当前固定上传到: 葛饰纳凉花火大会页面</li>
            <li>• 支持 JPG、PNG、WebP 等格式</li>
            <li>• 自动生成多个尺寸版本</li>
            <li>• 上传后刷新页面查看效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
