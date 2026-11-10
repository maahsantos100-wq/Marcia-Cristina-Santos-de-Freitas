import React, { useState } from 'react';
import { X, Image as ImageIcon, MapPin, Smile, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { User, FeedPost } from '../types';
import { getLocationHashtag } from '../utils/hashtag';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onAddPost: (postData: {
    content: string;
    category: FeedPost['category'];
    image?: string;
    filterName?: string;
    locationName?: string;
  }) => void;
}

const FILTERS = [
  { id: 'normal', name: 'Normal', css: '' },
  { id: 'bahia-sol', name: 'Bahia Sol', css: 'sepia(25%) saturate(140%) brightness(105%)' },
  { id: 'rio-sunset', name: 'Rio Sunset', css: 'contrast(115%) saturate(150%) hue-rotate(-10deg)' },
  { id: 'floresta', name: 'Floresta', css: 'saturate(130%) contrast(110%) hue-rotate(15deg)' },
  { id: 'clarendon', name: 'Clarendon', css: 'contrast(125%) saturate(120%)' },
  { id: 'vintage', name: 'Nostalgia', css: 'sepia(50%) contrast(95%) brightness(95%)' }
];

const PRESET_IMAGES = [
  { label: 'Cultura & Encontro', url: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg' },
  { label: 'Horta & Agroecologia', url: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg' },
  { label: 'Roda de Conversa', url: '/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg' },
  { label: 'Praia & Rio', url: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=1080&q=80' },
  { label: 'Amazônia Verde', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1080&q=80' },
  { label: 'Inovação SP', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1080&q=80' }
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddPost
}) => {
  const [step, setStep] = useState<'select' | 'filter' | 'caption'>('select');
  const [selectedImage, setSelectedImage] = useState<string>(PRESET_IMAGES[0].url);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [caption, setCaption] = useState('');
  const [locationName, setLocationName] = useState(`${currentUser.cidade}, ${currentUser.uf}`);
  const [category, setCategory] = useState<FeedPost['category']>('Cultura & Brasilidade');

  if (!isOpen) return null;

  const hashtag = getLocationHashtag(currentUser.cidade, currentUser.uf);

  const handleShare = () => {
    // Append hashtag automatically if not present
    let finalCaption = caption.trim();
    if (!finalCaption.includes(hashtag)) {
      finalCaption = finalCaption ? `${finalCaption}\n\n${hashtag}` : hashtag;
    }

    onAddPost({
      content: finalCaption,
      category,
      image: selectedImage,
      filterName: activeFilter.name,
      locationName: locationName.trim()
    });

    onClose();
    // Reset state
    setStep('select');
    setCaption('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          {step !== 'select' ? (
            <button
              onClick={() => setStep(step === 'caption' ? 'filter' : 'select')}
              className="p-1 rounded-full text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}

          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
            {step === 'select' && 'Selecionar foto'}
            {step === 'filter' && 'Filtros'}
            {step === 'caption' && 'Criar nova publicação'}
          </h3>

          {step === 'select' && (
            <button
              onClick={() => setStep('filter')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Avançar
            </button>
          )}

          {step === 'filter' && (
            <button
              onClick={() => setStep('caption')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Avançar
            </button>
          )}

          {step === 'caption' && (
            <button
              onClick={handleShare}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800"
            >
              Compartilhar
            </button>
          )}
        </div>

        {/* Body content based on step */}
        <div className="flex-1 overflow-y-auto">
          {step === 'select' && (
            <div className="p-6 space-y-4">
              <div className="aspect-square max-h-80 w-full mx-auto rounded-2xl overflow-hidden bg-stone-950 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Escolha uma foto para a sua publicação:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_IMAGES.map(img => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setSelectedImage(img.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img.url ? 'border-emerald-600 ring-2 ring-emerald-500/40' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'filter' && (
            <div className="p-6 space-y-4">
              {/* Filter preview */}
              <div className="aspect-square max-h-80 w-full mx-auto rounded-2xl overflow-hidden bg-stone-950 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Filter Preview"
                  className="w-full h-full object-cover transition-all"
                  style={{ filter: activeFilter.css }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Escolha o filtro:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {FILTERS.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFilter(f)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        activeFilter.id === f.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-300'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-1">
                        <img
                          src={selectedImage}
                          alt={f.name}
                          className="w-full h-full object-cover"
                          style={{ filter: f.css }}
                        />
                      </div>
                      <span className="text-[11px] block truncate">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'caption' && (
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 aspect-square rounded-xl overflow-hidden shrink-0 bg-stone-950">
                  <img
                    src={selectedImage}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    style={{ filter: activeFilter.css }}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {currentUser.handle}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {hashtag}
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    placeholder="Escreva uma legenda envolvente..."
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Adicionar Localização
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="text"
                    value={locationName}
                    onChange={e => setLocationName(e.target.value)}
                    placeholder="Ex: Rio de Janeiro, RJ · Ipanema"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Categoria da Publicação
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as FeedPost['category'])}
                  className="w-full p-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Cultura & Brasilidade">Cultura & Brasilidade</option>
                  <option value="Inovação & Ideias">Inovação & Ideias</option>
                  <option value="Projetos Colaborativos">Projetos Colaborativos</option>
                  <option value="Oportunidades & Conexões">Oportunidades & Conexões</option>
                  <option value="Tendências & Debates">Tendências & Debates</option>
                </select>
              </div>

              {/* State Hashtag Notice */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <span>Hashtag do seu estado adicionada:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  {hashtag}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/50">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-3 py-1.5"
          >
            Cancelar
          </button>
          {step === 'caption' && (
            <button
              type="button"
              onClick={handleShare}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20"
            >
              Compartilhar no Feed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
