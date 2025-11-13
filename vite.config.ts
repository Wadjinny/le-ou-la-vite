import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
dotenv.config() 
const FRONT_PORT = Number(process.env.FRONT_PORT);
const FRONT_URL = `http://localhost:${FRONT_PORT}`;
const API_PORT = process.env.API_PORT;
const API_URL = `http://localhost:${API_PORT}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: FRONT_URL,
  server: {
    port: FRONT_PORT,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
