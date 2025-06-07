import { createContext, useState, useContext, ReactNode } from 'react';

export interface Item {
  name: string;
  image?: string;
  price: number;
  category: string;
}

interface ComandaContextType {
  itensComanda: Item[];
  adicionarItem: (item: Item) => void;
  limparComanda: () => void;
}

// Criar o contexto
const ComandaContext = createContext<ComandaContextType | undefined>(undefined);

// Criar o provider
export const ComandaProvider = ({ children }: { children: ReactNode }) => {
  const [itensComanda, setItensComanda] = useState<Item[]>([]);

  const adicionarItem = (item: Item) => {
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
export const useComanda = () =>
  useContext(ComandaContext) as ComandaContextType;
