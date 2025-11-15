import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const FRONT_PORT = Number(env.VITE_FRONT_PORT)
  const FRONT_HOST = env.VITE_FRONT_HOST
  const API_PORT = Number(env.VITE_API_PORT)
  const API_URL = `http://${FRONT_HOST}:${API_PORT}`

  return {
    plugins: [react()],
    base: '/',
    server: {
      port: FRONT_PORT,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
});
