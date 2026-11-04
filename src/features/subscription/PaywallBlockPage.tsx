import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Sparkles, CheckCircle2, RefreshCw, LogOut, ShieldAlert, Heart, ExternalLink } from 'lucide-react';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';

export const PaywallBlockPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, subscription, checkSubscriptionStatus, logout } = useAuth();
  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Generic Hotmart checkout link placeholder (ready for product ID)
  const HOTMART_CHECKOUT_URL = "https://pay.hotmart.com/M98765432X?checkoutMode=10";

  const handleRefreshStatus = async () => {
    setChecking(true);
    setFeedback(null);
    try {
      const active = await checkSubscriptionStatus();
      if (active) {
        setFeedback('¡Pago confirmado! Tu acceso está activo. Redirigiendo...');
        setTimeout(() => {
          navigate('/app/mapa');
        }, 1200);
      } else {
        setFeedback('Aún no detectamos la confirmación del pago. Si acabas de pagar en Hotmart, puede tardar 1 a 2 minutos.');
      }
    } catch (err) {
      setFeedback('Error al consultar. Por favor intenta en unos segundos.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-8 max-w-md mx-auto">
      <div className="space-y-6 text-center">
        {/* Brand */}
        <div className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <Heart className="w-5 h-5 fill-white/80" />
          </div>
          <span className="font-black text-xl text-slate-900 tracking-tight">Mapa Alimentar</span>
        </div>

        {/* Lock Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-5 text-left">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shrink-0">
              <Lock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                Acceso Concluido
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Renueva tu plan de 30 días
              </h2>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              Hola <strong className="text-slate-800">{user?.name || 'Mamá / Papá'}</strong> ({user?.email}):
            </p>
            <p>
              Tu periodo activo de 30 días en <strong>Mapa Alimentar</strong> ha concluido o requiere renovación para continuar accediendo al catálogo completo, cardápio semanal y motor de alternativas.
            </p>
            <div className="p-3 bg-teal-50/70 border border-teal-200/60 rounded-2xl text-[11px] text-teal-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-teal-950">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                Tus datos siguen 100% seguros y guardados
              </p>
              <p className="text-teal-800/90">
                Todo el perfil sensorial de tu hijo, historial y platos guardados están intactos y se desbloquearán de inmediato al confirmar tu renovación.
              </p>
            </div>
          </div>

          {/* Pricing & Benefits */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-slate-700">Renovación Mensual:</span>
              <span className="text-base font-black text-slate-900">MX$ 199 <span className="text-[10px] text-slate-400 font-normal">/ 30 días</span></span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-200/60">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-brand-600 shrink-0" />
                <span>Cardápio semanal automático y platos balanceados</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-brand-600 shrink-0" />
                <span>Herramienta de sustitución inteligente por imprevistos</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-brand-600 shrink-0" />
                <span>Liberación automática por correo electrónico</span>
              </li>
            </ul>
          </div>

          {feedback && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl font-medium">
              {feedback}
            </div>
          )}

          {/* Action Button: Hotmart Checkout */}
          <div className="space-y-2.5 pt-1">
            <a
              href={HOTMART_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all text-xs text-center"
            >
              <span>Renovar suscripción en Hotmart (MX$ 199)</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleRefreshStatus}
              disabled={checking}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
              <span>{checking ? 'Comprobando pago...' : 'Ya pagué, verificar activación'}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => logout()}
              className="hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar sesión</span>
            </button>

            <a
              href="mailto:soporte@mapaalimentar.mx?subject=Ayuda%20con%20mi%20pago%20de%2030%20dias"
              className="text-brand-700 hover:underline font-bold"
            >
              ¿Necesitas ayuda?
            </a>
          </div>
        </div>

        <DisclaimerBanner compact />
      </div>
    </div>
  );
};
