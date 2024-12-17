import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [react()],
  define: {
    global: {} // For legacy support of AWS Cognito
  },
})
