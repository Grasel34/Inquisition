import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PerfilResponse, User } from '../types/api';

const Perfil = () => {
  const [nome, setNome] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [editando, setEditando] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data: PerfilResponse = await res.json();
          setUser(data.user);
          setNome(data.user.nome || '');
          setTelefone(data.user.telefone || '');
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Erro ao carregar usuário', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const salvarPerfil = async () => {
    if (!nome || !telefone) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, telefone }),
      });

      if (res.ok) {
        const { user: updated } = (await res.json()) as PerfilResponse;
        setUser(updated);
        setMensagem('Perfil atualizado com sucesso!');
        setEditando(false);
      } else {
        setMensagem('Erro ao atualizar perfil.');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  const fazerLogout = async () => {
    // Você pode criar um endpoint /logout no backend
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-900 text-white">
        Carregando perfil...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-purple-900 text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Você precisa estar logado para acessar o perfil</h2>
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 text-white px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide">👤 Meu Perfil</h1>
          <p className="text-sm text-purple-300 mt-1">
            {user.email || 'Usuário autenticado'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => (editando ? setEditando(false) : setEditando(true))}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:brightness-110 text-white px-4 py-2 rounded-full shadow transition"
          >
            {editando ? 'Cancelar' : 'Editar'}
          </button>
          <button
            onClick={fazerLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow transition"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-purple-600 rounded-xl p-6 shadow-inner space-y-4 max-w-xl mx-auto">
        <div>
          <label className="block text-sm text-purple-300 mb-1">Nome</label>
          {editando ? (
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 rounded bg-purple-200 text-purple-900 text-sm focus:outline-none"
            />
          ) : (
            <p className="text-lg font-semibold text-white">{nome || '—'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-purple-300 mb-1">Telefone</label>
          {editando ? (
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-2 rounded bg-purple-200 text-purple-900 text-sm focus:outline-none"
            />
          ) : (
            <p className="text-lg font-semibold text-white">{telefone || '—'}</p>
          )}
        </div>

        {editando && (
          <button
            onClick={salvarPerfil}
            className="w-full mt-4 bg-purple-700 hover:bg-purple-800 transition text-white py-2 rounded-full font-semibold"
          >
            Salvar Perfil
          </button>
        )}

        {mensagem && (
          <div className="mt-4 text-center text-white bg-purple-600 p-2 rounded-lg">
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
