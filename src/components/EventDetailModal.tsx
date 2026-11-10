import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Share2, 
  MessageCircle, 
  Send,
  Globe2,
  Video
} from 'lucide-react';
import { CommunityEvent, User } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CommunityEvent | null;
  currentUser: User;
  onToggleRsvp: (eventId: string) => void;
  onAddComment: (eventId: string, commentText: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  event,
  currentUser,
  onToggleRsvp,
  onAddComment
}) => {
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !event) return null;

  const isRsvpd = event.rsvpUserIds.includes(currentUser.id);
  const remainingSpots = Math.max(0, event.maxAttendees - event.rsvpUserIds.length);
  const hostHashtag = getLocationHashtag(event.host.cidade, event.host.uf);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(event.id, commentText.trim());
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Cover Image & Header */}
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category kicker */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
              {event.category} · {event.format}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1 leading-snug">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Schedule & Location Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-800 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-medium">
                <Calendar className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span>{event.formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{event.time}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-medium">
                {event.format === 'Nacional Online' ? (
                  <Video className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                ) : (
                  <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                )}
                <span>{event.locationName}</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 pl-6 text-[11px]">
                {event.format === 'Nacional Online' ? 'Acesso virtual para todo o Brasil' : `${event.cidade} - ${event.uf} (Região ${event.regiao})`}
              </p>
            </div>
          </div>

          {/* Action RSVP Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-900/40">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>
                  {event.rsvpUserIds.length} participantes inscritos (vagas: <span className="tabular-nums font-mono">{remainingSpots}</span>)
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">
                {event.ticketInfo || 'Encontro aberto para toda a rede Nós BR'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link copiado!' : 'Compartilhar'}</span>
              </button>

              <button
                onClick={() => onToggleRsvp(event.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                  isRsvpd
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isRsvpd ? 'Inscrição Confirmada ✓' : 'Quero Participar!'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
              Sobre o Encontro
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Host Lockup with State Hashtag right below name */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={event.host.avatar}
                alt={event.host.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  Organizado por:
                </p>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                  <span>{event.host.name}</span>
                  {event.host.isVerified && <VerifiedBadge size="xs" />}
                </p>
                {/* State hashtag directly below username */}
                <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight leading-none mt-0.5">
                  {hostHashtag}
                </p>
              </div>
            </div>
          </div>

          {/* Comments & Questions */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100">
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>Discussão do Evento ({event.comments.length})</span>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {event.comments.length === 0 ? (
                <p className="text-xs text-stone-500 italic">
                  Ainda não há mensagens. Deixe sua pergunta para os organizadores!
                </p>
              ) : (
                event.comments.map(c => (
                  <div key={c.id} className="p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-stone-900 dark:text-stone-100 inline-flex items-center gap-1">
                          <span>{c.author.name}</span>
                          {c.author.isVerified && <VerifiedBadge size="xs" />}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 ml-1.5">
                          {getLocationHashtag(c.author.cidade, c.author.uf)}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400">{c.timestamp}</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Enviar mensagem sobre este evento..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
