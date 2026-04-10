import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import { LayoutGrid, PlusCircle, PieChart, Settings } from 'lucide-react';

function App() {
  const location = useLocation();
  
  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
          isActive 
            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
            : 'text-text-light hover:bg-primary-light hover:text-primary'
        }`}
      >
        <Icon size={20} />
        <span className="font-semibold">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-[var(--color-surface)]">
      <div className="cat-blob bg-pink-100 w-96 h-96 -top-20 -left-20"></div>
      <div className="cat-blob bg-purple-50 w-[500px] h-[500px] -bottom-20 -right-20"></div>

      <aside className="w-72 p-6 h-screen sticky top-0 hidden lg:flex flex-col bg-white/50 backdrop-blur-xl border-r border-pink-50">
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="bg-primary p-2 rounded-2xl rotate-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-800 uppercase">
            Nya<span className="text-primary italic">Shop</span>
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem to="/inventory" icon={LayoutGrid} label="Dashboard" />
          <NavItem to="/inventory/create" icon={PlusCircle} label="Add New" />
          <div className="pt-6 mt-6 border-t border-pink-100/50">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-pink-300 mb-4">Analytics</p>
            <NavItem to="#" icon={PieChart} label="Stats" />
            <NavItem to="#" icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="mt-auto p-4 bg-primary-light rounded-[2rem] relative overflow-hidden group">
          <div className="relative z-10">
             <p className="text-xs font-bold text-primary mb-1">Nya Premium</p>
             <p className="text-[10px] text-pink-400 leading-tight">Get more cat ears for your table!</p>
          </div>
          <div className="absolute -bottom-4 -right-4 text-primary/10 group-hover:scale-110 transition-transform">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden p-4 flex items-center justify-between glass-card sticky top-0 z-50">
           <span className="font-black text-primary italic">NYA</span>
           <div className="w-10 h-10 rounded-full bg-primary-light border-2 border-white"></div>
        </header>

        <main className="p-4 md:p-8 lg:p-12">
          <Routes>
            <Route path="/" element={<Navigate to="/inventory" replace />} />
            <Route path="/inventory" element={<AdminInventory />} />
            <Route path="/inventory/create" element={<AdminInventoryCreate />} />
            <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
            <Route path="/inventory/:id/edit" element={<AdminInventoryEdit />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
