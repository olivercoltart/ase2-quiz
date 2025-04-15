import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows using `expect`, `describe`, `it`, etc. globally
    environment: 'jsdom', // Use jsdom for DOM testing (or 'node' if you're testing in Node.js environment)
  },
});
