import React, { useState, useMemo } from 'react';
import { Search, Heart, MessageCircle, X, MapPin, Send, Bookmark, Share2 } from 'lucide-react';
import { FeedPost, User } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface ExploreSectionProps {
  posts: FeedPost[];
  currentUser: User;
  onToggleLikePost: (postId: string) => void;
  onAddCommentPost: (postId: string, text: string) => void;
  onStartChatWithUser?: (user: User) => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  posts,
  currentUser,
  onToggleLikePost,
  onAddCommentPost,
  onStartChatWithUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const [commentText, setCommentText] = useState('');

  const trendingTags = [
    '#NósNoRio',
    '#NósEmSP',
    '#NósNaBahia',
    '#NósNoAmazonas',
    '#NósNoParaná',
    '#NósNoDF',
    '#Bioeconomia',
    '#InovaçãoSocial',
    '#CulturaBrasileira'
  ];

  // Only posts that have an image
  const visualPosts = useMemo(() => {
    return posts.filter(p => !!p.image && (
      !searchQuery.trim() ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cidade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uf.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocationHashtag(p.cidade, p.uf).toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [posts, searchQuery]);

  const activeModalPost = useMemo(() => {
    if (!selectedPost) return null;
    return posts.find(p => p.id === selectedPost.id) || selectedPost;
  }, [posts, selectedPost]);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeModalPost) return;
    onAddCommentPost(activeModalPost.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search & Trending tags bar */}
      <div className="max-w-2xl mx-auto space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Pesquisar fotos, cidades ou hashtags tipo #NósNoRio..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border-none text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Trending pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pb-1">
          {trendingTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`px-3 py-1.5 rounded-full font-mono font-semibold whitespace-nowrap transition-colors ${
                searchQuery === tag
                  ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Instagram Explore Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        {visualPosts.map((post, idx) => {
          const hashtag = getLocationHashtag(post.cidade, post.uf);
          // Highlight every 7th item as a 2x2 featured item if possible
          const isFeatured = idx % 7 === 0 && idx !== 0;

          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`relative group aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer shadow-sm ${
                isFeatured ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <img
                src={post.image}
                alt={post.content}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Hover overlay with heart and comments (Classic Instagram Explore) */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 text-white p-3">
                <div className="flex items-center gap-6 text-sm font-bold">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-white text-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 fill-white text-white" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs font-semibold block truncate max-w-[150px]">
                    {post.author.handle}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-amber-300">
                    {hashtag}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instagram Desktop Modal (Photo Left, Comments Right) */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 z-50 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="w-full max-w-4xl h-[85vh] max-h-[720px] bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            {/* Left Media Column */}
            <div className="relative md:w-3/5 h-64 md:h-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeModalPost.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Details Column */}
            <div className="md:w-2/5 flex-1 flex flex-col h-full bg-white dark:bg-stone-900">
              {/* Header */}
              <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeModalPost.author.avatar}
                    alt={activeModalPost.author.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span className="flex items-center gap-1">
                        <span>{activeModalPost.author.handle}</span>
                        {activeModalPost.author.isVerified && <VerifiedBadge size="xs" />}
                      </span>
                      <span className="text-[10px] text-stone-400">· {activeModalPost.timestamp}</span>
                    </div>
                    {/* Location hashtag directly below name */}
                    <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {getLocationHashtag(activeModalPost.cidade, activeModalPost.uf)}
                    </div>
                  </div>
                </div>

                {onStartChatWithUser && activeModalPost.author.id !== currentUser.id && (
                  <button
                    onClick={() => onStartChatWithUser(activeModalPost.author)}
                    className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                    title="Enviar mensagem direta"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Comments & Caption Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {/* Author caption */}
                <div className="flex items-start gap-3">
                  <img
                    src={activeModalPost.author.avatar}
                    alt={activeModalPost.author.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <span className="font-bold text-stone-900 dark:text-stone-100 mr-1.5 inline-flex items-center gap-1">
                      <span>{activeModalPost.author.handle}</span>
                      {activeModalPost.author.isVerified && <VerifiedBadge size="xs" />}
                    </span>
                    <span className="text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                      {activeModalPost.content}
                    </span>
                  </div>
                </div>

                {/* Comments list */}
                {activeModalPost.comments.map(c => (
                  <div key={c.id} className="flex items-start gap-3">
                    <img
                      src={c.author.avatar}
                      alt={c.author.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                          <span>{c.author.handle}</span>
                          {c.author.isVerified && <VerifiedBadge size="xs" />}
                        </span>
                        <span className="text-[10px] text-stone-400">{c.timestamp}</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 mt-0.5 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="p-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onToggleLikePost(activeModalPost.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-6 h-6 ${activeModalPost.likedByUser ? 'text-red-500 fill-red-500' : 'text-stone-800 dark:text-stone-200'}`} />
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6 text-stone-800 dark:text-stone-200" />
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <Share2 className="w-6 h-6 text-stone-800 dark:text-stone-200" />
                    </button>
                  </div>

                  <Bookmark className="w-6 h-6 text-stone-800 dark:text-stone-200 cursor-pointer" />
                </div>

                <div className="text-xs font-bold text-stone-900 dark:text-stone-100 font-mono">
                  {activeModalPost.likes.toLocaleString()} curtidas
                </div>
              </div>

              {/* Comment Input */}
              <form onSubmit={handleSendComment} className="p-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Adicione um comentário..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 disabled:opacity-40 px-2"
                >
                  Publicar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
