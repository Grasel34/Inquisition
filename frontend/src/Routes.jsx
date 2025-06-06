import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ModernLayout from "./components/ModernLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Cardapio from "./pages/Cardapio"; 
import Comanda from "./pages/Comanda";
import FinalizarCompra from "./pages/FinalizarCompra";
import FilaDigital from "./pages/FilaDigital";
import Chat from "./pages/Chat";
import Perfil from "./pages/Perfil";
import Escanear from "./pages/Escanear";
import LoginCadastro from "./pages/LoginCadastro";
import './index.css';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas as rotas agora compartilham o ModernLayout */}
        <Route element={<ModernLayout />}>
          <Route path="/" element={<Cardapio />} />
          <Route path="/comanda" element={<Comanda />} />
          <Route path="/finalizar" element={<ProtectedRoute element={<FinalizarCompra />} />} />
          <Route path="/fila-digital" element={<FilaDigital />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/perfil" element={<ProtectedRoute element={<Perfil />} />} />
          <Route path="/escanear" element={<Escanear />} />
          <Route path="/login" element={<LoginCadastro />} /> {/* MOVIDO PARA DENTRO */}
        </Route>

        {/* Rota padrão de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
