import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Base /le-ou-la-vite
  base: '/le-ou-la-vite/'
})
