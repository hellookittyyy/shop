import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye, Cat } from 'lucide-react';
import { inventoryApi } from '../../services/inventoryApi';

const InventoryTable = ({ items, loading, error, onDeleteClick }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-light border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-primary">
            <Cat size={24} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-8 rounded-[2rem] text-center border-2 border-red-100/50">
        <p className="font-bold text-lg mb-2">Nya! Something went wrong.</p>
        <p className="opacity-70">{error}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white/50 backdrop-blur glass-card p-12 rounded-[3rem] text-center border-dashed border-2 border-pink-100">
        <img 
          src="/assets/cat-empty.png" 
          alt="Sleeping Cat" 
          className="w-48 h-48 mx-auto mb-6 opacity-60 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
        />
        <h3 className="text-2xl font-black text-gray-800 mb-2">The warehouse is purring...</h3>
        <p className="text-text-light max-w-xs mx-auto italic font-medium">It's so quiet even the cats are sleeping. Add some inventory to wake them up!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] shadow-[0_16px_48px_rgba(244,143,177,0.06)] overflow-hidden border border-pink-50/50">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 text-primary text-sm uppercase tracking-widest font-black">
              <th className="p-6">Thumbnail</th>
              <th className="p-6">Inventory Name</th>
              <th className="p-6 hidden md:table-cell">Product Details</th>
              <th className="p-6 w-32">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50/50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-primary-light/30 transition-all duration-300 group">
                <td className="p-6">
                  <div className="w-20 h-20 rounded-[2rem] overflow-hidden bg-pink-100/30 flex items-center justify-center border-4 border-white shadow-sm group-hover:rotate-3 transition-transform">
                    {item.photo ? (
                      <img 
                        src={inventoryApi.getPhotoUrl(item.photo)} 
                        alt={item.inventory_name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Cat size={24} className="text-pink-200" />
                    )}
                  </div>
                </td>
                <td className="p-6">
                   <div className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">{item.inventory_name}</div>
                   <div className="text-[10px] uppercase font-bold text-pink-300 tracking-tighter">SKU: NYA-{item.id}</div>
                </td>
                <td className="p-6 text-text-light text-sm hidden md:table-cell max-w-sm">
                  <p className="line-clamp-2 leading-relaxed italic">{item.description || 'No description provided for this kitty-item.'}</p>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-1">
                    <Link 
                      to={`/inventory/${item.id}`} 
                      className="w-10 h-10 flex items-center justify-center text-primary-hover hover:bg-white rounded-full transition-all shadow-sm hover:shadow-md"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link 
                      to={`/inventory/${item.id}/edit`} 
                      className="w-10 h-10 flex items-center justify-center text-blue-400 hover:bg-white rounded-full transition-all shadow-sm hover:shadow-md"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button 
                      onClick={() => onDeleteClick(item)}
                      className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-white rounded-full transition-all shadow-sm hover:shadow-md"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
