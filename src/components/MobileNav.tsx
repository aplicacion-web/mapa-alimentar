import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { User, Compass, Sparkles, Calendar, History } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  // Hide bottom nav on landing, auth, onboarding and paywall
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/cadastro' || location.pathname === '/onboarding' || location.pathname === '/bloqueado') {
    return null;
  }

  const navItems = [
    { to: '/app/perfil', label: 'Perfil', icon: User },
    { to: '/app/mapa', label: 'Mapa', icon: Compass },
    { to: '/app/alternativas', label: 'Alternativas', icon: Sparkles },
    { to: '/app/rotina', label: 'Rutina', icon: Calendar },
    { to: '/app/historico', label: 'Historial', icon: History }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-brand-700 font-semibold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-brand-50 text-brand-600' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-brand-700' : 'font-medium'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
