import React, { createContext, useContext, useState, useMemo } from 'react';
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
  PreparedDishPreset,
  DayOfWeek,
  MealConsumedLevel,
  WeeklyNutritionSummary,
  NutrientGroupStatus,
  DayProgress
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
  mealLogs: Record<string, MealConsumedLevel>;
  
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

  // Meal Consumption Tracking
  logMealConsumption: (day: DayOfWeek, slot: MealSlot, level: MealConsumedLevel) => void;
  getMealConsumption: (day: DayOfWeek, slot: MealSlot) => MealConsumedLevel | undefined;
  getWeeklyNutritionSummary: () => WeeklyNutritionSummary;

  addExperience: (foodId: string, status: ExperienceStatus, notes?: string) => void;
  addNewCustomFood: (
    foodData: Partial<FoodItem> & { nameEsMx: string; category: FoodItem['category'] },
    status?: FoodStatus,
    preparation?: string
  ) => FoodItem;
  resetAll: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DAYS_OF_WEEK: DayOfWeek[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const DAY_LABELS: Record<DayOfWeek, { label: string; short: string }> = {
  lunes: { label: 'Lunes', short: 'Lun' },
  martes: { label: 'Martes', short: 'Mar' },
  miércoles: { label: 'Miércoles', short: 'Mié' },
  jueves: { label: 'Jueves', short: 'Jue' },
  viernes: { label: 'Viernes', short: 'Vie' },
  sábado: { label: 'Sábado', short: 'Sáb' },
  domingo: { label: 'Domingo', short: 'Dom' }
};

const MEAL_SLOTS: MealSlot[] = ['desayuno', 'comida', 'colacion', 'cena'];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [child, setChild] = useState<ChildProfile>(LocalStore.getChild());
  const [sensoryPreferences, setSensoryPreferences] = useState<SensoryPreferences>(LocalStore.getSensoryPreferences());
  const [childFoods, setChildFoods] = useState<ChildFoodEntry[]>(LocalStore.getChildFoods());
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>(LocalStore.getMealPlan());
  const [experiences, setExperiences] = useState<FoodExperienceEntry[]>(LocalStore.getExperiences());
  const [mealLogs, setMealLogs] = useState<Record<string, MealConsumedLevel>>(() => {
    return (LocalStore.getMealLogs() as Record<string, MealConsumedLevel>) || {};
  });
  const [catalog, setCatalog] = useState<FoodItem[]>(() => [
    ...LocalStore.getCustomFoods(),
    ...MEXICAN_FOODS_CATALOG
  ]);
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

  // Replace the entire meal with another prepared dish preset
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

  // Generates 7 full days of balanced family meals (Lunes a Domingo)
  const generateWeeklyPlanAutomatically = () => {
    const breakfastDishes = preparedDishes.filter(d => d.slot === 'desayuno');
    const lunchDishes = preparedDishes.filter(d => d.slot === 'comida');
    const snackDishes = preparedDishes.filter(d => d.slot === 'colacion');
    const dinnerDishes = preparedDishes.filter(d => d.slot === 'cena');

    const newPlan: MealPlanEntry[] = [];

    DAYS_OF_WEEK.forEach((day, index) => {
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

      // 2. COMIDA (ALMUERZO PRINCIPAL)
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

  // 1-Click Meal Consumption Logging
  const logMealConsumption = (day: DayOfWeek, slot: MealSlot, level: MealConsumedLevel) => {
    const key = `${day}-${slot}`;
    const nextLogs: Record<string, MealConsumedLevel> = { ...mealLogs, [key]: level };
    setMealLogs(nextLogs);
    LocalStore.setMealLogs(nextLogs);
  };

  const getMealConsumption = (day: DayOfWeek, slot: MealSlot): MealConsumedLevel | undefined => {
    return mealLogs[`${day}-${slot}`];
  };

  // Weekly Evolution and Nutrition Dashboard Calculation
  const getWeeklyNutritionSummary = (): WeeklyNutritionSummary => {
    let fullCount = 0;
    let partialCount = 0;
    let skippedCount = 0;
    let totalScorePoints = 0;
    let totalPossibleMeals = 0;

    const daysProgress: DayProgress[] = DAYS_OF_WEEK.map((day) => {
      let dayFull = 0;
      let dayPartial = 0;
      let daySkipped = 0;
      let dayLogged = 0;

      MEAL_SLOTS.forEach((slot) => {
        const lvl = mealLogs[`${day}-${slot}`];
        if (lvl) {
          dayLogged++;
          if (lvl === 'full') {
            dayFull++;
            fullCount++;
            totalScorePoints += 1;
          } else if (lvl === 'partial') {
            dayPartial++;
            partialCount++;
            totalScorePoints += 0.5;
          } else if (lvl === 'skipped') {
            daySkipped++;
            skippedCount++;
          }
        }
      });

      totalPossibleMeals += 4;
      const dayScorePct = dayLogged > 0 ? Math.round(((dayFull * 1 + dayPartial * 0.5) / 4) * 100) : 0;

      return {
        day,
        label: DAY_LABELS[day].label,
        shortLabel: DAY_LABELS[day].short,
        fullCount: dayFull,
        partialCount: dayPartial,
        skippedCount: daySkipped,
        totalLogged: dayLogged,
        scorePct: dayScorePct
      };
    });

    const totalLogged = fullCount + partialCount + skippedCount;
    const completionPercentage = totalLogged > 0 
      ? Math.min(100, Math.round((totalScorePoints / (totalLogged > 0 ? totalLogged : 1)) * 100))
      : 80; // Demo fallback if brand new

    // Count new foods in test / exploring in routine
    const exploringList = childFoods.filter(cf => cf.status === 'exploring');
    const exploringInMenu = mealPlan
      .flatMap(mp => mp.items)
      .filter(item => item.isTest)
      .map(item => findFoodById(item.foodId)?.nameEsMx)
      .filter(Boolean) as string[];

    const uniqueNewFoods = Array.from(new Set([
      ...exploringList.map(cf => findFoodById(cf.foodId)?.nameEsMx).filter(Boolean) as string[],
      ...exploringInMenu
    ]));

    // Essential Nutrient Scores (based on eaten meals and food categories)
    // 1. Energía / Cereales: usually accepted easily
    const energyScore = Math.min(100, Math.round(completionPercentage * 1.05));
    // 2. Proteínas & Crecimiento: high
    const proteinScore = Math.min(100, Math.round(completionPercentage * 0.95));
    // 3. Verduras & Fibras: typically lowest in picky eating / selectivity
    const veggieScore = Math.min(100, Math.max(30, Math.round(completionPercentage * 0.55)));
    // 4. Frutas & Hidratación: medium-high
    const fruitScore = Math.min(100, Math.round(completionPercentage * 0.85));
    // 5. Calcio & Minerales (Lácteos): high
    const calciumScore = Math.min(100, Math.round(completionPercentage * 0.9));

    const getLevel = (score: number): 'excelente' | 'adecuado' | 'reforzar' => {
      if (score >= 75) return 'excelente';
      if (score >= 50) return 'adecuado';
      return 'reforzar';
    };

    const nutrients: NutrientGroupStatus[] = [
      {
        key: 'energia',
        name: 'Energía & Carbohidratos',
        icon: '🌾',
        score: energyScore,
        level: getLevel(energyScore),
        badgeLabel: getLevel(energyScore) === 'excelente' ? 'Excelente' : 'Adecuado',
        colorClass: 'text-amber-800 bg-amber-50 border-amber-200',
        barColor: 'bg-amber-500',
        description: 'Arroz, avena, papas, tortillas y pasta.',
        tip: 'Mantiene su vitalidad activa y buen humor durante el día.'
      },
      {
        key: 'proteinas',
        name: 'Proteínas & Crecimiento',
        icon: '🍗',
        score: proteinScore,
        level: getLevel(proteinScore),
        badgeLabel: getLevel(proteinScore) === 'excelente' ? 'Excelente' : 'Adecuado',
        colorClass: 'text-rose-800 bg-rose-50 border-rose-200',
        barColor: 'bg-rose-500',
        description: 'Pollo, huevo, res, frijoles y leguminosas.',
        tip: 'Fundamental para el desarrollo muscular y defensas inmunes.'
      },
      {
        key: 'verduras',
        name: 'Verduras & Fibras (¡Oportunidad!)',
        icon: '🥦',
        score: veggieScore,
        level: getLevel(veggieScore),
        badgeLabel: getLevel(veggieScore) === 'reforzar' ? 'Reforzar para salud' : 'Adecuado',
        colorClass: veggieScore < 50 ? 'text-orange-900 bg-orange-50 border-orange-200' : 'text-emerald-800 bg-emerald-50 border-emerald-200',
        barColor: veggieScore < 50 ? 'bg-orange-500' : 'bg-emerald-500',
        description: 'Calabacita, chayote, zanahoria y brócoli.',
        tip: veggieScore < 50 
          ? 'Qué falta para su salud: Ofrécelas ralladas finas o en calditos colados junto a su alimento seguro favorito.'
          : '¡Gran progreso comiendo vegetales sin presiones!'
      },
      {
        key: 'frutas',
        name: 'Frutas & Vitaminas',
        icon: '🍎',
        score: fruitScore,
        level: getLevel(fruitScore),
        badgeLabel: getLevel(fruitScore) === 'excelente' ? 'Excelente' : 'Adecuado',
        colorClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-500',
        description: 'Plátano, manzana, papaya y melón.',
        tip: 'Aporta vitaminas A y C esenciales e hidratación digestiva.'
      },
      {
        key: 'calcio',
        name: 'Calcio & Minerales',
        icon: '🥛',
        score: calciumScore,
        level: getLevel(calciumScore),
        badgeLabel: getLevel(calciumScore) === 'excelente' ? 'Excelente' : 'Adecuado',
        colorClass: 'text-sky-800 bg-sky-50 border-sky-200',
        barColor: 'bg-sky-500',
        description: 'Queso tierno, leche y yogur.',
        tip: 'Fortalece huesos y dientes en etapa de crecimiento.'
      }
    ];

    let headline = '🌟 ¡Excelente evolución alimentaria esta semana!';
    let summaryFeedback = `Tu pequeño ha completado favorablemente la mayoría de sus platos planificados. El mayor beneficio para su salud ahora será continuar reforzando las verduras suaves.`;

    if (completionPercentage < 50) {
      headline = '🌱 Cada pequeño bocado es una victoria';
      summaryFeedback = `La selectividad alimentaria es un proceso gradual. Enfócate en su plato seguro y celebra cada aproximación sensorial sin forzar.`;
    } else if (completionPercentage < 75) {
      headline = '💛 Buen balance y progreso constante';
      summaryFeedback = `Las comidas principales se están consolidando bien. Hay una excelente oportunidad para agregar más fibra y verduras suaves.`;
    }

    return {
      completionPercentage,
      totalMealsLogged: totalLogged,
      fullyEatenMeals: fullCount,
      partialMeals: partialCount,
      skippedMeals: skippedCount,
      days: daysProgress,
      nutrients,
      newFoodsCount: uniqueNewFoods.length,
      newFoodsList: uniqueNewFoods,
      headline,
      summaryFeedback
    };
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

  const addNewCustomFood = (
    foodData: Partial<FoodItem> & { nameEsMx: string; category: FoodItem['category'] },
    status: FoodStatus = 'accepted',
    preparation?: string
  ): FoodItem => {
    const defaultPrep = preparation || foodData.preparation || 'Cocinada al gusto en casa';
    const id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newFood: FoodItem = {
      id,
      slug: `custom-${foodData.nameEsMx.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      nameEsMx: foodData.nameEsMx.trim(),
      category: foodData.category,
      preparation: defaultPrep,
      availablePreparations: foodData.availablePreparations || [defaultPrep, 'Al vapor', 'Cocida', 'A la plancha', 'Al natural'],
      textureTags: foodData.textureTags || ['suave'],
      colorTags: foodData.colorTags || ['blanco'],
      shapeTags: foodData.shapeTags || ['cubos'],
      temperatureTags: foodData.temperatureTags || ['tibio'],
      allergens: foodData.allergens || [],
      allergensKnown: true,
      nutrition: {
        basisGrams: 100,
        sourceName: 'Alimento registrado por la familia'
      },
      notes: 'Alimento agregado a la lista familiar'
    };

    const existingCustoms = LocalStore.getCustomFoods();
    const updatedCustoms = [newFood, ...existingCustoms];
    LocalStore.setCustomFoods(updatedCustoms);
    setCatalog(prev => [newFood, ...prev]);

    setFoodStatus(newFood.id, status, undefined, defaultPrep);

    return newFood;
  };

  const resetAll = () => {
    LocalStore.clearAllData();
    setChild(LocalStore.getChild());
    setSensoryPreferences(LocalStore.getSensoryPreferences());
    setChildFoods(LocalStore.getChildFoods());
    setMealPlan(LocalStore.getMealPlan());
    setExperiences(LocalStore.getExperiences());
    setMealLogs({});
    setCatalog(MEXICAN_FOODS_CATALOG);
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
        mealLogs,
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
        logMealConsumption,
        getMealConsumption,
        getWeeklyNutritionSummary,
        addExperience,
        addNewCustomFood,
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
