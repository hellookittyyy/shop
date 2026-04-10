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

  const handleSubmit = async (formData, rawData, photoFile) => {
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
    }
  };

  if (loading) return <div className="p-12 text-center text-primary font-bold animate-pulse">Scanning the warehouse...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="mb-10 flex items-center justify-between">
        <button 
          onClick={() => navigate(`/inventory/${id}`)}
          className="group inline-flex items-center gap-2 text-primary hover:text-primary-hover font-black text-xs uppercase tracking-widest transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Profile
        </button>
      </div>

      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
          Modifying Records
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-tight">
          Update <br />
          <span className="text-primary italic font-serif">{item?.inventory_name || 'Item'}.</span>
        </h1>
        <p className="text-text-light font-medium text-lg leading-relaxed max-w-md">Refine the details or change the visual identity of this product.</p>
      </div>

      <InventoryForm 
        title="Edit Inventory"
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/inventory/${id}`)}
      />
    </div>
  );
};

export default AdminInventoryEdit;
