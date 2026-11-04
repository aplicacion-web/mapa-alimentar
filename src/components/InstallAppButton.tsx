import React, { useState, useEffect } from 'react';
import { Download, Monitor, Smartphone, CheckCircle2, X, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallAppButton: React.FC<{ compact?: boolean; className?: string }> = ({ 
  compact = false,
  className = ''
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if running as standalone app already
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  // Compact Pill Button (for headers or toolbars)
  if (compact) {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all ${className}`}
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{isInstalled ? 'App Instalada' : 'Instalar App'}</span>
        </button>

        {showModal && <InstallModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  // Full-featured, high-contrast, always-visible Install Action Card
  return (
    <>
      <div className={`w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-brand-600 p-0.5 rounded-3xl shadow-lg shadow-teal-700/20 ${className}`}>
        <div className="bg-white rounded-[22px] p-4 text-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
                <Download className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm text-slate-900 leading-tight">
                    Instalar Aplicación
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {isInstalled ? 'Activa' : 'Recomendado'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Usa sin conexión en tu Celular (Android / iPhone) o PC
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleInstallClick}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] text-white font-black py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-all text-xs"
          >
            <Download className="w-4 h-4 text-white stroke-[2.5]" />
            <span className="tracking-wide">
              {deferredPrompt 
                ? '📲 Instalar ahora con 1-clic' 
                : isInstalled 
                  ? '✅ Ver cómo abrir la app instalada' 
                  : '📲 Instalar en Celular o Computadora'}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-0.5 border-t border-slate-100">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl font-medium">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Celular: Menú / Compartir</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl font-medium">
              <Monitor className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>PC: Ícono en la barra URL</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && <InstallModal onClose={() => setShowModal(false)} />}
    </>
  );
};

const InstallModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4 text-xs animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="font-black text-sm text-slate-900">
              Cómo instalar Mapa Alimentar
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 text-slate-600">
          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/60 space-y-1">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>En Celular Android (Chrome):</span>
            </p>
            <p className="text-[11px] leading-relaxed text-emerald-900">
              Toca los <strong>3 puntos (⋮)</strong> en la esquina superior derecha del navegador y presiona <strong>"Instalar aplicación"</strong> o <em>"Agregar a la pantalla principal"</em>.
            </p>
          </div>

          <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200/60 space-y-1">
            <p className="font-bold text-teal-950 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>En iPhone o iPad (Safari):</span>
            </p>
            <p className="text-[11px] leading-relaxed text-teal-900">
              Toca el botón <strong>Compartir</strong> (ícono de cuadrado con flecha hacia arriba) y selecciona <strong>"Agregar al inicio"</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>En Computadora (Chrome / Edge):</span>
            </p>
            <p className="text-[11px] leading-relaxed text-slate-700">
              Haz clic en el ícono de <strong>monitor con flecha</strong> o en el símbolo <strong>+</strong> que aparece al final de la barra donde escribes la dirección web (URL).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
        >
          Entendido, cerrar
        </button>
      </div>
    </div>
  );
};
