import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Music2, 
  MapPin, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Sparkles,
  Share2,
  X
} from 'lucide-react';
import { ReelItem, User } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface ReelsSectionProps {
  reels: ReelItem[];
  currentUser: User;
  onToggleLikeReel: (reelId: string) => void;
  onToggleSaveReel: (reelId: string) => void;
  onStartChatWithUser?: (user: User) => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({
  reels,
  currentUser,
  onToggleLikeReel,
  onToggleSaveReel,
  onStartChatWithUser
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [activeCommentsReelId, setActiveCommentsReelId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [reelComments, setReelComments] = useState<Record<string, Array<{ author: User; text: string; time: string }>>>({
    'reel-1': [
      { author: currentUser, text: 'A melhor vista do Rio sem dúvidas!', time: 'Há 10 min' }
    ]
  });

  const currentReel = reels[currentIndex] || reels[0];

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(reels.length - 1);
    }
  };

  const handleDoubleTap = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
    if (!currentReel.likedByUser) {
      onToggleLikeReel(currentReel.id);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeCommentsReelId) return;

    setReelComments(prev => ({
      ...prev,
      [activeCommentsReelId]: [
        ...(prev[activeCommentsReelId] || []),
        { author: currentUser, text: commentText.trim(), time: 'Agora' }
      ]
    }));
    setCommentText('');
  };

  if (!currentReel) return null;

  const hashtag = getLocationHashtag(currentReel.cidade, currentReel.uf);

  return (
    <div className="relative max-w-md mx-auto h-[85vh] max-h-[800px] flex items-center justify-center select-none py-2">
      {/* Up / Down navigation buttons on desktop */}
      <div className="hidden lg:flex flex-col gap-3 absolute -right-16 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md text-stone-700 dark:text-stone-300 hover:scale-110 transition-transform"
          title="Reel anterior"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md text-stone-700 dark:text-stone-300 hover:scale-110 transition-transform"
          title="Próximo Reel"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Main Reel Viewport */}
      <div 
        className="relative w-full h-full rounded-3xl overflow-hidden bg-black shadow-2xl flex flex-col border border-stone-800"
        onDoubleClick={handleDoubleTap}
      >
        {/* Media (high-res image acting as smooth looping reel) */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-stone-950 flex items-center justify-center">
          <img
            src={currentReel.media}
            alt={currentReel.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

          {/* Double Tap Heart Burst */}
          {showHeartBurst && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 animate-ping">
              <Heart className="w-28 h-28 text-red-500 fill-red-500 drop-shadow-2xl" />
            </div>
          )}

          {/* Audio toggle button top-right */}
          <button
            onClick={() => setIsMuted(m => !m)}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Right side interactive actions (Instagram style) */}
        <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-5 text-white">
          {/* Like */}
          <button
            onClick={() => onToggleLikeReel(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2.5 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Heart 
                className={`w-7 h-7 transition-colors ${
                  currentReel.likedByUser ? 'text-red-500 fill-red-500' : 'text-white'
                }`} 
              />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md font-mono">
              {currentReel.likes.toLocaleString()}
            </span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setActiveCommentsReelId(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2.5 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md font-mono">
              {currentReel.commentsCount}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (onStartChatWithUser && currentReel.author.id !== currentUser.id) {
                onStartChatWithUser(currentReel.author);
              }
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2.5 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-white" />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md font-mono">
              {currentReel.sharesCount}
            </span>
          </button>

          {/* Bookmark / Save */}
          <button
            onClick={() => onToggleSaveReel(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2.5 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Bookmark 
                className={`w-6 h-6 transition-colors ${
                  currentReel.savedByUser ? 'text-amber-400 fill-amber-400' : 'text-white'
                }`} 
              />
            </div>
          </button>

          {/* Audio Disc spinning */}
          <div className="w-9 h-9 rounded-full ring-2 ring-white/50 overflow-hidden bg-stone-900 flex items-center justify-center animate-spin [animation-duration:6s]">
            <img src={currentReel.author.avatar} alt="Sound" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Bottom Overlay: Creator Info, State Hashtag, Caption, Audio */}
        <div className="absolute bottom-4 left-4 right-16 z-30 space-y-2 text-white">
          <div className="flex items-center gap-2.5">
            <img
              src={currentReel.author.avatar}
              alt={currentReel.author.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold drop-shadow-md flex items-center gap-1">
                  <span>{currentReel.author.handle}</span>
                  {currentReel.author.isVerified && <VerifiedBadge size="xs" />}
                </span>
                <button className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-colors">
                  Seguir
                </button>
              </div>
              {/* Location hashtag directly below author name */}
              <div className="text-[11px] font-mono font-bold text-amber-300 drop-shadow-md">
                {hashtag}
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-xs text-stone-100 line-clamp-2 leading-relaxed drop-shadow-md">
            {currentReel.caption}
          </p>

          {/* Location badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium drop-shadow-md">
            <MapPin className="w-3.5 h-3.5" />
            <span>{currentReel.location}</span>
          </div>

          {/* Audio track ticker */}
          <div className="flex items-center gap-2 text-[11px] text-stone-200 bg-black/40 backdrop-blur-sm py-1 px-2.5 rounded-full w-fit max-w-full">
            <Music2 className="w-3 h-3 text-amber-300 shrink-0" />
            <span className="truncate">{currentReel.audioTrack}</span>
          </div>
        </div>
      </div>

      {/* Slide-over Comments Sheet Modal */}
      {activeCommentsReelId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md h-[60vh] bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Comentários
              </h3>
              <button 
                onClick={() => setActiveCommentsReelId(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(reelComments[activeCommentsReelId] || []).length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400">
                  Nenhum comentário ainda. Seja o primeiro a comentar!
                </div>
              ) : (
                (reelComments[activeCommentsReelId] || []).map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <img src={c.author.avatar} alt={c.author.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                          <span>{c.author.handle}</span>
                          {c.author.isVerified && <VerifiedBadge size="xs" />}
                        </span>
                        <span className="text-[10px] text-stone-400">{c.time}</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAddComment} className="p-3 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Adicione um comentário..."
                className="flex-1 px-3 py-2 text-xs rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
      )}
    </div>
  );
};
