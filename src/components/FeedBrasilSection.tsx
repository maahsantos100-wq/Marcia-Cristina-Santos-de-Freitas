import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MapPin, 
  MoreHorizontal, 
  Smile, 
  Search, 
  X, 
  Users, 
  Share2, 
  Camera, 
  Sparkles,
  Compass,
  Check
} from 'lucide-react';
import { FeedPost, User, BrazilRegion, StoryItem } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { BRAZIL_STATES } from '../data/seedData';
import { StoriesBar } from './StoriesBar';
import { VerifiedBadge } from './VerifiedBadge';

interface FeedBrasilSectionProps {
  posts: FeedPost[];
  allUsers?: User[];
  currentUser: User;
  activeRegion: BrazilRegion | 'Todas';
  stories?: StoryItem[];
  onAddPost: (postData: {
    content: string;
    category: FeedPost['category'];
    image?: string;
  }) => void;
  onToggleLikePost: (postId: string) => void;
  onToggleSavePost?: (postId: string) => void;
  onAddCommentPost: (postId: string, commentText: string) => void;
  onAddStory?: (story: Omit<StoryItem, 'id' | 'timestamp'>) => void;
  onLikeStory?: (storyId: string) => void;
  onReplyStory?: (storyId: string, text: string) => void;
  onStartChatWithUser?: (user: User) => void;
  onOpenCreatePost?: () => void;
}

export const FeedBrasilSection: React.FC<FeedBrasilSectionProps> = ({
  posts,
  allUsers = [],
  currentUser,
  activeRegion,
  stories = [],
  onAddPost,
  onToggleLikePost,
  onToggleSavePost,
  onAddCommentPost,
  onAddStory,
  onLikeStory,
  onReplyStory,
  onStartChatWithUser,
  onOpenCreatePost
}) => {
  // Search & Filter by City or State
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('');
  const [viewMode, setViewMode] = useState<'posts' | 'members'>('posts');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [heartBurstPostId, setHeartBurstPostId] = useState<string | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    // Macro-region filter
    if (activeRegion !== 'Todas' && post.regiao !== activeRegion) {
      return false;
    }

    // Specific UF dropdown
    if (selectedStateFilter && post.uf !== selectedStateFilter) {
      return false;
    }

    // Text search by City, State, or Hashtag
    if (locationSearch.trim()) {
      const q = locationSearch.toLowerCase();
      const matchCity = post.cidade.toLowerCase().includes(q);
      const matchUf = post.uf.toLowerCase().includes(q);
      const hashtag = getLocationHashtag(post.cidade, post.uf).toLowerCase();
      const matchHashtag = hashtag.includes(q);
      const matchAuthor = post.author.name.toLowerCase().includes(q) || post.author.handle.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);

      if (!matchCity && !matchUf && !matchHashtag && !matchAuthor && !matchContent) {
        return false;
      }
    }

    return true;
  });

  // Filter members when in members view mode
  const filteredMembers = allUsers.filter(user => {
    if (activeRegion !== 'Todas' && user.regiao !== activeRegion) {
      return false;
    }
    if (selectedStateFilter && user.uf !== selectedStateFilter) {
      return false;
    }
    if (locationSearch.trim()) {
      const q = locationSearch.toLowerCase();
      const matchCity = user.cidade.toLowerCase().includes(q);
      const matchUf = user.uf.toLowerCase().includes(q);
      const hashtag = getLocationHashtag(user.cidade, user.uf).toLowerCase();
      const matchHashtag = hashtag.includes(q);
      const matchName = user.name.toLowerCase().includes(q) || user.handle.toLowerCase().includes(q);
      if (!matchCity && !matchUf && !matchHashtag && !matchName) {
        return false;
      }
    }
    return true;
  });

  const handleSendComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    onAddCommentPost(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleDoubleTapPost = (postId: string, alreadyLiked?: boolean) => {
    setHeartBurstPostId(postId);
    setTimeout(() => setHeartBurstPostId(null), 900);
    if (!alreadyLiked) {
      onToggleLikePost(postId);
    }
  };

  const handleSharePost = (post: FeedPost) => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  // Suggestions list for the right sidebar
  const suggestedUsers = allUsers.filter(u => u.id !== currentUser.id).slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Filter & City Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-3 sm:p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={locationSearch}
            onChange={e => setLocationSearch(e.target.value)}
            placeholder="Buscar por cidade, estado ou hashtag (ex: #NósNoRio, Manaus)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {locationSearch && (
            <button
              onClick={() => setLocationSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <select
            value={selectedStateFilter}
            onChange={e => setSelectedStateFilter(e.target.value)}
            aria-label="Filtrar por estado brasileiro"
            className="py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Todos os 27 Estados (UF)</option>
            {BRAZIL_STATES.map(s => (
              <option key={s.uf} value={s.uf}>
                {s.uf} - {s.nome}
              </option>
            ))}
          </select>

          {/* Toggle View Mode: Posts vs Members */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode('posts')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                viewMode === 'posts'
                  ? 'bg-white dark:bg-stone-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => setViewMode('members')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                viewMode === 'members'
                  ? 'bg-white dark:bg-stone-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
              }`}
            >
              Membros
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Instagram Web Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center Feed Column (Instagram Card Stack) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stories Bar */}
          {onAddStory && (
            <StoriesBar
              stories={stories}
              currentUser={currentUser}
              onAddStory={onAddStory}
              onLikeStory={onLikeStory}
              onReplyStory={onReplyStory}
            />
          )}

          {/* Quick Create Post Launcher */}
          {onOpenCreatePost && (
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3 sm:p-4 shadow-sm flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <button
                onClick={onOpenCreatePost}
                className="flex-1 text-left px-4 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs text-stone-500 dark:text-stone-400 transition-colors"
              >
                No que você está pensando ou criando hoje? Compartilhe uma foto...
              </button>
              <button
                onClick={onOpenCreatePost}
                className="p-2 rounded-xl text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                title="Publicar foto"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Members Grid if in Members View */}
          {viewMode === 'members' ? (
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Membros do Nós BR ({filteredMembers.length})</span>
                </h3>
                <span className="text-xs text-stone-400">De todos os 27 estados</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredMembers.map(member => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/30 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate flex items-center gap-1">
                          <span className="truncate">{member.name}</span>
                          {member.isVerified && <VerifiedBadge size="xs" />}
                        </div>
                        {/* State hashtag directly below username */}
                        <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                          {getLocationHashtag(member.cidade, member.uf)}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">
                          {member.cidade}, {member.uf}
                        </div>
                      </div>
                    </div>

                    {onStartChatWithUser && member.id !== currentUser.id && (
                      <button
                        onClick={() => onStartChatWithUser(member)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 shrink-0 ml-2"
                      >
                        Mensagem
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Instagram Post Cards Stream */
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="bg-white dark:bg-stone-900 rounded-2xl p-12 text-center border border-dashed border-stone-300 dark:border-stone-800 space-y-3">
                  <Camera className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-600" />
                  <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300">
                    Nenhuma publicação encontrada para este filtro
                  </h3>
                  <p className="text-xs text-stone-500">
                    Seja o primeiro a publicar uma foto ou reflexão com a hashtag do seu estado!
                  </p>
                </div>
              ) : (
                filteredPosts.map(post => {
                  const hashtag = getLocationHashtag(post.cidade, post.uf);
                  const isCommentsOpen = expandedComments[post.id];

                  return (
                    <article
                      key={post.id}
                      className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden"
                    >
                      {/* Card Header (Instagram style) */}
                      <div className="p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Avatar with subtle gradient story ring */}
                          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-emerald-500 to-yellow-400">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-full h-full rounded-full object-cover p-0.5 bg-white dark:bg-stone-900"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                                {post.author.handle.replace('@', '')}
                              </span>
                              {post.author.isVerified && <VerifiedBadge size="xs" />}
                              <span className="text-[10px] text-stone-400">· {post.timestamp}</span>
                            </div>

                            {/* Location Hashtag right below username */}
                            <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                              <span>{hashtag}</span>
                              <span className="text-stone-300 dark:text-stone-600 font-normal">·</span>
                              <span className="font-sans font-normal text-stone-500 dark:text-stone-400 text-[10px]">
                                {post.locationName || `${post.cidade}, ${post.uf}`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSharePost(post)}
                            className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                            title="Copiar link"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Card Media (Square / Portrait 4:5 format with double tap heart) */}
                      {post.image ? (
                        <div 
                          className="relative aspect-square w-full bg-stone-950 flex items-center justify-center overflow-hidden cursor-pointer select-none"
                          onDoubleClick={() => handleDoubleTapPost(post.id, post.likedByUser)}
                        >
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-full h-full object-cover transition-transform hover:scale-[1.01]"
                            loading="lazy"
                          />

                          {/* Double Tap Heart Burst Animation */}
                          {heartBurstPostId === post.id && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                              <Heart className="w-28 h-28 text-red-500 fill-red-500 drop-shadow-2xl" />
                            </div>
                          )}

                          {copiedPostId === post.id && (
                            <div className="absolute top-3 right-3 bg-stone-950/80 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 animate-in fade-in">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Link copiado!</span>
                            </div>
                          )}
                        </div>
                      ) : null}

                      {/* Card Action Bar (Instagram exact order: Heart, Comment, Share, Bookmark) */}
                      <div className="p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => onToggleLikePost(post.id)}
                              className="focus:outline-none transform active:scale-125 transition-transform"
                              title="Curtir"
                            >
                              <Heart 
                                className={`w-6 h-6 transition-colors ${
                                  post.likedByUser 
                                    ? 'text-red-500 fill-red-500' 
                                    : 'text-stone-800 dark:text-stone-200 hover:text-stone-500'
                                }`} 
                              />
                            </button>

                            <button
                              onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                              className="focus:outline-none hover:text-stone-500 transition-colors text-stone-800 dark:text-stone-200"
                              title="Comentar"
                            >
                              <MessageCircle className="w-6 h-6" />
                            </button>

                            <button
                              onClick={() => {
                                if (onStartChatWithUser && post.author.id !== currentUser.id) {
                                  onStartChatWithUser(post.author);
                                } else {
                                  handleSharePost(post);
                                }
                              }}
                              className="focus:outline-none hover:text-stone-500 transition-colors text-stone-800 dark:text-stone-200"
                              title="Compartilhar / Enviar"
                            >
                              <Send className="w-6 h-6" />
                            </button>
                          </div>

                          <button
                            onClick={() => onToggleSavePost && onToggleSavePost(post.id)}
                            className="focus:outline-none text-stone-800 dark:text-stone-200 hover:text-stone-500 transition-colors"
                            title="Salvar publicação"
                          >
                            <Bookmark className={`w-6 h-6 ${post.savedByUser ? 'text-amber-500 fill-amber-500' : ''}`} />
                          </button>
                        </div>

                        {/* Likes counter (Instagram style) */}
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100 font-mono">
                          {post.likes.toLocaleString()} curtidas
                        </div>

                        {/* Caption (Username in bold + text) */}
                        <div className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                          <span className="font-bold mr-1.5 text-stone-950 dark:text-stone-50 inline-flex items-center gap-1">
                            <span>{post.author.handle.replace('@', '')}</span>
                            {post.author.isVerified && <VerifiedBadge size="xs" />}
                          </span>
                          <span className="whitespace-pre-line">{post.content}</span>
                        </div>

                        {/* Comments Preview & Expand */}
                        {post.comments.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            {post.comments.length > 2 && !isCommentsOpen && (
                              <button
                                onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: true }))}
                                className="text-xs text-stone-500 dark:text-stone-400 hover:underline"
                              >
                                Ver todos os {post.comments.length} comentários
                              </button>
                            )}

                            {/* Render last 2 or all comments */}
                            {(isCommentsOpen ? post.comments : post.comments.slice(-2)).map(c => (
                              <div key={c.id} className="text-xs flex items-baseline gap-1.5">
                                <span className="font-bold text-stone-900 dark:text-stone-100 shrink-0 inline-flex items-center gap-1">
                                  <span>{c.author.handle.replace('@', '')}</span>
                                  {c.author.isVerified && <VerifiedBadge size="xs" />}
                                </span>
                                <span className="text-stone-700 dark:text-stone-300 leading-snug">
                                  {c.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Inline Comment Composer */}
                        <form
                          onSubmit={e => handleSendComment(post.id, e)}
                          className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="Adicione um comentário..."
                            className="flex-1 bg-transparent text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
                          />
                          <button
                            type="submit"
                            disabled={!commentInputs[post.id]?.trim()}
                            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 disabled:opacity-30 transition-opacity"
                          >
                            Publicar
                          </button>
                        </form>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar on Desktop (Instagram Desktop Style) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-20">
          {/* Current User Card */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1">
                  <span>{currentUser.handle.replace('@', '')}</span>
                  {currentUser.isVerified && <VerifiedBadge size="xs" />}
                </div>
                {/* State hashtag directly below name */}
                <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {getLocationHashtag(currentUser.cidade, currentUser.uf)}
                </div>
                <div className="text-[11px] text-stone-400">
                  {currentUser.name}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCreatePost}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Publicar
            </button>
          </div>

          {/* Sugestões para você (Instagram Style) */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-600 dark:text-stone-400">
                Sugestões para você
              </span>
              <button 
                onClick={() => setViewMode('members')}
                className="text-[11px] font-semibold text-stone-800 dark:text-stone-200 hover:underline"
              >
                Ver tudo
              </button>
            </div>

            <div className="space-y-3">
              {suggestedUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-emerald-500/20"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                        <span>{user.handle.replace('@', '')}</span>
                        {user.isVerified && <VerifiedBadge size="xs" />}
                      </span>
                      {/* State hashtag below username */}
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 block">
                        {getLocationHashtag(user.cidade, user.uf)}
                      </span>
                    </div>
                  </div>

                  {onStartChatWithUser ? (
                    <button
                      onClick={() => onStartChatWithUser(user)}
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800"
                    >
                      Seguir
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      Seguir
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info & Copyright Footer */}
          <div className="text-[11px] text-stone-400 dark:text-stone-500 space-y-2 px-1">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:underline">Sobre</a> · 
              <a href="#" className="hover:underline">Ajuda</a> · 
              <a href="#" className="hover:underline">Privacidade</a> · 
              <a href="#" className="hover:underline">Termos</a> · 
              <a href="#" className="hover:underline">Localizações</a>
            </div>
            <p className="font-semibold text-stone-500 dark:text-stone-400">
              © 2026 NÓS BR · CONECTANDO O BRASIL DE NORTE A SUL
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
