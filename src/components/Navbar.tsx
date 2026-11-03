import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Settings, ShieldAlert, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { child } = useData();
  const location = useLocation();

  // Don't show app navbar on landing or full auth screens
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/cadastro' || location.pathname === '/onboarding') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <Link to="/app/mapa" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-sm shadow-brand-500/20">
            <Heart className="w-4 h-4 fill-white/80" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Mapa Alimentar</h1>
            <p className="text-[10px] font-semibold text-brand-600 uppercase tracking-wider flex items-center gap-1">
              <span>🇲🇽 México</span>
              <span>·</span>
              <span className="text-slate-500">{child.nickname || 'Mi hijo/a'}</span>
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {child.knownAllergies.length > 0 && (
            <div 
              title={`Filtro activo para: ${child.knownAllergies.join(', ')}`}
              className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-full border border-amber-200/60 font-medium"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[11px] hidden xs:inline">{child.knownAllergies.length} alérgenos</span>
            </div>
          )}

          <Link 
            to="/app/configuracoes" 
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Configuración"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
