import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { reactNativeWeb } from './vite-plugin-react-native-web'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactNativeWeb(), 
  ],
})
