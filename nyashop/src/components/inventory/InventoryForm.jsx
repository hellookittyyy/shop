import React, { useState, useEffect } from 'react';
import { Cat, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
const InventoryForm = ({ initialData, onSubmit, onCancel, title, isSubmitting }) => {
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
    <div className="bg-white rounded-[4rem] p-8 md:p-16 shadow-[0_64px_160px_rgba(244,143,177,0.12)] border border-pink-50/50 max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-700">
      <div className="flex items-center gap-6 mb-12">
        <div className="bg-primary/10 p-5 rounded-[2rem] text-primary transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
          <Cat size={40} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">{title}</h2>
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mt-2 opacity-60">Nya Form Entry System</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-3">
           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-300 px-4 flex items-center justify-between">
              Inventory Item Name
              {errors.inventory_name && <span className="text-red-400 normal-case flex items-center gap-1 font-bold"><AlertCircle size={14} /> {errors.inventory_name}</span>}
           </label>
           <input
             type="text"
             name="inventory_name"
             value={formData.inventory_name}
             onChange={handleChange}
             placeholder="e.g. Fluffy Paw Soap"
             className={`w-full px-8 py-6 rounded-[2.5rem] bg-pink-50/20 border-2 transition-all duration-300 outline-none text-gray-800 font-bold text-lg placeholder:text-pink-200/60 ${
               errors.inventory_name ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary/30 focus:bg-white focus:shadow-[0_0_0_8px_rgba(244,143,177,0.15)] ring-offset-4 ring-primary/20'
             }`}
           />
        </div>
        <div className="space-y-3">
           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-300 px-4">Detailed Description</label>
           <textarea
             name="description"
             value={formData.description}
             onChange={handleChange}
             rows="5"
             placeholder="Tell us everything about this item..."
             className="w-full px-8 py-6 rounded-[2.5rem] bg-pink-50/20 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:shadow-[0_0_0_8px_rgba(244,143,177,0.15)] transition-all duration-300 outline-none text-gray-800 font-medium leading-relaxed resize-none placeholder:text-pink-200/60"
           />
        </div>
        <div className="space-y-6">
           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-300 px-4">Kitten Visual (Photo)</label>
           <div className="flex flex-col md:flex-row items-center gap-10 bg-pink-50/30 p-8 rounded-[3.5rem] border border-pink-100/50">
             <div className="relative group overflow-hidden w-48 h-48 rounded-[3rem] bg-white flex items-center justify-center border-4 border-white shadow-2xl transition-transform duration-500 hover:scale-105">
               {preview ? (
                 <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               ) : (
                 <ImageIcon size={56} className="text-pink-100" />
               )}
               <input 
                 type="file" 
                 onChange={handleFileChange}
                 accept="image/*"
                 className="absolute inset-0 opacity-0 cursor-pointer z-10"
               />
               <div className="absolute inset-x-0 bottom-0 bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase py-3 text-center translate-y-full group-hover:translate-y-0 transition-all duration-500">Tap to Change</div>
             </div>
             <div className="flex-1 space-y-3 text-center md:text-left">
               <p className="text-lg font-black text-gray-800">Visual Identity</p>
               <p className="text-sm text-text-light leading-relaxed max-w-xs font-medium">Let everyone see how purr-fect this item is. Use a clear, high-quality image (Max 2MB).</p>
               <button 
                  type="button" 
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className="mt-2 text-xs font-black text-primary hover:text-primary-hover uppercase tracking-[0.2em] underline underline-offset-8 decoration-primary/30 transition-all"
               >
                  Browse Gallery
               </button>
             </div>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
           <button
             type="submit"
             disabled={isSubmitting}
             className="w-full sm:flex-1 bg-primary hover:bg-primary-hover text-white px-10 py-6 rounded-[2.5rem] font-black text-xl transition-all shadow-[0_20px_40px_rgba(244,143,177,0.3)] flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50 disabled:scale-100"
           >
             {isSubmitting ? (
               <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
             ) : (
               <>
                 <CheckCircle size={24} className="group-hover:scale-110 transition-transform duration-500" />
                 Save Collection
               </>
             )}
           </button>
           <button
             type="button"
             onClick={onCancel}
             className="w-full sm:w-auto px-12 py-6 rounded-[2.5rem] font-black text-xs text-text-light hover:text-gray-900 hover:bg-gray-100 transition-all uppercase tracking-[0.2em]"
           >
             Cancel
           </button>
        </div>
      </form>
    </div>
  );
};
export default InventoryForm;
