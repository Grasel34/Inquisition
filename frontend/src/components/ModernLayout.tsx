import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ComandaIcon from '../assets/Comanda.svg'; 
import FilaIcon from '../assets/Fila Digital.svg';
import PerfilIcon from '../assets/Perfil.svg';
import CardapioIcon from '../assets/Cardapio.svg';
import ChatIcon from '../assets/Chat.svg';
import VortexLogo from '../assets/VortexLetra.png';

// Tamanho base dos containers (como estava antes)
const ICON_SIZE = 56; // px

// Configurações individuais
interface NavItemConfig {
  icon: string;
  normal: string;
  hover: string;
  active: string;
}

const navConfig: Record<string, NavItemConfig> = {
  "/": {
    icon: CardapioIcon,
    normal: "scale-100",
    hover: "hover:scale-110",
    active: "scale-110",
  },
  "/comanda": {
    icon: ComandaIcon,
    normal: "scale-100",
    hover: "hover:scale-110",
    active: "scale-110",
  },
  "/fila-digital": {
    icon: FilaIcon,
    normal: "scale-120", // Fila maior
    hover: "hover:scale-125", // Corrigido para valor válido
    active: "scale-125",
  },
  "/chat": {
    icon: ChatIcon,
    normal: "scale-98",
    hover: "hover:scale-110",
    active: "scale-110",
  },
  "/perfil": {
    icon: PerfilIcon,
    normal: "scale-95",
    hover: "hover:scale-110",
    active: "scale-110",
  }
};

const ModernLayout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-purple-950 text-white">
      
      {/* Header com Logo */}
      <header className="py-6 flex justify-center">
        <img src={VortexLogo} alt="Vortex Logo" className="h-16" />
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-6 py-4 overflow-y-auto animate-fade-in">
        <Outlet />
      </main>

      {/* Footer - Navegação */}
      <footer className="bg-purple-900 rounded-t-3xl py-2 shadow-inner">
        <nav className="flex justify-around items-center">
          {Object.entries(navConfig).map(([path, config]) => (
            <NavItem key={path} to={path} {...config} />
          ))}
        </nav>
      </footer>
    </div>
  );
};

interface NavItemProps extends NavItemConfig {
  to: string;
}

const NavItem: FC<NavItemProps> = ({ to, icon, normal, hover, active }) => (
  <NavLink
    to={to}
    className={({ isActive }) => {
      const baseClasses = "flex flex-col items-center justify-center transition-transform duration-200";
      const activeClass = isActive ? active : normal;
      return `${baseClasses} ${activeClass} ${hover}`;
    }}
  >
    <div 
      className="flex items-center justify-center"
      style={{ width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px` }}
    >
      <img 
        src={icon} 
        alt="Ícone"
        className="object-contain w-full h-full"
      />
    </div>
  </NavLink>
);

export default ModernLayout;
