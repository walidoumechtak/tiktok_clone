import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const _plugins = [react()];
// _plugins.unshift(MillionLint.vite())
export default defineConfig({
  plugins: _plugins,
  server: {
    host: '0.0.0.0',
    port: 3002
  }
});