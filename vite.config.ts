import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// O Vite não lê PORT do ambiente sozinho — sem isto ele fixa 5173 e ignora a
// porta atribuída pelo harness quando autoPort está ligado.
const port = process.env.PORT ? Number(process.env.PORT) : undefined

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port },
})
