import React, { useState } from 'react';
import { Heart, Eye, Image as ImageIcon } from 'lucide-react';

const InventoryCard = ({ item, isFavorite, onToggleFavorite, onQuickView }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(244,143,177,0.15)] transition-all duration-500 border border-pink-50/50 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-pink-50/30 flex items-center justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <ImageIcon size={40} className="text-pink-100" />
          </div>
        )}
        <img 
          src={item.photo || '/placeholder-image.png'} 
          alt={item.inventory_name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0 scale-95'}`}
        />
        
        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => onQuickView(item)}>
           <button 
             className="bg-white/90 backdrop-blur-sm text-primary p-3 rounded-2xl shadow-lg hover:scale-110 hover:bg-white transition-all transform translate-y-4 group-hover:translate-y-0"
           >
             <Eye size={24} />
           </button>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          className={`absolute top-4 right-4 p-2.5 rounded-full shadow-sm transition-all duration-300 hover:scale-110 z-10 ${
            isFavorite 
              ? 'bg-pink-100 text-pink-500 shadow-pink-100/50 backdrop-blur-md' 
              : 'bg-white/70 text-gray-400 hover:bg-white hover:text-pink-400 backdrop-blur-md'
          }`}
        >
          <Heart size={20} className={isFavorite ? "fill-current" : ""} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {item.inventory_name}
        </h3>
      </div>
    </div>
  );
};

export default InventoryCard;
