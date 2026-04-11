import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, TrendingUp, Users } from 'lucide-react';
import { InventoryContext } from '../hooks/InventoryContext';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';
const AdminInventory = () => {
  const { items, loading, error, refreshInventory } = useContext(InventoryContext);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const handleDeleteClick = (item) => {
    setDeleteModal({ isOpen: true, item });
  };
  const confirmDelete = async () => {
    try {
      await inventoryApi.deleteItem(deleteModal.item.id);
      refreshInventory();
    } catch (err) {
      console.error('Failed to delete item', err);
    } finally {
      setDeleteModal({ isOpen: false, item: null });
    }
  };
  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`p-6 rounded-[2.5rem] bg-white border border-pink-50 flex items-center gap-4 group hover:shadow-xl transition-all duration-500`}>
      <div className={`p-4 rounded-3xl ${color} text-white group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xl font-black text-gray-800 tracking-tighter">{value}</p>
        <p className="text-xs font-bold text-text-light uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-light text-primary rounded-full text-xs font-black uppercase tracking-widest mb-2 border border-primary/10">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Nya Central Hub
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">
            Warehouse <br />
            <span className="text-primary italic font-serif">Inventory.</span>
          </h1>
          <p className="text-text-light font-medium text-lg max-w-sm">Manage your collections with feline precision.</p>
        </div>
        <Link 
          to="/inventory/create" 
          className="group relative inline-flex items-center gap-3 bg-gray-950 text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-400 overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Plus size={24} className="relative z-10" />
          <span className="relative z-10">Restock Catnip</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={Package} label="Total Kitties" value={items.length} color="bg-primary" />
        <StatCard icon={TrendingUp} label="Happiness Index" value="98.4%" color="bg-blue-400" />
        <StatCard icon={Users} label="Daily Visitors" value="1,204" color="bg-indigo-400" />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-2xl font-black text-gray-800 tracking-tighter flex items-center gap-3">
             Active Collection
             <span className="text-sm font-bold bg-pink-50 text-primary px-3 py-1 rounded-full">{items.length}</span>
           </h3>
           <button className="text-sm font-bold text-primary hover:underline">View Categories</button>
        </div>
        <InventoryTable 
          items={items} 
          loading={loading} 
          error={error} 
          onDeleteClick={handleDeleteClick} 
        />
      </div>
      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Banish from Pride?"
        message={`Are you absolutely sure you want to remove "${deleteModal.item?.inventory_name}" from the inventory? This can't be undone.`}
      />
    </div>
  );
};
export default AdminInventory;
