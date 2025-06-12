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

export default function CommentsSystem({ eventName, themeColors }: CommentsSystemProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: '花火爱好者',
      content: `今年参加了${eventName}，真的很震撼！建议大家下午3点左右就到会场占位，晚上的花火简直太美了。`,
      date: '2024年9月21日',
      likes: 12,
      avatar: 'from-rose-400 to-blue-500'
    },
    {
      id: '2', 
      author: '旅行达人',
      content: '会场人相对少一些，适合带小朋友的家庭。虽然距离稍远但观赏效果也很不错，而且有座位比较舒适。记得带野餐垫！',
      date: '2024年9月20日',
      likes: 8,
      avatar: 'from-white to-blue-400'
    },
    {
      id: '3',
      author: '摄影师小王', 
      content: '作为摄影爱好者，推荐最佳观赏位置！距离打上地点最近，拍摄效果最佳。建议带三脚架，特别适合长曝光拍摄。',
      date: '2024年9月19日',
      likes: 15,
      avatar: 'from-blue-400 to-rose-400'
    }
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
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
      avatar: 'from-purple-400 to-pink-400'
    };

    setComments([comment, ...comments]);
    setNewComment({ author: '', email: '', content: '' });
    alert('评论发表成功！');
  };

  return (
    <section className="bg-gradient-to-br from-rose-50 via-white to-blue-50 backdrop-blur-sm rounded-2xl p-8 border border-rose-200/60 shadow-lg">
      {/* 发表评论区域 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2 mb-6">
          <span>✍️</span>
          <span>发表评论</span>
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">昵称</label>
              <input 
                type="text" 
                placeholder="请输入您的昵称"
                value={newComment.author}
                onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all bg-white/80"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">邮箱（可选）</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                value={newComment.email}
                onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all bg-white/80"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">评论内容</label>
            <textarea 
              rows={4}
              placeholder="分享您的观赏体验、最佳观赏位置、交通建议等..."
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
              className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-none bg-white/80"
            ></textarea>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              💡 提示：分享实用信息帮助其他游客更好地观赏花火
            </p>
            <button 
              className="bg-gradient-to-r from-rose-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:from-rose-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={handleSubmit}
            >
              ✨ 发表评论
            </button>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <span>💭</span>
          <span>游客评论 ({comments.length})</span>
        </h3>

        {comments.map((comment, index) => (
          <div key={comment.id} className={`bg-gradient-to-br ${index % 3 === 0 ? 'from-rose-50/80 via-white/90 to-blue-50/80' : index % 3 === 1 ? 'from-white/90 via-blue-50/80 to-rose-50/80' : 'from-blue-50/80 via-white/90 to-rose-50/80'} backdrop-blur-sm rounded-xl p-6 border border-rose-200/60 shadow-lg`}>
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${comment.avatar} rounded-full flex items-center justify-center text-white font-bold`}>
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-bold text-gray-800">{comment.author}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button 
                    className="hover:text-rose-600 transition-colors"
                    onClick={() => handleLike(comment.id)}
                  >
                    👍 有用 ({comment.likes})
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors"
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
            className="bg-gradient-to-r from-rose-100 to-blue-100 text-gray-700 px-6 py-2 rounded-full font-medium hover:from-rose-200 hover:to-blue-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-rose-200/50"
            onClick={() => alert('更多评论加载功能开发中，敬请期待！')}
          >
            📄 加载更多评论
          </button>
        </div>
      </div>
    </section>
  );
}