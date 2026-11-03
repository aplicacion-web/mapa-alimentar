# Mapa Alimentar 🇲🇽 · MVP PWA Mobile-First

Aplicación web progresiva (PWA) móvil para el mercado de **México (`es-MX`)**, diseñada para apoyar a madres y responsables de niños con selectividad alimentaria (TEA / neurodivergencia) a organizar alimentos aceptados y descubrir alternativas sensoriales seguras sin conflicto ni diagnósticos médicos.

---

## 🚀 Tecnologías Implementadas

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **PWA:** Web App Manifest (`manifest.json`), Service Worker (`sw.js`), meta tags iOS/Android, navegación touch optimizada para 360px+.
- **Iconografía & UI:** Lucide React + Tailwind custom color system (paleta turquesa/menta y ámbar cálido).
- **Enrutamiento:** React Router DOM (v6) con guardias de rutas protegidas y fallback SPA.
- **Motor de Alternativas Sensoriales:** Algoritmo determinístico con ponderación 50% Textura + 30% Color + 20% Forma y **exclusión estricta de alérgenos declarados y datos de seguridad desconocidos**.
- **Capa de Abstracción (Firebase Ready):** Estructura modular (`src/lib/storage.ts`, `src/context/AuthContext.tsx`, `src/context/DataContext.tsx`) que opera de forma local e independiente y se conecta a Firebase Auth y Firestore sin alterar componentes visuales.

---

## 📱 Pantallas y Flujos Incluidos

1. **Microsite / Landing Page (`/`):**
   - Propuesta de valor, demostración visual de perfil, 4 pilares metodológicos, propuesta comercial en pesos mexicanos (MX$ 199/mes), preguntas frecuentes y aviso de responsabilidad.
2. **Autenticación del Responsável (`/login`, `/cadastro`):**
   - Idioma `es-MX`, consentimiento informado de privacidad según regulación mexicana, acceso con un clic para demostración inmediata.
3. **Flujo de Onboarding en 3 Pasos (`/onboarding`):**
   - **Paso 1:** Apodo del menor (sin apellidos para privacidad), rango de edad y selección de alérgenos conocidos.
   - **Paso 2:** Selección rápida de 5 a 10 alimentos aceptados/evitados/explorando con bloqueo si no hay base segura.
   - **Paso 3:** Registro de texturas preferidas, colores y sensibilidad a alimentos mezclados.
4. **Mi Perfil (`/app/perfil`):**
   - Resumen sensorial, base segura de alimentos, alimentos evitados respetados y banderas de alérgenos activos.
5. **Mapa Alimentario (`/app/mapa`):**
   - Métricas (Aceptados, Explorando, Evitados), diversidad por grupos, filtros por texturas y buscador con catálogo mexicano.
6. **Explorador de Alternativas (`/app/alternativas`):**
   - Selección de alimento base (ej. papa), ordenamiento por afinidad porcentual, explicación de similitudes y comparación nutricional (100 g).
7. **Mi Rutina Semanal (`/app/rotina`):**
   - Calendario editable de Lunes a Domingo dividido en Desayuno, Comida, Cena y Colación, destacando alimentos seguros.
8. **Historial de Experiencias (`/app/historico`):**
   - Bitácora de tolerancia sin presión: *Aceptó comer*, *Exploró / Tocó*, *Rechazó (respetado)* y *No ofrecido*, con exportación a texto/resumen.
9. **Configuración y Privacidad (`/app/configuracoes`):**
   - Descarga de respaldo de datos familiares en formato JSON y opción de supresión/eliminación total inmediata.

---

## 🛠️ Ejecución Local

```bash
cd mapa-alimentar
npm install
npm run dev
```

El servidor estará disponible en `http://localhost:3000/`.
Para generar la versión de producción estática:
```bash
npm run build
npm run preview
```

---

## 🔌 Próxima Integración: Firebase

Cuando desees conectar Firebase:
1. Instala el SDK: `npm install firebase`
2. En `src/context/AuthContext.tsx`, conecta `signInWithEmailAndPassword`, `createUserWithEmailAndPassword` y `signOut`.
3. En `src/context/DataContext.tsx`, reemplaza las lecturas y escrituras de `LocalStore` con `doc(db, 'children', childId)` y subcolecciones (`child_foods`, `meal_plan`, `experiences`).
