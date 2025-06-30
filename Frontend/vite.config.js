import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
    server: {
    host: '0.0.0.0',
    host: true, // allows access via IP or custom domain
    cors: true, // allows cross-origin requests
    port: 5173 ,
    allowedHosts: [
      'localhost',
      'e77f-2402-3a80-43a0-a950-943c-86f9-7ee4-fbb1.ngrok-free.app',
      'musync.onrender.com',
      'shaky-ravens-sniff.loca.lt',
      'rnlxh-2402-3a80-43a0-a950-996-86ce-9e63-2e52.a.free.pinggy.link'
    ]
  },
 
})
