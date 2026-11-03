import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MealPlanEntry, MealSlot, FoodItem, MealPlateItem, PreparedDishPreset } from '../../data/types';
import { calculateAlternatives } from '../../lib/alternativesEngine';
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  Check, 
  RefreshCw, 
  X, 
  ShieldCheck, 
  UtensilsCrossed,
  ChefHat,
  Info
} from 'lucide-react';
import { SensoryTags } from '../../components/SensoryTags';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';

type DayOfWeek = MealPlanEntry['dayOfWeek'];

export const WeeklyPlannerPage: React.FC = () => {
  const { 
    mealPlan, 
    catalog, 
    preparedDishes,
    replaceMealPlateItem,
    replaceEntireDish,
    generateWeeklyPlanAutomatically, 
    child 
  } = useData();

  const days: { key: DayOfWeek; label: string }[] = [
    { key: 'lunes', label: 'Lunes' },
    { key: 'martes', label: 'Martes' },
    { key: 'miércoles', label: 'Miércoles' },
    { key: 'jueves', label: 'Jueves' },
    { key: 'viernes', label: 'Viernes' },
    { key: 'sábado', label: 'Sábado' },
    { key: 'domingo', label: 'Domingo' }
  ];

  const slots: { key: MealSlot; label: string; iconLabel: string }[] = [
    { key: 'desayuno', label: 'Desayuno (Mañana)', iconLabel: '☀️' },
    { key: 'comida', label: 'Comida / Almuerzo (Principal)', iconLabel: '🍲' },
    { key: 'colacion', label: 'Colación (Tarde)', iconLabel: '🍎' },
    { key: 'cena', label: 'Cena (Noche)', iconLabel: '🌙' }
  ];

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('lunes');
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  // Substitution Modal: single ingredient on the plate
  const [substitutingItem, setSubstitutingItem] = useState<{
    mealPlanId: string;
    item: MealPlateItem;
    food: FoodItem;
  } | null>(null);

  // Dish Preset Modal: replace entire plate
  const [changingDishForMealId, setChangingDishForMealId] = useState<string | null>(null);

  const handleGeneratePlan = () => {
    generateWeeklyPlanAutomatically();
    triggerFeedback('¡Cardápio semanal mexicano generado automáticamente!');
  };

  const triggerFeedback = (msg: string) => {
    setSavedFeedback(msg);
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  const dayEntries = mealPlan.filter(mp => mp.dayOfWeek === selectedDay);

  // Alternatives calculation for single food replacement
  const replacementAlternatives = substitutingItem
    ? calculateAlternatives(substitutingItem.food, catalog, child.knownAllergies).slice(0, 6)
    : [];

  const handleApplySingleSubstitution = (altFood: FoodItem, chosenPrep?: string) => {
    if (!substitutingItem) return;
    replaceMealPlateItem(
      substitutingItem.mealPlanId,
      substitutingItem.item.id,
      altFood.id,
      chosenPrep
    );
    setSubstitutingItem(null);
    triggerFeedback(`Alimento reemplazado por ${altFood.nameEsMx} en el menú de ${selectedDay}.`);
  };

  const handleApplyFullDish = (preset: PreparedDishPreset) => {
    if (!changingDishForMealId) return;
    replaceEntireDish(changingDishForMealId, preset);
    setChangingDishForMealId(null);
    triggerFeedback(`Plato actualizado a "${preset.title}".`);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'cereal':
        return { label: 'Cereal / Base', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'leguminosa':
        return { label: 'Frijol / Leguminosa', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'proteína':
        return { label: 'Proteína', color: 'bg-rose-50 text-rose-800 border-rose-200' };
      case 'verdura':
        return { label: 'Verdura / Ensalada', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'fruta':
        return { label: 'Fruta', color: 'bg-sky-50 text-sky-800 border-sky-200' };
      case 'lácteo':
        return { label: 'Lácteo', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      default:
        return { label: 'Acompañamiento', color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">
              🇲🇽 Cardápio Semanal Mexicano
            </span>
            <h2 className="text-xl font-black tracking-tight leading-tight">
              Platos Completos para {child.nickname}
            </h2>
            <p className="text-xs text-teal-100 mt-0.5">
              Desayuno, Comida completa, Colación y Cena organizados
            </p>
          </div>
        </div>

        {/* 1-Click Auto Generator Button */}
        <button
          onClick={handleGeneratePlan}
          className="w-full bg-teal-400 hover:bg-teal-300 active:scale-[0.99] text-slate-950 font-black py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all text-xs"
        >
          <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
          <span>✨ Generar menú de la semana con platos típicos</span>
        </button>
      </div>

      {/* Days Selector (Horizontal Tabs) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {days.map((d) => {
          const count = mealPlan.filter(mp => mp.dayOfWeek === d.key).length;
          const isActive = selectedDay === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
              className={`flex flex-col items-center justify-center min-w-[58px] py-2 px-1.5 rounded-2xl text-xs transition-all ${
                isActive
                  ? 'bg-slate-900 text-white font-bold shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="text-[11px]">{d.label.slice(0, 3)}</span>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-teal-300 font-extrabold' : 'text-slate-400'}`}>
                {count > 0 ? 'Listo' : '-'}
              </span>
            </button>
          );
        })}
      </div>

      {savedFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 font-bold animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{savedFeedback}</span>
        </div>
      )}

      {/* Single Ingredient Substitution Modal */}
      {substitutingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                  ¿No tienes este ingrediente hoy?
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Sustituir: {substitutingItem.food.nameEsMx}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Elige una alternativa afín en textura y color para {child.nickname}:
                </p>
              </div>
              <button
                onClick={() => setSubstitutingItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {replacementAlternatives.map(({ food, score, textureOverlap, colorOverlap }) => {
                const matchPct = Math.round(score * 100);
                const prepOption = food.availablePreparations?.[0] || food.preparation;

                return (
                  <div
                    key={food.id}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 transition-all flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs">{food.nameEsMx}</h4>
                          <span className="text-[10px] font-black text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                            {matchPct}% afín
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                          {prepOption}
                        </p>
                      </div>

                      <button
                        onClick={() => handleApplySingleSubstitution(food, prepOption)}
                        className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shrink-0 shadow-sm transition-colors"
                      >
                        Elegir este
                      </button>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
                      <SensoryTags
                        textures={textureOverlap}
                        colors={colorOverlap}
                        size="sm"
                      />
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Sin alérgenos
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSubstitutingItem(null)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Preset Dish Change Modal */}
      {changingDishForMealId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                  Pratos Prontos Mexicanos
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Cambiar plato completo
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Elige una combinación tradicional ya equilibrada:
                </p>
              </div>
              <button
                onClick={() => setChangingDishForMealId(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {preparedDishes.map((preset) => (
                <div
                  key={preset.id}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-teal-700 uppercase">
                        {preset.slot}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-xs">{preset.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                        {preset.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApplyFullDish(preset)}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shrink-0 transition-colors"
                    >
                      Poner este plato
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setChangingDishForMealId(null)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Meals for Selected Day */}
      <div className="space-y-4">
        {slots.map((s) => {
          const slotEntry = dayEntries.find(item => item.slot === s.key);

          return (
            <div
              key={s.key}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3"
            >
              {/* Slot Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{s.iconLabel}</span>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                      {s.label}
                    </h3>
                    {slotEntry && (
                      <p className="text-[11px] font-bold text-teal-700">
                        {slotEntry.mealTitle}
                      </p>
                    )}
                  </div>
                </div>

                {slotEntry && (
                  <button
                    onClick={() => setChangingDishForMealId(slotEntry.id)}
                    className="text-[10px] text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-xl font-bold transition-colors flex items-center gap-1"
                  >
                    <UtensilsCrossed className="w-3 h-3 text-slate-500" />
                    <span>Cambiar plato</span>
                  </button>
                )}
              </div>

              {/* Plate Composition */}
              {slotEntry && slotEntry.items.length > 0 ? (
                <div className="space-y-2">
                  {slotEntry.items.map((item) => {
                    const food = catalog.find(f => f.id === item.foodId);
                    if (!food) return null;
                    const roleBadge = getRoleBadge(item.role);

                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                          item.isTest
                            ? 'bg-amber-50/60 border-amber-200'
                            : 'bg-slate-50/90 border-slate-200/70'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[9px] px-2 py-0.5 rounded-md font-extrabold uppercase border ${roleBadge.color}`}>
                              {roleBadge.label}
                            </span>
                            <span className="text-xs font-black text-slate-900">
                              {food.nameEsMx}
                            </span>
                            {item.isSafe && (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                                Porto Seguro
                              </span>
                            )}
                            {item.isTest && (
                              <span className="text-[9px] bg-amber-200 text-amber-900 font-extrabold px-1.5 py-0.2 rounded-full">
                                En prueba
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1 font-medium">
                            <ChefHat className="w-3 h-3 text-teal-600 shrink-0" />
                            <span>{item.preparation}</span>
                          </p>
                        </div>

                        {/* Direct Substitution Button */}
                        <button
                          onClick={() => setSubstitutingItem({
                            mealPlanId: slotEntry.id,
                            item,
                            food
                          })}
                          className="bg-white hover:bg-teal-50 text-teal-800 border border-teal-300 px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm transition-all shrink-0"
                          title={`¿No tienes ${food.nameEsMx}? Clica para sustituir`}
                        >
                          <RefreshCw className="w-3 h-3 text-teal-600" />
                          <span>Sustituir</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500">
                    Aún no hay plato configurado para este horario.
                  </p>
                  <button
                    onClick={handleGeneratePlan}
                    className="mt-1.5 text-xs text-brand-700 font-bold hover:underline"
                  >
                    Generar automáticamente
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Helpful Caregiver Note */}
      <div className="bg-teal-50/70 border border-teal-200/60 rounded-3xl p-3.5 text-xs text-slate-700 flex items-start gap-3">
        <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-slate-900">Estructura del plato combinado</p>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Cada almuerzo típico incluye <strong>Cereal</strong> (ej. arroz), <strong>Leguminosa</strong> (frijoles), <strong>Proteína</strong> (pollo o res) y <strong>Verdura</strong> (zanahoria o chayote). Si no tienes algún ingrediente ese día en casa, toca <strong>Sustituir</strong> para encontrar una alternativa parecida sin alterar la tranquilidad del niño.
          </p>
        </div>
      </div>

      <DisclaimerBanner compact />
    </div>
  );
};
