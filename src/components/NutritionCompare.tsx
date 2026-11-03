import React from 'react';
import { FoodItem } from '../data/types';
import { Scale, CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface NutritionCompareProps {
  baseFood: FoodItem;
  altFood: FoodItem;
  onClose?: () => void;
}

export const NutritionCompare: React.FC<NutritionCompareProps> = ({ baseFood, altFood, onClose }) => {
  const nutrients = [
    { label: 'Energía', base: `${baseFood.nutrition.energyKcal || 0} kcal`, alt: `${altFood.nutrition.energyKcal || 0} kcal` },
    { label: 'Proteína', base: `${baseFood.nutrition.proteinGrams || 0} g`, alt: `${altFood.nutrition.proteinGrams || 0} g` },
    { label: 'Fibra', base: `${baseFood.nutrition.fiberGrams || 0} g`, alt: `${altFood.nutrition.fiberGrams || 0} g` },
    { label: 'Carbohidratos', base: `${baseFood.nutrition.carbsGrams || 0} g`, alt: `${altFood.nutrition.carbsGrams || 0} g` },
    { label: 'Grasa', base: `${baseFood.nutrition.fatGrams || 0} g`, alt: `${altFood.nutrition.fatGrams || 0} g` },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
            <Scale className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Comparación nutricional (base 100 g)</h3>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Alimento actual</span>
          <p className="font-bold text-slate-900 text-sm mt-0.5">{baseFood.nameEsMx}</p>
          <span className="inline-block mt-1 text-[10px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md font-medium">
            {baseFood.category}
          </span>
        </div>

        <div className="bg-teal-50/70 p-2.5 rounded-xl border border-teal-200/80">
          <span className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">Alternativa</span>
          <p className="font-bold text-teal-950 text-sm mt-0.5">{altFood.nameEsMx}</p>
          <span className="inline-block mt-1 text-[10px] text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md font-medium">
            {altFood.category}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 text-xs">
        {nutrients.map((n) => (
          <div key={n.label} className="grid grid-cols-3 py-2 text-slate-700 items-center">
            <span className="font-medium text-slate-600">{n.label}</span>
            <span className="text-center font-semibold text-slate-800">{n.base}</span>
            <span className="text-right font-semibold text-teal-800">{n.alt}</span>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-500 space-y-1">
        <p className="flex items-center gap-1.5 font-medium text-slate-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          Fuente: {baseFood.nutrition.sourceName}
        </p>
        <p className="text-[10px] text-slate-500 leading-tight">
          Valores aproximados para preparaciones estándar. La respuesta de aceptación no depende del valor nutricional, sino de la familiaridad sensorial del menor.
        </p>
      </div>
    </div>
  );
};
