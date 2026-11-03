export type AgeBand = '1-3' | '4-6' | '7-10' | '11+';

export type FoodStatus = 'accepted' | 'avoided' | 'exploring';

export type ExperienceStatus = 'accepted' | 'explored' | 'refused' | 'not_offered';

export type MealSlot = 'desayuno' | 'comida' | 'cena' | 'colacion';

export type FoodRole = 'cereal' | 'leguminosa' | 'proteína' | 'verdura' | 'fruta' | 'lácteo' | 'otro';

export interface ChildProfile {
  id: string;
  ownerId: string;
  nickname: string;
  ageBand: AgeBand;
  knownAllergies: string[];
  notes?: string;
  createdAt: string;
}

export interface SensoryPreferences {
  childId: string;
  preferredTextures: string[];
  preferredColors: string[];
  preferredTemperatures: string[];
  preferredForms: string[];
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
    fiberGrams?: number;
    carbsGrams?: number;
    fatGrams?: number;
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

// Representa a refeição completa do horário (ex: Almoço / Comida com arroz, feijão, frango e cenoura)
export interface MealPlanEntry {
  id: string;
  childId: string;
  dayOfWeek: 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
  slot: MealSlot;
  mealTitle: string; // Ex: "Comida Tradicional Mexicana (Arroz, Frijoles, Pollo y Verdura)"
  items: MealPlateItem[];
  notes?: string;
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
