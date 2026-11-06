import React, { useState } from 'react';
import { 
  Grid, 
  Film, 
  Bookmark, 
  UserCheck, 
  Settings, 
  Share2, 
  Edit3, 
  MapPin, 
  Plus, 
  Heart, 
  MessageCircle, 
  Check, 
  X,
  Link as LinkIcon,
  ShieldCheck
} from 'lucide-react';
import { User, CommunityEvent, FeedPost, ReelItem } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface ProfileSectionProps {
  currentUser: User;
  events: CommunityEvent[];
  posts?: FeedPost[];
  reels?: ReelItem[];
  onUpdateBio: (bio: string, headline: string) => void;
  onSelectPost?: (post: FeedPost) => void;
  onOpenVerificationModal?: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  currentUser,
  events,
  posts = [],
  reels = [],
  onUpdateBio,
  onSelectPost,
  onOpenVerificationModal
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved' | 'tagged'>('posts');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentUser.bio);
  const [headlineText, setHeadlineText] = useState(currentUser.headline);
  const [copiedLink, setCopiedLink] = useState(false);

  const hashtag = getLocationHashtag(currentUser.cidade, currentUser.uf);

  // User's own posts
  const userPosts = posts.filter(p => p.author.id === currentUser.id);
  // Saved posts
  const savedPosts = posts.filter(p => p.savedByUser);
  // User's reels
  const userReels = reels.filter(r => r.author.id === currentUser.id);

  // Story highlights (Destaques de Stories)
  const highlights = [
    { id: 'hl-1', label: 'Rio 🌊', image: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=300&q=80' },
    { id: 'hl-2', label: 'Projetos 🌿', image: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg' },
    { id: 'hl-3', label: 'Eventos 🎭', image: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg' },
    { id: 'hl-4', label: 'Encontros 🇧🇷', image: '/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg' }
  ];

  const handleSaveBio = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBio(bioText.trim(), headlineText.trim());
    setIsEditingBio(false);
  };

  const handleCopyProfile = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Instagram Profile Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
          {/* Avatar with Instagram Gradient Story Ring */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-emerald-500 to-yellow-400">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover p-1 bg-white dark:bg-stone-900 shadow-md"
              />
            </div>
            <span className="absolute bottom-1 right-2 text-xl" title="Brasil">
              🇧🇷
            </span>
          </div>

          {/* User Details & Stats */}
          <div className="flex-1 space-y-4 text-center sm:text-left">
            {/* Handle & Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {currentUser.handle.replace('@', '')}
                </h2>
                {currentUser.isVerified && <VerifiedBadge size="md" />}
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 transition-colors"
                >
                  Editar perfil
                </button>
                <button
                  onClick={handleCopyProfile}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 transition-colors"
                >
                  {copiedLink ? 'Link copiado!' : 'Compartilhar perfil'}
                </button>

                {onOpenVerificationModal && (
                  <button
                    onClick={onOpenVerificationModal}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                      currentUser.isVerified
                        ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900'
                        : 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-sky-500/20'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{currentUser.isVerified ? 'Embaixador Verificado' : 'Selo de Embaixador'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stats row (Instagram exact: Publicações | Seguidores | Seguindo) */}
            <div className="flex items-center justify-center sm:justify-start gap-8 text-sm">
              <div>
                <strong className="text-stone-900 dark:text-stone-100 font-bold">
                  {userPosts.length + userReels.length + 12}
                </strong>{' '}
                <span className="text-stone-500 text-xs">publicações</span>
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 font-bold">
                  {(currentUser.followersCount || 1420).toLocaleString()}
                </strong>{' '}
                <span className="text-stone-500 text-xs">seguidores</span>
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 font-bold">
                  {(currentUser.followingCount || 680).toLocaleString()}
                </strong>{' '}
                <span className="text-stone-500 text-xs">seguindo</span>
              </div>
            </div>

            {/* Name, Bio, Location Hashtag */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                <span>{currentUser.name}</span>
                {currentUser.isVerified && <VerifiedBadge size="xs" />}
                {currentUser.ambassadorTitle && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    {currentUser.ambassadorTitle}
                  </span>
                )}
              </div>

              {/* State Hashtag right below name */}
              <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                {hashtag} · {currentUser.cidade}, {currentUser.uf}
              </div>

              <p className="text-stone-700 dark:text-stone-300 leading-relaxed max-w-lg">
                {currentUser.bio}
              </p>

              <div className="pt-1 flex items-center justify-center sm:justify-start gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <LinkIcon className="w-3.5 h-3.5" />
                <a href="#" className="hover:underline">nosbr.com.br/{currentUser.handle.replace('@', '')}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Bio Modal Inline */}
        {isEditingBio && (
          <form onSubmit={handleSaveBio} className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">
              Editar Biografia & Título
            </h4>
            <input
              type="text"
              value={headlineText}
              onChange={e => setHeadlineText(e.target.value)}
              placeholder="Título / Cargo..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
            />
            <textarea
              rows={3}
              value={bioText}
              onChange={e => setBioText(e.target.value)}
              placeholder="Biografia..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingBio(false)}
                className="px-3 py-1.5 text-xs text-stone-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold bg-emerald-700 text-white rounded-xl"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        )}

        {/* Story Highlights (Instagram Destaques) */}
        <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
            {highlights.map(hl => (
              <div key={hl.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
                <div className="w-16 h-16 rounded-full p-[2px] ring-2 ring-stone-200 dark:ring-stone-700 group-hover:scale-105 transition-transform">
                  <img
                    src={hl.image}
                    alt={hl.label}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200">
                  {hl.label}
                </span>
              </div>
            ))}

            <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-400 group-hover:text-stone-600 transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-stone-500">
                Novo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs (Instagram style) */}
      <div className="border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-center gap-8 sm:gap-16 text-xs uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 py-3.5 border-t-2 -mt-[2px] transition-colors ${
              activeTab === 'posts'
                ? 'border-emerald-700 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500'
                : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Publicações</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`flex items-center gap-2 py-3.5 border-t-2 -mt-[2px] transition-colors ${
              activeTab === 'reels'
                ? 'border-emerald-700 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500'
                : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 py-3.5 border-t-2 -mt-[2px] transition-colors ${
              activeTab === 'saved'
                ? 'border-emerald-700 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500'
                : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Salvos</span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {userPosts.map(post => (
            <div
              key={post.id}
              onClick={() => onSelectPost && onSelectPost(post)}
              className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 group cursor-pointer shadow-sm"
            >
              <img
                src={post.image || 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=600&q=80'}
                alt="Post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-bold">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reels' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {userReels.map(reel => (
            <div
              key={reel.id}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 group cursor-pointer shadow-md"
            >
              <img
                src={reel.media}
                alt={reel.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-bold drop-shadow-md">
                <Film className="w-4 h-4" />
                <span>{reel.likes}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {savedPosts.length === 0 ? (
            <div className="col-span-3 text-center py-16 space-y-2 text-stone-400">
              <Bookmark className="w-10 h-10 mx-auto" />
              <p className="text-xs font-bold">Nenhuma publicação salva ainda</p>
              <p className="text-[11px]">Salve publicações no feed clicando no ícone de marcador.</p>
            </div>
          ) : (
            savedPosts.map(post => (
              <div
                key={post.id}
                onClick={() => onSelectPost && onSelectPost(post)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 group cursor-pointer shadow-sm"
              >
                <img
                  src={post.image}
                  alt="Saved"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
