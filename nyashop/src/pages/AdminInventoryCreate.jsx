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
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="mb-10 flex items-center justify-between">
        <button 
          onClick={() => navigate('/inventory')}
          className="group inline-flex items-center gap-2 text-primary hover:text-primary-hover font-black text-xs uppercase tracking-widest transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Dashboard
        </button>
      </div>

      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
          New Acquisition
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-tight">
          Register <br />
          <span className="text-primary italic font-serif">Kitten Item.</span>
        </h1>
        <p className="text-text-light font-medium text-lg leading-relaxed max-w-md">Add a new charming addition to your warehouse pride. Make sure to include a cute picture!</p>
      </div>

      <InventoryForm 
        title="Product Details"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/inventory')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminInventoryCreate;
