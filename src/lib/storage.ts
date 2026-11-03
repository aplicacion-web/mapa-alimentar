import { 
  ChildProfile, 
  SensoryPreferences, 
  ChildFoodEntry, 
  MealPlanEntry, 
  FoodExperienceEntry, 
  FoodItem 
} from '../data/types';
import { MEXICAN_FOODS_CATALOG, MEXICAN_PREPARED_DISHES } from '../data/mexicanFoods';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  country: string;
  locale: string;
  consentAt: string;
}

const STORAGE_KEYS = {
  USER: 'mapa_user_account',
  CHILD: 'mapa_child_profile',
  SENSORY: 'mapa_sensory_preferences',
  CHILD_FOODS: 'mapa_child_foods',
  MEAL_PLAN: 'mapa_meal_plan',
  EXPERIENCES: 'mapa_food_experiences',
  ONBOARDING_DONE: 'mapa_onboarding_completed',
  CUSTOM_FOODS: 'mapa_custom_foods'
};

const INITIAL_DEMO_CHILD: ChildProfile = {
  id: 'child-sofia',
  ownerId: 'user-demo-1',
  nickname: 'Sofía',
  ageBand: '4-6',
  knownAllergies: ['cacahuate', 'nuez'],
  notes: 'Sensible a texturas mezcladas y olores fuertes.',
  createdAt: new Date().toISOString()
};

const INITIAL_DEMO_SENSORY: SensoryPreferences = {
  childId: 'child-sofia',
  preferredTextures: ['crujiente', 'blando', 'liso'],
  preferredColors: ['blanco', 'dorado', 'amarillo'],
  preferredTemperatures: ['tibio', 'temperatura ambiente'],
  preferredForms: ['granos', 'cubos', 'tiras'],
  avoidedSensoryAttributes: ['alimentos mezclados', 'grumos', 'pellejitos']
};

const INITIAL_DEMO_FOODS: ChildFoodEntry[] = [
  { childId: 'child-sofia', foodId: 'f-arroz-rojo', status: 'accepted', selectedPreparation: 'Guisado suave con jitomate colado', notes: 'Le gusta suave', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-frijol-entero', status: 'accepted', selectedPreparation: 'Enteros de la olla muy suaves', notes: 'Bien cocidos', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-pollo-plancha', status: 'accepted', selectedPreparation: 'A la plancha doradita en cubos', notes: 'Sólo pechuga dorada', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-zanahoria-vapor', status: 'exploring', selectedPreparation: 'Cocida al vapor en bastones suaves', notes: 'Probando en bastoncitos', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-tortilla-maiz', status: 'accepted', selectedPreparation: 'Al comal suave', notes: 'Al comal recién hecha', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-papa-vapor', status: 'accepted', selectedPreparation: 'Cocida al vapor en cubos', notes: 'En cubos limpios', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-manzana-amarilla', status: 'accepted', selectedPreparation: 'Pelada en láminas delgadas crujientes', notes: 'En láminas sin cáscara', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-platano-tabasco', status: 'accepted', selectedPreparation: 'Fresco en rodajas delgadas', notes: 'En rodajitas sin manchas', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-huevo-revuelto', status: 'accepted', selectedPreparation: 'Revuelto tierno bien cocido', notes: 'Bien esponjoso', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-aguacate-hass', status: 'exploring', selectedPreparation: 'Fresco en rebanadas lisas', notes: 'Probando en láminas', updatedAt: new Date().toISOString() },
  { childId: 'child-sofia', foodId: 'f-jicama-bastones', status: 'exploring', selectedPreparation: 'En bastoncitos frescos crujientes', notes: 'Le gusta la textura crujiente', updatedAt: new Date().toISOString() }
];

const INITIAL_DEMO_MEAL_PLAN: MealPlanEntry[] = [
  // LUNES
  {
    id: 'mp-lunes-desayuno',
    childId: 'child-sofia',
    dayOfWeek: 'lunes',
    slot: 'desayuno',
    mealTitle: 'Desayuno Clásico Mexicano',
    items: [
      { id: 'i-1', foodId: 'f-huevo-revuelto', role: 'proteína', preparation: 'Revuelto tierno bien cocido', isSafe: true, isTest: false },
      { id: 'i-2', foodId: 'f-frijol-refrito', role: 'leguminosa', preparation: 'Colados y refritos tersos', isSafe: true, isTest: false },
      { id: 'i-3', foodId: 'f-tortilla-maiz', role: 'cereal', preparation: 'Al comal suave', isSafe: true, isTest: false }
    ],
    notes: 'Desayuno familiar sin presiones'
  },
  {
    id: 'mp-lunes-comida',
    childId: 'child-sofia',
    dayOfWeek: 'lunes',
    slot: 'comida',
    mealTitle: 'Plato Completo (Arroz, Frijoles, Pollo y Ensalada de Zanahoria)',
    items: [
      { id: 'i-4', foodId: 'f-arroz-rojo', role: 'cereal', preparation: 'Guisado suave con jitomate colado', isSafe: true, isTest: false },
      { id: 'i-5', foodId: 'f-frijol-entero', role: 'leguminosa', preparation: 'Enteros de la olla muy suaves', isSafe: true, isTest: false },
      { id: 'i-6', foodId: 'f-pollo-plancha', role: 'proteína', preparation: 'A la plancha doradita en cubos', isSafe: true, isTest: false },
      { id: 'i-7', foodId: 'f-zanahoria-vapor', role: 'verdura', preparation: 'Cocida al vapor en bastones suaves', isSafe: false, isTest: true }
    ],
    notes: 'Almuerzo completo: arroz, frijol y pollo como base segura + bastoncito de zanahoria para explorar'
  },
  {
    id: 'mp-lunes-colacion',
    childId: 'child-sofia',
    dayOfWeek: 'lunes',
    slot: 'colacion',
    mealTitle: 'Colación de Fruta Crujiente',
    items: [
      { id: 'i-8', foodId: 'f-manzana-amarilla', role: 'fruta', preparation: 'Pelada en láminas delgadas crujientes', isSafe: true, isTest: false }
    ]
  },
  {
    id: 'mp-lunes-cena',
    childId: 'child-sofia',
    dayOfWeek: 'lunes',
    slot: 'cena',
    mealTitle: 'Quesadilla al Comal con Aguacate',
    items: [
      { id: 'i-9', foodId: 'f-tortilla-maiz', role: 'cereal', preparation: 'Al comal suave', isSafe: true, isTest: false },
      { id: 'i-10', foodId: 'f-queso-oaxaca', role: 'lácteo', preparation: 'Fundido suave en quesadilla', isSafe: true, isTest: false },
      { id: 'i-11', foodId: 'f-aguacate-hass', role: 'verdura', preparation: 'Fresco en rebanadas lisas', isSafe: false, isTest: true }
    ]
  }
];

const INITIAL_DEMO_EXPERIENCES: FoodExperienceEntry[] = [
  { id: 'exp-1', childId: 'child-sofia', foodId: 'f-arroz-rojo', status: 'accepted', occurredAt: 'Hoy', notes: 'Comió la porción completa sin estrés' },
  { id: 'exp-2', childId: 'child-sofia', foodId: 'f-zanahoria-vapor', status: 'explored', occurredAt: 'Ayer', notes: 'Tocó el bastoncito de zanahoria con los dedos' },
  { id: 'exp-3', childId: 'child-sofia', foodId: 'f-pollo-plancha', status: 'accepted', occurredAt: 'Lunes', notes: 'Aceptó los cubitos dorados' }
];

export const LocalStore = {
  getUser(): UserAccount | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser(user: UserAccount | null) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  isOnboardingCompleted(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE) === 'true';
  },
  setOnboardingCompleted(done: boolean) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, done ? 'true' : 'false');
  },

  getChild(): ChildProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.CHILD);
    if (!raw) {
      this.setChild(INITIAL_DEMO_CHILD);
      return INITIAL_DEMO_CHILD;
    }
    return JSON.parse(raw);
  },
  setChild(child: ChildProfile) {
    localStorage.setItem(STORAGE_KEYS.CHILD, JSON.stringify(child));
  },

  getSensoryPreferences(): SensoryPreferences {
    const raw = localStorage.getItem(STORAGE_KEYS.SENSORY);
    if (!raw) {
      this.setSensoryPreferences(INITIAL_DEMO_SENSORY);
      return INITIAL_DEMO_SENSORY;
    }
    return JSON.parse(raw);
  },
  setSensoryPreferences(prefs: SensoryPreferences) {
    localStorage.setItem(STORAGE_KEYS.SENSORY, JSON.stringify(prefs));
  },

  getChildFoods(): ChildFoodEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CHILD_FOODS);
    if (!raw) {
      this.setChildFoods(INITIAL_DEMO_FOODS);
      return INITIAL_DEMO_FOODS;
    }
    return JSON.parse(raw);
  },
  setChildFoods(entries: ChildFoodEntry[]) {
    localStorage.setItem(STORAGE_KEYS.CHILD_FOODS, JSON.stringify(entries));
  },

  getMealPlan(): MealPlanEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MEAL_PLAN);
    if (!raw) {
      this.setMealPlan(INITIAL_DEMO_MEAL_PLAN);
      return INITIAL_DEMO_MEAL_PLAN;
    }
    return JSON.parse(raw);
  },
  setMealPlan(entries: MealPlanEntry[]) {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(entries));
  },

  getExperiences(): FoodExperienceEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
    if (!raw) {
      this.setExperiences(INITIAL_DEMO_EXPERIENCES);
      return INITIAL_DEMO_EXPERIENCES;
    }
    return JSON.parse(raw);
  },
  setExperiences(entries: FoodExperienceEntry[]) {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(entries));
  },

  getCustomFoods(): FoodItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },
  setCustomFoods(foods: FoodItem[]) {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(foods));
  },

  clearAllData() {
    localStorage.clear();
  }
};
