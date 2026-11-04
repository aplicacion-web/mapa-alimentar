import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Lock, Mail, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { InstallAppButton } from '../../components/InstallAppButton';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const isCadastro = location.pathname.includes('cadastro');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (isCadastro && !consent) {
      setError('Es necesario aceptar los términos y el consentimiento de privacidad para continuar.');
      return;
    }

    setLoading(true);
    try {
      if (isCadastro) {
        await signup(email, name || 'Mamá / Papá');
        navigate('/onboarding');
      } else {
        await login(email, name);
        navigate('/app/mapa');
      }
    } catch (err: any) {
      setError(err?.message || 'Error al autenticar. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-8">
      <div className="max-w-md w-full mx-auto space-y-5">
        {/* Top Install Shortcut Header */}
        <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
            <span>📲</span> ¿Usas en celular o PC?
          </span>
          <InstallAppButton compact />
        </div>

        {/* Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
              <Heart className="w-5 h-5 fill-white/80" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">Mapa Alimentar</span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">
            {isCadastro ? 'Crear cuenta de responsable' : 'Bienvenida de nuevo'}
          </h2>
          <p className="text-xs text-slate-500">
            {isCadastro 
              ? 'Comienza a organizar el repertorio alimentario de tu hijo de forma respetuosa.' 
              : 'Ingresa a tu cuenta para consultar o actualizar tus registros.'}
          </p>
        </div>

        {/* Botón de instalación PWA destacado en la pantalla de inicio */}
        <InstallAppButton />

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isCadastro && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tu nombre o cómo prefieres que te llamemos
                </label>
                <input
                  type="text"
                  placeholder="Ej. Ana o Mamá de Mateo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-slate-800 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-slate-800 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-slate-800 transition-all"
                />
              </div>
            </div>

            {isCadastro && (
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded text-brand-600 focus:ring-brand-400 border-slate-300"
                  />
                  <span className="text-[11px] text-slate-600 leading-snug">
                    Acepto el <strong className="text-slate-800">consentimiento informado</strong> y las políticas de privacidad de datos familiares. Entiendo que la herramienta no emite diagnósticos médicos.
                  </span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>{loading ? 'Accediendo...' : isCadastro ? 'Crear mi cuenta' : 'Ingresar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={async () => {
                await login('mama.demo@mapaalimentar.app', 'Mamá de Sofía');
                navigate('/app/rotina');
              }}
              className="text-xs text-brand-700 hover:text-brand-800 font-semibold underline"
            >
              Acceso rápido con datos de demostración (1-clic)
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          {isCadastro ? (
            <>
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-bold text-brand-600 hover:underline">
                Inicia sesión aquí
              </Link>
            </>
          ) : (
            <>
              ¿Aún no te has registrado?{' '}
              <Link to="/cadastro" className="font-bold text-brand-600 hover:underline">
                Crear cuenta nueva
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
