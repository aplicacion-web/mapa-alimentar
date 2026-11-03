import { FoodItem, PreparedDishPreset } from './types';

export const MEXICAN_FOODS_CATALOG: FoodItem[] = [
  // CEREALES
  {
    id: 'f-arroz-blanco',
    slug: 'arroz-blanco-cocido',
    nameEsMx: 'Arroz blanco',
    category: 'cereales',
    textureTags: ['blando', 'granulado', 'húmedo'],
    colorTags: ['blanco'],
    shapeTags: ['granos', 'suelto'],
    temperatureTags: ['tibio', 'caliente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Al vapor suelto y tibio, sin verduras visibles.',
    availablePreparations: ['Al vapor (suelto)', 'Bien cocido suave', 'En tortitas doradas'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 130,
      proteinGrams: 2.7,
      fiberGrams: 0.4,
      carbsGrams: 28.2,
      fatGrams: 0.3,
      sourceName: 'Base de Datos de Alimentos (México)'
    }
  },
  {
    id: 'f-arroz-rojo',
    slug: 'arroz-rojo-mexicano',
    nameEsMx: 'Arroz rojo tradicional',
    category: 'cereales',
    textureTags: ['blando', 'granulado', 'húmedo'],
    colorTags: ['rojo', 'naranja'],
    shapeTags: ['granos', 'suelto'],
    temperatureTags: ['tibio', 'caliente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Guisado suave con puré de jitomate colado, sin tropezones.',
    availablePreparations: ['Guisado suave con jitomate colado', 'Con caldo ligero'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 142,
      proteinGrams: 2.9,
      fiberGrams: 0.8,
      carbsGrams: 27.5,
      fatGrams: 2.1,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-tortilla-maiz',
    slug: 'tortilla-maiz-blanco',
    nameEsMx: 'Tortilla de maíz nixtamalizado',
    category: 'cereales',
    textureTags: ['flexible', 'suave', 'masticable'],
    colorTags: ['amarillo', 'blanco'],
    shapeTags: ['redondo', 'plano', 'lámina'],
    temperatureTags: ['tibio', 'caliente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Recién calentada en comal sin grasa, suave y flexible.',
    availablePreparations: ['Al comal suave', 'Tostadita crujiente', 'Cortada en triángulos'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 218,
      proteinGrams: 5.7,
      fiberGrams: 6.3,
      carbsGrams: 45.1,
      fatGrams: 2.9,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-sopa-fideo',
    slug: 'sopa-fideo-caldito',
    nameEsMx: 'Sopa de fideo mexicana (caldosa)',
    category: 'cereales',
    textureTags: ['blando', 'resbaloso', 'caldoso'],
    colorTags: ['rojo claro', 'dorado'],
    shapeTags: ['hebras cortas', 'caldito'],
    temperatureTags: ['tibio'],
    allergens: ['gluten'],
    allergensKnown: true,
    preparation: 'Fideo fino cocido en caldito de jitomate natural colado.',
    availablePreparations: ['En caldito ligero colado', 'Seca guisadita suave'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 120,
      proteinGrams: 3.5,
      fiberGrams: 1.2,
      carbsGrams: 22.0,
      fatGrams: 2.1,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-totopos-horno',
    slug: 'totopos-horneados',
    nameEsMx: 'Totopos de maíz horneados',
    category: 'cereales',
    textureTags: ['crujiente', 'seco', 'quebradizo'],
    colorTags: ['dorado', 'amarillo'],
    shapeTags: ['triángulo', 'plano'],
    temperatureTags: ['temperatura ambiente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Horneados sin freír, corte triangular crocante.',
    availablePreparations: ['Horneados crujientes sin sal', 'Ligeramente tostados'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 380,
      proteinGrams: 7.1,
      fiberGrams: 7.5,
      carbsGrams: 72.0,
      fatGrams: 5.2,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-bolillo',
    slug: 'bolillo-sin-migajon',
    nameEsMx: 'Bolillo tradicional',
    category: 'cereales',
    textureTags: ['crujiente', 'seco', 'quebradizo'],
    colorTags: ['dorado', 'marfil'],
    shapeTags: ['ovalado', 'alargado'],
    temperatureTags: ['temperatura ambiente', 'tibio'],
    allergens: ['gluten'],
    allergensKnown: true,
    preparation: 'Corteza dorada horneada (retirando el migajón húmedo si prefiere seco).',
    availablePreparations: ['Corteza tostada crujiente', 'En rebanaditas tostadas', 'Blando fresco'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 275,
      proteinGrams: 8.9,
      fiberGrams: 2.7,
      carbsGrams: 55.4,
      fatGrams: 1.8,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-avena-cocida',
    slug: 'avena-cocida-agua',
    nameEsMx: 'Avena cocida suave',
    category: 'cereales',
    textureTags: ['cremoso', 'pastoso', 'homogéneo', 'blando'],
    colorTags: ['beige', 'blanco'],
    shapeTags: ['papilla', 'sin forma'],
    temperatureTags: ['tibio'],
    allergens: ['avena'],
    allergensKnown: true,
    preparation: 'Hojuelas de avena bien hidratadas y cocidas hasta quedar tersas.',
    availablePreparations: ['Cocida suave en agua con canela', 'Espesa tipo papilla'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 71,
      proteinGrams: 2.5,
      fiberGrams: 1.7,
      carbsGrams: 12.0,
      fatGrams: 1.5,
      sourceName: 'INCMNSZ México'
    }
  },

  // PROTEÍNAS
  {
    id: 'f-pollo-deshebrado',
    slug: 'pechuga-pollo-deshebrada',
    nameEsMx: 'Pechuga de pollo hervida',
    category: 'proteínas',
    textureTags: ['fibroso', 'blando', 'seco'],
    colorTags: ['blanco'],
    shapeTags: ['hebras', 'tiras'],
    temperatureTags: ['tibio', 'temperatura ambiente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Hervida en agua y deshebrada fina y seca.',
    availablePreparations: ['Hervida y deshebrada fina seca', 'En caldito de pollo', 'En cubitos suaves'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 165,
      proteinGrams: 31.0,
      fiberGrams: 0.0,
      carbsGrams: 0.0,
      fatGrams: 3.6,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-pollo-plancha',
    slug: 'pechuga-pollo-plancha-dorada',
    nameEsMx: 'Pechuga de pollo a la plancha',
    category: 'proteínas',
    textureTags: ['firme', 'crujiente por fuera', 'seco'],
    colorTags: ['dorado', 'blanco'],
    shapeTags: ['cubos', 'tiras'],
    temperatureTags: ['tibio', 'caliente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Sellada en sartén hasta formar corteza doradita, cortada en cubos uniformes.',
    availablePreparations: ['A la plancha dorada en cubos', 'En fajitas delgadas', 'En tiritas tipo dedos'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 187,
      proteinGrams: 29.8,
      fiberGrams: 0.0,
      carbsGrams: 0.0,
      fatGrams: 7.2,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-pollo-empanizado',
    slug: 'pechuga-pollo-empanizada-horno',
    nameEsMx: 'Milanesa de pollo suave al horno',
    category: 'proteínas',
    textureTags: ['crujiente por fuera', 'tierno por dentro'],
    colorTags: ['dorado'],
    shapeTags: ['tiras', 'lámina'],
    temperatureTags: ['tibio'],
    allergens: ['gluten', 'huevo'],
    allergensKnown: true,
    preparation: 'Empanizada con pan molido horneada sin grasa en exceso.',
    availablePreparations: ['Al horno en tiras crujientes', 'En cuadritos tipo nuggets caseros'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 210,
      proteinGrams: 25.0,
      fiberGrams: 1.0,
      carbsGrams: 12.0,
      fatGrams: 6.5,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-huevo-revuelto',
    slug: 'huevo-revuelto-bien-cocido',
    nameEsMx: 'Huevo revuelto tierno',
    category: 'proteínas',
    textureTags: ['blando', 'esponjoso', 'húmedo'],
    colorTags: ['amarillo'],
    shapeTags: ['grumos suaves', 'sin forma'],
    temperatureTags: ['tibio'],
    allergens: ['huevo'],
    allergensKnown: true,
    preparation: 'Revuelto tierno bien cocido sin zonas crudas.',
    availablePreparations: ['Revuelto tierno esponjoso', 'Cocido duro (sólo clara en cubitos)', 'En tortita delgada doblada'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 154,
      proteinGrams: 12.6,
      fiberGrams: 0.0,
      carbsGrams: 1.1,
      fatGrams: 10.6,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-picadillo-res',
    slug: 'picadillo-res-papitas',
    nameEsMx: 'Picadillo de res suave con papitas',
    category: 'proteínas',
    textureTags: ['granulado', 'blando', 'húmedo'],
    colorTags: ['marrón', 'rojo claro'],
    shapeTags: ['granos con cubitos pequeños'],
    temperatureTags: ['tibio'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Carne molida magra guisada con papita picada en daditos muy tiernos sin picante.',
    availablePreparations: ['Guisado suave con papitas tiernas', 'Carne molida sequita'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 195,
      proteinGrams: 19.5,
      fiberGrams: 1.2,
      carbsGrams: 8.5,
      fatGrams: 9.0,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-queso-panela',
    slug: 'queso-panela-cubos',
    nameEsMx: 'Queso panela fresco',
    category: 'lácteos',
    textureTags: ['blando', 'firme', 'húmedo', 'resbaloso'],
    colorTags: ['blanco'],
    shapeTags: ['cubos', 'geométrico'],
    temperatureTags: ['frío', 'temperatura ambiente'],
    allergens: ['lácteos'],
    allergensKnown: true,
    preparation: 'Fresco cortado en dados pequeños de 1 cm.',
    availablePreparations: ['Fresco en cubitos fríos', 'Asado al comal con costrita dorada', 'En bastones delgados'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 246,
      proteinGrams: 18.2,
      fiberGrams: 0.0,
      carbsGrams: 3.5,
      fatGrams: 17.5,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-queso-oaxaca',
    slug: 'queso-oaxaca-hebras',
    nameEsMx: 'Queso Oaxaca (Quesillo)',
    category: 'lácteos',
    textureTags: ['elástico', 'fibroso', 'masticable'],
    colorTags: ['blanco'],
    shapeTags: ['hebras', 'tiras'],
    temperatureTags: ['temperatura ambiente'],
    allergens: ['lácteos'],
    allergensKnown: true,
    preparation: 'Deshebrado fino en hebras o fundido en quesadilla.',
    availablePreparations: ['Fundido suave en quesadilla', 'Deshebrado en hebras para dedos', 'En rollito compacto'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 320,
      proteinGrams: 22.5,
      fiberGrams: 0.0,
      carbsGrams: 2.1,
      fatGrams: 25.0,
      sourceName: 'INCMNSZ México'
    }
  },

  // LEGUMINOSAS
  {
    id: 'f-frijol-refrito',
    slug: 'frijoles-negros-refritos-tersos',
    nameEsMx: 'Frijoles negros refritos colados',
    category: 'leguminosas',
    textureTags: ['pastoso', 'cremoso', 'homogéneo', 'blando'],
    colorTags: ['negro', 'marrón oscuro'],
    shapeTags: ['puré', 'sin forma'],
    temperatureTags: ['tibio'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Licuados y colados sin pellejitos perceptibles, tersos.',
    availablePreparations: ['Colados y refritos tersos (sin pellejos)', 'Machacados suaves'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 110,
      proteinGrams: 6.2,
      fiberGrams: 5.5,
      carbsGrams: 17.8,
      fatGrams: 2.2,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-frijol-entero',
    slug: 'frijoles-bayos-enteros',
    nameEsMx: 'Frijoles bayos de la olla',
    category: 'leguminosas',
    textureTags: ['blando', 'harinoso por dentro', 'húmedo'],
    colorTags: ['café claro', 'beige'],
    shapeTags: ['ovalado', 'granos'],
    temperatureTags: ['tibio', 'caliente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Cocidos en olla de barro o exprés hasta deshacerse al tacto.',
    availablePreparations: ['Enteros escurridos muy suaves', 'En caldito claro colado', 'Aplastados con tenedor'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 95,
      proteinGrams: 6.8,
      fiberGrams: 6.0,
      carbsGrams: 16.5,
      fatGrams: 0.6,
      sourceName: 'INCMNSZ México'
    }
  },

  // VERDURAS Y SALADAS
  {
    id: 'f-zanahoria-vapor',
    slug: 'zanahoria-cocida-bastones',
    nameEsMx: 'Zanahoria fresca o al vapor',
    category: 'verduras',
    textureTags: ['blando', 'húmedo', 'tierno'],
    colorTags: ['naranja'],
    shapeTags: ['bastones', 'alargado'],
    temperatureTags: ['tibio'],
    allergens: [],
    allergensKnown: true,
    preparation: 'En bastones suaves cocidos al vapor o ralladita finita.',
    availablePreparations: ['Cocida al vapor en bastones suaves', 'Cruda rallada finita dulce', 'En cubitos cocidos tiernos'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 35,
      proteinGrams: 0.8,
      fiberGrams: 2.8,
      carbsGrams: 8.2,
      fatGrams: 0.2,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-papa-vapor',
    slug: 'papa-cocida-vapor-cubos',
    nameEsMx: 'Papa blanca',
    category: 'verduras',
    textureTags: ['blando', 'harinoso', 'húmedo'],
    colorTags: ['blanco', 'marfil'],
    shapeTags: ['cubos', 'geométrico'],
    temperatureTags: ['tibio'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Pelada y cortada en cubitos regulares cocida al vapor.',
    availablePreparations: ['Cocida al vapor en cubos', 'Al horno en gajos crujientes', 'En puré liso sin grumos'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 87,
      proteinGrams: 1.9,
      fiberGrams: 1.8,
      carbsGrams: 20.1,
      fatGrams: 0.1,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-aguacate-hass',
    slug: 'aguacate-hass-rebanadas',
    nameEsMx: 'Aguacate Hass',
    category: 'verduras',
    textureTags: ['cremoso', 'untuoso', 'blando', 'liso'],
    colorTags: ['verde', 'amarillo verdoso'],
    shapeTags: ['láminas', 'medias lunas'],
    temperatureTags: ['temperatura ambiente', 'fresco'],
    allergens: [],
    allergensKnown: true,
    preparation: 'En rebanaditas lisas o cubos tiernos sin condimentos.',
    availablePreparations: ['Fresco en rebanadas lisas', 'En cubitos uniformes', 'Machacado suave untable'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 160,
      proteinGrams: 2.0,
      fiberGrams: 6.7,
      carbsGrams: 8.5,
      fatGrams: 14.7,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-calabacita-suave',
    slug: 'calabacita-cocida-rodajas',
    nameEsMx: 'Calabacita tierna mexicana',
    category: 'verduras',
    textureTags: ['blando', 'húmedo', 'resbaloso'],
    colorTags: ['verde claro', 'blanco'],
    shapeTags: ['medias lunas', 'redondo'],
    temperatureTags: ['tibio'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Al vapor en medias lunas suaves sin semillas grandes.',
    availablePreparations: ['Al vapor en medias lunas suaves', 'En cubitos cocidos al vapor', 'Guisadita suave con jitomate'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 17,
      proteinGrams: 1.2,
      fiberGrams: 1.1,
      carbsGrams: 3.1,
      fatGrams: 0.3,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-chayote-cubos',
    slug: 'chayote-cocido-cubitos',
    nameEsMx: 'Chayote mexicano tierno',
    category: 'verduras',
    textureTags: ['blando', 'acuoso', 'liso'],
    colorTags: ['verde muy claro', 'blanco'],
    shapeTags: ['cubos', 'geométrico'],
    temperatureTags: ['tibio'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Pelado y cocido al vapor en daditos tiernos, sabor muy neutro.',
    availablePreparations: ['Cocido en cubitos al vapor', 'En bastoncitos hervidos', 'En puré suave colado'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 19,
      proteinGrams: 0.8,
      fiberGrams: 1.7,
      carbsGrams: 4.5,
      fatGrams: 0.1,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-jicama-bastones',
    slug: 'jicama-fresca-bastones',
    nameEsMx: 'Jícama fresca',
    category: 'verduras',
    textureTags: ['crujiente', 'acuoso', 'fresco'],
    colorTags: ['blanco'],
    shapeTags: ['bastones', 'alargado'],
    temperatureTags: ['fresco', 'temperatura ambiente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Completamente pelada en tiritas crujientes y frescas (opcional con gotitas de limón).',
    availablePreparations: ['En bastoncitos frescos crujientes', 'En cubitos fríos', 'Ralladita fina'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 38,
      proteinGrams: 0.7,
      fiberGrams: 4.9,
      carbsGrams: 8.8,
      fatGrams: 0.1,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-pepino-pelado',
    slug: 'pepino-pelado-sin-semillas',
    nameEsMx: 'Pepino fresco sin semillas',
    category: 'verduras',
    textureTags: ['crujiente', 'acuoso', 'fresco'],
    colorTags: ['verde claro', 'blanco'],
    shapeTags: ['medias lunas', 'bastones'],
    temperatureTags: ['frío', 'temperatura ambiente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Completamente pelado y sin semillas centrales para textura uniforme.',
    availablePreparations: ['Crudo en bastones sin semillas', 'En rodajas delgaditas', 'En cubitos sin centro'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 15,
      proteinGrams: 0.7,
      fiberGrams: 0.5,
      carbsGrams: 3.6,
      fatGrams: 0.1,
      sourceName: 'INCMNSZ México'
    }
  },

  // FRUTAS
  {
    id: 'f-manzana-amarilla',
    slug: 'manzana-amarilla-pelada',
    nameEsMx: 'Manzana Golden (amarilla)',
    category: 'frutas',
    textureTags: ['crujiente', 'acuoso', 'firme'],
    colorTags: ['amarillo pálido', 'blanco'],
    shapeTags: ['láminas', 'medias lunas'],
    temperatureTags: ['fresco', 'temperatura ambiente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Completamente pelada sin cáscara, en láminas delgadas.',
    availablePreparations: ['Pelada en láminas delgadas crujientes', 'Cocida al vapor en compota suave', 'Rallada finita', 'En cubitos pequeños'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 52,
      proteinGrams: 0.3,
      fiberGrams: 2.4,
      carbsGrams: 13.8,
      fatGrams: 0.2,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-platano-tabasco',
    slug: 'platano-tabasco-rodajas',
    nameEsMx: 'Plátano Tabasco maduro',
    category: 'frutas',
    textureTags: ['blando', 'cremoso', 'liso'],
    colorTags: ['amarillo claro', 'marfil'],
    shapeTags: ['rodajas', 'redondo'],
    temperatureTags: ['temperatura ambiente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Maduro en su punto sin manchitas oscuras, en rodajitas.',
    availablePreparations: ['Fresco en rodajas delgadas', 'Machacado suave', 'En mitades a lo largo'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 89,
      proteinGrams: 1.1,
      fiberGrams: 2.6,
      carbsGrams: 22.8,
      fatGrams: 0.3,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-papaya-cubos',
    slug: 'papaya-maradol-cubos',
    nameEsMx: 'Papaya Maradol',
    category: 'frutas',
    textureTags: ['blando', 'acuoso', 'resbaloso', 'fusión en boca'],
    colorTags: ['naranja salmón'],
    shapeTags: ['cubos', 'geométrico'],
    temperatureTags: ['frío', 'temperatura ambiente'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Dulce sin semillas en cubos de 1.5 cm.',
    availablePreparations: ['En cubitos uniformes sin semillas', 'En láminas delgadas'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 43,
      proteinGrams: 0.5,
      fiberGrams: 1.7,
      carbsGrams: 10.8,
      fatGrams: 0.3,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-pera-suave',
    slug: 'pera-mantequilla-laminas',
    nameEsMx: 'Pera mantequilla',
    category: 'frutas',
    textureTags: ['blando', 'jugoso', 'firme tierno'],
    colorTags: ['blanco', 'marfil'],
    shapeTags: ['láminas', 'medias lunas'],
    temperatureTags: ['temperatura ambiente', 'fresco'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Pelada sin corazón en láminas suaves.',
    availablePreparations: ['Pelada cruda en láminas delgadas', 'Al vapor cocida dulce', 'En cubitos tiernos'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 57,
      proteinGrams: 0.4,
      fiberGrams: 3.1,
      carbsGrams: 15.2,
      fatGrams: 0.1,
      sourceName: 'INCMNSZ México'
    }
  },
  {
    id: 'f-melon-verde',
    slug: 'melon-verde-cubos',
    nameEsMx: 'Melón verde dulce',
    category: 'frutas',
    textureTags: ['crujiente tierno', 'acuoso', 'fresco'],
    colorTags: ['verde claro'],
    shapeTags: ['cubos', 'geométrico'],
    temperatureTags: ['frío'],
    allergens: [],
    allergensKnown: true,
    preparation: 'Sin cáscara en cubitos regulares frescos.',
    availablePreparations: ['En cubos fríos sin cáscara', 'En bolitas o rodajitas delgadas'],
    nutrition: {
      basisGrams: 100,
      energyKcal: 36,
      proteinGrams: 0.5,
      fiberGrams: 0.9,
      carbsGrams: 9.1,
      fatGrams: 0.1,
      sourceName: 'INCMNSZ México'
    }
  }
];

// COLECCIÓN DE PLATOS PREPARADOS TÍPICOS MEXICANOS
export const MEXICAN_PREPARED_DISHES: PreparedDishPreset[] = [
  // 1. COMIDAS (ALMUERZOS) COMPLETOS
  {
    id: 'dish-comida-tradicional',
    slot: 'comida',
    title: 'Plato Tradicional Mexicano Completo',
    description: 'Arroz rojo + Frijoles de la olla + Pechuga a la plancha + Bastones de zanahoria',
    items: [
      { foodId: 'f-arroz-rojo', role: 'cereal', preparation: 'Guisado suave con jitomate colado' },
      { foodId: 'f-frijol-entero', role: 'leguminosa', preparation: 'Enteros de la olla muy suaves' },
      { foodId: 'f-pollo-plancha', role: 'proteína', preparation: 'A la plancha doradita en cubos' },
      { foodId: 'f-zanahoria-vapor', role: 'verdura', preparation: 'Cocida al vapor en bastones suaves' }
    ]
  },
  {
    id: 'dish-comida-casera-picadillo',
    slot: 'comida',
    title: 'Comida Casera con Picadillo y Tortilla',
    description: 'Picadillo de res con papitas + Arroz blanco + Tortilla de maíz + Aguacate',
    items: [
      { foodId: 'f-picadillo-res', role: 'proteína', preparation: 'Guisado suave con papitas tiernas' },
      { foodId: 'f-arroz-blanco', role: 'cereal', preparation: 'Al vapor suelto y tibio' },
      { foodId: 'f-tortilla-maiz', role: 'cereal', preparation: 'Al comal suave calientita' },
      { foodId: 'f-aguacate-hass', role: 'verdura', preparation: 'Fresco en rebanaditas lisas' }
    ]
  },
  {
    id: 'dish-comida-fideo-milanesa',
    slot: 'comida',
    title: 'Sopa de Fideo y Milanesa de Pollo',
    description: 'Sopa de fideo en caldito + Milanesa suave al horno + Puré de papa blanco',
    items: [
      { foodId: 'f-sopa-fideo', role: 'cereal', preparation: 'En caldito ligero colado' },
      { foodId: 'f-pollo-empanizado', role: 'proteína', preparation: 'Al horno en tiras crujientes' },
      { foodId: 'f-papa-vapor', role: 'verdura', preparation: 'En puré liso sin grumos' }
    ]
  },
  {
    id: 'dish-comida-pollo-deshebrado',
    slot: 'comida',
    title: 'Pechuga Deshebrada con Arroz y Calabacita',
    description: 'Pechuga hervida deshebrada + Arroz blanco + Frijol negro refrito + Calabacitas suaves',
    items: [
      { foodId: 'f-pollo-deshebrado', role: 'proteína', preparation: 'Hervida y deshebrada fina seca' },
      { foodId: 'f-arroz-blanco', role: 'cereal', preparation: 'Al vapor suelto y tibio' },
      { foodId: 'f-frijol-refrito', role: 'leguminosa', preparation: 'Colados y refritos tersos' },
      { foodId: 'f-calabacita-suave', role: 'verdura', preparation: 'Al vapor en medias lunas suaves' }
    ]
  },

  // 2. DESAYUNOS TÍPICOS
  {
    id: 'dish-desayuno-huevo-frijol',
    slot: 'desayuno',
    title: 'Desayuno Clásico Mexicano',
    description: 'Huevo revuelto tierno + Frijoles negros refritos + Tortilla de maíz',
    items: [
      { foodId: 'f-huevo-revuelto', role: 'proteína', preparation: 'Revuelto tierno bien cocido' },
      { foodId: 'f-frijol-refrito', role: 'leguminosa', preparation: 'Colados y refritos tersos' },
      { foodId: 'f-tortilla-maiz', role: 'cereal', preparation: 'Al comal suave' }
    ]
  },
  {
    id: 'dish-desayuno-avena-fruta',
    slot: 'desayuno',
    title: 'Desayuno Reconfortante de Avena',
    description: 'Avena cocida suave + Plátano Tabasco en rodajas + Bolillo tostado',
    items: [
      { foodId: 'f-avena-cocida', role: 'cereal', preparation: 'Cocida suave en agua con canela' },
      { foodId: 'f-platano-tabasco', role: 'fruta', preparation: 'Fresco en rodajas delgadas' },
      { foodId: 'f-bolillo', role: 'cereal', preparation: 'Corteza tostada crujiente' }
    ]
  },
  {
    id: 'dish-desayuno-mollete-panela',
    slot: 'desayuno',
    title: 'Mollete con Frijol y Panela',
    description: 'Bolillo horneado con frijoles refritos + Queso panela en cubos',
    items: [
      { foodId: 'f-bolillo', role: 'cereal', preparation: 'Tostadito horneado' },
      { foodId: 'f-frijol-refrito', role: 'leguminosa', preparation: 'Untado suave colado' },
      { foodId: 'f-queso-panela', role: 'lácteo', preparation: 'Asado al comal doradito' }
    ]
  },

  // 3. CENAS LIGERAS
  {
    id: 'dish-cena-quesadilla-oaxaca',
    slot: 'cena',
    title: 'Quesadilla al Comal con Aguacate',
    description: 'Tortilla de maíz + Queso Oaxaca fundido suave + Rebanaditas de aguacate',
    items: [
      { foodId: 'f-tortilla-maiz', role: 'cereal', preparation: 'Al comal suave' },
      { foodId: 'f-queso-oaxaca', role: 'lácteo', preparation: 'Fundido suave en quesadilla' },
      { foodId: 'f-aguacate-hass', role: 'verdura', preparation: 'Fresco en rebanadas lisas' }
    ]
  },
  {
    id: 'dish-cena-caldito-pollo',
    slot: 'cena',
    title: 'Caldito Ligero de Pollo con Arroz',
    description: 'Pechuga deshebrada en caldito claro + Arroz blanco + Chayote tierno',
    items: [
      { foodId: 'f-pollo-deshebrado', role: 'proteína', preparation: 'En caldito de pollo' },
      { foodId: 'f-arroz-blanco', role: 'cereal', preparation: 'Al vapor mezclado en caldito' },
      { foodId: 'f-chayote-cubos', role: 'verdura', preparation: 'Cocido en cubitos al vapor' }
    ]
  },

  // 4. COLACIONES RECONFORTANTES
  {
    id: 'dish-colacion-fruta-crujiente',
    slot: 'colacion',
    title: 'Colación de Fruta Crujiente',
    description: 'Manzana Golden en láminas + Jícama fresca en bastoncitos',
    items: [
      { foodId: 'f-manzana-amarilla', role: 'fruta', preparation: 'Pelada en láminas delgadas crujientes' },
      { foodId: 'f-jicama-bastones', role: 'verdura', preparation: 'En bastoncitos frescos crujientes' }
    ]
  },
  {
    id: 'dish-colacion-totopos-queso',
    slot: 'colacion',
    title: 'Colación Salada de Totopos y Queso',
    description: 'Totopos de maíz horneados + Queso panela en cubitos',
    items: [
      { foodId: 'f-totopos-horno', role: 'cereal', preparation: 'Horneados crujientes sin sal' },
      { foodId: 'f-queso-panela', role: 'lácteo', preparation: 'Fresco en cubitos fríos' }
    ]
  }
];
