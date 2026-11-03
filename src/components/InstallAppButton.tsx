import React, { useState, useEffect } from 'react';
import { Download, Monitor, Smartphone, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallAppButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running as standalone app already
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    // Check iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

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
    if (!deferredPrompt) {
      if (isIOS) {
        alert('Para instalar en iPhone/iPad: toca el botón de "Compartir" de Safari (cuadrado con flecha hacia arriba) y selecciona "Agregar a la pantalla de inicio".');
      } else {
        alert('Para instalar en tu computadora (Chrome/Edge): haz clic en el ícono de instalación que aparece en el lado derecho de la barra de direcciones del navegador (un monitor con flecha o símbolo +).');
      }
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-[11px] text-emerald-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Aplicación ya instalada en este dispositivo.</span>
      </div>
    );
  }

  if (compact) {
    return (
      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl border border-brand-200 transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Instalar App</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-br from-brand-50 to-teal-50/40 rounded-3xl p-4 border border-brand-200/70 space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm">
          <Download className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Instalar Mapa Alimentar</h3>
          <p className="text-[11px] text-slate-500">
            Funciona en PC Windows, Mac, Android y iPhone
          </p>
        </div>
      </div>

      <p className="text-slate-600 text-[11px] leading-relaxed">
        Instala el aplicativo directamente en tu pantalla de inicio o escritorio para acceder rápido sin barra de navegador e incluso sin conexión.
      </p>

      <button
        onClick={handleInstallClick}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-xs"
      >
        <Download className="w-4 h-4" />
        <span>{deferredPrompt ? 'Instalar ahora en este dispositivo' : 'Ver cómo instalar en este dispositivo'}</span>
      </button>

      <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] text-slate-500">
        <div className="flex items-center gap-1 bg-white/70 p-2 rounded-xl border border-slate-100">
          <Monitor className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span>En PC: Ícono en la barra de URL</span>
        </div>
        <div className="flex items-center gap-1 bg-white/70 p-2 rounded-xl border border-slate-100">
          <Smartphone className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span>En Celular: Menú o Compartir</span>
        </div>
      </div>
    </div>
  );
};
