import React, { useState } from 'react';

// Produtos
import AguaImg from '../assets/Cardapio/Bebidas/Água.svg';
import CaipiraImg from '../assets/Cardapio/Bebidas/Caipira.svg';
import JackDanielImg from '../assets/Cardapio/Bebidas/JackDaniel.svg';
import KitAbsolutImg from '../assets/Cardapio/Bebidas/KitAbsolut.svg';
import KitNatashaImg from '../assets/Cardapio/Bebidas/KitNatasha.svg';
import SodaImg from '../assets/Cardapio/Bebidas/Soda.svg';

// Categorias
import DrinksIcon from '../assets/Cardapio/Drinks.svg';
import KitsIcon from '../assets/Cardapio/Kits.svg';
import SalcoolIcon from '../assets/Cardapio/Salcool.svg';
import VodkasIcon from '../assets/Cardapio/Vodkas.svg';
import WhiskysIcon from '../assets/Cardapio/Whiskys.svg';

// Contexto
import { useComanda, Item } from '../pages/ComandaContext';

interface Category {
  name: string;
  icon: string;
}

const categories: Category[] = [
  { name: "Drinks", icon: DrinksIcon },
  { name: "Kit's", icon: KitsIcon },
  { name: "S/ Álcool", icon: SalcoolIcon },
  { name: "Vodkas", icon: VodkasIcon },
  { name: "Whiskys", icon: WhiskysIcon }
];

const products: Item[] = [
  { name: "Caipirinha", image: CaipiraImg, price: 119, category: "Drinks" },
  { name: "Jack Daniel", image: JackDanielImg, price: 119, category: "Whiskys" },
  { name: "Kit Natasha", image: KitNatashaImg, price: 119, category: "Kit's" },
  { name: "Kit Absolute", image: KitAbsolutImg, price: 119, category: "Kit's" },
  { name: "Soda Italiana", image: SodaImg, price: 119, category: "S/ Álcool" },
  { name: "Água S/Gás", image: AguaImg, price: 119, category: "S/ Álcool" },
];

const Cardapio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const { adicionarItem } = useComanda();

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const filteredProducts = products.filter((product: Item) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-purple-950 p-4 text-white relative">

      {/* TOAST PROFISSIONAL */}
      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-lg border border-purple-400 text-sm font-medium flex items-center gap-2 transition-all duration-300 animate-fade-in-out z-50">
          <span className="text-green-400 text-lg">✅</span>
          {toastMessage}
        </div>
      )}

      {/* Barra de Pesquisa */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-full py-2 px-4 text-sm text-gray-800 bg-purple-200 placeholder-purple-500 focus:outline-none"
        />
        <button className="bg-gradient-to-r from-purple-600 to-blue-500 p-3 rounded-full">
          🔍
        </button>
      </div>

      <div className="flex flex-1 gap-4">
        {/* Categorias */}
        <aside className="flex flex-col space-y-4 mr-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat.name)}
              className={`focus:outline-none rounded-xl ${
                selectedCategory === cat.name ? 'ring-2 ring-white' : ''
              }`}
            >
              <img src={cat.icon} alt={`Categoria ${cat.name}`} className="w-28" />
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-2 text-sm text-purple-300 hover:text-white"
          >
            Ver todos
          </button>
        </aside>

        {/* Produtos */}
        <section className="grid grid-cols-2 gap-4 flex-1">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="relative bg-purple-900 rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-2 left-2 bg-purple-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                {product.name}
              </div>
              <div className="flex flex-col items-center justify-center bg-purple-800 p-2">
                <div className="text-base font-semibold mb-2">
                  {formatPrice(product.price)}
                </div>

                <button
                  onClick={() => {
                    adicionarItem(product);
                    showToast(`"${product.name}" adicionado à comanda`);
                  }}
                  className="px-6 py-1 text-sm font-bold rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition text-white shadow-lg"
                >
                  PEDIR
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Cardapio;
