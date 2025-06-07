import React from 'react';
import { useComanda } from './ComandaContext';
import { ComandaItem } from '../types/ComandaItem';
import { useNavigate } from 'react-router-dom';

const Comanda = () => {
  const { itensComanda, limparComanda } = useComanda();
  const navigate = useNavigate();

  const total = itensComanda.reduce((acc: number, item: ComandaItem) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 text-white px-5 py-6 flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-wide">🧾 Minha Comanda</h1>
        {itensComanda.length > 0 && (
          <button
            onClick={limparComanda}
            className="bg-red-500 hover:bg-red-600 transition text-white text-sm px-4 py-2 rounded-full shadow-sm"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Lista de itens */}
      <div className="flex-1 overflow-y-auto bg-white/5 rounded-xl border border-purple-700 shadow-inner p-4 space-y-4">
        {itensComanda.length === 0 ? (
          <p className="text-center text-purple-300 italic">Sua comanda está vazia.</p>
        ) : (
          itensComanda.map((item: ComandaItem, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/10 p-4 rounded-lg border border-purple-600/40 shadow-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium text-white text-base">{item.name}</span>
                <span className="text-sm text-purple-300">{item.category}</span>
              </div>
              <span className="text-white font-semibold text-base">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Total e botão */}
      {itensComanda.length > 0 && (
        <>
          <div className="mt-6 bg-purple-800/70 backdrop-blur rounded-xl py-4 px-6 text-center shadow-lg border border-purple-600">
            <p className="text-sm text-purple-300">Total a pagar</p>
            <p className="text-2xl font-bold text-white">R$ {total.toFixed(2)}</p>
          </div>

          <div className="mt-5">
            <button
              onClick={() => navigate('/finalizar')}
              className="w-full py-3 text-base font-semibold bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 rounded-full shadow transition"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comanda;
