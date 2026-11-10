import React, { useState } from 'react';
import { X, Camera, MapPin, Sparkles, Image as ImageIcon } from 'lucide-react';
import { User, StoryItem } from '../types';
import { getLocationHashtag } from '../utils/hashtag';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onAddStory: (story: Omit<StoryItem, 'id' | 'timestamp'>) => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddStory
}) => {
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=800&q=80');
  const [location, setLocation] = useState(`${currentUser.cidade}, ${currentUser.uf}`);

  const presets = [
    { label: 'Rio & Praia', url: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Cultura & Música', url: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg' },
    { label: 'Amazônia & Floresta', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
    { label: 'São Paulo & Urbano', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
    { label: 'Horta & Agroecologia', url: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStory({
      user: currentUser,
      media: selectedImage,
      caption: caption.trim() || undefined,
      location: location.trim(),
      cidade: currentUser.cidade,
      uf: currentUser.uf,
      viewed: false,
      likesCount: 0
    });
    onClose();
  };

  const hashtag = getLocationHashtag(currentUser.cidade, currentUser.uf);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-sm">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span>Adicionar ao seu Story</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Preview */}
          <div className="relative aspect-[9/16] max-h-72 w-full rounded-2xl overflow-hidden bg-stone-950 flex items-center justify-center mx-auto shadow-inner">
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
            
            <div className="absolute top-3 left-3 flex items-center gap-2 text-white">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-400" />
              <div>
                <span className="text-xs font-bold block">{currentUser.handle}</span>
                <span className="text-[10px] text-emerald-300 font-mono">{hashtag}</span>
              </div>
            </div>

            {caption && (
              <div className="absolute bottom-4 left-3 right-3 text-xs text-white bg-black/60 backdrop-blur-sm p-2 rounded-xl">
                {caption}
              </div>
            )}
          </div>

          {/* Select preset image */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Escolher foto para o Story
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {presets.map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setSelectedImage(p.url)}
                  className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all ${
                    selectedImage === p.url ? 'border-emerald-600 ring-2 ring-emerald-500/40' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Legenda do Story
            </label>
            <input
              type="text"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Escreva algo sobre o seu dia..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Localização
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-amber-500 text-white shadow-md hover:opacity-95"
            >
              Compartilhar no Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
