/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CURRENT_USER, 
  BRAZIL_USERS,
  INITIAL_EVENTS, 
  INITIAL_KNOWLEDGE_ITEMS, 
  INITIAL_FEED_POSTS, 
  INITIAL_HUBS,
  INITIAL_CONVERSATIONS, 
  INITIAL_PROPOSALS,
  INITIAL_COLLABORATIVE_PROJECTS,
  INITIAL_STORIES,
  INITIAL_REELS
} from './data/seedData';
import { 
  User, 
  CommunityEvent, 
  KnowledgeItem, 
  FeedPost, 
  NationalHub,
  Conversation, 
  MentorshipProposal,
  CollaborativeProject,
  StoryItem,
  ReelItem,
  BrazilRegion 
} from './types';
import { Navbar } from './components/Navbar';
import { RegionSelectorModal } from './components/RegionSelectorModal';
import { FeedBrasilSection } from './components/FeedBrasilSection';
import { ExploreSection } from './components/ExploreSection';
import { ReelsSection } from './components/ReelsSection';
import { EventsSection } from './components/EventsSection';
import { KnowledgeExchangeSection } from './components/KnowledgeExchangeSection';
import { NationalCommunitiesSection } from './components/NationalCommunitiesSection';
import { CollaborativeProjectsSection } from './components/CollaborativeProjectsSection';
import { MySwapsAndChatSection } from './components/MySwapsAndChatSection';
import { ProfileSection } from './components/ProfileSection';
import { CreateActionModal } from './components/CreateActionModal';
import { CreateEventModal } from './components/CreateEventModal';
import { CreatePostModal } from './components/CreatePostModal';
import { AmbassadorVerificationModal } from './components/AmbassadorVerificationModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { NosBrLogo } from './components/NosBrLogo';
import { CheckCircle2, Globe2, Eye } from 'lucide-react';
import { getLocationHashtag } from './utils/hashtag';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('nosbr_dark') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nosbr_dark', String(darkMode));
  }, [darkMode]);

  // Accessibility state
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('nosbr_high_contrast') === 'true';
  });

  const [fontScale, setFontScale] = useState<number>(() => {
    const saved = localStorage.getItem('nosbr_font_scale');
    return saved ? parseInt(saved, 10) : 100;
  });

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);

  // Sync high contrast mode to html element & localStorage
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('nosbr_high_contrast', String(highContrast));
  }, [highContrast]);

  // Sync font size scale to root document style & localStorage
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
    localStorage.setItem('nosbr_font_scale', String(fontScale));
  }, [fontScale]);

  // Main navigation tab
  const [activeTab, setActiveTab] = useState<'feed' | 'explorar' | 'reels' | 'eventos' | 'conhecimento' | 'comunidades' | 'projetos' | 'conexoes' | 'perfil'>('feed');

  // Active Region Filter ('Todas' or macro-region: 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul')
  const [activeRegion, setActiveRegion] = useState<BrazilRegion | 'Todas'>(() => {
    const saved = localStorage.getItem('nosbr_region');
    return (saved as BrazilRegion | 'Todas') || 'Todas';
  });

  useEffect(() => {
    localStorage.setItem('nosbr_region', activeRegion);
  }, [activeRegion]);

  // Entities state with persistence
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('nosbr_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem('nosbr_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(() => {
    const saved = localStorage.getItem('nosbr_knowledge_v2');
    return saved ? JSON.parse(saved) : INITIAL_KNOWLEDGE_ITEMS;
  });

  const [posts, setPosts] = useState<FeedPost[]>(() => {
    const saved = localStorage.getItem('nosbr_feed_posts');
    return saved ? JSON.parse(saved) : INITIAL_FEED_POSTS;
  });

  const [stories, setStories] = useState<StoryItem[]>(() => {
    const saved = localStorage.getItem('nosbr_stories_v1');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const [reels, setReels] = useState<ReelItem[]>(() => {
    const saved = localStorage.getItem('nosbr_reels_v1');
    return saved ? JSON.parse(saved) : INITIAL_REELS;
  });

  const [hubs, setHubs] = useState<NationalHub[]>(() => {
    const saved = localStorage.getItem('nosbr_hubs');
    return saved ? JSON.parse(saved) : INITIAL_HUBS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('nosbr_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [proposals, setProposals] = useState<MentorshipProposal[]>(() => {
    const saved = localStorage.getItem('nosbr_proposals_v2');
    return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
  });

  const [projects, setProjects] = useState<CollaborativeProject[]>(() => {
    const saved = localStorage.getItem('nosbr_projects_v1');
    return saved ? JSON.parse(saved) : INITIAL_COLLABORATIVE_PROJECTS;
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('nosbr_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nosbr_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('nosbr_knowledge_v2', JSON.stringify(knowledgeItems));
  }, [knowledgeItems]);

  useEffect(() => {
    localStorage.setItem('nosbr_feed_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('nosbr_hubs', JSON.stringify(hubs));
  }, [hubs]);

  useEffect(() => {
    localStorage.setItem('nosbr_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('nosbr_proposals_v2', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('nosbr_projects_v1', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nosbr_stories_v1', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('nosbr_reels_v1', JSON.stringify(reels));
  }, [reels]);

  // Modals
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isCreateLauncherOpen, setIsCreateLauncherOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);

  // Unread messages count
  const unreadCount = conversations.filter(c => c.unread).length;

  // Handlers: Ambassador Verification Process
  const handleApproveVerification = (applicationData: {
    category: string;
    motivation: string;
    communityImpact: string;
    portfolioUrl?: string;
  }) => {
    setCurrentUser(prev => ({
      ...prev,
      isVerified: true,
      ambassadorStatus: 'approved',
      ambassadorTitle: `Embaixador(a) · ${applicationData.category}`,
      ambassadorApplication: {
        fullName: prev.name,
        category: applicationData.category,
        motivation: applicationData.motivation,
        communityImpact: applicationData.communityImpact,
        status: 'approved',
        appliedAt: 'Hoje',
        portfolioUrl: applicationData.portfolioUrl
      }
    }));
    showToast('Parabéns! Selo azul de Embaixador da Comunidade ativado com sucesso.');
  };

  const handleRevokeVerification = () => {
    setCurrentUser(prev => ({
      ...prev,
      isVerified: false,
      ambassadorStatus: 'none',
      ambassadorTitle: undefined
    }));
    showToast('Status de Embaixador desativado.');
  };

  // Handlers: Accessibility & Global Keyboard Shortcuts
  const handleToggleHighContrast = () => {
    setHighContrast(prev => {
      const next = !prev;
      showToast(next ? 'Modo Alto Contraste: ATIVADO (Alt+C)' : 'Modo Alto Contraste: DESATIVADO (Alt+C)');
      return next;
    });
  };

  const handleIncreaseFontSize = () => {
    setFontScale(prev => {
      const next = Math.min(145, prev + 15);
      showToast(`Tamanho da Fonte: ${next}% (Alt++)`);
      return next;
    });
  };

  const handleDecreaseFontSize = () => {
    setFontScale(prev => {
      const next = Math.max(100, prev - 15);
      showToast(`Tamanho da Fonte: ${next}% (Alt+-)`);
      return next;
    });
  };

  const handleResetFontSize = () => {
    setFontScale(100);
    showToast('Tamanho da Fonte redefinido: 100% (Alt+0)');
  };

  const handleResetAccessibility = () => {
    setHighContrast(false);
    setFontScale(100);
    showToast('Acessibilidade restaurada para os padrões');
  };

  // Global Keyboard Shortcuts Event Listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Check Alt key shortcuts (Alt + C, Alt + +, Alt + -, Alt + 0, Alt + A)
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        // Alt + C : Toggle High Contrast
        if (e.key.toLowerCase() === 'c' || e.code === 'KeyC') {
          e.preventDefault();
          handleToggleHighContrast();
        }
        // Alt + + or Alt + = : Increase Font Size
        else if (e.key === '+' || e.key === '=' || e.code === 'Equal' || e.code === 'NumpadAdd') {
          e.preventDefault();
          handleIncreaseFontSize();
        }
        // Alt + - or Alt + _ : Decrease Font Size
        else if (e.key === '-' || e.key === '_' || e.code === 'Minus' || e.code === 'NumpadSubtract') {
          e.preventDefault();
          handleDecreaseFontSize();
        }
        // Alt + 0 : Reset Font Size to 100%
        else if (e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0') {
          e.preventDefault();
          handleResetFontSize();
        }
        // Alt + A : Open / Close Accessibility Modal
        else if (e.key.toLowerCase() === 'a' || e.code === 'KeyA') {
          e.preventDefault();
          setIsAccessibilityModalOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Handlers: Events
  const handleToggleRsvp = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id !== eventId) return ev;
        const already = ev.rsvpUserIds.includes(currentUser.id);
        const newRsvp = already
          ? ev.rsvpUserIds.filter(id => id !== currentUser.id)
          : [...ev.rsvpUserIds, currentUser.id];

        showToast(
          already
            ? 'Inscrição cancelada'
            : 'Inscrição confirmada com sucesso!'
        );

        return { ...ev, rsvpUserIds: newRsvp };
      })
    );
  };

  const handleAddEventComment = (eventId: string, commentText: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      author: currentUser,
      text: commentText,
      timestamp: 'Agora'
    };

    setEvents(prev =>
      prev.map(ev => {
        if (ev.id !== eventId) return ev;
        return {
          ...ev,
          comments: [...ev.comments, newComment]
        };
      })
    );
    showToast('Comentário publicado no evento!');
  };

  const handleCreateEvent = (
    eventData: Omit<CommunityEvent, 'id' | 'rsvpUserIds' | 'comments'>
  ) => {
    const newEvent: CommunityEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
      rsvpUserIds: [currentUser.id],
      comments: []
    };

    setEvents(prev => [newEvent, ...prev]);
    showToast('Evento criado com sucesso na rede nacional!');
    setActiveTab('eventos');
  };

  // Handlers: Knowledge & Mentorship
  const handleProposeExchange = (proposalData: {
    knowledgeItem: KnowledgeItem;
    offeredSkill: string;
    proposalMessage: string;
    proposedFormat: string;
  }) => {
    const newProp: MentorshipProposal = {
      id: `prop-${Date.now()}`,
      fromUser: currentUser,
      toUser: proposalData.knowledgeItem.author,
      knowledgeItem: proposalData.knowledgeItem,
      proposalMessage: proposalData.proposalMessage,
      offeredSkill: proposalData.offeredSkill,
      proposedFormat: proposalData.proposedFormat,
      status: 'pendente',
      createdAt: 'Agora mesmo'
    };

    setProposals(prev => [newProp, ...prev]);

    // Open/Append to direct conversation
    const targetUserId = proposalData.knowledgeItem.author.id;
    setConversations(prev => {
      const existing = prev.find(c => c.withUser.id === targetUserId);
      const newMsg = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        text: `[Proposta de Mentoria & Conexão]: ${proposalData.proposalMessage} (Ofereço: ${proposalData.offeredSkill})`,
        time: 'Agora'
      };

      if (existing) {
        return prev.map(c => {
          if (c.id !== existing.id) return c;
          return {
            ...c,
            lastMessage: newMsg.text,
            lastTime: 'Agora',
            messages: [...c.messages, newMsg]
          };
        });
      } else {
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          withUser: proposalData.knowledgeItem.author,
          lastMessage: newMsg.text,
          lastTime: 'Agora',
          unread: false,
          messages: [newMsg]
        };
        return [newConv, ...prev];
      }
    });

    showToast('Proposta de mentoria enviada!');
  };

  const handleCreateKnowledge = (
    itemData: Omit<KnowledgeItem, 'id' | 'createdAt' | 'requestsCount' | 'likesCount' | 'likedByUser'>
  ) => {
    const newItem: KnowledgeItem = {
      ...itemData,
      id: `know-${Date.now()}`,
      createdAt: 'Hoje',
      requestsCount: 0,
      likesCount: 0,
      likedByUser: false
    };

    setKnowledgeItems(prev => [newItem, ...prev]);
    showToast('Habilidade publicada com sucesso!');
    setActiveTab('conhecimento');
  };

  const handleToggleLikeKnowledge = (id: string) => {
    setKnowledgeItems(prev =>
      prev.map(k => {
        if (k.id !== id) return k;
        const liked = !k.likedByUser;
        return {
          ...k,
          likedByUser: liked,
          likesCount: liked ? k.likesCount + 1 : Math.max(0, k.likesCount - 1)
        };
      })
    );
  };

  // Handlers: Feed Brasil Posts
  const handleAddPost = (postData: {
    content: string;
    category: FeedPost['category'];
    image?: string;
  }) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      author: currentUser,
      content: postData.content,
      regiao: currentUser.regiao,
      cidade: currentUser.cidade,
      uf: currentUser.uf,
      category: postData.category,
      image: postData.image,
      likes: 1,
      likedByUser: true,
      comments: [],
      timestamp: 'Agora mesmo'
    };

    setPosts(prev => [newPost, ...prev]);
    showToast('Publicação compartilhada no Feed Brasil!');
  };

  const handleToggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const liked = !p.likedByUser;
        return {
          ...p,
          likedByUser: liked,
          likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      })
    );
  };

  const handleAddCommentPost = (postId: string, commentText: string) => {
    const newComment = {
      id: `cp-${Date.now()}`,
      author: currentUser,
      text: commentText,
      timestamp: 'Agora'
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      })
    );
    showToast('Comentário publicado!');
  };

  const handleToggleSavePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const saved = !p.savedByUser;
        showToast(saved ? 'Publicação salva nos favoritos!' : 'Publicação removida dos salvos.');
        return {
          ...p,
          savedByUser: saved
        };
      })
    );
  };

  // Handlers: Instagram Reels
  const handleToggleLikeReel = (reelId: string) => {
    setReels(prev =>
      prev.map(r => {
        if (r.id !== reelId) return r;
        const liked = !r.likedByUser;
        return {
          ...r,
          likedByUser: liked,
          likes: liked ? r.likes + 1 : Math.max(0, r.likes - 1)
        };
      })
    );
  };

  const handleToggleSaveReel = (reelId: string) => {
    setReels(prev =>
      prev.map(r => {
        if (r.id !== reelId) return r;
        const saved = !r.savedByUser;
        showToast(saved ? 'Reel salvo nos favoritos!' : 'Reel removido.');
        return {
          ...r,
          savedByUser: saved
        };
      })
    );
  };

  // Handlers: Instagram Stories
  const handleAddStory = (storyData: Omit<StoryItem, 'id' | 'timestamp'>) => {
    const newStory: StoryItem = {
      ...storyData,
      id: `story-${Date.now()}`,
      timestamp: 'Agora'
    };
    setStories(prev => [newStory, ...prev]);
    showToast('Seu Story foi publicado com sucesso!');
  };

  const handleLikeStory = (storyId: string) => {
    setStories(prev =>
      prev.map(s => {
        if (s.id !== storyId) return s;
        return {
          ...s,
          likesCount: (s.likesCount || 0) + 1
        };
      })
    );
  };

  const handleReplyStory = (storyId: string, replyText: string) => {
    const story = stories.find(s => s.id === storyId);
    if (!story) return;

    // Send direct message
    const targetUser = story.user;
    setConversations(prev => {
      const existing = prev.find(c => c.withUser.id === targetUser.id);
      const newMsg = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        text: `Respondeu ao seu Story: "${replyText}"`,
        time: 'Agora'
      };

      if (existing) {
        return prev.map(c => {
          if (c.withUser.id !== targetUser.id) return c;
          return {
            ...c,
            lastMessage: newMsg.text,
            lastTime: 'Agora',
            messages: [...c.messages, newMsg]
          };
        });
      } else {
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          withUser: targetUser,
          lastMessage: newMsg.text,
          lastTime: 'Agora',
          unread: false,
          messages: [newMsg]
        };
        return [newConv, ...prev];
      }
    });

    showToast(`Resposta enviada para ${targetUser.name} no Direct!`);
  };

  // Handlers: Hubs
  const handleToggleJoinHub = (hubId: string) => {
    setHubs(prev =>
      prev.map(h => {
        if (h.id !== hubId) return h;
        const isNowMember = !h.isMember;
        showToast(isNowMember ? `Você entrou na comunidade ${h.title}` : `Você saiu da comunidade ${h.title}`);
        return {
          ...h,
          isMember: isNowMember,
          membersCount: isNowMember ? h.membersCount + 1 : h.membersCount - 1
        };
      })
    );
  };

  // Handlers: Mentorship & Chat
  const handleUpdateProposalStatus = (id: string, newStatus: 'pendente' | 'aceita' | 'concluida') => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        return { ...p, status: newStatus };
      })
    );
    if (newStatus === 'aceita') {
      showToast('Conexão aceita! Conversa direta iniciada.');
    } else if (newStatus === 'concluida') {
      showToast('Mentoria concluída com sucesso!');
    }
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      time: 'Agora'
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          lastMessage: text,
          lastTime: 'Agora',
          messages: [...c.messages, newMsg]
        };
      })
    );

    // Realistic reply simulation
    setTimeout(() => {
      const neighborReply = {
        id: `reply-${Date.now()}`,
        senderId: 'contact',
        text: 'Excelente! Vamos marcar nossa sessão por vídeo para trocar essas experiências. Abraços!',
        time: 'Agora'
      };

      setConversations(prev =>
        prev.map(c => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            lastMessage: neighborReply.text,
            lastTime: 'Agora',
            messages: [...c.messages, neighborReply]
          };
        })
      );
    }, 2400);
  };

  // Handlers: Profile
  const handleUpdateSkills = (teach: string[], learn: string[]) => {
    setCurrentUser(prev => ({
      ...prev,
      skillsToTeach: teach,
      skillsToLearn: learn
    }));
    showToast('Habilidades atualizadas!');
  };

  const handleUpdateBio = (bio: string, headline: string) => {
    setCurrentUser(prev => ({
      ...prev,
      bio,
      headline
    }));
    showToast('Perfil atualizado com sucesso!');
  };

  // Handlers: Collaborative Projects
  const handleToggleJoinProject = (projectId: string) => {
    setProjects(prev =>
      prev.map(proj => {
        if (proj.id !== projectId) return proj;
        const isMember = proj.members.some(m => m.id === currentUser.id);
        const updatedMembers = isMember
          ? proj.members.filter(m => m.id !== currentUser.id)
          : [...proj.members, currentUser];

        showToast(
          isMember
            ? `Você saiu do grupo "${proj.title}"`
            : `Você agora faz parte do grupo "${proj.title}"!`
        );
        return {
          ...proj,
          members: updatedMembers
        };
      })
    );
  };

  const handleContributeMaterial = (projectId: string, materialId: string) => {
    setProjects(prev =>
      prev.map(proj => {
        if (proj.id !== projectId) return proj;
        const updatedMaterials = proj.materialsNeeded.map(mat => {
          if (mat.id !== materialId) return mat;
          return {
            ...mat,
            fulfilled: true,
            contributorName: currentUser.name,
            contributorAvatar: currentUser.avatar
          };
        });
        return {
          ...proj,
          materialsNeeded: updatedMaterials
        };
      })
    );
    showToast('Muito obrigado! Sua contribuição com o material foi confirmada!');
  };

  const handleCreateProject = (projectData: Omit<CollaborativeProject, 'id' | 'createdAt' | 'members' | 'updates'>) => {
    const newProject: CollaborativeProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: 'Agora',
      members: [currentUser],
      updates: [
        {
          id: `upd-${Date.now()}`,
          author: currentUser,
          text: `Ação social criada! Seja bem-vindo ao grupo de mobilização de ${projectData.cidade}.`,
          timestamp: 'Agora'
        }
      ]
    };

    setProjects(prev => [newProject, ...prev]);

    // Announce in Feed Brasil automatically
    const projectHashtag = getLocationHashtag(projectData.cidade, projectData.uf);
    const announcementPost: FeedPost = {
      id: `post-proj-${Date.now()}`,
      author: currentUser,
      content: `🚀 Nova Ação Social lançada em ${projectData.cidade}: "${projectData.title}"! Meta: ${projectData.targetVolunteers} voluntários para ${projectData.goal}. Quem puder somar ou contribuir com materiais, entre no grupo no Nós BR! ${projectHashtag}`,
      regiao: projectData.regiao,
      cidade: projectData.cidade,
      uf: projectData.uf,
      category: 'Projetos Colaborativos',
      image: projectData.image,
      likes: 1,
      likedByUser: true,
      comments: [],
      timestamp: 'Agora'
    };
    setPosts(prev => [announcementPost, ...prev]);

    showToast(`Ação social "${newProject.title}" criada com sucesso!`);
  };

  const handleAddProjectUpdate = (projectId: string, text: string) => {
    setProjects(prev =>
      prev.map(proj => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          updates: [
            {
              id: `upd-${Date.now()}`,
              author: currentUser,
              text,
              timestamp: 'Agora'
            },
            ...proj.updates
          ]
        };
      })
    );
    showToast('Aviso publicado no mural do projeto!');
  };

  // Launcher action
  const handleSelectLauncherAction = (action: 'event' | 'offer-knowledge' | 'seek-knowledge' | 'feed-post' | 'create-project') => {
    if (action === 'event') {
      setIsCreateEventOpen(true);
    } else if (action === 'offer-knowledge' || action === 'seek-knowledge') {
      setActiveTab('conhecimento');
    } else if (action === 'feed-post') {
      setActiveTab('feed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'create-project') {
      setActiveTab('projetos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // All members across Brazil for city/state search
  const allUsers: User[] = [currentUser, ...Object.values(BRAZIL_USERS)];

  const handleStartChatWithUser = (targetUser: User) => {
    setConversations(prev => {
      const exists = prev.find(c => c.withUser.id === targetUser.id);
      if (exists) return prev;

      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        withUser: targetUser,
        lastMessage: `Conexão iniciada através do Feed Brasil (${targetUser.cidade} - ${targetUser.uf})`,
        lastTime: 'Agora',
        unread: false,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: targetUser.id,
            text: `Olá! Vi que você me encontrou no Nós BR. Prazer em conectar diretamente de ${targetUser.cidade}!`,
            time: 'Agora'
          }
        ]
      };
      return [newConv, ...prev];
    });

    setActiveTab('conexoes');
    showToast(`Conversa iniciada com ${targetUser.name}!`);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors flex flex-col font-sans">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl shadow-xl animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-700" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        activeRegion={activeRegion}
        onOpenRegionModal={() => setIsRegionModalOpen(true)}
        onOpenCreateModal={() => setIsCreatePostModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        unreadCount={unreadCount}
        highContrast={highContrast}
        onToggleHighContrast={handleToggleHighContrast}
        onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'feed' && (
          <FeedBrasilSection
            posts={posts}
            allUsers={allUsers}
            currentUser={currentUser}
            activeRegion={activeRegion}
            stories={stories}
            onAddPost={handleAddPost}
            onToggleLikePost={handleToggleLikePost}
            onToggleSavePost={handleToggleSavePost}
            onAddCommentPost={handleAddCommentPost}
            onAddStory={handleAddStory}
            onLikeStory={handleLikeStory}
            onReplyStory={handleReplyStory}
            onStartChatWithUser={handleStartChatWithUser}
            onOpenCreatePost={() => setIsCreatePostModalOpen(true)}
          />
        )}

        {activeTab === 'explorar' && (
          <ExploreSection
            posts={posts}
            currentUser={currentUser}
            onToggleLikePost={handleToggleLikePost}
            onAddCommentPost={handleAddCommentPost}
            onStartChatWithUser={handleStartChatWithUser}
          />
        )}

        {activeTab === 'reels' && (
          <ReelsSection
            reels={reels}
            currentUser={currentUser}
            onToggleLikeReel={handleToggleLikeReel}
            onToggleSaveReel={handleToggleSaveReel}
            onStartChatWithUser={handleStartChatWithUser}
          />
        )}

        {activeTab === 'eventos' && (
          <EventsSection
            events={events}
            currentUser={currentUser}
            activeRegion={activeRegion}
            onToggleRsvp={handleToggleRsvp}
            onAddComment={handleAddEventComment}
            onCreateEvent={handleCreateEvent}
          />
        )}

        {activeTab === 'conhecimento' && (
          <KnowledgeExchangeSection
            knowledgeItems={knowledgeItems}
            currentUser={currentUser}
            activeRegion={activeRegion}
            onProposeExchange={handleProposeExchange}
            onCreateKnowledge={handleCreateKnowledge}
            onToggleLikeKnowledge={handleToggleLikeKnowledge}
          />
        )}

        {activeTab === 'comunidades' && (
          <NationalCommunitiesSection
            hubs={hubs}
            currentUser={currentUser}
            onToggleJoinHub={handleToggleJoinHub}
            onSelectState={uf => showToast(`Estado ${uf} destacado no mapa de calor`)}
          />
        )}

        {activeTab === 'projetos' && (
          <CollaborativeProjectsSection
            projects={projects}
            currentUser={currentUser}
            activeRegion={activeRegion}
            onToggleJoinProject={handleToggleJoinProject}
            onContributeMaterial={handleContributeMaterial}
            onCreateProject={handleCreateProject}
            onAddProjectUpdate={handleAddProjectUpdate}
            onStartChatWithUser={handleStartChatWithUser}
          />
        )}

        {activeTab === 'conexoes' && (
          <MySwapsAndChatSection
            proposals={proposals}
            conversations={conversations}
            currentUser={currentUser}
            onUpdateProposalStatus={handleUpdateProposalStatus}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'perfil' && (
          <ProfileSection
            currentUser={currentUser}
            events={events}
            posts={posts}
            reels={reels}
            onUpdateBio={handleUpdateBio}
            onSelectPost={() => setActiveTab('feed')}
            onOpenVerificationModal={() => setIsAmbassadorModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-8 px-4 text-xs text-stone-500 dark:text-stone-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NosBrLogo size="sm" variant="horizontal" showSubtitle={false} />
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <p className="text-stone-500">
              Rede social brasileira conectando o país inteiro por meio de eventos e troca de conhecimentos.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsRegionModalOpen(true)}
              className="hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-400"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{activeRegion === 'Todas' ? 'Brasil Inteiro' : `Região ${activeRegion}`}</span>
            </button>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              {getLocationHashtag(currentUser.cidade, currentUser.uf)}
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RegionSelectorModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        activeRegion={activeRegion}
        onSelectRegion={setActiveRegion}
      />

      <CreateActionModal
        isOpen={isCreateLauncherOpen}
        onClose={() => setIsCreateLauncherOpen(false)}
        onSelectAction={handleSelectLauncherAction}
      />

      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        currentUser={currentUser}
        onCreateEvent={handleCreateEvent}
      />

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        currentUser={currentUser}
        onAddPost={handleAddPost}
      />

      <AmbassadorVerificationModal
        isOpen={isAmbassadorModalOpen}
        onClose={() => setIsAmbassadorModalOpen(false)}
        currentUser={currentUser}
        onApproveVerification={handleApproveVerification}
        onRevokeVerification={handleRevokeVerification}
      />

      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        highContrast={highContrast}
        onToggleHighContrast={handleToggleHighContrast}
        fontScale={fontScale}
        onChangeFontScale={(scale) => {
          setFontScale(scale);
          showToast(`Tamanho da fonte ajustado para ${scale}%`);
        }}
        onResetAccessibility={handleResetAccessibility}
      />

      {/* Floating Accessible Quick Indicator & Shortcuts Bar */}
      <aside 
        aria-label="Atalhos Rápidos de Acessibilidade"
        className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 p-1.5 px-3 bg-stone-900/95 dark:bg-stone-800/95 text-white rounded-full text-xs shadow-xl border border-white/20 backdrop-blur-md"
      >
        <button
          onClick={() => setIsAccessibilityModalOpen(true)}
          className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors font-medium text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full py-0.5 px-1"
          title="Abrir painel de acessibilidade (Atalho: Alt+A)"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Acessibilidade</span>
          <kbd className="text-[10px] text-stone-300 font-mono bg-white/10 px-1 py-0.2 rounded font-bold">Alt+A</kbd>
        </button>

        <span className="text-stone-500" aria-hidden="true">|</span>

        <button
          onClick={handleToggleHighContrast}
          className={`flex items-center gap-1 transition-colors text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full py-0.5 px-1 ${
            highContrast ? 'text-amber-300' : 'text-stone-300 hover:text-white'
          }`}
          title="Alternar Modo Alto Contraste (Atalho: Alt+C)"
        >
          <span>{highContrast ? 'Contraste: Alto' : 'Contraste: Normal'}</span>
          <kbd className="text-[10px] text-stone-300 font-mono bg-white/10 px-1 py-0.2 rounded font-bold">Alt+C</kbd>
        </button>

        <span className="text-stone-500" aria-hidden="true">|</span>

        <button
          onClick={handleIncreaseFontSize}
          className="text-stone-300 hover:text-white transition-colors text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full py-0.5 px-1 flex items-center gap-1"
          title="Aumentar Fonte (Atalho: Alt++)"
        >
          <span>Fonte {fontScale}%</span>
          <kbd className="text-[10px] text-stone-300 font-mono bg-white/10 px-1 py-0.2 rounded font-bold">Alt++</kbd>
        </button>
      </aside>
    </div>
  );
}
