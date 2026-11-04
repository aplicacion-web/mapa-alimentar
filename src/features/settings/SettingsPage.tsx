import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Trash2, LogOut, Download, Check, AlertTriangle, RefreshCw, Heart } from 'lucide-react';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';
import { InstallAppButton } from '../../components/InstallAppButton';

export const SettingsPage: React.FC = () => {
  const { user, logout, deleteAccount } = useAuth();
  const { child, sensoryPreferences, childFoods, resetAll } = useData();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExportJson = () => {
    const backup = {
      user,
      child,
      sensoryPreferences,
      childFoods,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mapa_alimentar_datos_${child.nickname.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteEverything = async () => {
    await deleteAccount();
    resetAll();
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-24 text-xs">
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Configuración y Privacidad</h2>
        <p className="text-slate-500">
          Control absoluto de los datos y privacidad familiar.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Cuenta del responsable</h3>
        <div className="space-y-1.5 text-slate-600">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Nombre / Titular:</span>
            <span className="font-semibold text-slate-800">{user?.name || 'Responsable'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Correo registrado:</span>
            <span className="font-semibold text-slate-800">{user?.email}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Región e Idioma:</span>
            <span className="font-semibold text-slate-800">Español</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Consentimiento:</span>
            <span className="font-semibold text-emerald-700">Aceptado y activo</span>
          </div>
        </div>
      </div>

      {/* PWA Install Card */}
      <InstallAppButton />

      {/* Data Sovereignty & Export */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-sm">Portabilidad y Respaldo</h3>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Tus datos pertenecen a tu familia. Puedes descargar una copia de todos los registros alimentarios y preferencias de {child.nickname} en cualquier momento.
        </p>
        <button
          onClick={handleExportJson}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Descargar archivo de datos (JSON)</span>
        </button>
      </div>

      {/* Danger Zone: Account Deletion */}
      <div className="bg-rose-50/60 rounded-3xl p-4 border border-rose-200/80 space-y-3">
        <div className="flex items-center gap-2 text-rose-800 font-bold">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>Eliminación de cuenta y datos</span>
        </div>
        <p className="text-rose-900/80 text-[11px] leading-relaxed">
          Al ejercer el derecho de supresión, se eliminarán de forma inmediata e irreversible todos los datos del menor, catálogo personalizado y notas.
        </p>

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full bg-white hover:bg-rose-100/50 text-rose-700 border border-rose-300 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Solicitar eliminación total de datos</span>
          </button>
        ) : (
          <div className="space-y-2 bg-white p-3 rounded-2xl border border-rose-300">
            <p className="text-[11px] font-bold text-rose-900 text-center">
              ¿Estás completamente seguro/a? Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 bg-slate-100 text-slate-700 font-bold py-2 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteEverything}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl"
              >
                Sí, eliminar todo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout button */}
      <div className="pt-2">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-500" />
          <span>Cerrar sesión en este dispositivo</span>
        </button>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
