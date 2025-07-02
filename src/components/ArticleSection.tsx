'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  category: string;
}

interface ArticleSectionProps {
  articles: Article[];
  regionName: string;
  regionColors: {
    bgColor: string;
    borderColor: string;
  };
}

export default function ArticleSection({
  articles,
  regionName,
  regionColors,
}: ArticleSectionProps) {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const toggleExpand = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed text-gray-700">
        {paragraph}
      </p>
    ));
  };

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-white/30 to-white/20 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            📰 {regionName}活动主题
          </h2>
          <p className="text-lg text-gray-600">
            深入了解{regionName}的文化魅力，获取最新活动资讯
          </p>
        </div>

        {/* 文章列表 */}
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className={`overflow-hidden rounded-2xl border-2 ${regionColors.borderColor} bg-gradient-to-r ${regionColors.bgColor} shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              {/* 文章卡片主体 */}
              <div className="flex flex-col md:flex-row">
                {/* 图片区域 - 左侧，16:9比例 */}
                <div className="p-2">
                  <div className="relative h-48 w-full md:h-32 md:w-48 lg:h-40 lg:w-64 overflow-hidden rounded-xl">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* 内容区域 - 右侧 */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* 文章标题 */}
                    <h3 
                      className="mb-2 cursor-pointer text-xl font-bold text-gray-800 transition-colors hover:text-blue-600 md:text-2xl"
                      onClick={() => toggleExpand(article.id)}
                    >
                      {article.title}
                    </h3>

                    {/* 文章摘要 */}
                    <p className="mb-4 text-sm text-gray-600 md:text-base">
                      {article.summary}
                    </p>
                  </div>

                  {/* 底部信息和按钮 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📅 {article.publishDate}</span>
                      <span>🏷️ {article.category}</span>
                    </div>

                    <button
                      onClick={() => toggleExpand(article.id)}
                      className="flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:scale-105"
                    >
                      <span>
                        {expandedArticle === article.id ? '收起' : '阅读'}
                      </span>
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedArticle === article.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* 展开的文章内容 */}
              {expandedArticle === article.id && (
                <div className="border-t border-gray-200 bg-white/50 p-6">
                  <div className="prose max-w-none">
                    {formatContent(article.content)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 