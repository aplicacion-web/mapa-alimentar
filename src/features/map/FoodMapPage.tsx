import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FoodCard } from '../../components/FoodCard';
import { Search, AlertCircle, ChefHat, Plus } from 'lucide-react';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';
import { AddCustomFoodModal } from '../../components/AddCustomFoodModal';

export const FoodMapPage: React.FC = () => {
  const { catalog, acceptedFoods, avoidedFoods, exploringFoods, getFoodStatus, getFoodPreparation, setFoodStatus, child } = useData();

  const [activeTab, setActiveTab] = useState<'todos' | 'accepted' | 'exploring' | 'avoided'>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = ['todos', 'cereales', 'proteínas', 'leguminosas', 'verduras', 'frutas', 'lácteos'];

  // Filter catalog
  const filteredFoods = catalog.filter((food) => {
    const status = getFoodStatus(food.id);

    // Tab filter
    if (activeTab === 'accepted' && status !== 'accepted') return false;
    if (activeTab === 'exploring' && status !== 'exploring') return false;
    if (activeTab === 'avoided' && status !== 'avoided') return false;

    // Category filter
    if (selectedCategory !== 'todos' && food.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = food.nameEsMx.toLowerCase().includes(q);
      const matchCat = food.category.toLowerCase().includes(q);
      const matchTex = food.textureTags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchTex) return false;
    }

    return true;
  });

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Catálogo de Alimentos</h2>
          <p className="text-xs text-slate-500">
            Define cómo come cada alimento <strong className="text-slate-700">{child.nickname}</strong>
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2 px-3 rounded-2xl flex items-center gap-1 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+ Agregar alimento</span>
        </button>
      </div>

      {/* 3 Quick Status Filter Tabs */}
      <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <button
            onClick={() => setActiveTab('accepted')}
            className={`p-2.5 rounded-2xl transition-all ${
              activeTab === 'accepted'
                ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm'
                : 'bg-slate-50 border border-slate-100 hover:bg-emerald-50/50'
            }`}
          >
            <p className="text-xl font-black text-emerald-700">{acceptedFoods.length}</p>
            <p className="text-[10px] font-bold text-slate-700 mt-0.5">Ya come</p>
          </button>

          <button
            onClick={() => setActiveTab('exploring')}
            className={`p-2.5 rounded-2xl transition-all ${
              activeTab === 'exploring'
                ? 'bg-amber-50 border-2 border-amber-500 shadow-sm'
                : 'bg-slate-50 border border-slate-100 hover:bg-amber-50/50'
            }`}
          >
            <p className="text-xl font-black text-amber-700">{exploringFoods.length}</p>
            <p className="text-[10px] font-bold text-slate-700 mt-0.5">Quiero probar</p>
          </button>

          <button
            onClick={() => setActiveTab('avoided')}
            className={`p-2.5 rounded-2xl transition-all ${
              activeTab === 'avoided'
                ? 'bg-rose-50 border-2 border-rose-500 shadow-sm'
                : 'bg-slate-50 border border-slate-100 hover:bg-rose-50/50'
            }`}
          >
            <p className="text-xl font-black text-rose-700">{avoidedFoods.length}</p>
            <p className="text-[10px] font-bold text-slate-700 mt-0.5">NO come</p>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar manzana, papa, huevo, arroz..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-brand-500 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Categories horizontal scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-xl capitalize font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'todos' ? 'Todos los grupos' : cat}
          </button>
        ))}
      </div>

      {/* Food list count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Mostrando {filteredFoods.length} alimentos</span>
        {activeTab !== 'todos' && (
          <button
            onClick={() => setActiveTab('todos')}
            className="text-brand-700 font-bold hover:underline"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Food Cards List */}
      <div className="space-y-3">
        {filteredFoods.map((food) => {
          const status = getFoodStatus(food.id);
          const prep = getFoodPreparation(food.id);

          return (
            <FoodCard
              key={food.id}
              food={food}
              status={status}
              selectedPreparation={prep}
              onStatusChange={(newStatus, newPrep) => {
                setFoodStatus(food.id, newStatus, undefined, newPrep);
              }}
            />
          );
        })}

        {filteredFoods.length === 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No encontramos "{searchQuery}"</h4>
            <p className="text-xs text-slate-500">
              ¿Tu hijo/a come este alimento? Puedes crearlo y registrarlo ahora mismo en su perfil.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Crear "{searchQuery || 'nuevo alimento'}"</span>
            </button>
          </div>
        )}
      </div>

      <DisclaimerBanner compact />

      <AddCustomFoodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultStatus={activeTab === 'todos' ? 'accepted' : activeTab}
      />
    </div>
  );
};
