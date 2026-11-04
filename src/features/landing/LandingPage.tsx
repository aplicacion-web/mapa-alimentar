import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Utensils, CheckCircle, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/40 via-white to-slate-50 text-slate-800">
      {/* Top Header */}
      <header className="max-w-md mx-auto px-4 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-sm shadow-brand-500/20">
            <Heart className="w-4 h-4 fill-white/80" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">Mapa Alimentar</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/cadastro"
            className="text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-1.5 rounded-xl shadow-sm transition-colors"
          >
            Comenzar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-md mx-auto px-4 pt-8 pb-16 space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-700 bg-brand-100/70 border border-brand-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
            <span>🌱</span> Diseñado con amor para tu familia
          </span>
          <h1 className="text-2xl xs:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ampliando el repertorio de tu hijo, paso a paso y <span className="text-brand-600">sin batallas</span>
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            La herramienta práctica para organizar los alimentos aceptados y descubrir alternativas seguras basadas en la textura, color y forma que tu pequeño ya tolera.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2.5">
          <Link
            to="/app/mapa"
            className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all text-sm"
          >
            <span>Explorar mapa de demostración</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/cadastro"
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-2xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors text-xs text-center"
          >
            <span>Crear cuenta gratis de responsable</span>
          </Link>
        </div>

        {/* Interactive Preview Card (Sofia wireframe preview) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold text-sm">
                S
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Perfil sensorial: Sofía (6 años)</h4>
                <p className="text-[10px] text-slate-500">Ejemplo de visualización</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
              8 alimentos seguros
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Textura preferida:</span>
              <span className="font-semibold text-slate-800">Crujiente · Blando liso</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Colores tolerados:</span>
              <span className="font-semibold text-slate-800">Dorado · Blanco · Amarillo</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Alimentos base:</span>
              <span className="font-semibold text-slate-800">Arroz, pollo, papa, tortilla</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Evita estrictamente:</span>
              <span className="font-semibold text-rose-700">Comidas mezcladas</span>
            </div>
          </div>

          <div className="bg-teal-50/70 rounded-2xl p-3 border border-teal-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-brand-800 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sugerencia del motor de similitud</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Al partir de <strong>Papa al horno</strong>, se sugiere explorar <strong>Gajos de zanahoria horneada</strong>: comparten textura crujiente exterior y forma alargada, sin alérgenos incompatibles.
            </p>
          </div>
        </div>

        {/* The 4-step Value Pillars */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
            Cómo funciona el método
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="text-xs font-bold text-slate-900">Registrar alimentos</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                Identifica qué come hoy tu pequeño sin juzgar cantidad.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="text-xs font-bold text-slate-900">Ver tu mapa</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                Visualiza qué grupos y colores ya forman parte de su repertorio.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="text-xs font-bold text-slate-900">Explorar puentes</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                Busca alternativas con características sensoriales similares.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h4 className="text-xs font-bold text-slate-900">Semana predecible</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                Organiza menús semanales donde siempre haya un alimento seguro.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing proposal */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="space-y-1 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400">
              Acceso Completo Familiar
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black">MX$ 199</span>
              <span className="text-xs text-slate-400">/ mes</span>
            </div>
            <p className="text-xs text-slate-300">
              O plan anual preferencial por MX$ 1,990 (ahorro de 2 meses).
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-200 pt-2 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Catálogo completo de alimentos caseros y nutritivos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Motor de alternativas sensoriales sin límite de consultas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Planificador semanal y bitácora de tolerancia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Cancelación sencilla en cualquier momento</span>
            </div>
          </div>

          <Link
            to="/cadastro"
            className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl block text-center text-sm transition-colors"
          >
            Comenzar prueba
          </Link>
        </div>

        {/* Disclaimer */}
        <DisclaimerBanner />

        {/* Legal & Footer */}
        <footer className="text-center text-[11px] text-slate-600 pt-6 border-t border-slate-200/80 space-y-2">
          <p>© 2026 Mapa Alimentar. Hecho con respeto y comprensión para las familias.</p>
          <div className="flex items-center justify-center gap-4 text-slate-700">
            <Link to="/app/configuracoes" className="hover:underline">Privacidad y Protección de Datos</Link>
            <span>·</span>
            <Link to="/login" className="hover:underline">Soporte</Link>
          </div>
        </footer>
      </main>
    </div>
  );
};
