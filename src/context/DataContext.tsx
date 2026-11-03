import React, { createContext, useContext, useState } from 'react';
import { 
  ChildProfile, 
  SensoryPreferences, 
  ChildFoodEntry, 
  MealPlanEntry, 
  MealPlateItem,
  FoodExperienceEntry, 
  FoodItem, 
  FoodStatus,
  ExperienceStatus,
  MealSlot,
  PreparedDishPreset
} from '../data/types';
import { MEXICAN_FOODS_CATALOG, MEXICAN_PREPARED_DISHES } from '../data/mexicanFoods';
import { LocalStore } from '../lib/storage';

interface DataContextType {
  child: ChildProfile;
  sensoryPreferences: SensoryPreferences;
  childFoods: ChildFoodEntry[];
  mealPlan: MealPlanEntry[];
  experiences: FoodExperienceEntry[];
  catalog: FoodItem[];
  preparedDishes: PreparedDishPreset[];
  
  // Computed helpers
  acceptedFoods: FoodItem[];
  avoidedFoods: FoodItem[];
  exploringFoods: FoodItem[];
  
  // Actions
  findFoodById: (foodId: string) => FoodItem | undefined;
  getFoodStatus: (foodId: string) => FoodStatus | 'none';
  getFoodPreparation: (foodId: string) => string | undefined;
  setFoodStatus: (foodId: string, status: FoodStatus, notes?: string, preparation?: string) => void;
  removeFoodStatus: (foodId: string) => void;
  updateChildProfile: (profile: Partial<ChildProfile>) => void;
  updateSensoryPreferences: (prefs: Partial<SensoryPreferences>) => void;
  
  // Weekly Menu Operations
  replaceMealPlateItem: (mealPlanId: string, itemId: string, newFoodId: string, newPreparation?: string) => void;
  replaceEntireDish: (mealPlanId: string, dishPreset: PreparedDishPreset) => void;
  generateWeeklyPlanAutomatically: () => void;
  removeMealPlanItem: (id: string) => void;

  addExperience: (foodId: string, status: ExperienceStatus, notes?: string) => void;
  resetAll: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [child, setChild] = useState<ChildProfile>(LocalStore.getChild());
  const [sensoryPreferences, setSensoryPreferences] = useState<SensoryPreferences>(LocalStore.getSensoryPreferences());
  const [childFoods, setChildFoods] = useState<ChildFoodEntry[]>(LocalStore.getChildFoods());
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>(LocalStore.getMealPlan());
  const [experiences, setExperiences] = useState<FoodExperienceEntry[]>(LocalStore.getExperiences());
  const [catalog] = useState<FoodItem[]>(MEXICAN_FOODS_CATALOG);
  const [preparedDishes] = useState<PreparedDishPreset[]>(MEXICAN_PREPARED_DISHES);

  const findFoodById = (foodId: string) => {
    return catalog.find(f => f.id === foodId);
  };

  const getFoodStatus = (foodId: string): FoodStatus | 'none' => {
    const entry = childFoods.find(cf => cf.foodId === foodId);
    return entry ? entry.status : 'none';
  };

  const getFoodPreparation = (foodId: string): string | undefined => {
    const entry = childFoods.find(cf => cf.foodId === foodId);
    return entry?.selectedPreparation;
  };

  const setFoodStatus = (foodId: string, status: FoodStatus, notes?: string, preparation?: string) => {
    const existingIndex = childFoods.findIndex(cf => cf.foodId === foodId);
    let updated: ChildFoodEntry[];
    
    if (existingIndex >= 0) {
      updated = [...childFoods];
      updated[existingIndex] = {
        ...updated[existingIndex],
        status,
        selectedPreparation: preparation !== undefined ? preparation : updated[existingIndex].selectedPreparation,
        notes: notes !== undefined ? notes : updated[existingIndex].notes,
        updatedAt: new Date().toISOString()
      };
    } else {
      updated = [
        ...childFoods,
        {
          childId: child.id,
          foodId,
          status,
          selectedPreparation: preparation || findFoodById(foodId)?.availablePreparations?.[0] || 'Al natural',
          notes: notes || '',
          updatedAt: new Date().toISOString()
        }
      ];
    }
    
    setChildFoods(updated);
    LocalStore.setChildFoods(updated);
  };

  const removeFoodStatus = (foodId: string) => {
    const updated = childFoods.filter(cf => cf.foodId !== foodId);
    setChildFoods(updated);
    LocalStore.setChildFoods(updated);
  };

  const updateChildProfile = (updates: Partial<ChildProfile>) => {
    const updated: ChildProfile = { ...child, ...updates };
    setChild(updated);
    LocalStore.setChild(updated);
  };

  const updateSensoryPreferences = (updates: Partial<SensoryPreferences>) => {
    const updated: SensoryPreferences = { ...sensoryPreferences, ...updates };
    setSensoryPreferences(updated);
    LocalStore.setSensoryPreferences(updated);
  };

  // Replace a single ingredient on the plate (e.g. substitute carrot for chayote)
  const replaceMealPlateItem = (
    mealPlanId: string, 
    itemId: string, 
    newFoodId: string, 
    newPreparation?: string
  ) => {
    const food = findFoodById(newFoodId);
    const chosenPrep = newPreparation || food?.availablePreparations?.[0] || food?.preparation || '';
    const isSafe = getFoodStatus(newFoodId) === 'accepted';
    const isTest = getFoodStatus(newFoodId) === 'exploring';

    const updated = mealPlan.map(mp => {
      if (mp.id === mealPlanId) {
        return {
          ...mp,
          items: mp.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                foodId: newFoodId,
                preparation: chosenPrep,
                isSafe,
                isTest
              };
            }
            return item;
          })
        };
      }
      return mp;
    });

    setMealPlan(updated);
    LocalStore.setMealPlan(updated);
  };

  // Replace the entire meal with another prepared Mexican dish preset
  const replaceEntireDish = (mealPlanId: string, dishPreset: PreparedDishPreset) => {
    const updated = mealPlan.map(mp => {
      if (mp.id === mealPlanId) {
        return {
          ...mp,
          mealTitle: dishPreset.title,
          items: dishPreset.items.map((it, idx) => ({
            id: `item-${Date.now()}-${idx}`,
            foodId: it.foodId,
            role: it.role,
            preparation: it.preparation,
            isSafe: getFoodStatus(it.foodId) === 'accepted',
            isTest: getFoodStatus(it.foodId) === 'exploring'
          })),
          notes: dishPreset.description
        };
      }
      return mp;
    });

    setMealPlan(updated);
    LocalStore.setMealPlan(updated);
  };

  const removeMealPlanItem = (id: string) => {
    const updated = mealPlan.filter(mp => mp.id !== id);
    setMealPlan(updated);
    LocalStore.setMealPlan(updated);
  };

  // Generates 7 full days of balanced Mexican meals (Lunes a Domingo)
  const generateWeeklyPlanAutomatically = () => {
    const days: MealPlanEntry['dayOfWeek'][] = [
      'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
    ];

    const breakfastDishes = preparedDishes.filter(d => d.slot === 'desayuno');
    const lunchDishes = preparedDishes.filter(d => d.slot === 'comida');
    const snackDishes = preparedDishes.filter(d => d.slot === 'colacion');
    const dinnerDishes = preparedDishes.filter(d => d.slot === 'cena');

    const newPlan: MealPlanEntry[] = [];

    days.forEach((day, index) => {
      // 1. DESAYUNO
      const bDish = breakfastDishes[index % breakfastDishes.length];
      newPlan.push({
        id: `mp-${day}-desayuno-${Date.now()}`,
        childId: child.id,
        dayOfWeek: day,
        slot: 'desayuno',
        mealTitle: bDish.title,
        items: bDish.items.map((it, i) => ({
          id: `item-${day}-b-${i}-${Date.now()}`,
          foodId: it.foodId,
          role: it.role,
          preparation: it.preparation,
          isSafe: getFoodStatus(it.foodId) === 'accepted',
          isTest: getFoodStatus(it.foodId) === 'exploring'
        })),
        notes: bDish.description
      });

      // 2. COMIDA (ALMUERZO PRINCIPAL: ej. Arroz, Frijoles, Pollo y Ensalada de Zanahoria)
      const lDish = lunchDishes[index % lunchDishes.length];
      newPlan.push({
        id: `mp-${day}-comida-${Date.now()}`,
        childId: child.id,
        dayOfWeek: day,
        slot: 'comida',
        mealTitle: lDish.title,
        items: lDish.items.map((it, i) => ({
          id: `item-${day}-l-${i}-${Date.now()}`,
          foodId: it.foodId,
          role: it.role,
          preparation: it.preparation,
          isSafe: getFoodStatus(it.foodId) === 'accepted',
          isTest: getFoodStatus(it.foodId) === 'exploring'
        })),
        notes: lDish.description
      });

      // 3. COLACIÓN
      const sDish = snackDishes[index % snackDishes.length];
      newPlan.push({
        id: `mp-${day}-colacion-${Date.now()}`,
        childId: child.id,
        dayOfWeek: day,
        slot: 'colacion',
        mealTitle: sDish.title,
        items: sDish.items.map((it, i) => ({
          id: `item-${day}-s-${i}-${Date.now()}`,
          foodId: it.foodId,
          role: it.role,
          preparation: it.preparation,
          isSafe: getFoodStatus(it.foodId) === 'accepted',
          isTest: getFoodStatus(it.foodId) === 'exploring'
        })),
        notes: sDish.description
      });

      // 4. CENA
      const dDish = dinnerDishes[index % dinnerDishes.length];
      newPlan.push({
        id: `mp-${day}-cena-${Date.now()}`,
        childId: child.id,
        dayOfWeek: day,
        slot: 'cena',
        mealTitle: dDish.title,
        items: dDish.items.map((it, i) => ({
          id: `item-${day}-d-${i}-${Date.now()}`,
          foodId: it.foodId,
          role: it.role,
          preparation: it.preparation,
          isSafe: getFoodStatus(it.foodId) === 'accepted',
          isTest: getFoodStatus(it.foodId) === 'exploring'
        })),
        notes: dDish.description
      });
    });

    setMealPlan(newPlan);
    LocalStore.setMealPlan(newPlan);
  };

  const addExperience = (foodId: string, status: ExperienceStatus, notes?: string) => {
    const now = new Date();
    const formattedDate = `Hoy (${now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })})`;
    const newItem: FoodExperienceEntry = {
      id: 'exp-' + Date.now(),
      childId: child.id,
      foodId,
      status,
      occurredAt: formattedDate,
      notes
    };
    const updated = [newItem, ...experiences];
    setExperiences(updated);
    LocalStore.setExperiences(updated);
  };

  const resetAll = () => {
    LocalStore.clearAllData();
    setChild(LocalStore.getChild());
    setSensoryPreferences(LocalStore.getSensoryPreferences());
    setChildFoods(LocalStore.getChildFoods());
    setMealPlan(LocalStore.getMealPlan());
    setExperiences(LocalStore.getExperiences());
  };

  const acceptedIds = new Set(childFoods.filter(c => c.status === 'accepted').map(c => c.foodId));
  const avoidedIds = new Set(childFoods.filter(c => c.status === 'avoided').map(c => c.foodId));
  const exploringIds = new Set(childFoods.filter(c => c.status === 'exploring').map(c => c.foodId));

  const acceptedFoods = catalog.filter(f => acceptedIds.has(f.id));
  const avoidedFoods = catalog.filter(f => avoidedIds.has(f.id));
  const exploringFoods = catalog.filter(f => exploringIds.has(f.id));

  return (
    <DataContext.Provider
      value={{
        child,
        sensoryPreferences,
        childFoods,
        mealPlan,
        experiences,
        catalog,
        preparedDishes,
        acceptedFoods,
        avoidedFoods,
        exploringFoods,
        findFoodById,
        getFoodStatus,
        getFoodPreparation,
        setFoodStatus,
        removeFoodStatus,
        updateChildProfile,
        updateSensoryPreferences,
        replaceMealPlateItem,
        replaceEntireDish,
        generateWeeklyPlanAutomatically,
        removeMealPlanItem,
        addExperience,
        resetAll
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe usarse dentro de un DataProvider');
  }
  return context;
};
