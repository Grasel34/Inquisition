import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCadastro = () => {
  const [modo, setModo] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const alternarModo = () => {
    setErro('');
    setModo(modo === 'login' ? 'cadastro' : 'login');
  };

  const enviarDados = async () => {
    setErro('');
    setLoading(true);

    try {
      const endpoint = modo === 'login' ? 'login' : 'register';
      const baseURL = import.meta.env.VITE_API_URL;

      const url = baseURL.endsWith('/api') ? `${baseURL}/${endpoint}` : `${baseURL}/api/${endpoint}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/perfil');
      } else {
        const { message } = await response.json();
        setErro(message || 'Erro ao autenticar.');
      }
    } catch (error) {
      console.error(error);
      setErro('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 text-white px-6 py-8">
      <div className="max-w-md mx-auto bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
        <h1 className="text-3xl font-extrabold text-center mb-4">
          {modo === 'login' ? '🔑 Login' : '📝 Cadastro'}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviarDados();
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-purple-200 text-purple-900"
            placeholder="E-mail"
            required
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-purple-200 text-purple-900"
            placeholder="Senha"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-full font-semibold"
            disabled={loading}
          >
            {loading ? 'Processando...' : modo === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <p className="text-center mt-6">
          {modo === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button onClick={alternarModo} className="underline text-purple-300 hover:text-white">
            {modo === 'login' ? 'Cadastre-se' : 'Fazer login'}
          </button>
        </p>

        {erro && <p className="text-red-400 text-center mt-4">{erro}</p>}
      </div>
    </div>
  );
};

export default LoginCadastro;
