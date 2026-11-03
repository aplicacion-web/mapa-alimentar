import React from 'react';
import { Info } from 'lucide-react';

export const DisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-slate-100/90 rounded-xl p-2.5 text-[11px] text-slate-600 flex items-start gap-2 border border-slate-200/80">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-snug">
          Herramienta de apoyo para el repertorio familiar. No es un diagnóstico médico ni prescripción nutricional.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-3.5 text-xs text-slate-700 flex items-start gap-3 border border-teal-200/60 shadow-sm">
      <div className="p-1.5 bg-brand-500 text-white rounded-lg shrink-0">
        <Info className="w-4 h-4" />
      </div>
      <div className="space-y-0.5">
        <p className="font-semibold text-slate-900">Acompañamiento sin presión</p>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Cada niño tiene sus propios tiempos sensoriales. El rechazo a un alimento es parte natural del aprendizaje y nunca representa una falla del cuidador o del menor. Ante dudas clínicas, consulta a un profesional de la salud.
        </p>
      </div>
    </div>
  );
};
