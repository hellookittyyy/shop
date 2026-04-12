import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventoryContext } from '../hooks/InventoryContext';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';
import { ArrowLeft } from 'lucide-react';
const AdminInventoryCreate = () => {
  const navigate = useNavigate();
  const { refreshInventory } = useContext(InventoryContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (formData, rawData, photoFile) => {
    setIsSubmitting(true);
    try {
      await inventoryApi.createItem(formData);
      refreshInventory();
      navigate('/inventory');
    } catch (error) {
      console.error('Failed to create item', error);
      alert(error.response?.data?.message || 'Помилка при створенні');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative min-h-[calc(100vh-100px)] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="lg:absolute lg:top-0 lg:left-0 mb-8 lg:mb-0">
        <button 
          onClick={() => navigate('/inventory')}
          className="group flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-md rounded-2xl text-primary hover:text-primary-hover font-black text-xs uppercase tracking-widest transition-all border border-pink-50/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Hub
        </button>
      </div>
      <div className="max-w-4xl mx-auto pt-4 pb-12">
        <div className="space-y-6 mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50/50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100/50 backdrop-blur-sm">
            New Acquisition
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] px-4">
            Register <br />
            <span className="text-primary italic font-serif mt-2 block">Kitten Item.</span>
          </h1>
          <p className="text-text-light font-medium text-lg leading-relaxed max-w-md mx-auto px-4 opacity-80">
            Add a new charming addition to your warehouse pride. Make sure to include a cute picture!
          </p>
        </div>
        <InventoryForm 
          title="Product Details"
          onSubmit={handleSubmit}
          onCancel={() => navigate('/inventory')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
export default AdminInventoryCreate;
