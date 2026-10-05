import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static single-page build. `base: './'` keeps asset URLs relative so the
// same dist/ folder works at a domain root or inside a sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
