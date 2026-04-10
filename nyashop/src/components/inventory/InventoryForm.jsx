import React, { useState, useEffect } from 'react';
import { Cat, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

const InventoryForm = ({ initialData, onSubmit, onCancel, title }) => {
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: ''
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        inventory_name: initialData.inventory_name || '',
        description: initialData.description || ''
      });
      if (initialData.photo) {
        setPreview(initialData.photo);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.inventory_name.trim()) {
      newErrors.inventory_name = 'Name is mandatory for a happy kitty!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      data.append('inventory_name', formData.inventory_name);
      data.append('description', formData.description);
      if (photo) {
        data.append('photo', photo);
      }
      onSubmit(data, formData, photo);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_32px_80px_rgba(244,143,177,0.1)] border border-pink-50/50 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-primary-light p-4 rounded-3xl text-primary transform -rotate-6">
          <Cat size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{title}</h2>
          <p className="text-text-light text-sm font-bold uppercase tracking-widest">Nya Form Entry</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
           <label className="text-xs font-black uppercase tracking-widest text-pink-300 px-2 flex items-center justify-between">
              Inventory Name
              {errors.inventory_name && <span className="text-red-400 normal-case flex items-center gap-1"><AlertCircle size={12} /> {errors.inventory_name}</span>}
           </label>
           <input
             type="text"
             name="inventory_name"
             value={formData.inventory_name}
             onChange={handleChange}
             placeholder="e.g. Fluffy Paw Soap"
             className={`w-full px-6 py-5 rounded-[1.5rem] bg-pink-50/30 border-2 transition-all outline-none text-gray-800 font-bold ${
               errors.inventory_name ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary focus:bg-white'
             }`}
           />
        </div>

        <div className="space-y-2">
           <label className="text-xs font-black uppercase tracking-widest text-pink-300 px-2">Description</label>
           <textarea
             name="description"
             value={formData.description}
             onChange={handleChange}
             rows="4"
             placeholder="Tell us everything about this item..."
             className="w-full px-6 py-5 rounded-[1.5rem] bg-pink-50/30 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none text-gray-800 font-medium leading-relaxed resize-none"
           />
        </div>

        <div className="space-y-4">
           <label className="text-xs font-black uppercase tracking-widest text-pink-300 px-2">Kitten Visual (Photo)</label>
           <div className="flex flex-col sm:flex-row items-center gap-6">
             <div className="relative group overflow-hidden w-40 h-40 rounded-[2.5rem] bg-pink-50/50 flex items-center justify-center border-4 border-white shadow-inner">
               {preview ? (
                 <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               ) : (
                 <ImageIcon size={48} className="text-pink-200" />
               )}
               <input 
                 type="file" 
                 onChange={handleFileChange}
                 accept="image/*"
                 className="absolute inset-0 opacity-0 cursor-pointer z-10"
               />
               <div className="absolute inset-x-0 bottom-0 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-black uppercase py-2 text-center translate-y-full group-hover:translate-y-0 transition-transform">Change</div>
             </div>
             <div className="flex-1 space-y-2 text-center sm:text-left">
               <p className="text-sm font-bold text-gray-700">Upload a cute photo</p>
               <p className="text-xs text-text-light leading-relaxed">Let everyone see how purr-fect this item is. (Max 2MB)</p>
               <button 
                  type="button" 
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className="mt-2 text-xs font-black text-primary hover:underline uppercase tracking-widest"
               >
                 Select File
               </button>
             </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
           <button
             type="submit"
             className="w-full sm:flex-1 bg-primary hover:bg-primary-hover text-white px-8 py-5 rounded-[1.5rem] font-black text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
           >
             <CheckCircle size={22} className="group-hover:scale-110 transition-transform" />
             Save Collection
           </button>
           <button
             type="button"
             onClick={onCancel}
             className="w-full sm:w-auto px-10 py-5 rounded-[1.5rem] font-bold text-text-light hover:bg-gray-100 transition-colors uppercase tracking-widest text-xs"
           >
             Cancel
           </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
