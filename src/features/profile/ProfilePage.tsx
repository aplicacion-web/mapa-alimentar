import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShieldAlert, Sparkles, CheckCircle2, XCircle, Calendar, Edit3, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';

export const ProfilePage: React.FC = () => {
  const { child, acceptedFoods, avoidedFoods, exploringFoods, getFoodPreparation, updateChildProfile } = useData();
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(child.nickname);

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
              {child.nickname ? child.nickname[0].toUpperCase() : 'P'}
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
                  <h2 className="text-lg font-bold tracking-tight">
                    {child.nickname} · {child.ageBand} años
                  </h2>
                  <button
                    onClick={() => setIsEditingNickname(true)}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-white/80" />
                  </button>
                </div>
              )}
              <p className="text-xs text-teal-100">
                Perfil de Alimentación y Preparaciones (México)
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

      <DisclaimerBanner compact />
    </div>
  );
};
