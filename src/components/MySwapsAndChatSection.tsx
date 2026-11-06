import React, { useState } from 'react';
import { 
  MessageSquare, 
  ArrowRightLeft, 
  CheckCircle2, 
  Send, 
  MapPin, 
  Sparkles,
  HeartHandshake,
  Check,
  Video
} from 'lucide-react';
import { MentorshipProposal, Conversation, User } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface MySwapsAndChatSectionProps {
  proposals: MentorshipProposal[];
  conversations: Conversation[];
  currentUser: User;
  onUpdateProposalStatus: (id: string, newStatus: 'pendente' | 'aceita' | 'concluida') => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MySwapsAndChatSection: React.FC<MySwapsAndChatSectionProps> = ({
  proposals,
  conversations,
  currentUser,
  onUpdateProposalStatus,
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'propostas' | 'chat'>('propostas');
  const [selectedConversationId, setSelectedConversationId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [messageInput, setMessageInput] = useState('');

  const activeConversation = conversations.find(c => c.id === selectedConversationId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    onSendMessage(activeConversation.id, messageInput.trim());
    setMessageInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <span>Conexões, Mentorias & Mensagens</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Acompanhe propostas de troca de conhecimentos e converse diretamente com membros de outros estados.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('propostas')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'propostas'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Propostas de Troca ({proposals.length})
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'chat'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Conversas Diretas ({conversations.length})
          </button>
        </div>
      </div>

      {activeTab === 'propostas' ? (
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
              <ArrowRightLeft className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
                Nenhuma proposta de troca de conhecimento no momento
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Explore a aba <strong>Troca de Conhecimento</strong> e proponha sua primeira conexão!
              </p>
            </div>
          ) : (
            proposals.map(proposal => {
              const isMine = proposal.fromUser.id === currentUser.id;
              const otherUser = isMine ? proposal.toUser : proposal.fromUser;
              const otherHashtag = getLocationHashtag(otherUser.cidade, otherUser.uf);

              return (
                <div
                  key={proposal.id}
                  className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4"
                >
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md font-semibold text-xs ${
                        proposal.status === 'aceita'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : proposal.status === 'concluida'
                          ? 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}>
                        {proposal.status === 'aceita' && '✓ Conexão Confirmada'}
                        {proposal.status === 'concluida' && '★ Mentoria Concluída'}
                        {proposal.status === 'pendente' && '⏳ Aguardando Alinhamento'}
                      </span>
                      <span className="text-stone-400">· {proposal.createdAt}</span>
                    </div>

                    <span className="text-[11px] text-stone-500">
                      {isMine ? 'Enviada por você' : 'Recebida por você'}
                    </span>
                  </div>

                  {/* Users exchange details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-800 text-xs">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">
                        Tema em Troca:
                      </span>
                      <p className="font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                        {proposal.knowledgeItem.title}
                      </p>
                      <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                        Mentor: {proposal.knowledgeItem.author.name} ({getLocationHashtag(proposal.knowledgeItem.author.cidade, proposal.knowledgeItem.author.uf)})
                      </p>
                    </div>

                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">
                        Contrapartida Proposta:
                      </span>
                      <p className="font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">
                        {proposal.offeredSkill}
                      </p>
                      <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5 flex items-center gap-1">
                        <Video className="w-3 h-3 text-emerald-600" />
                        <span>{proposal.proposedFormat}</span>
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700/60 text-xs text-stone-700 dark:text-stone-300 italic">
                    "{proposal.proposalMessage}"
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={otherUser.avatar}
                        alt={otherUser.name}
                        className="w-8 h-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1 leading-none">
                          <span>{otherUser.name}</span>
                          {otherUser.isVerified && <VerifiedBadge size="xs" />}
                        </span>
                        {/* State hashtag directly below username */}
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight leading-none">
                          {otherHashtag}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {proposal.status === 'pendente' && !isMine && (
                        <button
                          onClick={() => onUpdateProposalStatus(proposal.id, 'aceita')}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Aceitar e Iniciar Conversa</span>
                        </button>
                      )}

                      {proposal.status === 'aceita' && (
                        <button
                          onClick={() => onUpdateProposalStatus(proposal.id, 'concluida')}
                          className="px-3 py-1.5 text-xs font-bold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Concluir Mentoria</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setActiveTab('chat');
                          const conv = conversations.find(c => c.withUser.id === otherUser.id);
                          if (conv) setSelectedConversationId(conv.id);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Abrir Mensagens</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Chat view */
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          {/* Conversation list */}
          <div className="md:col-span-4 border-r border-stone-200 dark:border-stone-800 flex flex-col">
            <div className="p-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Conexões Ativas ({conversations.length})
              </span>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-stone-800 overflow-y-auto">
              {conversations.map(conv => {
                const hashtag = getLocationHashtag(conv.withUser.cidade, conv.withUser.uf);

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`w-full p-3 flex items-start gap-3 text-left transition-colors ${
                      selectedConversationId === conv.id
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/30'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <img
                      src={conv.withUser.avatar}
                      alt={conv.withUser.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate flex items-center gap-1">
                          <span>{conv.withUser.name}</span>
                          {conv.withUser.isVerified && <VerifiedBadge size="xs" />}
                        </p>
                        <span className="text-[10px] text-stone-400">{conv.lastTime}</span>
                      </div>
                      {/* State hashtag directly below username */}
                      <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight leading-tight">
                        {hashtag}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Conversation Messages */}
          <div className="md:col-span-8 flex flex-col justify-between h-[520px]">
            {activeConversation ? (
              <>
                {/* Active user header */}
                <div className="p-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={activeConversation.withUser.avatar}
                      alt={activeConversation.withUser.name}
                      className="w-9 h-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                        <span>{activeConversation.withUser.name}</span>
                        {activeConversation.withUser.isVerified && <VerifiedBadge size="xs" />}
                      </p>
                      {/* State hashtag directly below username */}
                      <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight leading-none">
                        {getLocationHashtag(activeConversation.withUser.cidade, activeConversation.withUser.uf)}
                      </p>
                      <span className="text-[10px] text-stone-400">
                        {activeConversation.withUser.cidade} - {activeConversation.withUser.uf}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    Região {activeConversation.withUser.regiao}
                  </span>
                </div>

                {/* Messages stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/30 dark:bg-stone-950/20">
                  {activeConversation.messages.map(msg => {
                    const isMe = msg.senderId === currentUser.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-emerald-800 text-white rounded-br-none shadow-xs'
                              : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-bl-none shadow-xs'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span
                            className={`block text-[9px] mt-1 text-right ${
                              isMe ? 'text-emerald-200' : 'text-stone-400'
                            }`}
                          >
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Send Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-200 dark:border-stone-800 flex gap-2 bg-white dark:bg-stone-900">
                  <input
                    type="text"
                    placeholder={`Conversar com ${activeConversation.withUser.name.split(' ')[0]}...`}
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold disabled:opacity-40 transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-400 text-xs">
                Selecione uma conversa ao lado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
