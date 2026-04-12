import React, { useEffect, useState } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';
import { useFavorites } from '../hooks/useFavorites';
import { Heart } from 'lucide-react';
const Favorites = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await inventoryApi.getInventory();
        setItems(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);
  const favoriteItems = items.filter(item => favorites.includes(item.id));
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-pink-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-100">
           <Heart size={14} className="fill-current" /> Your Collection
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
          Saved <br className="hidden md:block" />
          <span className="text-pink-400 italic font-serif">Favorites.</span>
        </h1>
        <p className="text-text-light font-medium text-lg max-w-xl leading-relaxed">
          All the items you've sprinkled with love. Keep them safe here!
        </p>
      </div>
      <InventoryGallery 
        items={favoriteItems}
        loading={loading}
        error={error}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        emptyTitle="No favorites yet!"
        emptyDesc="Go to the Gallery and click the heart icon on items you love."
      />
    </div>
  );
};
export default Favorites;
