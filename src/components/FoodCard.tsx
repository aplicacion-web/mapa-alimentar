import React, { useState } from 'react';
import { FoodItem, FoodStatus } from '../data/types';
import { SensoryTags } from './SensoryTags';
import { Check, X, Sparkles, AlertCircle, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FoodCardProps {
  food: FoodItem;
  status?: FoodStatus | 'none';
  selectedPreparation?: string;
  onStatusChange?: (status: FoodStatus, preparation?: string) => void;
  onRemove?: () => void;
  showExploreButton?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  status = 'none',
  selectedPreparation,
  onStatusChange,
  showExploreButton = true
}) => {
  const navigate = useNavigate();
  const availablePreps = food.availablePreparations || [food.preparation];
  const [currentPrep, setCurrentPrep] = useState<string>(
    selectedPreparation || availablePreps[0]
  );

  const handlePrepChange = (prep: string) => {
    setCurrentPrep(prep);
    if (onStatusChange && status !== 'none') {
      onStatusChange(status, prep);
    }
  };

  const handleStatusSelect = (newStatus: FoodStatus) => {
    if (onStatusChange) {
      onStatusChange(newStatus, currentPrep);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-3">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
              {food.category}
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{food.nameEsMx}</h4>
          </div>

          {status !== 'none' && (
            <span
              className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide shrink-0 ${
                status === 'accepted'
                  ? 'bg-emerald-100 text-emerald-800'
                  : status === 'avoided'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {status === 'accepted' ? 'Ya lo come' : status === 'avoided' ? 'NO lo come' : 'Quiero probar'}
            </span>
          )}
        </div>

        {/* Preparation selection */}
        <div className="mt-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
          <label className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
            <ChefHat className="w-3 h-3 text-brand-600" />
            <span>Forma de preparación:</span>
          </label>
          <select
            value={currentPrep}
            onChange={(e) => handlePrepChange(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800 font-medium outline-none focus:border-brand-500"
          >
            {availablePreps.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {food.allergens.length > 0 && (
          <div className="flex items-center gap-1 mt-2 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
            <AlertCircle className="w-3 h-3" />
            <span>Contiene: {food.allergens.join(', ')}</span>
          </div>
        )}

        <div className="mt-2.5">
          <SensoryTags
            textures={food.textureTags}
            colors={food.colorTags}
            shapes={food.shapeTags}
          />
        </div>
      </div>

      {/* Status Switcher Buttons */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
        {onStatusChange ? (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleStatusSelect('accepted')}
              className={`px-2 py-1 text-[10px] rounded-xl font-bold transition-colors flex items-center gap-1 ${
                status === 'accepted'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
              title="Mi hijo/a ya come este alimento"
            >
              <Check className="w-3 h-3" />
              <span>Ya come</span>
            </button>

            <button
              onClick={() => handleStatusSelect('exploring')}
              className={`px-2 py-1 text-[10px] rounded-xl font-bold transition-colors ${
                status === 'exploring'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-700'
              }`}
              title="Quiero probar introducirlo en pequeñas porciones"
            >
              <span>Quiero probar</span>
            </button>

            <button
              onClick={() => handleStatusSelect('avoided')}
              className={`px-2 py-1 text-[10px] rounded-xl font-bold transition-colors flex items-center gap-1 ${
                status === 'avoided'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700'
              }`}
              title="NO come de ningún modo (aversión o rechazo)"
            >
              <X className="w-3 h-3" />
              <span>NO come</span>
            </button>
          </div>
        ) : (
          <div />
        )}

        {showExploreButton && (
          <button
            onClick={() => navigate(`/app/alternativas?base=${food.id}`)}
            className="text-[10px] text-brand-800 hover:text-brand-900 bg-brand-50 hover:bg-brand-100 px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-colors shrink-0"
          >
            <Sparkles className="w-3 h-3 text-brand-600" />
            <span>Alternativas</span>
          </button>
        )}
      </div>
    </div>
  );
};
