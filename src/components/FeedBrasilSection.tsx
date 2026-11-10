import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuração de conexão com o seu Supabase
const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL || "SUA_URL_DO_SUPABASE";
const SUPABASE_ANON_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || "SUA_CHAVE_ANON_DO_SUPABASE";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function FeedBrasilSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState('Brasil');
  const [novoPost, setNovoPost] = useState('');
  const [menuRegioesAberto, setMenuRegioesAberto] = useState(false);
  
  // Estado para guardar as informações do usuário real que fez login
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  // Mapeamento dos estados brasileiros por macrorregião para o filtro do Nós BR
  const regioesEstados: Record<string, string[]> = {
    'Sudeste': ['SP', 'RJ', 'MG', 'ES'],
    'Nordeste': ['BA', 'PE', 'CE', 'RN', 'PB', 'AL', 'SE', 'PI', 'MA'],
    'Sul': ['PR', 'SC', 'RS'],
    'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
    'Norte': ['AM', 'PA', 'RO', 'RR', 'AC', 'TO', 'AP']
  };

  // Função para buscar as informações do usuário real logado
  async function obterPerfilUsuario() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: perfil } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (perfil) {
          setUsuarioLogado(perfil);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar perfil real:', error);
    }
  }

  // Função que busca e filtra as postagens direto do Supabase
  async function carregarPosts() {
    try {
      setLoading(true);
      
      let query = supabase
        .from('posts')
        .select(`
          id,
          conteudo,
          imagem_url,
          created_at,
          profiles (
            username,
            estado_uf
          )
        `)
        .order('created_at', { ascending: false });

      if (regiaoSelecionada !== 'Brasil' && regioesEstados[regiaoSelecionada]) {
        query = query.in('profiles.estado_uf', regioesEstados[regiaoSelecionada]);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao carregar o feed do Nós BR:', error);
    } finally {
      setLoading(false);
    }
  }

  // Carrega o perfil do usuário e os posts assim que a tela abre
  useEffect(() => {
    obterPerfilUsuario();
    carregarPosts();
  }, [regiaoSelecionada]);

  // Função para o usuário enviar uma nova postagem
  async function criarPostagem(e: React.FormEvent) {
    e.preventDefault();
    if (!novoPost.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Você precisa estar logado para publicar no Nós BR!');
        return;
      }

      const { error } = await supabase
        .from('posts')
        .insert([
          { user_id: user.id, conteudo: novoPost }
        ]);

      if (error) throw error;

      setNovoPost('');
      carregarPosts();
    } catch (error: any) {
      alert('Erro ao publicar: ' + error.message);
    }
  }

  return (
    <div style={{ background: '#1c1614', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Topo do Aplicativo */}
      <header style={{ padding: '15px', borderBottom: '1px solid #332621', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Nós BR</h2>
        <button 
          onClick={() => setMenuRegioesAberto(true)}
          style={{ background: '#00a86b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}
        >
          📍 {regiaoSelecionada === 'Brasil' ? 'Brasil Inteiro' : `Região ${regiaoSelecionada}`}
        </button>
      </header>

      {/* Caixa de Texto para Criar Nova Publicação */}
      <section style={{ padding: '15px', borderBottom: '1px solid #332621' }}>
        <form onSubmit={criarPostagem}>
          <textarea
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
            placeholder="O que está acontecendo no seu estado? Compartilhe no Nós BR..."
            style={{ width: '100%', minHeight: '80px', background: '#2c201c', color: '#fff', border: '1px solid #44322b', borderRadius: '8px', padding: '10px', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
            <button type="submit" style={{ background: '#00a86b', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
              Publicar
            </button>
          </div>
        </form>
      </section>

      {/* Linha do Tempo (Feed de Postagens) */}
      <main style={{ padding: '15px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>Carregando conexões regionais...</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>Nenhuma publicação encontrada nesta região ainda.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{ background: '#2c201c', borderRadius: '12px', padding: '15px', marginBottom: '15px', border: '1px solid #332621' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#44322b', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  {/* Puxa dinamicamente o username real e o estado real salvos no Supabase */}
                  <h4 style={{ margin: 0 }}>{post.profiles?.username || 'Usuário Nós BR'}</h4>
                  <span style={{ color: '#00a86b', fontSize: '12px', fontWeight: 'bold' }}>
                    #NósNo{post.profiles?.estado_uf || 'BR'}
                  </span>
                </div>
              </div>
              <p style={{ margin: '10px 0', lineHeight: '1.4' }}>{post.conteudo}</p>
              {post.imagem_url && (
                <img src={post.imagem_url} alt="Post" style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }} />
              )}
              <small style={{ color: '#aaa', fontSize: '11px' }}>
                {new Date(post.created_at).toLocaleDateString('pt-BR')}
              </small>
            </div>
          ))
        )}
      </main>

      {/* Menu de Conexões por Região */}
      {menuRegioesAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', color: '#000', width: '90%', maxWidth: '450px', borderRadius: '20px', padding: '20px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#1c1614' }}>Conexões por Região do Brasil</h3>
              <button onClick={() => setMenuRegioesAberto(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
            </div>
            
            <p style={{ fontSize: '13px', color: '#666', margin: '15px 0' }}>
              O <b>Nós BR</b> conecta o país de ponta a ponta. Escolha ver iniciativas de todo o Brasil ou filtre por uma das macrorregiões:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Brasil', 'Sudeste', 'Nordeste', 'Sul', 'Centro-Oeste', 'Norte'].map((regiao) => (
                <button
                  key={regiao}
                  onClick={() => {
                    setRegiaoSelecionada(regiao);
                    setMenuRegioesAberto(false);
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: regiaoSelecionada === regiao ? '2px solid #00a86b' : '1px solid #ddd',
                    background: regiaoSelecionada === regiao ? '#f0fdf4' : '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: regiaoSelecionada === regiao ? 'bold' : 'normal'
                  }}
                >
                  {regiao === 'Brasil' ? '🇧🇷 Brasil Inteiro (Nacional)' : `📍 Região ${regiao}`}
                  <span style={{ display: 'block', fontSize: '11px', color: '#888', marginTop: '2px' }}>
                    {regiao === 'Brasil' ? 'Todos os Estados e conexões sem filtros.' : `Filtro ativo para: ${regioesEstados[regiao].join(', ')}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
