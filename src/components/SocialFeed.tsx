import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Camera, Send } from 'lucide-react';
import type { SocialPost } from '../types';

interface SocialFeedProps {
  posts: SocialPost[];
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ posts, onLike, onComment }) => {
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const handleComment = (postId: string) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      onComment(postId, comment);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const getSportColor = (sport?: string) => {
    const colors: { [key: string]: string } = {
      'Football': 'text-blue-600',
      'Volleyball': 'text-green-600',
      'Netball': 'text-purple-600',
      'Tag of War': 'text-orange-600',
      'Aerobics': 'text-pink-600'
    };
    return colors[sport || ''] || 'text-gray-600';
  };

  return (
    <div className="space-y-4">
      {/* Create Post */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts about the games..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Camera size={18} />
              <span className="text-sm">Photo</span>
            </button>
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!newPost.trim()}
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            {/* Post Header */}
            <div className="p-4 pb-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{post.avatar}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{post.author}</div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{post.timestamp}</span>
                      {post.sport && (
                        <>
                          <span>•</span>
                          <span className={`font-medium ${getSportColor(post.sport)}`}>
                            {post.sport}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 leading-relaxed mb-3">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="px-4 pb-3">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => onLike(post.id)}
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      post.isLiked 
                        ? 'text-red-500 scale-105' 
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart 
                      size={18} 
                      className={post.isLiked ? 'fill-current' : ''} 
                    />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                    <Share size={18} />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>

              {/* Comment Input */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Write a comment..."
                    className="flex-1 p-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                  />
                  <button 
                    onClick={() => handleComment(post.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    disabled={!commentInputs[post.id]?.trim()}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-4">
        <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          Load more posts
        </button>
      </div>
    </div>
  );
};