import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Cat } from 'lucide-react';
import { inventoryApi } from '../services/inventoryApi';
const AdminInventoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryApi.getItem(id);
        setItem(data);
      } catch (err) {
        setError('Не вдалося завантажити деталі');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);
  if (loading) {
    return (
      <div className="flex justify-center p-20 animate-pulse">
        <div className="w-16 h-16 border-4 border-primary-light border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error || !item) {
    return (
      <div className="text-center p-12 text-red-500 bg-red-50 rounded-[3rem] border border-red-100 max-w-lg mx-auto mt-10">
        <h2 className="text-xl font-black uppercase tracking-widest">{error || 'Item Not Found'}</h2>
        <button onClick={() => navigate('/inventory')} className="mt-6 text-primary font-bold hover:underline">Return to collection</button>
      </div>
    );
  }
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
      <div className="max-w-5xl mx-auto pt-4 pb-12">
        <div className="mb-12 flex items-center justify-between px-4 lg:px-0">
          <div className="hidden lg:block"></div> { }
          <Link
            to={`/inventory/${item.id}/edit`}
            className="group inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-primary shadow-xl shadow-gray-200 hover:-translate-y-0.5"
          >
            <Pencil size={14} className="group-hover:rotate-12 transition-transform" /> Edit Item
          </Link>
        </div>
        <div className="bg-white rounded-[4rem] p-8 md:p-16 shadow-[0_64px_160px_rgba(244,143,177,0.15)] border border-pink-50/50 flex flex-col md:flex-row gap-12 md:gap-20 items-stretch relative overflow-hidden group">
          <div className="absolute top-10 right-10 text-primary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
            <Cat size={180} />
          </div>
          <div className="w-full md:w-5/12 shrink-0">
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-[4rem] overflow-hidden aspect-square border-8 border-white shadow-2xl relative">
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-primary text-[10px] font-black px-4 py-2 rounded-full shadow-sm z-10 uppercase tracking-widest border border-pink-50">
                Item ID: {item.id}
              </div>
              {item.photo ? (
                <img
                  src={inventoryApi.getPhotoUrl(item.photo)}
                  alt={item.inventory_name}
                  className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-pink-200">
                  <Cat size={80} strokeWidth={1} />
                  <p className="mt-4 font-bold text-xs uppercase tracking-widest">No Visual Record</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-7/12 py-6 relative z-10">
            <div className="inline-block px-5 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-green-100 shadow-sm">
              Fully Restocked
            </div>
            <h1 className="text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-none group-hover:text-primary transition-colors duration-500">
              {item.inventory_name}
            </h1>
            <div className="space-y-8">
              <div className="relative">
                <h3 className="text-xs font-black text-pink-300 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-pink-100"></span>
                  Product Story
                </h3>
                <p className="text-gray-600 leading-relaxed text-xl font-medium italic">
                  "{item.description || 'This item is waiting for its purr-fect description. It is currently silent in the warehouse, but vital to the collection.'}"
                </p>
              </div>
              <div className="pt-8 border-t border-pink-50 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-pink-200 uppercase tracking-widest mb-1">Stock Status</p>
                  <p className="text-lg font-bold text-gray-800">Healthy</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-pink-200 uppercase tracking-widest mb-1">Cat Rating</p>
                  <p className="text-lg font-bold text-gray-800">5.0 / 5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminInventoryDetails;
