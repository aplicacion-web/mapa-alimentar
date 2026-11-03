import { FoodItem, AlternativeScoreResult } from '../data/types';

/**
 * Computes overlap between two string arrays (normalized lowercase)
 */
function getOverlap(a: string[], b: string[]): string[] {
  const setB = new Set(b.map(x => x.toLowerCase().trim()));
  return a.filter(x => setB.has(x.toLowerCase().trim()));
}

/**
 * Motor de alternativas sensoriales según especificación MVP (sección 09).
 * - Elimina el alimento de referencia
 * - Elimina alimentos con alérgenos no conocidos (allergensKnown === false)
 * - Elimina alimentos con alérgenos declarados por el responsable
 * - Ponderación: 50% Textura + 30% Color + 20% Forma
 */
export function calculateAlternatives(
  baseFood: FoodItem,
  catalog: FoodItem[],
  bannedAllergens: string[]
): AlternativeScoreResult[] {
  const bannedSet = new Set(bannedAllergens.map(a => a.toLowerCase().trim()));

  return catalog
    // 1. Eliminar el alimento base
    .filter(f => f.id !== baseFood.id)
    // 2. Seguridad: descartar alérgenos no verificados
    .filter(f => f.allergensKnown)
    // 3. Seguridad: descartar alérgenos prohibidos para el niño
    .filter(f => !f.allergens.some(a => bannedSet.has(a.toLowerCase().trim())))
    // 4. Calcular superposiciones y puntuación sensorial
    .map(food => {
      const textureOverlap = getOverlap(baseFood.textureTags, food.textureTags);
      const colorOverlap = getOverlap(baseFood.colorTags, food.colorTags);
      const shapeOverlap = getOverlap(baseFood.shapeTags, food.shapeTags);

      const textureScore = textureOverlap.length > 0 ? 1 : 0;
      const colorScore = colorOverlap.length > 0 ? 1 : 0;
      const shapeScore = shapeOverlap.length > 0 ? 1 : 0;

      const score = (0.50 * textureScore) + (0.30 * colorScore) + (0.20 * shapeScore);

      // Explicación humana en español de México
      const reasons: string[] = [];
      if (textureOverlap.length > 0) {
        reasons.push(`textura similar (${textureOverlap.join(', ')})`);
      }
      if (colorOverlap.length > 0) {
        reasons.push(`color afín (${colorOverlap.join(', ')})`);
      }
      if (shapeOverlap.length > 0) {
        reasons.push(`presentación parecida (${shapeOverlap.join(', ')})`);
      }

      const explanation = reasons.length > 0 
        ? `Sugerido por compartir ${reasons.join(' y ')} con ${baseFood.nameEsMx}.`
        : `Opción neutra sin alérgenos incompatibles con ${baseFood.nameEsMx}.`;

      return {
        food,
        score,
        textureOverlap,
        colorOverlap,
        shapeOverlap,
        explanation
      };
    })
    // 5. Ordenar de mayor similitud a menor
    .sort((a, b) => b.score - a.score);
}
