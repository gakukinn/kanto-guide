/**
 * 评论数据管理工具
 * 用于管理花火大会的用户评论数据
 */

export interface Comment {
  id: string;
  eventId: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  avatar: string;
  email?: string;
  replies?: Comment[];
  isVerified?: boolean;
}

export class CommentsDataManager {
  private storageKey = 'hanabi-comments';

  // 获取指定活动的评论
  getComments(eventId: string): Comment[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return [];
    
    try {
      const allComments = JSON.parse(stored);
      return allComments.filter((comment: Comment) => comment.eventId === eventId);
    } catch {
      return [];
    }
  }

  // 添加新评论
  addComment(comment: Omit<Comment, 'id' | 'date' | 'likes'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-CN'),
      likes: 0
    };

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      const allComments = stored ? JSON.parse(stored) : [];
      allComments.push(newComment);
      localStorage.setItem(this.storageKey, JSON.stringify(allComments));
    }

    return newComment;
  }

  // 点赞评论
  likeComment(commentId: string): void {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return;
    
    try {
      const allComments = JSON.parse(stored);
      const comment = allComments.find((c: Comment) => c.id === commentId);
      if (comment) {
        comment.likes += 1;
        localStorage.setItem(this.storageKey, JSON.stringify(allComments));
      }
    } catch {
      // 忽略错误
    }
  }

  // 获取评论统计
  getCommentsStats(eventId: string): { total: number; totalLikes: number } {
    const comments = this.getComments(eventId);
    return {
      total: comments.length,
      totalLikes: comments.reduce((sum, comment) => sum + comment.likes, 0)
    };
  }
}

export const commentsManager = new CommentsDataManager();