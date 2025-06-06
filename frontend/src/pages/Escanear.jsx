import { Link } from "react-router-dom";

const Escanear = () => {
  return (
    <div>
      <h1>📷 Escanear QR Code</h1>
      <p>Posicione o QR Code na câmera</p>
      <button>Escanear</button>
      <nav className="navbar">
        <Link to="/">🏠 Início</Link>
        <Link to="/fila-digital">📊 Fila Digital</Link>
        <Link to="/chat">💬 Chat</Link>
        <Link to="/perfil">👤 Perfil</Link>
      </nav>
    </div>
  );
};

export default Escanear;
