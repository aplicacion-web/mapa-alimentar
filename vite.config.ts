import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Permite hospedar en GitHub Pages o cualquier subruta sin romper enlaces
  server: {
    port: 3000,
    host: true
  }
});
