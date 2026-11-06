export type BrazilRegion = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul' | 'Nacional';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  regiao: BrazilRegion;
  cidade: string;
  uf: string;
  bio: string;
  headline: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  badges: {
    id: string;
    label: string;
    emoji: string;
  }[];
  connectionsCount: number;
  eventsCount: number;
  followersCount?: number;
  followingCount?: number;
  savedPostIds?: string[];
  isVerified?: boolean;
  ambassadorStatus?: 'none' | 'pending' | 'approved';
  ambassadorTitle?: string;
  ambassadorApplication?: {
    fullName: string;
    category: string;
    motivation: string;
    communityImpact: string;
    portfolioUrl?: string;
    status: 'pending' | 'approved';
    appliedAt: string;
  };
  joinedDate: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  category: 'Conferência & Inovação' | 'Workshop & Masterclass' | 'Cultura & Festivais' | 'Meetup & Networking' | 'Sustentabilidade & Clima' | 'Tecnologia & Startups';
  format: 'Nacional Online' | 'Presencial';
  date: string;
  time: string;
  formattedDate: string;
  locationName: string;
  regiao: BrazilRegion;
  cidade: string;
  uf: string;
  host: User;
  maxAttendees: number;
  rsvpUserIds: string[];
  image: string;
  tags: string[];
  isFree: boolean;
  ticketInfo?: string;
  comments: {
    id: string;
    author: User;
    text: string;
    timestamp: string;
  }[];
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  type: 'ensinar' | 'aprender'; // 'ensinar' = Oferece conhecimento / mentoria; 'aprender' = Busca conhecimento / mentoria
  category: 'Tecnologia & Programação' | 'Negócios & Startups' | 'Design & Produto' | 'Marketing & Mídia' | 'Música & Áudio' | 'Sustentabilidade & ESG' | 'Idiomas & Comunicação' | 'Gastronomia & Cultura';
  format: 'Online (Todo o Brasil)' | 'Mentoria 1-a-1' | 'Workshop Prático' | 'Presencial';
  author: User;
  exchangeInterest: string; // O que busca em troca ou formato de colaboração
  tags: string[];
  createdAt: string;
  requestsCount: number;
  likesCount: number;
  likedByUser?: boolean;
}

export interface FeedPost {
  id: string;
  author: User;
  content: string;
  regiao: BrazilRegion;
  cidade: string;
  uf: string;
  category: 'Inovação & Ideias' | 'Oportunidades & Conexões' | 'Projetos Colaborativos' | 'Cultura & Brasilidade' | 'Tendências & Debates';
  image?: string;
  likes: number;
  likedByUser?: boolean;
  savedByUser?: boolean;
  filterName?: string;
  locationName?: string;
  comments: {
    id: string;
    author: User;
    text: string;
    timestamp: string;
  }[];
  timestamp: string;
}

export interface StoryItem {
  id: string;
  user: User;
  media: string;
  caption?: string;
  location?: string;
  cidade: string;
  uf: string;
  timestamp: string;
  viewed?: boolean;
  likesCount?: number;
}

export interface ReelItem {
  id: string;
  author: User;
  media: string;
  caption: string;
  audioTrack: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  likedByUser?: boolean;
  savedByUser?: boolean;
  location: string;
  cidade: string;
  uf: string;
}

export interface NationalHub {
  id: string;
  title: string;
  description: string;
  category: string;
  membersCount: number;
  topicsCount: number;
  coverImage: string;
  isMember?: boolean;
}

export interface MentorshipProposal {
  id: string;
  fromUser: User;
  toUser: User;
  knowledgeItem: KnowledgeItem;
  proposalMessage: string;
  offeredSkill: string;
  proposedFormat: string;
  status: 'pendente' | 'aceita' | 'concluida';
  createdAt: string;
}

export interface DirectMessageItem {
  id: string;
  senderId: string;
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  withUser: User;
  lastMessage: string;
  lastTime: string;
  unread: boolean;
  messages: DirectMessageItem[];
}

export interface ProjectMaterialItem {
  id: string;
  item: string;
  fulfilled: boolean;
  contributorName?: string;
  contributorAvatar?: string;
}

export interface CollaborativeProject {
  id: string;
  title: string;
  description: string;
  goal: string;
  cidade: string;
  uf: string;
  regiao: BrazilRegion;
  category: 'Meio Ambiente & Clima' | 'Educação & Tecnologia' | 'Combate à Fome & Solidariedade' | 'Cultura & Revitalização Urbana' | 'Saúde & Bem-Estar';
  leader: User;
  targetVolunteers: number;
  members: User[];
  materialsNeeded: ProjectMaterialItem[];
  status: 'Em Formação' | 'Em Andamento' | 'Concluído';
  meetingDate: string;
  meetingLocation: string;
  image: string;
  updates: {
    id: string;
    author: User;
    text: string;
    timestamp: string;
  }[];
  createdAt: string;
}

