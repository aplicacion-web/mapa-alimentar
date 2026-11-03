import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FoodItem, FoodStatus } from '../data/types';
import { X, Plus, ChefHat, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface AddCustomFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: FoodStatus;
}

export const AddCustomFoodModal: React.FC<AddCustomFoodModalProps> = ({
  isOpen,
  onClose,
  defaultStatus = 'accepted'
}) => {
  const { addNewCustomFood } = useData();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodItem['category']>('verduras');
  const [preparation, setPreparation] = useState('');
  const [status, setStatus] = useState<FoodStatus>(defaultStatus);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor escribe el nombre del alimento.');
      return;
    }

    try {
      const chosenPrep = preparation.trim() || 'Preparación casera habitual';
      addNewCustomFood(
        {
          nameEsMx: name.trim(),
          category,
          preparation: chosenPrep,
          availablePreparations: [chosenPrep, 'Cocido suave', 'Al vapor', 'A la plancha', 'Al natural'],
          textureTags: ['suave', 'familiar'],
          colorTags: ['mixto']
        },
        status,
        chosenPrep
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName('');
        setPreparation('');
        setError('');
        onClose();
      }, 1200);
    } catch (err: any) {
      setError('Error al guardar el alimento.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Agregar nuevo alimento
              </h3>
              <p className="text-[11px] text-slate-500">
                Si tu hijo come algo que no está en la lista, agrégalo aquí
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">¡Alimento registrado con éxito!</h4>
            <p className="text-xs text-slate-500">
              Ya está disponible en la lista y para el cardápio semanal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Food Name */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nombre del alimento o preparación *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Ej. Galleta de avena, Chayote con mantequilla, Melón..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-slate-800 text-xs transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Grupo de alimento
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodItem['category'])}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 outline-none text-slate-800 text-xs capitalize bg-white"
              >
                <option value="cereales">Cereales y granos (arroz, pasta, avena, tortilla)</option>
                <option value="proteínas">Proteínas (pollo, huevo, carne, pescado)</option>
                <option value="leguminosas">Leguminosas (frijol, lenteja, garbanzo)</option>
                <option value="verduras">Verduras (zanahoria, papa, calabaza, chayote)</option>
                <option value="frutas">Frutas (manzana, plátano, fresa, uva)</option>
                <option value="lácteos">Lácteos (queso, leche, yogur)</option>
              </select>
            </div>

            {/* How it's cooked / served */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                ¿Cómo le gusta comerlo? (Forma de preparación)
              </label>
              <div className="relative">
                <ChefHat className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={preparation}
                  onChange={(e) => setPreparation(e.target.value)}
                  placeholder="Ej. Muy suave, En bastoncitos, Con poquita sal, Sin salsa..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 outline-none text-slate-800 text-xs transition-all"
                />
              </div>
            </div>

            {/* Initial Status */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                ¿En qué lista deseas agregarlo?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('accepted')}
                  className={`p-2 rounded-xl text-center border font-bold transition-all text-xs ${
                    status === 'accepted'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  🟢 Ya come
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('exploring')}
                  className={`p-2 rounded-xl text-center border font-bold transition-all text-xs ${
                    status === 'exploring'
                      ? 'bg-amber-50 border-amber-500 text-amber-800 ring-2 ring-amber-200'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  🟡 Por probar
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('avoided')}
                  className={`p-2 rounded-xl text-center border font-bold transition-all text-xs ${
                    status === 'avoided'
                      ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  🔴 NO come
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Guardar alimento</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
