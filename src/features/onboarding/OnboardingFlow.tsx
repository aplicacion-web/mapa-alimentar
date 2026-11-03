import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LocalStore } from '../../lib/storage';
import { AgeBand, FoodStatus } from '../../data/types';
import { Check, ArrowRight, ArrowLeft, Search, ShieldAlert, Sparkles, Heart } from 'lucide-react';

export const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { catalog, updateChildProfile, updateSensoryPreferences, setFoodStatus, child, sensoryPreferences } = useData();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Child info
  const [nickname, setNickname] = useState(child.nickname || 'Mateo');
  const [ageBand, setAgeBand] = useState<AgeBand>(child.ageBand || '4-6');
  const [allergiesText, setAllergiesText] = useState(child.knownAllergies.join(', '));

  // Step 2: Select 5-10 foods
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<Record<string, FoodStatus>>({
    'f-arroz-blanco': 'accepted',
    'f-pollo-deshebrado': 'accepted',
    'f-tortilla-maiz': 'accepted',
    'f-papa-vapor': 'accepted',
    'f-totopos-horno': 'accepted'
  });

  // Step 3: Sensory preferences
  const [selectedTextures, setSelectedTextures] = useState<string[]>(sensoryPreferences.preferredTextures);
  const [selectedColors, setSelectedColors] = useState<string[]>(sensoryPreferences.preferredColors);
  const [avoidsMixed, setAvoidsMixed] = useState(true);

  // Helpers
  const commonAllergens = ['cacahuate', 'nuez', 'leche', 'huevo', 'gluten', 'pescado', 'soya'];
  const textureOptions = ['crujiente', 'blando', 'cremoso', 'liso', 'seco', 'harinoso'];
  const colorOptions = ['dorado', 'blanco', 'amarillo', 'naranja', 'verde', 'rojo'];

  const toggleAllergen = (item: string) => {
    const current = allergiesText.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    if (current.includes(item)) {
      setAllergiesText(current.filter(x => x !== item).join(', '));
    } else {
      setAllergiesText([...current, item].join(', '));
    }
  };

  const handleStep1Next = () => {
    const parsedAllergies = allergiesText
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    updateChildProfile({
      nickname: nickname.trim() || 'Mi hijo/a',
      ageBand,
      knownAllergies: parsedAllergies
    });

    setStep(2);
  };

  const handleFoodStatusToggle = (foodId: string, status: FoodStatus) => {
    setSelectedFoods(prev => {
      const next = { ...prev };
      if (next[foodId] === status) {
        delete next[foodId];
      } else {
        next[foodId] = status;
      }
      return next;
    });
  };

  const acceptedCount = Object.values(selectedFoods).filter(s => s === 'accepted').length;

  const handleStep2Next = () => {
    // Validation: Block continuation if no accepted food
    if (acceptedCount === 0) {
      alert('Es necesario registrar al menos un alimento aceptado como base segura para el mapa.');
      return;
    }

    // Persist foods
    Object.entries(selectedFoods).forEach(([foodId, status]) => {
      setFoodStatus(foodId, status);
    });

    setStep(3);
  };

  const handleStep3Finish = () => {
    updateSensoryPreferences({
      preferredTextures: selectedTextures,
      preferredColors: selectedColors,
      avoidedSensoryAttributes: avoidsMixed ? ['alimentos mezclados'] : []
    });

    LocalStore.setOnboardingCompleted(true);
    navigate('/app/mapa');
  };

  const filteredCatalog = catalog.filter(f => 
    f.nameEsMx.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-start max-w-md mx-auto px-4 py-6">
      {/* Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Paso {step} de 3</span>
          <span className="text-brand-700">
            {step === 1 && 'Perfil del menor'}
            {step === 2 && 'Primeros alimentos'}
            {step === 3 && 'Preferencias sensoriales'}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-500 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: PERFIL */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Crear perfil del pequeño/a</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Por privacidad, puedes usar un apodo. No requerimos apellidos ni diagnósticos médicos.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nombre o apodo
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Ej. Sofía, Mateo o Peque"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Rango de edad
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['1-3', '4-6', '7-10', '11+'] as AgeBand[]).map((band) => (
                  <button
                    key={band}
                    type="button"
                    onClick={() => setAgeBand(band)}
                    className={`py-2 text-center rounded-xl font-bold transition-all ${
                      ageBand === band
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {band} años
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Alergias o intolerancias conocidas (muy importante)</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                El motor de alternativas excluirá automáticamente cualquier alimento que contenga estos ingredientes.
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-2">
                {commonAllergens.map((item) => {
                  const isChecked = allergiesText.toLowerCase().includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAllergen(item)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                        isChecked
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                placeholder="O escribe otras separadas por coma..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-700 outline-none focus:border-brand-500 text-xs"
              />
            </div>
          </div>

          <button
            onClick={handleStep1Next}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm text-xs transition-colors"
          >
            <span>Siguiente: Registrar alimentos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: ALIMENTOS */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Alimentos conocidos</h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${acceptedCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {acceptedCount} aceptados
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Marca al menos 1 alimento aceptado (ideal 5 a 10) para crear tu mapa inicial.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar arroz, pollo, tortilla, manzana..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-500"
            />
          </div>

          {/* List of foods */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
            {filteredCatalog.map((food) => {
              const currentStatus = selectedFoods[food.id];
              return (
                <div key={food.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2 text-xs">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{food.nameEsMx}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{food.category} · {food.textureTags.slice(0, 2).join(', ')}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleFoodStatusToggle(food.id, 'accepted')}
                      className={`px-2 py-1 text-[10px] rounded-lg font-bold transition-all ${
                        currentStatus === 'accepted'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      Aceptado
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFoodStatusToggle(food.id, 'exploring')}
                      className={`px-2 py-1 text-[10px] rounded-lg font-bold transition-all ${
                        currentStatus === 'exploring'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                      }`}
                    >
                      Explora
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFoodStatusToggle(food.id, 'avoided')}
                      className={`px-2 py-1 text-[10px] rounded-lg font-bold transition-all ${
                        currentStatus === 'avoided'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                      }`}
                    >
                      Evita
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setStep(1)}
              className="py-3 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleStep2Next}
              disabled={acceptedCount === 0}
              className={`flex-1 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors ${
                acceptedCount > 0
                  ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Continuar a preferencias</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PREFERENCIAS SENSORIALES */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Preferencias sensoriales</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ayuda al motor a entender qué texturas y colores le transmiten mayor seguridad.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Texturas que suele preferir o tolerar mejor:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {textureOptions.map((tex) => {
                  const isSelected = selectedTextures.includes(tex);
                  return (
                    <button
                      key={tex}
                      type="button"
                      onClick={() => {
                        setSelectedTextures(prev => 
                          prev.includes(tex) ? prev.filter(t => t !== tex) : [...prev, tex]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tex}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Colores más familiares en su plato:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {colorOptions.map((col) => {
                  const isSelected = selectedColors.includes(col);
                  return (
                    <button
                      key={col}
                      type="button"
                      onClick={() => {
                        setSelectedColors(prev => 
                          prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                        isSelected
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <input
                  type="checkbox"
                  checked={avoidsMixed}
                  onChange={(e) => setAvoidsMixed(e.target.checked)}
                  className="mt-0.5 rounded text-brand-600 focus:ring-brand-400 border-slate-300"
                />
                <span className="text-slate-700 leading-snug">
                  <strong>Rechaza alimentos mezclados o revueltos</strong> (prefiere ingredientes separados visualmente en el plato).
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setStep(2)}
              className="py-3 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleStep3Finish}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Guardar y ver Mapa Alimentario</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
