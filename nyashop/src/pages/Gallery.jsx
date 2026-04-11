import React, { useEffect, useState } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';
import { useFavorites } from '../hooks/useFavorites';
import { Store } from 'lucide-react';
const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  useEffect(() => {
    const fetchItems = async () => {
      try {
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
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-100">
           <Store size={14} /> User Storefront
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
          NyaShop <br className="hidden md:block" />
          <span className="text-primary italic font-serif">Kitten Gallery.</span>
        </h1>
        <p className="text-text-light font-medium text-lg max-w-xl leading-relaxed">
          Browse our exclusive collection of cute and purr-fect items. Add them to your favorites so you never lose them!
        </p>
      </div>
      <InventoryGallery 
        items={items}
        loading={loading}
        error={error}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};
export default Gallery;
