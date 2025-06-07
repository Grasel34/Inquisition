import { FC } from "react";
import { Link } from "react-router-dom";

interface Cliente {
  nome: string;
  posicao: number;
  status: string;
}

const clientes: Cliente[] = [
  { nome: "Cliente #1", posicao: 1, status: "Aguardando" },
  { nome: "Cliente #2", posicao: 2, status: "Preparando" },
  { nome: "Cliente #3", posicao: 3, status: "Pronto" }
];

const FilaDigital: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 text-white px-6 py-8">
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-wide">📋 Fila Digital</h1>
        <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:brightness-110 text-white font-semibold px-4 py-2 rounded-full shadow transition">
          + Adicionar Cliente
        </button>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white/5 backdrop-blur-md border border-purple-700 rounded-xl p-6 shadow-inner space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Fila de Espera</h2>

        {clientes.length === 0 ? (
          <p className="text-purple-300 italic">Nenhum cliente na fila no momento.</p>
        ) : (
          <ul className="space-y-3">
            {clientes.map((cliente, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white/10 border border-purple-500/30 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-semibold text-white">{cliente.nome}</p>
                  <p className="text-sm text-purple-300">Posição: {cliente.posicao}</p>
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  cliente.status === 'Pronto'
                    ? 'bg-green-500/80 text-white'
                    : cliente.status === 'Preparando'
                    ? 'bg-yellow-500/80 text-white'
                    : 'bg-purple-600/80 text-white'
                }`}>
                  {cliente.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Link adicional */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="text-sm text-purple-300 hover:text-white transition underline"
        >
          Voltar para o cardápio
        </Link>
      </div>
    </div>
  );
};

export default FilaDigital;
