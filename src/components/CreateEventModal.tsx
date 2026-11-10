import React, { useState } from 'react';
import { X, Calendar, PlusCircle, MapPin, Video } from 'lucide-react';
import { CommunityEvent, User, BrazilRegion } from '../types';
import { BRAZIL_STATES } from '../data/seedData';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onCreateEvent: (eventData: Omit<CommunityEvent, 'id' | 'rsvpUserIds' | 'comments'>) => void;
}

const EVENT_CATEGORIES: CommunityEvent['category'][] = [
  'Conferência & Inovação',
  'Workshop & Masterclass',
  'Cultura & Festivais',
  'Meetup & Networking',
  'Sustentabilidade & Clima',
  'Tecnologia & Startups'
];

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreateEvent
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CommunityEvent['category']>('Conferência & Inovação');
  const [format, setFormat] = useState<CommunityEvent['format']>('Nacional Online');
  const [date, setDate] = useState('2026-11-28');
  const [time, setTime] = useState('19:00 às 21:00 (Brasília)');
  const [locationName, setLocationName] = useState('Sala Virtual Nós BR');
  const [selectedUf, setSelectedUf] = useState(currentUser.uf);
  const [cidade, setCidade] = useState(currentUser.cidade);
  const [maxAttendees, setMaxAttendees] = useState(200);
  const [tagsInput, setTagsInput] = useState('');
  const [imageChoice, setImageChoice] = useState('/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const dateObj = new Date(date + 'T12:00:00');
    const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const formattedDate = `${dayNames[dateObj.getDay()]}, ${dateObj.getDate()} de ${monthNames[dateObj.getMonth()]}`;

    const stateObj = BRAZIL_STATES.find(s => s.uf === selectedUf);
    const regiao = format === 'Nacional Online' ? 'Nacional' : (stateObj?.regiao as BrazilRegion || 'Sudeste');

    onCreateEvent({
      title: title.trim(),
      description: description.trim(),
      category,
      format,
      date,
      time,
      formattedDate,
      locationName: locationName.trim() || (format === 'Nacional Online' ? 'Transmissão Online Nós BR' : cidade),
      regiao,
      cidade: format === 'Nacional Online' ? 'Todo o Brasil' : cidade.trim(),
      uf: format === 'Nacional Online' ? 'BR' : selectedUf,
      host: currentUser,
      maxAttendees: Number(maxAttendees) || 200,
      image: imageChoice,
      tags: tags.length ? tags : ['Evento Nós BR', category],
      isFree: true,
      ticketInfo: 'Inscrição gratuita para a rede Nós BR'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
              Criar Evento Nacional ou Regional
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Título do Evento:
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Fórum Nacional de Inteligência Artificial & Sustentabilidade"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Formato do Evento:
              </label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as CommunityEvent['format'])}
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              >
                <option value="Nacional Online">Nacional Online (Todo o Brasil)</option>
                <option value="Presencial">Presencial nos Estados</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Categoria:
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as CommunityEvent['category'])}
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              >
                {EVENT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Data:
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Horário:
              </label>
              <input
                type="text"
                required
                placeholder="Ex: 19:00 às 21:00 (Brasília)"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          {format === 'Presencial' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Estado (UF):
                </label>
                <select
                  value={selectedUf}
                  onChange={e => setSelectedUf(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                >
                  {BRAZIL_STATES.map(s => (
                    <option key={s.uf} value={s.uf}>
                      {s.nome} ({s.uf})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Cidade:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Curitiba, Salvador, Manaus..."
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Local / Plataforma de Transmissão:
            </label>
            <input
              type="text"
              required
              placeholder={format === 'Nacional Online' ? 'Ex: Transmissão no YouTube & Sala Virtual Nós BR' : 'Ex: Auditório Museu do Amanhã, Teatro Amazonas...'}
              value={locationName}
              onChange={e => setLocationName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Descrição do Evento & Programação:
            </label>
            <textarea
              required
              rows={3}
              placeholder="Descreva a pauta, palestrantes, tópicos abordados e como participar..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Capacidade máxima de participantes:
            </label>
            <input
              type="number"
              min="10"
              max="10000"
              value={maxAttendees}
              onChange={e => setMaxAttendees(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm"
            >
              Publicar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
