import { User, CommunityEvent, KnowledgeItem, FeedPost, NationalHub, MentorshipProposal, Conversation, CollaborativeProject, ProjectMaterialItem, StoryItem, ReelItem } from '../types';

export const CURRENT_USER: User = {
  id: 'user-mariana',
  name: 'Mariana Albuquerque',
  handle: '@mari_albuquerque',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  regiao: 'Sudeste',
  cidade: 'Rio de Janeiro',
  uf: 'RJ',
  bio: 'Especialista em Gestão de Projetos de Impacto e Bioeconomia. Conectando iniciativas de inovação sustentável do Norte ao Sul do país.',
  headline: 'Projetos de Inovação & Sustentabilidade · Rio de Janeiro',
  skillsToTeach: [
    'Gestão Ágil & Estratégia de Projetos Nacionais',
    'Captação de Recursos para Inovação Social & ESG',
    'Comunicação de Impacto & Storytelling'
  ],
  skillsToLearn: [
    'Inteligência Artificial Aplicada a Negócios',
    'Modelagem de Dados e Dashboards com Python',
    'Políticas de Crédito de Carbono na Amazônia'
  ],
  badges: [
    { id: 'badge-creator', label: 'Conectora Brasil', emoji: '🇧🇷' },
    { id: 'badge-mentor', label: 'Mentora Ativa', emoji: '💡' },
    { id: 'badge-innovator', label: 'Líder de Comunidade', emoji: '🚀' }
  ],
  connectionsCount: 342,
  eventsCount: 28,
  followersCount: 1420,
  followingCount: 680,
  savedPostIds: ['feed-1', 'feed-4'],
  isVerified: true,
  ambassadorStatus: 'approved',
  ambassadorTitle: 'Embaixadora da Comunidade Nós BR · Rio de Janeiro',
  joinedDate: 'Janeiro 2025'
};

export const BRAZIL_USERS: Record<string, User> = {
  'user-lucas-manaus': {
    id: 'user-lucas-manaus',
    name: 'Lucas Pantoja',
    handle: '@lucas_amazonia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    regiao: 'Norte',
    cidade: 'Manaus',
    uf: 'AM',
    bio: 'Biólogo e pesquisador de biotecnologia no Polo Industrial de Manaus. Apaixonado por transformar a riqueza da floresta em inovação sustentável.',
    headline: 'Pesquisador em Bioeconomia & Produtos Florestais · Manaus',
    skillsToTeach: [
      'Biotecnologia e Cadeias Sustentáveis da Amazônia',
      'Elaboração de Artigos Científicos e Patentes',
      'Ecossistemas de Inovação na Região Norte'
    ],
    skillsToLearn: [
      'Marketing Digital para Produtos de Origem Florestal',
      'Pitch para Fundos de Venture Capital'
    ],
    badges: [
      { id: 'badge-bio', label: 'Guardião da Amazônia', emoji: '🌳' },
      { id: 'badge-research', label: 'Cientista Brasileiro', emoji: '🔬' }
    ],
    connectionsCount: 512,
    eventsCount: 31,
    isVerified: true,
    ambassadorTitle: 'Embaixador da Comunidade Nós BR · Amazônia',
    joinedDate: 'Outubro 2024'
  },
  'user-dandara-salvador': {
    id: 'user-dandara-salvador',
    name: 'Dandara Oliveira',
    handle: '@dandara_salvador',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    regiao: 'Nordeste',
    cidade: 'Salvador',
    uf: 'BA',
    bio: 'Produtora executiva cultural, curadora de festivais de música e especialista em economia criativa e afroempreendedorismo no Nordeste.',
    headline: 'Curadora Cultural & Gestora de Festivais · Salvador',
    skillsToTeach: [
      'Produção Executiva de Grandes Festivais e Editais',
      'Music Business e Distribuição Independente',
      'Estratégias de Branding Cultural com Identidade Baiana'
    ],
    skillsToLearn: [
      'Direito Autoral e Contratos Digitais no Streaming',
      'Inglês para Negócios Internacionais de Música'
    ],
    badges: [
      { id: 'badge-culture', label: 'Voz da Cultura Nacional', emoji: '🎭' },
      { id: 'badge-network', label: 'Embaixadora Nordeste', emoji: '⚡' }
    ],
    connectionsCount: 890,
    eventsCount: 54,
    isVerified: true,
    ambassadorTitle: 'Embaixadora da Comunidade Nós BR · Bahia',
    joinedDate: 'Agosto 2024'
  },
  'user-thiago-sp': {
    id: 'user-thiago-sp',
    name: 'Thiago Mendes',
    handle: '@thiagotech_br',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    regiao: 'Sudeste',
    cidade: 'São Paulo',
    uf: 'SP',
    bio: 'Engenheiro de Software e fundador de comunidade open-source. Ajudando desenvolvedores de todo o Brasil a ingressarem no mercado tech.',
    headline: 'Tech Lead & Mentor de Carreiras em Tecnologia · SP',
    skillsToTeach: [
      'Arquitetura de Software Moderna e Cloud (AWS/GCP)',
      'Preparação para Entrevistas Técnicas no Brasil e Exterior',
      'Desenvolvimento Web com React, TypeScript & Node'
    ],
    skillsToLearn: [
      'Estratégias de Investimento e Equity em Startups',
      'Produção de Podcasts Técnicos'
    ],
    badges: [
      { id: 'badge-code', label: 'Arquiteto Tech', emoji: '💻' },
      { id: 'badge-mentor', label: 'Top Mentor', emoji: '🌟' }
    ],
    connectionsCount: 1240,
    eventsCount: 47,
    isVerified: true,
    ambassadorTitle: 'Embaixador da Comunidade Nós BR · São Paulo',
    joinedDate: 'Junho 2024'
  },
  'user-camila-brasilia': {
    id: 'user-camila-brasilia',
    name: 'Camila Brandão',
    handle: '@camila_govtech',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    regiao: 'Centro-Oeste',
    cidade: 'Brasília',
    uf: 'DF',
    bio: 'Especialista em Relações Governamentais, Regulação de IA e Inovação Pública. Conectando startups às compras públicas e marcos legais.',
    headline: 'Especialista em Políticas Públicas & GovTech · Brasília',
    skillsToTeach: [
      'Marco Legal das Startups e Compras Públicas no Brasil',
      'Articulação Institucional e RelGov Ético',
      'Regulação de Tecnologia e Proteção de Dados (LGPD)'
    ],
    skillsToLearn: [
      'Metodologias Ágeis no Setor Público',
      'Visualização de Dados com PowerBI'
    ],
    badges: [
      { id: 'badge-gov', label: 'Liderança Pública', emoji: '🏛️' },
      { id: 'badge-law', label: 'Pioneira GovTech', emoji: '⚖️' }
    ],
    connectionsCount: 670,
    eventsCount: 26,
    joinedDate: 'Novembro 2024'
  },
  'user-andre-curitiba': {
    id: 'user-andre-curitiba',
    name: 'André Schimiti',
    handle: '@andre_agritech',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80',
    regiao: 'Sul',
    cidade: 'Curitiba',
    uf: 'PR',
    bio: 'Empreendedor serial no agronegócio sustentável e IoT. Focado em agricultura regenerativa e sensores climáticos de precisão.',
    headline: 'Founder AgroTech & Inovação no Campo · Curitiba',
    skillsToTeach: [
      'Tecnologias de Monitoramento Agrícola e Sensores IoT',
      'Validação de Produtos B2B para o Agronegócio',
      'Cultura de Trabalho Remoto para Equipes Nacionais'
    ],
    skillsToLearn: [
      'UX Research para Usuários do Campo',
      'Modelagem Financeira para Séries A'
    ],
    badges: [
      { id: 'badge-agro', label: 'Inovador Agro', emoji: '🌾' },
      { id: 'badge-founder', label: 'Empreendedor BR', emoji: '📈' }
    ],
    connectionsCount: 780,
    eventsCount: 39,
    joinedDate: 'Setembro 2024'
  }
};

export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'event-1',
    title: 'Summit Nacional Nós BR: O Futuro da Inovação e Cultura Brasileira',
    description: 'O maior encontro anual conectando empreendedores, criadores culturais, cientistas e desenvolvedores de todos os 26 estados e DF. Palestras com líderes de destaque nacional, rodadas de networking interestaduais e painéis sobre inteligência artificial soberana no Brasil.',
    category: 'Conferência & Inovação',
    format: 'Nacional Online',
    date: '2026-11-20',
    time: '09:00 às 18:30 (Horário de Brasília)',
    formattedDate: 'Sexta-feira, 20 de Novembro',
    locationName: 'Auditório Virtual Nós BR (Transmissão em Alta Definição)',
    regiao: 'Nacional',
    cidade: 'Todo o Brasil',
    uf: 'BR',
    host: CURRENT_USER,
    maxAttendees: 5000,
    rsvpUserIds: ['user-mariana', 'user-lucas-manaus', 'user-dandara-salvador', 'user-thiago-sp', 'user-camila-brasilia', 'user-andre-curitiba'],
    image: '/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg',
    tags: ['Inovação Nacional', 'Networking Brasil', 'Inteligência Artificial', 'Economia Criativa'],
    isFree: true,
    ticketInfo: 'Inscrição gratuita para membros do Nós BR',
    comments: [
      {
        id: 'c1',
        author: BRAZIL_USERS['user-lucas-manaus'],
        text: 'Nossa equipe de Manaus estará presente para o painel de bioeconomia! Evento fundamental para integrar o Norte ao resto do país.',
        timestamp: 'Hoje às 10:15'
      },
      {
        id: 'c2',
        author: BRAZIL_USERS['user-dandara-salvador'],
        text: 'A curadoria está espetacular! Vamos debater a potência das capitais criativas fora do eixo tradicional.',
        timestamp: 'Hoje às 11:40'
      }
    ]
  },
  {
    id: 'event-2',
    title: 'Fórum Amazônia & Cerrado: Tecnologias Verdes e Bioeconomia',
    description: 'Encontro híbrido sediado no Teatro Amazonas com transmissão nacional para debater investimento em cadeias de valor da floresta em pé, rastreabilidade por satélite e atração de venture capital para soluções de clima no Brasil.',
    category: 'Sustentabilidade & Clima',
    format: 'Presencial',
    date: '2026-11-24',
    time: '14:00 às 19:00',
    formattedDate: 'Terça-feira, 24 de Novembro',
    locationName: 'Centro de Convenções Vasco Vasques & Transmissão',
    regiao: 'Norte',
    cidade: 'Manaus',
    uf: 'AM',
    host: BRAZIL_USERS['user-lucas-manaus'],
    maxAttendees: 400,
    rsvpUserIds: ['user-lucas-manaus', 'user-mariana', 'user-camila-brasilia'],
    image: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg',
    tags: ['Bioeconomia', 'Amazônia', 'ESG', 'Clima'],
    isFree: true,
    ticketInfo: 'Vagas presenciais e acesso online livre',
    comments: []
  },
  {
    id: 'event-3',
    title: 'Festival Conexão Nordeste: Música, Negócios e Novos Formatos',
    description: 'Três dias de imersão no Centro Histórico de Salvador unindo programadores, artistas e gestores de festivais do Brasil inteiro para explorar novas tecnologias na indústria da música, direitos digitais e intercâmbio de talentos.',
    category: 'Cultura & Festivais',
    format: 'Presencial',
    date: '2026-11-27',
    time: '10:00 às 22:00',
    formattedDate: 'Sexta a Domingo, 27 a 29 de Novembro',
    locationName: 'Largo do Pelourinho & Hub Salvador',
    regiao: 'Nordeste',
    cidade: 'Salvador',
    uf: 'BA',
    host: BRAZIL_USERS['user-dandara-salvador'],
    maxAttendees: 1200,
    rsvpUserIds: ['user-dandara-salvador', 'user-mariana', 'user-thiago-sp'],
    image: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg',
    tags: ['Música Brasileira', 'Festivais', 'Cultura', 'Salvador'],
    isFree: true,
    ticketInfo: 'Entrada solidária (1kg de alimento)',
    comments: []
  },
  {
    id: 'event-4',
    title: 'Hackathon Nacional Brasil Tech: Soluções Abertas para o País',
    description: 'Competição nacional de desenvolvimento em 48 horas com equipes multidisciplinares de todos os estados desenvolvendo soluções de impacto público nas áreas de saúde, educação e desburocratização. Premiações e mentorias com referências da indústria.',
    category: 'Tecnologia & Startups',
    format: 'Nacional Online',
    date: '2026-12-05',
    time: 'Sexta 18h até Domingo 18h',
    formattedDate: '05 a 07 de Dezembro',
    locationName: 'Discord Oficial Nós BR & GitHub Hub',
    regiao: 'Nacional',
    cidade: 'Todo o Brasil',
    uf: 'BR',
    host: BRAZIL_USERS['user-thiago-sp'],
    maxAttendees: 1000,
    rsvpUserIds: ['user-thiago-sp', 'user-andre-curitiba', 'user-camila-brasilia'],
    image: '/src/assets/images/nosbr_oficina_saberes_1793850619000.jpg',
    tags: ['Hackathon', 'Open Source', 'Inovação Pública', 'Carreira Tech'],
    isFree: true,
    ticketInfo: 'Inscrição gratuita para times de até 5 pessoas',
    comments: []
  },
  {
    id: 'event-5',
    title: 'Masterclass: Marco Legal das Startups e Parcerias com Governo',
    description: 'Workshop interativo e prático de 3 horas com Camila Brandão explicando como pequenas empresas de base tecnológica podem participar das contratações públicas de inovação (CPBI) no Brasil sem travas burocráticas.',
    category: 'Workshop & Masterclass',
    format: 'Nacional Online',
    date: '2026-12-09',
    time: '19:00 às 21:30',
    formattedDate: 'Quarta-feira, 09 de Dezembro',
    locationName: 'Sala Virtual Interativa Nós BR',
    regiao: 'Centro-Oeste',
    cidade: 'Brasília',
    uf: 'DF',
    host: BRAZIL_USERS['user-camila-brasilia'],
    maxAttendees: 250,
    rsvpUserIds: ['user-camila-brasilia', 'user-mariana'],
    image: '/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg',
    tags: ['GovTech', 'Marco Legal', 'Startups', 'Regulação'],
    isFree: true,
    ticketInfo: 'Vagas limitadas para debate em tempo real',
    comments: []
  }
];

export const INITIAL_KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'know-1',
    title: 'Mentoria: Arquitetura de Software Escalável & Transição para Tech Lead',
    description: 'Ofereço sessões de mentoria 1-a-1 e em pequenos grupos para engenheiros de software seniores e plenos de qualquer estado que queiram estruturar sistemas resilientes em nuvem e desenvolver habilidades de liderança técnica.',
    type: 'ensinar',
    category: 'Tecnologia & Programação',
    format: 'Online (Todo o Brasil)',
    author: BRAZIL_USERS['user-thiago-sp'],
    exchangeInterest: 'Interesse em trocar experiências com quem atua em venture capital, fundos de investimento ou criação de podcasts técnicos.',
    tags: ['Engenharia de Software', 'Cloud', 'Liderança Técnica', 'Mentoria'],
    createdAt: 'Ontem',
    requestsCount: 18,
    likesCount: 94,
    likedByUser: true
  },
  {
    id: 'know-2',
    title: 'Consultoria Prática: Captação de Recursos & Editais da Lei Rouanet e Paulo Gustavo',
    description: 'Compartilho metodologia passo a passo para aprovação e prestação de contas em editais culturais federais e estaduais, montagem de planilha orçamentária e negociação com patrocinadores privados.',
    type: 'ensinar',
    category: 'Marketing & Mídia',
    format: 'Workshop Prático',
    author: BRAZIL_USERS['user-dandara-salvador'],
    exchangeInterest: 'Gostaria de me conectar com advogados especialistas em propriedade intelectual no meio digital ou designers de apresentações.',
    tags: ['Produção Cultural', 'Editais Públicos', 'Patrocínio', 'Projetos'],
    createdAt: 'Há 2 dias',
    requestsCount: 24,
    likesCount: 142,
    likedByUser: true
  },
  {
    id: 'know-3',
    title: 'Mentoria Especializada: Bioeconomia, Certificações & Cadeias Florestais',
    description: 'Oriento empreendedores e pesquisadores sobre como navegar nas exigências de rastreabilidade socioambiental, desenvolvimento de bioprodutos cosméticos/alimentares e registro no SisGen (Acesso ao Patrimônio Genético).',
    type: 'ensinar',
    category: 'Sustentabilidade & ESG',
    format: 'Mentoria 1-a-1',
    author: BRAZIL_USERS['user-lucas-manaus'],
    exchangeInterest: 'Interesse em aprender sobre ferramentas de marketing digital B2B e captação de investimento semente.',
    tags: ['Bioeconomia', 'Amazônia', 'SisGen', 'Inovação Verde'],
    createdAt: 'Há 3 dias',
    requestsCount: 15,
    likesCount: 88,
    likedByUser: false
  },
  {
    id: 'know-4',
    title: 'Busco Mentoria: Como estruturar uma rodada de captação Seed para Startup de IA no Brasil?',
    description: 'Estou liderando o desenvolvimento de uma solução de IA aplicada à análise preditiva de safras e busco profissionais com experiência prévia em rodadas Seed/Série A no ecossistema brasileiro para trocar ideias sobre cap table e valuation.',
    type: 'aprender',
    category: 'Negócios & Startups',
    format: 'Online (Todo o Brasil)',
    author: BRAZIL_USERS['user-andre-curitiba'],
    exchangeInterest: 'Ofereço em troca consultoria técnica detalhada sobre implantação de IoT industrial no campo e conexões com cooperativas agrícolas do Sul.',
    tags: ['Venture Capital', 'Fundraising', 'AgroTech', 'IA'],
    createdAt: 'Há 1 dia',
    requestsCount: 11,
    likesCount: 65,
    likedByUser: false
  },
  {
    id: 'know-5',
    title: 'Mentoria & Orientação: Desmistificando o Marco Legal das Startups e Compras Públicas',
    description: 'Disponibilizo encontros online para fundadores e diretores de inovação entenderem como participar de dispensas de licitação e Contratos Públicos de Solução Inovadora (CPSI) com prefeituras e órgãos federais.',
    type: 'ensinar',
    category: 'Negócios & Startups',
    format: 'Online (Todo o Brasil)',
    author: BRAZIL_USERS['user-camila-brasilia'],
    exchangeInterest: 'Troco por trocas de conhecimento sobre design de produtos digitais e metodologias ágeis de desenvolvimento.',
    tags: ['GovTech', 'Marco Legal', 'Contratações Públicas', 'Startups'],
    createdAt: 'Há 4 dias',
    requestsCount: 29,
    likesCount: 120,
    likedByUser: true
  },
  {
    id: 'know-6',
    title: 'Busco Conexão: Especialistas em Modelagem de Créditos de Carbono e Restauração Florestal',
    description: 'Nosso time está desenvolvendo um projeto de restauração de mata nativa em larga escala e busca contato com engenheiros florestais ou economistas com vivência em metodologias Verra/Gold Standard no Brasil.',
    type: 'aprender',
    category: 'Sustentabilidade & ESG',
    format: 'Online (Todo o Brasil)',
    author: CURRENT_USER,
    exchangeInterest: 'Ofereço em contrapartida suporte em gestão de projetos, estruturação de parcerias corporativas e narrativa para investidores institucionais.',
    tags: ['Crédito de Carbono', 'Restauração', 'Verra', 'ESG Brasil'],
    createdAt: 'Hoje',
    requestsCount: 7,
    likesCount: 52,
    likedByUser: false
  }
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    author: BRAZIL_USERS['user-lucas-manaus'],
    content: 'Acabamos de homologar os primeiros testes da nova cadeia de óleos vegetais de murumuru e andiroba certificados com cooperativas do interior do Amazonas. Mostramos que com tecnologia nacional, ciência aplicada e respeito aos produtores locais conseguimos agregar 4x mais valor aos insumos antes de exportar. Quem tiver interesse em conectar com pesquisadores da região Norte, vamos conversar!',
    regiao: 'Norte',
    cidade: 'Manaus',
    uf: 'AM',
    category: 'Inovação & Ideias',
    image: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg',
    likes: 128,
    likedByUser: true,
    comments: [
      {
        id: 'cp1',
        author: CURRENT_USER,
        text: 'Lucas, parabéns pelo avanço! Essa é a verdadeira soberania econômica que o Brasil precisa valorizar de Norte a Sul.',
        timestamp: 'Há 2 horas'
      },
      {
        id: 'cp2',
        author: BRAZIL_USERS['user-camila-brasilia'],
        text: 'Sensacional! O Ministério do Desenvolvimento abriu consulta recente sobre compras públicas para bioinsumos, podemos conversar sobre como aplicar.',
        timestamp: 'Há 1 hora'
      }
    ],
    timestamp: 'Há 3 horas'
  },
  {
    id: 'post-2',
    author: BRAZIL_USERS['user-dandara-salvador'],
    content: 'A economia criativa brasileira movimenta mais que a indústria automobilística, mas ainda sofre com a centralização de editais e investimentos no Sudeste. Lançamos hoje no festival um manifesto por rotas culturais interestaduais unindo Bahia, Pernambuco, Pará e Minas Gerais para intercâmbio direto de festivais sem intermediários.',
    regiao: 'Nordeste',
    cidade: 'Salvador',
    uf: 'BA',
    category: 'Cultura & Brasilidade',
    image: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg',
    likes: 215,
    likedByUser: true,
    comments: [
      {
        id: 'cp3',
        author: BRAZIL_USERS['user-thiago-sp'],
        text: 'Totalmente de acordo! A tecnologia tem que servir para descentralizar e dar autonomia a todos os pólos do Brasil.',
        timestamp: 'Há 4 horas'
      }
    ],
    timestamp: 'Há 6 horas'
  },
  {
    id: 'post-3',
    author: BRAZIL_USERS['user-thiago-sp'],
    content: 'Lançamos um repositório nacional open-source com templates prontos para qualquer profissional criar seu portfólio e site de forma leve e acessível. Mais de 800 desenvolvedores de 19 estados já contribuíram nas primeiras semanas. Conexão real entre desenvolvedores de todo o país!',
    regiao: 'Sudeste',
    cidade: 'São Paulo',
    uf: 'SP',
    category: 'Projetos Colaborativos',
    likes: 184,
    likedByUser: false,
    comments: [],
    timestamp: 'Ontem'
  }
];

export const INITIAL_HUBS: NationalHub[] = [
  {
    id: 'hub-tech',
    title: 'Startups & Tecnologia Brasil',
    description: 'Comunidade nacional integrando desenvolvedores, fundadores, designers de produto e investidores de todos os estados.',
    category: 'Tecnologia & Inovação',
    membersCount: 4890,
    topicsCount: 312,
    coverImage: '/src/assets/images/nosbr_oficina_saberes_1793850619000.jpg',
    isMember: true
  },
  {
    id: 'hub-bio',
    title: 'Bioeconomia & Amazônia Viva',
    description: 'Rede de cientistas, ambientalistas e empreendedores dedicados à preservação da floresta e inovação sustentável.',
    category: 'Sustentabilidade & ESG',
    membersCount: 2340,
    topicsCount: 184,
    coverImage: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg',
    isMember: true
  },
  {
    id: 'hub-cultura',
    title: 'Cultura, Música & Festivais BR',
    description: 'Produtores, artistas e curadores articulando eventos, festivais independentes e políticas culturais pelo país.',
    category: 'Cultura & Brasilidade',
    membersCount: 3720,
    topicsCount: 245,
    coverImage: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg',
    isMember: false
  },
  {
    id: 'hub-govtech',
    title: 'GovTech & Inovação Pública',
    description: 'Especialistas em regulação, gestores municipais e estaduais colaborando para transformar serviços públicos com tecnologia.',
    category: 'Políticas Públicas & Direito',
    membersCount: 1560,
    topicsCount: 98,
    coverImage: '/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg',
    isMember: false
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-lucas',
    withUser: BRAZIL_USERS['user-lucas-manaus'],
    lastMessage: 'Mariana, recebi o material da modelagem! Vamos alinhar nossa apresentação conjunta no Summit semana que vem?',
    lastTime: '14:20',
    unread: false,
    messages: [
      {
        id: 'm1',
        senderId: 'user-mariana',
        text: 'Oi Lucas! Vi sua publicação sobre o murumuru certificado em Manaus. Incrível o impacto!',
        time: '13:40'
      },
      {
        id: 'm2',
        senderId: 'user-lucas-manaus',
        text: 'Obrigado Mari! Estamos expandindo os testes e a troca com você sobre captação de recursos foi essencial.',
        time: '13:55'
      },
      {
        id: 'm3',
        senderId: 'user-lucas-manaus',
        text: 'Mariana, recebi o material da modelagem! Vamos alinhar nossa apresentação conjunta no Summit semana que vem?',
        time: '14:20'
      }
    ]
  },
  {
    id: 'conv-dandara',
    withUser: BRAZIL_USERS['user-dandara-salvador'],
    lastMessage: 'Oi Mariana! Tudo pronto para a comitiva do Rio de Janeiro desembarcar em Salvador no festival?',
    lastTime: 'Ontem',
    unread: true,
    messages: [
      {
        id: 'm4',
        senderId: 'user-dandara-salvador',
        text: 'Oi Mariana! Tudo pronto para a comitiva do Rio de Janeiro desembarcar em Salvador no festival?',
        time: 'Ontem 17:15'
      }
    ]
  }
];

export const INITIAL_PROPOSALS: MentorshipProposal[] = [
  {
    id: 'prop-1',
    fromUser: CURRENT_USER,
    toUser: BRAZIL_USERS['user-thiago-sp'],
    knowledgeItem: INITIAL_KNOWLEDGE_ITEMS[0],
    proposalMessage: 'Olá Thiago! Vi sua mentoria em arquitetura escalável e gostaria de agendar uma sessão para nossa equipe técnica. Em contrapartida, posso estruturar com você um plano completo de captação de recursos e parcerias para sua comunidade open-source!',
    offeredSkill: 'Captação de Recursos & Estruturação de Parcerias ESG',
    proposedFormat: 'Chamada de vídeo online 1-a-1 (60 minutos)',
    status: 'aceita',
    createdAt: 'Há 2 dias'
  },
  {
    id: 'prop-2',
    fromUser: BRAZIL_USERS['user-andre-curitiba'],
    toUser: CURRENT_USER,
    knowledgeItem: INITIAL_KNOWLEDGE_ITEMS[5],
    proposalMessage: 'Olá Mariana! Trabalhamos com restauração agroflorestal no Paraná e acompanhamos metodologias Verra. Adoraríamos bater um papo para trocar conhecimentos sobre medição de impacto!',
    offeredSkill: 'Experiência prática em validação no campo e sensores IoT',
    proposedFormat: 'Reunião virtual de alinhamento',
    status: 'pendente',
    createdAt: 'Hoje'
  }
];

export const BRAZIL_STATES = [
  { uf: 'AC', nome: 'Acre', regiao: 'Norte' },
  { uf: 'AL', nome: 'Alagoas', regiao: 'Nordeste' },
  { uf: 'AP', nome: 'Amapá', regiao: 'Norte' },
  { uf: 'AM', nome: 'Amazonas', regiao: 'Norte' },
  { uf: 'BA', nome: 'Bahia', regiao: 'Nordeste' },
  { uf: 'CE', nome: 'Ceará', regiao: 'Nordeste' },
  { uf: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste' },
  { uf: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste' },
  { uf: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste' },
  { uf: 'MA', nome: 'Maranhão', regiao: 'Nordeste' },
  { uf: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste' },
  { uf: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste' },
  { uf: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste' },
  { uf: 'PA', nome: 'Pará', regiao: 'Norte' },
  { uf: 'PB', nome: 'Paraíba', regiao: 'Nordeste' },
  { uf: 'PR', nome: 'Paraná', regiao: 'Sul' },
  { uf: 'PE', nome: 'Pernambuco', regiao: 'Nordeste' },
  { uf: 'PI', nome: 'Piauí', regiao: 'Nordeste' },
  { uf: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste' },
  { uf: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste' },
  { uf: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul' },
  { uf: 'RO', nome: 'Rondônia', regiao: 'Norte' },
  { uf: 'RR', nome: 'Roraima', regiao: 'Norte' },
  { uf: 'SC', nome: 'Santa Catarina', regiao: 'Sul' },
  { uf: 'SP', nome: 'São Paulo', regiao: 'Sudeste' },
  { uf: 'SE', nome: 'Sergipe', regiao: 'Nordeste' },
  { uf: 'TO', nome: 'Tocantins', regiao: 'Norte' }
];

export const INITIAL_COLLABORATIVE_PROJECTS: CollaborativeProject[] = [
  {
    id: 'proj-rio-horta',
    title: 'Reflorestamento e Horta Agroecológica no Morro da Conceição',
    description: 'Ação coletiva para transformar terrenos ociosos na encosta histórica em canteiros agroecológicos de hortaliças, ervas medicinais e mudas nativas da Mata Atlântica.',
    goal: 'Implantar 12 canteiros regenerativos, sistema de compostagem e fornecer alimentos frescos para famílias da comunidade local.',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    regiao: 'Sudeste',
    category: 'Meio Ambiente & Clima',
    leader: CURRENT_USER,
    targetVolunteers: 18,
    members: [
      CURRENT_USER,
      BRAZIL_USERS['user-thiago-sp'],
      BRAZIL_USERS['user-camila-brasilia']
    ],
    materialsNeeded: [
      { id: 'mat-1', item: '40 mudas nativas de árvores da Mata Atlântica', fulfilled: true, contributorName: 'Mariana Albuquerque', contributorAvatar: CURRENT_USER.avatar },
      { id: 'mat-2', item: '10 sacos de terra adubada 20kg', fulfilled: true, contributorName: 'Thiago Mendes', contributorAvatar: BRAZIL_USERS['user-thiago-sp'].avatar },
      { id: 'mat-3', item: '6 pás de corte, enxadas e ancinhos', fulfilled: false },
      { id: 'mat-4', item: 'Mangueira de 50 metros com esguicho regulável', fulfilled: false },
      { id: 'mat-5', item: '3 composteiras ecológicas de madeira reciclada', fulfilled: false }
    ],
    status: 'Em Andamento',
    meetingDate: 'Sábado, 19 de Abril às 08:30',
    meetingLocation: 'Praça Coronel Assumpção (Harmonia) / Acesso Morro da Conceição, Rio de Janeiro',
    image: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg',
    updates: [
      {
        id: 'upd-1',
        author: CURRENT_USER,
        text: 'Conseguimos a autorização comunitária e as primeiras 40 mudas já estão separadas! Quem puder levar luvas de jardinagem no sábado será muito bem-vindo.',
        timestamp: 'Há 1 dia'
      },
      {
        id: 'upd-2',
        author: BRAZIL_USERS['user-thiago-sp'],
        text: 'Terra adubada comprada e entregue na associação de moradores. Nos vemos no sábado cedo!',
        timestamp: 'Há 4 horas'
      }
    ],
    createdAt: 'Há 3 dias'
  },
  {
    id: 'proj-sp-lab-tech',
    title: 'Inclusão Digital: Recondicionamento de PCs para Jovens em Heliópolis',
    description: 'Campanha colaborativa para arrecadar computadores e periféricos usados de empresas e pessoas físicas, consertar, instalar Linux educacional e doar para jovens estudantes da comunidade.',
    goal: 'Montar e entregar 30 estações de estudo completas com acesso à internet e oficinas gratuitas de letramento digital e programação básica.',
    cidade: 'São Paulo',
    uf: 'SP',
    regiao: 'Sudeste',
    category: 'Educação & Tecnologia',
    leader: BRAZIL_USERS['user-thiago-sp'],
    targetVolunteers: 25,
    members: [
      BRAZIL_USERS['user-thiago-sp'],
      BRAZIL_USERS['user-camila-brasilia']
    ],
    materialsNeeded: [
      { id: 'mat-sp-1', item: '20 fontes ATX 500W testadas', fulfilled: true, contributorName: 'Thiago Mendes', contributorAvatar: BRAZIL_USERS['user-thiago-sp'].avatar },
      { id: 'mat-sp-2', item: '30 monitores LCD/LED funcionando', fulfilled: true, contributorName: 'Startups Paulista Hub' },
      { id: 'mat-sp-3', item: '25 cabos de força e adaptadores HDMI', fulfilled: false },
      { id: 'mat-sp-4', item: 'Switch Gigabit 24 portas para laboratório', fulfilled: false },
      { id: 'mat-sp-5', item: 'Kits de chaves de precisão e pasta térmica', fulfilled: false }
    ],
    status: 'Em Andamento',
    meetingDate: 'Sábado, 26 de Abril às 09:30',
    meetingLocation: 'Espaço Conhecimento Heliópolis - Rua Coronel Silva Castro, São Paulo',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    updates: [
      {
        id: 'upd-sp-1',
        author: BRAZIL_USERS['user-thiago-sp'],
        text: 'Já recuperamos os primeiros 14 gabinetes! Instalamos Linux Mint e pacotes do LibreOffice e Scratch.',
        timestamp: 'Ontem'
      }
    ],
    createdAt: 'Há 5 dias'
  },
  {
    id: 'proj-manaus-igarape',
    title: 'Revitalização e Limpeza Ecológica do Igarapé do Mindu',
    description: 'Mobilização popular e científica para despoluição das margens do igarapé, instalação de ecobarreiras artesanais de garrafas PET e plantio de mudas ripárias.',
    goal: 'Retirar 2 toneladas de resíduos plásticos da calha do rio, proteger a fauna silvestre nativa (sauim-de-coleira) e conscientizar os moradores do entorno.',
    cidade: 'Manaus',
    uf: 'AM',
    regiao: 'Norte',
    category: 'Meio Ambiente & Clima',
    leader: BRAZIL_USERS['user-lucas-manaus'],
    targetVolunteers: 30,
    members: [
      BRAZIL_USERS['user-lucas-manaus'],
      CURRENT_USER
    ],
    materialsNeeded: [
      { id: 'mat-am-1', item: '250 sacos de ráfia reforçados para lixo pesado', fulfilled: true, contributorName: 'Lucas Pantoja', contributorAvatar: BRAZIL_USERS['user-lucas-manaus'].avatar },
      { id: 'mat-am-2', item: '40 pares de botas de borracha e luvas de proteção', fulfilled: true, contributorName: 'Coletivo Rios Limpos AM' },
      { id: 'mat-am-3', item: '4 barcos de apoio tipo canoa para retirada flutuante', fulfilled: false },
      { id: 'mat-am-4', item: 'Redes de contenção de polietileno (ecobarreira)', fulfilled: false },
      { id: 'mat-am-5', item: 'Caixas de água mineral e frutas para hidratação dos voluntários', fulfilled: false }
    ],
    status: 'Em Andamento',
    meetingDate: 'Domingo, 20 de Abril às 07:00',
    meetingLocation: 'Entrada do Parque Linear do Mindu, Setor das Nascentes - Parque 10 de Novembro, Manaus',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    updates: [
      {
        id: 'upd-am-1',
        author: BRAZIL_USERS['user-lucas-manaus'],
        text: 'Nossos biólogos voluntários identificaram 3 novos ninhos de sauim na área protegida! O mutirão de domingo será vital para proteger esse trecho.',
        timestamp: 'Há 2 dias'
      }
    ],
    createdAt: 'Há 1 semana'
  },
  {
    id: 'proj-salvador-pelo',
    title: 'Restauro de Instrumentos & Sala de Música no Pelourinho',
    description: 'Iniciativa comunitária de artistas e mestres de capoeira para restaurar alfaias, atabaques e berimbaus quebrados, reabrindo oficinas de percussão para crianças do Centro Histórico.',
    goal: 'Restaurar 28 instrumentos percussivos tradicionais e equipar sala acústica comunitária para ensaios e oficinas culturais gratuitas.',
    cidade: 'Salvador',
    uf: 'BA',
    regiao: 'Nordeste',
    category: 'Cultura & Revitalização Urbana',
    leader: BRAZIL_USERS['user-dandara-salvador'],
    targetVolunteers: 15,
    members: [
      BRAZIL_USERS['user-dandara-salvador']
    ],
    materialsNeeded: [
      { id: 'mat-ba-1', item: 'Latas de verniz naval, lixas d’água e óleo de linhaça', fulfilled: true, contributorName: 'Dandara Oliveira', contributorAvatar: BRAZIL_USERS['user-dandara-salvador'].avatar },
      { id: 'mat-ba-2', item: '20 couros de cabra e boi curtidos para atabaques', fulfilled: false },
      { id: 'mat-ba-3', item: '100 metros de corda de sisal grossa para afinação', fulfilled: false },
      { id: 'mat-ba-4', item: '2 caixas de som ativas de 15 polegadas', fulfilled: false },
      { id: 'mat-ba-5', item: '50 livros de literatura afro-brasileira para biblioteca', fulfilled: false }
    ],
    status: 'Em Formação',
    meetingDate: 'Sábado, 3 de Maio às 14:00',
    meetingLocation: 'Largo Tereza Batista, Casarão das Artes, Pelourinho, Salvador',
    image: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg',
    updates: [
      {
        id: 'upd-ba-1',
        author: BRAZIL_USERS['user-dandara-salvador'],
        text: 'Mestre Dinho confirmou presença para ensinar técnicas tradicionais de amarração e afinação de couro de atabaque no primeiro sábado!',
        timestamp: 'Há 3 dias'
      }
    ],
    createdAt: 'Há 4 dias'
  },
  {
    id: 'proj-curitiba-alimentos',
    title: 'Cozinha Solidária e Resgate de Hortaliças na Ceasa Curitiba',
    description: 'Rede de combate ao desperdício alimentar: recolhemos frutas, legumes e verduras perfeitamente próprios para consumo que seriam descartados por estética na Ceasa e preparamos refeições nutritivas.',
    goal: 'Distribuir 500 marmitas agroecológicas quentes e balanceadas semanalmente para pessoas em situação de vulnerabilidade e catadores de recicláveis.',
    cidade: 'Curitiba',
    uf: 'PR',
    regiao: 'Sul',
    category: 'Combate à Fome & Solidariedade',
    leader: BRAZIL_USERS['user-andre-curitiba'],
    targetVolunteers: 20,
    members: [
      BRAZIL_USERS['user-andre-curitiba']
    ],
    materialsNeeded: [
      { id: 'mat-pr-1', item: '2 caixas térmicas industriais de 100L para transporte', fulfilled: true, contributorName: 'André Zanin', contributorAvatar: BRAZIL_USERS['user-andre-curitiba'].avatar },
      { id: 'mat-pr-2', item: '500 marmitas térmicas de papel biodegradável', fulfilled: false },
      { id: 'mat-pr-3', item: 'Kits de aventais, luvas descartáveis e toucas higiênicas', fulfilled: true, contributorName: 'Padaria Orgânica Graciosa' },
      { id: 'mat-pr-4', item: 'Furgão ou utilitário disponível das 06h às 09h da manhã', fulfilled: false }
    ],
    status: 'Em Andamento',
    meetingDate: 'Terça e Quinta-feira às 06:30',
    meetingLocation: 'Pavilhão Social da Ceasa Curitiba - BR-116, Curitiba',
    image: '/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg',
    updates: [
      {
        id: 'upd-pr-1',
        author: BRAZIL_USERS['user-andre-curitiba'],
        text: 'Na última terça resgatamos 280kg de abóboras, tomates e cenouras da época. Todas as 420 refeições foram servidas quentes no centro.',
        timestamp: 'Há 2 dias'
      }
    ],
    createdAt: 'Há 6 dias'
  },
  {
    id: 'proj-brasilia-sensores',
    title: 'Hackerspace Cívico: Monitoramento Ambiental do Lago Paranoá',
    description: 'Construção colaborativa de boias sensorizadas de código aberto com ESP32 e painéis solares para monitorar qualidade da água, temperatura e turbidez do Lago Paranoá em dados abertos.',
    goal: 'Construir 5 boias autônomas e disponibilizar dashboard público em tempo real para pesquisadores, esportistas e cidadãos de Brasília.',
    cidade: 'Brasília',
    uf: 'DF',
    regiao: 'Centro-Oeste',
    category: 'Educação & Tecnologia',
    leader: BRAZIL_USERS['user-camila-brasilia'],
    targetVolunteers: 12,
    members: [
      BRAZIL_USERS['user-camila-brasilia']
    ],
    materialsNeeded: [
      { id: 'mat-df-1', item: '6 placas microcontroladoras ESP32 com antena LoRa', fulfilled: true, contributorName: 'Camila Brandão', contributorAvatar: BRAZIL_USERS['user-camila-brasilia'].avatar },
      { id: 'mat-df-2', item: '5 sensores industriais de pH e turbidez à prova d’água', fulfilled: false },
      { id: 'mat-df-3', item: 'Mini painéis fotovoltaicos 5V 2W com controlador de carga', fulfilled: false },
      { id: 'mat-df-4', item: 'Cases plásticos herméticos padrão IP68', fulfilled: false }
    ],
    status: 'Em Formação',
    meetingDate: 'Sábado, 10 de Maio às 10:00',
    meetingLocation: 'Clube de Engenharia & Parque da Asa Sul, Brasília',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    updates: [
      {
        id: 'upd-df-1',
        author: BRAZIL_USERS['user-camila-brasilia'],
        text: 'Código do firmware em C++ liberado no GitHub para quem quiser ajudar a testar o consumo de bateria!',
        timestamp: 'Ontem'
      }
    ],
    createdAt: 'Há 3 dias'
  }
];

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story-mariana',
    user: CURRENT_USER,
    media: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=800&q=80',
    caption: 'Manhã linda na Baía de Guanabara estruturando os novos projetos socioambientais! 🌿🌊',
    location: 'Baía de Guanabara, Rio de Janeiro',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    timestamp: 'Há 25 min',
    viewed: false,
    likesCount: 142
  },
  {
    id: 'story-dandara',
    user: BRAZIL_USERS['user-dandara-salvador'],
    media: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg',
    caption: 'Passagem de som no Pelourinho para o festival de música negra neste fim de semana! 🥁✨',
    location: 'Largo do Pelourinho, Salvador',
    cidade: 'Salvador',
    uf: 'BA',
    timestamp: 'Há 1 hora',
    viewed: false,
    likesCount: 389
  },
  {
    id: 'story-lucas',
    user: BRAZIL_USERS['user-lucas-manaus'],
    media: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    caption: 'Expedição de campo no Rio Negro coletando amostras de bioativos da floresta! 🌳🛶',
    location: 'Rio Negro, Manaus',
    cidade: 'Manaus',
    uf: 'AM',
    timestamp: 'Há 2 horas',
    viewed: false,
    likesCount: 275
  },
  {
    id: 'story-thiago',
    user: BRAZIL_USERS['user-thiago-sp'],
    media: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Hackathon presencial na Av. Paulista! 120 devs criando apps de impacto público 💻⚡',
    location: 'Avenida Paulista, São Paulo',
    cidade: 'São Paulo',
    uf: 'SP',
    timestamp: 'Há 3 horas',
    viewed: false,
    likesCount: 512
  },
  {
    id: 'story-camila',
    user: BRAZIL_USERS['user-camila-brasilia'],
    media: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    caption: 'Pôr do sol incrível na Esplanada dos Ministérios após aprovação do marco de dados abertos 🇧🇷🏛️',
    location: 'Praça dos Três Poderes, Brasília',
    cidade: 'Brasília',
    uf: 'DF',
    timestamp: 'Há 4 horas',
    viewed: false,
    likesCount: 230
  },
  {
    id: 'story-andre',
    user: BRAZIL_USERS['user-andre-curitiba'],
    media: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg',
    caption: 'Colheita agroecológica da manhã fresquinha para a Cozinha Solidária! 🥕🥬',
    location: 'Horta Urbana Graciosa, Curitiba',
    cidade: 'Curitiba',
    uf: 'PR',
    timestamp: 'Há 5 horas',
    viewed: true,
    likesCount: 198
  }
];

export const INITIAL_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    author: CURRENT_USER,
    media: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=720&q=80',
    caption: 'Pôr do sol mágico na Pedra do Arpoador ao som de aplausos e bossa nova. O Rio tem uma energia única que conecta o Brasil inteiro! 🌅🇧🇷 #NósNoRio',
    audioTrack: 'Tom Jobim · Garota de Ipanema',
    likes: 4890,
    commentsCount: 312,
    sharesCount: 540,
    likedByUser: true,
    savedByUser: true,
    location: 'Pedra do Arpoador, Ipanema',
    cidade: 'Rio de Janeiro',
    uf: 'RJ'
  },
  {
    id: 'reel-2',
    author: BRAZIL_USERS['user-dandara-salvador'],
    media: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg',
    caption: 'A força do Olodum ecoando pelas ladeiras históricas do Pelourinho. A nossa ancestralidade viva e vibrante em cada batida do tambor! 🥁💛 #NósNaBahia',
    audioTrack: 'Olodum · Faraó Divindade do Egito',
    likes: 8240,
    commentsCount: 654,
    sharesCount: 1200,
    likedByUser: false,
    savedByUser: false,
    location: 'Pelourinho, Salvador',
    cidade: 'Salvador',
    uf: 'BA'
  },
  {
    id: 'reel-3',
    author: BRAZIL_USERS['user-lucas-manaus'],
    media: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=720&q=80',
    caption: 'Navegando pelo Encontro das Águas dos Rios Negro e Solimões. Duas águas que correm juntas por quilômetros sem se misturar. Uma verdadeira aula viva da natureza! 🌊🌿 #NósNoAmazonas',
    audioTrack: 'Milton Nascimento · Travessia',
    likes: 6150,
    commentsCount: 418,
    sharesCount: 890,
    likedByUser: true,
    savedByUser: false,
    location: 'Encontro das Águas, Manaus',
    cidade: 'Manaus',
    uf: 'AM'
  },
  {
    id: 'reel-4',
    author: BRAZIL_USERS['user-thiago-sp'],
    media: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=720&q=80',
    caption: 'A selva de pedra pulsando inovação! O Mirante do Vale iluminado e mais uma rodada de mentoria técnica gratuita entregue para novos desenvolvedores. 🚀💻 #NósEmSP',
    audioTrack: 'Caetano Veloso · Sampa',
    likes: 3820,
    commentsCount: 204,
    sharesCount: 310,
    likedByUser: false,
    savedByUser: true,
    location: 'Centro Histórico, São Paulo',
    cidade: 'São Paulo',
    uf: 'SP'
  }
];
