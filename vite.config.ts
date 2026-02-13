import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "ab34-2804-1e68-c801-b536-7d54-82bf-6126-1662.ngrok-free.app",
    ],
  },
})
