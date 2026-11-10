import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { StoryItem, User } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { StoryViewerModal } from './StoryViewerModal';
import { CreateStoryModal } from './CreateStoryModal';
import { VerifiedBadge } from './VerifiedBadge';

interface StoriesBarProps {
  stories: StoryItem[];
  currentUser: User;
  onAddStory: (story: Omit<StoryItem, 'id' | 'timestamp'>) => void;
  onLikeStory?: (storyId: string) => void;
  onReplyStory?: (storyId: string, text: string) => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({
  stories,
  currentUser,
  onAddStory,
  onLikeStory,
  onReplyStory
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3.5 shadow-sm overflow-hidden">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
          {/* Current User: "Seu Story" */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
            <div className="relative">
              <button
                onClick={() => setIsCreateOpen(true)}
                className="relative block w-16 h-16 rounded-full p-0.5 group-hover:scale-105 transition-transform"
                title="Criar novo Story"
              >
                <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-stone-200 dark:ring-stone-700 bg-stone-100">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-stone-900 shadow-md transition-transform group-hover:scale-110"
                title="Adicionar Story"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
            <div className="text-center">
              <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block truncate max-w-[70px]">
                Seu story
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {getLocationHashtag(currentUser.cidade, currentUser.uf)}
              </span>
            </div>
          </div>

          {/* Stories from other Brazilian members */}
          {stories.map((story, idx) => {
            const hashtag = getLocationHashtag(story.cidade, story.uf);
            const isViewed = story.viewed;

            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryIndex(idx)}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group focus:outline-none"
                title={`Ver story de ${story.user.name} (${hashtag})`}
              >
                {/* Instagram Gradient Ring */}
                <div className={`w-16 h-16 rounded-full p-[2.5px] transition-transform group-hover:scale-105 ${
                  isViewed 
                    ? 'ring-2 ring-stone-300 dark:ring-stone-700' 
                    : 'bg-gradient-to-tr from-amber-500 via-emerald-500 to-yellow-400'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden p-0.5 bg-white dark:bg-stone-900">
                    <img
                      src={story.user.avatar}
                      alt={story.user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200 truncate max-w-[75px] inline-flex items-center justify-center gap-0.5">
                    <span className="truncate">{story.user.handle.replace('@', '')}</span>
                    {story.user.isVerified && <VerifiedBadge size="xs" />}
                  </span>
                  {/* Location hashtag directly below */}
                  <span className="text-[9px] font-mono font-bold text-emerald-700 dark:text-emerald-400 block truncate max-w-[70px]">
                    {hashtag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Viewer Modal */}
      {activeStoryIndex !== null && (
        <StoryViewerModal
          stories={stories}
          initialIndex={activeStoryIndex}
          isOpen={activeStoryIndex !== null}
          onClose={() => setActiveStoryIndex(null)}
          currentUser={currentUser}
          onLikeStory={onLikeStory}
          onReplyStory={onReplyStory}
        />
      )}

      {/* Creator Modal */}
      {isCreateOpen && (
        <CreateStoryModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          currentUser={currentUser}
          onAddStory={onAddStory}
        />
      )}
    </>
  );
};
