import React, { useState, useEffect } from 'react';
import { Download, Monitor, Smartphone, CheckCircle2, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallAppButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
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
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex items-center justify-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Aplicación ya instalada</span>
      </div>
    );
  }

  if (compact) {
    return (
      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-sm transition-all"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Instalar App</span>
      </button>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-brand-600 text-white p-4 rounded-3xl shadow-lg shadow-teal-600/20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white leading-tight">
                Instalar Aplicación (PWA)
              </h3>
              <p className="text-[11px] text-teal-100">
                Acceso directo en celular Android, iPhone o PC
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleInstallClick}
          className="w-full bg-white hover:bg-teal-50 active:scale-[0.99] text-teal-950 font-black py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all text-xs"
        >
          <Download className="w-4 h-4 text-teal-800 stroke-[2.5]" />
          <span>{deferredPrompt ? 'Instalar ahora con 1-clic' : 'Instalar en este dispositivo'}</span>
        </button>

        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-teal-100 pt-0.5">
          <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-lg">
            <Monitor className="w-3 h-3 shrink-0" />
            <span>PC: Ícono en barra URL</span>
          </div>
          <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-lg">
            <Smartphone className="w-3 h-3 shrink-0" />
            <span>Celular: Menú / Compartir</span>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4 text-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-brand-600" />
                <h4 className="font-black text-sm text-slate-900">
                  Instalación en tu dispositivo
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-slate-600">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-brand-600" />
                  <span>En Computadora (Chrome o Edge):</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  Haz clic en el ícono de <strong>un monitor con flecha</strong> o en el símbolo <strong>+</strong> que aparece en el lado derecho de la barra de direcciones donde se escribe la URL.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-brand-600" />
                  <span>En Celular Android:</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  Toca el menú de <strong>3 puntos</strong> de Chrome y selecciona <strong>"Instalar aplicación"</strong> o <em>"Agregar a la pantalla principal"</em>.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-brand-600" />
                  <span>En iPhone / iPad (Safari):</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  Toca el botón <strong>Compartir</strong> (cuadrado con flecha hacia arriba) y selecciona <strong>"Agregar al inicio"</strong>.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
