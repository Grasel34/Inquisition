import React, { useEffect, useState } from 'react';
import { useComanda } from './ComandaContext';
import { ComandaItem } from '../types/ComandaItem';
import { useNavigate } from 'react-router-dom';

const FinalizarCompra = () => {
  const { itensComanda, limparComanda } = useComanda();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          navigate('/login');
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    verificarLogin();
  }, [navigate]);

  const total = itensComanda.reduce((acc: number, item: ComandaItem) => acc + item.price, 0);

  const finalizarPedido = () => {
    alert('✅ Pedido finalizado com sucesso!');
    limparComanda();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-900 text-white">
        Verificando acesso...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 text-white px-6 py-8 flex flex-col">
      {/* Título */}
      <h1 className="text-3xl font-extrabold tracking-wide mb-6">🛒 Finalizar Pedido</h1>

      {/* Lista de Produtos */}
      <div className="bg-white/5 border border-purple-700 rounded-xl p-5 shadow-inner max-h-[60vh] overflow-y-auto space-y-4 backdrop-blur-md">
        {itensComanda.length === 0 ? (
          <p className="text-center text-purple-300 italic">Sua comanda está vazia.</p>
        ) : (
          itensComanda.map((item: ComandaItem, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/10 border border-purple-600/40 rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-white font-semibold text-base">{item.name}</p>
                <p className="text-sm text-purple-300">{item.category}</p>
              </div>
              <span className="text-white font-semibold">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      {itensComanda.length > 0 && (
        <div className="mt-6 bg-purple-800 border border-purple-600 rounded-xl py-5 px-6 text-center shadow-lg">
          <p className="text-sm text-purple-300">Total a pagar</p>
          <p className="text-2xl font-bold text-white">R$ {total.toFixed(2)}</p>
        </div>
      )}

      {/* Ações */}
      <div className="mt-8 flex flex-col gap-4">
        <button
          onClick={finalizarPedido}
          disabled={itensComanda.length === 0}
          className="bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white text-lg font-semibold py-3 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Finalizar Pedido
        </button>

        {itensComanda.length > 0 && (
          <button
            onClick={limparComanda}
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-full font-medium shadow-md transition"
          >
            Cancelar e Limpar
          </button>
        )}
      </div>
    </div>
  );
};

export default FinalizarCompra;
