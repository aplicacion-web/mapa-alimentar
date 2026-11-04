import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Edit3, 
  ChefHat, 
  Plus, 
  Compass,
  TrendingUp,
  Award,
  Heart,
  AlertCircle,
  HelpCircle,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';
import { AddCustomFoodModal } from '../../components/AddCustomFoodModal';
import { FoodStatus } from '../../data/types';
import { InstallAppButton } from '../../components/InstallAppButton';

export const ProfilePage: React.FC = () => {
  const { 
    child, 
    acceptedFoods, 
    avoidedFoods, 
    exploringFoods, 
    getFoodPreparation, 
    updateChildProfile,
    getWeeklyNutritionSummary
  } = useData();

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(child.nickname);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalDefaultStatus, setModalDefaultStatus] = useState<FoodStatus>('accepted');

  const summary = getWeeklyNutritionSummary();

  const handleOpenAddModal = (status: FoodStatus) => {
    setModalDefaultStatus(status);
    setIsAddModalOpen(true);
  };

  const handleSaveNickname = () => {
    if (nicknameInput.trim()) {
      updateChildProfile({ nickname: nicknameInput.trim() });
    }
    setIsEditingNickname(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-br from-brand-600 via-teal-700 to-teal-800 text-white rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-black text-xl shadow-inner">
              {child.nickname ? child.nickname[0].toUpperCase() : 'S'}
            </div>
            <div>
              {isEditingNickname ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={nicknameInput}
                    onChange={(e) => setNicknameInput(e.target.value)}
                    className="px-2 py-1 rounded-lg text-slate-900 text-sm font-bold w-32 outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveNickname}
                    className="bg-white/30 text-xs px-2 py-1 rounded-lg font-bold"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <h2 className="text-lg font-black tracking-tight">
                    {child.nickname} · {child.ageBand} años
                  </h2>
                  <button
                    onClick={() => setIsEditingNickname(true)}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                    title="Editar nombre"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-white/80" />
                  </button>
                </div>
              )}
              <p className="text-xs text-teal-100 flex items-center gap-1 mt-0.5">
                <span>🌱</span> Acompañamiento Nutricional y Sensorial
              </p>
            </div>
          </div>

          <Link
            to="/app/rotina"
            className="bg-white text-teal-900 text-xs px-3 py-2 rounded-2xl font-black flex items-center gap-1 shadow-sm hover:bg-teal-50 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-600" />
            <span>Ver menú</span>
          </Link>
        </div>

        {/* Safety & Allergies Banner */}
        {child.knownAllergies.length > 0 && (
          <div className="bg-amber-400/20 border border-amber-300/30 rounded-2xl p-2.5 flex items-center gap-2 text-xs text-amber-100">
            <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              <strong>Alérgenos excluidos:</strong> {child.knownAllergies.join(', ')}. Bloqueados al 100% en todas las sugerencias.
            </span>
          </div>
        )}
      </div>

      {/* DASHBOARD SEMANAL DE EVOLUCIÓN & NUTRIENTES (LÚDICO E INTUITIVO) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Evolución Semanal de la Alimentación
              </h3>
              <p className="text-[10px] text-slate-500">
                Resumen instantáneo de nutrición y aceptación
              </p>
            </div>
          </div>

          <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {summary.completionPercentage}% Éxito
          </span>
        </div>

        {/* Big Glancable Status Card */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-4 rounded-2xl border border-teal-200/60 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="text-2xl">🌟</div>
            <div>
              <h4 className="font-black text-xs text-teal-950 leading-tight">
                {summary.headline}
              </h4>
              <p className="text-[11px] text-teal-800 leading-snug mt-0.5">
                {summary.summaryFeedback}
              </p>
            </div>
          </div>
        </div>

        {/* Gráfico Semanal Día a Día (Lunes a Domingo) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
            <span>Progreso diario (Lunes a Domingo)</span>
            <span className="text-[10px] text-slate-500 font-normal">
              {summary.totalMealsLogged} comidas registradas
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {summary.days.map((day) => {
              const heightPct = Math.max(15, day.scorePct);
              const isHigh = day.scorePct >= 75;
              const isMedium = day.scorePct >= 40 && day.scorePct < 75;

              return (
                <div key={day.day} className="flex flex-col items-center gap-1.5">
                  <div className="w-full bg-slate-100 rounded-xl h-20 flex flex-col justify-end p-1 relative overflow-hidden">
                    <div 
                      className={`w-full rounded-lg transition-all duration-500 ${
                        isHigh ? 'bg-emerald-500' : isMedium ? 'bg-amber-400' : 'bg-slate-300'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="absolute top-1 left-0 right-0 text-center text-[9px] font-black text-slate-600">
                      {day.scorePct}%
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-slate-700">
                    {day.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Comió todo
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Parcial
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> Pendiente
            </span>
          </div>
        </div>

        {/* Semáforo de los 5 Grupos Nutricionales (O que comeu vs o que falta para melhorar a saúde) */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Semáforo de Nutrientes Esenciales
            </h4>
            <span className="text-[10px] text-slate-500">¿Qué come y qué le falta?</span>
          </div>

          <div className="space-y-3">
            {summary.nutrients.map((n) => {
              const isReforzar = n.level === 'reforzar';

              return (
                <div 
                  key={n.key}
                  className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                    isReforzar ? 'bg-orange-50/60 border-orange-200' : 'bg-slate-50/70 border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{n.icon}</span>
                      <div>
                        <h5 className="font-black text-xs text-slate-900">{n.name}</h5>
                        <p className="text-[10px] text-slate-500">{n.description}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${n.colorClass}`}>
                        {n.badgeLabel}
                      </span>
                      <span className="block text-[10px] font-black text-slate-700 mt-0.5">
                        {n.score}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${n.barColor}`}
                      style={{ width: `${n.score}%` }}
                    />
                  </div>

                  {/* Actionable Health Tip */}
                  <p className={`text-[11px] leading-snug flex items-start gap-1 font-medium ${
                    isReforzar ? 'text-orange-950 font-semibold' : 'text-slate-600'
                  }`}>
                    <span className="shrink-0">{isReforzar ? '💡' : '✨'}</span>
                    <span>{n.tip}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alimentos Nuevos Introducidos a la Rutina */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-600" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Alimentos Nuevos en su Rutina
              </h4>
            </div>
            <span className="text-[10px] font-black text-brand-800 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
              {summary.newFoodsCount} en exploración
            </span>
          </div>

          {summary.newFoodsList.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {summary.newFoodsList.map((foodName, idx) => (
                <span
                  key={idx}
                  className="bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>{foodName}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-center">
              Aún no hay alimentos marcados en prueba en la rutina semanal.
            </p>
          )}

          <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/60 text-[11px] text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Regla de oro:</strong> Cada vez que tu hijo mira, huele o toca un alimento nuevo en su plato sin llorar, ¡su cerebro está dando un paso gigante hacia la aceptación!
            </p>
          </div>
        </div>
      </div>

      {/* 1. Alimentos que ya come (con su forma de preparo) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                1. Lo que ya come ({acceptedFoods.length})
              </h3>
              <p className="text-[10px] text-slate-500">
                La base segura de alimentos que disfruta
              </p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full font-bold">
            Porto seguro
          </span>
        </div>

        {acceptedFoods.length > 0 ? (
          <div className="space-y-2">
            {acceptedFoods.map((food) => {
              const prep = getFoodPreparation(food.id) || food.availablePreparations?.[0] || food.preparation;
              return (
                <div
                  key={food.id}
                  className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <h4 className="font-extrabold text-slate-900">{food.nameEsMx}</h4>
                    <p className="text-[11px] text-teal-700 font-semibold flex items-center gap-1 mt-0.5">
                      <ChefHat className="w-3 h-3" />
                      <span>{prep}</span>
                    </p>
                  </div>

                  <Link
                    to={`/app/alternativas?base=${food.id}`}
                    className="text-[10px] text-brand-800 bg-brand-50 hover:bg-brand-100 px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-brand-600" />
                    <span>Alternativas</span>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-2 italic text-center">
            Aún no has marcado alimentos que ya come.
          </p>
        )}

        {/* Botones de acción rápida para agregar más alimentos */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <Link
            to="/app/mapa"
            className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ver catálogo ({acceptedFoods.length} activos)</span>
          </Link>
          <button
            onClick={() => handleOpenAddModal('accepted')}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Crear alimento</span>
          </button>
        </div>
      </div>

      {/* 2. Alimentos que quiero testear / probar suavemente */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-50 text-amber-700 rounded-xl">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                2. Lo que quiero probar ({exploringFoods.length})
              </h3>
              <p className="text-[10px] text-slate-500">
                Alimentos puente que el app incluye poco a poco en el menú
              </p>
            </div>
          </div>
          <span className="text-[10px] text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full font-bold">
            En prueba
          </span>
        </div>

        {exploringFoods.length > 0 ? (
          <div className="space-y-2">
            {exploringFoods.map((food) => {
              const prep = getFoodPreparation(food.id) || food.availablePreparations?.[0] || food.preparation;
              return (
                <div
                  key={food.id}
                  className="bg-amber-50/40 p-3 rounded-2xl border border-amber-200/60 flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <h4 className="font-extrabold text-slate-900">{food.nameEsMx}</h4>
                    <p className="text-[11px] text-amber-800 font-semibold flex items-center gap-1 mt-0.5">
                      <ChefHat className="w-3 h-3" />
                      <span>{prep}</span>
                    </p>
                  </div>

                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-1 rounded-xl">
                    Probando
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-2 italic text-center">
            Selecciona alimentos en el catálogo que te gustaría que pruebe.
          </p>
        )}
      </div>

      {/* 3. Alimentos que NO come de ningún modo */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-rose-50 text-rose-700 rounded-xl">
              <XCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                3. Lo que NO come ({avoidedFoods.length})
              </h3>
              <p className="text-[10px] text-slate-500">
                El app NUNCA los pondrá en su plato
              </p>
            </div>
          </div>
          <span className="text-[10px] text-rose-800 bg-rose-100/70 px-2 py-0.5 rounded-full font-bold">
            Bloqueados
          </span>
        </div>

        {avoidedFoods.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {avoidedFoods.map((food) => (
              <span
                key={food.id}
                className="bg-rose-50 border border-rose-200 text-rose-800 px-3 py-1.5 rounded-xl text-xs font-bold"
              >
                {food.nameEsMx}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-1 italic text-center">
            Sin alimentos marcados como aversión total.
          </p>
        )}
      </div>

      <InstallAppButton compact />
      <DisclaimerBanner compact />

      <AddCustomFoodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultStatus={modalDefaultStatus}
      />
    </div>
  );
};
