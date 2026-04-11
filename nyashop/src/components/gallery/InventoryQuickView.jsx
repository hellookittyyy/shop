import React, { useEffect } from 'react';
import { X, Heart, Image as ImageIcon } from 'lucide-react';
const InventoryQuickView = ({ item, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);
  if (!isOpen || !item) return null;
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] animate-in fade-in duration-300" 
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[110] shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-500 sm:rounded-l-[2rem]">
        <div className="p-6 flex items-center justify-between border-b border-pink-50">
           <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Nya Details</h2>
           <button onClick={onClose} className="p-2 text-gray-400 hover:bg-pink-50 hover:text-primary rounded-xl transition-colors">
              <X size={24} />
           </button>
        </div>
        <div className="flex-1 overflow-y-auto">
           <div className="aspect-square relative bg-pink-50/50 w-full flex items-center justify-center p-6">
             {item.photo ? (
               <img src={item.photo} alt={item.inventory_name} className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
             ) : (
               <ImageIcon size={64} className="text-pink-200" />
             )}
           </div>
           <div className="p-8 space-y-6">
             <div className="space-y-4">
               <div className="flex items-start justify-between gap-4">
                 <h1 className="text-3xl font-black text-gray-900 leading-tight">{item.inventory_name}</h1>
                 <button 
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-3 rounded-2xl transition-all shadow-sm shrink-0 hover:scale-105 ${isFavorite ? 'bg-pink-100 text-pink-500 shadow-pink-100' : 'bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-400'}`}
                 >
                    <Heart size={24} className={isFavorite ? "fill-current" : ""} />
                 </button>
               </div>
               <div className="inline-block px-4 py-1.5 bg-primary-light text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                 Item ID: #{item.id}
               </div>
             </div>
             <div className="bg-pink-50/30 p-6 rounded-3xl border border-pink-100/50 mt-8">
               <h3 className="text-xs font-black uppercase tracking-widest text-pink-400 mb-3">Item Description</h3>
               <p className="text-gray-700 leading-relaxed font-medium">
                 {item.description || "No description provided for this purr-fect item."}
               </p>
             </div>
           </div>
        </div>
        <div className="p-6 border-t border-pink-50 bg-white">
           <button onClick={onClose} className="w-full py-5 bg-primary text-white font-black text-lg rounded-[1.5rem] shadow-lg shadow-primary/20 hover:bg-primary-hover hover:-translate-y-1 transition-all uppercase tracking-widest text-sm">
             Close Panel
           </button>
        </div>
      </div>
    </>
  );
};
export default InventoryQuickView;
