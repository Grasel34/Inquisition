import { createContext, useState, useContext, ReactNode } from "react";
import { ComandaItem } from "../types/ComandaItem";

interface ComandaContextProps {
  itensComanda: ComandaItem[];
  adicionarItem: (item: ComandaItem) => void;
  limparComanda: () => void;
}

// Criar o contexto
const ComandaContext = createContext<ComandaContextProps | undefined>(undefined);

// Criar o provider
export const ComandaProvider = ({ children }: { children: ReactNode }) => {
  const [itensComanda, setItensComanda] = useState<ComandaItem[]>([]);

  const adicionarItem = (item: ComandaItem) => {
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
export const useComanda = () => {
  const context = useContext(ComandaContext);
  if (!context) {
    throw new Error("useComanda must be used within a ComandaProvider");
  }
  return context;
};
