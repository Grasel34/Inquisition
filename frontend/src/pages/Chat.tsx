import { FC } from "react";
import { Link } from "react-router-dom";

const Chat: FC = () => {
  return (
    <div className="p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Chat</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg focus:outline-none transition-all">
          Novo Chat
        </button>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Mensagens Recentes</h3>
        <p className="text-gray-600">Veja as últimas mensagens enviadas.</p>
        {/* Exemplo de lista de mensagens */}
        <ul>
          <li className="mb-2">Mensagem #1 - Cliente: "Olá, gostaria de saber o status do pedido"</li>
          <li className="mb-2">Mensagem #2 - Cliente: "Quando posso retirar meu pedido?"</li>
        </ul>
        <Link to="/chat" className="mt-4 inline-block text-purple-600 hover:underline">Ver mensagens</Link>
      </div>
    </div>
  );
};

export default Chat;
