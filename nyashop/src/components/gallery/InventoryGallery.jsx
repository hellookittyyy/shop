import React, { useState } from 'react';
import InventoryCard from './InventoryCard';
import InventoryQuickView from './InventoryQuickView';
import { Cat } from 'lucide-react';
const InventoryGallery = ({ items, loading, error, favorites, toggleFavorite, emptyTitle = "No kitties here!", emptyDesc = "The inventory is currently empty." }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  if (error) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-red-100 mt-8">
         <div className="bg-red-50 p-6 rounded-full text-red-400">
           <Cat size={48} />
         </div>
         <div>
           <p className="font-black text-2xl text-gray-800">Meow-ch!</p>
           <p className="text-red-400 mt-2 font-medium">Something went wrong fetching the data.</p>
         </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white/50 backdrop-blur-sm rounded-3xl aspect-[4/5] animate-pulse border border-pink-50/50 flex flex-col overflow-hidden">
             <div className="w-full aspect-square bg-pink-100/50"></div>
             <div className="p-5 space-y-3">
               <div className="h-4 bg-pink-100/50 rounded-full w-3/4"></div>
               <div className="h-4 bg-pink-100/50 rounded-full w-1/2"></div>
             </div>
          </div>
        ))}
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-pink-50 border-dashed mt-8">
        <div className="bg-primary-light p-6 rounded-3xl text-primary transform -rotate-12">
          <Cat size={48} />
        </div>
        <div>
          <h3 className="text-3xl font-black text-gray-800 tracking-tight">{emptyTitle}</h3>
          <p className="text-text-light mt-2 font-medium text-lg">{emptyDesc}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
        {items.map(item => (
          <InventoryCard 
            key={item.id} 
            item={item} 
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={toggleFavorite}
            onQuickView={setSelectedItem}
          />
        ))}
      </div>
      <InventoryQuickView 
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        isFavorite={selectedItem ? favorites.includes(selectedItem.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
};
export default InventoryGallery;
