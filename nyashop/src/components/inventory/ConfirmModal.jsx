import React from 'react';
import { AlertTriangle, Cat, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] p-10 shadow-[0_24px_120px_rgba(0,0,0,0.25)] border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500 group">
        
        <div className="absolute top-0 right-0 p-8 text-pink-50 opacity-10 group-hover:opacity-20 transition-opacity">
          <Cat size={200} />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-all hover:rotate-90"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 bg-red-50 p-6 rounded-[2.5rem] text-red-400 transform hover:scale-110 transition-transform">
            <AlertTriangle size={48} />
          </div>

          <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">{title}</h3>
          
          <p className="text-gray-500 font-medium mb-10 text-lg sm:px-4 leading-relaxed italic">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <button
              onClick={onConfirm}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-8 py-5 rounded-[1.75rem] font-black text-lg transition-all shadow-xl shadow-red-200 active:scale-95"
            >
              Confirm Removal
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-10 py-5 rounded-[1.75rem] font-bold text-text-light hover:bg-gray-100 transition-colors uppercase tracking-widest text-xs"
            >
              Keep Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
