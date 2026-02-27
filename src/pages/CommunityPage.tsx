import React from 'react';
import { Heart, MessageCircle, Share2, Calendar, MapPin, MoreHorizontal } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    user: "Emma Wilson",
    avatar: "https://picsum.photos/seed/emma/100",
    time: "2 hours ago",
    content: "Just discovered a well-lit path through Central Park that has security cameras every 100m. Felt super safe jogging there this evening! 🏃‍♀️✨",
    image: "https://picsum.photos/seed/park/600/400",
    likes: 124,
    comments: 18,
    tags: ["SafetyTip", "Jogging"]
  },
  {
    id: 2,
    user: "Sophia Chen",
    avatar: "https://picsum.photos/seed/sophia/100",
    time: "5 hours ago",
    content: "Hosting a self-defense workshop this Saturday at the Community Center. Free for all Shafer users! Let's empower each other. 💪",
    image: null,
    likes: 89,
    comments: 32,
    tags: ["Event", "Workshop"]
  }
];

export default function CommunityPage() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-6 py-4 border-b border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-xs text-gray-500">Share stories & stay safe together</p>
        </div>
        <button className="bg-shafer-pink text-white px-4 py-2 rounded-full text-sm font-medium shadow-md shadow-shafer-pink/20 hover:bg-shafer-pink/90 transition-colors">
          + New Post
        </button>
      </div>

      {/* Events Banner */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-shafer-pink to-shafer-red rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <Calendar size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Upcoming Event</span>
            </div>
            <h3 className="text-lg font-bold mb-1">Women's Safety Summit</h3>
            <p className="text-white/80 text-sm mb-3">Join us for a day of learning and empowerment.</p>
            <button className="bg-white text-shafer-red px-4 py-1.5 rounded-full text-xs font-bold">
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 space-y-4">
        {POSTS.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{post.user}</h4>
                  <p className="text-xs text-gray-400">{post.time}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Content */}
            <p className="text-gray-700 text-sm mb-3 leading-relaxed">
              {post.content}
            </p>

            {/* Image Attachment */}
            {post.image && (
              <div className="mb-3 rounded-xl overflow-hidden">
                <img src={post.image} alt="Post attachment" className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-medium text-shafer-pink bg-shafer-pink/5 px-2 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-shafer-pink transition-colors">
                <Heart size={18} />
                <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-xs">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
