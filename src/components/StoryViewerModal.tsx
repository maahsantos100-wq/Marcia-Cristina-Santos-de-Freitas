import React, { useState, useEffect } from 'react';
import { X, Heart, Send, MapPin, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { StoryItem, User } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface StoryViewerModalProps {
  stories: StoryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onLikeStory?: (storyId: string) => void;
  onReplyStory?: (storyId: string, text: string) => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialIndex,
  isOpen,
  onClose,
  currentUser,
  onLikeStory,
  onReplyStory
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [floatingHeart, setFloatingHeart] = useState(false);

  const currentStory = stories[currentIndex] || stories[0];
  const DURATION_MS = 5000;
  const INTERVAL_MS = 50;

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(c => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + (INTERVAL_MS / DURATION_MS) * 100;
      });
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, currentIndex, stories.length, onClose]);

  if (!isOpen || !currentStory) return null;

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      setLiked(false);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      setLiked(false);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (onReplyStory) {
      onReplyStory(currentStory.id, replyText.trim());
    }
    setReplyText('');
    setFloatingHeart(true);
    setTimeout(() => setFloatingHeart(false), 1200);
  };

  const handleLike = () => {
    setLiked(prev => !prev);
    setFloatingHeart(true);
    setTimeout(() => setFloatingHeart(false), 1200);
    if (onLikeStory) {
      onLikeStory(currentStory.id);
    }
  };

  const hashtag = getLocationHashtag(currentStory.cidade, currentStory.uf);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top right close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Nav arrow Left */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Nav arrow Right */}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Story Container (Instagram 9:16 mobile frame) */}
      <div 
        className="relative w-full max-w-sm h-[90vh] max-h-[820px] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10 select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Story Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
          {stories.map((s, idx) => (
            <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-75"
                style={{
                  width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header (Author, Location, Hashtag) */}
        <div className="absolute top-7 left-4 right-4 z-30 flex items-center justify-between text-white drop-shadow-md">
          <div className="flex items-center gap-2.5">
            <img
              src={currentStory.user.avatar}
              alt={currentStory.user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-400"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold">{currentStory.user.handle}</span>
                {currentStory.user.isVerified && <VerifiedBadge size="xs" />}
                <span className="text-[11px] text-white/70">· {currentStory.timestamp}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                <MapPin className="w-3 h-3" />
                <span>{currentStory.location || `${currentStory.cidade}, ${currentStory.uf}`}</span>
                <span className="font-mono font-bold text-amber-300 ml-1">{hashtag}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="p-1 rounded-full text-white/80 hover:text-white"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-full text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Story Media (Image with subtle gradient overlay) */}
        <div className="relative flex-1 w-full h-full bg-stone-950 flex items-center justify-center overflow-hidden">
          <img
            src={currentStory.media}
            alt={currentStory.caption || 'Story'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

          {/* Double tap heart animation */}
          {floatingHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
              <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-2xl" />
            </div>
          )}

          {/* Caption over image */}
          {currentStory.caption && (
            <div className="absolute bottom-20 left-4 right-4 z-20">
              <p className="text-sm font-medium text-white leading-relaxed bg-black/50 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
                {currentStory.caption}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Bar: Quick reply & Heart */}
        <div className="relative z-30 p-3 bg-black/70 backdrop-blur-md flex items-center gap-2.5 border-t border-white/10">
          <form onSubmit={handleSendReply} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder={`Enviar mensagem para ${currentStory.user.name.split(' ')[0]}...`}
              className="w-full px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white placeholder:text-white/60 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {replyText.trim() && (
              <button
                type="submit"
                className="p-2 rounded-full bg-emerald-500 text-stone-950 hover:bg-emerald-400 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          <button
            onClick={handleLike}
            className="p-2 rounded-full text-white hover:text-red-400 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 transition-transform active:scale-125 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};
