import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { calculateAlternatives } from '../../lib/alternativesEngine';
import { FoodItem, AlternativeScoreResult } from '../../data/types';
import { Sparkles, ShieldCheck, Scale, Plus, CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { NutritionCompare } from '../../components/NutritionCompare';
import { SensoryTags } from '../../components/SensoryTags';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';

export const AlternativesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { catalog, acceptedFoods, child, setFoodStatus, getFoodStatus } = useData();

  // If query param ?base=id is provided, select it, else default to first accepted food or potato
  const baseParam = searchParams.get('base');
  const initialBase = catalog.find(f => f.id === baseParam) || acceptedFoods[0] || catalog[0];

  const [selectedBaseFood, setSelectedBaseFood] = useState<FoodItem>(initialBase);
  const [comparisonAlt, setComparisonAlt] = useState<FoodItem | null>(null);

  useEffect(() => {
    if (baseParam) {
      const match = catalog.find(f => f.id === baseParam);
      if (match) setSelectedBaseFood(match);
    }
  }, [baseParam, catalog]);

  // Run deterministic alternative suggestions
  const alternatives: AlternativeScoreResult[] = calculateAlternatives(
    selectedBaseFood,
    catalog,
    child.knownAllergies
  );

  const topAlternatives = alternatives.slice(0, 8);

  const handleSelectBase = (foodId: string) => {
    const food = catalog.find(f => f.id === foodId);
    if (food) {
      setSelectedBaseFood(food);
      setSearchParams({ base: food.id });
      setComparisonAlt(null);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Title */}
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Explorador de Alternativas</h2>
        <p className="text-xs text-slate-500">
          Encuentra alimentos puentes basados en la textura y color que <strong className="text-slate-700">{child.nickname}</strong> ya tolera.
        </p>
      </div>

      {/* Wireframe 03 Base Food Card */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white rounded-3xl p-5 shadow-sm space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-teal-200">
          1. Alimento base de referencia
        </span>

        <div>
          <label className="block text-xs text-teal-100 font-medium mb-1.5">
            Selecciona un alimento seguro o familiar:
          </label>
          <select
            value={selectedBaseFood.id}
            onChange={(e) => handleSelectBase(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {catalog.map((food) => (
              <option key={food.id} value={food.id} className="text-slate-900">
                {food.nameEsMx} ({food.category})
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white/10 rounded-2xl p-3 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold">{selectedBaseFood.nameEsMx}</span>
            <span className="text-[10px] capitalize bg-white/20 px-2 py-0.5 rounded-full">
              {selectedBaseFood.category}
            </span>
          </div>

          <div className="text-[11px] text-teal-100">
            <strong>Sensorial:</strong> {selectedBaseFood.textureTags.join(', ')} · Color: {selectedBaseFood.colorTags.join(', ')} · Forma: {selectedBaseFood.shapeTags.join(', ')}
          </div>
        </div>

        {/* Safety badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-teal-200 pt-1">
          <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
          <span>Filtro estricto: alérgenos de {child.nickname} excluidos al 100%.</span>
        </div>
      </div>

      {/* Comparison Modal / Card when active */}
      {comparisonAlt && (
        <NutritionCompare
          baseFood={selectedBaseFood}
          altFood={comparisonAlt}
          onClose={() => setComparisonAlt(null)}
        />
      )}

      {/* Suggested Alternatives List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900">Alternativas sugeridas por afinidad</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">
            {topAlternatives.length} opciones seguras
          </span>
        </div>

        <div className="space-y-3">
          {topAlternatives.map(({ food, score, textureOverlap, colorOverlap, shapeOverlap, explanation }, index) => {
            const currentStatus = getFoodStatus(food.id);
            const percentage = Math.round(score * 100);

            return (
              <div
                key={food.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{food.nameEsMx}</h4>
                    </div>
                    <span className="text-[10px] text-slate-500 capitalize ml-7">
                      {food.category}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-brand-700 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-lg">
                      {percentage}% afín
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                  <p className="text-[11px] font-medium text-slate-800 leading-snug">
                    {explanation}
                  </p>
                  <SensoryTags
                    textures={textureOverlap}
                    colors={colorOverlap}
                    shapes={shapeOverlap}
                  />
                </div>

                <div className="flex items-center justify-between pt-1 gap-2">
                  <button
                    onClick={() => setComparisonAlt(food)}
                    className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
                  >
                    <Scale className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ver nutrientes</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {currentStatus === 'none' ? (
                      <button
                        onClick={() => setFoodStatus(food.id, 'exploring')}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Explorar en casa</span>
                      </button>
                    ) : (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl ${
                        currentStatus === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {currentStatus === 'accepted' ? 'Ya aceptado' : 'Marcado explorando'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DisclaimerBanner compact />
    </div>
  );
};
