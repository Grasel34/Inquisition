import { createContext, useState, useContext } from "react";

// Criar o contexto
const ComandaContext = createContext();

// Criar o provider
export const ComandaProvider = ({ children }) => {
  const [itensComanda, setItensComanda] = useState([]);

  const adicionarItem = (item) => {
    setItensComanda((prev) => [...prev, item]);
  };

  const limparComanda = () => {
    setItensComanda([]);
  };

  return (
    <ComandaContext.Provider value={{ itensComanda, adicionarItem, limparComanda }}>
      {children}
    </ComandaContext.Provider>
  );
};

// Criar um hook para usar fácil
export const useComanda = () => useContext(ComandaContext);
