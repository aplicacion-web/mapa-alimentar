export type AgeBand = '1-3' | '4-6' | '7-10' | '11+';

export type FoodStatus = 'accepted' | 'avoided' | 'exploring';

export type ExperienceStatus = 'accepted' | 'explored' | 'refused' | 'not_offered';

export type MealSlot = 'desayuno' | 'comida' | 'cena' | 'colacion';

export type FoodRole = 'cereal' | 'leguminosa' | 'proteína' | 'verdura' | 'fruta' | 'lácteo' | 'otro';

export type DayOfWeek = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
export type MealConsumedLevel = 'full' | 'partial' | 'skipped';

export interface ChildProfile {
  id: string;
  ownerId?: string;
  nickname: string;
  ageBand: AgeBand;
  knownAllergies: string[];
  notes?: string;
  createdAt?: string;
  onboardingCompleted?: boolean;
}

export interface SensoryPreferences {
  childId?: string;
  preferredTextures: string[];
  avoidedTextures?: string[];
  preferredColors: string[];
  avoidedColors?: string[];
  preferredTemperatures?: string[];
  preferredForms?: string[];
  avoidedSensoryAttributes: string[];
}

export interface FoodItem {
  id: string;
  slug: string;
  nameEsMx: string;
  category: 'cereales' | 'proteínas' | 'leguminosas' | 'frutas' | 'verduras' | 'lácteos' | 'otros';
  textureTags: string[];
  colorTags: string[];
  shapeTags: string[];
  temperatureTags: string[];
  allergens: string[];
  allergensKnown: boolean;
  preparation: string;
  availablePreparations: string[];
  nutrition: {
    basisGrams: number;
    energyKcal?: number;
    proteinGrams?: number;
    proteinG?: number;
    fiberGrams?: number;
    fiberG?: number;
    carbsGrams?: number;
    fatGrams?: number;
    sodiumMg?: number;
    sourceName: string;
  };
  notes?: string;
}

export interface ChildFoodEntry {
  childId: string;
  foodId: string;
  status: FoodStatus;
  selectedPreparation?: string;
  notes?: string;
  updatedAt: string;
}

// Representa um alimento dentro de um prato composto
export interface MealPlateItem {
  id: string;
  foodId: string;
  role: FoodRole;
  preparation: string;
  isSafe: boolean; // Porto seguro da criança
  isTest: boolean; // Alimento novo em teste
}

export interface MealLogEntry {
  dayOfWeek: DayOfWeek;
  slot: MealSlot;
  level: MealConsumedLevel;
  timestamp: string;
}

// Resumo semanal para o gráfico lúdico e intuitivo de evolução nutricional
export interface NutrientGroupStatus {
  key: string;
  name: string;
  icon: string;
  score: number; // 0 a 100
  level: 'excelente' | 'adecuado' | 'reforzar';
  badgeLabel: string;
  colorClass: string;
  barColor: string;
  description: string;
  tip: string;
}

export interface DayProgress {
  day: DayOfWeek;
  label: string;
  shortLabel: string;
  fullCount: number;
  partialCount: number;
  skippedCount: number;
  totalLogged: number;
  scorePct: number; // 0 a 100
}

export interface WeeklyNutritionSummary {
  completionPercentage: number;
  totalMealsLogged: number;
  fullyEatenMeals: number;
  partialMeals: number;
  skippedMeals: number;
  days: DayProgress[];
  nutrients: NutrientGroupStatus[];
  newFoodsCount: number;
  newFoodsList: string[];
  headline: string;
  summaryFeedback: string;
}

// Representa a refeição completa do horário (ex: Almoço / Comida com arroz, feijão, frango e cenoura)
export interface MealPlanEntry {
  id: string;
  childId: string;
  dayOfWeek: DayOfWeek;
  slot: MealSlot;
  mealTitle: string;
  items: MealPlateItem[];
  notes?: string;
  consumedLevel?: MealConsumedLevel;
}

export interface PreparedDishPreset {
  id: string;
  title: string;
  slot: MealSlot;
  description: string;
  items: {
    foodId: string;
    role: FoodRole;
    preparation: string;
  }[];
}

export interface FoodExperienceEntry {
  id: string;
  childId: string;
  foodId: string;
  status: ExperienceStatus;
  occurredAt: string;
  notes?: string;
}

export interface AlternativeScoreResult {
  food: FoodItem;
  score: number;
  textureOverlap: string[];
  colorOverlap: string[];
  shapeOverlap: string[];
  explanation: string;
}
