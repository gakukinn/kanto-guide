'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  avatar: string;
  replies?: Comment[];
}

interface CommentsSystemProps {
  eventName: string;
  themeColors?: any;
}

export default function CommentsSystem({
  eventName,
  themeColors,
}: CommentsSystemProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: '花火爱好者',
      content: `今年参加了${eventName}，真的很震撼！建议大家下午3点左右就到会场占位，晚上的花火简直太美了。`,
      date: '2024年9月21日',
      likes: 12,
      avatar: 'from-rose-400 to-blue-500',
    },
    {
      id: '2',
      author: '旅行达人',
      content:
        '会场人相对少一些，适合带小朋友的家庭。虽然距离稍远但观赏效果也很不错，而且有座位比较舒适。记得带野餐垫！',
      date: '2024年9月20日',
      likes: 8,
      avatar: 'from-white to-blue-400',
    },
    {
      id: '3',
      author: '摄影师小王',
      content:
        '作为摄影爱好者，推荐最佳观赏位置！距离打上地点最近，拍摄效果最佳。建议带三脚架，特别适合长曝光拍摄。',
      date: '2024年9月19日',
      likes: 15,
      avatar: 'from-blue-400 to-rose-400',
    },
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: '',
  });

  const handleLike = (commentId: string) => {
    setComments(
      comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleSubmit = () => {
    if (!newComment.author.trim() || !newComment.content.trim()) {
      alert('请填写昵称和评论内容');
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      content: newComment.content,
      date: new Date().toLocaleDateString('zh-CN'),
      likes: 0,
      avatar: 'from-purple-400 to-pink-400',
    };

    setComments([comment, ...comments]);
    setNewComment({ author: '', email: '', content: '' });
    alert('评论发表成功！');
  };

  return (
    <section className="rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50 via-white to-blue-50 p-8 shadow-lg backdrop-blur-sm">
      {/* 发表评论区域 */}
      <div className="mb-8">
        <h3 className="mb-6 flex items-center space-x-2 text-xl font-bold text-gray-800">
          <span>✍️</span>
          <span>发表评论</span>
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                昵称
              </label>
              <input
                type="text"
                placeholder="请输入您的昵称"
                value={newComment.author}
                onChange={e =>
                  setNewComment({ ...newComment, author: e.target.value })
                }
                className="w-full rounded-lg border border-rose-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                邮箱（可选）
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={newComment.email}
                onChange={e =>
                  setNewComment({ ...newComment, email: e.target.value })
                }
                className="w-full rounded-lg border border-rose-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              评论内容
            </label>
            <textarea
              rows={4}
              placeholder="分享您的观赏体验、最佳观赏位置、交通建议等..."
              value={newComment.content}
              onChange={e =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              className="w-full resize-none rounded-lg border border-rose-200 bg-white/80 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              💡 提示：分享实用信息帮助其他游客更好地观赏花火
            </p>
            <button
              className="transform rounded-full bg-gradient-to-r from-rose-500 to-blue-500 px-6 py-2 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-rose-600 hover:to-blue-600 hover:shadow-lg"
              onClick={handleSubmit}
            >
              ✨ 发表评论
            </button>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <span>💭</span>
          <span>游客评论 ({comments.length})</span>
        </h3>

        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`bg-gradient-to-br ${index % 3 === 0 ? 'from-rose-50/80 via-white/90 to-blue-50/80' : index % 3 === 1 ? 'from-white/90 via-blue-50/80 to-rose-50/80' : 'from-blue-50/80 via-white/90 to-rose-50/80'} rounded-xl border border-rose-200/60 p-6 shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`h-10 w-10 bg-gradient-to-br ${comment.avatar} flex items-center justify-center rounded-full font-bold text-white`}
              >
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center space-x-3">
                  <h4 className="font-bold text-gray-800">{comment.author}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="mb-3 leading-relaxed text-gray-700">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button
                    className="transition-colors hover:text-rose-600"
                    onClick={() => handleLike(comment.id)}
                  >
                    👍 有用 ({comment.likes})
                  </button>
                  <button
                    className="transition-colors hover:text-blue-600"
                    onClick={() => alert('回复功能开发中，敬请期待！')}
                  >
                    💬 回复
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 加载更多 */}
        <div className="text-center">
          <button
            className="transform rounded-full border border-rose-200/50 bg-gradient-to-r from-rose-100 to-blue-100 px-6 py-2 font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:from-rose-200 hover:to-blue-200 hover:shadow-lg"
            onClick={() => alert('更多评论加载功能开发中，敬请期待！')}
          >
            📄 加载更多评论
          </button>
        </div>
      </div>
    </section>
  );
}
