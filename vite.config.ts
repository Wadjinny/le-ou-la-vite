import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


const ASSET_URL = process.env.ASSET_URL || '';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: ASSET_URL,
})
