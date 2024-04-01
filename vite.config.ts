import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


const ASSET_URL = process.env.ASSET_URL || '';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Base /le-ou-la-vite
  base: ASSET_URL,
})
