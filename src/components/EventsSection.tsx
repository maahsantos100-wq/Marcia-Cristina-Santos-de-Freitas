import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Plus, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Video,
  Globe2
} from 'lucide-react';
import { CommunityEvent, User, BrazilRegion } from '../types';
import { EventDetailModal } from './EventDetailModal';
import { CreateEventModal } from './CreateEventModal';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface EventsSectionProps {
  events: CommunityEvent[];
  currentUser: User;
  activeRegion: BrazilRegion | 'Todas';
  onToggleRsvp: (eventId: string) => void;
  onAddComment: (eventId: string, commentText: string) => void;
  onCreateEvent: (eventData: Omit<CommunityEvent, 'id' | 'rsvpUserIds' | 'comments'>) => void;
}

const CATEGORIES = [
  'Todos',
  'Conferência & Inovação',
  'Workshop & Masterclass',
  'Cultura & Festivais',
  'Meetup & Networking',
  'Sustentabilidade & Clima',
  'Tecnologia & Startups'
];

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  currentUser,
  activeRegion,
  onToggleRsvp,
  onAddComment,
  onCreateEvent
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'online' | 'presencial'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<CommunityEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter events
  const filteredEvents = events.filter(ev => {
    if (activeRegion !== 'Todas' && ev.regiao !== activeRegion && ev.regiao !== 'Nacional') {
      return false;
    }
    if (selectedFormat === 'online' && ev.format !== 'Nacional Online') return false;
    if (selectedFormat === 'presencial' && ev.format !== 'Presencial') return false;
    if (selectedCategory !== 'Todos' && ev.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchDesc = ev.description.toLowerCase().includes(q);
      const matchLoc = ev.locationName.toLowerCase().includes(q);
      const matchCity = ev.cidade.toLowerCase().includes(q);
      const matchTags = ev.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchLoc && !matchCity && !matchTags) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Hero Spotlight */}
      <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4 z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>GRANDES EVENTOS & ENCONTROS PELO BRASIL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white text-balance">
                Conferências, festivais e masterclasses conectando os quatro cantos do país
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Descubra encontros nacionais virtuais e grandes eventos presenciais de Norte a Sul. Conecte-se com líderes, palestrantes e participantes de todos os estados.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ Criar Evento Nacional ou Regional</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
            <img
              src="/src/assets/images/nosbr_evento_cultural_1793850619532.jpg"
              alt="Evento cultural brasileiro"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Format Segmented Filter */}
          <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedFormat === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Todos os Formatos ({events.length})
            </button>
            <button
              onClick={() => setSelectedFormat('online')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                selectedFormat === 'online'
                  ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Nacional Online</span>
            </button>
            <button
              onClick={() => setSelectedFormat('presencial')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                selectedFormat === 'presencial'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Presencial nos Estados</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar evento, cidade, estado..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Category buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-stone-400 dark:text-stone-500 font-medium whitespace-nowrap shrink-0">
            Categorias:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Events */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
          <Calendar className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 font-display">
            Nenhum evento agendado com estes filtros
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Amplie a seleção de regiões ou seja o primeiro a propor um evento na sua área!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map(event => {
            const isRsvpd = event.rsvpUserIds.includes(currentUser.id);
            const hostHashtag = getLocationHashtag(event.host.cidade, event.host.uf);

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition-all group"
              >
                <div>
                  {/* Event Thumbnail with Date badge */}
                  <div className="relative h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-semibold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px]">
                        {event.formattedDate}
                      </span>
                      <span className="text-[11px] font-mono tabular-nums opacity-90">
                        {event.time.split('(')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    {/* Clean unboxed metadata (§1.A) */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {event.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{event.format}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => setSelectedEventForDetail(event)}
                      className="text-base font-bold text-stone-900 dark:text-stone-100 font-display leading-snug hover:text-emerald-800 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                    >
                      {event.title}
                    </h3>

                    {/* Description preview */}
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Location detail */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 pt-1">
                      {event.format === 'Nacional Online' ? (
                        <Video className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      )}
                      <span className="truncate">
                        {event.cidade} - {event.uf} ({event.regiao})
                      </span>
                    </div>

                    {/* Host info with State Hashtag right below name */}
                    <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <img
                        src={event.host.avatar}
                        alt={event.host.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate">
                        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate flex items-center gap-1 leading-none">
                          <span>{event.host.name}</span>
                          {event.host.isVerified && <VerifiedBadge size="xs" />}
                        </span>
                        {/* State hashtag directly below host name */}
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight leading-none">
                          {hostHashtag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with RSVP */}
                <div className="px-4 py-3 bg-stone-50/70 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="tabular-nums font-mono font-semibold text-stone-800 dark:text-stone-200">
                      {event.rsvpUserIds.length}
                    </span>
                    <span>inscritos</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedEventForDetail(event)}
                      className="px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors"
                    >
                      Detalhes
                    </button>

                    <button
                      onClick={() => onToggleRsvp(event.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                        isRsvpd
                          ? 'bg-emerald-700 text-white'
                          : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isRsvpd ? 'Inscrito ✓' : 'Participar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <EventDetailModal
        isOpen={!!selectedEventForDetail}
        onClose={() => setSelectedEventForDetail(null)}
        event={selectedEventForDetail}
        currentUser={currentUser}
        onToggleRsvp={onToggleRsvp}
        onAddComment={onAddComment}
      />

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
        onCreateEvent={onCreateEvent}
      />
    </div>
  );
};
