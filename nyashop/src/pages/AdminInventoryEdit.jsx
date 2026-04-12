import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { inventoryApi } from '../services/inventoryApi';
import { InventoryContext } from '../hooks/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';
const AdminInventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshInventory } = useContext(InventoryContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryApi.getItem(id);
        setItem(data);
      } catch (err) {
        setError('Не вдалося завантажити дані для редагування');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (formData, rawData, photoFile) => {
    setIsSubmitting(true);
    try {
      await inventoryApi.updateItemText(id, rawData);
      if (photoFile) {
        const photoData = new FormData();
        photoData.append('photo', photoFile);
        await inventoryApi.updateItemPhoto(id, photoData);
      }
      refreshInventory();
      navigate(`/inventory/${id}`);
    } catch (err) {
      alert('Помилка при оновленні');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loading) return <div className="p-12 text-center text-primary font-bold animate-pulse">Scanning the warehouse...</div>;
  return (
    <div className="relative min-h-[calc(100vh-100px)] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="lg:absolute lg:top-0 lg:left-0 mb-8 lg:mb-0 flex flex-wrap gap-3">
        <button 
          onClick={() => navigate('/inventory')}
          className="group flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-md rounded-2xl text-primary hover:text-primary-hover font-black text-xs uppercase tracking-widest transition-all border border-pink-50/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Hub
        </button>
        <button 
          onClick={() => navigate(`/inventory/${id}`)}
          className="group flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-md rounded-2xl text-primary hover:text-primary-hover font-black text-xs uppercase tracking-widest transition-all border border-pink-50/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Profile
        </button>
      </div>
      <div className="max-w-4xl mx-auto pt-4 pb-12">
        <div className="space-y-6 mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100/50 backdrop-blur-sm">
             Modifying Records
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] px-4">
            Update <br />
            <span className="text-primary italic font-serif mt-2 block">{item?.inventory_name || 'Item'}.</span>
          </h1>
          <p className="text-text-light font-medium text-lg leading-relaxed max-w-md mx-auto px-4 opacity-80">
            Refine the details or change the visual identity of this charming product in your catalog.
          </p>
        </div>
        <InventoryForm 
          title="Edit Inventory"
          initialData={item}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/inventory/${id}`)}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
export default AdminInventoryEdit;
